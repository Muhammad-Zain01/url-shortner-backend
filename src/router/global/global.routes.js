const express = require('express');

const GlobalController = require('./global.controller')
const GlobalRouter = express.Router();

GlobalRouter.post('/capture', GlobalController.globalCaptureUser)
GlobalRouter.get('/proxy/:url', GlobalController.globalProxyMiddleware)

module.exports = GlobalRouter;