import memberModel from "../models/members.js";
import { addMonths } from "date-fns";

const memberAdd = async (req, res) => {
  const { name, phone, membership, startingdate } = req.body;

  try {
    const parseDate = new Date(startingdate);
    const createNumber = Number(membership);
    if (isNaN(parseDate)) {
      return res.status(400).json({
        message: "not a valid starting Date",
      });
    }
    
    const expiredate = addMonths(parseDate, createNumber);
    
    const findMember = await memberModel.findOne({ phone });

    if (findMember) {
      return res.status(409).json({
        message: "phone number already exists",
        success: false,
      });
    }

    const createdMember = await memberModel.create({
      name,
      phone,
      membership,
      startingdate,
      expiredate: expiredate.toISOString().split("T")[0],
    });

    return res
      .status(201)
      .json({ message: "Member added successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export default memberAdd;
