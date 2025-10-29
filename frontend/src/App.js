import React, { useState } from "react"; // 1. Thêm useState
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
// (Hãy chắc chắn bạn import đúng đường dẫn tới component của mình)
import Login from "./components/Login"; 
import Signup from "./components/Signup";
import UserList from "./components/UserList";
import "./App.css";

function App() {
  // 2. Dùng state để theo dõi token, App sẽ tự re-render khi token thay đổi
  const [token, setToken] = useState(localStorage.getItem("token"));

  // 3. Tạo hàm để Login.jsx gọi lên khi đăng nhập thành công
  const handleLoginSuccess = () => {
    setToken(localStorage.getItem("token")); // Lấy token mới nhất
  };

  // 4. Tạo hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); // Cập nhật state
    // Không cần dùng window.location.href, <Navigate> sẽ tự xử lý
  };

  return (
    <Router>
      <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", maxWidth: "900px", margin: "40px auto" }}>
        {/* --- Thanh menu điều hướng --- */}
        <nav style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "30px" }}>
          {!token ? (
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/signup">Đăng ký</Link>
            </>
          ) : (
            <>
              <Link to="/users">Quản lý người dùng</Link>
              <button
                onClick={handleLogout} // 5. Gọi hàm logout
                style={{
                  border: "none",
                  backgroundColor: "#dc3545",
                  color: "white",
                  borderRadius: "5px",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                Đăng xuất
              </button>
            </>
          )}
        </nav>

        {/* --- Cấu hình các route --- */}
        <Routes>
          {/* 6. Truyền hàm handleLoginSuccess xuống cho Login */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/users"
            element={token ? <UserList /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to={token ? "/users" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

  export default App;