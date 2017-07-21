const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')({
  secret: process.env.SESSION_SECRET || 'aishwarya',
  resave: true,
  saveUninitialized: true
})
const server = require('http').createServer(app)
const mongoose = require('mongoose')

const chatServer = require('./lib/chatServer')
const users = require('./src/controllers/users.js')

app.use(express.static(path.join(__dirname, 'public/build')))
app.use(express.static(path.join(__dirname, 'public/assets')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session)
app.use('/io-square', express.static(path.join(__dirname, '/node_modules/io-square-browser/lib')))

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/geekChat')
const db = mongoose.connection
mongoose.Promise = require('promise')
db.on('error', console.error.bind(console, 'db connection error:'))

db.once('open', (err) => {
  if (err) {
    throw new Error('Db not connected')
  }
  server.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000')
  })
  console.log('DB connected successfully and APP listening at: ' + Date())
})

app.get('/', (req, res) => {
  if (req.session.user_id) {
    return res.redirect('/home')
  }
  return res.sendFile(path.join(__dirname, 'views/index.html'))
})

app.post('/signup', users.addUser)

app.post('/login', users.validateUser)

app.get('/home', (req, res) => {
  if (req.session.user_id) {
    return res.sendFile(path.join(__dirname, 'public/index.html'))
  }
  return res.redirect('/')
})

app.get('/userData', users.findUser)

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

chatServer.listen(server, session)
