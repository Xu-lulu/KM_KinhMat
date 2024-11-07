const express = require("express");
const morgan = require("morgan");
const env = require("dotenv").config();
const db = require("./config/db");
const router = require("./routers");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  cors({
    origin: process.env.APPLICATION_URL,
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json({ timeout: 300000 }));
app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});
router(app);
db.connect();
const server = http.createServer(app);
const io = socketIo(server);
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
server.setTimeout(120000);
