"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogPage() {
  const { dil } = useDil();
  const [yazilar, setYazilar] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const d = dil as string;

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("blog_yazilari")
      .select("slug, emoji, tarih, baslik_tr, baslik_en, baslik_de, baslik_ar, baslik_ru, baslik_fr, ozet_tr, ozet_en, ozet_de, ozet_ar, ozet_ru, ozet_fr")
      .eq("yayin", true)
      .order("tarih", { ascending: false })
      .then(({ data }) => {
        setYazilar(data || []);
        setYukleniyor(false);
      });
  }, []);

  const m: Record<string, any> = {
    tr: { baslik: "Blog", alt: "Sağlık turizmi rehberleri ve uzman tavsiyeleri", yok: "Henüz yazı yok." },
    en: { baslik: "Blog", alt: "Health tourism guides and expert advice", yok: "No posts yet." },
    de: { baslik: "Blog", alt: "Gesundheitstourismus-Ratgeber", yok: "Noch keine Beiträge." },
    ar: { baslik: "المدونة", alt: "أدلة السياحة الصحية", yok: "لا توجد مقالات بعد." },
    ru: { baslik: "Блог", alt: "Руководства по медицинскому туризму", yok: "Пока нет статей." },
    fr: { baslik: "Blog", alt: "Guides de tourisme médical", yok: "Pas encore d articles." },
  };

  const ic = m[d] || m.en;
  const baslik = (y: any) => y[`baslik_${d}`] || y.baslik_en || y.baslik_tr || "";
  const ozet = (y: any) => y[`ozet_${d}`] || y.ozet_en || y.ozet_tr || "";

  return (
    <main style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8f9ff" }}>
      <Navbar />
      <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: "64px 16px 48px", textAlign: "center" }}>
        <h1 style={{ fontSize: "40px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>{ic.baslik}</h1>
        <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)" }}>{ic.alt}</p>
      </section>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 16px" }}>
        {yukleniyor && (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>...</div>
        )}
        {!yukleniyor && yazilar.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px", background: "#fff", borderRadius: "20px", border: "1px solid #e8e6ff", color: "#888" }}>{ic.yok}</div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {yazilar.map(yazi => (
            <a key={yazi.slug} href={`/blog/${yazi.slug}`}
              style={{ background: "#fff", borderRadius: "20px", border: "1px solid #e8e6ff", overflow: "hidden", textDecoration: "none", display: "block" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#534AB7"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#e8e6ff"}>
              <div style={{ padding: "28px 32px" }}>
                <div style={{ display: "flex", gap: "12px", marginBottom: "10px", alignItems: "center" }}>
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
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
