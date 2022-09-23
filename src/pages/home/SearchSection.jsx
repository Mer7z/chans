import React from 'react'
import Navbar from '../../components/Navbar'
import SearchBar from '../../components/Searchbar';
import Logo from '../../components/Logo';
import './search.css'

function Search() {
  return (
    <div id='search-section'>
      <div id='navbar'>
        <Navbar />
      </div>
      <div className="search-container">
        <Logo/>
        <SearchBar/>
      </div>
    </div>
  )
}

export default Search
