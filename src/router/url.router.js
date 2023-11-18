const express = require('express');

const UrlRouter = express.Router();


UrlRouter.post('/events/add', AuthenticateUser, UrlController.addURL)
UrlRouter.post('/events/get-urls', AuthenticateUser, UrlController.getData)
UrlRouter.post('/capture', UrlController.CaptureUser)

