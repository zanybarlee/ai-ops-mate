
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Message, serializeMessage, deserializeMessage } from '@/types/chat';
import { 
  queryChatbot, 
  saveMessagesToStorage, 
  loadMessagesFromStorage, 
  clearMessagesFromStorage 
} from '@/utils/chatApi';
import ChatHeader from './chat/ChatHeader';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';

const DEFAULT_WELCOME_MESSAGE: Message = {
  id: '1',
  role: 'assistant',
  content: 'Hello, I\'m your AI Operations Assistant. How can I help with your data center management today?',
  timestamp: new Date()
};

interface ChatInterfaceProps {
  selectedPrompt?: string | null;
}

const ChatInterface = ({ selectedPrompt }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([DEFAULT_WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  // Load saved messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = loadMessagesFromStorage();
    if (savedMessages && savedMessages.length > 0) {
      setMessages(savedMessages.map(deserializeMessage));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      saveMessagesToStorage(messages.map(serializeMessage));
    }
  }, [messages]);

  // Handle selected prompt from parent component
  useEffect(() => {
    if (selectedPrompt) {
      handleSendMessage(selectedPrompt);
    }
  }, [selectedPrompt]);

  const resetConversation = () => {
    setMessages([DEFAULT_WELCOME_MESSAGE]);
    clearMessagesFromStorage();
    toast({
      title: "Conversation Reset",
      description: "Your conversation has been reset.",
    });
  };

  const handleSendMessage = async (inputValue: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      const responseText = await queryChatbot(inputValue);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting assistant response:", error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to the AI service. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] glass-card overflow-hidden">
      <ChatHeader onReset={resetConversation} />
      <MessageList messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={handleSendMessage} isTyping={isTyping} />
    </div>
  );
};

export default ChatInterface;
