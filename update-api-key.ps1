# Script hỗ trợ cập nhật Gemini API Key

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CẬP NHẬT GEMINI API KEY" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Hướng dẫn lấy API key
Write-Host "📝 HƯỚNG DẪN TẠO API KEY:" -ForegroundColor Green
Write-Host "1. Truy cập: https://aistudio.google.com/app/apikey" -ForegroundColor White
Write-Host "2. Đăng nhập Google" -ForegroundColor White
Write-Host "3. Click 'Create API Key'" -ForegroundColor White
Write-Host "4. Copy API key (dạng: AIzaSy...)" -ForegroundColor White
Write-Host ""

# Nhập API key mới
Write-Host "🔑 Nhập API key mới của bạn:" -ForegroundColor Yellow
$apiKey = Read-Host "API Key"

# Kiểm tra API key có hợp lệ không
if ($apiKey -notmatch "^AIza[a-zA-Z0-9_-]{35}$") {
    Write-Host ""
    Write-Host "❌ API key không hợp lệ!" -ForegroundColor Red
    Write-Host "   API key phải bắt đầu bằng 'AIza' và dài khoảng 39 ký tự" -ForegroundColor Red
    Write-Host ""
    pause
    exit
}

# Tạo/cập nhật file .env.local
$envContent = "VITE_GEMINI_API_KEY=$apiKey"
$envPath = ".env.local"

try {
    $envContent | Out-File -FilePath $envPath -Encoding UTF8 -NoNewline
    Write-Host ""
    Write-Host "✅ Đã cập nhật API key thành công!" -ForegroundColor Green
    Write-Host "   File: $envPath" -ForegroundColor Gray
    Write-Host ""
    
    # Kiểm tra API key
    Write-Host "🔍 Đang kiểm tra API key..." -ForegroundColor Yellow
    
    $testResult = node check-api.js 2>&1
    
    if ($LASTEXITCODE -eq 0 -and $testResult -match "✅ API key hợp lệ") {
        Write-Host "✅ API key hoạt động tốt!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 Bây giờ bạn có thể:" -ForegroundColor Cyan
        Write-Host "   1. Restart dev server (npm run dev)" -ForegroundColor White
        Write-Host "   2. Thử chat với AI Assistant" -ForegroundColor White
    } else {
        Write-Host "⚠️  Không thể xác minh API key" -ForegroundColor Yellow
        Write-Host "    Hãy chạy: node check-api.js để kiểm tra" -ForegroundColor Gray
    }
    
    Write-Host ""
    Write-Host "⚠️  QUAN TRỌNG - BẢO MẬT:" -ForegroundColor Red
    Write-Host "   - KHÔNG commit file .env.local lên GitHub" -ForegroundColor White
    Write-Host "   - KHÔNG chia sẻ API key công khai" -ForegroundColor White
    Write-Host "   - File .env.local đã được thêm vào .gitignore" -ForegroundColor Gray
    
} catch {
    Write-Host ""
    Write-Host "❌ Lỗi khi tạo file .env.local: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
pause
