import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAgPX-W1rGoXRPg9jyxryEvKGArB3NtHGk";
const genAI = new GoogleGenerativeAI(apiKey);

async function testAPI() {
  try {
    console.log("Đang kiểm tra API key và danh sách models...\n");
    
    // Test với gemini-pro
    console.log("Test 1: Thử model gemini-pro");
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent("Xin chào");
      const response = await result.response;
      console.log("✅ gemini-pro hoạt động!");
      console.log("Response:", response.text().substring(0, 100));
    } catch (e) {
      console.log("❌ gemini-pro không hoạt động:", e.message);
    }

    console.log("\n" + "=".repeat(50) + "\n");

    // Test với gemini-1.5-flash
    console.log("Test 2: Thử model gemini-1.5-flash");
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent("Xin chào");
      const response = await result.response;
      console.log("✅ gemini-1.5-flash hoạt động!");
      console.log("Response:", response.text().substring(0, 100));
    } catch (e) {
      console.log("❌ gemini-1.5-flash không hoạt động:", e.message);
    }

    console.log("\n" + "=".repeat(50) + "\n");

    // Test với models/gemini-1.5-flash
    console.log("Test 3: Thử model models/gemini-1.5-flash");
    try {
      const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
      const result = await model.generateContent("Xin chào");
      const response = await result.response;
      console.log("✅ models/gemini-1.5-flash hoạt động!");
      console.log("Response:", response.text().substring(0, 100));
    } catch (e) {
      console.log("❌ models/gemini-1.5-flash không hoạt động:", e.message);
    }

    console.log("\n" + "=".repeat(50) + "\n");

    // Test với gemini-1.5-pro
    console.log("Test 4: Thử model gemini-1.5-pro");
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent("Xin chào");
      const response = await result.response;
      console.log("✅ gemini-1.5-pro hoạt động!");
      console.log("Response:", response.text().substring(0, 100));
    } catch (e) {
      console.log("❌ gemini-1.5-pro không hoạt động:", e.message);
    }

  } catch (error) {
    console.error("❌ Lỗi chung:", error.message);
    console.log("\n⚠️ API key có thể đã hết hạn hoặc không hợp lệ!");
  }
}

testAPI();
