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
import Change from './components/auth/change'
import Change_gmail from './components/auth/change_gmail'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Bg />
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Auth' element={<Auth />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path='/:category/:pageNumber' element={<Menu_list />} />
            <Route path='/anime/:title/page/home' element={<Menu />} />
            <Route path='/anime/:title/page/:episode' element={<Episode />} />
            <Route path='/AuthChange' element={<Change />} />
            <Route path='/AuthChangeGmail/:token' element={<Change_gmail />} />
          </Routes>
        </main>

        <About />
      </div>
    </BrowserRouter>
  );
}

export default App