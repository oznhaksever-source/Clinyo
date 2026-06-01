import { createClient } from "../../utils/supabase/server";
import type { Metadata } from "next";
import BlogListIstemci from "./BlogListIstemci";

export const metadata: Metadata = {
  title: "Blog | Medoqa - Health Tourism Guides",
  description: "Expert guides on hair transplant, dental treatment, eye surgery and plastic surgery in Turkey. Scientific, up-to-date articles for health tourists.",
  openGraph: {
    title: "Medoqa Blog - Health Tourism Guides",
    description: "Expert guides on hair transplant, dental treatment, eye surgery and plastic surgery.",
    url: "https://www.medoqa.com/blog",
    siteName: "Medoqa",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.medoqa.com/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.medoqa.com/blog" },
};

export default async function BlogPage() {
  const supabase = createClient();
  const { data: yazilar } = await supabase
    .from("blog_yazilari")
    .select("*")
    .eq("yayin", true)
    .order("tarih", { ascending: false });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Medoqa Blog",
    "description": "Health tourism guides and expert advice",
    "url": "https://www.medoqa.com/blog",
    "publisher": { "@type": "Organization", "name": "Medoqa", "url": "https://www.medoqa.com" }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Google için görünür içerik */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        <h1>Medoqa Blog - Health Tourism Guides</h1>
        <ul>
          {(yazilar || []).map((y: any) => (
            <li key={y.slug}>
              <a href={`/blog/${y.slug}`}>{y.baslik_en || y.baslik_tr}</a>
              <p>{y.ozet_en || y.ozet_tr}</p>
            </li>
          ))}
        </ul>
      </div>
      <BlogListIstemci yazilar={yazilar || []} />
    </>
  );
}
