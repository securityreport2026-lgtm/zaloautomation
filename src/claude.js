const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_key',
});

async function getClaudeResponse(userMessage) {
  try {
    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      system: "Ban la mot cong su AI ca nhan tich hop tren Zalo. Hay phan tich ngu canh va tra loi ngan gon, lich su, dung phong cach cua toi.",
      messages: [{ role: "user", content: userMessage }],
    });
    return message.content[0].text;
  } catch (error) {
    console.error('Claude API Error:', error.message);
    return "Xin loi, toi dang gap su co khi xu ly tin nhan.";
  }
}

module.exports = { getClaudeResponse };
