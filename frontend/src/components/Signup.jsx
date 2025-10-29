import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      toast.success("Đăng ký thành công!");
      setForm({ name: "", email: "", password: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <ToastContainer position="top-center" />
      <h2>Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
        <input
          type="text"
          name="name"
          placeholder="Tên"
          value={form.name}
          onChange={handleChange}
          required
          style={{ margin: 5, padding: 8 }}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ margin: 5, padding: 8 }}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
          style={{ margin: 5, padding: 8 }}
        />
        <br />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 5,
            padding: "8px 15px",
            cursor: "pointer",
          }}
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Signup;
