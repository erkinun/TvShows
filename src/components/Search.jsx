import React from 'react'
import { useDispatch } from 'react-redux'
import { searchForShow } from '../redux/store'

const Search = () => {
  const searchDispatch = useDispatch()
  return (
    <div>
      <div>
        <input
          placeholder='Search for a tvshow'
          onBlur={(e) => searchDispatch(searchForShow(e.target.value))}
        />
      </div>
      <div>List of shows</div>
    </div>
  )
}

export default Search
