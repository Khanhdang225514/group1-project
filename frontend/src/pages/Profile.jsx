// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await api.get('/users/profile');
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        if (data.avatar?.url) {
          setAvatar(data.avatar.url);
          setAvatarPreview(data.avatar.url);
        }
      } catch (error) {
        console.error('Không thể lấy thông tin profile', error);
        navigate('/login');
      }
    };

    if (localStorage.getItem('accessToken')) fetchUserProfile();
    else navigate('/login');
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const updateData = { name, email };
      if (password) updateData.password = password;
      const { data } = await api.put('/users/profile', updateData);
      setUser(data);
      setMessage('✅ Cập nhật thông tin thành công!');
      setPassword('');
    } catch (error) {
      setMessage(error.response?.data?.message || '❌ Lỗi khi cập nhật thông tin');
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('avatar', file);

    setUploading(true);
    setMessage('🔄 Đang tải avatar lên...');

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await api.put('/users/profile/avatar', formData, config);
      if (data.success) {
        setAvatar(data.avatar.url);
        setMessage('✅ Cập nhật avatar thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi upload avatar:', error);
      setMessage(error.response?.data?.message || '❌ Lỗi khi upload avatar');
      setAvatarPreview(avatar);
    } finally {
      setUploading(false);
    }
  };

  if (!user) return <div>Đang tải thông tin cá nhân...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 Thông Tin Cá Nhân</h2>

        {/* Avatar */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src={avatarPreview || 'https://via.placeholder.com/150'}
            alt="Avatar"
            style={styles.avatar}
          />
          <br />
          <label htmlFor="avatar-upload" style={styles.avatarLabel}>
            {uploading ? 'Đang tải...' : '✏️ Đổi Avatar'}
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </div>

        <div style={styles.info}><strong>Tên:</strong> {user.name}</div>
        <div style={styles.info}><strong>Email:</strong> {user.email}</div>

        <hr style={{ margin: '20px 0' }} />

        {/* Form cập nhật */}
        <h3 style={{ marginBottom: '15px', color: '#0d47a1' }}>💾 Cập Nhật Thông Tin</h3>
        <form onSubmit={handleUpdate} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Tên</label>
            <input
              type="text"
              placeholder="Nhập tên của bạn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mật khẩu mới</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu mới (bỏ trống nếu không đổi)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button} disabled={uploading}>
            💾 Cập nhật thông tin
          </button>
        </form>

        {message && (
          <p style={{ ...styles.message, color: message.includes('✅') ? 'green' : 'red' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '1400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '80vh',
    fontFamily: 'Segoe UI, sans-serif',
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: '16px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0d47a1',
    marginBottom: '20px',
    textAlign: 'center',
  },
  avatar: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  avatarLabel: {
    display: 'inline-block',
    marginTop: '10px',
    color: '#0d47a1',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
  info: {
  marginBottom: '8px',
  fontSize: '15px',
  color: '#0d47a1', // màu label xanh đậm
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  label: {
    fontWeight: '600',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    padding: '12px 15px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '15px',
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
};

// Thêm style hover/focus global
const globalStyle = document.createElement('style');
globalStyle.innerHTML = `
  input:focus { border-color: #0d47a1; box-shadow: 0 0 6px rgba(13,71,161,0.4); }
  button:hover { background-color: #1565c0; }
  label:hover { color: #1565c0; }
`;
document.head.appendChild(globalStyle);

export default Profile;
