const express = require('express');
const AuthController = require('./auth.controller')
const AuthRouter = express.Router();

// AuthRouter.post('/events/verify/keyword/:keyword', UserController.VerifyKeyword)
AuthRouter.post('/auth/verify/:username', AuthController.authCheckUsername)
AuthRouter.post('/auth/register', AuthController.authRegisterUser)
AuthRouter.post('/auth/login', AuthController.authLoginUser)

module.exports = AuthRouter;
