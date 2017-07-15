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

// User authentication
exports.validateUser = (req, res) => {
  if (req.body.emailAddress === '' || req.body.password === '') {
    return res.send({message: 'NO'})
  }
  Users.findOne({'emailAddress': req.body.emailAddress}, (err, doc) => {
    if (doc) {
      checkPassword(req, res)
    } else {
      return res.send({message: 'not found'})
    }
    if (err) {
      res.send({err})
    }
  })
}

const checkPassword = (req, res) => {
  Users.findOne({'emailAddress': req.body.emailAddress}, ['emailAddress', 'password'], (err, resp) => {
    if (resp.password === req.body.password) {
      req.session.user_id = resp.emailAddress
      res.redirect('/home')
    } else if (resp.password !== req.body.password) {
      res.send({message: 'not matched'})
    } else {
      res.send({err})
    }
  })
}

exports.findUser = (req, res) => {
  Users.findOne({'emailAddress': req.session.user_id}, (err, resp) => {
    if (err) {
      return res.send(err)
    }
    return res.send({
      name: resp.name,
      firstname: resp.firstname,
      lastname: resp.lastname,
      userid: res.userid
    })
  })
}
