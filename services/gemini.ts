import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMenuDescription = async (itemName: string, ingredients: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Write a sophisticated, mouth-watering description for a cafe menu item named "${itemName}" containing these ingredients: ${ingredients}. Keep it under 25 words. Tone: Artisanal, premium.`;
    
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "A delicious artisanal creation.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Freshly prepared with the finest ingredients.";
  }
};

export const analyzeContactMessage = async (message: string): Promise<{ sentiment: string; priority: string }> => {
  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model,
      contents: `Analyze this customer message: "${message}". Return JSON with 'sentiment' (Positive, Neutral, Negative) and 'priority' (High, Normal, Low).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                sentiment: { type: Type.STRING },
                priority: { type: Type.STRING }
            }
        }
      }
    });
    
    const text = response.text;
    if (text) {
        return JSON.parse(text);
    }
    return { sentiment: 'Neutral', priority: 'Normal' };

  } catch (error) {
    console.error("Error analyzing message:", error);
    return { sentiment: 'Neutral', priority: 'Normal' };
  }
};