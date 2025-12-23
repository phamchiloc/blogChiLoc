# Script để tạo database BlogDatabase trong SQL Server
# Chạy với PowerShell: .\create-database.ps1

$serverName = "MS\SQLEXPRESS"
$databaseName = "BlogDatabase"

Write-Host "Đang tạo database $databaseName..." -ForegroundColor Yellow

try {
    # Đọc nội dung SQL file
    $sqlScript = Get-Content -Path ".\init-database.sql" -Raw
    
    # Kết nối và thực thi
    Invoke-Sqlcmd -ServerInstance $serverName -Query $sqlScript -Verbose
    
    Write-Host "`n✅ Tạo database thành công!" -ForegroundColor Green
    Write-Host "Database '$databaseName' đã được tạo và sẵn sàng sử dụng." -ForegroundColor Green
    Write-Host "`nHãy refresh Object Explorer trong SSMS để thấy database mới." -ForegroundColor Cyan
    
} catch {
    Write-Host "`n❌ Lỗi: $_" -ForegroundColor Red
    Write-Host "`n💡 Giải pháp thay thế:" -ForegroundColor Yellow
    Write-Host "1. Mở SQL Server Management Studio (SSMS)" -ForegroundColor White
    Write-Host "2. Kết nối đến: MS\SQLEXPRESS" -ForegroundColor White
    Write-Host "3. Mở file: $PSScriptRoot\init-database.sql" -ForegroundColor White
    Write-Host "4. Nhấn F5 để chạy script" -ForegroundColor White
}
