const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const uuid = require('node-uuid')
const session = require('express-session')

const config = require('./config')

const sess = {
  uniqID: uuid.v4(),
  secret: config.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}

app.use(express.static(path.join(__dirname, 'public/build')))
app.use(express.static(path.join(__dirname, 'public/assets')))
app.use(express.static(path.join(__dirname, 'views')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session(sess))

app.listen(3000, () => {
  console.log('listening on port 3000')
})

// let users = JSON.parse(fs.readFileSync('./data.json', 'utf8'))
let users = require('./data.json')

const addUserToDB = (user) => {
  users.push(user)
  fs.writeFile('./data.json', JSON.stringify(users, null, 4), 'utf8', (data) => {
    console.log('written', data)
  })
}

const validateUser = (loginUser, req, res) => {
  let flag = false
  console.log('something')
  users.map(user => {
    if (user.emailAddress === loginUser.emailAddress) {
      flag = true
      let cookie = req.cookies.cookieName
      if (cookie === undefined) {
        cookie = uuid.v4()
        res.cookie('cookieName', cookie, {maxAge: 900000, httpOnly: true})
        console.log('created Cookie successfully', cookie)
      }
      req.session.user_id = uuid.v4()
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
  console.log('sessionn', req.session)
  res.sendFile(path.join(__dirname, 'public/index.html'))
})
