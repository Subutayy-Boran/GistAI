require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function main() {
    try {
        await client.connect();
        console.log('Veritabanına bağlanıldı. Foreign Key constraint kontrol ediliyor...');

        // Constraint ismini bulmaya çalışalım veya direkt drop edelim.
        // profiles_id_fkey genelde varsayılandır.

        const query = `
      DO $$ 
      BEGIN 
        IF EXISTS (SELECT 1 
                   FROM information_schema.table_constraints 
                   WHERE constraint_name = 'profiles_id_fkey') THEN 
          ALTER TABLE profiles DROP CONSTRAINT profiles_id_fkey;
          RAISE NOTICE 'profiles_id_fkey silindi.';
        ELSE
          RAISE NOTICE 'Constraint bulunamadı veya daha önce silinmiş.';
        END IF;
      END $$;
    `;

        await client.query(query);
        console.log('İşlem tamamlandı.');

        // Ayrıca id sütunu için default gen_random_uuid() tanımlayalım ki biz göndermek zorunda kalmayalım (opsiyonel)
        // ALTER TABLE profiles ALTER COLUMN id SET DEFAULT gen_random_uuid();

        // Ama biz JS tarafında UUID üretiyoruz şimdilik, sorun yok.

    } catch (err) {
        console.error('Hata:', err);
    } finally {
        await client.end();
    }
}

main();
