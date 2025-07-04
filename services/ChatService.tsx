export class ChatService {
  static async getChatbotResponse(message) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = [
      "That's an interesting question! Let me help you with that.",
      "I understand your query. Here's what I think about it...",
      "Based on your question, I'd recommend considering these points.",
      "Great question! Here's my perspective on this topic.",
      "I'm happy to help you with that. Let me explain...",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + 
           " " + `Your message was: "${message}". This is a simulated response for demonstration purposes.`;
  }
}