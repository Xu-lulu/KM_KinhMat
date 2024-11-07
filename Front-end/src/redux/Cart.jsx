import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Carts",
  initialState: {
    dataCart: {
      isFetching: false,
      dataCarts: [],
      error: false,
    },
    upmountCart: {
      isFetching: false,
      datanewCart: [],
      error: false,
    },

  },
  reducers: {
    CartStart: (state) => {
      state.dataCart.isFetching = true;
    },
    CartSuccess: (state, action) => {
      (state.dataCart.isFetching = false),
        (state.dataCart.dataCarts = action.payload),
        (state.dataCart.error = false);
    },
    CartFailed: (state) => {
      state.dataCart.isFetching = false;
      state.dataCart.error = true;
    },
    upmountCartStart: (state) => {
      state.upmountCart.isFetching = true;
    },
    upmountCartSuccess: (state, action) => {
      (state.upmountCart.isFetching = false),
        (state.upmountCart.datanewCart = action.payload),
        (state.upmountCart.error = false);
    },
    upmountCartFailed: (state) => {
      state.upmountCart.isFetching = false;
      state.upmountCart.error = true;
    },
    // IncreaseMount: (state, action) => {
    //   const index = state.dataCart.dataCart.findIndex(
    //     (item) => item._id === action.payload
    //   );
    //   if (index !== -1) {
    //     state.dataCart.dataCart[index].mount++;
    //   }
    // },
  },
});
export const {
  CartStart,
  CartSuccess,
  CartFailed,
  upmountCartStart,
  upmountCartSuccess,
  upmountCartFailed,
  IncreaseMount,
} = CartSlice.actions;
export default CartSlice.reducer;
