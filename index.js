const http = require('http');
const mongoose = require('mongoose');
const app = require('./src/app');
require('dotenv').config()

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

mongoose.connection.once('open', () => console.log('MONGO DB Connected'))
mongoose.connection.on('error', (err) => console.error(err))

async function startServer() {
    await mongoose.connect(process.env.MONGO_DB_URL);
    server.listen(PORT, () => {
        console.log(`Listening at PORT ${PORT}`)
    })
}

startServer() // Starting a Server

