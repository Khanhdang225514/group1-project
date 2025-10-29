import React, { useState } from "react";
import { loginUser } from "../api/auth"; // Đảm bảo đường dẫn này đúng
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      toast.success("Đăng nhập thành công!");
      navigate("/"); // Điều hướng sau khi đăng nhập
    } catch (err) {
      toast.error("Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px 50px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            color: "#333",
            fontSize: "26px",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          Đăng nhập
        </h2>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#555",
                fontWeight: "500",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "15px",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff914d")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                color: "#555",
                fontWeight: "500",
              }}
            >
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "15px",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff914d")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(135deg, #ff914d, #ff5e62)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 10px rgba(255,94,98,0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Đăng nhập
          </button>
        </form>

        <p
          style={{
            marginTop: "20px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Quên mật khẩu?{" "}
          <a
            href="/forgot-password"
            style={{
              color: "#ff5e62",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Khôi phục
          </a>
        </p>
      </div>
    </div>
  );
}
