import React from 'react'

import ChatNavbar from 'ChatNavbar'
import ChatArea from 'ChatArea'
import MessageBox from 'MessageBox'

export default class Chat extends React.Component {
  render () {
    return (
      <div>
        <ChatNavbar selectedUser={this.props.selectedUser} />
        <ChatArea selectedUser={this.props.selectedUser} currentUser={this.props.currentUser} />
        <MessageBox currentUser={this.props.currentUser} />
      </div>
    )
  }
}
