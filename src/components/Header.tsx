import React from "react";
import { Building2, Landmark, CheckCircle2, ShieldAlert, Award, Calendar, Volume2 } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const navItems = [
    { id: "apbd", label: "Dashboard APBD" },
    { id: "simulator", label: "Simulator Pajak" },
    { id: "layanan", label: "Layanan Publik" },
    { id: "inovasi", label: "Inovasi & Unduhan" },
    { id: "asisten", label: "Asisten FinAI" },
    { id: "profil", label: "Profil Lembaga" },
  ];

  // Get current date in Indonesian format
  const getIndonesianDate = () => {
    return new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="w-full shrink-0">
      {/* 1. Indonesian Flag Top Ribbon (Merah Putih) */}
      <div className="w-full h-1.5 flex">
        <div className="bg-[#E7211A] flex-1 h-full" />
        <div className="bg-[#FFFFFF] flex-1 h-full" />
      </div>

      {/* 2. Top Utility & Announcement Ticker Bar (Running Text) */}
      <div className="bg-slate-950 text-slate-300 text-4xs py-1.5 border-b border-white/5 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-mono shrink-0 font-bold text-yellow">
            <Calendar className="h-3 w-3 text-yellow animate-bounce" />
            <span className="bg-yellow/15 text-yellow px-1.5 py-0.5 rounded border border-yellow/30 text-5xs">INFO HARI INI</span>
            <span className="hidden md:inline">{getIndonesianDate()}</span>
          </div>
          
          <div className="flex-1 overflow-hidden relative h-5 flex items-center bg-slate-900/80 rounded-md px-2 border border-white/5">
            <div className="whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-pointer text-4xs font-semibold text-slate-200">
              📢 PENGUMUMAN RESMI BKD KOTA PANGKALPINANG: Surat Pemberitahuan Pajak Terhutang (SPPT) PBB-P2 Tahun Pajak 2026 telah terbit. Batas jatuh tempo pembayaran tanpa denda denda administrasi diperpanjang sampai dengan 30 September 2026. Lakukan pembayaran tepat waktu di loket BKD, Bank Sumsel Babel, Kantor Pos, Tokopedia, Indomaret, atau Alfamart terdekat. • 🚀 INOVASI TERBARU: Gunakan Asisten AI FinAI BKD secara gratis untuk konsultasi online 24 jam penuh serta cetak Sertifikat Estimasi Pajak Daerah instan di Pojok Unduhan Mandiri. • 🏛️ BKD Pangkalpinang berkomitmen tinggi mewujudkan tata kelola APBD yang transparan, bersih, akuntabel, dan terpercaya.
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-4 shrink-0 font-bold text-slate-400">
            <a href="https://pangkalpinangkota.go.id" target="_blank" rel="noreferrer" className="hover:text-white transition">Situs Pemkot</a>
            <a href="https://www.lapor.go.id" target="_blank" rel="noreferrer" className="hover:text-red-400 transition flex items-center gap-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span> LAPOR!
            </a>
          </div>
        </div>
      </div>

      {/* 3. Main Header (Nav & Official Brand Logo) */}
      <header className="sticky top-0 z-50 w-full border-b-4 border-[#E29201] bg-[#0042A5] text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Official Emblem Logo & Agency Title */}
          <div className="flex items-center gap-3">
            {/* Custom SVG Official Emblem (Lambang Daerah) */}
            <div className="relative flex h-14 w-12 shrink-0 items-center justify-center bg-white/10 rounded-xl border border-white/20 p-1 bg-gradient-to-b from-[#003B93] to-[#002762] shadow-inner">
              {/* Decorative Shield Emblem */}
              <svg viewBox="0 0 100 120" className="w-full h-full text-yellow drop-shadow-sm">
                {/* Shield background */}
                <path d="M10,10 L90,10 C90,10 90,80 50,110 C10,80 10,10 10,10 Z" fill="#E29201" stroke="#ffffff" strokeWidth="4" />
                <path d="M16,16 L84,16 C84,16 84,76 50,102 C16,76 16,16 16,16 Z" fill="#0042A5" />
                
                {/* Golden Key/Tin Symbol inside */}
                <path d="M50,25 L50,80" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                <circle cx="50" cy="35" r="10" fill="none" stroke="#f59e0b" strokeWidth="5" />
                <rect x="42" y="65" width="16" height="6" rx="1" fill="#f59e0b" />
                <rect x="42" y="73" width="16" height="6" rx="1" fill="#f59e0b" />
                
                {/* Padi & Kapas decorations */}
                <path d="M25,30 C22,50 30,75 48,88" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
                <path d="M75,30 C78,50 70,75 52,88" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
                
                {/* Golden star on top */}
                <polygon points="50,13 53,20 61,20 55,25 57,32 50,28 43,32 45,25 39,20 47,20" fill="#fef3c7" />
              </svg>
              {/* Miniature Indonesian Flag Corner Tag */}
              <div className="absolute -top-1.5 -right-1.5 w-4 h-3 flex flex-col border border-white shadow-xs rounded-xs overflow-hidden">
                <div className="bg-[#FF0000] h-1/2 w-full" />
                <div className="bg-[#FFFFFF] h-1/2 w-full" />
              </div>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-sans text-4xs font-black tracking-widest text-[#FFDF00] uppercase">
                  PEMERINTAH KOTA PANGKALPINANG
                </span>
                <span className="inline-flex max-w-max items-center rounded-full bg-[#10b981]/20 border border-[#10b981]/30 px-1.5 py-0.2 text-[9px] font-black text-[#10b981]">
                  <span className="mr-1 h-1 w-1 rounded-full bg-[#10b981] animate-ping"></span>
                  SISTEM ONLINE
                </span>
              </div>
              <h1 className="font-sans text-sm font-extrabold tracking-tight text-white sm:text-base leading-tight">
                Badan Keuangan Daerah
              </h1>
              <p className="text-[10px] text-slate-300 font-medium hidden sm:block">
                Situs Pelayanan Pajak Daerah & Transparansi Keuangan Terpadu (e-SPPT & SIKAD)
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-[#FFDF00] bg-white/10 font-black shadow-xs ring-1 ring-white/10"
                      : "text-slate-100 hover:text-white hover:bg-white/5 font-bold"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#FFDF00] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Nav Selection for Tablet & Mobile screens */}
          <div className="flex items-center gap-2 lg:hidden">
            <span className="text-4xs text-slate-300 font-bold uppercase">Navigasi</span>
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="rounded-lg border border-white/20 bg-[#003B93] px-2.5 py-1.5 text-xs font-bold text-white shadow-sm outline-none focus:border-[#E29201] cursor-pointer"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id} className="bg-[#0042A5] text-white">
                  {item.label}
                </option>
              ))}
            </select>
          </div>

        </div>
      </header>
    </div>
  );
}
