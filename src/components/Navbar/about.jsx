import React from 'react'
import { FaLocationArrow, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdPhoneIphone } from "react-icons/md";
import { LuInstagram } from "react-icons/lu";
import Dark from '../Navbar/dark'

function about() {
    return (
        <div className='mt-6 w-full bg-gray-900 pt-4 shadow-[0_-4px_10px_2px_rgba(0,0,0,0.5)]'>
            <div className='block text-center w-full'>
                <ul className='p-6'>
                    <li>
                        <h1 className='font-bold text-3xl text-blue-600 mb-3'>NekoYomi</h1>
                    </li>
                    <li>
                        <span className='font-kanit text-gray-400 text-justify'>
                            เว็บไซต์นี้จัดทำขึ้นเพื่อเสริมสร้างความเข้าใจและทักษะในการพัฒนาเว็บแอปพลิเคชัน โดยใช้เทคโนโลยี React, Node.js, Express และ Tailwind CSS เป็นเครื่องมือหลัก เพื่อพัฒนาทักษะพื้นฐานด้าน Web Development ซึ่งสามารถนำไปประยุกต์ใช้และต่อยอดร่วมกับทักษะอื่นๆ ในอนาคต
                        </span>
                    </li>
                </ul>
                <div className='my-2 border-b-1 w-1/2 border-gray-800 mx-auto'></div>
                <ul className='p-6'>
                    <li>
                        <h1 className='font-kanit font-bold text-2xl text-white mb-3'>เมนูสำคัญ</h1>
                    </li>
                    <li>
                        <a href="/"><h2 className='font-kanit text-gray-400'>หน้าหลัก</h2></a>
                    </li>
                    <li>
                        <a href="/Auth"><h2 className='font-kanit text-gray-400'>เข้าสู่ระบบ</h2></a>
                    </li>
                    <li>
                        <a href="/Auth"><h2 className='font-kanit text-gray-400'>สมัครสมาชิก</h2></a>
                    </li>
                </ul>
                <div className='my-2 border-b-1 w-1/2 border-gray-800 mx-auto'></div>
                <ul className='p-6'>
                    <li>
                        <h1 className='font-kanit font-bold text-2xl text-white mb-3'>หมวดหมู่</h1>
                    </li>
                    <li>
                        <h2 className='font-kanit text-gray-400'>ต่อสู้</h2>
                    </li>
                    <li>
                        <h2 className='font-kanit text-gray-400'>ผจญภัย</h2>
                    </li>
                    <li>
                        <h2 className='font-kanit text-gray-400'>ดราม่า</h2>
                    </li>
                    <li>
                        <h2 className='font-kanit text-gray-400'>แฟนตาชี</h2>
                    </li>
                </ul>
                <div className='my-2 border-b-1 w-1/2 border-gray-800 mx-auto'></div>
                <ul className='p-6 mx-auto w-max text-center'>
                    <li className='flex text-white items-center gap-2 my-1'>
                        <FaLocationArrow />
                        <h1 className='font-kanit'>ตลาดพลู, กรุงเทพ</h1>
                    </li>
                    <li className='flex text-white items-center gap-2 my-1'>
                        <MdPhoneIphone />
                        <h1 className='font-kanit'>+66 9-999-9999</h1>
                    </li>
                    <li className='flex text-2xl mt-2.5 gap-x-2 text-white'>
                        <a href="https://www.facebook.com/password2548/" target='blank'><FaFacebook /></a>
                        <a href="https://www.instagram.com/ssrps_" target='blank'><LuInstagram /></a>
                        <a href="https://github.com/ssrpsx" target='blank'><FaGithub /></a>
                        <a href="https://www.linkedin.com/in/sarawut-ponsan-708315361/" target='blank'><FaLinkedin /></a>
                    </li>
                </ul>
            </div>
            <div className='my-2 border-b-1 w-1/2 border-gray-800 mx-auto'></div>
            <div className='text-center text-gray-400 py-6'>
                <h1>Made with Made with ♡ By Sarawut Ponsan</h1>
                <h2>Icon By react-icons.github.io</h2>
                <h3>Information & Image By up-manga.com</h3>
            </div>
        </div>
    )
}

export default about