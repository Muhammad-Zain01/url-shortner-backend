const { makeKeyword } = require('../utils/helper')

function getAllData() {
    return URL_DATABASE
}
function getUrlData(keyword) {
    const result = URL_DATABASE.filter(item => item.keyword == keyword);
    if (result.length) {
        return { url: result[0].url }
    }
    return false;
}
function saveUrlData(url) {
    let keyword = makeKeyword()
    URL_DATABASE.push({ id: ID, keyword, url: url })
    return true;
}

module.exports = { getUrlData, saveUrlData, getAllData }