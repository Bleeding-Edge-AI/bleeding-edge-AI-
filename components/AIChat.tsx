'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { ChatMessage } from '../types';
import { useChat } from '@/app/context/ChatContext';

export const AIChat: React.FC = () => {
  const { isOpen, openChat, closeChat, activeIntent, clearIntent } = useChat();

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Edge, your AI infrastructure specialist. Ask me about our GPU availability, build specs, or colocation tiers.", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // LISTEN FOR EXTERNAL INTENTS
  useEffect(() => {
    if (activeIntent && !isLoading) {
      handleAutoSend(activeIntent);
      clearIntent();
    }
  }, [activeIntent]);

  const handleAutoSend = async (text: string) => {
    const userMsg: ChatMessage = { role: 'user', text: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    await processMessage(text, [...messages, userMsg]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    await processMessage(userMsg.text, [...messages, userMsg]);
  };

  const processMessage = async (text: string, currentHistory: ChatMessage[]) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          leadId: leadId, // Send current leadId (null for first message)
          // Gemini History must start with User. 
          // 1. Filter out the Welcome Message (idx 0).
          // 2. Slice off the LAST message (which is 'text' / the input we are sending now) to prevent duplication in Gemini's context.
          history: currentHistory.slice(0, -1).filter((_, i) => i !== 0).map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (!response.ok) {
        let errorMessage = 'API Failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || 'Unknown API Error';
        } catch (e) {
          errorMessage = `HTTP Error ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Update Lead ID if provided (First interaction)
      if (data.leadId) {
        setLeadId(data.leadId);
      }

      let displayText = data.text;
      // DEBUG: Append Database Status if failed or success (for visibility)
      if (data.db_status === 'error') {
        displayText += `\n\n[System Alert: Database Save Failed - ${data.db_error}]`;
      }

      const modelMsg: ChatMessage = { role: 'model', text: displayText, timestamp: new Date() };
      setMessages(prev => [...prev, modelMsg]);

    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: `debug_error: ${err.message}`, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openChat}
        className={`fixed bottom-8 right-8 z-40 bg-brand-600 hover:bg-brand-500 text-white p-4 rounded-full shadow-[0_0_30px_rgba(158,28,32,0.3)] transition-all hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open AI Chat"
      >
        <Icons.MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-[90vw] md:w-[400px] h-[500px] flex flex-col glass-panel rounded-2xl shadow-2xl overflow-hidden animate-float">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-900 to-slate-900 p-4 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-500/20 rounded-full flex items-center justify-center border border-brand-500/50">
                <Icons.Brain className="w-4 h-4 text-brand-500" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Edge AI Assistant</h3>
                <span className="text-xs text-brand-500 flex items-center">
                  <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-1 animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Icons.X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-brand-600 text-white rounded-br-none'
                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-white/5'
                    }`}
                >
                  {/* Message Content with Option Parsing */}
                  {msg.text.includes('[RENDER_OPTIONS_MENU]') ? (
                    <div className="flex flex-col gap-3">
                      <span>{msg.text.replace('[RENDER_OPTIONS_MENU]', '')}</span>
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {['Datacenter builds', 'Colocation', 'AI Cloud', 'Applied AI'].map((option) => (
                          <button
                            key={option}
                            onClick={() => handleAutoSend(option)}
                            className="text-left text-xs bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 hover:text-brand-300 border border-brand-500/20 rounded-lg px-3 py-2 transition-all hover:scale-[1.02] active:scale-95"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 rounded-2xl rounded-bl-none p-3 border border-white/5">
                  <Icons.Loader2 className="w-4 h-4 text-brand-500 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-slate-900 border-t border-white/10">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about GPU pricing..."
                className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-2 top-2 p-1.5 text-brand-500 hover:text-brand-400 disabled:opacity-50 transition-colors"
              >
                <Icons.Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 text-center">
              <span className="text-[10px] text-slate-600">Powered by Gemini 2.5 Flash</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};