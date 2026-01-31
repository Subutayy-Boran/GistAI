const {
    registerUserByEmail,
    findUserByEmail,
    generateTelegramConnectCode,
    checkSubscriptionLimit,
    getSubscriptionTier,
    addSource,
    subscribeUserToSource,
    unsubscribeUserFromSource,
    getUserSubscriptions,
    query
} = require('../services/db');
const { hashPassword, comparePassword, generateSessionToken, isValidEmail, sanitizeTwitterUsername } = require('../utils/helpers');
const config = require('../config/config');
const { sendWelcomeEmail } = require('../services/email');

// Simple session store (in-memory - production should use Redis)
const sessions = new Map();

/**
 * Middleware: Check if user is authenticated
 */
function requireAuth(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.session_token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const session = sessions.get(token);
    if (!session || new Date() > session.expiresAt) {
        sessions.delete(token);
        return res.status(401).json({ error: 'Session expired' });
    }

    // Update last accessed
    session.lastAccessed = new Date();
    req.user = session.user;
    next();
}

/**
 * Helper: Create session for user
 */
function createSession(user) {
    const token = generateSessionToken();
    const expiresAt = new Date(Date.now() + config.SESSION_DURATION_HOURS * 60 * 60 * 1000);

    sessions.set(token, {
        user: { id: user.id, email: user.email, tier: user.subscription_tier },
        expiresAt,
        lastAccessed: new Date()
    });
    return token;
}

/**
 * POST /api/auth/register
 * Register new user
 */
async function register(req, res) {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Hash password
        const passwordHash = hashPassword(password);

        // Create user
        const user = await registerUserByEmail(email, passwordHash);

        // Send welcome email (non-blocking)
        sendWelcomeEmail(email).catch(err => console.error('Background email failed:', err));

        // Create session
        const token = createSession(user);

        res.json({
            success: true,
            user: { id: user.id, email: user.email, tier: user.subscription_tier },
            token
        });

    } catch (err) {
        if (err.message === 'EMAIL_ALREADY_EXISTS') {
            return res.status(400).json({ error: 'Email already registered' });
        }
        console.error('Register error:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
}

/**
 * POST /api/auth/login
 * Login user
 */
async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        // Find user
        const user = await findUserByEmail(email);
        if (!user || !user.password_hash) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        if (!comparePassword(password, user.password_hash)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Update last login
        await query('UPDATE profiles SET last_login_at = NOW() WHERE id = $1', [user.id]);

        // Create session
        const token = createSession(user);

        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                tier: user.subscription_tier,
                telegramConnected: !!user.telegram_chat_id
            },
            token
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
}

/**
 * POST /api/auth/logout
 * Logout user
 */
function logout(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.session_token;
    if (token) {
        sessions.delete(token);
    }
    res.json({ success: true });
}

/**
 * POST /api/auth/forgot-password
 * Request password reset
 */
async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email required' });

        const user = await findUserByEmail(email);

        // For security, always return success even if user not found
        if (!user) {
            // Simulate delay
            await new Promise(r => setTimeout(r, 1000));
            return res.json({ success: true });
        }

        // Generate dummy token
        const resetToken = generateSessionToken(); // Reusing this helper

        // Send email (non-blocking)
        const { sendPasswordResetEmail } = require('../services/email');
        sendPasswordResetEmail(email, resetToken).catch(console.error);

        res.json({ success: true });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ error: 'Request failed' });
    }
}


/**
 * GET /api/user/profile
 * Get current user profile
 */
async function getProfile(req, res) {
    try {
        const user = await query('SELECT id, email, subscription_tier, telegram_username, telegram_connected_at, created_at FROM profiles WHERE id = $1', [req.user.id]);

        if (!user.rows[0]) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user: user.rows[0] });
    } catch (err) {
        console.error('Get profile error:', err);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
}

/**
 * POST /api/telegram/generate-code
 * Generate Telegram connection code
 */
async function generateTelegramCode(req, res) {
    try {
        const code = await generateTelegramConnectCode(req.user.id);
        res.json({ code: code.code, expiresAt: code.expires_at });
    } catch (err) {
        console.error('Generate code error:', err);
        res.status(500).json({ error: 'Failed to generate code' });
    }
}

/**
 * GET /api/subscriptions
 * Get user's subscriptions
 */
async function getSubscriptions(req, res) {
    try {
        const subs = await getUserSubscriptions(req.user.id);
        const limitInfo = await checkSubscriptionLimit(req.user.id);

        res.json({
            subscriptions: subs,
            limit: limitInfo
        });
    } catch (err) {
        console.error('Get subscriptions error:', err);
        res.status(500).json({ error: 'Failed to fetch subscriptions' });
    }
}

