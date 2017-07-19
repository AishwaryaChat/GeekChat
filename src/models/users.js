const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  firstname: String,
  lastname: String,
  emailAddress: String,
  password: String,
  userid: String,
  salt: String
})

const UsersSchema = mongoose.model('Users', userSchema)

module.exports = UsersSchema
