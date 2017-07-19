import React from 'react'

import Contacts from 'Contacts'
import Navbar from 'Navbar'
import Video from 'Video'

export default class User extends React.Component {
  render () {
    return (
      <div>
        <Navbar setMainState={this.props.setMainState} />
        <div className={this.props.videoChat}>
          <Video setMainState={this.props.setMainState} />
        </div>
        <div className={this.props.onlineList}>
          <Contacts selectedUser={this.props.selectedUser} currentUser={this.props.currentUser} />
        </div>
      </div>
    )
  }
}
