const { isUserNameAvailable, registerUser, authenticateUser } = require('../model/auth.model');
async function httpVerifyUsername(req, res) {
    const username = req.params.username;
    res.json(await isUserNameAvailable(username))
}
async function httpRegisterUser(req, res) {
    const body = req.body;
    const username = body?.username
    const email = body?.email
    const password = req.body?.password
    res.json(await registerUser(username, email, password))
}
async function httpLoginUser(req, res) {
    const body = req.body;
    const username = body?.username
    const password = body?.password
    res.json(await authenticateUser(username, password));
}

module.exports = {
    httpVerifyUsername,
    httpRegisterUser,
    httpLoginUser,
}