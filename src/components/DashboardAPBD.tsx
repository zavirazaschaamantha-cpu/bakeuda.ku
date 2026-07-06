import React, { useState } from "react";
import { 
  TrendingUp, 
  ArrowDownRight, 
  ArrowUpRight, 
  ShieldCheck, 
  HelpCircle, 
  Landmark, 
  Coins, 
  Briefcase,
  Award,
  FileText,
  BookOpen,
  Users,
  Volume2,
  Newspaper,
  Clock,
  Compass,
  Eye,
  Activity,
  FileSpreadsheet,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  AlertTriangle
} from "lucide-react";
import { APBDData, APBDItem } from "../types";

// Realistic APBD Data for Kota Pangkalpinang (Rp 1,002 T Pendapatan, Rp 1,056 T Belanja)
const KOTA_PANGKALPINANG_APBD: APBDData = {
  year: 2024,
  revenue: {
    total: 1002.4, // Miliar Rupiah
    items: [
      {
        category: "Pajak Daerah",
        value: 134.8,
        percentage: 13.4,
        details: "Penerimaan Pajak Daerah Kota Pangkalpinang, meliputi Pajak Bumi dan Bangunan (PBB-P2), Bea Perolehan Hak atas Tanah dan Bangunan (BPHTB), Pajak Barang dan Jasa Tertentu (PBJT), Reklame, Air Tanah, dan Sarang Burung Walet.",
        subItems: [
          { name: "Pajak Bumi & Bangunan (PBB-P2)", value: 35.0 },
          { name: "Bea Perolehan Hak Tanah & Bangunan (BPHTB)", value: 45.0 },
          { name: "Pajak Barang & Jasa Tertentu (PBJT)", value: 35.0 },
          { name: "Pajak Reklame, Air Tanah & Sarang Burung Walet", value: 19.8 }
        ]
      },
      {
        category: "Retribusi Daerah",
        value: 20.4,
        percentage: 2.0,
        details: "Penerimaan Retribusi Daerah Kota Pangkalpinang, bersumber dari Retribusi Jasa Umum, Retribusi Jasa Usaha, dan Retribusi Perizinan Tertentu.",
        subItems: [
          { name: "Retribusi Jasa Umum (Parkir, Kebersihan, dll)", value: 10.4 },
          { name: "Retribusi Jasa Usaha (Pasar, Terminal, dll)", value: 6.0 },
          { name: "Retribusi Perizinan Tertentu (PBG/IMB, dll)", value: 4.0 }
        ]
      },
      {
        category: "Dana Transfer Pemerintah",
        value: 813.1,
        percentage: 81.1,
        details: "Dana perimbangan transfer dari Pemerintah Pusat (DAU, DAK, DBH) serta Dana Transfer Antar Daerah berupa Bagi Hasil Pajak Provinsi dari Pemerintah Provinsi Kepulauan Bangka Belitung.",
        subItems: [
          { name: "Dana Alokasi Umum (DAU) Pusat", value: 532.0 },
          { name: "Dana Alokasi Khusus (DAK) Pusat", value: 146.0 },
          { name: "Dana Bagi Hasil (DBH) Pusat", value: 70.0 },
          { name: "Bagi Hasil Pajak Provinsi Bangka Belitung", value: 65.1 }
        ]
      },
      {
        category: "Lain-lain Pendapatan Sah",
        value: 34.1,
        percentage: 3.5,
        details: "Penerimaan daerah lainnya yang sah, bersumber dari Hasil Pengelolaan Kekayaan Daerah yang Dipisahkan, Lain-lain PAD yang Sah, Pendapatan Hibah, serta Dana Darurat.",
        subItems: [
          { name: "Hasil Pengelolaan Kekayaan Daerah Dipisahkan", value: 5.1 },
          { name: "Lain-lain PAD yang Sah", value: 24.0 },
          { name: "Pendapatan Hibah & Dana Darurat", value: 5.0 }
        ]
      }
    ]
  },
  expenditure: {
    total: 1056.2, // Miliar Rupiah
    items: [
      {
        category: "Belanja Operasi",
        value: 867.2,
        percentage: 82.1,
        details: "Pengeluaran rutin daerah untuk menunjang kegiatan operasional pemerintahan sehari-hari, meliputi Belanja Pegawai (gaji, tunjangan ASN & P3K), Belanja Barang & Jasa, Belanja Subsidi, Belanja Hibah, dan Belanja Bantuan Sosial.",
        subItems: [
          { name: "Belanja Pegawai (Gaji & Tunjangan)", value: 412.0 },
          { name: "Belanja Barang & Jasa Operasional", value: 365.0 },
          { name: "Belanja Hibah & Bantuan Sosial", value: 90.2 }
        ]
      },
      {
        category: "Belanja Modal",
        value: 172.0,
        percentage: 16.3,
        details: "Pengeluaran daerah untuk pembangunan aset tetap yang memberikan manfaat jangka panjang bagi publik, seperti pembangunan infrastruktur jalan, jembatan, gedung sekolah, puskesmas, dan fasilitas perkantoran umum.",
        subItems: [
          { name: "Pembangunan Jalan, Jembatan & Irigasi", value: 75.0 },
          { name: "Sarana Prasarana Pendidikan & Kesehatan", value: 57.0 },
          { name: "Peralatan Gedung, Mesin & Sarpras Kantor", value: 40.0 }
        ]
      },
      {
        category: "Belanja Tidak Terduga",
        value: 12.0,
        percentage: 1.1,
        details: "Anggaran darurat daerah yang disediakan untuk mengantisipasi kejadian luar biasa, penanggulangan bencana alam, tanggap darurat, maupun kebutuhan mendesak lainnya yang belum dianggarkan.",
        subItems: [
          { name: "Tanggap Darurat Kebencanaan Alam/Sosial", value: 8.0 },
          { name: "Bantuan Sosial Darurat & Kebutuhan Mendesak", value: 4.0 }
        ]
      },
      {
        category: "Belanja Transfer",
        value: 5.0,
        percentage: 0.5,
        details: "Pengeluaran berupa transfer bagi hasil pendapatan dan bantuan keuangan ke kelurahan-kelurahan di wilayah Kota Pangkalpinang demi percepatan pembangunan lokal.",
        subItems: [
          { name: "Alokasi Dana Kelurahan (ADK)", value: 3.0 },
          { name: "Bantuan Keuangan Khusus Kelurahan", value: 2.0 }
        ]
      }
    ]
  }
};

