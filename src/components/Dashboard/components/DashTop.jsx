import { IconCheck, IconClock, IconPackage, IconPaperBag, IconUser } from "@tabler/icons-react";

/* eslint-disable react/prop-types */
const DashTop = ({ dashData }) => {
  // console.log(dashData);
  return (
    <div className="grid grid-cols-3 justify-around gap-8 text-white">
      <div className=" col-span-1 h-[15vh] rounded-lg bg-zinc-700 p-3 shadow-gray-700 shadow-md">
        <p className="text-md">Total Users</p>
        <div className="text-center text-[50px] flex items-center justify-center gap-5">
          <IconUser size={"50px"} />
          {dashData?.totalUsers}
        </div>
      </div>
      <div className=" col-span-1 h-[15vh] rounded-lg bg-zinc-700 p-3 shadow-gray-700 shadow-md">
        <p className="text-md">Total Packages</p>
        <div className="text-center text-[50px] flex items-center justify-center gap-5">
          <IconPackage size={"50px"} />
          {dashData?.totalPackages}
        </div>
      </div>
      <div className=" col-span-1 h-[15vh] rounded-lg bg-zinc-700 p-3 shadow-gray-700 shadow-md">
        <p className="text-md">Total Products</p>
        <div className="text-center text-[50px] flex items-center justify-center gap-5">
          <IconPackage size={"50px"} />
          {dashData?.totalProducts}
        </div>
      </div>
      <div className=" col-span-1 h-[15vh] rounded-lg bg-zinc-700 p-3 shadow-gray-700 shadow-md">
        <p className="text-md">Total Pending Orders</p>
        <div className="text-center text-[50px] flex items-center justify-center gap-5">
          <IconPaperBag size={"50px"} />
          {dashData?.totalPendingOrders}
        </div>
      </div>
      <div className=" col-span-1 h-[15vh] rounded-lg bg-zinc-700 p-3 shadow-gray-700 shadow-md">
        <p className="text-md">Total Done Orders</p>
        <div className="text-center text-[50px] flex items-center justify-center gap-5">
          <IconCheck size={"50px"} />
          {dashData?.totalDoneOrders}
        </div>
      </div>
      <div className=" col-span-1 h-[15vh] rounded-lg bg-zinc-700 p-3 shadow-gray-700 shadow-md">
        <p className="text-md">Ordering Account</p>
        <div className="text-center text-[50px] flex items-center justify-center gap-5">
          <IconClock size={"50px"} />
          {dashData?.orderedUsers}
        </div>
      </div>
    </div>
  );
};

export default DashTop;
