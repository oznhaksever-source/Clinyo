"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Klinikler() {
  const [klinikler, setKlinikler] = useState<any[]>([]);
  const [filtrelenmis, setFiltrelenmis] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [arama, setArama] = useState("");
  const [secilenSehir, setSecilenSehir] = useState("");
  const [mobil, setMobil] = useState(false);
  const { dil } = useDil();
  const supabase = createClient();

  const metinler = {
    tr: { baslik: "Klinikler", altBaslik: "Onaylı kliniklerimizi keşfedin", aramaPlaceholder: "Klinik adı veya şehir ara...", tumSehirler: "Tüm Şehirler", incele: "İncele →", yukleniyor: "Yükleniyor...", bulunamadi: "Klinik bulunamadı", onayBadge: "Onaylı", sonuc: "klinik bulundu" },
    en: { baslik: "Clinics", altBaslik: "Discover our verified clinics", aramaPlaceholder: "Search clinic name or city...", tumSehirler: "All Cities", incele: "View →", yukleniyor: "Loading...", bulunamadi: "No clinics found", onayBadge: "Verified", sonuc: "clinics found" },
    de: { baslik: "Kliniken", altBaslik: "Entdecken Sie unsere verifizierten Kliniken", aramaPlaceholder: "Klinikname oder Stadt suchen...", tumSehirler: "Alle Städte", incele: "Ansehen →", yukleniyor: "Wird geladen...", bulunamadi: "Keine Kliniken gefunden", onayBadge: "Verifiziert", sonuc: "Kliniken gefunden" },
  };

  const m = metinler[dil];
  const sehirler = ["İstanbul", "Ankara", "İzmir", "Antalya", "Bursa"];

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  useEffect(() => {
    async function veriYukle() {
      const { data } = await supabase.from("profiles").select("*, klinik_hizmetler(kategori)").eq("hesap_turu", "klinik").eq("onaylandi", true).eq("askida", false);
      setKlinikler(data || []);
      setFiltrelenmis(data || []);
      setYukleniyor(false);
    }
    veriYukle();
  }, []);

  useEffect(() => {
    let sonuc = klinikler;
    if (arama) sonuc = sonuc.filter(k => `${k.ad} ${k.soyad} ${k.konum_adres}`.toLowerCase().includes(arama.toLowerCase()));
    if (secilenSehir) sonuc = sonuc.filter(k => k.konum_adres?.toLowerCase().includes(secilenSehir.toLowerCase()));
    setFiltrelenmis(sonuc);
  }, [arama, secilenSehir, klinikler]);

  return (
    <main style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />

      {/* Hero + Filtreler */}
      <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: mobil ? "32px 16px" : "40px 32px" }}>
        <h1 style={{ color: "#fff", fontSize: mobil ? "26px" : "32px", fontWeight: 800, marginBottom: "8px" }}>{m.baslik}</h1>
        <p style={{ color: "#8b8fc8", fontSize: "14px", marginBottom: "20px" }}>{m.altBaslik}</p>
        <div style={{ display: "flex", gap: "10px", flexDirection: mobil ? "column" : "row", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder={m.aramaPlaceholder}
            value={arama}
            onChange={e => setArama(e.target.value)}
            style={{ flex: 1, minWidth: mobil ? "100%" : "200px", border: "none", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", outline: "none" }}
          />
          <select
            value={secilenSehir}
            onChange={e => setSecilenSehir(e.target.value)}
            style={{ border: "none", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", outline: "none", background: "#fff", minWidth: mobil ? "100%" : "160px" }}
          >
            <option value="">{m.tumSehirler}</option>
            {sehirler.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ marginTop: "12px", fontSize: "13px", color: "#8b8fc8" }}>
          {filtrelenmis.length} {m.sonuc}
        </div>
      </section>

      {/* Liste */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: mobil ? "24px 16px" : "40px 32px" }}>
        {yukleniyor ? (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>{m.yukleniyor}</div>
        ) : filtrelenmis.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>{m.bulunamadi}</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: mobil ? "1fr" : "repeat(3, 1fr)", gap: mobil ? "16px" : "24px" }}>
            {filtrelenmis.map(k => (
              <div key={k.id} style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid #eeecff" }}>
                <div style={{ position: "relative", height: mobil ? "160px" : "180px", overflow: "hidden" }}>
                  <img
                    src={k.kapak_fotograf || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop"}
                    alt={k.ad}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", top: "12px", left: "12px", background: "#059669", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px" }}>
                    ✓ {m.onayBadge}
                  </div>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f0d2e", marginBottom: "6px" }}>{k.ad} {k.soyad}</h3>
                  {k.konum_adres && <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "10px" }}>📍 {k.konum_adres}</p>}
                  {k.tanitim_yazisi && <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "14px", lineHeight: 1.5 }}>{k.tanitim_yazisi.slice(0, 80)}...</p>}
                  <a href={`/klinik/${k.id}`} style={{ display: "inline-flex", alignItems: "center", background: "#534AB7", color: "#fff", padding: "8px 18px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>
                    {m.incele}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
