app.post('/events/add', AuthenticateUser, UrlController.addURL)
app.post('/events/get-urls', AuthenticateUser, UrlController.getData)
app.post('/capture', UrlController.CaptureUser)