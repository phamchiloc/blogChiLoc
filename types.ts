
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

export interface CurriculumItem {
  id: number;
  title: string;
  description: string;
  content: string; // Nội dung bài giảng chi tiết
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
  curriculum?: CurriculumItem[];
}

export enum Page {
  Home = 'home',
  Blog = 'blog',
  PostDetail = 'post-detail',
  About = 'about',
  Projects = 'projects',
  Certificates = 'certificates',
  AI = 'ai-assistant',
  RoadmapDetail = 'roadmap-detail'
}
