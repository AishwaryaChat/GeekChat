const uuid = require('node-uuid')

const Rooms = require('../models/rooms.js')

exports.storeRoom = (room, cb) => {
  const roomid1 = `${room.sender.userid} ${room.receiver.userid}`
  const roomid2 = `${room.receiver.userid} ${room.sender.userid}`
  Rooms.findOne({$or: [{'id': roomid1}, {'id': roomid2}]}, (err, doc) => {
    if (err) {
      console.log('not able to find room', err)
      cb(false)
    } else {
      if (!doc) {
        createRoom(room, cb)
      } else {
        cb(doc.id)
      }
    }
  })
}

const createRoom = (room, cb) => {
  Rooms.create({
    id: room.id,
    user1: room.sender,
    user2: room.receiver
  }, (err, data) => {
    if (err) {
      console.log('not able to create room', err)
      cb(false)
    } else {
      cb(room.id)
    }
  })
}

exports.saveChats = chat => {
  Rooms.findOne({id: chat.roomid}, 'chat', (err, doc) => {
    if (err) {
      return false
    }
    let chats = doc.chat
    chats.push({
      chatid: chat.chatid,
      sentby: chat.sentby,
      message: chat.message
    })
    Rooms.update({id: chat.roomid}, {chat: chats}, (err, doc) => {
      if (err) {
        console.log('updating room', err)
      } else {
        console.log('chat saved', doc)
      }
    })
  })
}

exports.findChat = (roomid, cb) => {
  Rooms.findOne({id: roomid}, (err, doc) => {
    if (err) {
      console.log('find chat', err)
    } else if (doc !== null) {
      cb(doc.chat)
    } else {
      throw new Error('no chat found')
    }
  })
}
