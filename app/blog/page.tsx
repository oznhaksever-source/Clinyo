"use client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Blog() {
  const { dil } = useDil();

  const icerik = {
    tr: {
      baslik: "Blog", altBaslik: "Sağlık turizmi hakkında güncel bilgiler ve rehberler",
      yaklindaBaslik: "Blog Yazıları Yakında",
      yaklindaAciklama: "Sağlık turizmi, tedavi rehberleri ve hasta deneyimleri hakkında faydalı içerikler çok yakında burada olacak.",
      kategoriler: ["Diş Tedavisi", "Saç Ekimi", "Göz Ameliyatı", "Hasta Deneyimleri", "Seyahat Rehberi"],
    },
    en: {
      baslik: "Blog", altBaslik: "Latest information and guides about health tourism",
      yaklindaBaslik: "Blog Posts Coming Soon",
      yaklindaAciklama: "Useful content about health tourism, treatment guides and patient experiences will be here soon.",
      kategoriler: ["Dental Treatment", "Hair Transplant", "Eye Surgery", "Patient Experiences", "Travel Guide"],
    },
    de: {
      baslik: "Blog", altBaslik: "Aktuelle Informationen und Leitfäden zum Gesundheitstourismus",
      yaklindaBaslik: "Blogbeiträge demnächst",
      yaklindaAciklama: "Nützliche Inhalte über Gesundheitstourismus, Behandlungsleitfäden und Patientenerfahrungen kommen bald.",
      kategoriler: ["Zahnbehandlung", "Haartransplantation", "Augenoperation", "Patientenerfahrungen", "Reiseführer"],
    },
  };

  const ic = icerik[dil];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      <Navbar />
      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "64px 32px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "42px", fontWeight: 700, marginBottom: "16px" }}>{ic.baslik}</h1>
        <p style={{ color: "#8b8fc8", fontSize: "16px" }}>{ic.altBaslik}</p>
      </section>

      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "64px 32px", textAlign: "center" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "64px", border: "1px solid #EEEDFE", marginBottom: "32px" }}>
          <div style={{ fontSize: "64px", marginBottom: "24px" }}>✍️</div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "12px" }}>{ic.yaklindaBaslik}</h2>
          <p style={{ fontSize: "14px", color: "#888", lineHeight: "1.7" }}>{ic.yaklindaAciklama}</p>
        </div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          {ic.kategoriler.map((k) => (
            <span key={k} style={{ background: "#EEEDFE", color: "#534AB7", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 500 }}>{k}</span>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
