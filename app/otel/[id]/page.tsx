"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import { useParams } from "next/navigation";
import { useDil } from "../../locales/context";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function OtelProfil() {
  const { id } = useParams();
  const [otel, setOtel] = useState<any>(null);
  const [odalar, setOdalar] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const { dil } = useDil();

  const supabase = createClient();

  const metinler = {
    tr: { hakkimizda: "Hakkımızda", odalar: "Odalar", iletisim: "İletişim", rezervasyon: "Rezervasyon Talebi", googleMaps: "Google Maps'te Gör", website: "Website", sosyalMedya: "Sosyal Medya", haritaGor: "Haritada Gör", geceden: "gece'den", kisi: "kişi", bulunamadi: "Otel bulunamadı", yukleniyor: "Yükleniyor..." },
    en: { hakkimizda: "About Us", odalar: "Rooms", iletisim: "Contact", rezervasyon: "Reservation Request", googleMaps: "View on Google Maps", website: "Website", sosyalMedya: "Social Media", haritaGor: "View on Map", geceden: "per night from", kisi: "persons", bulunamadi: "Hotel not found", yukleniyor: "Loading..." },
    de: { hakkimizda: "Über uns", odalar: "Zimmer", iletisim: "Kontakt", rezervasyon: "Reservierungsanfrage", googleMaps: "Auf Google Maps ansehen", website: "Website", sosyalMedya: "Soziale Medien", haritaGor: "Auf Karte anzeigen", geceden: "ab pro Nacht", kisi: "Personen", bulunamadi: "Hotel nicht gefunden", yukleniyor: "Wird geladen..." },
  };

  const m = metinler[dil];

  useEffect(() => {
    async function veriYukle() {
      const { data: otelData } = await supabase.from("profiles").select("*").eq("id", id).single();
      setOtel(otelData);
      const { data: odaData } = await supabase.from("otel_odalar").select("*").eq("otel_id", id).eq("aktif", true).order("fiyat");
      setOdalar(odaData || []);
      setYukleniyor(false);
    }
    if (id) veriYukle();
  }, [id]);

  if (yukleniyor) return (
    <main style={{ minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Navbar />
      <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>{m.yukleniyor}</div>
    </main>
  );

  if (!otel) return (
    <main style={{ minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Navbar />
      <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>{m.bulunamadi}</div>
    </main>
  );

  const embedUrl = otel.konum_adres ? `https://maps.google.com/maps?q=${encodeURIComponent(otel.konum_adres)}&output=embed&z=15` : null;

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      <Navbar />

      {/* Kapak */}
      <div style={{ position: "relative", height: "300px", background: "linear-gradient(135deg, #12103a, #1e1b4b)", overflow: "hidden" }}>
        {otel.kapak_fotograf && (
          <img src={otel.kapak_fotograf} alt={otel.ad} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
        )}
        <div style={{ position: "absolute", bottom: "32px", left: "32px" }}>
          <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>{otel.ad} {otel.soyad}</h1>
          {otel.konum_adres && <p style={{ color: "#aab4c8", fontSize: "14px" }}>📍 {otel.konum_adres}</p>}
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>

          {/* Sol */}
          <div>
            {otel.tanitim_yazisi && (
              <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#12103a", marginBottom: "12px" }}>{m.hakkimizda}</h2>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.7" }}>{otel.tanitim_yazisi}</p>
              </div>
            )}

            <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>{m.odalar} ({odalar.length})</h2>
              {odalar.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px", color: "#888", fontSize: "13px" }}>-</div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                  {odalar.map((o) => (
                    <div key={o.id} style={{ border: "1px solid #EEEDFE", borderRadius: "10px", overflow: "hidden" }}>
                      {o.fotograf_url ? (
                        <img src={o.fotograf_url} alt={o.oda_adi} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "140px", background: "linear-gradient(135deg, #EEEDFE, #CECBF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px" }}>🛏️</div>
                      )}
                      <div style={{ padding: "14px" }}>
                        <div style={{ fontSize: "14px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{o.oda_adi}</div>
                        <div style={{ fontSize: "12px", color: "#888", marginBottom: "6px" }}>👥 {o.kapasite} {m.kisi}</div>
                        {o.aciklama && <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>{o.aciklama}</div>}
                        <div style={{ fontSize: "16px", fontWeight: 700, color: "#534AB7" }}>{o.fiyat} {o.para_birimi}<span style={{ fontSize: "11px", fontWeight: 400, color: "#888" }}>/{m.geceden}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Google Maps Embed */}
            {embedUrl && (
              <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #EEEDFE", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", margin: 0 }}>📍 {m.haritaGor}</h2>
                  {otel.google_maps_url && (
                    <a href={otel.google_maps_url} target="_blank" rel="noreferrer" style={{ fontSize: "13px", color: "#534AB7", textDecoration: "none" }}>{m.googleMaps} →</a>
                  )}
                </div>
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="300"
                  style={{ border: "none", display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

          {/* Sağ */}
          <div>
            <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px", marginBottom: "16px", position: "sticky", top: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>{m.iletisim}</h3>

              {otel.telefon && (
                <a href={`tel:${otel.telefon}`} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f5f5f5", textDecoration: "none", color: "#12103a" }}>
                  <span style={{ fontSize: "18px" }}>📞</span>
                  <span style={{ fontSize: "13px" }}>{otel.telefon}</span>
                </a>
              )}

              {otel.website && (
                <a href={otel.website} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f5f5f5", textDecoration: "none", color: "#534AB7" }}>
                  <span style={{ fontSize: "18px" }}>🌐</span>
                  <span style={{ fontSize: "13px" }}>{m.website}</span>
                </a>
              )}

              {otel.instagram && (
                <a href={`https://instagram.com/${otel.instagram.replace("@", "")}`} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f5f5f5", textDecoration: "none", color: "#E1306C" }}>
                  <span style={{ fontSize: "18px" }}>📸</span>
                  <span style={{ fontSize: "13px" }}>{otel.instagram}</span>
                </a>
              )}

              {otel.google_maps_url && (
                <a href={otel.google_maps_url} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f5f5f5", textDecoration: "none", color: "#185FA5" }}>
                  <span style={{ fontSize: "18px" }}>📍</span>
                  <span style={{ fontSize: "13px" }}>{m.googleMaps}</span>
                </a>
              )}

              {odalar.length > 0 && (
                <div style={{ marginTop: "16px", padding: "12px", background: "#EEEDFE", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>{m.geceden}</div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#534AB7" }}>
                    {Math.min(...odalar.map(o => o.fiyat))} {odalar[0]?.para_birimi}
                  </div>
                </div>
              )}

              <a href="/teklif" style={{ display: "block", background: "#534AB7", color: "#fff", padding: "12px", borderRadius: "8px", fontSize: "14px", textDecoration: "none", textAlign: "center", fontWeight: 600, marginTop: "16px" }}>
                {m.rezervasyon}
              </a>
            </div>

            {(otel.instagram || otel.facebook) && (
              <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#12103a", marginBottom: "12px" }}>{m.sosyalMedya}</h3>
                <div style={{ display: "flex", gap: "10px" }}>
                  {otel.instagram && <a href={`https://instagram.com/${otel.instagram.replace("@", "")}`} target="_blank" rel="noreferrer" style={{ background: "#E1306C", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontSize: "12px", textDecoration: "none" }}>Instagram</a>}
                  {otel.facebook && <a href={otel.facebook} target="_blank" rel="noreferrer" style={{ background: "#1877F2", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontSize: "12px", textDecoration: "none" }}>Facebook</a>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
