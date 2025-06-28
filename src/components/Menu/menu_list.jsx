import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IoEyeSharp } from "react-icons/io5";
import { useParams, useNavigate } from 'react-router-dom'

function menu_list() {
  const [data, setData] = useState([])
  const [lastPage, setlastPage] = useState(1)
  const { category, pageNumber } = useParams()
  const page = parseInt(pageNumber || '1')
  const navigate = useNavigate()

  const loadData = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API + `/anime/${category}/${page}`)
      setData(res.data.shows)
      setlastPage(res.data.lastTotalPage)

      console.log(res.data.shows)
      console.log(res.data.lastTotalPage)
    }
    catch (err) {
      console.log(err)
    }
  }

  const categoryMap = {
    menu_list: 'อนิเมะ & มังงะ',
    popular: 'อนิเมะ & มังงะยอดนิยม',
    action: 'อนิเมะ & มังงะต่อสู้',
    adventure: 'อนิเมะ & มังงะผจญภัย',
    drama: 'อนิเมะ & มังงะดราม่า',
    fantasy: 'อนิเมะ & มังงะแฟนตาซี'
  };

  const fixedCategory = categoryMap[category] || category;

  const goToPage = (newPage) => {
    if (newPage >= 1) {
      navigate(`/${category}/${newPage}`)
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    loadData()
  }, [page, category])

  return (
    <div className='flex flex-col md:flex-row gap-4 justify-center pt-6'>
      <div className='order-2 md:order-1 w-full p-5 pt-0 md:w-[90%] sm:w-[50%] sm:pl-5 sm:pr-0'>
        <div className='p-5 pl-2 bg-[#33333a] dark:bg-gray-800 rounded-lg rounded-bl-none rounded-br-none shadow-[1px_4px_6px_rgba(0,0,0,0.6)]'>
          <h1 className='font-kanit text-white text-xl font-medium text-center'>
            {fixedCategory} หน้าที่ {pageNumber}
          </h1>
        </div>
        <div className='p-4 pt-8 w-full justify-center bg-gray-800 rounded-bl-lg rounded-br-lg'>
          {
            data && data.length > 0 ? (
              <ul className='grid grid-cols-2 md:grid-cols-5 sm:grid-cols-5 gap-4'>
                {data.map((manga, index) => (
                  <li key={index} className="group text-white h-[350px] md:max-w-[125px] max-w-[150px] mx-auto">
                    <a href={`/anime/${manga.title}/page/home`}>
                      <img
                        src={`/schema/BookCover/${manga.title}.jpg`}
                        alt=""
                        className='w-[150px] h-[200px] group-hover:scale-105 object-cover transition-transform duration-300 rounded'
                      />
                      <div className='h-[90px] flex flex-col justify-between'>
                        <h1 className='text-white group-hover:text-[#4E71FF] font-semibold text-lg p-1 line-clamp-2'>
                          {manga.title.replaceAll('-', ' ')}
                        </h1>
                        <span className='text-sm text-gray-200 line-clamp-1'>
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
                ))}
              </ul>
            ) : (
              <div className="flex justify-center items-center h-[200px] text-white text-xl">
                Error 404 - ไม่พบข้อมูล
              </div>
            )
          }
          <div className='w-full flex justify-center gap-3'>
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
              className={`w-1/3 sm:w-1/6 text-center p-1.5 mb-2 font-medium rounded-md
              ${page <= 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white cursor-pointer'}`}
            >
              ก่อนหน้านี้
            </button>

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page == lastPage || lastPage == 0}
              className={`w-1/3 sm:w-1/6 text-center p-1.5 mb-2 font-medium rounded-md
              ${page == lastPage || lastPage == 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white cursor-pointer'}`}
            >
              หน้าถัดไป
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default menu_list