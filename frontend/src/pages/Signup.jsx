// src/pages/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!name || !email || !password) {
      setMessage('⚠️ Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (password.length < 6) {
      setMessage('⚠️ Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${API_BASE_URL}/api/users/signup`, {
        name,
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
      }

      setMessage('✅ Đăng ký thành công! Bạn sẽ được chuyển hướng...');
      setTimeout(() => navigate('/profile'), 2000);
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      if (error.response) {
        setMessage(`❌ ${error.response.data.message || 'Đã có lỗi xảy ra.'}`);
      } else if (error.request) {
        setMessage('⚠️ Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng.');
      } else {
        setMessage('❌ Đã có lỗi xảy ra trong quá trình gửi yêu cầu.');
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          width: '400px',
          padding: '40px',
          borderRadius: '16px',
          backgroundColor: '#fff',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#0d47a1', marginBottom: '25px' }}>📝 Đăng Ký </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ fontWeight: '600', color: '#333' }}>👤 Họ và tên</label>
            <input
              type="text"
              placeholder="Nhập họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                marginTop: '6px',
                fontSize: '15px',
                transition: '0.3s',
              }}
              onFocus={(e) => (e.target.style.border = '1px solid #0d47a1')}
              onBlur={(e) => (e.target.style.border = '1px solid #ccc')}
            />
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ fontWeight: '600', color: '#333' }}>📧 Email</label>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                marginTop: '6px',
                fontSize: '15px',
                transition: '0.3s',
              }}
              onFocus={(e) => (e.target.style.border = '1px solid #0d47a1')}
              onBlur={(e) => (e.target.style.border = '1px solid #ccc')}
            />
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ fontWeight: '600', color: '#333' }}>
              🔑 Mật khẩu (tối thiểu 6 ký tự)
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                marginTop: '6px',
                fontSize: '15px',
                transition: '0.3s',
              }}
              onFocus={(e) => (e.target.style.border = '1px solid #0d47a1')}
              onBlur={(e) => (e.target.style.border = '1px solid #ccc')}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0d47a1',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#1565c0')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#0d47a1')}
          >
            ✨ Đăng Ký Ngay
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: '15px',
              color: message.includes('✅') ? 'green' : 'red',
              fontWeight: '500',
              fontSize: '14px',
            }}
          >
            {message}
          </p>
        )}

        <div style={{ marginTop: '20px' }}>
          <span style={{ color: '#333' }}>Đã có tài khoản? </span>
          <a
            href="/login"
            style={{
              color: '#1565c0',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.color = '#0d47a1')}
            onMouseOut={(e) => (e.target.style.color = '#1565c0')}
          >
            🔐 Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
