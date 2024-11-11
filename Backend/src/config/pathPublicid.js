const getPublicIdFromUrl = (url) => {
  // Decode URL để loại bỏ các ký tự mã hóa như %20
  const decodedUrl = decodeURIComponent(url);

  // Tách URL để lấy `public_id` và loại bỏ extension
  const parts = decodedUrl.split("/");

  // Giả sử public_id bắt đầu từ phần thứ 8 trong đường dẫn
  const publicIdWithExtension = parts.slice(8).join("/");

  // Xóa phần mở rộng của tệp (nếu có) khỏi `public_id`
  const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");

  return publicId;
};

module.exports = getPublicIdFromUrl;
