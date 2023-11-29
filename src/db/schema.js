const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    user: { type: String, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    keyword: { type: String, required: true },
    icon: { type: String, required: true },
})
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String }
})

const dataSchema = new mongoose.Schema({
    location: mongoose.Mixed,
    headers: mongoose.Mixed
});
const ViewsSchema = new mongoose.Schema({
    ip: { type: String, required: false },
    data: { type: dataSchema, required: true },
    time: { type: Date, required: true },
    keyword: { type: String, required: true },
})

const urls = mongoose.model('url', UrlSchema)
const users = mongoose.model('user', UserSchema)
const views = mongoose.model('view', ViewsSchema)

module.exports = { urls, users, views }