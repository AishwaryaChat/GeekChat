const gotStream = (stream, videoElement) => {
  console.log('my streammmmmmmmmmm', stream)
  window.localStream = stream
  onReceiveStream(stream, videoElement)
}

const onReceiveStream = (stream, videoElement) => {
  videoElement.srcObject = stream
  window.peerStream = stream
}

exports.gotStream = gotStream
exports.onReceiveStream = onReceiveStream
