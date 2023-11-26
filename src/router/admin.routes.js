const express = require('express');
const AuthenticateUser = require('../middleware/authenticate')
const AdminController = require('../controller/admin.controller')
const AdminRoutes = express.Router();

AdminRoutes.use(AuthenticateUser);
AdminRoutes.post('/events/add-url', AdminController.httpAddUrl)
AdminRoutes.post('/events/remove-url/:keyword', AdminController.httpRemoveUrl)
AdminRoutes.post('/events/get-urls', AdminController.httpGetData)
AdminRoutes.post('/events/get-user', AdminController.httpGetUserData)
AdminRoutes.post('/events/keyword/:keyword', AdminController.httpVerifyKeyword)
AdminRoutes.post('/events/dasboard-data', AdminController.httpDashboardData)
AdminRoutes.post('/events/get-display-name', AdminController.httpDisplayName)
AdminRoutes.post('/events/update-password', AdminController.httpUpdatePassword)
AdminRoutes.post('/events/set-display-name', AdminController.httpUpdateDisplayName)

module.exports = AdminRoutes;
