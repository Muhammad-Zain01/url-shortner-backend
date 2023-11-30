const express = require('express');
const AuthController = require('../controller/auth.controller')
const AuthRouter = express.Router();

AuthRouter.post('/verify/:username', AuthController.httpVerifyUsername)
AuthRouter.post('/register', AuthController.httpRegisterUser)
AuthRouter.post('/login', AuthController.httpLoginUser)
AuthRouter.post('/forgot-password/email-verfiy', AuthController.httpForgotPasswordEmailVerification)
AuthRouter.post('/forgot-password/reset-code', AuthController.httpResetCode)

module.exports = AuthRouter;
