# 🔑 Hướng dẫn tạo Gemini API Key mới

## ⚠️ Tại sao cần tạo mới?
API key cũ của bạn đã bị **leaked** (rò rỉ) và Google đã tự động vô hiệu hóa nó để bảo mật.

---

## 📝 Các bước tạo API Key mới

### 1️⃣ Truy cập Google AI Studio
Mở trình duyệt và truy cập:
```
https://aistudio.google.com/app/apikey
```
hoặc
```
https://makersuite.google.com/app/apikey
```

### 2️⃣ Đăng nhập
- Đăng nhập bằng tài khoản Google của bạn
- Chấp nhận các điều khoản nếu được yêu cầu

### 3️⃣ Tạo API Key
- Click nút **"Create API Key"** hoặc **"Get API Key"**
- Chọn một trong hai option:
  - **Create API key in new project** (Khuyên dùng - tạo project riêng)
  - Hoặc chọn project Google Cloud có sẵn

### 4️⃣ Copy API Key
- API key sẽ hiển thị với format: `AIzaSy...` (dài khoảng 39 ký tự)
- Click biểu tượng 📋 để copy
- **LƯU Ý**: Chỉ hiển thị 1 lần, hãy lưu lại ngay!

---

## 🔧 Cập nhật vào Project

### Cách 1: Thay đổi trực tiếp trong file .env.local

1. Mở file `.env.local` trong thư mục gốc project
2. Thay thế API key cũ bằng key mới:

```env
VITE_GEMINI_API_KEY=API_KEY_MỚI_CỦA_BẠN
```

**Ví dụ:**
```env
VITE_GEMINI_API_KEY=AIzaSyDqL8Hn9K3Jm2Xw4Rt5Yp8Uv7Io6Qa3Mn1
```

3. Lưu file (Ctrl + S)

### Cách 2: Tạo file .env.local mới

Nếu chưa có file `.env.local`, tạo mới:

```bash
# Tạo file .env.local ở thư mục gốc project
echo VITE_GEMINI_API_KEY=YOUR_NEW_API_KEY > .env.local
```

---

## 🔄 Restart Server

Sau khi cập nhật API key, bạn cần restart lại dev server:

1. Dừng server hiện tại (Ctrl + C trong terminal)
2. Chạy lại:
```bash
npm run dev
```

---

## ✅ Kiểm tra API Key

Chạy script test để kiểm tra API key mới:

```bash
node check-api.js
```

Nếu thành công, bạn sẽ thấy danh sách các models có sẵn.

---

## 🔐 BẢO MẬT API KEY

### ⚠️ QUAN TRỌNG - Tránh bị leak lại:

1. **KHÔNG commit .env.local lên GitHub**
   - File này đã được thêm vào `.gitignore`
   - Kiểm tra: `git status` không nên thấy `.env.local`

2. **KHÔNG chia sẻ API key công khai**
   - Không paste lên Discord, Slack, forums
   - Không screenshot có chứa API key
   - Không hardcode vào source code

3. **KHÔNG push lên GitHub Pages/public repo**
   - API key chỉ dùng ở local hoặc server backend
   - Nếu cần deploy, dùng environment variables của hosting

4. **Kiểm tra .gitignore**
   Đảm bảo file `.gitignore` có:
   ```
   .env
   .env.local
   .env.*.local
   ```

5. **Giới hạn API key** (Khuyên dùng)
   - Vào [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Thêm **Application restrictions** (HTTP referrers)
   - Thêm **API restrictions** (chỉ cho Gemini API)

---

## 🎯 Quota & Giới hạn

**Free tier** của Gemini API:
- ✅ 60 requests/phút
- ✅ 1,500 requests/ngày
- ✅ Miễn phí hoàn toàn

Nếu vượt quota, cần nâng cấp lên paid plan.

---

## 🆘 Troubleshooting

### Lỗi: "API key not valid"
- Kiểm tra đã copy đúng toàn bộ key
- Không có khoảng trắng đầu/cuối
- Đã restart server sau khi thay đổi

### Lỗi: "403 Forbidden"
- API key đã bị khóa/leak
- Tạo key mới như hướng dẫn trên

### Lỗi: "404 Model not found"
- Đang dùng sai tên model
- Dùng `gemini-2.5-flash` hoặc `gemini-2.0-flash`

---

## 📚 Tài liệu tham khảo

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Pricing & Quota](https://ai.google.dev/pricing)

---

✨ **Chúc bạn thành công!**
