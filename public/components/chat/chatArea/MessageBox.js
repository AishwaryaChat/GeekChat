import React from 'react'

export default class MessageBox extends React.Component {

  componentWillMount () {
    window.socket.on('room id', roomid => {
      console.log('room id', roomid)
      this.state = {
        roomid: roomid
      }
    })
  }

  componentDidMount () {
    const messageBox = this.refs.messageBox
    messageBox.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        console.log('new messageeeeeeeee', this.state.roomid)
        window.socket.emit('new message', {
          message: messageBox.value,
          roomid: this.state.roomid,
          sentBy: this.props.currentUser
        })
        this.refs.messageBox.value = ''
      }
    })
  }

  render () {
    return (
      <div className='row message-box'>
        <input className='col m10 input-msg' ref='messageBox' type='text' placeholder='Type a message' />
      </div>
    )
  }
}

module.exports = MessageBox
