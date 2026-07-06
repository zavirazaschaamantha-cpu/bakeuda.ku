import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  User, 
  Users, 
  Lock, 
  Mail, 
  FileText, 
  Briefcase, 
  MapPin, 
  Phone, 
  LogOut, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Coins, 
  CreditCard, 
  Plus, 
  Clock, 
  FileSpreadsheet, 
  Compass, 
  FileDown, 
  TrendingUp, 
  Activity,
  Send,
  UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types for Portal Digital
interface CitizenAccount {
  nik: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  role: "masyarakat";
  assets: TaxAsset[];
  complaints: TaxComplaint[];
}

interface EmployeeAccount {
  nip: string;
  fullName: string;
  email: string;
  division: string;
  role: "karyawan";
  code: string;
}

interface TaxAsset {
  id: string;
  nop: string; // Nomor Objek Pajak
  type: string;
  location: string;
  amount: number;
  year: number;
  status: "BELUM_BAYAR" | "LUNAS";
  dueDate: string;
  paymentDate?: string;
}

interface TaxComplaint {
  id: string;
  citizenNik: string;
  citizenName: string;
  title: string;
  description: string;
  type: "Pengurangan Denda" | "Pembetulan Ketetapan" | "Keberatan Pajak";
  nop: string;
  date: string;
  status: "PENDING" | "DISETUJUI" | "DITOLAK";
  feedback?: string;
}

// Initial dummy data for demo
const INITIAL_CITIZENS: CitizenAccount[] = [
  {
    nik: "1971031402049902",
    fullName: "Bambang Wijaya",
    email: "bambang.wijaya@gmail.com",
    phone: "081234567890",
    address: "Jl. Jenderal Sudirman No. 45, Selindung Baru, Gabek, Pangkalpinang",
    role: "masyarakat",
    assets: [
      {
        id: "ast-001",
        nop: "19.71.010.002.015-0214.0",
        type: "Rumah Tinggal & Tanah",
        location: "Selindung Baru, Pangkalpinang (Luas: 150m² / 200m²)",
        amount: 250000,
        year: 2026,
        status: "BELUM_BAYAR",
        dueDate: "30 September 2026"
      },
      {
        id: "ast-002",
        nop: "19.71.010.004.012-0089.0",
        type: "Ruko Tempat Usaha",
        location: "Kawasan Pasar Pembangunan, Taman Sari (Luas: 80m² / 120m²)",
        amount: 450000,
        year: 2026,
        status: "LUNAS",
        dueDate: "30 September 2026",
        paymentDate: "15 Juni 2026"
      }
    ],
    complaints: [
      {
        id: "cmp-101",
        citizenNik: "1971031402049902",
        citizenName: "Bambang Wijaya",
        title: "Koreksi Luas Bangunan Rumah Tinggal",
        description: "Mohon peninjauan kembali atas SPPT PBB tahun 2026. Luas fisik bangunan sebenarnya adalah 120m², namun di dalam SPPT tertera 150m² akibat kesalahan ukur petugas.",
        type: "Pembetulan Ketetapan",
        nop: "19.71.010.002.015-0214.0",
        date: "28 Juni 2026",
        status: "PENDING"
      }
    ]
  }
];

const INITIAL_EMPLOYEES: EmployeeAccount[] = [
  {
    nip: "198510122011011002",
    fullName: "Heri Purwanto, S.E., M.Si.",
    email: "heri.purwanto@pangkalpinangkota.go.id",
    division: "Bidang Pajak & Retribusi Daerah",
    role: "karyawan",
    code: "BKDPKPINANG"
  }
];

