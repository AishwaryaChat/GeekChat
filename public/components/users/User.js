import React from 'react'

import Contacts from 'Contacts'
import Navbar from 'Navbar'
import Search from 'Search'

export default class User extends React.Component {
  render () {
    return (
      <div>
        <Navbar setMainState={this.props.setMainState} />
        <Search />
        <Contacts selectedUser={this.props.selectedUser} currentUser={this.props.currentUser} />
      </div>
    )
  }
}
