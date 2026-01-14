import memberModel from "../models/members.js"
import { differenceInDays , addMonths } from "date-fns"

const memberUpdate = async (req, res) => {
  try {
    const { id } = req.params
    const { name, phone ,membership,startingdate } = req.body
    const parseStarting = new Date(startingdate)
    const numMembership = Number(membership)
    const expiredate = addMonths(parseStarting,numMembership) 
    console.log(expiredate)
    const updatedMember = await memberModel.findByIdAndUpdate(
      id,
      { name,
        phone,
        membership ,
        startingdate,
        expiredate : expiredate.toISOString().split("T")[0]
      },
      { new: true, runValidators: true }
    )

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found"  })
    }

    return res.status(200).json({
      message: "Member updated successfully",
      success : true

    })

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    })
    console.log(error)
  }
}

export default memberUpdate
