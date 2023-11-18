const express = require('express');
const app = express();
const cors = require('cors');
// const UrlController = require("./controller/url.controller")
// const UserController = require('./controller/user.controller')
const UrlRouter = require('./router/url.router')
const UserRouter = require('./router/user.router')
const AuthenticateUser = require('./middleware/authenticate')
const ProxyMiddleware = require('./middleware/proxy');

app.use(cors({ origin: 'http://127.0.0.1:5173' }))
app.use(express.json())

app.get('/proxy/:url', ProxyMiddleware)

app.post('/events/verify/:username', UserController.CheckUsername)
app.post('/events/verify/keyword/:keyword', UserController.VerifyKeyword)
app.post('/events/register', UserController.RegisterUser)
app.post('/events/login', UserController.LoginUser)
app.post('/events/add', AuthenticateUser, UrlController.addURL)
app.post('/events/get-urls', AuthenticateUser, UrlController.getData)
app.post('/capture', UrlController.CaptureUser)

// app.get('/', UrlController.getAllURL)
// app.get('/:keyword', UrlController.getURL)




app.put('/events/update/:keyword', UrlController.updateURL)
app.delete('/events/remove/:keyword', UrlController.removeURL)

module.exports = app;