import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  // 🟢 Lấy danh sách user từ backend
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("❌ Lỗi khi tải dữ liệu:", err);
      toast.error("Không thể tải danh sách người dùng!");
    }
  };

  // 🟢 Thêm hoặc cập nhật user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUser) {
        // 👉 Nếu đang chỉnh sửa
        await fetch(`http://localhost:3000/users/${editingUser._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        });
        toast.success("✅ Cập nhật người dùng thành công!");
      } else {
        // 👉 Nếu đang thêm mới
        await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        });
        toast.success("✅ Thêm người dùng thành công");
      }

      // Reset form
      setName("");
      setEmail("");
      setEditingUser(null);

      // Cập nhật danh sách
      fetchUsers();
    } catch (err) {
      console.error("❌ Lỗi khi lưu:", err);
      toast.error("⚠️ Có lỗi xảy ra khi lưu dữ liệu!");
    }
  };

  // 🟢 Xóa user
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;

    try {
      await fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" });
      toast.info("🗑️ Xóa người dùng thành công!");
      fetchUsers();
    } catch (err) {
      console.error("❌ Lỗi khi xóa:", err);
      toast.error("⚠️ Không thể xóa người dùng!");
    }
  };

  // 🟢 Chọn user để sửa
  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (

    <div style={{ maxWidth: "800px", margin: "50px auto", fontFamily: "Arial" }}>
      {/* Thông báo Toast */}
      <ToastContainer position="top-center" autoClose={2000} />
      <h1 style={{ textAlign: "center", color: "#007bff" }}>Quản lý người dùng</h1>


      {/* Form thêm / sửa */}
      <form
        onSubmit={handleSubmit}
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
            width: "30%",
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
            width: "30%",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: editingUser ? "#28a745" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "8px 15px",
            cursor: "pointer",
          }}
        >
          {editingUser ? "💾 Cập nhật" : "➕ Thêm"}
        </button>
      </form>

      {/* Danh sách user */}
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
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ padding: "10px" }}>
                Không có người dùng nào
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u._id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{u.name}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{u.email}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  <button
                    onClick={() => handleEdit(u)}
                    style={{
                      marginRight: "10px",
                      backgroundColor: "#ffc107",
                      border: "none",
                      borderRadius: "4px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
