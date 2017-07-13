const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(express.static(path.join(__dirname, 'public/build')))
app.use(express.static(path.join(__dirname, 'public/assets')))
app.use(express.static(path.join(__dirname, 'views')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, () => {
  console.log('listening on port 3000')
})

let users = JSON.parse(fs.readFileSync('./data.json', 'utf8'))

const addUserToDB = (user) => {
  users.push(user)
  users = fs.writeFileSync('./data.json', JSON.stringify(users, null, 4), 'utf8')
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'))
})

app.post('/signup', (req, res) => {
  addUserToDB(req.body)
  res.redirect('/')
})
