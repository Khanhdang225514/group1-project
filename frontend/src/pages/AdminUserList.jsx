import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setCurrentUserRole(decoded.role);
    } catch (e) {
      console.error("Token không hợp lệ, đang đăng xuất...", e);
      localStorage.removeItem('accessToken');
      navigate('/login');
    }

    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users');
        setUsers(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Bạn không có quyền truy cập trang này.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDelete = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await api.delete(`/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        alert('Lỗi khi xóa người dùng: ' + (err.response?.data?.message || 'Lỗi không xác định'));
      }
    }
  };

  if (loading) return <div className="status-message">Đang tải danh sách người dùng...</div>;
  if (error) return <div className="status-message error">{error}</div>;

  return (
    <>
      <style>{`
        .user-container {
          padding: 40px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .user-card {
          width: 100%;
          max-width: 1000px;
          background: #fff;
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        h2 {
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 25px;
          text-align: center;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 700px;
        }

        thead {
          background: linear-gradient(90deg, #4f46e5, #3b82f6);
        }

        th, td {
          padding: 12px 16px;
          text-align: left;
        }

        th {
          color: #fff;
          font-weight: 600;
          border-bottom: 2px solid #e5e7eb;
        }

        td {
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
        }

        tbody tr:nth-child(even) {
          background-color: #f9fafb;
        }

        tbody tr:hover {
          background-color: #e0e7ff;
          transition: background 0.3s;
        }

        .delete-button {
          background-color: #ef4444;
          color: #fff;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s;
        }

        .delete-button:hover {
          background-color: #b91c1c;
        }

        .status-message {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 250px;
          font-size: 18px;
          color: #374151;
        }

        .status-message.error {
          color: #dc2626;
        }

        .table-wrapper {
          overflow-x: auto;
          border-radius: 16px;
        }
      `}</style>

      <div className="user-container">
        <div className="user-card">
          <h2>Quản Lý Người Dùng</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      {currentUserRole === 'admin' && (
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(user._id)}
                        >
                          Xóa
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserList;
