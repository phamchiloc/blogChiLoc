# 📚 Hướng dẫn Setup SQL Server cho Blog Project

## 🎯 Các bước thực hiện:

### 1️⃣ Tạo Database trong SQL Server

Mở **SQL Server Management Studio (SSMS)** và chạy file SQL:

```
server/init-database.sql
```

Script này sẽ:
- ✅ Tạo database `BlogDatabase`
- ✅ Tạo các bảng: `Authors`, `Posts`, `Projects`
- ✅ Insert dữ liệu mẫu

### 2️⃣ Cấu hình kết nối

File `.env` đã được cấu hình sẵn cho SQL Server Express của bạn:
```
DB_SERVER=MS\SQLEXPRESS
DB_DATABASE=BlogDatabase
DB_TRUSTED_CONNECTION=true
PORT=5000
```

### 3️⃣ Chạy Backend Server

Mở terminal mới và chạy:
```bash
cd server
npm run dev
```

Server sẽ chạy tại: `http://localhost:5000`

### 4️⃣ Kiểm tra API

Test API endpoint:
```bash
# Lấy tất cả bài viết
curl http://localhost:5000/api/posts

# Health check
curl http://localhost:5000/api/health
```

### 5️⃣ Chạy Frontend

Frontend đã tự động chạy tại `http://localhost:3000`

---

## 🔥 API Endpoints

### Posts
- `GET /api/posts` - Lấy tất cả bài viết
- `GET /api/posts/:id` - Lấy 1 bài viết
- `POST /api/posts` - Tạo bài viết mới
- `PUT /api/posts/:id` - Cập nhật bài viết
- `DELETE /api/posts/:id` - Xóa bài viết

### Projects
- `GET /api/projects` - Lấy tất cả projects

---

## 📝 Cấu trúc Database

### Bảng Authors
- `id` (INT, PRIMARY KEY, IDENTITY)
- `name` (NVARCHAR)
- `avatar` (NVARCHAR)

### Bảng Posts
- `id` (NVARCHAR, PRIMARY KEY)
- `title` (NVARCHAR)
- `excerpt` (NVARCHAR)
- `content` (NVARCHAR(MAX))  ← **Hỗ trợ nội dung dài**
- `date` (DATE)
- `category` (NVARCHAR)
- `image` (NVARCHAR)
- `author_id` (INT, FOREIGN KEY)

### Bảng Projects
- `id` (NVARCHAR, PRIMARY KEY)
- `title` (NVARCHAR)
- `description` (NVARCHAR)
- `tech` (NVARCHAR(MAX)) - JSON array
- `link` (NVARCHAR)
- `image` (NVARCHAR)

---

## ⚠️ Lưu ý

1. **SQL Server phải đang chạy** (SQL Server Configuration Manager)
2. **Windows Authentication** được sử dụng mặc định
3. Nội dung bài viết hỗ trợ **Markdown** và không giới hạn độ dài
4. Backend và Frontend phải chạy đồng thời

---

## 🛠️ Troubleshooting

### Lỗi kết nối SQL Server:
- Kiểm tra SQL Server đang chạy
- Xác nhận tên server: `MS\SQLEXPRESS`
- Kiểm tra Windows Authentication enabled

### Lỗi CORS:
- Backend đã cấu hình CORS cho phép mọi origin
- Nếu vẫn lỗi, kiểm tra port 5000 có bị chiếm dụng

### Database chưa tồn tại:
- Chạy lại file `init-database.sql` trong SSMS
