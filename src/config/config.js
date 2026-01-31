module.exports = {
    // Subscription Limits
    FREE_TIER_LIMIT: 2,
    PREMIUM_TIER_LIMIT: Infinity,

    // Subscription Pricing
    PREMIUM_MONTHLY_PRICE: 10, // USD

    // Scraper Settings
    SCRAPER_INTERVAL_MINUTES: 15,
    SCRAPER_MAX_TWEETS_PER_SOURCE: 10,
    SCRAPER_TIMEOUT_MS: 30000,
    SCRAPER_MAX_RETRIES: 3,

    // Nitter Instances (Updated List)
    NITTER_INSTANCES: [
        'https://nitter.net',
        'https://nitter.cz',
        'https://nitter.privacydev.net',
        'https://nitter.poast.org',
        'https://nitter.woodland.cafe',
        'https://nitter.respublicae.eu'
    ],

    // AI Settings
    GEMINI_MODEL: 'gemini-2.0-flash-exp',
    GEMINI_MAX_RETRIES: 2,
    GEMINI_TIMEOUT_MS: 10000,

    // Session Settings
    SESSION_DURATION_HOURS: 24 * 7, // 7 days
    TELEGRAM_CONNECT_CODE_EXPIRY_MINUTES: 10,

    // Notification Settings
    TELEGRAM_NOTIFICATIONS_DEFAULT: true,
    EMAIL_NOTIFICATIONS_DEFAULT: false,

    // Web URLs (update with your domain)
    WEB_BASE_URL: process.env.WEB_BASE_URL || 'http://localhost:3000',

    // Feature Flags
    ENABLE_EMAIL_NOTIFICATIONS: false, // MVP'de kapalı
    ENABLE_STRIPE_PAYMENTS: false, // MVP'de placeholder
};
