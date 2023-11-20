const express = require('express');
const AuthenticateUser = require('../../middleware/authenticate');
const AdminController = require('./admin.controller')
const AdminRoutes = express.Router();

AdminRoutes.use(AuthenticateUser);
AdminRoutes.post('/events/add-url', AdminController.adminAddURL)
AdminRoutes.post('/events/remove-url/:keyword', AdminController.removeURL)
AdminRoutes.post('/events/get-urls', AdminController.adminGetData)
AdminRoutes.post('/events/keyword/:keyword', AdminController.adminVerifyKeyword)

module.exports = AdminRoutes;
