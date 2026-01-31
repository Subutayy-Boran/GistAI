const crypto = require('crypto');

/**
 * Hash password using SHA-256 (for MVP)
 * Production: Use bcrypt or argon2
 */
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Compare password with hash
 */
function comparePassword(password, hash) {
    const inputHash = hashPassword(password);
    return inputHash === hash;
}

/**
 * Generate random session token
 */
function generateSessionToken() {
    return crypto.randomBytes(32).toString('hex');
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Sanitize Twitter username
 */
function sanitizeTwitterUsername(username) {
    return username.replace('@', '').trim().toLowerCase();
}

/**
 * Format subscription limit message
 */
function formatLimitMessage(limitInfo) {
    if (limitInfo.canSubscribe) {
        return `✅ ${limitInfo.remaining} takip hakkınız kaldı (${limitInfo.current}/${limitInfo.limit})`;
    } else {
        return `⚠️ Free plan limitine ulaştınız (${limitInfo.limit}/${limitInfo.limit})\n💎 Premium'a geçmek için: /premium`;
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    generateSessionToken,
    isValidEmail,
    sanitizeTwitterUsername,
    formatLimitMessage
};
