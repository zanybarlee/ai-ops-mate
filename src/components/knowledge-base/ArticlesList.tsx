
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Clock, Tag, ArrowRight, Bookmark, Search } from 'lucide-react';
import { Article } from './types';

interface ArticlesListProps {
  filteredArticles: Article[];
}

const ArticlesList = ({ filteredArticles }: ArticlesListProps) => {
  return (
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
                <Button variant="default">
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ArticlesList;
