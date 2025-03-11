import { createSlice } from "@reduxjs/toolkit";

const loactionSlice = createSlice({
  name: "loaction",
  initialState: {
    provinces: {
      dataProvinces: null,
      isFetching: false,
      error: false,
    },
    districts: {
      dataDistricts: null,
      isFetching: false,
      error: false,
    },
    wards: {
      dataWards: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    provincesStart: (state) => {
      state.provinces.isFetching = true;
    },
    provincesSuccess: (state, action) => {
      (state.provinces.isFetching = false),
        (state.provinces.dataProvinces = action.payload),
        (state.provinces.error = false);
    },
    provincesFailed: (state) => {
      state.provinces.isFetching = false;
      state.provinces.error = true;
    },
    districtsStart: (state) => {
      state.districts.isFetching = true;
    },
    districtsSuccess: (state, action) => {
      (state.districts.isFetching = false),
        (state.districts.dataDistricts = action.payload),
        (state.districts.error = false);
    },
    districtsFailed: (state) => {
      state.districts.isFetching = false;
      state.districts.error = true;
    },
    wardsStart: (state) => {
      state.wards.isFetching = true;
    },
    wardsSuccess: (state, action) => {
      (state.wards.isFetching = false),
        (state.wards.dataWards = action.payload),
        (state.wards.error = false);
    },
    wardsFailed: (state) => {
      state.wards.isFetching = false;
      state.wards.error = true;
    },
  },
});
export const {
  provincesStart,
  provincesSuccess,
  provincesFailed,
  districtsStart,
  districtsSuccess,
  districtsFailed,
  wardsStart,
  wardsSuccess,
  wardsFailed,
} = loactionSlice.actions;
export default loactionSlice.reducer;
