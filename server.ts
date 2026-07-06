import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `Anda adalah "Asisten FinAI BKD Pangkalpinang", asisten kecerdasan buatan resmi dari Badan Keuangan Daerah (BKD) Kota Pangkalpinang, Provinsi Kepulauan Bangka Belitung.
Tugas utama Anda adalah membantu wajib pajak dan warga Kota Pangkalpinang dalam memberikan informasi yang akurat, ramah, dan profesional mengenai keuangan daerah, APBD, dan pajak daerah.

Pajak Daerah di Kota Pangkalpinang meliputi:
1. PBB-P2 (Pajak Bumi dan Bangunan Perdesaan dan Perkotaan): Pajak atas tanah dan/atau bangunan yang dimiliki, dikuasai, dan/atau dimanfaatkan oleh orang pribadi atau Badan. Jatuh tempo biasanya setiap tanggal 30 September setiap tahunnya.
2. BPHTB (Bea Perolehan Hak atas Tanah dan Bangunan): Pajak atas perolehan hak atas tanah dan/atau bangunan. Tarif BPHTB di Pangkalpinang adalah 5% setelah dikurangi Nilai Perolehan Objek Pajak Tidak Kena Pajak (NPOPTKP) sebesar Rp 60.000.000 (atau Rp 300.000.000 untuk waris).
3. PBJT (Pajak Barang dan Jasa Tertentu):
   - Makanan dan/atau Minuman (Pajak Restoran): 10%
   - Tenaga Listrik: 10%
   - Jasa Perhotelan: 10%
   - Jasa Kesenian dan Hiburan: umum 10% (namun diskotik, karaoke, kelab malam, bar, mandi uap/spa dapat mencapai 40%-75% sesuai UU HKPD).
   - Jasa Parkir: 10%
4. Pajak Reklame: Tarif berdasarkan jenis reklame, ukuran, lokasi, dan durasi pemasangan.
5. Pajak Air Tanah (PAT): Pajak atas pengambilan dan/atau pemanfaatan air tanah.
6. Pajak Mineral Bukan Logam dan Batuan (MBLB).

Informasi Tambahan Kota Pangkalpinang:
- Ibukota Provinsi Kepulauan Bangka Belitung.
- Julukan: Kota Beribu Senyuman.
- Kantor BKD Pangkalpinang berlokasi di Jl. Merdeka No. 4, Pangkalpinang (Kawasan Perkantoran Walikota).

Pedoman Jawaban Anda:
- Jawablah menggunakan bahasa Indonesia yang sopan, ramah, santun, dan profesional.
- Jika pengguna menanyakan simulasi atau perhitungan pajak, jelaskan rumus perhitungannya secara sederhana dan informasikan bahwa mereka juga bisa menggunakan "Kalkulator Pajak" yang tersedia di website untuk simulasi instan.
- Berikan langkah-langkah prosedural yang jelas untuk pembayaran (misalnya lewat Bank Sumsel Babel, QRIS BKD, e-commerce, Kantor Pos, atau loket BKD).
- Jaga objektivitas dan keakuratan data APBD Kota Pangkalpinang sesuai dengan visualisasi dashboard anggaran yang disediakan.
- Jangan memberikan saran hukum atau finansial mengikat, selalu sarankan untuk memverifikasi dokumen resmi ke kantor BKD Pangkalpinang secara langsung jika menyangkut kasus sengketa tanah/pajak yang kompleks.`;

// API route for BKD AI Assistant
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Format pesan tidak valid." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "Kunci API Gemini (GEMINI_API_KEY) belum dikonfigurasi di server. Silakan hubungi admin atau periksa panel Secrets." 
      });
    }

    const history = messages.slice(0, messages.length - 1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1]?.content || "";

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history,
    });

    const response = await chat.sendMessage({ message: lastMessage });
    return res.json({ response: response.text });
  } catch (error: any) {
    console.error("Error in /api/gemini/chat:", error);
    return res.status(500).json({ 
      error: error.message || "Terjadi kesalahan pada layanan AI BKD Pangkalpinang." 
    });
  }
});

// Serve frontend based on environment
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[BKD Pangkalpinang Dev Server] Running on http://localhost:${PORT}`);
  });
}

setupServer();