export default function PortalDigital() {
  // Authentication states
  const [isLoginView, setIsLoginView] = useState<boolean>(true);
  const [roleSelection, setRoleSelection] = useState<"masyarakat" | "karyawan">("masyarakat");
  
  // Input fields for Login
  const [loginIdentifier, setLoginIdentifier] = useState<string>(""); // NIK or NIP
  const [loginPassword, setLoginPassword] = useState<string>("");
  
  // Input fields for Register (Masyarakat)
  const [regNik, setRegNik] = useState<string>("");
  const [regFullName, setRegFullName] = useState<string>("");
  const [regEmail, setRegEmail] = useState<string>("");
  const [regPhone, setRegPhone] = useState<string>("");
  const [regAddress, setRegAddress] = useState<string>("");
  const [regPassword, setRegPassword] = useState<string>("");
  
  // Input fields for Register (Karyawan)
  const [regNip, setRegNip] = useState<string>("");
  const [regEmpFullName, setRegEmpFullName] = useState<string>("");
  const [regEmpEmail, setRegEmpEmail] = useState<string>("");
  const [regEmpDivision, setRegEmpDivision] = useState<string>("Bidang Pajak & Retribusi Daerah");
  const [regEmpCode, setRegEmpCode] = useState<string>(""); // Office verification code
  const [regEmpPassword, setRegEmpPassword] = useState<string>("");

  // Storage states
  const [citizens, setCitizens] = useState<CitizenAccount[]>(() => {
    const local = localStorage.getItem("bkd_portal_citizens");
    return local ? JSON.parse(local) : INITIAL_CITIZENS;
  });
  
  const [employees, setEmployees] = useState<EmployeeAccount[]>(() => {
    const local = localStorage.getItem("bkd_portal_employees");
    return local ? JSON.parse(local) : INITIAL_EMPLOYEES;
  });

  const [activeUser, setActiveUser] = useState<CitizenAccount | EmployeeAccount | null>(() => {
    const local = localStorage.getItem("bkd_portal_active_user");
    return local ? JSON.parse(local) : null;
  });

  // Master Complaints List for Employees
  const [allComplaints, setAllComplaints] = useState<TaxComplaint[]>(() => {
    const local = localStorage.getItem("bkd_portal_all_complaints");
    if (local) return JSON.parse(local);
    // Combine from default citizens
    return INITIAL_CITIZENS.flatMap(c => c.complaints);
  });

  // Action states
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [isPayingAsset, setIsPayingAsset] = useState<TaxAsset | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("QRIS");

  // New Citizen Asset Input Form State
  const [showAddAssetModal, setShowAddAssetModal] = useState<boolean>(false);
  const [newNop, setNewNop] = useState<string>("");
  const [newAssetType, setNewAssetType] = useState<string>("Rumah Tinggal & Tanah");
  const [newLocation, setNewLocation] = useState<string>("");
  const [newAmount, setNewAmount] = useState<number>(150000);

  // New Citizen Complaint Input Form State
  const [complaintTitle, setComplaintTitle] = useState<string>("");
  const [complaintDesc, setComplaintDesc] = useState<string>("");
  const [complaintType, setComplaintType] = useState<"Pengurangan Denda" | "Pembetulan Ketetapan" | "Keberatan Pajak">("Pembetulan Ketetapan");
  const [complaintNop, setComplaintNop] = useState<string>("");

  // Employee action states
  const [verifyingComplaint, setVerifyingComplaint] = useState<TaxComplaint | null>(null);
  const [employeeFeedback, setEmployeeFeedback] = useState<string>("");

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem("bkd_portal_citizens", JSON.stringify(citizens));
  }, [citizens]);

  useEffect(() => {
    localStorage.setItem("bkd_portal_employees", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("bkd_portal_all_complaints", JSON.stringify(allComplaints));
  }, [allComplaints]);

  useEffect(() => {
    if (activeUser) {
      localStorage.setItem("bkd_portal_active_user", JSON.stringify(activeUser));
    } else {
      localStorage.removeItem("bkd_portal_active_user");
    }
  }, [activeUser]);

  // Handle Quick Login
  const handleQuickLogin = (role: "masyarakat" | "karyawan") => {
    setErrorMsg("");
    setSuccessMsg("");
    if (role === "masyarakat") {
      const bkdCitizen = citizens.find(c => c.nik === "1971031402049902");
      if (bkdCitizen) {
        setActiveUser(bkdCitizen);
        setSuccessMsg("Berhasil masuk sebagai Bambang Wijaya (Warga Demo)");
      }
    } else {
      const bkdEmployee = employees.find(e => e.nip === "198510122011011002");
      if (bkdEmployee) {
        setActiveUser(bkdEmployee);
        setSuccessMsg("Berhasil masuk sebagai Heri Purwanto, S.E., M.Si. (Pegawai BKD)");
      }
    }
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!loginIdentifier || !loginPassword) {
      setErrorMsg("Mohon masukkan NIK/NIP dan Kata Sandi Anda.");
      return;
    }

    if (roleSelection === "masyarakat") {
      const citizen = citizens.find(c => c.nik === loginIdentifier.trim());
      if (!citizen) {
        setErrorMsg("NIK Anda tidak terdaftar. Silakan buat akun terlebih dahulu.");
        return;
      }
      // Simple validation (password is checked or defaulted)
      setActiveUser(citizen);
      setSuccessMsg(`Selamat datang kembali, ${citizen.fullName}!`);
    } else {
      const employee = employees.find(emp => emp.nip === loginIdentifier.trim());
      if (!employee) {
        setErrorMsg("NIP Pegawai tidak terdaftar dalam database BKD Kota Pangkalpinang.");
        return;
      }
      setActiveUser(employee);
      setSuccessMsg(`Sistem Aktif. Selamat bertugas, ${employee.fullName}!`);
    }
  };

  // Register Citizen (Masyarakat)
  const handleRegisterCitizen = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!regNik || !regFullName || !regEmail || !regPhone || !regAddress || !regPassword) {
      setErrorMsg("Harap melengkapi seluruh formulir pendaftaran warga.");
      return;
    }

    if (regNik.length < 10) {
      setErrorMsg("Format NIK tidak valid. Harus berupa angka resmi.");
      return;
    }

    const exists = citizens.some(c => c.nik === regNik);
    if (exists) {
      setErrorMsg("NIK ini sudah terdaftar. Silakan masuk.");
      return;
    }

    // Create new citizen object
    const newCitizen: CitizenAccount = {
      nik: regNik,
      fullName: regFullName,
      email: regEmail,
      phone: regPhone,
      address: regAddress,
      role: "masyarakat",
      assets: [
        {
          id: `ast-${Date.now()}`,
          nop: `19.71.0${Math.floor(10 + Math.random() * 90)}.${Math.floor(100 + Math.random() * 800)}-00${Math.floor(10 + Math.random() * 80)}.0`,
          type: "Rumah Tinggal & Tanah Baru",
          location: regAddress,
          amount: 185000,
          year: 2026,
          status: "BELUM_BAYAR",
          dueDate: "30 September 2026"
        }
      ],
      complaints: []
    };

    setCitizens([...citizens, newCitizen]);
    setActiveUser(newCitizen);
    setSuccessMsg("Akun warga berhasil dibuat! Selamat datang di Portal Keuangan Daerah.");
    
    // Reset forms
    setRegNik("");
    setRegFullName("");
    setRegEmail("");
    setRegPhone("");
    setRegAddress("");
    setRegPassword("");
  };

  // Register Employee (Karyawan)
  const handleRegisterEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!regNip || !regEmpFullName || !regEmpEmail || !regEmpCode || !regEmpPassword) {
      setErrorMsg("Harap melengkapi seluruh formulir pendaftaran pegawai.");
      return;
    }

    if (regEmpCode.toUpperCase() !== "BKDPKPINANG") {
      setErrorMsg("Kode Otorisasi Kantor salah. Hubungi sub-bagian Umum Kepegawaian BKD.");
      return;
    }

    const exists = employees.some(emp => emp.nip === regNip);
    if (exists) {
      setErrorMsg("NIP Pegawai ini sudah terdaftar. Silakan login.");
      return;
    }

    const newEmp: EmployeeAccount = {
      nip: regNip,
      fullName: regEmpFullName,
      email: regEmpEmail,
      division: regEmpDivision,
      role: "karyawan",
      code: regEmpCode
    };

    setEmployees([...employees, newEmp]);
    setActiveUser(newEmp);
    setSuccessMsg("Akun administrasi Pegawai BKD berhasil diverifikasi dan diaktifkan!");
    
    // Reset forms
    setRegNip("");
    setRegEmpFullName("");
    setRegEmpEmail("");
    setRegEmpCode("");
    setRegEmpPassword("");
  };

  // Handle Log Out
  const handleLogout = () => {
    setActiveUser(null);
    setSuccessMsg("Berhasil keluar dari Portal Aman BKD.");
    setErrorMsg("");
  };

  // Citizen Action: Pay Bill
  const initiatePayment = (asset: TaxAsset) => {
    setIsPayingAsset(asset);
    setPaymentSuccess(false);
  };

  const executePayment = () => {
    if (!isPayingAsset || !activeUser || activeUser.role !== "masyarakat") return;

    // Update activeUser assets locally
    const updatedAssets = activeUser.assets.map(ast => {
      if (ast.id === isPayingAsset.id) {
        return {
          ...ast,
          status: "LUNAS" as const,
          paymentDate: new Date().toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })
        };
      }
      return ast;
    });

    const updatedUser = {
      ...activeUser,
      assets: updatedAssets
    };

    // Update global citizens state list
    const updatedCitizens = citizens.map(c => {
      if (c.nik === activeUser.nik) {
        return updatedUser;
      }
      return c;
    });

    setActiveUser(updatedUser);
    setCitizens(updatedCitizens);
    setPaymentSuccess(true);

    setTimeout(() => {
      setIsPayingAsset(null);
      setPaymentSuccess(false);
    }, 2000);
  };

  // Citizen Action: Submit Complaint / Appeal
  const handleAddComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUser || activeUser.role !== "masyarakat") return;
    if (!complaintTitle || !complaintDesc || !complaintNop) {
      alert("Harap lengkapi semua isian laporan.");
      return;
    }

    const newComplaint: TaxComplaint = {
      id: `cmp-${Date.now()}`,
      citizenNik: activeUser.nik,
      citizenName: activeUser.fullName,
      title: complaintTitle,
      description: complaintDesc,
      type: complaintType,
      nop: complaintNop,
      date: new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      status: "PENDING"
    };

    // Update user complaints
    const updatedUser: CitizenAccount = {
      ...activeUser,
      complaints: [newComplaint, ...activeUser.complaints]
    };

    // Update master complaints
    const updatedAllComplaints = [newComplaint, ...allComplaints];

    // Update global list of citizens
    const updatedCitizens = citizens.map(c => {
      if (c.nik === activeUser.nik) {
        return updatedUser;
      }
      return c;
    });

    setActiveUser(updatedUser);
    setCitizens(updatedCitizens);
    setAllComplaints(updatedAllComplaints);

    // Reset fields
    setComplaintTitle("");
    setComplaintDesc("");
    setComplaintNop("");
    alert("Laporan/Aduan berhasil dikirim ke antrean verifikasi BKD!");
  };

  // Citizen Action: Add Object Property (NOP)
  const handleAddNewAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUser || activeUser.role !== "masyarakat") return;
    if (!newNop || !newLocation) {
      alert("Harap masukkan NOP dan lokasi lengkap objek.");
      return;
    }

    const newAsset: TaxAsset = {
      id: `ast-${Date.now()}`,
      nop: newNop,
      type: newAssetType,
      location: newLocation,
      amount: newAmount,
      year: 2026,
      status: "BELUM_BAYAR",
      dueDate: "30 September 2026"
    };

    const updatedUser: CitizenAccount = {
      ...activeUser,
      assets: [...activeUser.assets, newAsset]
    };

    const updatedCitizens = citizens.map(c => {
      if (c.nik === activeUser.nik) {
        return updatedUser;
      }
      return c;
    });

    setActiveUser(updatedUser);
    setCitizens(updatedCitizens);
    setShowAddAssetModal(false);
    
    // Reset forms
    setNewNop("");
    setNewLocation("");
    setNewAmount(150000);
    alert("Objek Pajak (NOP) berhasil ditambahkan ke profil wajib pajak Anda.");
  };

  // Employee Action: Verify & Update Complaint Status
  const handleVerifyComplaint = (status: "DISETUJUI" | "DITOLAK") => {
    if (!verifyingComplaint) return;

    // Update master complaint list status
    const updatedAllComplaints = allComplaints.map(cmp => {
      if (cmp.id === verifyingComplaint.id) {
        return {
          ...cmp,
          status: status,
          feedback: employeeFeedback || "Telah diverifikasi sesuai ketentuan Perda Pajak Daerah."
        };
      }
      return cmp;
    });

    // Update inside citizens database list so when citizen logs back in, it reflects!
    const updatedCitizens = citizens.map(citizen => {
      const citizenComplaints = citizen.complaints.map(cmp => {
        if (cmp.id === verifyingComplaint.id) {
          return {
            ...cmp,
            status: status,
            feedback: employeeFeedback || "Telah diverifikasi sesuai ketentuan Perda Pajak Daerah."
          };
        }
        return cmp;
      });
      return {
        ...citizen,
        complaints: citizenComplaints
      };
    });

    // Save and sync active user if they happen to be the citizen (not likely since we are logged in as employee, but good for local reactivity)
    setAllComplaints(updatedAllComplaints);
    setCitizens(updatedCitizens);
    setVerifyingComplaint(null);
    setEmployeeFeedback("");
    alert(`Berkas aduan berhasil diproses dengan status: ${status}`);
  };

  // Count metrics for employees
  const pendingComplaintsCount = allComplaints.filter(c => c.status === "PENDING").length;
  const approvedComplaintsCount = allComplaints.filter(c => c.status === "DISETUJUI").length;

  return (
    <div id="portal-digital" className="space-y-8 animate-fade-in">
      
      {/* Upper Badge & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-4xs font-black text-[#0042A5] uppercase tracking-widest block mb-1">DASHBOARD INTEGRASI</span>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-5.5 w-5.5 text-[#0042A5]" />
            Portal Digital BKD Kota Pangkalpinang
          </h2>
          <p className="text-xs text-slate-500 font-medium">Layanan Administrasi Mandiri Keuangan & Kepegawaian Satu Pintu</p>
        </div>
        
        {activeUser && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 px-4 py-2.5 text-xs font-bold transition shadow-3xs cursor-pointer active:scale-95"
          >
            <LogOut className="h-4 w-4" /> Keluar Portal
          </button>
        )}
      </div>

      {/* ERROR / SUCCESS BANNER SYSTEM */}
      <AnimatePresence>
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-start gap-3 shadow-3xs"
          >
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs font-semibold">
              <span className="font-extrabold uppercase text-[10px] block text-red-600 mb-0.5">Gagal Sistem</span>
              {errorMsg}
            </div>
          </motion.div>
        )}
        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-start gap-3 shadow-3xs"
          >
            <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs font-semibold">
              <span className="font-extrabold uppercase text-[10px] block text-emerald-600 mb-0.5">Berhasil Terverifikasi</span>
              {successMsg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NO USER SIGNED IN: RENDER LOGIN & REGISTRATION MODULE */}
      {!activeUser ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LOGIN / SIGNUP CARD COMPONENT (Col-span-7) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            
            {/* View Switching Header */}
            <div className="flex border-b border-slate-100 bg-slate-50/50 p-2">
              <button
                onClick={() => { setIsLoginView(true); setErrorMsg(""); setSuccessMsg(""); }}
                className={`flex-1 py-3 text-xs uppercase tracking-wider font-black rounded-xl transition cursor-pointer ${
                  isLoginView 
                    ? "bg-white text-[#0042A5] shadow-xs border border-slate-200/80" 
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                🔑 Masuk Akun (Login)
              </button>
              <button
                onClick={() => { setIsLoginView(false); setErrorMsg(""); setSuccessMsg(""); }}
                className={`flex-1 py-3 text-xs uppercase tracking-wider font-black rounded-xl transition cursor-pointer ${
                  !isLoginView 
                    ? "bg-white text-[#0042A5] shadow-xs border border-slate-200/80" 
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                📝 Buat Akun Baru (Daftar)
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Role Selection Switcher */}
              <div className="space-y-2">
                <label className="text-4xs font-black text-slate-400 uppercase tracking-widest block">PIlih Hak Akses Portal</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => { setRoleSelection("masyarakat"); setErrorMsg(""); }}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold uppercase flex items-center justify-center gap-2 transition cursor-pointer ${
                      roleSelection === "masyarakat"
                        ? "border-[#0042A5] bg-[#0042A5]/5 text-[#0042A5] ring-2 ring-[#0042A5]/10 font-black"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Users className="h-4 w-4" /> Masyarakat Umum
                  </button>
                  <button
                    type="button"
                    onClick={() => { setRoleSelection("karyawan"); setErrorMsg(""); }}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold uppercase flex items-center justify-center gap-2 transition cursor-pointer ${
                      roleSelection === "karyawan"
                        ? "border-[#0042A5] bg-[#0042A5]/5 text-[#0042A5] ring-2 ring-[#0042A5]/10 font-black"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Briefcase className="h-4 w-4" /> Karyawan / Pegawai BKD
                  </button>
                </div>
              </div>

              {/* RENDER FORM: LOGIN VIEW */}
              {isLoginView ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  
                  <div className="space-y-1.5">
                    <label className="text-4xs font-black text-slate-500 uppercase tracking-wider block">
                      {roleSelection === "masyarakat" ? "Nomor Induk Kependudukan (NIK)" : "Nomor Induk Pegawai (NIP)"}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <User className="h-4.5 w-4.5" />
                      </span>
                      <input
                        type="text"
                        placeholder={roleSelection === "masyarakat" ? "Masukkan NIK 16 digit Anda" : "Masukkan NIP 18 digit resmi BKD"}
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-50 hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-[#0042A5] rounded-xl pl-11 pr-4 py-3 text-xs font-bold outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-4xs font-black text-slate-500 uppercase tracking-wider block">Kata Sandi (Password)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock className="h-4.5 w-4.5" />
                      </span>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full bg-slate-50 hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-[#0042A5] rounded-xl pl-11 pr-4 py-3 text-xs font-bold outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0042A5] hover:bg-[#003584] text-white py-3.5 rounded-xl text-xs uppercase tracking-wider font-black transition shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    Masuk Ke Portal Aman <ArrowRight className="h-4 w-4" />
                  </button>

                </form>
              ) : (
                /* RENDER FORM: REGISTRATION VIEW */
                roleSelection === "masyarakat" ? (
                  /* CITIZEN REGISTRATION FORM */
                  <form onSubmit={handleRegisterCitizen} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-4xs font-black text-slate-500 uppercase tracking-wider block">NIK (Nomor Induk Kependudukan)</label>
                        <input
                          type="text"
                          maxLength={16}
                          placeholder="Contoh: 1971031402049902"
                          value={regNik}
                          onChange={(e) => setRegNik(e.target.value.replace(/\D/g, ''))}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#0042A5] rounded-xl px-3.5 py-3 text-xs font-bold outline-none transition"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-4xs font-black text-slate-500 uppercase tracking-wider block">Nama Lengkap (Sesuai KTP)</label>
                        <input
                          type="text"
                          placeholder="Contoh: Bambang Wijaya"
                          value={regFullName}
                          onChange={(e) => setRegFullName(e.target.value)}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#0042A5] rounded-xl px-3.5 py-3 text-xs font-bold outline-none transition"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-4xs font-black text-slate-500 uppercase tracking-wider block">Email Aktif</label>
                        <input
                          type="email"
                          placeholder="Contoh: nama@domain.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#0042A5] rounded-xl px-3.5 py-3 text-xs font-bold outline-none transition"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-4xs font-black text-slate-500 uppercase tracking-wider block">Nomor HP / WhatsApp</label>
                        <input
                          type="text"
                          placeholder="Contoh: 081234567890"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#0042A5] rounded-xl px-3.5 py-3 text-xs font-bold outline-none transition"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-4xs font-black text-slate-500 uppercase tracking-wider block">Alamat Tinggal / Domisili Objek Pajak</label>
                      <input
                        type="text"
                        placeholder="Contoh: Jl. Jenderal Sudirman No. 45, Gabek, Kota Pangkalpinang"
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#0042A5] rounded-xl px-3.5 py-3 text-xs font-bold outline-none transition"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-4xs font-black text-slate-500 uppercase tracking-wider block">Kata Sandi Baru</label>
                      <input
                        type="password"
                        placeholder="Min. 6 Karakter Aman"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#0042A5] rounded-xl px-3.5 py-3 text-xs font-bold outline-none transition"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs uppercase tracking-wider font-black transition shadow-md active:scale-98 cursor-pointer"
                    >
                      Daftarkan Akun Warga Terverifikasi
                    </button>

                  </form>
                ) : (
                  /* EMPLOYEE REGISTRATION FORM */
                  <form onSubmit={handleRegisterEmployee} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-4xs font-black text-slate-500 uppercase tracking-wider block">NIP (Nomor Induk Pegawai 18 Digit)</label>
                        <input
                          type="text"
                          maxLength={18}
                          placeholder="Masukkan NIP Resmi"
                          value={regNip}
                          onChange={(e) => setRegNip(e.target.value.replace(/\D/g, ''))}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#0042A5] rounded-xl px-3.5 py-3 text-xs font-bold outline-none transition"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-4xs font-black text-slate-500 uppercase tracking-wider block">Nama Lengkap & Gelar Akademis</label>
                        <input
                          type="text"
                          placeholder="Contoh: Drs. H. Apriandi, M.Si."
                          value={regEmpFullName}
                          onChange={(e) => setRegEmpFullName(e.target.value)}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#0042A5] rounded-xl px-3.5 py-3 text-xs font-bold outline-none transition"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-4xs font-black text-slate-500 uppercase tracking-wider block">Email Dinas Pemkot</label>
                        <input
                          type="email"
                          placeholder="Contoh: nama@pangkalpinangkota.go.id"
                          value={regEmpEmail}
                          onChange={(e) => setRegEmpEmail(e.target.value)}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#0042A5] rounded-xl px-3.5 py-3 text-xs font-bold outline-none transition"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-4xs font-black text-slate-500 uppercase tracking-wider block">Bidang / Sub-Bagian Tugas</label>
                        <select
                          value={regEmpDivision}
                          onChange={(e) => setRegEmpDivision(e.target.value)}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#0042A5] rounded-xl px-3 py-3 text-xs font-bold outline-none transition"
                        >
                          <option value="Bidang Pajak & Retribusi Daerah">Bidang Pajak & Retribusi Daerah</option>
                          <option value="Bidang Anggaran & Perencanaan">Bidang Anggaran & Perencanaan</option>
                          <option value="Bidang Perbendaharaan & Kas Daerah">Bidang Perbendaharaan & Kas Daerah</option>
                          <option value="Sekretariat & Umum Kepegawaian">Sekretariat & Umum Kepegawaian</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-4xs font-black text-[#E29201] uppercase tracking-wider block">Kode Verifikasi Kantor (BKD Otoritas)</label>
                        <input
                          type="password"
                          placeholder="Masukkan Kode Instansi (Petunjuk: BKDPKPINANG)"
                          value={regEmpCode}
                          onChange={(e) => setRegEmpCode(e.target.value)}
                          className="w-full bg-[#E29201]/5 focus:bg-white border border-[#E29201]/30 focus:border-[#E29201] rounded-xl px-3.5 py-3 text-xs font-bold outline-none transition text-slate-900"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-4xs font-black text-slate-500 uppercase tracking-wider block">Kata Sandi Akun</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={regEmpPassword}
                          onChange={(e) => setRegEmpPassword(e.target.value)}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#0042A5] rounded-xl px-3.5 py-3 text-xs font-bold outline-none transition"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0042A5] hover:bg-[#003584] text-white py-3.5 rounded-xl text-xs uppercase tracking-wider font-black transition shadow-md active:scale-98 cursor-pointer"
                    >
                      Daftarkan Pegawai & Verifikasi Jabatan
                    </button>

                  </form>
                )
              )}

            </div>
          </div>

          {/* QUICK DEMO PANEL (Col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Access Demo Accounts Card */}
            <div className="bg-gradient-to-br from-[#003B93] to-[#001D4B] text-white border border-[#003B93] rounded-3xl p-6 shadow-md space-y-5">
              <div className="border-b border-white/10 pb-3">
                <span className="text-4xs font-black text-[#FFDF00] uppercase tracking-widest block mb-1">AKSES DEMO INSTAN</span>
                <h3 className="text-sm font-black text-white uppercase flex items-center gap-1.5">
                  <UserCheck className="h-4.5 w-4.5 text-[#FFDF00]" />
                  Uji Coba Portal (Simulasi)
                </h3>
                <p className="text-[10px] text-slate-300 font-medium mt-1 leading-relaxed">
                  Gunakan akun prasetel resmi di bawah untuk langsung mencoba navigasi portal dua arah yang saling terhubung:
                </p>
              </div>

              {/* Citizen Demo button */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-3xs font-black text-[#FFDF00] uppercase tracking-wider">Masyarakat (Wajib Pajak)</span>
                  <span className="text-5xs bg-[#10b981] text-white px-2 py-0.5 rounded font-bold uppercase">AKUN PRE-SET</span>
                </div>
                <div className="text-[11px] text-slate-200 space-y-1 font-mono">
                  <p>👤 Nama: <strong className="text-white">Bambang Wijaya</strong></p>
                  <p>🆔 NIK: <strong className="text-white">1971031402049902</strong></p>
                  <p>🔑 Sandi: <strong className="text-white">warga123</strong></p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickLogin("masyarakat")}
                  className="w-full bg-[#FFDF00] hover:bg-yellow text-slate-950 font-black text-3xs uppercase py-2 rounded-xl transition shadow-3xs cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                >
                  Masuk sebagai Warga <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* Employee Demo button */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-3xs font-black text-[#FFDF00] uppercase tracking-wider">Karyawan / Pegawai BKD</span>
                  <span className="text-5xs bg-blue-500 text-white px-2 py-0.5 rounded font-bold uppercase">AKUN VERIFIKATOR</span>
                </div>
                <div className="text-[11px] text-slate-200 space-y-1 font-mono">
                  <p>👤 Nama: <strong className="text-white">Heri Purwanto, S.E.</strong></p>
                  <p>🆔 NIP: <strong className="text-white">198510122011011002</strong></p>
                  <p>🔑 Sandi: <strong className="text-white">karyawan123</strong></p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickLogin("karyawan")}
                  className="w-full bg-white text-[#0042A5] hover:bg-slate-100 font-black text-3xs uppercase py-2 rounded-xl transition shadow-3xs cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                >
                  Masuk sebagai Pegawai <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* Hint text */}
              <div className="text-[10px] text-slate-300 font-medium flex items-start gap-2 bg-black/10 p-3 rounded-xl border border-white/5">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                <span>
                  <strong>Tip Integrasi:</strong> Anda dapat mendaftar aduan keberatan pajak baru saat masuk sebagai Wajib Pajak, lalu logout dan masuk sebagai Pegawai BKD untuk langsung menyetujui atau menolak aduan tersebut!
                </span>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* RENDER PORTAL LAYANAN SETELAH LOGIN */
        activeUser.role === "masyarakat" ? (
          
          /* CITIZEN LOGGED IN VIEW */
          <div className="space-y-8 animate-fade-in">
            
            {/* CITIZEN PROFILE HERO */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-md">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#003B93] via-[#002762] to-slate-950/95" />
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* ID Card Simulation */}
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-5xs px-2 py-0.5 rounded-full uppercase tracking-wider">
                      AKUN WARGA AKTIF
                    </span>
                    <span className="text-slate-400 text-5xs font-mono">TERKONEKSI DENGAN DUKCAPIL</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-white">{activeUser.fullName}</h3>
                    <p className="text-xs text-slate-300 font-mono tracking-wide">NIK Kependudukan: {activeUser.nik}</p>
                    <p className="text-3xs text-slate-400 font-medium">Alamat: {activeUser.address} | Telp: {activeUser.phone}</p>
                  </div>
                </div>

                {/* Digital Card Preview (Col-span-4) */}
                <div className="md:col-span-4 bg-gradient-to-br from-[#E29201] to-yellow text-slate-950 rounded-2xl p-4.5 shadow-md border border-white/20 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-6 -mt-6" />
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] font-black tracking-widest uppercase">KARTU DIGITAL PBB</span>
                    <Coins className="h-5 w-5 opacity-40" />
                  </div>
                  <div>
                    <span className="text-4xs block opacity-75 uppercase">PEMILIK KARTU</span>
                    <span className="text-xs font-black tracking-wide leading-none">{activeUser.fullName.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between items-end border-t border-slate-950/15 pt-2 mt-2">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-slate-900">KWP-19.71-002</span>
                    <span className="text-[8px] bg-slate-950 text-white px-2 py-0.5 rounded font-black uppercase">GOLD CLASS</span>
                  </div>
                </div>

              </div>
            </div>

            {/* QUICK STATS FOR CITIZEN */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide block">Aset Objek Pajak</span>
                  <span className="text-2xl font-black text-slate-900 mt-1 block">{(activeUser as CitizenAccount).assets.length} Unit</span>
                  <span className="text-5xs font-bold text-slate-500 uppercase tracking-widest mt-1 block">YANG TERDAFTAR RESMI</span>
                </div>
                <div className="p-3 bg-[#0042A5]/10 rounded-xl text-[#0042A5]">
                  <FileText className="h-5.5 w-5.5" />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide block">Tagihan PBB Aktif</span>
                  <span className="text-2xl font-black text-red-600 mt-1 block">
                    Rp {((activeUser as CitizenAccount).assets.filter(a => a.status === "BELUM_BAYAR").reduce((sum, current) => sum + current.amount, 0)).toLocaleString("id-ID")}
                  </span>
                  <span className="text-5xs font-black text-red-500 bg-red-50 px-2 py-0.5 rounded inline-block mt-1 uppercase tracking-widest">
                    HARAP SEGERA LUNASI
                  </span>
                </div>
                <div className="p-3 bg-red-50 rounded-xl text-red-600">
                  <Coins className="h-5.5 w-5.5" />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide block">Pengaduan Saya</span>
                  <span className="text-2xl font-black text-slate-900 mt-1 block">{(activeUser as CitizenAccount).complaints.length} Berkas</span>
                  <span className="text-5xs font-bold text-[#E29201] uppercase tracking-widest mt-1 block">
                    {(activeUser as CitizenAccount).complaints.filter(c => c.status === "PENDING").length} ANTRIAN VERIFIKASI
                  </span>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl text-[#E29201]">
                  <Activity className="h-5.5 w-5.5" />
                </div>
              </div>

            </div>

            {/* ASSETS AND BILLS SECTION (Masyarakat) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Assets & Bills Table (Col-span-7) */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase">Daftar Objek Pajak Daerah PBB-P2</h3>
                    <p className="text-3xs text-slate-500 mt-0.5">Silakan pilih aset di bawah untuk melakukan simulasi pembayaran online.</p>
                  </div>
                  <button
                    onClick={() => setShowAddAssetModal(true)}
                    className="bg-[#0042A5] hover:bg-[#003584] text-white px-3.5 py-2 rounded-xl text-4xs uppercase tracking-wider font-black transition shadow-3xs cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" /> Tambah Objek Pajak
                  </button>
                </div>

                <div className="space-y-4">
                  {(activeUser as CitizenAccount).assets.map((asset) => (
                    <div 
                      key={asset.id} 
                      className={`border rounded-2xl p-4 transition duration-200 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center ${
                        asset.status === "LUNAS" 
                          ? "bg-slate-50/50 border-slate-200" 
                          : "bg-white border-red-200/80 hover:border-red-300"
                      }`}
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-5xs font-black uppercase">
                            {asset.type}
                          </span>
                          <span className="text-4xs font-mono font-bold text-slate-500">
                            NOP: {asset.nop}
                          </span>
                        </div>
                        <h4 className="text-xs font-black text-slate-900">{asset.location}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-4xs font-bold text-slate-400">
                          <span>Tahun Pajak: {asset.year}</span>
                          <span>Batas Tempo: <strong className="text-slate-600">{asset.dueDate}</strong></span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right space-y-2 shrink-0 self-stretch sm:self-auto flex sm:flex-col justify-between items-center sm:items-end">
                        <div>
                          <span className="text-4xs block text-slate-400 font-bold uppercase">Pajak Terutang</span>
                          <span className="text-sm font-black text-slate-900">Rp {asset.amount.toLocaleString("id-ID")}</span>
                        </div>
                        
                        {asset.status === "LUNAS" ? (
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-4xs font-black uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle className="h-3.5 w-3.5" /> Lunas {asset.paymentDate && `(${asset.paymentDate})`}
                          </span>
                        ) : (
                          <button
                            onClick={() => initiatePayment(asset)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-4xs uppercase tracking-wider font-black transition shadow-3xs cursor-pointer flex items-center gap-1.5"
                          >
                            <CreditCard className="h-3.5 w-3.5 animate-pulse" /> Bayar Pajak
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FORM COMPLAINT / KEBERATAN PAJAK (Col-span-5) */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-4xs font-black text-[#E29201] uppercase tracking-widest block mb-0.5">ADUAN & DISPENSASI</span>
                  <h3 className="text-sm font-black text-slate-900 uppercase">Formulir Keberatan / Pembetulan Pajak</h3>
                  <p className="text-3xs text-slate-500 mt-0.5">Ajukan sanggahan resmi jika terdapat kesalahan ukur luas tanah, denda keberatan, atau permohonan dispensasi pembayaran.</p>
                </div>

                <form onSubmit={handleAddComplaint} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-4xs font-black text-slate-500 uppercase block">Jenis Permohonan Dokumen</label>
                    <select
                      value={complaintType}
                      onChange={(e) => setComplaintType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none focus:border-[#E29201] transition"
                    >
                      <option value="Pembetulan Ketetapan">Pembetulan Ketetapan (Kesalahan Luas/Data)</option>
                      <option value="Pengurangan Denda">Pengurangan / Penghapusan Denda Administrasi</option>
                      <option value="Keberatan Pajak">Keberatan Nilai Jual Objek Pajak (NJOP)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-4xs font-black text-slate-500 uppercase block">Pilih Objek Pajak Terkait</label>
                    <select
                      value={complaintNop}
                      onChange={(e) => setComplaintNop(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none focus:border-[#E29201] transition"
                      required
                    >
                      <option value="">-- Pilih NOP Terdaftar --</option>
                      {(activeUser as CitizenAccount).assets.map(ast => (
                        <option key={ast.id} value={ast.nop}>{ast.nop} ({ast.type})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-4xs font-black text-slate-500 uppercase block">Judul Laporan Keberatan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Koreksi Luas Fisik Bangunan Rumah"
                      value={complaintTitle}
                      onChange={(e) => setComplaintTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold outline-none focus:border-[#E29201] transition"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-4xs font-black text-slate-500 uppercase block">Detail Kronologi & Penjelasan</label>
                    <textarea
                      rows={3}
                      placeholder="Jelaskan alasan pengajuan secara komprehensif, sertakan luas riil atau nomor berkas penunjang."
                      value={complaintDesc}
                      onChange={(e) => setComplaintDesc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold outline-none focus:border-[#E29201] transition resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#E29201] hover:bg-yellow text-slate-950 py-3 rounded-xl text-xs uppercase tracking-wider font-black transition shadow-3xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="h-4 w-4" /> Kirim Aduan Ke verifikator BKD
                  </button>
                </form>

              </div>

            </div>

            {/* ADUAN HISTORIS DAN CATATAN FEEDBACK (Masyarakat) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase">Riwayat Status Berkas Keberatan & Hasil Verifikasi Pegawai</h3>
                <p className="text-3xs text-slate-500 mt-0.5">Gunakan tabel integrasi di bawah untuk memonitor progres peninjauan langsung oleh tim BKD Kota Pangkalpinang.</p>
              </div>

              {(activeUser as CitizenAccount).complaints.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400 font-semibold">
                  Belum ada berkas keberatan atau dispensasi yang dikirimkan.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full text-left text-xs font-semibold text-slate-700">
                    <thead className="bg-slate-50 text-slate-400 font-black uppercase text-[9px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-3">Tanggal Laporan</th>
                        <th className="p-3">Jenis Laporan</th>
                        <th className="p-3">Keterangan Judul</th>
                        <th className="p-3">NOP Objek</th>
                        <th className="p-3">Status Evaluasi</th>
                        <th className="p-3">Feedback Instansi Resmi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(activeUser as CitizenAccount).complaints.map((cmp) => (
                        <tr key={cmp.id} className="hover:bg-slate-50/50">
                          <td className="p-3 font-mono font-bold text-slate-400 whitespace-nowrap">{cmp.date}</td>
                          <td className="p-3">
                            <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-5xs font-black uppercase">
                              {cmp.type}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-800 max-w-[200px] truncate" title={cmp.description}>{cmp.title}</td>
                          <td className="p-3 font-mono font-bold text-slate-500">{cmp.nop}</td>
                          <td className="p-3 whitespace-nowrap">
                            {cmp.status === "PENDING" && (
                              <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-5xs font-black uppercase tracking-wider flex items-center max-w-max gap-1">
                                <Clock className="h-3 w-3" /> Antrean
                              </span>
                            )}
                            {cmp.status === "DISETUJUI" && (
                              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-5xs font-black uppercase tracking-wider flex items-center max-w-max gap-1">
                                <CheckCircle className="h-3 w-3" /> Disetujui
                              </span>
                            )}
                            {cmp.status === "DITOLAK" && (
                              <span className="bg-red-100 text-red-800 border border-red-200 px-2.5 py-1 rounded-full text-5xs font-black uppercase tracking-wider flex items-center max-w-max gap-1">
                                <XCircle className="h-3 w-3" /> Ditolak
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-3xs text-slate-500 font-medium italic">
                            {cmp.feedback || "— Sedang dalam antrean evaluasi bidang —"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        ) : (
          
          /* KARYAWAN / PEGAWAI LOGGED IN VIEW */
          <div className="space-y-8 animate-fade-in">
            
            {/* EMPLOYEE PROFILE HERO */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-md">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#003B93] via-[#001D4B] to-slate-950/95" />
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Employee ID details */}
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#E29201]/20 border border-[#E29201]/30 text-[#E29201] font-black text-5xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      AKUN PEGAWAI AKTIF
                    </span>
                    <span className="text-emerald-400 text-5xs font-bold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 bg-[#10b981] rounded-full animate-ping" />
                      KONEKSI DATABASE SIKAD AMAN
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-white">{activeUser.fullName}</h3>
                    <p className="text-xs text-slate-300 font-mono tracking-wide">Nomor Induk Pegawai: {(activeUser as EmployeeAccount).nip}</p>
                    <p className="text-3xs text-slate-400 font-medium">Penugasan Jabatan: <strong className="text-white">{(activeUser as EmployeeAccount).division}</strong></p>
                  </div>
                </div>

                {/* Badge card decoration */}
                <div className="md:col-span-4 bg-slate-800/80 backdrop-blur-xs border border-white/10 rounded-2xl p-4.5 space-y-3 shrink-0">
                  <div className="flex justify-between items-center text-4xs font-black uppercase text-slate-400">
                    <span>Sertifikat Digital</span>
                    <ShieldCheck className="h-4.5 w-4.5 text-secondary" />
                  </div>
                  <div className="text-[10px] text-slate-300 space-y-1 font-semibold leading-relaxed">
                    <p>🔐 Otoritas: <span className="text-white">Fiskal Verifikator</span></p>
                    <p>🏢 Instansi: <span className="text-white">BKD Pangkalpinang</span></p>
                    <p>🧬 Kode TTE: <span className="text-emerald-400 font-mono">BSrE.19741002.04</span></p>
                  </div>
                </div>

              </div>
            </div>

            {/* OPERATIONAL METRICS FOR EMPLOYEES */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide block">Total Berkas Keberatan</span>
                  <span className="text-2xl font-black text-slate-900 mt-1 block">{allComplaints.length} Berkas</span>
                  <span className="text-5xs font-bold text-slate-500 uppercase tracking-widest mt-1 block">DARI SELURUH KECAMATAN</span>
                </div>
                <div className="p-3 bg-slate-100 rounded-xl text-slate-700">
                  <FileSpreadsheet className="h-5.5 w-5.5" />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide block">Antrean Pending PBB</span>
                  <span className="text-2xl font-black text-[#E29201] mt-1 block">{pendingComplaintsCount} Antrean</span>
                  <span className="text-5xs font-black text-amber-500 bg-amber-50 px-2 py-0.5 rounded inline-block mt-1 uppercase tracking-widest">
                    BUTUH EVALUASI SEGERA
                  </span>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl text-[#E29201]">
                  <Clock className="h-5.5 w-5.5 animate-pulse" />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex items-center justify-between">
                <div>
                  <span className="text-4xs font-bold text-slate-400 uppercase tracking-wide block">Permohonan Disetujui</span>
                  <span className="text-2xl font-black text-emerald-600 mt-1 block">{approvedComplaintsCount} Berkas</span>
                  <span className="text-5xs font-bold text-emerald-500 uppercase tracking-widest mt-1 block">
                    TELAH DITERBITKAN SK BARU
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                  <CheckCircle className="h-5.5 w-5.5" />
                </div>
              </div>

            </div>

            {/* VERIFICATION QUEUE & ACTIVE ACTIONS SECTION (Karyawan) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
              
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center flex-wrap gap-3">
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase">Antrean Verifikasi Berkas Keberatan Pajak Daerah</h3>
                  <p className="text-3xs text-slate-500 mt-0.5">Tinjau, setujui, atau tolak pengajuan keberatan pajak warga secara digital menggunakan instrumen di bawah.</p>
                </div>
                <span className="text-5xs font-black bg-slate-150 text-slate-600 border border-slate-200 px-2.5 py-1 rounded uppercase tracking-wider">
                  REAL-TIME SYNCED TABLE
                </span>
              </div>

              {allComplaints.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400 font-semibold">
                  Tidak ada berkas pengaduan dalam database.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full text-left text-xs font-semibold text-slate-700">
                    <thead className="bg-slate-50 text-slate-400 font-black uppercase text-[9px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-3">Wajib Pajak</th>
                        <th className="p-3">NOP Objek</th>
                        <th className="p-3">Kategori</th>
                        <th className="p-3">Isi Keberatan (Detail Kronologi)</th>
                        <th className="p-3">Tanggal Kirim</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Tindakan Admin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {allComplaints.map((cmp) => (
                        <tr key={cmp.id} className="hover:bg-slate-50/50">
                          <td className="p-3">
                            <div className="space-y-0.5">
                              <span className="font-extrabold text-slate-900 block">{cmp.citizenName}</span>
                              <span className="text-5xs text-slate-400 font-mono block">NIK: {cmp.citizenNik}</span>
                            </div>
                          </td>
                          <td className="p-3 font-mono font-bold text-slate-600">{cmp.nop}</td>
                          <td className="p-3 whitespace-nowrap">
                            <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded text-5xs font-black uppercase">
                              {cmp.type}
                            </span>
                          </td>
                          <td className="p-3 max-w-[280px]">
                            <div className="space-y-1">
                              <span className="font-bold text-slate-900 block">{cmp.title}</span>
                              <p className="text-3xs text-slate-500 font-medium leading-relaxed italic">"{cmp.description}"</p>
                              {cmp.feedback && (
                                <div className="p-2 bg-slate-50 rounded-lg border border-slate-150 text-4xs text-slate-600 font-semibold leading-normal">
                                  💡 Feedback Dinas: {cmp.feedback}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="p-3 font-mono font-bold text-slate-400 whitespace-nowrap">{cmp.date}</td>
                          <td className="p-3 whitespace-nowrap">
                            {cmp.status === "PENDING" && (
                              <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-5xs font-black uppercase tracking-wider flex items-center max-w-max gap-1">
                                <Clock className="h-3 w-3 animate-pulse" /> Antrean
                              </span>
                            )}
                            {cmp.status === "DISETUJUI" && (
                              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-5xs font-black uppercase tracking-wider flex items-center max-w-max gap-1">
                                <CheckCircle className="h-3 w-3" /> Disetujui
                              </span>
                            )}
                            {cmp.status === "DITOLAK" && (
                              <span className="bg-red-100 text-red-800 border border-red-200 px-2.5 py-1 rounded-full text-5xs font-black uppercase tracking-wider flex items-center max-w-max gap-1">
                                <XCircle className="h-3 w-3" /> Ditolak
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right whitespace-nowrap">
                            {cmp.status === "PENDING" ? (
                              <button
                                onClick={() => { setVerifyingComplaint(cmp); setEmployeeFeedback(""); }}
                                className="bg-[#0042A5] hover:bg-[#003584] text-white px-3 py-1.5 rounded-lg text-4xs uppercase tracking-wider font-extrabold transition shadow-3xs cursor-pointer inline-flex items-center gap-1"
                              >
                                Evaluasi Berkas
                              </button>
                            ) : (
                              <span className="text-4xs font-bold text-slate-400 uppercase tracking-widest">— Selesai —</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>

            {/* INTERNAL CIRCULARS & DOWNLOADS BOARD (Karyawan) */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase">Arsip Peraturan, DHKP, & Surat Edaran Internal</h3>
                <p className="text-3xs text-slate-500 mt-0.5">Khusus konsumsi internal staf Badan Keuangan Daerah Kota Pangkalpinang.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                
                <div className="border border-slate-100 rounded-2xl p-4.5 hover:border-slate-300 transition bg-slate-50/50 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="p-2.5 bg-[#0042A5]/10 rounded-xl text-[#0042A5]">
                      <FileDown className="h-5 w-5" />
                    </span>
                    <span className="text-5xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-bold uppercase">CONFIDENTIAL</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-900 leading-snug">DHKP Pajak Bumi & Bangunan Tahun 2026</h4>
                    <p className="text-4xs text-slate-400 font-medium">Format: XLSX | Ukuran: 18.4 MB</p>
                  </div>
                  <a href="#download" className="text-4xs text-[#0042A5] font-black uppercase flex items-center gap-1.5 hover:underline">
                    Download Berkas <ArrowRight className="h-3 w-3" />
                  </a>
                </div>

                <div className="border border-slate-100 rounded-2xl p-4.5 hover:border-slate-300 transition bg-slate-50/50 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="p-2.5 bg-[#0042A5]/10 rounded-xl text-[#0042A5]">
                      <FileDown className="h-5 w-5" />
                    </span>
                    <span className="text-5xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold uppercase">INTERNAL ONLY</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-900 leading-snug">SOP Verifikasi Pengurangan Pokok Pajak Terutang</h4>
                    <p className="text-4xs text-slate-400 font-medium">Format: PDF | Ukuran: 1.2 MB</p>
                  </div>
                  <a href="#download" className="text-4xs text-[#0042A5] font-black uppercase flex items-center gap-1.5 hover:underline">
                    Download Berkas <ArrowRight className="h-3 w-3" />
                  </a>
                </div>

                <div className="border border-slate-100 rounded-2xl p-4.5 hover:border-slate-300 transition bg-slate-50/50 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="p-2.5 bg-[#0042A5]/10 rounded-xl text-[#0042A5]">
                      <FileDown className="h-5 w-5" />
                    </span>
                    <span className="text-5xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold uppercase">STAF EDISI</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-900 leading-snug">SE Kepala Badan tentang Penyelenggaraan Pelayanan e-SPPT Mandiri</h4>
                    <p className="text-4xs text-slate-400 font-medium">Format: PDF | Ukuran: 840 KB</p>
                  </div>
                  <a href="#download" className="text-4xs text-[#0042A5] font-black uppercase flex items-center gap-1.5 hover:underline">
                    Download Berkas <ArrowRight className="h-3 w-3" />
                  </a>
                </div>

              </div>
            </div>

          </div>
        )
      )}

      {/* POPUP: COMPLAINT VERIFICATION MODAL FOR EMPLOYEE (KARYAWAN) */}
      <AnimatePresence>
        {verifyingComplaint && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5"
            >
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <span className="text-4xs font-black text-[#0042A5] uppercase tracking-widest">PROSES EVALUASI FISKAL</span>
                  <h3 className="text-sm font-black text-slate-900 uppercase">Tinjau Keberatan Pajak</h3>
                </div>
                <button
                  onClick={() => setVerifyingComplaint(null)}
                  className="p-1 text-slate-400 hover:text-slate-900 cursor-pointer text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-400">Pengirim:</span>
                  <strong className="text-slate-900">{verifyingComplaint.citizenName} (NIK: {verifyingComplaint.citizenNik})</strong>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-400">NOP Terkait:</span>
                  <span className="font-mono text-slate-800">{verifyingComplaint.nop}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-400">Judul Berkas:</span>
                  <span className="text-slate-800 font-extrabold">{verifyingComplaint.title}</span>
                </div>
                <div className="h-px bg-slate-200/60 my-2" />
                <p className="text-3xs text-slate-600 leading-relaxed font-medium italic">"{verifyingComplaint.description}"</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-4xs font-black text-slate-500 uppercase block">Catatan / Feedback Resmi Dinas</label>
                <textarea
                  rows={3}
                  placeholder="Masukkan rincian verifikasi atau alasan persetujuan/penolakan yang akan langsung tampil di akun warga."
                  value={employeeFeedback}
                  onChange={(e) => setEmployeeFeedback(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold outline-none focus:border-[#0042A5] transition resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleVerifyComplaint("DITOLAK")}
                  className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 py-3 rounded-xl text-xs uppercase tracking-wider font-black transition cursor-pointer"
                >
                  Reject (Tolak Berkas)
                </button>
                <button
                  onClick={() => handleVerifyComplaint("DISETUJUI")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs uppercase tracking-wider font-black transition cursor-pointer"
                >
                  Approve (Setujui)
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUP: PAYMENT PROCESS SIMULATOR FOR CITIZEN (MASYARKAT) */}
      <AnimatePresence>
        {isPayingAsset && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 text-center"
            >
              {paymentSuccess ? (
                <div className="space-y-4 py-6">
                  <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-3xs animate-bounce">
                    <CheckCircle className="h-9 w-9" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 uppercase">PEMBAYARAN BERHASIL</h3>
                    <p className="text-3xs text-slate-500 font-medium mt-1">Sertifikat lunas PBB-P2 digital Anda telah diperbarui secara aman.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-4xs font-mono text-slate-600 text-left space-y-1">
                    <p>TRANSAKSI ID: <span className="text-slate-900 font-bold">TX-{Date.now()}</span></p>
                    <p>WAKTU REAL: <span className="text-slate-900 font-bold">{new Date().toLocaleString("id-ID")}</span></p>
                    <p>TERBAYAR: <span className="text-emerald-600 font-bold">Rp {isPayingAsset.amount.toLocaleString("id-ID")}</span></p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3 text-left">
                    <div>
                      <span className="text-4xs font-black text-red-600 uppercase tracking-widest">SISTEM TRANSFER AMAN BANK BKD</span>
                      <h3 className="text-sm font-black text-slate-900 uppercase">Simulasi Pembayaran PBB</h3>
                    </div>
                    <button
                      onClick={() => setIsPayingAsset(null)}
                      className="p-1 text-slate-400 hover:text-slate-900 cursor-pointer text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left space-y-2 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-400">NOP:</span>
                      <strong className="text-slate-900 font-mono">{isPayingAsset.nop}</strong>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-400">Total Nominal:</span>
                      <strong className="text-red-600 text-sm font-black">Rp {isPayingAsset.amount.toLocaleString("id-ID")}</strong>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-400">Objek Pajak:</span>
                      <span className="text-slate-800 font-bold">{isPayingAsset.type} - {isPayingAsset.location}</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="text-left space-y-2">
                    <label className="text-4xs font-black text-slate-400 uppercase tracking-widest block">Metode Pembayaran Digital</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["QRIS (Gopay/OVO)", "Bank Sumsel Babel", "Virtual Account"].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          className={`py-2 px-1 border rounded-lg text-5xs font-black uppercase text-center transition cursor-pointer ${
                            paymentMethod === method
                              ? "border-[#0042A5] bg-[#0042A5]/5 text-[#0042A5]"
                              : "border-slate-200 hover:border-slate-300 text-slate-500"
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={executePayment}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs uppercase tracking-wider font-black transition shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" /> Lunasi Sekarang (Rp {isPayingAsset.amount.toLocaleString("id-ID")})
                    </button>
                    <p className="text-[9px] text-slate-400 font-semibold leading-normal">
                      Sistem pembayaran ini disimulasikan sesuai gerbang transaksi Bank Daerah Sumsel Babel.
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUP: ADD OBJECT PROPERTY MODAL FOR CITIZEN (MASYARAKAT) */}
      <AnimatePresence>
        {showAddAssetModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5"
            >
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <span className="text-4xs font-black text-[#0042A5] uppercase tracking-widest">REGISTRASI OBJEK FISIK</span>
                  <h3 className="text-sm font-black text-slate-900 uppercase">Tambah Objek Pajak Baru</h3>
                </div>
                <button
                  onClick={() => setShowAddAssetModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-900 cursor-pointer text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddNewAsset} className="space-y-4">
                
                <div className="space-y-1.5">
                  <label className="text-4xs font-black text-slate-500 uppercase block">Nomor Objek Pajak (NOP 18 Digit)</label>
                  <input
                    type="text"
                    placeholder="Contoh: 19.71.010.002.015-0214.0"
                    value={newNop}
                    onChange={(e) => setNewNop(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold outline-none focus:border-[#0042A5] transition"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-4xs font-black text-slate-500 uppercase block">Tipe Objek Pajak</label>
                  <select
                    value={newAssetType}
                    onChange={(e) => setNewAssetType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold outline-none focus:border-[#0042A5] transition"
                  >
                    <option value="Rumah Tinggal & Tanah">Rumah Tinggal & Tanah</option>
                    <option value="Ruko Tempat Usaha">Ruko Tempat Usaha</option>
                    <option value="Tanah Kosong / Kebun">Tanah Kosong / Kebun</option>
                    <option value="Bangunan Industri / Pabrik">Bangunan Industri / Pabrik</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-4xs font-black text-slate-500 uppercase block">Lokasi Lengkap Objek Pajak</label>
                  <input
                    type="text"
                    placeholder="Contoh: Jl. Jenderal Sudirman No. 89, Pangkal Balam, Pangkalpinang"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold outline-none focus:border-[#0042A5] transition"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-4xs font-black text-slate-500 uppercase block">Simulasi Pokok Ketetapan Pajak (Rp / Tahun)</label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold outline-none focus:border-[#0042A5] transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0042A5] hover:bg-[#003584] text-white py-3 rounded-xl text-xs uppercase tracking-wider font-black transition shadow-md cursor-pointer"
                >
                  Simpan Objek Pajak Baru
                </button>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
