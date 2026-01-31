/**
 * GistAI Internationalization (i18n)
 * Supported Languages: EN, TR, ES, DE, FR
 */

const translations = {
    en: {
        // Meta
        lang: 'en',
        langName: 'English',

        // Navigation
        nav: {
            features: 'Features',
            pricing: 'Pricing',
            faq: 'FAQ',
            login: 'Login',
            start: 'Get Started',
            howItWorks: 'How it Works'
        },
        auth: {
            welcomeBack: 'Welcome Back',
            loginSubtitle: 'Login to your account to continue',
            email: 'Email',
            password: 'Password',
            forgotPassword: 'Forgot password?',
            loginBtn: 'Login',
            noAccount: 'Don\'t have an account?',
            signUp: 'Sign Up',
            createAccount: 'Create Account',
            createSubtitle: 'Start getting filtered news today',
            confirmPassword: 'Confirm Password',
            createBtn: 'Create Account',
            hasAccount: 'Already have an account?',
            resetTitle: 'Reset Password',
            resetSubtitle: 'Enter your email to receive reset instructions',
            sendLink: 'Send Reset Link',
            rememberPassword: 'Remember password?',
            passwordsNoMatch: 'Passwords do not match',
            creating: 'Creating account...',
            loggingIn: 'Logging in...',
            sending: 'Sending...'
        },
        dashboard: {
            newsFeed: 'News Feed',
            subscriptions: 'Subscriptions',
            settings: 'Settings',
            logout: 'Logout',
            freePlan: 'Free Plan',
            upgrade: 'Upgrade',
            slotsUsed: 'slots used',
            refresh: 'Refresh',
            addNew: 'Add New',
            addNewTitle: 'Add New Subscription',
            twitterUsername: 'Twitter Username',
            ensurePublic: 'Ensure the account is public.',
            cancel: 'Cancel',
            add: 'Add',
            adding: 'Adding...',
            remove: 'Remove',
            confirmRemove: 'Are you sure you want to remove this subscription?',
            emptyNewsTitle: 'No news yet',
            emptyNewsDesc: 'Add Twitter accounts to your watchlist and news will start appearing here!',
            freePlanLimit: 'Free Plan Limit Reached (2/2)',
            addFollow: 'Add Follow',
            emptySubsTitle: 'You are not following anyone yet',
            emptySubsDesc: 'Follow Twitter accounts and get notified of important news!',
            addFirstFollow: 'Add First Follow',
            planStatus: 'Current Plan:',
            connectTelegram: 'Connect Telegram',
            connectTelegramDesc: 'Connect your Telegram account to receive instant news notifications.',
            connectedAs: 'Connected as',
            startBot: 'Start the bot',
            enterCode: 'Click the button below to generate a code',
            sendCode: 'Send',
            generateCode: 'Generate Connection Code',
            yourCode: 'Your Code:',
            validFor: 'Valid for 10 minutes',
            newCode: 'Generate New Code',
            generating: 'Generating code...',
            newsSource: 'News Source',
            timeAgo: {
                justNow: 'Just now',
                minAgo: 'min ago',
                hourAgo: 'h ago',
                dayAgo: 'd ago',
                monthAgo: 'mo ago',
                yearAgo: 'y ago'
            },
            subscriptionPlan: 'Subscription Plan',
            currentPlan: 'Current Plan: ',
            free: 'Free',
            upgradePremiumDesc: 'Upgrade to Premium for unlimited accounts, advanced analysis and more.',
            unlimitedTwitter: 'Unlimited Twitter accounts',
            categoryFiltering: 'Category filtering',
            premiumSupport: 'Premium support',
            upgradeToPremium: 'Upgrade to Premium',
            securePayment: 'Secure payment via Gumroad',
            onTelegram: 'on Telegram',
            clickButtonGenerateCode: 'Click the button below to generate a code',
            sendCodeToBot: 'Send',
            toTheBot: 'to the bot',
            upgradeTitle: 'Upgrade to Premium',
            upgradeModalDesc: 'You\'ve reached the free limit of 2 accounts. Upgrade to Premium for unlimited tracking and advanced AI features.',
            maybeLater: 'Maybe Later',
            // Premium Modal (Enhanced)
            premiumModalTitle: 'Upgrade to Premium',
            premiumLimitReached: 'Free Limit Reached',
            premiumUnlimitedDesc: 'Upgrade to Premium for unlimited tracking',
            premiumFree: 'Free',
            premiumPremium: 'Premium',
            premiumAccounts: 'Accounts',
            premiumUnlimited: 'Unlimited',
            premiumFeatureUnlimited: 'Unlimited Tracking',
            premiumFeatureAI: 'Advanced AI Filtering',
            premiumFeatureSupport: 'Priority Support',
            premiumFeatureCategory: 'Category Filtering',
            premiumCTA: 'Upgrade to Premium - $19/mo',
            premiumMaybeLater: 'Maybe Later'
        },

        // Legal Pages
        legal: {
            backHome: '← Back to Home',
            termsTitle: 'Terms of Service',
            privacyTitle: 'Privacy Policy',
            lastUpdated: 'Last Updated',
            // Terms content keys (simplified, full text is in HTML)
            terms: {
                acceptance: { title: '1. Acceptance of Terms', content: 'By accessing and using GistAI...' },
                description: { title: '2. Description of Service', content: 'GistAI is an AI-powered...' }
            },
            // Privacy content keys  
            privacy: {
                intro: { title: '1. Introduction', content: 'GistAI is committed to protecting...' },
                collect: {
                    title: '2. Information We Collect',
                    account: { title: '2.1 Account Information', email: 'Email address (if registering via email)', google: 'Google account email (if using Google OAuth)', telegram: 'Telegram user ID and username (if using Telegram auth)', password: 'Password (encrypted) for email registrations' }
                },
                contact: { address: 'Address' }
            }
        },

        // Hero
        hero: {
            badge: 'BETA - Early Access',
            title: 'Get Only <span class="gradient-text">Important News</span> from Twitter',
            subtitle: 'Save time with AI-powered filtering, stay away from noise. Catch only the tweets that matter to you instantly.',
            cta: 'Get Started - Free',
            trust: 'No credit card required • Start in 2 minutes'
        },

        // Stats
        stats: {
            response: 'Response Time',
            aiPowered: 'AI-Powered',
            users: 'Early Users'
        },

        // Features
        features: {
            title: 'Why <span class="gradient-text">GistAI</span>?',
            subtitle: 'Get maximum value from Twitter with modern AI technology',
            ai: {
                title: 'AI-Powered Filtering',
                desc: 'Every tweet is analyzed with Google Gemini 1.5 Flash. Only truly newsworthy content reaches you. Automatically removes noise.',
                tags: ['GPT-4 Level', 'Real-time', '99% Accuracy']
            },
            instant: {
                title: 'Instant Notifications',
                desc: 'Important news reaches you via Telegram within 15 minutes. Never miss anything.'
            },
            smart: {
                title: 'Smart Summaries',
                desc: 'Long tweet threads summarized in 3 points. Save time.'
            },
            category: {
                title: 'Category Filtering',
                desc: 'Tech, Finance, Politics - get only what interests you.'
            },
            hybrid: {
                title: 'Telegram + Web',
                desc: 'Access from anywhere with hybrid approach.'
            },
            secure: {
                title: 'Completely Secure',
                desc: 'Your data is encrypted, privacy is our priority.'
            }
        },

        // How it works
        howItWorks: {
            title: 'How It Works?',
            subtitle: 'Get started in 3 simple steps',
            step1: {
                title: 'Sign Up',
                desc: 'Create a free account with email. No credit card required, ready in 2 minutes.'
            },
            step2: {
                title: 'Add Twitter Accounts',
                desc: 'Add accounts you want to follow from dashboard. Free: 2, Premium: Unlimited.'
            },
            step3: {
                title: 'Connect Telegram',
                desc: 'Start the bot, enter the code. Start receiving news immediately!'
            },
            cta: 'Start Now →'
        },

        // Pricing
        pricing: {
            title: 'Simple and Transparent <span class="gradient-text">Pricing</span>',
            subtitle: 'Start small, upgrade as you grow',
            free: {
                name: 'Free',
                price: '0',
                currency: '$',
                period: '/month',
                desc: 'Perfect for getting started',
                features: [
                    '2 Twitter accounts',
                    'AI filtering',
                    'Telegram notifications',
                    'Web dashboard',
                    'Basic summaries'
                ],
                cta: 'Start Free'
            },
            premium: {
                badge: 'Most Popular',
                name: 'Premium',
                price: '19',
                currency: '$',
                period: '/month',
                desc: 'Full power, unlimited access',
                features: [
                    '<strong>Unlimited</strong> Twitter accounts',
                    'Advanced AI analysis',
                    'Category filtering',
                    'Priority notifications',
                    'Detailed archive',
                    'Premium support'
                ],
                cta: 'Go Premium'
            },
            note: 'No credit card required • Cancel anytime'
        },

        // FAQ
        faq: {
            title: 'Frequently Asked Questions',
            items: [
                {
                    q: 'What does beta version mean?',
                    a: 'GistAI is in early access. We\'re working with realistic demo data to prove the system works and collect user feedback. We\'ll integrate the real Twitter API when we reach 50 users.'
                },
                {
                    q: 'How do I use the payment system?',
                    a: 'You can purchase the Premium plan through Gumroad. Gumroad integrates with Stripe and PayPal for secure payment. You can cancel your subscription anytime.'
                },
                {
                    q: 'Is the data real?',
                    a: 'Currently (beta phase) we use realistic demo news. This allows end-to-end system testing and AI filtering algorithm optimization. Real tweet integration will come after the first 50 users.'
                },
                {
                    q: 'Can I upgrade from Free to Premium?',
                    a: 'Yes! You can upgrade to Premium anytime from Dashboard > Profile. Your existing follows are preserved and unlimited account tracking activates immediately.'
                },
                {
                    q: 'What is the roadmap?',
                    a: '<strong>Now (Beta):</strong> System testing with demo data<br><strong>50 users:</strong> Real Twitter API integration<br><strong>500 users:</strong> Category filtering, email notifications<br><strong>1000+ users:</strong> Mobile app, team plans, enterprise features'
                },
                {
                    q: 'I have other questions',
                    a: 'You can contact us via our Telegram bot (@GistAI_bot) or email. We provide priority support for beta users!'
                }
            ]
        },

        // CTA
        cta: {
            title: 'Break Free from News Noise',
            subtitle: 'Setup in minutes and start receiving your first news.',
            button: 'Create Free Account'
        },

        // Support
        support: {
            title: 'Need <span class="gradient-text">Help</span>?',
            subtitle: 'We\'re here to help you get the most out of GistAI',
            telegram: {
                title: 'Telegram Bot',
                desc: 'Get instant support through our Telegram bot. Available 24/7.'
            },
            feedback: {
                title: 'Send Feedback',
                desc: 'Have suggestions or found a bug? We\'d love to hear from you!',
                button: 'Open Feedback Form'
            },
            email: {
                title: 'Email Us',
                desc: 'For business inquiries or detailed support requests.'
            },
            response: 'Average response time: < 24 hours'
        },

        // Footer
        footer: {
            desc: 'AI-powered Twitter news tracking platform.',
            copyright: '© 2026 GistAI. All rights reserved.'
        }
    },

    tr: {
        lang: 'tr',
        langName: 'Türkçe',
        nav: {
            features: 'Özellikler',
            pricing: 'Fiyatlar',
            faq: 'SSS',
            login: 'Giriş',
            start: 'Başla',
            howItWorks: 'Nasıl Çalışır?'
        },
        auth: {
            welcomeBack: 'Tekrar Hoşgeldiniz',
            loginSubtitle: 'Devam etmek için giriş yapın',
            email: 'E-posta',
            password: 'Şifre',
            forgotPassword: 'Şifremi unuttum?',
            loginBtn: 'Giriş Yap',
            noAccount: 'Hesabınız yok mu?',
            signUp: 'Kayıt Ol',
            createAccount: 'Hesap Oluştur',
            createSubtitle: 'Filtrelenmiş haberleri almaya bugün başlayın',
            confirmPassword: 'Şifre Tekrar',
            createBtn: 'Hesap Oluştur',
            hasAccount: 'Zaten hesabınız var mı?',
            resetTitle: 'Şifre Sıfırla',
            resetSubtitle: 'Sıfırlama talimatları için e-posta adresinizi girin',
            sendLink: 'Sıfırlama Linki Gönder',
            rememberPassword: 'Şifreyi hatırladınız mı?',
            passwordsNoMatch: 'Şifreler eşleşmiyor',
            creating: 'Oluşturuluyor...',
            loggingIn: 'Giriş yapılıyor...',
            sending: 'Gönderiliyor...'
        },
        dashboard: {
            newsFeed: 'Haber Akışı',
            subscriptions: 'Abonelikler',
            settings: 'Ayarlar',
            logout: 'Çıkış',
            freePlan: 'Ücretsiz Plan',
            upgrade: 'Yükselt',
            slotsUsed: 'slot kullanıldı',
            refresh: 'Yenile',
            addNew: 'Yeni Ekle',
            addNewTitle: 'Yeni Takip Ekle',
            twitterUsername: 'Twitter Kullanıcı Adı',
            ensurePublic: 'Hesabın herkese açık olduğundan emin olun.',
            cancel: 'İptal',
            add: 'Ekle',
            adding: 'Ekleniyor...',
            remove: 'Sil',
            confirmRemove: 'Bu takibi silmek istediğinizden emin misiniz?',
            emptyNewsTitle: 'Henüz haber yok',
            emptyNewsDesc: 'Takip listenize Twitter hesapları ekleyin, haberler burada görünmeye başlasın!',
            freePlanLimit: 'Ücretsiz Plan Limiti Aşıldı (2/2)',
            addFollow: 'Takip Ekle',
            emptySubsTitle: 'Henüz kimseyi takip etmiyorsunuz',
            emptySubsDesc: 'Twitter hesaplarını takibe alın ve önemli haberlerden haberdar olun!',
            addFirstFollow: 'İlk Takibi Ekle',
            planStatus: 'Mevcut Plan:',
            connectTelegram: 'Telegram\'ı Bağla',
            connectTelegramDesc: 'Anlık haber bildirimleri almak için Telegram hesabınızı bağlayın.',
            connectedAs: 'Bağlı hesap:',
            startBot: 'Telegram\'da botu başlatın',
            enterCode: 'Kod oluşturmak için aşağıdaki butona tıklayın',
            sendCode: 'Bot\'a gönderin',
            generateCode: 'Bağlantı Kodu Oluştur',
            yourCode: 'Kodunuz:',
            validFor: '10 dakika geçerli',
            newCode: 'Yeni Kod Oluştur',
            generating: 'Oluşturuluyor...',
            newsSource: 'Haber Kaynağı',
            timeAgo: {
                justNow: 'Az önce',
                minAgo: 'dk önce',
                hourAgo: 'saat önce',
                dayAgo: 'gün önce',
                monthAgo: 'ay önce',
                yearAgo: 'yıl önce'
            },
            subscriptionPlan: 'Abonelik Planı',
            currentPlan: 'Mevcut Plan: ',
            free: 'Ücretsiz',
            upgradePremiumDesc: 'Sınırsız hesap, gelişmiş analiz ve daha fazlası için Premium\'a geçin.',
            unlimitedTwitter: 'Sınırsız Twitter hesabı',
            categoryFiltering: 'Kategori filtreleme',
            premiumSupport: 'Premium destek',
            upgradeToPremium: 'Premium\'a Yükselt',
            securePayment: 'Gumroad ile güvenli ödeme',
            onTelegram: 'Telegram üzerinde',
            clickButtonGenerateCode: 'Kod oluşturmak için aşağıdaki butona tıklayın',
            sendCodeToBot: 'Bot\'a gönder:',
            toTheBot: '',
            upgradeTitle: 'Premium\'a Yükselt',
            upgradeModalDesc: 'Ücretsiz 2 hesap limitine ulaştınız. Sınırsız takip ve gelişmiş AI özellikleri için Premium\'a yükseltin.',
            maybeLater: 'Belki Sonra',
            // Premium Modal (Enhanced)
            premiumModalTitle: 'Premium\'a Geçin',
            premiumLimitReached: 'Ücretsiz Limit Doldu',
            premiumUnlimitedDesc: 'Premium ile sınırsız takip yapın',
            premiumFree: 'Ücretsiz',
            premiumPremium: 'Premium',
            premiumAccounts: 'Hesap',
            premiumUnlimited: 'Sınırsız',
            premiumFeatureUnlimited: 'Sınırsız Takip',
            premiumFeatureAI: 'Gelişmiş AI Filtreleme',
            premiumFeatureSupport: 'Öncelikli Destek',
            premiumFeatureCategory: 'Kategori Filtreleme',
            premiumCTA: 'Premium\'a Geç - $19/ay',
            premiumMaybeLater: 'Belki Sonra'
        },

        // Legal Pages
        legal: {
            backHome: '← Ana Sayfaya Dön',
            termsTitle: 'Kullanım Koşulları',
            privacyTitle: 'Gizlilik Politikası',
            lastUpdated: 'Son Güncelleme',
            // Terms content keys (simplified, full text is in HTML)
            terms: {
                acceptance: { title: '1. Koşulların Kabulü', content: 'GistAI\'a erişerek ve kullanarak...' },
                description: { title: '2. Hizmet Açıklaması', content: 'GistAI, AI destekli...' }
            },
            // Privacy content keys  
            privacy: {
                intro: { title: '1. Giriş', content: 'GistAI gizliliğinizi korumaya...' },
                collect: {
                    title: '2. Topladığımız Bilgiler',
                    account: { title: '2.1 Hesap Bilgileri', email: 'E-posta adresi (e-posta ile kayıt olunursa)', google: 'Google hesap e-postası (Google OAuth kullanılırsa)', telegram: 'Telegram kullanıcı kimliği ve kullanıcı adı (Telegram kimlik doğrulama kullanılırsa)', password: 'Şifre (şifrelenmiş) e-posta kayıtları için' }
                },
                contact: { address: 'Adres' }
            }
        },
        hero: {
            badge: 'BETA - Erken Erişim',
            title: 'Twitter\'dan Sadece <span class="gradient-text">Önemli Haberleri</span> Al',
            subtitle: 'AI destekli filtreleme ile zaman kazanın, gürültüden uzak durun. Yalnızca sizin için önemli olan tweet\'leri anında yakalayın.',
            cta: 'Hemen Başla - Ücretsiz',
            trust: 'Kredi kartı gerekmez • 2 dakikada başla'
        },
        stats: {
            response: 'Yanıt Süresi',
            aiPowered: 'AI-Powered',
            users: 'Erken Kullanıcı'
        },
        features: {
            title: 'Neden <span class="gradient-text">GistAI</span>?',
            subtitle: 'Modern AI teknolojisiyle Twitter\'dan maksimum değer alın',
            ai: {
                title: 'AI-Powered Filtreleme',
                desc: 'Google Gemini 1.5 Flash ile her tweet analiz edilir. Sadece gerçekten haber değeri taşıyan içerikler size ulaşır. Gürültüyü otomatik kaldırır.',
                tags: ['GPT-4 Level', 'Real-time', '99% Accuracy']
            },
            instant: {
                title: 'Anlık Bildirimler',
                desc: 'Önemli haberler 15 dakika içinde Telegram\'dan size ulaşır. Hiçbir şeyi kaçırmayın.'
            },
            smart: {
                title: 'Akıllı Özetler',
                desc: 'Uzun tweet thread\'leri 3 maddede özetlenir. Zamandan tasarruf edin.'
            },
            category: {
                title: 'Kategori Filtreleme',
                desc: 'Tech, Finance, Politics - sadece ilginizi çekeni alın.'
            },
            hybrid: {
                title: 'Telegram + Web',
                desc: 'Hybrid yaklaşımla her yerden erişin.'
            },
            secure: {
                title: 'Tamamen Güvenli',
                desc: 'Verileriniz şifrelenir, gizlilik önceliğimiz.'
            }
        },
        howItWorks: {
            title: 'Nasıl Çalışır?',
            subtitle: '3 basit adımda başlayın',
            step1: {
                title: 'Kayıt Ol',
                desc: 'Email ile ücretsiz hesap oluştur. Kredi kartı gerekmez, 2 dakikada hazır.'
            },
            step2: {
                title: 'Twitter Hesapları Ekle',
                desc: 'Takip etmek istediğin hesapları dashboard\'dan ekle. Free: 2, Premium: Sınırsız.'
            },
            step3: {
                title: 'Telegram\'ı Bağla',
                desc: 'Botunu başlat, kodu gir. Hemen haber almaya başla!'
            },
            cta: 'Şimdi Başla →'
        },
        pricing: {
            title: 'Basit ve Şeffaf <span class="gradient-text">Fiyatlandırma</span>',
            subtitle: 'Küçük başla, büyüdükçe yükselt',
            free: {
                name: 'Free',
                price: '0',
                currency: '₺',
                period: '/ay',
                desc: 'Başlamak için mükemmel',
                features: [
                    '2 Twitter hesabı',
                    'AI filtreleme',
                    'Telegram bildirimleri',
                    'Web dashboard',
                    'Temel özetler'
                ],
                cta: 'Ücretsiz Başla'
            },
            premium: {
                badge: 'En Popüler',
                name: 'Premium',
                price: '19',
                currency: '$',
                period: '/ay',
                desc: 'Tam güç, sınırsız erişim',
                features: [
                    '<strong>Sınırsız</strong> Twitter hesabı',
                    'Gelişmiş AI analizi',
                    'Kategori filtreleme',
                    'Öncelikli bildirimler',
                    'Detaylı arşiv',
                    'Premium destek'
                ],
                cta: 'Premium\'a Geç'
            },
            note: 'Kredi kartı bilgisi gerekmez • İstediğin zaman iptal et'
        },
        faq: {
            title: 'Sıkça Sorulan Sorular',
            items: [
                {
                    q: 'Beta sürümü ne anlama geliyor?',
                    a: 'GistAI henüz erken erişim aşamasında. Sistemin çalıştığını kanıtlamak ve kullanıcı feedbacki toplamak için gerçekçi demo verilerle çalışıyoruz. İlk 50 kullanıcıya ulaştığımızda gerçek Twitter API entegrasyonunu yapacağız.'
                },
                {
                    q: 'Ödeme sistemini nasıl kullanırım?',
                    a: 'Premium planı Gumroad üzerinden satın alabilirsiniz. Gumroad güvenli ödeme işlemi için Stripe ve PayPal ile entegre çalışır. İstediğiniz zaman aboneliğinizi iptal edebilirsiniz.'
                },
                {
                    q: 'Veriler gerçek mi?',
                    a: 'Şu anda (beta aşaması) gerçekçi demo haberler kullanıyoruz. Bu sayede sistem end-to-end test edilir ve AI filtreleme algoritmasını optimize ediyoruz. Gerçek tweet entegrasyonu ilk 50 kullanıcıdan sonra devreye girecek.'
                },
                {
                    q: 'Free tier\'dan Premium\'a geçebilir miyim?',
                    a: 'Evet! İstediğiniz zaman Dashboard > Profil sekmesinden Premium\'a yükseltme yapabilirsiniz. Mevcut takipleriniz korunur ve hemen sınırsız hesap takibi aktif olur.'
                },
                {
                    q: 'Roadmap nedir?',
                    a: '<strong>Şimdi (Beta):</strong> Demo data ile sistem testi<br><strong>50 kullanıcı:</strong> Gerçek Twitter API entegrasyonu<br><strong>500 kullanıcı:</strong> Kategori filtreleme, email notifications<br><strong>1000+ kullanıcı:</strong> Mobile app, team plans, enterprise features'
                },
                {
                    q: 'Başka sorularım var',
                    a: 'Telegram botumuz üzerinden (@GistAI_bot) veya email ile bizimle iletişime geçebilirsiniz. Beta kullanıcılarına öncelikli destek sağlıyoruz!'
                }
            ]
        },
        cta: {
            title: 'Haber Kirliliğinden Kurtul',
            subtitle: 'Dakikalar içinde kurulum yapıp ilk haberlerini almaya başla.',
            button: 'Ücretsiz Hesap Oluştur'
        },
        support: {
            title: '<span class="gradient-text">Yardıma</span> mı İhtiyacın Var?',
            subtitle: 'GistAI\'dan en iyi şekilde yararlanman için buradayız',
            telegram: {
                title: 'Telegram Bot',
                desc: 'Telegram botumuz üzerinden anında destek al. 7/24 açık.'
            },
            feedback: {
                title: 'Geri Bildirim Gönder',
                desc: 'Önerilerin veya bir hata mı buldun? Senden duymak isteriz!',
                button: 'Geri Bildirim Formu'
            },
            email: {
                title: 'E-posta Gönder',
                desc: 'İş birlikleri veya detaylı destek talepleri için.'
            },
            response: 'Ortalama yanıt süresi: < 24 saat'
        },
        footer: {
            desc: 'AI destekli Twitter haber takip platformu.',
            copyright: '© 2026 GistAI. Tüm hakları saklıdır.'
        }
    },

    es: {
        lang: 'es',
        langName: 'Español',
        auth: {
            welcomeBack: 'Bienvenido de nuevo',
            loginSubtitle: 'Inicia sesión para continuar',
            email: 'Correo electrónico',
            password: 'Contraseña',
            forgotPassword: '¿Olvidaste tu contraseña?',
            loginBtn: 'Iniciar Sesión',
            noAccount: '¿No tienes una cuenta?',
            signUp: 'Regístrate',
            createAccount: 'Crear Cuenta',
            createSubtitle: 'Comienza a recibir noticias filtradas hoy',
            confirmPassword: 'Confirmar Contraseña',
            createBtn: 'Crear Cuenta',
            hasAccount: '¿Ya tienes una cuenta?',
            resetTitle: 'Restablecer Contraseña',
            resetSubtitle: 'Ingresa tu correo para recibir instrucciones',
            sendLink: 'Enviar Enlace',
            rememberPassword: '¿Recordaste tu contraseña?',
            passwordsNoMatch: 'Las contraseñas no coinciden',
            creating: 'Creando cuenta...',
            loggingIn: 'Iniciando sesión...',
            sending: 'Enviando...'
        },
        dashboard: {
            newsFeed: 'Noticias',
            subscriptions: 'Suscripciones',
            settings: 'Configuración',
            logout: 'Cerrar Sesión',
            freePlan: 'Plan Gratuito',
            upgrade: 'Mejorar',
            slotsUsed: 'usados',
            refresh: 'Actualizar',
            addNew: 'Añadir Nuevo',
            addNewTitle: 'Añadir Nueva Suscripción',
            twitterUsername: 'Usuario de Twitter',
            ensurePublic: 'Asegúrate de que la cuenta sea pública.',
            cancel: 'Cancelar',
            add: 'Añadir',
            adding: 'Añadiendo...',
            remove: 'Eliminar',
            confirmRemove: '¿Estás seguro de eliminar esta suscripción?',
            emptyNewsTitle: 'Sin noticias aún',
            emptyNewsDesc: '¡Añade cuentas de Twitter y las noticias aparecerán aquí!',
            freePlanLimit: 'Límite del Plan Gratuito (2/2)',
            addFollow: 'Añadir',
            emptySubsTitle: 'Aún no sigues a nadie',
            emptySubsDesc: '¡Sigue cuentas de Twitter y recibe alertas!',
            addFirstFollow: 'Añadir Primero',
            planStatus: 'Plan Actual:',
            connectTelegram: 'Conectar Telegram',
            connectTelegramDesc: 'Conecta Telegram para alertas instantáneas.',
            connectedAs: 'Conectado como',
            startBot: 'Iniciar bot',
            enterCode: 'Generar código abajo',
            sendCode: 'Enviar',
            generateCode: 'Generar Código',
            yourCode: 'Tu Código:',
            validFor: 'Válido por 10 min',
            newCode: 'Nuevo Código',
            generating: 'Generando...',
            newsSource: 'Fuente',
            timeAgo: {
                justNow: 'Ahora',
                minAgo: 'min',
                hourAgo: 'h',
                dayAgo: 'd',
                monthAgo: 'mes',
                yearAgo: 'año'
            },
            subscriptionPlan: 'Plan de Suscripción',
            currentPlan: 'Plan Actual: ',
            free: 'Gratis',
            upgradePremiumDesc: 'Mejora a Premium para acceso ilimitado.',
            unlimitedTwitter: 'Cuentas ilimitadas',
            categoryFiltering: 'Filtrado por categoría',
            premiumSupport: 'Soporte Premium',
            upgradeToPremium: 'Mejorar a Premium',
            securePayment: 'Pago seguro vía Gumroad',
            onTelegram: 'en Telegram',
            clickButtonGenerateCode: 'Generar código abajo',
            sendCodeToBot: 'Enviar',
            toTheBot: 'al bot',
            upgradeTitle: 'Mejorar a Premium',
            upgradeModalDesc: 'Has alcanzado el límite gratuito de 2 cuentas. Mejora a Premium para seguimiento ilimitado.',
            maybeLater: 'Quizás Luego'
        },
        nav: {
            features: 'Características',
            pricing: 'Precios',
            faq: 'FAQ',
            login: 'Iniciar Sesión',
            start: 'Empezar'
        },
        hero: {
            badge: 'BETA - Acceso Anticipado',
            title: 'Obtén Solo <span class="gradient-text">Noticias Importantes</span> de Twitter',
            subtitle: 'Ahorra tiempo con filtrado impulsado por IA, aléjate del ruido. Captura al instante solo los tweets que te importan.',
            cta: 'Empezar - Gratis',
            trust: 'Sin tarjeta de crédito • Comienza en 2 minutos'
        },
        stats: {
            response: 'Tiempo de Respuesta',
            aiPowered: 'IA Potenciada',
            users: 'Usuarios Tempranos'
        },
        features: {
            title: '¿Por Qué <span class="gradient-text">GistAI</span>?',
            subtitle: 'Obtén el máximo valor de Twitter con tecnología moderna de IA',
            ai: {
                title: 'Filtrado Impulsado por IA',
                desc: 'Cada tweet se analiza con Google Gemini 1.5 Flash. Solo el contenido verdaderamente noticioso te llega. Elimina automáticamente el ruido.',
                tags: ['Nivel GPT-4', 'Tiempo real', '99% Precisión']
            },
            instant: {
                title: 'Notificaciones Instantáneas',
                desc: 'Las noticias importantes te llegan vía Telegram en 15 minutos. Nunca te pierdas nada.'
            },
            smart: {
                title: 'Resúmenes Inteligentes',
                desc: 'Hilos largos de tweets resumidos en 3 puntos. Ahorra tiempo.'
            },
            category: {
                title: 'Filtrado por Categoría',
                desc: 'Tech, Finanzas, Política - obtén solo lo que te interesa.'
            },
            hybrid: {
                title: 'Telegram + Web',
                desc: 'Accede desde cualquier lugar con enfoque híbrido.'
            },
            secure: {
                title: 'Completamente Seguro',
                desc: 'Tus datos están encriptados, la privacidad es nuestra prioridad.'
            }
        },
        howItWorks: {
            title: '¿Cómo Funciona?',
            subtitle: 'Comienza en 3 simples pasos',
            step1: {
                title: 'Regístrate',
                desc: 'Crea una cuenta gratuita con email. Sin tarjeta de crédito, listo en 2 minutos.'
            },
            step2: {
                title: 'Añade Cuentas de Twitter',
                desc: 'Añade las cuentas que quieres seguir desde el dashboard. Gratis: 2, Premium: Ilimitado.'
            },
            step3: {
                title: 'Conecta Telegram',
                desc: 'Inicia el bot, ingresa el código. ¡Empieza a recibir noticias inmediatamente! 🎉'
            },
            cta: 'Empezar Ahora →'
        },
        pricing: {
            title: 'Precios <span class="gradient-text">Simples y Transparentes</span>',
            subtitle: 'Empieza pequeño, actualiza mientras creces',
            free: {
                name: 'Gratis',
                price: '0',
                currency: '$',
                period: '/mes',
                desc: 'Perfecto para empezar',
                features: [
                    '2 cuentas de Twitter',
                    'Filtrado IA',
                    'Notificaciones Telegram',
                    'Panel web',
                    'Resúmenes básicos'
                ],
                cta: 'Empezar Gratis'
            },
            premium: {
                badge: '🔥 Más Popular',
                name: 'Premium',
                price: '19',
                currency: '$',
                period: '/mes',
                desc: 'Potencia total, acceso ilimitado',
                features: [
                    'Cuentas de Twitter <strong>ilimitadas</strong>',
                    'Análisis IA avanzado',
                    'Filtrado por categoría',
                    'Notificaciones prioritarias',
                    'Archivo detallado',
                    'Soporte premium'
                ],
                cta: 'Ir a Premium'
            },
            note: '💳 Sin tarjeta de crédito • Cancela cuando quieras'
        },
        faq: {
            title: 'Preguntas Frecuentes',
            items: [
                {
                    q: '🧪 ¿Qué significa versión beta?',
                    a: 'GistAI está en acceso anticipado. Trabajamos con datos demo realistas para probar el sistema y recopilar feedback. Integraremos la API real de Twitter cuando alcancemos 50 usuarios.'
                },
                {
                    q: '💰 ¿Cómo uso el sistema de pago?',
                    a: 'Puedes comprar el plan Premium a través de Gumroad. Gumroad integra con Stripe y PayPal para pagos seguros. Puedes cancelar tu suscripción en cualquier momento.'
                },
                {
                    q: '📊 ¿Los datos son reales?',
                    a: 'Actualmente (fase beta) usamos noticias demo realistas. Esto permite probar el sistema de punta a punta y optimizar el algoritmo de filtrado IA. La integración real de tweets vendrá después de los primeros 50 usuarios.'
                },
                {
                    q: '🔄 ¿Puedo actualizar de Gratis a Premium?',
                    a: '¡Sí! Puedes actualizar a Premium cuando quieras desde Dashboard > Perfil. Tus seguimientos existentes se conservan y el seguimiento ilimitado se activa inmediatamente.'
                },
                {
                    q: '🚀 ¿Cuál es la hoja de ruta?',
                    a: '<strong>Ahora (Beta):</strong> Pruebas del sistema con datos demo<br><strong>50 usuarios:</strong> Integración API real de Twitter<br><strong>500 usuarios:</strong> Filtrado por categoría, notificaciones email<br><strong>1000+ usuarios:</strong> App móvil, planes de equipo, características enterprise'
                },
                {
                    q: '❓ Tengo otras preguntas',
                    a: 'Puedes contactarnos a través de nuestro bot de Telegram (@GistAI_bot) o email. ¡Brindamos soporte prioritario a usuarios beta!'
                }
            ]
        },
        cta: {
            title: 'Libérate del Ruido de Noticias',
            subtitle: 'Configura en minutos y comienza a recibir tus primeras noticias.',
            button: 'Crear Cuenta Gratis'
        },
        support: {
            title: '¿Necesitas <span class="gradient-text">Ayuda</span>?',
            subtitle: 'Estamos aquí para ayudarte a sacar el máximo provecho de GistAI',
            telegram: {
                title: 'Bot de Telegram',
                desc: 'Obtén soporte instantáneo a través de nuestro bot de Telegram. Disponible 24/7.'
            },
            feedback: {
                title: 'Enviar Comentarios',
                desc: '¿Tienes sugerencias o encontraste un error? ¡Nos encantaría escucharte!',
                button: 'Abrir Formulario'
            },
            email: {
                title: 'Escríbenos',
                desc: 'Para consultas comerciales o solicitudes de soporte detalladas.'
            },
            response: 'Tiempo de respuesta promedio: < 24 horas'
        },
        footer: {
            desc: 'Plataforma de seguimiento de noticias de Twitter impulsada por IA.',
            copyright: '© 2026 GistAI. Todos los derechos reservados.'
        }
    },

    de: {
        lang: 'de',
        langName: 'Deutsch',
        auth: {
            welcomeBack: 'Willkommen zurück',
            loginSubtitle: 'Melden Sie sich an, um fortzufahren',
            email: 'E-Mail',
            password: 'Passwort',
            forgotPassword: 'Passwort vergessen?',
            loginBtn: 'Anmelden',
            noAccount: 'Kein Konto?',
            signUp: 'Registrieren',
            createAccount: 'Konto erstellen',
            createSubtitle: 'Erhalten Sie noch heute gefilterte Nachrichten',
            confirmPassword: 'Passwort bestätigen',
            createBtn: 'Konto erstellen',
            hasAccount: 'Bereits ein Konto?',
            resetTitle: 'Passwort zurücksetzen',
            resetSubtitle: 'Geben Sie Ihre E-Mail ein',
            sendLink: 'Link senden',
            rememberPassword: 'Passwort gemerkt?',
            passwordsNoMatch: 'Passwörter stimmen nicht überein',
            creating: 'Erstelle...',
            loggingIn: 'Melde an...',
            sending: 'Sende...'
        },
        dashboard: {
            newsFeed: 'Nachrichten',
            subscriptions: 'Abonnements',
            settings: 'Einstellungen',
            logout: 'Abmelden',
            freePlan: 'Kostenlos',
            upgrade: 'Upgrade',
            slotsUsed: 'benutzt',
            refresh: 'Aktualisieren',
            addNew: 'Neu hinzufügen',
            addNewTitle: 'Neues Abo hinzufügen',
            twitterUsername: 'Twitter Benutzername',
            ensurePublic: 'Stellen Sie sicher, dass das Konto öffentlich ist.',
            cancel: 'Abbrechen',
            add: 'Hinzufügen',
            adding: 'Hinzufügen...',
            remove: 'Entfernen',
            confirmRemove: 'Möchten Sie dieses Abo wirklich entfernen?',
            emptyNewsTitle: 'Noch keine Nachrichten',
            emptyNewsDesc: 'Fügen Sie Twitter-Konten hinzu!',
            freePlanLimit: 'Kostenloses Limit erreicht (2/2)',
            addFollow: 'Folgen',
            emptySubsTitle: 'Sie folgen noch niemandem',
            emptySubsDesc: 'Folgen Sie Konten für wichtige Nachrichten!',
            addFirstFollow: 'Erstes Abo',
            planStatus: 'Aktueller Plan:',
            connectTelegram: 'Telegram verbinden',
            connectTelegramDesc: 'Verbinden Sie Telegram für Sofortnachrichten.',
            connectedAs: 'Verbunden als',
            startBot: 'Bot starten',
            enterCode: 'Code generieren',
            sendCode: 'Senden',
            generateCode: 'Code generieren',
            yourCode: 'Ihr Code:',
            validFor: 'Gültig für 10 Min',
            newCode: 'Neuer Code',
            generating: 'Generiere...',
            newsSource: 'Quelle',
            timeAgo: {
                justNow: 'Gerade eben',
                minAgo: 'Min',
                hourAgo: 'Std',
                dayAgo: 'T',
                monthAgo: 'M',
                yearAgo: 'J'
            },
            subscriptionPlan: 'Abo-Plan',
            currentPlan: 'Plan: ',
            free: 'Kostenlos',
            upgradePremiumDesc: 'Upgrade für unbegrenzten Zugang.',
            unlimitedTwitter: 'Unbegrenzte Konten',
            categoryFiltering: 'Kategoriefilterung',
            premiumSupport: 'Premium Support',
            upgradeToPremium: 'Zu Premium wechseln',
            securePayment: 'Sichere Zahlung via Gumroad',
            onTelegram: 'auf Telegram',
            clickButtonGenerateCode: 'Code generieren',
            sendCodeToBot: 'Senden',
            toTheBot: 'an den Bot',
            upgradeTitle: 'Zu Premium wechseln',
            upgradeModalDesc: 'Sie haben das Limit erreicht. Wechseln Sie zu Premium für unbegrenzten Zugang.',
            maybeLater: 'Vielleicht später'
        },
        nav: {
            features: 'Funktionen',
            pricing: 'Preise',
            faq: 'FAQ',
            login: 'Anmelden',
            start: 'Starten'
        },
        hero: {
            badge: 'BETA - Früher Zugang',
            title: 'Erhalte nur <span class="gradient-text">wichtige Nachrichten</span> von Twitter',
            subtitle: 'Spare Zeit mit KI-gesteuerter Filterung, halte dich vom Lärm fern. Erfasse sofort nur die Tweets, die dir wichtig sind.',
            cta: 'Jetzt Starten - Kostenlos',
            trust: 'Keine Kreditkarte erforderlich • Start in 2 Minuten'
        },
        stats: {
            response: 'Antwortzeit',
            aiPowered: 'KI-gesteuert',
            users: 'Frühe Nutzer'
        },
        features: {
            title: 'Warum <span class="gradient-text">GistAI</span>?',
            subtitle: 'Hole das Maximum aus Twitter mit moderner KI-Technologie',
            ai: {
                title: 'KI-gesteuerte Filterung',
                desc: 'Jeder Tweet wird mit Google Gemini 1.5 Flash analysiert. Nur wirklich nachrichtenwertige Inhalte erreichen dich. Entfernt automatisch Lärm.',
                tags: ['GPT-4 Niveau', 'Echtzeit', '99% Genauigkeit']
            },
            instant: {
                title: 'Sofortige Benachrichtigungen',
                desc: 'Wichtige Nachrichten erreichen dich via Telegram innerhalb von 15 Minuten. Verpasse nie etwas.'
            },
            smart: {
                title: 'Intelligente Zusammenfassungen',
                desc: 'Lange Tweet-Threads in 3 Punkten zusammengefasst. Spare Zeit.'
            },
            category: {
                title: 'Kategoriefilterung',
                desc: 'Tech, Finanzen, Politik - erhalte nur, was dich interessiert.'
            },
            hybrid: {
                title: 'Telegram + Web',
                desc: 'Zugriff von überall mit hybridem Ansatz.'
            },
            secure: {
                title: 'Vollständig Sicher',
                desc: 'Deine Daten sind verschlüsselt, Datenschutz hat Priorität.'
            }
        },
        howItWorks: {
            title: 'Wie funktioniert es?',
            subtitle: 'Starte in 3 einfachen Schritten',
            step1: {
                title: 'Registrieren',
                desc: 'Erstelle ein kostenloses Konto mit E-Mail. Keine Kreditkarte erforderlich, in 2 Minuten fertig.'
            },
            step2: {
                title: 'Twitter-Konten hinzufügen',
                desc: 'Füge Konten, denen du folgen möchtest, vom Dashboard hinzu. Kostenlos: 2, Premium: Unbegrenzt.'
            },
            step3: {
                title: 'Telegram verbinden',
                desc: 'Starte den Bot, gib den Code ein. Empfange sofort Nachrichten! 🎉'
            },
            cta: 'Jetzt starten →'
        },
        pricing: {
            title: 'Einfache und Transparente <span class="gradient-text">Preise</span>',
            subtitle: 'Starte klein, upgrade wenn du wächst',
            free: {
                name: 'Kostenlos',
                price: '0',
                currency: '€',
                period: '/Monat',
                desc: 'Perfekt zum Starten',
                features: [
                    '2 Twitter-Konten',
                    'KI-Filterung',
                    'Telegram Benachrichtigungen',
                    'Web-Dashboard',
                    'Basis-Zusammenfassungen'
                ],
                cta: 'Kostenlos Starten'
            },
            premium: {
                badge: '🔥 Beliebteste',
                name: 'Premium',
                price: '19',
                currency: '$',
                period: '/Monat',
                desc: 'Volle Power, unbegrenzter Zugang',
                features: [
                    '<strong>Unbegrenzte</strong> Twitter-Konten',
                    'Erweiterte KI-Analyse',
                    'Kategoriefilterung',
                    'Prioritäts-Benachrichtigungen',
                    'Detailliertes Archiv',
                    'Premium-Support'
                ],
                cta: 'Zu Premium wechseln'
            },
            note: '💳 Keine Kreditkarte erforderlich • Jederzeit kündigen'
        },
        faq: {
            title: 'Häufig Gestellte Fragen',
            items: [
                {
                    q: '🧪 Was bedeutet Beta-Version?',
                    a: 'GistAI befindet sich im frühen Zugang. Wir arbeiten mit realistischen Demo-Daten, um das System zu testen und Feedback zu sammeln. Wir integrieren die echte Twitter-API, wenn wir 50 Nutzer erreichen.'
                },
                {
                    q: '💰 Wie nutze ich das Zahlungssystem?',
                    a: 'Du kannst den Premium-Plan über Gumroad kaufen. Gumroad integriert mit Stripe und PayPal für sichere Zahlungen. Du kannst dein Abo jederzeit kündigen.'
                },
                {
                    q: '📊 Sind die Daten echt?',
                    a: 'Aktuell (Beta-Phase) nutzen wir realistische Demo-Nachrichten. Dies ermöglicht End-to-End-Systemtests und KI-Filteralgorithmus-Optimierung. Echte Tweet-Integration kommt nach den ersten 50 Nutzern.'
                },
                {
                    q: '🔄 Kann ich von Kostenlos zu Premium upgraden?',
                    a: 'Ja! Du kannst jederzeit über Dashboard > Profil zu Premium upgraden. Deine bestehenden Follows bleiben erhalten und unbegrenztes Tracking wird sofort aktiviert.'
                },
                {
                    q: '🚀 Was ist die Roadmap?',
                    a: '<strong>Jetzt (Beta):</strong> Systemtests mit Demo-Daten<br><strong>50 Nutzer:</strong> Echte Twitter-API-Integration<br><strong>500 Nutzer:</strong> Kategoriefilterung, E-Mail-Benachrichtigungen<br><strong>1000+ Nutzer:</strong> Mobile App, Team-Pläne, Enterprise-Features'
                },
                {
                    q: '❓ Ich habe weitere Fragen',
                    a: 'Kontaktiere uns über unseren Telegram-Bot (@GistAI_bot) oder E-Mail. Wir bieten Prioritäts-Support für Beta-Nutzer!'
                }
            ]
        },
        cta: {
            title: 'Befreie dich vom Nachrichten-Lärm',
            subtitle: 'Setup in Minuten und empfange deine ersten Nachrichten.',
            button: 'Kostenloses Konto Erstellen'
        },
        support: {
            title: 'Brauchst du <span class="gradient-text">Hilfe</span>?',
            subtitle: 'Wir sind hier, um dir zu helfen, das Beste aus GistAI herauszuholen',
            telegram: {
                title: 'Telegram Bot',
                desc: 'Erhalte sofortige Unterstützung über unseren Telegram-Bot. 24/7 verfügbar.'
            },
            feedback: {
                title: 'Feedback Senden',
                desc: 'Hast du Vorschläge oder einen Fehler gefunden? Wir würden gerne von dir hören!',
                button: 'Feedback-Formular Öffnen'
            },
            email: {
                title: 'E-Mail an uns',
                desc: 'Für geschäftliche Anfragen oder detaillierte Support-Anfragen.'
            },
            response: 'Durchschnittliche Antwortzeit: < 24 Stunden'
        },
        footer: {
            desc: 'KI-gesteuerte Twitter-Nachrichten-Tracking-Plattform.',
            copyright: '© 2026 GistAI. Alle Rechte vorbehalten.'
        }
    },

    fr: {
        lang: 'fr',
        langName: 'Français',
        auth: {
            welcomeBack: 'Bon retour',
            loginSubtitle: 'Connectez-vous pour continuer',
            email: 'Email',
            password: 'Mot de passe',
            forgotPassword: 'Mot de passe oublié ?',
            loginBtn: 'Connexion',
            noAccount: 'Pas de compte ?',
            signUp: 'S\'inscrire',
            createAccount: 'Créer un compte',
            createSubtitle: 'Recevez des nouvelles filtrées dès aujourd\'hui',
            confirmPassword: 'Confirmer le mot de passe',
            createBtn: 'Créer',
            hasAccount: 'Déjà un compte ?',
            resetTitle: 'Réinitialiser',
            resetSubtitle: 'Entrez votre email',
            sendLink: 'Envoyer',
            rememberPassword: 'Mot de passe retrouvé ?',
            passwordsNoMatch: 'Les mots de passe ne correspondent pas',
            creating: 'Création...',
            loggingIn: 'Connexion...',
            sending: 'Envoi...'
        },
        dashboard: {
            newsFeed: 'Actualités',
            subscriptions: 'Abonnements',
            settings: 'Paramètres',
            logout: 'Déconnexion',
            freePlan: 'Gratuit',
            upgrade: 'Améliorer',
            slotsUsed: 'utilisés',
            refresh: 'Actualiser',
            addNew: 'Ajouter',
            addNewTitle: 'Ajouter un abonnement',
            twitterUsername: 'Nom d\'utilisateur Twitter',
            ensurePublic: 'Assurez-vous que le compte est public.',
            cancel: 'Annuler',
            add: 'Ajouter',
            adding: 'Ajout...',
            remove: 'Supprimer',
            confirmRemove: 'Voulez-vous vraiment supprimer cet abonnement ?',
            emptyNewsTitle: 'Pas encore de nouvelles',
            emptyNewsDesc: 'Ajoutez des comptes Twitter pour voir les news !',
            freePlanLimit: 'Limite gratuite atteinte (2/2)',
            addFollow: 'Suivre',
            emptySubsTitle: 'Vous ne suivez personne',
            emptySubsDesc: 'Suivez des comptes pour être notifié !',
            addFirstFollow: 'Ajouter le premier',
            planStatus: 'Plan actuel :',
            connectTelegram: 'Connecter Telegram',
            connectTelegramDesc: 'Connectez Telegram pour des alertes instantanées.',
            connectedAs: 'Connecté en tant que',
            startBot: 'Démarrer le bot',
            enterCode: 'Générer un code',
            sendCode: 'Envoyer',
            generateCode: 'Générer Code',
            yourCode: 'Votre Code :',
            validFor: 'Valide 10 min',
            newCode: 'Nouveau Code',
            generating: 'Génération...',
            newsSource: 'Source',
            timeAgo: {
                justNow: 'À l\'instant',
                minAgo: 'min',
                hourAgo: 'h',
                dayAgo: 'j',
                monthAgo: 'mois',
                yearAgo: 'an'
            },
            subscriptionPlan: 'Plan d\'abonnement',
            currentPlan: 'Plan : ',
            free: 'Gratuit',
            upgradePremiumDesc: 'Passez Premium pour un accès illimité.',
            unlimitedTwitter: 'Comptes illimités',
            categoryFiltering: 'Filtrage par catégorie',
            premiumSupport: 'Support Premium',
            upgradeToPremium: 'Passer Premium',
            securePayment: 'Paiement sécurisé via Gumroad',
            onTelegram: 'sur Telegram',
            clickButtonGenerateCode: 'Générer un code',
            sendCodeToBot: 'Envoyer',
            toTheBot: 'au bot',
            upgradeTitle: 'Passer Premium',
            upgradeModalDesc: 'Vous avez atteint la limite gratuite. Passez Premium pour un accès illimité.',
            maybeLater: 'Peut-être plus tard'
        },
        nav: {
            features: 'Fonctionnalités',
            pricing: 'Tarifs',
            faq: 'FAQ',
            login: 'Connexion',
            start: 'Commencer'
        },
        hero: {
            badge: 'BETA - Accès Anticipé',
            title: 'Obtenez Seulement les <span class="gradient-text">Actualités Importantes</span> de Twitter',
            subtitle: 'Gagnez du temps avec le filtrage alimenté par IA, éloignez-vous du bruit. Capturez instantanément uniquement les tweets qui vous importent.',
            cta: 'Commencer - Gratuit',
            trust: 'Sans carte de crédit • Démarrez en 2 minutes'
        },
        stats: {
            response: 'Temps de Réponse',
            aiPowered: 'IA Intégrée',
            users: 'Utilisateurs Précoces'
        },
        features: {
            title: 'Pourquoi <span class="gradient-text">GistAI</span> ?',
            subtitle: 'Tirez le maximum de Twitter avec la technologie IA moderne',
            ai: {
                title: 'Filtrage Alimenté par IA',
                desc: 'Chaque tweet est analysé avec Google Gemini 1.5 Flash. Seul le contenu vraiment digne d\'intérêt vous parvient. Supprime automatiquement le bruit.',
                tags: ['Niveau GPT-4', 'Temps réel', '99% Précision']
            },
            instant: {
                title: 'Notifications Instantanées',
                desc: 'Les actualités importantes vous parviennent via Telegram en 15 minutes. Ne manquez jamais rien.'
            },
            smart: {
                title: 'Résumés Intelligents',
                desc: 'Longs fils de tweets résumés en 3 points. Gagnez du temps.'
            },
            category: {
                title: 'Filtrage par Catégorie',
                desc: 'Tech, Finance, Politique - obtenez uniquement ce qui vous intéresse.'
            },
            hybrid: {
                title: 'Telegram + Web',
                desc: 'Accédez de partout avec une approche hybride.'
            },
            secure: {
                title: 'Entièrement Sécurisé',
                desc: 'Vos données sont cryptées, la confidentialité est notre priorité.'
            }
        },
        howItWorks: {
            title: 'Comment Ça Marche ?',
            subtitle: 'Commencez en 3 étapes simples',
            step1: {
                title: 'Inscrivez-vous',
                desc: 'Créez un compte gratuit par email. Sans carte de crédit, prêt en 2 minutes.'
            },
            step2: {
                title: 'Ajoutez des Comptes Twitter',
                desc: 'Ajoutez les comptes que vous voulez suivre depuis le tableau de bord. Gratuit: 2, Premium: Illimité.'
            },
            step3: {
                title: 'Connectez Telegram',
                desc: 'Démarrez le bot, entrez le code. Commencez à recevoir des actualités immédiatement ! 🎉'
            },
            cta: 'Commencer Maintenant →'
        },
        pricing: {
            title: 'Tarification <span class="gradient-text">Simple et Transparente</span>',
            subtitle: 'Commencez petit, évoluez en grandissant',
            free: {
                name: 'Gratuit',
                price: '0',
                currency: '€',
                period: '/mois',
                desc: 'Parfait pour commencer',
                features: [
                    '2 comptes Twitter',
                    'Filtrage IA',
                    'Notifications Telegram',
                    'Tableau de bord web',
                    'Résumés basiques'
                ],
                cta: 'Commencer Gratuitement'
            },
            premium: {
                badge: '🔥 Le Plus Populaire',
                name: 'Premium',
                price: '19',
                currency: '$',
                period: '/mois',
                desc: 'Puissance totale, accès illimité',
                features: [
                    'Comptes Twitter <strong>illimités</strong>',
                    'Analyse IA avancée',
                    'Filtrage par catégorie',
                    'Notifications prioritaires',
                    'Archive détaillée',
                    'Support premium'
                ],
                cta: 'Passer à Premium'
            },
            note: '💳 Sans carte de crédit • Annulez quand vous voulez'
        },
        faq: {
            title: 'Questions Fréquemment Posées',
            items: [
                {
                    q: '🧪 Que signifie version bêta ?',
                    a: 'GistAI est en accès anticipé. Nous travaillons avec des données de démonstration réalistes pour prouver que le système fonctionne et recueillir des commentaires. Nous intégrerons la vraie API Twitter quand nous atteindrons 50 utilisateurs.'
                },
                {
                    q: '💰 Comment utiliser le système de paiement ?',
                    a: 'Vous pouvez acheter le plan Premium via Gumroad. Gumroad s\'intègre avec Stripe et PayPal pour des paiements sécurisés. Vous pouvez annuler votre abonnement à tout moment.'
                },
                {
                    q: '📊 Les données sont-elles réelles ?',
                    a: 'Actuellement (phase bêta) nous utilisons des actualités de démonstration réalistes. Cela permet des tests système de bout en bout et l\'optimisation de l\'algorithme de filtrage IA. L\'intégration réelle des tweets viendra après les 50 premiers utilisateurs.'
                },
                {
                    q: '🔄 Puis-je passer de Gratuit à Premium ?',
                    a: 'Oui ! Vous pouvez passer à Premium à tout moment depuis Tableau de bord > Profil. Vos suivis existants sont conservés et le suivi illimité s\'active immédiatement.'
                },
                {
                    q: '🚀 Quelle est la feuille de route ?',
                    a: '<strong>Maintenant (Bêta) :</strong> Tests système avec données démo<br><strong>50 utilisateurs :</strong> Intégration vraie API Twitter<br><strong>500 utilisateurs :</strong> Filtrage par catégorie, notifications email<br><strong>1000+ utilisateurs :</strong> App mobile, plans équipe, fonctionnalités entreprise'
                },
                {
                    q: '❓ J\'ai d\'autres questions',
                    a: 'Contactez-nous via notre bot Telegram (@GistAI_bot) ou par email. Nous fournissons un support prioritaire aux utilisateurs bêta !'
                }
            ]
        },
        cta: {
            title: 'Libérez-vous du Bruit des Actualités',
            subtitle: 'Configurez en quelques minutes et commencez à recevoir vos premières actualités.',
            button: 'Créer un Compte Gratuit'
        },
        support: {
            title: 'Besoin d\'<span class="gradient-text">Aide</span> ?',
            subtitle: 'Nous sommes là pour vous aider à tirer le meilleur parti de GistAI',
            telegram: {
                title: 'Bot Telegram',
                desc: 'Obtenez une assistance instantanée via notre bot Telegram. Disponible 24/7.'
            },
            feedback: {
                title: 'Envoyer un Feedback',
                desc: 'Vous avez des suggestions ou trouvé un bug ? Nous aimerions vous entendre !',
                button: 'Ouvrir le Formulaire'
            },
            email: {
                title: 'Nous Contacter',
                desc: 'Pour les demandes commerciales ou les demandes de support détaillées.'
            },
            response: 'Temps de réponse moyen : < 24 heures'
        },
        footer: {
            desc: 'Plateforme de suivi d\'actualités Twitter alimentée par IA.',
            copyright: '© 2026 GistAI. Tous droits réservés.'
        }
    }
};

