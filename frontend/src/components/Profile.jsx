import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  // 🔹 Lấy token từ localStorage (được lưu khi login)
  const token = localStorage.getItem("token");

  // ✅ Gọi API GET /profile khi vào trang
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Nếu server trả về object user
        if (res.data) {
          setUser({
            name: res.data.name || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            address: res.data.address || "",
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải thông tin người dùng!");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      toast.error("Bạn chưa đăng nhập!");
      setLoading(false);
    }
  }, [token]);

  // ✅ Hàm xử lý cập nhật thông tin
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:5000/api/profile", user, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Cập nhật thông tin thành công!");
      setUser(res.data.updated); // cập nhật lại UI sau khi PUT thành công
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại!");
    }
  };

  // ✅ Khi đang load
  if (loading) return <p style={{ textAlign: "center" }}>Đang tải...</p>;

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#fafafa",
        textAlign: "center",
      }}
    >
      <h2>Thông tin cá nhân</h2>
      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "10px" }}>
          <label>Tên người dùng</label>
          <br />
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            style={{ width: "90%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={user.email}
            disabled
            style={{
              width: "90%",
              padding: "8px",
              marginTop: "5px",
              backgroundColor: "#eee",
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Số điện thoại</label>
          <br />
          <input
            type="text"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            style={{ width: "90%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Địa chỉ</label>
          <br />
          <input
            type="text"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            style={{ width: "90%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}
