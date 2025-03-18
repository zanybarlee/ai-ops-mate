
import { useRef, useEffect, useState } from 'react';
import { useFloatingChat } from '@/contexts/FloatingChatContext';
import { Button } from '@/components/ui/button';
import { Mic, X, Minus, Maximize, Move, PinOff, Pin, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const VoiceBotButton = () => {
  const { toggleVoiceBot, isVoiceBotOpen } = useFloatingChat();
  
  return (
    <Button 
      onClick={toggleVoiceBot}
      className={cn(
        "fixed bottom-5 left-5 rounded-full size-14 shadow-lg z-50 transition-all duration-300 bg-blue-500 hover:bg-blue-600",
        isVoiceBotOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
      )}
      size="icon"
    >
      <Mic size={24} />
    </Button>
  );
};

export const VoiceBotWindow = () => {
  const { 
    isVoiceBotOpen, 
    closeVoiceBot, 
    isVoiceBotDragging, 
    setIsVoiceBotDragging, 
    voiceBotPosition, 
    setVoiceBotPosition, 
    voiceBotSize, 
    setVoiceBotSize,
    isVoiceBotMinimized,
    toggleVoiceBotMinimize,
    isVoiceBotDetached,
    toggleVoiceBotDetach,
    isVoiceBotResizing,
    setIsVoiceBotResizing,
    reloadVoiceBot
  } = useFloatingChat();
  
  const voiceBotRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [reloadKey, setReloadKey] = useState(0);

  // Handle reloading
  useEffect(() => {
    setReloadKey(prev => prev + 1);
  }, [reloadKey]);

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

  // Handle reload button click
  const handleReload = () => {
    if (iframeRef.current) {
      // Force iframe reload
      setReloadKey(prev => prev + 1);
    }
  };

  // Update pointer styles based on drag state
  const handleStyles = cn(
    "flex items-center justify-between px-4 py-2 border-b border-border bg-blue-500/10",
    isVoiceBotDragging ? "cursor-grabbing" : "cursor-grab"
  );

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
      <div 
        ref={dragHandleRef}
        className={handleStyles}
      >
        <div className="flex items-center gap-2">
          <Move size={16} className="mr-1 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Voice Assistant</p>
            <p className="text-xs text-muted-foreground">Interactive Voice AI</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={handleReload} className="h-8 w-8" title="Reload">
            <RefreshCcw size={14} />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleVoiceBotDetach} className="h-8 w-8" title={isVoiceBotDetached ? "Attach" : "Detach"}>
            {isVoiceBotDetached ? <Pin size={14} /> : <PinOff size={14} />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleVoiceBotMinimize} className="h-8 w-8">
            {isVoiceBotMinimized ? <Maximize size={14} /> : <Minus size={14} />}
          </Button>
          <Button variant="ghost" size="icon" onClick={closeVoiceBot} className="h-8 w-8">
            <X size={14} />
          </Button>
        </div>
      </div>
      
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
        <div 
          ref={resizeHandleRef}
          className={cn(
            "absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10",
            isVoiceBotResizing ? "bg-blue-500/20" : ""
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

export const VoiceBot = () => {
  return (
    <>
      <VoiceBotButton />
      <VoiceBotWindow />
    </>
  );
};

export default VoiceBot;
