const gotStream = (stream, videoElement) => {
  console.log('my streammmmmmmmmmm', stream)
  window.localStream = stream
  onReceiveStream(stream, videoElement)
}

const onReceiveStream = (stream, videoElement) => {
  videoElement.srcObject = stream
  window.peerStream = stream
}

exports.onEndCall = (e) => {
  e.preventDefault()
  window.localStream.getTracks().forEach(track => track.stop())
  window.peerStream.getTracks().forEach(track => track.stop())
}

exports.gotStream = gotStream
exports.onReceiveStream = onReceiveStream
