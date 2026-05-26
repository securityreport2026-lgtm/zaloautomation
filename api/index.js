const axios = require('axios');

module.exports = async function handler(req, res) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // WEBHOOK ENDPOINT
    if (req.method === 'POST' && req.url === '/api/webhook') {
        const LOCAL_URL = process.env.LOCAL_TUNNEL_URL;
        
        try {
            console.log('[WEBHOOK] Nhận dữ liệu từ Zalo');
            // Chuyển tiếp tin nhắn về máy tính cá nhân để Cowork xử lý
            if (LOCAL_URL) {
                await axios.post(`${LOCAL_URL}/receive`, req.body).catch(e => 
                    console.log('Chưa kết nối được với máy cá nhân')
                );
            }
            return res.status(200).send('OK');
        } catch (error) {
            console.error('[LỖI CHUYỂN TIẾP]:', error.message);
            return res.status(200).send('OK');
        }
    }

    // HEALTH CHECK
    if (req.method === 'GET' && (req.url === '/api/webhook' || req.url === '/api/health')) {
        return res.status(200).json({ status: 'live', message: 'Zalo Bot is running!' });
    }

    return res.status(200).send('Zalo Bot Ready');
};