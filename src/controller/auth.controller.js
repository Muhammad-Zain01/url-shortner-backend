const { isUserNameAvailable, registerUser, authenticateUser, ForgotPasswordEmailVerfication, ResetCode } = require('../model/auth.model');
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
async function httpForgotPasswordEmailVerification(req, res) {
    const body = req.body;
    const username = body?.username;
    const result = await ForgotPasswordEmailVerfication(username);
    res.json(result);
}
async function httpResetCode(req, res) {
    const body = req.body;
    const token = body?.token;
    const code = body?.code;
    const result = await ResetCode(token, code);
    res.json(result);
}
module.exports = {
    httpResetCode,
    httpForgotPasswordEmailVerification,
    httpVerifyUsername,
    httpRegisterUser,
    httpLoginUser,
}