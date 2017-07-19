import React from 'react'

import 'public/assets/css/video.css'
import video from 'public/assets/js/video.js'

export default class Video extends React.Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    this.props.setMainState('localVideoElement', this.refs.localVideo)
    this.props.setMainState('remoteVideoElement', this.refs.remoteVideo)
  }

  handleClick (e) {
    video.onEndCall(e)
    this.props.setMainState('videoChat', 'hide')
    this.props.setMainState('onlineList', 'show')
  }

  render () {
    return (
      <div>
        <video id='remote-video' ref='remoteVideo' autoPlay='true' />
        <video id='local-video' ref='localVideo' autoPlay='true' /><br />
        <button id='end-call' onClick={e => this.handleClick(e)}>End Call</button>
      </div>
    )
  }
}
