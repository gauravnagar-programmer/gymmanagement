import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name : {
    type : String,
    require : true
  },
  phone : {
    type : String,
    require : true,
    unique : true
  },
  membership : {
    type : String,
    require : true
  },
  startingdate : {
    type : String,
    require : true
  },
  expiredate : {
    type : String,
    require : true
  },
})

const memberModel = mongoose.model("member",memberSchema)

export default memberModel