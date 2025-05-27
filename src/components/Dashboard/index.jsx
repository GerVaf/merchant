import { useGetDashboardData } from "../../api/hooks/useLogin";
import Loading from "../ui/Loading";
import Customers from "./components/Customers";
import DashTop from "./components/DashTop";
import Order from "./components/Order";
import UserOrderChart from "./components/UserOrderChart";

const Dashboard = () => {
  const { data, isLoading, isError, error } = useGetDashboardData();

  console.log(data?.data);
  const dashData = data?.data;

  if (isLoading) return <Loading/>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-5 text-white">
      {/* 15vh  */}
      <DashTop dashData={dashData} />
      {/* 45vh  */}
      <div className="flex w-full gap-5 h-[45vh]">
        <div className="w-1/2 border h-full overflow-y-scroll border-zinc-400 rounded ">
          <Customers />
        </div>
        <div className="w-1/2 border border-zinc-400 rounded">
          <UserOrderChart chartData={dashData?.chartData} />
        </div>
      </div>
      {/* 40vh */}
      <Order />
    </div>
  );
};

export default Dashboard;
