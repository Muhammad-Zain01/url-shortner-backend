const express = require('express');
const GlobalController = require('./global.controller')
const GlobalRouter = express.Router();

GlobalRouter.get('/proxy/:url', GlobalController.globalProxyMiddleware)
GlobalRouter.get('/:keyword', GlobalController.globalCaptureUser)
module.exports = GlobalRouter;