import React from 'react'
import SlideImage from '../components/SlideHome/SlideImage'
import Menu from '../components/Menu/menu'

function home() {
  return (
    <>
      <SlideImage />
      <div className='mb-20'></div>
      <Menu />
    </>
  )
}

export default home