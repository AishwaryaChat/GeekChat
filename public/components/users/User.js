import React from 'react'

import Contacts from 'Contacts'
import Settings from 'Settings'
import Search from 'Search'

export default class User extends React.Component {
  render () {
    return (
      <div>
        <Settings />
        <Search />
        <Contacts />
      </div>
    )
  }
}
