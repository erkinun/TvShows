import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Details from './components/Details'
import Search from './components/Search'

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Navigate replace to='/TvShows' />} />
          <Route path='/TvShows'>
            <Route index element={<Search />} />
            <Route path='details' element={<Details />}>
              <Route path=':showId' element={<Details />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  )
}
