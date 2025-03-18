
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Tag, Eye, BookOpen, Bookmark } from 'lucide-react';
import { Article } from './types';

interface ArticleDetailProps {
  article: Article | null;
  onBack: () => void;
}

const ArticleDetail = ({ article, onBack }: ArticleDetailProps) => {
  if (!article) return null;

  // This would typically come from an API call in a real application
  const fullContent = `
    ${article.excerpt}
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.
    
    ## Key Points
    
    - Point 1: Important technical information related to this article
    - Point 2: Critical steps to follow when implementing this solution
    - Point 3: Common issues and their resolutions
    
    ## Technical Details
    
    The implementation requires careful consideration of the following factors:
    
    1. System compatibility
    2. Performance optimization
    3. Security considerations
    
    ## References
    
    - Internal Documentation: KB${article.id.replace('KB', '')}-A
    - Manufacturer Guidelines: Section 3.4.2
    - Industry Standards: ISO 27001
  `;

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-2 -ml-2 text-muted-foreground" 
              onClick={onBack}
            >
              <ArrowLeft size={16} className="mr-1" /> Back to articles
            </Button>
            <CardTitle className="text-xl font-bold">{article.title}</CardTitle>
            <CardDescription className="flex items-center mt-2">
              <BookOpen size={14} className="mr-1" />
              <span className="mr-2">Article {article.id}</span>
              <span className="mx-1">•</span>
              <Badge variant="outline" className="mr-1">{article.category}</Badge>
              <span className="mx-1">•</span>
              <Clock size={14} className="mr-1" />
              <span>Updated {article.lastUpdated}</span>
            </CardDescription>
          </div>
          <Button variant="outline" size="icon">
            <Bookmark size={16} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary"
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {fullContent.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('##')) {
              return (
                <h3 key={idx} className="text-lg font-medium mt-6 mb-3">
                  {paragraph.replace('##', '').trim()}
                </h3>
              );
            } else if (paragraph.startsWith('-')) {
              return (
                <ul key={idx} className="list-disc pl-5 my-3">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i} className="my-1">{item.replace('-', '').trim()}</li>
                  ))}
                </ul>
              );
            } else if (paragraph.includes('1.')) {
              return (
                <ol key={idx} className="list-decimal pl-5 my-3">
                  {paragraph.split('\n').map((item, i) => {
                    const match = item.match(/^\d+\.\s+(.*)/);
                    return match ? <li key={i} className="my-1">{match[1]}</li> : null;
                  })}
                </ol>
              );
            } else {
              return <p key={idx} className="my-3">{paragraph}</p>;
            }
          })}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Eye size={14} className="mr-1" />
          <span>{article.views} views</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Print
          </Button>
          <Button variant="outline" size="sm">
            Share
          </Button>
          <Button variant="default" size="sm">
            Follow Article
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleDetail;
