import mongoose from "mongoose"

const dbConnect = async () =>{
try {
  const MONGO_URL = process.env.MONGODB_COLLECTION
  const connect = await mongoose.connect(MONGO_URL)
  console.log(`db connected successfully`)
  
} catch (error) {
  console.log(error)
  process.exit(1)
}
}


export default dbConnect