
import { useRef, useEffect, useState } from 'react';
import { useFloatingChat } from '@/contexts/FloatingChatContext';
import { VoiceBotHeader } from './VoiceBotHeader';
import { VoiceBotResizeHandle } from './VoiceBotResizeHandle';
import { cn } from '@/lib/utils';

export const VoiceBotWindow = () => {
  const { 
    isVoiceBotOpen, 
    isVoiceBotDragging, 
    setIsVoiceBotDragging, 
    voiceBotPosition, 
    setVoiceBotPosition, 
    voiceBotSize, 
    setVoiceBotSize,
    isVoiceBotMinimized,
    isVoiceBotDetached,
    isVoiceBotResizing,
    setIsVoiceBotResizing
  } = useFloatingChat();
  
  const voiceBotRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [reloadKey, setReloadKey] = useState(0);

  // Handle reloading
  const handleReload = () => {
    if (iframeRef.current) {
      setReloadKey(prev => prev + 1);
    }
  };

  // Handle dragging
  useEffect(() => {
    if (!dragHandleRef.current) return;

    const dragHandle = dragHandleRef.current;
    
    const onMouseDown = (e: MouseEvent) => {
      if (e.target !== dragHandle && !dragHandle.contains(e.target as Node)) return;
      
      e.preventDefault();
      setIsVoiceBotDragging(true);
      
      const rect = voiceBotRef.current?.getBoundingClientRect();
      if (rect) {
        offsetRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isVoiceBotDragging) return;
      
      const x = e.clientX - offsetRef.current.x;
      const y = e.clientY - offsetRef.current.y;
      
      // Ensure the window stays within the viewport
      const maxX = window.innerWidth - voiceBotSize.width;
      const maxY = window.innerHeight - 40; // Allow some space for the drag handle
      
      setVoiceBotPosition({
        x: Math.max(0, Math.min(x, maxX)),
        y: Math.max(0, Math.min(y, maxY))
      });
    };
    
    const onMouseUp = () => {
      setIsVoiceBotDragging(false);
    };
    
    dragHandle.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    
    return () => {
      dragHandle.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isVoiceBotDragging, setIsVoiceBotDragging, setVoiceBotPosition, voiceBotSize.width]);

  // Handle resizing
  useEffect(() => {
    if (!resizeHandleRef.current) return;

    const resizeHandle = resizeHandleRef.current;
    
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      setIsVoiceBotResizing(true);
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isVoiceBotResizing) return;
      
      // Calculate new width and height
      const newWidth = Math.max(300, e.clientX - voiceBotPosition.x);
      const newHeight = Math.max(300, e.clientY - voiceBotPosition.y);
      
      setVoiceBotSize({
        width: newWidth,
        height: newHeight
      });
    };
    
    const onMouseUp = () => {
      setIsVoiceBotResizing(false);
    };
    
    resizeHandle.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    
    return () => {
      resizeHandle.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isVoiceBotResizing, voiceBotPosition.x, voiceBotPosition.y, setIsVoiceBotResizing, setVoiceBotSize]);

  // Reposition window when detached state changes
  useEffect(() => {
    if (isVoiceBotDetached) {
      // Center the window when detached
      setVoiceBotPosition({
        x: (window.innerWidth - voiceBotSize.width) / 2,
        y: (window.innerHeight - voiceBotSize.height) / 2
      });
    } else {
      // Return to default position when attached
      setVoiceBotPosition({
        x: window.innerWidth - voiceBotSize.width - 20,
        y: window.innerHeight - voiceBotSize.height - 20
      });
    }
  }, [isVoiceBotDetached, voiceBotSize.width, voiceBotSize.height, setVoiceBotPosition]);

  if (!isVoiceBotOpen) return null;

  return (
    <div
      ref={voiceBotRef}
      style={{ 
        left: `${voiceBotPosition.x}px`, 
        top: `${voiceBotPosition.y}px`,
        width: isVoiceBotMinimized ? '300px' : `${voiceBotSize.width}px`,
        height: isVoiceBotMinimized ? '60px' : `${voiceBotSize.height}px`
      }}
      className={cn(
        "fixed shadow-glass glass-card rounded-lg z-50 overflow-hidden transition-all duration-200",
        isVoiceBotDragging ? "opacity-80" : "opacity-100",
        isVoiceBotDetached ? "shadow-xl" : ""
      )}
    >
      <VoiceBotHeader 
        dragHandleRef={dragHandleRef}
        onReload={handleReload}
      />
      
      {!isVoiceBotMinimized && (
        <div className="h-[calc(100%-2.5rem)] flex flex-col">
          <iframe 
            key={reloadKey}
            ref={iframeRef}
            src="http://localhost:3005/" 
            className="w-full h-full border-none"
            title="Voice Bot"
            allow="microphone"
          />
        </div>
      )}

      {/* Resize handle in the bottom-right corner */}
      {!isVoiceBotMinimized && (
        <VoiceBotResizeHandle resizeHandleRef={resizeHandleRef} />
      )}
    </div>
  );
};
