import { useState } from 'react'
import Search from './pages/home/SearchSection'
import Browser from './pages/browser/Browser'
import About from './pages/about/About'
import {Routes, Route} from 'react-router-dom'

function App() {
  return(
    <Routes>
      <Route path='/' element={<Search/>} />
      <Route path='/search' element={<Browser/>} />
      <Route path='/about' element={<About/>} />
    </Routes>
  )
}

export default App
