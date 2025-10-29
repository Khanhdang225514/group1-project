import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.warning("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    try {
      await registerUser(form);
      toast.success("🎉 Đăng ký thành công!");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      toast.error("❌ Email đã tồn tại hoặc dữ liệu không hợp lệ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <ToastContainer position="top-center" />
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px 50px",
          borderRadius: "15px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "30px", color: "#333" }}>Đăng ký tài khoản</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Tên người dùng"
            value={form.name}
            onChange={handleChange}
            style={{
              width: "100%",
              marginBottom: "15px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6fa3ef")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{
              width: "100%",
              marginBottom: "15px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6fa3ef")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            style={{
              width: "100%",
              marginBottom: "25px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6fa3ef")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: loading ? "#aaa" : "#6fa3ef",
              color: "#fff",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.backgroundColor = "#558de8";
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.backgroundColor = "#6fa3ef";
            }}
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>
      </div>
    </div>
  );
}
