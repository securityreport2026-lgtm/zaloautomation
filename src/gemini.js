const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function getGeminiResponse(userMessage) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error.message);
        return null;
    }
}

module.exports = { getGeminiResponse };