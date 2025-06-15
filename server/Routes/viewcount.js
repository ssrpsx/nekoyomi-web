import express from 'express'
import { register, login, list } from '../Controllers/viewcount.js'
import { auth } from '../Middleware/viewcount.js'

const router = express.Router()

router.get('/anime/:id', viewAnime)

export default router