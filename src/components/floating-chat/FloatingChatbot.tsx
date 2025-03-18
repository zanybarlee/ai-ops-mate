
import { useRef, useEffect } from 'react';
import { useFloatingChat } from '@/contexts/FloatingChatContext';
import { Button } from '@/components/ui/button';
import { Bot, X, Minus, Maximize, Move, PinOff, Pin } from 'lucide-react';
import { UserAvatar } from '@/contexts/AuthContext';
import { useAuth } from '@/contexts/AuthContext';
import ChatInterface from '@/components/ChatInterface';
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
    toggleMinimize,
    isDetached,
    toggleDetach,
    isResizing,
    setIsResizing
  } = useFloatingChat();
  const { user } = useAuth();
  const chatRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
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

  // Handle resizing
  useEffect(() => {
    if (!resizeHandleRef.current) return;

    const resizeHandle = resizeHandleRef.current;
    
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      // Calculate new width and height
      const newWidth = Math.max(300, e.clientX - position.x);
      const newHeight = Math.max(300, e.clientY - position.y);
      
      setSize({
        width: newWidth,
        height: newHeight
      });
    };
    
    const onMouseUp = () => {
      setIsResizing(false);
    };
    
    resizeHandle.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    
    return () => {
      resizeHandle.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isResizing, position.x, position.y, setIsResizing, setSize]);

  // Reposition chat window when detached state changes
  useEffect(() => {
    if (isDetached) {
      // Center the chat window when detached
      setPosition({
        x: (window.innerWidth - size.width) / 2,
        y: (window.innerHeight - size.height) / 2
      });
    } else {
      // Return to default position when attached
      setPosition({
        x: window.innerWidth - size.width - 20,
        y: window.innerHeight - size.height - 20
      });
    }
  }, [isDetached, size.width, size.height, setPosition]);

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
        isDragging ? "opacity-80" : "opacity-100",
        isDetached ? "shadow-xl" : ""
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
      
      {!isMinimized && (
        <div className="h-[calc(100%-2.5rem)] flex flex-col">
          <ChatInterface isFloating={true} />
        </div>
      )}

      {/* Resize handle in the bottom-right corner */}
      {!isMinimized && (
        <div 
          ref={resizeHandleRef}
          className={cn(
            "absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10",
            isResizing ? "bg-primary/20" : ""
          )}
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.4) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
            backgroundPosition: 'bottom right'
          }}
        />
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
