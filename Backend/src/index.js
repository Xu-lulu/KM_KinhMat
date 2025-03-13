const express = require("express");
const morgan = require("morgan");
const env = require("dotenv").config(); // Load biến môi trường từ file .env
const db = require("./config/db");
const router = require("./routers");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const http = require("http");
const socketIo = require("socket.io");

// Cấu hình middleware
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  cors({
    origin:
      process.env.BUILD_MODE === "production"
        ? "https://km-kinh-mat.vercel.app" // CORS cho môi trường prod
        : "http://localhost", // Cấu hình CORS cho frontend URL (dev hoặc prod)
    methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức cho phép
    credentials: true, // Cho phép gửi cookies
  })
);
app.use(morgan("combined"));
app.use(express.json({ timeout: 300000 }));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// Kết nối database và các router
router(app);
db.connect();

// Cấu hình cổng và môi trường (dev hoặc prod)

if (process.env.BUILD_MODE === "production") {
  // Cấu hình cho môi trường sản xuất (production)
  const port = process.env.PORT || 200;
  console.log("prod");
  app.listen(port, () => {
    console.log(`App running in production at http://localhost:${port}`);
  });
} else {
  // Cấu hình cho môi trường phát triển (dev)
  console.log("dev");

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App running in development at http://localhost:${port}`);
  });
}

// Khởi tạo server (nếu cần)
// const server = http.createServer(app);
// const io = socketIo(server);
// io.on("connection", (socket) => {
//   console.log("New client connected");
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });
