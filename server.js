const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const uuid = require('node-uuid')
// const config = require('./config.json')
const session = require('express-session')({
  secret: 'something',
  resave: true,
  saveUninitialized: true
})
const server = require('http').createServer(app)
const chatServer = require('./lib/chatServer')

app.use(express.static(path.join(__dirname, 'public/build')))
app.use(express.static(path.join(__dirname, 'public/assets')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session)
app.use('/io-square', express.static(path.join(__dirname, '/node_modules/io-square-browser/lib')))

server.listen(3000, () => {
  console.log('listening on port 3000')
})

// let users = JSON.parse(fs.readFileSync('./data.json', 'utf8'))
let users = require('./data.json')

const addUserToDB = (user) => {
  user.onlineFlag = false
  user.sockets = ''
  users.push(user)
  fs.writeFile('./data.json', JSON.stringify(users, null, 4), 'utf8')
}

const validateUser = (loginUser, req, res) => {
  let flag = false
  users.map(user => {
    if (user.emailAddress === loginUser.emailAddress) {
      user.onlineFlag = true
      flag = true
      let cookie = req.cookies.cookieName
      if (cookie === undefined) {
        cookie = uuid.v4()
        res.cookie('cookieName', cookie, {maxAge: 900000, httpOnly: true})
      }
      req.session.user_id = loginUser.emailAddress
    }
  })
  if (flag) {
    res.redirect('/home')
  } else {
    res.send('users not found')
  }
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'))
})

app.post('/signup', (req, res) => {
  addUserToDB(req.body)
  res.redirect('/')
})

app.post('/login', (req, res) => {
  validateUser(req.body, req, res)
})

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/userData', (req, res) => {
  users.map(user => {
    if (req.session.user_id === user.emailAddress) {
      res.send({firstName: user.firstname, lastName: user.lastname})
    }
  })
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

chatServer.listen(server, session, users)
