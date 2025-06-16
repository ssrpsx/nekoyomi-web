import express from 'express'
import {added, list} from '../Controllers/viewcount.js'

const router = express.Router()

router.post('/:name', added)
router.get('/', list)

export default router