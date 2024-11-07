const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const publicIdWithExtension = parts.slice(8).join("/");
  const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); 
  return publicId;
};
module.exports = getPublicIdFromUrl