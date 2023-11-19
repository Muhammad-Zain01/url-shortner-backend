const { checkUsername, registerUser, authenticateUser } = require('../../model/auth.model');


async function authCheckUsername(req, res) {
    const username = req.params.username;
    const result = await checkUsername(username)
    res.json(result);
}
async function authRegisterUser(req, res) {
    const username = req.body?.username
    const email = req.body?.email
    const password = req.body?.password
    const result = await registerUser(username, email, password)
    res.json(result);
}
async function authLoginUser(req, res) {
    const username = req.body?.username
    const password = req.body?.password
    const result = await authenticateUser(username, password);
    res.json(result);
}

module.exports = {
    authCheckUsername,
    authRegisterUser,
    authLoginUser
}