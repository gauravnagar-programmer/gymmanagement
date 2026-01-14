import express from "express" 
import "dotenv/config"
import dbConnect from "./src/config/dbconnect.js"
import route from "./src/routes/route.js"
import cors from "cors"

dbConnect()
const app = express() 

//middlewares
app.use(cors())
app.use(express.json())
app.use((err,req,res,next) =>{
  if(err instanceof SyntaxError && err.status === 400 && 'body' in err ){
    return res.status(400).json({message:"Invalid JSON"});
  }
  next();
})


app.use("/admin",route)




//app start
const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server running on PORT : ${PORT}`);
  
})