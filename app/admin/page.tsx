"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

export default function Admin() {
  const [aktifMenu, setAktifMenu] = useState("genel");
  const [kullanicilar, setKullanicilar] = useState<any[]>([]);
  const [talepler, setTalepler] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [onayMesaj, setOnayMesaj] = useState("");

  const supabase = createClient();

  useEffect(() => { veriYukle(); }, []);

  async function veriYukle() {
    setYukleniyor(true);
    const { data: k } = await supabase.from("profiles").select("*").order("olusturma_tarihi", { ascending: false });
    const { data: t } = await supabase.from("talepler").select("*, profiles(ad, soyad, email)").order("olusturma_tarihi", { ascending: false });
    setKullanicilar(k || []);
    setTalepler(t || []);
    setYukleniyor(false);
  }

  async function guncelle(id: string, alan: string, deger: any) {
    await supabase.from("profiles").update({ [alan]: deger }).eq("id", id);
    setOnayMesaj("Guncellendi!");
    setTimeout(() => setOnayMesaj(""), 2000);
    veriYukle();
  }

  async function kullaniciyiSil(id: string) {
    if (!confirm("Bu kullaniciyi silmek istediginize emin misiniz?")) return;
    await supabase.from("profiles").delete().eq("id", id);
    veriYukle();
  }

  async function cikisYap() {
    await supabase.auth.signOut();
    window.location.href = "/giris";
  }

  const klinikler = kullanicilar.filter(k => k.hesap_turu === "klinik");
  const hastalar = kullanicilar.filter(k => k.hesap_turu === "hasta");
  const oteller = kullanicilar.filter(k => k.hesap_turu === "otel");
  const transferler = kullanicilar.filter(k => k.hesap_turu === "transfer");
  const bekleyenler = [...klinikler, ...oteller, ...transferler].filter(k => !k.onaylandi && !k.askida);

  function UyeTablosu({ liste, baslik }: { liste: any[], baslik: string }) {
    return (
      <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden", marginBottom: "24px" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #EEEDFE", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", margin: 0 }}>{baslik} ({liste.length})</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Ad / Firma</th>
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>E-posta</th>
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Durum</th>
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Islemler</th>
            </tr>
          </thead>
          <tbody>
            {liste.map((k, i) => (
              <tr key={k.id} style={{ borderTop: "1px solid #EEEDFE", background: k.askida ? "#fff5f5" : i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "10px 16px", fontSize: "13px", color: "#12103a" }}>{k.ad} {k.soyad}</td>
                <td style={{ padding: "10px 16px", fontSize: "13px", color: "#888" }}>{k.email}</td>
                <td style={{ padding: "10px 16px" }}>
                  {k.askida ? (
                    <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#fff0f0", color: "#c00" }}>Askida</span>
                  ) : k.onaylandi ? (
                    <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#f0fff4", color: "#0a7a3a" }}>Aktif</span>
                  ) : (
                    <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#fff8e1", color: "#BA7517" }}>Bekliyor</span>
                  )}
                </td>
                <td style={{ padding: "10px 16px" }}>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {!k.onaylandi && !k.askida && (
                      <button onClick={() => guncelle(k.id, "onaylandi", true)} style={{ background: "#0a7a3a", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Onayla</button>
                    )}
                    {k.onaylandi && !k.askida && (
                      <button onClick={() => guncelle(k.id, "askida", true)} style={{ background: "#BA7517", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Askiya Al</button>
                    )}
                    {k.askida && (
                      <button onClick={() => { guncelle(k.id, "askida", false); guncelle(k.id, "onaylandi", true); }} style={{ background: "#185FA5", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Aktif Et</button>
                    )}
                    <button onClick={() => kullaniciyiSil(k.id)} style={{ background: "#c00", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Sil</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {liste.length === 0 && (
          <div style={{ textAlign: "center", padding: "32px", color: "#888", fontSize: "13px" }}>Kayit yok</div>
        )}
      </div>
    );
  }

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
            { id: "genel", ad: "Genel Ozet", badge: bekleyenler.length },
            { id: "klinikler", ad: "Klinikler", badge: klinikler.filter(k => !k.onaylandi).length },
            { id: "oteller", ad: "Oteller", badge: oteller.filter(k => !k.onaylandi).length },
            { id: "transferler", ad: "Transfer Sirketleri", badge: transferler.filter(k => !k.onaylandi).length },
            { id: "hastalar", ad: "Hastalar", badge: 0 },
            { id: "talepler", ad: "Teklif Talepleri", badge: 0 },
          ].map((m) => (
            <div key={m.id} onClick={() => setAktifMenu(m.id)} style={{ padding: "10px 12px", borderRadius: "8px", cursor: "pointer", marginBottom: "4px", background: aktifMenu === m.id ? "#534AB7" : "transparent", color: aktifMenu === m.id ? "#fff" : "#8b8fc8", fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{m.ad}</span>
              {m.badge > 0 && <span style={{ background: "#c00", color: "#fff", fontSize: "10px", padding: "2px 6px", borderRadius: "10px" }}>{m.badge}</span>}
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
        {onayMesaj && (
          <div style={{ background: "#f0fff4", border: "1px solid #9f9", borderRadius: "8px", padding: "10px 16px", marginBottom: "16px", fontSize: "13px", color: "#0a7a3a" }}>
            ✓ {onayMesaj}
          </div>
        )}

        {yukleniyor ? (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>Veriler yukleniyor...</div>
        ) : (
          <>
            {aktifMenu === "genel" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Genel Ozet</h1>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
                  {[
                    { baslik: "Toplam Uye", deger: kullanicilar.length, renk: "#534AB7" },
                    { baslik: "Hasta", deger: hastalar.length, renk: "#0a7a3a" },
                    { baslik: "Klinik", deger: klinikler.length, renk: "#185FA5" },
                    { baslik: "Onay Bekleyen", deger: bekleyenler.length, renk: "#c00" },
                  ].map((k) => (
                    <div key={k.baslik} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                      <div style={{ fontSize: "32px", fontWeight: 700, color: k.renk }}>{k.deger}</div>
                      <div style={{ fontSize: "13px", color: "#888", marginTop: "6px" }}>{k.baslik}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
                  {[
                    { baslik: "Otel", deger: oteller.length, renk: "#7F77DD" },
                    { baslik: "Transfer Sirketi", deger: transferler.length, renk: "#BA7517" },
                    { baslik: "Teklif Talebi", deger: talepler.length, renk: "#185FA5" },
                  ].map((k) => (
                    <div key={k.baslik} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                      <div style={{ fontSize: "32px", fontWeight: 700, color: k.renk }}>{k.deger}</div>
                      <div style={{ fontSize: "13px", color: "#888", marginTop: "6px" }}>{k.baslik}</div>
                    </div>
                  ))}
                </div>

                {bekleyenler.length > 0 && (
                  <div style={{ background: "#fff8e1", border: "1px solid #f0c040", borderRadius: "12px", padding: "20px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#BA7517", marginBottom: "12px" }}>⚠ Onay Bekleyenler ({bekleyenler.length})</h3>
                    {bekleyenler.map((k) => (
                      <div key={k.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0e0a0" }}>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "#12103a" }}>{k.ad} {k.soyad}</div>
                          <div style={{ fontSize: "12px", color: "#888" }}>{k.email} · {k.hesap_turu}</div>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => guncelle(k.id, "onaylandi", true)} style={{ background: "#0a7a3a", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>Onayla</button>
                          <button onClick={() => kullaniciyiSil(k.id)} style={{ background: "#c00", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>Reddet</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {aktifMenu === "klinikler" && <UyeTablosu liste={klinikler} baslik="Klinikler" />}
            {aktifMenu === "oteller" && <UyeTablosu liste={oteller} baslik="Oteller" />}
            {aktifMenu === "transferler" && <UyeTablosu liste={transferler} baslik="Transfer Sirketleri" />}
            {aktifMenu === "hastalar" && <UyeTablosu liste={hastalar} baslik="Hastalar" />}

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
