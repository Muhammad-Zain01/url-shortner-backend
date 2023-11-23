const express = require('express');
const AuthenticateUser = require('../../middleware/authenticate');
const AdminController = require('./admin.controller')
const AdminRoutes = express.Router();

AdminRoutes.use(AuthenticateUser);
AdminRoutes.post('/events/add-url', AdminController.adminAddURL)
AdminRoutes.post('/events/remove-url/:keyword', AdminController.removeURL)
AdminRoutes.post('/events/get-urls', AdminController.adminGetData)
AdminRoutes.post('/events/get-user', AdminController.getUserData)
AdminRoutes.post('/events/keyword/:keyword', AdminController.adminVerifyKeyword)
AdminRoutes.post('/events/dasboard-data', AdminController.adminDashboardData)
AdminRoutes.post('/events/get-display-name', AdminController.DisplayName)
AdminRoutes.post('/events/set-display-name', AdminController.setDisplayName)

module.exports = AdminRoutes;
