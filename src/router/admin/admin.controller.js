const { getAllUrls, insertUrl, verifyKeyword, deleteUrl } = require('../../model/admin.modal')
const { makeKeyword } = require('../../utils/helper');
async function adminGetData(req, res) {
    const body = req.body;
    const user = body?.user;
    const result = await getAllUrls(user);
    res.json(result)
}
async function removeURL(req, res) {
    const keyword = req.params.keyword
    const result = await deleteUrl(keyword);
    res.json(result)
}
async function adminAddURL(req, res) {
    const body = req.body
    // const userId = Buffer.from(body?.user?.token, 'base64').toString('hex');
    const username = body?.user?.username
    let keyword = body.keyword;
    if (keyword == "") { keyword = makeKeyword() }

    const links = {
        user: username,
        url: body?.url,
        title: body?.title,
        keyword,
        icon: body?.icon
    }
    const result = await insertUrl(links);
    res.json(result);
}
async function adminVerifyKeyword(req, res) {
    const keyword = req.params.keyword
    const result = await verifyKeyword(keyword);
    res.json(result);
}
module.exports = {
    adminGetData,
    adminAddURL,
    adminVerifyKeyword,
    removeURL
}