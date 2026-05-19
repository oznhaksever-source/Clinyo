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
      { soru: "Medoqa nasıl çalışır?", cevap: "Teklif talebinizi oluşturursunuz, onaylı klinikler size 2-4 saat içinde teklif gönderir. Teklifleri karşılaştırır, beğendiğinizi onaylarsınız. Ödemeniz Medoqa'nın güvenli hesabında bekler, tedavi tamamlanınca kliniğe geçer." },
      { soru: "Medoqa'yı kullanmak ücretsiz mi?", cevap: "Evet, hastalar için tamamen ücretsizdir. Teklif almak, karşılaştırmak ve platform üzerinden iletişim kurmak hiçbir ücrete tabi değildir. Medoqa komisyonunu yalnızca kliniklerden alır." },
      { soru: "Blokeli ödeme sistemi nasıl çalışır?", cevap: "Ödemenizi Medoqa'nın güvenli hesabına yaparsınız. Para, siz tedavinizi tamamladığınızı onaylayana kadar kliniğe geçmez. Bu sistem hem sizi hem kliniği korur." },
      { soru: "Klinikler nasıl doğrulanıyor?", cevap: "Her klinik Sağlık Bakanlığı Uluslararası Sağlık Turizmi Yetki Belgesi, faaliyet ruhsatı, hekim sertifikaları ve sigorta poliçesi sunmak zorundadır. Belgeleri admin ekibimiz manuel olarak inceler." },
      { soru: "Tedavi sırasında ek işlem çıkarsa ne olur?", cevap: "Klinik herhangi bir ek işlem yapmadan önce sizin yazılı onayınızı almak zorundadır. Platform üzerinden size ek teklif gönderir, siz onaylamadan hiçbir işlem yapılamaz." },
      { soru: "Hangi tedaviler için teklif alabilirim?", cevap: "Diş tedavisi, saç ekimi, göz ameliyatı, plastik cerrahi, ortopedi, check-up ve daha fazlası için teklif alabilirsiniz. Platformumuzdaki klinikler geniş bir tedavi yelpazesi sunmaktadır." },
      { soru: "Otel ve transfer de ayarlayabilir miyim?", cevap: "Evet! Medoqa'da klinik, otel ve transfer hizmetlerini tek platformdan planlayabilirsiniz. Partner otellerimiz ve transfer firmalarımız tedavi sürenize uygun paketler sunar." },
      { soru: "Tedaviden memnun kalmazsam ne olur?", cevap: "Sorun yaşarsanız öncelikle Medoqa koordinatörümüzle iletişime geçin. Medoqa arabuluculuk hizmeti sunar ve sorununuzun çözümü için klinikle birlikte çalışır." },
      { soru: "Hangi dillerde destek alabiliyorum?", cevap: "Platform Türkçe, İngilizce, Almanca, Arapça, Rusça ve Fransızca dillerinde tam destek sunmaktadır. Koordinatörlerimiz bu dillerde iletişim kurabilir." },
      { soru: "Teklif almak için ne yapmalıyım?", cevap: "Ana sayfadaki 'Ücretsiz Teklif Al' butonuna tıklayın, tedavinizi seçin ve varsa röntgen veya fotoğraflarınızı yükleyin. Bu kadar — klinikler size ulaşacak." },
    ],
  },
  en: {
    baslik: "Frequently Asked Questions",
    alt: "Find answers to your questions here.",
    sorular: [
      { soru: "How does Medoqa work?", cevap: "You create a quote request, verified clinics send offers within 2-4 hours. You compare and approve your preferred offer. Your payment stays in Medoqa's secure account and is only released to the clinic after treatment is complete." },
      { soru: "Is Medoqa free to use?", cevap: "Yes, completely free for patients. Getting quotes, comparing and communicating through the platform is free. Medoqa only charges a commission from clinics." },
      { soru: "How does the escrow payment system work?", cevap: "You make your payment to Medoqa's secure account. The money doesn't go to the clinic until you confirm treatment completion. This system protects both you and the clinic." },
      { soru: "How are clinics verified?", cevap: "Every clinic must submit a Ministry of Health International Health Tourism Authorization Certificate, operating license, physician certificates and insurance policy. Our admin team manually reviews all documents." },
      { soru: "What happens if extra procedures are needed during treatment?", cevap: "The clinic must obtain your written approval before performing any additional procedure. They send you an additional offer through the platform, and no procedure can be performed without your approval." },
      { soru: "What treatments can I get quotes for?", cevap: "You can get quotes for dental treatment, hair transplant, eye surgery, plastic surgery, orthopedics, check-up and more. Our clinics offer a wide range of treatments." },
      { soru: "Can I arrange hotel and transfer too?", cevap: "Yes! On Medoqa you can plan clinic, hotel and transfer services all from one platform. Our partner hotels and transfer companies offer packages suited to your treatment duration." },
      { soru: "What if I'm not satisfied with my treatment?", cevap: "If you experience issues, first contact your Medoqa coordinator. Medoqa provides mediation services and works with the clinic to resolve your issue." },
      { soru: "What languages are supported?", cevap: "The platform fully supports Turkish, English, German, Arabic, Russian and French. Our coordinators can communicate in these languages." },
      { soru: "What do I need to do to get a quote?", cevap: "Click the 'Get Free Quote' button on the homepage, select your treatment and upload any X-rays or photos. That's it — clinics will reach out to you." },
    ],
  },
  de: {
    baslik: "Häufig gestellte Fragen",
    alt: "Finden Sie hier Antworten auf Ihre Fragen.",
    sorular: [
      { soru: "Wie funktioniert Medoqa?", cevap: "Sie erstellen eine Angebotsanfrage, und verifizierte Kliniken senden innerhalb von 2-4 Stunden Angebote. Sie vergleichen und genehmigen das bevorzugte Angebot. Ihre Zahlung bleibt auf Medoqas sicherem Konto und wird erst nach Abschluss der Behandlung freigegeben." },
      { soru: "Ist Medoqa kostenlos?", cevap: "Ja, für Patienten völlig kostenlos. Angebote einholen, vergleichen und über die Plattform kommunizieren ist kostenlos. Medoqa berechnet nur Kliniken eine Provision." },
      { soru: "Wie funktioniert das Treuhandkonto-System?", cevap: "Sie zahlen auf Medoqas sicheres Konto. Das Geld geht erst an die Klinik, wenn Sie die Behandlung bestätigen. Dieses System schützt sowohl Sie als auch die Klinik." },
      { soru: "Wie werden Kliniken verifiziert?", cevap: "Jede Klinik muss ein Gesundheitsministeriumszertifikat, Betriebslizenz, Ärztezertifikate und Versicherungspolice vorlegen. Unser Admin-Team prüft alle Dokumente manuell." },
      { soru: "Was passiert, wenn Zusatzeingriffe nötig sind?", cevap: "Die Klinik muss Ihre schriftliche Genehmigung einholen, bevor sie Zusatzeingriffe durchführt. Sie erhalten ein Zusatzangebot über die Plattform, und ohne Ihre Genehmigung kann nichts gemacht werden." },
      { soru: "Für welche Behandlungen kann ich Angebote einholen?", cevap: "Sie können Angebote für Zahnbehandlung, Haartransplantation, Augenoperation, Schönheitschirurgie, Orthopädie, Check-up und mehr einholen." },
      { soru: "Kann ich auch Hotel und Transfer buchen?", cevap: "Ja! Auf Medoqa können Sie Klinik, Hotel und Transfer auf einer Plattform planen. Unsere Partnerhotels und Transferunternehmen bieten passende Pakete." },
      { soru: "Was, wenn ich mit meiner Behandlung unzufrieden bin?", cevap: "Bei Problemen wenden Sie sich an Ihren Medoqa-Koordinator. Medoqa bietet Mediationsservices und arbeitet mit der Klinik zur Lösung Ihres Problems." },
      { soru: "Welche Sprachen werden unterstützt?", cevap: "Die Plattform unterstützt vollständig Türkisch, Englisch, Deutsch, Arabisch, Russisch und Französisch." },
      { soru: "Was muss ich tun, um ein Angebot zu erhalten?", cevap: "Klicken Sie auf 'Kostenloses Angebot', wählen Sie Ihre Behandlung und laden Sie Röntgenbilder oder Fotos hoch. Das war's — Kliniken melden sich bei Ihnen." },
    ],
  },
  ar: {
    baslik: "الأسئلة الشائعة",
    alt: "ابحث هنا عن إجابات لأسئلتك.",
    sorular: [
      { soru: "كيف يعمل ميدوقا؟", cevap: "تنشئ طلب عرض، وترسل العيادات المعتمدة عروضاً خلال 2-4 ساعات. تقارن وتوافق على العرض المفضل. تبقى مدفوعاتك في حساب ميدوقا الآمن ولا تُحوَّل للعيادة إلا بعد اكتمال العلاج." },
      { soru: "هل ميدوقا مجاني؟", cevap: "نعم، مجاني تماماً للمرضى. الحصول على العروض والمقارنة والتواصل عبر المنصة مجاني. ميدوقا يتقاضى عمولة من العيادات فقط." },
      { soru: "كيف يعمل نظام الدفع الضمني؟", cevap: "تدفع لحساب ميدوقا الآمن. لا تذهب الأموال للعيادة حتى تؤكد اكتمال العلاج. هذا النظام يحمي كلاً منك ومن العيادة." },
      { soru: "كيف يتم التحقق من العيادات؟", cevap: "يجب على كل عيادة تقديم شهادة وزارة الصحة وترخيص التشغيل وشهادات الأطباء ووثيقة التأمين. يراجع فريقنا جميع الوثائق يدوياً." },
      { soru: "ماذا يحدث إذا احتجت إلى إجراءات إضافية؟", cevap: "يجب على العيادة الحصول على موافقتك الكتابية قبل أي إجراء إضافي. تُرسل لك عرضاً إضافياً عبر المنصة، ولا يمكن إجراء أي شيء بدون موافقتك." },
      { soru: "لأي علاجات يمكنني الحصول على عروض؟", cevap: "يمكنك الحصول على عروض لعلاج الأسنان وزراعة الشعر وجراحة العيون والجراحة التجميلية وطب العظام والفحص الشامل وغيرها." },
      { soru: "هل يمكنني ترتيب الفندق والنقل أيضاً؟", cevap: "نعم! في ميدوقا يمكنك التخطيط للعيادة والفندق وخدمات النقل من منصة واحدة." },
      { soru: "ماذا لو لم أكن راضياً عن علاجي؟", cevap: "في حال وجود مشاكل، تواصل مع منسق ميدوقا. يوفر ميدوقا خدمات الوساطة ويعمل مع العيادة لحل مشكلتك." },
      { soru: "ما اللغات المدعومة؟", cevap: "تدعم المنصة بالكامل العربية والتركية والإنجليزية والألمانية والروسية والفرنسية." },
      { soru: "ماذا أفعل للحصول على عرض؟", cevap: "انقر على 'احصل على عرض مجاني' في الصفحة الرئيسية، اختر علاجك وارفع أي أشعة أو صور. هذا كل شيء." },
    ],
  },
  ru: {
    baslik: "Часто задаваемые вопросы",
    alt: "Найдите ответы на свои вопросы здесь.",
    sorular: [
      { soru: "Как работает Medoqa?", cevap: "Вы создаёте запрос на предложение, и проверенные клиники присылают предложения в течение 2-4 часов. Вы сравниваете и одобряете предпочтительное предложение. Ваш платёж остаётся на защищённом счёте Medoqa и передаётся клинике только после завершения лечения." },
      { soru: "Medoqa бесплатен?", cevap: "Да, полностью бесплатен для пациентов. Получение предложений, сравнение и общение через платформу бесплатны. Medoqa взимает комиссию только с клиник." },
      { soru: "Как работает система эскроу-платежей?", cevap: "Вы вносите оплату на защищённый счёт Medoqa. Деньги не поступают в клинику, пока вы не подтвердите завершение лечения. Эта система защищает как вас, так и клинику." },
      { soru: "Как проверяются клиники?", cevap: "Каждая клиника должна предоставить сертификат Министерства здравоохранения, лицензию на работу, сертификаты врачей и страховой полис. Наша команда проверяет все документы вручную." },
      { soru: "Что происходит, если нужны дополнительные процедуры?", cevap: "Клиника должна получить ваше письменное согласие перед любой дополнительной процедурой. Вам отправляется дополнительное предложение через платформу, и без вашего одобрения ничего нельзя делать." },
      { soru: "Для каких процедур я могу получить предложения?", cevap: "Вы можете получить предложения по стоматологии, пересадке волос, операции на глазах, пластической хирургии, ортопедии, чек-апу и многому другому." },
      { soru: "Можно ли также организовать отель и трансфер?", cevap: "Да! На Medoqa вы можете планировать клинику, отель и трансфер с одной платформы." },
      { soru: "Что если я недоволен лечением?", cevap: "При возникновении проблем обратитесь к координатору Medoqa. Medoqa предоставляет услуги посредничества и работает с клиникой для решения вашей проблемы." },
      { soru: "Какие языки поддерживаются?", cevap: "Платформа полностью поддерживает русский, турецкий, английский, немецкий, арабский и французский языки." },
      { soru: "Что нужно сделать для получения предложения?", cevap: "Нажмите 'Получить бесплатное предложение' на главной странице, выберите лечение и загрузите рентгеновские снимки или фотографии. Вот и всё — клиники свяжутся с вами." },
    ],
  },
  fr: {
    baslik: "Questions fréquemment posées",
    alt: "Trouvez ici les réponses à vos questions.",
    sorular: [
      { soru: "Comment fonctionne Medoqa ?", cevap: "Vous créez une demande de devis, et des cliniques vérifiées envoient des offres en 2-4 heures. Vous comparez et approuvez votre offre préférée. Votre paiement reste sur le compte sécurisé de Medoqa et n'est libéré à la clinique qu'après la fin du traitement." },
      { soru: "Medoqa est-il gratuit ?", cevap: "Oui, entièrement gratuit pour les patients. Obtenir des devis, comparer et communiquer via la plateforme est gratuit. Medoqa ne facture une commission qu'aux cliniques." },
      { soru: "Comment fonctionne le système de paiement sécurisé ?", cevap: "Vous effectuez votre paiement sur le compte sécurisé de Medoqa. L'argent ne va à la clinique que lorsque vous confirmez la fin du traitement. Ce système vous protège vous et la clinique." },
      { soru: "Comment les cliniques sont-elles vérifiées ?", cevap: "Chaque clinique doit soumettre un certificat du Ministère de la Santé, une licence d'exploitation, des certificats de médecins et une police d'assurance. Notre équipe examine manuellement tous les documents." },
      { soru: "Que se passe-t-il si des actes supplémentaires sont nécessaires ?", cevap: "La clinique doit obtenir votre accord écrit avant tout acte supplémentaire. Elle vous envoie une offre supplémentaire via la plateforme, et rien ne peut être fait sans votre approbation." },
      { soru: "Pour quels traitements puis-je obtenir des devis ?", cevap: "Vous pouvez obtenir des devis pour soins dentaires, greffe de cheveux, chirurgie oculaire, chirurgie plastique, orthopédie, bilan de santé et bien plus." },
      { soru: "Puis-je aussi organiser hôtel et transfert ?", cevap: "Oui ! Sur Medoqa vous pouvez planifier clinique, hôtel et transfert depuis une seule plateforme." },
      { soru: "Que faire si je ne suis pas satisfait de mon traitement ?", cevap: "En cas de problème, contactez votre coordinateur Medoqa. Medoqa fournit des services de médiation et travaille avec la clinique pour résoudre votre problème." },
      { soru: "Quelles langues sont prises en charge ?", cevap: "La plateforme prend entièrement en charge le français, le turc, l'anglais, l'allemand, l'arabe et le russe." },
      { soru: "Que dois-je faire pour obtenir un devis ?", cevap: "Cliquez sur 'Obtenir un devis gratuit' sur la page d'accueil, sélectionnez votre traitement et téléchargez des radios ou photos. C'est tout — les cliniques vous contacteront." },
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
            <div key={i} style={{ background: "#fff", borderRadius: "12px", border: `1px solid ${acik === i ? "#534AB7" : "#e8e6ff"}`, overflow: "hidden", transition: "border .2s" }}>
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
