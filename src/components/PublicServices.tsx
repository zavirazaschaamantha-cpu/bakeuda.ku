import React, { useState } from "react";
import { Search, FileText, CheckSquare, Download, AlertCircle, QrCode, CreditCard, ChevronRight, Check } from "lucide-react";

export default function PublicServices() {
  const [nopQuery, setNopQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [selectedBillToPay, setSelectedBillToPay] = useState<any | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Mock NOP database for Pangkalpinang (Format: 19.71.XXX.XXX.XXX-XXXX.X)
  const mockNopDb: Record<string, any> = {
    "197103001200100230": {
      nop: "19.71.030.012.001-0023.0",
      owner: "H. Sulaiman Rahman",
      address: "Jl. Ahmad Yani No. 42, Kel. Batin Tikal, Kec. Taman Sari, Kota Pangkalpinang",
      bills: [
        { year: 2026, amount: 485000, status: "UNPAID", dueDate: "30 September 2026" },
        { year: 2025, amount: 485000, status: "PAID", payDate: "12 Agustus 2025" },
        { year: 2024, amount: 460000, status: "PAID", payDate: "10 September 2024" },
      ],
    },
    "197101000500801500": {
      nop: "19.71.010.005.008-0150.0",
      owner: "Ibu Kartika Sari",
      address: "Perumahan Pangkalbalam Lestari Blok C No. 12, Kec. Pangkalbalam, Kota Pangkalpinang",
      bills: [
        { year: 2026, amount: 215000, status: "UNPAID", dueDate: "30 September 2026" },
        { year: 2025, amount: 215000, status: "UNPAID", dueDate: "30 September 2025" },
        { year: 2024, amount: 195000, status: "PAID", payDate: "15 September 2024" },
      ],
    },
  };

  const handleSearchNop = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchResult(null);

    // Clean query (remove dots, dashes, spaces)
    const cleaned = nopQuery.replace(/[\s.-]/g, "");

    setTimeout(() => {
      setIsSearching(false);
      if (mockNopDb[cleaned]) {
        setSearchResult(mockNopDb[cleaned]);
      } else {
        setSearchResult("NOT_FOUND");
      }
    }, 800);
  };

  const fillSampleNop = (sample: string) => {
    setNopQuery(sample);
  };

  const triggerPayment = (bill: any) => {
    setSelectedBillToPay(bill);
    setPaymentSuccess(false);
  };

  const handleConfirmPayment = () => {
    // Simulate payment process
    setTimeout(() => {
      setPaymentSuccess(true);
      // Update result state locally to reflect paid status
      if (searchResult && searchResult !== "NOT_FOUND") {
        const updatedBills = searchResult.bills.map((b: any) => {
          if (b.year === selectedBillToPay.year) {
            return { ...b, status: "PAID", payDate: "Hari Ini (QRIS BKD)" };
          }
          return b;
        });
        setSearchResult({ ...searchResult, bills: updatedBills });
      }
    }, 1500);
  };

  const serviceGuidelines = [
    {
      title: "Pendaftaran Wajib Pajak PBB-P2 Baru",
      requirements: [
        "Isi Formulir SPOP (Surat Pemberitahuan Objek Pajak) & LSPOP.",
        "Fotokopi KTP pemilik tanah/bangunan.",
        "Fotokopi Sertifikat Tanah atau Surat Keterangan Tanah (SKT) dari Kelurahan/Kecamatan.",
        "Fotokopi Izin Mendirikan Bangunan (IMB/PBG) jika ada.",
        "Foto fisik objek pajak (tanah dan bangunan tampak depan).",
      ],
    },
    {
      title: "Prosedur Validasi BPHTB",
      requirements: [
        "Isi Formulir Surat Setoran Pajak Daerah (SSPD-BPHTB) - 5 Lembar.",
        "Fotokopi sertifikat tanah hasil transaksi.",
        "Fotokopi Akta Jual Beli (AJB) atau draf AJB dari PPAT/Notaris.",
        "Fotokopi SPPT PBB tahun berjalan & fotokopi bukti lunas pembayaran (STTS/DHKP).",
        "Fotokopi KTP pembeli dan penjual, serta NPWP pembeli.",
      ],
    },
    {
      title: "Mutasi / Balik Nama SPPT PBB-P2",
      requirements: [
        "Mengisi Formulir Permohonan Mutasi Objek/Subjek Pajak.",
        "Fotokopi bukti perolehan hak (Sertifikat/AJB/Keterangan Waris).",
        "Fotokopi SPPT PBB asli tahun terakhir.",
        "Fotokopi bukti bayar lunas PBB (tanpa tunggakan tahun sebelumnya).",
        "Fotokopi KTP Wajib Pajak baru.",
      ],
    },
  ];

  const formsToDownload = [
    { title: "Formulir SPOP PBB-P2 Baru", size: "1.2 MB", format: "PDF" },
    { title: "Formulir Surat Setoran SSPD-BPHTB", size: "2.4 MB", format: "PDF" },
    { title: "Formulir Permohonan Keberatan PBB", size: "850 KB", format: "PDF" },
    { title: "Formulir Pendaftaran Objek Pajak Reklame", size: "1.1 MB", format: "PDF" },
    { title: "Formulir Pendaftaran Pajak PBJT Restoran/Hotel", size: "1.5 MB", format: "PDF" },
    { title: "Panduan Tata Cara E-SPTPD Mandiri", size: "3.8 MB", format: "PDF" },
  ];

  return (
    <div id="public-services" className="space-y-8 animate-fade-in">
      {/* 1. NOP Bill Checker Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Checker Portal */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" /> E-PBB Online Bill Checker
            </h3>
            <p className="text-xs text-slate-500">Cari tagihan PBB-P2 Kota Pangkalpinang secara instan menggunakan Nomor Objek Pajak (NOP)</p>
          </div>

          <form onSubmit={handleSearchNop} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Contoh: 19.71.030.012.001-0023.0"
              value={nopQuery}
              onChange={(e) => setNopQuery(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="rounded-xl bg-primary hover:bg-primary/95 text-white px-6 py-3 text-sm font-bold shadow-sm transition active:scale-98 disabled:opacity-50"
            >
              {isSearching ? "Mencari..." : "Periksa Tagihan"}
            </button>
          </form>

          {/* Quick Sample Links */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-widest">Gunakan Contoh NOP:</span>
            <button
              onClick={() => fillSampleNop("19.71.030.012.001-0023.0")}
              className="rounded-lg bg-accent hover:bg-accent/80 px-2.5 py-1 font-semibold text-primary transition"
            >
              NOP Sulaiman (Lunas Sebagian)
            </button>
            <button
              onClick={() => fillSampleNop("19.71.010.005.008-0150.0")}
              className="rounded-lg bg-accent hover:bg-accent/80 px-2.5 py-1 font-semibold text-primary transition"
            >
              NOP Kartika (Ada Tunggakan)
            </button>
          </div>

          {/* Search Result Display */}
          {searchResult === "NOT_FOUND" && (
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 flex gap-3 text-sm text-amber-800">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Nomor Objek Pajak Tidak Ditemukan!</span>
                <p className="mt-1 text-xs text-amber-700">
                  NOP yang Anda masukkan belum terdaftar dalam sistem simulasi kami. Pastikan format NOP benar (18 digit angka) atau gunakan tombol contoh di atas untuk mencoba fitur simulasi.
                </p>
              </div>
            </div>
          )}

          {searchResult && searchResult !== "NOT_FOUND" && (
            <div className="border-t border-slate-100 pt-6 space-y-5 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 text-sm">
                <div>
                  <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Nomor Objek Pajak (NOP)</span>
                  <span className="font-bold text-slate-800">{searchResult.nop}</span>
                </div>
                <div>
                  <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Wajib Pajak (Pemilik)</span>
                  <span className="font-bold text-slate-800">{searchResult.owner}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Alamat Objek Pajak</span>
                  <span className="font-medium text-slate-700 leading-relaxed">{searchResult.address}</span>
                </div>
              </div>

              {/* Bill Tables */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-semibold text-slate-600">
                  <thead>
                    <tr className="border-b border-slate-100 text-3xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-2">Tahun Pajak</th>
                      <th className="py-2">Batas Tempo</th>
                      <th className="py-2 text-right">Jumlah Tagihan</th>
                      <th className="py-2 text-center">Status</th>
                      <th className="py-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {searchResult.bills.map((bill: any) => (
                      <tr key={bill.year} className="hover:bg-slate-50/50 transition duration-150">
                        <td className="py-3 text-slate-950 font-bold">{bill.year}</td>
                        <td className="py-3 text-xs">{bill.dueDate || "-"}</td>
                        <td className="py-3 text-right font-bold text-slate-950">
                          {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(bill.amount)}
                        </td>
                        <td className="py-3 text-center">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-3xs font-bold ${
                            bill.status === "PAID"
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10"
                              : "bg-rose-50 text-rose-700 ring-1 ring-rose-600/10 animate-pulse"
                          }`}>
                            {bill.status === "PAID" ? "LUNAS" : "TERHUTANG"}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          {bill.status === "PAID" ? (
                            <span className="text-3xs text-slate-400 font-medium italic block">
                              Dibayar: {bill.payDate}
                            </span>
                          ) : (
                            <button
                              onClick={() => triggerPayment(bill)}
                              className="rounded-lg bg-primary hover:bg-primary/90 text-white px-3 py-1.5 text-xs font-bold shadow-sm transition"
                            >
                              Bayar Pajak
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Requirements Directory Panel */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-4 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="h-4.5 w-4.5 text-primary" /> Persyaratan Administrasi
            </h3>
            <p className="text-xs text-slate-500">Berkas dokumen resmi wajib untuk pengajuan layanan ke Kantor BKD</p>
          </div>

          <div className="space-y-4">
            {serviceGuidelines.map((serv, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-slate-100 p-4 [&_summary::-webkit-details-marker]:hidden bg-slate-50/20 hover:bg-slate-50 transition"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-sm font-bold text-slate-800">
                  <span>{serv.title}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400 transition duration-300 group-open:rotate-90 shrink-0" />
                </summary>
                <div className="mt-3 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-600 space-y-2">
                  {serv.requirements.map((req, rIdx) => (
                    <div key={rIdx} className="flex gap-2">
                      <span className="font-extrabold text-primary shrink-0">✓</span>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Download Forms Section */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Unduh Dokumen Formulir BKD
          </h3>
          <p className="text-xs text-slate-500">Unduh blanko isian formulir resmi untuk mempercepat pendaftaran administrasi keuangan dan perpajakan Anda</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {formsToDownload.map((form, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-100 bg-slate-50/20 p-4 hover:border-slate-300 hover:bg-slate-50 transition flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-800 leading-snug block">{form.title}</span>
                <span className="text-3xs font-semibold text-slate-400 block uppercase">
                  {form.format} • {form.size}
                </span>
              </div>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary hover:bg-primary hover:text-white shadow-xs transition"
                title="Download Blanko"
                onClick={() => console.log(`Pengunduhan formulir "${form.title}" berhasil disimulasikan.`)}
              >
                <Download className="h-4.5 w-4.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* QRIS PAYMENT POPUP PORTAL (Simulated dialog) */}
      {selectedBillToPay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl border border-slate-200/80 space-y-6 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-extrabold text-slate-900">Pembayaran QRIS BKD Pangkalpinang</h4>
              <button
                onClick={() => setSelectedBillToPay(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 hover:underline bg-transparent border-none cursor-pointer"
              >
                Batal
              </button>
            </div>

            {!paymentSuccess ? (
              <div className="space-y-5 text-center">
                <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 p-4 relative">
                  {/* Outer QR graphic representing standard QRIS code */}
                  <QrCode className="h-full w-full text-slate-800" />
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70 opacity-0 hover:opacity-100 transition duration-200">
                    <span className="text-2xs font-extrabold text-slate-900 bg-slate-100 px-2 py-1 rounded">QRIS Dinamis</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-sm font-semibold text-slate-600">
                  <p className="text-xs text-slate-400">PINDAI DENGAN APLIKASI MOBILE BANKING / E-WALLET</p>
                  <p className="text-slate-900">Wajib Pajak: <strong className="font-extrabold text-slate-950">{searchResult.owner}</strong></p>
                  <p className="text-slate-900">Tagihan PBB Tahun: <strong className="font-bold text-slate-950">{selectedBillToPay.year}</strong></p>
                  <div className="bg-accent border border-primary/10 rounded-xl p-3 mt-3">
                    <span className="text-3xs font-bold text-primary block tracking-widest">NOMINAL PEMBAYARAN</span>
                    <span className="text-xl font-black text-primary">
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(selectedBillToPay.amount)}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleConfirmPayment}
                    className="w-full rounded-xl bg-primary hover:bg-primary/95 text-white py-3 text-sm font-extrabold shadow-sm transition"
                  >
                    Saya Sudah Membayar (Simulasi Sukses)
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-center py-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-scale-up">
                  <Check className="h-8 w-8 stroke-[3px]" />
                </div>
                <div className="space-y-2">
                  <h5 className="text-lg font-black text-slate-900">Pembayaran Berhasil!</h5>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    Terima kasih telah membayar Pajak Bumi dan Bangunan Anda. Kas Daerah mencatat transaksi pembayaran tagihan tahun <strong className="text-slate-800 font-bold">{selectedBillToPay.year}</strong> lunas.
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setSelectedBillToPay(null)}
                    className="w-full rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 text-sm font-bold transition"
                  >
                    Tutup Dialog
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
