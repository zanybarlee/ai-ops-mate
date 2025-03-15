
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const mockResponses = [
  "I've analyzed the server logs and detected an anomaly in the cooling system. The temperature readings from Rack B3 show a 7°C increase over the last hour, which exceeds normal operational parameters.",
  
  "Based on historical incident data, this pattern matches 3 previous cases where the primary cooling pump was beginning to fail. I recommend checking the coolant pressure and flow rates immediately.",
  
  "I've generated a diagnostic checklist for the team and scheduled a maintenance alert. Would you like me to prepare a detailed report with the relevant troubleshooting steps from our knowledge base?",
  
  "The system is now monitoring this incident. I've retrieved similar cases from our knowledge base that showed early warning signs of cooling system failure. This information has been added to your maintenance dashboard."
];

function getRandomResponse(): string {
  const index = Math.floor(Math.random() * mockResponses.length);
  return mockResponses[index];
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello, I\'m your AI Operations Assistant. How can I help with your data center management today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getRandomResponse(),
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] glass-card overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
            <Bot size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium">AI Operations Assistant</h3>
            <p className="text-xs text-foreground/60">Data Center Support</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" aria-label="Reset conversation">
          <RefreshCw size={16} />
        </Button>
      </div>
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[80%] animate-fade-in",
                message.role === 'user' ? "ml-auto" : "mr-auto"
              )}
            >
              <div 
                className={cn(
                  "p-3 rounded-2xl",
                  message.role === 'user' 
                    ? "bg-primary text-primary-foreground rounded-tr-none" 
                    : "glass rounded-tl-none"
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <div 
                className={cn(
                  "flex items-center text-xs mt-1",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <span className="text-foreground/60">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.role === 'user' ? (
                  <span className="ml-2 flex items-center">
                    <User size={12} className="mr-1" />
                    You
                  </span>
                ) : (
                  <span className="ml-2 flex items-center">
                    <Bot size={12} className="mr-1" />
                    AI Assistant
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="max-w-[80%] mr-auto animate-fade-in">
              <div className="glass p-3 rounded-2xl rounded-tl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-border">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
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
    </div>
  );
};

export default ChatInterface;
