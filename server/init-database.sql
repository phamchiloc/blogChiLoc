-- ===================================
-- SQL Script: Tạo Database cho Blog
-- Database: BlogDatabase
-- ===================================

USE master;
GO

-- Tạo database nếu chưa tồn tại
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'BlogDatabase')
BEGIN
    CREATE DATABASE BlogDatabase;
    PRINT 'Database BlogDatabase đã được tạo';
END
ELSE
BEGIN
    PRINT 'Database BlogDatabase đã tồn tại';
END
GO

USE BlogDatabase;
GO

-- ===================================
-- Bảng Authors (Tác giả)
-- ===================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Authors')
BEGIN
    CREATE TABLE Authors (
        id INT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(255) NOT NULL,
        avatar NVARCHAR(500),
        created_at DATETIME DEFAULT GETDATE()
    );
    PRINT 'Bảng Authors đã được tạo';
END
GO

-- ===================================
-- Bảng Posts (Bài viết)
-- ===================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Posts')
BEGIN
    CREATE TABLE Posts (
        id NVARCHAR(50) PRIMARY KEY,
        title NVARCHAR(500) NOT NULL,
        excerpt NVARCHAR(1000),
        content NVARCHAR(MAX) NOT NULL,
        date DATE NOT NULL,
        category NVARCHAR(100),
        image NVARCHAR(500),
        author_id INT,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (author_id) REFERENCES Authors(id)
    );
    PRINT 'Bảng Posts đã được tạo';
END
GO

-- ===================================
-- Bảng Projects (Dự án)
-- ===================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Projects')
BEGIN
    CREATE TABLE Projects (
        id NVARCHAR(50) PRIMARY KEY,
        title NVARCHAR(500) NOT NULL,
        description NVARCHAR(1000),
        tech NVARCHAR(MAX), -- JSON array của các công nghệ
        link NVARCHAR(500),
        image NVARCHAR(500),
        created_at DATETIME DEFAULT GETDATE()
    );
    PRINT 'Bảng Projects đã được tạo';
END
GO

-- ===================================
-- Chèn dữ liệu mẫu cho Authors
-- ===================================
IF NOT EXISTS (SELECT * FROM Authors WHERE name = N'Phạm Chí Lộc')
BEGIN
    INSERT INTO Authors (name, avatar) VALUES 
    (N'Phạm Chí Lộc', 'https://picsum.photos/seed/phamlộc/100/100');
    PRINT 'Đã thêm tác giả mẫu';
END
GO

-- ===================================
-- Chèn dữ liệu mẫu cho Posts
-- ===================================
IF NOT EXISTS (SELECT * FROM Posts WHERE id = 'hoisting-javascript')
BEGIN
    INSERT INTO Posts (id, title, excerpt, content, date, category, image, author_id)
    VALUES (
        'hoisting-javascript',
        N'JavaScript Hoisting: Cơ chế ít người biết',
        N'Hoisting là một trong những khái niệm quan trọng nhất trong JavaScript mà mọi developer cần nắm vững.',
        N'### Lời mở đầu: Tại sao chúng ta vẫn nói về Hoisting năm 2025?
Chào các bạn, tôi là Lộc. Trong suốt gần một thập kỷ làm việc với JavaScript...

### 1. Sự thật về Hoisting
Hầu hết các tài liệu đều mô tả Hoisting là việc JavaScript Engine "nhấc" các khai báo biến lên đầu file...',
        '2025-01-15',
        N'JavaScript',
        'https://picsum.photos/seed/hoisting/800/400',
        1
    );
    PRINT 'Đã thêm bài viết mẫu về JavaScript Hoisting';
END
GO

IF NOT EXISTS (SELECT * FROM Posts WHERE id = 'java-virtual-threads')
BEGIN
    INSERT INTO Posts (id, title, excerpt, content, date, category, image, author_id)
    VALUES (
        'java-virtual-threads',
        N'Virtual Threads trong Java 21: Cách mạng Concurrency',
        N'Tìm hiểu về Project Loom và cách Virtual Threads thay đổi hoàn toàn cách chúng ta xử lý đồng thời trong Java.',
        N'### Mở đầu: Cuộc cách mạng âm thầm trong Java 21
Chào anh em lập trình viên Backend, tôi là Phạm Chí Lộc...

### 1. Platform Threads vs Virtual Threads
Trước Java 19/21, mỗi Thread là một wrapper xung quanh một luồng của hệ điều hành...',
        '2025-01-10',
        N'Java',
        'https://picsum.photos/seed/java21/800/400',
        1
    );
    PRINT 'Đã thêm bài viết mẫu về Java Virtual Threads';
END
GO

-- ===================================
-- Chèn dữ liệu mẫu cho Projects
-- ===================================
IF NOT EXISTS (SELECT * FROM Projects WHERE id = 'ecommerce-platform')
BEGIN
    INSERT INTO Projects (id, title, description, tech, link, image)
    VALUES (
        'ecommerce-platform',
        N'E-Commerce Platform',
        N'Nền tảng thương mại điện tử với giỏ hàng thời gian thực',
        '["React", "Node.js", "MongoDB"]',
        'https://github.com',
        'https://picsum.photos/seed/ecommerce/800/400'
    );
    PRINT 'Đã thêm project mẫu';
END
GO

PRINT '';
PRINT '====================================';
PRINT 'Hoàn thành khởi tạo database!';
PRINT '====================================';
