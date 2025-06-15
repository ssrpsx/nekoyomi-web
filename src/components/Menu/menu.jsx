import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    <div>
      <div>
        <h1>5 อันดับ แนะนำยอดนิยม</h1>
      </div>
      <div>
        <ul>
          {data.sort((a, b) => b.views - a.views)
          .slice(0, 5)
          .map((item, index) => (
              <li id={index}>
                <img src={`/schema/BookCover/${item.title}.jpg`} alt="" className='w-[100px]'/>
                <h1>{item.title}</h1>
                <h2>{item.views} views</h2>
              </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default menu