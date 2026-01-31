# 🎯 GistAI - AI-Powered Twitter News Filter

> **Get only important news from Twitter with AI-powered filtering. Save time, stay informed.**

[![Live Demo](https://img.shields.io/badge/Live-gistai.net-blue?style=for-the-badge)](https://gistai.net)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)](https://gistai.net)

[English](#english) | [Türkçe](#türkçe) | [Español](#español) | [Deutsch](#deutsch) | [Français](#français)

---

<a name="english"></a>
## 🇬🇧 English

### What is GistAI?

GistAI is an intelligent news filtering platform that uses **Google Gemini AI** to analyze Twitter feeds and delivers only newsworthy content via **Telegram notifications**. No more scrolling through endless tweets - get straight to what matters.

### ✨ Features

- 🤖 **AI-Powered Filtering** - Google Gemini analyzes tweets for newsworthiness
- 📱 **Telegram Notifications** - Instant push notifications for important news
- 🎯 **Smart Tracking** - Follow up to 2 accounts free, unlimited with Premium ($19/mo)
- 🌍 **Multi-Language** - English, Turkish, Spanish, German, French
- ⚡ **Real-Time** - 15-minute refresh cycle
- 🔒 **Secure Auth** - Google OAuth & Telegram login
- 💳 **Simple Pricing** - Free tier or Premium ($19/month)

### 🛠️ Tech Stack

```
Backend:        Node.js, Express.js
Database:       PostgreSQL (Supabase)
AI:             Google Gemini 1.5 Flash
Authentication: Passport.js (Google OAuth, Telegram)
Notifications:  Telegram Bot API
Payments:       Gumroad
Hosting:        Render
Domain:         gistai.net
```

### 📦 Quick Start

```bash
# Clone repository
git clone https://github.com/Subutayy-Boran/GistAI.git
cd GistAI

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Run
npm start
```

### 🔑 Environment Variables

```env
DATABASE_URL=your_postgresql_url
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
GEMINI_API_KEY=your_google_gemini_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
SESSION_SECRET=random_32_char_string
APP_URL=http://localhost:3000
```

### 📄 License

MIT License - see [LICENSE](LICENSE)

### 📧 Contact

- **Website**: [gistai.net](https://gistai.net)
- **Email**: support@gistai.net
- **GitHub**: [@Subutayy-Boran](https://github.com/Subutayy-Boran)

---

<a name="türkçe"></a>
## 🇹🇷 Türkçe

### GistAI Nedir?

GistAI, **Google Gemini yapay zekası** kullanarak Twitter akışlarını analiz eden ve yalnızca haber değeri taşıyan içeriği **Telegram bildirimleri** ile ileten akıllı bir haber filtreleme platformudur. Artık sonsuz tweet'ler arasında kaymaya gerek yok - doğrudan önemli olana ulaşın.

### ✨ Özellikler

- 🤖 **AI Destekli Filtreleme** - Google Gemini, tweet'lerin haber değerini analiz eder
- 📱 **Telegram Bildirimleri** - Önemli haberler için anlık bildirimleri
- 🎯 **Akıllı Takip** - Ücretsiz 2 hesap, Premium ile sınırsız (ayda $19)
- 🌍 **Çok Dilli** - İngilizce, Türkçe, İspanyolca, Almanca, Fransızca
- ⚡ **Gerçek Zamanlı** - 15 dakikalık yenileme döngüsü
- 🔒 **Güvenli Giriş** - Google OAuth & Telegram girişi
- 💳 **Basit Fiyatlandırma** - Ücretsiz veya Premium (ayda $19)

### 🛠️ Teknoloji

```
Backend:        Node.js, Express.js
Veritabanı:     PostgreSQL (Supabase)
AI:             Google Gemini 1.5 Flash
Kimlik Doğ.:    Passport.js (Google OAuth, Telegram)
Bildirimler:    Telegram Bot API
Ödemeler:       Gumroad
Hosting:        Render
Domain:         gistai.net
```

### 📦 Hızlı Başlangıç

```bash
# Repository'yi klonla
git clone https://github.com/Subutayy-Boran/GistAI.git
cd GistAI

# Bağımlılıkları yükle
npm install

# Ortam değişkenlerini ayarla
cp .env.example .env
# .env dosyasına API anahtarlarını ekle

# Çalıştır
npm start
```

### 📄 Lisans

MIT Lisansı - detaylar için [LICENSE](LICENSE) dosyasına bakın

### 📧 İletişim

- **Website**: [gistai.net](https://gistai.net)
- **E-posta**: support@gistai.net
- **GitHub**: [@Subutayy-Boran](https://github.com/Subutayy-Boran)

---

<a name="español"></a>
## 🇪🇸 Español

### ¿Qué es GistAI?

GistAI es una plataforma inteligente de filtrado de noticias que utiliza **Google Gemini AI** para analizar feeds de Twitter y entrega solo contenido de interés periodístico mediante **notificaciones de Telegram**. No más desplazamiento infinito - ve directo a lo importante.

### ✨ Características

- 🤖 **Filtrado con IA** - Google Gemini analiza tweets por valor periodístico
- 📱 **Notificaciones Telegram** - Notificaciones push instantáneas
- 🎯 **Seguimiento Inteligente** - Hasta 2 cuentas gratis, ilimitadas con Premium ($19/mes)
- 🌍 **Multiidioma** - Inglés, Turco, Español, Alemán, Francés
- ⚡ **Tiempo Real** - Ciclo de actualización de 15 minutos
- 🔒 **Autenticación Segura** - Google OAuth & Telegram
- 💳 **Precios Simples** - Gratis o Premium ($19/mes)

### 🛠️ Stack Tecnológico

```
Backend:        Node.js, Express.js
Base de Datos:  PostgreSQL (Supabase)
IA:             Google Gemini 1.5 Flash
Autenticación:  Passport.js (Google OAuth, Telegram)
Notificaciones: Telegram Bot API
Pagos:          Gumroad
Hosting:        Render
Dominio:        gistai.net
```

### 📄 Licencia

Licencia MIT - ver [LICENSE](LICENSE)

### 📧 Contacto

- **Sitio web**: [gistai.net](https://gistai.net)
- **Email**: support@gistai.net
- **GitHub**: [@Subutayy-Boran](https://github.com/Subutayy-Boran)

---

<a name="deutsch"></a>
## 🇩🇪 Deutsch

### Was ist GistAI?

GistAI ist eine intelligente Nachrichtenfilterplattform, die **Google Gemini KI** verwendet, um Twitter-Feeds zu analysieren und nur nachrichtenwürdige Inhalte über **Telegram-Benachrichtigungen** liefert. Kein endloses Scrollen mehr - gehen Sie direkt zum Wichtigen.

### ✨ Funktionen

- 🤖 **KI-gestützte Filterung** - Google Gemini analysiert Tweets auf Nachrichtenwert
- 📱 **Telegram-Benachrichtigungen** - Sofortige Push-Benachrichtigungen
- 🎯 **Intelligentes Tracking** - Bis zu 2 Konten kostenlos, unbegrenzt mit Premium ($19/Monat)
- 🌍 **Mehrsprachig** - Englisch, Türkisch, Spanisch, Deutsch, Französisch
- ⚡ **Echtzeit** - 15-Minuten-Aktualisierungszyklus
- 🔒 **Sichere Authentifizierung** - Google OAuth & Telegram
- 💳 **Einfache Preise** - Kostenlos oder Premium ($19/Monat)

### 🛠️ Technologie-Stack

```
Backend:        Node.js, Express.js
Datenbank:      PostgreSQL (Supabase)
KI:             Google Gemini 1.5 Flash
Authentifizierung: Passport.js (Google OAuth, Telegram)
Benachrichtigungen: Telegram Bot API
Zahlungen:      Gumroad
Hosting:        Render
Domain:         gistai.net
```

### 📄 Lizenz

MIT-Lizenz - siehe [LICENSE](LICENSE)

### 📧 Kontakt

- **Website**: [gistai.net](https://gistai.net)
- **E-Mail**: support@gistai.net
- **GitHub**: [@Subutayy-Boran](https://github.com/Subutayy-Boran)

---

<a name="français"></a>
## 🇫🇷 Français

### Qu'est-ce que GistAI ?

GistAI est une plateforme intelligente de filtrage d'actualités qui utilise **Google Gemini IA** pour analyser les flux Twitter et ne diffuse que le contenu digne d'intérêt via des **notifications Telegram**. Plus besoin de faire défiler indéfiniment - allez directement à l'essentiel.

### ✨ Fonctionnalités

- 🤖 **Filtrage par IA** - Google Gemini analyse les tweets pour leur valeur informative
- 📱 **Notifications Telegram** - Notifications push instantanées
- 🎯 **Suivi Intelligent** - Jusqu'à 2 comptes gratuits, illimités avec Premium (19$/mois)
- 🌍 **Multilingue** - Anglais, Turc, Espagnol, Allemand, Français
- ⚡ **Temps Réel** - Cycle de rafraîchissement de 15 minutes
- 🔒 **Authentification Sécurisée** - Google OAuth & Telegram
- 💳 **Tarifs Simples** - Gratuit ou Premium (19$/mois)

### 🛠️ Stack Technique

```
Backend:        Node.js, Express.js
Base de données: PostgreSQL (Supabase)
IA:             Google Gemini 1.5 Flash
Authentification: Passport.js (Google OAuth, Telegram)
Notifications:  Telegram Bot API
Paiements:      Gumroad
Hébergement:    Render
Domaine:        gistai.net
```

### 📄 Licence

Licence MIT - voir [LICENSE](LICENSE)

### 📧 Contact

- **Site web**: [gistai.net](https://gistai.net)
- **Email**: support@gistai.net
- **GitHub**: [@Subutayy-Boran](https://github.com/Subutayy-Boran)

---

## 🏆 Roadmap

- [x] **Phase 0: MVP Launch** (January 2026)
  - [x] Google & Telegram Authentication
  - [x] AI-powered content filtering
  - [x] Telegram notifications
  - [x] Premium subscription
  - [x] Multi-language support (5 languages)
  - [x] Custom domain (gistai.net)
  
- [ ] **Phase 1: Enhanced Filtering** (Q1 2026)
  - [ ] Category filters (Tech, Finance, Politics, etc.)
  - [ ] Custom AI prompts
  - [ ] News importance scoring
  
- [ ] **Phase 2: Multi-Channel** (Q2 2026)
  - [ ] Email notifications
  - [ ] Discord integration
  - [ ] WhatsApp support
  
- [ ] **Phase 3: Mobile** (Q3 2026)
  - [ ] iOS app
  - [ ] Android app
  - [ ] Push notifications

---

**Built with ❤️ by the GistAI Team**

⭐ **Star this repo if you find it useful!**
