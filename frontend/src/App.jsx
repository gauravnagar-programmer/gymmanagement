import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthAdmin from "./middlewares/AuthAdmin";
import Layout from "./components/Layout";
import AddMember from "./pages/AddMember";
import MemberList from "./pages/Member";
import ActiveMembers from "./pages/ActiveMember";
import ExpireMembers from "./pages/ExpireMember";
import ThreeDays from "./pages/ThreeDays";
import SevenDays from "./pages/SevenDays";
import UpdateMember from "./pages/UpdateMember";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="admin"
        element={
          <AuthAdmin>
            <Layout />
          </AuthAdmin>
        }
      >
        <Route path="work/dashboard" element={<Dashboard />} />
        <Route path="dashboard/add/member" element={<AddMember />} />
        <Route path="members/all" element={<MemberList />} />
        <Route path="members/active" element={<ActiveMembers/>} />
        <Route path="members/expire" element={<ExpireMembers/>} />
        <Route path="members/expire/3_days" element={<ThreeDays/>} />
        <Route path="members/exprire/7_days" element={<SevenDays/>} />
        <Route  path="member/update/:id" element={<UpdateMember/>}/>
      </Route>
    </Routes>
  );
}

export default App;
