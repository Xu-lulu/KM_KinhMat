import axios from "axios";

import { Toaster, toast } from "sonner";
import {
  categoryAdminStart,
  categoryAdminSuccess,
  categoryAdminFailed,
} from "../productAdmin";
import { dataCategorys } from "./apiProduct";
const axiosJWT = axios.create();

export const createCategory = async (
  dispatch,
  navigate,
  token,
  data,
  axiosJWT
) => {
  dispatch(categoryAdminStart());
  try {
    const res = await axiosJWT.post(
      "https://km-kinhmat.onrender.com/category/updatacategory",
      data,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(categoryAdminSuccess());
    await dataCategorys(dispatch);

    toast.success("Thêm thành công");
    navigate("/categoryadmin");
  } catch (error) {
    dispatch(categoryAdminFailed());
    toast.error(error.response.data.mes);
  }
};
export const deleteCategory = async (
  dispatch,
  id,
  navigate,
  token,
  axiosJWT
) => {
  dispatch(categoryAdminStart());
  try {
    const res = await axiosJWT.delete(
      `https://km-kinhmat.onrender.com/category/deletecategory/${id}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(categoryAdminSuccess());
    await dataCategorys(dispatch);
    navigate("/categoryadmin");

    toast.success("Xóa thành công");
  } catch (error) {
    dispatch(categoryAdminFailed());
    toast.error(error.response.data.mes);
  }
};
export const editCategory = async (
  dispatch,
  id,
  token,
  data,
  navigate,
  axiosJWT
) => {
  dispatch(categoryAdminStart());
  try {
    const res = await axiosJWT.put(
      `https://km-kinhmat.onrender.com/category/editcategory/${id}`,
      data,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    dispatch(categoryAdminSuccess());
    await dataCategorys(dispatch);
    toast.success("Sửa thành công");
    navigate("/categoryadmin");
  } catch (error) {
    dispatch(categoryAdminFailed());
    toast.error(error.response.data.mes);
  }
};
