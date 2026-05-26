class ZaloSimulator {
  constructor() {
    this.cookie = process.env.ZALO_COOKIE;
  }

  async listen(onMessage) {
    console.log("[Zalo] Dang mo ket noi WebSocket gia lap...");
    // Gia lap nhan tin nhan sau moi 10 giay de test
    setInterval(() => {
      const mockMessage = {
        senderId: "User123",
        content: "Chao @AI, ban co the giup toi lap ke hoach cong viec hom nay khong?",
        timestamp: Date.now()
      };
      console.log(`[Zalo] Nhan tin nhan moi: ${mockMessage.content}`);
      onMessage(mockMessage);
    }, 15000);
  }

  async sendTyping(toId) {
    console.log(`[Zalo] Dang gui trang thai "Dang soan tin..." den ${toId}`);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  async sendMessage(toId, text) {
    // Mo phong do tre go phim (200ms moi ky tu)
    const typingDelay = text.length * 50; 
    console.log(`[Zalo] Dang mo phong go ${text.length} ky tu (du kien ${typingDelay}ms)...`);
    await new Promise(resolve => setTimeout(resolve, typingDelay));
    
    console.log(`[Zalo] ===> DA GUI PHAN HOI den ${toId}: ${text}`);
  }
}

module.exports = ZaloSimulator;
