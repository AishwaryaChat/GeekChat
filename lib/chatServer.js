const sharedSession = require('express-socket.io-session')

const rooms = require('../src/controllers/rooms.js')

let io = ''
let onlineUsers = []

exports.listen = (server, session, users) => {
  io = require('socket.io').listen(server)
  io.use(sharedSession(session, {autosave: true}))

  io.sockets.on('connection', socket => {
    // new user
    socket.on('new user', (user) => {
      let flag = onlineUsers.filter(onuser => onuser.name === user.name)
      if (!flag[0]) {
        onlineUsers.push(user)
        io.sockets.emit('getOnlineUsers', onlineUsers)
      }
    })

    // disconnecting user
    socket.on('disconnect', (data) => {
      let i = 0
      onlineUsers.map(user => {
        console.log('disconnect', socket.handshake.session.user_id)
        if (user.emailAddress === socket.handshake.session.user_id) {
          onlineUsers.splice(i, 1)
        }
        i++
      })
      io.sockets.emit('getOnlineUsers', onlineUsers)
      console.log('user disconnected')
    })

    // create room
    socket.on('join', room => {
      room = {
        id: `${room.sender.userid} ${room.receiver.userid}`,
        sender: room.sender,
        receiver: room.receiver
      }
      rooms.storeRoom(room, (result) => {
        if (result) {
          socket.join(room.id)
          socket.emit('room id', room.id)
        }
      })
    })

    // handle new message
    socket.on('new message', obj => {
      console.log(obj)
      io.to(obj.roomid).emit('show message', obj)
    })
  })
}

// const getOnlineUsers = (socket) => {
//   console.log('inside getOnlineUsers')
//   var i = 0
//   for (; i < onlineUsers.length; i++) {
//     let onlineUserList = []
//     onlineUsers.map(user => {
//       if (user.emailAddress !== onlineUsers[i].emailAddress) {
//         onlineUserList.push({
//           name: `${user.firstname} ${user.lastname}`,
//           userid: user.userid,
//           emailAddress: user.emailAddress})
//       }
//     })
//     io.sockets.in(onlineUsers[i].socket).emit('getOnlineUsers', onlineUserList)
//   }
// }
