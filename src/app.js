const express = require('express');
const app = express();
const UrlController = require("./controller/url.controller")

app.use(express.json())

app.get('/', UrlController.getAllURL)
app.get('/:keyword', UrlController.getURL)
app.post('/events/save', UrlController.saveURL)
app.put('/events/update/:keyword', UrlController.updateURL)
app.delete('/events/remove/:keyword', UrlController.removeURL)

module.exports = app;