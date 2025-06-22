import React from 'react'
import Navbar from './components/Navbar/navbar'
import Bg from './components/BG/background'
import Home from './link/home'
import Auth from './components/auth/auth'
import Forgot from './link/forgot'
import Menu from '../src/components/Menu/menu_home'
import Menu_list from '../src/components/Menu/menu_list'
import About from './components/Navbar/about'
import Episode from './components/Menu/episode'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Bg />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Auth' element={<Auth />}/>
        <Route path='/forgot' element={<Forgot />}/>
        <Route path='/menu/:pageNumber' element={<Menu_list />}/>
        <Route path='/anime/:title/page/home' element={<Menu />}/>
        <Route path='/anime/:title/page/:episode' element={<Episode />}/>
      </Routes>
      <About />
    </BrowserRouter>
  )
}

export default App