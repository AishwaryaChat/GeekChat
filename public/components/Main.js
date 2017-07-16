import React from 'react'

import User from 'User'
import DefaultChat from 'DefaultChat'
import Chat from 'Chat'

export default class Main extends React.Component {
  constructor () {
    super()
    this.handleSelectedUser = this.handleSelectedUser.bind(this)
    this.setMainState = this.setMainState.bind(this)
    this.state = {
      currentUser: {},
      chatSelected: false
    }
  }

  handleSelectedUser (selectedUser, e) {
    e.preventDefault()
    this.setState({
      chatSelected: selectedUser
    })
  }

  setMainState (key, value) {
    let newObj = {}
    newObj[key] = value
    this.setState(newObj)
  }

  render () {
    let chatSelected = this.state.chatSelected
    return (
      <div className='row'>
        <div className='col m4 user'>
          <User selectedUser={this.handleSelectedUser}
            setMainState={this.setMainState}
            currentUser={this.state.currentUser} /></div>
        {chatSelected ? <div className='col m8 chat'>
          <Chat selectedUser={chatSelected} currentUser={this.state.currentUser} /></div>
        : <div className='col m8 defaultChat'>
          <DefaultChat /></div>}
      </div>
    )
  }
}
