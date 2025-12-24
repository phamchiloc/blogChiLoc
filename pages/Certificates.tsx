
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  skills: string[];
}

const certificates: Certificate[] = [
  {
    id: 'intro-cybersecurity',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    image: '/blogChiLoc/introduction-to-cybersecurity.png',
    description: 'Chứng chỉ về các khái niệm cơ bản của an ninh mạng, bao gồm bảo mật dữ liệu, mã hóa và các mối đe dọa trên mạng.',
    skills: ['Cybersecurity', 'Network Security', 'Data Protection', 'Threat Analysis']
  },
  {
    id: 'js-essentials-1',
    title: 'JavaScript Essentials 1',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    image: '/blogChiLoc/JavaScript_Essentials1.png',
    description: 'Nền tảng JavaScript từ cơ bản đến nâng cao, bao gồm cú pháp, kiểu dữ liệu, functions và DOM manipulation.',
    skills: ['JavaScript', 'ES6+', 'DOM Manipulation', 'Programming Fundamentals']
  },
  {
    id: 'js-essentials-2',
    title: 'JavaScript Essentials 2',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    image: '/blogChiLoc/javascript-essentials-2.png',
    description: 'JavaScript nâng cao với OOP, async programming, promises và modern JavaScript practices.',
    skills: ['Advanced JavaScript', 'OOP', 'Async/Await', 'ES6+ Features']
  },
  {
    id: 'networking-basics',
    title: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    image: '/blogChiLoc/Netwworking_basics.png',
    description: 'Kiến thức nền tảng về mạng máy tính, bao gồm TCP/IP, routing, switching và network protocols.',
    skills: ['Networking', 'TCP/IP', 'Network Protocols', 'Routing & Switching']
  }
];

const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
            Chứng chỉ & 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Thành tích</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Những chứng chỉ và khóa học tôi đã hoàn thành trong hành trình phát triển bản thân
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedCert(cert)}
              className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group border border-slate-200 hover:border-indigo-300 transition-all"
            >
              {/* Certificate Image */}
              <div className="relative h-64 bg-slate-100 overflow-hidden">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-white font-bold text-sm">Click để xem chi tiết →</span>
                  </div>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-2 text-slate-600 mb-3">
                  <span className="text-sm font-semibold">{cert.issuer}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-sm">{cert.date}</span>
                </div>
                <p className="text-slate-600 mb-4 line-clamp-2">
                  {cert.description}
                </p>
                
                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {cert.skills.slice(0, 3).map((skill, idx) => (
                    <span 
                      key={idx}
                      className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                      +{cert.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-indigo-600 mb-2">{certificates.length}</div>
              <div className="text-slate-600 font-semibold">Chứng chỉ</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-600 mb-2">
                {Array.from(new Set(certificates.flatMap(c => c.skills))).length}
              </div>
              <div className="text-slate-600 font-semibold">Kỹ năng</div>
            </div>
            <div>
              <div className="text-4xl font-black text-pink-600 mb-2">100%</div>
              <div className="text-slate-600 font-semibold">Hoàn thành</div>
            </div>
            <div>
              <div className="text-4xl font-black text-amber-600 mb-2">2024</div>
              <div className="text-slate-600 font-semibold">Năm đạt được</div>
            </div>
          </div>
        </motion.div>

        {/* Modal for Certificate Detail */}
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Close Button */}
              <div className="sticky top-0 bg-white/90 backdrop-blur-sm p-4 flex justify-between items-center border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900">{selectedCert.title}</h2>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Certificate Image */}
              <div className="p-8">
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.title}
                  className="w-full rounded-xl shadow-lg border border-slate-200"
                />
              </div>

              {/* Certificate Details */}
              <div className="px-8 pb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg font-bold text-slate-900">{selectedCert.issuer}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600">{selectedCert.date}</span>
                </div>
                
                <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                  {selectedCert.description}
                </p>

                <h3 className="text-xl font-bold text-slate-900 mb-3">Kỹ năng đạt được:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="text-sm font-semibold px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
