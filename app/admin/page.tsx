"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

export default function Admin() {
  const [aktifMenu, setAktifMenu] = useState("genel");
  const [kullanicilar, setKullanicilar] = useState<any[]>([]);
  const [klinikler, setKlinikler] = useState<any[]>([]);
  const [talepler, setTalepler] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    veriYukle();
  }, []);

  async function veriYukle() {
    setYukleniyor(true);
    const { data: kullaniciData } = await supabase.from("profiles").select("*").order("olusturma_tarihi", { ascending: false });
    const { data: klinikData } = await supabase.from("profiles").select("*").eq("hesap_turu", "klinik");
    const { data: talepData } = await supabase.from("talepler").select("*, profiles(ad, soyad, email)").order("olusturma_tarihi", { ascending: false });
    setKullanicilar(kullaniciData || []);
    setKlinikler(klinikData || []);
    setTalepler(talepData || []);
    setYukleniyor(false);
  }

  async function cikisYap() {
    await supabase.auth.signOut();
    window.location.href = "/giris";
  }

  const hastaSayisi = kullanicilar.filter(k => k.hesap_turu === "hasta").length;
  const klinikSayisi = kullanicilar.filter(k => k.hesap_turu === "klinik").length;

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif", display: "flex" }}>

      <div style={{ width: "220px", background: "#12103a", display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1e1b4b" }}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#fff" }}>
            med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
          </div>
          <div style={{ fontSize: "11px", color: "#6b6fa8", marginTop: "4px" }}>Admin Paneli</div>
        </div>

        <div style={{ padding: "20px 12px", flex: 1 }}>
          {[
            { id: "genel", ad: "Genel Özet" },
            { id: "kullanicilar", ad: "Kullanıcılar" },
            { id: "klinikler", ad: "Klinikler" },
            { id: "talepler", ad: "Teklif Talepleri" },
          ].map((m) => (
            <div key={m.id} onClick={() => setAktifMenu(m.id)} style={{ padding: "10px 12px", borderRadius: "8px", cursor: "pointer", marginBottom: "4px", background: aktifMenu === m.id ? "#534AB7" : "transparent", color: aktifMenu === m.id ? "#fff" : "#8b8fc8", fontSize: "13px" }}>
              {m.ad}
            </div>
          ))}
        </div>

        <div style={{ padding: "0 12px" }}>
          <button onClick={cikisYap} style={{ width: "100%", padding: "10px", background: "transparent", border: "1px solid #2a2a4e", borderRadius: "8px", color: "#8b8fc8", fontSize: "13px", cursor: "pointer" }}>
            Çıkış Yap
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: "32px", overflow: "auto" }}>
        {yukleniyor ? (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>Veriler yükleniyor...</div>
        ) : (
          <>
            {aktifMenu === "genel" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Genel Özet</h1>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
                  {[
                    { baslik: "Toplam Kullanıcı", deger: kullanicilar.length, renk: "#534AB7" },
                    { baslik: "Hasta", deger: hastaSayisi, renk: "#0a7a3a" },
                    { baslik: "Klinik", deger: klinikSayisi, renk: "#185FA5" },
                    { baslik: "Teklif Talebi", deger: talepler.length, renk: "#BA7517" },
                  ].map((k) => (
                    <div key={k.baslik} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                      <div style={{ fontSize: "32px", fontWeight: 700, color: k.renk, marginBottom: "8px" }}>{k.deger}</div>
                      <div style={{ fontSize: "13px", color: "#888" }}>{k.baslik}</div>
                    </div>
                  ))}
                </div>

                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Son Kayıtlar</h2>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f9fafb" }}>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Ad Soyad</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>E-posta</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Hesap Türü</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Tarih</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kullanicilar.slice(0, 5).map((k, i) => (
                        <tr key={k.id} style={{ borderTop: "1px solid #EEEDFE", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#12103a" }}>{k.ad} {k.soyad}</td>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#888" }}>{k.email}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: k.hesap_turu === "admin" ? "#EEEDFE" : k.hesap_turu === "klinik" ? "#e8f4fd" : "#f0fff4", color: k.hesap_turu === "admin" ? "#534AB7" : k.hesap_turu === "klinik" ? "#185FA5" : "#0a7a3a" }}>
                              {k.hesap_turu}
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: "12px", color: "#888" }}>{new Date(k.olusturma_tarihi).toLocaleDateString("tr-TR")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {aktifMenu === "kullanicilar" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Kullanıcılar ({kullanicilar.length})</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f9fafb" }}>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Ad Soyad</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>E-posta</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Hesap Türü</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Tarih</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kullanicilar.map((k, i) => (
                        <tr key={k.id} style={{ borderTop: "1px solid #EEEDFE", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#12103a" }}>{k.ad} {k.soyad}</td>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#888" }}>{k.email}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: k.hesap_turu === "admin" ? "#EEEDFE" : k.hesap_turu === "klinik" ? "#e8f4fd" : "#f0fff4", color: k.hesap_turu === "admin" ? "#534AB7" : k.hesap_turu === "klinik" ? "#185FA5" : "#0a7a3a" }}>
                              {k.hesap_turu}
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: "12px", color: "#888" }}>{new Date(k.olusturma_tarihi).toLocaleDateString("tr-TR")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {kullanicilar.length === 0 && (
                    <div style={{ textAlign: "center", padding: "48px", color: "#888" }}>Henüz kullanıcı yok</div>
                  )}
                </div>
              </div>
            )}

            {aktifMenu === "klinikler" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Klinikler ({klinikSayisi})</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f9fafb" }}>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Klinik Adı</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>E-posta</th>
                        <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Durum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {klinikler.map((k, i) => (
                        <tr key={k.id} style={{ borderTop: "1px solid #EEEDFE", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#12103a" }}>{k.ad} {k.soyad}</td>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#888" }}>{k.email}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#f0fff4", color: "#0a7a3a" }}>Aktif</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {klinikler.length === 0 && (
                    <div style={{ textAlign: "center", padding: "48px", color: "#888" }}>Henüz klinik yok</div>
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
                    <div style={{ textAlign: "center", padding: "48px", color: "#888" }}>Henüz teklif talebi yok</div>
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
