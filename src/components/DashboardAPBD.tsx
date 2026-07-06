import React, { useState } from "react";
import { TrendingUp, ArrowDownRight, ArrowUpRight, ShieldCheck, HelpCircle, Landmark, Coins, Briefcase } from "lucide-react";
import { APBDData, APBDItem } from "../types";

// Realistic APBD Data for Kota Pangkalpinang (around Rp 1.08 Triliun)
const KOTA_PANGKALPINANG_APBD: APBDData = {
  year: 2026,
  revenue: {
    total: 1050, // Miliar Rupiah
    items: [
      {
        category: "Pajak Daerah",
        value: 125,
        percentage: 11.9,
        details: "Penerimaan dari Pajak Bumi & Bangunan (PBB), BPHTB, Pajak Restoran, Hotel, Penerangan Jalan, Reklame, dll.",
        subItems: [
          { name: "Pajak Bumi dan Bangunan (PBB-P2)", value: 35 },
          { name: "BPHTB (Bea Perolehan Hak Tanah & Bangunan)", value: 40 },
          { name: "Pajak Barang & Jasa Tertentu (Restoran/Hotel/dll)", value: 32 },
          { name: "Pajak Reklame & Air Tanah", value: 18 },
        ]
      },
      {
        category: "Retribusi Daerah",
        value: 25,
        percentage: 2.4,
        details: "Penerimaan dari pelayanan pasar, parkir tepi jalan umum, kebersihan, perizinan tertentu, dan pelayanan kesehatan.",
        subItems: [
          { name: "Retribusi Jasa Umum", value: 12 },
          { name: "Retribusi Jasa Usaha", value: 8 },
          { name: "Retribusi Perizinan Tertentu", value: 5 },
        ]
      },
      {
        category: "Dana Transfer Pusat",
        value: 820,
        percentage: 78.1,
        details: "Dana Alokasi Umum (DAU), Dana Alokasi Khusus (DAK), dan Dana Bagi Hasil (DBH) dari Pemerintah Pusat.",
        subItems: [
          { name: "Dana Alokasi Umum (DAU)", value: 510 },
          { name: "Dana Alokasi Khusus (DAK) Fisik & Non-Fisik", value: 210 },
          { name: "Dana Bagi Hasil (DBH) Pajak/Sumber Daya", value: 100 },
        ]
      },
      {
        category: "Lain-lain Pendapatan yang Sah",
        value: 80,
        percentage: 7.6,
        details: "Pendapatan hibah, dana darurat, dan bagi hasil pajak dari pemerintah provinsi Bangka Belitung.",
        subItems: [
          { name: "Bagi Hasil Pajak Provinsi", value: 65 },
          { name: "Pendapatan Hibah & Dana Lainnya", value: 15 },
        ]
      }
    ]
  },
  expenditure: {
    total: 1080, // Miliar Rupiah
    items: [
      {
        category: "Belanja Operasi",
        value: 810,
        percentage: 75.0,
        details: "Pengeluaran rutin untuk gaji pegawai (ASN/P3K), belanja barang dan jasa dinas, hibah, serta bantuan sosial masyarakat.",
        subItems: [
          { name: "Belanja Pegawai (Gaji & Tunjangan)", value: 420 },
          { name: "Belanja Barang & Jasa Operasional", value: 310 },
          { name: "Belanja Hibah & Bantuan Sosial", value: 80 },
        ]
      },
      {
        category: "Belanja Modal",
        value: 190,
        percentage: 17.6,
        details: "Pembangunan aset tetap daerah seperti infrastruktur jalan kota, jembatan, renovasi sekolah, gedung layanan, dan fasilitas umum.",
        subItems: [
          { name: "Pembangunan Jalan & Jembatan", value: 85 },
          { name: "Sarana Pendidikan & Kesehatan", value: 65 },
          { name: "Peralatan, Mesin & Teknologi Informasi", value: 40 },
        ]
      },
      {
        category: "Belanja Tidak Terduga",
        value: 15,
        percentage: 1.4,
        details: "Anggaran darurat untuk penanggulangan bencana alam, bantuan sosial darurat luar biasa, dan kebutuhan mendesak yang belum direncanakan.",
        subItems: [
          { name: "Tanggap Darurat Kebencanaan", value: 10 },
          { name: "Belanja Mendesak Lainnya", value: 5 },
        ]
      },
      {
        category: "Belanja Transfer",
        value: 65,
        percentage: 6.0,
        details: "Bagi hasil pendapatan ke kelurahan-kelurahan di Kota Pangkalpinang serta bantuan keuangan khusus.",
        subItems: [
          { name: "Alokasi Dana Kelurahan", value: 45 },
          { name: "Bantuan Keuangan Khusus", value: 20 },
        ]
      }
    ]
  }
};

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
    const colors = ["bg-primary", "bg-slate-600", "bg-secondary", "bg-indigo-600"];
    return colors[index % colors.length];
  };

  return (
    <div id="dashboard-apbd" className="space-y-8 animate-fade-in">
      {/* Intro Hero Section with Regional Branding */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-slate-900 to-slate-900 p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <span className="font-mono text-xs font-bold tracking-widest text-secondary uppercase">
            Transparansi Anggaran Daerah
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl text-white">
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
            <span className="text-2xl font-extrabold text-slate-900">Rp 1,05 Triliun</span>
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
            <span className="text-2xl font-extrabold text-slate-900">Rp 1,08 Triliun</span>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-amber-600">
              <ArrowDownRight className="h-3.5 w-3.5" />
              <span>Penyaluran berjalan 54.2%</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Pajak Daerah (PAD)</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-secondary">
              <Landmark className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-extrabold text-slate-900">Rp 125 Miliar</span>
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
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <HelpCircle className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Detail Anggaran</h3>
                <h4 className="text-base font-extrabold text-slate-900">{selectedCategory.category}</h4>
              </div>
            </div>

            <div className="mt-5 space-y-4">
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
