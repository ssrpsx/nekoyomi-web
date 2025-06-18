import express from 'express'
import {ft_added, menu, menu_list, list, episode} from '../Controllers/manga.js'

const router = express.Router()

router.post('/', ft_added)
router.get('/menu', menu)
router.get('/menu/:pageNumber', menu_list)
router.get('/page/home', list)
router.get('/page/:pageNumber', episode)

export default router