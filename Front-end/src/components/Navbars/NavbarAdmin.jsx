import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import "./NavAdmin.scss";
import logo from "../../assets/Group 11/image 20.png";
import Bank from "../../assets/animation/Bank.json";
import Lottie from "lottie-react";

import { useState, useEffect } from "react";
import { purgeStoredData } from "../../redux/purge";
import {
  useAccessToken,
  useDataCurrentUser,
  useDataUser,
} from "../../common/dataReux";
import { logoutSuccess } from "../../redux/authSlice";
import { logoutUser } from "../../redux/api/apiRequest";
import { createAxios } from "../../common/createInstane";
import { HomeOutlined } from "@ant-design/icons";
//
export const NavbarAdmin = () => {
  const { id } = useParams();
  const [dataUpdate, setdataUpdate] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useAccessToken();
  const user = useDataUser();
  const dataCurrent = useDataCurrentUser();
  let axiosJWTlogout = createAxios(dataCurrent, dispatch, logoutSuccess);
  const handleClickLogout = () => {
    logoutUser(dispatch, id, navigate, token, axiosJWTlogout);
  };
  return (
    <>
      <div className="Navbar-Admin">
        <div className="Navbar-Admin__Account">
          <NavLink className="btn">
            <i className="fa-regular fa-user icon_Navlink"></i>
            {user.username}
          </NavLink>

          <NavLink to="/Login" className="btn" onClick={handleClickLogout}>
            Đăng Xuất
            <i className="fa-solid fa-arrow-right-from-bracket icon_Navlink_end" />
          </NavLink>
        </div>
        <div className="Navbar-Admin__Menu">
          <div className="Navbar-Admin__Menu__Logo">
            <a className="logo">
              {/* <img src={logo} alt="logo"></img> */}
              <div className="logo__animation">
                <Lottie animationData={Bank} loop={true} />
              </div>
              <p>Food Love</p>
            </a>
            <div>
              <div className="nav flex-column">
                <div>
                  <NavLink
                    className="nav-link active btn"
                    aria-current="page"
                    // href="#"
                    to="/admin"
                  >
                    <HomeOutlined className="icon_Navlink" />
                    Trang chủ
                  </NavLink>
                </div>
                <div className="">
                  <NavLink to="/productadmin" className="nav-link btn" href="#">
                    <i className="fa-solid fa-glasses icon_Navlink"></i>
                    Sản Phẩm
                  </NavLink>
                </div>

                <div className="">
                  <NavLink
                    to="/categoryadmin"
                    className="nav-link btn"
                    href="#"
                  >
                    <i className="fa-solid fa-list icon_Navlink"></i>
                    Danh mục
                  </NavLink>
                </div>

                <div className="">
                  <NavLink className="nav-link btn" href="#">
                    <i className="fa-solid fa-users icon_Navlink"></i>
                    Khách hàng
                  </NavLink>
                </div>

                <div className="icon_Navlink">
                  <NavLink className="nav-link btn" aria-disabled="true">
                    <i className="fa-solid fa-clipboard-list icon_Navlink"></i>
                    Hóa đơn
                  </NavLink>
                </div>
              </div>
              <div className="Logout">
                <NavLink
                  to="/Login"
                  className="btn"
                  onClick={handleClickLogout}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket icon_Navlink" />
                  Đăng Xuất
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// export const NavbarAdminLogout = () => {
//   const dispatch = useDispatch();
//   const handleClickLogout = () => {
//     dispatch(purgeStoredData());
//   };
//   const user = useSelector((state) => {
//     // const currentUsers = state.auth.login.currentUser.newUsers;
//     const currentUser = state.auth.login.currentUser;
//     if (currentUser && currentUser.newUsers) {
//       return currentUser.newUsers;
//     }
//     return null;
//   });
//   return (
//     <>
//       <div className="NavbarLogout">
//         <NavLink className="btn">{user.username}</NavLink>
//         <NavLink to="/Login" className="btn" onClick={handleClickLogout}>
//           Đăng Xuất
//         </NavLink>
//       </div>
//     </>
//   );
// };

export default NavbarAdmin;
