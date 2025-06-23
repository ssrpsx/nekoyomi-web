import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image1 from '../../assets/SlideImages/The-Return-of-the-Disaster-Class-Hero-2.jpg'
import Image2 from '../../assets/SlideImages/Swordmasters-Youngest-Son-2.jpg'
import Image3 from '../../assets/SlideImages/Return-of-the-Frozen-Player-1.jpg'
import Image4 from '../../assets/SlideImages/Return-of-the-Flowery-Mountain-Sect-.jpg'
import Image5 from '../../assets/SlideImages/Mercenary-Enrollment.jpg'
import Image6 from '../../assets/SlideImages/Life-of-a-Magic-Academy-Mage.jpg'
import Image7 from '../../assets/SlideImages/Infinite-Mage.jpg'
import Image8 from '../../assets/SlideImages/Duke-Pendragon-Master-of-the-White-Dragon-Up-Manga.jpg'
import Image9 from '../../assets/SlideImages/Damn-Reincarnation.jpg'

const data = [
    {
        id : 1,
        name : "The Return of the Disaster Class Hero",
        desciption : "เรื่องย่อ : เมื่อฮีโร่ระดับต่ำที่สุด แบค ยูซอล ถูกหักหลังโดยเหล่าฮีโร่คนอื่น เขากลับมาอีกครั้งในฐานะผู้ที่จะแก้แค้นพวกทรยศเหล่านั้น และเผยความจริงเกี่ยวกับเทพและโลกที่ถูกทำลาย เพื่อยุติวงจรที่ผิดพลาด",
        link : "/anime/The-Return-of-the-Disaster-Class-Hero/page/home",
        img : Image1
    },
    {
        id : 2,
        name : "Swordmaster is Youngest Son",
        desciption : "เรื่องย่อ : จิน โรุนเดล — ลูกชายคนสุดท้องของตระกูลนักดาบผู้ยิ่งใหญ่ ถูกมองข้ามเพราะไม่มีพลังเวท เขาได้โอกาสกลับมาเกิดใหม่และตัดสินใจเปลี่ยนชะตาของตนเอง พร้อมพลิกโฉมตระกูลและโลกแห่งดาบและเวทมนตร์",
        link : "/anime/Swordmasters-Youngest-Son/page/home",
        img : Image2
    },
    {
        id : 3,
        name : "Return of the Frozen Player",
        desciption : "เรื่องย่อ : ผู้เล่นระดับ S ที่ถูกแช่แข็งหลังปราบบอสขั้นสุดท้าย กลับฟื้นขึ้นมาในอีกหลายปีต่อมา พบว่าโลกและระบบเกมได้เปลี่ยนไปหมด เขาต้องต่อสู้เพื่อทวงตำแหน่งและความจริงกลับคืนมา",
        link : "/anime/Return-of-the-Frozen-Player/page/home",
        img : Image3
    },
    {
        id : 4,
        name : "Return of the Flowery Mountain Sect",
        desciption : "เรื่องย่อ : ผู้นำแห่งนิกายฮวาซานในอดีต ฟื้นคืนชีพมาในยุคใหม่ที่นิกายของเขาล่มสลาย เขาจะก่อตั้งมันขึ้นใหม่และนำชื่อเสียงของ ดอกไม้แห่งภูเขา กลับคืนสู่ยุทธภพ",
        link : "/anime/Return-of-the-Flowery-Mountain-Sect/page/home",
        img : Image4
    },
    {
        id : 5,
        name : "Mercenary Enrollment",
        desciption : "เรื่องย่อ : ยูอิจิน รอดชีวิตจากอุบัติเหตุเครื่องบินตกและกลายเป็นทหารรับจ้าง หลังจากใช้ชีวิตในสนามรบมานาน เขากลับมาใช้ชีวิตวัยเรียนอีกครั้ง…แต่ยังคงทักษะทหารไว้ พร้อมปกป้องครอบครัวและคนที่รักจากทุกภัยคุกคาม",
        link : "/anime/Mercenary-Enrollment/page/home",
        img : Image5
    },
    {
        id : 6,
        name : "Life of a Magic Academy Mage",
        desciption : "เรื่องย่อ : เรื่องราวของเด็กชายที่เกิดมาในโลกเวทมนตร์ และได้รับโอกาสเรียนที่สถาบันเวทที่ดีที่สุด ชีวิตของเขาจะเปลี่ยนไปอย่างไร เมื่อความลับบางอย่างเริ่มถูกเปิดเผย?",
        link : "/anime/Life-of-a-Magic-Academy-Mage/page/home",
        img : Image6
    },
    {
        id : 7,
        name : "The Infinite Mage",
        desciption : "เรื่องย่อ : เด็กชายที่เกิดในหมู่บ้านยากจนใฝ่ฝันจะเป็นจอมเวท แม้จะไร้พรสวรรค์ เขากลับมีบางสิ่งที่ไม่มีใครคาดคิด การเรียนรู้ที่ไร้ขีดจำกัดจะทำให้เขาทะลุขอบเขตของเวทมนตร์ที่มนุษย์เคยรู้จัก",
        link : "/anime/Life-of-a-Magic-Academy-Mage/page/home",
        img : Image7
    },
    {
        id : 8,
        name : "Duke Pendragon: Master of the White Dragon Archives",
        desciption : "เรื่องย่อ : นักรบผู้ยิ่งใหญ่ที่ได้รับมอบหมายให้ปกป้องความลับของมังกรขาว หลังจากย้อนเวลากลับไป เขาจะใช้ความรู้จากอนาคตเพื่อปกป้องอาณาจักรและหยุดยั้งหายนะที่จะมาถึง",
        link : "/anime/Duke-Pendragon/page/home",
        img : Image8
    },
    {
        id : 9,
        name : "Damn Reincarnation",
        desciption : "เรื่องย่อ : ฮีโร่ผู้เสียสละตัวเองเพื่อหยุดจอมมาร กลับชาติมาเกิดใหม่พร้อมกับความทรงจำเดิม คราวนี้ เขาจะไม่ยอมแพ้ต่อโชคชะตาอีก และจะกลายเป็นวีรบุรุษที่แท้จริงในโลกใบนี้",
        link : "/anime/Damn-Reincarnation/page/home",
        img : Image9
    },
]

function SlideImage() {
const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    pauseOnFocus: true,
    dotsClass: "slick-dots custom-dot-class",
    appendDots: dots => (
        <div className="relative mt-4">
            <ul className="flex justify-center items-center gap-0">{dots}</ul>
        </div>
    ),
    customPaging: i => (
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black dark:bg-white rounded-full opacity-40 transition duration-300"></div>
    )
};
    return (
        <div className='mt-6 flex justify-center items-center'>
            <div className='w-[1280px] max-w-full px-1'>
                <Slider {...settings}>
                    {data.map((dataimage) => (
                        <div key={dataimage.id} className='flex flex-col sm:flex-row justify-center items-center rounded-md gap-4 px-4 py-6'>
                            <a href={dataimage.link} className='rounded-md'>
                                <img
                                  src={dataimage.img}
                                  alt={dataimage.name}
                                  className='h-auto rounded-md object-contain'
                                />
                            </a>
                            <div className='text-black dark:text-white max-w-xl'>
                                <h2 className='text-2xl font-bold my-2.5'>{dataimage.name}</h2>
                                <p className='text-sm'>{dataimage.desciption}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div></div>
        </div>
    )
}

export default SlideImage