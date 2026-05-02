"use client";
import { useState } from "react";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Iletisim() {
  const [ad, setAd] = useState("");
  const [email, setEmail] = useState("");
  const [mesajIcerik, setMesajIcerik] = useState("");
  const [gonderildi, setGonderildi] = useState(false);
  const { dil } = useDil();

  const icerik = {
    tr: {
      baslik: "İletişim", altBaslik: "Sorularınız için bize ulaşın",
      adLabel: "Adınız", emailLabel: "E-posta", mesajLabel: "Mesajınız",
      gonder: "Mesaj Gönder", gonderildi: "Mesajınız alındı! En kısa sürede size döneceğiz.",
      bilgi: { email: "info@medoqa.com", telefon: "+90 850 000 00 00", adres: "İstanbul, Türkiye", saat: "Pzt-Cum: 09:00 - 18:00" },
      etiketler: ["E-posta", "Telefon", "Adres", "Çalışma Saatleri"],
    },
    en: {
      baslik: "Contact", altBaslik: "Reach us for your questions",
      adLabel: "Your Name", emailLabel: "Email", mesajLabel: "Your Message",
      gonder: "Send Message", gonderildi: "Message received! We'll get back to you shortly.",
      bilgi: { email: "info@medoqa.com", telefon: "+90 850 000 00 00", adres: "Istanbul, Turkey", saat: "Mon-Fri: 09:00 - 18:00" },
      etiketler: ["Email", "Phone", "Address", "Working Hours"],
    },
    de: {
      baslik: "Kontakt", altBaslik: "Kontaktieren Sie uns bei Fragen",
      adLabel: "Ihr Name", emailLabel: "E-Mail", mesajLabel: "Ihre Nachricht",
      gonder: "Nachricht senden", gonderildi: "Nachricht erhalten! Wir melden uns so schnell wie möglich.",
      bilgi: { email: "info@medoqa.com", telefon: "+90 850 000 00 00", adres: "Istanbul, Türkei", saat: "Mo-Fr: 09:00 - 18:00" },
      etiketler: ["E-Mail", "Telefon", "Adresse", "Arbeitszeiten"],
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

      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "64px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "32px", border: "1px solid #EEEDFE" }}>
          {!gonderildi ? (
            <>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>{ic.adLabel}</label>
                <input type="text" value={ad} onChange={(e) => setAd(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>{ic.emailLabel}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>{ic.mesajLabel}</label>
                <textarea rows={5} value={mesajIcerik} onChange={(e) => setMesajIcerik(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none", resize: "none" }} />
              </div>
              <button onClick={() => { if (ad && email && mesajIcerik) setGonderildi(true); }} style={{ width: "100%", background: "#534AB7", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 600 }}>{ic.gonder}</button>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "32px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
              <p style={{ color: "#0a7a3a", fontSize: "14px", fontWeight: 600 }}>{ic.gonderildi}</p>
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { icon: "📧", etiket: ic.etiketler[0], deger: ic.bilgi.email },
            { icon: "📞", etiket: ic.etiketler[1], deger: ic.bilgi.telefon },
            { icon: "📍", etiket: ic.etiketler[2], deger: ic.bilgi.adres },
            { icon: "🕐", etiket: ic.etiketler[3], deger: ic.bilgi.saat },
          ].map((item) => (
            <div key={item.etiket} style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #EEEDFE", display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ fontSize: "28px" }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>{item.etiket}</div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#12103a" }}>{item.deger}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
