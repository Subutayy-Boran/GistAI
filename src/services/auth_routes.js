const express = require('express');
const router = express.Router();
const { passport } = require('./social_auth');
const { createSession } = require('./api');

// Middleware to check if google auth is configured
const checkGoogleConfig = (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID) {
        return res.status(503).send("Google Auth not configured on server (Missing GOOGLE_CLIENT_ID).");
    }
    next();
};

// Google Auth
router.get('/google', checkGoogleConfig, passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        if (!req.user) return res.redirect('/login');
        const token = createSession(req.user);
        res.redirect(`/dashboard?token=${token}`);
    }
);

// Telegram Auth
const { verifyTelegramAuth } = require('./social_auth');
const { registerUserByTelegram } = require('./db');

router.get('/telegram/callback', async (req, res) => {
    try {
        if (!verifyTelegramAuth(req.query)) {
            return res.status(401).send('Invalid Telegram verification');
        }

        const { id, username } = req.query;
        // Find or create user
        // Note: registerUserByTelegram handles both find and create
        const user = await registerUserByTelegram(id, username);

        const token = createSession(user);
        res.redirect(`/dashboard?token=${token}`);

    } catch (err) {
        console.error('Telegram Auth Error:', err);
        res.redirect('/login?error=telegram_auth_failed');
    }
});

module.exports = router;
