const { urls, users, views } = require('../db/schema')
const { EncryptPassword, ComparePassword, errorResponse } = require('../utils/helper')

async function getUrls(user) {
    const agg = [
        {
            '$lookup': {
                'from': 'views',
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
    const result = await urls.aggregate(agg);
    if (result) {
        result.map(item => {
            return {
                url: item.url,
                title: item.title,
                keyword: item.keyword,
                icon: item.icon,
                views: item.views
            }
        })
        return { status: 1, data: result }
    } else {
        return { status: 0 }
    }
}
async function getUserDashboardData(user) {
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
                'from': 'views',
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
    result = await users.aggregate(agg);
    if (result) return { status: 1, data: result }
    else return { status: 0, message: 'EMPTY' }
}
async function deleteUrl(keyword) {
    try {
        await urls.deleteOne({ keyword })
        await views.deleteMany({ keyword })
        return { status: 1 }
    } catch (error) {
        return errorResponse(error)
    }
}
async function insertUrl(data) {
    try {
        await urls.create(data);
        return { status: 1 }
    } catch (error) {
        return errorResponse(error)
    }
}
async function verifyKeyword(keyword) {
    try {
        const result = await urls.findOne({ keyword })
        if (result) return { status: 1, result }
        else return { status: 0 }
    } catch (error) {
        return errorResponse(error)
    }
}
async function getDisplayName(user) {
    try {
        const username = user.username;
        const result = await users.findOne({ username });
        if (result) return { status: 1, data: result.displayName }
        else return { status: 0, message: "INVALID_USER" }
    } catch (error) {
        return errorResponse(error)
    }
}
async function updateDisplayName(user, name) {
    try {
        const username = user.username
        await users.updateOne({ username }, { displayName: name })
        return { status: 1 }
    } catch (error) {
        return errorResponse(error)
    }
}
async function getUser(user) {
    try {
        const username = user?.username;
        const result = await users.findOne({ username }, { '_id': 0, '__v': 0 })
        if (result) return { status: 1, data: result }
        else return { status: 0, message: "INVALID_USER" }
    } catch (error) {
        return errorResponse(error)
    }
}
async function updatePassword(user, oldPassword, newPassword) {
    try {
        const username = user?.username
        const result = await users.findOne({ username })
        if (result) {
            const password = result.password;
            if (await ComparePassword(oldPassword, password)) {
                const newHashedPassword = await EncryptPassword(newPassword)
                await users.updateOne({ username }, { password: newHashedPassword })
                return { status: 1 }
            } else { return { status: 0, message: 'INVALID_PASSWORD' } }
        }
        else { return { status: 0, message: 'INVALID_USER' } }
    }
    catch (error) {
        return errorResponse(error)
    }
}
async function verifyUser(code, user) {
    try {
        const result = await users.findOne({ username: user })
        if (result) {
            if (result.verificationCode == code) {
                await users.updateOne({ username: user }, { isVerified: true })
                return { status: 1 }
            } else {
                return { status: 0, message: 'INVALID_CODE' }
            }
        } else {
            return { status: 0, message: "INVALID_USER" }
        }
    } catch (error) {
        return errorResponse(error)
    }
}
module.exports = {
    verifyUser,
    getUrls,
    insertUrl,
    verifyKeyword,
    deleteUrl,
    getUserDashboardData,
    getDisplayName,
    updateDisplayName,
    getUser,
    updatePassword
}