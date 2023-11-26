const bcrypt = require('bcrypt');
const saltRounds = 10;


function makeKeyword(length = 8) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

async function EncryptPassword(password) {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}
async function ComparePassword(password, hashedPassword) {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }

}
const errorResponse = (error) => ({ status: 0, message: "SERVER_ERROR", error });
function joinUrl(baseUrl) {
    if (!baseUrl.match(/^https?:\/\//)) {
        baseUrl = 'http://' + baseUrl;
    }
    return baseUrl;
}

module.exports = { makeKeyword, joinUrl, EncryptPassword, ComparePassword, errorResponse }
