"use client";
import { useState } from "react";
import { useDil } from "../locales/context";

export default function Yakinda() {
  const [email, setEmail] = useState("");
  const [gonderildi, setGonderildi] = useState(false);
  const { dil, dilDegistir } = useDil();

  const metinler = {
    tr: {
      baslik: "Yakında Buradayız",
      baslikVurgu: "Yakında",
      aciklama: "Türkiye'nin en kapsamlı sağlık turizmi platformu çok yakında hizmetinizde. Diş tedavisinden saç ekimine, göz ameliyatından plastik cerrahiye kadar.",
      emailPlaceholder: "ornek@email.com",
      haberAl: "Haber Al",
      tesekkur: "Teşekkürler! Lansman haberini size ileteceğiz.",
      emailAciklama: "Lansman haberdar olmak için e-posta adresinizi bırakın:",
      footer: "© 2025 Medoqa. Tüm hakları saklıdır.",
    },
    en: {
      baslik: "Coming Soon",
      baslikVurgu: "Coming",
      aciklama: "The most comprehensive health tourism platform is coming soon. From dental treatment to hair transplant, from eye surgery to plastic surgery.",
      emailPlaceholder: "example@email.com",
      haberAl: "Notify Me",
      tesekkur: "Thank you! We'll notify you when we launch.",
      emailAciklama: "Leave your email to be notified at launch:",
      footer: "© 2025 Medoqa. All rights reserved.",
    },
    de: {
      baslik: "Demnächst verfügbar",
      baslikVurgu: "Demnächst",
      aciklama: "Die umfassendste Gesundheitstourismusplattform kommt bald. Von Zahnbehandlung bis Haartransplantation, von Augenoperation bis plastischer Chirurgie.",
      emailPlaceholder: "beispiel@email.com",
      haberAl: "Benachrichtigen",
      tesekkur: "Danke! Wir benachrichtigen Sie beim Launch.",
      emailAciklama: "Hinterlassen Sie Ihre E-Mail, um beim Launch benachrichtigt zu werden:",
      footer: "© 2025 Medoqa. Alle Rechte vorbehalten.",
    },
  };

  const m = metinler[dil];

  const hizmetler = [
    { icon: "🦷", tr: "Diş Tedavisi", en: "Dental Treatment", de: "Zahnbehandlung" },
    { icon: "💇", tr: "Saç Ekimi", en: "Hair Transplant", de: "Haartransplantation" },
    { icon: "👁️", tr: "Göz Ameliyatı", en: "Eye Surgery", de: "Augenoperation" },
    { icon: "👃", tr: "Plastik Cerrahi", en: "Plastic Surgery", de: "Plastische Chirurgie" },
    { icon: "🏨", tr: "Partner Oteller", en: "Partner Hotels", de: "Partner Hotels" },
    { icon: "🚗", tr: "VIP Transfer", en: "VIP Transfer", de: "VIP Transfer" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 60%, #2d1b69 100%)", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px" }}>

      {/* Dil Seçici */}
      <div style={{ position: "fixed", top: "20px", right: "20px", display: "flex", gap: "6px" }}>
        {(["tr", "en", "de"] as const).map((d) => (
          <span key={d} onClick={() => dilDegistir(d)} style={{ fontSize: "11px", padding: "3px 8px", border: `1px solid ${dil === d ? "#534AB7" : "#2a2a4e"}`, borderRadius: "4px", color: dil === d ? "#7F77DD" : "#aab4c8", cursor: "pointer", textTransform: "uppercase", background: "rgba(0,0,0,0.3)" }}>
            {d}
          </span>
        ))}
      </div>

      <div style={{ textAlign: "center", maxWidth: "560px" }}>
        <div style={{ fontSize: "32px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
          med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
        </div>
        <div style={{ width: "60px", height: "2px", background: "#534AB7", margin: "20px auto" }} />
        <h1 style={{ fontSize: "42px", fontWeight: 800, color: "#fff", marginBottom: "16px", lineHeight: 1.2 }}>
          <span style={{ color: "#7F77DD" }}>{m.baslikVurgu}</span> {dil === "tr" ? "Buradayız" : dil === "en" ? "Here" : "Verfügbar"}
        </h1>
        <p style={{ fontSize: "16px", color: "#8b8fc8", marginBottom: "40px", lineHeight: 1.7 }}>{m.aciklama}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
          {hizmetler.map((h) => (
            <div key={h.tr} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>{h.icon}</div>
              <div style={{ fontSize: "12px", color: "#8b8fc8" }}>{dil === "tr" ? h.tr : dil === "en" ? h.en : h.de}</div>
            </div>
          ))}
        </div>

        {!gonderildi ? (
          <div>
            <p style={{ fontSize: "14px", color: "#8b8fc8", marginBottom: "16px" }}>{m.emailAciklama}</p>
            <div style={{ display: "flex", gap: "8px", maxWidth: "400px", margin: "0 auto" }}>
              <input type="email" placeholder={m.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", borderRadius: "8px", padding: "12px 16px", fontSize: "14px", color: "#fff", outline: "none" }} />
              <button onClick={() => { if (email) setGonderildi(true); }} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "12px 20px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap" }}>
                {m.haberAl}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ background: "rgba(83,74,183,0.2)", border: "1px solid #534AB7", borderRadius: "10px", padding: "16px", color: "#7F77DD", fontSize: "14px" }}>
            ✓ {m.tesekkur}
          </div>
        )}

        <div style={{ marginTop: "48px", fontSize: "12px", color: "#4a4a6a" }}>{m.footer}</div>
      </div>
    </main>
  );
}
