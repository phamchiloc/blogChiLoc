# 🚀 HƯỚNG DẪN DEPLOY ĐẦY ĐỦ LÊN GITHUB PAGES

## ✨ Các tính năng mới đã thêm:
- ✅ Trang Chứng chỉ (Certificates)
- ✅ Trợ lý AI với Gemini 2.5 Flash
- ✅ Streaming chat như ChatGPT
- ✅ Markdown rendering
- ✅ Chat history

---

## 🔐 QUAN TRỌNG: Bảo mật API Key

### Bước 1: Thêm API Key vào GitHub Secrets

1. Vào repository GitHub của bạn
2. Click **Settings** (ở góc phải)
3. Trong sidebar bên trái, click **Secrets and variables** > **Actions**
4. Click nút **New repository secret**
5. Thêm secret:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: `AIzaSyAdhZVQotmnktFQ5zfFD2wOpljLkkv5RZc` (API key của bạn)
6. Click **Add secret**

⚠️ **CHÚ Ý**: API key sẽ được giữ bí mật và chỉ dùng trong quá trình build!

---

## 📦 Bước 2: Kiểm tra file đã push

Đảm bảo các file sau đã được push lên GitHub:

```bash
# Kiểm tra status
git status

# Nếu có file mới, add và commit
git add .
git commit -m "Add Certificates page and update AI features"
git push origin main
```

### Kiểm tra các file quan trọng:
- ✅ `.github/workflows/deploy.yml` - GitHub Actions workflow
- ✅ `pages/Certificates.tsx` - Trang chứng chỉ
- ✅ `pages/AIAssistant.tsx` - Trợ lý AI với streaming
- ✅ `services/geminiService.ts` - Service với Gemini 2.5 Flash
- ✅ `public/*.png` - 4 file ảnh chứng chỉ
- ❌ `.env.local` - KHÔNG được push (đã có trong .gitignore)

---

## ⚙️ Bước 3: Cấu hình GitHub Pages

1. Vào **Settings** của repository
2. Click **Pages** ở sidebar trái
3. Trong **Build and deployment**:
   - **Source**: Chọn **GitHub Actions** (KHÔNG phải Deploy from a branch)
4. Lưu lại

---

## 🚀 Bước 4: Deploy tự động

GitHub Actions sẽ tự động chạy khi bạn push code:

1. Vào tab **Actions** trong repository
2. Xem workflow **Deploy to GitHub Pages** đang chạy
3. Đợi ~2-3 phút cho đến khi hoàn thành (màu xanh ✅)
4. Truy cập: `https://USERNAME.github.io/blogChiLoc/`

---

## 🔧 Deploy thủ công (nếu cần)

Nếu muốn deploy ngay lập tức:

```bash
# Build project
npm run build

# Deploy lên GitHub Pages (dùng gh-pages package)
npm run deploy
```

⚠️ **Lưu ý**: Deploy thủ công sẽ KHÔNG có API key từ secrets!

---

## ✅ Kiểm tra sau khi deploy

### 1. Kiểm tra các trang:
- ✅ Trang chủ
- ✅ Blog
- ✅ Dự án
- ✅ **Chứng chỉ** (MỚI)
- ✅ Giới thiệu
- ✅ **Trợ lý AI** (ĐÃ CẬP NHẬT)

### 2. Test tính năng AI:
- Vào trang "Trợ lý AI"
- Thử chat với AI
- Kiểm tra streaming có hoạt động không
- Test markdown rendering (hỏi AI viết code)

### 3. Test trang Chứng chỉ:
- Click vào menu "Chứng chỉ"
- Xem 4 chứng chỉ hiển thị đúng
- Click vào từng chứng chỉ để xem modal chi tiết
- Kiểm tra responsive trên mobile

---

## 🐛 Troubleshooting

### Lỗi: AI không hoạt động trên production
**Nguyên nhân**: Chưa thêm API key vào GitHub Secrets

**Giải pháp**:
1. Vào Settings > Secrets and variables > Actions
2. Thêm secret `VITE_GEMINI_API_KEY`
3. Re-run workflow trong tab Actions

### Lỗi: Ảnh chứng chỉ không hiển thị
**Nguyên nhân**: Path ảnh sai hoặc ảnh chưa được push

**Giải pháp**:
```bash
# Kiểm tra ảnh có trong public
ls public/*.png

# Nếu thiếu, add và push
git add public/*.png
git commit -m "Add certificate images"
git push
```

### Lỗi: 404 Not Found khi access trang
**Nguyên nhân**: GitHub Pages chưa được enable hoặc sai config

**Giải pháp**:
1. Settings > Pages
2. Source: **GitHub Actions**
3. Đợi vài phút và reload

### Lỗi: Build failed trong Actions
**Xem log**:
1. Tab Actions
2. Click vào workflow bị lỗi
3. Click vào job "build"
4. Xem chi tiết lỗi

**Các lỗi thường gặp**:
- Syntax error: Kiểm tra code lỗi
- Missing dependencies: Chạy `npm install` và push package-lock.json
- TypeScript error: Sửa lỗi type trong code

---

## 📝 Cập nhật code trong tương lai

Mỗi khi bạn cập nhật code:

```bash
# 1. Lưu thay đổi
git add .
git commit -m "Mô tả thay đổi"

# 2. Push lên GitHub
git push origin main

# 3. GitHub Actions tự động deploy
# Vào tab Actions để xem tiến trình
```

---

## 🔄 Re-deploy toàn bộ

Nếu muốn deploy lại từ đầu:

```bash
# 1. Xóa cache
rm -rf node_modules dist
npm install

# 2. Test local
npm run dev

# 3. Build thử
npm run build

# 4. Push lên GitHub
git add .
git commit -m "Redeploy with all new features"
git push origin main
```

---

## 📊 Monitoring

### Xem logs deployment:
1. Tab **Actions** > Workflow gần nhất
2. Click vào để xem chi tiết
3. Xem từng step: Install, Build, Deploy

### Xem traffic:
1. Tab **Insights**
2. Click **Traffic**
3. Xem số lượt view và visitor

---

## 🎯 Checklist hoàn chỉnh

Trước khi deploy, đảm bảo:

- [ ] ✅ Đã thêm `VITE_GEMINI_API_KEY` vào GitHub Secrets
- [ ] ✅ File `.env.local` có trong `.gitignore` (không push)
- [ ] ✅ File `.github/workflows/deploy.yml` đã được push
- [ ] ✅ Tất cả ảnh chứng chỉ trong `public/` đã được push
- [ ] ✅ Code không có lỗi TypeScript
- [ ] ✅ Test local với `npm run dev` OK
- [ ] ✅ GitHub Pages Source = **GitHub Actions**
- [ ] ✅ Push code lên main branch
- [ ] ✅ Workflow chạy thành công (màu xanh)
- [ ] ✅ Test website production

---

## 🌐 URL cuối cùng

Sau khi deploy thành công:

```
https://phamchiloc.github.io/blogChiLoc/
```

Thay `phamchiloc` bằng username GitHub của bạn.

---

## 💡 Tips

1. **Luôn test local trước khi push**: `npm run dev`
2. **Commit message rõ ràng**: Dễ tracking lỗi
3. **Xem Actions log**: Nếu có lỗi, log rất chi tiết
4. **Keep API key secret**: Không hardcode, dùng Secrets
5. **Regular backup**: Clone repo về local thường xuyên

---

## 📚 Tài liệu tham khảo

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Gemini API Docs](https://ai.google.dev/docs)

---

✨ **Chúc bạn deploy thành công!**

Nếu có vấn đề, check lại từng bước hoặc xem log trong Actions tab.
