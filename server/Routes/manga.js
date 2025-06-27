import express from 'express'
import {menu, list, episode} from '../Controllers/manga.js'

const router = express.Router()

router.get('/:category/:pageNumber', menu) // รับเดต้าเมนูทั้งหมด
router.get('/:title/page/home', list) // หน้าแรก ที่กดเข้าเรื่องใดไป ละก็เลือกตอน
router.get('/:title/page/:pageNumber', episode) // หน้าเลือกตอน ep1 โหลด image-all.jpg

export default router