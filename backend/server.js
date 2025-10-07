const express = require('express');
const app = express();

// Middleware cho phép đọc dữ liệu JSON
app.use(express.json());

// Đọc PORT từ biến môi trường (nếu có) hoặc mặc định là 3000
const PORT = process.env.PORT || 3000;

// Chạy server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
