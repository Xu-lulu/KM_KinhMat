import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "product",
  initialState: {
    allproduct: {
      dataProducts: null,
      isFetching: false,
      error: false,
    },
    categorys: {
      dataCategorys: null,
      isFetching: false,
      error: false,
    },
    findcategorys: {
      finddataCategorys: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    productsStart: (state) => {
      state.allproduct.isFetching = true;
    },
    productsSuccess: (state, action) => {
      (state.allproduct.isFetching = false),
        (state.allproduct.dataProducts = action.payload),
        (state.allproduct.error = false);
    },
    productsFailed: (state) => {
      state.allproduct.isFetching = false;
      state.allproduct.error = true;
    },
    categoryStart: (state) => {
      state.categorys.isFetching = true;
    },
    categorySuccess: (state, action) => {
      (state.categorys.isFetching = false),
        (state.categorys.dataCategorys = action.payload),
        (state.categorys.error = false);
    },
    categoryFailed: (state) => {
      state.categorys.isFetching = false;
      state.categorys.error = true;
    },
    findcategoryStart: (state) => {
      state.findcategorys.isFetching = true;
    },
    findcategorySuccess: (state, action) => {
      (state.findcategorys.isFetching = false),
        (state.findcategorys.finddataCategorys = action.payload),
        (state.findcategorys.error = false);
    },
    findcategoryFailed: (state) => {
      state.findcategorys.isFetching = false;
      state.findcategorys.error = true;
    },
  },
});
export const {
  productsStart,
  productsSuccess,
  productsFailed,
  categoryStart,
  categorySuccess,
  categoryFailed,
  findcategoryStart,
  findcategorySuccess,
  findcategoryFailed,
} = productsSlice.actions;
export default productsSlice.reducer;
