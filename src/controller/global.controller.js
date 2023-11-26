const axios = require('axios');
const { captureUser } = require('../model/global.model')
const { verifyKeyword } = require('../model/admin.modal')
const {joinUrl} = require('../utils/helper')
async function httpCaptureUser(req, res) {
    const keyword = req.params.keyword;
    const keywordResponse = await verifyKeyword(keyword)
    if (!keywordResponse.status) {
        return res.redirect(`${process.env.CLIENT_URL}/not-found`)
    }
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const locationResponse = await axios.get(`http://ip-api.com/json/${userIp}`);
    const userLocation = locationResponse.data;
    const currentTime = new Date();
    const data = { ip: userIp, data: { location: userLocation, headers: req.headers  }, time: currentTime, keyword }
    await captureUser(data)
    res.redirect(joinUrl(keywordResponse?.result?.url));
}

async function httpProxyMiddleware(req, res) {
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
    httpCaptureUser,
    httpProxyMiddleware,
}

