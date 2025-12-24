
import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Chào bạn! Tôi là trợ lý AI tại blog của Phạm Chí Lộc. Bạn cần tôi hỗ trợ gì về kiến thức **Java**, **JavaScript** hay các dự án mà Lộc đang thực hiện không? 💻' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{role: string, parts: Array<{text: string}>}>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Format markdown đơn giản
  const formatMessage = (text: string) => {
    // Code blocks
    let formatted = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-3"><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
    });
    
    // Inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-indigo-600 px-2 py-1 rounded text-sm">$1</code>');
    
    // Bold
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
    
    // Italic
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');
    
    // Line breaks
    formatted = formatted.replace(/\n/g, '<br/>');
    
    // Lists
    formatted = formatted.replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>');
    
    return formatted;
  };

  const escapeHtml = (text: string) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    const newMessages = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    // Thêm vào history
    const newHistory = [
      ...chatHistory,
      { role: 'user', parts: [{ text: userMsg }] }
    ];
    setChatHistory(newHistory);

    // Thêm message trống cho assistant để streaming
    const assistantMsgIndex = newMessages.length;
    setMessages([...newMessages, { role: 'assistant', content: '', isStreaming: true }]);

    const gemini = GeminiService.getInstance();
    let fullResponse = '';

    try {
      await gemini.chatStream(
        userMsg,
        (chunk) => {
          fullResponse += chunk;
          setMessages(prev => {
            const updated = [...prev];
            updated[assistantMsgIndex] = { 
              role: 'assistant', 
              content: fullResponse,
              isStreaming: true 
            };
            return updated;
          });
        },
        newHistory
      );

      // Kết thúc streaming
      setMessages(prev => {
        const updated = [...prev];
        updated[assistantMsgIndex] = { 
          role: 'assistant', 
          content: fullResponse,
          isStreaming: false 
        };
        return updated;
      });

      // Cập nhật history
      setChatHistory([
        ...newHistory,
        { role: 'model', parts: [{ text: fullResponse }] }
      ]);

    } catch (error) {
      console.error('Lỗi:', error);
      setMessages(prev => {
        const updated = [...prev];
        updated[assistantMsgIndex] = { 
          role: 'assistant', 
          content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.',
          isStreaming: false 
        };
        return updated;
      });
    }

    setLoading(false);
  };

  const clearChat = () => {
    setMessages([
      { role: 'assistant', content: 'Chào bạn! Tôi là trợ lý AI tại blog của Phạm Chí Lộc. Bạn cần tôi hỗ trợ gì về kiến thức **Java**, **JavaScript** hay các dự án mà Lộc đang thực hiện không? 💻' }
    ]);
    setChatHistory([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 h-[calc(100vh-64px)] flex flex-col">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Trợ lý AI của Lộc ✨</h1>
          <p className="text-slate-500">Được hỗ trợ bởi Gemini 2.5 Flash</p>
        </div>
        {messages.length > 1 && (
          <button
            onClick={clearChat}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
          >
            🗑️ Xóa chat
          </button>
        )}
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/30">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
              }`}>
                {msg.role === 'user' ? (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                ) : (
                  <div 
                    className="prose prose-sm max-w-none prose-pre:bg-slate-900 prose-pre:text-slate-100"
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                  />
                )}
                {msg.isStreaming && (
                  <span className="inline-block w-2 h-4 bg-indigo-600 animate-pulse ml-1"></span>
                )}
              </div>
            </div>
          ))}
          {loading && messages[messages.length - 1]?.content === '' && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none flex gap-1">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Bạn muốn hỏi gì... (Enter để gửi)"
              disabled={loading}
              className="flex-1 px-6 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all disabled:opacity-50"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {loading ? '...' : '✉️ Gửi'}
            </button>
          </div>
          <div className="mt-2 text-xs text-slate-400 text-center">
            AI có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
