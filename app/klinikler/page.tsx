"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const tümKlinikler = [
  { id: "1", kisaltma: "SD", ad: "Smile Dental Clinic", sehir: "İstanbul", ilce: "Şişli", kategori: "Diş Tedavisi", puan: 4.9, yorum: 218, fiyat: 500, para: "EUR", doktor: 3, sure: "2-3 gün", diller: ["TR", "EN", "DE"], onaylandi: true },
  { id: "2", kisaltma: "HT", ad: "Hair Turkey Center", sehir: "İstanbul", ilce: "Beşiktaş", kategori: "Saç Ekimi", puan: 4.8, yorum: 341, fiyat: 1200, para: "EUR", doktor: 5, sure: "1 gün", diller: ["TR", "EN"], onaylandi: true },
  { id: "3", kisaltma: "VE", ad: "Vision Eye Center", sehir: "İstanbul", ilce: "Kadıköy", kategori: "Göz Ameliyati", puan: 4.7, yorum: 189, fiyat: 800, para: "EUR", doktor: 2, sure: "1 gün", diller: ["TR", "EN", "DE"], onaylandi: true },
  { id: "4", kisaltma: "EP", ad: "Estetik Plus", sehir: "İstanbul", ilce: "Nişantaşi", kategori: "Plastik Cerrahi", puan: 4.6, yorum: 124, fiyat: 2000, para: "EUR", doktor: 4, sure: "3-5 gün", diller: ["TR", "EN"], onaylandi: true },
  { id: "5", kisaltma: "AD", ad: "Ankara Dental", sehir: "Ankara", ilce: "Çankaya", kategori: "Diş Tedavisi", puan: 4.5, yorum: 98, fiyat: 400, para: "EUR", doktor: 2, sure: "2-3 gün", diller: ["TR", "EN"], onaylandi: true },
  { id: "6", kisaltma: "IH", ad: "İzmir Hair Clinic", sehir: "İzmir", ilce: "Karşıyaka", kategori: "Saç Ekimi", puan: 4.4, yorum: 76, fiyat: 1000, para: "EUR", doktor: 3, sure: "1 gün", diller: ["TR", "EN"], onaylandi: true },
  { id: "7", kisaltma: "BG", ad: "Bursa Göz Merkezi", sehir: "Bursa", ilce: "Nilüfer", kategori: "Göz Ameliyati", puan: 4.3, yorum: 54, fiyat: 750, para: "EUR", doktor: 2, sure: "1 gün", diller: ["TR"], onaylandi: true },
  { id: "8", kisaltma: "AS", ad: "Antalya Smile", sehir: "Antalya", ilce: "Muratpaşa", kategori: "Diş Tedavisi", puan: 4.7, yorum: 167, fiyat: 450, para: "EUR", doktor: 4, sure: "2-3 gün", diller: ["TR", "EN", "DE"], onaylandi: true },
];

const kategoriler = ["Diş Tedavisi", "Saç Ekimi", "Göz Ameliyati", "Plastik Cerrahi", "Genel Sağlık"];
const sehirler = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"];
const diller = ["TR", "EN", "DE"];

