import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./Navbars.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCartArrowDown,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { dataCart } from "../../redux/api/apiAddtoCart";
import { Badge, Avatar } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  useDataCurrentUser,
  useDataRole,
  useDataUser,
  useDataCart,
  useAccessToken,
} from "../../common/dataReux";
import Matkinh from "../../assets/animation/Matkinh.json";
import account from "../../assets/animation/account.json";
import Lottie from "lottie-react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { logoutUser } from "../../redux/api/apiRequest";
import { loginSuccess, logoutSuccess } from "../../redux/authSlice";
import { createAxios } from "../../common/createInstane";
import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
const Navbars = () => {
  const { id } = useParams();
  const [searchActive, setSearchActive] = useState(false);
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const [totalMount, settotalMount] = useState(0);
  const dispatch = useDispatch();
  const user = useDataUser();
  const role = useDataRole();
  const token = useAccessToken();
  const handleClickLogout = () => {
    logoutUser(dispatch, id, navigate, token, axiosJWTlogout);
    // dispatch(purgeStoredData());
    // navigate("/Login");
  };
  const dataCurrent = useDataCurrentUser();
  let axiosJWT = createAxios(dataCurrent, dispatch, loginSuccess);
  let axiosJWTlogout = createAxios(dataCurrent, dispatch, logoutSuccess);

  useEffect(() => {
    if (token && user === "user") {
      dataCart(dispatch, token, axiosJWT);
    }
  }, [dispatch, token, axiosJWT]);

  const dataCartUser = useDataCart();
  console.log(dataCartUser);
  useEffect(() => {
    if (user && dataCartUser) {
      const sumMount = dataCartUser.reduce((acc, currentItem) => acc + 1, 0);
      settotalMount(sumMount);
    } else {
      settotalMount(0);
    }
  }, [dataCartUser]);
  const handleClickUser = () => {
    setshow(!show);
  };
  const items = [
    {
      key: "1",
      label: (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              textDecoration: "none",
            }}
          >
            <Lottie
              style={{ width: "50px" }}
              animationData={account}
              loop={true}
            />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              {user?.username}
            </a>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <NavLink to="/seller" className="btn">
          Cấp quyền lên người bán
        </NavLink>
      ),
    },
    {
      key: "3",
      label: (
        <NavLink to="/Login" className="btn" onClick={handleClickLogout}>
          Đăng Xuất
        </NavLink>
      ),
    },
  ];
  return (
    <>
      <div className="nav-container">
        <a className="logo">
          {/* <img src={logo} alt="logo"></img> */}

          <div className="logo__animation">
            <Lottie animationData={Matkinh} loop={true} />
          </div>
          {/* <Animation data={Bank} /> */}
          <div className="logo__text">
            <h1>Kính mắt</h1>
            <h1>Kính mắt</h1>
            <h1>Kính mắt</h1>
          </div>
        </a>
        <div
          className={`nav-container__search ${searchActive ? "active" : ""}`}
        >
          <IonIcon
            className="nav-container__search__icon"
            icon={searchOutline}
            onClick={() => setSearchActive(!searchActive)}
          />
          <input
            className="nav-container__search__input"
            type="text"
            placeholder="Tìm kiếm"
          />
        </div>
        <nav className="Navbar">
          {role === "user" || role === null ? (
            <>
              <div className="Navbar__Menu">
                <NavLink to="/" active="active" className="btn">
                  Trang chủ
                </NavLink>

                <NavLink to="/products" className="btn">
                  Danh sách món
                </NavLink>
                <NavLink to="/blog" className="btn">
                  Blog
                </NavLink>
              </div>
              <div className="Navbar__Bell-cart-like-account">
                <NavLink to="/" className="btn">
                  {role === "user" ? (
                    <>
                      {" "}
                      <Badge count={1}>
                        <FontAwesomeIcon
                          style={{ fontSize: "20px" }}
                          icon={faBell}
                        />
                      </Badge>
                    </>
                  ) : (
                    <>
                      {" "}
                      {/* <div className="count">{totalMount}</div> */}
                      <Badge count={totalMount} showZero>
                        <FontAwesomeIcon
                          style={{ fontSize: "20px" }}
                          icon={faBell}
                        />
                      </Badge>
                    </>
                  )}
                  {/* <Badge count={0}>
                    <FontAwesomeIcon
                      style={{ fontSize: "20px" }}
                      icon={faBell}
                    />
                  </Badge> */}
                </NavLink>
                <NavLink to="/myCart" className="btn btncart">
                  {/* <FontAwesomeIcon icon={faCartArrowDown} /> */}
                  {role === "user" ? (
                    <>
                      {" "}
                      {/* <div className="count">{totalMount}</div> */}
                      <Badge count={totalMount}>
                        {/* <ShoppingCartOutlined /> */}
                        <FontAwesomeIcon
                          style={{ fontSize: "20px" }}
                          icon={faCartArrowDown}
                        />
                      </Badge>
                    </>
                  ) : (
                    <>
                      {" "}
                      {/* <div className="count">{totalMount}</div> */}
                      <Badge count={totalMount} showZero>
                        {/* <ShoppingCartOutlined /> */}
                        <FontAwesomeIcon
                          style={{ fontSize: "20px" }}
                          icon={faCartArrowDown}
                        />
                      </Badge>
                    </>
                  )}
                </NavLink>
                <NavLink to="/like" className="btn">
                  <FontAwesomeIcon icon={faHeart} />
                </NavLink>
                {user ? (
                  <>
                    <div>
                      <Dropdown
                        // overlayClassName="header-account"
                        trigger={["click"]}
                        placement="bottomRight"
                        menu={{ items }}
                        className="Dropdown"
                        overlayClassName="DropdowAccount"
                      >
                        <UserOutlined
                          className="LogoAccount"
                          style={{ fontSize: "30px" }}
                        />
                      </Dropdown>
                      <h5 className="text">Tài khoản</h5>
                    </div>
                    {/* <Dropdown.Button
                className="btn"
                // menu={user.username}
                placement="bottom"
                icon={<UserOutlined />}
              >
                {user.username}
              </Dropdown.Button> */}
                    {/* <NavLink className="btn">{user.username}</NavLink>
                    <NavLink
                      to="/Login"
                      className="btn"
                      onClick={handleClickLogout}
                    >
                      Đăng Xuất
                    </NavLink> */}
                  </>
                ) : (
                  <>
                    <NavLink to="/Register" className="btn">
                      Đăng ký
                    </NavLink>
                    <NavLink to="/Login" className="btn">
                      Đăng nhập
                    </NavLink>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="cenNavbar">
                {
                  <>
                    <NavLink to="/admin" className="btn">
                      {user.username}
                    </NavLink>
                    {/* <NavLink
                      to="/Login"
                      className="btn"
                      onClick={handleClickLogout}
                    >
                      Đăng Xuất
                    </NavLink> */}
                  </>
                }
              </div>
            </>
          )}
        </nav>
      </div>
    </>
  );
};
// {
//   user ? (
//     <>
//       {/* <>
//                 <Dropdown
//                   // overlayClassName="header-account"
//                   trigger={["click"]}
//                   placement="bottomRight"
//                   menu={{ items }}
//                   overlayClassName="DropdowAccount"
//                 >
//                   <UserOutlined className="LogoAccount" style={{ fontSize: "30px" }} />
//                 </Dropdown>
//                 <p className="text">Tài khoản</p>
//               </> */}
//       {/* <Dropdown.Button
//                 className="btn"
//                 // menu={user.username}
//                 placement="bottom"
//                 icon={<UserOutlined />}
//               >
//                 {user.username}
//               </Dropdown.Button> */}
//       {/* <NavLink className="btn">{user.username}</NavLink>
//               <NavLink to="/Login" className="btn" onClick={handleClickLogout}>
//                 Đăng Xuất
//               </NavLink> */}
//     </>
//   ) : (
//     <>
//       {/* <NavLink to="/Register" className="btn">
//                 Đăng ký
//               </NavLink>
//               <NavLink to="/Login" className="btn">
//                 Đăng nhập
//               </NavLink> */}
//     </>
//   );
// }
export default Navbars;
