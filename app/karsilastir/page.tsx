 "use client";
import { useState } from "react";
import Footer from "../components/Footer";

export default function TeklifKarsilastir() {
  const [secilenTeklif, setSecilenTeklif] = useState("");

  const talep = {
    tedavi: "Implant",
    hasta: "Thomas M.",
    tarih: "22 Nisan 2024",
    aciklama: "Sol alt cene implant, daha once dis cekimi yapildi.",
  };

  const teklifler = [
    {
      id: "1",
      klinik: "Smile Dental Clinic",
      kisaltma: "SD",
      sehir: "Sisli, Istanbul",
      fiyat: "500",
      para: "EUR",
      puan: "4.9",
      yorumSayisi: "218",
      sure: "3 gun",
      garanti: "5 yil",
      dahil: ["Implant", "Zirkonyum kaplama", "Kontrol muayeneleri", "Transfer"],
      aciklama: "Nobel Biocare implant kullaniyoruz. 5 yil garanti sunuyoruz.",
      rozet: "EN IYI PUAN",
      rozetRenk: "#0a7a3a",
    },
    {
      id: "2",
      klinik: "Istanbul Dental Center",
      kisaltma: "ID",
      sehir: "Besiktas, Istanbul",
      fiyat: "420",
      para: "EUR",
      puan: "4.6",
      yorumSayisi: "142",
      sure: "2 gun",
      garanti: "3 yil",
      dahil: ["Implant", "Geçici kaplama", "1 kontrol muayenesi"],
      aciklama: "Straumann implant kullaniyoruz. Hizli tedavi secenegi mevcuttur.",
      rozet: "EN UYGUN",
      rozetRenk: "#185FA5",
    },
    {
      id: "3",
      klinik: "Dent Plus Klinik",
      kisaltma: "DP",
      sehir: "Kadikoy, Istanbul",
      fiyat: "550",
      para: "EUR",
      puan: "4.8",
      yorumSayisi: "189",
      sure: "4 gun",
      garanti: "10 yil",
      dahil: ["Implant", "Zirkonyum kaplama", "Sınırsız kontrol", "Transfer", "Otel"],
      aciklama: "Premium paket. 10 yil garanti ve otel dahil.",
      rozet: "PREMIUM",
      rozetRenk: "#BA7517",
    },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>

      <nav style={{ background: "#0a1628", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ fontSize: "20px", fontWeight: 500, color: "#fff", textDecoration: "none" }}>
          med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
        </a>
        <a href="/hasta-panel" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>Panele Don</a>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px" }}>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>Talebiniz</div>
            <div style={{ fontSize: "18px", fontWeight: 500, color: "#1a1a1a", marginBottom: "4px" }}>{talep.tedavi}</div>
            <div style={{ fontSize: "13px", color: "#888" }}>{talep.aciklama}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>{talep.tarih}</div>
            <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "20px", background: "#f0f4ff", color: "#185FA5" }}>3 Teklif Alindi</span>
          </div>
        </div>

        <h1 style={{ fontSize: "20px", fontWeight: 500, color: "#1a1a1a", marginBottom: "6px" }}>Teklifleri Karsilastir</h1>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "24px" }}>En uygun teklifi sec ve tedavine basla</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {teklifler.map((t) => (
            <div key={t.id} onClick={() => setSecilenTeklif(t.id)} style={{ background: "#fff", border: secilenTeklif === t.id ? "2px solid #185FA5" : "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.2s", boxShadow: secilenTeklif === t.id ? "0 4px 16px rgba(24,95,165,0.15)" : "none" }}>
              <div style={{ background: t.rozetRenk, padding: "6px 12px", textAlign: "center" }}>
                <span style={{ color: "#fff", fontSize: "11px", fontWeight: 500 }}>{t.rozet}</span>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "40px", height: "40px", background: "#E6F1FB", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#185FA5", fontWeight: 500, fontSize: "13px", flexShrink: 0 }}>{t.kisaltma}</div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a" }}>{t.klinik}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{t.sehir}</div>
                  </div>
                </div>

                <div style={{ textAlign: "center", padding: "16px 0", borderTop: "1px solid #f5f5f5", borderBottom: "1px solid #f5f5f5", marginBottom: "16px" }}>
                  <div style={{ fontSize: "32px", fontWeight: 500, color: "#185FA5" }}>{t.fiyat}</div>
                  <div style={{ fontSize: "13px", color: "#888" }}>{t.para}</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
                  {[
                    { etiket: "Puan", deger: "★ " + t.puan },
                    { etiket: "Yorum", deger: t.yorumSayisi },
                    { etiket: "Sure", deger: t.sure },
                    { etiket: "Garanti", deger: t.garanti },
                  ].map((b) => (
                    <div key={b.etiket} style={{ background: "#f9fafb", borderRadius: "8px", padding: "8px", textAlign: "center" }}>
                      <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>{b.etiket}</div>
                      <div style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1a" }}>{b.deger}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 500, color: "#555", marginBottom: "8px" }}>Dahil Olanlar:</div>
                  {t.dahil.map((d) => (
                    <div key={d} style={{ fontSize: "12px", color: "#555", padding: "3px 0", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ color: "#0a7a3a" }}>✓</span> {d}
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.5, marginBottom: "16px" }}>{t.aciklama}</p>

                <button style={{ width: "100%", background: secilenTeklif === t.id ? "#185FA5" : "#f0f4ff", color: secilenTeklif === t.id ? "#fff" : "#185FA5", border: "none", padding: "10px", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 500 }}>
                  {secilenTeklif === t.id ? "Secildi ✓" : "Bu Teklifi Sec"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {secilenTeklif && (
          <div style={{ background: "#fff", border: "2px solid #185FA5", borderRadius: "12px", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 500, color: "#1a1a1a", marginBottom: "4px" }}>
                {teklifler.find(t => t.id === secilenTeklif)?.klinik} secildi
              </div>
              <div style={{ fontSize: "13px", color: "#888" }}>
                Fiyat: {teklifler.find(t => t.id === secilenTeklif)?.fiyat} {teklifler.find(t => t.id === secilenTeklif)?.para}
              </div>
            </div>
            <button style={{ background: "#185FA5", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", cursor: "pointer", fontWeight: 500 }}>
              Teklifi Onayla ve Devam Et
            </button>
          </div>
        )}

      </div>
      <Footer />
    </main>
  );
}

