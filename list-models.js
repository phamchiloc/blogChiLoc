import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAgPX-W1rGoXRPg9jyxryEvKGArB3NtHGk";
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    console.log("📋 Đang lấy danh sách models có sẵn...\n");
    
    const models = await genAI.listModels();
    
    console.log(`Tìm thấy ${models.length} models:\n`);
    
    models.forEach((model, index) => {
      console.log(`${index + 1}. ${model.name}`);
      console.log(`   Display Name: ${model.displayName}`);
      console.log(`   Supported Methods: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
      console.log('');
    });
    
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách models:", error.message);
    console.log("\n⚠️ Có thể:");
    console.log("1. API key đã hết hạn");
    console.log("2. API key không hợp lệ");
    console.log("3. Cần tạo API key mới tại: https://makersuite.google.com/app/apikey");
  }
}

listModels();
