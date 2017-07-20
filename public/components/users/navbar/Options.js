import React from 'react'

export default class Options extends React.Component {
  render () {
    return (
      <div>
        <a className='dropdown-button color-grey' data-beloworigin={true} data-alignment='right' href='#!' data-activates='dropdown1'>
          <i className='material-icons'>settings</i>
        </a>
        <ul id='dropdown1' className='dropdown-content'>
          <li><a href='/logout'>Logout</a></li>
        </ul>
      </div>
    )
  }
}

module.exports = Options
