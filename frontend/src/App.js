import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserList from "./components/UserList";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(null);

  // Khi token thay đổi, decode để lấy role
  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role); // "admin" hoặc "user"
      } catch {
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, [token]);

  const handleLoginSuccess = () => {
    const t = localStorage.getItem("token");
    setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
  };

  return (
    <Router>
      <div style={{ fontFamily: "'Poppins', sans-serif", maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
        {/* Menu điều hướng */}
        <nav style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "40px", padding: "14px 0", borderRadius: "10px", background: "linear-gradient(135deg, #ff914d, #ff5e62)", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          {!token ? (
            <>
              <Link to="/login" style={{ color: "white", fontWeight: 600, textDecoration: "none" }}>Đăng nhập</Link>
              <Link to="/signup" style={{ color: "white", fontWeight: 600, textDecoration: "none" }}>Đăng ký</Link>
            </>
          ) : (
            <>
              <Link to="/profile" style={{ color: "white", fontWeight: 600, textDecoration: "none" }}>Hồ sơ cá nhân</Link>
              {role === "admin" && (
                <Link to="/users" style={{ color: "white", fontWeight: 600, textDecoration: "none" }}>Quản lý người dùng</Link>
              )}
              <button onClick={handleLogout} style={{ border: "none", borderRadius: 5, padding: "6px 12px", backgroundColor: "#dc3545", color: "white", cursor: "pointer", fontWeight: 600 }}>Đăng xuất</button>
            </>
          )}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/users" element={token && role === "admin" ? <UserList /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={token ? "/profile" : "/login"} />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </Router>
  );
}

export default App;
