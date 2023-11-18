const express = require('express');
const UserController = require('../controller/user.controller');
const UserRouter = express.Router();

UserRouter.post('/events/verify/:username', UserController.CheckUsername)
UserRouter.post('/events/verify/keyword/:keyword', UserController.VerifyKeyword)
UserRouter.post('/events/register', UserController.RegisterUser)
UserRouter.post('/events/login', UserController.LoginUser)

module.exports = UserRouter;