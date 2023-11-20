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
    return { status: 0 }
}
async function deleteUrl(keyword) {
    const doc = await dbInstance.remove('urls');
    if (doc) {
        const result = await doc.One({ keyword })
        if(result.acknowledged){
            return { status: 1 }
        }
    }
    return { status: 0 }

}
async function insertUrl(data) {
    const doc = await dbInstance.addDocument('urls')
    if (doc) {
        const result = await doc.One(data);
        if (result.acknowledged) {
            return { status: 1 }
        }
    }
    return { status: 0 }
}
async function verifyKeyword(keyword) {
    const doc = await dbInstance.getData('urls')
    if (doc) {
        const result = await doc.where({ keyword })
        if (result.length > 0) {
            return { status: 0, data: result[0] }
        } else {
            return { status: 1 }
        }

    }
    return { status: 0 }
}
module.exports = {
    getAllUrls,
    insertUrl,
    verifyKeyword,
    deleteUrl
}