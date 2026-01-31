-- Add new AI analysis columns to news_items table
-- Run this in Supabase SQL Editor after upgrading AI system

ALTER TABLE news_items
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS importance_score INTEGER DEFAULT 5;

-- Update existing records with default title
UPDATE news_items
SET title = 'News Update'
WHERE title IS NULL;

-- Create index for importance filtering
CREATE INDEX IF NOT EXISTS idx_news_items_importance ON news_items(importance_score DESC);

-- Show success message
DO $$ 
BEGIN 
    RAISE NOTICE 'Migration completed! Added title and importance_score columns.';
END $$;
