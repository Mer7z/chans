import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='nav-container ms-auto me-5'>
        <ul className="navbar nav">
          <li className="nav-item"><Link to="/about">About</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar