import { FaHourglassHalf, FaList, FaUserCheck, FaUserClock ,FaBan } from "react-icons/fa"

import CardComp from "./CardComp"


const CardContainer = () => {
  return (
    <div className="grid md:grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 grid-cols-1   h-screen content-start  px-5 py-2 md:ml-50 ml-30 mt-30  ">
      <CardComp link="/admin/members/all"  title="All Members List" Icon={FaList}/>
     <CardComp link="/admin/members/active" title="Active Members" Icon={FaUserCheck} className={"text-green-500"} />
      <CardComp link="/admin/members/expire/3_days" title="Expire in 3 days" Icon={FaUserClock} className={"text-amber-600"} />
      <CardComp link="/admin/members/exprire/7_days" title="Expire in 7 days" Icon={FaHourglassHalf} className={"text-amber-400"} />
      <CardComp link="/admin/members/expire" title="Expired Members" Icon={FaBan} className={"text-red-400"} />
    </div>
  )
}

export default CardContainer