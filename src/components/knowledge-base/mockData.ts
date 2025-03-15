
import { Article, Category } from './types';

// Mock data for knowledge base articles
export const articles: Article[] = [
  {
    id: 'KB001',
    title: 'Troubleshooting Server Cooling Fan Failures',
    category: 'Hardware',
    tags: ['Cooling', 'Maintenance', 'Server'],
    lastUpdated: '2 days ago',
    excerpt: 'Comprehensive guide to diagnosing and resolving server cooling fan issues, including common failure patterns and replacement procedures.',
    views: 423
  },
  {
    id: 'KB002',
    title: 'Network Switch Configuration Best Practices',
    category: 'Network',
    tags: ['Configuration', 'Security', 'Performance'],
    lastUpdated: '1 week ago',
    excerpt: 'Optimal configuration settings for enterprise network switches to maximize throughput, minimize latency, and enhance security posture.',
    views: 289
  },
  {
    id: 'KB003',
    title: 'Power Distribution Unit Maintenance Schedule',
    category: 'Power',
    tags: ['Maintenance', 'Scheduling', 'Power'],
    lastUpdated: '3 days ago',
    excerpt: 'Recommended maintenance intervals and procedures for data center PDUs, including testing protocols and failure mitigation strategies.',
    views: 156
  },
  {
    id: 'KB004',
    title: 'Database Performance Optimization Techniques',
    category: 'Software',
    tags: ['Database', 'Performance', 'Optimization'],
    lastUpdated: '5 days ago',
    excerpt: 'Advanced techniques for optimizing database performance in high-load environments, including indexing strategies and query optimization.',
    views: 312
  },
  {
    id: 'KB005',
    title: 'Data Center Environment Monitoring Guidelines',
    category: 'Operations',
    tags: ['Monitoring', 'Environment', 'Sensors'],
    lastUpdated: '1 day ago',
    excerpt: 'Comprehensive guide to setting up environmental monitoring in data centers, including temperature, humidity, and airflow measurement.',
    views: 198
  }
];

// Popular search terms
export const popularSearches: string[] = [
  'Cooling system',
  'Network performance',
  'Server rack layout',
  'Power redundancy',
  'Database backups',
  'Security protocols'
];

// Categories
export const categories: Category[] = [
  { name: 'Hardware', count: 28 },
  { name: 'Network', count: 19 },
  { name: 'Software', count: 24 },
  { name: 'Power', count: 12 },
  { name: 'Operations', count: 31 },
];
