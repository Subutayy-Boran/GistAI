-- ============================================
-- Twitter Haber Bot - Database Migration Script
-- Hybrid SaaS Model (Web + Telegram)
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES (Users)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Web Authentication
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    
    -- Telegram Integration
    telegram_chat_id VARCHAR(50) UNIQUE,
    telegram_username VARCHAR(100),
    telegram_connected_at TIMESTAMP,
    
    -- Subscription Management
    subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
    subscription_started_at TIMESTAMP,
    subscription_expires_at TIMESTAMP,
    
    -- Preferences
    telegram_notifications_enabled BOOLEAN DEFAULT true,
    email_notifications_enabled BOOLEAN DEFAULT false,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login_at TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_telegram_chat_id ON profiles(telegram_chat_id);
CREATE INDEX idx_profiles_tier ON profiles(subscription_tier);

-- ============================================
-- 2. SOURCES (Twitter Accounts to Track)
-- ============================================
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform VARCHAR(50) DEFAULT 'twitter',
    username VARCHAR(100) NOT NULL,
    url TEXT,
    
    -- Health & Status
    is_active BOOLEAN DEFAULT true,
    last_scraped_at TIMESTAMP,
    last_successful_scrape_at TIMESTAMP,
    consecutive_failures INT DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Unique constraint
    UNIQUE(platform, username)
);

CREATE INDEX idx_sources_active ON sources(is_active);
CREATE INDEX idx_sources_username ON sources(username);

-- ============================================
-- 3. SUBSCRIPTIONS (User -> Source Mapping)
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    source_id UUID NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
    
    -- Settings
    is_active BOOLEAN DEFAULT true,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Prevent duplicates
    UNIQUE(user_id, source_id)
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_source_id ON subscriptions(source_id);

-- ============================================
-- 4. NEWS_ITEMS (Processed Tweets)
-- ============================================
CREATE TABLE IF NOT EXISTS news_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
    
    -- Tweet Data
    external_id VARCHAR(100) NOT NULL, -- Twitter tweet ID
    original_text TEXT NOT NULL,
    tweet_url TEXT,
    
    -- AI Analysis Results
    is_news_worthy BOOLEAN DEFAULT false,
    summary_text TEXT, -- JSON array of summary points
    category VARCHAR(50),
    sentiment VARCHAR(20),
    relevance_score FLOAT DEFAULT 0,
    
    -- Timestamps
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Prevent duplicates
    UNIQUE(source_id, external_id)
);

CREATE INDEX idx_news_items_source_id ON news_items(source_id);
CREATE INDEX idx_news_items_newsworthy ON news_items(is_news_worthy);
CREATE INDEX idx_news_items_published ON news_items(published_at DESC);
CREATE INDEX idx_news_items_category ON news_items(category);

-- ============================================
-- 5. NOTIFICATIONS (Delivery Queue)
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    news_item_id UUID NOT NULL REFERENCES news_items(id) ON DELETE CASCADE,
    
    -- Delivery Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'skipped')),
    delivery_channel VARCHAR(20) DEFAULT 'telegram' CHECK (delivery_channel IN ('telegram', 'email', 'web')),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    sent_at TIMESTAMP,
    
    -- Prevent duplicates
    UNIQUE(user_id, news_item_id)
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- ============================================
-- 6. SESSIONS (Web Authentication)
-- ============================================
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_accessed_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);

-- ============================================
-- 7. TELEGRAM_CONNECT_CODES (Temporary Codes)
-- ============================================
CREATE TABLE IF NOT EXISTS telegram_connect_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    code VARCHAR(10) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_connect_codes_code ON telegram_connect_codes(code);
CREATE INDEX idx_connect_codes_user_id ON telegram_connect_codes(user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to sources
DROP TRIGGER IF EXISTS update_sources_updated_at ON sources;
CREATE TRIGGER update_sources_updated_at 
    BEFORE UPDATE ON sources 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VIEWS (Helpful Queries)
-- ============================================

-- Active Premium Users
CREATE OR REPLACE VIEW active_premium_users AS
SELECT 
    id, email, telegram_username, subscription_tier, 
    subscription_expires_at, created_at
FROM profiles
WHERE subscription_tier = 'premium'
  AND (subscription_expires_at IS NULL OR subscription_expires_at > NOW());

-- User Subscription Counts
CREATE OR REPLACE VIEW user_subscription_counts AS
SELECT 
    p.id as user_id,
    p.email,
    p.subscription_tier,
    COUNT(s.id) as total_subscriptions
FROM profiles p
LEFT JOIN subscriptions s ON p.id = s.user_id AND s.is_active = true
GROUP BY p.id, p.email, p.subscription_tier;

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================

-- Test admin user (password: admin123 - bcrypt hash)
-- INSERT INTO profiles (email, password_hash, subscription_tier)
-- VALUES ('admin@haberbot.com', '$2a$10$...hashhere...', 'premium');

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$ 
BEGIN 
    RAISE NOTICE 'Database migration completed successfully!';
    RAISE NOTICE 'Tables created: profiles, sources, subscriptions, news_items, notifications, sessions, telegram_connect_codes';
    RAISE NOTICE 'Next step: Run this script in your Supabase SQL Editor';
END $$;
