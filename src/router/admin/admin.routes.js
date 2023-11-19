const express = require('express');
const AuthenticateUser = require('../../middleware/authenticate');
const AdminController = require('./admin.controller')
const AdminRoutes = express.Router();

AdminRoutes.use(AuthenticateUser);
AdminRoutes.post('/admin/events/add-url', AdminController.adminAddURL)
AdminRoutes.post('/admin/events/get-urls', AdminController.adminGetData)
AdminRoutes.post('/admin/events/keyword/:keyword', AdminController.adminVerifyKeyword)

module.exports = AdminRoutes;