interface DonutChartProps {
  items: APBDItem[];
  selectedItem: APBDItem;
  onSelect: (item: APBDItem) => void;
  getProgressColor: (index: number) => string;
}

function DonutChart({ items, selectedItem, onSelect, getProgressColor }: DonutChartProps) {
  const radius = 55;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  
  let accumulatedPercentage = 0;
  
  const getHexColor = (colorClass: string) => {
    if (colorClass.includes("bg-primary")) return "#0052cc";
    if (colorClass.includes("bg-yellow")) return "#f59e0b";
    if (colorClass.includes("bg-secondary")) return "#10b981";
    if (colorClass.includes("bg-indigo-600")) return "#4f46e5";
    return "#475569";
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-5 bg-slate-50/30 rounded-2xl border border-slate-100/80 mb-5 shadow-3xs overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-radial-gradient from-white to-transparent opacity-40 pointer-events-none" />
      
      <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90 relative z-10">
        {/* Background track circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="transparent"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        {items.map((item, idx) => {
          const itemPercentage = item.percentage;
          const strokeLength = (itemPercentage / 100) * circumference;
          const strokeOffset = circumference - strokeLength;
          
          const rotationAngle = (accumulatedPercentage / 100) * 360;
          accumulatedPercentage += itemPercentage;
          
          const isSelected = selectedItem.category === item.category;
          const colorClass = getProgressColor(idx);
          const strokeColor = getHexColor(colorClass);
          
          return (
            <circle
              key={item.category}
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke={strokeColor}
              strokeWidth={isSelected ? strokeWidth + 4 : strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              transform={`rotate(${rotationAngle} 80 80)`}
              className="transition-all duration-300 cursor-pointer hover:opacity-90 origin-center"
              onClick={() => onSelect(item)}
              style={{
                filter: isSelected ? "drop-shadow(0px 2px 4px rgba(0,0,0,0.15))" : "none"
              }}
            />
          );
        })}
      </svg>
      {/* Center text content with nice details */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Porsi Makro</span>
        <span className="text-2xl font-black text-slate-900 mt-0.5 leading-none">
          {selectedItem.percentage}%
        </span>
        <span className="text-[10px] font-bold text-slate-500 mt-1">Rp {selectedItem.value}M</span>
      </div>
    </div>
  );
}

export default function DashboardAPBD() {
  const [subTab, setSubTab] = useState<"beranda" | "apbd">("beranda");
  const [viewType, setViewType] = useState<"revenue" | "expenditure">("revenue");
  const [selectedCategory, setSelectedCategory] = useState<APBDItem>(
    KOTA_PANGKALPINANG_APBD.revenue.items[0]
  );

  const data = KOTA_PANGKALPINANG_APBD;
  const currentTotal = viewType === "revenue" ? data.revenue.total : data.expenditure.total;
  const currentItems = viewType === "revenue" ? data.revenue.items : data.expenditure.items;

  const handleTypeChange = (type: "revenue" | "expenditure") => {
    setViewType(type);
    setSelectedCategory(type === "revenue" ? data.revenue.items[0] : data.expenditure.items[0]);
  };

  // Color mapping based on categories
  const getColorClass = (index: number) => {
    const colors = [
      "bg-primary text-primary border-primary hover:bg-accent/40",
      "bg-slate-700 text-slate-700 border-slate-700 hover:bg-slate-50",
      "bg-secondary text-secondary border-secondary hover:bg-secondary/10",
      "bg-indigo-600 text-indigo-600 border-indigo-600 hover:bg-indigo-50",
    ];
    return colors[index % colors.length];
  };

  const getProgressColorClass = (index: number) => {
    const colors = ["bg-primary", "bg-yellow", "bg-secondary", "bg-indigo-600", "bg-slate-600"];
    return colors[index % colors.length];
  };

  return (
    <div id="dashboard-apbd" className="space-y-8 animate-fade-in">
      
      {/* Traditional-Style Government Banner (Top Hero) */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl min-h-[240px] flex items-center">
        {/* Background Image with elegant overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/kantor_bkd_pangkalpinang_1783322183344.jpg" 
            alt="Kantor BKD Kota Pangkalpinang" 
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003B93] via-[#003B93]/95 to-slate-950/80" />
        </div>
        
        <div className="relative z-10 max-w-3xl p-6 sm:p-10 space-y-4">
          <span className="font-mono text-3xs font-black tracking-widest text-[#FFDF00] uppercase bg-[#FFDF00]/10 border border-[#FFDF00]/30 px-3.5 py-1 rounded-full backdrop-blur-xs inline-block">
            PORTAL RESMI PELAYANAN PUBLIK & DATA KEUANGAN
          </span>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl md:text-4xl text-white leading-tight">
            Selamat Datang di Portal BKD Kota Pangkalpinang
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-medium">
            Sistem integrasi satu pintu untuk Transparansi APBD, Pengaduan Layanan, Simulasi Estimasi Pajak Daerah (PBB-P2 & BPHTB), Pojok Unduhan Dokumen, serta Konsultasi Digital bersama Asisten Cerdas FinAI.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-3xs font-bold text-slate-300">
            <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
              <ShieldCheck className="h-3.5 w-3.5 text-secondary" /> Opini WTP 7x Berturut-Turut
            </span>
            <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
              <Activity className="h-3.5 w-3.5 text-secondary animate-pulse" /> ISO 27001 Certified System
            </span>
          </div>
        </div>
      </div>

      {/* Modern Government Tab switcher bar */}
      <div className="flex border-b-2 border-slate-200 bg-white rounded-2xl p-1.5 shadow-3xs gap-1">
        <button
          onClick={() => setSubTab("beranda")}
          className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
            subTab === "beranda"
              ? "bg-[#0042A5] text-white shadow-md font-black"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          🏠 Beranda Utama Portal
        </button>
        <button
          onClick={() => setSubTab("apbd")}
          className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
            subTab === "apbd"
              ? "bg-[#0042A5] text-white shadow-md font-black"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          📊 Transparansi APBD & Realisasi
        </button>
      </div>

      {/* Conditionally Render subTabs */}
      {subTab === "beranda" ? (
        /* GOVERNMENT PORTAL HOMEPAGE DESIGN */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          
          {/* COLUMN 1: SAMBUTAN KEPALA BADAN (Col-span-4) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 text-center sm:text-left">
            <div className="border-b border-slate-100 pb-3 text-center sm:text-left">
              <span className="text-4xs font-black text-[#0042A5] uppercase tracking-widest block mb-1">PROFIL PIMPINAN</span>
              <h3 className="text-sm font-black text-slate-900 uppercase">Sambutan Kepala Badan</h3>
            </div>
            
            <div className="relative group max-w-[200px] mx-auto sm:mx-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0042A5] to-[#E29201] rounded-2xl opacity-10 group-hover:opacity-20 transition duration-300" />
              <img 
                src="/src/assets/images/kepala_bkd_portrait_1783325842852.jpg" 
                alt="Drs. H. Apriandi, M.Si." 
                className="w-full h-auto rounded-2xl border-4 border-white shadow-md object-cover object-center relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-2.5 right-2 bg-gradient-to-r from-[#E29201] to-yellow text-slate-950 font-black text-[9px] uppercase px-2 py-0.5 rounded-md shadow-xs border border-white z-25">
                KEPALA BKD
              </div>
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-black text-slate-900 leading-tight">Drs. H. Apriandi, M.Si.</h4>
              <p className="text-4xs font-bold text-slate-500 uppercase">NIP. 19741002 200003 1 004</p>
              <p className="text-5xs font-medium text-[#0042A5] tracking-wide uppercase font-mono">Pembina Utama Muda (IV/c)</p>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed font-medium font-serif italic text-justify bg-slate-50/50 p-4 rounded-2xl border border-slate-100 relative">
              <span className="absolute top-1 left-2 text-slate-300 font-serif text-3xl">“</span>
              <p className="relative z-10 pl-2">
                Assalamu'alaikum Wr. Wb. Selamat datang di Portal Pelayanan Digital Badan Keuangan Daerah Kota Pangkalpinang. Sebagai bagian komitmen reformasi birokrasi, kami hadirkan portal keterbukaan data pengelolaan keuangan daerah serta layanan perpajakan online mandiri guna mendukung terwujudnya Pangkalpinang Kota Beribu Senyuman yang Sejahtera, Unggul, dan Mandiri. Manfaatkan simulator pajak, lapor online, dan berkonsultasi langsung secara aman bersama sistem cerdas kami. Terima kasih atas kepatuhan pajak Anda.
              </p>
              <span className="absolute bottom-1 right-2 text-slate-300 font-serif text-3xl">”</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-secondary" /> Tanda Tangan Elektronik
              </span>
              <span className="text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded text-4xs uppercase tracking-widest font-black">BSrE VERIFIED</span>
            </div>
          </div>

          {/* COLUMN 2: WARTA DAERAH & BERITA TERKINI (Col-span-5) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-4xs font-black text-[#0042A5] uppercase tracking-widest block">INFORMASI PUBLIK</span>
                <h3 className="text-sm font-black text-slate-900 uppercase flex items-center gap-1.5">
                  <Newspaper className="h-4.5 w-4.5 text-[#0042A5]" />
                  Warta Keuangan & Berita Terbaru
                </h3>
              </div>
              <span className="text-5xs font-black text-slate-400 uppercase tracking-widest">REAL-TIME</span>
            </div>

            <div className="space-y-5">
              {/* News Item 1 */}
              <div className="group space-y-2 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="bg-[#0042A5]/10 text-[#0042A5] px-2 py-0.5 rounded text-[9px] font-black uppercase">INOVASI</span>
                  <span className="text-5xs text-slate-400 font-bold flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Senin, 6 Juli 2026
                  </span>
                </div>
                <h4 className="text-xs font-black text-slate-900 group-hover:text-[#0042A5] transition leading-snug">
                  BKD Pangkalpinang Luncurkan e-SPPT PBB-P2 Mandiri & Asisten FinAI Berbasis Kecerdasan Buatan
                </h4>
                <p className="text-3xs text-slate-500 leading-normal font-medium line-clamp-2">
                  Langkah revolusioner digitalisasi daerah diresmikan guna memangkas antrean wajib pajak. Kini warga Pangkalpinang dapat mengunduh rincian SPPT dan mengukur estimasi pajak secara paperless melalui sistem web mandiri.
                </p>
                <div className="h-px bg-slate-100 w-full pt-2" />
              </div>

              {/* News Item 2 */}
              <div className="group space-y-2 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[9px] font-black uppercase">PENGHARGAAN</span>
                  <span className="text-5xs text-slate-400 font-bold flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Kamis, 25 Juni 2026
                  </span>
                </div>
                <h4 className="text-xs font-black text-slate-900 group-hover:text-[#0042A5] transition leading-snug">
                  Kembali Raih Opini WTP ke-7 Kalinya, Pengelolaan Kas Daerah Dinilai Sangat Sehat oleh BPK RI
                </h4>
                <p className="text-3xs text-slate-500 leading-normal font-medium line-clamp-2">
                  Kota Pangkalpinang berhasil mempertahankan predikat Opini Wajar Tanpa Pengecualian (WTP) atas Laporan Hasil Pemeriksaan Keuangan Daerah dari Badan Pemeriksa Keuangan Republik Indonesia.
                </p>
                <div className="h-px bg-slate-100 w-full pt-2" />
              </div>

              {/* News Item 3 */}
              <div className="group space-y-2 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[9px] font-black uppercase">SOSIALISASI</span>
                  <span className="text-5xs text-slate-400 font-bold flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Selasa, 12 Mei 2026
                  </span>
                </div>
                <h4 className="text-xs font-black text-slate-900 group-hover:text-[#0042A5] transition leading-snug">
                  BKD Gencar Sosialisasikan Perda Nomor 1 Tahun 2024 Tentang Pajak Daerah dan Retribusi Daerah Terbaru
                </h4>
                <p className="text-3xs text-slate-500 leading-normal font-medium line-clamp-2">
                  Sosialisasi yang menyasar pelaku usaha restoran, hotel, hiburan, dan reklame ini bertujuan memberikan kepastian tarif pajak barang jasa tertentu (PBJT) yang kini terstandarisasi demi merangsang investasi lokal.
                </p>
              </div>
            </div>

            {/* Quick Actions Grid on Home Screen */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3 pt-3">
              <span className="text-5xs font-black text-slate-400 uppercase tracking-widest block">AKSES CEPAT LAYANAN</span>
              <div className="grid grid-cols-2 gap-2 text-center text-4xs font-black uppercase">
                <a href="#simulator" className="p-2.5 bg-white hover:bg-[#0042A5] hover:text-white rounded-xl border border-slate-200 shadow-3xs text-slate-700 transition flex flex-col items-center gap-1">
                  <Coins className="h-4 w-4" /> Simulator Pajak
                </a>
                <a href="#layanan" className="p-2.5 bg-white hover:bg-[#0042A5] hover:text-white rounded-xl border border-slate-200 shadow-3xs text-slate-700 transition flex flex-col items-center gap-1">
                  <ShieldCheck className="h-4 w-4" /> e-SPPT Mandiri
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 3: NOTICE BOARD, VISI/MISI & STATISTIK (Col-span-3) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Notice Board (Papan Pengumuman) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3.5">
              <span className="text-4xs font-black text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full inline-block uppercase tracking-wider">
                📢 Papan Pengumuman
              </span>
              <div className="space-y-3 divide-y divide-slate-100">
                <div className="space-y-1.5 pb-2">
                  <span className="text-5xs text-[#E29201] font-black uppercase">JATUH TEMPO PBB</span>
                  <p className="text-3xs font-bold text-slate-800 leading-snug">Pembayaran PBB-P2 Tahun Pajak 2026 selambatnya tanggal 30 September 2026.</p>
                </div>
                <div className="space-y-1.5 py-2.5">
                  <span className="text-5xs text-secondary font-black uppercase">DISKON STIMULUS</span>
                  <p className="text-3xs font-bold text-slate-800 leading-snug">Diskon pengurangan pokok PBB hingga 15% bagi wajib pajak yang melakukan pelunasan awal.</p>
                </div>
                <div className="space-y-1.5 pt-2">
                  <span className="text-5xs text-[#0042A5] font-black uppercase">PEMBAYARAN DIGITAL</span>
                  <p className="text-3xs font-bold text-slate-800 leading-snug">Pembayaran resmi non-tunai via Qris, Bank Sumsel Babel, Kantor Pos, Tokopedia, Indomaret, Alfamart.</p>
                </div>
              </div>
            </div>

            {/* Visi & Misi Card */}
            <div className="bg-gradient-to-br from-[#003B93] to-[#002254] text-white border border-[#003B93] rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-1.5 text-[#FFDF00] text-3xs font-black uppercase">
                <Compass className="h-4 w-4" /> Visi Pemerintah Daerah
              </div>
              <p className="text-3xs font-serif italic text-slate-100 leading-relaxed border-l-2 border-[#FFDF00] pl-2">
                "Pangkalpinang Kota Beribu Senyuman yang Sejahtera, Unggul, Nyaman, dan Berdaya Saing."
              </p>
              <div className="h-px bg-white/10 w-full" />
              <div className="space-y-1 text-slate-300 font-medium text-[10px]">
                <strong className="text-white block font-sans text-5xs uppercase tracking-wide">Misi Pengelolaan BKD:</strong>
                <p>1. Transparansi & Akuntabilitas Anggaran</p>
                <p>2. Digitalisasi Layanan Fiskal Terpadu</p>
                <p>3. Pengawasan Keuangan Berbasis Akuntabel</p>
              </div>
            </div>

            {/* Visitor Statistics widget (Highly authentic) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-4xs font-black text-slate-500 uppercase tracking-widest">Statistik Pengunjung</span>
                <Users className="h-3.5 w-3.5 text-[#0042A5]" />
              </div>

              <div className="space-y-2.5 text-3xs font-semibold text-slate-600">
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#10b981] animate-ping" />
                    Pengunjung Aktif:
                  </span>
                  <span className="font-bold text-[#10b981] font-mono">42 Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Kunjungan Hari Ini:</span>
                  <span className="font-bold text-slate-900 font-mono">1.482</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 pt-2">
                  <span>Kunjungan Kemarin:</span>
                  <span className="font-bold text-slate-900 font-mono">2.894</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 pt-2">
                  <span>Total Hits Kunjungan:</span>
                  <span className="font-bold text-[#0042A5] font-mono">135.204</span>
                </div>
              </div>

              <div className="text-[9px] font-medium text-slate-400 bg-slate-50 p-2 rounded-lg border border-slate-100 text-center font-mono">
                Intranet Node: <span className="text-slate-600 font-bold">10.32.124.9</span>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* ORIGINAL BUDGET TRANSPARENCY DASHBOARD VIEW */
        <>
          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">Total Pendapatan</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <Coins className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-extrabold text-slate-900">Rp 1,00 Triliun</span>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>Target terealisasi 98.4%</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">Total Belanja</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-extrabold text-slate-900">Rp 1,05 Triliun</span>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-amber-600">
                  <ArrowDownRight className="h-3.5 w-3.5" />
                  <span>Penyaluran berjalan 54.2%</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">Pajak Daerah (PAD)</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-light text-yellow">
                  <Landmark className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-extrabold text-slate-900">Rp 134,8 Miliar</span>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>Kenaikan 8.5% YoY</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">Status Keuangan</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-extrabold text-slate-900">WTP (Opini BPK)</span>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <span>7 Tahun Berturut-turut</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Budget Explorer with Custom Visual Chart */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Interactive Column (Budget Composition List) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Struktur Komposisi APBD</h3>
                  <p className="text-xs text-slate-500">Klik kategori untuk melihat sub-item dan rincian alokasi</p>
                </div>
                {/* View Type Toggle */}
                <div className="inline-flex rounded-xl bg-slate-100 p-1 self-start">
                  <button
                    onClick={() => handleTypeChange("revenue")}
                    className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                      viewType === "revenue"
                        ? "bg-[#0042A5] text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Pendapatan
                  </button>
                  <button
                    onClick={() => handleTypeChange("expenditure")}
                    className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                      viewType === "expenditure"
                        ? "bg-[#0042A5] text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Belanja Daerah
                  </button>
                </div>
              </div>

              {/* Budget Items Bars list */}
              <div className="mt-6 space-y-5">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Kategori Penerimaan / Pengeluaran</span>
                  <span>Jumlah (Persentase)</span>
                </div>

                {currentItems.map((item, idx) => {
                  const isSelected = selectedCategory.category === item.category;
                  const colorParts = getColorClass(idx).split(" ");
                  const progressColor = getProgressColorClass(idx);

                  return (
                    <div
                      key={item.category}
                      onClick={() => setSelectedCategory(item)}
                      className={`group cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                        isSelected
                          ? "border-slate-900 bg-slate-50 shadow-sm"
                          : "border-slate-100 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-extrabold ${colorParts[0]} ${colorParts[1]} bg-opacity-10`}>
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-slate-800 group-hover:text-slate-950">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-slate-900">
                            Rp {item.value} Miliar
                          </span>
                          <span className="ml-1.5 text-xs font-bold text-slate-500">
                            ({item.percentage}%)
                          </span>
                        </div>
                      </div>

                      {/* Progress bar visualizer */}
                      <div className="mt-3.5 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${progressColor} transition-all duration-500`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Budget Visual Chart representation using beautiful stacked percentage bar */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Visual Proporsi Alokasi Makro ({viewType === "revenue" ? "Pendapatan" : "Belanja"})
                </h4>
                <div className="flex h-8 w-full rounded-xl overflow-hidden shadow-inner bg-slate-50">
                  {currentItems.map((item, idx) => (
                    <div
                      key={item.category}
                      title={`${item.category}: ${item.percentage}%`}
                      className={`${getProgressColorClass(idx)} h-full transition-all duration-200 hover:opacity-90 relative cursor-pointer`}
                      style={{ width: `${item.percentage}%` }}
                      onClick={() => setSelectedCategory(item)}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-2xs font-semibold text-slate-500">
                  {currentItems.map((item, idx) => (
                    <div key={item.category} className="flex items-center gap-1.5">
                      <span className={`h-2.5 w-2.5 rounded bg-transparent ${getProgressColorClass(idx)}`} />
                      <span>{item.category} ({item.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Detail Panel Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-4">
                  <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
                    <HelpCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Detail Anggaran</h3>
                    <h4 className="text-base font-extrabold text-slate-900">{selectedCategory.category}</h4>
                  </div>
                </div>

                {/* Interactive SVG Donut Chart */}
                <DonutChart 
                  items={currentItems} 
                  selectedItem={selectedCategory} 
                  onSelect={setSelectedCategory} 
                  getProgressColor={getProgressColorClass} 
                />

                <div className="space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                    {selectedCategory.details}
                  </p>

                  {/* Breakdown List */}
                  {selectedCategory.subItems && selectedCategory.subItems.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Rincian Sub-Anggaran
                      </h5>
                      <div className="divide-y divide-slate-100">
                        {selectedCategory.subItems.map((sub) => (
                          <div key={sub.name} className="flex items-center justify-between py-2.5 text-sm">
                            <span className="font-medium text-slate-600">{sub.name}</span>
                            <span className="font-bold text-slate-900">
                              Rp {sub.value} Miliar
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Total Card */}
                  <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Kategori</span>
                      <p className="text-xs text-slate-500">Tercatat dalam Kas BKD</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-slate-900">
                        Rp {selectedCategory.value} Miliar
                      </span>
                      <p className="text-xs font-bold text-primary">
                        {selectedCategory.percentage}% Dari Total APBD
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informational Callout */}
              <div className="rounded-3xl bg-slate-900 text-white p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Landmark className="h-24 w-24" />
                </div>
                <h4 className="font-sans text-base font-extrabold text-white">Butuh Informasi Lebih Detail?</h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Anda bisa menanyakan rincian regulasi perpajakan daerah, tata cara pengajuan keberatan pajak, atau dasar hukum pengelolaan APBD Pangkalpinang kepada <strong className="text-[#10b981]">Asisten FinAI</strong> kami pada tab menu di atas.
                </p>
                <div className="mt-4 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]"></span>
                  <span className="text-3xs font-mono tracking-widest text-[#10b981] uppercase">
                    INTEGRASI DATA BKD PANGKALPINANG
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
