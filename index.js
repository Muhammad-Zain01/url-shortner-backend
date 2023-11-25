const http = require('http');
const app = require('./src/app');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Listening at PORT ${PORT}`)
})

