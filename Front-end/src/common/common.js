export const formatMoney = (prices) => {
  const price = Number(prices);
  // return `${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  //   return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const formattedPrice = price.toFixed(2);
  // Loại bỏ phần thập phân nếu có
  const integerPart = formattedPrice.split(".")[0];
  // Thêm dấu phẩy phân tách hàng nghìn
  return integerPart.replace(/\d(?=(\d{3})+(?!\d))/g, "$&,");
};
