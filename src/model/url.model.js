let URL_DATABASE = [
    {
        id: 0,
        keyword: 'BxkeYl',
        url: 'www.google.com'
    }
]
let ID = 1;
const getUrlData = (keyword) => {
    const result = URL_DATABASE.filter(item => item.keyword == keyword);
    if (result.length) {
        return { url: result[0].url }
    }
    return false;
}


module.exports = { getUrlData }