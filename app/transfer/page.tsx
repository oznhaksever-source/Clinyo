"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Transfer() {
  const [transferler, setTransferler] = useState<any[]>([]);
  const [filtrelenmis, setFiltrelenmis] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [arama, setArama] = useState("");
  const [mobil, setMobil] = useState(false);
  const { dil } = useDil();
  const supabase = createClient();

  const metinler = {
    tr: { baslik: "Transfer Hizmetleri", altBaslik: "Havalimanından kliniğe, otelden tedavi merkezine güvenli transfer", aramaPlaceholder: "Firma adı ara...", incele: "İncele →", arac: "araç", yukleniyor: "Yükleniyor...", bulunamadi: "Transfer firması bulunamadı", sonuc: "firma bulundu" },
    en: { baslik: "Transfer Services", altBaslik: "Safe transfer from airport to clinic, from hotel to treatment center", aramaPlaceholder: "Search company...", incele: "View →", arac: "vehicle", yukleniyor: "Loading...", bulunamadi: "No transfer companies found", sonuc: "companies found" },
    de: { baslik: "Transferdienste", altBaslik: "Sicherer Transfer vom Flughafen zur Klinik", aramaPlaceholder: "Firmenname suchen...", incele: "Ansehen →", arac: "Fahrzeug", yukleniyor: "Wird geladen...", bulunamadi: "Keine Transferunternehmen gefunden", sonuc: "Unternehmen gefunden" },
  };

  const m = metinler[dil];

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  useEffect(() => {
    async function veriYukle() {
      const { data } = await supabase.from("profiles").select("*, transfer_araclar(arac_tipi, fiyat, para_birimi, aktif)").eq("hesap_turu", "transfer").eq("onaylandi", true).eq("askida", false);
      setTransferler(data || []);
      setFiltrelenmis(data || []);
      setYukleniyor(false);
    }
    veriYukle();
  }, []);

  useEffect(() => {
    if (arama) setFiltrelenmis(transferler.filter(t => `${t.ad} ${t.soyad} ${t.konum_adres}`.toLowerCase().includes(arama.toLowerCase())));
    else setFiltrelenmis(transferler);
  }, [arama, transferler]);

  function minFiyat(t: any) {
    const aktif = t.transfer_araclar?.filter((a: any) => a.aktif);
    if (!aktif || aktif.length === 0) return null;
    return aktif.reduce((min: any, a: any) => a.fiyat < min.fiyat ? a : min);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />
      <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: mobil ? "32px 16px" : "40px 32px" }}>
        <h1 style={{ color: "#fff", fontSize: mobil ? "26px" : "32px", fontWeight: 800, marginBottom: "8px" }}>{m.baslik}</h1>
        <p style={{ color: "#8b8fc8", fontSize: "14px", marginBottom: "20px" }}>{m.altBaslik}</p>
        <input type="text" placeholder={m.aramaPlaceholder} value={arama} onChange={e => setArama(e.target.value)} style={{ maxWidth: "400px", width: "100%", border: "none", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", outline: "none" }} />
        <div style={{ marginTop: "12px", fontSize: "13px", color: "#8b8fc8" }}>{filtrelenmis.length} {m.sonuc}</div>
      </section>

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: mobil ? "24px 16px" : "40px 32px" }}>
        {yukleniyor ? (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>{m.yukleniyor}</div>
        ) : filtrelenmis.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>{m.bulunamadi}</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: mobil ? "1fr" : "repeat(3, 1fr)", gap: mobil ? "16px" : "24px" }}>
            {filtrelenmis.map(t => {
              const enUcuz = minFiyat(t);
              const aracSayisi = t.transfer_araclar?.filter((a: any) => a.aktif).length || 0;
              return (
                <div key={t.id} style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid #eeecff" }}>
                  <div style={{ height: mobil ? "150px" : "170px", overflow: "hidden" }}>
                    <img src={t.kapak_fotograf || "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop"} alt={t.ad} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f0d2e", marginBottom: "6px" }}>{t.ad} {t.soyad}</h3>
                    {t.konum_adres && <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "6px" }}>📍 {t.konum_adres}</p>}
                    <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }}>🚗 {aracSayisi} {m.arac}</p>
                    {enUcuz && <div style={{ fontSize: "15px", fontWeight: 700, color: "#534AB7", marginBottom: "12px" }}>{enUcuz.fiyat} {enUcuz.para_birimi}</div>}
                    <a href={`/transfer/${t.id}`} style={{ display: "inline-flex", alignItems: "center", background: "#534AB7", color: "#fff", padding: "8px 18px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>
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
