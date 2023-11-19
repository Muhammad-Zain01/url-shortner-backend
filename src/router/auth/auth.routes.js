const express = require('express');
const AuthController = require('./auth.controller')
const AuthRouter = express.Router();

// AuthRouter.post('/events/verify/keyword/:keyword', UserController.VerifyKeyword)
AuthRouter.post('/verify/:username', AuthController.authCheckUsername)
AuthRouter.post('/register', AuthController.authRegisterUser)
AuthRouter.post('/login', AuthController.authLoginUser)

module.exports = AuthRouter;
