const http = require('http');
const app = require('./src/app');
const mongo = require('./src/db/mongo')
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
    await mongo.connect();
    server.listen(PORT, () => {
        console.log(`Listening at PORT ${PORT}`)
    })
}

startServer() 