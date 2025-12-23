
import { Post, Project, CurriculumItem } from './types';

const AUTHOR_LOC = {
  name: 'Phạm Chí Lộc',
  avatar: 'https://picsum.photos/seed/phamchiloc/100/100'
};

const LONG_CONTENT_JS_HOISTING = `
### Lời mở đầu: Tại sao chúng ta vẫn nói về Hoisting năm 2025?
Chào các bạn, tôi là Lộc. Trong suốt gần một thập kỷ làm việc với JavaScript, từ thời jQuery cho đến khi Next.js thống trị, có một câu hỏi mà tôi luôn gặp trong mọi buổi phỏng vấn Senior: "Giải thích cơ chế Hoisting". Nhiều bạn nghĩ đây là kiến thức "vỡ lòng", nhưng tin tôi đi, hiểu sai về nó chính là nguồn gốc của 70% các bug liên quan đến logic biến mà bạn phải thức đêm để fix.

Hôm nay, tôi sẽ chia sẻ với bạn không chỉ là lý thuyết suông, mà là cách JavaScript Engine thực sự "vận hành" dưới nắp capo.

### 1. Sự thật về Hoisting - Không phải là "di chuyển mã nguồn"
Hầu hết các tài liệu (ngay cả một số trang lớn) đều mô tả Hoisting là việc JavaScript Engine "nhấc" các khai báo biến lên đầu file. Đây là một cách giải thích mang tính trừu tượng để dễ hiểu, nhưng về mặt kỹ thuật, nó hoàn toàn sai.

Khi bạn chạy một đoạn mã JavaScript, Engine không hề thay đổi vị trí code của bạn. Thay vào đó, nó thực hiện qua **hai giai đoạn**:

#### Giai đoạn 1: Compilation Phase (Giai đoạn Biên dịch/Khởi tạo)
Trong giai đoạn này, Engine sẽ quét qua toàn bộ mã nguồn. Khi nó thấy các từ khóa như \`var\`, \`function\`, \`let\`, \`const\`, nó sẽ dành riêng một vùng nhớ cho chúng trong một cấu trúc dữ liệu gọi là **Lexical Environment**. 
- Với \`function\`, toàn bộ nội dung hàm được lưu trữ.
- Với \`var\`, nó được cấp bộ nhớ và gán giá trị mặc định là \`undefined\`.
- Với \`let\` và \`const\`, nó cũng được cấp bộ nhớ nhưng **không được khởi tạo giá trị**.

#### Giai đoạn 2: Execution Phase (Giai đoạn Thực thi)
Đây là lúc code của bạn bắt đầu chạy từ trên xuống dưới. Vì các hàm đã được lưu trữ toàn bộ từ giai đoạn 1, bạn có thể gọi hàm trước khi khai báo nó. Nhưng với biến, câu chuyện lại khác.

### 2. Temporal Dead Zone (TDZ) - Cơn ác mộng của Junior
Hãy nói về \`let\` và \`const\`. Tại sao khi bạn truy cập một biến \`let\` trước khi khai báo, bạn lại nhận lỗi \`ReferenceError\` thay vì \`undefined\` như \`var\`? 

Đó là vì **Temporal Dead Zone**. Biến đó thực sự đã được Hoisting, nhưng nó nằm trong trạng thái "chưa được khởi tạo". Khoảng cách từ đầu block cho đến dòng khai báo biến chính là vùng chết. Nếu bạn chạm vào nó, ứng dụng của bạn sẽ "crash". 

**Lời khuyên của Lộc:** Đừng bao giờ cố gắng tận dụng Hoisting cho biến. Hãy luôn khai báo biến ở đầu phạm vi sử dụng để code luôn minh bạch.

### 3. Kinh nghiệm thực chiến: Var vs Let vs Const
Trong các dự án lớn tại các tập đoàn mà tôi từng tham gia, chúng tôi có một quy tắc ESlint cực kỳ nghiêm ngặt: **CẤM SỬ DỤNG VAR**.

Tại sao? 
Vì \`var\` không có block scope (phạm vi khối). Nó chỉ có function scope. Điều này dẫn đến việc biến của bạn có thể "rò rỉ" ra ngoài các vòng lặp \`for\` hoặc câu lệnh \`if\`, gây ra những thay đổi dữ liệu không mong muốn mà bạn không thể kiểm soát được.

### 4. Hoisting với Function Expression và Arrow Function
Đây là lỗi phổ biến nhất. 
\`\`\`javascript
sayHello(); // Chạy bình thường
function sayHello() { console.log("Hi!"); }

sayHi(); // LỖI: sayHi is not a function
var sayHi = () => { console.log("Hi again!"); }
\`\`\`
Tại sao? Vì khi dùng \`var\`, \`sayHi\` được hoisting dưới dạng một biến có giá trị \`undefined\`. Bạn không thể thực thi một \`undefined\` như một hàm. 

### 5. Kết luận cho hành trình Senior của bạn
Hiểu về Hoisting không phải để bạn viết code "ảo diệu" bằng cách gọi hàm lung tung. Hiểu để bạn biết **tại sao** lỗi xảy ra và **làm thế nào** để viết code an toàn hơn. 

**Bài tập về nhà cho bạn:** Hãy thử giải thích tại sao trong một vòng lặp \`for\` sử dụng \`var\`, tất cả các \`setTimeout\` đều in ra cùng một giá trị cuối cùng, còn dùng \`let\` thì lại in ra đúng thứ tự? Nếu bạn trả lời được câu hỏi này, bạn đã thực sự làm chủ được Scope và Hoisting.

Hãy tiếp tục học tập, vì lập trình không chỉ là gõ phím, đó là tư duy về cách hệ thống vận hành. 
Chúc bạn thành công!
`;

