// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('🔄 Đang xử lý...');
    try {
      const { data } = await api.post('/users/forgot-password', { email });
      setMessage(`✅ ${data.message}`);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.'}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📩 Quên Mật Khẩu</h2>
        <p style={styles.description}>Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            ✉️ Gửi Hướng Dẫn
          </button>
        </form>

        {message && (
          <p style={{ ...styles.message, color: message.includes('✅') ? 'green' : 'red' }}>
            {message}
          </p>
        )}

        <Link to="/login" style={styles.link}>🔙 Quay lại Đăng nhập</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: '10px',
    color: '#0d47a1',
    fontSize: '24px',
    fontWeight: '700',
  },
  description: {
    marginBottom: '20px',
    fontSize: '14px',
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

const globalStyle = document.createElement('style');
globalStyle.innerHTML = `
  input:focus { border-color: #0d47a1; box-shadow: 0 0 6px rgba(13,71,161,0.4); }
  button:hover { background-color: #1565c0; }
  a:hover { color: #1565c0; }
`;
document.head.appendChild(globalStyle);

export default ForgotPassword;
