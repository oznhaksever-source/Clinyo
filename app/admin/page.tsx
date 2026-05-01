"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

export default function Admin() {
  const [aktifMenu, setAktifMenu] = useState("genel");
  const [kullanicilar, setKullanicilar] = useState<any[]>([]);
  const [talepler, setTalepler] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    veriYukle();
  }, []);

  async function veriYukle() {
    setYukleniyor(true);
    const { data: kullaniciData } = await supabase.from("profiles").select("*").order("olusturma_tarihi", { ascending: false });
    const { data: talepData } = await supabase.from("talepler").select("*, profiles(ad, soyad, email)").order("olusturma_tarihi", { ascending: false });
    setKullanicilar(kullaniciData || []);
    setTalepler(talepData || []);
    setYukleniyor(false);
  }

  async function klinikOnayla(id: string) {
    await supabase.from("profiles").update({ onaylandi: true }).eq("id", id);
    veriYukle();
  }

  async function klinikReddet(id: string) {
    await supabase.from("profiles").update({ onaylandi: false }).eq("id", id);
    veriYukle();
  }

  async function cikisYap() {
    await supabase.auth.signOut();
    window.location.href = "/giris";
  }

  const hastalar = kullanicilar.filter(k => k.hesap_turu === "hasta");
  const klinikler = kullanicilar.filter(k => k.hesap_turu === "klinik");
  const bekleyenKlinikler = klinikler.filter(k => !k.onaylandi);
  const onayliKlinikler = klinikler.filter(k => k.onaylandi);

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif", display: "flex" }}>

      <div style={{ width: "220px", background: "#12103a", display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1e1b4b" }}>
          <a href="/" style={{ fontSize: "20px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>
            med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
          </a>
          <div style={{ fontSize: "11px", color: "#6b6fa8", marginTop: "4px" }}>Admin Paneli</div>
        </div>

        <div style={{ padding: "20px 12px", flex: 1 }}>
          {[
            { id: "genel", ad: "Genel Ozet" },
            { id: "klinikler", ad: "Klinik Yonetimi" },
            { id: "hastalar", ad: "Hastalar" },
            { id: "talepler", ad: "Teklif Talepleri" },
          ].map((m) => (
            <div key={m.id} onClick={() => setAktifMenu(m.id)} style={{ padding: "10px 12px", borderRadius: "8px", cursor: "pointer", marginBottom: "4px", background: aktifMenu === m.id ? "#534AB7" : "transparent", color: aktifMenu === m.id ? "#fff" : "#8b8fc8", fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{m.ad}</span>
              {m.id === "klinikler" && bekleyenKlinikler.length > 0 && (
                <span style={{ background: "#c00", color: "#fff", fontSize: "10px", padding: "2px 6px", borderRadius: "10px" }}>{bekleyenKlinikler.length}</span>
              )}
            </div>
          ))}
        </div>

        <div style={{ padding: "0 12px 20px" }}>
          <button onClick={cikisYap} style={{ width: "100%", padding: "10px", background: "transparent", border: "1px solid #2a2a4e", borderRadius: "8px", color: "#8b8fc8", fontSize: "13px", cursor: "pointer" }}>
            Cikis Yap
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: "32px", overflow: "auto" }}>
        {yukleniyor ? (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>Veriler yukleniyor...</div>
        ) : (
          <>
            {aktifMenu === "genel" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Genel Ozet</h1>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
                  {[
                    { baslik: "Toplam Kullanici", deger: kullanicilar.length, renk: "#534AB7" },
                    { baslik: "Hasta", deger: hastalar.length, renk: "#0a7a3a" },
                    { baslik: "Klinik", deger: klinikler.length, renk: "#185FA5" },
                    { baslik: "Onay Bekleyen", deger: bekleyenKlinikler.length, renk: "#c00" },
                  ].map((k) => (
                    <div key={k.baslik} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                      <div style={{ fontSize: "32px", fontWeight: 700, color: k.renk, marginBottom: "8px" }}>{k.deger}</div>
                      <div style={{ fontSize: "13px", color: "#888" }}>{k.baslik}</div>
                    </div>
                  ))}
                </div>

                {bekleyenKlinikler.length > 0 && (
                  <div style={{ background: "#fff8e1", border: "1px solid #f0c040", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#BA7517", marginBottom: "12px" }}>⚠ Onay Bekleyen Klinikler ({bekleyenKlinikler.length})</h3>
                    {bekleyenKlinikler.map((k) => (
                      <div key={k.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0e0a0" }}>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "#12103a" }}>{k.ad} {k.soyad}</div>
                          <div style={{ fontSize: "12px", color: "#888" }}>{k.email}</div>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => klinikOnayla(k.id)} style={{ background: "#0a7a3a", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>Onayla</button>
                          <button onClick={() => klinikReddet(k.id)} style={{ background: "#c00", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>Reddet</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Son Kayitlar</h2>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f9fafb" }}>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Ad Soyad</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>E-posta</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Hesap Turu</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Durum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kullanicilar.slice(0, 10).map((k, i) => (
                        <tr key={k.id} style={{ borderTop: "1px solid #EEEDFE", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#12103a" }}>{k.ad} {k.soyad}</td>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#888" }}>{k.email}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: k.hesap_turu === "admin" ? "#EEEDFE" : k.hesap_turu === "klinik" ? "#e8f4fd" : "#f0fff4", color: k.hesap_turu === "admin" ? "#534AB7" : k.hesap_turu === "klinik" ? "#185FA5" : "#0a7a3a" }}>
                              {k.hesap_turu}
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            {k.hesap_turu === "klinik" ? (
                              <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: k.onaylandi ? "#f0fff4" : "#fff8e1", color: k.onaylandi ? "#0a7a3a" : "#BA7517" }}>
                                {k.onaylandi ? "Onaylandi" : "Bekliyor"}
                              </span>
                            ) : (
                              <span style={{ fontSize: "11px", color: "#888" }}>—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {aktifMenu === "klinikler" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Klinik Yonetimi ({klinikler.length})</h1>
                
                {bekleyenKlinikler.length > 0 && (
                  <div style={{ marginBottom: "24px" }}>
                    <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#BA7517", marginBottom: "12px" }}>Onay Bekleyenler ({bekleyenKlinikler.length})</h2>
                    <div style={{ background: "#fff", border: "1px solid #f0c040", borderRadius: "12px", overflow: "hidden" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ background: "#fff8e1" }}>
                            <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Klinik Adi</th>
                            <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>E-posta</th>
                            <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Islem</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bekleyenKlinikler.map((k, i) => (
                            <tr key={k.id} style={{ borderTop: "1px solid #EEEDFE", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                              <td style={{ padding: "12px 16px", fontSize: "13px", color: "#12103a" }}>{k.ad} {k.soyad}</td>
                              <td style={{ padding: "12px 16px", fontSize: "13px", color: "#888" }}>{k.email}</td>
                              <td style={{ padding: "12px 16px" }}>
                                <div style={{ display: "flex", gap: "8px" }}>
                                  <button onClick={() => klinikOnayla(k.id)} style={{ background: "#0a7a3a", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>✓ Onayla</button>
                                  <button onClick={() => klinikReddet(k.id)} style={{ background: "#c00", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>✗ Reddet</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0a7a3a", marginBottom: "12px" }}>Onaylanmis Klinikler ({onayliKlinikler.length})</h2>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f9fafb" }}>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Klinik Adi</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>E-posta</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Durum</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Islem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {onayliKlinikler.map((k, i) => (
                        <tr key={k.id} style={{ borderTop: "1px solid #EEEDFE", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#12103a" }}>{k.ad} {k.soyad}</td>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#888" }}>{k.email}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#f0fff4", color: "#0a7a3a" }}>Onaylandi</span>
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <button onClick={() => klinikReddet(k.id)} style={{ background: "transparent", color: "#c00", border: "1px solid #c00", padding: "4px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>Onay Kaldir</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {onayliKlinikler.length === 0 && (
                    <div style={{ textAlign: "center", padding: "32px", color: "#888", fontSize: "13px" }}>Henuz onaylanmis klinik yok</div>
                  )}
                </div>
              </div>
            )}

            {aktifMenu === "hastalar" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Hastalar ({hastalar.length})</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f9fafb" }}>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Ad Soyad</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>E-posta</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Kayit Tarihi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hastalar.map((k, i) => (
                        <tr key={k.id} style={{ borderTop: "1px solid #EEEDFE", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#12103a" }}>{k.ad} {k.soyad}</td>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#888" }}>{k.email}</td>
                          <td style={{ padding: "12px 16px", fontSize: "12px", color: "#888" }}>{new Date(k.olusturma_tarihi).toLocaleDateString("tr-TR")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {hastalar.length === 0 && (
                    <div style={{ textAlign: "center", padding: "32px", color: "#888", fontSize: "13px" }}>Henuz hasta yok</div>
                  )}
                </div>
              </div>
            )}

            {aktifMenu === "talepler" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Teklif Talepleri ({talepler.length})</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f9fafb" }}>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Hasta</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Tedavi</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Durum</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Tarih</th>
                      </tr>
                    </thead>
                    <tbody>
                      {talepler.map((t, i) => (
                        <tr key={t.id} style={{ borderTop: "1px solid #EEEDFE", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#12103a" }}>{t.profiles?.ad} {t.profiles?.soyad}</td>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#888" }}>{t.tedavi_turu}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: t.durum === "beklemede" ? "#fff8e1" : "#f0fff4", color: t.durum === "beklemede" ? "#BA7517" : "#0a7a3a" }}>
                              {t.durum}
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: "12px", color: "#888" }}>{new Date(t.olusturma_tarihi).toLocaleDateString("tr-TR")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {talepler.length === 0 && (
                    <div style={{ textAlign: "center", padding: "32px", color: "#888", fontSize: "13px" }}>Henuz teklif talebi yok</div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
