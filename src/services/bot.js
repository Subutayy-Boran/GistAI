const { Bot } = require('grammy');
const {
    findUserByTelegramChatId,
    registerUserByTelegram,
    connectTelegramAccount,
    generateTelegramConnectCode,
    query
} = require('./db');
const config = require('../config/config');

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN || 'dummy');

async function initBot() {
    if (!process.env.TELEGRAM_BOT_TOKEN) {
        console.error('HATA: TELEGRAM_BOT_TOKEN bulunamadı.');
        return;
    }

    console.log('🤖 Telegram Bot başlatılıyor (Hybrid SaaS Modu)...');

    // ============================================
    // COMMAND: /start
    // ============================================
    bot.command('start', async (ctx) => {
        try {
            const chatId = ctx.chat.id;
            const username = ctx.from.username || null;

            // Check if user exists
            let user = await findUserByTelegramChatId(chatId);

            if (user) {
                // Existing user
                await ctx.reply(
                    `👋 Tekrar hoş geldiniz, ${user.telegram_username || 'kullanıcı'}!\\n\\n` +
                    `📱 Telegram bildirimleriniz ${user.telegram_notifications_enabled ? 'aktif ✅' : 'kapalı ❌'}\\n\\n` +
                    `Komutlar:\\n` +
                    `/help - Yardım menüsü\\n` +
                    `/notifications - Bildirim ayarları\\n` +
                    `/status - Hesap durumu`,
                    { parse_mode: 'Markdown' }
                );
            } else {
                // New Telegram-only user (legacy mode)
                await registerUserByTelegram(chatId, username);

                await ctx.reply(
                    `🎉 Hoş geldiniz!\\n\\n` +
                    `📱 *Telegram Bildirim Sistemi*\\n\\n` +
                    `Bu bot, web dashboard'unuzdan yönettiğiniz Twitter takipleri için bildirim gönderir.\\n\\n` +
                    `*Başlamak için 2 yöntem:*\\n\\n` +
                    `1️⃣ *Web Dashboard (Önerilen)*\\n` +
                    `👉 ${config.WEB_BASE_URL}\\n` +
                    `- Üyelik oluştur (email ile)\\n` +
                    `- Telegram'ı bağla\\n` +
                    `- Twitter hesaplarını takip et\\n\\n` +
                    `2️⃣ *Sadece Telegram (Basit)*\\n` +
                    `- Sınırlı özellikler (max 5 takip)\\n` +
                    `- Komut: /takip @username\\n\\n` +
                    `💡 Premium özellikleri için web'i kullanın!`,
                    { parse_mode: 'Markdown' }
                );
            }
        } catch (err) {
            console.error('Start komutu hatası:', err);
            ctx.reply('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
    });

    // ============================================
    // COMMAND: /connect <code>
    // ============================================
    bot.command('connect', async (ctx) => {
        try {
            const code = ctx.match?.trim();

            if (!code) {
                return ctx.reply(
                    `🔗 *Telegram Bağlama*\\n\\n` +
                    `Web dashboard'unuzdan aldığınız 6 haneli kodu girin:\\n\\n` +
                    `Kullanım: \`/connect 123456\`\\n\\n` +
                    `Web'e gidin: ${config.WEB_BASE_URL}/profile`,
                    { parse_mode: 'Markdown' }
                );
            }

            const chatId = ctx.chat.id;
            const username = ctx.from.username || null;

            // Try to connect
            const userId = await connectTelegramAccount(code, chatId, username);

            await ctx.reply(
                `✅ *Telegram Başarıyla Bağlandı!*\\n\\n` +
                `Artık web dashboard'unuzdan yönettiğiniz tüm haberler buraya gelecek.\\n\\n` +
                `Bildirimleri kapatmak için: /notifications off`,
                { parse_mode: 'Markdown' }
            );

        } catch (err) {
            if (err.message === 'INVALID_OR_EXPIRED_CODE') {
                ctx.reply('❌ Geçersiz veya süresi dolmuş kod. Web\'den yeni kod alın.');
            } else {
                console.error('Connect hatası:', err);
                ctx.reply('Bağlantı sırasında hata oluştu.');
            }
        }
    });

    // ============================================
    // COMMAND: /notifications [on|off]
    // ============================================
    bot.command('notifications', async (ctx) => {
        try {
            const chatId = ctx.chat.id;
            const user = await findUserByTelegramChatId(chatId);

            if (!user) {
                return ctx.reply('Önce /start komutunu kullanın.');
            }

            const arg = ctx.match?.trim().toLowerCase();

            if (arg === 'on') {
                await query(
                    'UPDATE profiles SET telegram_notifications_enabled = true WHERE id = $1',
                    [user.id]
                );
                ctx.reply('✅ Telegram bildirimleri aktif edildi!');
            } else if (arg === 'off') {
                await query(
                    'UPDATE profiles SET telegram_notifications_enabled = false WHERE id = $1',
                    [user.id]
                );
                ctx.reply('🔕 Telegram bildirimleri kapatıldı.');
            } else {
                ctx.reply(
                    `🔔 *Bildirim Ayarları*\\n\\n` +
                    `Durum: ${user.telegram_notifications_enabled ? 'Açık ✅' : 'Kapalı ❌'}\\n\\n` +
                    `Değiştirmek için:\\n` +
                    `/notifications on - Bildirimleri aç\\n` +
                    `/notifications off - Bildirimleri kapat`,
                    { parse_mode: 'Markdown' }
                );
            }
        } catch (err) {
            console.error('Notifications hatası:', err);
            ctx.reply('Ayarlar güncellenemedi.');
        }
    });

    // ============================================
    // COMMAND: /status
    // ============================================
    bot.command('status', async (ctx) => {
        try {
            const chatId = ctx.chat.id;
            const user = await findUserByTelegramChatId(chatId);

            if (!user) {
                return ctx.reply('Önce /start komutunu kullanın.');
            }

            // Get subscription count
            const countResult = await query(
                'SELECT COUNT(*) as count FROM subscriptions WHERE user_id = $1 AND is_active = true',
                [user.id]
            );
            const subCount = parseInt(countResult.rows[0].count);

            const tier = user.subscription_tier.toUpperCase();
            const limit = user.subscription_tier === 'premium' ? '∞' : config.FREE_TIER_LIMIT;

            await ctx.reply(
                `📊 *Hesap Durumu*\\n\\n` +
                `👤 Kullanıcı: ${user.email || user.telegram_username || 'Telegram User'}\\n` +
                `💎 Plan: ${tier}\\n` +
                `📈 Takip: ${subCount}/${limit}\\n` +
                `🔔 Bildirimler: ${user.telegram_notifications_enabled ? 'Açık' : 'Kapalı'}\\n\\n` +
                (user.subscription_tier === 'free' ?
                    `💡 Premium'a geçmek için:\\n${config.WEB_BASE_URL}/pricing` :
                    `✨ Premium üyesiniz!`),
                { parse_mode: 'Markdown' }
            );
        } catch (err) {
            console.error('Status hatası:', err);
            ctx.reply('Durum bilgisi alınamadı.');
        }
    });

    // ============================================
    // COMMAND: /help
    // ============================================
    bot.command('help', async (ctx) => {
        await ctx.reply(
            `📚 *Yardım Menüsü*\\n\\n` +
            `*Temel Komutlar:*\\n` +
            `/start - Botu başlat\\n` +
            `/help - Bu menüyü göster\\n` +
            `/status - Hesap durumu\\n\\n` +
            `*Telegram Bağlama:*\\n` +
            `/connect <kod> - Web hesabınızı bağlayın\\n\\n` +
            `*Ayarlar:*\\n` +
            `/notifications - Bildirim ayarları\\n\\n` +
            `🌐 *Web Dashboard:*\\n` +
            `${config.WEB_BASE_URL}\\n\\n` +
            `Web'den yapabilecekleriniz:\\n` +
            `✅ Twitter hesaplarını takip et\\n` +
            `✅ Haber arşivini gör\\n` +
            `✅ Premium'a geç\\n` +
            `✅ Detaylı ayarlar`,
            { parse_mode: 'Markdown' }
        );
    });

    // ============================================
    // COMMAND: /premium
    // ============================================
    bot.command('premium', async (ctx) => {
        await ctx.reply(
            `💎 *Premium Özellikleri*\\n\\n` +
            `*Free Plan:*\\n` +
            `✅ ${config.FREE_TIER_LIMIT} Twitter hesabı takibi\\n` +
            `✅ Temel AI filtreleme\\n` +
            `✅ Telegram bildirimleri\\n\\n` +
            `*Premium Plan ($${config.PREMIUM_MONTHLY_PRICE}/ay):*\\n` +
            `🚀 Sınırsız takip\\n` +
            `🚀 Gelişmiş AI analizi\\n` +
            `🚀 Kategori filtreleme\\n` +
            `🚀 Web dashboard\\n` +
            `🚀 Öncelikli destek\\n\\n` +
            `Premium'a geçmek için:\\n` +
            `👉 ${config.WEB_BASE_URL}/pricing`,
            { parse_mode: 'Markdown' }
        );
    });

    // ============================================
    // Error Handling
    // ============================================
    bot.catch((err) => {
        console.error('Bot hatası:', err);
    });

    // ============================================
    // Start Bot (Production: skip polling, Dev: use polling)
    // ============================================
    if (process.env.NODE_ENV === 'production') {
        // Production: Don't start polling (prevents 409 conflict)
        console.log('✅ Bot ready (Production - webhook mode, polling disabled)');
    } else {
        // Development: Use polling
        bot.start({
            onStart: (botInfo) => {
                console.log(`✅ Bot @${botInfo.username} olarak çalışıyor (Dev Mode - Polling)`);
            },
        });
    }
}

async function sendTelegramMessage(chatId, message) {
    try {
        await bot.api.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (err) {
        console.error('Telegram mesaj gönderme hatası:', err);
        throw err;
    }
}

module.exports = { initBot, bot, sendTelegramMessage };
