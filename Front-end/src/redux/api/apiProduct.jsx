import axios from "axios";

import { Toaster, toast } from "sonner";
import {
  categoryFailed,
  categoryStart,
  categorySuccess,
  findcategoryFailed,
  findcategoryStart,
  findcategorySuccess,
  productsFailed,
  productsStart,
  productsSuccess,
} from "../productSlice";
export const dataProducts = async (dispatch) => {
  dispatch(productsStart());
  try {
    const res = await axios.get(
      "https://km-kinhmat.onrender.com/products/allproducts"
    );
    dispatch(productsSuccess(res.data));
  } catch (error) {
    dispatch(productsFailed());
  }
};
export const dataCategorys = async (dispatch) => {
  dispatch(categoryStart());
  try {
    const res = await axios.get(
      "https://km-kinhmat.onrender.com/category/allCategory"
    );
    dispatch(categorySuccess(res.data));
  } catch (error) {
    dispatch(categoryFailed());
  }
};
export const findCategorys = async (dispatch, id) => {
  dispatch(findcategoryStart());
  try {
    const res = await axios.post(
      "https://km-kinhmat.onrender.com/products/category/" + `${id}`
    );
    dispatch(findcategorySuccess(res.data));
  } catch (error) {
    dispatch(findcategoryFailed());
  }
};
