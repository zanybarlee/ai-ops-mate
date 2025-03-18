
import { useFloatingChat } from '@/contexts/FloatingChatContext';
import { cn } from '@/lib/utils';

interface ResizeHandleProps {
  resizeHandleRef: React.RefObject<HTMLDivElement>;
}

export const ResizeHandle = ({ resizeHandleRef }: ResizeHandleProps) => {
  const { isResizing } = useFloatingChat();

  return (
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
  );
};
