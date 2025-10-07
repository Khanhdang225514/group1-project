const express = require("express");
const app = express();

// Middleware đọc dữ liệu JSON
app.use(express.json());

// Import route user
const userRoutes = require("./routes/user");
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
