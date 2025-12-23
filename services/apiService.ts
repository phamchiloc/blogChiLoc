// API Service để kết nối với Backend
const API_BASE_URL = 'http://localhost:5001/api';

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

// ========================
// POSTS API
// ========================

export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách bài viết');
    }
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi lấy bài viết:', error);
    return [];
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Không tìm thấy bài viết');
    }
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi lấy bài viết:', error);
    return null;
  }
}

export async function createPost(postData: Omit<Post, 'id' | 'date' | 'author'>): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Không thể tạo bài viết');
    }
    
    const result = await response.json();
    return { success: true, id: result.id };
  } catch (error: any) {
    console.error('Lỗi khi tạo bài viết:', error);
    return { success: false, error: error.message };
  }
}

export async function updatePost(id: string, postData: Partial<Post>): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    
    if (!response.ok) {
      throw new Error('Không thể cập nhật bài viết');
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Lỗi khi cập nhật bài viết:', error);
    return { success: false, error: error.message };
  }
}

export async function deletePost(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Không thể xóa bài viết');
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Lỗi khi xóa bài viết:', error);
    return { success: false, error: error.message };
  }
}

// ========================
// PROJECTS API
// ========================

export async function getAllProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách projects');
    }
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi lấy projects:', error);
    return [];
  }
}
