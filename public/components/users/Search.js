import React from 'react'

const Search = () => {
  return (
    <div className='row search'>
      <div className='col m12'>
        <input placeholder='Search' id='search' type='text' className='validate' />
      </div>
    </div>
  )
}

module.exports = Search
