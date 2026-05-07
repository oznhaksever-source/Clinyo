"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

export default function HastaPanel() {
  const [aktifMenu, setAktifMenu] = useState("ozet");
  const [kullanici, setKullanici] = useState<any>(null);
  const [talepler, setTalepler] = useState<any[]>([]);
  const [teklifler, setTeklifler] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [mesaj, setMesaj] = useState("");

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
      const { data: teklifData } = await supabase.from("teklifler")
        .select("*, profiles!teklifler_klinik_id_fkey(ad, soyad, konum_adres)")
        .in("talep_id", talepIdleri)
        .order("olusturma_tarihi", { ascending: false });
      setTeklifler(teklifData || []);
    }

    setYukleniyor(false);
  }

  async function teklifOnayla(teklifId: string, klinikId: string) {
    if (!confirm("Bu teklifi onaylamak istediğinize emin misiniz? Ödeme süreci başlayacaktır.")) return;
    
    const { error: teklifError } = await supabase.from("teklifler").update({ durum: "onaylandi" }).eq("id", teklifId);
    if (teklifError) { setMesaj("Hata: " + teklifError.message); return; }

    const { data: { user } } = await supabase.auth.getUser();
    if (user && klinikId) {
      const { error: mesajError } = await supabase.from("mesajlar").insert({
        gonderen_id: user.id,
        alici_id: klinikId,
        mesaj: "Merhaba, teklifinizi onayladım. Tedavi süreci hakkında bilgi almak istiyorum.",
        okundu: false,
      });
      if (mesajError) { 
        setMesaj("Teklif onaylandı fakat mesaj gönderilemedi: " + mesajError.message); 
        setTimeout(() => setMesaj(""), 6000);
        veriYukle();
        return;
      }
    }
    setMesaj("✅ Teklif onaylandı! Klinik ile mesajlaşma başlatıldı.");
    setTimeout(() => setMesaj(""), 4000);
    veriYukle();
  }

  async function teklifReddet(teklifId: string) {
    if (!confirm("Bu teklifi reddetmek istediğinize emin misiniz?")) return;
    await supabase.from("teklifler").update({ durum: "reddedildi" }).eq("id", teklifId);
    veriYukle();
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
{ id: "mesajlar", ad: "💬 Mesajlar" },
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
        {mesaj && (
          <div style={{ background: mesaj.includes("Hata") ? "#fff0f0" : "#f0fff4", border: `1px solid ${mesaj.includes("Hata") ? "#fcc" : "#9f9"}`, borderRadius: "8px", padding: "10px 16px", marginBottom: "16px", fontSize: "13px", color: mesaj.includes("Hata") ? "#c00" : "#0a7a3a" }}>
            {mesaj}
          </div>
        )}
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {teklifler.map((t) => (
                      <div key={t.id} style={{ background: "#fff", border: `2px solid ${t.durum === "onaylandi" ? "#059669" : t.durum === "reddedildi" ? "#fcc" : "#EEEDFE"}`, borderRadius: "16px", padding: "24px" }}>
                        
                        {/* Üst kısım - Klinik bilgisi */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>
                              🏥 {t.profiles?.ad} {t.profiles?.soyad}
                            </div>
                            {t.profiles?.konum_adres && (
                              <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "6px" }}>📍 {t.profiles.konum_adres}</div>
                            )}
                            {t.aciklama && (
                              <div style={{ fontSize: "13px", color: "#64748b" }}>{t.aciklama}</div>
                            )}
                          </div>
                          <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "20px", flexShrink: 0, marginLeft: "12px",
                            background: t.durum === "onaylandi" ? "#f0fff4" : t.durum === "reddedildi" ? "#fff0f0" : "#fff8e1",
                            color: t.durum === "onaylandi" ? "#059669" : t.durum === "reddedildi" ? "#c00" : "#BA7517",
                            fontWeight: 600
                          }}>
                            {t.durum === "onaylandi" ? "✅ Onaylandı" : t.durum === "reddedildi" ? "❌ Reddedildi" : "⏳ Beklemede"}
                          </span>
                        </div>

                        {/* Fiyat detayları */}
                        <div style={{ background: "#f8f9ff", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                            <span style={{ fontSize: "13px", color: "#64748b" }}>💊 Tedavi Ücreti</span>
                            <span style={{ fontSize: "15px", fontWeight: 700, color: "#534AB7" }}>{t.fiyat} EUR</span>
                          </div>
                          {t.otel_dahil && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                              <span style={{ fontSize: "13px", color: "#64748b" }}>🏨 Otel — {t.otel_aciklama}</span>
                              <span style={{ fontSize: "14px", fontWeight: 600, color: "#059669" }}>{t.otel_fiyat} EUR</span>
                            </div>
                          )}
                          {t.transfer_dahil && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                              <span style={{ fontSize: "13px", color: "#64748b" }}>🚗 Transfer — {t.transfer_aciklama}</span>
                              <span style={{ fontSize: "14px", fontWeight: 600, color: "#059669" }}>{t.transfer_fiyat} EUR</span>
                            </div>
                          )}
                          {(t.otel_dahil || t.transfer_dahil) && (
                            <>
                              <div style={{ borderTop: "1px solid #EEEDFE", margin: "8px 0" }} />
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: "14px", fontWeight: 700, color: "#0f0d2e" }}>💰 Toplam</span>
                                <span style={{ fontSize: "18px", fontWeight: 800, color: "#534AB7" }}>{t.toplam_fiyat} EUR</span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Tarih */}
                        <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "16px" }}>
                          {new Date(t.olusturma_tarihi).toLocaleDateString("tr-TR")}
                        </div>

                        {/* Butonlar */}
                        {t.durum === "beklemede" && (
                          <div style={{ display: "flex", gap: "10px" }}>
                            <button onClick={() => teklifOnayla(t.id, t.klinik_id)} style={{ flex: 2, background: "#059669", color: "#fff", border: "none", padding: "12px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: 700 }}>
                              ✅ Teklifi Onayla
                            </button>
                            <button onClick={() => teklifReddet(t.id)} style={{ flex: 1, background: "#fff0f0", color: "#c00", border: "1px solid #fcc", padding: "12px", borderRadius: "10px", fontSize: "13px", cursor: "pointer", fontWeight: 600 }}>
                              ❌ Reddet
                            </button>
                            <a href="/mesajlar" style={{ flex: 1, background: "#f0eeff", color: "#534AB7", border: "1px solid #EEEDFE", padding: "12px", borderRadius: "10px", fontSize: "13px", cursor: "pointer", fontWeight: 600, textDecoration: "none", textAlign: "center" as const, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              💬 Sor
                            </a>
                          </div>
                        )}
                        {t.durum === "onaylandi" && (
                          <a href="/mesajlar" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "#534AB7", color: "#fff", padding: "12px", borderRadius: "10px", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>
                            💬 Klinik ile Mesajlaş
                          </a>
                        )}
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
          {aktifMenu === "mesajlar" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>💬 Mesajlar</h1>
                <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px" }}>Kliniklerle mesajlaşmak için mesajlar sayfasını kullanın.</p>
                <a href="/mesajlar" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#534AB7", color: "#fff", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>
                  💬 Mesajlar Sayfasına Git →
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
