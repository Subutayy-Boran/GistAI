const { Client } = require('pg');
const config = require('../config/config');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function connectDB() {
    try {
        if (process.env.DATABASE_URL.includes('[SIFRE]')) {
            console.warn('UYARI: Database şifresi .env dosyasında girilmemiş. DB bağlantısı atlanıyor.');
            return;
        }
        await client.connect();
        console.log('Veritabanına başarıyla bağlanıldı.');
    } catch (err) {
        console.error('Veritabanı bağlantı hatası:', err.message);
    }
}

// Basit query wrapper
async function query(text, params) {
    return client.query(text, params);
}

module.exports = {
    client,
    connectDB,
    query,
    // User Management (Web + Telegram)
    registerUserByEmail,
    registerUserByTelegram,
    findOrCreateGoogleUser,
    findUserByEmail,
    findUserByTelegramChatId,
    updateUserPassword,
    // Telegram Integration
    generateTelegramConnectCode,
    connectTelegramAccount,
    // Subscription & Limits
    getSubscriptionTier,
    checkSubscriptionLimit,
    upgradeUserToPremium,
    downgradeUserToFree,
    // Sources
    addSource,
    getAllActiveSources,
    updateSourceStatus,
    // Subscriptions
    subscribeUserToSource,
    unsubscribeUserFromSource,
    getUserSubscriptions,
    getUserSubscriptionCount
};

// ============================================
// USER MANAGEMENT - WEB REGISTRATION
// ============================================

/**
 * Register a new user via web (email/password)
 */
async function registerUserByEmail(email, passwordHash) {
    const sql = `
        INSERT INTO profiles (email, password_hash, subscription_tier)
        VALUES ($1, $2, 'free')
        RETURNING id, email, subscription_tier, created_at
    `;
    try {
        const result = await query(sql, [email.toLowerCase(), passwordHash]);
        return result.rows[0];
    } catch (err) {
        if (err.code === '23505') { // Unique violation
            throw new Error('EMAIL_ALREADY_EXISTS');
        }
        throw err;
    }
}

/**
 * Register or find user via Telegram (fallback/legacy)
 */
async function registerUserByTelegram(chatId, username = null) {
    const checkSql = 'SELECT * FROM profiles WHERE telegram_chat_id = $1';
    const check = await query(checkSql, [chatId.toString()]);

    if (check.rows.length > 0) {
        return check.rows[0];
    }

    // Create new user
    const insertSql = `
        INSERT INTO profiles (telegram_chat_id, telegram_username, subscription_tier, telegram_connected_at)
        VALUES ($1, $2, 'free', NOW())
        RETURNING *
    `;
    const result = await query(insertSql, [chatId.toString(), username]);
    return result.rows[0];
}

/**
 * Find or create user via Google Auth
 */
async function findOrCreateGoogleUser(email) {
    const existing = await findUserByEmail(email);
    if (existing) {
        return existing;
    }

    const sql = `
        INSERT INTO profiles (email, password_hash, subscription_tier)
        VALUES ($1, $2, 'free')
        RETURNING id, email, subscription_tier
    `;
    // Use a non-usable password hash for Google users
    const dummyHash = 'GOOGLE_AUTH_' + Date.now();
    const result = await query(sql, [email, dummyHash]);
    return result.rows[0];
}

/**
 * Find user by email
 */
async function findUserByEmail(email) {
    const sql = 'SELECT * FROM profiles WHERE email = $1';
    const result = await query(sql, [email.toLowerCase()]);
    return result.rows[0] || null;
}

/**
 * Find user by Telegram chat ID
 */
async function findUserByTelegramChatId(chatId) {
    const sql = 'SELECT * FROM profiles WHERE telegram_chat_id = $1';
    const result = await query(sql, [chatId.toString()]);
    return result.rows[0] || null;
}

/**
 * Update user password
 */
async function updateUserPassword(userId, newPasswordHash) {
    const sql = 'UPDATE profiles SET password_hash = $1, updated_at = NOW() WHERE id = $2';
    await query(sql, [newPasswordHash, userId]);
}

// ============================================
// TELEGRAM INTEGRATION
// ============================================

/**
 * Generate a temporary code for linking Telegram account
 */
async function generateTelegramConnectCode(userId) {
    const crypto = require('crypto');
    const code = crypto.randomInt(100000, 999999).toString(); // 6-digit code
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete old codes for this user
    await query('DELETE FROM telegram_connect_codes WHERE user_id = $1', [userId]);

    const sql = `
        INSERT INTO telegram_connect_codes (user_id, code, expires_at)
        VALUES ($1, $2, $3)
        RETURNING code, expires_at
    `;
    const result = await query(sql, [userId, code, expiresAt]);
    return result.rows[0];
}

/**
 * Connect Telegram account using code
 */
