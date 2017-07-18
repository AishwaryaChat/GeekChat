import React from 'react'

import 'public/assets/css/video.css'

export default class Video extends React.Component {

  componentDidMount () {
    this.props.setMainState('localVideoElement', this.refs.localVideo)
  }

  render () {
    return (
      <div>
        <video id='remote-video' ref='remoteVideo' autoPlay='true' />
        <video id='local-video' ref='localVideo' autoPlay='true' /><br />
        <button id='start-call'>Start Call</button>
        <button id='end-call'>End Call</button>
      </div>
    )
  }
}
