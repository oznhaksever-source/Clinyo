"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogPage() {
  const { dil } = useDil();
  const [yazilар, setYazilar] = useState<any[]>([]);
  const [seciliYazi, setSeciliYazi] = useState<any>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const supabase = createClient();

  const d = dil as string;

  useEffect(() => {
    async function veriYukle() {
      setYukleniyor(true);
      const { data } = await supabase
        .from("blog_yazilari")
        .select("*")
        .eq("yayin", true)
        .order("tarih", { ascending: false });
      setYazilar(data || []);
      setYukleniyor(false);
    }
    veriYukle();
  }, []);

  const metinler: Record<string, any> = {
    tr: { baslik: "Blog", alt: "Sağlık turizmi rehberleri ve uzman tavsiyeleri", geri: "← Tüm Yazılar", yukleniyor: "Yükleniyor...", yok: "Henüz yazı yok.", okuma: "dk okuma", teklifBtn: "Ücretsiz Teklif Al", teklifAlt: "Ücretsiz teklif almaya hazır mısınız?" },
    en: { baslik: "Blog", alt: "Health tourism guides and expert advice", geri: "← All Posts", yukleniyor: "Loading...", yok: "No posts yet.", okuma: "min read", teklifBtn: "Get Free Quote", teklifAlt: "Ready to get a free quote?" },
    de: { baslik: "Blog", alt: "Gesundheitstourismus-Ratgeber und Expertenratschläge", geri: "← Alle Beiträge", yukleniyor: "Wird geladen...", yok: "Noch keine Beiträge.", okuma: "Min. Lesezeit", teklifBtn: "Kostenloses Angebot", teklifAlt: "Bereit für ein kostenloses Angebot?" },
    ar: { baslik: "المدونة", alt: "أدلة السياحة الصحية ونصائح الخبراء", geri: "→ جميع المقالات", yukleniyor: "جارٍ التحميل...", yok: "لا توجد مقالات بعد.", okuma: "دقائق قراءة", teklifBtn: "احصل على عرض مجاني", teklifAlt: "هل أنت مستعد للحصول على عرض مجاني؟" },
    ru: { baslik: "Блог", alt: "Руководства по медицинскому туризму и советы экспертов", geri: "← Все статьи", yukleniyor: "Загрузка...", yok: "Пока нет статей.", okuma: "мин чтения", teklifBtn: "Получить предложение", teklifAlt: "Готовы получить бесплатное предложение?" },
    fr: { baslik: "Blog", alt: "Guides de tourisme médical et conseils d'experts", geri: "← Tous les articles", yukleniyor: "Chargement...", yok: "Pas encore d'articles.", okuma: "min de lecture", teklifBtn: "Obtenir un devis", teklifAlt: "Prêt à obtenir un devis gratuit?" },
  };

  const m = metinler[d] || metinler.en;

  function baslik(yazi: any) { return yazi[`baslik_${d}`] || yazi.baslik_en || yazi.baslik_tr || ""; }
  function ozet(yazi: any) { return yazi[`ozet_${d}`] || yazi.ozet_en || yazi.ozet_tr || ""; }
  function icerik(yazi: any) { return yazi[`icerik_${d}`] || yazi.icerik_en || yazi.icerik_tr || ""; }

  function renderIcerik(metin: string) {
    if (!metin) return null;
    return metin.replace(/\\n/g, "\n").split("\n").map((satir, i) => {
      if (satir.startsWith("## ")) return (
        <h2 key={i} style={{ fontSize: "22px", fontWeight: 700, color: "#0f0d2e", margin: "32px 0 12px" }}>{satir.replace("## ", "")}</h2>
      );
      if (satir.startsWith("- ")) return (
        <li key={i} style={{ fontSize: "15px", color: "#475569", lineHeight: 1.8, marginBottom: "6px", marginLeft: "20px" }}>{satir.replace("- ", "")}</li>
      );
      if (satir.trim() === "") return <div key={i} style={{ height: "8px" }} />;
      return <p key={i} style={{ fontSize: "16px", color: "#475569", lineHeight: 1.85, marginBottom: "12px" }}>{satir}</p>;
    });
  }

  return (
    <main style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8f9ff" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: "64px 16px 48px", textAlign: "center" }}>
        <h1 style={{ fontSize: "40px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>{m.baslik}</h1>
        <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)" }}>{m.alt}</p>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 16px" }}>

        {/* Yükleniyor */}
        {yukleniyor && (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>{m.yukleniyor}</div>
        )}

        {/* Yazı listesi */}
        {!yukleniyor && !seciliYazi && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {yazilар.length === 0 && (
              <div style={{ textAlign: "center", padding: "64px", background: "#fff", borderRadius: "20px", border: "1px solid #e8e6ff", color: "#888" }}>{m.yok}</div>
            )}
            {yazilар.map(yazi => (
              <div key={yazi.id} onClick={() => setSeciliYazi(yazi)}
                style={{ background: "#fff", borderRadius: "20px", border: "1px solid #e8e6ff", cursor: "pointer", transition: "all 0.2s", overflow: "hidden" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#534AB7"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#e8e6ff"}>
                {yazi.kapak_gorsel && (
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img src={yazi.kapak_gorsel} alt={baslik(yazi)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                <div style={{ padding: "28px 32px" }}>
                  <div style={{ display: "flex", gap: "12px", marginBottom: "10px", flexWrap: "wrap", alignItems: "center" }}>
                    {yazi.emoji && <span style={{ fontSize: "28px" }}>{yazi.emoji}</span>}
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>{yazi.tarih}</span>
                  </div>
                  <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#0f0d2e", marginBottom: "10px", lineHeight: 1.4 }}>
                    {baslik(yazi)}
                  </h2>
                  <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                    {ozet(yazi)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Yazı detayı */}
        {!yukleniyor && seciliYazi && (
          <div>
            <button onClick={() => setSeciliYazi(null)} style={{ background: "none", border: "none", color: "#534AB7", fontSize: "14px", cursor: "pointer", marginBottom: "24px", fontWeight: 600, padding: 0 }}>
              {m.geri}
            </button>
            <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #e8e6ff", overflow: "hidden" }}>
              {seciliYazi.kapak_gorsel && (
                <div style={{ height: "320px", overflow: "hidden" }}>
                  <img src={seciliYazi.kapak_gorsel} alt={baslik(seciliYazi)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div style={{ padding: "40px" }}>
                <div style={{ display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center" }}>
                  {seciliYazi.emoji && <span style={{ fontSize: "36px" }}>{seciliYazi.emoji}</span>}
                  <span style={{ fontSize: "13px", color: "#94a3b8" }}>{seciliYazi.tarih}</span>
                </div>
                <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#0f0d2e", marginBottom: "24px", lineHeight: 1.3 }}>
                  {baslik(seciliYazi)}
                </h1>
                {ozet(seciliYazi) && (
                  <p style={{ fontSize: "18px", color: "#64748b", lineHeight: 1.7, marginBottom: "32px", paddingBottom: "24px", borderBottom: "2px solid #f0eeff" }}>
                    {ozet(seciliYazi)}
                  </p>
                )}
                <div>{renderIcerik(icerik(seciliYazi))}</div>

                {/* CTA */}
                <div style={{ marginTop: "48px", background: "#534AB7", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "20px", marginBottom: "8px" }}>{m.teklifAlt}</p>
                  <a href="/teklif" style={{ display: "inline-block", background: "#fff", color: "#534AB7", padding: "12px 32px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", fontWeight: 700, marginTop: "12px" }}>
                    {m.teklifBtn}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
