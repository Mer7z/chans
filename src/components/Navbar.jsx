import React from 'react'

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='nav-container ms-auto me-5'>
        <ul className="navbar nav">
          <li className="nav-item"><a href="/" className="nav-link">Search</a></li>
          <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar