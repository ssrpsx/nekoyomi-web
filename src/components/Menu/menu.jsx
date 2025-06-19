import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IoEyeSharp } from "react-icons/io5";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { Link } from 'react-router-dom';

function menu() {
  const [data, setData] = useState([])
  const [favorite, setfavorite] = useState(false)
  const [displayData, setDisplayData] = useState([]);

  const loadData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/anime/menu')
      setData(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const updateDisplayData = () => {
      const sorted = [...data].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
      const sliced = sorted.slice(0, 25);
      setDisplayData(sliced);
    };

    updateDisplayData();
    window.addEventListener('resize', updateDisplayData);
    return () => window.removeEventListener('resize', updateDisplayData);
  }, [data]);

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className='relative'>
      <div className='flex flex-col md:flex-row gap-4 justify-center'>

        <div className='order-2 md:order-1 w-full p-5 pt-0 sm:w-[50%] sm:pl-5 sm:pr-0'>
          <div className='p-5 pl-2 bg-[#33333a] dark:bg-gray-800 rounded-lg rounded-bl-none rounded-br-none shadow-[1px_4px_6px_rgba(0,0,0,0.6)]'>
            <h1 className='font-kanit text-white text-xl font-medium text-center'>
              มังฮวา & มังงะ อัพเดทใหม่ล่าสุด
            </h1>
          </div>

          <div className='p-4 pt-8 w-full justify-center bg-gray-800 rounded-bl-lg rounded-br-lg'>
            <ul className='grid grid-cols-2 sm:grid-cols-5 gap-4'>
              {
                displayData.map((manga, index) => (
                  <li key={index} className="group text-white h-[350px] max-w-[150px] mx-auto">
                    <a
                      href={`/anime/${manga.title}/page/home`}
                      className=""
                    >
                      <img
                        src={`/schema/BookCover/${manga.title}.jpg`}
                        alt=""
                        className='w-[150px] h-[200px] group-hover:scale-105 object-cover transition-transform duration-300 rounded'
                      />
                      <div className='h-[90px] flex flex-col justify-between'>
                        <h1
                          className='text-white group-hover:text-[#4E71FF] font-semibold text-lg p-1 line-clamp-2'>
                          {manga.title.replaceAll('-', ' ')}
                        </h1>
                        <span
                          className='text-sm text-gray-200 line-clamp-1'>
                          หมวดหมู่ : {manga.category}
                        </span>
                      </div>
                      <div className='flex justify-between items-center p-1 pl-2'>
                        <div className='flex items-center gap-2 text-sm'>
                          <IoEyeSharp className='text-gray-200' />
                          <h2 className='text-gray-200'>{manga.views} views</h2>
                        </div>
                      </div>
                    </a>
                  </li>
                ))
              }
            </ul>
            <div className="flex justify-center">
              <Link
                to="/menu/1"
                className="w-4/8 sm:w-1/3 text-center cursor-pointer p-3 mb-2 bg-blue-500 text-white font-medium rounded-md"
              >
                แสดงเพิ่มเติม
              </Link>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 w-full sm:w-[25%] sm:pl-0 p-5">
          <div className='p-5 pl-2 bg-[#33333a] dark:bg-gray-800 rounded-lg sm:rounded-bl-none sm:rounded-br-none shadow-[1px_4px_6px_rgba(0,0,0,0.6)]'>
            <h1 className='font-kanit text-white text-xl font-medium text-center'>
              ยอดฮิตติดอันดับ TOP 5
            </h1>
          </div>

          <div>
            <div className='relative w-full mx-auto'>
              <ul className='p-5 flex flex-nowrap sm:block sm:bg-gray-700 sm:rounded-bl-lg sm:rounded-br-lg overflow-x-auto scroll-smooth scrollbar-hide gap-4 touch-pan-x'>
                {data.sort((a, b) => b.views - a.views)
                  .slice(0, 5)
                  .map((item, index) => (
                    <li
                      key={index}
                      className='flex bg-gray-800 rounded-xl overflow-hidden min-w-[375px] h-[250px] sm:mb-4 cursor-pointer hover:bg-gray-900 transition sm:shadow-[0px_2px_6px_rgba(0,0,0,0.7)]'
                    >
                      <a href={`/anime/${item.title}/page/home`} className="flex w-full h-full z-1">
                        <img
                          src={`/schema/BookCover/${item.title}.jpg`}
                          alt=""
                          className='w-[175px] h-full object-cover'
                        />
                        <div className='px-6 py-4 flex flex-col justify-between h-full'>
                          <div>
                            <h1 className='text-[#4E71FF] font-bold text-lg leading-tight'>
                              {index + 1}. {item.title.replaceAll('-', ' ')}
                            </h1>
                            <div className='flex gap-2 text-gray-200 my-1'>
                              <h2>หมวดหมู่ </h2>
                              <span>Something.</span>
                            </div>
                            <span className='text-sm text-gray-300/80'>
                              {
                                [
                                  'เด็กหนุ่มผู้หลงทางถูกดึงเข้าสู่โลกที่เต็มไปด้วยเวทมนตร์และความลับที่เขาไม่เคยรู้จักมาก่อน',
                                  'การต่อสู้ของเด็กสาวที่ต้องลุกขึ้นยืนเพื่อปกป้องสิ่งสำคัญเพียงหนึ่งเดียวที่เหลืออยู่',
                                  'ในวันที่เมืองเริ่มล่มสลาย เขาคือความหวังสุดท้ายที่จะเปลี่ยนชะตาของทุกคน',
                                  'เมื่อคำสัญญาในอดีตย้อนกลับมาทำร้าย ปัจจุบันจึงกลายเป็นสนามรบของหัวใจ',
                                  'เบื้องหลังรอยยิ้มคือบาดแผลที่ต้องปกปิด ในโลกที่ใครๆ ก็ใส่หน้ากาก'
                                ][index % 5]
                              }
                              (Random-text)
                            </span>
                          </div>
                          <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-2 text-sm'>
                              <IoEyeSharp className='text-gray-200' />
                              <h2 className='text-gray-200'>{item.views} views</h2>
                            </div>
                            <div className='cursor-pointer p-3 z-2'
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setfavorite(!favorite);
                              }}>
                              {
                                favorite ?
                                  <MdFavorite className='text-red-600' />
                                  : <MdFavoriteBorder className='text-white' />
                              }
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <ul>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default menu