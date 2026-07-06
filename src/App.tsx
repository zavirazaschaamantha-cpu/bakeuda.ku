import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DashboardAPBD from "./components/DashboardAPBD";
import TaxSimulator from "./components/TaxSimulator";
import PublicServices from "./components/PublicServices";
import InnovationDownloads from "./components/InnovationDownloads";
import AiAssistant from "./components/AiAssistant";
import OrgProfile from "./components/OrgProfile";
import PortalDigital from "./components/PortalDigital";
import Footer from "./components/Footer";
import { Landmark, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeUser, setActiveUser] = useState<any>(() => {
    const u = localStorage.getItem("bkd_portal_active_user");
    return u ? JSON.parse(u) : null;
  });

  const [guestMode, setGuestMode] = useState<boolean>(() => {
    return localStorage.getItem("bkd_portal_guest_mode") === "true";
  });

  const [activeTab, setActiveTab] = useState<string>("apbd");

  const handleSetActiveUser = (user: any) => {
    setActiveUser(user);
    if (!user) {
      setGuestMode(false);
      localStorage.removeItem("bkd_portal_guest_mode");
    }
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "apbd":
        return <DashboardAPBD />;
      case "simulator":
        return <TaxSimulator />;
      case "layanan":
        return <PublicServices />;
      case "inovasi":
        return <InnovationDownloads />;
      case "asisten":
        return <AiAssistant />;
      case "profil":
        return <OrgProfile />;
      case "portal":
        return (
          <PortalDigital 
            activeUser={activeUser} 
            setActiveUser={handleSetActiveUser} 
          />
        );
      default:
        return <DashboardAPBD />;
    }
  };

  // If not logged in and not in guest mode, render the grand Gateway Login page
  if (!activeUser && !guestMode) {
    return (
      <div className="min-h-screen bg-[#001D4B] bg-radial-gradient flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-[#E29201] selection:text-slate-950 font-sans">
        
        {/* Indonesian Flag Top Ribbon */}
        <div className="fixed top-0 left-0 right-0 h-1.5 flex z-50">
          <div className="bg-[#E7211A] flex-1 h-full" />
          <div className="bg-[#FFFFFF] flex-1 h-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-6xl bg-slate-55/95 backdrop-blur-md border border-slate-700/40 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-8 bg-gradient-to-b from-[#002B6B] to-[#001435]"
        >
          {/* Official Agency Brand Header */}
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left border-b border-white/10 pb-6">
            
            {/* Custom SVG Official Emblem (Pangkalpinang) */}
            <div className="relative flex h-16 w-14 shrink-0 items-center justify-center bg-white/15 rounded-2xl border border-white/20 p-1.5 bg-gradient-to-b from-[#0042A5] to-[#001D4B] shadow-inner">
              <svg viewBox="0 0 100 120" className="w-full h-full text-[#FFDF00] drop-shadow-sm">
                <path d="M10,10 L90,10 C90,10 90,80 50,110 C10,80 10,10 10,10 Z" fill="#E29201" stroke="#ffffff" strokeWidth="4" />
                <path d="M16,16 L84,16 C84,16 84,76 50,102 C16,76 16,16 16,16 Z" fill="#0042A5" />
                <path d="M50,25 L50,80" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                <circle cx="50" cy="35" r="10" fill="none" stroke="#f59e0b" strokeWidth="5" />
                <rect x="42" y="65" width="16" height="6" rx="1" fill="#f59e0b" />
                <rect x="42" y="73" width="16" height="6" rx="1" fill="#f59e0b" />
                <path d="M25,30 C22,50 30,75 48,88" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
                <path d="M75,30 C78,50 70,75 52,88" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
                <polygon points="50,13 53,20 61,20 55,25 57,32 50,28 43,32 45,25 39,20 47,20" fill="#fef3c7" />
              </svg>
              <div className="absolute -top-1.5 -right-1.5 w-5 h-3.5 flex flex-col border border-white shadow-xs rounded-xs overflow-hidden">
                <div className="bg-[#FF0000] h-1/2 w-full" />
                <div className="bg-[#FFFFFF] h-1/2 w-full" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-[10px] font-black tracking-widest text-[#FFDF00] uppercase">
                  PEMERINTAH KOTA PANGKALPINANG
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  SISTEM AKTIF
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Badan Keuangan Daerah (BKD)
              </h1>
              <p className="text-xs text-slate-300 font-medium">
                Portal Integrasi Layanan e-SPPT PBB-P2 & Sistem Keuangan Daerah Terpadu
              </p>
            </div>
          </div>

          {/* Render the Login Form module inside the gateway container */}
          <div className="bg-slate-900/40 rounded-2xl border border-white/5 p-1">
            <PortalDigital 
              activeUser={activeUser} 
              setActiveUser={handleSetActiveUser} 
              onLoginSuccess={(user) => {
                if (user) {
                  handleSetActiveUser(user);
                  setActiveTab("portal"); // Switch to the Portal Digital dashboard immediately
                }
              }}
              onGuestAccess={() => {
                setGuestMode(true);
                localStorage.setItem("bkd_portal_guest_mode", "true");
              }}
              showGuestButton={true}
            />
          </div>

        </motion.div>

        {/* Footer info line */}
        <div className="text-center mt-6 text-4xs text-slate-400 font-bold uppercase tracking-widest space-y-1.5">
          <p>Sistem ini dilindungi oleh Protokol Enskripsi Keamanan Instansi Pemerintah Daerah.</p>
          <p>Hak Cipta © 2026 Badan Keuangan Daerah Kota Pangkalpinang • Dilindungi Undang-Undang</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-accent selection:text-primary">
      {/* Header element */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        {/* Welcome Announcement Alert Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-3xs"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="space-y-0.5 text-xs">
              <span className="font-bold text-slate-900">SPPT PBB-P2 Tahun Pajak 2026 Telah Terbit!</span>
              <p className="text-slate-500 font-medium">Batas jatuh tempo pembayaran PBB-P2 sampai tanggal <strong className="text-slate-800">30 September 2026</strong>. Hindari denda keterlambatan.</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab("layanan")}
            className="flex items-center gap-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2 text-xs font-bold text-slate-800 transition shadow-3xs shrink-0 self-start sm:self-auto cursor-pointer active:scale-95"
          >
            Periksa NOP Anda <ArrowRight className="h-3.5 w-3.5 text-slate-500 animate-pulse" />
          </button>
        </motion.div>

        {/* Dynamic Tab Panel with Page Transitions */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {renderActiveTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer element */}
      <Footer />
    </div>
  );
}
