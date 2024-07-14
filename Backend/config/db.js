import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://khakhil:akhil007@cluster0.nuwebsa.mongodb.net/drone-store').then(()=>console.log("DB Connected"));
}