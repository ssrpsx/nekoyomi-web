import User from '../Models/auth.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        var user = await User.findOne({ username })

        if (password.length < 6) {
            return res.status(400).send("Password must be at least 6 characters.")
        }

        if (user) {
            return res.status(409).send("User already exists!");
        }

        const salt = await bcrypt.genSalt(10)

        user = new User({
            username,
            password
        })

        user.password = await bcrypt.hash(password, salt)
        await user.save()

        res.status(201).send("Register Success!!")
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        var user = await User.findOneAndUpdate({ username }, { new: true })

        if(user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) {
                return res.status(400).send("Password Ivalid!!!")
            }

            const payload = {
                user: {
                    username: user.username
                }
            };

            jwt.sign(payload, 'jwtsecret', { expiresIn: 3600 }, (err, token) =>{
                if(err) throw err;
                res.json({token, payload})
            })
        }
        else {
            return res.status(400).send("User not found!!!")
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

export const list = async (req, res) => {
    try {
        const users = await User.find({}).exec()
        res.send(users)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}