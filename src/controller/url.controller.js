const { getUrlData, saveUrlData, getAllData } = require('../model/url.model')
const DBInstance = require('../utils/database')
const { makeKeyword } = require('../utils/helper')
const axios = require('axios');
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
                keyword: item.keyword,
                icon: item.icon
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
    const links = {
        user: username,
        url: body?.url,
        title: body?.title,
        keyword,
        icon: body?.icon
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
async function CaptureUser(req, res) {
    const { deviceInfo, keyword } = req.body;
    // const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const userIp = ipResponse.data.ip;
    const locationResponse = await axios.get(`http://ip-api.com/json/${userIp}`);
    const userLocation = locationResponse.data;
    const currentTime = new Date();
    const data =  { userIp, userData: { ...deviceInfo, ...userLocation }, time: currentTime, keyword }
    const DB = await DBInstance.addDocument('webdata')
    if(DB){
        const result = await DB.One(data)
        console.log(result);
        if(result.acknowledged){
            res.json({ status: 1 })
            return;
        }
    }
    res.json({ status: 0 })
}
module.exports = {
    getData,
    addURL,
    updateURL,
    removeURL,
    getAllURL,
    CaptureUser
}