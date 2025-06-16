import express from 'express'
import {ft_added, list} from '../Controllers/viewcount.js'

const router = express.Router()

router.post('/', ft_added)
router.get('/', list)

export default router