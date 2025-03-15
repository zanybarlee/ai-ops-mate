
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
