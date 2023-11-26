const { views } = require('../db/schema')
const { errorResponse } = require('../utils/helper');
async function captureUser(data) {
    try {
        await views.create(data)
        return { status: 1 }
    } catch (error) {
        return errorResponse(error)
    }
}
module.exports = {
    captureUser,
}