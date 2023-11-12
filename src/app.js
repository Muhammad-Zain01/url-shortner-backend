const express = require('express');
const app = express();
const UrlController = require("./controller/url.controller")

app.use(express.json())

app.get('/:keyword', UrlController.getURL)
app.post('/events/save', UrlController.saveURL)
app.put('/events/update', UrlController.updateURL)
app.delete('/events/remove', UrlController.removeURL)

module.exports = app;