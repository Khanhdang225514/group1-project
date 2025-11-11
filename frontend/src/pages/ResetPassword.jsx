// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { resettoken } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('🔄 Đang xử lý...');

    try {
      const { data } = await api.put(`/users/reset-password/${resettoken}`, { password });
      setMessage(`✅ ${data.message}`);

      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Có lỗi xảy ra.'}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Đặt Lại Mật Khẩu</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            💾 Lưu Mật Khẩu
          </button>
        </form>

        {message && (
          <p
            style={{
              ...styles.message,
              color: message.includes('✅') ? 'green' : 'red',
            }}
          >
            {message}
          </p>
        )}

        {message.includes('thành công') && (
          <Link to="/login" style={styles.link}>
            👉 Đi đến trang Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '70vh',
    fontFamily: 'Segoe UI, sans-serif',
    padding: '0 10px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: '16px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    marginBottom: '25px',
    color: '#0d47a1',
    fontSize: '24px',
    fontWeight: '700',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '15px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  button: {
    backgroundColor: '#0d47a1',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  message: {
    marginTop: '16px',
    fontSize: '14px',
    fontWeight: '500',
  },
  link: {
    display: 'inline-block',
    marginTop: '12px',
    color: '#0d47a1',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
};

// Thêm hover/focus cho input & button
const globalStyle = document.createElement('style');
globalStyle.innerHTML = `
  input:focus { border-color: #0d47a1; box-shadow: 0 0 6px rgba(13,71,161,0.4); }
  button:hover { background-color: #1565c0; }
  a:hover { color: #1565c0; }
`;
document.head.appendChild(globalStyle);

export default ResetPassword;
