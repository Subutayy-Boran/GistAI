/**
 * GistAI Landing Page Interactions
 * Handles background animation, scroll reveals, FAQ accordion, and Mobile Menu
 */

/* --- 1. Background Animation (Starfield) --- */
class StarfieldAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.width = 0;
        this.height = 0;
        this.animationFrame = null;

        this.resize();
        this.initStars();
        this.animate();

        window.addEventListener('resize', () => {
            this.resize();
            this.initStars();
        });
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    initStars() {
        this.stars = [];
        const starCount = Math.floor((this.width * this.height) / 4000); // Density

        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 1.5,
                alpha: Math.random(),
                speed: Math.random() * 0.05 + 0.02
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.ctx.fillStyle = '#ffffff';

        this.stars.forEach(star => {
            this.ctx.globalAlpha = star.alpha;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fill();

            // Twinkle effect
            star.alpha += star.speed * (Math.random() > 0.5 ? 1 : -1);
            if (star.alpha <= 0) star.alpha = 0;
            if (star.alpha >= 1) star.alpha = 1;

            // Movement (subtle float)
            star.y -= star.speed * 0.5;
            if (star.y < 0) star.y = this.height;
        });

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
}

/* --- 2. Scroll Animations --- */
class ScrollRevealer {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer.unobserve(entry.target); // Only animate once
                }
            });
        }, this.observerOptions);

        this.init();
    }

    init() {
        const elements = document.querySelectorAll('.fade-in-section');
        elements.forEach(el => this.observer.observe(el));
    }
}

/* --- 3. FAQ Rendering & Accordion --- */
function renderFAQ() {
    if (!window.GistAI || !window.GistAI.i18n) return;

    const faqContainer = document.getElementById('faq-list');
    if (!faqContainer) return;

    const items = window.GistAI.i18n.t('faq.items');

    if (Array.isArray(items)) {
        faqContainer.innerHTML = items.map(item => `
            <div class="faq-item fade-in-section visible">
                <button class="faq-trigger">
                    <span>${item.q}</span>
                    <svg class="faq-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke-width="2"/>
                    </svg>
                </button>
                <div class="faq-content">
                    <div class="faq-body">${item.a}</div>
                </div>
            </div>
        `).join('');

        // Re-init listeners since DOM changed
        initFAQListeners();
    }
}

function initFAQListeners() {
    const triggers = document.querySelectorAll('.faq-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.parentElement;
            const content = item.querySelector('.faq-content');
            const isActive = item.classList.contains('active');

            // Close all others
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.faq-content').style.height = '0';
                }
            });

            // Toggle current
            if (isActive) {
                item.classList.remove('active');
                content.style.height = '0';
            } else {
                item.classList.add('active');
                content.style.height = content.scrollHeight + 'px';
            }
        });
    });
}

/* --- 4. Language Selector Interaction --- */
function initLanguageSelector() {
    const btn = document.getElementById('lang-toggle');
    const dropdown = document.getElementById('lang-dropdown');

    if (!btn || !dropdown) return;

    function toggleDropdown(e) {
        if (e) e.stopPropagation();
        const isVisible = dropdown.style.visibility === 'visible';

        if (isVisible) {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.transform = 'translateY(10px)';
        } else {
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.transform = 'translateY(0)';
        }
    }

    btn.addEventListener('click', toggleDropdown);

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-selector')) {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.transform = 'translateY(10px)';
        }
    });

    // Language selection logic
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            const flag = this.textContent.split(' ')[0];

            // Visual update
            const currentFlagSpan = document.getElementById('current-lang-flag');
            if (currentFlagSpan) currentFlagSpan.textContent = flag;

            // Text update (EN, TR etc)
            const btnText = btn.querySelector('span:nth-child(2)');
            if (btnText) btnText.textContent = lang.toUpperCase();

            // Perform translation via i18n
            if (window.GistAI && window.GistAI.i18n) {
                window.GistAI.i18n.changeLanguage(lang);
                // Re-render dynamic content like FAQ
                renderFAQ();
            }

            // Close dropdown
            toggleDropdown();
        });
    });
}

/* --- 5. Mobile Menu --- */
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-btn')) {
            menu.classList.remove('active');
        }
    });
}

/* --- Initialization --- */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize animations
    new StarfieldAnimation('bg-canvas');
    new ScrollRevealer();

    // 2. Initialize UI components
    initLanguageSelector();
    initMobileMenu();

    // 3. Initial Translation Setup
    if (window.GistAI && window.GistAI.i18n) {
        // Detect or get saved language
        const savedLang = localStorage.getItem('gistai_lang') || 'tr'; // Default to TR if not set, or adjust logic
        window.GistAI.i18n.changeLanguage(savedLang);

        // Update Selector UI to match saved language
        const btnText = document.querySelector('#lang-toggle span:nth-child(2)');
        const currentFlagSpan = document.getElementById('current-lang-flag');

        // Map lang to flag (simple version, i18n.js has the full logic but we can query it)
        const flag = window.GistAI.i18n.getAvailableLanguages().find(l => l.code === savedLang)?.flag || '🌐';
        if (currentFlagSpan) currentFlagSpan.textContent = flag;
        if (btnText) btnText.textContent = savedLang.toUpperCase();

        // Render FAQ
        renderFAQ();
    }
});
