const expressAsyncHandler = require("express-async-handler");
const products = require("../Models/Products");
const axios = require("axios");
const getProvinces = expressAsyncHandler(async (req, res, next) => {
  const response = await axios.get("https://provinces.open-api.vn/api/");
  res.status(200).json(response.data);
});
const getDistricts = expressAsyncHandler(async (req, res, next) => {
  const provinceCode = req.params.id;
  const response = await axios.get(
    `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
  );
  res.status(200).json(response.data);
});
const getWards = expressAsyncHandler(async (req, res, next) => {
  const districtCode = req.params.id;
  const response = await axios.get(
    `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
  );
  res.status(200).json(response.data);
});
module.exports = {
  getProvinces,
  getDistricts,
  getWards
};
