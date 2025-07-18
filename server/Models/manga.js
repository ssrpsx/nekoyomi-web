import mongoose from "mongoose";

const mangaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        require: true
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model('Manga', mangaSchema)