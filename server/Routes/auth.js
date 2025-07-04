import express from 'express'
import { register, login, list } from '../Controllers/auth.js'

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

export default router