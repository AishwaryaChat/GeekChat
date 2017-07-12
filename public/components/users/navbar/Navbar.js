import React from 'react'

import Options from 'Options'

const Navbar = () => {
  return (
    <nav className='grey lighten-2 color-grey'>
      <div className='profile'>
        <ul className='nav'>
          <li className='avtar' id='profile-pic'><i className='material-icons'>perm_identity</i></li>
          <li><Options /></li>
          <li><i className='material-icons'>chat</i></li>
        </ul>
      </div>
    </nav>
  )
}

module.exports = Navbar
