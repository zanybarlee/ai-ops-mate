
import { useRef, useEffect } from 'react';
import { useFloatingChat } from '@/contexts/FloatingChatContext';
import { Button } from '@/components/ui/button';
import { Bot, X, Minus, Maximize, RefreshCcw, Move } from 'lucide-react';
import { UserAvatar } from '@/contexts/AuthContext';
import { useAuth } from '@/contexts/AuthContext';
import ChatInterface from '@/components/ChatInterface';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
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

export const FloatingChatWindow = () => {
  const { 
    isOpen, 
    closeChat, 
    isDragging, 
    setIsDragging, 
    position, 
    setPosition, 
    size, 
    setSize,
    isMinimized,
    toggleMinimize
  } = useFloatingChat();
  const { user } = useAuth();
  const chatRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  // Handle dragging
  useEffect(() => {
    if (!dragHandleRef.current) return;

    const dragHandle = dragHandleRef.current;
    
    const onMouseDown = (e: MouseEvent) => {
      if (e.target !== dragHandle && !dragHandle.contains(e.target as Node)) return;
      
      e.preventDefault();
      setIsDragging(true);
      
      const rect = chatRef.current?.getBoundingClientRect();
      if (rect) {
        offsetRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const x = e.clientX - offsetRef.current.x;
      const y = e.clientY - offsetRef.current.y;
      
      // Ensure the chat window stays within the viewport
      const maxX = window.innerWidth - size.width;
      const maxY = window.innerHeight - 40; // Allow some space for the drag handle
      
      setPosition({
        x: Math.max(0, Math.min(x, maxX)),
        y: Math.max(0, Math.min(y, maxY))
      });
    };
    
    const onMouseUp = () => {
      setIsDragging(false);
    };
    
    dragHandle.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    
    return () => {
      dragHandle.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, setIsDragging, setPosition, size.width]);

  // Update pointer styles based on drag state
  const handleStyles = cn(
    "flex items-center justify-between px-4 py-2 border-b border-border bg-primary/5",
    isDragging ? "cursor-grabbing" : "cursor-grab"
  );

  if (!isOpen) return null;

  return (
    <div
      ref={chatRef}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        width: isMinimized ? '300px' : `${size.width}px`,
        height: isMinimized ? '60px' : `${size.height}px`
      }}
      className={cn(
        "fixed shadow-glass glass-card rounded-lg z-50 overflow-hidden transition-all duration-200",
        isDragging ? "opacity-80" : "opacity-100"
      )}
    >
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
          <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-8 w-8">
            {isMinimized ? <Maximize size={14} /> : <Minus size={14} />}
          </Button>
          <Button variant="ghost" size="icon" onClick={closeChat} className="h-8 w-8">
            <X size={14} />
          </Button>
        </div>
      </div>
      
      {!isMinimized && (
        <div className="h-[calc(100%-2.5rem)] flex flex-col">
          <ChatInterface isFloating={true} />
        </div>
      )}
    </div>
  );
};

export const FloatingChat = () => {
  return (
    <>
      <FloatingChatButton />
      <FloatingChatWindow />
    </>
  );
};
