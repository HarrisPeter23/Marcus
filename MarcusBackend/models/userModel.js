import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    // role: {
    //     type: String,
    //     enum: ["user", "admin"], // allowed values
    //     default: "user",         // default role
    // },
})

userSchema.pre("save",async function(next){
   if (!this.isModified("password"))return next()

   try{
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
   }
   catch(error){
    next(error)
   }
})

userSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password)
}

const userModel=mongoose.model("User",userSchema)

export default userModel