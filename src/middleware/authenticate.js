const DBInstance = require('../utils/database');
const AuthenticateUser = async (req, res, next) => {
    const body = req.body;
    const user = body?.user;
    const PARAM = []
    PARAM.push(user)
    if (user) {
        PARAM.push("USER")
        const token = user?.token;
        const username = user?.username;
        const doc = await DBInstance.getData('users')
        PARAM.push(doc)
        if (doc) {
            const data = await doc.where({ username })
            PARAM.push(data)
            if (data.length > 0) {
                PARAM.push("DATA")
                const user_id = Buffer.from(data[0]._id.toHexString(), 'hex').toString('base64');
                PARAM.push(user_id)
                if(user_id == token){
                    next();
                }else{
                    res.json({ status: 0, message: 'INVALID_TOKEN' })
                }
            } else {
                res.json({ status: 0, message: 'NON_USER' })
            }
        }
    }
    res.json({ status: 0, message: 'AUTHENTICATION FAILED', param: PARAM })
}

module.exports = AuthenticateUser