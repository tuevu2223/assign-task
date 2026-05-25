import {
  CheckSquareOutlined,
  DashboardOutlined,
  SafetyOutlined,
  ScheduleOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { role } = useSelector((state) => state.role);

  const SIDE_BAR_ITEMS = [
    ...(role !== "MANGAGER" && role !== "USER"
      ? [
          {
            key: "/dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
          },
        ]
      : []),
    ...(role !== "USER"
      ? [
          {
            key: "/tasks",
            icon: <CheckSquareOutlined />,
            label: "Tasks",
          },
        ]
      : []),
    {
      key: "/my-tasks",
      icon: <ScheduleOutlined />,
      label: "My Tasks",
    },
    ...(role !== "USER"
      ? [
          {
            key: "/assigned-task",
            icon: <SafetyOutlined />,
            label: "Assigned Task",
          },
        ]
      : []),
    ...(role !== "USER"
      ? [
          {
            key: "/tasks",
            icon: <CheckSquareOutlined />,
            label: "Tasks",
          },
        ]
      : []),
    ...(role !== "MANGAGER" && role !== "USER"
      ? [
          {
            key: "/members",
            icon: <UsergroupAddOutlined />,
            label: "Members",
          },
        ]
      : []),
    {
      key: "/setting",
      icon: <SettingOutlined />,
      label: "Setting",
    },
  ];

  return (
    <Sider style={{ background: colorBgContainer }} width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["/"]}
        style={{ height: "100%" }}
        items={SIDE_BAR_ITEMS}
        onClick={(e) => navigate(e.key)}
      />
    </Sider>
  );
}
export default Sidebar;
