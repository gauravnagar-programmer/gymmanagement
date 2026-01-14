import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams ,Link } from "react-router-dom"
import { SuccessMessage, WarningMessage } from "../middlewares/InfoMessage"
import { ToastContainer } from "react-toastify"
import { FaArrowLeftLong } from "react-icons/fa6";


const UpdateMember = () => {
  const navigate = useNavigate()
  const [inputValue,setInputValue] = useState({
    name : "",
    phone:"",
    membership : "",
    startingdate : ""
    

  })
  const {id}  = useParams()
  const token = localStorage.getItem("adminToken")
  const header = {
    headers : {
      Authorization : `Bearer ${token}`
    }
  }

  const getMemberData = async () =>{
    const res = await axios.get(`https://gymmanagementbackend-yc5w.onrender.com/admin/members/update/details/${id}`,header)
    console.log(res)
    
    setInputValue({
      name : res.data.name,
      phone : res.data.phone,
      membership : res.data.membership,
      startingdate : res.data.startingdate
    })
    
  }

  const handleUpdate = async (e) =>{
    e.preventDefault()

    try {
      const {name,phone ,membership,startingdate} = inputValue
      if(!name || !phone || !membership || !startingdate) {
        return WarningMessage("All fields are required")
      }
      const res = await axios.put(`https://gymmanagementbackend-yc5w.onrender.com/admin/member/update/${id}`,inputValue,header)
      const {message,success} = res.data
      if(success){
        SuccessMessage(message)
        setTimeout(() => {
          navigate('/admin/work/dashboard')
        }, 1500);
      }
        console.log(res)
      
      } catch (error) {
      
    }
  }

  useEffect(() =>{
    getMemberData()
  },[])

  return (
    <div className="flex flex-col items-center justify-around px-5 py-10">
        <Link to="/admin/work/dashboard" className=" flex items-center md:ml-0 -ml-5 gap-3 self-start my-10 text-xl  font-bold cursor-pointer px-5 "><FaArrowLeftLong/>Back</Link>
      <form
       onSubmit={handleUpdate}
        className="form bg-base-200 md:w-md border-gray-400 space-y-6 md:space-y-10 mb-10  rounded-box w-xs border  px-4 py-7"
      >
        <h1 className="mb-5 text-center text-2xl font-bold">
          {" "}
          Update Member
        </h1>

        <div className="flex flex-col space-y-3 w-full">
          <label className="label">Name</label>
          <input
            value={inputValue.name}
            onChange={(e) =>
              setInputValue({ ...inputValue, name: e.target.value })
            }
            type="text"
            className="input w-full focus-visible:outline-gray-500  "
            placeholder="Enter Name"
          />
        </div>

        <div className="flex flex-col space-y-3 w-full">
          <label className="label">Phone No.</label>
          <input
            value={inputValue.phone}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/\D/g, "");
              setInputValue({ ...inputValue, phone: digitsOnly });
            }}
            type="tel"
            inputMode="numeric"
            maxLength={10}
            className="input focus-visible:outline-gray-500 w-full "
            placeholder="Phone no."
          />
        </div>

         <div className="flex flex-col space-y-3 w-full">
          <label className="label">Membership</label>
          <select
            value={inputValue.membership}
            onChange={(e) =>
              setInputValue({ ...inputValue, membership: e.target.value })
            }
            name="membership"
            className=" cursor-pointer dark:focus:outline-2 outline-none focus:outline-gray-500 border text-gray-400 dark:text-gray-500  border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md"
          >
            <option value="1"> 1 Month</option>
            <option value="2">2 Months</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
          </select>
        </div>

           <div className="flex flex-col space-y-3 w-full">
          <label className="label">Starting Date</label>
            <input 
            value={inputValue.startingdate}
            onChange={(e) => setInputValue({...inputValue,startingdate : e.target.value})}

             className="w-full px-2 py-3 focus-visible:outline-2 focus-visible:outline-gray-500 border border-gray-300 rounded-md" 
             type="date" />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="btn  btn-neutral  md:px-10 bg-yellow-500 text-white border-none focus-visible:outline-2
    focus-visible:outline-yellow-500 w-full active:scale-90 mt-4 font-semibold"
          >
            Update
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default UpdateMember