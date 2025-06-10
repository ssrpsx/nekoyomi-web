import express from 'express'
import { register, login } from '../Controllers/auth.js'

const router = express.Router()

router.get('/auth', (req, res) => {
    res.send("Hello Auth Endpoint 1")
})

router.post('/register', register)

router.post('/login', login)

router.put('/auth', (req, res) => {
    res.send("Hello Auth Put Endpoint")
})

router.delete('/auth', (req, res) => {
    res.send("Hello Auth Endpoint 2")
})

export default router