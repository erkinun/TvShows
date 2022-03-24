import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Details from './components/Details'
import Search from './components/Search'

// TODO remove the nav link
export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>

        <hr />

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
