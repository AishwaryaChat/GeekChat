exports.gotStream = (stream, videoElement) => {
  window.localStream = stream
  onReceiveStream(stream, videoElement)
}

const onReceiveStream = (stream, videoElement) => {
  videoElement.srcObject = stream
  window.peerStream = stream
}
