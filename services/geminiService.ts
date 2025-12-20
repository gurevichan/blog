
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    const apiKey = (window as any).process?.env?.API_KEY || "";
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  async generateDraft(prompt: string): Promise<{ title: string; content: string; excerpt: string }> {
    if (!this.ai) {
      throw new Error("API Key not found. Please ensure it is provided in the environment.");
    }

    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a blog post in Hebrew based on this prompt: ${prompt}. Return a JSON object with title, content (in HTML format), and a short excerpt. Ensure the language is natural, elegant Hebrew.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            excerpt: { type: Type.STRING }
          },
          required: ['title', 'content', 'excerpt']
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      throw new Error("Failed to parse AI response");
    }
  }

  async refineDraft(currentContent: string, instruction: string): Promise<string> {
    if (!this.ai) return currentContent;

    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `I have this blog content in Hebrew: "${currentContent}". Please ${instruction} in Hebrew. Return only the updated HTML content.`,
    });
    return response.text || currentContent;
  }
}

export const gemini = new GeminiService();