const LONG_CONTENT_JAVA_THREADS = `
### Mở đầu: Cuộc cách mạng âm thầm trong Java 21
Chào anh em lập trình viên Backend, tôi là Phạm Chí Lộc. Nếu bạn đã từng quản lý các hệ thống High-Concurrency (xử lý đồng thời cao), bạn chắc chắn đã từng đau đầu với bài toán tối ưu Thread Pool. Chúng ta từng phải cân đo đong đếm từng MB RAM vì mỗi Thread của hệ điều hành (OS Thread) tiêu tốn khoảng 1MB bộ nhớ.

Nhưng với sự ra đời của **Virtual Threads** (Project Loom) trong Java 21, mọi quy tắc cũ đã bị phá vỡ. Hôm nay tôi sẽ phân tích sâu tại sao đây là bước ngoặt lớn nhất của Java trong thập kỷ qua.

### 1. Platform Threads vs Virtual Threads: Sự khác biệt bản chất
Trước Java 19/21, mỗi \`java.lang.Thread\` là một wrapper xung quanh một luồng của hệ điều hành. Nếu bạn tạo 1000 Thread, OS phải quản lý 1000 luồng thực sự. Điều này dẫn đến giới hạn về khả năng mở rộng (Scalability).

**Virtual Threads** thì khác. Chúng là những luồng "nhẹ cân" (lightweight) được quản lý bởi Java Virtual Machine (JVM), không phải OS. JVM sẽ chạy hàng triệu Virtual Threads trên một số lượng rất nhỏ Platform Threads.

### 2. Cơ chế "Mounting" và "Unmounting"
Đây là phần thú vị nhất. Khi một Virtual Thread thực hiện một tác vụ Blocking IO (như truy vấn Database hoặc gọi API bên ngoài), JVM sẽ không để luồng đó đứng chờ. 
- Nó thực hiện **Unmount**: Nhấc trạng thái của Virtual Thread đó ra khỏi Platform Thread và lưu vào Heap Memory.
- Platform Thread đó ngay lập tức trống chỗ để chạy một Virtual Thread khác.
- Khi dữ liệu IO quay về, JVM lại **Mount** Virtual Thread đó trở lại để tiếp tục xử lý.

Kết quả? Bạn có thể xử lý hàng triệu request đồng thời mà không cần một server "khủng".

### 3. Bài học thực chiến: Đừng dùng Thread Pool cho Virtual Threads!
Đây là sai lầm phổ biến nhất của các bạn Senior khi mới chuyển sang Java 21. Chúng ta đã quá quen với \`ExecutorService\` và việc giới hạn số lượng Thread để tránh tràn bộ nhớ.

Với Virtual Threads, việc tạo mới một luồng rẻ đến mức bạn không cần Pool nữa. Cứ mỗi task, hãy tạo một luồng mới:
\`\`\`java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> {
        // Xử lý logic tại đây
    });
}
\`\`\`
Việc pooling Virtual Threads thậm chí còn làm chậm hệ thống vì nó tiêu tốn tài nguyên quản lý không cần thiết.

### 4. Khi nào Virtual Threads không giúp ích gì?
Đừng nghĩ Virtual Threads là "viên đạn bạc". Nếu ứng dụng của bạn thuần túy là tính toán nặng (CPU Bound) như mã hóa video hay xử lý ma trận, Virtual Threads sẽ không nhanh hơn Platform Threads. Nó chỉ thực sự tỏa sáng trong các ứng dụng Web/Microservices vốn dành 90% thời gian để chờ IO.

### 5. Lời khuyên của Lộc cho các dự án hiện đại
Nếu bạn đang bắt đầu một dự án Spring Boot 3.2+ mới, hãy bật tính năng Virtual Threads ngay lập tức trong cấu hình. Nó sẽ giúp hệ thống của bạn chịu tải tốt hơn gấp nhiều lần mà không cần thay đổi logic code.

Lập trình là sự tiến hóa không ngừng. Đừng để kiến thức cũ kìm hãm khả năng sáng tạo của bạn. 

Hẹn gặp lại các bạn trong những bài chia sẻ sâu hơn về hệ thống phân tán!
`;

