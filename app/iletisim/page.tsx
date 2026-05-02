"use client";
import { useState, useEffect } from "react";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Iletisim() {
  const [ad, setAd] = useState("");
  const [email, setEmail] = useState("");
  const [mesajIcerik, setMesajIcerik] = useState("");
  const [gonderildi, setGonderildi] = useState(false);
  const [mobil, setMobil] = useState(false);
  const { dil } = useDil();

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  const icerik = {
    tr: { baslik: "İletişim", altBaslik: "Sorularınız için bize ulaşın", adLabel: "Adınız", emailLabel: "E-posta", mesajLabel: "Mesajınız", gonder: "Mesaj Gönder", gonderildi: "Mesajınız alındı! En kısa sürede size döneceğiz.", etiketler: ["E-posta", "Telefon", "Adres", "Çalışma Saatleri"], bilgi: { email: "info@medoqa.com", telefon: "+90 850 000 00 00", adres: "İstanbul, Türkiye", saat: "Pzt-Cum: 09:00 - 18:00" } },
    en: { baslik: "Contact", altBaslik: "Reach us for your questions", adLabel: "Your Name", emailLabel: "Email", mesajLabel: "Your Message", gonder: "Send Message", gonderildi: "Message received! We'll get back to you shortly.", etiketler: ["Email", "Phone", "Address", "Working Hours"], bilgi: { email: "info@medoqa.com", telefon: "+90 850 000 00 00", adres: "Istanbul, Turkey", saat: "Mon-Fri: 09:00 - 18:00" } },
    de: { baslik: "Kontakt", altBaslik: "Kontaktieren Sie uns bei Fragen", adLabel: "Ihr Name", emailLabel: "E-Mail", mesajLabel: "Ihre Nachricht", gonder: "Nachricht senden", gonderildi: "Nachricht erhalten! Wir melden uns.", etiketler: ["E-Mail", "Telefon", "Adresse", "Arbeitszeiten"], bilgi: { email: "info@medoqa.com", telefon: "+90 850 000 00 00", adres: "Istanbul, Türkei", saat: "Mo-Fr: 09:00 - 18:00" } },
  };

  const ic = icerik[dil];
  const inputStyle = { width: "100%", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", fontSize: "14px", boxSizing: "border-box" as const, outline: "none", fontFamily: "inherit" };

  return (
    <main style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />
      <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: mobil ? "40px 16px" : "64px 32px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: mobil ? "28px" : "42px", fontWeight: 800, marginBottom: "12px" }}>{ic.baslik}</h1>
        <p style={{ color: "#8b8fc8", fontSize: "16px" }}>{ic.altBaslik}</p>
      </section>

      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: mobil ? "32px 16px" : "64px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: mobil ? "1fr" : "1fr 1fr", gap: "32px" }}>
          {/* Form */}
          <div style={{ background: "#fff", borderRadius: "20px", padding: mobil ? "24px" : "32px", border: "1px solid #eeecff" }}>
            {!gonderildi ? (
              <>
                <div style={{ marginBottom: "14px" }}>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px", fontWeight: 500 }}>{ic.adLabel}</label>
                  <input type="text" value={ad} onChange={e => setAd(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px", fontWeight: 500 }}>{ic.emailLabel}</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px", fontWeight: 500 }}>{ic.mesajLabel}</label>
                  <textarea rows={5} value={mesajIcerik} onChange={e => setMesajIcerik(e.target.value)} style={{ ...inputStyle, resize: "none" }} />
                </div>
                <button onClick={() => { if (ad && email && mesajIcerik) setGonderildi(true); }} style={{ width: "100%", background: "#534AB7", color: "#fff", border: "none", padding: "13px", borderRadius: "10px", fontSize: "15px", cursor: "pointer", fontWeight: 600 }}>{ic.gonder}</button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                <p style={{ color: "#059669", fontSize: "15px", fontWeight: 600 }}>{ic.gonderildi}</p>
              </div>
            )}
          </div>

          {/* İletişim bilgileri */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { icon: "📧", etiket: ic.etiketler[0], deger: ic.bilgi.email },
              { icon: "📞", etiket: ic.etiketler[1], deger: ic.bilgi.telefon },
              { icon: "📍", etiket: ic.etiketler[2], deger: ic.bilgi.adres },
              { icon: "🕐", etiket: ic.etiketler[3], deger: ic.bilgi.saat },
            ].map(item => (
              <div key={item.etiket} style={{ background: "#fff", borderRadius: "14px", padding: "18px 20px", border: "1px solid #eeecff", display: "flex", gap: "14px", alignItems: "center" }}>
                <div style={{ fontSize: "24px" }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "3px" }}>{item.etiket}</div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f0d2e" }}>{item.deger}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