async function connectTelegramAccount(code, chatId, username = null) {
    const sql = `
        SELECT user_id FROM telegram_connect_codes 
        WHERE code = $1 AND used = false AND expires_at > NOW()
    `;
    const result = await query(sql, [code]);

    if (result.rows.length === 0) {
        throw new Error('INVALID_OR_EXPIRED_CODE');
    }

    const userId = result.rows[0].user_id;

    // Update user with Telegram info
    await query(
        `UPDATE profiles 
         SET telegram_chat_id = $1, telegram_username = $2, telegram_connected_at = NOW() 
         WHERE id = $3`,
        [chatId.toString(), username, userId]
    );

    // Mark code as used
    await query('UPDATE telegram_connect_codes SET used = true WHERE code = $1', [code]);

    // Send welcome message
    try {
        const { bot } = require('./bot');
        await bot.api.sendMessage(chatId,
            '🎉 *Hoş geldin!*\n\n' +
            'Telegram hesabın başarıyla bağlandı. ' +
            'Artık önemli haberler buradan sana ulaşacak!\n\n' +
            '✨ Dashboard\'dan Twitter hesapları ekleyebilir,\n' +
            '📊 AI filtreleme ayarlarını yapabilir,\n' +
            '🔔 Anlık bildirimler alabilirsin.',
            { parse_mode: 'Markdown' }
        );
    } catch (err) {
        console.error('Telegram hoş geldin mesajı gönderilemedi:', err.message);
    }

    return userId;
}

// ============================================
// SUBSCRIPTION & TIER MANAGEMENT
// ============================================

/**
 * Get user's subscription tier
 */
async function getSubscriptionTier(userId) {
    const sql = `
        SELECT subscription_tier, subscription_expires_at 
        FROM profiles WHERE id = $1
    `;
    const result = await query(sql, [userId]);
    if (result.rows.length === 0) return null;

    const user = result.rows[0];

    // Check if premium expired
    if (user.subscription_tier === 'premium' && user.subscription_expires_at) {
        if (new Date(user.subscription_expires_at) < new Date()) {
            await downgradeUserToFree(userId);
            return 'free';
        }
    }

    return user.subscription_tier;
}

/**
 * Check if user can subscribe to more sources
 */
async function checkSubscriptionLimit(userId) {
    const FREE_LIMIT = config.FREE_TIER_LIMIT;

    const tier = await getSubscriptionTier(userId);

    if (tier === 'premium') {
        return { canSubscribe: true, limit: Infinity, current: 0 };
    }

    // Count current subscriptions
    const countSql = `
        SELECT COUNT(*) as count FROM subscriptions 
        WHERE user_id = $1 AND is_active = true
    `;
    const result = await query(countSql, [userId]);
    const current = parseInt(result.rows[0].count);

    return {
        canSubscribe: current < FREE_LIMIT,
        limit: FREE_LIMIT,
        current: current,
        remaining: FREE_LIMIT - current
    };
}

/**
 * Upgrade user to premium
 */
async function upgradeUserToPremium(userId, durationMonths = 1) {
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + durationMonths);

    const sql = `
        UPDATE profiles 
        SET subscription_tier = 'premium', 
            subscription_started_at = NOW(), 
            subscription_expires_at = $1
        WHERE id = $2
    `;
    await query(sql, [expiresAt, userId]);
}

/**
 * Downgrade user to free tier
 */
async function downgradeUserToFree(userId) {
    const sql = `
        UPDATE profiles 
        SET subscription_tier = 'free',
            subscription_expires_at = NULL
        WHERE id = $1
    `;
    await query(sql, [userId]);
}

// ============================================
// SOURCE MANAGEMENT
// ============================================

async function addSource(platform, username) {
    const sql = `
        INSERT INTO sources (platform, username, url)
        VALUES ($1, $2, $3)
        ON CONFLICT (platform, username) 
        DO UPDATE SET is_active = true, updated_at = NOW()
        RETURNING id
    `;
    const url = platform === 'twitter' ? `https://twitter.com/${username}` : '';
    const result = await query(sql, [platform, username, url]);
    return result.rows[0].id;
}

async function getAllActiveSources() {
    const sql = 'SELECT * FROM sources WHERE is_active = true';
    const result = await query(sql);
    return result.rows;
}

async function updateSourceStatus(sourceId, isSuccessful) {
    if (isSuccessful) {
        await query(
            'UPDATE sources SET last_successful_scrape_at = NOW(), consecutive_failures = 0 WHERE id = $1',
            [sourceId]
        );
    } else {
        await query(
            'UPDATE sources SET consecutive_failures = consecutive_failures + 1 WHERE id = $1',
            [sourceId]
        );
    }
}

// ============================================
// SUBSCRIPTION MANAGEMENT
// ============================================

async function subscribeUserToSource(userId, sourceId) {
    const sql = `
        INSERT INTO subscriptions (user_id, source_id, is_active)
        VALUES ($1, $2, true)
        ON CONFLICT (user_id, source_id) 
        DO UPDATE SET is_active = true
    `;
    await query(sql, [userId, sourceId]);
}

async function unsubscribeUserFromSource(userId, sourceId) {
    const sql = 'UPDATE subscriptions SET is_active = false WHERE user_id = $1 AND source_id = $2';
    await query(sql, [userId, sourceId]);
}

async function getUserSubscriptions(userId) {
    const sql = `
        SELECT s.id, s.platform, s.username, s.url, sub.created_at as subscribed_at
        FROM subscriptions sub
        JOIN sources s ON sub.source_id = s.id
        WHERE sub.user_id = $1 AND sub.is_active = true
        ORDER BY sub.created_at DESC
    `;
    const result = await query(sql, [userId]);
    return result.rows;
}

async function getUserSubscriptionCount(userId) {
    const sql = `
        SELECT COUNT(*) as count FROM subscriptions 
        WHERE user_id = $1 AND is_active = true
    `;
    const result = await query(sql, [userId]);
    return parseInt(result.rows[0].count);
}

