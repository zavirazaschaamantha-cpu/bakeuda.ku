import React from "react";
import { Landmark, Mail, Phone, MapPin, Shield, Star, Award, ChevronRight, Users } from "lucide-react";

export default function OrgProfile() {
  const missions = [
    "Meningkatkan Pendapatan Asli Daerah (PAD) secara optimal melalui digitalisasi layanan perpajakan.",
    "Mewujudkan perencanaan dan penganggaran APBD yang efektif, efisien, serta berpihak pada kesejahteraan warga.",
    "Mengembangkan pengelolaan barang milik daerah (aset) yang tertib, aman, berdaya guna, dan bernilai tinggi.",
    "Menerapkan sistem pelaporan keuangan berbasis akuntansi akrual yang akurat, transparan, dan meraih opini WTP berkelanjutan."
  ];

  const departments = [
    {
      title: "Bidang Pajak & Pendapatan Daerah",
      desc: "Mengelola pendaftaran, penilaian, penetapan, serta penagihan pajak daerah (PBB-P2, BPHTB, PBJT, PAT, Reklame).",
      leader: "Kepala Bidang Pendapatan"
    },
    {
      title: "Bidang Anggaran Daerah",
      desc: "Menyusun regulasi kebijakan anggaran, merumuskan draf APBD Kota Pangkalpinang, dan mengoordinasikan anggaran SKPD.",
      leader: "Kepala Bidang Anggaran"
    },
    {
      title: "Bidang Perbendaharaan & Kas Daerah",
      desc: "Mengelola arus kas masuk dan keluar daerah, pembayaran SPM/SP2D, serta melakukan penatausahaan keuangan daerah.",
      leader: "Kepala Bidang Perbendaharaan"
    },
    {
      title: "Bidang Akuntansi, Pelaporan & Aset",
      desc: "Menyusun Laporan Keuangan Pemerintah Daerah (LKPD), neraca, dan penertiban pencatatan barang milik daerah.",
      leader: "Kepala Bidang Akuntansi & Aset"
    }
  ];

  return (
    <div id="org-profile" className="space-y-8 animate-fade-in">
      {/* Kantor BKD Pangkalpinang Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl min-h-[220px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/kantor_bkd_pangkalpinang_1783322183344.jpg" 
            alt="Kantor BKD Kota Pangkalpinang" 
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-slate-950/80" />
        </div>
        <div className="relative z-10 p-6 md:p-8 max-w-2xl space-y-3">
          <span className="font-mono text-3xs font-black tracking-widest text-yellow bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-xs inline-block">
            PROFIL INSTANSI RESMI
          </span>
          <h2 className="text-xl font-black text-white leading-tight sm:text-2xl md:text-3xl">
            Badan Keuangan Daerah Kota Pangkalpinang
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Selamat datang di Kantor BKD Kota Pangkalpinang. Sebagai instansi pengelola keuangan dan barang milik daerah, kami berkomitmen untuk melayani masyarakat secara profesional, transparan, and akuntabel demi terwujudnya Kota Pangkalpinang yang sejahtera.
          </p>
        </div>
      </div>

      {/* Visi Misi Bento Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Vision Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="p-3 rounded-2xl bg-yellow-light text-yellow inline-block shadow-3xs">
              <Award className="h-6 w-6" />
            </span>
            <div className="space-y-2">
              <span className="text-3xs font-bold text-primary uppercase tracking-widest block">VISI UTAMA</span>
              <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                Pengelolaan Keuangan dan Aset Daerah Profesional & Akuntabel
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed italic bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              \"Terwujudnya tata kelola keuangan dan barang milik daerah yang profesional, transparan, handal, dan akuntabel demi mendukung Kota Pangkalpinang Beribu Senyuman.\"
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-3xs font-bold tracking-wider text-slate-400 uppercase">
            <span>BKD KOTA PANGKALPINANG</span>
          </div>
        </div>

        {/* Mission Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7 space-y-5">
          <div>
            <span className="text-3xs font-bold text-slate-400 uppercase tracking-widest block">MISI PEMBANGUNAN</span>
            <h3 className="text-lg font-bold text-slate-900">Misi Pelaksanaan Fungsi Keuangan Daerah</h3>
          </div>
          <div className="space-y-3.5">
            {missions.map((m, idx) => (
              <div key={idx} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-extrabold text-slate-700">
                  {idx + 1}
                </span>
                <p className="text-slate-600 font-medium leading-relaxed">{m}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Organizational Bidang-Bidang */}
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" /> Struktur Bidang Organisasi
          </h3>
          <p className="text-xs text-slate-500">Pembagian struktur tugas dan fungsi pokok kedinasan Badan Keuangan Daerah</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((dept, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-3xs hover:shadow-sm hover:border-slate-300 transition duration-150 flex flex-col justify-between animate-fade-in"
            >
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 leading-snug">{dept.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{dept.desc}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-3xs font-bold text-primary uppercase">{dept.leader}</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kantor & Kontak Section */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Hubungi Kami</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Silakan hubungi loket layanan atau datang langsung ke Kantor BKD Kota Pangkalpinang untuk konsultasi tatap muka, validasi berkas fisik, dan pengambilan berkas SPPT/SSPD asli.
            </p>
          </div>

          <div className="space-y-3 pt-3">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <span className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 shrink-0">
                <MapPin className="h-4 w-4" />
              </span>
              <span>Jl. Merdeka No. 4, Kecamatan Taman Sari, Kota Pangkalpinang, Prov. Kepulauan Bangka Belitung</span>
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <span className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 shrink-0">
                <Phone className="h-4 w-4" />
              </span>
              <span>(0717) 421516 / Loket Pajak PBB & BPHTB</span>
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <span className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 shrink-0">
                <Mail className="h-4 w-4" />
              </span>
              <span>bkd@pangkalpinangkota.go.id</span>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-500 font-medium">
            <span className="font-bold text-slate-700 block mb-1">Jam Pelayanan Loket Kantor:</span>
            <span>Senin - Kamis: 08.00 - 15.30 WIB<br />Jumat: 08.00 - 15.00 WIB (Sabtu, Minggu & Hari Libur Nasional Tutup)</span>
          </div>
        </div>

        {/* Mock Map / Building Photo Card */}
        <div className="rounded-2xl bg-slate-950 overflow-hidden border border-slate-200 relative min-h-[250px] flex items-center justify-center text-center p-6 shadow-3xs group">
          <div className="absolute inset-0 z-0">
            <img 
              src="/src/assets/images/kantor_bkd_pangkalpinang_1783322183344.jpg" 
              alt="Gedung BKD Kota Pangkalpinang" 
              className="w-full h-full object-cover object-center opacity-40 group-hover:scale-105 transition duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/40" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-yellow text-slate-900 shadow-lg">
              <MapPin className="h-5.5 w-5.5" />
            </div>
            <div>
              <span className="text-sm font-black text-white block drop-shadow-sm">Gedung Utama BKD Pangkalpinang</span>
              <span className="text-2xs text-slate-300 font-bold block mt-1 drop-shadow-xs">Jl. Merdeka No. 4, Samping Alun-Alun Taman Merdeka</span>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:text-primary/95 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-md hover:scale-105 active:scale-95 transition"
            >
              Petunjuk Arah Google Maps <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
