const dbInstance = require('../utils/database')

async function captureUser(data) {
    const doc = await dbInstance.addDocument('webdata')
    if (doc) {
        const response = await doc.One(data)
        if (response.acknowledged) {
            return { status: 1 }
        }
    }
    return { status: 0 }
}
module.exports = {
    captureUser,
}