import React, { useState } from "react";
import { TrendingUp, ArrowDownRight, ArrowUpRight, ShieldCheck, HelpCircle, Landmark, Coins, Briefcase } from "lucide-react";
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
      {/* Intro Hero Section with Regional Branding */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl min-h-[220px] flex items-center">
        {/* Background Image with elegant overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/kantor_bkd_pangkalpinang_1783322183344.jpg" 
            alt="Kantor BKD Kota Pangkalpinang" 
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-slate-950/80" />
        </div>
        
        <div className="relative z-10 max-w-2xl p-8">
          <span className="font-mono text-xs font-bold tracking-widest text-yellow uppercase bg-yellow/10 px-3 py-1 rounded-full backdrop-blur-xs inline-block mb-2">
            Transparansi Anggaran Daerah
          </span>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl text-white">
            APBD Kota Pangkalpinang Tahun {data.year}
          </h2>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Portal interaktif pengelolaan APBD (Anggaran Pendapatan dan Belanja Daerah) Kota Pangkalpinang. Kami berkomitmen menyajikan data keuangan secara terbuka, akuntabel, dan mudah dipahami oleh seluruh warga Kota Beribu Senyuman.
          </p>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all duration-200 ${
                  viewType === "revenue"
                    ? "bg-primary text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Pendapatan
              </button>
              <button
                onClick={() => handleTypeChange("expenditure")}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all duration-200 ${
                  viewType === "expenditure"
                    ? "bg-primary text-white shadow-sm"
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
              Anda bisa menanyakan rincian regulasi perpajakan daerah, tata cara pengajuan keberatan pajak, atau dasar hukum pengelolaan APBD Pangkalpinang kepada <strong className="text-secondary">Asisten FinAI</strong> kami pada tab menu di atas.
            </p>
            <div className="mt-4 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
              <span className="text-3xs font-mono tracking-widest text-secondary uppercase">
                INTEGRASI DATA BKD PANGKALPINANG
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
