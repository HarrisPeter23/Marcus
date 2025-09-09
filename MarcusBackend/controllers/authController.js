import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

// function generateToken(userId){
//   return jwt.sign({userId},process.env.JWT_SECRET)
// }
export const generateToken=(userId)=>{
    return jwt.sign({userId},process.env.JWT_SECRET)
}
export const signup=async(req,res)=>{
  const {name,email,password}=req.body
  try{ 
  const userExists=await userModel.findOne({email})

  if(userExists){
    return res.json({message:"User already exists"})
  } 
  const user=await userModel.create({name,email,password})

  const token=generateToken(user._id)
  res.cookie("token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV == "production",
    sameSite:"strict",
    maxAge:7*24*60*60*1000
  })

  res.json({ success: true, message: "User registered", token });

}
  

  catch(error){
    return res.json({message:error.message})
  }
  
}

export const login= async (req,res)=>{

   const {email,password}=req.body;

   if(!email || !password){

    return res.json({success:false,message:"Email and password are required"})
  
}
   try {

    const user=await userModel.findOne({email})

    if(!user){
        return res.json({success:false,message:"Invalid email"})
    }

    const isMatch=await bcrypt.compare(password,user.password)
    
    if(!isMatch){
        return res.json({success:false,message:"invalid password"})

    }

    const token = generateToken(user._id)
    
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production'?'none':'strict',
        maxAge:7*24*60*60*1000
    })

    return res.json({success:true})

} catch (error) {
    return res.json({success:false,message:error.message})
   }
}


export const logout =async(req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'?
            'none':'strict',
        })
        return res.json({success:true,message:"Logged Out"})
    } catch (error) {
         return res.json({success:false,message:error.message})
    }
    
}


export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};