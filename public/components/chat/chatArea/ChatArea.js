import React from 'react'

export default class ChatArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUser: this.props.currentUser,
      selectedUser: this.props.selectedUser
    }
  }

  componentDidMount () {
    const currentID = this.state.currentUser.userid
    const selectedID = this.state.selectedUser.userid
    window.socket.emit('join', {
      id: `${currentID} ${selectedID}`,
      sender: this.state.currentUser,
      receiver: this.state.selectedUser
    })
  }

  render () {
    return (
      <div className='row chat-area'>
        <div className='col m12'>
        </div>
      </div>
    )
  }
}

module.exports = ChatArea
