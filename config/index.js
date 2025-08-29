import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI

const connectDB = async() => {
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000
        })
        console.log('Mongodb connected successfully!')
    } catch (error) {
        console.error(error)
    }
}

export default connectDB;