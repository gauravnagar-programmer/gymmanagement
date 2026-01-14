import memberModel from "../models/members.js"


const memberDelete = async (req,res) =>{

  try {
    const { id } = req.params
    console.log(id)
    const deleteMember = await memberModel.findByIdAndDelete(id)
    res.status(200).json(
      {message : "Member deleted successfully"}
    )
  } catch (error) {
    res.status(500).json({
      message : "Internal server error"
    })
    console.log(error)
  }

}

export default memberDelete