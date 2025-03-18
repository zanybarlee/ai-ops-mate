
import { useFloatingChat } from '@/contexts/FloatingChatContext';
import { Button } from '@/components/ui/button';
import { X, Minus, Maximize, Move, PinOff, Pin, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceBotHeaderProps {
  dragHandleRef: React.RefObject<HTMLDivElement>;
  onReload: () => void;
}

export const VoiceBotHeader = ({ dragHandleRef, onReload }: VoiceBotHeaderProps) => {
  const { 
    closeVoiceBot, 
    isVoiceBotDragging, 
    toggleVoiceBotMinimize,
    isVoiceBotMinimized,
    isVoiceBotDetached,
    toggleVoiceBotDetach,
  } = useFloatingChat();

  const handleStyles = cn(
    "flex items-center justify-between px-4 py-2 border-b border-border bg-blue-500/10",
    isVoiceBotDragging ? "cursor-grabbing" : "cursor-grab"
  );

  return (
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
        <Button variant="ghost" size="icon" onClick={onReload} className="h-8 w-8" title="Reload">
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
  );
};
