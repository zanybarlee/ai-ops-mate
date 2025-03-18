
import { useRef } from 'react';
import { useFloatingChat } from '@/contexts/FloatingChatContext';
import { Button } from '@/components/ui/button';
import { X, Minus, Maximize, Move, PinOff, Pin } from 'lucide-react';
import { UserAvatar } from '@/contexts/AuthContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface FloatingChatHeaderProps {
  dragHandleRef: React.RefObject<HTMLDivElement>;
}

export const FloatingChatHeader = ({ dragHandleRef }: FloatingChatHeaderProps) => {
  const { 
    closeChat, 
    isDragging, 
    toggleMinimize, 
    isMinimized,
    isDetached,
    toggleDetach
  } = useFloatingChat();
  const { user } = useAuth();

  const handleStyles = cn(
    "flex items-center justify-between px-4 py-2 border-b border-border bg-primary/5",
    isDragging ? "cursor-grabbing" : "cursor-grab"
  );

  return (
    <div 
      ref={dragHandleRef}
      className={handleStyles}
    >
      <div className="flex items-center gap-2">
        <Move size={16} className="mr-1 text-muted-foreground" />
        {user && <UserAvatar user={user} />}
        <div>
          <p className="text-sm font-medium">AI Assistant</p>
          <p className="text-xs text-muted-foreground">
            {user ? `Logged in as ${user.name}` : 'Chat with AI'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={toggleDetach} className="h-8 w-8" title={isDetached ? "Attach" : "Detach"}>
          {isDetached ? <Pin size={14} /> : <PinOff size={14} />}
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-8 w-8">
          {isMinimized ? <Maximize size={14} /> : <Minus size={14} />}
        </Button>
        <Button variant="ghost" size="icon" onClick={closeChat} className="h-8 w-8">
          <X size={14} />
        </Button>
      </div>
    </div>
  );
};
