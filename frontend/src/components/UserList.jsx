// src/components/UserList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserList() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  // Lấy thông tin user hiện tại từ token
  const currentUser = token
    ? JSON.parse(atob(token.split(".")[1])) // decode payload JWT
    : null;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Không lấy được danh sách user");
      }
    };

    if (token) fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Xóa thành công!");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Xóa thất bại");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h2>Danh sách người dùng</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <th>Tên</th>
            <th>Email</th>
            <th>Role</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            // Ẩn nút Xóa nếu không phải admin và không phải chính họ
            const canDelete =
              currentUser?.role === "admin" || currentUser?.id === u._id;

            return (
              <tr key={u._id} style={{ borderBottom: "1px solid #eee" }}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  {canDelete && (
                    <button
                      onClick={() => handleDelete(u._id)}
                      style={{
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Xóa
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
          {users.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
                Không có người dùng nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;