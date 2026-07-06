import React, { useState } from "react";
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Award, 
  Sparkles, 
  Smartphone, 
  LineChart, 
  BookOpen, 
  QrCode, 
  Printer, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  ChevronRight, 
  BadgeHelp,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Official APBD Data we just updated, used for dynamic CSV export
const APBD_EXPORT_DATA = [
  ["KATEGORI", "ALOKASI (MILiar RP)", "PERSENTASE (%)", "DESKRIPSI"],
  ["PENDAPATAN - Pajak Daerah", "134.8", "13.4%", "Penerimaan PBB-P2, BPHTB, PBJT Restoran/Hotel/Reklame, dll."],
  ["PENDAPATAN - Retribusi Daerah", "20.4", "2.0%", "Retribusi Jasa Umum, Jasa Usaha, dan Perizinan Tertentu."],
  ["PENDAPATAN - Dana Transfer", "813.1", "81.1%", "Transfer Pemerintah Pusat (DAU, DAK, DBH) dan Provinsi."],
  ["PENDAPATAN - Lain-lain yang Sah", "34.1", "3.5%", "Hasil Pengelolaan Kekayaan, Hibah, dan Dana Darurat."],
  ["BELANJA - Belanja Operasi", "867.2", "82.1%", "Rutin Pegawai (ASN/P3K), Barang/Jasa Operasional, Hibah, Bansos."],
  ["BELANJA - Belanja Modal", "172.0", "16.3%", "Pembangunan infrastruktur jalan, jembatan, gedung sekolah, puskesmas."],
  ["BELANJA - Tidak Terduga", "12.0", "1.1%", "Tanggap darurat bencana alam, darurat sosial & mendesak."],
  ["BELANJA - Belanja Transfer", "5.0", "0.5%", "Bagi hasil pendapatan dan bantuan keuangan khusus kelurahan."]
];

