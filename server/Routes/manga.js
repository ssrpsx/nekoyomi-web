import express from 'express'
import {menu, list, episode, getToggleFavorite, getFavorite} from '../Controllers/manga.js'
import midToken from '../Middleware/auth.js'

const router = express.Router()

router.get('/favorite/:id', midToken, getFavorite)
router.get('/:category/:pageNumber', menu) // รับเดต้าเมนูทั้งหมด
router.get('/:title/page/home', list) // หน้าแรก ที่กดเข้าเรื่องใดไป ละก็เลือกตอน
router.get('/:title/page/:pageNumber', episode) // หน้าเลือกตอน ep1 โหลด image-all.jpg

router.post('/toggle-favorite', midToken, getToggleFavorite)
export default router