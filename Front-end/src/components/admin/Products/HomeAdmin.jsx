import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import "../HomeAdmin.scss";
// import logo from "../../../assets/Group 11/image 20.png";
import { useState, useEffect } from "react";
import { dataProductsAdmin } from "../../../redux/api/apiProductAdmin";
// import NavbarAdmin from "./NavbarAdmin";
import { createAxios } from "../../../common/createInstane";
import { loginSuccess } from "../../../redux/authSlice";
import { useAccessToken, useDataCurrentUser } from "../../../common/dataReux";
const HomeAdmin = (props) => {
  const [dataUpdate, setdataUpdate] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataCurrent = useDataCurrentUser();
  let axiosJWT = createAxios(dataCurrent, dispatch, loginSuccess);

  const token = useAccessToken();
  useEffect(() => {
    dataProductsAdmin(dispatch, token, axiosJWT);
  }, [dispatch, token]);
  return (
    <>
      <div className="HomePage-admin">
        <div className="Container-admin">
          <p>Home Admin Container</p>
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
