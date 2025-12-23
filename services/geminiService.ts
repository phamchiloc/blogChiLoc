
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private static instance: GeminiService;
  private ai: GoogleGenAI;

  private constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE';
    this.ai = new GoogleGenAI({ apiKey });
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async deepDivePost(title: string, category: string): Promise<string> {
    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview', // Dùng bản Pro cho nội dung dài và sâu sắc
        contents: `Bạn là Phạm Chí Lộc, một chuyên gia lập trình với 10 năm kinh nghiệm. 
        Hãy viết một bài luận cực kỳ chi tiết, tâm huyết và sâu sắc về chủ đề: "${title}" thuộc lĩnh vực ${category}.
        Yêu cầu:
        1. Độ dài tối thiểu 1500 chữ.
        2. Chia thành các mục rõ ràng (Sử dụng Markdown: ### Tiêu đề mục).
        3. Văn phong: Chia sẻ, Mentor, truyền cảm hứng nhưng cực kỳ chính xác về kỹ thuật.
        4. Có các ví dụ thực tế và bài học xương máu (Career advice).
        5. Kết bài bằng một thông điệp ý nghĩa cho người mới học.
        
        Nội dung bắt đầu từ lời chào thân mật của Lộc.`,
        config: {
          temperature: 0.9,
          // maxOutputTokens không đặt để AI tự do viết dài
        }
      });
      return response.text || "Không thể khởi tạo nội dung sâu sắc lúc này.";
    } catch (error) {
      console.error("Lỗi Deep Dive:", error);
      return "Tính năng Deep Dive đang bảo trì. Vui lòng thử lại sau.";
    }
  }

  public async summarizePost(content: string): Promise<string> {
    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Hãy tóm tắt bài viết này cho bạn đọc của blog Phạm Chí Lộc trong 2 câu ngắn gọn: \n\n${content}`,
        config: { temperature: 0.7 }
      });
      return response.text || "Không thể tạo bản tóm tắt.";
    } catch (error) {
      return "Lỗi tóm tắt.";
    }
  }

  public async chat(message: string): Promise<string> {
    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: message,
        config: {
          systemInstruction: "Bạn là Phạm Chí Lộc. Trả lời bằng văn phong của một người anh, một người thầy chia sẻ kiến thức lập trình.",
          temperature: 0.8,
        }
      });
      return response.text || "Xin lỗi, tôi không thể xử lý yêu cầu này.";
    } catch (error) {
      return "Đã xảy ra sự cố.";
    }
  }
}
