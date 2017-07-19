import React from 'react'

export default class Contacts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      onlineUsers: []
    }
  }

  componentDidMount () {
    window.socket.on('getOnlineUsers', (onlineUsers) => {
      let onlineUsersList = onlineUsers.filter(user => user.name !== this.props.currentUser.name)
      this.setState({
        onlineUsers: onlineUsersList
      })
    })
  }

  componentWillUnmount () {
    window.socket.removeListener('getOnlineUsers')
  }

  handleClick (user, e) {
    e.preventDefault()
    this.props.selectedUser(user, e)
    window.socket.emit('join', {
      sender: this.props.currentUser,
      receiver: user
    })
  }

  render () {
    const onlineUsers = this.state.onlineUsers
    let i = 0
    let that = this
    return (
      <div>
        <div className='row search'>
          <div className='col m1'><i className='small material-icons' id='search-icon'>search</i></div>
          <div className='col m11'>
            <input placeholder='Search' id='search-input' type='text' className='validate' />
          </div>
        </div>
        <h6 className='section blue lighten-4 online-head'><b>Online Users</b></h6>
        <ul className='collection with-header online-users' id='online-list'>
          {
            onlineUsers.map(user => <li className='collection-item avatar'
              key={i++}
              onClick={e => that.handleClick(user, e)}>{user.name}</li>)
            }
        </ul>
      </div>
    )
  }
}

module.exports = Contacts
