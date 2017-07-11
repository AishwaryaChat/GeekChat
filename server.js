const express = require('express')
const app = express()
const path = require('path')

// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public/build')))

app.listen(3000, () => {
  console.log('listening on port 3000')
})

app.get('/', (req, res) => {
  if (req.session) {
    res.sendFile(path.join(__dirname, 'views/index.html'))
  }
  res.sendFile(path.join(__dirname, 'public/index.html'))
})
