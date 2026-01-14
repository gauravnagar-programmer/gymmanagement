import adminModel from "../models/adminModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const login = async (req,res) =>{
  const {username,password,secretKey} = req.body
  
  const existedAdmin = await adminModel.findOne({username : username.toLowerCase()})
  
  if(!existedAdmin) {
    return res.status(404).json(
      {message : "Admin not found, Try again! ", success  : false},
      
    )
  }
  
  if (secretKey !== process.env.LOGIN_SECRET_KEY) {
    return res.status(401).json({ message: "Invalid Registration Key" });
  }
  try {

    const isMatch = await bcrypt.compare(password,existedAdmin.password)
    if(!isMatch){
      return res.status(401).json(
        {message : "Invalid username or password, Try again! ", success  : false})
      }

      const token = jwt.sign(
        {adminId : existedAdmin._id, username : existedAdmin.username},
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
      )
      return res.status(200).json(
        {
          message : "Welcome Back !",
          success  : true,
          token : token,
        }
      )

    
  } catch (error) {
    console.log(error)
     return res.status(500).json(
      {message : "internal server error "}     )
  }

}


export default login