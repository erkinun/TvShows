import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchShows } from '../redux/store'
import ShowCard from './ShowCard'

const Search = () => {
  const searchDispatch = useDispatch()
  const shows = useSelector((state) => state.hits)
  const status = useSelector((state) => state.status)

  useEffect(() => {
    if (status === 'idle') {
      searchDispatch(fetchShows())
    }
  }, [status, searchDispatch])

  return (
    <div>
      <div>
        <input
          placeholder='Search for a tvshow'
          onBlur={(e) => searchDispatch(fetchShows(e.target.value))}
        />
      </div>
      <div>List of shows: {shows.length}</div>
      <div>
        {shows
          .map((s) => s.show)
          .map((s) => (
            <ShowCard show={s} key={s.id} />
          ))}
      </div>
      <div>Status: {status}</div>
    </div>
  )
}

export default Search
