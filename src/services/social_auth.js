const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findOrCreateGoogleUser } = require('./db');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Configure Google Strategy
// Check if keys are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: (process.env.APP_URL || '') + "/auth/google/callback"
    },
        async function (accessToken, refreshToken, profile, cb) {
            try {
                const email = profile.emails[0].value;
                const user = await findOrCreateGoogleUser(email);
                return cb(null, user);
            } catch (err) {
                return cb(err);
            }
        }));
    console.log('✅ Google Auth Configured');
    console.warn('⚠️ Google Auth Skipped: Missing GOOGLE_CLIENT_ID/SECRET');
}

/**
 * Verify Telegram Login Data
 * @param {Object} data - Query parameters from Telegram callback
 */
function verifyTelegramAuth(data) {
    const { hash, ...userData } = data;
    if (!hash || !process.env.TELEGRAM_BOT_TOKEN) return false;

    // 1. Create data-check-string
    const checkString = Object.keys(userData)
        .sort()
        .map(key => `${key}=${userData[key]}`)
        .join('\n');

    // 2. Create secret key
    const crypto = require('crypto');
    const secretKey = crypto.createHash('sha256')
        .update(process.env.TELEGRAM_BOT_TOKEN)
        .digest();

    // 3. Calculate hmac
    const hmac = crypto.createHmac('sha256', secretKey)
        .update(checkString)
        .digest('hex');

    return hmac === hash;
}

module.exports = {
    passport,
    verifyTelegramAuth
};
