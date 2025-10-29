// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Vui lòng nhập email!");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      toast.success("Email reset đã được gửi!");
      setEmail("");
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
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Quên mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email của bạn"
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
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {loading ? "Đang gửi..." : "Gửi token reset"}
        </button>
      </form>
    </div>
  );
}
