import axios from "axios";

import { Toaster, toast } from "sonner";
import {
  categoryAdminStart,
  categoryAdminSuccess,
  categoryAdminFailed,
} from "../productAdmin";
import { dataCategorys } from "./apiProduct";
const axiosJWT = axios.create();
import { API_ROOT } from "../../../constants";

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
      `${API_ROOT}/category/updatacategory`,
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
      `${API_ROOT}/category/deletecategory/${id}`,
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
      `${API_ROOT}/category/editcategory/${id}`,
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
