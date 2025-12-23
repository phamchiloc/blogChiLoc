# 🔑 Hướng dẫn lấy Gemini API Key

## Bước 1: Truy cập Google AI Studio
Vào: https://aistudio.google.com/apikey

## Bước 2: Đăng nhập Google
- Đăng nhập bằng tài khoản Google của bạn

## Bước 3: Tạo API Key
- Click nút **"Get API Key"** hoặc **"Create API Key"**
- Chọn project hoặc tạo project mới
- Copy API Key vừa tạo

## Bước 4: Thêm vào dự án
Mở file `.env.local` và thay thế:
```
VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
```

Bằng:
```
VITE_GEMINI_API_KEY=AIzaSy... (API key của bạn)
```

## Bước 5: Khởi động lại server
```bash
# Dừng server hiện tại (Ctrl+C)
# Chạy lại
npm run dev
```

## ⚠️ Lưu ý:
- Không chia sẻ API key với người khác
- Không commit file `.env.local` lên GitHub
- API key miễn phí có giới hạn số request/ngày

## 🎉 Sau khi cấu hình xong:
Vào trang **Trợ lý AI** và test thử!
