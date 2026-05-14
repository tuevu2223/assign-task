import { theme } from "@/configs/themeConfig";
import TraillerModelProvider from "@/context/TraillerModelProvider";
import AuthLayout from "@/layout/AuthLayout";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { store } from "@/redux/store";
import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import RootLayout from "./layout/RootLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/*",
        element: <HomePage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/Register",
        element: <RegisterPage />,
      },
      {
        path: "/Login",
        element: <LoginPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <TraillerModelProvider>
          <RouterProvider router={router} />
        </TraillerModelProvider>
      </ConfigProvider>
    </Provider>
  </StrictMode>,
);
