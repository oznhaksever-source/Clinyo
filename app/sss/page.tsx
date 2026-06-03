"use client";
import { useState } from "react";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SSS_METINLER = {
  tr: {
    baslik: "Sık Sorulan Sorular",
    alt: "Aklınızdaki soruların cevaplarını burada bulabilirsiniz.",
    sorular: [
      { soru: "Medoqa nasıl çalışır?", cevap: "Teklif talebinizi oluşturursunuz, onaylı klinikler size 2-4 saat içinde teklif gönderir. Teklifleri karşılaştırır, beğendiğinizi onaylarsınız ve klinikle doğrudan iletişime geçersiniz." },
      { soru: "Medoqa'yı kullanmak ücretsiz mi?", cevap: "Evet, hastalar için tamamen ücretsizdir. Teklif almak, karşılaştırmak ve platform üzerinden iletişim kurmak hiçbir ücrete tabi değildir. Medoqa komisyonunu yalnızca kliniklerden alır." },
      { soru: "Klinikler nasıl doğrulanıyor?", cevap: "Her klinik Sağlık Bakanlığı Uluslararası Sağlık Turizmi Yetki Belgesi, faaliyet ruhsatı, hekim sertifikaları ve sigorta poliçesi sunmak zorundadır. Belgeleri admin ekibimiz manuel olarak inceler." },
      { soru: "Klinik seçerken nelere dikkat etmeliyim?", cevap: "Kliniklerin Sağlık Bakanlığı belgelerini, doktor profillerini ve önceki hasta yorumlarını incelemenizi öneririz. Platform üzerinden klinikle mesajlaşarak sorularınızı doğrudan sorabilirsiniz." },
      { soru: "Tedavi sırasında ek işlem çıkarsa ne olur?", cevap: "Klinik herhangi bir ek işlem yapmadan önce sizin yazılı onayınızı almak zorundadır. Platform üzerinden size ek teklif gönderir, siz onaylamadan hiçbir işlem yapılamaz." },
      { soru: "Hangi tedaviler için teklif alabilirim?", cevap: "Diş tedavisi, saç ekimi, göz ameliyatı, plastik cerrahi, ortopedi, check-up ve daha fazlası için teklif alabilirsiniz." },
      { soru: "Otel ve transfer de ayarlayabilir miyim?", cevap: "Evet! Medoqa'da klinik, otel ve transfer hizmetlerini tek platformdan planlayabilirsiniz." },
      { soru: "Tedaviden memnun kalmazsam ne olur?", cevap: "Sorun yaşarsanız öncelikle Medoqa koordinatörümüzle iletişime geçin. Medoqa arabuluculuk hizmeti sunar ve sorununuzun çözümü için klinikle birlikte çalışır." },
      { soru: "Hangi dillerde destek alabiliyorum?", cevap: "Platform Türkçe, İngilizce, Almanca, Arapça, Rusça ve Fransızca dillerinde tam destek sunmaktadır." },
      { soru: "Teklif almak için ne yapmalıyım?", cevap: "Ana sayfadaki 'Ücretsiz Teklif Al' butonuna tıklayın, tedavinizi seçin ve varsa röntgen veya fotoğraflarınızı yükleyin. Bu kadar — klinikler size ulaşacak." },
    ],
  },
  en: {
    baslik: "Frequently Asked Questions",
    alt: "Find answers to your questions here.",
    sorular: [
      { soru: "How does Medoqa work?", cevap: "You create a quote request, verified clinics send offers within 2-4 hours. You compare and approve your preferred offer, then connect directly with the clinic." },
      { soru: "Is Medoqa free to use?", cevap: "Yes, completely free for patients. Getting quotes, comparing and communicating through the platform is free. Medoqa only charges a commission from clinics." },
      { soru: "How are clinics verified?", cevap: "Every clinic must submit a Ministry of Health International Health Tourism Authorization Certificate, operating license, physician certificates and insurance policy. Our admin team manually reviews all documents." },
      { soru: "What should I look for when choosing a clinic?", cevap: "We recommend reviewing the clinic's Ministry of Health documents, doctor profiles and previous patient reviews. You can message the clinic directly through the platform to ask questions." },
      { soru: "What happens if extra procedures are needed during treatment?", cevap: "The clinic must obtain your written approval before performing any additional procedure. They send you an additional offer through the platform, and no procedure can be performed without your approval." },
      { soru: "What treatments can I get quotes for?", cevap: "You can get quotes for dental treatment, hair transplant, eye surgery, plastic surgery, orthopedics, check-up and more." },
      { soru: "Can I arrange hotel and transfer too?", cevap: "Yes! On Medoqa you can plan clinic, hotel and transfer services all from one platform." },
      { soru: "What if I'm not satisfied with my treatment?", cevap: "If you experience issues, first contact your Medoqa coordinator. Medoqa provides mediation services and works with the clinic to resolve your issue." },
      { soru: "What languages are supported?", cevap: "The platform fully supports Turkish, English, German, Arabic, Russian and French." },
      { soru: "What do I need to do to get a quote?", cevap: "Click the 'Get Free Quote' button on the homepage, select your treatment and upload any X-rays or photos. That's it — clinics will reach out to you." },
    ],
  },
  de: {
    baslik: "Häufig gestellte Fragen",
    alt: "Finden Sie hier Antworten auf Ihre Fragen.",
    sorular: [
      { soru: "Wie funktioniert Medoqa?", cevap: "Sie erstellen eine Angebotsanfrage, und verifizierte Kliniken senden innerhalb von 2-4 Stunden Angebote. Sie vergleichen und genehmigen das bevorzugte Angebot, dann kommunizieren Sie direkt mit der Klinik." },
      { soru: "Ist Medoqa kostenlos?", cevap: "Ja, für Patienten völlig kostenlos. Angebote einholen, vergleichen und kommunizieren ist kostenlos. Medoqa berechnet nur Kliniken eine Provision." },
      { soru: "Wie werden Kliniken verifiziert?", cevap: "Jede Klinik muss ein Gesundheitsministeriumszertifikat, Betriebslizenz, Ärztezertifikate und Versicherungspolice vorlegen. Unser Admin-Team prüft alle Dokumente manuell." },
      { soru: "Worauf soll ich bei der Klinikauswahl achten?", cevap: "Wir empfehlen, die Dokumente, Arztprofile und Patientenbewertungen zu prüfen. Sie können die Klinik direkt über die Plattform kontaktieren." },
      { soru: "Was passiert, wenn Zusatzeingriffe nötig sind?", cevap: "Die Klinik muss Ihre schriftliche Genehmigung einholen, bevor sie Zusatzeingriffe durchführt." },
      { soru: "Für welche Behandlungen kann ich Angebote einholen?", cevap: "Zahnbehandlung, Haartransplantation, Augenoperation, Schönheitschirurgie, Orthopädie, Check-up und mehr." },
      { soru: "Kann ich auch Hotel und Transfer buchen?", cevap: "Ja! Auf Medoqa können Sie Klinik, Hotel und Transfer auf einer Plattform planen." },
      { soru: "Was, wenn ich mit meiner Behandlung unzufrieden bin?", cevap: "Bei Problemen wenden Sie sich an Ihren Medoqa-Koordinator. Medoqa bietet Mediationsservices." },
      { soru: "Welche Sprachen werden unterstützt?", cevap: "Die Plattform unterstützt Türkisch, Englisch, Deutsch, Arabisch, Russisch und Französisch." },
      { soru: "Was muss ich tun, um ein Angebot zu erhalten?", cevap: "Klicken Sie auf 'Kostenloses Angebot', wählen Sie Ihre Behandlung und laden Sie Dokumente hoch." },
    ],
  },
  ar: {
    baslik: "الأسئلة الشائعة",
    alt: "ابحث هنا عن إجابات لأسئلتك.",
    sorular: [
      { soru: "كيف يعمل ميدوقا؟", cevap: "تنشئ طلب عرض، وترسل العيادات المعتمدة عروضاً خلال 2-4 ساعات. تقارن وتوافق على العرض المفضل ثم تتواصل مباشرة مع العيادة." },
      { soru: "هل ميدوقا مجاني؟", cevap: "نعم، مجاني تماماً للمرضى. الحصول على العروض والمقارنة والتواصل عبر المنصة مجاني." },
      { soru: "كيف يتم التحقق من العيادات؟", cevap: "يجب على كل عيادة تقديم شهادة وزارة الصحة وترخيص التشغيل وشهادات الأطباء ووثيقة التأمين." },
      { soru: "ماذا أبحث عند اختيار عيادة؟", cevap: "ننصح بمراجعة وثائق وزارة الصحة وملفات الأطباء وتقييمات المرضى السابقين. يمكنك التواصل مع العيادة مباشرة عبر المنصة." },
      { soru: "ماذا يحدث إذا احتجت إلى إجراءات إضافية؟", cevap: "يجب على العيادة الحصول على موافقتك الكتابية قبل أي إجراء إضافي." },
      { soru: "لأي علاجات يمكنني الحصول على عروض؟", cevap: "علاج الأسنان وزراعة الشعر وجراحة العيون والجراحة التجميلية وطب العظام والفحص الشامل وغيرها." },
      { soru: "هل يمكنني ترتيب الفندق والنقل أيضاً؟", cevap: "نعم! في ميدوقا يمكنك التخطيط للعيادة والفندق وخدمات النقل من منصة واحدة." },
      { soru: "ماذا لو لم أكن راضياً عن علاجي؟", cevap: "تواصل مع منسق ميدوقا. يوفر ميدوقا خدمات الوساطة لحل مشكلتك." },
      { soru: "ما اللغات المدعومة؟", cevap: "تدعم المنصة العربية والتركية والإنجليزية والألمانية والروسية والفرنسية." },
      { soru: "ماذا أفعل للحصول على عرض؟", cevap: "انقر على 'احصل على عرض مجاني' واختر علاجك وارفع أي وثائق." },
    ],
  },
  ru: {
    baslik: "Часто задаваемые вопросы",
    alt: "Найдите ответы на свои вопросы здесь.",
    sorular: [
      { soru: "Как работает Medoqa?", cevap: "Вы создаёте запрос, клиники присылают предложения за 2-4 часа. Вы сравниваете, одобряете и связываетесь напрямую с клиникой." },
      { soru: "Medoqa бесплатен?", cevap: "Да, полностью бесплатен для пациентов. Medoqa взимает комиссию только с клиник." },
      { soru: "Как проверяются клиники?", cevap: "Каждая клиника предоставляет сертификат Минздрава, лицензию, сертификаты врачей и страховой полис. Наша команда проверяет документы вручную." },
      { soru: "На что обращать внимание при выборе клиники?", cevap: "Рекомендуем проверить документы, профили врачей и отзывы пациентов. Вы можете написать клинике напрямую через платформу." },
      { soru: "Что происходит при дополнительных процедурах?", cevap: "Клиника обязана получить письменное согласие перед любой дополнительной процедурой." },
      { soru: "Для каких процедур можно получить предложения?", cevap: "Стоматология, пересадка волос, операция на глазах, пластика, ортопедия, чек-ап и многое другое." },
      { soru: "Можно организовать отель и трансфер?", cevap: "Да! На Medoqa можно планировать клинику, отель и трансфер с одной платформы." },
      { soru: "Что если я недоволен лечением?", cevap: "Обратитесь к координатору Medoqa. Medoqa предоставляет услуги посредничества." },
      { soru: "Какие языки поддерживаются?", cevap: "Русский, турецкий, английский, немецкий, арабский и французский." },
      { soru: "Что нужно для получения предложения?", cevap: "Нажмите 'Получить бесплатное предложение', выберите лечение и загрузите документы." },
    ],
  },
  fr: {
    baslik: "Questions fréquemment posées",
    alt: "Trouvez ici les réponses à vos questions.",
    sorular: [
      { soru: "Comment fonctionne Medoqa ?", cevap: "Vous créez une demande de devis, les cliniques envoient des offres en 2-4 heures. Vous comparez, approuvez et contactez directement la clinique." },
      { soru: "Medoqa est-il gratuit ?", cevap: "Oui, entièrement gratuit pour les patients. Medoqa ne facture une commission qu'aux cliniques." },
      { soru: "Comment les cliniques sont-elles vérifiées ?", cevap: "Chaque clinique doit soumettre un certificat du Ministère de la Santé, une licence, des certificats de médecins et une assurance. Notre équipe examine tout manuellement." },
      { soru: "À quoi faire attention pour choisir une clinique ?", cevap: "Nous recommandons de vérifier les documents, profils des médecins et avis de patients. Vous pouvez contacter la clinique directement via la plateforme." },
      { soru: "Que se passe-t-il si des actes supplémentaires sont nécessaires ?", cevap: "La clinique doit obtenir votre accord écrit avant tout acte supplémentaire." },
      { soru: "Pour quels traitements puis-je obtenir des devis ?", cevap: "Soins dentaires, greffe de cheveux, chirurgie oculaire, plastique, orthopédie, bilan de santé et plus." },
      { soru: "Puis-je organiser hôtel et transfert ?", cevap: "Oui ! Sur Medoqa vous planifiez clinique, hôtel et transfert depuis une plateforme." },
      { soru: "Que faire si je ne suis pas satisfait ?", cevap: "Contactez votre coordinateur Medoqa. Medoqa fournit des services de médiation." },
      { soru: "Quelles langues sont prises en charge ?", cevap: "Français, turc, anglais, allemand, arabe et russe." },
      { soru: "Que faire pour obtenir un devis ?", cevap: "Cliquez sur 'Obtenir un devis gratuit', sélectionnez votre traitement et téléchargez des documents." },
    ],
  },
};

