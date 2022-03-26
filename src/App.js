import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
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
          <Route path='about' element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

// TODO remove or add your creds to this page maybe
function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  )
}
