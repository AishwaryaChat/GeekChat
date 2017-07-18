import React from 'react'

export default class ChatNavbar extends React.Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.props.setMainState('videoChat', 'show-video')
  }

  render () {
    console.log('chatnavbar props', this.props)
    const that = this
    return (
      <nav className='grey lighten-2'>
        <div className='profile'>
          <ul className='nav color-grey'>
            <li className='collection-item avatar'>
              <span className='title'>{this.props.selectedUser.name}</span>
            </li>
            <li><i className='material-icons'>clear_all</i></li>
            <li><i className='material-icons' onClick={e => that.handleClick(e)}>videocam</i></li>
            <li><i className='material-icons'>call</i></li>
          </ul>
        </div>
      </nav>
    )
  }
}
