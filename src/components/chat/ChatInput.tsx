
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const ChatInput = ({ onSendMessage, isTyping }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="p-4 border-t border-border">
      <form 
        onSubmit={handleSubmit}
        className="flex space-x-2"
      >
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
          disabled={isTyping}
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={!inputValue.trim() || isTyping}
          className="button-animation"
        >
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
