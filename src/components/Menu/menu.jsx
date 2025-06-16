import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IoEyeSharp } from "react-icons/io5";

function menu() {
  const [data, setData] = useState([])


  const loadData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/anime')
      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  console.log(data)

  return (
    <div className='p-5'>
      <div className='p-5 pl-2 bg-[#33333a] dark:bg-gray-800 rounded-lg shadow-[1px_4px_6px_rgba(0,0,0,0.6)]'>
        <h1 className='font-kanit text-white text-xl font-semibold text-center'>ยอดฮิตติดอันดับ TOP 5</h1>
      </div>
      <div>
        <div className='relative w-full max-w-screen-lg mx-auto'>
          <ul className='p-5 flex flex-nowrap overflow-x-auto scrollbar-hide gap-4'>
              {data.sort((a, b) => b.views - a.views)
                .slice(0, 5)
                .map((item, index) => (
                  <li id={index} className='flex bg-gray-700 rounded-xl overflow-hidden min-w-[375px] h-[250px]'>
                    <img
                      src={`/schema/BookCover/${item.title}.jpg`}
                      alt=""
                      className='w-[175px] h-full object-cover'
                    />
                    <div className='px-6 py-4 flex flex-col justify-between h-full'>
                      <div>
                        <h1 className='text-[#4E71FF] font-bold text-lg'>{index+1}. {item.title}</h1>
                        <div className='flex gap-2 text-gray-200 mb-2'>
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
                      <div className='flex items-center gap-2 text-sm'>
                        <IoEyeSharp className='text-gray-300' />
                        <h2 className='text-gray-300'>{item.views} views</h2>
                      </div>
                    </div>
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
  )
}

export default menu