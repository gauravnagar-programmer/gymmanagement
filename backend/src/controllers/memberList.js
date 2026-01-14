import memberModel from "../models/members.js";
import { differenceInDays } from "date-fns";

const memberList = async (req, res) => {
  try {
    const getStatusCodeWithData = (expiredate) => {
      const today = new Date
      const nowExpireDate = new Date(expiredate);
      const daysLeft = differenceInDays(nowExpireDate, today);

      if (daysLeft < 0) {
        return "expired";
      }
      if (daysLeft <= 3) {
        return "expired in three days";
      }

      if (daysLeft <= 7) {
        return "expired in four to seven days";
      }

      return "active";
    };
    const members = await memberModel.find();
    const membersWithStatus = members.map((member) =>({
      ...member._doc,
      status : getStatusCodeWithData(member.expiredate)
    }))
    res.status(200).json(membersWithStatus);
    
  } catch (error) {
    return res.status(500).json(
      {message : "internal server error"}
    )
  }
};

const memberDetails = async (req,res) =>{
  try {
    const {id} = req.params
    const findMember = await memberModel.findById(id)
    res.status(200).json(findMember)
    
  } catch (error) {
    return res.status(500).json({message : "internal server error"})
  }

  
}

export  {memberList , memberDetails};
