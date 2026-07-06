import React from "react";
import { Building2, Landmark, CheckCircle2, ShieldAlert } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const navItems = [
    { id: "apbd", label: "Dashboard APBD" },
    { id: "simulator", label: "Simulator Pajak" },
    { id: "layanan", label: "Layanan Publik" },
    { id: "asisten", label: "Asisten FinAI" },
    { id: "profil", label: "Profil Lembaga" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-secondary bg-primary text-white shadow-md">
      <div className="h-1 bg-yellow w-full" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary font-black shadow-md shadow-secondary/20">
            <span className="font-mono text-sm tracking-tighter">PKP</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-3xs font-extrabold tracking-widest text-secondary uppercase">
                PEMKOT PANGKALPINANG
              </span>
              <span className="inline-flex items-center rounded-full bg-secondary/20 px-2 py-0.5 text-3xs font-medium text-secondary ring-1 ring-secondary/30">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-secondary animate-pulse"></span>
                Sistem Aktif
              </span>
            </div>
            <h1 className="font-sans text-base font-extrabold tracking-tight text-white sm:text-lg">
              Badan Keuangan Daerah
            </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "text-secondary bg-white/10"
                    : "text-slate-100 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile menu trigger helper or mobile badge */}
        <div className="flex items-center gap-2 md:hidden">
          <span className="text-xs text-slate-300 font-bold uppercase">Menu</span>
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="rounded-lg border border-white/20 bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-sm outline-none focus:border-secondary"
          >
            {navItems.map((item) => (
              <option key={item.id} value={item.id} className="bg-primary text-white">
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
