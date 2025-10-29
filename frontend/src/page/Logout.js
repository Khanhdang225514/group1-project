import React from "react";
import { logoutUser } from "../api/auth";

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    logoutUser();
    onLogout();
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: 5,
        padding: "8px 12px",
        cursor: "pointer",
      }}
    >
      Đăng xuất
    </button>
  );
};

export default Logout;
