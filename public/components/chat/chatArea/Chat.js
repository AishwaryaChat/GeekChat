import React from 'react'

import ChatNavbar from 'ChatNavbar'
import ChatArea from 'ChatArea'
import MessageBox from 'MessageBox'

export default class Chat extends React.Component {
  render () {
    return (
      <div>
        <ChatNavbar />
        <ChatArea />
        <MessageBox />
      </div>
    )
  }
}
