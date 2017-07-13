import React from 'react'

import Options from 'Options'

export default class Navbar extends React.Component {
  constructor () {
    super()
    this.state = {
      userName: 'loading'
    }
  }
  componentDidMount () {
    IO.getJSON('/userData')
    .then(data => {
      this.setState({
        userName: data.firstName
      })
    })
  }

  render () {
    return (
      <nav className='grey lighten-2 color-grey'>
        <div className='profile'>
          <ul className='nav'>
            <li id='profile-pic'>{this.state.userName}</li>
            <li><Options /></li>
            <li><i className='material-icons'>chat</i></li>
          </ul>
        </div>
      </nav>
    )
  }
}

module.exports = Navbar
