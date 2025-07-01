import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useLocation } from 'react-router-dom'
import { IoEyeSharp } from "react-icons/io5";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { jwtDecode } from 'jwt-decode';

function menu_home() {
    const { title } = useParams();
    const [data, setData] = useState()
    const [episode, setEpisode] = useState()
    const [favorites, setFavorites] = useState([]);
    
    const randomIndex = title.length % 5;

    const loadData = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API + `/anime/${title}/page/home`)
            setData(res.data.data)
            setEpisode(res.data.folders)
        }
        catch (err) {
            console.log(err)
        }
    }

    const loadFavorites = async () => {
        try {
          const token = localStorage.getItem('authtoken');
          if (!token) return;
    
          const decoded = jwtDecode(token);
          const res = await axios.get(import.meta.env.VITE_API + '/anime/favorite/' + decoded.user._id, {
            headers: {
              authtoken: token
            }
          });
    
          const favIds = res.data
            .filter(item => item.favorite)
            .map(item => item.mangaName);
    
          setFavorites(favIds);
        }
        catch (err) {
          console.log(err);
        }
      };
    
      const ft_setfavorite = async (name) => {
        const token = localStorage.getItem('authtoken');
        if (!token) {
          alert('กรุณาเข้าสู่ระบบก่อน');
          window.location.href = '/Auth'
          return;
        }
    
        try {
          const decoded = jwtDecode(token);
          const res = await axios.post(import.meta.env.VITE_API + '/anime/toggle-favorite',
            {
              id: decoded.user._id,
              mangaName: name
            },
            {
              headers: {
                authtoken: token
              }
            }
          );
    
          const newFavs = res.data.mangaReadProgress
            .filter(item => item.favorite)
            .map(item => item.mangaName);
    
          setFavorites(newFavs);
        }
        catch (err) {
          console.log(err);
        }
      };

    useEffect(() => {
        loadData()
        loadFavorites()
    }, [])

    return (
        <div className='flex flex-col md:flex-row gap-4 justify-center pt-6'>
            <div className='w-full p-5 pt-0 md:w-[75%] lg:w-[50%] sm:pl-5 sm:pr-0'>
                <div className='p-5 pl-2 bg-[#33333a] dark:bg-gray-800 rounded-lg rounded-bl-none rounded-br-none shadow-[1px_4px_6px_rgba(0,0,0,0.6)]'>
                    <h1 className='font-kanit text-white text-xl font-medium text-left pl-4'>
                        {title.replaceAll('-', ' ')}
                    </h1>
                </div>
                <div className='p-6 pt-8 w-full justify-center bg-gray-800 md:block sm:flex'>
                    <div className='w-[200px] md:w-[250px] mx-auto'>
                        <img src={`/schema/BookCover/${title}.jpg`}
                            className='w-[200px] md:w-[250px]' />
                        <div>
                            <div onClick={ () => {
                                ft_setfavorite(title)}
                            }
                                className='text-xl flex items-center justify-center cursor-pointer gap-2 pl-2.5 pr-4 py-2 my-4 bg-blue-600 rounded'>
                                {
                                    favorites.includes(title) ?
                                        <MdFavorite className='text-red-600 font-medium' />
                                        : <MdFavoriteBorder className='text-white font-medium' />
                                }
                                <span className='text-xl flex items-center text-white pb-1 font-medium'
                                    style={{ userSelect: 'none' }}
                                >
                                    Favorite
                                </span>
                            </div>
                            {data ? (
                                <div className='flex items-center gap-x-2'>
                                    <IoEyeSharp className='text-xl flex items-center cursor-pointer gap-2 text-gray-300' />
                                    <span className='text-gray-300'>{data.views.toLocaleString()} views</span>
                                </div>
                            ) : (
                                <div className="text-white">Loading views...</div>
                            )}
                        </div>
                    </div>
                    <div className='w-full mt-6 sm:mt-0 sm:p-5'>
                        {data ? (
                            <h1 className='text-white'>หมวดหมู่ : {data.category.toLocaleString()}</h1>
                        ) : (
                            <div className="text-white">Loading cetegory...</div>
                        )}
                        <span className='text-white'><br />เรื่องย่อ {title.replaceAll('-', ' ')} แปลไทย</span>
                        <div className='mt-1'>
                            <span className='text-gray-400 leading-relaxed'>
                                {
                                    [
                                        `ในโลกที่เวทมนตร์กลายเป็นทุกสิ่งและสถานะทางสังคมถูกกำหนดจากระดับพลังเวท เด็กหนุ่มผู้ไร้พลังเวทตั้งแต่เกิดจึงกลายเป็นผู้ถูกเหยียดหยาม เขาถูกขับไล่ออกจากสถาบันเวทมนตร์ ถูกปฏิเสธจากทุกที่ และใช้ชีวิตอยู่กับการเป็นเพียง "สิ่งไร้ค่า" ในสายตาของสังคม แต่ในคืนแห่งจันทราแดง วิญญาณเก่าแก่ได้ปลุกพลังต้องห้ามในตัวเขา—พลังที่ครั้งหนึ่งเคยทำให้โลกเกือบล่มสลายและถูกผนึกไว้ตลอดกาล ด้วยพลังที่ไร้การควบคุม เขาเริ่มดึงดูดความสนใจขององค์กรเวทมนตร์ระดับสูง และกลุ่มลับที่ซ่อนอยู่ในเงามืดของประวัติศาสตร์

ขณะที่เขาค้นพบว่าเบื้องหลังโครงสร้างสังคมเวทมนตร์ที่สมบูรณ์แบบนั้นคือกับดักแห่งการควบคุมและความกลัว เขาจึงตัดสินใจท้าทายทุกกฎเกณฑ์ เดินหน้าเพื่อปลดปล่อยตนเองและผู้ถูกกดขี่คนอื่นจากระบบที่อยุติธรรมนี้ แต่เขาจะรับมือกับโชคชะตาอันยิ่งใหญ่ไหวหรือไม่ ในเมื่อพลังของเขานั้นคือกุญแจที่สามารถทำลายทั้งโลกได้เพียงชั่วพริบตา`,

                                        `เมืองหลวงอันเจริญรุ่งเรืองเต็มไปด้วยเทคโนโลยีล้ำยุค อาคารสูงเสียดฟ้า และการใช้ชีวิตสุดหรูของชนชั้นสูง แต่ไม่มีใครรู้ว่าใต้พื้นถนนอันงดงามนี้ยังซ่อนเมืองเงาอันแสนอันตราย กลุ่มอาชญากรเหนือมนุษย์ สิ่งมีชีวิตจากมิติอื่น และสมาคมลับที่ควบคุมทุกอย่างจากเบื้องหลังยังคงเคลื่อนไหวอยู่ทุกคืน

เด็กกำพร้าที่อาศัยในตรอกมืดหลังเมือง กลับได้รับพลังจากตาข้างหนึ่งที่เปลี่ยนเป็น “ดวงตาแห่งยมทูต” โดยบังเอิญ—พลังที่ทำให้เขาเห็นความตายล่วงหน้าและเปิดประตูไปสู่มิติแห่งความตายได้ เขากลายเป็นเป้าหมายของทั้งเทพผู้พิทักษ์และปีศาจผู้ล่อลวงจิตวิญญาณ เมื่อเขาได้เข้าไปพัวพันกับศึกโบราณระหว่างผู้สร้างและผู้ทำลาย เขาจึงต้องเลือกระหว่างการเป็นเบี้ยในเกมของเหล่าทวยเทพ หรือทลายกระดานทั้งกระดานแล้วสร้างชะตาชีวิตด้วยมือของตัวเอง`,

                                        `เธอคือเด็กสาวธรรมดาในโลกปัจจุบัน มีชีวิตเรียบง่าย เรียนหนังสือ ทำงานพิเศษ และเฝ้าฝันถึงอนาคตที่มั่นคง แต่ทุกอย่างกลับพลิกผันในพริบตา เมื่อเธอตื่นขึ้นมาในป่ามืดลึกลับของโลกอีกใบที่ไม่ใช่โลกของเธอ สิ่งมีชีวิตประหลาดเดินผ่านกลางคืน วิหารพังทลายที่พูดด้วยเสียงมนตรา และผู้คนที่ใช้เวทมนตร์ต่อสู้ในสงคราม—เธอไม่มีพลัง ไม่มีความรู้ ไม่มีใครรอรับ

ท่ามกลางโลกที่โหดร้าย เธอต้องเรียนรู้การเอาตัวรอด ฝึกฝนทักษะเวทมนตร์ที่เธอไม่เคยมี ค้นหาความหมายของการถูกอัญเชิญ และรวบรวมพันธมิตรจากผู้ถูกทอดทิ้งเช่นเดียวกัน ขณะเดียวกันก็ต้องหลบเลี่ยงการตามล่าจากราชวงศ์และนักบวชที่เชื่อว่าเธอคือตัวอันตรายจากคำพยากรณ์โบราณ การผจญภัยของเธอจะจบลงที่บ้าน หรือกลายเป็นผู้นำเปลี่ยนแปลงโชคชะตาของโลกใบใหม่นี้ไปตลอดกาล`,

                                        `เขาคือนักฆ่าระดับตำนานขององค์กรลับที่ไม่มีใครกล้าเอ่ยชื่อ แต่หลังจากภารกิจสุดท้ายที่เขาไม่สามารถลงมือฆ่าเด็กสาวได้ เขาตัดสินใจหายตัวไปจากโลกมืด หวังใช้ชีวิตอย่างสงบในหมู่บ้านห่างไกล แต่โชคชะตากลับไม่ปล่อยให้เขาหลุดจากวงจรเดิม เด็กสาวคนนั้นที่เขาช่วยไว้ กลับกลายเป็นผู้ถือครองพลังโบราณจากอีกมิติ พลังที่เหล่าอสูรจากนอกจักรวาลต้องการเพื่อเปิดประตูสู่โลกมนุษย์

องค์กรลับเริ่มเคลื่อนไหวอีกครั้ง นักล่าจากมิติอื่นบุกเข้ามาในโลกมนุษย์ และอดีตของเขาที่ถูกฝังไว้ก็เริ่มตื่นขึ้นอีกครั้ง เมื่อการปกป้องเด็กสาวคนนั้นไม่ใช่แค่เรื่องของความรู้สึกผิด แต่กลายเป็นการต่อสู้เพื่อป้องกันจุดจบของโลก เขาจะยอมลุกขึ้นสู้อีกครั้ง หรือปล่อยให้ทุกอย่างล่มสลายไปพร้อมกับอดีตของตัวเอง`,

                                        `เขาตื่นขึ้นในวังหลวงที่เต็มไปด้วยความหรูหราและกลิ่นอายของอำนาจ โดยไม่รู้เลยว่าตนเองอยู่ในร่างของจักรพรรดิผู้โหดเหี้ยมที่ผู้คนทั่วแผ่นดินหวาดกลัว ขณะที่พยายามปรับตัวกับสถานะใหม่ เสียงกระซิบจากอดีต ความทรงจำที่ไม่ใช่ของเขา และพลังเวทมนตร์ที่พลุ่งพล่านในเลือดก็เริ่มตื่นขึ้น ชีวิตของเขากลับกลายเป็นเป้าหมายของการลอบสังหาร การทรยศของขุนนาง และสงครามแย่งชิงบัลลังก์จากศัตรูที่อยู่ทั้งในและนอกวัง

เขาจำเป็นต้องเรียนรู้ศิลปะแห่งการปกครอง การต่อสู้ และเวทมนตร์ไปพร้อม ๆ กัน ขณะเดียวกันก็ต้องค้นหาความจริงว่าใครคือผู้ที่ดึงวิญญาณของเขาเข้ามาอยู่ในร่างนี้ และทำไมโลกทั้งใบถึงกำลังรอการกลับมาของจักรพรรดิผู้นี้อีกครั้ง ในโลกที่เต็มไปด้วยความลวง เขาจะเลือกเป็นราชาที่เปลี่ยนแปลงทุกสิ่ง หรือกลายเป็นจอมเผด็จการคนเดิมอีกครั้ง`
                                    ]
                                    [randomIndex % 5]
                                }
                            </span>
                        </div>
                    </div>
                </div>
                <div className='p-6 w-full justify-center bg-gray-800 mt-3 rounded-lg rounded-tl-none rounded-tr-none'>
                    <h1
                        className='text-xl text-white text-left pb-2 border-b-1 border-gray-700'>{title.replaceAll('-', ' ')}</h1>
                    <ul
                        className='h-[200px] overflow-y-auto'
                    >
                        {episode && episode.map((ep, index) => (
                            <li
                                key={index}
                                className='w-full h-[40px] border-1 border-gray-700
                                 px-3 py-2 rounded my-2'
                            >
                                <a
                                    href={`/anime/${title}/page/${ep}`}
                                    className='font-kanit w-full h-full block text-gray-200'
                                >
                                    ตอนที่ {index + 1}
                                </a>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default menu_home