const { makeKeyword } = require('../../utils/helper');
const {
    getAllUrls,
    insertUrl,
    getDisplayName,
    verifyKeyword,
    deleteUrl,
    getUserDashboardData,
    setdisplayName
} = require('../../model/admin.modal')
async function adminGetData(req, res) {
    const body = req.body;
    const user = body?.user;
    const result = await getAllUrls(user);
    res.json(result)
}
async function adminDashboardData(req, res) {
    const body = req.body;
    const user = body?.user;
    const result = await getUserDashboardData(user);
    res.json(result)
}
async function removeURL(req, res) {
    const keyword = req.params.keyword
    const result = await deleteUrl(keyword);
    res.json(result)
}
async function adminAddURL(req, res) {
    const body = req.body
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
async function DisplayName(req, res) {
    const body = req.body;
    const user = body?.user;
    const result = await getDisplayName(user);
    res.json(result);
}
async function setDisplayName(req, res) {
    const body = req.body;
    const user = body?.user;
    const name = body?.name;
    const result = await setdisplayName(user, name);
    res.json(result)

}
module.exports = {
    adminGetData,
    adminAddURL,
    adminVerifyKeyword,
    removeURL,
    adminDashboardData,
    DisplayName,
    setDisplayName
}