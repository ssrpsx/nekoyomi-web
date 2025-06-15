import express from 'express'
import {show, list} from '../Controllers/viewcount.js'

const router = express.Router()

router.post('/:name', show)
router.get('/', list)

export default router