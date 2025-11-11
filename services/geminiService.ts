
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development. In a real environment, the key would be set.
  console.warn("API_KEY environment variable not set. Using a placeholder. App will not function correctly.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "YOUR_API_KEY_HERE" });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        intent: { type: Type.STRING, description: "The user's intent, e.g., create_invoice, list_invoices." },
        confidence: { type: Type.NUMBER, description: "A confidence score from 0 to 1." },
        slots: { type: Type.OBJECT, description: "A map of extracted entities from the user's message." },
        reply_text: { type: Type.STRING, description: "A natural language response to the user." },
        requires_confirmation: { type: Type.BOOLEAN, description: "True if the action needs user confirmation." },
        actions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    type: { type: Type.STRING, description: "The type of action to perform, e.g., create_invoice." },
                    confidence: { type: Type.NUMBER },
                    payload: { type: Type.OBJECT, description: "Data required to execute the action." },
                },
                required: ["type", "payload"]
            },
        },
    },
    required: ["intent", "reply_text", "requires_confirmation"],
};

export const getChatbotResponse = async (message: string, context: { company_name: string }): Promise<GeminiResponse> => {
    
    const systemInstruction = `Você é um assistente para um sistema de faturação chamado Clique 360.
    Recebe mensagens de um usuário que está autenticado para a empresa "${context.company_name}".
    Sua tarefa é interpretar a mensagem do usuário, extrair as informações relevantes (entidades/slots) e determinar a intenção do usuário.
    Responda em JSON puro, aderindo estritamente ao schema fornecido.
    - Se a intenção for criar um documento (como uma fatura), sempre defina 'requires_confirmation' como true.
    - Se faltarem dados críticos para uma ação (ex: nome do cliente para uma fatura), sua 'reply_text' deve ser uma pergunta para obter a informação que falta.
    - A 'reply_text' deve ser amigável e concisa. Resuma o que você entendeu e peça confirmação se necessário.
    - Não invente dados. Use apenas as informações fornecidas na mensagem do usuário.
    - O idioma de resposta deve ser Português de Portugal.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: `User message: "${message}"`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.2
            }
        });

        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText) as GeminiResponse;
        
        // Ensure actions array is not null/undefined
        if (!parsedResponse.actions) {
            parsedResponse.actions = [];
        }

        return parsedResponse;

    } catch (error) {
        console.error("Gemini API call failed:", error);
        // Fallback response in case of API error
        return {
            reply_text: "Ocorreu um erro ao comunicar com o assistente. Por favor, tente novamente.",
            actions: [],
            requires_confirmation: false,
            intent: 'error',
            slots: {}
        };
    }
};
