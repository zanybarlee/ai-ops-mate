
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
  isDetached: boolean;
  toggleDetach: () => void;
  isResizing: boolean;
  setIsResizing: (resizing: boolean) => void;
  // VoiceBot specific state
  isVoiceBotOpen: boolean;
  toggleVoiceBot: () => void;
  openVoiceBot: () => void;
  closeVoiceBot: () => void;
  voiceBotPosition: { x: number; y: number };
  setVoiceBotPosition: (position: { x: number; y: number }) => void;
  voiceBotSize: { width: number; height: number };
  setVoiceBotSize: (size: { width: number; height: number }) => void;
  isVoiceBotMinimized: boolean;
  toggleVoiceBotMinimize: () => void;
  isVoiceBotDetached: boolean;
  toggleVoiceBotDetach: () => void;
  isVoiceBotDragging: boolean;
  setIsVoiceBotDragging: (dragging: boolean) => void;
  isVoiceBotResizing: boolean;
  setIsVoiceBotResizing: (resizing: boolean) => void;
  reloadVoiceBot: () => void;
}

const FloatingChatContext = createContext<FloatingChatContextType | undefined>(undefined);

export const FloatingChatProvider = ({ children }: { children: ReactNode }) => {
  // Chat state
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState({ 
    x: window.innerWidth - 480 - 20, 
    y: window.innerHeight - 600 - 20 
  });
  const [size, setSize] = useState({ width: 480, height: 600 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDetached, setIsDetached] = useState(false);

  // VoiceBot state
  const [isVoiceBotOpen, setIsVoiceBotOpen] = useState(false);
  const [isVoiceBotDragging, setIsVoiceBotDragging] = useState(false);
  const [isVoiceBotResizing, setIsVoiceBotResizing] = useState(false);
  const [voiceBotPosition, setVoiceBotPosition] = useState({ 
    x: window.innerWidth - 450 - 20, 
    y: window.innerHeight - 550 - 20 
  });
  const [voiceBotSize, setVoiceBotSize] = useState({ width: 450, height: 550 });
  const [isVoiceBotMinimized, setIsVoiceBotMinimized] = useState(false);
  const [isVoiceBotDetached, setIsVoiceBotDetached] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);

  // Chat methods
  const toggleChat = () => setIsOpen(prev => !prev);
  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleMinimize = () => setIsMinimized(prev => !prev);
  const toggleDetach = () => setIsDetached(prev => !prev);

  // VoiceBot methods
  const toggleVoiceBot = () => setIsVoiceBotOpen(prev => !prev);
  const openVoiceBot = () => setIsVoiceBotOpen(true);
  const closeVoiceBot = () => setIsVoiceBotOpen(false);
  const toggleVoiceBotMinimize = () => setIsVoiceBotMinimized(prev => !prev);
  const toggleVoiceBotDetach = () => setIsVoiceBotDetached(prev => !prev);
  const reloadVoiceBot = () => setReloadCount(prev => prev + 1);

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
      toggleMinimize,
      isDetached,
      toggleDetach,
      isResizing,
      setIsResizing,
      // VoiceBot values
      isVoiceBotOpen,
      toggleVoiceBot,
      openVoiceBot,
      closeVoiceBot,
      voiceBotPosition,
      setVoiceBotPosition,
      voiceBotSize,
      setVoiceBotSize,
      isVoiceBotMinimized,
      toggleVoiceBotMinimize,
      isVoiceBotDetached,
      toggleVoiceBotDetach,
      isVoiceBotDragging,
      setIsVoiceBotDragging,
      isVoiceBotResizing,
      setIsVoiceBotResizing,
      reloadVoiceBot
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
