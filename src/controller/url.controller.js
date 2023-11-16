const { getUrlData, saveUrlData, getAllData } = require('../model/url.model')
const DBInstance = require('../utils/database')
const { makeKeyword } = require('../utils/helper')
const URL_DATABASE = []
function getAllURL(req, res) {
    res.json(getAllData())
}
async function getData(req, res) {
    const body = req.body;
    const user = body?.user;
    const doc = await DBInstance.getData('urls');
    if (doc) {
        const result = await doc.where({ user: user.username })
        const data = result.map(item => {
            return {
                url: item.url,
                title: item.title,
                keyword: item.keyword
            }
        })
        res.json({ status: 1, data })
        return;
    }
    res.json({ status: 0 })

}

async function addURL(req, res) {
    const body = req.body
    // const userId = Buffer.from(body?.user?.token, 'base64').toString('hex');
    const username = body?.user?.username
    let keyword = body.keyword;
    if (keyword == "") {
        keyword = makeKeyword()
    }
    console.log(req.body);
    const links = {
        user: username,
        url: body?.url,
        title: body?.title,
        keyword
    }
    console.log(links);
    const doc = await DBInstance.addDocument('urls')
    if (doc) {
        const result = await doc.One(links);
        if (result.acknowledged) {
            res.json({ status: 1 })
            return;
        }
        res.json({ status: 0 })
    }
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
    getData,
    addURL,
    updateURL,
    removeURL,
    getAllURL
}