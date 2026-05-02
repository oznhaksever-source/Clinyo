"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Oteller() {
  const [oteller, setOteller] = useState<any[]>([]);
  const [filtrelenmis, setFiltrelenmis] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [arama, setArama] = useState("");
  const [secilenSehir, setSecilenSehir] = useState("");
  const [mobil, setMobil] = useState(false);
  const { dil } = useDil();
  const supabase = createClient();

  const metinler = {
    tr: { baslik: "Oteller", altBaslik: "Tedaviniz süresince konaklamak için en iyi otelleri keşfedin", aramaPlaceholder: "Otel adı veya şehir ara...", tumSehirler: "Tüm Şehirler", incele: "İncele →", yukleniyor: "Yükleniyor...", bulunamadi: "Otel bulunamadı", sonuc: "otel bulundu", geceden: "gecelik" },
    en: { baslik: "Hotels", altBaslik: "Discover the best hotels to stay during your treatment", aramaPlaceholder: "Search hotel name or city...", tumSehirler: "All Cities", incele: "View →", yukleniyor: "Loading...", bulunamadi: "No hotels found", sonuc: "hotels found", geceden: "per night" },
    de: { baslik: "Hotels", altBaslik: "Entdecken Sie die besten Hotels für Ihren Aufenthalt", aramaPlaceholder: "Hotelname oder Stadt suchen...", tumSehirler: "Alle Städte", incele: "Ansehen →", yukleniyor: "Wird geladen...", bulunamadi: "Keine Hotels gefunden", sonuc: "Hotels gefunden", geceden: "pro Nacht" },
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
      const { data } = await supabase.from("profiles").select("*, otel_odalar(fiyat, para_birimi, aktif)").eq("hesap_turu", "otel").eq("onaylandi", true).eq("askida", false);
      setOteller(data || []);
      setFiltrelenmis(data || []);
      setYukleniyor(false);
    }
    veriYukle();
  }, []);

  useEffect(() => {
    let sonuc = oteller;
    if (arama) sonuc = sonuc.filter(o => `${o.ad} ${o.soyad} ${o.konum_adres}`.toLowerCase().includes(arama.toLowerCase()));
    if (secilenSehir) sonuc = sonuc.filter(o => o.konum_adres?.toLowerCase().includes(secilenSehir.toLowerCase()));
    setFiltrelenmis(sonuc);
  }, [arama, secilenSehir, oteller]);

  function minFiyat(otel: any) {
    const aktif = otel.otel_odalar?.filter((r: any) => r.aktif);
    if (!aktif || aktif.length === 0) return null;
    return aktif.reduce((min: any, r: any) => r.fiyat < min.fiyat ? r : min);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: mobil ? "32px 16px" : "40px 32px" }}>
        <h1 style={{ color: "#fff", fontSize: mobil ? "26px" : "32px", fontWeight: 800, marginBottom: "8px" }}>{m.baslik}</h1>
        <p style={{ color: "#8b8fc8", fontSize: "14px", marginBottom: "20px" }}>{m.altBaslik}</p>
        <div style={{ display: "flex", gap: "10px", flexDirection: mobil ? "column" : "row" }}>
          <input type="text" placeholder={m.aramaPlaceholder} value={arama} onChange={e => setArama(e.target.value)} style={{ flex: 1, border: "none", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", outline: "none" }} />
          <select value={secilenSehir} onChange={e => setSecilenSehir(e.target.value)} style={{ border: "none", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", outline: "none", background: "#fff", minWidth: mobil ? "100%" : "160px" }}>
            <option value="">{m.tumSehirler}</option>
            {sehirler.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ marginTop: "12px", fontSize: "13px", color: "#8b8fc8" }}>{filtrelenmis.length} {m.sonuc}</div>
      </section>

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: mobil ? "24px 16px" : "40px 32px" }}>
        {yukleniyor ? (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>{m.yukleniyor}</div>
        ) : filtrelenmis.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>{m.bulunamadi}</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: mobil ? "1fr" : "repeat(3, 1fr)", gap: mobil ? "16px" : "24px" }}>
            {filtrelenmis.map(o => {
              const enUcuz = minFiyat(o);
              return (
                <div key={o.id} style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid #eeecff" }}>
                  <div style={{ height: mobil ? "160px" : "180px", overflow: "hidden" }}>
                    <img src={o.kapak_fotograf || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop"} alt={o.ad} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f0d2e", marginBottom: "6px" }}>{o.ad} {o.soyad}</h3>
                    {o.konum_adres && <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }}>📍 {o.konum_adres}</p>}
                    {enUcuz && (
                      <div style={{ fontSize: "15px", fontWeight: 700, color: "#534AB7", marginBottom: "12px" }}>
                        {enUcuz.fiyat} {enUcuz.para_birimi} <span style={{ fontSize: "11px", fontWeight: 400, color: "#888" }}>/ {m.geceden}</span>
                      </div>
                    )}
                    <a href={`/otel/${o.id}`} style={{ display: "inline-flex", alignItems: "center", background: "#534AB7", color: "#fff", padding: "8px 18px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>
                      {m.incele}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
