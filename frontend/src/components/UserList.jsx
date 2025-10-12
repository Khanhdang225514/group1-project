import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể lấy dữ liệu từ server!");
        setLoading(false);
      });
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
            <li key={user.id} style={styles.item}>
              <b>{user.name}</b> — {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    width: "400px",
    margin: "20px auto",
    backgroundColor: "#f9f9f9",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    padding: "8px 0",
    borderBottom: "1px solid #ddd",
  },
};

export default UserList;
