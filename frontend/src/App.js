import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Lấy danh sách user từ backend
  const fetchUsers = async () => {
    // Đảm bảo URL là chính xác (Không có /api/ nếu Backend không có)
    const res = await fetch("http://localhost:3000/users"); 
    const data = await res.json();
    setUsers(data);
  };

  // Thêm user mới
  const addUser = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/users", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    setName("");
    setEmail("");
    fetchUsers(); // Gọi lại API để cập nhật danh sách
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center", color: "#007bff" }}>Quản lý người dùng</h1>

      <form
        onSubmit={addUser}
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Nhập tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "40%",
          }}
        />
        <input
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "40%",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "8px 15px",
            cursor: "pointer",
          }}
        >
          Thêm
        </button>
      </form>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Tên</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}> {/* 👈 SỬA LỖI KEY PROP: Dùng _id */}
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {u.name}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {u.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;