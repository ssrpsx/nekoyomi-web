import React from 'react'
import Logo from "../../assets/Logo.png"
import { FaSearch } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import DarkModeToggle from './DarkMode';
import { useLocation, useNavigate } from 'react-router-dom';

const Menu = [
  {
    id: 1,
    name: "หน้าหลัก",
    link: "/"
  },
  {
    id: 2,
    name: "ยอดนิยม",
    link: "/#"
  },
  {
    id: 3,
    name: "ต่อสู้",
    link: "/#"
  },
  {
    id: 4,
    name: "ผจญภัย",
    link: "/#"
  },
  {
    id: 5,
    name: "ดราม่า",
    link: "/#"
  },
  {
    id: 6,
    name: "แฟนตาซี",
    link: "/#"
  }
]

function navbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/Auth');
  };
  return (
    <>
      <div className='w-full shadow-md bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:shadow-[0_4px_6px_-2px_rgba(45, 63, 94, 0.5)] z-40'>
        <div className='bg-[#4E71FF] dark:bg-[#5313c4] px-7 py-5'>
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <a href="/" className='flex gap-3 font-bold text-3xl items-center'>
                <img src={Logo} alt="Logo" className='w-8.5' />
                NekoYomi
              </a>
            </div>
            <div className='flex justify-between items-center gap-4'>
              <div className='relative group items-center gap3'>
                <input
                  type="Text"
                  placeholder="ค้นหามังฮวา"
                  className='font-kanit w-[200px] group-hover:w-[350px] transition-all px-3 py-1.5 pl-4 rounded-full bordor bordor-gray-300 bg-white dark:bg-gray-800 text-black dark:text-white duration-400'
                />
                <FaSearch className='text-gray-700 dark:text-gray-200 group-hover:text-[#4E71FF] dark:group-hover:text-gray-200 absolute top-[50%] -translate-y-1/2 right-4 cursor-pointer' />
              </div>
              <div>
                <button
                  onClick={handleLoginClick}
                  className='group bg-gradient-to-r from-[#ffbc64] to-[#FCB454] dark:bg-gradient-to-r dark:from-[#dc9e4d] dark:to-[#ffb859] text-white px-4 py-1.5 rounded-full flex items-center grap-3 cursor-pointer'
                >
                  <RiLoginBoxLine className='text-2xl text-white drop-shadow-sm' />
                  <span className='ml-1 group-hover:block hidden font-medium'>ล็อกอิน / ลงทะเบียน</span>
                </button>
              </div>
              <div>
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <ul className='sm:flex hidden items-center gap-4'>
            {Menu.map((data) => (
              <li key={data.id}>
                <a href={data.link} className='font-kanit font-medium inline-block px-4 py-2 hover:text-[#4E71FF]'>{data.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default navbar