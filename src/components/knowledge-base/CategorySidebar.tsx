
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { BookOpen, ChevronRight } from 'lucide-react';
import { categories } from './mockData';

const CategorySidebar = () => {
  return (
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
  );
};

export default CategorySidebar;
