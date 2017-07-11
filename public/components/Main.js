import React from 'react'

import User from 'User'
import Chat from 'Chat'

export default class Main extends React.Component {
  render () {
    return (
      <div className='row'>
        <div className='col m4 user'><User /></div>
        <div className='col m8'><Chat /></div>
      </div>
    )
  }
}
