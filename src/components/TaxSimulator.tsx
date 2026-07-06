import React, { useState, useEffect } from "react";
import { Calculator, LandPlot, Building, HelpCircle, FileCheck, RefreshCw, Printer } from "lucide-react";
import { PBBCalculatorInput, PBBCalculatorResult, BPHTBCalculatorInput, BPHTBCalculatorResult } from "../types";

export default function TaxSimulator() {
  const [activeTaxType, setActiveTaxType] = useState<"pbb" | "bphtb">("pbb");

  // PBB-P2 States
  const [pbbInput, setPbbInput] = useState<PBBCalculatorInput>({
    njopBumiPerM2: 500000, // Rp 500,000 per m2
    luasBumi: 120, // 120 m2
    njopBangunanPerM2: 1200000, // Rp 1,200,000 per m2
    luasBangunan: 70, // 70 m2
  });

  const [pbbResult, setPbbResult] = useState<PBBCalculatorResult>({
    totalNjopBumi: 0,
    totalNjopBangunan: 0,
    totalNjop: 0,
    njoptkp: 15000000, // Rp 15 Juta
    njopKp: 0,
    tarif: 0.001,
    pbbTerhutang: 0,
  });

  // BPHTB States
  const [bphtbInput, setBphtbInput] = useState<BPHTBCalculatorInput>({
    perolehanNilai: 250000000, // Rp 250 Juta
    jenisPerolehan: "jual_beli",
  });

  const [bphtbResult, setBphtbResult] = useState<BPHTBCalculatorResult>({
    nilaiTransaksi: 0,
    npoptkp: 60000000, // Rp 60 Juta
    npopkp: 0,
    tarif: 0.05, // 5%
    bphtbTerhutang: 0,
  });

  // Format currency helpers
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Live PBB calculation effect
  useEffect(() => {
    const totalNjopBumi = pbbInput.njopBumiPerM2 * pbbInput.luasBumi;
    const totalNjopBangunan = pbbInput.njopBangunanPerM2 * pbbInput.luasBangunan;
    const totalNjop = totalNjopBumi + totalNjopBangunan;
    const njoptkp = 15000000; // Rp 15 Juta standard Pangkalpinang
    const njopKp = Math.max(0, totalNjop - njoptkp);

    // Pangkalpinang PBB Brackets:
    // NJOP s/d Rp 1 Miliar = 0.1%
    // NJOP > Rp 1 Miliar s/d Rp 2 Miliar = 0.15%
    // NJOP > Rp 2 Miliar = 0.2%
    let tarif = 0.001;
    if (totalNjop > 2000000000) {
      tarif = 0.002;
    } else if (totalNjop > 1000000000) {
      tarif = 0.0015;
    }

    const pbbTerhutang = njopKp * tarif;

    setPbbResult({
      totalNjopBumi,
      totalNjopBangunan,
      totalNjop,
      njoptkp,
      njopKp,
      tarif,
      pbbTerhutang,
    });
  }, [pbbInput]);

  // Live BPHTB calculation effect
  useEffect(() => {
    const nilaiTransaksi = bphtbInput.perolehanNilai;
    
    // NPOPTKP Kota Pangkalpinang:
    // Jual beli / Hibah: Rp 60 Juta
    // Waris: Rp 300 Juta
    const npoptkp = bphtbInput.jenisPerolehan === "waris" ? 300000000 : 60000000;
    const npopkp = Math.max(0, nilaiTransaksi - npoptkp);
    const tarif = 0.05; // 5% flat
    const bphtbTerhutang = npopkp * tarif;

    setBphtbResult({
      nilaiTransaksi,
      npoptkp,
      npopkp,
      tarif,
      bphtbTerhutang,
    });
  }, [bphtbInput]);

  const resetPbb = () => {
    setPbbInput({
      njopBumiPerM2: 500000,
      luasBumi: 120,
      njopBangunanPerM2: 1200000,
      luasBangunan: 70,
    });
  };

  const resetBphtb = () => {
    setBphtbInput({
      perolehanNilai: 250000000,
      jenisPerolehan: "jual_beli",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="tax-simulator" className="space-y-8 animate-fade-in print:p-0">
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary shadow-sm">
            <Calculator className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Simulator Pajak Daerah</h2>
            <p className="text-sm text-slate-500">Hitung perkiraan kewajiban Pajak PBB-P2 dan BPHTB secara mandiri dan transparan</p>
          </div>
        </div>

        {/* Tax Type Toggle */}
        <div className="inline-flex rounded-2xl bg-slate-100 p-1 self-start md:self-auto border border-slate-200/50">
          <button
            onClick={() => setActiveTaxType("pbb")}
            className={`rounded-xl px-5 py-2 text-xs font-bold transition-all duration-200 ${
              activeTaxType === "pbb"
                ? "bg-primary text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            PBB-P2 Bumi & Bangunan
          </button>
          <button
            onClick={() => setActiveTaxType("bphtb")}
            className={`rounded-xl px-5 py-2 text-xs font-bold transition-all duration-200 ${
              activeTaxType === "bphtb"
                ? "bg-primary text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            BPHTB Transaksi Tanah/Bangunan
          </button>
        </div>
      </div>

      {activeTaxType === "pbb" ? (
        /* PBB SIMULATOR PANEL */
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Inputs Column */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-sans text-base font-extrabold text-slate-900">Input Data Objek Pajak (PBB)</h3>
              <button
                onClick={resetPbb}
                className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 hover:underline bg-transparent border-none"
              >
                <RefreshCw className="h-3 w-3" /> Reset
              </button>
            </div>

            {/* Bumi / Tanah */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <LandPlot className="h-4.5 w-4.5 text-primary" />
                <h4 className="text-sm font-bold text-slate-700">Penilaian Tanah (Bumi)</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Luas Tanah (m²)</label>
                  <input
                    type="number"
                    min="1"
                    value={pbbInput.luasBumi}
                    onChange={(e) => setPbbInput({ ...pbbInput, luasBumi: Math.max(1, parseInt(e.target.value) || 0) })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">NJOP Tanah per m² (Rp)</label>
                  <select
                    value={pbbInput.njopBumiPerM2}
                    onChange={(e) => setPbbInput({ ...pbbInput, njopBumiPerM2: parseInt(e.target.value) })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
                  >
                    <option value={200000}>Rp 200.000 (Kelas Menengah Kebawah)</option>
                    <option value={500000}>Rp 500.000 (Kelas Menengah)</option>
                    <option value={1000000}>Rp 1.000.000 (Strategis Kota)</option>
                    <option value={2500000}>Rp 2.500.000 (Premium / Pusat Bisnis)</option>
                    <option value={5000000}>Rp 5.000.000 (Sangat Premium)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bangunan */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Building className="h-4.5 w-4.5 text-primary" />
                <h4 className="text-sm font-bold text-slate-700">Penilaian Bangunan</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Luas Bangunan (m²)</label>
                  <input
                    type="number"
                    min="0"
                    value={pbbInput.luasBangunan}
                    onChange={(e) => setPbbInput({ ...pbbInput, luasBangunan: Math.max(0, parseInt(e.target.value) || 0) })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">NJOP Bangunan per m² (Rp)</label>
                  <select
                    value={pbbInput.njopBangunanPerM2}
                    onChange={(e) => setPbbInput({ ...pbbInput, njopBangunanPerM2: parseInt(e.target.value) })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
                  >
                    <option value={800000}>Rp 800.000 (Semi Permanen)</option>
                    <option value={1200000}>Rp 1.200.000 (Permanen Sederhana)</option>
                    <option value={2000000}>Rp 2.000.000 (Permanen Menengah)</option>
                    <option value={3500000}>Rp 3.500.000 (Mewah / Bertingkat)</option>
                    <option value={6000000}>Rp 6.000.000 (Sangat Mewah)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Informational Guidelines Card */}
            <div className="rounded-2xl border border-primary/20 bg-accent/40 p-4 flex gap-3 text-xs leading-relaxed text-slate-700">
              <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Ketentuan PBB-P2 Pangkalpinang:</span>
                <ul className="list-disc list-inside mt-1 space-y-1 text-slate-600 font-medium">
                  <li>Batas NJOPTKP (Nilai Jual Objek Pajak Tidak Kena Pajak) ditetapkan sebesar <strong>Rp 15.000.000</strong> per Wajib Pajak.</li>
                  <li>Tarif Pajak Progresif: s/d Rp 1 Miliar = <strong>0,1%</strong>; &gt; Rp 1 M s/d Rp 2 M = <strong>0,15%</strong>; &gt; Rp 2 M = <strong>0,2%</strong>.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Results/Receipt Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-sans text-base font-extrabold text-slate-900">Perhitungan Estimasi PBB</h3>
                </div>
                <button
                  onClick={handlePrint}
                  className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition shadow-xs animate-scale-up"
                  title="Cetak Hasil Simulasi"
                >
                  <Printer className="h-4 w-4" />
                </button>
              </div>

              {/* Receipt Body */}
              <div className="space-y-4 text-sm font-semibold text-slate-600">
                <div className="flex justify-between">
                  <span>NJOP Bumi (Tanah)</span>
                  <span className="text-slate-900">{formatRupiah(pbbResult.totalNjopBumi)}</span>
                </div>
                <div className="flex justify-between">
                  <span>NJOP Bangunan</span>
                  <span className="text-slate-900">{formatRupiah(pbbResult.totalNjopBangunan)}</span>
                </div>

                <div className="flex justify-between border-t border-slate-100 pt-3.5 font-bold">
                  <span>Total NJOP Objek</span>
                  <span className="text-slate-900">{formatRupiah(pbbResult.totalNjop)}</span>
                </div>

                <div className="flex justify-between text-rose-600">
                  <span>Pengurang (NJOPTKP)</span>
                  <span>- {formatRupiah(pbbResult.njoptkp)}</span>
                </div>

                <div className="flex justify-between border-t border-slate-100 pt-3.5 font-extrabold">
                  <span>NJOP Kena Pajak (NJOP-KP)</span>
                  <span className="text-slate-900">{formatRupiah(pbbResult.njopKp)}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span>Tarif Pajak Berlaku</span>
                  <span className="rounded bg-accent px-2 py-0.5 font-bold text-primary">
                    {(pbbResult.tarif * 100).toFixed(2)}%
                  </span>
                </div>

                {/* Main Estimated Tax Owed Card */}
                <div className="rounded-2xl bg-primary text-white p-5 border border-primary shadow-md">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-widest block">
                    PBB Terhutang Estimasi
                  </span>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold text-secondary">
                      {formatRupiah(pbbResult.pbbTerhutang)}
                    </span>
                    <span className="text-3xs text-slate-300 font-mono">/ Tahun</span>
                  </div>
                  <p className="mt-3 text-3xs text-slate-300 font-medium leading-relaxed border-t border-white/10 pt-2.5">
                    *Ini merupakan simulasi perhitungan berdasarkan tarif Perda Kota Pangkalpinang. Jumlah riil dapat bervariasi tergantung keputusan penilaian resmi BKD.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* BPHTB SIMULATOR PANEL */
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Inputs Column */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-sans text-base font-extrabold text-slate-900">Input Data Transaksi (BPHTB)</h3>
              <button
                onClick={resetBphtb}
                className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 hover:underline bg-transparent border-none"
              >
                <RefreshCw className="h-3 w-3" /> Reset
              </button>
            </div>

            {/* Input Perolehan */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">Jenis Perolehan Hak</label>
                <select
                  value={bphtbInput.jenisPerolehan}
                  onChange={(e) => setBphtbInput({ ...bphtbInput, jenisPerolehan: e.target.value as any })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
                >
                  <option value="jual_beli">Jual Beli (Umum)</option>
                  <option value="waris">Waris / Warisan</option>
                  <option value="hibah">Hibah / Pemberian Sukarela</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">
                  Nilai Transaksi / Perolehan Objek Pajak (NPOP) - Rp
                </label>
                <input
                  type="number"
                  min="0"
                  step="5000000"
                  value={bphtbInput.perolehanNilai}
                  onChange={(e) => setBphtbInput({ ...bphtbInput, perolehanNilai: Math.max(0, parseInt(e.target.value) || 0) })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
                />
                <span className="text-3xs text-slate-400 mt-1 block">
                  *Gunakan nilai transaksi riil atau NJOP terbesar dari tanah/bangunan tersebut.
                </span>
              </div>
            </div>

            {/* Guidelines BPHTB */}
            <div className="rounded-2xl border border-primary/20 bg-accent/40 p-4 flex gap-3 text-xs leading-relaxed text-slate-700">
              <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Ketentuan BPHTB Pangkalpinang:</span>
                <ul className="list-disc list-inside mt-1 space-y-1 text-slate-600 font-medium">
                  <li>Batas NPOPTKP (Penyusutan Nilai Objek Tidak Kena Pajak) sebesar <strong>Rp 60.000.000</strong> untuk Jual Beli / Hibah.</li>
                  <li>Batas NPOPTKP khusus Waris diberikan sebesar <strong>Rp 300.000.000</strong>.</li>
                  <li>Tarif BPHTB flat sebesar <strong>5%</strong> dari Nilai Perolehan Objek Pajak Kena Pajak (NPOP-KP).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Results BPHTB */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-sans text-base font-extrabold text-slate-900">Perhitungan Estimasi BPHTB</h3>
                </div>
                <button
                  onClick={handlePrint}
                  className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition shadow-xs"
                >
                  <Printer className="h-4 w-4" />
                </button>
              </div>

              {/* Receipt Body */}
              <div className="space-y-4 text-sm font-semibold text-slate-600">
                <div className="flex justify-between">
                  <span>Nilai Transaksi (NPOP)</span>
                  <span className="text-slate-900">{formatRupiah(bphtbResult.nilaiTransaksi)}</span>
                </div>

                <div className="flex justify-between text-rose-600 border-b border-slate-100 pb-3.5">
                  <span>Pengurang (NPOPTKP {bphtbInput.jenisPerolehan === "waris" ? "Waris" : "Umum"})</span>
                  <span>- {formatRupiah(bphtbResult.npoptkp)}</span>
                </div>

                <div className="flex justify-between font-extrabold text-base text-slate-900">
                  <span>NPOP Kena Pajak (NPOP-KP)</span>
                  <span>{formatRupiah(bphtbResult.npopkp)}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span>Tarif Pajak BPHTB</span>
                  <span className="rounded bg-accent px-2 py-0.5 font-bold text-primary">
                    {(bphtbResult.tarif * 100).toFixed(0)}%
                  </span>
                </div>

                {/* Estimated BPHTB Owed Card */}
                <div className="rounded-2xl bg-primary text-white p-5 border border-primary shadow-md">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-widest block">
                    BPHTB Terhutang Estimasi
                  </span>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold text-secondary">
                      {formatRupiah(bphtbResult.bphtbTerhutang)}
                    </span>
                    <span className="text-3xs text-slate-300 font-mono">/ Bayar Sekali</span>
                  </div>
                  <p className="mt-3 text-3xs text-slate-300 font-medium leading-relaxed border-t border-white/10 pt-2.5">
                    *Perhitungan ini merupakan simulasi estimasi awal untuk kepentingan perencanaan perpajakan. Pembayaran BPHTB riil divalidasi oleh verifikator BPHTB di kantor BKD atau sistem e-BPHTB terintegrasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
