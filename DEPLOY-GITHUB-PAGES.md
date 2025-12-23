# 🚀 HƯỚNG DẪN DEPLOY LÊN GITHUB PAGES

## Bước 1: Tạo Repository trên GitHub

1. Vào https://github.com/new
2. Điền thông tin:
   - **Repository name**: `DALTM_1823`
   - **Description**: Blog cá nhân - Phạm Chí Lộc
   - **Public** (chọn Public)
3. **KHÔNG** tick "Add a README file"
4. Click **"Create repository"**

---

## Bước 2: Push code lên GitHub

Mở PowerShell trong thư mục dự án và chạy:

```bash
# Khởi tạo Git
git init

# Thêm tất cả file
git add .

# Commit
git commit -m "Initial commit - Blog Phạm Chí Lộc"

# Thay USERNAME bằng tên GitHub của bạn
git remote add origin https://github.com/USERNAME/DALTM_1823.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

**Lưu ý:** Thay `USERNAME` bằng username GitHub thật của bạn!

---

## Bước 3: Cập nhật homepage trong package.json

Mở file `package.json` và sửa dòng:
```json
"homepage": "https://USERNAME.github.io/DALTM_1823"
```
Thay `USERNAME` bằng username GitHub của bạn.

---

## Bước 4: Deploy lên GitHub Pages

```bash
npm run deploy
```

Chờ 1-2 phút để GitHub xử lý.

---

## Bước 5: Bật GitHub Pages

1. Vào repository trên GitHub
2. Click tab **"Settings"**
3. Bên trái chọn **"Pages"**
4. Tại **"Source"**, chọn branch **"gh-pages"**
5. Click **"Save"**

---

## ✅ Hoàn tất!

Website của bạn sẽ có tại:
```
https://USERNAME.github.io/DALTM_1823/
```

---

## 🔄 Cập nhật sau này

Mỗi khi sửa code, chạy:
```bash
git add .
git commit -m "Update content"
git push
npm run deploy
```

---

## ⚠️ Lưu ý về API Key

GitHub Pages không hỗ trợ environment variables, nên:

**Cách 1:** Hardcode API key (KHÔNG KHUYẾN NGHỊ vì public)
**Cách 2:** AI Assistant sẽ không hoạt động trên GitHub Pages
**Cách 3:** Dùng Vercel thay vì GitHub Pages (khuyến nghị)

---

## 🎯 Khuyến nghị

Nếu muốn AI Assistant hoạt động, hãy deploy lên **Vercel** thay vì GitHub Pages vì Vercel hỗ trợ environment variables.

Nhưng nếu chỉ muốn website tĩnh đơn giản → GitHub Pages OK!
