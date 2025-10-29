import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserList from "./components/UserList";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLoginSuccess = () => {
    setToken(localStorage.getItem("token"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          maxWidth: "1000px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        {/* --- Thanh menu điều hướng --- */}
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
            background: "linear-gradient(135deg, #ff914d, #ff5e62)",
            padding: "14px 0",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {!token ? (
            <>
              <Link
                to="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Đăng nhập
              </Link>
              <Link
                to="/signup"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Đăng ký
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/users"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Quản lý người dùng
              </Link>

              <Link
                to="/profile"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Hồ sơ cá nhân
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  border: "none",
                  backgroundColor: "#dc3545",
                  color: "white",
                  borderRadius: "5px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: "600",
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
          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/users" : "/login"} />}
          />
        </Routes>

        {/* ✅ Thêm ToastContainer để hiển thị thông báo */}
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </Router>
  );
}

export default App;
