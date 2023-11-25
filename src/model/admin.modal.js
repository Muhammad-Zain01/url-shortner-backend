const dbInstance = require('../utils/database')
const { EncryptPassword, ComparePassword } = require('../utils/helper')
async function getAllUrls(user) {
    const doc = await dbInstance.getData('urls');
    if (doc) {
        const agg = [
            {
                '$lookup': {
                    'from': 'webdata',
                    'localField': 'keyword',
                    'foreignField': 'keyword',
                    'as': 'data'
                }
            }, {
                '$match': {
                    'user': user.username
                }
            }, {
                '$addFields': {
                    'views': {
                        '$size': '$data'
                    }
                }
            }
        ];
        const result = await doc.aggregate(agg)
        const data = result.map(item => {
            return {
                url: item.url,
                title: item.title,
                keyword: item.keyword,
                icon: item.icon,
                views: item.views
            }
        })
        return { status: 1, data }
    }
    return { status: 0 }
}
async function getUserDashboardData(user) {
    const doc = await dbInstance.getData('users');
    if (doc) {
        const agg = [
            {
                '$lookup': {
                    'from': 'urls',
                    'localField': 'username',
                    'foreignField': 'user',
                    'as': 'urls_data'
                }
            }, {
                '$lookup': {
                    'from': 'webdata',
                    'localField': 'urls_data.keyword',
                    'foreignField': 'keyword',
                    'as': 'webdata'
                }
            }, {
                '$match': {
                    'username': user.username
                }
            }
        ]
        const result = await doc.aggregate(agg)
        return { status: 1, data: result[0] }
    }
    return { status: 0 }
}
async function deleteUrl(keyword) {
    const doc = await dbInstance.remove('urls');
    if (doc) {
        const result = await doc.One({ keyword })
        deleteViews(keyword);
        if (result.acknowledged) {
            return { status: 1 }
        }
    }
    return { status: 0 }
}
async function deleteViews(keyword) {
    const doc = await dbInstance.remove('webdata');
    if (doc) {
        const result = await doc.Many({ keyword })
        if (result.acknowledged) {
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
async function getDisplayName(user) {
    const doc = await dbInstance.getData('users')
    if (doc) {
        const result = await doc.where({ username: user.username })
        if (result.length > 0) {
            return { status: 1, data: result[0].displayName }
        }
    }
    return { status: 0 }
}
async function setdisplayName(user, name) {
    const doc = await dbInstance.update('users')
    if (doc) {
        const result = await doc.One({ username: user.username }, { displayName: name })
        if (result.modifiedCount) {
            return { status: 1, data: result[0] }
        }
    }
    return { status: 0 }
}
async function getUser(user) {
    const doc = await dbInstance.getData('users')
    if (doc) {
        const result = await doc.where({ username: user.username })
        if (result.length > 0) {
            return { status: 1, data: result[0] }
        }
    }
    return { status: 0 }
}
async function updatePassword(user, oldPassword, newPassword) {
    const username = user?.username;
    const doc = await dbInstance.getData('users')
    const doc_update = await dbInstance.update('users');
    if (doc) {
        const result = await doc.where({ username })
        
        if (result.length > 0) {
            const password = result[0].password
            if(await ComparePassword(oldPassword, password)){
                const newhashedPassword = await EncryptPassword(newPassword)
                const result = await doc_update.One({ username }, { password: newhashedPassword })
                if (result.modifiedCount) {
                    return { status: 1 }
                }
            }
        }
        return { status: 0 }
    }
}
module.exports = {
    getAllUrls,
    insertUrl,
    verifyKeyword,
    deleteUrl,
    getUserDashboardData,
    getDisplayName,
    setdisplayName,
    getUser,
    updatePassword
}