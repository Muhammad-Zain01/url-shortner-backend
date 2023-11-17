const DATABASE = require('../utils/database');


async function CheckUsername(req, res) {
    const USERNAME = req.params.username;
    const Data = await DATABASE.getData('users')
    if (Data) {
        const FilteredData = await Data.where({ username: USERNAME })
        res.json({ status: FilteredData.length > 0 ? 1 : 0 })
        return;
    }
    res.json({ status: 0 })
}
async function RegisterUser(req, res) {
    const username = req.body?.username
    const email = req.body?.email
    const password = req.body?.password
    const DB = await DATABASE.addDocument('users')
    if (DB) {
        DB.One({ username, email, password })
        res.json({ status: 1, message: 'User Created Successfully' })
        return;
    }
    res.json({ status: 0, message: 'Something Went Wrong' })
}
async function VerifyKeyword(req, res) {
    const keyword = req.params.keyword
    const DB = await DATABASE.getData('urls')
    if (DB) {
        const response = await DB.where({ keyword })
        if (response.length > 0) {
            res.json({ status: 0, data: response[0] })
        } else {
            res.json({ status: 1 })
        }
        return;
    }
    res.json({ status: 0 })
}
async function LoginUser(req, res) {
    const username = req.body?.username
    const password = req.body?.password
    const DB = await DATABASE.getData('users')
    if (DB) {
        const response = await DB.where({ username, password })
        if (response.length > 0) {
            const base64String = Buffer.from(response[0]._id.toHexString(), 'hex').toString('base64');
            res.json({ status: 1, data: { username: response[0].username, email: response[0].email, token: base64String } })
            return;
        }
    }
    res.json({ status: 0 })
}



module.exports = { CheckUsername, RegisterUser, LoginUser, VerifyKeyword }