const LONG_CONTENT_CAREER_CV = `
### Lời mở đầu: CV của bạn chỉ có 6 giây để tỏa sáng
Chào các bạn, tôi là Lộc. Với vai trò là một Lead Engineer và từng tham gia phỏng vấn hàng trăm ứng viên từ Intern đến Senior, tôi nhận thấy một sự thật đau lòng: Nhiều bạn cực kỳ giỏi kỹ thuật nhưng lại bị loại ngay từ vòng gửi xe chỉ vì một bản CV hời hợt.

Nhà tuyển dụng chỉ mất trung bình 6 giây để quyết định xem có nên đọc tiếp CV của bạn hay không. Hôm nay, tôi sẽ chỉ cho bạn cách biến 6 giây đó thành một lời mời phỏng vấn.

### 1. Tư duy "Impact" thay vì "Task"
Sai lầm lớn nhất của 90% Developer là liệt kê công việc theo kiểu:
- "Viết code Java Spring Boot."
- "Thiết kế giao diện bằng React."

Điều này không nói lên giá trị của bạn. Hãy chuyển sang tư duy **Impact (Tác động)**:
- "Tối ưu hóa query Database giúp giảm thời gian phản hồi API từ 2s xuống còn 200ms."
- "Xây dựng hệ thống CI/CD giúp giảm thời gian deploy từ 1 tiếng xuống còn 5 phút."

Con số luôn có sức nặng hơn lời nói. Hãy dùng các số liệu cụ thể (%, ms, $, users).

### 2. Cấu trúc CV chuẩn cho năm 2025
Đừng dùng các mẫu CV quá màu mè với các thanh phần trăm kỹ năng (ví dụ: Java 80%). Không ai đo đếm được 80% Java là như thế nào cả. 

Cấu trúc lý tưởng:
1. **Header:** Thông tin liên hệ, GitHub, LinkedIn (Bắt buộc phải có).
2. **Summary:** 3 dòng tóm tắt giá trị lớn nhất bạn mang lại.
3. **Experience:** Liệt kê từ gần nhất trở về trước. Tập trung vào dự án thực tế.
4. **Skills:** Liệt kê công nghệ theo nhóm (Languages, Frameworks, Tools).
5. **Projects:** Nơi để các bạn Junior "khoe" tài năng nếu chưa có nhiều kinh nghiệm đi làm.

### 3. Bí mật về hệ thống ATS (Applicant Tracking System)
Các công ty lớn hiện nay đều dùng phần mềm để lọc CV tự động. Nếu CV của bạn không có các từ khóa (Keywords) mà mô tả công việc (JD) yêu cầu, nó sẽ bị loại trước khi đến tay con người.

**Mẹo của Lộc:** Hãy đọc kỹ JD, chọn ra 5-10 kỹ năng quan trọng nhất và khéo léo lồng ghép chúng vào phần kinh nghiệm của bạn.

### 4. Hãy là một "T-shaped" Developer
Nhà tuyển dụng không chỉ tìm người biết viết code. Họ tìm người biết giải quyết vấn đề. Hãy thể hiện rằng bạn có kiến thức sâu về một mảng (ví dụ: Backend Java) nhưng cũng có hiểu biết rộng về Frontend, DevOps và tư duy sản phẩm.

### 5. Lời nhắn nhủ từ Mentor
Một bản CV tốt không phải là bản CV dài nhất, mà là bản CV phù hợp nhất. Hãy dành thời gian chỉnh sửa CV cho từng vị trí bạn ứng tuyển thay vì gửi một bản duy nhất cho 100 công ty.

Chúc bạn sớm nhận được cuộc gọi mời phỏng vấn cho vị trí mơ ước!
`;

