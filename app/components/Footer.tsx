"use client";
import { useState, useEffect } from "react";
import { useDil } from "../locales/context";

export default function Footer() {
  const { dil } = useDil();
  const [mobil, setMobil] = useState(false);

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  const icerik = {
    tr: {
      aciklama: "Güvenli, şeffaf ve karşılaştırılabilir sağlık turizmi platformu. Diş, saç ekimi, göz ve daha fazlası için en iyi klinikleri keşfedin.",
      platform: "PLATFORM",
      destek: "DESTEK",
      takipEdin: "BİZİ TAKİP EDİN",
      linkler: {
        platform: [
          { ad: "Klinikler", href: "/klinikler" },
          { ad: "Tedaviler", href: "/tedaviler" },
          { ad: "Oteller", href: "/oteller" },
          { ad: "Transfer", href: "/transfer" },
          { ad: "Harita", href: "/harita" },
        ],
        destek: [
          { ad: "Nasıl Çalışır", href: "/nasil-calisir" },
          { ad: "SSS", href: "/sss" },
          { ad: "İletişim", href: "/iletisim" },
          { ad: "Blog", href: "/blog" },
        ],
      },
      telif: "© 2025 Medoqa. Tüm hakları saklıdır.",
    },
    en: {
      aciklama: "Safe, transparent and comparable health tourism platform. Discover the best clinics for dental, hair transplant, eye and more.",
      platform: "PLATFORM",
      destek: "SUPPORT",
      takipEdin: "FOLLOW US",
      linkler: {
        platform: [
          { ad: "Clinics", href: "/klinikler" },
          { ad: "Treatments", href: "/tedaviler" },
          { ad: "Hotels", href: "/oteller" },
          { ad: "Transfer", href: "/transfer" },
          { ad: "Map", href: "/harita" },
        ],
        destek: [
          { ad: "How It Works", href: "/nasil-calisir" },
          { ad: "FAQ", href: "/sss" },
          { ad: "Contact", href: "/iletisim" },
          { ad: "Blog", href: "/blog" },
        ],
      },
      telif: "© 2025 Medoqa. All rights reserved.",
    },
    de: {
      aciklama: "Sichere, transparente und vergleichbare Gesundheitstourismusplattform. Entdecken Sie die besten Kliniken.",
      platform: "PLATTFORM",
      destek: "SUPPORT",
      takipEdin: "FOLGEN SIE UNS",
      linkler: {
        platform: [
          { ad: "Kliniken", href: "/klinikler" },
          { ad: "Behandlungen", href: "/tedaviler" },
          { ad: "Hotels", href: "/oteller" },
          { ad: "Transfer", href: "/transfer" },
          { ad: "Karte", href: "/harita" },
        ],
        destek: [
          { ad: "Wie es funktioniert", href: "/nasil-calisir" },
          { ad: "FAQ", href: "/sss" },
          { ad: "Kontakt", href: "/iletisim" },
          { ad: "Blog", href: "/blog" },
        ],
      },
      telif: "© 2025 Medoqa. Alle Rechte vorbehalten.",
    },
  };

  const ic = icerik[dil];

  return (
    <footer style={{ background: "#12103a", color: "#fff", padding: mobil ? "40px 16px 24px" : "48px 32px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Üst kısım */}
        <div style={{
          display: "grid",
          gridTemplateColumns: mobil ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
          gap: mobil ? "32px 20px" : "40px",
          marginBottom: "40px"
        }}>
          {/* Logo + Açıklama - mobilde tam genişlik */}
          <div style={{ gridColumn: mobil ? "1 / -1" : "auto" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, marginBottom: "14px" }}>
              med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
            </div>
            <p style={{ fontSize: "13px", color: "#6b6fa8", lineHeight: "1.7", marginBottom: "16px" }}>
              {ic.aciklama}
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {(["tr", "en", "de"] as const).map(d => (
                <span key={d} style={{ fontSize: "11px", padding: "3px 8px", border: "1px solid #2a2a4e", borderRadius: "4px", color: "#6b6fa8", textTransform: "uppercase" }}>{d}</span>
              ))}
            </div>
          </div>

          {/* Platform linkleri */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#4a4a7a", letterSpacing: "1px", marginBottom: "14px" }}>{ic.platform}</div>
            {ic.linkler.platform.map(link => (
              <a key={link.ad} href={link.href} style={{ display: "block", color: "#8b8fc8", fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{link.ad}</a>
            ))}
          </div>

          {/* Destek linkleri */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#4a4a7a", letterSpacing: "1px", marginBottom: "14px" }}>{ic.destek}</div>
            {ic.linkler.destek.map(link => (
              <a key={link.ad} href={link.href} style={{ display: "block", color: "#8b8fc8", fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{link.ad}</a>
            ))}
          </div>

          {/* Sosyal medya - mobilde 2. satırda */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#4a4a7a", letterSpacing: "1px", marginBottom: "14px" }}>{ic.takipEdin}</div>
            {[
              { ad: "Instagram", href: "https://instagram.com/medoqa" },
              { ad: "Facebook", href: "https://facebook.com/medoqa" },
              { ad: "Twitter / X", href: "https://twitter.com/medoqa" },
            ].map(link => (
              <a key={link.ad} href={link.href} target="_blank" rel="noreferrer" style={{ display: "block", color: "#8b8fc8", fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{link.ad}</a>
            ))}
            <div style={{ fontSize: "12px", color: "#6b6fa8", marginTop: "8px" }}>info@medoqa.com</div>
          </div>
        </div>

        {/* Alt çizgi */}
        <div style={{ borderTop: "1px solid #1e1b4b", paddingTop: "20px", display: "flex", flexDirection: mobil ? "column" : "row", justifyContent: "space-between", alignItems: mobil ? "flex-start" : "center", gap: "12px" }}>
          <div style={{ fontSize: "12px", color: "#4a4a7a" }}>{ic.telif}</div>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="/giris" style={{ fontSize: "12px", color: "#4a4a7a", textDecoration: "none" }}>
              {dil === "tr" ? "Giriş Yap" : dil === "en" ? "Sign In" : "Anmelden"}
            </a>
            <a href="/teklif" style={{ fontSize: "12px", color: "#534AB7", textDecoration: "none", fontWeight: 600 }}>
              {dil === "tr" ? "Teklif Al" : dil === "en" ? "Get Quote" : "Angebot"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
