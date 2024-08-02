import mongoose from "mongoose";

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

export const connectDB = async () =>{
    await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.nuwebsa.mongodb.net/drone-store`).then(()=>console.log("DB Connected"));
}