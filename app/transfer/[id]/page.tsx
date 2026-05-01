 "use client";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TransferProfil() {
  const { id } = useParams();
  const [firma, setFirma] = useState<any>(null);
  const [araclar, setAraclar] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function veriYukle() {
      const { data: firmaData } = await supabase.from("profiles").select("*").eq("id", id).single();
      setFirma(firmaData);
      const { data: aracData } = await supabase.from("transfer_araclar").select("*").eq("transfer_id", id).eq("aktif", true).order("fiyat");
      setAraclar(aracData || []);
      setYukleniyor(false);
    }
    if (id) veriYukle();
  }, [id]);

  if (yukleniyor) return (
    <main style={{ minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Navbar />
      <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>Yükleniyor...</div>
    </main>
  );

  if (!firma) return (
    <main style={{ minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Navbar />
      <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>Firma bulunamadı</div>
    </main>
  );

  const aracTipleri = [...new Set(araclar.map(a => a.arac_tipi))];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      <Navbar />

      {/* Kapak */}
      <div style={{ position: "relative", height: "280px", background: "linear-gradient(135deg, #12103a, #1e1b4b)", overflow: "hidden" }}>
        {firma.kapak_fotograf && (
          <img src={firma.kapak_fotograf} alt={firma.ad} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
        )}
        <div style={{ position: "absolute", bottom: "32px", left: "32px" }}>
          <div style={{ fontSize: "12px", color: "#7F77DD", fontWeight: 600, marginBottom: "8px", letterSpacing: "2px" }}>TRANSFER HİZMETİ</div>
          <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>{firma.ad} {firma.soyad}</h1>
          {firma.konum_adres && <p style={{ color: "#aab4c8", fontSize: "14px" }}>📍 {firma.konum_adres}</p>}
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>

          {/* Sol */}
          <div>
            {firma.tanitim_yazisi && (
              <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#12103a", marginBottom: "12px" }}>Firma Hakkında</h2>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.7" }}>{firma.tanitim_yazisi}</p>
              </div>
            )}

            <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Araç Filosu ({araclar.length})</h2>
              {araclar.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px", color: "#888", fontSize: "13px" }}>Henüz araç bilgisi eklenmemiş</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {araclar.map((a) => (
                    <div key={a.id} style={{ border: "1px solid #EEEDFE", borderRadius: "10px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ fontSize: "32px" }}>
                          {a.arac_tipi.includes("VIP") ? "🚙" : a.arac_tipi.includes("Otobüs") ? "🚌" : a.arac_tipi.includes("Minibüs") ? "🚐" : "🚗"}
                        </div>
                        <div>
                          <div style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{a.arac_tipi}</div>
                          <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>👥 {a.kapasite} kişi kapasiteli</div>
                          {a.aciklama && <div style={{ fontSize: "12px", color: "#666" }}>{a.aciklama}</div>}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "20px", fontWeight: 700, color: "#534AB7" }}>{a.fiyat} {a.para_birimi}</div>
                        <div style={{ fontSize: "11px", color: "#888" }}>tek yön</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {aracTipleri.length > 0 && (
              <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Hizmet Kapsamı</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                  {[
                    { icon: "✈️", baslik: "Havalimanı Transferi", aciklama: "Havalimanından kliniğe/otele" },
                    { icon: "🏥", baslik: "Klinik Transferi", aciklama: "Otel ile klinik arası" },
                    { icon: "🏨", baslik: "Otel Transferi", aciklama: "Şehir içi ulaşım" },
                    { icon: "🔄", baslik: "Gidiş-Dönüş", aciklama: "İki yön transfer imkanı" },
                  ].map((h) => (
                    <div key={h.baslik} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "12px", background: "#f9fafb", borderRadius: "8px" }}>
                      <span style={{ fontSize: "24px" }}>{h.icon}</span>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "2px" }}>{h.baslik}</div>
                        <div style={{ fontSize: "11px", color: "#888" }}>{h.aciklama}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sağ */}
          <div>
            <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px", marginBottom: "16px", position: "sticky", top: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>İletişim</h3>

              {firma.telefon && (
                <a href={`tel:${firma.telefon}`} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f5f5f5", textDecoration: "none", color: "#12103a" }}>
                  <span style={{ fontSize: "18px" }}>📞</span>
                  <span style={{ fontSize: "13px" }}>{firma.telefon}</span>
                </a>
              )}

              {firma.website && (
                <a href={firma.website} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f5f5f5", textDecoration: "none", color: "#534AB7" }}>
                  <span style={{ fontSize: "18px" }}>🌐</span>
                  <span style={{ fontSize: "13px" }}>Website</span>
                </a>
              )}

              {firma.instagram && (
                <a href={`https://instagram.com/${firma.instagram.replace("@", "")}`} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f5f5f5", textDecoration: "none", color: "#E1306C" }}>
                  <span style={{ fontSize: "18px" }}>📸</span>
                  <span style={{ fontSize: "13px" }}>{firma.instagram}</span>
                </a>
              )}

              {firma.google_maps_url && (
                <a href={firma.google_maps_url} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f5f5f5", textDecoration: "none", color: "#185FA5" }}>
                  <span style={{ fontSize: "18px" }}>📍</span>
                  <span style={{ fontSize: "13px" }}>Google Maps'te Gör</span>
                </a>
              )}

              {araclar.length > 0 && (
                <div style={{ marginTop: "16px", padding: "12px", background: "#EEEDFE", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>Fiyatlar</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#534AB7" }}>
                    {Math.min(...araclar.map(a => a.fiyat))} {araclar[0]?.para_birimi}'den başlayan
                  </div>
                </div>
              )}

              <a href="/teklif" style={{ display: "block", background: "#534AB7", color: "#fff", padding: "12px", borderRadius: "8px", fontSize: "14px", textDecoration: "none", textAlign: "center", fontWeight: 600, marginTop: "16px" }}>
                Transfer Rezervasyonu
              </a>
            </div>

            {(firma.instagram || firma.facebook) && (
              <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#12103a", marginBottom: "12px" }}>Sosyal Medya</h3>
                <div style={{ display: "flex", gap: "10px" }}>
                  {firma.instagram && <a href={`https://instagram.com/${firma.instagram.replace("@", "")}`} target="_blank" rel="noreferrer" style={{ background: "#E1306C", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontSize: "12px", textDecoration: "none" }}>Instagram</a>}
                  {firma.facebook && <a href={firma.facebook} target="_blank" rel="noreferrer" style={{ background: "#1877F2", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontSize: "12px", textDecoration: "none" }}>Facebook</a>}
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

