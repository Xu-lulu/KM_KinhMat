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
const deleteImage = async (publicId) => {
  try {
    console.log(publicId);
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Image deleted successfully", result);
  } catch (error) {
    console.error("Error deleting image", error);
  }
};
module.exports = { uploadImage, updateImage, deleteImage };
