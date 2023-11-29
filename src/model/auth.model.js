const { EncryptPassword, ComparePassword, errorResponse, generateVerificationCode } = require('../utils/helper')
const { users } = require('../db/schema')
const Email = require('../utils/emailSender');
const { Encode } = require('../utils/jwt')
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
        const isVerified = false;
        const verificationCode = generateVerificationCode();
        const user = {
            username,
            email,
            password,
            displayName,
            isVerified,
            verificationCode
        }
        await users.create(user)
        await Email.SendVerificationEmail(email, displayName, verificationCode)
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
                const data = {
                    username: result.username,
                    email: result.email,
                };
                const token = Encode(data);
                return {
                    status: 1,
                    data: { token }
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