import React from 'react'

export default class ChatArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUser: this.props.currentUser,
      selectedUser: this.props.selectedUser
    }
    this.handleMessage = this.handleMessage.bind(this)
  }

  handleMessage (obj) {
    const chatUL = this.refs.chatList
    let ele = document.createElement('li')
    ele.innerHTML = `<strong>${obj.sentBy.firstname}: </strong>` + obj.message
    chatUL.appendChild(ele)
  }

  componentWillMount () {
    window.socket.on('show message', obj => {
      this.handleMessage(obj)
    })
  }

  componentDidMount () {
    window.socket.emit('join', {
      sender: this.state.currentUser,
      receiver: this.state.selectedUser
    })
  }

  render () {
    return (
      <div className='row chat-area'>
        <ul className='col m12' ref='chatList'>
        </ul>
      </div>
    )
  }
}

module.exports = ChatArea
