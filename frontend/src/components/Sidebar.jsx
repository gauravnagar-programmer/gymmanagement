import {Link, useNavigate } from "react-router-dom";
import {SuccessMessage} from "../middlewares/InfoMessage"
const Sidebar = () => {

  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem("adminToken")
    SuccessMessage('Logout Successfully')
    setTimeout(() => {
      
      navigate('/')
    }, 1000); 
  }

  return ( 
    <div
      className={` space-y-10 md:space-y-24 flex flex-col fixed left-0 top-0 md:w-50 w-30 h-screen bg-gray-500 dark:bg-gray-200`}
    >
      <h1 className="text-2xl mt-2 text-center font-bold text-blue-500 md:m-3 ">
        GymRec
      </h1>

      <ul className="md:text-xl flex flex-col items-center space-y-5 md:space-y-7 md:mt-13 text-white dark:text-gray-700 font-semibold px-4 text-sm ">
        
          <Link className="w-full" to="/admin/work/dashboard">
        <li className=" cursor-pointer  hover:bg-blue-400 active:scale-90 text-center active:bg-blue-500 hover:text-white active:text-white w-full px-2 py-2 md:py-4 rounded-md ">
        Dashboard
        </li>
        </Link>

        <Link className="w-full" to="/admin/members/all">
        <li className="cursor-pointer hover:bg-blue-400 active:scale-90 text-center active:bg-blue-500 hover:text-white active:text-white w-full px-2 py-2 md:py-4 rounded-md ">
          Members
        </li>
        </Link>

        <Link className="w-full"  onClick={handleLogout}>
        <li  className=" cursor-pointer hover:bg-blue-400 active:scale-90 text-center active:bg-blue-700 hover:text-white active:text-white w-full px-2 py-2 md:py-4 rounded-md ">
          Logout
        </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
