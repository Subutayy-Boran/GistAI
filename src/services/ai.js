const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini with stable model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// Rate limit tracking - increased for stability
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 5000; // 5 seconds between requests (increased from 2s)
let consecutiveErrors = 0;
const MAX_RETRIES = 3;

async function analyzeContent(username, content) {
    // Check for API key
    if (!process.env.GEMINI_API_KEY) {
        console.warn('⚠️ GEMINI_API_KEY missing. Returning mock response.');
        return getMockResponse();
    }

    // Rate limiting - wait if needed
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        await sleep(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
    }
    lastRequestTime = Date.now();

    const prompt = `You are an expert AI news analyst. Analyze this tweet and determine if it's newsworthy.

CRITERIA FOR NEWS VALUE:
✅ Product launches, company announcements
✅ Major funding, acquisitions, partnerships  
✅ Technical breakthroughs or innovations
✅ Policy changes, regulations
✅ Market-moving data or research
✅ Significant events or incidents

❌ Personal opinions without facts
❌ Jokes, memes, casual conversation
❌ Self-promotion without substance

TWEET:
@${username}: "${content}"

RESPOND IN JSON:
{
  "is_news_worthy": true/false,
  "importance_score": 1-10,
  "title": "Short engaging headline (max 10 words)",
  "summary": "1-2 sentence summary of key facts",
  "categories": ["Tech", "Finance", "Politics", "Science", "General"],
  "sentiment": "Positive" | "Neutral" | "Negative"
}

EXAMPLES:
✅ "Apple announces iPhone 16 with AI chip" → importance: 9
❌ "Good morning everyone!" → importance: 0
✅ "Fed cuts interest rates by 0.5%" → importance: 10
❌ "Just my thoughts on crypto..." → importance: 2`;

    // Retry loop with exponential backoff
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text();

            // Markdown code block temizliği
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();

            const jsonResult = JSON.parse(text);
            consecutiveErrors = 0; // Reset on success
            return jsonResult;

        } catch (error) {
            consecutiveErrors++;

            // Check if rate limited (429)
            if (error.message && error.message.includes('429')) {
                console.warn(`⚠️ Gemini rate limit hit (attempt ${attempt + 1}/${MAX_RETRIES}). Using mock response.`);

                // Extract retry delay if available
                const retryMatch = error.message.match(/retry in (\d+)/i);
                const retryDelay = retryMatch ? parseInt(retryMatch[1]) * 1000 : 5000;

                if (attempt < MAX_RETRIES - 1) {
                    await sleep(retryDelay);
                    continue;
                }

                // After all retries, return mock response
                console.log('📊 Returning mock AI response due to rate limit');
                return getMockResponse();
            }

            // Other errors
            console.error('Gemini AI Analiz Hatası:', error.message || error);

            if (attempt < MAX_RETRIES - 1) {
                await sleep(1000 * (attempt + 1)); // Exponential backoff
                continue;
            }
        }
    }

    // Fallback to mock response after all retries fail
    return getMockResponse();
}

// Mock response for rate limit or error situations
function getMockResponse() {
    return {
        is_news_worthy: true,
        importance_score: 5,
        title: "Beta Mode: Using Mock Data",
        summary: "This content is being analyzed in beta demo mode. Real AI analysis will resume after rate limit recovery.",
        categories: ["General"],
        sentiment: "Neutral"
    };
}

// Sleep helper
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { analyzeContent };
