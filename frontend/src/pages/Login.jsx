// src/pages/Login.jsx
import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await api.post('/users/login', { email, password });
      const loginData = response.data;

      // ✅ Lưu token & cập nhật Redux
      localStorage.setItem('accessToken', loginData.accessToken);
      dispatch(loginSuccess(loginData));
      setMessage('Đăng nhập thành công!');

      // ⏳ Điều hướng sau 1 giây
      setTimeout(() => navigate('/profile'), 1000);
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      setMessage(error.response?.data?.message || 'Email hoặc mật khẩu không đúng.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔓 Đăng Nhập</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>📧 Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Nhập email..."
              style={styles.input}
            />
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>🔑 Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Nhập mật khẩu..."
              style={styles.input}
            />
          </div>

          {/* Button */}
          <button type="submit" style={styles.button}>
            Đăng Nhập
          </button>
        </form>

        {/* Thông báo */}
        {message && (
          <p
            style={{
              ...styles.message,
              color: message.includes('thành công') ? 'green' : 'red',
            }}
          >
            {message}
          </p>
        )}

        {/* Link quên mật khẩu */}
        <div style={styles.linkContainer}>
          <Link to="/forgot-password" style={styles.link}>
            Quên mật khẩu?
          </Link>
        </div>
      </div>
    </div>
  );
};

/* 🎨 CSS Inline gọn đẹp */
const styles = {
  container: {
    width: '400px',
    minHeight: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  title: {
    marginBottom: '24px',
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  button: {
    backgroundColor: '#2575fc',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: '16px',
    fontSize: '14px',
  },
  linkContainer: {
    marginTop: '20px',
  },
  link: {
    color: '#2575fc',
    textDecoration: 'none',
    fontSize: '14px',
  },
};

// 🌈 Thêm hiệu ứng focus & hover
const globalStyle = document.createElement('style');
globalStyle.innerHTML = `
  * {
    box-sizing: border-box;
  }
  input:focus {
    border-color: #2575fc;
    box-shadow: 0 0 6px rgba(37,117,252,0.4);
  }
  button:hover {
    background-color: #1e5fe0;
  }
`;
document.head.appendChild(globalStyle);

export default Login;
