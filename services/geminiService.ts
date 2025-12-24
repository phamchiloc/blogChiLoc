
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService {
  private static instance: GeminiService;
  private genAI: GoogleGenerativeAI;

  private constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    if (!apiKey) {
      console.error('Gemini API key không tồn tại!');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async deepDivePost(title: string, category: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `Bạn là Phạm Chí Lộc, một chuyên gia lập trình với 10 năm kinh nghiệm. 
        Hãy viết một bài luận cực kỳ chi tiết, tâm huyết và sâu sắc về chủ đề: "${title}" thuộc lĩnh vực ${category}.
        Yêu cầu:
        1. Độ dài tối thiểu 1500 chữ.
        2. Chia thành các mục rõ ràng (Sử dụng Markdown: ### Tiêu đề mục).
        3. Văn phong: Chia sẻ, Mentor, truyền cảm hứng nhưng cực kỳ chính xác về kỹ thuật.
        4. Có các ví dụ thực tế và bài học xương máu (Career advice).
        5. Kết bài bằng một thông điệp ý nghĩa cho người mới học.
        
        Nội dung bắt đầu từ lời chào thân mật của Lộc.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text() || "Không thể khởi tạo nội dung sâu sắc lúc này.";
    } catch (error) {
      console.error("Lỗi Deep Dive:", error);
      return "Tính năng Deep Dive đang bảo trì. Vui lòng thử lại sau.";
    }
  }

  public async summarizePost(content: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `Hãy tóm tắt bài viết này cho bạn đọc của blog Phạm Chí Lộc trong 2 câu ngắn gọn: \n\n${content}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text() || "Không thể tạo bản tóm tắt.";
    } catch (error) {
      console.error("Lỗi tóm tắt:", error);
      return "Lỗi tóm tắt.";
    }
  }

  public async chat(message: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: "Bạn là Phạm Chí Lộc. Trả lời bằng văn phong của một người anh, một người thầy chia sẻ kiến thức lập trình."
      });
      
      const result = await model.generateContent(message);
      const response = await result.response;
      return response.text() || "Xin lỗi, tôi không thể xử lý yêu cầu này.";
    } catch (error) {
      console.error("Lỗi chat:", error);
      if (error instanceof Error) {
        return `Lỗi: ${error.message}. Vui lòng kiểm tra API key hoặc thử lại sau.`;
      }
      return "Đã xảy ra sự cố. Vui lòng kiểm tra API key trong file .env.local";
    }
  }

  // Streaming chat với callback
  public async chatStream(
    message: string, 
    onChunk: (text: string) => void,
    chatHistory: Array<{role: string, parts: Array<{text: string}>}> = []
  ): Promise<void> {
    try {
      const model = this.genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: `Bạn là Phạm Chí Lộc, một lập trình viên với 10 năm kinh nghiệm.
Trả lời bằng văn phong thân thiện, dễ hiểu như một người anh/thầy chia sẻ kiến thức.
Sử dụng Markdown để format code và nội dung.
Nếu có code, hãy đặt trong code block với syntax highlighting.
Giải thích rõ ràng, có ví dụ cụ thể.`
      });
      
      // Tạo chat session với history
      const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.9,
        },
      });

      const result = await chat.sendMessageStream(message);
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        onChunk(chunkText);
      }
    } catch (error) {
      console.error("Lỗi streaming chat:", error);
      if (error instanceof Error) {
        onChunk(`\n\n❌ Lỗi: ${error.message}`);
      } else {
        onChunk('\n\n❌ Đã xảy ra sự cố. Vui lòng thử lại.');
      }
    }
  }
}
