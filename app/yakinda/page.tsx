"use client";
import { useState, useEffect } from "react";
import { useDil } from "../locales/context";

export default function Yakinda() {
  const [mobil, setMobil] = useState(false);
  const [email, setEmail] = useState("");
  const [gonderildi, setGonderildi] = useState(false);
  const { dil, dilDegistir } = useDil();

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  const icerik = {
    tr: {
      hazirlaniyoruz: "YAKINDA",
      baslik: "Sağlıkta Sınır",
      vurgu: "Tanımayın",
      aciklama: "Dünyanın dört bir yanından onaylı klinikler, şeffaf fiyatlar ve güvenli ödeme sistemi. Medoqa çok yakında hizmetinizde.",
      bildirimBaslik: "Açılıştan haberdar olun",
      emailPlaceholder: "E-posta adresiniz",
      buton: "Beni Haberdar Et",
      tesekkur: "Teşekkürler! Açılışta sizi haberdar edeceğiz.",
      ozellikler: [
        { ikon: "🔒", baslik: "Blokeli Ödeme", aciklama: "Paranız tedavi tamamlanana kadar güvende" },
        { ikon: "✓", baslik: "Onaylı Klinikler", aciklama: "Sağlık Bakanlığı belgeli klinikler" },
        { ikon: "⚖", baslik: "Şeffaf Fiyat", aciklama: "Gizli ücret yok, sürpriz yok" },
        { ikon: "🌍", baslik: "Global Platform", aciklama: "TR / EN / DE dil desteği" },
      ],
      sosyal: "Bizi takip edin:",
    },
    en: {
      hazirlaniyoruz: "COMING SOON",
      baslik: "Healthcare Without",
      vurgu: "Borders",
      aciklama: "Verified clinics from around the world, transparent prices and secure payment. Medoqa is coming very soon.",
      bildirimBaslik: "Get notified at launch",
      emailPlaceholder: "Your email address",
      buton: "Notify Me",
      tesekkur: "Thank you! We'll notify you at launch.",
      ozellikler: [
        { ikon: "🔒", baslik: "Escrow Payment", aciklama: "Your money is safe until treatment is complete" },
        { ikon: "✓", baslik: "Verified Clinics", aciklama: "Ministry of Health certified clinics" },
        { ikon: "⚖", baslik: "Transparent Pricing", aciklama: "No hidden fees, no surprises" },
        { ikon: "🌍", baslik: "Global Platform", aciklama: "TR / EN / DE language support" },
      ],
      sosyal: "Follow us:",
    },
    de: {
      hazirlaniyoruz: "DEMNÄCHST",
      baslik: "Gesundheit ohne",
      vurgu: "Grenzen",
      aciklama: "Verifizierte Kliniken aus aller Welt, transparente Preise und sicheres Zahlungssystem. Medoqa kommt sehr bald.",
      bildirimBaslik: "Bei der Eröffnung benachrichtigt werden",
      emailPlaceholder: "Ihre E-Mail-Adresse",
      buton: "Benachrichtigen",
      tesekkur: "Danke! Wir benachrichtigen Sie bei der Eröffnung.",
      ozellikler: [
        { ikon: "🔒", baslik: "Treuhandzahlung", aciklama: "Ihr Geld ist sicher bis die Behandlung abgeschlossen ist" },
        { ikon: "✓", baslik: "Verifizierte Kliniken", aciklama: "Kliniken mit Gesundheitsministerium-Zertifikat" },
        { ikon: "⚖", baslik: "Transparente Preise", aciklama: "Keine versteckten Gebühren, keine Überraschungen" },
        { ikon: "🌍", baslik: "Globale Plattform", aciklama: "TR / EN / DE Sprachunterstützung" },
      ],
      sosyal: "Folgen Sie uns:",
    },
  };

  const ic = icerik[dil as keyof typeof icerik] || icerik.tr;

  return (
    <main style={{ minHeight: "100vh", background: "#0f0d2e", fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      
      {/* Arka plan efekti */}
      <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(83,74,183,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-200px", left: "-200px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(127,119,221,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Header */}
      <header style={{ padding: mobil ? "20px 16px" : "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
        <div style={{ fontSize: mobil ? "20px" : "24px", fontWeight: 700, color: "#fff" }}>
          med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {(["tr", "en", "de"] as const).map(d => (
            <span key={d} onClick={() => dilDegistir(d)} style={{ fontSize: "11px", padding: "3px 8px", border: `1px solid ${dil === d ? "#534AB7" : "#2a2a4e"}`, borderRadius: "4px", color: dil === d ? "#7F77DD" : "#aab4c8", cursor: "pointer", textTransform: "uppercase" }}>{d}</span>
          ))}
        </div>
      </header>

      {/* Ana içerik */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: mobil ? "32px 16px" : "40px 32px", position: "relative", textAlign: "center" }}>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(83,74,183,0.2)", border: "1px solid rgba(83,74,183,0.5)", borderRadius: "30px", padding: "6px 20px", marginBottom: "24px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7F77DD" }} />
          <span style={{ fontSize: "11px", color: "#AFA9EC", letterSpacing: "2px", fontWeight: 700 }}>{ic.hazirlaniyoruz}</span>
        </div>

        {/* Başlık */}
        <h1 style={{ fontSize: mobil ? "38px" : "64px", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: "20px", letterSpacing: "-1px", maxWidth: "700px" }}>
          {ic.baslik}{" "}
          <span style={{ color: "#7F77DD" }}>{ic.vurgu}</span>
        </h1>

        {/* Açıklama */}
        <p style={{ fontSize: mobil ? "15px" : "18px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "40px", maxWidth: "520px" }}>
          {ic.aciklama}
        </p>

        {/* Email kayıt formu */}
        <div style={{ marginBottom: "48px", width: "100%", maxWidth: "440px" }}>
          <p style={{ fontSize: "13px", color: "#8b8fc8", marginBottom: "12px", fontWeight: 500 }}>{ic.bildirimBaslik}</p>
          {!gonderildi ? (
            <div style={{ display: "flex", gap: "8px", flexDirection: mobil ? "column" : "row" }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={ic.emailPlaceholder}
                style={{ flex: 1, border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", outline: "none", background: "rgba(255,255,255,0.05)", color: "#fff", fontFamily: "inherit" }}
              />
              <button
                onClick={() => { if (email) setGonderildi(true); }}
                style={{ background: "#534AB7", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {ic.buton}
              </button>
            </div>
          ) : (
            <div style={{ background: "rgba(5,150,105,0.15)", border: "1px solid rgba(5,150,105,0.3)", borderRadius: "10px", padding: "14px 20px", color: "#6ee7b7", fontSize: "14px" }}>
              ✓ {ic.tesekkur}
            </div>
          )}
        </div>

        {/* Özellikler */}
        <div style={{ display: "grid", gridTemplateColumns: mobil ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "12px", width: "100%", maxWidth: "800px", marginBottom: "48px" }}>
          {ic.ozellikler.map(o => (
            <div key={o.baslik} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "16px 12px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{o.ikon}</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{o.baslik}</div>
              <div style={{ fontSize: "11px", color: "#6b6fa8", lineHeight: 1.5 }}>{o.aciklama}</div>
            </div>
          ))}
        </div>

        {/* Sosyal medya */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ fontSize: "13px", color: "#6b6fa8" }}>{ic.sosyal}</span>
          {[
            { ad: "Instagram", href: "https://instagram.com/medoqa", renk: "#E1306C" },
            { ad: "LinkedIn", href: "https://linkedin.com/company/medoqa", renk: "#0077B5" },
            { ad: "Twitter/X", href: "https://twitter.com/medoqa", renk: "#fff" },
          ].map(s => (
            <a key={s.ad} href={s.href} target="_blank" rel="noreferrer" style={{ color: s.renk, fontSize: "13px", textDecoration: "none", fontWeight: 600, border: `1px solid ${s.renk}40`, padding: "5px 14px", borderRadius: "20px" }}>
              {s.ad}
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: "20px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: "12px", color: "#4a4a7a", margin: 0 }}>© 2025 Medoqa. Tüm hakları saklıdır. | info@medoqa.com</p>
      </footer>
    </main>
  );
}
