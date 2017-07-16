const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config.json')
const session = require('express-session')({
  secret: config.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
})
const server = require('http').createServer(app)
// const redis = require('redis')
const mongoose = require('mongoose')

const chatServer = require('./lib/chatServer')
const users = require('./src/controllers/users.js')
// const client = redis.createClient()

app.use(express.static(path.join(__dirname, 'public/build')))
app.use(express.static(path.join(__dirname, 'public/assets')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session)
app.use('/io-square', express.static(path.join(__dirname, '/node_modules/io-square-browser/lib')))

// Database connection
mongoose.connect(`mongodb://${config.HOST_NAME}:${config.PORT_NUMBER}/${config.DB_NAME}`)
const db = mongoose.connection
mongoose.Promise = require('promise')
db.on('error', console.error.bind(console, 'db connection error:'))

db.once('open', (err) => {
  if (err) {
    throw new Error('Db not connected')
  }
  server.listen(3000, () => {
    console.log('listening on port 3000')
  })
  console.log('DB connected successfully and APP listening at: ' + Date())
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'))
})

app.post('/signup', users.addUser)

app.post('/login', users.validateUser)

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/userData', users.findUser)

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

chatServer.listen(server, session)
