import express from 'express'
import { register, login, change} from '../Controllers/auth.js'
import auth from '../Middleware/auth.js'

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.post('/change', auth, change)

export default router