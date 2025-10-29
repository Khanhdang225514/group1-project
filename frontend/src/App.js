import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserList from "./components/UserList";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div
        style={{
          fontFamily: "'Segoe UI', Arial, sans-serif",
          maxWidth: "900px",
          margin: "40px auto",
        }}
      >
        {/* --- Thanh menu điều hướng --- */}
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
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
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
          <Route path="/login" element={<Login />} />
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
