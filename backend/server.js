const express = require("express");
const cors = require("cors");
const app = express();

// Cho phép frontend gọi API backend
app.use(cors());

// Middleware đọc dữ liệu JSON
app.use(express.json());

// Import route user
const userRoutes = require("./routes/user");
app.use("/users", userRoutes);

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
