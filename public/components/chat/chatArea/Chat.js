import React from 'react'

import ChatNavbar from 'ChatNavbar'
import ChatArea from 'ChatArea'
import MessageBox from 'MessageBox'

export default class Chat extends React.Component {
  render () {
    return (
      <div>
        <ChatNavbar selectedUser={this.props.selectedUser}
          setMainState={this.props.setMainState}
          localVideoElement={this.props.localVideoElement} />
        <ChatArea selectedUser={this.props.selectedUser} currentUser={this.props.currentUser}
          roomid={this.props.roomid} />
        <MessageBox currentUser={this.props.currentUser} setMainState={this.props.setMainState} />
      </div>
    )
  }
}
