const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomsSchema = new Schema({
  id: String,
  user1: Schema.Types.Mixed,
  user2: Schema.Types.Mixed,
  chat: []
})

const RoomsSchema = mongoose.model('rooms', roomsSchema)

module.exports = RoomsSchema
