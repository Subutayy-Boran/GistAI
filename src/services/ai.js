const Groq = require("groq-sdk");

// Initialize Groq SDK
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || 'dummy_key'
});

// Model configuration - LLaMA 3.3 70B is fast, high-quality, and cost-effective
const MODEL_NAME = "llama-3.3-70b-versatile";

// Rate limit tracking - Groq is much faster, so we can reduce intervals
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests (Groq is fast!)
let consecutiveErrors = 0;
const MAX_RETRIES = 3;

async function analyzeContent(username, content) {
    // Check for API key
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'dummy_key') {
        console.warn('⚠️ GROQ_API_KEY missing. Returning mock response.');
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

RESPOND IN JSON FORMAT ONLY (no markdown, no code blocks):
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
            const completion = await groq.chat.completions.create({
                model: MODEL_NAME,
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.3, // Lower temperature for more consistent, factual responses
                max_tokens: 500,
                response_format: { type: "json_object" } // Force JSON response
            });

            let text = completion.choices[0].message.content;

            // Clean up any potential markdown artifacts (shouldn't happen with json_object mode)
            text = text.replace(/```json/g, '').replace(/```/g, '').trim();

            const jsonResult = JSON.parse(text);
            consecutiveErrors = 0; // Reset on success

            console.log(`✅ AI analysis successful for @${username}`);
            return jsonResult;

        } catch (error) {
            consecutiveErrors++;

            // Check if rate limited
            if (error.message && (error.message.includes('rate_limit') || error.message.includes('429'))) {
                console.warn(`⚠️ Groq rate limit hit (attempt ${attempt + 1}/${MAX_RETRIES}). Retrying...`);

                if (attempt < MAX_RETRIES - 1) {
                    await sleep(2000 * (attempt + 1)); // Exponential backoff
                    continue;
                }

                // After all retries, return mock response
                console.log('📊 Returning mock AI response due to rate limit');
                return getMockResponse();
            }

            // Other errors
            console.error('Groq AI Analysis Error:', error.message || error);

            if (attempt < MAX_RETRIES - 1) {
                await sleep(1000 * (attempt + 1)); // Exponential backoff
                continue;
            }
        }
    }

    // Fallback to mock response after all retries fail
    console.warn('⚠️ All AI analysis attempts failed, using mock response');
    return getMockResponse();
}

// Mock response for rate limit or error situations
function getMockResponse() {
    return {
        is_news_worthy: true,
        importance_score: 5,
        title: "Content Analysis in Progress",
        summary: "This content is being analyzed. AI analysis will resume shortly.",
        categories: ["General"],
        sentiment: "Neutral"
    };
}

// Sleep helper
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { analyzeContent };
