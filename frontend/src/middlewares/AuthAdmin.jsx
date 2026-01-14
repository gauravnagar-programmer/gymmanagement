import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const AuthAdmin = ({ children }) => {

  const navigate = useNavigate()
  
  useEffect(() =>{
    const token = localStorage.getItem("adminToken")
    if (!token) {
        navigate('/')
    }


  },[])


  return children
}

export default AuthAdmin
