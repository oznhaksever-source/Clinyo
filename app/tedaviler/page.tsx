"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const tedaviKategorileri = [
  {
    id: "diş",
    ad: "Diş Tedavisi",
    aciklama: "Implant, zirkonyum, diş beyazlatma ve daha fazlasi",
    klinikSayisi: 148,
    tedaviler: [
      { ad: "Implant", fiyat: "400-800", sure: "2-3 gün", popüler: true },
      { ad: "Zirkonyum Kaplama", fiyat: "150-300", sure: "3-5 gün", popüler: true },
      { ad: "Diş Beyazlatma", fiyat: "100-200", sure: "1 gün", popüler: false },
      { ad: "Kanal Tedavisi", fiyat: "80-150", sure: "1-2 gün", popüler: false },
      { ad: "Diş Eti Tedavisi", fiyat: "100-250", sure: "1-2 gün", popüler: false },
      { ad: "Lamine Veneer", fiyat: "200-400", sure: "3-5 gün", popüler: true },
      { ad: "Ortodonti (Braces)", fiyat: "800-1500", sure: "Uzun dönem", popüler: false },
      { ad: "Diş Cekimi", fiyat: "50-150", sure: "1 gün", popüler: false },
    ],
  },
  {
    id: "saç",
    ad: "Saç Ekimi",
    aciklama: "FUE, DHI ve sapphire yöntemleri ile kalıcı saç ekimi",
    klinikSayisi: 92,
    tedaviler: [
      { ad: "FUE Saç Ekimi", fiyat: "1000-2000", sure: "1 gün", popüler: true },
      { ad: "DHI Saç Ekimi", fiyat: "1200-2500", sure: "1 gün", popüler: true },
      { ad: "Sapphire FUE", fiyat: "1500-3000", sure: "1 gün", popüler: false },
      { ad: "Saç Mezoterapisi", fiyat: "200-500", sure: "1 gün", popüler: false },
      { ad: "PRP Tedavisi", fiyat: "150-300", sure: "1 gün", popüler: false },
      { ad: "Sakal Ekimi", fiyat: "800-1500", sure: "1 gün", popüler: false },
    ],
  },
  {
    id: "göz",
    ad: "Göz Ameliyati",
    aciklama: "Laser, Lasik, Lasek ve lens ameliyatlari",
    klinikSayisi: 64,
    tedaviler: [
      { ad: "Lasik", fiyat: "600-1200", sure: "1 gün", popüler: true },
      { ad: "Lasek", fiyat: "700-1400", sure: "1 gün", popüler: false },
      { ad: "Smile Pro", fiyat: "1200-2000", sure: "1 gün", popüler: true },
      { ad: "Göz Tansiyonu (Glokom)", fiyat: "500-1000", sure: "1-2 gün", popüler: false },
      { ad: "Katarakt Ameliyati", fiyat: "800-1500", sure: "1 gün", popüler: false },
      { ad: "Lens Implantasyonu", fiyat: "1000-2000", sure: "1-2 gün", popüler: false },
    ],
  },
  {
    id: "plastik",
    ad: "Plastik Cerrahi",
    aciklama: "Burun, yuz, vucut estetik ameliyatlari",
    klinikSayisi: 76,
    tedaviler: [
      { ad: "Burun Estetigi (Rinoplasti)", fiyat: "2000-4000", sure: "5-7 gün", popüler: true },
      { ad: "Meme Buyutme", fiyat: "2500-5000", sure: "5-7 gün", popüler: true },
      { ad: "Karin Germe", fiyat: "3000-5000", sure: "7-10 gün", popüler: false },
      { ad: "Yuz Germe", fiyat: "3000-6000", sure: "7-10 gün", popüler: false },
      { ad: "Lipo Emme", fiyat: "1500-3000", sure: "3-5 gün", popüler: false },
      { ad: "Göz Kapagi Estetiği", fiyat: "1000-2000", sure: "3-5 gün", popüler: false },
      { ad: "Kulak Estetiği", fiyat: "800-1500", sure: "3-5 gün", popüler: false },
    ],
  },
  {
    id: "genel",
    ad: "Genel Sağlık",
    aciklama: "Check-up, ortopedi, kardiyoloji ve daha fazlasi",
    klinikSayisi: 110,
    tedaviler: [
      { ad: "Kapsamli Check-Up", fiyat: "300-600", sure: "1 gün", popüler: true },
      { ad: "Ortopedi Ameliyati", fiyat: "2000-5000", sure: "5-10 gün", popüler: false },
      { ad: "Kardiyoloji", fiyat: "500-1500", sure: "2-3 gün", popüler: false },
      { ad: "Onkoloji Danismanligi", fiyat: "300-800", sure: "1-2 gün", popüler: false },
      { ad: "Noroloji", fiyat: "400-1000", sure: "1-3 gün", popüler: false },
      { ad: "Dermatoloji", fiyat: "200-500", sure: "1 gün", popüler: false },
    ],
  },
];

