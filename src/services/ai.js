const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

// Rate limit tracking
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests
let consecutiveErrors = 0;
const MAX_RETRIES = 3;

async function analyzeContent(username, content) {
    // Check for API key
    if (!process.env.GEMINI_API_KEY) {
        console.warn('UYARI: GEMINI_API_KEY eksik. Mock yanıt dönülüyor.');
        return getMockResponse();
    }

    // Rate limiting - wait if needed
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        await sleep(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
    }
    lastRequestTime = Date.now();

    const prompt = `
Sen uzman bir haber editörü ve filtreleme asistanısın. Görevin, sosyal medya paylaşımlarını analiz edip "gürültüden" arındırmak ve sadece haber değeri taşıyan somut bilgileri özetlemektir.

TWEET:
@${username}: "${content}"

Bu paylaşımı analiz et ve aşağıdaki JSON formatında yanıt ver:

{
  "is_news_worthy": true/false,
  "reason": "Kısa açıklama",
  "summary": ["Madde 1", "Madde 2", "Madde 3"],
  "category": "Kategori",
  "sentiment": "Pozitif" | "Nötr" | "Negatif"
}
`;

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
        reason: "Beta mode: AI analizi geçici olarak mock veri kullanıyor.",
        summary: [
            "Bu içerik beta demo modunda analiz edildi.",
            "Gerçek AI analizi rate limit sonrası devam edecek.",
            "Sistem normal şekilde çalışmaya devam ediyor."
        ],
        category: "Genel",
        sentiment: "Nötr"
    };
}

// Sleep helper
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { analyzeContent };
