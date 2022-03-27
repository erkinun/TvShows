import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Details from './components/Details'
import Search from './components/Search'

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
