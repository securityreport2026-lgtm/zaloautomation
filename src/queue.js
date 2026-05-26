class MessageQueue {
  constructor(processCallback) {
    this.queue = [];
    this.processing = false;
    this.processCallback = processCallback;
  }

  async enqueue(message) {
    this.queue.push(message);
    if (!this.processing) {
      this.process();
    }
  }

  async process() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const message = this.queue.shift();

    console.log(`[Queue] Dang xu ly tin nhan tu: ${message.senderId}`);

    // Think delay (3-7s)
    const thinkDelay = Math.floor(Math.random() * 4000) + 3000;
    await new Promise(resolve => setTimeout(resolve, thinkDelay));

    await this.processCallback(message);

    this.process();
  }
}

module.exports = MessageQueue;
