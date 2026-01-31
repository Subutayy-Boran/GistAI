require('dotenv').config();
const { connectDB } = require('./services/db');
const { initBot } = require('./services/bot');
const { initScheduler } = require('./services/scheduler');
const express = require('express');
const path = require('path');
const { query } = require('./services/db');
const api = require('./services/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Social Auth Middleware
const session = require('express-session');
const { passport } = require('./services/social_auth');
const authRoutes = require('./services/auth_routes');

app.use(session({
    secret: process.env.SESSION_SECRET || 'gistai_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Mount Auth Routes
app.use('/auth', authRoutes);

// ============================================
// API ROUTES (REST API for web frontend)
// ============================================

// Auth endpoints
app.post('/api/auth/register', api.register);
app.post('/api/auth/login', api.login);
app.post('/api/auth/logout', api.logout);
app.post('/api/auth/forgot-password', api.forgotPassword);

// Protected endpoints (require auth)
app.get('/api/user/profile', api.requireAuth, api.getProfile);
app.post('/api/telegram/generate-code', api.requireAuth, api.generateTelegramCode);
app.get('/api/subscriptions', api.requireAuth, api.getSubscriptions);
app.post('/api/subscriptions', api.requireAuth, api.addSubscription);
app.delete('/api/subscriptions/:sourceId', api.requireAuth, api.removeSubscription);
app.get('/api/news', api.requireAuth, api.getNews);
app.delete('/api/user/delete-account', api.requireAuth, api.deleteAccount);


// ============================================
// WEB ROUTES (Server-side rendered pages)
// ============================================

// Landing page
app.get('/', (req, res) => {
    res.render('index');
});

// Login page
app.get('/login', (req, res) => {
    res.render('login', { botUsername: app.locals.botUsername });
});

// Register page
app.get('/register', (req, res) => {
    res.render('register', { botUsername: app.locals.botUsername });
});

// Forgot Password page
app.get('/forgot-password', (req, res) => {
    res.render('forgot-password');
});

// Reset Password page (placeholder for now)
app.get('/reset-password', (req, res) => {
    res.render('login'); // Redirect to login or specific reset page
});

// Legal pages
app.get('/terms', (req, res) => {
    res.render('terms');
});

app.get('/privacy', (req, res) => {
    res.render('privacy');
});

// Dashboard (will need authentication later)
app.get('/dashboard', async (req, res) => {
    // For now, dashboard handles auth client-side via localStorage
    // In production, add server-side auth middleware
    res.render('dashboard');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

async function main() {
    console.log('🚀 Sistem başlatılıyor (Hybrid SaaS Mode)...');

    // 1. Veritabanı Bağlantısı
    await connectDB();

    // 2. Servisleri Başlat
    await initScheduler();
    await initBot();

    // Get Bot Info for Telegram Login
    try {
        const { bot } = require('./services/bot');
        const botInfo = await bot.api.getMe();
        app.locals.botUsername = botInfo.username;
        console.log(`✅ Telegram Bot Username: @${botInfo.username}`);
    } catch (e) {
        console.warn('⚠️ Could not fetch bot username:', e.message);
    }

    // 3. Web Sunucusunu Başlat
    app.listen(PORT, () => {
        console.log(`🌍 Web Sunucusu çalışıyor: http://localhost:${PORT}`);
        console.log(`📊 API Endpoints: http://localhost:${PORT}/api`);
        console.log(`💡 Dashboard: http://localhost:${PORT}/dashboard`);
    });
}

if (require.main === module) {
    main();
}
