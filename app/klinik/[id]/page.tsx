 
"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function KlinikProfil() {
  const { id } = useParams();
  const [klinik, setKlinik] = useState<any>(null);
  const [hizmetler, setHizmetler] = useState<any[]>([]);
  const [doktorlar, setDoktorlar] = useState<any[]>([]);
  const [onceSonralar, setOnceSonralar] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [aktifTab, setAktifTab] = useState("hizmetler");

  const supabase = createClient();

  useEffect(() => {
    async function veriYukle() {
      const { data: klinikData } = await supabase.from("profiles").select("*").eq("id", id).single();
      setKlinik(klinikData);

      const { data: hizmetData } = await supabase.from("klinik_hizmetler").select("*").eq("klinik_id", id).eq("aktif", true).order("kategori");
      setHizmetler(hizmetData || []);

      const { data: doktorData } = await supabase.from("doktorlar").select("*").eq("klinik_id", id).eq("aktif", true);
      setDoktorlar(doktorData || []);

      const { data: onceSonraData } = await supabase.from("once_sonra").select("*").eq("klinik_id", id);
      setOnceSonralar(onceSonraData || []);

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

  if (!klinik) return (
    <main style={{ minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Navbar />
      <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>Klinik bulunamadı</div>
    </main>
  );

  const kategoriler = [...new Set(hizmetler.map(h => h.kategori))];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      <Navbar />

      {/* Kapak Fotoğrafı */}
      <div style={{ position: "relative", height: "300px", background: "linear-gradient(135deg, #12103a, #1e1b4b)", overflow: "hidden" }}>
        {klinik.kapak_fotograf && (
          <img src={klinik.kapak_fotograf} alt={klinik.ad} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
        )}
        <div style={{ position: "absolute", bottom: "32px", left: "32px" }}>
          <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>{klinik.ad} {klinik.soyad}</h1>
          {klinik.konum_adres && <p style={{ color: "#aab4c8", fontSize: "14px" }}>📍 {klinik.konum_adres}</p>}
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>

          {/* Sol - Ana İçerik */}
          <div>
            {/* Tanıtım */}
            {klinik.tanitim_yazisi && (
              <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#12103a", marginBottom: "12px" }}>Hakkımızda</h2>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.7" }}>{klinik.tanitim_yazisi}</p>
              </div>
            )}

            {/* Tablar */}
            <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
              <div style={{ display: "flex", borderBottom: "1px solid #EEEDFE" }}>
                {[
                  { id: "hizmetler", ad: `Hizmetler (${hizmetler.length})` },
                  { id: "doktorlar", ad: `Doktorlar (${doktorlar.length})` },
                  { id: "once-sonra", ad: `Önce/Sonra (${onceSonralar.length})` },
                ].map((tab) => (
                  <button key={tab.id} onClick={() => setAktifTab(tab.id)} style={{ flex: 1, padding: "14px", border: "none", background: aktifTab === tab.id ? "#EEEDFE" : "#fff", color: aktifTab === tab.id ? "#534AB7" : "#888", fontSize: "13px", fontWeight: aktifTab === tab.id ? 700 : 400, cursor: "pointer", borderBottom: aktifTab === tab.id ? "2px solid #534AB7" : "none" }}>
                    {tab.ad}
                  </button>
                ))}
              </div>

              <div style={{ padding: "20px" }}>
                {aktifTab === "hizmetler" && (
                  <div>
                    {kategoriler.map(kat => (
                      <div key={kat} style={{ marginBottom: "20px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#534AB7", marginBottom: "10px", paddingBottom: "6px", borderBottom: "1px solid #EEEDFE" }}>{kat}</h3>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                          <tbody>
                            {hizmetler.filter(h => h.kategori === kat).map(h => (
                              <tr key={h.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                                <td style={{ padding: "10px 0", fontSize: "13px", color: "#12103a" }}>
                                  <div style={{ fontWeight: 600 }}>{h.hizmet_adi}</div>
                                  {h.aciklama && <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{h.aciklama}</div>}
                                </td>
                                {h.sure && <td style={{ padding: "10px", fontSize: "12px", color: "#888", textAlign: "center" }}>{h.sure}</td>}
                                <td style={{ padding: "10px 0", fontSize: "14px", fontWeight: 700, color: "#534AB7", textAlign: "right" }}>{h.fiyat} {h.para_birimi}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                    {hizmetler.length === 0 && <div style={{ textAlign: "center", padding: "32px", color: "#888", fontSize: "13px" }}>Henüz hizmet eklenmemiş</div>}
                  </div>
                )}

                {aktifTab === "doktorlar" && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                    {doktorlar.map(d => (
                      <div key={d.id} style={{ textAlign: "center", padding: "16px", border: "1px solid #EEEDFE", borderRadius: "10px" }}>
                        {d.fotograf_url ? (
                          <img src={d.fotograf_url} alt={d.ad} style={{ width: "72px", height: "72px", objectFit: "cover", borderRadius: "50%", marginBottom: "10px" }} />
                        ) : (
                          <div style={{ width: "72px", height: "72px", background: "#EEEDFE", borderRadius: "50%", margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", color: "#534AB7", fontWeight: 700 }}>
                            {d.ad[0]}
                          </div>
                        )}
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{d.ad}</div>
                        <div style={{ fontSize: "11px", color: "#534AB7" }}>{d.uzmanlik}</div>
                        {d.aciklama && <div style={{ fontSize: "11px", color: "#888", marginTop: "6px" }}>{d.aciklama}</div>}
                      </div>
                    ))}
                    {doktorlar.length === 0 && <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "32px", color: "#888", fontSize: "13px" }}>Henüz doktor eklenmemiş</div>}
                  </div>
                )}

                {aktifTab === "once-sonra" && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                    {onceSonralar.map(os => (
                      <div key={os.id} style={{ border: "1px solid #EEEDFE", borderRadius: "10px", overflow: "hidden" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                          <div>
                            <div style={{ fontSize: "11px", color: "#888", padding: "6px 10px", background: "#f9fafb", textAlign: "center" }}>ÖNCE</div>
                            {os.once_fotograf && <img src={os.once_fotograf} alt="Önce" style={{ width: "100%", height: "130px", objectFit: "cover" }} />}
                          </div>
                          <div>
                            <div style={{ fontSize: "11px", color: "#0a7a3a", padding: "6px 10px", background: "#f0fff4", textAlign: "center" }}>SONRA</div>
                            {os.sonra_fotograf && <img src={os.sonra_fotograf} alt="Sonra" style={{ width: "100%", height: "130px", objectFit: "cover" }} />}
                          </div>
                        </div>
                        {os.hizmet_adi && (
                          <div style={{ padding: "10px 12px", fontSize: "12px", fontWeight: 600, color: "#12103a" }}>{os.hizmet_adi}</div>
                        )}
                      </div>
                    ))}
                    {onceSonralar.length === 0 && <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "32px", color: "#888", fontSize: "13px" }}>Henüz önce/sonra fotoğrafı eklenmemiş</div>}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sağ - İletişim Kartı */}
          <div>
            <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px", marginBottom: "16px", position: "sticky", top: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>İletişim</h3>

              {klinik.telefon && (
                <a href={`tel:${klinik.telefon}`} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f5f5f5", textDecoration: "none", color: "#12103a" }}>
                  <span style={{ fontSize: "18px" }}>📞</span>
                  <span style={{ fontSize: "13px" }}>{klinik.telefon}</span>
                </a>
              )}

              {klinik.website && (
                <a href={klinik.website} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f5f5f5", textDecoration: "none", color: "#534AB7" }}>
                  <span style={{ fontSize: "18px" }}>🌐</span>
                  <span style={{ fontSize: "13px" }}>Website</span>
                </a>
              )}

              {klinik.instagram && (
                <a href={`https://instagram.com/${klinik.instagram.replace("@", "")}`} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f5f5f5", textDecoration: "none", color: "#E1306C" }}>
                  <span style={{ fontSize: "18px" }}>📸</span>
                  <span style={{ fontSize: "13px" }}>{klinik.instagram}</span>
                </a>
              )}

              {klinik.google_maps_url && (
                <a href={klinik.google_maps_url} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", textDecoration: "none", color: "#185FA5" }}>
                  <span style={{ fontSize: "18px" }}>📍</span>
                  <span style={{ fontSize: "13px" }}>Google Maps'te Gör</span>
                </a>
              )}

              <a href="/teklif" style={{ display: "block", background: "#534AB7", color: "#fff", padding: "12px", borderRadius: "8px", fontSize: "14px", textDecoration: "none", textAlign: "center", fontWeight: 600, marginTop: "16px" }}>
                Teklif Al
              </a>
            </div>

            {/* Sosyal Medya */}
            {(klinik.instagram || klinik.facebook || klinik.twitter) && (
              <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#12103a", marginBottom: "12px" }}>Sosyal Medya</h3>
                <div style={{ display: "flex", gap: "10px" }}>
                  {klinik.instagram && <a href={`https://instagram.com/${klinik.instagram.replace("@", "")}`} target="_blank" rel="noreferrer" style={{ background: "#E1306C", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontSize: "12px", textDecoration: "none" }}>Instagram</a>}
                  {klinik.facebook && <a href={klinik.facebook} target="_blank" rel="noreferrer" style={{ background: "#1877F2", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontSize: "12px", textDecoration: "none" }}>Facebook</a>}
                  {klinik.twitter && <a href={`https://twitter.com/${klinik.twitter.replace("@", "")}`} target="_blank" rel="noreferrer" style={{ background: "#1DA1F2", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontSize: "12px", textDecoration: "none" }}>Twitter</a>}
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
