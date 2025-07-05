import express from 'express'
import { register, login, change, change_gmail, check_gmail } from '../Controllers/auth.js'
import auth from '../Middleware/auth.js'

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.post('/change', auth, change)

router.post('/changeGmail', change_gmail)

router.post('/check/:token', check_gmail)

export default router