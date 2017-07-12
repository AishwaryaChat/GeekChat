import React from 'react'

const Search = () => {
  return (
    <div className='row search'>
      <div className='col m1'><i className='small material-icons' id='search-icon'>search</i></div>
      <div className='col m11'>
        <input placeholder='Search' id='search-input' type='text' className='validate' />
      </div>
    </div>
  )
}

module.exports = Search
