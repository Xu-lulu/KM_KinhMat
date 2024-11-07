import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { RouterProvider } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import { NavbarFood, FooterFood, NavbarAdminHidden } from "./common/NavFood";
import { CartContext } from "./Contexts/CartContext";
import PublicRoute from "./routes/public";
import Admin from "./routes/admin";
import { dataCategorys, dataProducts } from "./redux/api/apiProduct";
import { Layout, Flex } from "antd";
import { useDataRole } from "./common/dataReux";
import reportWebVitals from "../reportWebVitals";
import NotFound from "./components/NotFound/NotFound";
import { ConfigProvider } from "antd";
import { router } from "./routes/router";
const { Header, Footer, Sider, Content } = Layout;
function App() {
  const [myCart, addtoCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [showlogin, setshowlogin] = useState(false);
  const [datalogin, setdatalogin] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const handlePerfEntry = (metric) => {
      // console.log("Web Vitals metric:", metric);
      // Xử lý các chỉ số hiệu suất ở đây, ví dụ: gửi đến một dịch vụ bên ngoài
    };

    reportWebVitals(handlePerfEntry);
  }, []);
  useEffect(() => {
    dataProducts(dispatch);
    dataCategorys(dispatch);
  }, [dispatch]);
  const user = useDataRole();
  return (
    // <>
    //   <ConfigProvider
    //     theme={{
    //       token: { fontFamily: "Inter" },
    //     }}
    //   >
    //     <RouterProvider router={router} />
    //   </ConfigProvider>
    // </>
    <CartContext.Provider
      value={{
        myCart,
        addtoCart,
        total,
        setTotal,
        count,
        setCount,
        datalogin,
        setdatalogin,
      }}
    >
      {user === "admin" ? (
        <Router>
          <Flex wrap="wrap">
            <Header>
              <NavbarAdminHidden />
            </Header>
            <Content>
              <Admin />
            </Content>
          </Flex>
        </Router>
      ) : (
        <Router>
          <Flex wrap="wrap">
            <Header>
              <NavbarFood />
            </Header>
            <Content>
              <PublicRoute />
            </Content>
            <Footer>
              <FooterFood />
            </Footer>
          </Flex>
          {/* <div className="User">
            <div className="Navbar-users">
              <NavbarFood />
            </div>
            <div className="page-container-user">
              <PublicRoute />
            </div>
            <div className="Footer-users">
              <FooterFood />
            </div>
          </div> */}
        </Router>
      )}
    </CartContext.Provider>
  );
}
//
export default App;
