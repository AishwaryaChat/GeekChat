import React from 'react'
import uuid from 'node-uuid'

export default class MessageBox extends React.Component {

  componentWillMount () {
    window.socket.on('room id', roomid => {
      this.setState({
        roomid: roomid
      })
      this.props.setMainState('roomid', roomid)
    })
  }

  componentDidMount () {
    const messageBox = this.refs.messageBox
    messageBox.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        window.socket.emit('new message', {
          chatid: uuid.v4(),
          message: messageBox.value,
          roomid: this.state.roomid,
          sentby: this.props.currentUser
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
