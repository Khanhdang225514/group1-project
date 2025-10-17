🚀 DỰ ÁN QUẢN LÝ NGƯỜI DÙNG: FULL-STACK MERN
Dự án này là một ứng dụng Full-Stack được xây dựng để thực hành quy trình phát triển và tích hợp các công nghệ chính trong hệ sinh thái JavaScript. Ứng dụng cho phép người dùng thực hiện các thao tác CRUD đầy đủ (Create, Read, Update, Delete) đối với dữ liệu người dùng.

🛠️ CÔNG NGHỆ SỬ DỤNG
Backend: Node.js, Express (Xây dựng RESTful API).

Database: MongoDB Atlas, Mongoose (Lưu trữ và quản lý dữ liệu người dùng).

Frontend: React (Xây dựng giao diện người dùng tương tác).

Công cụ: Git/GitHub, Postman/Insomnia (Quản lý phiên bản và kiểm thử API).

⚙️ HƯỚNG DẪN CHẠY DỰ ÁN (SETUP)
Để chạy dự án trên máy tính cục bộ, bạn cần Node.js và một tài khoản MongoDB Atlas.

1. Cấu hình Database
Tạo file .env ở thư mục gốc (/group1-project/.env).

Dán Chuỗi Kết nối MongoDB Atlas đã thay mật khẩu (URL Encoded) của bạn vào file này:

Plaintext

MONGO_URI="mongodb+srv://groupuser:Hieu%40152004@cluster0.abcde.mongodb.net/groupDB?retryWrites=true&w=majority&appName=Cluster0"
2. Cài đặt Phụ thuộc
Trong thư mục gốc của dự án (/group1-project), chạy các lệnh sau để cài đặt các gói phụ thuộc:

Bash

# Cài đặt gói phụ thuộc cho Backend
cd backend
npm install express nodemon dotenv mongoose cors
cd ..

# Cài đặt gói phụ thuộc cho Frontend
cd frontend
npm install axios 
npm install
cd ..
3. Khởi động Ứng dụng
Bạn cần mở hai cửa sổ terminal riêng biệt để chạy đồng thời Backend và Frontend:

Terminal 1 (Backend): Khởi động Server API (Phải chạy trước):

Bash

cd backend
node server.js 
Terminal 2 (Frontend): Khởi động ứng dụng React:

Bash

cd frontend
npm start
👤 ĐÓNG GÓP TỪNG THÀNH VIÊN (Kiêm nhiệm)
Vai trò Database (S3): Nguyễn TRọng Hiếu. Đóng góp chính: Thiết lập MongoDB Atlas, tạo User Model, thực hiện Squash Commit, chuẩn hóa Git cuối cùng.

Vai trò Backend (S1): Nguyễn Thành Danh. Đóng góp chính: Viết API CRUD đầy đủ (GET, POST, PUT, DELETE) bằng Mongoose, xử lý CORS, và cấu trúc thư mục backend.

Vai trò Frontend (S2): Phạm Huỳnh Khánh Đăng. Đóng góp chính: Xây dựng giao diện React, kết nối API với MongoDB, thêm nút Sửa/Xóa, và Validation form.