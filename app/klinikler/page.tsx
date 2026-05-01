"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });

export default function Klinikler() {
  const [klinikler, setKlinikler] = useState<any[]>([]);
  const [filtrelenmis, setFiltrelenmis] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [gorunum, setGorunum] = useState<"liste" | "harita">("liste");
  const [seciliKlinik, setSeciliKlinik] = useState<any>(null);
  const [arama, setArama] = useState("");
  const [secilenSehir, setSecilenSehir] = useState("");
  const [secilenKategori, setSecilenKategori] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function veriYukle() {
      const { data } = await supabase
        .from("profiles")
        .select("*, klinik_hizmetler(kategori)")
        .eq("hesap_turu", "klinik")
        .eq("onaylandi", true)
        .eq("askida", false);
      setKlinikler(data || []);
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
    let sonuc = klinikler;
    if (arama) sonuc = sonuc.filter(k => `${k.ad} ${k.soyad} ${k.konum_adres}`.toLowerCase().includes(arama.toLowerCase()));
    if (secilenSehir) sonuc = sonuc.filter(k => k.konum_adres?.toLowerCase().includes(secilenSehir.toLowerCase()));
    if (secilenKategori) sonuc = sonuc.filter(k => k.klinik_hizmetler?.some((h: any) => h.kategori === secilenKategori));
    setFiltrelenmis(sonuc);
  }, [arama, secilenSehir, secilenKategori, klinikler]);

  const kategoriler = ["Diş Tedavisi", "Saç Ekimi", "Göz Ameliyatı", "Plastik Cerrahi", "Genel Sağlık"];
  const sehirler = ["İstanbul", "Ankara", "İzmir", "Antalya", "Bursa"];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "32px" }}>
        <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Klinikler</h1>
        <p style={{ color: "#8b8fc8", fontSize: "14px", marginBottom: "20px" }}>Onaylı kliniklerimizi keşfedin</p>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
          <input type="text" placeholder="Klinik adı veya şehir ara..." value={arama} onChange={(e) => setArama(e.target.value)} style={{ flex: 1, minWidth: "200px", border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", outline: "none" }} />
          <select value={secilenSehir} onChange={(e) => setSecilenSehir(e.target.value)} style={{ border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", outline: "none", background: "#fff" }}>
            <option value="">Tüm Şehirler</option>
            {sehirler.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={secilenKategori} onChange={(e) => setSecilenKategori(e.target.value)} style={{ border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", outline: "none", background: "#fff" }}>
            <option value="">Tüm Kategoriler</option>
            {kategoriler.map(k => <option key={k}>{k}</option>)}
          </select>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => setGorunum("liste")} style={{ padding: "8px 20px", borderRadius: "20px", border: "none", fontSize: "13px", cursor: "pointer", background: gorunum === "liste" ? "#534AB7" : "rgba(255,255,255,0.1)", color: "#fff", fontWeight: gorunum === "liste" ? 700 : 400 }}>
            📋 Liste ({filtrelenmis.length})
          </button>
          <button onClick={() => setGorunum("harita")} style={{ padding: "8px 20px", borderRadius: "20px", border: "none", fontSize: "13px", cursor: "pointer", background: gorunum === "harita" ? "#534AB7" : "rgba(255,255,255,0.1)", color: "#fff", fontWeight: gorunum === "harita" ? 700 : 400 }}>
            🗺️ Haritada Gör
          </button>
        </div>
      </section>

      {gorunum === "liste" ? (
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px" }}>
          {yukleniyor ? (
            <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>Yükleniyor...</div>
          ) : filtrelenmis.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>Klinik bulunamadı</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {filtrelenmis.map((k) => (
                <div key={k.id} style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid #EEEDFE", transition: "box-shadow 0.2s" }}>
                  {k.kapak_fotograf ? (
                    <img src={k.kapak_fotograf} alt={k.ad} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "160px", background: "linear-gradient(135deg, #EEEDFE, #CECBF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>🏥</div>
                  )}
                  <div style={{ padding: "16px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "6px" }}>{k.ad} {k.soyad}</h3>
                    {k.konum_adres && <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>📍 {k.konum_adres}</p>}
                    {k.tanitim_yazisi && <p style={{ fontSize: "12px", color: "#666", marginBottom: "12px", lineHeight: "1.5" }}>{k.tanitim_yazisi.slice(0, 80)}...</p>}
                    <div style={{ display: "flex", gap: "8px" }}>
                      <a href={`/klinik/${k.id}`} style={{ flex: 1, background: "#534AB7", color: "#fff", padding: "8px", borderRadius: "8px", fontSize: "12px", textDecoration: "none", textAlign: "center", fontWeight: 600 }}>İncele</a>
                      {k.konum_lat && k.konum_lng && (
                        <button onClick={() => { setSeciliKlinik(k); setGorunum("harita"); }} style={{ flex: 1, background: "#fff", color: "#534AB7", border: "1px solid #534AB7", padding: "8px", borderRadius: "8px", fontSize: "12px", cursor: "pointer" }}>🗺️ Haritada Gör</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", height: "calc(100vh - 200px)" }}>
          <div style={{ background: "#fff", borderRight: "1px solid #EEEDFE", overflow: "auto" }}>
            <div style={{ padding: "16px", borderBottom: "1px solid #EEEDFE" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#12103a", margin: 0 }}>Klinikler ({filtrelenmis.length})</h3>
            </div>
            {filtrelenmis.map((k) => (
              <div key={k.id} onClick={() => setSeciliKlinik(k)} style={{ padding: "12px 16px", borderBottom: "1px solid #EEEDFE", cursor: "pointer", background: seciliKlinik?.id === k.id ? "#EEEDFE" : "#fff" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  {k.kapak_fotograf ? (
                    <img src={k.kapak_fotograf} alt={k.ad} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: "48px", height: "48px", background: "#EEEDFE", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>🏥</div>
                  )}
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "2px" }}>{k.ad} {k.soyad}</div>
                    {k.konum_adres && <div style={{ fontSize: "11px", color: "#888" }}>📍 {k.konum_adres}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ position: "relative" }}>
            {typeof window !== "undefined" && (
              <>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                <MapContainer center={seciliKlinik ? [seciliKlinik.konum_lat, seciliKlinik.konum_lng] : [41.0082, 28.9784]} zoom={seciliKlinik ? 14 : 11} style={{ height: "100%", width: "100%" }}>
                  <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {filtrelenmis.filter(k => k.konum_lat && k.konum_lng).map((k) => (
                    <Marker key={k.id} position={[k.konum_lat, k.konum_lng]}>
                      <Popup>
                        <div style={{ minWidth: "180px" }}>
                          {k.kapak_fotograf && <img src={k.kapak_fotograf} alt={k.ad} style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "6px", marginBottom: "8px" }} />}
                          <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>{k.ad} {k.soyad}</div>
                          {k.konum_adres && <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>📍 {k.konum_adres}</div>}
                          <a href={`/klinik/${k.id}`} style={{ background: "#534AB7", color: "#fff", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", textDecoration: "none", display: "inline-block" }}>İncele</a>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
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
