const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connection.once('open', () => console.log('MONGO DB Connected'))
mongoose.connection.on('error', (err) => console.error(err))

async function connect() {
    await mongoose.connect(process.env.MONGO_DB_URL);
}

module.exports = { connect }
