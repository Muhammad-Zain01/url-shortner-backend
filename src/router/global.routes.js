const express = require('express');
const GlobalController = require('../controller/global.controller')
const GlobalRouter = express.Router();

GlobalRouter.get('/proxy', GlobalController.httpProxyMiddleware)
GlobalRouter.get('/:keyword', GlobalController.httpCaptureUser)
module.exports = GlobalRouter;