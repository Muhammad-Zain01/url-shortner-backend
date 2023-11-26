const { EncryptPassword, ComparePassword, errorResponse } = require('../utils/helper')
const { users } = require('../db/schema')

async function isUserNameAvailable(username) {
    try {
        const result = await users.findOne({ username })
        if (result) return { status: 0 }
        else return { status: 1 }
    } catch (error) {
        return errorResponse(error)
    }
}
async function registerUser(username, email, pass) {
    try {
        const displayName = username
        const password = await EncryptPassword(pass)
        await users.create({ username, email, password, displayName })
        return { status: 1 }
    } catch (error) {
        return errorResponse(error)
    }
}
async function authenticateUser(username, password) {
    try {
        const result = await users.findOne({ username })
        if (result) {
            const isCorrectPassword = await ComparePassword(password, result.password)
            if (isCorrectPassword) {
                const token = Buffer.from(result._id.toHexString(), 'hex').toString('base64');
                return {
                    status: 1,
                    data: {
                        username: result.username,
                        email: result.email,
                        token
                    }
                }
            } else {
                return {
                    status: 0,
                    message: 'INVALID_PASSWORD'
                }
            }
        } else {
            return { status: 0, message: "INVALID_USER" };

        }
    }
    catch (error) {
        return errorResponse(error)
    }
}

module.exports = {
    isUserNameAvailable,
    registerUser,
    authenticateUser
}