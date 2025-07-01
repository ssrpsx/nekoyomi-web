import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Logo from "../../assets/Logo.png"

import { FaSearch } from "react-icons/fa";
import { RiLoginBoxLine, RiLogoutBoxRLine, RiMenuFill } from "react-icons/ri";
import { GiClick } from "react-icons/gi";

import DarkModeToggle from './dark';
import { jwtDecode } from 'jwt-decode';


const Menu = [
  {
    id: 1,
    name: "หน้าหลัก",
    link: "/"
  },
  {
    id: 2,
    name: "ยอดนิยม",
    link: "/popular/1"
  },
  {
    id: 3,
    name: "ต่อสู้",
    link: "/action/1"
  },
  {
    id: 4,
    name: "ผจญภัย",
    link: "/adventure/1"
  },
  {
    id: 5,
    name: "ดราม่า",
    link: "/drama/1"
  },
  {
    id: 6,
    name: "แฟนตาซี",
    link: "/fantasy/1"
  }
]

function navbar() {
  const [ismenu, setismenu] = useState(false)
  const [ismenuUser, setismenuUser] = useState(false)
  const [data, setdata] = useState("")
  const [user, setUser] = useState("")

  const navigate = useNavigate();

  const handleLoginClick = () => {
    window.location.href = '/Auth'
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("authtoken");
    setUser("")
    window.location.href = '/'
  };

  const handleSearch = () => {
    navigate(`${data}/1`);
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("authtoken");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.user.username);
      }
      catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("authtoken");
      }
    }
  }, [])

  return (
    <>
      <div className='w-full shadow-md bg-white text-gray-800 dark:bg-gray-800 dark:text-white dark:shadow-[0_4px_6px_-2px_rgba(45, 63, 94, 0.5)] z-40'>
        <div className='bg-[#4E71FF] dark:bg-[#5313c4] px-7 py-5'>
          <div className="container mx-auto block sm:flex justify-between items-center relative">
            <div className='flex justify-between items-center'>
              <a href="/" className='flex gap-3 font-bold text-3xl items-center'>
                <img src={Logo} alt="Logo" className='w-8.5' />
                NekoYomi
              </a>
              <RiMenuFill className='text-2xl sm:hidden'
                onClick={() => {
                  setismenu(!ismenu)
                  setismenuUser(false)
                }} />
            </div>
            <div className={`mt-6 mb-3 sm:my-0 block sm:flex justify-between items-center gap-4 transition-all duration-300 ease-in-out ${ismenu ? '' : 'hidden'}`}>
              <div className='group relative items-center gap3'>
                <input
                  type="Text"
                  placeholder="ค้นหามังฮวา"
                  onChange={e => setdata(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  className='font-kanit w-full sm:w-[200px] group-hover:w-[350px] transition-all px-3 py-1.5 pl-4 rounded-full bordor bordor-gray-300 bg-white dark:bg-gray-800 text-black dark:text-white duration-400'
                />
                <FaSearch
                  onClick={handleSearch}
                  className='text-gray-700 dark:text-gray-200 group-hover:text-[#4E71FF] dark:group-hover:text-gray-200 absolute top-[50%] -translate-y-1/2 right-4 cursor-pointer' />
              </div>
              <div className='my-3 sm:my-0'>
                {user ?
                  <button
                    onClick={handleLogoutClick}
                    className='group bg-gradient-to-r w-full from-[#ffbc64] to-[#FCB454] dark:bg-gradient-to-r dark:from-[#dc9e4d] dark:to-[#ffb859] text-white sm:py-2 sm:px-4 pl-4 pr-3 py-2 rounded-full flex items-center grap-3 cursor-pointer'
                  >
                    <RiLogoutBoxRLine className='text-xl text-white drop-shadow-sm text-center ml-auto' />
                    <span className='ml-1 group-hover:block sm:hidden font-medium text-sm m-auto'>ออกจากระบบ</span>
                  </button>
                  :
                  <button
                    onClick={handleLoginClick}
                    className='group bg-gradient-to-r w-full from-[#ffbc64] to-[#FCB454] dark:bg-gradient-to-r dark:from-[#dc9e4d] dark:to-[#ffb859] text-white sm:py-2 sm:px-4 pl-4 pr-3 py-2 rounded-full flex items-center grap-3 cursor-pointer'
                  >
                    <RiLoginBoxLine className='text-xl text-white drop-shadow-sm text-center ml-auto' />
                    <span className='ml-1 group-hover:block sm:hidden font-medium text-sm m-auto'>ล็อกอิน / ลงทะเบียน</span>
                  </button>
                }
              </div>
              <div>
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <ul className={`sm:flex block items-center gap-4 ${ismenu ? '' : 'hidden'}`}>
            {Menu.map((data) => (
              <li key={data.id} className='text-center'>
                <a href={data.link} className='font-kanit font-medium inline-block px-4 py-4 hover:text-[#4E71FF]'>{data.name}</a>
              </li>
            ))}
            {user &&
              <div className="relative inline-block group z-10">
                <button
                  onClick={() => {
                    setismenuUser(!ismenuUser)
                  }}
                  className="font-kanit font-medium px-4 py-4 inline-flex items-center group-hover:bg-gray-700 group-hover:text-gray-200 group-hover:dark:bg-gray-700"
                >
                  <GiClick className='mr-2'/>
                  <span>สมาชิก</span>
                  <span className="ml-2 text-[#4E71FF] group-hover:text-blue-300 text-sm uppercase">{user}</span>
                </button>

                <ul className={`sm:absolute text-center left-0 top-full lg:hidden group-hover:block sm:bg-gray-700 w-full shadow-md ${ismenuUser ? '' : 'hidden'}`}>
                  <li className="p-4 hover:bg-gray-600 cursor-pointer text-white">
                    <a href="#">
                      รายการโปรด
                    </a>
                  </li>
                  <li className="p-4 hover:bg-gray-600 cursor-pointer text-white">
                    <a href="#">
                      เปลี่ยนรหัสผ่าน
                    </a>
                  </li>
                </ul>
              </div>
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default navbar