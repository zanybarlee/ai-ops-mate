import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import SearchBar from './SearchBar';
import ArticlesList from './ArticlesList';
import CategorySidebar from './CategorySidebar';
import RecentUpdates from './RecentUpdates';
import DocumentUpload from './document-upload';
import { articles as mockArticles } from './mockData';
import { queryKnowledgeBase } from '@/utils/chatApi';
import { Article } from './types';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(mockArticles);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setFilteredArticles(mockArticles);
      return;
    }
    
    setIsSearching(true);
    
    try {
      const response = await queryKnowledgeBase(searchQuery);
      
      const apiResults = response.text || '';
      
      const responseWords = apiResults.toLowerCase().split(/\s+/);
      const filtered = mockArticles.filter(article => {
        const articleContent = (
          article.title.toLowerCase() + ' ' + 
          article.excerpt.toLowerCase() + ' ' + 
          article.category.toLowerCase() + ' ' + 
          article.tags.join(' ').toLowerCase()
        );
        
        return responseWords.some(word => 
          word.length > 3 && articleContent.includes(word)
        );
      });
      
      setFilteredArticles(filtered.length > 0 ? filtered : []);
      
      console.log('API Response:', response);
      
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "Failed to search the knowledge base. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
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
            isSearching={isSearching}
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
