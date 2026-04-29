"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const tumOteller = [
  { id: "1", kisaltma: "RH", ad: "Radisson Blu Hotel", sehir: "Istanbul", ilce: "Sisli", yildiz: 5, puan: 4.8, yorum: 312, fiyat: 120, para: "EUR", klinikYakinligi: ["Smile Dental Clinic", "Hair Turkey Center"], olanaklar: ["WiFi", "Havuz", "Spa", "Restoran", "Transfer"] },
  { id: "2", kisaltma: "HI", ad: "Holiday Inn Istanbul", sehir: "Istanbul", ilce: "Besiktas", yildiz: 4, puan: 4.6, yorum: 218, fiyat: 85, para: "EUR", klinikYakinligi: ["Hair Turkey Center", "Vision Eye Center"], olanaklar: ["WiFi", "Restoran", "Transfer"] },
  { id: "3", kisaltma: "MW", ad: "Marriott Hotel", sehir: "Istanbul", ilce: "Kadikoy", yildiz: 5, puan: 4.9, yorum: 445, fiyat: 150, para: "EUR", klinikYakinligi: ["Vision Eye Center", "Estetik Plus"], olanaklar: ["WiFi", "Havuz", "Spa", "Restoran", "Bar", "Transfer"] },
  { id: "4", kisaltma: "HB", ad: "Hilton Bursa", sehir: "Bursa", ilce: "Nilufer", yildiz: 5, puan: 4.7, yorum: 189, fiyat: 95, para: "EUR", klinikYakinligi: ["Bursa Goz Merkezi"], olanaklar: ["WiFi", "Havuz", "Spa", "Restoran"] },
  { id: "5", kisaltma: "RA", ad: "Ramada Antalya", sehir: "Antalya", ilce: "Muratpasa", yildiz: 4, puan: 4.5, yorum: 134, fiyat: 75, para: "EUR", klinikYakinligi: ["Antalya Smile"], olanaklar: ["WiFi", "Havuz", "Restoran", "Transfer"] },
  { id: "6", kisaltma: "SK", ad: "Sheraton Ankara", sehir: "Ankara", ilce: "Cankaya", yildiz: 5, puan: 4.7, yorum: 267, fiyat: 110, para: "EUR", klinikYakinligi: ["Ankara Dental"], olanaklar: ["WiFi", "Havuz", "Spa", "Restoran", "Transfer"] },
];

const sehirler = ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"];
const yildizlar = [5, 4, 3];
const olanakListesi = ["WiFi", "Havuz", "Spa", "Restoran", "Transfer"];

