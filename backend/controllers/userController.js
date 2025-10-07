// controllers/userController.js

// Mảng tạm lưu người dùng
let users = [
  { id: 1, name: "Nguyễn Văn A", email: "a@example.com" },
  { id: 2, name: "Trần Thị B", email: "b@example.com" }
];

// GET /users - Lấy danh sách người dùng
const getUsers = (req, res) => {
  res.json(users);
};

// POST /users - Thêm người dùng mới
const addUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

module.exports = { getUsers, addUser };
