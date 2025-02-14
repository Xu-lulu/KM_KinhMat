import axios from "axios";

import { Toaster, toast } from "sonner";
import {
  provincesStart,
  provincesSuccess,
  provincesFailed,
  wardsStart,
  wardsSuccess,
  wardsFailed,
  districtsStart,
  districtsSuccess,
  districtsFailed,
} from "../loaction";
import { API_ROOT } from "../../../constants";

export const dataProvinces = async (dispatch) => {
  dispatch(provincesStart());
  try {
    const res = await axios.get(`${API_ROOT}/location/Provinces`);
    dispatch(provincesSuccess(res.data));
  } catch (error) {
    dispatch(provincesFailed());
  }
};
export const dataDistricts = async (dispatch, id) => {
  dispatch(districtsStart());
  try {
    const res = await axios.post(`${API_ROOT}/location/Districts/` + `${id}`);
    const districtsData = res.data.districts; 
    dispatch(districtsSuccess(districtsData));
  } catch (error) {
    dispatch(districtsFailed());
  }
};
export const dataWards = async (dispatch, id) => {
  dispatch(wardsStart());
  try {
    const res = await axios.post(`${API_ROOT}/location/Wards/` + `${id}`);
    const wardsData = res.data.wards; 
    
    dispatch(wardsSuccess(wardsData));
  } catch (error) {
    dispatch(wardsFailed());
  }
};
