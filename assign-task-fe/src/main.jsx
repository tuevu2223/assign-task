import { theme } from "@/configs/themeConfig";
import TraillerModelProvider from "@/context/TraillerModelProvider";
import AuthLayout from "@/layout/AuthLayout";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { persistor, store } from "@/redux/store";
import { Dashboard } from "@mui/icons-material";
import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import Protectedlayout from "./layout/Protectedlayout";
import RootLayout from "./layout/RootLayout";
import Loading from "./Loading";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import MembersPage from "./pages/MembersPage";
import MyTaskPage from "./pages/MyTaskPage";
import NotifyPage from "./pages/NotifyPage";
import SettingPage from "./pages/SettingPage";
import TasksPage from "./pages/TasksPage";
import EditTaskPage from "./pages/EditTaskPage";
import AssignedTask from "./pages/AssignedTask";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <Protectedlayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },

          {
            path: "/tasks",
            element: <TasksPage />,
          },
          {
            path: "/my-tasks",
            element: <MyTaskPage />,
          },
          {
            path: "/members",
            element: <MembersPage />,
          },
          {
            path: "/setting",
            element: <SettingPage />,
          },
          {
            path: "/create",
            element: <CreatePage />,
          },
          {
            path: "/notify",
            element: <NotifyPage />,
          },
          {
            path: "/edit-task/:id",
            element: <EditTaskPage />,
          },
          {
            path: "/assigned-task",
            element: <AssignedTask />,
          },
          
        ],
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
      <PersistGate loading={<Loading />} persistor={persistor}>
        <ConfigProvider theme={theme}>
          <TraillerModelProvider>
            <RouterProvider router={router} />
          </TraillerModelProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
