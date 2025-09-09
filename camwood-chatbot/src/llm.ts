import ollama from "ollama";

export async function getLLMResponse(query: string): Promise<string> {
  try {
    const response = await ollama.chat({ 
      model: "llama3", // Change this to the Llama model you have installed.
      messages: [{ role: "user", content: query }],
    });
    return response.message.content;
  } catch (error) {
    console.error("Error calling Llama API:", error);
    throw new Error("Failed to get a response from the LLM.");
  }
}