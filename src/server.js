const express = require('express');
const UrlController = require('./controller/url.controller')

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json())

app.get('/:keyword', UrlController.getURL)
app.post('/events/save', UrlController.saveURL)
app.put('/events/update', UrlController.updateURL)
app.delete('/events/remove', UrlController.removeURL)

app.listen(PORT, () => {
    console.log(`Listening at Port ${PORT}`)
})