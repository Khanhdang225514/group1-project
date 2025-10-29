import axios from "axios";

// 👉 Sử dụng biến môi trường (tốt hơn hardcode)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// 👉 Cấu hình axios dùng chung
const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true, // cho phép gửi cookie (JWT)
});

// --- Đăng ký ---
export const registerUser = async (userData) => {
  try {
    const res = await api.post("/auth/signup", userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// --- Đăng nhập ---
export const loginUser = async (userData) => {
  try {
    const res = await api.post("/auth/login", userData);
    // Lưu token vào localStorage (nếu backend trả về)
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// --- Đăng xuất ---
export const logoutUser = async () => {
  try {
    // Nếu backend có route logout thì gọi:
    await api.post("/auth/logout");
  } catch (error) {
    console.warn("Logout request failed:", error);
  } finally {
    // Dù sao cũng xóa token phía client
    localStorage.removeItem("token");
  }
};

// --- Lấy thông tin người dùng (nếu cần) ---
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
