const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  id: String,
  name: String,
  firstname: String,
  lastname: String,
  emailAddress: String,
  password: String,
  onlineFlag: Boolean
})

const UsersSchema = mongoose.model('Users', userSchema)

module.exports = UsersSchema
