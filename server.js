const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public/build')))
app.use(express.static(path.join(__dirname, 'public/assets')))
app.use(express.static(path.join(__dirname, 'views')))

app.listen(3000, () => {
  console.log('listening on port 3000')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'))

})
