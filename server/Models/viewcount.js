import mongoose from "mongoose";

const mangaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model('ViewCount', mangaSchema)