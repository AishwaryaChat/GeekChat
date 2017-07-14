const sharedSession = require('express-socket.io-session')

let io = ''
let onlineUsers = []

exports.listen = (server, session, users) => {
  io = require('socket.io').listen(server)
  io.use(sharedSession(session, {autosave: true}))

  io.sockets.on('connection', socket => {
    socket.on('new user', () => {
      users.map(user => {
        if (user.emailAddress === socket.handshake.session.user_id) {
          user.socket = socket.id
          onlineUsers.push(user)
        }
      })
      getOnlineUsers(socket)
    })
    socket.on('disconnect', (data) => {
      users.map(user => {
        if (user.socket === socket.id) {
          user.onlineFlag = false
        }
      })
      console.log('user disconnected')
    })
  })
}

const getOnlineUsers = (socket) => {
  console.log('inside getOnlineUsers')
  var i = 0
  for (; i < onlineUsers.length; i++) {
    let onlineUserList = []
    onlineUsers.map(user => {
      if (user.emailAddress !== onlineUsers[i].emailAddress) {
        onlineUserList.push({
          name: `${user.firstname} ${user.lastname}`,
          userid: user.userid,
          emailAddress: user.emailAddress})
      }
    })
    io.sockets.in(onlineUsers[i].socket).emit('getOnlineUsers', onlineUserList)
  }
}
