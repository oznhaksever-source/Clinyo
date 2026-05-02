"use client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Tedaviler() {
  const { dil } = useDil();

  const icerik = {
    tr: {
      baslik: "Tedavi Kategorileri",
      altBaslik: "İhtiyacınıza uygun tedaviyi seçin ve onaylı kliniklerden ücretsiz teklif alın",
      teklifAl: "Ücretsiz Teklif Al →",
      kategoriler: [
        {
          foto: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop",
          baslik: "Diş Tedavisi",
          aciklama: "Diş implantından zirkonyum kaplamaya, diş beyazlatmadan ortodontiye kadar kapsamlı diş tedavileri. Uzman diş hekimleri eşliğinde estetik ve sağlıklı gülüşünüze kavuşun.",
          tedaviler: ["İmplant", "Zirkonyum Kaplama", "Lamine Veneer", "Diş Beyazlatma", "Kanal Tedavisi", "Ortodonti", "All-on-4 / All-on-6", "Gülüş Tasarımı"],
          renk: "#0891B2",
        },
        {
          foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=400&fit=crop",
          baslik: "Saç Ekimi",
          aciklama: "FUE, DHI ve Safir yöntemleriyle kalıcı saç ekimi çözümleri. Uzman ekipler eşliğinde doğal görünümlü ve kalıcı sonuçlar.",
          tedaviler: ["FUE Saç Ekimi", "DHI Saç Ekimi", "Safir FUE", "Sakal Ekimi", "Kaş Ekimi", "PRP Tedavisi"],
          renk: "#7C3AED",
        },
        {
          foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
          baslik: "Göz Ameliyatı",
          aciklama: "Lasik, Lasek ve lens tedavileriyle kalıcı görüş çözümleri. Gözlük ve lens bağımlılığından kurtulun.",
          tedaviler: ["Lasik", "Lasek", "PRK", "Smile Pro", "Göz İçi Lens", "Katarakt Ameliyatı"],
          renk: "#059669",
        },
        {
          foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=400&fit=crop",
          baslik: "Plastik Cerrahi",
          aciklama: "Yüz, burun ve vücut estetiğinde uzman klinikler. Kendinizi en iyi hissetmeniz için profesyonel destek.",
          tedaviler: ["Burun Estetiği", "Yüz Germe", "Göz Kapağı Estetiği", "Meme Büyütme", "Liposuction", "Karın Germe", "Botoks", "Dolgu"],
          renk: "#DC2626",
        },
        {
          foto: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop",
          baslik: "Genel Sağlık & Check-Up",
          aciklama: "Kapsamlı check-up ve genel sağlık hizmetleri. Erken teşhis, sağlıklı yaşam. Uzman doktorlar eşliğinde eksiksiz sağlık taraması.",
          tedaviler: ["Temel Check-Up", "Kapsamlı Check-Up", "Kardiyoloji", "Onkoloji Taraması", "Dermatoloji", "Gastroloji"],
          renk: "#D97706",
        },
        {
          foto: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=400&fit=crop",
          baslik: "Ortopedi",
          aciklama: "Diz, kalça ve omurga tedavilerinde uzman klinikler. Ağrısız ve aktif bir yaşam için doğru tedaviyi bulun.",
          tedaviler: ["Diz Protezi", "Kalça Protezi", "Omurga Cerrahisi", "Spor Yaralanmaları", "Artroskopi"],
          renk: "#4F46E5",
        },
      ],
    },
    en: {
      baslik: "Treatment Categories",
      altBaslik: "Choose the right treatment and get free quotes from verified clinics",
      teklifAl: "Get Free Quote →",
      kategoriler: [
        {
          foto: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop",
          baslik: "Dental Treatment",
          aciklama: "Comprehensive dental treatments from implants to zirconia crowns, teeth whitening to orthodontics. Achieve your aesthetic and healthy smile with expert dentists.",
          tedaviler: ["Implant", "Zirconia Crown", "Laminate Veneer", "Teeth Whitening", "Root Canal", "Orthodontics", "All-on-4 / All-on-6", "Smile Design"],
          renk: "#0891B2",
        },
        {
          foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=400&fit=crop",
          baslik: "Hair Transplant",
          aciklama: "Permanent hair transplant solutions with FUE, DHI and Sapphire methods. Natural-looking and permanent results with expert teams.",
          tedaviler: ["FUE Hair Transplant", "DHI Hair Transplant", "Sapphire FUE", "Beard Transplant", "Eyebrow Transplant", "PRP Treatment"],
          renk: "#7C3AED",
        },
        {
          foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
          baslik: "Eye Surgery",
          aciklama: "Permanent vision solutions with Lasik, Lasek and lens treatments. Free yourself from glasses and lens dependency.",
          tedaviler: ["Lasik", "Lasek", "PRK", "Smile Pro", "Intraocular Lens", "Cataract Surgery"],
          renk: "#059669",
        },
        {
          foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=400&fit=crop",
          baslik: "Plastic Surgery",
          aciklama: "Expert clinics in facial, nose and body aesthetics. Professional support to help you feel your best.",
          tedaviler: ["Rhinoplasty", "Face Lift", "Eyelid Surgery", "Breast Augmentation", "Liposuction", "Tummy Tuck", "Botox", "Filler"],
          renk: "#DC2626",
        },
        {
          foto: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop",
          baslik: "General Health & Check-Up",
          aciklama: "Comprehensive check-up and general health services. Early diagnosis, healthy life. Complete health screening with expert doctors.",
          tedaviler: ["Basic Check-Up", "Comprehensive Check-Up", "Cardiology", "Oncology Screening", "Dermatology", "Gastrology"],
          renk: "#D97706",
        },
        {
          foto: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=400&fit=crop",
          baslik: "Orthopedics",
          aciklama: "Expert clinics in knee, hip and spine treatments. Find the right treatment for a pain-free and active life.",
          tedaviler: ["Knee Prosthesis", "Hip Prosthesis", "Spine Surgery", "Sports Injuries", "Arthroscopy"],
          renk: "#4F46E5",
        },
      ],
    },
    de: {
      baslik: "Behandlungskategorien",
      altBaslik: "Wählen Sie die richtige Behandlung und holen Sie kostenlose Angebote von verifizierten Kliniken ein",
      teklifAl: "Kostenloses Angebot →",
      kategoriler: [
        {
          foto: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop",
          baslik: "Zahnbehandlung",
          aciklama: "Umfassende Zahnbehandlungen von Implantaten bis Zirkonkronen, Zahnaufhellung bis Kieferorthopädie. Erreichen Sie Ihr ästhetisches und gesundes Lächeln mit Experten.",
          tedaviler: ["Implantat", "Zirkonkrone", "Laminat Veneer", "Zahnaufhellung", "Wurzelkanal", "Kieferorthopädie", "All-on-4 / All-on-6", "Lächeldesign"],
          renk: "#0891B2",
        },
        {
          foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=400&fit=crop",
          baslik: "Haartransplantation",
          aciklama: "Dauerhafte Haartransplantationslösungen mit FUE, DHI und Saphir-Methoden. Natürlich aussehende und dauerhafte Ergebnisse mit Expertenteams.",
          tedaviler: ["FUE Haartransplantation", "DHI Haartransplantation", "Saphir FUE", "Barttransplantation", "Augenbrauentransplantation", "PRP Behandlung"],
          renk: "#7C3AED",
        },
        {
          foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop",
          baslik: "Augenoperation",
          aciklama: "Dauerhafte Sehlösungen mit Lasik, Lasek und Linsenbehandlungen. Befreien Sie sich von der Brillen- und Linsenabhängigkeit.",
          tedaviler: ["Lasik", "Lasek", "PRK", "Smile Pro", "Intraokulare Linse", "Kataraktoperation"],
          renk: "#059669",
        },
        {
          foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=400&fit=crop",
          baslik: "Plastische Chirurgie",
          aciklama: "Expertenkliniken für Gesichts-, Nasen- und Körperästhetik. Professionelle Unterstützung, damit Sie sich von Ihrer besten Seite fühlen.",
          tedaviler: ["Rhinoplastik", "Gesichtslifting", "Lidchirurgie", "Brustvergrößerung", "Liposuktion", "Bauchdeckenstraffung", "Botox", "Filler"],
          renk: "#DC2626",
        },
        {
          foto: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop",
          baslik: "Allgemeine Gesundheit & Check-Up",
          aciklama: "Umfassende Check-up und allgemeine Gesundheitsdienstleistungen. Früherkennung, gesundes Leben. Vollständige Gesundheitsuntersuchung mit Experten.",
          tedaviler: ["Basis Check-Up", "Umfassender Check-Up", "Kardiologie", "Onkologie-Screening", "Dermatologie", "Gastrologie"],
          renk: "#D97706",
        },
        {
          foto: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=400&fit=crop",
          baslik: "Orthopädie",
          aciklama: "Expertenkliniken für Knie-, Hüft- und Wirbelsäulenbehandlungen. Finden Sie die richtige Behandlung für ein schmerzfreies und aktives Leben.",
          tedaviler: ["Knieprothese", "Hüftprothese", "Wirbelsäulenchirurgie", "Sportverletzungen", "Arthroskopie"],
          renk: "#4F46E5",
        },
      ],
    },
  };

  const ic = icerik[dil];

  return (
    <main style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: "64px 32px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "42px", fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.5px" }}>{ic.baslik}</h1>
        <p style={{ color: "#8b8fc8", fontSize: "17px", maxWidth: "600px", margin: "0 auto" }}>{ic.altBaslik}</p>
      </section>

      {/* Kategoriler */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {ic.kategoriler.map((kat, i) => (
            <div key={kat.baslik} style={{ background: "#fff", borderRadius: "24px", overflow: "hidden", border: "1px solid #eeecff", display: "grid", gridTemplateColumns: i % 2 === 0 ? "400px 1fr" : "1fr 400px" }}>
              {i % 2 === 0 ? (
                <>
                  <div style={{ height: "280px", overflow: "hidden" }}>
                    <img src={kat.foto} alt={kat.baslik} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "40px" }}>
                    <div style={{ display: "inline-block", background: `${kat.renk}15`, color: kat.renk, fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", marginBottom: "16px", letterSpacing: "1px" }}>
                      MEDOQA
                    </div>
                    <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0f0d2e", marginBottom: "12px", letterSpacing: "-0.5px" }}>{kat.baslik}</h2>
                    <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.75, marginBottom: "24px" }}>{kat.aciklama}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
                      {kat.tedaviler.map(t => (
                        <span key={t} style={{ background: "#f8f9ff", border: `1px solid ${kat.renk}30`, color: "#0f0d2e", padding: "5px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 500 }}>{t}</span>
                      ))}
                    </div>
                    <a href="/teklif" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: kat.renk, color: "#fff", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", textDecoration: "none", fontWeight: 700 }}>
                      {ic.teklifAl}
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ padding: "40px" }}>
                    <div style={{ display: "inline-block", background: `${kat.renk}15`, color: kat.renk, fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", marginBottom: "16px", letterSpacing: "1px" }}>
                      MEDOQA
                    </div>
                    <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0f0d2e", marginBottom: "12px", letterSpacing: "-0.5px" }}>{kat.baslik}</h2>
                    <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.75, marginBottom: "24px" }}>{kat.aciklama}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
                      {kat.tedaviler.map(t => (
                        <span key={t} style={{ background: "#f8f9ff", border: `1px solid ${kat.renk}30`, color: "#0f0d2e", padding: "5px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 500 }}>{t}</span>
                      ))}
                    </div>
                    <a href="/teklif" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: kat.renk, color: "#fff", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", textDecoration: "none", fontWeight: 700 }}>
                      {ic.teklifAl}
                    </a>
                  </div>
                  <div style={{ height: "280px", overflow: "hidden" }}>
                    <img src={kat.foto} alt={kat.baslik} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
