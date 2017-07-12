import React from 'react'

import User from 'User'
import DefaultChat from 'DefaultChat'
import Chat from 'Chat'

export default class Main extends React.Component {
  constructor () {
    super()
    this.handleSelectedUser = this.handleSelectedUser.bind(this)
    this.state = {
      chatSelected: false
    }
  }

  handleSelectedUser (selectedUser) {
    this.setState({
      chatSelected: selectedUser
    })
  }

  render () {
    let chatSelected = this.state.chatSelected
    return (
      <div className='row'>
        <div className='col m4 user'>
          <User selectedUser={this.handleSelectedUser} /></div>
        {chatSelected ? <div className='col m8 chat'>
          <Chat selectedUser={chatSelected} /></div>
        : <div className='col m8 defaultChat'>
          <DefaultChat /></div>}
      </div>
    )
  }
}
