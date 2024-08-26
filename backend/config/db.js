import mongoose from "mongoose"

const { MONGODB_URI } = process.env;

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://dapos:S3qIs41KEUcrVw33@cluster0.jehydsi.mongodb.net/panache?retryWrites=true&w=majority").then(()=>console.log("DB connected"))
}