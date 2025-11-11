import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const AdminLogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await api.get('/users/logs');
        setLogs(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Không thể tải logs.');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const getActionClass = (action) => {
    if (/delete|fail/i.test(action)) return 'action-critical';
    return '';
  };

  if (loading) return <div className="log-status">Đang tải logs...</div>;
  if (error) return <div className="log-error">Lỗi: {error}</div>;

  return (
    <>
      <style>{`
        /* Container */
        .log-container {
          padding: 50px;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        /* Card background */
        .log-card {
          background-color: #ffffff;
          border-radius: 24px; /* Bo tròn hơn */
          padding: 30px;
          width: 100%;
          max-width: 1100px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        /* Title */
        .log-title {
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 25px;
          text-align: center;
        }

        /* Table wrapper */
        .log-table-wrapper {
          overflow-x: auto;
          border-radius: 16px;
        }

        /* Table */
        .log-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }

        .log-table thead {
          background: linear-gradient(90deg, #4f46e5, #3b82f6);
        }

        .log-table th {
          padding: 14px 20px;
          text-align: left;
          font-weight: 600;
          color: #ffffff;
          border-bottom: 2px solid #e5e7eb;
        }

        .log-table td {
          padding: 14px 20px;
          font-size: 14px;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }

        /* Hover and striped */
        .log-table tbody tr:nth-child(even) {
          background-color: #f9fafb;
        }

        .log-table tbody tr:hover {
          background-color: #e0e7ff;
          transition: background 0.3s;
        }

        /* Critical actions */
        .action-critical {
          color: #b91c1c;
          font-weight: 600;
        }

        /* Scrollbar styling */
        .log-table-wrapper::-webkit-scrollbar {
          height: 8px;
        }
        .log-table-wrapper::-webkit-scrollbar-thumb {
          background: #9ca3af;
          border-radius: 4px;
        }
        .log-table-wrapper::-webkit-scrollbar-track {
          background: #f3f4f6;
        }

        /* Status messages */
        .log-status,
        .log-error {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 250px;
          font-size: 18px;
        }
        .log-error {
          color: #dc2626;
        }
      `}</style>

      <div className="log-container">
        <div className="log-card">
          <h2 className="log-title">Nhật Ký Hoạt Động Người Dùng</h2>
          <div className="log-table-wrapper">
            <table className="log-table">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Hành động</th>
                  <th>Người dùng</th>
                  <th>IP</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id}>
                    <td>{new Date(log.createdAt).toLocaleString()}</td>
                    <td className={getActionClass(log.action)}>{log.action}</td>
                    <td>{log.user ? `${log.user.name} (${log.user.email})` : 'N/A'}</td>
                    <td>{log.ipAddress}</td>
                    <td>{log.details}</td>
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

export default AdminLogViewer;
