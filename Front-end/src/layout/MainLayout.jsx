import { useEffect } from "react";
import { useAccessToken } from "../common/dataReux";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import Navbars from "../components/Navbars/Navbars";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  const token = useAccessToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      console.log("chua login");
      // navigate("/login");
    }
  }, [token, location]);
  return (
    <>
      <Layout>
        <Navbars />
        <Layout.Content className="wrapper">
          <Outlet />
        </Layout.Content>
        <Footer />
      </Layout>
    </>
  );
};
export default MainLayout;
