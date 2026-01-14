import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt"

const seedAdmin = async () =>{
  const bcryptPassword = await bcrypt.hash("ram1221",10)
  const seededAdmin = await adminModel.create({
    username : "ram",
    password : bcryptPassword
  })
}

export default seedAdmin