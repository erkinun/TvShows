import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
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
