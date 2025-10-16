import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm này có thể được gọi từ App.js nếu cần
  const fetchUsers = async () => {
    try {
        const res = await axios.get("http://localhost:3000/users"); 
        setUsers(res.data);
        setLoading(false);
    } catch (err) {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể lấy dữ liệu từ server!");
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2>Danh sách người dùng</h2>
      {users.length === 0 ? (
        <p>Không có người dùng nào.</p>
      ) : (
        <ul style={styles.list}>
          {users.map((user) => (
            <li key={user._id} style={styles.item}> {/* 👈 SỬA LỖI KEY PROP: Dùng _id */}
              <b>{user.name}</b> — {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
    container: { /* ... style ... */ },
    list: { /* ... style ... */ },
    item: { /* ... style ... */ },
};

export default UserList;