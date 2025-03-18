
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Eye, BookOpen, Bookmark, Share, Printer, Bell } from 'lucide-react';
import { Article } from './types';

interface ArticleDetailProps {
  article: Article | null;
  onBack: () => void;
}

const ArticleDetail = ({ article, onBack }: ArticleDetailProps) => {
  if (!article) return null;

  // Use the content from the article object, or use a fallback if not available
  const content = article.content || article.excerpt;

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
          {content.split('\n\n').map((paragraph, idx) => {
            // Handle headers (# and ##)
            if (paragraph.startsWith('# ')) {
              return (
                <h2 key={idx} className="text-xl font-semibold mt-6 mb-3">
                  {paragraph.replace('# ', '')}
                </h2>
              );
            } else if (paragraph.startsWith('## ')) {
              return (
                <h3 key={idx} className="text-lg font-medium mt-6 mb-3">
                  {paragraph.replace('## ', '')}
                </h3>
              );
            } 
            // Handle code blocks
            else if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
              const code = paragraph.replace(/^```(\w+)?\n/, '').replace(/```$/, '');
              return (
                <pre key={idx} className="bg-muted p-4 rounded-md overflow-auto my-3">
                  <code>{code}</code>
                </pre>
              );
            }
            // Handle bulleted lists
            else if (paragraph.split('\n').every(line => line.trim().startsWith('- '))) {
              return (
                <ul key={idx} className="list-disc pl-5 my-3">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i} className="my-1">{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            // Handle numbered lists
            else if (paragraph.split('\n').some(line => /^\d+\.\s/.test(line.trim()))) {
              return (
                <ol key={idx} className="list-decimal pl-5 my-3">
                  {paragraph.split('\n').map((item, i) => {
                    const match = item.match(/^\d+\.\s+(.*)/);
                    return match ? <li key={i} className="my-1">{match[1]}</li> : null;
                  })}
                </ol>
              );
            }
            // Handle tables
            else if (paragraph.includes('|') && paragraph.includes('\n|')) {
              const tableRows = paragraph.split('\n');
              // Filter out separator rows (---|---) used in markdown tables
              const filteredRows = tableRows.filter(row => !row.match(/^\|\s*[-:]+\s*\|/));
              return (
                <div key={idx} className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-border text-sm">
                    <thead>
                      <tr>
                        {filteredRows[0]?.split('|').filter(Boolean).map((cell, i) => (
                          <th key={i} className="px-3 py-2 text-left font-medium bg-muted">
                            {cell.trim()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredRows.slice(1).map((row, i) => (
                        <tr key={i}>
                          {row.split('|').filter(Boolean).map((cell, j) => (
                            <td key={j} className="px-3 py-2">
                              {cell.trim()}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            // Default paragraph rendering
            else {
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
            <Printer size={14} className="mr-1" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Share size={14} className="mr-1" />
            Share
          </Button>
          <Button variant="default" size="sm">
            <Bell size={14} className="mr-1" />
            Follow Article
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleDetail;
