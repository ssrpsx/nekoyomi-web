import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/user')
        console.log('DB connected')
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectDB