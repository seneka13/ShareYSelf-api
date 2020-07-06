const express = require('express')
const app = express()
const port = 8220
const defaultData = require('./defaultData')
const cors = require('cors')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const authRoutes = require('./Auth/auth')
const eventRoutes = require('./Events/event')

app.use(cors())
db.defaults(defaultData).write()
app.use(express.json()) 


app.post('/login', authRoutes.login)
app.post('/signup', authRoutes.signup)
app.get('/data', authRoutes.userOn)

app.get('/get-events', eventRoutes.getEvent)
app.post('/create-event', eventRoutes.createEvent)




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))