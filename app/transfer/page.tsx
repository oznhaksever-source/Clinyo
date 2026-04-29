"use client";
import Navbar from "../components/Navbar";
import { useState } from "react";

const transferler = [
  { id: "1", kisaltma: "VT", ad: "VIP Transfer Istanbul", sehir: "İstanbul", puan: 4.9, yorum: 324, fiyat: 35, para: "EUR", araclar: ["Sedan", "Van", "VIP Minibüs"], diller: ["TR", "EN", "DE"], sure: "30-60 dk", musaitlik: "7/24", ozellikler: ["Karşılama Tabelası", "Uçuş Takibi", "Ücretsiz Bekleme", "WiFi"] },
  { id: "2", kisaltma: "AT", ad: "Ankara Airport Transfer", sehir: "Ankara", puan: 4.7, yorum: 189, fiyat: 25, para: "EUR", araclar: ["Sedan", "Van"], diller: ["TR", "EN"], sure: "20-40 dk", musaitlik: "7/24", ozellikler: ["Karşılama Tabelası", "Uçuş Takibi", "Ücretsiz Bekleme"] },
  { id: "3", kisaltma: "LT", ad: "Luxury Transfer Co.", sehir: "İstanbul", puan: 4.8, yorum: 256, fiyat: 55, para: "EUR", araclar: ["VIP Sedan", "VIP Van", "Limuzin"], diller: ["TR", "EN", "DE"], sure: "30-60 dk", musaitlik: "7/24", ozellikler: ["Karşılama Tabelası", "Uçuş Takibi", "Ücretsiz Bekleme", "WiFi", "İçecek İkramı"] },
  { id: "4", kisaltma: "IT", ad: "İzmir Transfer", sehir: "İzmir", puan: 4.6, yorum: 134, fiyat: 20, para: "EUR", araclar: ["Sedan", "Van"], diller: ["TR", "EN"], sure: "20-35 dk", musaitlik: "7/24", ozellikler: ["Karşılama Tabelası", "Ücretsiz Bekleme"] },
  { id: "5", kisaltma: "BT", ad: "Bursa Transfer", sehir: "Bursa", puan: 4.5, yorum: 98, fiyat: 22, para: "EUR", araclar: ["Sedan", "Van"], diller: ["TR", "EN"], sure: "25-40 dk", musaitlik: "7/24", ozellikler: ["Karşılama Tabelası", "Uçuş Takibi"] },
];

const sehirler = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"];
const aracTipleri = ["Sedan", "Van", "VIP Sedan", "VIP Van", "Limuzin", "VIP Minibüs"];

