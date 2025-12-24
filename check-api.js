async function checkAPIKey() {
  const apiKey = "AIzaSyAdhZVQotmnktFQ5zfFD2wOpljLkkv5RZc";
  
  console.log("🔍 Kiểm tra API key bằng cách gọi trực tiếp API...\n");
  
  try {
    // Kiểm tra list models
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    console.log("1. Đang lấy danh sách models...");
    const listResponse = await fetch(listUrl);
    
    if (!listResponse.ok) {
      console.log(`❌ Lỗi: ${listResponse.status} - ${listResponse.statusText}`);
      const error = await listResponse.text();
      console.log("Chi tiết:", error);
      console.log("\n⚠️ API key có thể đã hết hạn hoặc không hợp lệ!");
      console.log("Hãy tạo API key mới tại: https://aistudio.google.com/app/apikey");
      return;
    }
    
    const data = await listResponse.json();
    console.log("✅ API key hợp lệ!\n");
    console.log(`📋 Tìm thấy ${data.models?.length || 0} models:\n`);
    
    if (data.models) {
      data.models.forEach((model, index) => {
        if (model.supportedGenerationMethods?.includes('generateContent')) {
          console.log(`${index + 1}. ${model.name}`);
          console.log(`   Display: ${model.displayName}`);
          console.log(`   Methods: ${model.supportedGenerationMethods.join(', ')}`);
          console.log('');
        }
      });
    }
    
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
  }
}

checkAPIKey();
