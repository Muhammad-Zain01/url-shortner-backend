const { getUrlData, saveUrlData, getAllData } = require('../model/url.model')

function getAllURL(req, res) {
    res.json(getAllData())
}
function getURL(req, res) {
    const keyword = req.params.keyword
    const result = getUrlData(keyword);
    if (result) {
        return res.status(200).json({ ...result, status: 200 });
    }
    return res.status(404).json({ status: 404, message: 'Page Not Found' });
}

function saveURL(req, res) {
    const body = req.body
    if (body.url) {
        saveUrlData(body.url)
        return res.status(200).json({ status: 200, message: 'URL has been saved Successfully' })
    }
    res.status(404).json({ status: 404, message: 'Url Not Found' })
}
function updateURL(req, res) {
    const body = req.body
    // WORKING
}
function removeURL(req, res) {
    const body = req.body
    // WORKING
}

module.exports = {
    getURL,
    saveURL,
    updateURL,
    removeURL,
    getAllURL
}