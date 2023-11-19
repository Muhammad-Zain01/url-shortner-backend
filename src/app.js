const express = require('express');
const cors = require('cors');
const AdminRoutes = require('./router/admin/admin.routes')
const AuthRouter = require('./router/auth/auth.routes')
const GlobalRoutes = require('./router/global/global.routes')

const app = express();
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use("/auth", AuthRouter)
app.use(GlobalRoutes)
app.use("/admin",AdminRoutes)

module.exports = app;