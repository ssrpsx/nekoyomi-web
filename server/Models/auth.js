import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
            like: {
                type: Boolean,
                default: false
            },
            favorite: {
                type: Boolean,
                default: false
            }
        }
    ]
}, {timestamps: true})

export default mongoose.model('User', userSchema);