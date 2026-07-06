import React, { useState } from "react";
import Header from "./components/Header";
import DashboardAPBD from "./components/DashboardAPBD";
import TaxSimulator from "./components/TaxSimulator";
import PublicServices from "./components/PublicServices";
import AiAssistant from "./components/AiAssistant";
import OrgProfile from "./components/OrgProfile";
import Footer from "./components/Footer";
import { Landmark, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("apbd");

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "apbd":
        return <DashboardAPBD />;
      case "simulator":
        return <TaxSimulator />;
      case "layanan":
        return <PublicServices />;
      case "asisten":
        return <AiAssistant />;
      case "profil":
        return <OrgProfile />;
      default:
        return <DashboardAPBD />;
    }
  };

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
