
export async function queryChatbot(question: string) {
  try {
    const response = await fetch(
      "http://127.0.0.1:3001/api/v1/prediction/0794a211-607d-44b7-a89a-150c09a50094",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      }
    );
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.text || "Sorry, I couldn't process your request.";
  } catch (error) {
    console.error("Error querying chatbot:", error);
    return "Sorry, there was an error connecting to the AI service. Please try again later.";
  }
}

// Local storage key for saving chat messages
export const CHAT_STORAGE_KEY = 'ai-ops-assistant-chat';

// Save chat messages to localStorage
export const saveMessagesToStorage = (messages: any[]): void => {
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save chat messages to localStorage:', error);
  }
};

// Load chat messages from localStorage
export const loadMessagesFromStorage = (): any[] | null => {
  try {
    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
    return savedMessages ? JSON.parse(savedMessages) : null;
  } catch (error) {
    console.error('Failed to load chat messages from localStorage:', error);
    return null;
  }
};

// Clear chat messages from localStorage
export const clearMessagesFromStorage = (): void => {
  try {
    localStorage.removeItem(CHAT_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear chat messages from localStorage:', error);
  }
};