// Current language (default: detect from browser or use 'en')
let currentLang = 'en';

// Initialize language
function initI18n() {
    // Try to get saved language
    const savedLang = localStorage.getItem('gistai_lang');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    } else {
        // Detect from browser
        const browserLang = navigator.language.split('-')[0];
        if (translations[browserLang]) {
            currentLang = browserLang;
        }
    }

    // Apply translations
    applyTranslations();

    // Update language selector
    updateLangSelector();
}

// Get translation
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLang];

    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            // Fallback to English
            value = translations.en;
            for (const kf of keys) {
                if (value && value[kf] !== undefined) {
                    value = value[kf];
                } else {
                    return key; // Return key if not found
                }
            }
            break;
        }
    }

    return value;
}

// Change language
function changeLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('gistai_lang', lang);
        applyTranslations();
        updateLangSelector();
    }
}

// Apply translations to page
function applyTranslations() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = t(key);

        if (el.hasAttribute('data-i18n-html')) {
            el.innerHTML = translation;
        } else {
            el.textContent = translation;
        }
    });

    // Update page title
    document.title = 'GistAI - ' + t('hero.title').replace(/<[^>]*>/g, '');

    // Update html lang attribute
    document.documentElement.lang = currentLang;
}

// Update language selector UI
function updateLangSelector() {
    const selector = document.getElementById('lang-selector');
    if (selector) {
        selector.value = currentLang;
    }

    const currentFlag = document.getElementById('current-lang-flag');
    if (currentFlag) {
        currentFlag.textContent = getLangFlag(currentLang);
    }
}

// Get flag emoji for language
function getLangFlag(lang) {
    const flags = {
        en: '🇬🇧',
        tr: '🇹🇷',
        es: '🇪🇸',
        de: '🇩🇪',
        fr: '🇫🇷'
    };
    return flags[lang] || '🌐';
}

// Get available languages
function getAvailableLanguages() {
    return Object.keys(translations).map(lang => ({
        code: lang,
        name: translations[lang].langName,
        flag: getLangFlag(lang)
    }));
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initI18n);

// Export for use in other scripts
window.GistAI = window.GistAI || {};
window.GistAI.i18n = {
    t,
    changeLanguage,
    getCurrentLang: () => currentLang,
    getAvailableLanguages
};
