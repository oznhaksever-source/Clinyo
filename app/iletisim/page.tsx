"use client";
import { useState } from "react";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function IletisimPage() {
  const { dil } = useDil();
  const [form, setForm] = useState({ ad: "", email: "", konu: "", mesaj: "" });
  const [gonderildi, setGonderildi] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);

  const m = {
    tr: { baslik: "İletişim", alt: "Sorularınız için bizimle iletişime geçin.", adSoyad: "Ad Soyad", email: "E-posta", konu: "Konu", mesaj: "Mesajınız", gonder: "Gönder", gonderildi: "✅ Mesajınız alındı! En kısa sürede dönüş yapacağız.", zorunlu: "Bu alan zorunludur.", bilgi: "Bilgi", whatsapp: "WhatsApp ile Ulaşın", ya: "veya" },
    en: { baslik: "Contact", alt: "Get in touch with us for your questions.", adSoyad: "Full Name", email: "Email", konu: "Subject", mesaj: "Your Message", gonder: "Send", gonderildi: "✅ Your message has been received! We'll get back to you shortly.", zorunlu: "This field is required.", bilgi: "Info", whatsapp: "Contact via WhatsApp", ya: "or" },
    de: { baslik: "Kontakt", alt: "Nehmen Sie für Ihre Fragen Kontakt mit uns auf.", adSoyad: "Vollständiger Name", email: "E-Mail", konu: "Betreff", mesaj: "Ihre Nachricht", gonder: "Senden", gonderildi: "✅ Ihre Nachricht wurde empfangen! Wir melden uns in Kürze.", zorunlu: "Dieses Feld ist erforderlich.", bilgi: "Info", whatsapp: "Per WhatsApp kontaktieren", ya: "oder" },
    ar: { baslik: "التواصل", alt: "تواصل معنا لأسئلتك.", adSoyad: "الاسم الكامل", email: "البريد الإلكتروني", konu: "الموضوع", mesaj: "رسالتك", gonder: "إرسال", gonderildi: "✅ تم استلام رسالتك! سنرد في أقرب وقت.", zorunlu: "هذا الحقل مطلوب.", bilgi: "معلومات", whatsapp: "التواصل عبر واتساب", ya: "أو" },
    ru: { baslik: "Контакты", alt: "Свяжитесь с нами по вашим вопросам.", adSoyad: "Полное имя", email: "Электронная почта", konu: "Тема", mesaj: "Ваше сообщение", gonder: "Отправить", gonderildi: "✅ Ваше сообщение получено! Мы свяжемся с вами в ближайшее время.", zorunlu: "Это поле обязательно.", bilgi: "Инфо", whatsapp: "Связаться через WhatsApp", ya: "или" },
    fr: { baslik: "Contact", alt: "Contactez-nous pour vos questions.", adSoyad: "Nom complet", email: "E-mail", konu: "Sujet", mesaj: "Votre message", gonder: "Envoyer", gonderildi: "✅ Votre message a été reçu ! Nous vous répondrons très bientôt.", zorunlu: "Ce champ est requis.", bilgi: "Info", whatsapp: "Contacter via WhatsApp", ya: "ou" },
  };
  const ic = m[dil as keyof typeof m] || m.en;
  const inputStyle = { width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", outline: "none", boxSizing: "border-box" as const, fontFamily: "inherit" };

  async function gonder(e: React.FormEvent) {
    e.preventDefault();
    if (!form.ad || !form.email || !form.mesaj) return;
    setYukleniyor(true);
    await new Promise(r => setTimeout(r, 1000));
    setGonderildi(true);
    setYukleniyor(false);
    setForm({ ad: "", email: "", konu: "", mesaj: "" });
  }

  return (
    <main style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8f9ff" }}>
      <Navbar />
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 16px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#0f0d2e", marginBottom: "12px" }}>{ic.baslik}</h1>
          <p style={{ fontSize: "16px", color: "#64748b" }}>{ic.alt}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
          {/* Form */}
          <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", border: "1px solid #e8e6ff" }}>
            {gonderildi ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                <p style={{ fontSize: "15px", color: "#059669", fontWeight: 600 }}>{ic.gonderildi}</p>
              </div>
            ) : (
              <form onSubmit={gonder}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px", fontWeight: 500 }}>{ic.adSoyad} *</label>
                  <input type="text" value={form.ad} onChange={e => setForm({ ...form, ad: e.target.value })} style={inputStyle} required />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px", fontWeight: 500 }}>{ic.email} *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} required />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px", fontWeight: 500 }}>{ic.konu}</label>
                  <input type="text" value={form.konu} onChange={e => setForm({ ...form, konu: e.target.value })} style={inputStyle} />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px", fontWeight: 500 }}>{ic.mesaj} *</label>
                  <textarea rows={5} value={form.mesaj} onChange={e => setForm({ ...form, mesaj: e.target.value })} style={{ ...inputStyle, resize: "none" }} required />
                </div>
                <button type="submit" disabled={yukleniyor} style={{ width: "100%", background: "#534AB7", color: "#fff", border: "none", padding: "13px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: 700, opacity: yukleniyor ? 0.7 : 1 }}>
                  {yukleniyor ? "..." : ic.gonder}
                </button>
              </form>
            )}
          </div>

          {/* İletişim Bilgileri */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { ikon: "📧", baslik: ic.bilgi, deger: "info@medoqa.com", link: "mailto:info@medoqa.com" },
              { ikon: "🌐", baslik: "Web", deger: "medoqa.com", link: "https://www.medoqa.com" },
              { ikon: "📸", baslik: "Instagram", deger: "@medoqahealht", link: "https://www.instagram.com/medoqahealht/" },
              { ikon: "👥", baslik: "Facebook", deger: "Medoqa", link: "https://www.facebook.com/medoqa" },
            ].map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "16px", background: "#fff", borderRadius: "14px", padding: "20px", border: "1px solid #e8e6ff", textDecoration: "none" }}>
                <span style={{ fontSize: "28px" }}>{item.ikon}</span>
                <div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "2px" }}>{item.baslik}</div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f0d2e" }}>{item.deger}</div>
                </div>
              </a>
            ))}

            {/* WhatsApp */}
            <a href="https://wa.me/905555555555" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", background: "#25D366", color: "#fff", borderRadius: "14px", padding: "16px", textDecoration: "none", fontWeight: 700, fontSize: "15px" }}>
              <span style={{ fontSize: "24px" }}>💬</span>
              {ic.whatsapp}
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
