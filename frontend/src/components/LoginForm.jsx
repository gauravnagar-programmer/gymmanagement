import { useState } from "react";
import axios from "axios"
import { ErrorMessage, SuccessMessage ,WarningMessage } from "../middlewares/InfoMessage";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginForm = () => {
  const navigate = useNavigate()        
  const [inputFields, setInputFields] = useState({
    username: "",
    password: "",
    secretKey: "",
  });
      
  
  const submitForm = async (e) =>{
    e.preventDefault()
    const {username,password,secretKey} = inputFields
    if (!username || !password || !secretKey) {
       return  WarningMessage("All fields are required")
      }
    try {
      const res = await axios.post('http://192.168.214.156:4000/admin/login',inputFields)
      console.log(res)
      if(res.status === 200){
        SuccessMessage("Login Successful"),
        
        setTimeout(() => {
          navigate("/admin/work/dashboard")
          JSON.stringify(localStorage.setItem("adminToken",res.data.token))
        } , 1000);

      }

    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message || "Login failed"
      ErrorMessage(message)
      console.log(error)
      return
    }
  }


  return (
    // create form for admin login
    <form onSubmit={submitForm} className="formbg-base-200 md:w-md border-base-500 space-y-6 md:space-y-10 mb-10  rounded-box w-xs border px-4 py-7">
      <h1 className="mb-5 text-center text-2xl font-bold">Login</h1>

      {/* username field */}
      <div className="flex flex-col space-y-3 w-full">
        <label className="label">Username</label>
        <input
          value={inputFields.username}
          onChange={(e) =>
            setInputFields({ ...inputFields, username: e.target.value })
          }
          type="text"
          className="input w-full focus-visible:outline-gray-500  "
          placeholder="Enter Your Username"
        />
      </div>

      {/* password field */}
      <div className="flex flex-col space-y-3 w-full">
        <label className="label">Password</label>
        <input
          value={inputFields.password}
          onChange={(e) =>
            setInputFields({ ...inputFields, password: e.target.value })
          }
          type="password"
          className="input focus-visible:outline-gray-500 w-full "
          placeholder="Password"
        />
      </div>

      {/* secret key field */}
      <div className="flex flex-col space-y-3 w-full">
        <label className="label">Secret Key</label>
        <input
          value={inputFields.secretKey}
          onChange={(e) =>
            setInputFields({ ...inputFields, secretKey: e.target.value })
          }
          type="text"
          className="input focus-visible:outline-gray-500 w-full "
          placeholder="Enter your Secret key"
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          className="btn  btn-neutral md:px-10 bg-blue-500 text-white border-none focus-visible:outline-2
    focus-visible:outline-blue-500 outline-yellow-400 active:scale-90 mt-4"
        >
          Login
        </button>
      </div>
      <ToastContainer/>
    </form>
  );
};

export default LoginForm;
