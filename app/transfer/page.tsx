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
  const { dil } = useDil();
  const supabase = createClient();

  const metinler = {
    tr: { baslik: "Transfer Hizmetleri", altBaslik: "Havalimanından kliniğe, otelden tedavi merkezine güvenli transfer", aramaPlaceholder: "Firma adı ara...", incele: "İncele", arac: "araç", yukleniyor: "Yükleniyor...", bulunamadi: "Transfer firması bulunamadı" },
    en: { baslik: "Transfer Services", altBaslik: "Safe transfer from airport to clinic, from hotel to treatment center", aramaPlaceholder: "Search company name...", incele: "View", arac: "vehicle", yukleniyor: "Loading...", bulunamadi: "No transfer companies found" },
    de: { baslik: "Transferdienste", altBaslik: "Sicherer Transfer vom Flughafen zur Klinik, vom Hotel zum Behandlungszentrum", aramaPlaceholder: "Firmenname suchen...", incele: "Ansehen", arac: "Fahrzeug", yukleniyor: "Wird geladen...", bulunamadi: "Keine Transferunternehmen gefunden" },
  };

  const m = metinler[dil];

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
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      <Navbar />
      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "32px" }}>
        <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>{m.baslik}</h1>
        <p style={{ color: "#8b8fc8", fontSize: "14px", marginBottom: "20px" }}>{m.altBaslik}</p>
        <input type="text" placeholder={m.aramaPlaceholder} value={arama} onChange={(e) => setArama(e.target.value)} style={{ maxWidth: "400px", width: "100%", border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", outline: "none" }} />
      </section>

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px" }}>
        {yukleniyor ? (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>{m.yukleniyor}</div>
        ) : filtrelenmis.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>{m.bulunamadi}</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {filtrelenmis.map((t) => {
              const enUcuz = minFiyat(t);
              const aracSayisi = t.transfer_araclar?.filter((a: any) => a.aktif).length || 0;
              return (
                <div key={t.id} style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid #EEEDFE" }}>
                  {t.kapak_fotograf ? (
                    <img src={t.kapak_fotograf} alt={t.ad} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "160px", background: "linear-gradient(135deg, #EEEDFE, #CECBF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>🚗</div>
                  )}
                  <div style={{ padding: "16px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "6px" }}>{t.ad} {t.soyad}</h3>
                    {t.konum_adres && <p style={{ fontSize: "12px", color: "#888", marginBottom: "6px" }}>📍 {t.konum_adres}</p>}
                    <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>🚗 {aracSayisi} {m.arac}</p>
                    {enUcuz && <div style={{ fontSize: "14px", fontWeight: 700, color: "#534AB7", marginBottom: "12px" }}>{enUcuz.fiyat} {enUcuz.para_birimi}</div>}
                    <a href={`/transfer/${t.id}`} style={{ display: "block", background: "#534AB7", color: "#fff", padding: "8px", borderRadius: "8px", fontSize: "12px", textDecoration: "none", textAlign: "center", fontWeight: 600 }}>{m.incele}</a>
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
