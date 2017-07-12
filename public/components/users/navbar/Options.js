import React from 'react'

const Settings = () => {
  return (
    <a className='dropdown-button color-grey' data-beloworigin={true} data-alignment='right' href='#!' data-activates='dropdown1'>
      <i className='material-icons'>settings</i>
      <ul id='dropdown1' className='dropdown-content'>
        <li>Profile</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </a>
  )
}

module.exports = Settings
