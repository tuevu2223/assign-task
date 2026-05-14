// Supports weights 100-900
import Loading from "@/Loading";
import { close } from "@/redux/slices/snackBarSlice";
import "@fontsource-variable/public-sans/wght.css";
import { message as antdMessage } from "antd";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  const dispatch = useDispatch();

  const { isOpen, message, type } = useSelector((state) => state.snackBar);

  console.log({ open, isOpen });
  const handleClose = () => {
    dispatch(close());
  };

  useEffect(() => {
    if (isOpen && message) {
      const msgType = type || "info"; // default to info
      if (antdMessage[msgType]) {
        antdMessage[msgType](message);
      } else {
        antdMessage.info(message);
      }
      handleClose(); // Close in redux state immediately after triggering antd message
    }
  }, [isOpen, message, type, dispatch]);

  return (
    <div className="bg-dark-100 flex h-screen items-center justify-center">
      <div className="w-[450px]">
        <div className="rounded bg-white px-4 py-8">
          <div className="flex justify-center">
            <img width='50px' src="/logo-register.png" />
          </div>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
export default AuthLayout;