const generateLessonContent = (title: string): string => {
  return `### Bài giảng chi tiết: ${title}\n\n
Nội dung bài học này được thiết kế dựa trên giáo trình thực chiến của Phạm Chí Lộc. Chúng ta sẽ không chỉ học cú pháp, mà học cách áp dụng nó vào các dự án thực tế.\n\n
**1. Tại sao cần học nội dung này?**\n
Trong môi trường doanh nghiệp, kiến thức về ${title} là bắt buộc để bạn có thể tham gia vào các module cốt lõi của hệ thống. Hiểu rõ nó giúp bạn tránh được các lỗi logic sơ đẳng và nâng cao hiệu suất làm việc.\n\n
**2. Chi tiết kỹ thuật & Sơ đồ vận hành**\n
Chúng ta sẽ đi qua các bước:
- Phân tích yêu cầu bài toán.
- Thiết kế cấu trúc dữ liệu tối ưu.
- Triển khai code mẫu và tối ưu hóa vòng lặp.
- Unit Test để đảm bảo chất lượng đầu ra.\n\n
**3. Lời khuyên từ kinh nghiệm thực tế**\n
Tôi đã từng gặp trường hợp hệ thống sập chỉ vì thiếu một dòng check null ở phần này. Do đó, hãy luôn cẩn thận với từng dòng code bạn viết ra.\n\n
**4. Kết luận**\n
Hãy thực hành ít nhất 3 lần với các ví dụ khác nhau để biến kiến thức này thành của riêng bạn.`;
};

const createCurriculum = (prefix: string, topics: string[]): CurriculumItem[] => {
  return topics.map((topic, index) => ({
    id: index + 1,
    title: topic,
    description: `Nghiên cứu sâu về ${topic.toLowerCase()} dưới góc nhìn chuyên gia.`,
    content: generateLessonContent(topic)
  }));
};

