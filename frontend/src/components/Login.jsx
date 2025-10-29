import React, { useState } from "react";
import { loginUser } from "../api/auth"; // Hàm này đã tự lưu token
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Dùng toast thay vì alert

// 1. Nhận prop { onLoginSuccess } từ App.js
function Login({ onLoginSuccess }) { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password }); // Gọi API (đã tự lưu token)
      
      toast.success("Đăng nhập thành công!");
      
      // 2. Báo cho App.js biết là đã đăng nhập xong
      onLoginSuccess(); 
      
      // 3. Điều hướng về trang chủ (App.js sẽ tự xử lý đưa đến /users)
      navigate("/"); 

    } catch (err) {
      toast.error("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ padding: 10, width: "100%" }}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

  export default Login;