export default function SSSPage() {
  const { dil } = useDil();
  const m = SSS_METINLER[dil as keyof typeof SSS_METINLER] || SSS_METINLER.en;
  const [acik, setAcik] = useState<number | null>(null);

  return (
    <main style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8f9ff" }}>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 16px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#0f0d2e", marginBottom: "12px" }}>{m.baslik}</h1>
          <p style={{ fontSize: "16px", color: "#64748b" }}>{m.alt}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {m.sorular.map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "12px", border: `1px solid ${acik === i ? "#534AB7" : "#e8e6ff"}`, overflow: "hidden" }}>
              <button onClick={() => setAcik(acik === i ? null : i)} style={{ width: "100%", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "16px" }}>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "#0f0d2e", lineHeight: 1.5 }}>{s.soru}</span>
                <span style={{ fontSize: "20px", color: "#534AB7", flexShrink: 0, transform: acik === i ? "rotate(45deg)" : "rotate(0)", transition: "transform .2s" }}>+</span>
              </button>
              {acik === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.8, margin: 0 }}>{s.cevap}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "48px", background: "#534AB7", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
            {dil === "tr" ? "Sorunuz mu var?" : dil === "de" ? "Haben Sie Fragen?" : dil === "ar" ? "هل لديك سؤال؟" : dil === "ru" ? "Есть вопросы?" : dil === "fr" ? "Vous avez des questions ?" : "Have a question?"}
          </p>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", marginBottom: "20px" }}>
            {dil === "tr" ? "Koordinatörlerimiz yardımcı olmak için burada." : dil === "de" ? "Unsere Koordinatoren helfen gerne." : dil === "ar" ? "منسقونا هنا للمساعدة." : dil === "ru" ? "Наши координаторы готовы помочь." : dil === "fr" ? "Nos coordinateurs sont là pour vous aider." : "Our coordinators are here to help."}
          </p>
          <a href="/iletisim" style={{ display: "inline-block", background: "#fff", color: "#534AB7", padding: "12px 28px", borderRadius: "10px", fontSize: "14px", textDecoration: "none", fontWeight: 700 }}>
            {dil === "tr" ? "İletişime Geç" : dil === "de" ? "Kontakt" : dil === "ar" ? "تواصل معنا" : dil === "ru" ? "Связаться" : dil === "fr" ? "Nous contacter" : "Contact Us"}
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}
