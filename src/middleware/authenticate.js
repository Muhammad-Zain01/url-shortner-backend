const DBInstance = require('../utils/database');
const AuthenticateUser = async (req, res, next) => {
    const body = req.body;
    const user = body?.user;
    const PARAM = []
    if (user) {
        const token = user?.token;
        const username = user?.username;
        const doc = await DBInstance.getData('users')
        try {
            const data = await doc.where({ username })
            if (data.length > 0) {
                const user_id = Buffer.from(data[0]._id.toHexString(), 'hex').toString('base64');
                PARAM.push({ cond: user_id == token })
                if (user_id == token) {
                    return next();
                } else {
                    return res.json({ status: 0, message: 'INVALID_TOKEN', param: PARAM })
                }
            } else {
                return res.json({ status: 0, message: 'NON_USER', param: PARAM })
            }
        } catch (e) {
            return res.json({ error: e })
        }
    }
}

module.exports = AuthenticateUser