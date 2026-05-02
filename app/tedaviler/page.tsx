"use client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Tedaviler() {
  const { dil } = useDil();

  const icerik = {
    tr: {
      baslik: "Tedaviler",
      altBaslik: "İhtiyacınıza uygun tedaviyi seçin ve kliniklerden teklif alın",
      teklifAl: "Teklif Al",
      kategoriler: [
        {
          icon: "🦷",
          baslik: "Diş Tedavisi",
          aciklama: "Diş implantından zirkonyum kaplamaya, diş beyazlatmadan ortodontiye kadar kapsamlı diş tedavileri.",
          tedaviler: ["İmplant", "Zirkonyum Kaplama", "Lamine Veneer", "Diş Beyazlatma", "Kanal Tedavisi", "Ortodonti", "All-on-4 / All-on-6", "Gülüş Tasarımı"],
        },
        {
          icon: "💇",
          baslik: "Saç Ekimi",
          aciklama: "FUE, DHI ve Safir yöntemleriyle kalıcı saç ekimi çözümleri.",
          tedaviler: ["FUE Saç Ekimi", "DHI Saç Ekimi", "Safir FUE", "Sakal Ekimi", "Kaş Ekimi", "PRP Tedavisi"],
        },
        {
          icon: "👁️",
          baslik: "Göz Ameliyatı",
          aciklama: "Lasik, Lasek ve lens tedavileriyle kalıcı görüş çözümleri.",
          tedaviler: ["Lasik", "Lasek", "PRK", "Smile Pro", "Göz İçi Lens", "Katarakt Ameliyatı"],
        },
        {
          icon: "👃",
          baslik: "Plastik Cerrahi",
          aciklama: "Yüz, burun ve vücut estetiğinde uzman klinikler.",
          tedaviler: ["Burun Estetiği", "Yüz Germe", "Göz Kapağı Estetiği", "Meme Büyütme", "Liposuction", "Karın Germe", "Botoks", "Dolgu"],
        },
        {
          icon: "❤️",
          baslik: "Genel Sağlık",
          aciklama: "Kapsamlı check-up ve genel sağlık hizmetleri.",
          tedaviler: ["Temel Check-Up", "Kapsamlı Check-Up", "Kardiyoloji", "Onkoloji Taraması", "Dermatoloji", "Gastroloji"],
        },
        {
          icon: "🦴",
          baslik: "Ortopedi",
          aciklama: "Diz, kalça ve omurga tedavilerinde uzman klinikler.",
          tedaviler: ["Diz Protezi", "Kalça Protezi", "Omurga Cerrahisi", "Spor Yaralanmaları", "Artroskopi"],
        },
      ],
    },
    en: {
      baslik: "Treatments",
      altBaslik: "Choose the right treatment and get quotes from clinics",
      teklifAl: "Get Quote",
      kategoriler: [
        {
          icon: "🦷",
          baslik: "Dental Treatment",
          aciklama: "Comprehensive dental treatments from implants to zirconia crowns, teeth whitening to orthodontics.",
          tedaviler: ["Implant", "Zirconia Crown", "Laminate Veneer", "Teeth Whitening", "Root Canal", "Orthodontics", "All-on-4 / All-on-6", "Smile Design"],
        },
        {
          icon: "💇",
          baslik: "Hair Transplant",
          aciklama: "Permanent hair transplant solutions with FUE, DHI and Sapphire methods.",
          tedaviler: ["FUE Hair Transplant", "DHI Hair Transplant", "Sapphire FUE", "Beard Transplant", "Eyebrow Transplant", "PRP Treatment"],
        },
        {
          icon: "👁️",
          baslik: "Eye Surgery",
          aciklama: "Permanent vision solutions with Lasik, Lasek and lens treatments.",
          tedaviler: ["Lasik", "Lasek", "PRK", "Smile Pro", "Intraocular Lens", "Cataract Surgery"],
        },
        {
          icon: "👃",
          baslik: "Plastic Surgery",
          aciklama: "Expert clinics in facial, nose and body aesthetics.",
          tedaviler: ["Rhinoplasty", "Face Lift", "Eyelid Surgery", "Breast Augmentation", "Liposuction", "Tummy Tuck", "Botox", "Filler"],
        },
        {
          icon: "❤️",
          baslik: "General Health",
          aciklama: "Comprehensive check-up and general health services.",
          tedaviler: ["Basic Check-Up", "Comprehensive Check-Up", "Cardiology", "Oncology Screening", "Dermatology", "Gastrology"],
        },
        {
          icon: "🦴",
          baslik: "Orthopedics",
          aciklama: "Expert clinics in knee, hip and spine treatments.",
          tedaviler: ["Knee Prosthesis", "Hip Prosthesis", "Spine Surgery", "Sports Injuries", "Arthroscopy"],
        },
      ],
    },
    de: {
      baslik: "Behandlungen",
      altBaslik: "Wählen Sie die richtige Behandlung und holen Sie Angebote von Kliniken ein",
      teklifAl: "Angebot holen",
      kategoriler: [
        {
          icon: "🦷",
          baslik: "Zahnbehandlung",
          aciklama: "Umfassende Zahnbehandlungen von Implantaten bis Zirkonkronen, Zahnaufhellung bis Kieferorthopädie.",
          tedaviler: ["Implantat", "Zirkonkrone", "Laminat Veneer", "Zahnaufhellung", "Wurzelkanal", "Kieferorthopädie", "All-on-4 / All-on-6", "Lächeldesign"],
        },
        {
          icon: "💇",
          baslik: "Haartransplantation",
          aciklama: "Dauerhafte Haartransplantationslösungen mit FUE, DHI und Saphir-Methoden.",
          tedaviler: ["FUE Haartransplantation", "DHI Haartransplantation", "Saphir FUE", "Barttransplantation", "Augenbrauentransplantation", "PRP Behandlung"],
        },
        {
          icon: "👁️",
          baslik: "Augenoperation",
          aciklama: "Dauerhafte Sehlösungen mit Lasik, Lasek und Linsenbehandlungen.",
          tedaviler: ["Lasik", "Lasek", "PRK", "Smile Pro", "Intraokulare Linse", "Kataraktoperation"],
        },
        {
          icon: "👃",
          baslik: "Plastische Chirurgie",
          aciklama: "Expertenkliniken für Gesichts-, Nasen- und Körperästhetik.",
          tedaviler: ["Rhinoplastik", "Gesichtslifting", "Lidchirurgie", "Brustvergrößerung", "Liposuktion", "Bauchdeckenstraffung", "Botox", "Filler"],
        },
        {
          icon: "❤️",
          baslik: "Allgemeine Gesundheit",
          aciklama: "Umfassende Check-up und allgemeine Gesundheitsdienstleistungen.",
          tedaviler: ["Basis Check-Up", "Umfassender Check-Up", "Kardiologie", "Onkologie-Screening", "Dermatologie", "Gastrologie"],
        },
        {
          icon: "🦴",
          baslik: "Orthopädie",
          aciklama: "Expertenkliniken für Knie-, Hüft- und Wirbelsäulenbehandlungen.",
          tedaviler: ["Knieprothese", "Hüftprothese", "Wirbelsäulenchirurgie", "Sportverletzungen", "Arthroskopie"],
        },
      ],
    },
  };

  const ic = icerik[dil];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "64px 32px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "42px", fontWeight: 700, marginBottom: "16px" }}>{ic.baslik}</h1>
        <p style={{ color: "#8b8fc8", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>{ic.altBaslik}</p>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
          {ic.kategoriler.map((kat) => (
            <div key={kat.baslik} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "16px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                <div style={{ fontSize: "40px" }}>{kat.icon}</div>
                <div>
                  <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#12103a", margin: 0 }}>{kat.baslik}</h2>
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", marginBottom: "16px" }}>{kat.aciklama}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                {kat.tedaviler.map((t) => (
                  <span key={t} style={{ background: "#EEEDFE", color: "#534AB7", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 500 }}>{t}</span>
                ))}
              </div>
              <a href="/teklif" style={{ display: "inline-block", background: "#534AB7", color: "#fff", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>
                {ic.teklifAl} →
              </a>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
