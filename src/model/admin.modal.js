const dbInstance = require('../utils/database')

async function getAllUrls(user) {
    const doc = await dbInstance.getData('urls');
    if (doc) {
        const result = await doc.where({ user: user.username })
        const data = result.map(item => {
            return {
                url: item.url,
                title: item.title,
                keyword: item.keyword,
                icon: item.icon
            }
        })
        return { status: 1, data }
    }
    return {status: 0}
}

module.exports = {
    getAllUrls
}