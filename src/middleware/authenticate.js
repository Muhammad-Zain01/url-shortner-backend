const { users } = require('../db/schema')
const { Decode } = require('../utils/jwt')
const AuthenticateUser = async (req, res, next) => {
    const header = req.headers
    const bearerToken = header.authorization
    if (bearerToken) {
        const bearer = bearerToken.split(' ');
        const token = bearer[1];
        const userData = Decode(token);
        if (userData) {
            const username = userData.username;
            req.body.user = { username }
            const result = await users.findOne({ username })
            if (result) {
                return next();
            }
        }
    }
    return res.json({ status: 0, message: 'INVALID_TOKEN' })
}

module.exports = AuthenticateUser