const ZaloSimulator = require('./zalo-simulator');
const MessageQueue = require('./queue');
const { getClaudeResponse } = require('./claude');
require('dotenv').config();

const zalo = new ZaloSimulator();

const processMessage = async (msg) => {
  if (msg.content.includes('@AI')) {
    // 1. Gui typing status
    await zalo.sendTyping(msg.senderId);

    // 2. Lay phan hoi tu Claude
    console.log("[System] Dang hoi y kien Claude...");
    const response = await getClaudeResponse(msg.content);

    // 3. Do tre ngau nhien truoc khi gui (human emulation)
    const finalDelay = Math.floor(Math.random() * 5000) + 2000;
    console.log(`[System] Cho ${finalDelay}ms truoc khi gui ket qua cuoi cung...`);
    await new Promise(resolve => setTimeout(resolve, finalDelay));

    // 4. Gui tin nhan
    await zalo.sendMessage(msg.senderId, response);
  }
};

const queue = new MessageQueue(processMessage);

zalo.listen((msg) => {
  queue.enqueue(msg);
});

console.log("=== HE THONG ZALO AI COWORK DA KICH HOAT ===");
