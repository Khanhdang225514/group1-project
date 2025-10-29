import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

// Import các component
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserList from "./components/UserList";
import "./App.css";

function App() {
  // --- Quản lý trạng thái đăng nhập ---
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Khi đăng nhập thành công
  const handleLoginSuccess = () => {
    setToken(localStorage.getItem("token")); // Cập nhật token
  };

  // Khi đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <div
        style={{
          fontFamily: "'Segoe UI', Arial, sans-serif",
          maxWidth: "900px",
          margin: "40px auto",
        }}
      >
        {/* --- Thanh điều hướng --- */}
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {!token ? (
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/signup">Đăng ký</Link>
            </>
          ) : (
            <>
              <Link to="/users">Quản lý người dùng</Link>
              <button
                onClick={handleLogout}
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

        {/* --- Cấu hình route --- */}
        <Routes>
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/users"
            element={token ? <UserList /> : <Navigate to="/login" />}
          />
          {/* Nếu không khớp route nào */}
          <Route
            path="*"
            element={<Navigate to={token ? "/users" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
