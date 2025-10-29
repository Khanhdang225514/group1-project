import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ fetchUsers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // 1. THÊM STATE CHO PASSWORD
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate dữ liệu
    if (!name.trim()) {
      setError("Name không được để trống");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email không hợp lệ");
      return;
    }
    // 2. THÊM VALIDATE CHO PASSWORD (Ví dụ: ít nhất 6 ký tự)
    if (password.length < 6) { 
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    try {
      // 3. THÊM PASSWORD VÀO DỮ LIỆU GỬI ĐI
      await axios.post("http://localhost:5000/api/users", { name, email, password }); 
      
      setName("");
      setEmail("");
      setPassword(""); // Reset password field
      setError("");
      fetchUsers(); // cập nhật lại danh sách
    } catch (err) {
      console.error(err);
      // Hiển thị lỗi cụ thể từ server nếu có
      setError(err.response?.data?.message || "Có lỗi khi thêm user"); 
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>Thêm User</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* 4. THÊM Ô INPUT CHO PASSWORD */}
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddUser;