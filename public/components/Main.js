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
      videoChat: 'hide',
      localVideoElement: '',
      remoteVideoElement: '',
      onlineList: 'show'
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
    console.log('on receive Call', call)
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
      console.log('connectionnnnnnnnnnnnn', connection)
      this.setMainState('onlineList', 'hide')
      window.socket.emit('join', {
        sender: this.state.currentUser,
        receiver: connection.metadata.chatSelected
      })
      this.handleSelectedUser(connection.metadata.chatSelected)
      this.setMainState('videoChat', 'show-video')
    })

    window.peer.on('call', call => {
      if (call.peer) {
        if (window.confirm('want to accept video call')) {
          this.onReceiveCall(call)
        } else {
          console.log('call declined')
        }
      } else {
        console.log('else for on call received')
      }
    })

    // window.peer.on('error', (err) => {
    //   window.alert('An error ocurred with peer: ' + err)
    //   console.error(err)
    // })

    window.peer.on('close', () => {
      console.log('connection closedddddddd')
    })
  }

  componentDidMount () {
    this.initiatePeerConnection()
  }

  render () {
    let chatSelected = this.state.chatSelected
    return (
      <div className='row'>
        <div className={this.state.videoChat === 'hide' ? 'col m4 user' : 'col m8 user'}>
          <User selectedUser={this.handleSelectedUser}
            setMainState={this.setMainState}
            currentUser={this.state.currentUser}
            videoChat={this.state.videoChat}
            onlineList={this.state.onlineList} /></div>
        {chatSelected ? <div className={this.state.videoChat === 'hide' ? 'col m8 chat' : 'col m4 chat'}>
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
