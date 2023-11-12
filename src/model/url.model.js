let URL_DATABASE = [
    {
        id: 0,
        keyword: 'BxkeYl',
        url: 'www.google.com'
    }
]
let ID = 1;
function makeKeyword(length = 8) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

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