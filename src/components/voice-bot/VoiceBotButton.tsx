
import { useFloatingChat } from '@/contexts/FloatingChatContext';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
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
