const http = require('http');
const app = require('./app');
const Database = require('./utils/database')
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const check = async () => {
    const dbInstance = new Database()
    console.log(await dbInstance.connect())
    console.log(await dbInstance.getDocs())
}
check()
// server.listen(PORT, () => {
//     console.log(`Listening at PORT ${PORT}`)
// })

