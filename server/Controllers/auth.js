import User from '../Models/auth.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { gmail, username, password } = req.body

        const userByGmail = await User.findOne({ gmail });
        const userByUsername = await User.findOne({ username });

        if (!gmail || !username || !password) {
            return res.status(400).send("Missing required fields.");
        }

        if (userByGmail) {
            return res.status(409).send("gmail already exists!");
        }
        if (userByUsername) {
            return res.status(409).send("User already exists!");
        }

        if (password.length < 6) {
            return res.status(400).send("Password must be at least 6 characters.")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            gmail,
            username,
            password: hashedPassword
        });
        
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

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).send("Password Ivalid!!!")
            }

            const payload = {
                user: {
                    username: user.username
                }
            };

            jwt.sign(payload, 'jwtsecret', { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({ token, payload })
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