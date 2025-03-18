
import { Button } from '@/components/ui/button';
import { RefreshCw, Bot } from 'lucide-react';

interface ChatHeaderProps {
  onReset: () => void;
  isFloating?: boolean;
}

const ChatHeader = ({ onReset, isFloating = false }: ChatHeaderProps) => {
  // If in floating mode, we don't need the header as the FloatingChatWindow already has one
  if (isFloating) {
    return (
      <div className="p-2 flex justify-end">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          aria-label="Reset conversation"
          onClick={onReset}
        >
          <RefreshCw size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 border-b border-border flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
          <Bot size={16} className="text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium">AI Operations Assistant</h3>
          <p className="text-xs text-foreground/60">Data Center Support</p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        aria-label="Reset conversation"
        onClick={onReset}
      >
        <RefreshCw size={16} />
      </Button>
    </div>
  );
};

export default ChatHeader;
