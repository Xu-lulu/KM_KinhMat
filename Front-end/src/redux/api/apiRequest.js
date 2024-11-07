import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "../authSlice";

import { Toaster, toast } from "sonner";
import { CartSuccess } from "../Cart";

export const loginUser = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3000/auth/Login", user, {});
    dispatch(loginSuccess(res.data));
    if (res.data.newUsers.role === "user") {
      navigate("/");
      const ress = await axios.get(`http://localhost:3000/auth/allCartOneUser`, {
        headers: {
          token: `Bearer ${res.data.accessToken}`,
        },
      });
      dispatch(CartSuccess(ress.data));
    } else {
      navigate("/admin");
    }
    toast.success("Đăng nhập thành công!");
  } catch (error) {
    dispatch(loginFailed());
    toast.error(error.response.data.mes);
  }
};
export const registerUser = async (dispatch, user, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(
      "http://localhost:3000/auth/Register",
      user,
      {}
    );
    dispatch(registerSuccess());
    navigate("/Login");
    toast.success("Đăng ký thành công hãy đăng nhập để sử dụng web!");
  } catch (error) {
    dispatch(registerFailed());
    toast.error(error.response.data.mes);
  }
};
export const logoutUser = async (dispatch, id, navigate, token, axiosJWT) => {
  dispatch(logoutStart());
  try {
    const res = await axiosJWT.post("http://localhost:3000/auth/Logout", id, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(loginSuccess());
    dispatch(CartSuccess([]));
    navigate("/Login");
    toast.success("Đăng xuất thành công!");
  } catch (error) {
    console.log(error);
    dispatch(logoutFailed());
    toast.error(error.response);
  }
};
