
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, FileText, Clock, Tag, ArrowRight, ChevronRight, BookMarked, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for knowledge base articles
const articles = [
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
const popularSearches = [
  'Cooling system',
  'Network performance',
  'Server rack layout',
  'Power redundancy',
  'Database backups',
  'Security protocols'
];

// Categories
const categories = [
  { name: 'Hardware', count: 28 },
  { name: 'Network', count: 19 },
  { name: 'Software', count: 24 },
  { name: 'Power', count: 12 },
  { name: 'Operations', count: 31 },
];

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(articles);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setFilteredArticles(articles);
      return;
    }
    
    const filtered = articles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredArticles(filtered);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-medium">Knowledge Base</h2>
        <p className="text-muted-foreground">Search and browse our RAG-powered technical documentation</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="glass-card overflow-hidden mb-6">
            <CardHeader className="pb-2 flex flex-col space-y-2">
              <CardTitle className="text-2xl font-medium text-center">Find Solutions Quickly</CardTitle>
              <p className="text-center text-muted-foreground mb-4">
                Our AI-powered knowledge base continuously learns from incident resolutions and technical documentation
              </p>
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="search"
                  placeholder="Search for technical solutions, guides, or issues..."
                  className="pl-10 py-6 text-base focus-visible:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                >
                  Search
                </Button>
              </form>
              
              {popularSearches.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <span className="text-sm text-muted-foreground">Popular:</span>
                  {popularSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(term);
                        const filtered = articles.filter(article => 
                          article.title.toLowerCase().includes(term.toLowerCase()) ||
                          article.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase())) ||
                          article.category.toLowerCase().includes(term.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(term.toLowerCase())
                        );
                        setFilteredArticles(filtered);
                      }}
                      className="text-sm text-primary hover:underline focus:outline-none"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              )}
            </CardHeader>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Technical Documentation</CardTitle>
                <span className="text-sm text-muted-foreground">{filteredArticles.length} articles</span>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <div 
                        key={article.id}
                        className="p-4 hover:bg-secondary/50 rounded-lg transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium hover:text-primary transition-colors">{article.title}</h3>
                          <Button variant="ghost" size="icon" className="ml-2 shrink-0">
                            <Bookmark size={16} />
                          </Button>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {article.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="text-xs py-1 px-2 bg-secondary rounded-full text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <FileText size={14} className="mr-1" />
                            <span>{article.id}</span>
                            <span className="mx-2">•</span>
                            <Tag size={14} className="mr-1" />
                            <span>{article.category}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>Updated {article.lastUpdated}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">{article.views} views</span>
                          <Button variant="ghost" size="sm" className="text-primary gap-1">
                            Read article
                            <ArrowRight size={14} />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                        <Search size={24} className="text-muted-foreground" />
                      </div>
                      <h4 className="text-lg font-medium mb-2">No results found</h4>
                      <p className="text-muted-foreground mb-4">
                        We couldn't find any articles matching your search criteria.
                      </p>
                      <Button 
                        onClick={() => {
                          setSearchQuery('');
                          setFilteredArticles(articles);
                        }}
                      >
                        Clear search
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="glass-card mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div 
                    key={category.name}
                    className="flex items-center justify-between py-2 px-3 hover:bg-secondary/50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex items-center">
                      <BookOpen size={16} className="mr-2 text-primary" />
                      <span>{category.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground mr-2">{category.count}</span>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recently Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {articles.slice(0, 3).map((article) => (
                  <div 
                    key={article.id}
                    className="flex items-start py-2 hover:bg-secondary/50 rounded-lg px-3 cursor-pointer transition-colors"
                  >
                    <BookMarked size={16} className="mr-2 mt-0.5 text-primary shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium line-clamp-1">{article.title}</h4>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock size={12} className="mr-1" />
                        <span>{article.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  View all recent updates
                  <ChevronRight size={14} className="ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
