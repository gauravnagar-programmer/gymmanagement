import { useEffect, useState } from "react"
import UseAuth from "../middlewares/UseAuth"
import axios from "axios"
import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import CardContainer from "../components/CardContainer"


const Dashboard = () => {



 


  return (
   <div className="relative">      


    <Sidebar />
    <Link to="/admin/dashboard/add/member" className="bg-yellow-500 text-white   px-2 py-2 text-xs md:text-sm active:scale-90  font-medium right-2 md:right-5 top-10 fixed">+ Add Member</Link>
    <CardContainer/>
   </div>
  )
}

export default Dashboard