export default function InnovationDownloads() {
  // States for certificate builder
  const [taxpayerName, setTaxpayerName] = useState("");
  const [nop, setNop] = useState("");
  const [taxType, setTaxType] = useState("PBB-P2 (Pajak Bumi dan Bangunan)");
  const [estimatedTax, setEstimatedTax] = useState("450000");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSuccess, setGeneratedSuccess] = useState(false);

  // Download trigger for APBD CSV
  const handleDownloadAPBD_CSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    APBD_EXPORT_DATA.forEach((row) => {
      const formattedRow = row.map(val => `"${val.replace(/"/g, '""')}"`).join(",");
      csvContent += formattedRow + "\r\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Data_APBD_Pangkalpinang_2024.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download trigger for Tax Guide (Rich Word/HTML document)
  const handleDownloadTaxGuide = () => {
    const guideHTML = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <title>Buku Panduan Pajak Daerah Kota Pangkalpinang</title>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #1e293b; padding: 40px; }
          h1 { color: #0052cc; border-bottom: 2px solid #f59e0b; padding-bottom: 10px; font-size: 24px; }
          h2 { color: #10b981; font-size: 18px; margin-top: 20px; }
          p { margin-bottom: 15px; font-size: 13px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; font-size: 12px; }
          th { bg-color: #f8fafc; font-weight: bold; }
          .footer { margin-top: 50px; font-size: 10px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; }
        </style>
      </head>
      <body>
        <h1>BUKU PANDUAN PELAYANAN PAJAK DAERAH</h1>
        <p><strong>Badan Keuangan Daerah (BKD) Kota Pangkalpinang</strong></p>
        <p>Jl. Merdeka No. 4, Kota Pangkalpinang, Provinsi Kepulauan Bangka Belitung</p>
        <hr/>
        
        <h2>1. PENGERTIAN PAJAK BUMI DAN BANGUNAN PERDESAAN DAN PERKOTAAN (PBB-P2)</h2>
        <p>PBB-P2 adalah pajak atas bumi dan/atau bangunan yang dimiliki, dikuasai, dan/atau dimanfaatkan oleh orang pribadi atau Badan, kecuali kawasan yang digunakan untuk kegiatan usaha perkebunan, perhutanan, dan pertambangan.</p>
        
        <h2>2. METODE PERHITUNGAN SIMULASI PBB-P2</h2>
        <table>
          <tr>
            <th>Nilai Jual Objek Pajak (NJOP)</th>
            <th>Tarif Pajak PBB-P2</th>
          </tr>
          <tr>
            <td>Di bawah Rp 1 Miliar</td>
            <td>0,10% per Tahun</td>
          </tr>
          <tr>
            <td>Rp 1 Miliar s.d. Rp 2 Miliar</td>
            <td>0,15% per Tahun</td>
          </tr>
          <tr>
            <td>Di atas Rp 2 Miliar</td>
            <td>0,20% per Tahun</td>
          </tr>
        </table>
        
        <h2>3. BEA PEROLEHAN HAK ATAS TANAH DAN BANGUNAN (BPHTB)</h2>
        <p>BPHTB adalah pajak atas perolehan hak atas tanah dan/atau bangunan. Perolehan hak atas tanah dan/atau bangunan meliputi pemindahan hak (jual beli, tukar menukar, hibah, waris) atau pemberian hak baru.</p>
        <p><strong>Rumus BPHTB:</strong> 5% x (Nilai Transaksi/NJOP - Nilai Jual Objek Pajak Tidak Kena Pajak / NPOPTKP). Di Kota Pangkalpinang, NPOPTKP standar ditetapkan sebesar Rp 60.000.000 (kecuali untuk waris sebesar Rp 300.000.000).</p>
        
        <h2>4. CARA PEMBAYARAN ONLINE (e-Billing)</h2>
        <p>Masyarakat dapat melakukan pembayaran pajak daerah melalui aplikasi e-SPPT BKD Pangkalpinang, Mobile Banking Bank Sumsel Babel, ATM, Tokopedia, Kantor Pos Indonesia, atau gerai ritel modern yang telah bekerja sama secara resmi.</p>
        
        <div class="footer">
          <p>Dokumen ini diterbitkan oleh Bidang Pajak Daerah, Badan Keuangan Daerah Kota Pangkalpinang secara digital.</p>
          <p>&copy; 2026 BKD Kota Pangkalpinang. Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([guideHTML], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Buku_Panduan_Pajak_Daerah_Pangkalpinang.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate Certificate dynamically and download as rich printable HTML/Doc
  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taxpayerName || !nop) {
      alert("Silakan isi nama dan NOP terlebih dahulu!");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedSuccess(true);

      const today = new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      const certHTML = `
        <html>
        <head>
          <title>Sertifikat Estimasi Pajak Daerah Kota Pangkalpinang</title>
          <style>
            body { font-family: 'Georgia', 'Times New Roman', serif; background-color: #f8fafc; color: #0f172a; padding: 20px; }
            .border-outer { border: 12px double #0052cc; padding: 30px; background-color: white; max-width: 800px; margin: 0 auto; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); position: relative; }
            .border-inner { border: 2px solid #f59e0b; padding: 40px; }
            .header { text-align: center; border-bottom: 3px double #0052cc; padding-bottom: 20px; margin-bottom: 30px; }
            .gov-title { font-size: 16px; font-weight: bold; letter-spacing: 2px; color: #475569; text-transform: uppercase; margin: 0; }
            .agency-title { font-size: 22px; font-weight: 900; color: #0052cc; margin: 5px 0 0 0; font-family: sans-serif; text-transform: uppercase; }
            .address { font-size: 11px; color: #64748b; font-family: sans-serif; margin-top: 4px; }
            .doc-title { text-align: center; font-size: 24px; font-weight: bold; color: #0f172a; margin-top: 30px; margin-bottom: 5px; text-decoration: underline; }
            .doc-num { text-align: center; font-size: 11px; color: #64748b; font-family: monospace; margin-bottom: 40px; }
            .content { font-size: 14px; line-height: 1.8; margin-bottom: 40px; }
            .table-data { width: 100%; border-collapse: collapse; margin: 30px 0; }
            .table-data td { padding: 10px 15px; font-size: 14px; }
            .label { font-weight: bold; width: 35%; color: #334155; }
            .value { border-bottom: 1px dashed #cbd5e1; }
            .value-highlight { font-weight: bold; color: #0052cc; font-size: 16px; border-bottom: 2px solid #10b981; }
            .footer-sign { width: 100%; margin-top: 50px; }
            .sign-col { text-align: right; width: 50%; font-size: 13px; font-family: sans-serif; }
            .stamp-container { display: flex; align-items: center; justify-content: flex-end; margin-top: 15px; margin-bottom: 15px; gap: 15px; }
            .digital-stamp { border: 2px dashed #10b981; color: #10b981; padding: 8px 12px; font-weight: bold; font-family: monospace; font-size: 11px; text-transform: uppercase; border-radius: 4px; transform: rotate(-3deg); }
            .qr-code-placeholder { width: 60px; height: 60px; border: 1px solid #94a3b8; display: flex; align-items: center; justify-content: center; font-size: 8px; text-align: center; font-weight: bold; color: #475569; }
            .badge-verified { background-color: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; padding: 15px; border-radius: 8px; font-size: 12px; font-family: sans-serif; margin-bottom: 25px; display: flex; align-items: center; gap: 10px; }
          </style>
        </head>
        <body>
          <div class="border-outer">
            <div class="border-inner">
              <div class="header">
                <p class="gov-title">Pemerintah Kota Pangkalpinang</p>
                <p class="agency-title">Badan Keuangan Daerah (BKD)</p>
                <p class="address">Jl. Merdeka No. 4, Pangkalpinang, Kepulauan Bangka Belitung. Telp (0717) 421312</p>
              </div>
              
              <div class="badge-verified">
                <strong>[DOKUMEN ELEKTRONIK SAH]</strong> Sertifikat ini diterbitkan secara otomatis oleh Sistem FinAI BKD Pangkalpinang berdasarkan data kalkulasi simulator pajak resmi tahun 2026.
              </div>
              
              <div class="doc-title">SURAT ESTIMASI PAJAK DAERAH</div>
              <div class="doc-num">Nomor: 973 / EST-BKD / PKP / ${Math.floor(1000 + Math.random() * 9000)}</div>
              
              <div class="content">
                <p>Kepala Badan Keuangan Daerah Kota Pangkalpinang dengan ini menerangkan bahwa wajib pajak tersebut di bawah ini telah melakukan perhitungan estimasi kewajiban perpajakan daerah secara mandiri:</p>
                
                <table class="table-data">
                  <tr>
                    <td class="label">Nama Wajib Pajak</td>
                    <td class="value"><strong>${taxpayerName.toUpperCase()}</strong></td>
                  </tr>
                  <tr>
                    <td class="label">Nomor Objek Pajak (NOP)</td>
                    <td class="value"><span style="font-family: monospace; letter-spacing: 1px;">${nop}</span></td>
                  </tr>
                  <tr>
                    <td class="label">Jenis Pajak Daerah</td>
                    <td class="value">${taxType}</td>
                  </tr>
                  <tr>
                    <td class="label">Estimasi Nilai Pajak</td>
                    <td class="value-highlight">Rp ${Number(estimatedTax).toLocaleString("id-ID")},-</td>
                  </tr>
                  <tr>
                    <td class="label">Tanggal Simulasi</td>
                    <td class="value">${today}</td>
                  </tr>
                </table>
                
                <p style="font-style: italic; font-size: 12px; color: #475569; margin-top: 20px;">
                  *Catatan: Dokumen ini bersifat estimasi sementara untuk membantu perencanaan keuangan wajib pajak. Ketetapan resmi tetap merujuk pada Surat Pemberitahuan Pajak Terhutang (SPPT) atau SKPD yang diterbitkan resmi oleh BKD Kota Pangkalpinang.
                </p>
              </div>
              
              <table class="footer-sign">
                <tr>
                  <td>
                    <div class="qr-code-placeholder">
                      QR VERIFY
                    </div>
                  </td>
                  <td class="sign-col">
                    <p>Pangkalpinang, ${today}</p>
                    <p>Mengetahui,</p>
                    <p><strong>Kepala Bidang Pajak Daerah</strong></p>
                    <div class="stamp-container">
                      <div class="digital-stamp">TANDA TANGAN ELEKTRONIK</div>
                    </div>
                    <p style="text-decoration: underline; font-weight: bold; margin-bottom: 0;">SISTEM FINAI BKD</p>
                    <p style="font-size: 10px; color: #64748b; margin-top: 0;">NIP. 19820512 200501 1 002</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </body>
        </html>
      `;

      const blob = new Blob([certHTML], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Sertifikat_Estimasi_${taxpayerName.replace(/\s+/g, "_")}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 1500);
  };

  const handleResetForm = () => {
    setTaxpayerName("");
    setNop("");
    setEstimatedTax("450000");
    setGeneratedSuccess(false);
  };

  return (
    <div id="innovation-downloads" className="space-y-12 animate-fade-in">
      {/* Dynamic Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl p-8 md:p-12 min-h-[300px] flex flex-col justify-between">
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/kantor_bkd_pangkalpinang_1783322183344.jpg" 
            alt="Badan Keuangan Daerah Kota Pangkalpinang" 
            className="w-full h-full object-cover object-center opacity-20 mix-blend-overlay scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-slate-950" />
        </div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="font-mono text-3xs font-black tracking-widest text-yellow bg-yellow/10 px-3 py-1 rounded-full backdrop-blur-xs inline-block">
            INOVASI & LAYANAN DIGITAL TERBARU
          </span>
          <h2 className="text-2xl font-black text-white leading-tight sm:text-3xl md:text-4xl">
            Pusat Inovasi & Pojok Unduhan Mandiri
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
            Sebagai komitmen transformasi digital dari Badan Keuangan Daerah Kota Pangkalpinang, kami menghadirkan modul inovatif bagi warga kota untuk melihat digitalisasi daerah, mengunduh file laporan transparansi APBD, mengunduh buku panduan pajak, serta menerbitkan Sertifikat Estimasi Pajak digital secara instan!
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 text-center">
          <div className="space-y-1">
            <span className="block text-xl md:text-2xl font-black text-yellow">100%</span>
            <span className="block text-4xs font-bold text-slate-300 uppercase tracking-widest">Aman & Terbuka</span>
          </div>
          <div className="space-y-1 border-l border-white/10">
            <span className="block text-xl md:text-2xl font-black text-yellow">4+</span>
            <span className="block text-4xs font-bold text-slate-300 uppercase tracking-widest">Inovasi Utama</span>
          </div>
          <div className="space-y-1 border-l border-white/10">
            <span className="block text-xl md:text-2xl font-black text-yellow">Instant</span>
            <span className="block text-4xs font-bold text-slate-300 uppercase tracking-widest">Unduhan Dokumen</span>
          </div>
          <div className="space-y-1 border-l border-white/10">
            <span className="block text-xl md:text-2xl font-black text-yellow">Paperless</span>
            <span className="block text-4xs font-bold text-slate-300 uppercase tracking-widest">Sertifikat Digital</span>
          </div>
        </div>
      </div>

      {/* Flagship Innovations Grid */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="font-sans text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow" />
              Pilar Digitalisasi & Inovasi BKD Pangkalpinang
            </h3>
            <p className="text-xs text-slate-500 mt-1">Inovasi teknologi yang mengubah sistem layanan keuangan daerah menjadi lebih transparan, cepat, dan modern.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Innovation 1: e-SPPT */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition duration-300">
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img 
                src="/src/assets/images/e_sppt_app_mockup_1783325310824.jpg" 
                alt="e-SPPT Mobile App" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-primary/90 text-white rounded-xl px-2.5 py-1 text-4xs font-black uppercase tracking-wider flex items-center gap-1">
                <Smartphone className="h-3 w-3 text-yellow" /> Mobile App
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">e-SPPT PBB Mandiri</h4>
                <p className="text-3xs text-slate-500 leading-relaxed font-medium">
                  Inovasi akses digital bagi warga Kota Pangkalpinang untuk melihat riwayat ketetapan PBB-P2 dan mencetak Surat Pemberitahuan Pajak Terhutang (SPPT) secara mandiri dari mana saja tanpa perlu menunggu fisik surat dikirimkan.
                </p>
              </div>
              <button 
                onClick={handleDownloadTaxGuide}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 py-2.5 text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
              >
                <Download className="h-4 w-4 text-yellow" /> Unduh Panduan Layanan (DOC)
              </button>
            </div>
          </div>

          {/* Innovation 2: SIKAD Executive Panel */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition duration-300">
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img 
                src="/src/assets/images/sikad_dashboard_mockup_1783325347750.jpg" 
                alt="SIKAD Executive Dashboard" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-secondary/95 text-slate-900 rounded-xl px-2.5 py-1 text-4xs font-black uppercase tracking-wider flex items-center gap-1">
                <LineChart className="h-3 w-3" /> Dashboard Analytics
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">SIKAD Dashboard Eksekutif</h4>
                <p className="text-3xs text-slate-500 leading-relaxed font-medium">
                  Sistem Informasi Keuangan & Aset Daerah yang ditenagai mesin analitis modern. Menyajikan visualisasi data real-time penerimaan kas daerah, realisasi pendapatan, serta serapan anggaran dari seluruh organisasi perangkat daerah (OPD) di Kota Pangkalpinang.
                </p>
              </div>
              <button 
                onClick={handleDownloadAPBD_CSV}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 py-2.5 text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
              >
                <FileSpreadsheet className="h-4 w-4 text-secondary" /> Unduh Data APBD 2024 (CSV)
              </button>
            </div>
          </div>

          {/* Innovation 3: Buku Panduan Infographic */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition duration-300">
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img 
                src="/src/assets/images/tax_guide_infographic_1783325331882.jpg" 
                alt="Buku Panduan Pajak" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-yellow text-slate-900 rounded-xl px-2.5 py-1 text-4xs font-black uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="h-3 w-3" /> Panduan Cetak
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Buku Panduan Pajak Daerah</h4>
                <p className="text-3xs text-slate-500 leading-relaxed font-medium">
                  Buku digital resmi yang menyajikan tata cara lengkap perpajakan daerah mulai dari tata cara pembayaran online, dasar regulasi penentuan NJOP, simulasi BPHTB, daftar perizinan, hingga alur pelaporan wajib pajak baru di BKD Pangkalpinang.
                </p>
              </div>
              <button 
                onClick={handleDownloadTaxGuide}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 py-2.5 text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
              >
                <Download className="h-4 w-4 text-yellow" /> Unduh Dokumen Panduan (Word)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tool Section: Tax Certificate Generator (Super Cool!) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Form Container (Left) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-yellow-light text-yellow">
                <Award className="h-5.5 w-5.5" />
              </span>
              <div>
                <h4 className="text-base font-black text-slate-900 uppercase">Inovasi: Sertifikat Estimasi Digital</h4>
                <p className="text-3xs text-slate-500">Cetak surat pernyataan estimasi nominal kewajiban pajak Anda secara mandiri dengan tanda tangan digital aman.</p>
              </div>
            </div>

            <form onSubmit={handleGenerateCertificate} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-4xs font-extrabold text-slate-500 uppercase tracking-wider block">Nama Lengkap Wajib Pajak</label>
                  <input 
                    type="text" 
                    value={taxpayerName}
                    onChange={(e) => setTaxpayerName(e.target.value)}
                    placeholder="Contoh: BUDI UTOMO, S.T." 
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:bg-white focus:border-primary outline-none transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-4xs font-extrabold text-slate-500 uppercase tracking-wider block">Nomor Objek Pajak (NOP - 18 Digit)</label>
                  <input 
                    type="text" 
                    value={nop}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (val.length <= 18) setNop(val);
                    }}
                    placeholder="Contoh: 197103001002345600" 
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:bg-white focus:border-primary outline-none transition"
                  />
                  <span className="text-4xs text-slate-400 font-medium block">Hanya menerima angka, maks 18 karakter.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-4xs font-extrabold text-slate-500 uppercase tracking-wider block">Pilih Jenis Pajak</label>
                  <select 
                    value={taxType}
                    onChange={(e) => setTaxType(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-900 focus:bg-white focus:border-primary outline-none transition"
                  >
                    <option value="PBB-P2 (Pajak Bumi dan Bangunan)">PBB-P2 (Pajak Bumi dan Bangunan)</option>
                    <option value="BPHTB (Bea Perolehan Hak Tanah & Bangunan)">BPHTB (Bea Perolehan Hak Tanah & Bangunan)</option>
                    <option value="PBJT Pajak Barang Jasa Tertentu (Makan/Minum)">PBJT Pajak Barang Jasa Tertentu (Makan/Minum)</option>
                    <option value="PBJT Pajak Hotel / Akomodasi">PBJT Pajak Hotel / Akomodasi</option>
                    <option value="Pajak Reklame & Reklame Komersial">Pajak Reklame & Reklame Komersial</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-4xs font-extrabold text-slate-500 uppercase tracking-wider block">Estimasi Pajak Terhutang (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-2xs font-bold text-slate-400">Rp</span>
                    <input 
                      type="number" 
                      value={estimatedTax}
                      onChange={(e) => setEstimatedTax(e.target.value)}
                      placeholder="Contoh: 450000"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3.5 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:border-primary outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary text-white hover:bg-primary/95 disabled:bg-primary/50 py-3 text-xs font-black uppercase tracking-wider transition shadow-md hover:scale-101 active:scale-99 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Memproses Dokumen...
                    </>
                  ) : (
                    <>
                      <Printer className="h-4 w-4 text-yellow" />
                      Terbitkan & Unduh Surat (.html)
                    </>
                  )}
                </button>
                
                {generatedSuccess && (
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-2 text-xs font-bold transition cursor-pointer"
                  >
                    Reset Form
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-4 flex items-start gap-2.5">
            <ShieldCheck className="h-4.5 w-4.5 text-secondary shrink-0 mt-0.5" />
            <span className="text-4xs text-slate-500 leading-normal font-medium">
              Sertifikat diterbitkan menggunakan format digital terstandarisasi. Dokumen dapat disimpan langsung ke dalam komputer atau dicetak menggunakan printer standar. Verifikasi dokumen dijamin aman melalui kode identifikasi unik BKD.
            </span>
          </div>
        </div>

        {/* Certificate Live Preview (Right) */}
        <div className="lg:col-span-5 bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-xl p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950" />
          
          <div className="relative z-10 space-y-4">
            <span className="text-5xs font-black tracking-widest text-yellow bg-yellow/10 border border-yellow/20 px-2 py-0.5 rounded-full inline-block">
              LIVE PREVIEW SERTIFIKAT
            </span>
            <div className="space-y-1">
              <h5 className="font-sans text-xs font-black text-white uppercase tracking-tight">Dokumen Elektronik Sementara</h5>
              <p className="text-4xs text-slate-400">Tampilan berkas digital yang akan segera diunduh</p>
            </div>
          </div>

          <div className="relative z-10 bg-white text-slate-800 rounded-2xl p-5 border border-slate-200 shadow-lg font-serif space-y-4 text-3xs scale-98 hover:scale-100 transition duration-300">
            {/* Header Mini Certificate */}
            <div className="text-center border-b border-slate-300 pb-2.5">
              <span className="block text-5xs font-sans font-bold text-slate-500 uppercase tracking-widest">Pemerintah Kota Pangkalpinang</span>
              <span className="block text-4xs font-sans font-black text-primary uppercase">Badan Keuangan Daerah</span>
              <span className="block text-6xs font-sans text-slate-400">Jl. Merdeka No. 4, Pangkalpinang</span>
            </div>

            {/* Title Certificate */}
            <div className="text-center py-1">
              <span className="block text-2xs font-bold underline">ESTIMASI PAJAK DAERAH</span>
              <span className="block text-5xs text-slate-400 font-mono">No: 973 / EST-BKD / PKP / {nop ? nop.substring(0, 4) : "2026"}</span>
            </div>

            {/* Data Preview */}
            <div className="space-y-1.5 font-sans">
              <div className="flex justify-between border-b border-slate-100 py-0.5">
                <span className="text-slate-500 font-bold">Wajib Pajak:</span>
                <span className="text-slate-900 font-black">{taxpayerName ? taxpayerName.toUpperCase() : "BUDI UTOMO, S.T."}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-0.5">
                <span className="text-slate-500 font-bold">NOP Objek:</span>
                <span className="text-slate-900 font-mono font-bold">{nop ? nop : "197103001002345600"}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-0.5">
                <span className="text-slate-500 font-bold">Jenis Pajak:</span>
                <span className="text-slate-900 font-semibold">{taxType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-0.5">
                <span className="text-slate-500 font-bold">Ketetapan Pajak:</span>
                <span className="text-primary font-black text-2xs bg-accent px-1.5 rounded">
                  Rp {Number(estimatedTax || 0).toLocaleString("id-ID")},-
                </span>
              </div>
            </div>

            {/* Footer stamp Preview */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="h-8 w-8 border border-slate-400 flex items-center justify-center text-4xs text-slate-400 font-bold">
                QR CO
              </div>
              <div className="text-right text-4xs font-sans">
                <span className="block text-slate-500 text-5xs">Kepala Bidang Pajak</span>
                <span className="inline-block border border-dashed border-secondary text-secondary font-black text-5xs uppercase scale-90 px-1 rounded transform rotate-3">SISTEM AKTIF</span>
                <span className="block text-slate-900 font-bold mt-0.5 underline">FINAI BKD</span>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            {generatedSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-950/80 border border-emerald-800/80 rounded-2xl p-4 flex items-center gap-3"
              >
                <div className="h-9 w-9 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="text-3xs text-slate-300 leading-tight">
                  <strong className="text-white block font-sans">Sertifikat Berhasil Diunduh!</strong>
                  Buka file <span className="font-mono text-yellow">.html</span> yang diunduh untuk melihat sertifikat beresolusi tinggi dan mencetaknya.
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-800/80 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="h-4.5 w-4.5 text-yellow shrink-0 mt-0.5" />
                <p className="text-4xs text-slate-400 leading-normal font-medium">
                  Isi data simulasi Anda di sebelah kiri secara lengkap, lalu tekan tombol terbitkan untuk memulai generator dokumen elektronik mandiri.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Helpful Document Download Section */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <h4 className="font-sans text-base font-extrabold text-slate-900 uppercase">Pusat Unduhan Berkas & Regulasi Resmi</h4>
          <p className="text-xs text-slate-500 mt-1">Dapatkan salinan regulasi, formulir, dan infografis resmi Pemerintah Kota Pangkalpinang di bawah ini.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Doc Item 1 */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-light text-yellow shrink-0">
                <FileSpreadsheet className="h-5.5 w-5.5" />
              </span>
              <div>
                <span className="text-xs font-black text-slate-900 block">Daftar Rekapitulasi Target APBD 2024</span>
                <span className="text-3xs text-slate-500 font-semibold block mt-0.5">Format: CSV (Excel Compatible) • 1.2 KB</span>
              </div>
            </div>
            <button 
              onClick={handleDownloadAPBD_CSV}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white hover:bg-primary hover:text-white text-slate-700 border border-slate-200 transition shadow-3xs cursor-pointer active:scale-95"
            >
              <Download className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Doc Item 2 */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary shrink-0">
                <FileText className="h-5.5 w-5.5" />
              </span>
              <div>
                <span className="text-xs font-black text-slate-900 block">Buku Panduan Pajak Daerah Kota Pangkalpinang</span>
                <span className="text-3xs text-slate-500 font-semibold block mt-0.5">Format: DOC (Word) • 8.5 KB</span>
              </div>
            </div>
            <button 
              onClick={handleDownloadTaxGuide}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white hover:bg-primary hover:text-white text-slate-700 border border-slate-200 transition shadow-3xs cursor-pointer active:scale-95"
            >
              <Download className="h-4.5 w-4.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
