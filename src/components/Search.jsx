import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchShows } from '../redux/searchSlice'
import { fetchToday } from '../redux/todaysTvSlice'
import ShowCard from './ShowCard'
import './Search.css'
import TodaysTV from './todays/Todays'

const SearchBar = ({ lastSearch, searchDispatch }) => {
  return (
    <nav className='top-bar'>
      <div className='brand'>TV Shows</div>
      <div className='search-bar'>
        <svg aria-hidden='true' width='18' height='18' viewBox='0 0 18 18'>
          <path d='m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z'></path>
        </svg>
        <input
          defaultValue={lastSearch}
          placeholder='Search for a TV Show'
          onChange={(e) => searchDispatch(fetchShows(e.target.value))}
        />
      </div>
    </nav>
  )
}

const Search = () => {
  const searchDispatch = useDispatch()
  const todaysDispatch = useDispatch()
  const shows = useSelector((state) => state.search.hits)
  const status = useSelector((state) => state.search.status)
  const lastSearch = useSelector((state) => state.search.lastSearch)
  const todaysTV = useSelector((state) => state.today.hits)

  useEffect(() => {
    if (status === 'idle') {
      searchDispatch(fetchShows())
      todaysDispatch(fetchToday())
    }
  }, [status, searchDispatch, todaysDispatch])

  return (
    <div className='search-content'>
      <SearchBar lastSearch={lastSearch} searchDispatch={searchDispatch} />
      <div className='search-results'>
        {shows
          .map((s) => s.show)
          .map((s) => (
            <ShowCard show={s} key={s.id} />
          ))}
      </div>
      <TodaysTV todaysShows={todaysTV} />
    </div>
  )
}

export default Search
