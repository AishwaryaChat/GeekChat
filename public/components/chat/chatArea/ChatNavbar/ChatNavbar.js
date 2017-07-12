import React from 'react'

const ChatNavbar = () => {
  return (
    <nav className='grey lighten-2'>
      <div className='profile'>
        <ul className='nav color-grey'>
          <li className='avtar' id='profile-pic'><i className='material-icons'>perm_identity</i></li>
          <li><i className='material-icons'>clear_all</i></li>
          <li><i className='material-icons'>videocam</i></li>
          <li><i className='material-icons'>call</i></li>
        </ul>
      </div>
    </nav>
  )
}

module.exports = ChatNavbar
