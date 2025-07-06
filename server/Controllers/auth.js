import User from '../Models/auth.js'
import BlacklistToken from '../Models/token.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

export const register = async (req, res) => {
    try {
        const { gmail, username, password } = req.body
        const gmailNormalized = gmail.trim().toLowerCase();
        const usernameNormalized = username.trim().toLowerCase();


        const userByGmail = await User.findOne({ gmail: gmailNormalized });
        const userByUsername = await User.findOne({ username: usernameNormalized });

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
            gmail: gmailNormalized,
            username: usernameNormalized,
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
        const usernameNormalized = username.trim().toLowerCase();

        var user = await User.findOneAndUpdate({ username: usernameNormalized }, { new: true })

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).send("Password Ivalid!!!")
            }

            const payload = {
                user: {
                    _id: user._id,
                    gmail: user.gmail,
                    username: user.username
                }
            };

            jwt.sign(payload, 'jwtsecret', (err, token) => {
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

export const change = async (req, res) => {
    try {
        const { username, password_old, password_1, password_2 } = req.body
        var user = await User.findOne({ username })

        if (user) {
            const isMatch = await bcrypt.compare(password_old, user.password)

            if (!isMatch) {
                return res.status(400).send("Old password is incorrect.")
            }

            if (password_1 !== password_2) {
                return res.status(400).send("New passwords do not match.")
            }

            if (password_old === password_1) {
                return res.status(400).send("New password must be different from the old password.")
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password_1, salt);

            await User.updateOne(
                { username },
                { password: hashedPassword }
            );

            return res.status(200).send("Your password has been changed successfully.")
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

export const change_gmail = async (req, res) => {
    try {
        const { email } = req.body;
        const emailNormalized = email.trim().toLowerCase();

        const user = await User.findOne({ gmail: emailNormalized });
        if (!user) return res.status(404).send("User not found");

        const payload = {
            user: {
                _id: user._id,
                gmail: user.gmail,
                username: user.username
            }
        };

        const token = jwt.sign(payload, 'jwtsecret', { expiresIn: '15m' });
        const resetLink = `${process.env.LOCAL_LINK}/AuthChangeGmail/${token}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailNormalized,
            subject: 'NekoYomi : Reset your password',
            html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
                    <p style="font-size: 16px; color: #555;">
                      We received a request to change the email associated with your NekoYomi account.
                      If you made this request, please click the button below to proceed.
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${resetLink}" 
                         style="
                           background-color: #4CAF50; 
                           color: white; 
                           padding: 14px 28px; 
                           text-decoration: none; 
                           border-radius: 6px; 
                           font-weight: bold;
                           display: inline-block;
                         ">
                        Change Email Address
                      </a>
                    </div>
                    <p style="font-size: 14px; color: #777;">
                      This link is valid for 15 minutes only. If you did not request this change, please ignore this email.
                    </p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
                    <p style="font-size: 12px; color: #aaa; text-align: center;">
                      © 2025 NekoYomi. All rights reserved.
                    </p>
                  </div>
                `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send("Reset link sent");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

export const check_gmail = async (req, res) => {
    try {
        const token = req.params.token
        const { password_1, password_2 } = req.body
        const decoded = jwt.verify(token, 'jwtsecret');
        const usedToken = await BlacklistToken.findOne({ token });

        if (usedToken) {
            return res.status(401).send("Token has already been used.");
        }

        const user = await User.findOne({ _id: decoded.user._id });

        if (user) {
            if (password_1 !== password_2) {
                return res.status(400).send("New passwords do not match.")
            }

            if (password_1.length < 6) {
                return res.status(400).send("Password must be at least 6 characters.")
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password_1, salt);

            await User.findByIdAndUpdate(
                user._id,
                { $set: { password: hashedPassword } },
                { new: true }
            );

            await BlacklistToken.create({ token });
            return res.status(200).send("Your password has been changed successfully.")
        }
        else {
            return res.status(400).send("User not found!!!")
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}
