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
    const res = await axios.get("http://localhost:3000/products/allproducts");
    dispatch(productsSuccess(res.data));
  } catch (error) {
    dispatch(productsFailed());
  }
};
export const dataCategorys = async (dispatch) => {
  dispatch(categoryStart());
  try {
    const res = await axios.get("http://localhost:3000/category/allCategory");
    dispatch(categorySuccess(res.data));
  } catch (error) {
    dispatch(categoryFailed());
  }
};
export const findCategorys = async (dispatch, id) => {
  dispatch(findcategoryStart());
  try {
    const res = await axios.post(
      "http://localhost:3000/products/category/" + `${id}`
    );
    dispatch(findcategorySuccess(res.data));
  } catch (error) {
    dispatch(findcategoryFailed());
  }
};
