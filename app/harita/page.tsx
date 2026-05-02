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

export default function Harita() {
  const [oteller, setOteller] = useState<any[]>([]);
  const [klinikler, setKlinikler] = useState<any[]>([]);
  const [gosterilen, setGosterilen] = useState<"oteller" | "klinikler">("klinikler");
  const [yukleniyor, setYukleniyor] = useState(true);
  const { dil } = useDil();
  const supabase = createClient();

  const metinler = {
    tr: { baslik: "Harita", altBaslik: "Oteller ve kliniklerin konumlarını harita üzerinde görüntüleyin", oteller: "Oteller", klinikler: "Klinikler", yukleniyor: "Harita yükleniyor...", konumYok: "Konum bilgisi olan kayıt bulunamadı", incele: "İncele" },
    en: { baslik: "Map", altBaslik: "View locations of hotels and clinics on the map", oteller: "Hotels", klinikler: "Clinics", yukleniyor: "Loading map...", konumYok: "No records with location found", incele: "View" },
    de: { baslik: "Karte", altBaslik: "Sehen Sie Standorte von Hotels und Kliniken auf der Karte", oteller: "Hotels", klinikler: "Kliniken", yukleniyor: "Karte wird geladen...", konumYok: "Keine Einträge mit Standort gefunden", incele: "Ansehen" },
  };

  const m = metinler[dil];

  useEffect(() => {
    async function veriYukle() {
      const { data: otelData } = await supabase.from("profiles").select("id, ad, soyad, konum_lat, konum_lng, konum_adres, kapak_fotograf").eq("hesap_turu", "otel").eq("onaylandi", true).not("konum_lat", "is", null);
      const { data: klinikData } = await supabase.from("profiles").select("id, ad, soyad, konum_lat, konum_lng, konum_adres, kapak_fotograf").eq("hesap_turu", "klinik").eq("onaylandi", true).not("konum_lat", "is", null);
      setOteller(otelData || []);
      setKlinikler(klinikData || []);
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

  const liste = gosterilen === "oteller" ? oteller : klinikler;

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      <Navbar />
      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "32px" }}>
        <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>{m.baslik}</h1>
        <p style={{ color: "#8b8fc8", fontSize: "14px", marginBottom: "20px" }}>{m.altBaslik}</p>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => setGosterilen("klinikler")} style={{ padding: "8px 20px", borderRadius: "20px", border: "none", fontSize: "13px", cursor: "pointer", background: gosterilen === "klinikler" ? "#534AB7" : "rgba(255,255,255,0.1)", color: "#fff", fontWeight: gosterilen === "klinikler" ? 700 : 400 }}>
            🏥 {m.klinikler} ({klinikler.length})
          </button>
          <button onClick={() => setGosterilen("oteller")} style={{ padding: "8px 20px", borderRadius: "20px", border: "none", fontSize: "13px", cursor: "pointer", background: gosterilen === "oteller" ? "#534AB7" : "rgba(255,255,255,0.1)", color: "#fff", fontWeight: gosterilen === "oteller" ? 700 : 400 }}>
            🏨 {m.oteller} ({oteller.length})
          </button>
        </div>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", height: "600px" }}>
        <div style={{ position: "relative" }}>
          {typeof window !== "undefined" && !yukleniyor && (
            <>
              <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
              <MapContainer center={[41.0082, 28.9784]} zoom={11} style={{ height: "100%", width: "100%" }}>
                <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {liste.map((item) => (
                  item.konum_lat && item.konum_lng ? (
                    <Marker key={item.id} position={[item.konum_lat, item.konum_lng]}>
                      <Popup>
                        <div style={{ minWidth: "180px" }}>
                          {item.kapak_fotograf && <img src={item.kapak_fotograf} alt={item.ad} style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "6px", marginBottom: "8px" }} />}
                          <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>{item.ad} {item.soyad}</div>
                          {item.konum_adres && <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>{item.konum_adres}</div>}
                          <a href={`/${gosterilen === "oteller" ? "otel" : "klinik"}/${item.id}`} style={{ background: "#534AB7", color: "#fff", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", textDecoration: "none", display: "inline-block" }}>
                            {m.incele}
                          </a>
                        </div>
                      </Popup>
                    </Marker>
                  ) : null
                ))}
              </MapContainer>
            </>
          )}
          {yukleniyor && (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0", color: "#888" }}>
              {m.yukleniyor}
            </div>
          )}
        </div>

        <div style={{ background: "#fff", borderLeft: "1px solid #EEEDFE", overflow: "auto" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #EEEDFE" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#12103a", margin: 0 }}>
              {gosterilen === "oteller" ? m.oteller : m.klinikler} ({liste.length})
            </h3>
          </div>
          {liste.length === 0 ? (
            <div style={{ padding: "32px", textAlign: "center", color: "#888", fontSize: "13px" }}>
              {yukleniyor ? m.yukleniyor : m.konumYok}
            </div>
          ) : (
            liste.map((item) => (
              <div key={item.id} style={{ padding: "12px 16px", borderBottom: "1px solid #EEEDFE", cursor: "pointer" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  {item.kapak_fotograf ? (
                    <img src={item.kapak_fotograf} alt={item.ad} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: "48px", height: "48px", background: "#EEEDFE", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                      {gosterilen === "oteller" ? "🏨" : "🏥"}
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "2px" }}>{item.ad} {item.soyad}</div>
                    {item.konum_adres && <div style={{ fontSize: "11px", color: "#888" }}>{item.konum_adres}</div>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
