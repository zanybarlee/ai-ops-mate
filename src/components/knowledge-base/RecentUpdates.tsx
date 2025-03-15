
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookMarked, Clock, ChevronRight } from 'lucide-react';
import { Article } from './types';

interface RecentUpdatesProps {
  articles: Article[];
}

const RecentUpdates = ({ articles }: RecentUpdatesProps) => {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recently Updated</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {articles.map((article) => (
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
  );
};

export default RecentUpdates;