export default function Transfer() {
  const [aramaMetni, setAramaMetni] = useState("");
  const [secilenSehirler, setSecilenSehirler] = useState<string[]>([]);
  const [secilenAraclar, setSecilenAraclar] = useState<string[]>([]);
  const [sirala, setSirala] = useState("puan");

  function toggleSehir(sehir: string) {
    setSecilenSehirler((prev) => prev.includes(sehir) ? prev.filter((s) => s !== sehir) : [...prev, sehir]);
  }

  function toggleArac(arac: string) {
    setSecilenAraclar((prev) => prev.includes(arac) ? prev.filter((a) => a !== arac) : [...prev, arac]);
  }

  function filtreleriSifirla() {
    setSecilenSehirler([]);
    setSecilenAraclar([]);
    setAramaMetni("");
  }

  const filtreliTransferler = transferler
    .filter((t) => {
      const aramaUygun = t.ad.toLowerCase().includes(aramaMetni.toLowerCase()) || t.sehir.toLowerCase().includes(aramaMetni.toLowerCase());
      const sehirUygun = secilenSehirler.length === 0 || secilenSehirler.includes(t.sehir);
      const aracUygun = secilenAraclar.length === 0 || secilenAraclar.some((a) => t.araclar.includes(a));
      return aramaUygun && sehirUygun && aracUygun;
    })
    .sort((a, b) => {
      if (sirala === "puan") return b.puan - a.puan;
      if (sirala === "fiyat_artan") return a.fiyat - b.fiyat;
      if (sirala === "fiyat_azalan") return b.fiyat - a.fiyat;
      return 0;
    });

  const aktifFiltreSayisi = secilenSehirler.length + secilenAraclar.length;

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>

      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "40px 32px" }}>
        <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>Transfer Hizmetleri</h1>
        <p style={{ color: "#8b8fc8", fontSize: "15px", marginBottom: "24px" }}>Havalimanından kliniğe, kliniğe otele — güvenli ve konforlu transfer</p>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "8px", display: "flex", gap: "8px", maxWidth: "600px" }}>
          <input type="text" placeholder="Şehir veya transfer firması ara..." value={aramaMetni} onChange={(e) => setAramaMetni(e.target.value)} style={{ flex: 1, border: "none", outline: "none", padding: "10px 14px", fontSize: "14px", background: "transparent" }} />
          <button style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>Ara</button>
        </div>
      </section>

      <section style={{ background: "#fff", borderBottom: "1px solid #EEEDFE", padding: "20px 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {[
            { ikon: "✈️", baslik: "Havalimanı Karşılama", aciklama: "Uçuşunuzu takip ediyoruz" },
            { ikon: "🏥", baslik: "Klinik Transferi", aciklama: "Kliniğinize güvenle ulaşın" },
            { ikon: "🏨", baslik: "Otel Transferi", aciklama: "Otelinize konforla gidin" },
            { ikon: "🚗", baslik: "Şehir İçi Transfer", aciklama: "İstediğiniz yere ulaşın" },
          ].map((item) => (
            <div key={item.baslik} style={{ textAlign: "center", padding: "16px" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{item.ikon}</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{item.baslik}</div>
              <div style={{ fontSize: "12px", color: "#888" }}>{item.aciklama}</div>
            </div>
          ))}
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
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Şehir</h3>
            {sehirler.map((s) => (
              <label key={s} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", cursor: "pointer" }}>
                <input type="checkbox" checked={secilenSehirler.includes(s)} onChange={() => toggleSehir(s)} style={{ accentColor: "#534AB7", width: "15px", height: "15px" }} />
                <span style={{ fontSize: "13px", color: secilenSehirler.includes(s) ? "#534AB7" : "#555", fontWeight: secilenSehirler.includes(s) ? 600 : 400 }}>{s}</span>
              </label>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Araç Tipi</h3>
            {aracTipleri.map((a) => (
              <label key={a} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", cursor: "pointer" }}>
                <input type="checkbox" checked={secilenAraclar.includes(a)} onChange={() => toggleArac(a)} style={{ accentColor: "#534AB7", width: "15px", height: "15px" }} />
                <span style={{ fontSize: "13px", color: secilenAraclar.includes(a) ? "#534AB7" : "#555", fontWeight: secilenAraclar.includes(a) ? 600 : 400 }}>{a}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "14px", color: "#888" }}><strong style={{ color: "#12103a" }}>{filtreliTransferler.length}</strong> transfer firması bulundu</span>
            <select value={sirala} onChange={(e) => setSirala(e.target.value)} style={{ border: "1px solid #EEEDFE", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", outline: "none", background: "#fff", color: "#555" }}>
              <option value="puan">En Yüksek Puan</option>
              <option value="fiyat_artan">Fiyat: Düşükten Yükseğe</option>
              <option value="fiyat_azalan">Fiyat: Yüksekten Düşüğe</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {filtreliTransferler.map((t) => (
              <div key={t.id} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "14px", overflow: "hidden", display: "flex" }}>
                <div style={{ width: "150px", background: "linear-gradient(135deg, #EEEDFE, #CECBF6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: "16px" }}>
                  <div style={{ width: "56px", height: "56px", background: "#534AB7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "18px", marginBottom: "8px" }}>{t.kisaltma}</div>
                  <div style={{ fontSize: "11px", color: "#534AB7", fontWeight: 600 }}>{t.musaitlik}</div>
                </div>
                <div style={{ flex: 1, padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{t.ad}</h3>
                      <div style={{ fontSize: "12px", color: "#888", marginBottom: "6px" }}>{t.sehir} • Süre: {t.sure}</div>
                      <div style={{ fontSize: "12px", color: "#BA7517", fontWeight: 600 }}>★ {t.puan} ({t.yorum} yorum)</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "22px", fontWeight: 700, color: "#534AB7" }}>{t.fiyat} {t.para}</div>
                      <div style={{ fontSize: "11px", color: "#888" }}>tek yön</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                    {t.araclar.map((a) => (
                      <span key={a} style={{ fontSize: "11px", background: "#EEEDFE", color: "#534AB7", padding: "3px 10px", borderRadius: "20px" }}>{a}</span>
                    ))}
                    {t.diller.map((d) => (
                      <span key={d} style={{ fontSize: "11px", background: "#f9fafb", color: "#888", padding: "3px 8px", borderRadius: "20px", border: "1px solid #e5e7eb" }}>{d}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {t.ozellikler.map((o) => (
                        <span key={o} style={{ fontSize: "11px", color: "#0a7a3a", display: "flex", alignItems: "center", gap: "3px" }}>✓ {o}</span>
                      ))}
                    </div>
                    <a href="/teklif" style={{ background: "#534AB7", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "12px", textDecoration: "none", whiteSpace: "nowrap" }}>Rezervasyon Yap</a>
                  </div>
                </div>
              </div>
            ))}
            {filtreliTransferler.length === 0 && (
              <div style={{ textAlign: "center", padding: "64px", background: "#fff", borderRadius: "14px", border: "1px solid #EEEDFE" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚗</div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>Transfer bulunamadı</div>
                <div style={{ fontSize: "14px", marginBottom: "16px", color: "#888" }}>Farklı filtreler deneyin</div>
                <button onClick={filtreleriSifirla} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Filtreleri Temizle</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer style={{ background: "#12103a", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px" }}>
        <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>
          med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Gizlilik", "KVKK", "İletişim", "Blog"].map((l) => (
            <a key={l} href="#" style={{ color: "#6b6fa8", fontSize: "12px", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <div style={{ fontSize: "12px", color: "#6b6fa8" }}>2024 Medoqa. Tüm hakları saklıdır.</div>
      </footer>

    </main>
  );
}
