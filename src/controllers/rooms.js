const Rooms = require('../models/rooms.js')

exports.storeRoom = (room, cb) => {
  const roomid1 = `${room.sender.userid} ${room.receiver.userid}`
  const roomid2 = `${room.receiver.userid} ${room.sender.userid}`
  Rooms.findOne({$or: [{'id': roomid1}, {'id': roomid2}]}, (err, doc) => {
    if (err) {
      console.log(err)
      cb(false)
    } else {
      if (!doc) {
        createRoom(room, cb)
      } else {
        cb(true)
      }
    }
  })
}

const createRoom = (room, cb) => {
  console.log('room created')
  Rooms.create({
    id: room.id,
    user1: room.sender,
    user2: room.receiver
  }, (err, data) => {
    if (err) {
      console.log('not able to make room', err)
      cb(false)
    } else {
      cb(true)
    }
  })
}
