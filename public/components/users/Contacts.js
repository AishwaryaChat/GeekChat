import React from 'react'

export default class Contacts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: ['Aish', 'Harsh', 'Mrinal', 'Rishabh', 'Aish', 'Harsh', 'Mrinal', 'Rishabh', 'Aish', 'Harsh', 'Mrinal', 'Rishabh']
    }
  }

  render () {
    const onlineUsers = this.state.users
    let i = 0
    let that = this
    return (
      <div>
        <h6 className='section blue lighten-4 online-head'><b>Online Users</b></h6>
        <ul className='collection with-header online-users' id='online-list'>
          {
            onlineUsers.map(user => <li className='collection-item avatar'
              key={i++}
              onClick={e => that.props.selectedUser(user, e)}>{user}</li>)
          }
        </ul>
      </div>
    )
  }
}

module.exports = Contacts