export const BLOG_POSTS: Post[] = [
  {
    id: 'js-1',
    title: 'Giải mã cơ chế Hoisting trong JavaScript từ A-Z',
    excerpt: 'Bài chia sẻ hơn 2000 chữ về cách JavaScript Engine thực sự vận hành bên dưới lớp vỏ cú pháp.',
    content: LONG_CONTENT_JS_HOISTING,
    date: '01 Tháng 12, 2024',
    category: 'JavaScript',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=800',
    author: AUTHOR_LOC
  },
  {
    id: 'java-1',
    title: 'Java 21 Virtual Threads: Kỷ nguyên mới của xử lý song song',
    excerpt: 'Phân tích sâu sắc về Project Loom và cách nó thay đổi cuộc chơi Backend hiện đại.',
    content: LONG_CONTENT_JAVA_THREADS,
    date: '20 Tháng 01, 2025',
    category: 'Java',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    author: AUTHOR_LOC
  },
  {
    id: 'career-1',
    title: 'Làm sao để viết CV IT thu hút nhà tuyển dụng 2025?',
    excerpt: 'Bí quyết để CV của bạn lọt vào mắt xanh của các tập đoàn công nghệ lớn trong 6 giây.',
    content: LONG_CONTENT_CAREER_CV,
    date: '01 Tháng 03, 2025',
    category: 'Sự nghiệp',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
    author: AUTHOR_LOC
  },
  ...Array.from({ length: 47 }).map((_, i) => ({
    id: `post-${i}`,
    title: i % 2 === 0 ? `Làm chủ kỹ năng Backend chuyên sâu bài số ${i+1}` : `Bí quyết JavaScript thực chiến bài số ${i+1}`,
    excerpt: `Một bài luận sâu sắc về hành trình chinh phục công nghệ của Phạm Chí Lộc dành cho cộng đồng.`,
    content: `### Lời mở đầu\nChào các bạn, đây là nội dung chi tiết của bài viết số ${i+1} trong chuỗi series chia sẻ kiến thức của tôi. \n\nTrong bài viết này, chúng ta sẽ cùng nhau khám phá những khía cạnh ít người biết đến của công nghệ ${i % 2 === 0 ? 'Java' : 'JavaScript'}. \n\n### Nội dung chính\nLập trình không chỉ là việc gõ những dòng lệnh khô khan, mà là nghệ thuật giải quyết vấn đề. Khi đối mặt với một bài toán khó, điều đầu tiên tôi làm không phải là mở máy tính lên ngay, mà là cầm tờ giấy và cây bút để vẽ ra luồng dữ liệu. \n\nSự khác biệt giữa một Senior và một Junior nằm ở khả năng dự đoán trước những rủi ro có thể xảy ra. Trong hàng ngàn dòng code, chỉ cần một sai sót nhỏ ở phần quản lý bộ nhớ cũng có thể làm tiêu tốn hàng ngàn đô la tài nguyên cloud của công ty. \n\n### Lời khuyên thực chiến\nTôi luôn khuyên các bạn trẻ hãy học chắc nền tảng (Base). Đừng chạy theo các Framework hào nhoáng khi bạn chưa hiểu rõ cách ngôn ngữ đó hoạt động. Framework có thể lỗi thời sau 2-3 năm, nhưng tư duy lập trình và hiểu biết về cấu trúc dữ liệu sẽ đi theo bạn suốt đời. \n\nHy vọng bài viết này mang lại cho bạn một góc nhìn mới mẻ hơn về công việc chúng ta đang làm hàng ngày. Chúc các bạn luôn giữ vững đam mê!`,
    date: '2025',
    category: i % 2 === 0 ? 'Java' : 'JavaScript',
    image: `https://picsum.photos/seed/blog-${i}/800/500`,
    author: AUTHOR_LOC
  }))
];

