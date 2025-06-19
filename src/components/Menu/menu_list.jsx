import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IoEyeSharp } from "react-icons/io5";

function menu_list() {
  const [data, setData] = useState([])
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
      const isSmallScreen = window.innerWidth > 640;
      const sorted = [...data].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
      const sliced = sorted.slice(0, isSmallScreen ? 25 : 10);
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
    <div className='m-auto'>
      <div className='m-auto flex flex-col md:flex-row w-[50%] gap-4 justify-center my-6 p-4 pt-8 bg-gray-800 rounded-bl-lg rounded-br-lg'>
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
      </div>
    </div>
  )
}

export default menu_list