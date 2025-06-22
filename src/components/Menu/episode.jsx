import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FiArrowDownCircle } from "react-icons/fi";
import { useParams, useNavigate } from 'react-router-dom'

function Episode() {
    const { title, episode } = useParams()
    const [ismenu, setismenu] = useState(false)
    const [data, setData] = useState()
    const [isepisode, setisEpisode] = useState()

    const navigate = useNavigate();
    const numA = parseInt(episode.replace('episode', ''), 10);

    const loadData = async () => {
        try {
            const res = await axios.get(`http://mangabyphai.ddns.net:4/anime/${title}/page/${episode}`)
            setisEpisode(res.data.episodes)
            setData(res.data.images)

            window.scrollTo(0, 0)
        }
        catch (err) {
            console.log(err)
        }
    }

    const getMinEpisode = () => {
        if (!isepisode || isepisode.length === 0) return 0;
        const numbers = isepisode.map(e => parseInt(e.replace('episode', ''), 10));
        return Math.min(...numbers);
    };

    const getMaxEpisode = () => {
        if (!isepisode || isepisode.length === 0) return 0;
        const numbers = isepisode.map(e => parseInt(e.replace('episode', ''), 10));
        return Math.max(...numbers)
    }

    const minEpisode = getMinEpisode();
    const maxEpisode = getMaxEpisode();

    const goToPage = (newPage) => {
        if (newPage >= minEpisode) {
            navigate(`/anime/${title}/page/episode${newPage}`)
            window.scrollTo(0, 0)
        }
    }



    useEffect(() => {
        loadData()
    }, [episode])

    return (
        <div>
            <div className='p-2 text-center'>
                <div className='py-4 px-8 bg-[#33333a] dark:bg-gray-800 rounded-lg rounded-bl-none rounded-br-none shadow-[1px_4px_6px_rgba(0,0,0,0.6)]'>
                    <h1 className='font-kanit text-2xl font-bold text-white'>{title.replaceAll('-', ' ')} ตอนที่ {numA} แปลไทย</h1>
                    <div className='border-b-1 w-1/2 border-gray-700 my-4 mx-auto sm:hidden'></div>
                    <span className='font-kanit text-xl text-white'>อ่านมังงะ {title.replaceAll('-', ' ')} ตอนที่ {numA} แปลไทย ที่เว็บ NekoYomi อ่านมังงะออนไลน์</span>
                </div>
                <div className='flex justify-between bg-gray-800 p-6 w-full'>
                    <div className='block w-1/2 mr-4 relative text-center items-center justify-center'>
                        <div
                            className='cursor-pointer w-full flex items-center justify-between gap-x-1.5 text-gray-200 bg-gray-700 px-3 py-2 rounded-2xl mr-4'
                            onClick={() => setismenu(!ismenu)}
                            style={{ userSelect: 'none' }}
                        >
                            <h1 className='pb-1 items-center'>ตอนที่ {numA}</h1>
                            <FiArrowDownCircle />
                        </div>
                        <ul
                            className={`z-10 h-[400px] w-full px-3 py-2 text-gray-200 text-left bg-gray-700 rounded-lg overflow-y-auto absolute ${ismenu ? 'block' : 'hidden'}`}
                        >
                            {isepisode && isepisode.map((ep, index) => (
                                <li key={index}
                                    className='p-2 hover:bg-gray-800 hover:text-white rounded-lg w-full'
                                >
                                    <a
                                        href={`/anime/${title}/page/${ep}`}
                                    >
                                        ตอนที่ {ep.replaceAll('episode', '')}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex gap-x-2 w-1/2'>
                        <button
                            onClick={() => goToPage(numA - 1)}
                            disabled={numA <= minEpisode}
                            className={`w-[80px] text-center gap-x-1.5 text-gray-200 bg-gray-700 px-1 py-2 rounded-2xl ${numA <= minEpisode ? 'bg-gray-100 text-gray-500' : 'cursor-pointer '}`}
                        >
                            ก่อนหน้า
                        </button>
                        <button
                            onClick={() => goToPage(numA + 1)}
                            disabled={numA >= maxEpisode}
                            className={`w-[80px] text-center gap-x-1.5 text-gray-200 bg-gray-700 px-1 py-2 rounded-2xl ${numA >= maxEpisode ? 'bg-gray-100 text-gray-500' : 'cursor-pointer '}`}
                        >
                            ถัดไป
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <ul>
                    {data && data.map((item, index) => (
                        <li key={index}>
                            <img src={`/schema/${title}/${episode}/${item}`}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Episode

//schema/Swordmasters-Youngest-Son/episode1/image_1.jpg
//schema/Swordmasters-Youngest-Son/episode1/image_1.jpg