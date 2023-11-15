const express = require('express');
const app = express();
const cors = require('cors');
const UrlController = require("./controller/url.controller")
const UserController = require('./controller/user.controller')
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))


// app.get('/', UrlController.getAllURL)
// app.get('/:keyword', UrlController.getURL)
app.post('/events/verify/:username', UserController.CheckUsername)
app.post('/events/register', UserController.RegisterUser)
app.post('/events/login', UserController.LoginUser)
app.post('/events/save', UrlController.saveURL)
app.put('/events/update/:keyword', UrlController.updateURL)
app.delete('/events/remove/:keyword', UrlController.removeURL)

module.exports = app;