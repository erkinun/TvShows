import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Details from './components/Details'
import Search from './components/Search'

// TODO bugs
// 3 - either clean the summary of its tags, or inject html
// 4 - enter should work for searching too

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/details' element={<Details />}>
            <Route path=':showId' element={<Details />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}
