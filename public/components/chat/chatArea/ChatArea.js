import React from 'react'

export default class ChatArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUser: this.props.currentUser,
      selectedUser: this.props.selectedUser,
      messages: []
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
  }

  componentDidMount () {
    this.setState({
      selectedUser: this.props.selectedUser
    })
    window.socket.emit('join', {
      sender: this.state.currentUser,
      receiver: this.props.selectedUser
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
  }

  componentWillUnmount () {
    window.socket.removeListener('show message')
  }

  render () {
    let messages = this.state.messages
    let i = 0
    return (
      <div className='row chat-area'>
        <ul className='col m12' ref='chatList'>
          {messages.map(msg => <li key={i++}><strong>{msg.sentBy.firstname}</strong>{': ' + msg.message}</li>)}
        </ul>
      </div>
    )
  }
}

module.exports = ChatArea
