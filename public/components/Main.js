import React from 'react'

import User from 'User'
import Chat from 'Chat'

export default class Main extends React.Component {
  render () {
    return (
      <div className='container'>
        <div><User /></div>
        <div><Chat /></div>
      </div>
    )
  }
}
