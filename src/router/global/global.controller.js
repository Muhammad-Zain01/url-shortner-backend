const axios = require('axios');

async function globalCaptureUser(req, res) {
    const { deviceInfo, keyword } = req.body;
    // const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const userIp = ipResponse.data.ip;
    const locationResponse = await axios.get(`http://ip-api.com/json/${userIp}`);
    const userLocation = locationResponse.data;
    const currentTime = new Date();
    const data = { userIp, userData: { ...deviceInfo, ...userLocation }, time: currentTime, keyword }
    const DB = await DBInstance.addDocument('webdata')
    if (DB) {
        const result = await DB.One(data)
        console.log(result);
        if (result.acknowledged) {
            res.json({ status: 1 })
            return;
        }
    }
    res.json({ status: 0 })
}

async function globalProxyMiddleware(req, res) {
    let targetUrl = req.params.url;
    if (!targetUrl) {
        return res.status(400).json({ error: 'URL parameter is required.' });
    }
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) { targetUrl = 'https://' + targetUrl }
    try {
        const response = await axios.get(targetUrl, {
            headers: { 'User-Agent': 'CORS Proxy Server' },
            responseType: 'text'
        });
        res.header('Content-Type', 'text/html');
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching the URL' });
    }
}

module.exports = {
    globalCaptureUser,
    globalProxyMiddleware
}

