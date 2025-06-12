import React, { useState } from 'react'
import Logo from "../../assets/Logo.png"
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";

function Login() {
    return (
        <div className='block'>
            <div className='p-2 text-center relative'>
                <FaRegUser className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input type="text" placeholder='ีUsername' className='p-4 pl-12 w-full bg-gray-300/50 rounded dark:bg-gray-400/50 dark:text-gray-300' />
            </div>
            <div className='p-2 text-center relative'>
                <IoLockClosedOutline className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input type="password" placeholder='Password' className='p-4 pl-12 w-full bg-gray-300/50 rounded dark:bg-gray-400/50 dark:text-gray-300' />
            </div>
            <div className='p-2 mt-1 mb-5 block sm:flex justify-between'>
                <div className='mb-2 sm:mb-0'>
                    <input type="checkbox" className='mr-1 cursor-pointer'></input>
                    <span className='text-gray-700 dark:text-gray-400'>Remember me</span>
                </div>
                <div>
                    <a href="#" className='text-blue-600 dark:text-blue-400'>Forgot password?</a>
                </div>
            </div>
            <div className='p-2 text-center'>
                <button className='w-full bg-[#5313c4] p-4 rounded text-white font-bold cursor-pointer' onClick={() => { alert("You have been Sign Up is Success") }}>Log in</button>
            </div>
        </div>
    )
}

function SignUp() {
    return (
        <div className='block'>
            <div className='p-2 text-center relative'>
                <MdOutlineMailOutline className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input type="gmail" placeholder='Gmail' className='p-4 pl-12 w-full bg-gray-300/50 rounded dark:bg-gray-400/50 dark:text-gray-300' />
            </div>
            <div className='p-2 text-center relative'>
                <FaRegUser className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input type="text" placeholder='ีUsername' className='p-4 pl-12 w-full bg-gray-300/50 rounded dark:bg-gray-400/50 dark:text-gray-300' />
            </div>
            <div className='p-2 text-center relative'>
                <IoLockClosedOutline className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input type="password" placeholder='Password' className='p-4 pl-12 w-full bg-gray-300/50 rounded dark:bg-gray-400/50 dark:text-gray-300' />
            </div>
            <div className='p-2 mt-1 mb-5'>
                <input type="checkbox" className='mr-1 cursor-pointer'></input>
                <span className='text-gray-700 dark:text-gray-400'>Remember me</span>
            </div>
            <div className='p-2 text-center'>
                <button className='w-full bg-[#5313c4] p-4 rounded text-white font-bold cursor-pointer' onClick={() => { alert("You have been Sign Up is Success") }}>Sign Up</button>
            </div>
        </div>
    )
}

function auth() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex justify-center items-center h-full mt-[8vh]">
            <div className="w-11/12 sm:w-2/5 bg-white px-8 py-6 sm:p-18 rounded shadow-sm border border-gray-900/10 h-full dark:bg-gray-800">
                <h1 className='text-center text-2xl font-bold mb-8 dark:text-gray-200'>Welcome to nekoyomi!</h1>
                <div className='px-2 pt-2 pb-4 mb-8 border-b-2 border-gray-500/20'>
                    <ul className='flex justify-center items-center'>
                        <li className='w-1/2 text-center p-2  items-center h-full' onClick={() => { setIsLogin(false) }}>
                            <button
                                className={`cursor-pointer font-semibold ${isLogin ? 'text-base text-gray-600 dark:text-gray-500' : 'text-xl text-[#5313c4] dark:text-blue-500'
                                    }`}
                            >
                                Sign Up
                            </button>
                        </li>
                        <li className='w-1/2 text-center p-2 h-full' onClick={() => { setIsLogin(true) }}>
                            <button
                                className={`cursor-pointer font-semibold ${isLogin ? 'text-xl text-[#5313c4] dark:text-blue-500' : 'text-base text-gray-600 dark:text-gray-500'
                                    }`}
                            >
                                Log in
                            </button>
                        </li>
                    </ul>
                </div>
                {isLogin ? <Login /> : <SignUp />}
            </div>
        </div>

    )
}

export default auth