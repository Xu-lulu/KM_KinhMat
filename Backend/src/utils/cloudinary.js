const multer = require("multer");

// Cấu hình storage để lưu trữ file ảnh với đường dẫn mặc định
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Không cần cung cấp đường dẫn
    cb(null, ""); // Chỉ cần trả về một chuỗi rỗng
  },
  filename: function (req, file, cb) {
    // Tên file sẽ được lưu là tên gốc của file tải lên
    cb(null, file.originalname);
  },
});

// Khởi tạo middleware upload với cấu hình storage
const upload = multer({ storage });

module.exports = upload;
