require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

const schema = `
-- KULLANICILAR VE PROFİLLER
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  telegram_chat_id text,
  is_premium boolean default false,
  api_usage_count int default 0,
  created_at timestamptz default now()
);

-- TAKİP EDİLECEK KAYNAKLAR (Merkezi Liste)
create table if not exists sources (
  id uuid default gen_random_uuid() primary key,
  platform text not null, -- 'twitter', 'linkedin'
  username text not null, -- 'elonmusk'
  url text not null,
  last_scraped_at timestamptz,
  scrape_frequency_minutes int default 60,
  is_active boolean default true,
  unique (platform, username)
);

-- KULLANICI ABONELİKLERİ
create table if not exists subscriptions (
  user_id uuid references profiles(id),
  source_id uuid references sources(id),
  created_at timestamptz default now(),
  primary key (user_id, source_id)
);

-- İŞLENMİŞ HABERLER / ÖZETLER
create table if not exists news_items (
  id uuid default gen_random_uuid() primary key,
  source_id uuid references sources(id),
  external_id text not null, -- Tweet ID vb.
  original_text text,
  is_news_worthy boolean default false,
  summary_text text,
  category text,
  relevance_score int,
  published_at timestamptz,
  created_at timestamptz default now(),
  unique (source_id, external_id)
);

-- BİLDİRİM KUYRUĞU
create table if not exists notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  news_item_id uuid references news_items(id),
  status text default 'pending',
  sent_at timestamptz
);
`;

async function main() {
    try {
        console.log('Veritabanına bağlanılıyor...');
        await client.connect();
        console.log('Bağlantı başarılı. Tablolar oluşturuluyor...');

        await client.query(schema);

        console.log('Tablolar başarıyla oluşturuldu (veya zaten vardı).');
    } catch (err) {
        console.error('Hata:', err);
    } finally {
        await client.end();
    }
}

main();
