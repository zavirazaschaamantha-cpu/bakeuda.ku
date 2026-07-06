import React from "react";
import { Landmark, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const links = [
    { label: "Situs Resmi Pemkot Pangkalpinang", url: "https://pangkalpinangkota.go.id" },
    { label: "Sistem Pengaduan SP4N LAPOR", url: "https://www.lapor.go.id" },
    { label: "Portal Satu Data Pangkalpinang", url: "https://data.pangkalpinangkota.go.id" },
  ];

  return (
    <footer className="w-full border-t border-slate-200 bg-white py-12 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
          {/* Left Column Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Landmark className="h-5 w-5" />
              <span className="font-sans text-sm font-black tracking-tight text-slate-900">
                BKD KOTA PANGKALPINANG
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Situs Resmi Badan Keuangan Daerah Pemerintah Kota Pangkalpinang.<br />
              Provinsi Kepulauan Bangka Belitung.
            </p>
          </div>

          {/* Right Column Links */}
          <div className="flex flex-col gap-2 text-xs font-semibold text-slate-500">
            <span className="text-3xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Tautan Eksternal</span>
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-slate-500 hover:text-primary transition font-bold"
              >
                {link.label} <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-medium text-slate-400">
          <span>
            © {new Date().getFullYear()} Pemerintah Kota Pangkalpinang. Hak Cipta Dilindungi Undang-Undang.
          </span>
          <div className="flex gap-4">
            <span>Kebijakan Privasi</span>
            <span>Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
