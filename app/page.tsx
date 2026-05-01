"use client";
import { useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function AnaSayfa() {
  const [klinikler, setKlinikler] = useState<any[]>([]);
  const [oteller, setOteller] = useState<any[]>([]);
  const [istatistik, setIstatistik] = useState({ klinik: 0, hasta: 0, otel: 0, transfer: 0 });
  const [yukleniyor, setYukleniyor] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function veriYukle() {
      const { data: klinikData } = await supabase.from("profiles").select("id, ad, soyad, kapak_fotograf, konum_adres, tanitim_yazisi").eq("hesap_turu", "klinik").eq("onaylandi", true).eq("askida", false).limit(6);
      const { data: otelData } = await supabase.from("profiles").select("id, ad, soyad, kapak_fotograf, konum_adres, tanitim_yazisi").eq("hesap_turu", "otel").eq("onaylandi", true).eq("askida", false).limit(3);
      const { count: klinikCount } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "klinik").eq("onaylandi", true);
      const { count: hastaCount } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "hasta");
      const { count: otelCount } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "otel").eq("onaylandi", true);
      const { count: transferCount } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "transfer").eq("onaylandi", true);

      setKlinikler(klinikData || []);
      setOteller(otelData || []);
      setIstatistik({ klinik: klinikCount || 0, hasta: hastaCount || 0, otel: otelCount || 0, transfer: transferCount || 0 });
      setYukleniyor(false);
    }
    veriYukle();
  }, []);

  const tedaviler = [
    { icon: "🦷", ad: "Diş Tedavisi", aciklama: "İmplant, zirkonyum, estetik diş" },
    { icon: "💇", ad: "Saç Ekimi", aciklama: "FUE, DHI, Safir yöntemleri" },
    { icon: "👁️", ad: "Göz Ameliyatı", aciklama: "Lasik, Laser, lens tedavileri" },
    { icon: "👃", ad: "Plastik Cerrahi", aciklama: "Burun, yüz ve vücut estetiği" },
    { icon: "❤️", ad: "Check-Up", aciklama: "Kapsamlı sağlık taraması" },
    { icon: "🦴", ad: "Ortopedi", aciklama: "Diz, kalça ve omurga tedavisi" },
  ];

  return (
    <main style={{ minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 60%, #2d1b69 100%)", padding: "80px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ fontSize: "13px", color: "#7F77DD", fontWeight: 600, marginBottom: "16px", letterSpacing: "2px" }}>SAĞLIK TURİZMİ PLATFORMU</div>
          <h1 style={{ fontSize: "48px", fontWeight: 800, color: "#fff", marginBottom: "20px", lineHeight: 1.2 }}>
            En İyi <span style={{ color: "#7F77DD" }}>Sağlık</span> Teklifleri
          </h1>
          <p style={{ fontSize: "18px", color: "#8b8fc8", marginBottom: "40px", lineHeight: 1.6 }}>
            Diş tedavisinden saç ekimine, göz ameliyatından plastik cerrahiye kadar binlerce hastanın tercih ettiği platform.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/teklif" style={{ background: "#534AB7", color: "#fff", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", fontWeight: 700 }}>
              Ücretsiz Teklif Al
            </a>
            <a href="/klinikler" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", fontWeight: 600, border: "1px solid rgba(255,255,255,0.2)" }}>
              Klinikleri Keşfet
            </a>
          </div>
        </div>
      </section>

      {/* İstatistikler */}
      <section style={{ background: "#534AB7", padding: "32px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", textAlign: "center" }}>
          {[
            { sayi: istatistik.klinik, etiket: "Onaylı Klinik" },
            { sayi: istatistik.hasta, etiket: "Kayıtlı Hasta" },
            { sayi: istatistik.otel, etiket: "Partner Otel" },
            { sayi: istatistik.transfer, etiket: "Transfer Firması" },
          ].map((s) => (
            <div key={s.etiket}>
              <div style={{ fontSize: "36px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>{s.sayi}+</div>
              <div style={{ fontSize: "13px", color: "#CECBF6" }}>{s.etiket}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tedavi Kategorileri */}
      <section style={{ padding: "64px 32px", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#12103a", marginBottom: "12px" }}>Tedavi Kategorileri</h2>
            <p style={{ fontSize: "15px", color: "#888" }}>İhtiyacınıza uygun tedaviyi seçin ve kliniklerden teklif alın</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {tedaviler.map((t) => (
              <a key={t.ad} href="/teklif" style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", textDecoration: "none", display: "flex", alignItems: "center", gap: "16px", transition: "box-shadow 0.2s" }}>
                <div style={{ fontSize: "36px" }}>{t.icon}</div>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{t.ad}</div>
                  <div style={{ fontSize: "12px", color: "#888" }}>{t.aciklama}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Öne Çıkan Klinikler */}
      <section style={{ padding: "64px 32px", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
            <div>
              <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>Öne Çıkan Klinikler</h2>
              <p style={{ fontSize: "14px", color: "#888" }}>Admin tarafından onaylanmış güvenilir klinikler</p>
            </div>
            <a href="/klinikler" style={{ color: "#534AB7", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>Tümünü Gör →</a>
          </div>
          {yukleniyor ? (
            <div style={{ textAlign: "center", padding: "32px", color: "#888" }}>Yükleniyor...</div>
          ) : klinikler.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px", color: "#888", background: "#f9fafb", borderRadius: "12px" }}>Henüz onaylı klinik bulunmuyor</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {klinikler.map((k) => (
                <a key={k.id} href={`/klinik/${k.id}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                    {k.kapak_fotograf ? (
                      <img src={k.kapak_fotograf} alt={k.ad} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "160px", background: "linear-gradient(135deg, #EEEDFE, #CECBF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>🏥</div>
                    )}
                    <div style={{ padding: "16px" }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", marginBottom: "6px" }}>{k.ad} {k.soyad}</h3>
                      {k.konum_adres && <p style={{ fontSize: "12px", color: "#888", marginBottom: "6px" }}>📍 {k.konum_adres}</p>}
                      {k.tanitim_yazisi && <p style={{ fontSize: "12px", color: "#666", lineHeight: "1.5" }}>{k.tanitim_yazisi.slice(0, 70)}...</p>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Oteller */}
      {oteller.length > 0 && (
        <section style={{ padding: "64px 32px", background: "#f9fafb" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <div>
                <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>Partner Oteller</h2>
                <p style={{ fontSize: "14px", color: "#888" }}>Tedaviniz süresince konaklamak için en iyi oteller</p>
              </div>
              <a href="/oteller" style={{ color: "#534AB7", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>Tümünü Gör →</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {oteller.map((o) => (
                <a key={o.id} href={`/otel/${o.id}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                    {o.kapak_fotograf ? (
                      <img src={o.kapak_fotograf} alt={o.ad} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "160px", background: "linear-gradient(135deg, #EEEDFE, #CECBF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>🏨</div>
                    )}
                    <div style={{ padding: "16px" }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", marginBottom: "6px" }}>{o.ad} {o.soyad}</h3>
                      {o.konum_adres && <p style={{ fontSize: "12px", color: "#888" }}>📍 {o.konum_adres}</p>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nasıl Çalışır */}
      <section style={{ padding: "64px 32px", background: "#12103a" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>Nasıl Çalışır?</h2>
          <p style={{ fontSize: "15px", color: "#8b8fc8", marginBottom: "48px" }}>3 adımda tedavinizi planlayın</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              { adim: "1", baslik: "Teklif Talebi Oluştur", aciklama: "Tedavinizi seçin ve ücretsiz teklif talebinizi gönderin", icon: "📋" },
              { adim: "2", baslik: "Teklifleri Karşılaştır", aciklama: "Onaylı kliniklerden gelen teklifleri inceleyin", icon: "⚖️" },
              { adim: "3", baslik: "Tedavinizi Planlayın", aciklama: "Kliniği seçin, otel ve transfer ayarlayın", icon: "✈️" },
            ].map((a) => (
              <div key={a.adim} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "28px" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{a.icon}</div>
                <div style={{ fontSize: "12px", color: "#7F77DD", fontWeight: 700, marginBottom: "8px" }}>ADIM {a.adim}</div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>{a.baslik}</div>
                <div style={{ fontSize: "13px", color: "#8b8fc8", lineHeight: "1.6" }}>{a.aciklama}</div>
              </div>
            ))}
          </div>
          <a href="/teklif" style={{ display: "inline-block", background: "#534AB7", color: "#fff", padding: "14px 40px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", fontWeight: 700, marginTop: "40px" }}>
            Hemen Başla →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
