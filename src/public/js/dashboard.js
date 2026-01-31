// Auth Check
// Check for social login token in URL
const urlParams = new URLSearchParams(window.location.search);
const tokenParam = urlParams.get('token');
if (tokenParam) {
    localStorage.setItem('authToken', tokenParam);
    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
}

const authToken = localStorage.getItem('authToken');
const user = JSON.parse(localStorage.getItem('user') || '{}');

if (!authToken) {
    window.location.href = '/login';
}

// Display user email or telegram username
const userEmailEl = document.getElementById('userEmail');
if (userEmailEl) {
    userEmailEl.textContent = user.email || user.telegram_username || 'User';
}

// If user object is empty but we have token, fetch profile
if (authToken && !user.id) {
    // Fetch profile immediately to populate user info
    fetch('/api/user/profile', { headers: { 'Authorization': `Bearer ${authToken}` } })
        .then(res => res.json())
        .then(data => {
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
                if (userEmailEl) {
                    userEmailEl.textContent = data.user.email || data.user.telegram_username || 'User';
                }
                window.location.reload(); // Reload to apply tier info etc
            }
        });
}

// Global state
let subscriptions = [];
let newsItems = [];
let limitInfo = { canSubscribe: true, limit: 2, current: 0, remaining: 2 };

// Logout
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
}

// API Helper
async function apiCall(endpoint, options = {}) {
    const response = await fetch(endpoint, {
        ...options,
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            ...options.headers
        }
    });

    if (response.status === 401) {
        logout();
        return null;
    }

    return response.json();
}

// Tab Navigation
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');
        // Check if onclick contains the tabName (simple check)
        if (link.getAttribute('onclick')?.includes(tabName)) {
            link.classList.add('active');
        }
    });

    if (tabName === 'news') {
        document.getElementById('newsTab').style.display = 'block';
        loadNews();
    } else if (tabName === 'subscriptions') {
        document.getElementById('subscriptionsTab').style.display = 'block';
        loadSubscriptions();
    } else if (tabName === 'profile') {
        document.getElementById('profileTab').style.display = 'block';
        loadProfile();
    }
}

// Initialize I18n Helper
function t(key) {
    if (window.GistAI && window.GistAI.i18n) {
        return window.GistAI.i18n.t(key);
    }
    return key;
}

function getLang() {
    if (window.GistAI && window.GistAI.i18n) {
        return window.GistAI.i18n.getCurrentLang();
    }
    return 'en';
}

// Language Selector Logic
function initLanguageSelector() {
    const btn = document.getElementById('lang-toggle');
    const dropdown = document.getElementById('lang-dropdown');

    if (!btn || !dropdown) return;

    // Set initial state from i18n
    if (window.GistAI && window.GistAI.i18n) {
        const currentLang = window.GistAI.i18n.getCurrentLang();
        const flags = { en: '🇬🇧', tr: '🇹🇷', es: '🇪🇸', de: '🇩🇪', fr: '🇫🇷' };

        const currentFlagSpan = document.getElementById('current-lang-flag');
        const btnText = btn.querySelector('span:nth-child(2)');

        if (currentFlagSpan) currentFlagSpan.textContent = flags[currentLang] || '🌐';
        if (btnText) btnText.textContent = currentLang.toUpperCase();
    }

    // Toggle dropdown
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Toggle visibility via CSS hover-like state or inline styles
        // Since CSS handles hover, we might need manual toggle for click on mobile/tablet or just improve UX
        // But the CSS uses :hover which is tricky for clicks. Let's use a class.
        // Actually CSS says: .lang-selector:hover .lang-dropdown { ... }
        // For click support (better), we should toggle a class or style.
        // Let's force style
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
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-selector')) {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.transform = 'translateY(10px)';
        }
    });

    // Option click
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');

            if (window.GistAI && window.GistAI.i18n) {
                window.GistAI.i18n.changeLanguage(lang);

                // Update UI immediately
                const flags = { en: '🇬🇧', tr: '🇹🇷', es: '🇪🇸', de: '🇩🇪', fr: '🇫🇷' };
                const currentFlagSpan = document.getElementById('current-lang-flag');
                const btnText = btn.querySelector('span:nth-child(2)');

                if (currentFlagSpan) currentFlagSpan.textContent = flags[lang] || '🌐';
                if (btnText) btnText.textContent = lang.toUpperCase();

                // Reload all data to refresh strings
                loadStats();
                loadNews(); // Only if on news tab? Or just reload all
                loadSubscriptions(); // If on subs tab
                loadProfile();

                // Close dropdown
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(10px)';
            }
        });
    });
}

