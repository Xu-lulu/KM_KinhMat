import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import "./NavAdmin.scss";
import logo from "../../assets/Group 11/image 20.png";
import LogoMatKing from "../../assets/animation/Matkinh.json";
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
          <NavLink className="btn">{user.username}</NavLink>
          <NavLink to="/Login" className="btn" onClick={handleClickLogout}>
            Đăng Xuất
          </NavLink>
        </div>
        <div className="Navbar-Admin__Menu">
          <div className="Navbar-Admin__Menu__Logo">
            <a className="logo">
              <div className="logo__animation">
                <Lottie animationData={LogoMatKing} loop={true} />
              </div>
              <p>Kính Mắt</p>
            </a>
            <div className="nav flex-column">
              <NavLink
                className="nav-link active btn"
                aria-current="page"
                // href="#"
                to="/admin"
              >
                Trang chủ
              </NavLink>
              <NavLink to="/productadmin" className="nav-link btn" href="#">
                Sản Phẩm
              </NavLink>
              <NavLink to="/categoryadmin" className="nav-link btn" href="#">
                Danh mục
              </NavLink>
              <NavLink className="nav-link btn" href="#">
                Khách hàng
              </NavLink>
              <NavLink className="nav-link btn" aria-disabled="true">
                Hóa đơn
              </NavLink>
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
