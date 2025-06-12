import React from 'react'
import Navbar from './components/Navbar/navbar'
import Bg from './components/BG/background'
import SlideImage from './components/SlideHome/SlideImage'
import LoginAndRegister from './components/auth/auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Bg />
      <Navbar />
      <div className='pt-24 w-full'></div>
      <Routes>
        <Route path='/' element={<SlideImage />}/>
        <Route path='/Login' element={<LoginAndRegister />}/>
        <Route path='/Register' element={<LoginAndRegister />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App