// Load Stats
async function loadStats() {
    const data = await apiCall('/api/subscriptions');
    if (data) {
        limitInfo = data.limit;
        subscriptions = data.subscriptions;

        const tierNameEl = document.getElementById('tierName');
        if (tierNameEl) tierNameEl.innerHTML = user.tier === 'premium' ? 'Premium 💎' : t('dashboard.freePlan');

        const limitInfoEl = document.getElementById('limitInfo');
        if (limitInfoEl) limitInfoEl.textContent = `${limitInfo.current} / ${limitInfo.limit}`;

        // Also update Plan Card in Sidebar if exists
        const limitPlanName = document.getElementById('limitPlanName');
        if (limitPlanName) limitPlanName.textContent = user.tier === 'premium' ? 'Premium' : t('dashboard.freePlan');
    }
}

// Load News
async function loadNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;

    // Only show loader if empty, to avoid flashing on refresh
    if (!newsGrid.innerHTML.trim() || newsGrid.innerHTML.includes('loader')) {
        newsGrid.innerHTML = '<div class="loader" style="margin: 3rem auto;"></div>';
    }

    const data = await apiCall('/api/news?limit=20');

    if (data && data.news) {
        newsItems = data.news;

        if (newsItems.length === 0) {
            newsGrid.innerHTML = `
                <div class="feature-card text-center" style="padding: 3rem; display: flex; flex-direction: column; align-items: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📭</div>
                    <h3>${t('dashboard.emptyNewsTitle')}</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">${t('dashboard.emptyNewsDesc')}</p>
                    <button onclick="showTab('subscriptions')" class="btn btn-primary mt-4">${t('dashboard.addFollow')}</button>
                </div>
            `;
            return;
        }

        newsGrid.innerHTML = newsItems.map(item => {
            let summary = [];
            try {
                summary = JSON.parse(item.summary_text);
            } catch (e) {
                summary = [item.summary_text];
            }

            const date = new Date(item.published_at);
            const timeAgoStr = getTimeAgo(date);

            return `
                <div class="news-card">
                    <div class="news-header">
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <span class="news-source">@${item.username}</span>
                            ${item.category ? `<span class="category-badge" style="background: rgba(99, 102, 241, 0.1); color: #818cf8; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem;">${item.category}</span>` : ''}
                        </div>
                        <span class="news-time">${timeAgoStr}</span>
                    </div>
                    <div class="news-summary">
                        <ul>
                            ${summary.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        newsGrid.innerHTML = `<p style="text-align:center; color: var(--text-secondary);">Error loading news.</p>`;
    }
}

// Load Subscriptions
async function loadSubscriptions() {
    const subsList = document.getElementById('subscriptionsList');
    if (!subsList) return;

    // Only show loader if empty
    if (!subsList.innerHTML.trim() || subsList.innerHTML.includes('loader')) {
        subsList.innerHTML = '<div class="loader" style="margin: 3rem auto;"></div>';
    }

    const data = await apiCall('/api/subscriptions');

    if (data) {
        subscriptions = data.subscriptions;
        limitInfo = data.limit;

        // Show limit warning if needed
        const warningEl = document.getElementById('limitWarning');
        const warningText = document.querySelector('#limitWarning p');
        if (warningEl) {
            if (!limitInfo.canSubscribe && user.tier === 'free') {
                warningEl.style.display = 'block';
                if (warningText) warningText.textContent = '⚠️ ' + (t('dashboard.freePlanLimit') || "Limit reached");
            } else {
                warningEl.style.display = 'none';
            }
        }

        if (subscriptions.length === 0) {
            subsList.innerHTML = `
                <div class="feature-card text-center" style="padding: 3rem; display: flex; flex-direction: column; align-items: center;">
                    <div style="font-size: 3rem; margin-bottom: 3rem;">👥</div>
                    <h3>${t('dashboard.emptySubsTitle')}</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem;">${t('dashboard.emptySubsDesc')}</p>
                    <button onclick="window.showAddModal()" class="btn btn-primary mt-4">${t('dashboard.addFirstFollow')}</button>
                </div>
            `;
            return;
        }

        subsList.innerHTML = `
            <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
                ${subscriptions.map(sub => `
                    <div class="feature-card">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                                <h3 style="margin: 0 0 4px 0;">@${sub.username}</h3>
                                <p style="color: var(--text-secondary); font-size: 0.875rem; margin: 0;">
                                    ${new Date(sub.subscribed_at).toLocaleDateString(getLang() === 'tr' ? 'tr-TR' : 'en-US')}
                                </p>
                            </div>
                            <button onclick="removeSubscription('${sub.id}')" class="btn btn-secondary" style="padding: 0.5rem 1rem;">
                                ${t('dashboard.remove')}
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// Load Profile
async function loadProfile() {
    const data = await apiCall('/api/user/profile');

    if (data && data.user) {
        const profile = data.user;
        const tierStatus = document.getElementById('tierStatus');

        if (tierStatus) {
            const statusLabel = user.tier === 'premium' ? 'Premium 💎' : t('dashboard.freePlan');
            tierStatus.innerHTML = `${t('dashboard.currentPlan')} <strong>${statusLabel}</strong>`;
        }

        if (profile.telegram_username) {
            const connectedDiv = document.getElementById('telegramConnected');
            const notConnectedDiv = document.getElementById('telegramNotConnected');
            const usernameSpan = document.getElementById('telegramUsername');

            if (connectedDiv) connectedDiv.style.display = 'block';
            if (notConnectedDiv) notConnectedDiv.style.display = 'none';
            if (usernameSpan) usernameSpan.textContent = '@' + profile.telegram_username;
        }
    }
}

// Featured Accounts Data
const FEATURED_ACCOUNTS = [
    { id: 'elonmusk', name: 'Elon Musk' },
    { id: 'cnn', name: 'CNN' },
    { id: 'techcrunch', name: 'TechCrunch' },
    { id: 'nytimes', name: 'The New York Times' },
    { id: 'bloomberg', name: 'Bloomberg' },
    { id: 'verge', name: 'The Verge' },
    { id: 'nasa', name: 'NASA' }
];

// Add Subscription Modal
function showPremiumModal() {
    const modal = document.getElementById('premiumModal');
    if (modal) {
        modal.classList.add('active');
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
    }
}

function hidePremiumModal() {
    const modal = document.getElementById('premiumModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.visibility = 'hidden';
            modal.style.opacity = '0';
        }, 200);
    }
}

function showAddModal() {
    // Check limit
    if (user.tier === 'free') {
        if (subscriptions.length >= 2 || (limitInfo && !limitInfo.canSubscribe)) {
            showPremiumModal();
            return;
        }
    }

    const modal = document.getElementById('addModal');
    if (modal) {
        modal.classList.add('active');
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';

        // Filter and populate datalist
        const datalist = document.getElementById('featuredAccounts');
        if (datalist) {
            datalist.innerHTML = ''; // Clear existing

            // Get current subscribed usernames (normalized)
            const currentSubUsernames = subscriptions.map(sub => sub.username.toLowerCase());

            FEATURED_ACCOUNTS.forEach(account => {
                // Only add if not already subscribed
                if (!currentSubUsernames.includes(account.id.toLowerCase())) {
                    const option = document.createElement('option');
                    option.value = account.id;
                    option.textContent = account.name;
                    datalist.appendChild(option);
                }
            });
        }
    }
}

function hideAddModal() {
    const modal = document.getElementById('addModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.visibility = 'hidden';
            modal.style.opacity = '0';
        }, 200);
    }

    const form = document.getElementById('addSubForm');
    if (form) form.reset();

    const err = document.getElementById('modalError');
    if (err) err.style.display = 'none';
}

// Add Subscription Form Handling
const addSubForm = document.getElementById('addSubForm');
if (addSubForm) {
    addSubForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const usernameInput = document.getElementById('username');
        const username = usernameInput.value.trim().replace('@', '');
        const modalError = document.getElementById('modalError');
        const addSubBtn = document.getElementById('addSubBtn');

        modalError.style.display = 'none';
        const originalBtnText = addSubBtn.textContent;
        addSubBtn.textContent = t('dashboard.adding');
        addSubBtn.disabled = true;

        try {
            const response = await fetch('/api/subscriptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });

            const data = await response.json();

            if (response.ok) {
                hideAddModal();
                loadStats();
                loadSubscriptions();
                showTab('subscriptions');
            } else {
                // Check if it's a subscription limit error
                if (data.error && (data.error.includes('limit') || data.error.includes('Subscription limit'))) {
                    hideAddModal();
                    showPremiumModal();
                } else {
                    modalError.textContent = data.error || 'Failed';
                    modalError.style.display = 'flex';
                }
            }
        } catch (err) {
            modalError.textContent = 'Connection error. Please try again.';
            modalError.style.display = 'flex';
        } finally {
            addSubBtn.textContent = originalBtnText || t('dashboard.add');
            addSubBtn.disabled = false;
        }
    });
}

// Remove Subscription
async function removeSubscription(sourceId) {
    if (!confirm(t('dashboard.confirmRemove'))) return;

    const response = await fetch(`/api/subscriptions/${sourceId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });

    if (response.ok) {
        loadStats();
        loadSubscriptions();
    }
}

// Generate Telegram Code
async function generateTelegramCode() {
    const btn = document.getElementById('generateCodeBtn');
    const originalText = btn.textContent;
    btn.textContent = t('dashboard.generating');
    btn.disabled = true;

    try {
        const data = await apiCall('/api/telegram/generate-code', { method: 'POST' });

        if (data && data.code) {
            document.getElementById('telegramCode').style.display = 'block';
            document.getElementById('codeDisplay').textContent = data.code;
            btn.textContent = t('dashboard.newCode');
            btn.disabled = false;
        } else {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    } catch (e) {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

// Time Ago Helper
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' ' + t('dashboard.timeAgo.yearAgo');

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' ' + t('dashboard.timeAgo.monthAgo');

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' ' + t('dashboard.timeAgo.dayAgo');

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' ' + t('dashboard.timeAgo.hourAgo');

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' ' + t('dashboard.timeAgo.minAgo');

    return t('dashboard.timeAgo.justNow');
}

// Expose functions to window
window.showAddModal = showAddModal;
window.hideAddModal = hideAddModal;
window.hidePremiumModal = hidePremiumModal;
window.removeSubscription = removeSubscription;
window.generateTelegramCode = generateTelegramCode;
window.loadNews = loadNews;
window.showTab = showTab;
window.logout = logout;

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSelector();
    // Delay slightly to let i18n load if async (it's sync though)
    // But i18n.js has its own DOMContentLoaded listener.
    // We can just call load functions.
    loadStats();
    loadNews();
});
