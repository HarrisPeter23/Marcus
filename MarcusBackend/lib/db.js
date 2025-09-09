import mongoose from "mongoose";


const connectDB=async()=>{

    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB Database")
    }
    catch(error){
        console.error("Error connecting to MongoDB database:",error.message)
    }
}

export default connectDB;