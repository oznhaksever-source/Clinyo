"use client";
import { useState, useEffect } from "react";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SSS() {
  const [acikSoru, setAcikSoru] = useState<number | null>(null);
  const [arama, setArama] = useState("");
  const [mobil, setMobil] = useState(false);
  const { dil } = useDil();

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  const icerik = {
    tr: {
      baslik: "Sıkça Sorulan Sorular",
      altBaslik: "Aklınızdaki soruların cevaplarını burada bulabilirsiniz",
      aramaPlaceholder: "Soru ara...",
      sorular: [
        { soru: "Medoqa ücretsiz mi?", cevap: "Evet! Hastalar için Medoqa tamamen ücretsizdir. Teklif almak, karşılaştırmak ve kliniklerle iletişim kurmak için hiçbir ücret ödemezsiniz." },
        { soru: "Klinikler nasıl doğrulanır?", cevap: "Tüm klinikler Sağlık Bakanlığı lisansları, doktor sertifikaları ve sigorta belgelerini sunar. Admin onayı olmadan klinikler aktif olamaz." },
        { soru: "Blokeli ödeme sistemi nasıl çalışır?", cevap: "Ödemeniz platformumuzda güvenle tutulur. Tedaviniz tamamlanıp siz onaylayana kadar kliniğe geçmez. Bu sayede paranız her zaman güvende." },
        { soru: "Ek işlemler için ekstra ücret ödemek zorunda mıyım?", cevap: "Hayır! Klinik ek işlem önerecekse önce sizden onay almak zorundadır. Siz onaylamadan hiçbir ek işlem yapılamaz." },
        { soru: "Hangi ülkelerden hizmet veriyorsunuz?", cevap: "Medoqa global bir platformdur. Dünyanın her yerinden hasta kabul eden kliniklerle çalışıyoruz." },
        { soru: "Dil desteği var mı?", cevap: "Evet! Platform Türkçe, İngilizce ve Almanca olarak kullanılabilir." },
        { soru: "Nasıl teklif alabilirim?", cevap: "'Teklif Al' butonuna tıklayın, 3 adımda tedavinizi ve bilgilerinizi girin. Klinikler 2-4 saat içinde yanıt verir." },
        { soru: "Otel ve transfer hizmetleri de var mı?", cevap: "Evet! Partner otellerimiz ve transfer firmalarımız ile tedavi sürecinizi baştan sona planlayabilirsiniz." },
      ],
    },
    en: {
      baslik: "Frequently Asked Questions",
      altBaslik: "Find answers to your questions here",
      aramaPlaceholder: "Search questions...",
      sorular: [
        { soru: "Is Medoqa free?", cevap: "Yes! Medoqa is completely free for patients. You pay nothing to receive quotes, compare, and communicate with clinics." },
        { soru: "How are clinics verified?", cevap: "All clinics submit Ministry of Health licenses, doctor certificates and insurance documents. Clinics cannot be active without admin approval." },
        { soru: "How does the escrow payment system work?", cevap: "Your payment is safely held on our platform. It doesn't go to the clinic until your treatment is complete and you approve." },
        { soru: "Do I have to pay extra for additional procedures?", cevap: "No! The clinic must get your approval before any additional procedures. Nothing can be done without your approval." },
        { soru: "Which countries do you serve?", cevap: "Medoqa is a global platform. We work with clinics that accept patients from all over the world." },
        { soru: "Is there language support?", cevap: "Yes! The platform is available in Turkish, English and German." },
        { soru: "How can I get a quote?", cevap: "Click 'Get Quote', enter your treatment and details in 3 steps. Clinics respond within 2-4 hours." },
        { soru: "Are hotel and transfer services available?", cevap: "Yes! With our partner hotels and transfer companies, you can plan your entire treatment process." },
      ],
    },
    de: {
      baslik: "Häufig gestellte Fragen",
      altBaslik: "Hier finden Sie Antworten auf Ihre Fragen",
      aramaPlaceholder: "Fragen suchen...",
      sorular: [
        { soru: "Ist Medoqa kostenlos?", cevap: "Ja! Medoqa ist für Patienten völlig kostenlos. Sie zahlen nichts, um Angebote zu erhalten, zu vergleichen und mit Kliniken zu kommunizieren." },
        { soru: "Wie werden Kliniken verifiziert?", cevap: "Alle Kliniken reichen Lizenzen, Arztzertifikate und Versicherungsdokumente ein. Ohne Admin-Genehmigung können Kliniken nicht aktiv sein." },
        { soru: "Wie funktioniert das Treuhandzahlungssystem?", cevap: "Ihre Zahlung wird sicher auf unserer Plattform gehalten. Sie geht erst an die Klinik, wenn Ihre Behandlung abgeschlossen ist und Sie genehmigen." },
        { soru: "Muss ich für zusätzliche Eingriffe extra bezahlen?", cevap: "Nein! Die Klinik muss Ihre Genehmigung einholen. Ohne Ihre Genehmigung nichts." },
        { soru: "Welche Länder bedienen Sie?", cevap: "Medoqa ist eine globale Plattform. Wir arbeiten mit Kliniken, die Patienten aus aller Welt aufnehmen." },
        { soru: "Gibt es Sprachunterstützung?", cevap: "Ja! Die Plattform ist auf Türkisch, Englisch und Deutsch verfügbar." },
        { soru: "Wie kann ich ein Angebot erhalten?", cevap: "Klicken Sie auf 'Angebot holen', geben Sie Ihre Behandlung in 3 Schritten ein. Kliniken antworten in 2-4 Stunden." },
        { soru: "Sind Hotel- und Transferdienste verfügbar?", cevap: "Ja! Mit unseren Partnerhotels und Transferunternehmen können Sie Ihren gesamten Behandlungsprozess planen." },
      ],
    },
  };

  const ic = icerik[dil];
  const filtrelenmis = ic.sorular.filter(s =>
    s.soru.toLowerCase().includes(arama.toLowerCase()) ||
    s.cevap.toLowerCase().includes(arama.toLowerCase())
  );

  return (
    <main style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />
      <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: mobil ? "40px 16px" : "64px 32px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: mobil ? "28px" : "42px", fontWeight: 800, marginBottom: "12px" }}>{ic.baslik}</h1>
        <p style={{ color: "#8b8fc8", fontSize: mobil ? "14px" : "16px", marginBottom: "28px" }}>{ic.altBaslik}</p>
        <input type="text" placeholder={ic.aramaPlaceholder} value={arama} onChange={e => setArama(e.target.value)} style={{ maxWidth: "400px", width: "100%", border: "none", borderRadius: "10px", padding: "12px 20px", fontSize: "14px", outline: "none" }} />
      </section>

      <section style={{ maxWidth: "800px", margin: "0 auto", padding: mobil ? "32px 16px" : "64px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtrelenmis.map((s, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #eeecff", borderRadius: "14px", overflow: "hidden" }}>
              <div onClick={() => setAcikSoru(acikSoru === i ? null : i)} style={{ padding: mobil ? "16px" : "20px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: mobil ? "14px" : "15px", fontWeight: 700, color: "#0f0d2e" }}>{s.soru}</div>
                <div style={{ color: "#534AB7", fontSize: "20px", fontWeight: 300, flexShrink: 0 }}>{acikSoru === i ? "−" : "+"}</div>
              </div>
              {acikSoru === i && (
                <div style={{ padding: mobil ? "0 16px 16px" : "0 24px 20px" }}>
                  <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>{s.cevap}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
