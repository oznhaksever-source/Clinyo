"use client";
import { useState } from "react";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SSS() {
  const [acikSoru, setAcikSoru] = useState<number | null>(null);
  const [arama, setArama] = useState("");
  const { dil } = useDil();

  const icerik = {
    tr: {
      baslik: "Sıkça Sorulan Sorular",
      altBaslik: "Aklınızdaki soruların cevaplarını burada bulabilirsiniz",
      aramaPlaceholder: "Soru ara...",
      sorular: [
        { soru: "Medoqa ücretsiz mi?", cevap: "Evet! Hastalar için Medoqa tamamen ücretsizdir. Teklif almak, karşılaştırmak ve kliniklerle iletişim kurmak için hiçbir ücret ödemezsiniz." },
        { soru: "Klinikler nasıl doğrulanır?", cevap: "Tüm klinikler platformumuza katılmadan önce belgelerini sunar. Sağlık Bakanlığı lisansları, doktor sertifikaları ve sigorta belgeleri kontrol edilir. Admin onayı olmadan klinikler aktif olamaz." },
        { soru: "Blokeli ödeme sistemi nasıl çalışır?", cevap: "Ödemeniz platformumuzda güvenle tutulur. Tedaviniz tamamlanıp siz onaylayana kadar kliniğe geçmez. Bu sistemi sayesinde tedaviden memnun kalmazsanız paranız güvende." },
        { soru: "Ek işlemler için ekstra ücret ödemek zorunda mıyım?", cevap: "Hayır! Klinik ek işlem önerecekse öncelikle sizden onay almak zorundadır. Siz onaylamadan fiyata eklenemez." },
        { soru: "Hangi ülkelerden hasta kabul ediyorsunuz?", cevap: "Almanya, İngiltere, Hollanda, Avusturya, Fransa, İsviçre ve diğer Avrupa ülkelerinden hastalarımız var. Türkiye içinden de hizmet veriyoruz." },
        { soru: "Dil desteği var mı?", cevap: "Evet! Platform Türkçe, İngilizce ve Almanca olarak kullanılabilir." },
        { soru: "Nasıl teklif alabilirim?", cevap: "Ana sayfadan veya herhangi bir sayfadan 'Teklif Al' butonuna tıklayın. 3 adımda tedavinizi ve iletişim bilgilerinizi girin, klinikler size 2-4 saat içinde yanıt verir." },
        { soru: "Otel ve transfer hizmetleri de var mı?", cevap: "Evet! Partner otellerimiz ve transfer firmalarımız ile tedavi sürecinizi baştan sona planlayabilirsiniz." },
      ],
    },
    en: {
      baslik: "Frequently Asked Questions",
      altBaslik: "Find answers to your questions here",
      aramaPlaceholder: "Search questions...",
      sorular: [
        { soru: "Is Medoqa free?", cevap: "Yes! Medoqa is completely free for patients. You pay nothing to receive quotes, compare, and communicate with clinics." },
        { soru: "How are clinics verified?", cevap: "All clinics submit their documents before joining our platform. Ministry of Health licenses, doctor certificates, and insurance documents are checked. Clinics cannot be active without admin approval." },
        { soru: "How does the escrow payment system work?", cevap: "Your payment is safely held on our platform. It doesn't go to the clinic until your treatment is complete and you approve. This ensures your money is safe if you're not satisfied." },
        { soru: "Do I have to pay extra for additional procedures?", cevap: "No! The clinic must get your approval before proposing any additional procedures. Nothing can be added to the price without your approval." },
        { soru: "Which countries do you accept patients from?", cevap: "We have patients from Germany, UK, Netherlands, Austria, France, Switzerland and other European countries. We also serve within Turkey." },
        { soru: "Is there language support?", cevap: "Yes! The platform is available in Turkish, English and German." },
        { soru: "How can I get a quote?", cevap: "Click the 'Get Quote' button from the homepage or any page. Enter your treatment and contact details in 3 steps, and clinics will respond within 2-4 hours." },
        { soru: "Are hotel and transfer services available?", cevap: "Yes! With our partner hotels and transfer companies, you can plan your entire treatment process from start to finish." },
      ],
    },
    de: {
      baslik: "Häufig gestellte Fragen",
      altBaslik: "Hier finden Sie Antworten auf Ihre Fragen",
      aramaPlaceholder: "Fragen suchen...",
      sorular: [
        { soru: "Ist Medoqa kostenlos?", cevap: "Ja! Medoqa ist für Patienten völlig kostenlos. Sie zahlen nichts, um Angebote zu erhalten, zu vergleichen und mit Kliniken zu kommunizieren." },
        { soru: "Wie werden Kliniken verifiziert?", cevap: "Alle Kliniken reichen ihre Dokumente ein, bevor sie unserer Plattform beitreten. Gesundheitsministerium-Lizenzen, Arztzertifikate und Versicherungsdokumente werden geprüft." },
        { soru: "Wie funktioniert das Treuhandzahlungssystem?", cevap: "Ihre Zahlung wird sicher auf unserer Plattform gehalten. Sie geht erst dann an die Klinik, wenn Ihre Behandlung abgeschlossen ist und Sie genehmigen." },
        { soru: "Muss ich für zusätzliche Eingriffe extra bezahlen?", cevap: "Nein! Die Klinik muss Ihre Genehmigung einholen, bevor sie zusätzliche Eingriffe vorschlägt." },
        { soru: "Aus welchen Ländern nehmen Sie Patienten auf?", cevap: "Wir haben Patienten aus Deutschland, UK, Niederlande, Österreich, Frankreich, Schweiz und anderen europäischen Ländern." },
        { soru: "Gibt es Sprachunterstützung?", cevap: "Ja! Die Plattform ist auf Türkisch, Englisch und Deutsch verfügbar." },
        { soru: "Wie kann ich ein Angebot erhalten?", cevap: "Klicken Sie auf der Startseite oder einer beliebigen Seite auf 'Angebot holen'. Geben Sie Ihre Behandlung und Kontaktdaten in 3 Schritten ein." },
        { soru: "Sind Hotel- und Transferdienste verfügbar?", cevap: "Ja! Mit unseren Partnerhotels und Transferunternehmen können Sie Ihren gesamten Behandlungsprozess planen." },
      ],
    },
  };

  const ic = icerik[dil];
  const filtrelenmis = ic.sorular.filter(s => s.soru.toLowerCase().includes(arama.toLowerCase()) || s.cevap.toLowerCase().includes(arama.toLowerCase()));

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      <Navbar />
      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "64px 32px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "42px", fontWeight: 700, marginBottom: "16px" }}>{ic.baslik}</h1>
        <p style={{ color: "#8b8fc8", fontSize: "16px", maxWidth: "600px", margin: "0 auto 32px" }}>{ic.altBaslik}</p>
        <input type="text" placeholder={ic.aramaPlaceholder} value={arama} onChange={(e) => setArama(e.target.value)} style={{ maxWidth: "400px", width: "100%", border: "none", borderRadius: "8px", padding: "12px 20px", fontSize: "14px", outline: "none" }} />
      </section>

      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtrelenmis.map((s, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
              <div onClick={() => setAcikSoru(acikSoru === i ? null : i)} style={{ padding: "20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#12103a" }}>
                  <span style={{ color: "#534AB7", marginRight: "8px" }}>?</span>{s.soru}
                </div>
                <span style={{ color: "#534AB7", fontSize: "18px" }}>{acikSoru === i ? "−" : "+"}</span>
              </div>
              {acikSoru === i && (
                <div style={{ padding: "0 20px 20px" }}>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, margin: 0 }}>{s.cevap}</p>
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
