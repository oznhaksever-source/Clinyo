"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import { useDil } from "../../locales/context";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function BlogYaziSayfasi({ params }: { params: { slug: string } }) {
  const [yazi, setYazi] = useState<any>(null);
  const [digerYazilar, setDigerYazilar] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const { dil } = useDil();
  const supabase = createClient();
  const d = dil as string;

  useEffect(() => {
    async function veriYukle() {
      setYukleniyor(true);
      const { data } = await supabase
        .from("blog_yazilari")
        .select("*")
        .eq("slug", params.slug)
        .eq("yayin", true)
        .single();
      setYazi(data);

      const { data: diger } = await supabase
        .from("blog_yazilari")
        .select("slug, emoji, baslik_tr, baslik_en, baslik_de, baslik_ar, baslik_ru, baslik_fr, tarih")
        .eq("yayin", true)
        .neq("slug", params.slug)
        .limit(3);
      setDigerYazilar(diger || []);
      setYukleniyor(false);
    }
    veriYukle();
  }, [params.slug]);

  // Dile göre alan seç
  function alan(yazi: any, key: string) {
    return yazi?.[`${key}_${d}`] || yazi?.[`${key}_en`] || yazi?.[`${key}_tr`] || "";
  }

  function renderIcerik(metin: string) {
    if (!metin) return null;
    return metin.replace(/\\n/g, "\n").split("\n").map((satir, i) => {
      if (satir.startsWith("## ")) return (
        <h2 key={i} style={{ fontSize: "22px", fontWeight: 700, color: "#0f0d2e", margin: "32px 0 12px" }}>
          {satir.replace("## ", "")}
        </h2>
      );
      if (satir.startsWith("- ")) return (
        <li key={i} style={{ fontSize: "15px", color: "#475569", lineHeight: 1.8, marginBottom: "6px", marginLeft: "20px" }}>
          {satir.replace("- ", "")}
        </li>
      );
      if (satir.trim() === "") return <div key={i} style={{ height: "8px" }} />;
      return <p key={i} style={{ fontSize: "16px", color: "#475569", lineHeight: 1.85, marginBottom: "12px" }}>{satir}</p>;
    });
  }

  const geriBtn: Record<string, string> = {
    tr: "← Tüm Yazılar", en: "← All Posts", de: "← Alle Beiträge",
    ar: "→ جميع المقالات", ru: "← Все статьи", fr: "← Tous les articles",
  };
  const teklifBaslik: Record<string, string> = {
    tr: "Ücretsiz teklif almaya hazır mısınız?", en: "Ready to get a free quote?",
    de: "Bereit für ein kostenloses Angebot?", ar: "هل أنت مستعد للحصول على عرض مجاني؟",
    ru: "Готовы получить бесплатное предложение?", fr: "Prêt à obtenir un devis gratuit?",
  };
  const teklifAlt: Record<string, string> = {
    tr: "Türkiye'deki onaylı kliniklerden kişisel teklif alın.", en: "Get personalized quotes from verified clinics in Turkey.",
    de: "Erhalten Sie Angebote von verifizierten Kliniken.", ar: "احصل على عروض من العيادات المعتمدة في تركيا.",
    ru: "Получите персональные предложения от клиник Турции.", fr: "Obtenez des devis de cliniques vérifiées en Turquie.",
  };
  const teklifBtn: Record<string, string> = {
    tr: "Ücretsiz Teklif Al", en: "Get Free Quote", de: "Kostenloses Angebot",
    ar: "احصل على عرض مجاني", ru: "Получить предложение", fr: "Obtenir un devis",
  };
  const ilgiliBaslik: Record<string, string> = {
    tr: "İlgili Yazılar", en: "Related Articles", de: "Verwandte Artikel",
    ar: "مقالات ذات صلة", ru: "Похожие статьи", fr: "Articles similaires",
  };

  return (
    <main style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8f9ff" }}>
      <Navbar />

      {yukleniyor ? (
        <div style={{ textAlign: "center", padding: "120px", color: "#888" }}>...</div>
      ) : !yazi ? (
        <div style={{ textAlign: "center", padding: "120px" }}>
          <h1 style={{ color: "#0f0d2e" }}>404</h1>
          <a href="/blog" style={{ color: "#534AB7" }}>{geriBtn[d] || geriBtn.en}</a>
        </div>
      ) : (
        <>
          {/* Hero */}
          <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: "64px 16px 48px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <a href="/blog" style={{ color: "#7F77DD", fontSize: "14px", textDecoration: "none", display: "inline-block", marginBottom: "20px" }}>
                {geriBtn[d] || geriBtn.en}
              </a>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                {yazi.emoji && <span style={{ fontSize: "36px" }}>{yazi.emoji}</span>}
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>{yazi.tarih}</span>
              </div>
              <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: "16px" }}>
                {alan(yazi, "baslik")}
              </h1>
              {alan(yazi, "ozet") && (
                <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                  {alan(yazi, "ozet")}
                </p>
              )}
            </div>
          </section>

          {/* İçerik */}
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 16px" }}>
            <div style={{ background: "#fff", borderRadius: "20px", padding: "40px", border: "1px solid #e8e6ff", marginBottom: "32px" }}>
              {renderIcerik(alan(yazi, "icerik"))}
            </div>

            {/* CTA */}
            <div style={{ background: "#534AB7", borderRadius: "16px", padding: "32px", textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "22px", marginBottom: "8px" }}>
                {teklifBaslik[d] || teklifBaslik.en}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "20px" }}>
                {teklifAlt[d] || teklifAlt.en}
              </p>
              <a href="/teklif" style={{ display: "inline-block", background: "#fff", color: "#534AB7", padding: "12px 32px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", fontWeight: 700 }}>
                {teklifBtn[d] || teklifBtn.en}
              </a>
            </div>

            {/* Diğer yazılar */}
            {digerYazilar.length > 0 && (
              <div>
                <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#0f0d2e", marginBottom: "20px" }}>
                  {ilgiliBaslik[d] || ilgiliBaslik.en}
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                  {digerYazilar.map((d2: any) => (
                    <a key={d2.slug} href={`/blog/${d2.slug}`}
                      style={{ background: "#fff", borderRadius: "14px", padding: "20px", border: "1px solid #e8e6ff", textDecoration: "none", display: "block" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#534AB7"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#e8e6ff"}>
                      <div style={{ fontSize: "28px", marginBottom: "10px" }}>{d2.emoji}</div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f0d2e", lineHeight: 1.4 }}>
                        {d2[`baslik_${d}`] || d2.baslik_en || d2.baslik_tr}
                      </div>
                      <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "6px" }}>{d2.tarih}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
      <Footer />
    </main>
  );
}
