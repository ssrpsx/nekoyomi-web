import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    gmail: {
        type: String,
        required: true,
        unique: true
    },
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
            },
            favorite: {
                type: Boolean,
                default: false
            }
        }
    ]
}, { timestamps: true })

export default mongoose.model('User', userSchema);