export default function Tedaviler() {
  const [aktifKategori, setAktifKategori] = useState("dis");
  const [aramaMetni, setAramaMetni] = useState("");

  const aktifKategoriData = tedaviKategorileri.find((k) => k.id === aktifKategori);

  const filtreliTedaviler = aktifKategoriData?.tedaviler.filter((t) =>
    t.ad.toLowerCase().includes(aramaMetni.toLowerCase())
  );

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>

      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "40px 32px" }}>
        <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>Tedaviler</h1>
        <p style={{ color: "#8b8fc8", fontSize: "15px", marginBottom: "24px" }}>Ihtiyacin olan tedaviyi bul, en iyi klinikleri karşılaştır</p>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "8px", display: "flex", gap: "8px", maxWidth: "500px" }}>
          <input type="text" placeholder="Tedavi ara..." value={aramaMetni} onChange={(e) => setAramaMetni(e.target.value)} style={{ flex: 1, border: "none", outline: "none", padding: "10px 14px", fontSize: "14px", background: "transparent" }} />
          <button style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>Ara</button>
        </div>
      </section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px", display: "grid", gridTemplateColumns: "240px 1fr", gap: "24px" }}>

        <div>
          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "12px" }}>
            {tedaviKategorileri.map((k) => (
              <div key={k.id} onClick={() => setAktifKategori(k.id)} style={{ padding: "12px", borderRadius: "8px", cursor: "pointer", marginBottom: "4px", background: aktifKategori === k.id ? "#EEEDFE" : "transparent" }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: aktifKategori === k.id ? "#534AB7" : "#12103a", marginBottom: "2px" }}>{k.ad}</div>
                <div style={{ fontSize: "11px", color: "#888" }}>{k.klinikSayisi} klinik</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {aktifKategoriData && (
            <>
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#12103a", marginBottom: "6px" }}>{aktifKategoriData.ad}</h2>
                <p style={{ fontSize: "14px", color: "#888" }}>{aktifKategoriData.aciklama}</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
                {filtreliTedaviler?.map((t) => (
                  <div key={t.ad} style={{ background: "#fff", border: t.popüler ? "2px solid #534AB7" : "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                    {t.popüler && (
                      <div style={{ fontSize: "10px", background: "#534AB7", color: "#fff", padding: "2px 10px", borderRadius: "20px", display: "inline-block", marginBottom: "10px" }}>popüler</div>
                    )}
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", marginBottom: "10px" }}>{t.ad}</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
                      <div>
                        <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>Fiyat Araligi</div>
                        <div style={{ fontSize: "14px", fontWeight: 700, color: "#534AB7" }}>{t.fiyat} EUR</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>Tedavi Suresi</div>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#12103a" }}>{t.sure}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <a href="/klinikler" style={{ flex: 1, textAlign: "center", background: "#EEEDFE", color: "#534AB7", padding: "8px", borderRadius: "8px", fontSize: "12px", textDecoration: "none", fontWeight: 600 }}>
                        Klinikleri Gor
                      </a>
                      <a href="/teklif" style={{ flex: 1, textAlign: "center", background: "#534AB7", color: "#fff", padding: "8px", borderRadius: "8px", fontSize: "12px", textDecoration: "none", fontWeight: 600 }}>
                        Teklif Al
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {filtreliTedaviler?.length === 0 && (
                <div style={{ textAlign: "center", padding: "48px", background: "#fff", borderRadius: "12px", border: "1px solid #EEEDFE" }}>
                  <div style={{ fontSize: "13px", color: "#888" }}>Tedavi bulunamadi</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />

    </main>
  );
}
