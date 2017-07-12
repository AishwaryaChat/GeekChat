import React from 'react'

import Contacts from 'Contacts'
import Navbar from 'Navbar'
import Search from 'Search'

export default class User extends React.Component {
  render () {
    return (
      <div>
        <Navbar />
        <Search />
        <Contacts />
      </div>
    )
  }
}
