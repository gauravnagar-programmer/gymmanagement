import { Link } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import Navbar from "../components/Navbar"

const Login = () => {
  return (
    <div className="space-y-15 flex flex-col items-center mb-5">
   <Navbar/>
   <LoginForm/>
   <Link className="p-3 bg-blue-500 text-white" to="/admin/work/dashboard">dashboard</Link>
    </div>
  )
}

export default Login