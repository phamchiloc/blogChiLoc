# 🚀 Hướng dẫn Deploy Website lên Internet

## 🎯 Phương án 1: Vercel (Khuyến nghị - Miễn phí & Dễ nhất)

### Bước 1: Tạo tài khoản Vercel
1. Truy cập: https://vercel.com
2. Click **"Sign Up"** → Đăng ký bằng **GitHub**
3. Authorize Vercel truy cập GitHub

### Bước 2: Push code lên GitHub
```bash
# Khởi tạo Git (nếu chưa có)
git init
git add .
git commit -m "Initial commit"

# Tạo repository mới trên GitHub.com
# Sau đó:
git remote add origin https://github.com/USERNAME/DALTM_1823.git
git branch -M main
git push -u origin main
```

### Bước 3: Deploy trên Vercel
1. Vào Vercel Dashboard
2. Click **"Add New Project"**
3. Import repository GitHub của bạn
4. Cấu hình:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Thêm Environment Variables:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: `AIzaSyAgPX-W1rGoXRPg9jyxryEvKGArB3NtHGk`
6. Click **"Deploy"**

### ✅ Sau 2-3 phút:
Website của bạn sẽ có domain dạng: `https://daltm-1823.vercel.app`

---

## 🎯 Phương án 2: Netlify

### Bước 1: Build project
```bash
npm run build
```

### Bước 2: Deploy
1. Truy cập: https://app.netlify.com/drop
2. Kéo thả folder `dist` vào trang web
3. Thêm Environment Variable:
   - `VITE_GEMINI_API_KEY` = API key của bạn

---

## 🎯 Phương án 3: GitHub Pages (Không hỗ trợ env variables)

### Cài package
```bash
npm install --save-dev gh-pages
```

### Thêm vào package.json
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://USERNAME.github.io/DALTM_1823"
}
```

### Deploy
```bash
npm run deploy
```

---

## ⚠️ Lưu ý về Backend SQL Server

Backend hiện tại chạy local và không thể deploy miễn phí. Các giải pháp:

1. **Tạm thời**: Dùng constants.ts (như hiện tại) - website vẫn hoạt động đầy đủ
2. **Nâng cao**: Chuyển sang Supabase/Firebase (database cloud miễn phí)
3. **Professional**: Deploy backend lên Railway.app ($5/tháng)

---

## 🎉 Khuyến nghị

**→ Dùng Vercel** vì:
- ✅ Miễn phí vĩnh viễn
- ✅ Tự động deploy khi push code
- ✅ SSL/HTTPS tự động
- ✅ CDN toàn cầu (nhanh)
- ✅ Hỗ trợ custom domain

Bạn muốn tôi giúp deploy lên Vercel ngay không?
