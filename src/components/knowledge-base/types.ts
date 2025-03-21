
export interface Article {
  id: string;
  title: string;
  category: string;
  tags: string[];
  lastUpdated: string;
  excerpt: string;
  views: number;
  content?: string;
}

export interface Category {
  name: string;
  count: number;
}
