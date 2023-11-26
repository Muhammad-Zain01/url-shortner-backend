const express = require('express');
const AuthController = require('../controller/auth.controller')
const AuthRouter = express.Router();

AuthRouter.post('/verify/:username', AuthController.httpVerifyUsername)
AuthRouter.post('/register', AuthController.httpRegisterUser)
AuthRouter.post('/login', AuthController.httpLoginUser)

module.exports = AuthRouter;
