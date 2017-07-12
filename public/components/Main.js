import React from 'react'

import User from 'User'
import DefaultChat from 'DefaultChat'
import Chat from 'Chat'

export default class Main extends React.Component {
  constructor () {
    super()
    this.state = {
      chatSelected: false
    }
  }
  render () {
    let chatSelected = this.state.chatSelected
    return (
      <div className='row'>
        <div className='col m4 user'><User /></div>
        {chatSelected ? <div className='col m8 chat'><Chat /></div>
        : <div className='col m8 defaultChat'><DefaultChat /></div>}
      </div>
    )
  }
}
