import { createSlice } from "@reduxjs/toolkit";

const productsAdminSlice = createSlice({
  name: "productAdmin",
  initialState: {
    allproductAdmin: {
      dataProductsAdmin: null,
      isFetching: false,
      error: false,
    },
    updateProductAdmin: {
      dataUpdateProduct: null,
      isFetching: false,
      error: false,
    },
    categorysAdmin: {
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
    productsAdminStart: (state) => {
      state.allproductAdmin.isFetching = true;
    },
    productsAdminSuccess: (state, action) => {
      (state.allproductAdmin.isFetching = false),
        (state.allproductAdmin.dataProductsAdmin = action.payload),
        (state.allproductAdmin.error = false);
    },
    productsAdminFailed: (state) => {
      state.allproductAdmin.isFetching = false;
      state.allproductAdmin.error = true;
    },
    updateProductAdminStart: (state) => {
      state.updateProductAdmin.isFetching = true;
    },
    updateProductAdminSuccess: (state, action) => {
      (state.updateProductAdmin.isFetching = false),
        (state.updateProductAdmin.dataUpdateProduct = action.payload),
        (state.updateProductAdmin.error = false);
    },
    updateProductAdminFailed: (state) => {
      state.updateProductAdmin.isFetching = false;
      state.updateProductAdmin.error = true;
    },
    categoryAdminStart: (state) => {
      state.categorysAdmin.isFetching = true;
    },
    categoryAdminSuccess: (state, action) => {
      (state.categorysAdmin.isFetching = false),
        (state.categorysAdmin.dataCategorys = action.payload),
        (state.categorysAdmin.error = false);
    },
    categoryAdminFailed: (state) => {
      state.categorysAdmin.isFetching = false;
      state.categorysAdmin.error = true;
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
  productsAdminStart,
  productsAdminSuccess,
  productsAdminFailed,
  updateProductAdminStart,
  updateProductAdminSuccess,
  updateProductAdminFailed,
  categoryAdminStart,
  categoryAdminSuccess,
  categoryAdminFailed,
  findcategoryStart,
  findcategorySuccess,
  findcategoryFailed,
} = productsAdminSlice.actions;
export default productsAdminSlice.reducer;
