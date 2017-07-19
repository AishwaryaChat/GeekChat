import React from 'react'

export default class ChatArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUser: this.props.currentUser,
      selectedUser: this.props.selectedUser,
      messages: [],
      roomid: ''
    }
    this.handleMessage = this.handleMessage.bind(this)
  }

  handleMessage (obj) {
    let messages = this.state.messages
    messages.push(obj)
    this.setState({
      messages: messages
    })
  }

  componentWillMount () {
    window.socket.on('show message', obj => {
      this.setState({
        selectedUser: this.props.selectedUser
      })
      this.handleMessage(obj)
    })

    window.socket.on('set chat history', chats => {
      let message = []
      chats.map(chat => {
        message.push(chat)
      })
      this.setState({
        messages: message
      })
    })
  }

  componentDidMount () {
    this.setState({
      selectedUser: this.props.selectedUser
    })
  }

  setChatAreaState (key, value) {
    let newObj = {}
    newObj[key] = value
    this.setState(newObj)
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.selectedUser !== nextProps.selectedUser) {
      this.setState({
        selectedUser: nextProps.selectedUser,
        messages: []
      })
    }
    if (this.state.roomid !== nextProps.roomid && nextProps.roomid !== undefined) {
      this.setState({
        roomid: nextProps.roomid
      })
      window.socket.emit('send history', nextProps.roomid)
    }
  }

  componentWillUnmount () {
    window.socket.removeListener('show message')
  }

  render () {
    let messages = this.state.messages
    return (
      <div className='row chat-area'>
        <ul className='col m12' ref='chatList'>
          {messages.map(msg => <span><li className='chip' key={msg.chatid} style={{align: 'left'}}>
            <b>{msg.sentby.firstname}</b>{': ' + msg.message}</li><br /></span>)}
        </ul>
      </div>
    )
  }
}

module.exports = ChatArea