export const PROJECTS: Project[] = [
  {
    id: 'course-js-basic',
    title: 'JavaScript Masterclass: Foundation (40 Bài)',
    description: 'Lộ trình từ con số 0 đến khi làm chủ JavaScript thuần và tương tác DOM hiệu quả.',
    tech: ['ES6+', 'DOM', 'Algorithms'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=600',
    curriculum: createCurriculum('js-b', [
      "Bài 1: Tổng quan về JavaScript & Cách trình duyệt thực thi mã", "Bài 2: Thiết lập môi trường: VS Code, Node.js & Debugger", "Bài 3: Khai báo biến: Phân tích sâu var, let, const", "Bài 4: Kiểu dữ liệu Primitive vs Reference", "Bài 5: Các toán tử số học và gán nâng cao", "Bài 6: Chuỗi và Template Literals trong ES6", "Bài 7: Câu lệnh điều kiện if/else & Toán tử 3 ngôi", "Bài 8: Logic Switch-Case và khi nào nên sử dụng", "Bài 9: Khái niệm Falsy và Truthy trong thực tế", "Bài 10: Vòng lặp For truyền thống & Các lỗi thường gặp", "Bài 11: Vòng lặp While & Do-While", "Bài 12: Hàm (Function Declaration) & Tham số mặc định", "Bài 13: Function Expression & Sự khác biệt với Declaration", "Bài 14: Arrow Function: Cú pháp và Context", "Bài 15: Scope trong JS: Global, Local, Block Scope", "Bài 16: Hoisting: Cách Engine quản lý bộ nhớ giai đoạn đầu", "Bài 17: Giới thiệu về Mảng (Array) & Chỉ mục", "Bài 18: Các phương thức mảng cơ bản: push, pop, shift, unshift", "Bài 19: Làm việc với Object: Properties & Methods", "Bài 20: Duyệt Object với for...in & Object.keys", "Bài 21: Array Destructuring & Spread Operator", "Bài 22: Object Destructuring nâng cao", "Bài 23: Vòng lặp for...of & Cơ chế Iterator", "Bài 24: Higher Order Functions: Giới thiệu sơ lược", "Bài 25: Phương thức Map: Biến đổi dữ liệu mảng", "Bài 26: Phương thức Filter: Lọc dữ liệu thông minh", "Bài 27: Phương thức Reduce: Tích lũy dữ liệu phức tạp", "Bài 28: DOM là gì? Cách duyệt cây DOM", "Bài 29: Truy vấn phần tử: getElementById vs querySelector", "Bài 30: Thay đổi thuộc tính và Class qua JS", "Bài 31: Xử lý sự kiện (Event Listener) cơ bản", "Bài 32: Event Bubbling & Capturing", "Bài 33: Làm việc với Form và Validation", "Bài 34: LocalStorage & SessionStorage", "Bài 35: Giới thiệu về JSON & Chuyển đổi dữ liệu", "Bài 36: Xử lý lỗi với try...catch", "Bài 37: Strict Mode & Tại sao nên dùng", "Bài 38: Kỹ thuật viết code sạch (Clean Code JS)", "Bài 39: Project 1: Xây dựng ứng dụng To-Do List hoàn chỉnh", "Bài 40: Tổng kết lộ trình cơ bản & Kiểm tra năng lực"
    ])
  },
  {
    id: 'course-java-basic',
    title: 'Java Core: The Foundation (40 Bài)',
    description: 'Xây dựng tư duy hướng đối tượng vững chắc với ngôn ngữ Java hiện đại.',
    tech: ['Java 17+', 'OOP', 'Logic'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
    curriculum: createCurriculum('java-b', [
      "Bài 1: Lịch sử Java & Cài đặt JDK/IntelliJ", "Bài 2: Cơ chế thực thi: JVM, JRE, JDK", "Bài 3: Cấu trúc một chương trình Java chuẩn", "Bài 4: Biến và Hằng số (final keyword)", "Bài 5: Kiểu dữ liệu số: byte, short, int, long, float, double", "Bài 6: Kiểu dữ liệu Boolean và Char", "Bài 7: Ép kiểu (Casting): Implicit vs Explicit", "Bài 8: Toán tử số học và toán tử gán", "Bài 9: Toán tử logic và so sánh", "Bài 10: Cấu trúc If-Else & If-Else If", "Bài 11: Switch-Case truyền thống vs Switch Expression", "Bài 12: Vòng lặp For & Kỹ thuật điều khiển", "Bài 13: Vòng lặp While & Do-While", "Bài 14: Lệnh Break, Continue & Labels", "Bài 15: Mảng 1 chiều: Khai báo và khởi tạo", "Bài 16: Mảng đa chiều & Cách duyệt mảng", "Bài 17: String trong Java: Immutable & String Pool", "Bài 18: StringBuilder & StringBuffer: Khi nào nên dùng?", "Bài 19: Phương thức (Method): Định nghĩa và Gọi", "Bài 20: Tham số và Giá trị trả về", "Bài 21: Method Overloading: Nạp chồng phương thức", "Bài 22: OOP: Khái niệm Lớp (Class) và Đối tượng (Object)", "Bài 23: Thuộc tính (Field) & Constructor", "Bài 24: Từ khóa 'this' & Constructor Chaining", "Bài 25: Access Modifiers: Public, Private, Protected, Default", "Bài 26: Encapsulation: Tính đóng gói và Getter/Setter", "Bài 27: Inheritance: Kế thừa và từ khóa 'extends'", "Bài 28: Từ khóa 'super' & Cách gọi Constructor cha", "Bài 29: Method Overriding: Ghi đè phương thức", "Bài 30: Tính đa hình (Polymorphism) trong Java", "Bài 31: Abstract Class: Lớp trừu tượng", "Bài 32: Interface: Bản thiết kế hành vi", "Bài 33: So sánh Abstract Class vs Interface", "Bài 34: Static keyword: Biến và Phương thức tĩnh", "Bài 35: Wrapper Classes: Autoboxing & Unboxing", "Bài 36: Xử lý ngoại lệ: Try-Catch-Finally", "Bài 37: Throw vs Throws: Ném ngoại lệ", "Bài 38: ArrayList: Làm quen với Collections", "Bài 39: Project 1: Hệ thống quản lý học sinh (Console)", "Bài 40: Tổng kết Java Core & Ôn tập phỏng vấn"
    ])
  }
];
