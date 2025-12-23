import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, closeDB, sql } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server đang chạy' });
});

// ====================
// POSTS API ROUTES
// ====================

// GET: Lấy tất cả bài viết
app.get('/api/posts', async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT 
        p.*,
        a.name as author_name,
        a.avatar as author_avatar
      FROM Posts p
      LEFT JOIN Authors a ON p.author_id = a.id
      ORDER BY p.date DESC
    `);
    
    const posts = result.recordset.map(row => ({
      id: row.id,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      date: row.date,
      category: row.category,
      image: row.image,
      author: {
        name: row.author_name,
        avatar: row.author_avatar
      }
    }));
    
    res.json(posts);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách bài viết:', err);
    res.status(500).json({ error: 'Lỗi server', details: err.message });
  }
});

// GET: Lấy 1 bài viết theo ID
app.get('/api/posts/:id', async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input('id', sql.NVarChar, req.params.id)
      .query(`
        SELECT 
          p.*,
          a.name as author_name,
          a.avatar as author_avatar
        FROM Posts p
        LEFT JOIN Authors a ON p.author_id = a.id
        WHERE p.id = @id
      `);
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy bài viết' });
    }
    
    const row = result.recordset[0];
    const post = {
      id: row.id,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      date: row.date,
      category: row.category,
      image: row.image,
      author: {
        name: row.author_name,
        avatar: row.author_avatar
      }
    };
    
    res.json(post);
  } catch (err) {
    console.error('Lỗi khi lấy bài viết:', err);
    res.status(500).json({ error: 'Lỗi server', details: err.message });
  }
});

// POST: Tạo bài viết mới
app.post('/api/posts', async (req, res) => {
  try {
    const { title, excerpt, content, category, image, author_id } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Thiếu thông tin bắt buộc (title, content)' });
    }
    
    const pool = await connectDB();
    const id = `post-${Date.now()}`;
    const date = new Date().toISOString().split('T')[0];
    
    await pool.request()
      .input('id', sql.NVarChar, id)
      .input('title', sql.NVarChar, title)
      .input('excerpt', sql.NVarChar, excerpt || '')
      .input('content', sql.NVarChar(sql.MAX), content)
      .input('date', sql.Date, date)
      .input('category', sql.NVarChar, category || 'Uncategorized')
      .input('image', sql.NVarChar, image || 'https://picsum.photos/seed/default/800/400')
      .input('author_id', sql.Int, author_id || 1)
      .query(`
        INSERT INTO Posts (id, title, excerpt, content, date, category, image, author_id)
        VALUES (@id, @title, @excerpt, @content, @date, @category, @image, @author_id)
      `);
    
    res.status(201).json({ message: 'Tạo bài viết thành công', id });
  } catch (err) {
    console.error('Lỗi khi tạo bài viết:', err);
    res.status(500).json({ error: 'Lỗi server', details: err.message });
  }
});

// PUT: Cập nhật bài viết
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { title, excerpt, content, category, image } = req.body;
    
    const pool = await connectDB();
    await pool.request()
      .input('id', sql.NVarChar, req.params.id)
      .input('title', sql.NVarChar, title)
      .input('excerpt', sql.NVarChar, excerpt)
      .input('content', sql.NVarChar(sql.MAX), content)
      .input('category', sql.NVarChar, category)
      .input('image', sql.NVarChar, image)
      .query(`
        UPDATE Posts
        SET title = @title,
            excerpt = @excerpt,
            content = @content,
            category = @category,
            image = @image
        WHERE id = @id
      `);
    
    res.json({ message: 'Cập nhật bài viết thành công' });
  } catch (err) {
    console.error('Lỗi khi cập nhật bài viết:', err);
    res.status(500).json({ error: 'Lỗi server', details: err.message });
  }
});

// DELETE: Xóa bài viết
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const pool = await connectDB();
    await pool.request()
      .input('id', sql.NVarChar, req.params.id)
      .query('DELETE FROM Posts WHERE id = @id');
    
    res.json({ message: 'Xóa bài viết thành công' });
  } catch (err) {
    console.error('Lỗi khi xóa bài viết:', err);
    res.status(500).json({ error: 'Lỗi server', details: err.message });
  }
});

// ====================
// PROJECTS API ROUTES
// ====================

// GET: Lấy tất cả projects
app.get('/api/projects', async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT * FROM Projects ORDER BY id
    `);
    
    const projects = result.recordset.map(row => ({
      ...row,
      tech: row.tech ? JSON.parse(row.tech) : []
    }));
    
    res.json(projects);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách projects:', err);
    res.status(500).json({ error: 'Lỗi server', details: err.message });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Đang dừng server...');
  await closeDB();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  console.log(`📊 API endpoint: http://localhost:${PORT}/api`);
});
