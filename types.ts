
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: string;
  category: string;
  coverImage?: string;
}

export type AppView = 'list' | 'detail' | 'compose';
