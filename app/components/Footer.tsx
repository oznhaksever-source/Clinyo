"use client";
import { useDil } from "../locales/context";

export default function Footer() {
  const { dil } = useDil();

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
          { ad: "Gizlilik Politikası", href: "/gizlilik" },
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
          { ad: "Privacy Policy", href: "/gizlilik" },
        ],
      },
      telif: "© 2025 Medoqa. All rights reserved.",
    },
    de: {
      aciklama: "Sichere, transparente und vergleichbare Gesundheitstourismusplattform. Entdecken Sie die besten Kliniken für Zahn-, Haar-, Augenbehandlungen und mehr.",
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
          { ad: "Datenschutz", href: "/gizlilik" },
        ],
      },
      telif: "© 2025 Medoqa. Alle Rechte vorbehalten.",
    },
  };

  const ic = icerik[dil];

  return (
    <footer style={{ background: "#12103a", color: "#fff", padding: "48px 32px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "40px" }}>
          <div>
            <div style={{ fontSize: "24px", fontWeight: 700, marginBottom: "16px" }}>
              med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
            </div>
            <p style={{ fontSize: "13px", color: "#6b6fa8", lineHeight: "1.7", marginBottom: "20px" }}>
              {ic.aciklama}
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {["TR", "EN", "DE"].map((d) => (
                <span key={d} style={{ fontSize: "11px", padding: "3px 8px", border: "1px solid #2a2a4e", borderRadius: "4px", color: "#6b6fa8" }}>{d}</span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#4a4a7a", letterSpacing: "1px", marginBottom: "16px" }}>{ic.platform}</div>
            {ic.linkler.platform.map((link) => (
              <a key={link.ad} href={link.href} style={{ display: "block", color: "#8b8fc8", fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{link.ad}</a>
            ))}
          </div>

          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#4a4a7a", letterSpacing: "1px", marginBottom: "16px" }}>{ic.destek}</div>
            {ic.linkler.destek.map((link) => (
              <a key={link.ad} href={link.href} style={{ display: "block", color: "#8b8fc8", fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{link.ad}</a>
            ))}
          </div>

          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#4a4a7a", letterSpacing: "1px", marginBottom: "16px" }}>{ic.takipEdin}</div>
            {[
              { ad: "Instagram", href: "https://instagram.com/medoqa" },
              { ad: "Facebook", href: "https://facebook.com/medoqa" },
              { ad: "Twitter/X", href: "https://twitter.com/medoqa" },
            ].map((link) => (
              <a key={link.ad} href={link.href} target="_blank" rel="noreferrer" style={{ display: "block", color: "#8b8fc8", fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{link.ad}</a>
            ))}
            <div style={{ marginTop: "16px" }}>
              <div style={{ fontSize: "12px", color: "#6b6fa8", marginBottom: "4px" }}>info@medoqa.com</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #1e1b4b", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
