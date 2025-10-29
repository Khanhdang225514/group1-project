import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UploadAvatar from "./UploadAvatar";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "", avatar: "" });
  const [loading, setLoading] = useState(true);


  const token = localStorage.getItem("token");

  // 🔹 Lấy thông tin user khi vào trang
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });


        if (res.data) {
          setUser({
            name: res.data.name || "",
            email: res.data.email || "",
            avatar: res.data.avatar || "",
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải thông tin người dùng!");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProfile();
    else {
      toast.error("Bạn chưa đăng nhập!");
      setLoading(false);
    }
  }, [token]);

  // 🔹 Cập nhật thông tin (tên)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/profile",
        { name: user.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Cập nhật thành công!");
      if (res.data.user) {
        setUser({
          name: res.data.user.name || "",
          email: res.data.user.email || "",
          avatar: res.data.user.avatar || "",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại!");
    }
  };


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

      {/* Hiển thị avatar + UploadAvatar */}
      <div style={{ marginBottom: "20px" }}>
        <img
          src={user.avatar || "https://via.placeholder.com/150?text=No+Avatar"}
          alt="Avatar"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "10px",
          }}
        />
       
      </div>

      {/* Form cập nhật tên */}
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
