# 🚀 Deploy Quick Guide

## Bước 1: Thêm API Key vào GitHub Secrets (CHỈ LÀM 1 LẦN)

1. Vào: https://github.com/phamchiloc/blogChiLoc/settings/secrets/actions
2. Click "New repository secret"
3. Name: `VITE_GEMINI_API_KEY`
4. Value: `AIzaSyAdhZVQotmnktFQ5zfFD2wOpljLkkv5RZc`
5. Click "Add secret"

## Bước 2: Push code mới

```bash
# Xem những file đã thay đổi
git status

# Add tất cả file mới và đã sửa
git add .

# Commit với message rõ ràng
git commit -m "Add Certificates page and update AI with Gemini 2.5 Flash"

# Push lên GitHub
git push origin main
```

## Bước 3: Chờ deploy tự động

1. Vào: https://github.com/phamchiloc/blogChiLoc/actions
2. Xem workflow "Deploy to GitHub Pages" đang chạy
3. Đợi 2-3 phút cho đến khi thấy dấu ✅ màu xanh
4. Truy cập: https://phamchiloc.github.io/blogChiLoc/

## Kiểm tra

- [ ] Trang "Chứng chỉ" hiển thị 4 chứng chỉ
- [ ] Trang "Trợ lý AI" chat được với streaming
- [ ] Tất cả ảnh hiển thị đúng
- [ ] Navbar có đầy đủ các menu mới

## Nếu có lỗi

Xem log tại: https://github.com/phamchiloc/blogChiLoc/actions

---

✨ Done! Website sẽ tự động deploy mỗi khi bạn push code lên GitHub.
