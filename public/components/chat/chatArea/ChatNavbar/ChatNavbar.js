import React from 'react'

import video from 'public/assets/js/video.js'

export default class ChatNavbar extends React.Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.showLocalVideo = this.showLocalVideo.bind(this)
    this.sendOffer = this.sendOffer.bind(this)
    this.initiatePeerConnection = this.initiatePeerConnection.bind(this)
  }

  initiatePeerConnection () {
    window.peer.on('open', () => {})
    window.peer.on('connection', connection => {
      const peerid = connection.peer
      console.log('peer id inside initiatePeerConnection', peerid)
      if (peerid) {
        alert('accept video call')
        this.props.setMainState('videoChat', 'show-video')
      }
    })
  }

  componentDidMount () {
    this.initiatePeerConnection()
  }

  sendOffer () {
    const peerid = this.props.selectedUser.peerID
    if (this.props.selectedUser.peerID) {
      window.peer.connect(peerid, {metadata: {
        'chatSelected': this.props.currentUser
      }})
    }
  }

  showLocalVideo () {
    navigator.mediaDevices.getUserMedia(window.VideoChatConstraints)
    .then(stream => video.gotStream(stream, this.props.localVideoElement))
    .then(() => this.sendOffer())
    .catch(error => {
      console.log(error)
      alert('An error occured. Please try again')
    })
  }

  handleClick (e) {
    e.preventDefault()
    this.props.setMainState('videoChat', 'show-video')
    this.showLocalVideo()
  }

  render () {
    const that = this
    return (
      <nav className='grey lighten-2'>
        <div className='profile'>
          <ul className='nav color-grey'>
            <li className='collection-item avatar'>
              <span className='title'>{this.props.selectedUser.name}</span>
            </li>
            <li><i className='material-icons'>clear_all</i></li>
            <li><i className='material-icons' onClick={e => that.handleClick(e)}>videocam</i></li>
            <li><i className='material-icons'>call</i></li>
          </ul>
        </div>
      </nav>
    )
  }
}
