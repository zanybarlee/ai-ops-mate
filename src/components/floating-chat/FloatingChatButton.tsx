
import { useFloatingChat } from '@/contexts/FloatingChatContext';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FloatingChatButton = () => {
  const { toggleChat, isOpen } = useFloatingChat();
  
  return (
    <Button 
      onClick={toggleChat}
      className={cn(
        "fixed bottom-5 right-5 rounded-full size-14 shadow-lg z-50 transition-all duration-300",
        isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
      )}
      size="icon"
    >
      <Bot size={24} />
    </Button>
  );
};
