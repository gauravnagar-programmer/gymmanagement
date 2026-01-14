import axios from "axios";
import { useState,useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import { SuccessMessage } from "../middlewares/InfoMessage";
import { Link } from "react-router-dom";



const ThreeDays = () => {
  const [expiredMember3Days,setExpiredMember3Days] = useState([]);
  const token = localStorage.getItem("adminToken");
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/admin/members/all",
        header
      );
      const filteredData =  res.data.filter(item => item.status == "expired in three days")
      
      setExpiredMember3Days(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const Delete = await axios.delete(
      import.meta.env.VITE_API_URL + `/admin/members/delete/${id}`,
      header
    );
    const {message} = Delete.data
    SuccessMessage(message)
    setTimeout(() => {
      
      getData()
    }, 1000);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="md:ml-50 ml-30 h-screen space-y-5  px-5 py-10 ">
        <h1 className="text-xl font-bold">Active Members</h1>
        <p>Total Members : {expiredMember3Days.length}</p>
        <div></div>
        <div className="grid-cols-1  grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
          {expiredMember3Days.map((data, index) => (
            <div
              key={index}
              className="flex bg-gray-200 relative  dark:bg-gray-700 flex-col space-y-3 text-gray-700 dark:text-white px-3 py-2 rounded-sm"
            >
                <p className="absolute top-4 font-semibold text-white  left-2 lowercase bg-orange-700 rounded-full px-2 py-1  text-xs">{data?.status}</p>
              <h3 className="mt-10">
                <span className="font-bold">Name : </span>
                {data?.name}
              </h3>
              <p>
                <span className="font-bold">Phone : </span>
                {data?.phone}
              </p>
              <p>
                <span className="font-bold">Starting : </span>
                {data?.startingdate}
              </p>
              <p>
                <span className="font-bold">Expire : </span>
                {data?.expiredate}
              </p>
             
              <div className="flex items-center md:px-5  py-3 justify-between">
                  <Link to={`/admin/member/update/${data._id}`} className="px-2 py-2 md:bg-indigo-700 cursor-pointer active:scale-90 bg-blue-500 font-bold rounded-lg  md:font-semibold text-white">
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(data._id)}
                  className="px-2 rounded-lg py-2 bg-red-500 cursor-pointer active:scale-90 md:bg-red-600 font-bold  md:font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ThreeDays;
