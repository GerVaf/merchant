/* eslint-disable react-refresh/only-export-components */
import { Link } from "react-router-dom";
import { useGetUser } from "../../../api/hooks/useUser";
import Loading from "../../ui/Loading";

export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0)

  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
};

const Customers = () => {
  const { data: customers, isLoading, isError, error } = useGetUser();
  //   console.log(customers?.data.users);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="text-white relative">
      <div className="grid grid-cols-8 sticky text-center top-0 z-10 w-full border-b bg-zinc-600 py-2">
        <div className="col-span-1">No.</div>
        <div className="col-span-2">Name</div>
        <div className="col-span-2">Gmail</div>
        <div className="col-span-3">Join Date</div>
      </div>
      <div className="flex flex-col py-5">
        {customers?.data.users.map((cu, index) => {
          return (
            <div
              className="grid grid-cols-8 text-center border-b border-gray-500 py-5 "
              key={cu._id}
            >
              <div className="col-span-1">{index + 1}</div>
              <div className="col-span-2">{cu.username}</div>
              <div className="col-span-2">{cu.email}</div>
              <div className="col-span-3">{formatDate(cu.createdAt)}</div>
            </div>
          );
        })}
        <Link
          className="text-lg underline self-end px-10 py-3"
          to={"/dashboard/user-manage"}
        >
          Seemore
        </Link>
      </div>
    </div>
  );
};

export default Customers;
