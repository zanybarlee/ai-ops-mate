
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Helper function to serialize/deserialize dates when using localStorage
export const serializeMessage = (message: Message): any => ({
  ...message,
  timestamp: message.timestamp.toISOString()
});

export const deserializeMessage = (message: any): Message => ({
  ...message,
  timestamp: new Date(message.timestamp)
});
