export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

export interface APBDItem {
  category: string;
  value: number; // in Billion IDR (Miliar Rupiah)
  percentage: number;
  details: string;
  subItems?: { name: string; value: number }[];
}

export interface APBDData {
  year: number;
  revenue: {
    total: number;
    items: APBDItem[];
  };
  expenditure: {
    total: number;
    items: APBDItem[];
  };
}

export interface PBBCalculatorInput {
  njopBumiPerM2: number;
  luasBumi: number;
  njopBangunanPerM2: number;
  luasBangunan: number;
}

export interface PBBCalculatorResult {
  totalNjopBumi: number;
  totalNjopBangunan: number;
  totalNjop: number;
  njoptkp: number;
  njopKp: number;
  tarif: number;
  pbbTerhutang: number;
}

export interface BPHTBCalculatorInput {
  perolehanNilai: number;
  jenisPerolehan: "jual_beli" | "waris" | "hibah";
}

export interface BPHTBCalculatorResult {
  nilaiTransaksi: number;
  npoptkp: number;
  npopkp: number;
  tarif: number;
  bphtbTerhutang: number;
}
