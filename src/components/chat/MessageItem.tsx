
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const renderContent = () => {
    if (message.role === 'assistant') {
      return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        </div>
      );
    }
    return <p className="text-sm">{message.content}</p>;
  };

  return (
    <div
      className={cn(
        "max-w-[80%] animate-fade-in",
        message.role === 'user' ? "ml-auto" : "mr-auto"
      )}
    >
      <div 
        className={cn(
          "p-3 rounded-2xl",
          message.role === 'user' 
            ? "bg-primary text-primary-foreground rounded-tr-none" 
            : "glass rounded-tl-none"
        )}
      >
        {renderContent()}
      </div>
      <div 
        className={cn(
          "flex items-center text-xs mt-1",
          message.role === 'user' ? "justify-end" : "justify-start"
        )}
      >
        <span className="text-foreground/60">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {message.role === 'user' ? (
          <span className="ml-2 flex items-center">
            <User size={12} className="mr-1" />
            You
          </span>
        ) : (
          <span className="ml-2 flex items-center">
            <Bot size={12} className="mr-1" />
            AI Assistant
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
