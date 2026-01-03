
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeVideoContent = async (url: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `بصفتك خبيراً في محتوى الويب، قم بتحليل هذا الرابط (محاكاة): ${url}. 
      أعطني عنواناً جذاباً للفيديو، ووصفاً مختصراً، وقم بتلخيص المحتوى المتوقع في 3 نقاط أساسية. 
      اجعل الرد باللغة العربية حصراً وبتنسيق JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.ARRAY, items: { type: Type.STRING } },
            description: { type: Type.STRING },
            category: { type: Type.STRING }
          },
          required: ["title", "summary", "description", "category"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error analyzing video:", error);
    return null;
  }
};

export const getSmartRecommendations = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `اقترح 3 مواضيع مشابهة لهذا الموضوع: "${topic}" يمكن للمستخدم تحميل فيديوهات عنها.`,
    });
    return response.text;
  } catch (error) {
    return "لا توجد توصيات حالياً.";
  }
};
