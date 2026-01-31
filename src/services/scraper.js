const axios = require('axios');
const xml2js = require('xml2js');
const config = require('../config/config');

// RSS Feed instances (backup, currently unstable)
const RSS_INSTANCES = [
    'https://nitter.net',
    'https://nitter.cz',
    'https://nitter.privacydev.net',
    'https://nitter.poast.org',
    'https://nitter.moomoo.me',
];

let currentInstanceIndex = 0;

/**
 * PHASE 0 MVT: Enhanced Mock Data Generator
 * 50+ realistic news templates across 6 categories
 */
function generateMockTweets(username) {
    console.log(`🧪 BETA MODE: Generating realistic demo news for @${username}`);

    const mockTemplates = {
        'Tech': [
            'BREAKING: New AI model achieves human-level performance on complex reasoning tasks, researchers announce breakthrough',
            'Major tech company announces layoffs affecting 15,000 employees amid restructuring efforts',
            'Critical zero-day vulnerability discovered in popular software, affects millions of users worldwide',
            'Startup raises $100M Series B for revolutionary quantum computing platform',
            'Apple announces surprise product event for next week, speculation grows about new device category',
            'Microsoft reports record quarterly earnings, cloud revenue up 40% year-over-year',
            'Google faces antitrust lawsuit over search monopoly practices in multiple countries',
            'Tesla unveils next-generation battery technology promising 500-mile range',
            'Meta announces major AI research breakthrough in natural language understanding',
            'Massive data breach exposes personal information of 50 million users from tech platform'
        ],
        'Finance': [
            'Federal Reserve announces surprise interest rate decision, markets react',
            'Major investment bank reports Q4 earnings beat expectations by 20%',
            'Stock market experiences highest volatility since 2020 pandemic crisis',
            'Bitcoin surges past $80,000 following institutional adoption news',
            'Banking sector faces new regulations from financial authorities',
            'Inflation rate hits 5-year high, prompting emergency economic measures',
            'Global markets rally on positive trade agreement between major economies',
            'Cryptocurrency exchange files for bankruptcy following $800M hack',
            'Real estate market shows signs of cooling as mortgage rates climb',
            'Gold prices soar to record highs amid economic uncertainty'
        ],
        'Politics': [
            'Breaking: Major policy announcement expected from government officials today',
            'International summit concludes with historic agreement on climate action',
            'Election results show unexpected shift in voter preferences across key districts',
            'New bill passes legislature with bipartisan support after months of negotiations',
            'Political scandal emerges as documents reveal undisclosed foreign connections',
            'Supreme Court delivers landmark ruling on constitutional rights case',
            'Diplomatic tensions escalate between nations following controversial statement',
            'Emergency session called to address developing national security situation',
            'Opposition party demands investigation into alleged government misconduct',
            'Trade negotiations reach critical phase as deadline approaches'
        ],
        'Science': [
            'Scientists discover potential cure for rare disease in groundbreaking study',
            'NASA announces successful launch of next-generation space telescope',
            'Climate researchers warn of accelerating ice sheet collapse in Antarctica',
            'Medical breakthrough: New cancer treatment shows 90% effectiveness in trials',
            'Astronomers detect unusual signal from distant galaxy raising questions',
            'Vaccine development progresses rapidly, human trials show promising results',
            'Environmental study reveals alarming rate of biodiversity loss in key ecosystem',
            'Physics team confirms existence of theoretical particle after decade-long search',
            'Ocean expedition discovers previously unknown deep-sea species and ecosystems',
            'Renewable energy efficiency reaches milestone, making solar cheaper than fossil fuels'
        ],
        'Business': [
            'Fortune 500 company announces merger deal valued at $40 billion',
            'Retail giant reports disappointing earnings, shares drop 15% in after-hours trading',
            'Startup disrupts traditional industry with innovative business model, gains traction',
            'Supply chain crisis deepens as major shipping routes face continued disruptions',
            'E-commerce platform reaches 1 billion users milestone amid pandemic shift',
            'Automotive manufacturer recalls 500,000 vehicles due to safety concerns',
            'Fast food chain announces expansion into plant-based menu options nationwide',
            'Airline industry faces turbulence as fuel costs surge to decade highs',
            'Tech giant acquires AI startup for undisclosed sum, strengthening capabilities',
            'Pharmaceutical company stock soars following FDA approval of new drug'
        ],
        'Sports': [
            'Upset! Underdog team defeats champion in stunning playoff victory',
            'Record broken: Athlete achieves what was thought impossible in their sport',
            'Major league announces expansion teams for two new cities next season',
            'Doping scandal rocks international competition, multiple medals stripped',
            'Star player signs historic $500M contract extension with team',
            'Olympics venue construction delayed, organizers scramble to meet deadline',
            'Legendary coach announces retirement after 30-year career',
            'Controversial referee decision sparks debate across sports world',
            'Young phenom becomes youngest player ever to achieve major milestone',
            'League suspends season following health and safety concerns'
        ],
        'World': [
            'Natural disaster strikes region, emergency response teams mobilized',
            'Humanitarian crisis develops as conflict displaces millions of refugees',
            'Historic peace agreement signed after years of negotiations',
            'Global pandemic response team warns of new variant spreading rapidly',
            'Earthquake measuring 7.5 hits populated area, casualties reported',
            'International aid reaches crisis zone after weeks of blocked access',
            'Cultural heritage site damaged in conflict, world leaders condemn attack',
            'Mass protests erupt in capital city demanding government reforms',
            'Border dispute escalates into military confrontation between neighbors',
            'Nobel Prize awarded for work advancing human rights in oppressed region'
        ]
    };

    // Generate 3-5 realistic tweets from random categories
    const categories = Object.keys(mockTemplates);
    const numTweets = Math.floor(Math.random() * 3) + 3; // 3-5 tweets
    const tweets = [];

    for (let i = 0; i < numTweets; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const templates = mockTemplates[category];
        const content = templates[Math.floor(Math.random() * templates.length)];

        // Ensure we don't repeat the same tweet
        if (tweets.find(t => t.content === content)) {
            continue;
        }

        tweets.push({
            id: `mock_${username}_${Date.now()}_${i}`,
            content: content,
            timestamp: new Date(Date.now() - (i * 3600000 * Math.random() * 6)).toISOString(), // 0-6 hours ago
            source: 'beta_demo',
            category: category
        });
    }

    return tweets;
}

