import axios from "axios";

import { Toaster, toast } from "sonner";
import {
  updateProductAdminFailed,
  updateProductAdminStart,
  updateProductAdminSuccess,
  productsAdminFailed,
  productsAdminStart,
  productsAdminSuccess,
} from "../productAdmin";
import { dataProducts } from "./apiProduct";

export const dataProductsAdmin = async (dispatch, token, axiosJWT) => {
  dispatch(productsAdminStart());
  try {
    const res = await axiosJWT.get(
      "https://km-kinhmat.onrender.com/products/productsadmin",
      {
        headers: {
        withCredentials: true,
        token: `Bearer ${token}`,
        },
      }
    );
    dispatch(productsAdminSuccess(res.data));
  } catch (error) {
    dispatch(productsAdminFailed());
    toast.error(error.response.data.mes);
  }
};
export const createProduct = async (
  dispatch,
  navigate,
  token,
  data,
  axiosJWT
) => {
  dispatch(productsAdminStart());
  try {
    const res = await axiosJWT.post(
      "https://km-kinhmat.onrender.com/products/createProducts",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${token}`,
          withCredentials: true,

        },
        timeout: 60000,
      }
    );

    dispatch(productsAdminSuccess());
    await dataProductsAdmin(dispatch, token, axiosJWT);
    toast.success("Thêm thành công");
    navigate("/productadmin");
  } catch (error) {
    console.log(error.response.data);
    dispatch(productsAdminFailed());
    toast.error(error.response.data.mes);
    // toast.error("Thêm không thành công!");
  }
};
export const deleteProduct = async (
  dispatch,
  id,
  navigate,
  token,
  axiosJWT
) => {
  dispatch(productsAdminStart());
  try {
    const res = await axiosJWT.delete(
      `https://km-kinhmat.onrender.com/products/delete/${id}`,
      {
        headers: {
          token: `Bearer ${token}`,
          withCredentials: true,

        },
      }
    );
    dispatch(productsAdminSuccess());
    await dataProductsAdmin(dispatch, token, axiosJWT);

    navigate("/productadmin");
    toast.success("Xóa thành công");
  } catch (error) {
    dispatch(productsAdminFailed());
    // toast.error("Xóa Không Thành Công");

    toast.error(error.response.data.mes);
  }
};
export const UpdateProduct = async (
  dispatch,
  id,
  token,
  data,
  navigate,
  axiosJWT
) => {
  dispatch(updateProductAdminStart());
  try {
    const res = await axiosJWT.put(
      `https://km-kinhmat.onrender.com/products/update/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${token}`,
          withCredentials: true,

        },
      }
    );
    dispatch(updateProductAdminSuccess());
    await dataProductsAdmin(dispatch, token, axiosJWT);
    toast.success("Sửa thành công");
    navigate("/productadmin");
  } catch (error) {
    dispatch(updateProductAdminFailed());
    // toast.error("Sửa không thành công");

    toast.error(error.response.data.mes);
  }
};
// export const dataCategorys = async (dispatch) => {
//   dispatch(categoryStart());
//   try {
//     const res = await axiosJWT.get("http://localhost:3000/allCategory");
//     dispatch(categorySuccess(res.data));
//   } catch (error) {
//     dispatch(categoryFailed());
//   }
// };
// export const findCategorys = async (dispatch, id) => {
//   dispatch(findcategoryStart());
//   try {
//     const res = await axiosJWT.post(
//       "http://localhost:3000/products/category/" + `${id}`
//     );
//     dispatch(findcategorySuccess(res.data));
//   } catch (error) {
//     dispatch(findcategoryFailed());
//   }
// };
