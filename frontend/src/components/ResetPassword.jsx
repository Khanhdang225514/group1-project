// src/components/ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const { token } = useParams(); // Lấy token từ URL
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return toast.error("Nhập mật khẩu mới");
    setLoading(true);

    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        newPassword: password, // backend đang nhận newPassword
      });

      toast.success("Đổi mật khẩu thành công!");
      setPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Đặt mật khẩu mới</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu mới"
          style={{
            width: "100%",
            padding: "10px 12px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {loading ? "Đang đổi..." : "Đổi mật khẩu"}
        </button>
      </form>
    </div>
  );
}
