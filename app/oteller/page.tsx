"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });

export default function Oteller() {
  const [oteller, setOteller] = useState<any[]>([]);
  const [filtrelenmis, setFiltrelenmis] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [gorunum, setGorunum] = useState<"liste" | "harita">("liste");
  const [seciliOtel, setSeciliOtel] = useState<any>(null);
  const [arama, setArama] = useState("");
  const [secilenSehir, setSecilenSehir] = useState("");
  const [maxFiyat, setMaxFiyat] = useState("");
  const { dil } = useDil();

  const supabase = createClient();

  const metinler = {
    tr: { baslik: "Oteller", altBaslik: "Tedaviniz süresince konaklamak için en iyi otelleri keşfedin", aramaPlaceholder: "Otel adı veya şehir ara...", tumSehirler: "Tüm Şehirler", maxFiyat: "Max. fiyat (EUR)", liste: "Liste", haritadaGor: "Haritada Gör", incele: "İncele", geceden: "gece'den", yukleniyor: "Yükleniyor...", bulunamadi: "Otel bulunamadı" },
    en: { baslik: "Hotels", altBaslik: "Discover the best hotels to stay during your treatment", aramaPlaceholder: "Search hotel name or city...", tumSehirler: "All Cities", maxFiyat: "Max. price (EUR)", liste: "List", haritadaGor: "View on Map", incele: "View", geceden: "per night from", yukleniyor: "Loading...", bulunamadi: "No hotels found" },
    de: { baslik: "Hotels", altBaslik: "Entdecken Sie die besten Hotels für Ihren Aufenthalt während der Behandlung", aramaPlaceholder: "Hotelname oder Stadt suchen...", tumSehirler: "Alle Städte", maxFiyat: "Max. Preis (EUR)", liste: "Liste", haritadaGor: "Auf Karte anzeigen", incele: "Ansehen", geceden: "ab pro Nacht", yukleniyor: "Wird geladen...", bulunamadi: "Keine Hotels gefunden" },
  };

  const m = metinler[dil];
  const sehirler = ["İstanbul", "Ankara", "İzmir", "Antalya", "Bursa"];

  useEffect(() => {
    async function veriYukle() {
      const { data } = await supabase.from("profiles").select("*, otel_odalar(fiyat, para_birimi, aktif)").eq("hesap_turu", "otel").eq("onaylandi", true).eq("askida", false);
      setOteller(data || []);
      setFiltrelenmis(data || []);
      setYukleniyor(false);
    }
    veriYukle();
    if (typeof window !== "undefined") {
      import("leaflet").then(L => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
      });
    }
  }, []);

  useEffect(() => {
    let sonuc = oteller;
    if (arama) sonuc = sonuc.filter(o => `${o.ad} ${o.soyad} ${o.konum_adres}`.toLowerCase().includes(arama.toLowerCase()));
    if (secilenSehir) sonuc = sonuc.filter(o => o.konum_adres?.toLowerCase().includes(secilenSehir.toLowerCase()));
    if (maxFiyat) sonuc = sonuc.filter(o => {
      const min = o.otel_odalar?.filter((r: any) => r.aktif).reduce((min: number, r: any) => Math.min(min, r.fiyat), Infinity);
      return min <= parseFloat(maxFiyat);
    });
    setFiltrelenmis(sonuc);
  }, [arama, secilenSehir, maxFiyat, oteller]);

  function minFiyat(otel: any) {
    const aktif = otel.otel_odalar?.filter((r: any) => r.aktif);
    if (!aktif || aktif.length === 0) return null;
    return aktif.reduce((min: any, r: any) => r.fiyat < min.fiyat ? r : min);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      <Navbar />
      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "32px" }}>
        <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>{m.baslik}</h1>
        <p style={{ color: "#8b8fc8", fontSize: "14px", marginBottom: "20px" }}>{m.altBaslik}</p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
          <input type="text" placeholder={m.aramaPlaceholder} value={arama} onChange={(e) => setArama(e.target.value)} style={{ flex: 1, minWidth: "200px", border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", outline: "none" }} />
          <select value={secilenSehir} onChange={(e) => setSecilenSehir(e.target.value)} style={{ border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", outline: "none", background: "#fff" }}>
            <option value="">{m.tumSehirler}</option>
            {sehirler.map(s => <option key={s}>{s}</option>)}
          </select>
          <input type="number" placeholder={m.maxFiyat} value={maxFiyat} onChange={(e) => setMaxFiyat(e.target.value)} style={{ width: "160px", border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", outline: "none" }} />
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => setGorunum("liste")} style={{ padding: "8px 20px", borderRadius: "20px", border: "none", fontSize: "13px", cursor: "pointer", background: gorunum === "liste" ? "#534AB7" : "rgba(255,255,255,0.1)", color: "#fff", fontWeight: gorunum === "liste" ? 700 : 400 }}>
            📋 {m.liste} ({filtrelenmis.length})
          </button>
          <button onClick={() => setGorunum("harita")} style={{ padding: "8px 20px", borderRadius: "20px", border: "none", fontSize: "13px", cursor: "pointer", background: gorunum === "harita" ? "#534AB7" : "rgba(255,255,255,0.1)", color: "#fff", fontWeight: gorunum === "harita" ? 700 : 400 }}>
            🗺️ {m.haritadaGor}
          </button>
        </div>
      </section>

      {gorunum === "liste" ? (
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px" }}>
          {yukleniyor ? (
            <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>{m.yukleniyor}</div>
          ) : filtrelenmis.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>{m.bulunamadi}</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {filtrelenmis.map((o) => {
                const enUcuz = minFiyat(o);
                return (
                  <div key={o.id} style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid #EEEDFE" }}>
                    {o.kapak_fotograf ? (
                      <img src={o.kapak_fotograf} alt={o.ad} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "160px", background: "linear-gradient(135deg, #EEEDFE, #CECBF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}><img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=160&fit=crop" alt="Otel" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
                    )}
                    <div style={{ padding: "16px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "6px" }}>{o.ad} {o.soyad}</h3>
                      {o.konum_adres && <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>📍 {o.konum_adres}</p>}
                      {enUcuz && <div style={{ fontSize: "14px", fontWeight: 700, color: "#534AB7", marginBottom: "12px" }}>{enUcuz.fiyat} {enUcuz.para_birimi}<span style={{ fontSize: "11px", fontWeight: 400, color: "#888" }}>/{m.geceden}</span></div>}
                      <div style={{ display: "flex", gap: "8px" }}>
                        <a href={`/otel/${o.id}`} style={{ flex: 1, background: "#534AB7", color: "#fff", padding: "8px", borderRadius: "8px", fontSize: "12px", textDecoration: "none", textAlign: "center", fontWeight: 600 }}>{m.incele}</a>
                        {o.konum_lat && o.konum_lng && (
                          <button onClick={() => { setSeciliOtel(o); setGorunum("harita"); }} style={{ flex: 1, background: "#fff", color: "#534AB7", border: "1px solid #534AB7", padding: "8px", borderRadius: "8px", fontSize: "12px", cursor: "pointer" }}>🗺️ {m.haritadaGor}</button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", height: "calc(100vh - 200px)" }}>
          <div style={{ background: "#fff", borderRight: "1px solid #EEEDFE", overflow: "auto" }}>
            <div style={{ padding: "16px", borderBottom: "1px solid #EEEDFE" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#12103a", margin: 0 }}>{m.baslik} ({filtrelenmis.length})</h3>
            </div>
            {filtrelenmis.map((o) => {
              const enUcuz = minFiyat(o);
              return (
                <div key={o.id} onClick={() => setSeciliOtel(o)} style={{ padding: "12px 16px", borderBottom: "1px solid #EEEDFE", cursor: "pointer", background: seciliOtel?.id === o.id ? "#EEEDFE" : "#fff" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    {o.kapak_fotograf ? (
                      <img src={o.kapak_fotograf} alt={o.ad} style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: "56px", height: "56px", background: "#EEEDFE", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>🏨</div>
                    )}
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "2px" }}>{o.ad} {o.soyad}</div>
                      {o.konum_adres && <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>📍 {o.konum_adres}</div>}
                      {enUcuz && <div style={{ fontSize: "12px", fontWeight: 700, color: "#534AB7" }}>{enUcuz.fiyat} {enUcuz.para_birimi}/{m.geceden}</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ position: "relative" }}>
            {typeof window !== "undefined" && (
              <>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                <MapContainer center={seciliOtel ? [seciliOtel.konum_lat, seciliOtel.konum_lng] : [41.0082, 28.9784]} zoom={seciliOtel ? 14 : 11} style={{ height: "100%", width: "100%" }}>
                  <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {filtrelenmis.filter(o => o.konum_lat && o.konum_lng).map((o) => {
                    const enUcuz = minFiyat(o);
                    return (
                      <Marker key={o.id} position={[o.konum_lat, o.konum_lng]}>
                        <Popup>
                          <div style={{ minWidth: "180px" }}>
                            {o.kapak_fotograf && <img src={o.kapak_fotograf} alt={o.ad} style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "6px", marginBottom: "8px" }} />}
                            <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>{o.ad} {o.soyad}</div>
                            {o.konum_adres && <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>📍 {o.konum_adres}</div>}
                            {enUcuz && <div style={{ fontSize: "13px", fontWeight: 700, color: "#534AB7", marginBottom: "8px" }}>{enUcuz.fiyat} {enUcuz.para_birimi}/{m.geceden}</div>}
                            <a href={`/otel/${o.id}`} style={{ background: "#534AB7", color: "#fff", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", textDecoration: "none", display: "inline-block" }}>{m.incele}</a>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
