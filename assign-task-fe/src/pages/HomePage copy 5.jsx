import {
  BellOutlined,
  CheckSquareOutlined,
  DashboardOutlined,
  PlusOutlined,
  ScheduleOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const navItems = [
  {
    key: "createTask",
    icon: <PlusOutlined />,
    label: <Link to={"/create"}>Create Task</Link>,
  },
  {
    key: "notify",
    icon: <BellOutlined />,
    label: <Link to={"/notify"}>Notify</Link>,
  },
];
const sidebarItems = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/tasks",
    icon: <CheckSquareOutlined />,
    label: "Tasks",
  },
  {
    key: "/my-tasks",
    icon: <ScheduleOutlined />,
    label: "My Tasks",
  },
  {
    key: "/members",
    icon: <UsergroupAddOutlined />,
    label: "Members",
  },
  {
    key: "/setting",
    icon: <SettingOutlined />,
    label: "Setting",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const currentYear = new Date().getFullYear();

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={["2"]}
          items={navItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <div style={{ padding: "0 48px" }}>
        {/* <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
        /> */}
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["/"]}
              style={{ height: "100%" }}
              items={sidebarItems}
              onClick={(e) => navigate(e.key)}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Routes> 
              <Route path="/dashboard" element={<p>home</p>} />
              <Route path="/tasks" element={<p>home</p>} />
              <Route path="/my-task" element={<p>home</p>} />
              <Route path="/members" element={<p>home</p>} />
              <Route path="/setting" element={<p>task</p>} />
            </Routes>
          </Content>
        </Layout>
      </div>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{currentYear} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default HomePage;
// import { Layout, Menu } from "antd";
// import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

// import { useEffect } from "react";
// // import Tasks from "./Tasks";

// const { Sider, Content } = Layout;

// function HomePage() {
//   useEffect(() => {
//     fetch("http://localhost:5000")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//       });
//   }, []);

//   return (
//     <div className="">
//       <BrowserRouter>
//         <Layout style={{ minHeight: "100vh" }}>
//           <Sider>
//             <Menu
//               theme="dark"
//               items={[
//                 {
//                   key: "1",
//                   label: <Link to="/">Dashboard</Link>,
//                 },
//                 {
//                   key: "2",
//                   label: <Link to="/tasks">Tasks</Link>,
//                 },
//               ]}
//             />
//           </Sider>

//           <Content style={{ padding: 20 }}>
//             <Routes>
//               <Route path="/" element={<p>home</p>} />
//               <Route path="/tasks" element={<p>task</p>} />
//             </Routes>
//           </Content>
//         </Layout>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default HomePage;
