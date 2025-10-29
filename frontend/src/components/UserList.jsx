import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ fetchUsers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

    try {
      await axios.post("http://localhost:5000/api/users", { name, email });
      setName("");
      setEmail("");
      setError("");
      fetchUsers(); // cập nhật lại danh sách
    } catch (err) {
      console.error(err);
      setError("Có lỗi khi thêm user");
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
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddUser;
