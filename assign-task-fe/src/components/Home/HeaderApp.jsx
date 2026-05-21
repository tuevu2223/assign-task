import { BellOutlined, PlusOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeaderApp = () => {
  const { role } = useSelector((state) => state.role);
  const navItems = [
    ...(role === "MANAGER" || role === "ADMIN"
      ? [
          {
            key: "createTask",
            icon: <PlusOutlined />,
            label: <Link to={"/create"}>Create Task</Link>,
          },
        ]
      : []),
    {
      key: "notify",
      icon: <BellOutlined />,
      label: <Link to={"/notify"}>Notify</Link>,
    },
  ];
  return (
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
  );
};
export default HeaderApp;