export default function Klinikler() {
  const [aramaMetni, setAramaMetni] = useState("");
  const [secilenKategoriler, setsecilenKategoriler] = useState<string[]>([]);
  const [secilenSehirler, setSecilenSehirler] = useState<string[]>([]);
  const [secilenDiller, setsecilenDiller] = useState<string[]>([]);
  const [minPuan, setMinPuan] = useState(0);
  const [maxFiyat, setMaxFiyat] = useState(5000);
  const [sirala, setSirala] = useState("puan");

  function toggleSeçim(liste: string[], setListe: (v: string[]) => void, deger: string) {
    if (liste.includes(deger)) {
      setListe(liste.filter((i) => i !== deger));
    } else {
      setListe([...liste, deger]);
    }
  }

  function filtreleriSifirla() {
    setsecilenKategoriler([]);
    setSecilenSehirler([]);
    setsecilenDiller([]);
    setMinPuan(0);
    setMaxFiyat(5000);
    setAramaMetni("");
  }

  const filtreliKlinikler = tümKlinikler
    .filter((k) => {
      const aramaUygun = k.ad.toLowerCase().includes(aramaMetni.toLowerCase()) || k.kategori.toLowerCase().includes(aramaMetni.toLowerCase()) || k.sehir.toLowerCase().includes(aramaMetni.toLowerCase());
      const kategoriUygun = secilenKategoriler.length === 0 || secilenKategoriler.includes(k.kategori);
      const sehirUygun = secilenSehirler.length === 0 || secilenSehirler.includes(k.sehir);
      const dilUygun = secilenDiller.length === 0 || secilenDiller.every((d) => k.diller.includes(d));
      const puanUygun = k.puan >= minPuan;
      const fiyatUygun = k.fiyat <= maxFiyat;
      return aramaUygun && kategoriUygun && sehirUygun && dilUygun && puanUygun && fiyatUygun;
    })
    .sort((a, b) => {
      if (sirala === "puan") return b.puan - a.puan;
      if (sirala === "fiyat_artan") return a.fiyat - b.fiyat;
      if (sirala === "fiyat_azalan") return b.fiyat - a.fiyat;
      if (sirala === "yorum") return b.yorum - a.yorum;
      return 0;
    });

  const aktifFiltreSayisi = secilenKategoriler.length + secilenSehirler.length + secilenDiller.length + (minPuan > 0 ? 1 : 0) + (maxFiyat < 5000 ? 1 : 0);

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>

      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "40px 32px" }}>
        <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>Klinikler</h1>
        <p style={{ color: "#8b8fc8", fontSize: "15px", marginBottom: "24px" }}>{tümKlinikler.length} onaylanmis klinik arasından seçim yapin</p>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "8px", display: "flex", gap: "8px", maxWidth: "600px" }}>
          <input type="text" placeholder="Klinik, tedavi veya sehir ara..." value={aramaMetni} onChange={(e) => setAramaMetni(e.target.value)} style={{ flex: 1, border: "none", outline: "none", padding: "10px 14px", fontSize: "14px", background: "transparent" }} />
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
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Tedavi Kategorisi</h3>
            {kategoriler.map((k) => (
              <label key={k} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", cursor: "pointer" }}>
                <input type="checkbox" checked={secilenKategoriler.includes(k)} onChange={() => toggleSeçim(secilenKategoriler, setsecilenKategoriler, k)} style={{ accentColor: "#534AB7", width: "15px", height: "15px" }} />
                <span style={{ fontSize: "13px", color: secilenKategoriler.includes(k) ? "#534AB7" : "#555", fontWeight: secilenKategoriler.includes(k) ? 600 : 400 }}>{k}</span>
              </label>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px", marginBottom: "12px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Sehir</h3>
            {sehirler.map((s) => (
              <label key={s} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", cursor: "pointer" }}>
                <input type="checkbox" checked={secilenSehirler.includes(s)} onChange={() => toggleSeçim(secilenSehirler, setSecilenSehirler, s)} style={{ accentColor: "#534AB7", width: "15px", height: "15px" }} />
                <span style={{ fontSize: "13px", color: secilenSehirler.includes(s) ? "#534AB7" : "#555", fontWeight: secilenSehirler.includes(s) ? 600 : 400 }}>{s}</span>
              </label>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px", marginBottom: "12px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Dil Destegi</h3>
            {diller.map((d) => (
              <label key={d} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", cursor: "pointer" }}>
                <input type="checkbox" checked={secilenDiller.includes(d)} onChange={() => toggleSeçim(secilenDiller, setsecilenDiller, d)} style={{ accentColor: "#534AB7", width: "15px", height: "15px" }} />
                <span style={{ fontSize: "13px", color: secilenDiller.includes(d) ? "#534AB7" : "#555", fontWeight: secilenDiller.includes(d) ? 600 : 400 }}>{d}</span>
              </label>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px", marginBottom: "12px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Minimum Puan</h3>
            {[0, 4.0, 4.5, 4.7].map((p) => (
              <label key={p} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", cursor: "pointer" }}>
                <input type="radio" checked={minPuan === p} onChange={() => setMinPuan(p)} style={{ accentColor: "#534AB7" }} />
                <span style={{ fontSize: "13px", color: minPuan === p ? "#534AB7" : "#555", fontWeight: minPuan === p ? 600 : 400 }}>
                  {p === 0 ? "Tumu" : `${p}+ yildiz`}
                </span>
              </label>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Max Fiyat (EUR)</h3>
            <input type="range" min="0" max="5000" step="100" value={maxFiyat} onChange={(e) => setMaxFiyat(parseInt(e.target.value))} style={{ width: "100%", accentColor: "#534AB7" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#888", marginTop: "6px" }}>
              <span>0 EUR</span>
              <span style={{ color: "#534AB7", fontWeight: 600 }}>{maxFiyat} EUR</span>
            </div>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "14px", color: "#888" }}><strong style={{ color: "#12103a" }}>{filtreliKlinikler.length}</strong> klinik bulundu</span>
            <select value={sirala} onChange={(e) => setSirala(e.target.value)} style={{ border: "1px solid #EEEDFE", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", outline: "none", background: "#fff", color: "#555" }}>
              <option value="puan">En Yuksek Puan</option>
              <option value="fiyat_artan">Fiyat: Dusukten Yuksege</option>
              <option value="fiyat_azalan">Fiyat: Yuksekten Dusuge</option>
              <option value="yorum">En Cok Yorum</option>
            </select>
          </div>

          {aktifFiltreSayisi > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
              {secilenKategoriler.map((k) => (
                <span key={k} onClick={() => toggleSeçim(secilenKategoriler, setsecilenKategoriler, k)} style={{ fontSize: "12px", background: "#EEEDFE", color: "#534AB7", padding: "4px 10px", borderRadius: "20px", cursor: "pointer" }}>
                  {k} ×
                </span>
              ))}
              {secilenSehirler.map((s) => (
                <span key={s} onClick={() => toggleSeçim(secilenSehirler, setSecilenSehirler, s)} style={{ fontSize: "12px", background: "#EEEDFE", color: "#534AB7", padding: "4px 10px", borderRadius: "20px", cursor: "pointer" }}>
                  {s} ×
                </span>
              ))}
              {secilenDiller.map((d) => (
                <span key={d} onClick={() => toggleSeçim(secilenDiller, setsecilenDiller, d)} style={{ fontSize: "12px", background: "#EEEDFE", color: "#534AB7", padding: "4px 10px", borderRadius: "20px", cursor: "pointer" }}>
                  {d} ×
                </span>
              ))}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {filtreliKlinikler.map((k) => (
              <div key={k.id} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "14px", overflow: "hidden", display: "flex" }}>
                <div style={{ width: "150px", background: "linear-gradient(135deg, #EEEDFE, #CECBF6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: "56px", height: "56px", background: "#534AB7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "18px" }}>{k.kisaltma}</div>
                </div>
                <div style={{ flex: 1, padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", margin: 0 }}>{k.ad}</h3>
                        {k.onaylandi && <span style={{ fontSize: "10px", background: "#f0fff4", color: "#0a7a3a", padding: "2px 8px", borderRadius: "20px", border: "1px solid #9f9" }}>✓ Dogrulanmis</span>}
                      </div>
                      <div style={{ fontSize: "12px", color: "#888" }}>{k.ilce}, {k.sehir}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "20px", fontWeight: 700, color: "#534AB7" }}>{k.fiyat} {k.para}</div>
                      <div style={{ fontSize: "11px", color: "#888" }}>baslangic fiyati</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "12px", color: "#BA7517", fontWeight: 600 }}>★ {k.puan} ({k.yorum} yorum)</span>
                    <span style={{ fontSize: "12px", color: "#888" }}>{k.doktor} doktor</span>
                    <span style={{ fontSize: "12px", color: "#888" }}>Sure: {k.sure}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "11px", background: "#EEEDFE", color: "#534AB7", padding: "3px 10px", borderRadius: "20px" }}>{k.kategori}</span>
                      {k.diller.map((d) => (
                        <span key={d} style={{ fontSize: "11px", background: "#f9fafb", color: "#888", padding: "3px 8px", borderRadius: "20px", border: "1px solid #e5e7eb" }}>{d}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <a href="/klinik" style={{ background: "#f9fafb", color: "#534AB7", border: "1px solid #EEEDFE", padding: "7px 14px", borderRadius: "8px", fontSize: "12px", textDecoration: "none" }}>Incele</a>
                      <a href="/teklif" style={{ background: "#534AB7", color: "#fff", border: "none", padding: "7px 14px", borderRadius: "8px", fontSize: "12px", textDecoration: "none" }}>Teklif Al</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filtreliKlinikler.length === 0 && (
              <div style={{ textAlign: "center", padding: "64px", color: "#888", background: "#fff", borderRadius: "14px", border: "1px solid #EEEDFE" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>Klinik bulunamadi</div>
                <div style={{ fontSize: "14px", marginBottom: "16px" }}>Farkli filtreler deneyin</div>
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
