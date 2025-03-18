
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FloatingChatContextType {
  isOpen: boolean;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  position: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
  size: { width: number; height: number };
  setSize: (size: { width: number; height: number }) => void;
  isMinimized: boolean;
  toggleMinimize: () => void;
}

const FloatingChatContext = createContext<FloatingChatContextType | undefined>(undefined);

export const FloatingChatProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ 
    x: window.innerWidth - 480 - 20, 
    y: window.innerHeight - 600 - 20 
  });
  const [size, setSize] = useState({ width: 480, height: 600 });
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleChat = () => setIsOpen(prev => !prev);
  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleMinimize = () => setIsMinimized(prev => !prev);

  return (
    <FloatingChatContext.Provider value={{
      isOpen,
      toggleChat,
      openChat,
      closeChat,
      isDragging,
      setIsDragging,
      position,
      setPosition,
      size,
      setSize,
      isMinimized,
      toggleMinimize
    }}>
      {children}
    </FloatingChatContext.Provider>
  );
};

export const useFloatingChat = () => {
  const context = useContext(FloatingChatContext);
  if (context === undefined) {
    throw new Error('useFloatingChat must be used within a FloatingChatProvider');
  }
  return context;
};
