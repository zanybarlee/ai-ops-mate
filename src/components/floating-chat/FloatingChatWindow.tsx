
import { useRef, useEffect } from 'react';
import { useFloatingChat } from '@/contexts/FloatingChatContext';
import ChatInterface from '@/components/ChatInterface';
import { FloatingChatHeader } from './FloatingChatHeader';
import { ResizeHandle } from './ResizeHandle';
import { cn } from '@/lib/utils';

export const FloatingChatWindow = () => {
  const { 
    isOpen, 
    isDragging, 
    setIsDragging, 
    position, 
    setPosition, 
    size, 
    setSize,
    isMinimized,
    isDetached,
    isResizing,
    setIsResizing
  } = useFloatingChat();
  
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
      <FloatingChatHeader dragHandleRef={dragHandleRef} />
      
      {!isMinimized && (
        <div className="h-[calc(100%-2.5rem)] flex flex-col">
          <ChatInterface isFloating={true} />
        </div>
      )}

      {/* Resize handle in the bottom-right corner */}
      {!isMinimized && <ResizeHandle resizeHandleRef={resizeHandleRef} />}
    </div>
  );
};
