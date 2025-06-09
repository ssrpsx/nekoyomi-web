import React, { useState, useEffect } from 'react'
import { MdOutlineLightMode,MdOutlineDarkMode } from "react-icons/md";

function DarkModeToggle() {
    const [darkmode, setdarkmode] = useState(false)

    useEffect(() => {
        if (darkmode) {
          document.documentElement.classList.add("dark");
        } 
        else {
          document.documentElement.classList.remove("dark");
        }
    }, [darkmode]);

    return (
          <div onClick={() => setdarkmode(!darkmode)}  className='group px-4 py-2 bg-white rounded-full cursor-pointer flex gap-2 items-center justify-between dark:bg-gray-800 duration-200'>
              {!darkmode ? (<MdOutlineLightMode className='text-black text-xl' />) : (<MdOutlineDarkMode className='text-white text-xl'/>)}
          </div>
  )
}

export default DarkModeToggle