const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const uploadImage = async (imagePath) => {
  const result = await cloudinary.uploader.upload(imagePath, {
    folder: "/Product",
    // public_id: `${imagePath.originalname.split(".")[0]}_${Date.now()}`,
    // unique_filename: false,
    timeout: 120000,
  });
  console.log("Image uploaded successfully");
  return result;
};
const updateImage = async (publicId, imagePath) => {
  try {
    await deleteImage(publicId);
    const result = await uploadImage(imagePath);
    return result;
  } catch (error) {
    console.error("Error updating image", error);
  }
};
const deleteImages = async (publicIds) => {
  try {
    console.log(publicIds);
    // Kiểm tra nếu publicIds là mảng và không rỗng
    if (Array.isArray(publicIds) && publicIds.length > 0) {
      // Xóa nhiều ảnh bằng cách truyền mảng publicId vào hàm delete_resources
      const result = await cloudinary.api.delete_resources(publicIds);
      console.log("Images deleted successfully", result);
    } else if (typeof publicIds === "string") {
      // Nếu chỉ có một publicId dưới dạng chuỗi, xóa ảnh đơn lẻ
      const result = await cloudinary.uploader.destroy(publicIds);
      console.log("Single image deleted successfully", result);
    } else {
      console.log("No images to delete.");
    }
  } catch (error) {
    console.error("Error deleting images", error);
  }
};

// const deleteImage = async (publicId) => {
//   try {
//     console.log(publicId);
//     const result = await cloudinary.uploader.destroy(publicId);
//     console.log("Image deleted successfully", result);
//   } catch (error) {
//     console.error("Error deleting image", error);
//   }
// };
module.exports = { uploadImage, updateImage, deleteImages };
