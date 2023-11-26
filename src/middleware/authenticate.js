const { users } = require('../db/schema')
const AuthenticateUser = async (req, res, next) => {
    const body = req.body;
    const user = body?.user;
    const username = user?.username;
    const token = user?.token;
    const result = await users.findOne({ username })
    if (result) {
        const user_id = Buffer.from(result._id.toHexString(), 'hex').toString('base64');
        if (user_id == token) {
            return next();
        } else {
            return res.json({ status: 0, message: 'INVALID_TOKEN' })
        }
    }else{
        return res.json({status: 0, message: 'INVALID_USER'})
    }
}

module.exports = AuthenticateUser