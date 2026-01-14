import { useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { ErrorMessage, SuccessMessage } from "../middlewares/InfoMessage";
import { Link, useNavigate } from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6";



const AddMember = () => {

  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState({
    name: "",
    phone: "",
    membership: "1",
    startingdate : new Date().toISOString().split("T")[0]
  });


  const token = localStorage.getItem("adminToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const {name,phone,membership,startingdate} = inputValue
      if(!name || !phone || !membership || !startingdate){
        return ErrorMessage("All fields are required to fill")
      }
      const header = {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      };

      const res = await axios.post(
        "https://gymmanagementbackend-yc5w.onrender.com/admin/member/add",
        inputValue,
        header
      );
      console.log(res)
      if(res.status === 201){
        SuccessMessage(res.data.message)
        setTimeout(() => {
            navigate('/admin/work/dashboard')
        }, 1500);
      }
    } catch (error) {
      const message =
        error?.response?.data?.error || error?.response?.data?.message;
      console.log(error);
      ErrorMessage(message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-5 px-5">
      <Link to="/admin/work/dashboard" className=" flex items-center md:ml-0 -ml-5 gap-3 self-start my-10 text-xl  font-bold cursor-pointer px-5 "><FaArrowLeftLong/>Back</Link>
      <form
        onSubmit={handleSubmit}
        className="formbg-base-200 md:w-md border-base-500 space-y-6 md:space-y-10 mb-10  rounded-box w-xs border px-4 py-7"
      >
        <h1 className="mb-5 text-center text-2xl font-bold">
          {" "}
          Register Member
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
            className="btn  btn-neutral  md:px-10 bg-blue-500 text-white border-none focus-visible:outline-2
    focus-visible:outline-blue-500 w-full active:scale-90 mt-4 font-semibold"
          >
            Register
          </button>
        </div>
      </form>
        <ToastContainer />
    </div>
  );
};

export default AddMember;
