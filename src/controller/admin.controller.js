const { makeKeyword } = require('../utils/helper');

const {
    getUrls,
    insertUrl,
    getDisplayName,
    verifyKeyword,
    deleteUrl,
    getUserDashboardData,
    updateDisplayName,
    getUser,
    updatePassword,
    verifyUser,
    resendCode
} = require('../model/admin.modal')

async function httpGetData(req, res) {
    const body = req.body;
    const user = body?.user;
    const result = await getUrls(user);
    res.json(result)
}
async function httpDashboardData(req, res) {
    const body = req.body;
    const user = body?.user;
    const result = await getUserDashboardData(user);
    res.json(result)
}
async function httpRemoveUrl(req, res) {
    const keyword = req.params.keyword
    const result = await deleteUrl(keyword);
    res.json(result)
}
async function httpAddUrl(req, res) {
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
async function httpVerifyKeyword(req, res) {
    const keyword = req.params.keyword
    const result = await verifyKeyword(keyword);
    res.json(result);
}
async function httpDisplayName(req, res) {
    const body = req.body;
    const user = body?.user;
    const result = await getDisplayName(user);
    res.json(result);
}
async function httpUpdateDisplayName(req, res) {
    const body = req.body;
    const user = body?.user;
    const name = body?.name;
    const result = await updateDisplayName(user, name);
    res.json(result)
}
async function httpGetUserData(req, res) {
    const body = req.body;
    const user = body?.user;
    const result = await getUser(user);
    res.json(result);
}
async function httpUpdatePassword(req, res) {
    const body = req.body;
    const user = body?.user;
    const currentPassword = body?.currentPassword;
    const newPassword = body?.newPassword;
    const result = await updatePassword(user, currentPassword, newPassword);
    res.json(result);
}
async function httpVerification(req, res) {
    const body = req.body;
    const user = body?.user;
    const username = user.username
    const code = body?.code;
    const result = await verifyUser(code, username);
    res.json(result);
}
async function httpResendEmail(req, res) {
    const body = req.body;
    const user = body?.user;
    const username = user.username
    const result = await resendCode(username);
    res.json(result);
}
module.exports = {
    httpResendEmail,
    httpVerification,
    httpGetData,
    httpDashboardData,
    httpRemoveUrl,
    httpAddUrl,
    httpVerifyKeyword,
    httpDisplayName,
    httpUpdateDisplayName,
    httpGetUserData,
    httpUpdatePassword,
}