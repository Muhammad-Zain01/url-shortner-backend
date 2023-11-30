const jwt = require('jsonwebtoken')
require('dotenv').config();
function Encode(data) {
    try {
        const result = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '30d' });
        return result;
    } catch (error) {
        return error;
    }
}
function Decode(token) {
    try {
        const result = jwt.verify(token, process.env.SECRET_KEY);
        return result
    } catch (error) {
        return error;
    }
}


module.exports = { Encode, Decode }