/**
 * Strip HTML tags from string (for RSS parsing)
 */
function stripHtml(html) {
    return html
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]*>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .trim();
}

/**
 * Fetch tweets via Nitter RSS feed (currently unstable)
 */
async function fetchFromRSS(username, rssBaseUrl) {
    const rssUrl = `${rssBaseUrl}/${username}/rss`;

    try {
        console.log(`📡 Attempting RSS fetch from: ${rssUrl}`);

        const response = await axios.get(rssUrl, {
            timeout: 20000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            validateStatus: (status) => status < 500
        });

        if (response.status !== 200) {
            throw new Error(`HTTP ${response.status}`);
        }

        const parser = new xml2js.Parser({
            explicitArray: false,
            ignoreAttrs: false
        });

        const result = await parser.parseStringPromise(response.data);

        if (!result.rss || !result.rss.channel || !result.rss.channel.item) {
            throw new Error('Invalid RSS structure');
        }

        const items = Array.isArray(result.rss.channel.item)
            ? result.rss.channel.item
            : [result.rss.channel.item];

        const tweets = items.slice(0, 10).map((item, index) => {
            const content = stripHtml(item.description || '');
            const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

            return {
                id: item.guid || `rss_${username}_${Date.now()}_${index}`,
                content: content,
                timestamp: pubDate.toISOString(),
                source: 'rss'
            };
        }).filter(tweet => tweet.content.length > 10);

        console.log(`✅ RSS success: ${tweets.length} tweets from ${rssBaseUrl}`);
        return tweets;

    } catch (err) {
        console.error(`❌ RSS failed (${rssBaseUrl}):`, err.message);
        throw err;
    }
}

/**
 * Main scraper function
 * PHASE 0: Returns mock data for MVT testing
 * PHASE 1+: Will use real Twitter API
 */
async function fetchLatestPosts(username, platform = 'twitter') {
    if (platform !== 'twitter') {
        throw new Error('Only Twitter is supported');
    }

    // PHASE 0 MVT: Use enhanced mock data
    // This allows us to test the entire flow without API costs
    const USE_MOCK_DATA = process.env.PHASE === '0' || process.env.USE_BETA_MODE === 'true';

    if (USE_MOCK_DATA) {
        console.log(`📊 BETA MODE ACTIVE: Using realistic demo data for @${username}`);
        return generateMockTweets(username);
    }

    // PHASE 1+: Try RSS first, then fallback to mock
    for (let attempt = 0; attempt < RSS_INSTANCES.length; attempt++) {
        const instance = RSS_INSTANCES[(currentInstanceIndex + attempt) % RSS_INSTANCES.length];

        try {
            const tweets = await fetchFromRSS(username, instance);

            if (tweets && tweets.length > 0) {
                currentInstanceIndex = (currentInstanceIndex + attempt + 1) % RSS_INSTANCES.length;
                return tweets;
            }
        } catch (err) {
            console.warn(`Instance ${instance} failed, trying next...`);
            continue;
        }
    }

    // All RSS failed - use mock data as fallback
    console.warn(`⚠️ All RSS instances unavailable for @${username}, using beta demo data`);
    return generateMockTweets(username);
}

module.exports = { fetchLatestPosts, generateMockTweets };
