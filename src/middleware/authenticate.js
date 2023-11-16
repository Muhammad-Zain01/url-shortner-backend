const DBInstance = require('../utils/database');
const AuthenticateUser = async (req, res, next) => {
    const body = req.body;
    const user = body?.user;
    if (user) {
        const token = user?.token;
        const username = user?.username;
        const doc = await DBInstance.getData('users')
        if (doc) {
            const data = await doc.where({ username })
            if (data.length > 0) {
                const user_id = Buffer.from(data[0]._id.toHexString(), 'hex').toString('base64');
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
}

module.exports = { AuthenticateUser }