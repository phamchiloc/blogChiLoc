
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          <div>
            <h1 className="text-5xl font-bold text-slate-900 mb-8">Xin chào, tôi là <br /><span className="text-indigo-600">Phạm Chí Lộc.</span></h1>
            
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Tôi là một sinh viên ngành <strong className="text-slate-900">Công nghệ Thông tin</strong>, sinh năm 2004, hiện đang theo học tại lớp <strong className="text-indigo-600">22DTHE4</strong> với MSSV <strong className="text-indigo-600">2280601823</strong>. Với niềm đam mê mãnh liệt về công nghệ và lập trình, tôi không ngừng học hỏi và trau dồi kỹ năng để trở thành một lập trình viên chuyên nghiệp.
              </p>

              <p>
                Hành trình lập trình của tôi bắt đầu từ những dòng code JavaScript đầu tiên, và giờ đây tôi đã mở rộng sang nhiều công nghệ khác như <strong>React</strong>, <strong>Node.js</strong>, <strong>Java Spring Boot</strong>, và <strong>SQL Server</strong>. Mỗi dự án, mỗi dòng code đều là một bài học quý giá giúp tôi trưởng thành hơn trong nghề.
              </p>

              <p>
                Blog này được tôi tạo ra như một <strong className="text-slate-900">thư viện số cá nhân</strong>, nơi tôi lưu trữ những kinh nghiệm thực chiến, các bài viết chuyên sâu về kỹ thuật, và những dự án mà tôi đã từng làm. Tôi tin rằng việc <strong>chia sẻ kiến thức</strong> không chỉ giúp người khác mà còn giúp bản thân tôi hiểu sâu hơn về những gì mình đã học.
              </p>

              <p>
                Ngoài lập trình, tôi còn quan tâm đến <strong>trí tuệ nhân tạo (AI)</strong> và cách ứng dụng nó vào các giải pháp thực tế. Tôi thường xuyên tìm hiểu về các công nghệ mới, tham gia các dự án nhóm, và không ngừng thử nghiệm những ý tưởng sáng tạo của mình.
              </p>

              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-xl">
                <p className="text-indigo-900 font-medium">
                  <strong>Mục tiêu nghề nghiệp:</strong> Trở thành một <strong>Full-stack Developer</strong> có khả năng xây dựng các ứng dụng web hiện đại, mang lại giá trị thực tế cho cộng đồng và doanh nghiệp tại Việt Nam.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">📋 Thông tin cá nhân</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎂</span>
                  <div>
                    <p className="text-sm text-slate-500">Sinh năm</p>
                    <p className="font-bold text-indigo-600">2004</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <p className="text-sm text-slate-500">Lớp</p>
                    <p className="font-bold text-indigo-600">22DTHE4</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🆔</span>
                  <div>
                    <p className="text-sm text-slate-500">Mã số sinh viên</p>
                    <p className="font-bold text-indigo-600">2280601823</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💻</span>
                  <div>
                    <p className="text-sm text-slate-500">Chuyên ngành</p>
                    <p className="font-bold text-indigo-600">Công nghệ Thông tin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">💡 Kỹ năng & Công nghệ</h2>
              <p className="text-slate-600 mb-6">
                Trong quá trình học tập và làm dự án, tôi đã tích lũy được kinh nghiệm với nhiều công nghệ và framework hiện đại:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'JavaScript', icon: '⚡', level: 'Thành thạo' },
                  { name: 'React', icon: '⚛️', level: 'Thành thạo' },
                  { name: 'Node.js', icon: '🟢', level: 'Khá' },
                  { name: 'Java', icon: '☕', level: 'Khá' },
                  { name: 'SQL Server', icon: '🗄️', level: 'Trung bình' },
                  { name: 'Git/GitHub', icon: '📦', level: 'Thành thạo' },
                ].map((skill, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-all hover:shadow-md">
                    <div className="text-2xl mb-2">{skill.icon}</div>
                    <h4 className="font-bold text-slate-900">{skill.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{skill.level}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">🎯 Mục tiêu & Định hướng</h2>
              <div className="space-y-4">
                {[
                  { 
                    title: 'Chia sẻ Kiến thức', 
                    desc: 'Viết các bài hướng dẫn chuyên sâu về JavaScript, React, Java và các công nghệ web hiện đại. Tôi mong muốn blog này trở thành nguồn tài liệu hữu ích cho sinh viên và những người mới bắt đầu học lập trình.',
                    icon: '📚'
                  },
                  { 
                    title: 'Phát triển Dự án Thực tế', 
                    desc: 'Xây dựng các ứng dụng web fullstack với React, Node.js và SQL Server. Tập trung vào việc giải quyết các vấn đề thực tế và tạo ra sản phẩm có giá trị cho người dùng.',
                    icon: '🚀'
                  },
                  { 
                    title: 'Học tập & Nghiên cứu AI', 
                    desc: 'Tìm hiểu về Machine Learning và các mô hình AI để ứng dụng vào việc tối ưu hóa quy trình làm việc, xây dựng chatbot thông minh và các công cụ hỗ trợ học tập.',
                    icon: '🤖'
                  },
                  { 
                    title: 'Đóng góp cho Cộng đồng', 
                    desc: 'Tham gia các dự án mã nguồn mở, giúp đỡ các bạn sinh viên trong quá trình học tập, và xây dựng một cộng đồng lập trình viên Việt Nam mạnh mẽ hơn.',
                    icon: '🤝'
                  },
                ].map((goal, i) => (
                  <div key={i} className="p-6 bg-gradient-to-br from-white to-indigo-50 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{goal.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-900 mb-2">{goal.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{goal.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-3">🌟 Châm ngôn của tôi</h3>
              <p className="text-lg leading-relaxed italic">
                "Học không có điểm dừng, mỗi dòng code là một bước tiến. Đừng ngại sai lầm, vì đó là cách tốt nhất để học hỏi và trưởng thành."
              </p>
            </div>
          </div>
        </div>

        <div className="sticky top-24">
          <div className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/phamchiloc-avatar/800/800" 
              alt="Phạm Chí Lộc" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/40">
              <p className="text-slate-900 font-medium italic mb-2">
                "Sinh viên ngành Công nghệ thông tin, đam mê học hỏi và chia sẻ kiến thức về lập trình."
              </p>
              <p className="text-sm font-bold text-indigo-600">— Phạm Chí Lộc • 22DTHE4</p>
            </div>
          </div>
          
          <div className="mt-10 flex gap-4 justify-center">
            {['GitHub', 'LinkedIn', 'Facebook'].map(platform => (
              <a key={platform} href="#" className="px-6 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white font-bold transition-all">
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
