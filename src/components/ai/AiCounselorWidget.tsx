'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, Send, Sparkles, PhoneCall, ChevronDown, BookOpen, CheckCircle, ShieldAlert } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: string[];
  escalated?: boolean;
  time: string;
}

export default function AiCounselorWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to Medical Coding Officers Academy (MCOA)! I am your AI Academic & Coding Counselor. Ask me about course eligibility, fee installment schedules, clinical coding guidelines (ICD-10-CM / E&M), or request a counselor callback.',
      citations: ['MCOA Official Academic Charter 2026'],
      time: 'Just now'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'What is the fee and 3-installment plan?',
    'Which course is best for B.Sc Nursing / Pharmacy?',
    'Explain 2026 ICD-10-CM Diabetes guidelines',
    'Connect me to Chennai branch counselor'
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          category: 'counselor',
          sessionId: 'widget_user_session'
        })
      });

      const data = await res.json();
      if (data.success) {
        const assistantMsg: ChatMessage = {
          id: `ast_${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          citations: data.citations || [],
          escalated: data.escalatedToHuman,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'assistant',
          content: 'I apologize, but I encountered an issue connecting to our knowledge base. Please reach out directly to our central admissions team at +91 8072020716.',
          citations: ['MCOA Central Admissions'],
          time: 'Just now'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Hide on Admin, Student LMS, and Trainer dashboards (after all hooks are called)
  if (
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/student') ||
    pathname?.startsWith('/trainer')
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-[#211747] to-[#50458F] text-white px-5 py-3.5 rounded-full shadow-2xl hover:shadow-[#D8AC55]/30 hover:scale-105 transition-all border border-[#D8AC55]/40 group"
          aria-label="Open AI Academic Counselor"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-[#D8AC55] group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#211747] animate-pulse"></span>
          </div>
          <span className="font-montserrat font-semibold text-sm tracking-wide">
            Ask MCOA AI Counselor
          </span>
          <Sparkles className="w-4 h-4 text-[#D8AC55]" />
        </button>
      )}

      {/* Expandable Chat Drawer */}
      {isOpen && (
        <div className="w-[380px] sm:w-[420px] h-[580px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#211747] via-[#33256A] to-[#50458F] p-4 text-white flex items-center justify-between border-b border-[#D8AC55]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-[#D8AC55]/40">
                <Bot className="w-5 h-5 text-[#D8AC55]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-montserrat font-bold text-sm tracking-wide text-white">MCOA AI Advisor</h3>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-400/30">
                    Live
                  </span>
                </div>
                <p className="text-xs text-purple-200">Guarded by 2026 Coding Guidelines</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-purple-200 hover:text-white transition-colors"
              aria-label="Close Counselor"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#50458F] text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>

                  {/* Citations Badge */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5 items-center">
                      <BookOpen className="w-3.5 h-3.5 text-[#50458F]" />
                      <span className="text-[10px] text-slate-500 font-medium">Source:</span>
                      {msg.citations.map((cite, i) => (
                        <span
                          key={i}
                          className="bg-purple-50 text-[#211747] text-[10px] font-semibold px-2 py-0.5 rounded border border-purple-200"
                        >
                          {cite}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Escalated to Human Tag */}
                  {msg.escalated && (
                    <div className="mt-2.5 p-2 bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-between text-amber-900">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Counselor Escalated</span>
                      </div>
                      <a
                        href="https://wa.me/918072020716?text=Hi%20MCOA%20Admissions,%20I%20have%20an%20inquiry%20from%20the%20AI%20Advisor"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-bold text-[#211747] hover:underline flex items-center gap-1"
                      >
                        <PhoneCall className="w-3 h-3 text-emerald-600" /> WhatsApp Direct
                      </a>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-3 bg-white rounded-2xl rounded-tl-none border border-slate-200 w-fit">
                <div className="w-2 h-2 rounded-full bg-[#50458F] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-[#9B85D3] animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-[#D8AC55] animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-xs text-slate-500 font-medium ml-1">Consulting knowledge base...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-purple-50/70 border-t border-purple-100 flex gap-1.5 overflow-x-auto scrollbar-none">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap text-[11px] bg-white border border-purple-200 text-[#211747] px-2.5 py-1 rounded-full hover:bg-[#211747] hover:text-white transition-all font-medium flex-shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about courses, fees, or medical coding..."
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#50458F] focus:bg-white transition-all"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-[#211747] text-[#D8AC55] p-2.5 rounded-xl hover:bg-[#50458F] disabled:opacity-40 disabled:hover:bg-[#211747] transition-all"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-[#D8AC55]" /> Verified MCOA & CMS Reference Data
              </span>
              <span>Hotline: +91 8072020716</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
