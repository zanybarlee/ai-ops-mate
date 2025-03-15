
import { useState } from 'react';
import SearchBar from './SearchBar';
import ArticlesList from './ArticlesList';
import CategorySidebar from './CategorySidebar';
import RecentUpdates from './RecentUpdates';
import DocumentUpload from './DocumentUpload';
import { articles as mockArticles } from './mockData';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setFilteredArticles(mockArticles);
      return;
    }
    
    const filtered = mockArticles.filter(article => 
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
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />
          
          <ArticlesList filteredArticles={filteredArticles} />
        </div>
        
        <div>
          <DocumentUpload />
          <CategorySidebar />
          <RecentUpdates articles={mockArticles.slice(0, 3)} />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
