const sharedSession = require('express-socket.io-session')

// const users = require('./src/controllers/users.js')

let io = ''
let onlineUsers = []

exports.listen = (server, session, users) => {
  io = require('socket.io').listen(server)
  io.use(sharedSession(session, {autosave: true}))

  io.sockets.on('connection', socket => {
    socket.on('new user', (user) => {
      let flag = onlineUsers.filter(onuser => onuser.name === user.name)
      if (!flag[0]) {
        onlineUsers.push(user)
        io.sockets.emit('getOnlineUsers', onlineUsers)
      }
    })
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
