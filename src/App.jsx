import React from 'react'
import Navbar from './components/Navbar/navbar'
import Bg from './components/BG/background'
import Home from './link/home'
import Auth from './components/auth/auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Bg />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Auth' element={<Auth />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App