import Loading from "@/Loading";
import { useGetAuthUserQuery } from "@/services/rootApi";
import { Navigate, Outlet } from "react-router-dom";

const Protectedlayout = () => {
  const { data, isLoading, isFetching } = useGetAuthUserQuery();

  if (isLoading || (isFetching && !data?.data?._id)) {
    return <Loading />;
  }

  if (!data?.data?._id) {
    console.log({ "data?.data?._id": data?.data?._id });

    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};
export default Protectedlayout;
