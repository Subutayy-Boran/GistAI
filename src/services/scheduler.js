const cron = require('node-cron');
const { query, getAllActiveSources, updateSourceStatus } = require('./db');
const { fetchLatestPosts } = require('./scraper');
const { analyzeContent } = require('./ai');
const { bot } = require('./bot'); // Bot instance'ı lazım

// Zamanlayıcıyı başlat
function initScheduler() {
    console.log('📅 Zamanlayıcı (Scheduler) başlatılıyor...');

    // Prodüksiyon: '*/15 * * * *' (15 dakikada bir)
    cron.schedule('*/15 * * * *', async () => {
        console.log('⏰ Zamanlanmış görev tetiklendi: Kaynak taraması başlıyor.');
        await processSources();
    });
}

// Tüm aktif kaynakları tara
async function processSources() {
    try {
        const sources = await getAllActiveSources();

        if (sources.length === 0) {
            console.log('⚠️ Takip edilecek aktif kaynak bulunamadı.');
            return;
        }

        console.log(`ℹ️ Toplam ${sources.length} kaynak taranacak.`);

        for (const source of sources) {
            await scrapeAndProcess(source);
        }

    } catch (err) {
        console.error('Scheduler ana döngü hatası:', err);
    }
}

// Tek bir kaynağı işle pipeline'ı
async function scrapeAndProcess(source) {
    try {
        // A. Veri Çekme (Scraping)
        const posts = await fetchLatestPosts(source.username, source.platform);

        for (const post of posts) {
            // B. Daha önce işlendi mi kontrolü
            // Tweet ID (external_id) ile kontrol
            const checkSql = `SELECT id FROM news_items WHERE external_id = $1 AND source_id = $2`;
            const checkResult = await query(checkSql, [post.id, source.id]);

            if (checkResult.rows.length > 0) {
                // Zaten var, atla
                continue;
            }

            console.log(`🆕 Yeni içerik bulundu: @${source.username} - ${post.id}`);

            // C. AI Analizi
            const analysis = await analyzeContent(source.username, post.content);

            if (!analysis) continue; // AI hatası varsa geç

            // D. Veritabanına Kaydet
            // Haber değeri olmasa bile "işlendi" olarak kaydetmek lazım ki tekrar tekrar sormayalım.
            // Ancak "news_items" tablomuz sadece haberleri tutuyor gibi tasarlandıysa 
            // "processed_posts" gibi bir tabloya da ihtiyaç olabilir.
            // Planımızda news_items tablosunda "is_news_worthy" kolonu var, o yüzden hepsini kaydedebiliriz.

            const insertSql = `
        INSERT INTO news_items 
        (source_id, external_id, original_text, is_news_worthy, title, summary_text, category, importance_score, sentiment, relevance_score, published_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id;
      `;

            // Format categories array as JSON string
            const categoriesStr = JSON.stringify(analysis.categories || ['General']);

            const newsItem = await query(insertSql, [
                source.id,
                post.id,
                post.content,
                analysis.is_news_worthy,
                analysis.title || 'News Update',
                analysis.summary || '', // Now string instead of array
                categoriesStr, // Store as JSON array
                analysis.importance_score || 5,
                analysis.sentiment || 'Neutral',
                0, // Score şimdilik 0
                post.timestamp
            ]);

            const newsItemId = newsItem.rows[0].id;

            // E. Eğer haber değeri varsa -> Bildirim Kuyruğuna Ekle (Notification Pipeline)
            if (analysis.is_news_worthy) {
                console.log(`📰 HABER DEĞERİ VAR: @${source.username}`);
                await distrubuteNotifications(newsItemId, source.id);
            } else {
                console.log(`🗑️ Haber değeri yok: @${source.username}`);
            }
        }

        // F. Kaynağın son tarama zamanını güncelle
        await updateSourceStatus(source.id, true);

    } catch (err) {
        console.error(`Scrape pipeline hatası (@${source.username}):`, err);
        // Mark as failed
        try {
            await updateSourceStatus(source.id, false);
        } catch (e) {
            console.error('Failed to update source status:', e);
        }
    }
}

// Bildirimleri dağıt (Şimdilik doğrudan gönderim veya notification tablosuna yazma)
async function distrubuteNotifications(newsItemId, sourceId) {
    // Bu kaynağı takip eden kullanıcıları ve chat_id'lerini bul
    const sql = `
    SELECT sub.user_id, p.telegram_chat_id 
    FROM subscriptions sub
    JOIN profiles p ON sub.user_id = p.id
    WHERE sub.source_id = $1
  `;
    const result = await query(sql, [sourceId]);

    // Haberin detayını çek (özet vs için)
    const newsSql = `SELECT summary_text, original_text FROM news_items WHERE id = $1`;
    const newsResult = await query(newsSql, [newsItemId]);
    const news = newsResult.rows[0];
    let summaryPoints = [];
    try {
        summaryPoints = JSON.parse(news.summary_text);
    } catch (e) {
        summaryPoints = [news.summary_text];
    }

    const messageText = `📢 **Yeni Özet!**\n\n` +
        summaryPoints.map(s => `• ${s}`).join('\n') +
        `\n\n🔗 [Kaynağa Git](${news.original_text})`; // Link varsa buraya eklenebilir

    for (const row of result.rows) {
        const userId = row.user_id;
        const chatId = row.telegram_chat_id;

        // Notifications tablosuna ekle
        await query(
            `INSERT INTO notifications (user_id, news_item_id, status) VALUES ($1, $2, 'pending')`,
            [userId, newsItemId]
        );

        // Telegram'dan gönder
        if (chatId) {
            try {
                await bot.api.sendMessage(chatId, messageText, { parse_mode: 'Markdown' });
                console.log(`✅ Bildirim gönderildi: ${chatId}`);

                // Status güncelle
                await query(
                    `UPDATE notifications SET status = 'sent', sent_at = NOW() WHERE user_id = $1 AND news_item_id = $2`,
                    [userId, newsItemId]
                );
            } catch (err) {
                console.error(`Telegram gönderim hatası (${chatId}):`, err.message);
            }
        }
    }
}

module.exports = { initScheduler };
