const Users = require('../models/users.js')

// Adding a new User to Database
exports.addUser = (req, res) => {
  Users.findOne({'emailAddress': req.body.emailAddress}, (err, doc) => {
    if (doc) {
      return res.send({message: 'already'})
    } else if (!doc) {
      createUser(req, res)
    }
    if (err) {
      return res.send({err})
    }
  })
}

function createUser (req, res) {
  Users.create({
    id: req.session.id,
    name: `${req.body.firstname} ${req.body.lastname}`,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    emailAddress: req.body.emailAddress,
    password: req.body.password,
    onlineFlag: false
  }, (err, response) => {
    if (err) {
      console.log(err)
      return res.send({err})
    } else {
      return res.redirect('/')
    }
  })
}
