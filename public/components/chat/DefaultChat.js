import React from 'react'

export default class DefaultChat extends React.Component {
  render () {
    return (
      <div className='logo center-align'>
        <img src='images/geeklogo.png' id='geek-logo' alt='Image not available' /><br />
        <p id='chat-text'>Select any chat</p>
      </div>
    )
  }
}
