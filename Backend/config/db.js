import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://saga:saga@cluster0.4d1sxdg.mongodb.net/food-delivery').then(() => console.log("DB connected"))
}