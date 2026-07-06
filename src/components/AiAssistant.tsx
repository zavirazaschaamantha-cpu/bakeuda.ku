import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, MessageSquare, AlertCircle } from "lucide-react";
import { ChatMessage } from "../types";

export default function AiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "Halo! Saya **Asisten FinAI BKD Pangkalpinang**, asisten kecerdasan buatan resmi dari Badan Keuangan Daerah Kota Pangkalpinang. \n\nSaya siap membantu Anda memberikan informasi dan panduan mengenai:\n* Pajak Bumi & Bangunan (PBB-P2)\n* Bea Perolehan Hak atas Tanah & Bangunan (BPHTB)\n* Pajak Barang dan Jasa Tertentu (PBJT Restoran, Hotel, Parkir, dll.)\n* Prosedur, tenggat waktu, dan tempat pembayaran resmi\n* Pengelolaan Anggaran Pendapatan & Belanja Daerah (APBD)\n\nAda yang bisa saya bantu hari ini?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setErrorMsg("");
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Build history of current chat to send to backend
      const requestMessages = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: requestMessages }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal mendapatkan respon dari asisten AI.");
      }

      const data = await res.json();

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error("AI Assistant error:", error);
      setErrorMsg(error.message || "Koneksi ke asisten AI terputus. Silakan coba kembali beberapa saat lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  // Helper function to format basic markdown-style text returned by Gemini safely
  const formatAiMessage = (content: string) => {
    return content.split("\n").map((line, lIdx) => {
      let formattedLine = line;

      // Handle bullet lists: line starting with "* " or "- "
      const isBullet = line.startsWith("* ") || line.startsWith("- ");
      if (isBullet) {
        formattedLine = line.substring(2);
      }

      // Handle basic bolding: **text**
      const parts = formattedLine.split(/\*\*(.*?)\*\*/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="font-extrabold text-slate-950">{part}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={lIdx} className="ml-5 list-disc pl-1 py-0.5 text-sm font-semibold leading-relaxed">
            {renderedParts}
          </li>
        );
      }

      return (
        <p key={lIdx} className={`text-sm leading-relaxed ${line.trim() === "" ? "h-3" : "mb-3"} font-medium`}>
          {renderedParts}
        </p>
      );
    });
  };

  const suggestedQuestions = [
    "Bagaimana cara pembayaran PBB-P2?",
    "Berapa tarif BPHTB di Pangkalpinang?",
    "Apa syarat mutasi balik nama PBB?",
    "Di mana alamat kantor BKD Pangkalpinang?",
  ];

  return (
    <div id="ai-assistant" className="grid grid-cols-1 gap-8 lg:grid-cols-12 animate-fade-in">
      {/* Suggestions Column */}
      <div className="lg:col-span-4 space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles className="h-5 w-5 text-yellow" />
            <h3 className="font-sans text-base font-extrabold text-slate-900">Topik Populer</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Klik pertanyaan pemicu di bawah untuk menanyakan panduan instan kepada Asisten FinAI BKD Pangkalpinang:
          </p>
          <div className="flex flex-col gap-2.5">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="w-full text-left rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-accent/40 p-4 text-xs font-bold text-slate-700 hover:text-primary transition duration-150 shadow-2xs cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Informational Guidelines Banner */}
        <div className="rounded-3xl bg-primary text-white p-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Bot className="h-24 w-24" />
          </div>
          <h4 className="font-sans text-sm font-extrabold text-yellow uppercase tracking-widest">Informasi Keamanan</h4>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed font-medium">
            Asisten FinAI ini ditenagai kecerdasan buatan Gemini AI. Semua percakapan diproses secara aman server-side tanpa mengekspos data pribadi Anda ke luar jaringan sistem. Pastikan untuk tidak menginputkan data sensitif seperti password perbankan Anda.
          </p>
        </div>
      </div>

      {/* Active Chat Column */}
      <div className="rounded-3xl border border-slate-200 bg-white p-1 shadow-sm lg:col-span-8 flex flex-col h-[650px] overflow-hidden">
        {/* Chat Title bar */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5 bg-white">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/10">
              <Bot className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-extrabold text-slate-900">Asisten FinAI BKD</h3>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-3xs text-slate-400 font-bold uppercase tracking-wider">Online • Berbasis Gemini AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages scroll container */}
        <div className="flex-1 overflow-y-auto p-5 bg-slate-50/40 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar Icon */}
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-xs ${
                  isUser ? "bg-slate-800" : "bg-primary"
                }`}>
                  {isUser ? <User className="h-4.5 w-4.5" /> : <Bot className="h-4.5 w-4.5" />}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-3xl px-5 py-4 shadow-3xs ${
                  isUser
                    ? "bg-slate-800 text-white rounded-tr-xs"
                    : "bg-white text-slate-800 rounded-tl-xs border border-slate-100"
                }`}>
                  <div className="space-y-1">
                    {formatAiMessage(msg.content)}
                  </div>
                  <span className={`text-4xs mt-2 block text-right font-medium ${
                    isUser ? "text-slate-400" : "text-slate-400"
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            );
          })}

          {/* AI Loader */}
          {isLoading && (
            <div className="flex gap-3 max-w-[80%] mr-auto">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
                <Bot className="h-4.5 w-4.5 animate-bounce" />
              </div>
              <div className="rounded-3xl rounded-tl-xs border border-slate-100 bg-white px-5 py-4 shadow-3xs text-slate-500 text-xs font-bold flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce delay-75"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce delay-150"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce delay-300"></span>
                <span>Asisten FinAI sedang menyusun jawaban...</span>
              </div>
            </div>
          )}

          {/* Error Alert inside chat */}
          {errorMsg && (
            <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 flex gap-3 text-xs font-semibold text-rose-800 mx-auto max-w-lg">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
              <div>
                <span className="font-extrabold">Terjadi Kesalahan</span>
                <p className="mt-0.5 text-rose-700/90 font-medium">{errorMsg}</p>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input box */}
        <form onSubmit={handleSubmit} className="border-t border-slate-100 p-4 bg-white flex gap-3">
          <input
            type="text"
            placeholder="Tanyakan mengenai PBB, BPHTB, APBD Pangkalpinang..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="rounded-xl bg-primary hover:bg-primary/95 disabled:bg-slate-200 disabled:text-slate-400 text-white px-5 py-3 text-sm font-bold shadow-md shadow-primary/15 transition flex items-center justify-center cursor-pointer"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
