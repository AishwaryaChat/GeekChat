import React from 'react'

const Navbar = () => {
  return (
    <nav className='grey lighten-2'>
      <div className='profile'>
        <ul className='nav'>
          <li className='avtar' id='profile-pic'><i className='material-icons'>perm_identity</i></li>
          <li><i className='material-icons'>settings</i></li>
          <li><i className='material-icons'>chat</i></li>
        </ul>
      </div>
    </nav>
  )
}

module.exports = Navbar
