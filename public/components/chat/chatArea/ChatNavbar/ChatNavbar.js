import React from 'react'

import video from 'public/assets/js/video.js'

let call = {}

export default class ChatNavbar extends React.Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.showLocalVideo = this.showLocalVideo.bind(this)
    this.sendOffer = this.sendOffer.bind(this)
    this.acceptAnswer = this.acceptAnswer.bind(this)
  }

  // send an offer to callee
  sendOffer () {
    console.log('sending offer')
    const peerid = this.props.selectedUser.peerID
    if (this.props.selectedUser.peerID) {
      window.peer.connect(peerid)
    }
  }

  // accept answer from callee
  acceptAnswer () {
    console.log('accepting answer')
    const peerid = this.props.selectedUser.peerID
    console.log('peer selected', this.props.selectedUser.peerID)
    if (peerid) {
      call = window.peer.call(this.props.selectedUser.peerID, window.localStream, {metadata: {
        'chatSelected': this.props.currentUser
      }})
      call.on('stream', stream => {
        console.log('streammmmmmm', stream)
        window.peerStream = stream
        video.onReceiveStream(stream, this.props.remoteVideoElement)
      }, false)
      console.log('accept answer completed')
    }
  }

  showLocalVideo () {
    navigator.mediaDevices.getUserMedia(window.VideoChatConstraints)
    .then(stream => video.gotStream(stream, this.props.localVideoElement))
    .then(() => this.sendOffer())
    .then(() => this.acceptAnswer())
    .catch(error => {
      console.log(error)
      window.alert('An error occured. Please try again')
    })
  }

  handleClick (e) {
    e.preventDefault()
    this.props.setMainState('onlineList', 'hide')
    this.props.setMainState('videoChat', 'show')
    this.showLocalVideo()
  }

  render () {
    const that = this
    return (
      <nav className='grey lighten-2'>
        <div className='profile'>
          <ul className='nav color-grey'>
            <li className='collection-item avatar' style={{fontSize: '18px', marginTop: '5px', color: 'black'}}>
              <span className='title'>{this.props.selectedUser.name}</span>
            </li>
            <li><i className='material-icons' style={{marginRight: '20px'}}onClick={e => that.handleClick(e)}>videocam</i></li>
          </ul>
        </div>
      </nav>
    )
  }
}
