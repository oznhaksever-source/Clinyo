"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

export default function HastaPanel() {
  const [aktifMenu, setAktifMenu] = useState("ozet");
  const [kullanici, setKullanici] = useState<any>(null);
  const [talepler, setTalepler] = useState<any[]>([]);
  const [teklifler, setTeklifler] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    veriYukle();
  }, []);

  async function veriYukle() {
    setYukleniyor(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = "/giris"; return; }

    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    setKullanici(profile);

    const { data: talepData } = await supabase.from("talepler").select("*").eq("hasta_id", user.id).order("olusturma_tarihi", { ascending: false });
    setTalepler(talepData || []);

    if (talepData && talepData.length > 0) {
      const talepIdleri = talepData.map((t: any) => t.id);
      const { data: teklifData } = await supabase.from("teklifler").select("*").in("talep_id", talepIdleri);
      setTeklifler(teklifData || []);
    }

    setYukleniyor(false);
  }

  async function cikisYap() {
    await supabase.auth.signOut();
    window.location.href = "/giris";
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif", display: "flex" }}>

      <div style={{ width: "220px", background: "#12103a", display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1e1b4b" }}>
          <a href="/" style={{ fontSize: "20px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>
            med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
          </a>
          <div style={{ fontSize: "11px", color: "#6b6fa8", marginTop: "4px" }}>Hasta Paneli</div>
        </div>

        {kullanici && (
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e1b4b" }}>
            <div style={{ width: "36px", height: "36px", background: "#534AB7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "14px", marginBottom: "8px" }}>
              {kullanici.ad?.[0]?.toUpperCase() || "H"}
            </div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>{kullanici.ad} {kullanici.soyad}</div>
            <div style={{ fontSize: "11px", color: "#6b6fa8" }}>{kullanici.email}</div>
          </div>
        )}

        <div style={{ padding: "20px 12px", flex: 1 }}>
          {[
            { id: "ozet", ad: "Genel Özet" },
            { id: "talepler", ad: "Teklif Taleplerim" },
            { id: "teklifler", ad: "Gelen Teklifler" },
            { id: "profil", ad: "Profilim" },
          ].map((m) => (
            <div key={m.id} onClick={() => setAktifMenu(m.id)} style={{ padding: "10px 12px", borderRadius: "8px", cursor: "pointer", marginBottom: "4px", background: aktifMenu === m.id ? "#534AB7" : "transparent", color: aktifMenu === m.id ? "#fff" : "#8b8fc8", fontSize: "13px" }}>
              {m.ad}
            </div>
          ))}
        </div>

        <div style={{ padding: "0 12px 20px" }}>
          <a href="/teklif" style={{ display: "block", textAlign: "center", background: "#534AB7", color: "#fff", padding: "10px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", marginBottom: "8px" }}>
            + Yeni Teklif Talebi
          </a>
          <button onClick={cikisYap} style={{ width: "100%", padding: "10px", background: "transparent", border: "1px solid #2a2a4e", borderRadius: "8px", color: "#8b8fc8", fontSize: "13px", cursor: "pointer" }}>
            Çıkış Yap
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: "32px", overflow: "auto" }}>
        {yukleniyor ? (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>Yükleniyor...</div>
        ) : (
          <>
            {aktifMenu === "ozet" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>
                  Hoş Geldiniz, {kullanici?.ad}! 👋
                </h1>
                <p style={{ fontSize: "14px", color: "#888", marginBottom: "28px" }}>Tedavi sürecinizi buradan takip edebilirsiniz.</p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
                  {[
                    { baslik: "Teklif Talebim", deger: talepler.length, renk: "#534AB7" },
                    { baslik: "Gelen Teklif", deger: teklifler.length, renk: "#0a7a3a" },
                    { baslik: "Bekleyen", deger: talepler.filter(t => t.durum === "beklemede").length, renk: "#BA7517" },
                  ].map((k) => (
                    <div key={k.baslik} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                      <div style={{ fontSize: "32px", fontWeight: 700, color: k.renk, marginBottom: "8px" }}>{k.deger}</div>
                      <div style={{ fontSize: "13px", color: "#888" }}>{k.baslik}</div>
                    </div>
                  ))}
                </div>

                {talepler.length === 0 && (
                  <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "48px", textAlign: "center" }}>
                    <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏥</div>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>Henüz teklif talebiniz yok</h3>
                    <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>İlk teklif talebinizi oluşturun ve kliniklerden fiyat alın.</p>
                    <a href="/teklif" style={{ background: "#534AB7", color: "#fff", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>
                      Teklif Talebi Oluştur
                    </a>
                  </div>
                )}
              </div>
            )}

            {aktifMenu === "talepler" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                  <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a" }}>Teklif Taleplerim</h1>
                  <a href="/teklif" style={{ background: "#534AB7", color: "#fff", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", textDecoration: "none" }}>+ Yeni Talep</a>
                </div>
                {talepler.length === 0 ? (
                  <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "48px", textAlign: "center" }}>
                    <div style={{ fontSize: "13px", color: "#888" }}>Henüz teklif talebiniz yok</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {talepler.map((t) => (
                      <div key={t.id} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <div style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{t.tedavi_turu}</div>
                            <div style={{ fontSize: "13px", color: "#888", marginBottom: "8px" }}>{t.aciklama}</div>
                            <div style={{ fontSize: "12px", color: "#888" }}>{new Date(t.olusturma_tarihi).toLocaleDateString("tr-TR")}</div>
                          </div>
                          <span style={{ fontSize: "11px", padding: "4px 12px", borderRadius: "20px", background: t.durum === "beklemede" ? "#fff8e1" : "#f0fff4", color: t.durum === "beklemede" ? "#BA7517" : "#0a7a3a" }}>
                            {t.durum}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {aktifMenu === "teklifler" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Gelen Teklifler</h1>
                {teklifler.length === 0 ? (
                  <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "48px", textAlign: "center" }}>
                    <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
                    <div style={{ fontSize: "13px", color: "#888" }}>Henüz gelen teklif yok. Teklif talebi oluşturduktan sonra klinikler size teklif gönderecek.</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {teklifler.map((t) => (
                      <div key={t.id} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <div style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{t.aciklama}</div>
                            <div style={{ fontSize: "12px", color: "#888" }}>{new Date(t.olusturma_tarihi).toLocaleDateString("tr-TR")}</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "22px", fontWeight: 700, color: "#534AB7" }}>{t.fiyat} {t.para_birimi}</div>
                            <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#fff8e1", color: "#BA7517" }}>{t.durum}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {aktifMenu === "profil" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Profilim</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "28px", maxWidth: "500px" }}>
                  {[
                    { etiket: "Ad", deger: kullanici?.ad },
                    { etiket: "Soyad", deger: kullanici?.soyad },
                    { etiket: "E-posta", deger: kullanici?.email },
                    { etiket: "Hesap Türü", deger: kullanici?.hesap_turu },
                  ].map((item) => (
                    <div key={item.etiket} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f5f5f5" }}>
                      <span style={{ fontSize: "13px", color: "#888" }}>{item.etiket}</span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#12103a" }}>{item.deger}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
