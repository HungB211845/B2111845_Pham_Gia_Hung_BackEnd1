// app.js
const express = require("express");
const cors = require("cors");

// Thêm dòng import ApiError:
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

// Route mặc định để kiểm tra
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

// Import router
const contactsRouter = require("./app/routes/contact.route.js");

// Đăng ký router với đường dẫn gốc
app.use("/api/contacts", contactsRouter);

// Middleware xử lý 404
app.use((req, res, next) => {
  // Đoạn code này chạy khi không có route nào khớp với yêu cầu
  return next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi tập trung (phải đặt cuối cùng)
app.use((error, req, res, next) => {
  // Nếu không có statusCode, mặc định sẽ là 500
  res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