export default function Oteller() {
  const [aramaMetni, setAramaMetni] = useState("");
  const [secilenSehirler, setSecilenSehirler] = useState<string[]>([]);
  const [secilenYildizlar, setSecilenYildizlar] = useState<number[]>([]);
  const [secilenOlanaklar, setSecilenOlanaklar] = useState<string[]>([]);
  const [maxFiyat, setMaxFiyat] = useState(500);
  const [sirala, setSirala] = useState("puan");

  function toggleSehir(sehir: string) {
    setSecilenSehirler((prev) => prev.includes(sehir) ? prev.filter((s) => s !== sehir) : [...prev, sehir]);
  }

  function toggleYildiz(yildiz: number) {
    setSecilenYildizlar((prev) => prev.includes(yildiz) ? prev.filter((y) => y !== yildiz) : [...prev, yildiz]);
  }

  function toggleOlanak(olanak: string) {
    setSecilenOlanaklar((prev) => prev.includes(olanak) ? prev.filter((o) => o !== olanak) : [...prev, olanak]);
  }

  function filtreleriSifirla() {
    setSecilenSehirler([]);
    setSecilenYildizlar([]);
    setSecilenOlanaklar([]);
    setMaxFiyat(500);
    setAramaMetni("");
  }

  const filtreliOteller = tumOteller
    .filter((o) => {
      const aramaUygun = o.ad.toLowerCase().includes(aramaMetni.toLowerCase()) || o.sehir.toLowerCase().includes(aramaMetni.toLowerCase());
      const sehirUygun = secilenSehirler.length === 0 || secilenSehirler.includes(o.sehir);
      const yildizUygun = secilenYildizlar.length === 0 || secilenYildizlar.includes(o.yildiz);
      const olanakUygun = secilenOlanaklar.length === 0 || secilenOlanaklar.every((ol) => o.olanaklar.includes(ol));
      const fiyatUygun = o.fiyat <= maxFiyat;
      return aramaUygun && sehirUygun && yildizUygun && olanakUygun && fiyatUygun;
    })
    .sort((a, b) => {
      if (sirala === "puan") return b.puan - a.puan;
      if (sirala === "fiyat_artan") return a.fiyat - b.fiyat;
      if (sirala === "fiyat_azalan") return b.fiyat - a.fiyat;
      if (sirala === "yorum") return b.yorum - a.yorum;
      return 0;
    });

  const aktifFiltreSayisi = secilenSehirler.length + secilenYildizlar.length + secilenOlanaklar.length + (maxFiyat < 500 ? 1 : 0);

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>

      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "40px 32px" }}>
        <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>Oteller</h1>
        <p style={{ color: "#8b8fc8", fontSize: "15px", marginBottom: "24px" }}>Klinige yakin {tumOteller.length} otel arasından secin</p>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "8px", display: "flex", gap: "8px", maxWidth: "600px" }}>
          <input type="text" placeholder="Otel veya sehir ara..." value={aramaMetni} onChange={(e) => setAramaMetni(e.target.value)} style={{ flex: 1, border: "none", outline: "none", padding: "10px 14px", fontSize: "14px", background: "transparent" }} />
          <button style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>Ara</button>
        </div>
      </section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px", display: "grid", gridTemplateColumns: "280px 1fr", gap: "24px" }}>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#12103a" }}>Filtreler</span>
            {aktifFiltreSayisi > 0 && (
              <button onClick={filtreleriSifirla} style={{ fontSize: "12px", color: "#534AB7", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                Temizle ({aktifFiltreSayisi})
              </button>
            )}
          </div>

          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px", marginBottom: "12px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Sehir</h3>
            {sehirler.map((s) => (
              <label key={s} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", cursor: "pointer" }}>
                <input type="checkbox" checked={secilenSehirler.includes(s)} onChange={() => toggleSehir(s)} style={{ accentColor: "#534AB7", width: "15px", height: "15px" }} />
                <span style={{ fontSize: "13px", color: secilenSehirler.includes(s) ? "#534AB7" : "#555", fontWeight: secilenSehirler.includes(s) ? 600 : 400 }}>{s}</span>
              </label>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px", marginBottom: "12px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Yildiz</h3>
            {yildizlar.map((y) => (
              <label key={y} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", cursor: "pointer" }}>
                <input type="checkbox" checked={secilenYildizlar.includes(y)} onChange={() => toggleYildiz(y)} style={{ accentColor: "#534AB7", width: "15px", height: "15px" }} />
                <span style={{ fontSize: "13px", color: secilenYildizlar.includes(y) ? "#534AB7" : "#555", fontWeight: secilenYildizlar.includes(y) ? 600 : 400 }}>{"★".repeat(y)} {y} Yildiz</span>
              </label>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px", marginBottom: "12px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Olanaklar</h3>
            {olanakListesi.map((o) => (
              <label key={o} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", cursor: "pointer" }}>
                <input type="checkbox" checked={secilenOlanaklar.includes(o)} onChange={() => toggleOlanak(o)} style={{ accentColor: "#534AB7", width: "15px", height: "15px" }} />
                <span style={{ fontSize: "13px", color: secilenOlanaklar.includes(o) ? "#534AB7" : "#555", fontWeight: secilenOlanaklar.includes(o) ? 600 : 400 }}>{o}</span>
              </label>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Max Fiyat (EUR/Gece)</h3>
            <input type="range" min="50" max="500" step="10" value={maxFiyat} onChange={(e) => setMaxFiyat(parseInt(e.target.value))} style={{ width: "100%", accentColor: "#534AB7" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#888", marginTop: "6px" }}>
              <span>50 EUR</span>
              <span style={{ color: "#534AB7", fontWeight: 600 }}>{maxFiyat} EUR</span>
            </div>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "14px", color: "#888" }}><strong style={{ color: "#12103a" }}>{filtreliOteller.length}</strong> otel bulundu</span>
            <select value={sirala} onChange={(e) => setSirala(e.target.value)} style={{ border: "1px solid #EEEDFE", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", outline: "none", background: "#fff", color: "#555" }}>
              <option value="puan">En Yuksek Puan</option>
              <option value="fiyat_artan">Fiyat: Dusukten Yuksege</option>
              <option value="fiyat_azalan">Fiyat: Yuksekten Dusuge</option>
              <option value="yorum">En Cok Yorum</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {filtreliOteller.map((o) => (
              <div key={o.id} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "14px", overflow: "hidden", display: "flex" }}>
                <div style={{ width: "180px", background: "linear-gradient(135deg, #EEEDFE, #CECBF6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: "16px" }}>
                  <div style={{ width: "56px", height: "56px", background: "#534AB7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "18px", marginBottom: "8px" }}>{o.kisaltma}</div>
                  <div style={{ fontSize: "14px", color: "#BA7517" }}>{"★".repeat(o.yildiz)}</div>
                </div>
                <div style={{ flex: 1, padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{o.ad}</h3>
                      <div style={{ fontSize: "12px", color: "#888", marginBottom: "6px" }}>{o.ilce}, {o.sehir}</div>
                      <div style={{ fontSize: "12px", color: "#534AB7" }}>Yakin: {o.klinikYakinligi.join(", ")}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "22px", fontWeight: 700, color: "#534AB7" }}>{o.fiyat} {o.para}</div>
                      <div style={{ fontSize: "11px", color: "#888" }}>gecelik</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "12px", color: "#BA7517", fontWeight: 600 }}>★ {o.puan} ({o.yorum} yorum)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {o.olanaklar.map((ol) => (
                        <span key={ol} style={{ fontSize: "11px", background: "#f9fafb", color: "#888", padding: "3px 8px", borderRadius: "20px", border: "1px solid #e5e7eb" }}>{ol}</span>
                      ))}
                    </div>
                    <a href="/teklif" style={{ background: "#534AB7", color: "#fff", border: "none", padding: "7px 14px", borderRadius: "8px", fontSize: "12px", textDecoration: "none" }}>Rezervasyon Yap</a>
                  </div>
                </div>
              </div>
            ))}
            {filtreliOteller.length === 0 && (
              <div style={{ textAlign: "center", padding: "64px", background: "#fff", borderRadius: "14px", border: "1px solid #EEEDFE" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏨</div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>Otel bulunamadi</div>
                <div style={{ fontSize: "14px", marginBottom: "16px", color: "#888" }}>Farkli filtreler deneyin</div>
                <button onClick={filtreleriSifirla} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Filtreleri Temizle</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

    </main>
  );
}
