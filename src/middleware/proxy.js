const axios = require('axios');
async function ProxyMiddleware(req, res) {
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

module.exports = ProxyMiddleware;