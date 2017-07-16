const Rooms = require('../models/rooms.js')

exports.storeRoom = (room) => {
  const roomid1 = `${room.sender.userid} ${room.receiver.userid}`
  const roomid2 = `${room.receiver.userid} ${room.sender.userid}`
  Rooms.findOne({$or: [{'id': roomid1}, {'id': roomid2}]}, (err, doc) => {
    if (err) {
      console.log(err)
    } else {
      if (!doc) {
        createRoom(room)
      } else {
        return true
      }
    }
  })
}

const createRoom = (room) => {
  console.log('room created')
  Rooms.create({
    id: room.id,
    user1: room.sender,
    user2: room.receiver
  }, (err, data) => {
    if (err) {
      console.log('not able to make room', err)
    } else {
      return true
    }
  })
}
