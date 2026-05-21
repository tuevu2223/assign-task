import HeaderApp from "@/components/Home/HeaderApp";
import Sidebar from "@/components/Home/Sidebar";
import Loading from "@/Loading";
import { close, open } from "@/redux/slices/snackBarSlice";
import "@fontsource-variable/public-sans/wght.css";
import { message as antdMessage, Layout, theme } from "antd";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const currentYear = new Date().getFullYear();

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
      handleClose();  
    }
  }, [isOpen, message, type, dispatch]);

  return (
    <Layout>
      <HeaderApp />
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
          <Sidebar />

          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
            {/* <Routes> 
              <Route path="/dashboard" element={<p>home</p>} />
              <Route path="/tasks" element={<p>home</p>} />
              <Route path="/my-task" element={<p>home</p>} />
              <Route path="/members" element={<p>home</p>} />
              <Route path="/setting" element={<p>task</p>} />
            </Routes> */}
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
