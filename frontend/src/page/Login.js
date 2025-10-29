import React, { useState } from "react";
import { loginUser } from "../api/auth"; // Đảm bảo đường dẫn này đúng
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // 1. Import hook điều hướng

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 2. Khởi tạo hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Hàm loginUser sẽ gọi API VÀ lưu token vào localStorage
      await loginUser({ email, password });
      
      // Nếu thành công, hiển thị thông báo
      toast.success("Đăng nhập thành công!");
      
      // 3. Tự động chuyển người dùng về trang chủ
      navigate("/"); // Bạn có thể thay "/" bằng "/admin" hoặc trang bạn muốn

    } catch (err) {
      // Nếu API trả về lỗi (401, 500...), nó sẽ nhảy vào đây
      toast.error("Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
  }