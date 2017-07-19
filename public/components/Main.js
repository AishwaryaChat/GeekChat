import React from 'react'
import uuid from 'node-uuid'

import User from 'User'
import DefaultChat from 'DefaultChat'
import Chat from 'Chat'
import video from 'public/assets/js/video.js'

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
      localVideoElement: '',
      remoteVideoElement: ''
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

  // accept offer from caller and create an answer for caller
  onReceiveCall (call) {
    navigator.mediaDevices.getUserMedia(window.VideoChatConstraints)
    .then(stream => video.gotStream(stream, this.state.localVideoElement))
    .then(() => {
      call.answer(window.localStream)
    })
    .then(() => {
      call.on('stream', stream => {
        window.peerStream = stream
        video.onReceiveStream(stream, this.state.remoteVideoElement)
      })
    })
    .catch(error => console.log(error))
  }

  initiatePeerConnection () {
    window.peer.on('open', () => {})

    window.peer.on('connection', connection => {
      const peerid = connection.peer
    })

    window.peer.on('call', call => {
      if (call.peer) {
        if (window.confirm('want to accept video call')) {
          window.socket.emit('join', {
            sender: this.state.currentUser,
            receiver: call.metadata.chatSelected
          })
          this.handleSelectedUser(call.metadata.chatSelected)
          this.setMainState('videoChat', 'show-video')
          this.onReceiveCall(call)
        } else {
          console.log('call declined')
        }
      }
    })
  }

  componentDidMount () {
    this.initiatePeerConnection()
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
            localVideoElement={this.state.localVideoElement}
            remoteVideoElement={this.state.remoteVideoElement} /></div>
        : <div className='col m8 defaultChat'>
          <DefaultChat /></div>}
      </div>
    )
  }
}
