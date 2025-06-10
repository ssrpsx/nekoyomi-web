import mongoose from "mongoose";

const users = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    mangaReadProgress: [
        {
            mangaName: {
                type: String,
                required: true
            },
            lastReadEpisode: {
                type: Number,
                default: 1
            }
        }
    ]
})

module.exports = mongoose.model('Users', users)