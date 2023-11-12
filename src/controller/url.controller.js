const { getUrlData } = require('../model/url.model')

function getURL(req, res) {
    const keyword = req.params.keyword
    const result = getUrlData(keyword);
    if(result){
        return res.status(200).json({...result, status: 200});
    }
    return res.status(404).json({status: 404, message: 'Page Not Found'});
}

function saveURL(req, res) {
    const body = req.body
    // WORKING
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
    removeURL
}