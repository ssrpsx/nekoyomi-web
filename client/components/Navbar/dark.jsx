import React, { useState, useEffect } from 'react'
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

function DarkModeToggle() {
  const [darkmode, setDarkmode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkmode]);

  return (
    <div onClick={() => setDarkmode(!darkmode)} className='w-full group pl-4 pr-3 sm:px-4 py-2 bg-white rounded-full cursor-pointer flex gap-2 items-center dark:bg-gray-800 duration-200'>
      {!darkmode ?
        (<MdOutlineLightMode className='text-black text-xl ml-auto text-center' />)
        : (<MdOutlineDarkMode className='text-white text-xl ml-auto' />)}
      <span className='sm:hidden font-medium text-sm mr-auto'>โหมด</span>
    </div>
  )
}

export default DarkModeToggle