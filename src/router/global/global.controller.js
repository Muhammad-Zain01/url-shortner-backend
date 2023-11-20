const axios = require('axios');
const { captureUser } = require('../../model/global.model')
const { verifyKeyword } = require('../../model/admin.modal')
async function globalCaptureUser(req, res) {
    const keyword = req.params.keyword;
    const keywordresponse = await verifyKeyword(keyword)
    if (keywordresponse.status) {
        return res.redirect(`${process.env.CLIENT_URL}/not-found`)
    }
    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const userIp = ipResponse.data.ip;
    const locationResponse = await axios.get(`http://ip-api.com/json/${userIp}`);
    const userLocation = locationResponse.data;
    const currentTime = new Date();
    const data = { userIp, userData: { ...userLocation }, time: currentTime, keyword }
    await captureUser(data)
    res.redirect("https://" + keywordresponse?.data?.url);
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
    globalProxyMiddleware,
}

