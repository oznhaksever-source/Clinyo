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
      baslik: "Sıkça Sorulan Sorular", altBaslik: "Aklınızdaki soruların cevaplarını burada bulabilirsiniz", aramaPlaceholder: "Soru ara...",
      sorular: [
        { soru: "Medoqa ücretsiz mi?", cevap: "Evet! Hastalar için Medoqa tamamen ücretsizdir." },
        { soru: "Klinikler nasıl doğrulanır?", cevap: "Tüm klinikler Sağlık Bakanlığı lisansları, doktor sertifikaları ve sigorta belgelerini sunar." },
        { soru: "Blokeli ödeme sistemi nasıl çalışır?", cevap: "Ödemeniz platformumuzda güvenle tutulur. Tedaviniz tamamlanıp siz onaylayana kadar kliniğe geçmez." },
        { soru: "Ek işlemler için ekstra ücret ödemek zorunda mıyım?", cevap: "Hayır! Klinik ek işlem önerecekse önce sizden onay almak zorundadır." },
        { soru: "Hangi ülkelerden hizmet veriyorsunuz?", cevap: "Medoqa global bir platformdur. Dünyanın her yerinden hasta kabul eden kliniklerle çalışıyoruz." },
        { soru: "Dil desteği var mı?", cevap: "Evet! Platform Türkçe, İngilizce, Almanca, Arapça, Rusça ve Fransızca olarak kullanılabilir." },
        { soru: "Nasıl teklif alabilirim?", cevap: "'Teklif Al' butonuna tıklayın, 3 adımda tedavinizi ve bilgilerinizi girin. Klinikler 2-4 saat içinde yanıt verir." },
        { soru: "Otel ve transfer hizmetleri de var mı?", cevap: "Evet! Partner otellerimiz ve transfer firmalarımız ile tedavi sürecinizi baştan sona planlayabilirsiniz." },
      ],
    },
    en: {
      baslik: "Frequently Asked Questions", altBaslik: "Find answers to your questions here", aramaPlaceholder: "Search questions...",
      sorular: [
        { soru: "Is Medoqa free?", cevap: "Yes! Medoqa is completely free for patients." },
        { soru: "How are clinics verified?", cevap: "All clinics submit Ministry of Health licenses, doctor certificates and insurance documents." },
        { soru: "How does the escrow payment system work?", cevap: "Your payment is safely held on our platform until treatment is complete and you approve." },
        { soru: "Do I have to pay extra for additional procedures?", cevap: "No! The clinic must get your approval before any additional procedures." },
        { soru: "Which countries do you serve?", cevap: "Medoqa is a global platform working with clinics for patients from all over the world." },
        { soru: "Is there language support?", cevap: "Yes! Turkish, English, German, Arabic, Russian and French are supported." },
        { soru: "How can I get a quote?", cevap: "Click 'Get Quote', enter your treatment in 3 steps. Clinics respond within 2-4 hours." },
        { soru: "Are hotel and transfer services available?", cevap: "Yes! With our partner hotels and transfer companies, you can plan your entire treatment process." },
      ],
    },
    de: {
      baslik: "Häufig gestellte Fragen", altBaslik: "Hier finden Sie Antworten auf Ihre Fragen", aramaPlaceholder: "Fragen suchen...",
      sorular: [
        { soru: "Ist Medoqa kostenlos?", cevap: "Ja! Medoqa ist für Patienten völlig kostenlos." },
        { soru: "Wie werden Kliniken verifiziert?", cevap: "Alle Kliniken reichen Lizenzen, Arztzertifikate und Versicherungsdokumente ein." },
        { soru: "Wie funktioniert das Treuhandzahlungssystem?", cevap: "Ihre Zahlung wird sicher gehalten bis Behandlung abgeschlossen ist und Sie genehmigen." },
        { soru: "Muss ich für Zusatzeingriffe extra bezahlen?", cevap: "Nein! Die Klinik muss Ihre Genehmigung einholen." },
        { soru: "Welche Länder bedienen Sie?", cevap: "Medoqa ist eine globale Plattform mit Kliniken für Patienten aus aller Welt." },
        { soru: "Gibt es Sprachunterstützung?", cevap: "Ja! Türkisch, Englisch, Deutsch, Arabisch, Russisch und Französisch." },
        { soru: "Wie kann ich ein Angebot erhalten?", cevap: "Klicken Sie auf 'Angebot holen', geben Sie Ihre Behandlung in 3 Schritten ein." },
        { soru: "Sind Hotel- und Transferdienste verfügbar?", cevap: "Ja! Mit unseren Partnerhotels können Sie Ihren gesamten Behandlungsprozess planen." },
      ],
    },
    ar: {
      baslik: "الأسئلة الشائعة", altBaslik: "ابحث عن إجابات لأسئلتك هنا", aramaPlaceholder: "ابحث في الأسئلة...",
      sorular: [
        { soru: "هل Medoqa مجانية؟", cevap: "نعم! Medoqa مجانية تماماً للمرضى." },
        { soru: "كيف يتم التحقق من العيادات؟", cevap: "جميع العيادات تقدم تراخيص وزارة الصحة وشهادات الأطباء ووثائق التأمين." },
        { soru: "كيف يعمل نظام الدفع الضمني؟", cevap: "أموالك محفوظة بأمان حتى اكتمال علاجك وموافقتك." },
        { soru: "هل يجب أن أدفع إضافياً للإجراءات الإضافية؟", cevap: "لا! يجب على العيادة الحصول على موافقتك قبل أي إجراء إضافي." },
        { soru: "ما الدول التي تخدمونها؟", cevap: "Medoqa منصة عالمية تعمل مع عيادات تقبل المرضى من جميع أنحاء العالم." },
        { soru: "هل هناك دعم لغوي؟", cevap: "نعم! العربية والتركية والإنجليزية والألمانية والروسية والفرنسية مدعومة." },
        { soru: "كيف أحصل على عرض؟", cevap: "انقر على 'احصل على عرض'، أدخل علاجك في 3 خطوات. العيادات ترد خلال 2-4 ساعات." },
        { soru: "هل تتوفر خدمات الفندق والنقل؟", cevap: "نعم! مع فنادقنا الشريكة يمكنك التخطيط لعملية علاجك بالكامل." },
      ],
    },
    ru: {
      baslik: "Часто задаваемые вопросы", altBaslik: "Найдите ответы на свои вопросы здесь", aramaPlaceholder: "Поиск вопросов...",
      sorular: [
        { soru: "Medoqa бесплатна?", cevap: "Да! Medoqa полностью бесплатна для пациентов." },
        { soru: "Как проверяются клиники?", cevap: "Все клиники предоставляют лицензии, сертификаты врачей и страховые документы." },
        { soru: "Как работает система эскроу?", cevap: "Ваш платёж хранится в безопасности до завершения лечения и вашего одобрения." },
        { soru: "Нужно ли платить за дополнительные процедуры?", cevap: "Нет! Клиника обязана получить ваше согласие перед любой дополнительной процедурой." },
        { soru: "Какие страны вы обслуживаете?", cevap: "Medoqa — глобальная платформа с клиниками для пациентов со всего мира." },
        { soru: "Есть ли языковая поддержка?", cevap: "Да! Русский, турецкий, английский, немецкий, арабский и французский." },
        { soru: "Как получить предложение?", cevap: "Нажмите 'Получить предложение', введите данные в 3 шага. Клиники отвечают за 2-4 часа." },
        { soru: "Доступны ли услуги отеля и трансфера?", cevap: "Да! С нашими партнёрскими отелями вы можете спланировать весь процесс лечения." },
      ],
    },
    fr: {
      baslik: "Questions fréquentes", altBaslik: "Trouvez des réponses à vos questions ici", aramaPlaceholder: "Rechercher des questions...",
      sorular: [
        { soru: "Medoqa est-il gratuit ?", cevap: "Oui ! Medoqa est entièrement gratuit pour les patients." },
        { soru: "Comment les cliniques sont-elles vérifiées ?", cevap: "Toutes les cliniques soumettent leurs licences, certificats médecins et documents d'assurance." },
        { soru: "Comment fonctionne le système de paiement sécurisé ?", cevap: "Votre paiement est conservé en sécurité jusqu'à la fin du traitement et votre approbation." },
        { soru: "Dois-je payer extra pour des actes supplémentaires ?", cevap: "Non ! La clinique doit obtenir votre accord avant tout acte supplémentaire." },
        { soru: "Quels pays desservez-vous ?", cevap: "Medoqa est une plateforme mondiale avec des cliniques pour patients du monde entier." },
        { soru: "Y a-t-il un support linguistique ?", cevap: "Oui ! Français, turc, anglais, allemand, arabe et russe sont supportés." },
        { soru: "Comment obtenir un devis ?", cevap: "Cliquez sur 'Obtenir un devis', entrez votre traitement en 3 étapes. Réponse en 2-4 heures." },
        { soru: "Les services hôtel et transfert sont-ils disponibles ?", cevap: "Oui ! Avec nos hôtels partenaires, vous pouvez planifier tout votre processus de traitement." },
      ],
    },
  };

  const ic = icerik[dil as keyof typeof icerik] || icerik.tr;
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
