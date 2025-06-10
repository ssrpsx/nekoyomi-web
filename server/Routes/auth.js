import express from 'express'
const router = express.Router()

router.get('/auth', (req, res) => {
    res.send("Hello Auth Endpoint 1")
})

router.post('/auth', (req, res) => {
    res.send("Hello Auth Endpoint 2")
})

export default router