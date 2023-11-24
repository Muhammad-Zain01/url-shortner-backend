const dbInstance = require('../utils/database')

async function checkUsername(username) {
    const doc = await dbInstance.getData('users')
    if (doc) {
        const FilteredData = await doc.where({ username })
        return { status: FilteredData.length > 0 ? 1 : 0 }
    }
    return { status: 0 }
}
async function registerUser(username, email, password) {
    const doc = await dbInstance.addDocument('users')
    if (doc) {
        doc.One({ username, displayName: username, email, password })
        return { status: 1, message: 'User Created Successfully' }
    }
    return { status: 0, message: 'Something Went Wrong' }
}
async function authenticateUser(username, password) {
    const doc = await dbInstance.getData('users')
    if (doc) {
        const response = await doc.where({ username })
        if (response.length > 0) {
            const base64String = Buffer.from(response[0]._id.toHexString(), 'hex').toString('base64');
            return {
                status: 1,
                data: {
                    username: response[0].username, email: response[0].email, token: base64String
                }
            }
        }
    }
    return { status: 0 }
}

module.exports = {
    checkUsername,
    registerUser,
    authenticateUser
}