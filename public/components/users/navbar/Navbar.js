import React from 'react'

export default class Navbar extends React.Component {
  constructor () {
    super()
    this.state = {
      currentUser: {
        name: 'loading'
      }
    }
  }
  componentDidMount () {
    IO.getJSON('/userData')
    .then(data => {
      this.setState({
        currentUser: data
      })
      this.props.setMainState('currentUser', data)
      data['peerID'] = window.peerID
      window.socket.emit('new user', data)
    })
  }

  componentWillUnmount () {
    window.socket.removeListener('new user')
  }

  render () {
    return (
      <nav className='grey lighten-2 color-grey'>
        <div className='profile'>
          <ul className='nav'>
            <li id='profile-pic' style={{fontSize: '18px', marginTop: '5px', color: 'black'}}>{this.state.currentUser.firstname}</li>
            <li><a href='/logout' style={{fontSize: '18px', marginTop: '5px', color: 'black'}}>Logout</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

module.exports = Navbar
