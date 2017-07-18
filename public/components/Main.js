import React from 'react'
import uuid from 'node-uuid'

import User from 'User'
import DefaultChat from 'DefaultChat'
import Chat from 'Chat'

window.peerID = uuid.v4()

window.peer = new Peer(window.peerID, {host: 'peerjs-server.herokuapp.com', secure: true, port: 443})

export default class Main extends React.Component {
  constructor () {
    super()
    this.handleSelectedUser = this.handleSelectedUser.bind(this)
    this.setMainState = this.setMainState.bind(this)
    this.state = {
      currentUser: {},
      chatSelected: false,
      videoChat: 'hide-video',
      localVideoElement: ''
    }
  }

  handleSelectedUser (selectedUser, e) {
    if (e !== undefined) {
      e.preventDefault()
    }
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
    console.log('main state', this.state)
    return (
      <div className='row'>
        <div className='col m4 user'>
          <User selectedUser={this.handleSelectedUser}
            setMainState={this.setMainState}
            currentUser={this.state.currentUser}
            videoChat={this.state.videoChat} /></div>
        {chatSelected ? <div className='col m8 chat'>
          <Chat selectedUser={chatSelected} currentUser={this.state.currentUser}
            setMainState={this.setMainState} roomid={this.state.roomid}
            localVideoElement={this.state.localVideoElement} /></div>
        : <div className='col m8 defaultChat'>
          <DefaultChat /></div>}
      </div>
    )
  }
}
