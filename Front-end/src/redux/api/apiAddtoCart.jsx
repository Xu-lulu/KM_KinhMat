import axios from "axios";

import { Toaster, toast } from "sonner";
import {
  categoryAdminStart,
  categoryAdminSuccess,
  categoryAdminFailed,
} from "../productAdmin";
import { dataCategorys } from "./apiProduct";
import {
  CartFailed,
  CartStart,
  CartSuccess,
  upmountCartFailed,
  upmountCartStart,
  upmountCartSuccess,
} from "../Cart";
export const dataCart = async (dispatch, token, axiosJWT) => {
  dispatch(CartStart());
  try {
    const res = await axiosJWT.get(
      `http://localhost:3000/auth/allCartOneUser`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(CartSuccess(res.data));
  } catch (error) {
    dispatch(CartFailed());
    toast.error(error.response.data.mes);
  }
};

export const addtoCart = async (dispatch, id, token, data,axiosJWT) => {
  dispatch(CartStart());
  try {
    const res = await axiosJWT.post(
      `http://localhost:3000/cart/addtoCart/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(CartSuccess());
    dataCart(dispatch, token,axiosJWT);
    toast.success("Thêm vào giỏ hàng thành công");
  } catch (error) {
    dispatch(CartFailed());
    toast.error(error);
  }
};
export const upmountCart = async (dispatch, id, token, data, axiosJWT) => {
  dispatch(upmountCartStart());
  try {
    const res = await axiosJWT.put(
      `http://localhost:3000/cart/upmountCart/${id}`,
      data,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(upmountCartSuccess());
    dataCart(dispatch, token, axiosJWT);
  } catch (error) {
    dispatch(upmountCartFailed());
    console.log(error);
  }
};
export const deleteOneCartItem = async (dispatch, id, token, axiosJWT) => {
  dispatch(upmountCartStart());
  try {
    const res = await axiosJWT.delete(
      `http://localhost:3000/cart/deleteOneItem/${id}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(upmountCartSuccess());
    dataCart(dispatch, token,axiosJWT);
    toast.success("xóa thành công");
  } catch (error) {
    dispatch(upmountCartFailed());
    toast.error(error);
  }
};
