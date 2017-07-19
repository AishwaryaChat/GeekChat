const bcrypt = require('bcrypt')

const Users = require('../models/users.js')

// Validating if user exist and Adding a user
exports.addUser = (req, res) => {
  Users.findOne({'emailAddress': req.body.emailAddress}, (err, doc) => {
    if (doc) {
      return res.send({message: 'already'})
    } else if (!doc) {
      hashPassword(req, res)
    }
    if (err) {
      return res.send({err})
    }
  })
}

const hashPassword = (req, res) => {
  const pass = req.body.password
  bcrypt.genSalt(12, (err, salt) => {
    if (err) throw new Error(`Not able to generate salt`)
    bcrypt.hash(pass, salt, (err, hash) => {
      if (err) throw new Error(`Not able to generate hash`)
      const password = hash
      createUser(req, res, password, salt)
    })
  })
}

const createUser = (req, res, password, salt) => {
  Users.create({
    name: `${req.body.firstname} ${req.body.lastname}`,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    emailAddress: req.body.emailAddress,
    password: password,
    userid: req.body.userid,
    salt: salt
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
      checkPassword(req.body.password, req, res)
    } else {
      return res.send({message: 'not found'})
    }
    if (err) {
      res.send({err})
    }
  })
}

const checkPassword = (pass, req, res) => {
  Users.findOne({'emailAddress': req.body.emailAddress}, ['emailAddress', 'password', 'salt'], (err, resp) => {
    if (err) res.send({err})
    else {
      bcrypt.hash(pass, resp.salt, (err, hash) => {
        if (err) res.send({err})
        if (hash === resp.password) {
          req.session.user_id = resp.emailAddress
          res.redirect('/home')
        } else if (resp.password !== hash) {
          res.send({message: 'not matched'})
        } else res.send({message: 'not matched'})
      })
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
      userid: resp.userid,
      emailAddress: resp.emailAddress
    })
  })
}