/**
 * POST /api/subscriptions
 * Add new subscription
 */
async function addSubscription(req, res) {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ error: 'Username required' });
        }

        const cleanUsername = sanitizeTwitterUsername(username);

        // Check limit
        const limitInfo = await checkSubscriptionLimit(req.user.id);
        if (!limitInfo.canSubscribe) {
            return res.status(403).json({
                error: 'Subscription limit reached',
                limit: limitInfo
            });
        }

        // Add source
        const sourceId = await addSource('twitter', cleanUsername);

        // Subscribe user
        await subscribeUserToSource(req.user.id, sourceId);

        // --- PHASE 0: INJECT MOCK DATA FOR FEATURED ACCOUNTS ---
        const PHASE_0_MOCK_DATA = {
            'elonmusk': [
                {
                    text: 'Just announced: Grok 2 will be integrated into Tesla vehicles next month. #AI',
                    summary: ['Grok 2 integration into Tesla vehicles announced.', 'Scheduled for next month release.', 'Major AI update for fleet.'],
                    category: 'Technology'
                },
                {
                    text: 'Starship flight 4 ready for launch pending FAA approval. Exciting times!',
                    summary: ['Starship Flight 4 ready for launch.', 'Awaiting FAA approval.', 'Launch imminent.'],
                    category: 'Space'
                }
            ],
            'cnn': [
                {
                    text: 'Breaking: Major market shifts as tech stocks rally ahead of earnings reports. Full story tonight.',
                    summary: ['Tech stocks rally before earnings.', 'Major market shift observed.', 'Full detailed report tonight.'],
                    category: 'Finance'
                }
            ],
            'techcrunch': [
                {
                    text: 'OpenAI releases new Sora model capabilities including audio generation.',
                    summary: ['OpenAI updates Sora model.', 'Now includes audio generation.', 'Enhanced video capabilities.'],
                    category: 'AI'
                }
            ]
        };

        if (PHASE_0_MOCK_DATA[cleanUsername]) {
            const mocks = PHASE_0_MOCK_DATA[cleanUsername];
            for (const mock of mocks) {
                // Check if exists roughly
                // Actually, just insert. It's safe enough for MVP demo.
                // We use a random external_id to avoid collision if run multiple times
                const mockId = 'mock_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

                try {
                    await query(`
                        INSERT INTO news_items 
                        (source_id, external_id, original_text, is_news_worthy, summary_text, category, relevance_score, published_at)
                        VALUES ($1, $2, $3, true, $4, $5, 0, NOW())
                        ON CONFLICT (source_id, external_id) DO NOTHING
                    `, [
                        sourceId,
                        mockId,
                        mock.text,
                        JSON.stringify(mock.summary),
                        mock.category
                    ]);
                } catch (e) {
                    console.error('Mock injection error:', e);
                }
            }
        }
        // -------------------------------------------------------

        res.json({ success: true, username: cleanUsername });

    } catch (err) {
        console.error('Add subscription error:', err);
        res.status(500).json({ error: 'Failed to add subscription' });
    }
}

/**
 * DELETE /api/subscriptions/:sourceId
 * Remove subscription
 */
async function removeSubscription(req, res) {
    try {
        const { sourceId } = req.params;

        await unsubscribeUserFromSource(req.user.id, sourceId);

        res.json({ success: true });

    } catch (err) {
        console.error('Remove subscription error:', err);
        res.status(500).json({ error: 'Failed to remove subscription' });
    }
}

/**
 * GET /api/news
 * Get news for user
 */
async function getNews(req, res) {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 20, 100);
        const offset = parseInt(req.query.offset) || 0;
        const category = req.query.category || null;

        let sql = `
            SELECT n.*, s.username, s.platform 
            FROM news_items n
            JOIN sources s ON n.source_id = s.id
            JOIN subscriptions sub ON s.id = sub.source_id
            WHERE sub.user_id = $1 AND n.is_news_worthy = true
        `;
        const params = [req.user.id];

        if (category) {
            sql += ` AND n.category = $${params.length + 1}`;
            params.push(category);
        }

        sql += ` ORDER BY n.published_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
        params.push(limit, offset);

        const result = await query(sql, params);

        res.json({ news: result.rows });

    } catch (err) {
        console.error('Get news error:', err);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
}

module.exports = {
    requireAuth,
    register,
    login,
    logout,
    getProfile,
    generateTelegramCode,
    getSubscriptions,
    addSubscription,
    removeSubscription,
    getNews,
    forgotPassword,
    createSession
};
