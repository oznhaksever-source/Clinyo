"use client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NasilCalisirPage() {
  const { dil } = useDil();

  const m = {
    tr: {
      baslik: "Nasıl Çalışır?",
      alt: "Medoqa ile tedavinizi planlamak 3 adımda tamamlanır.",
      adimlar: [
        { no: "01", ikon: "📋", baslik: "Teklif Talebi Oluşturun", aciklama: "Tedavinizi seçin ve formу doldurun. Varsa röntgen, fotoğraf veya tıbbi belgelerinizi yükleyin. Bu adım tamamen ücretsizdir, hiçbir taahhüt gerektirmez.", detaylar: ["Tedavi kategorisini seçin", "Kişisel bilgilerinizi girin", "Belge yükleyin (opsiyonel)", "Talebi gönderin"] },
        { no: "02", ikon: "🏥", baslik: "Kliniklerden Teklif Alın", aciklama: "Sağlık Bakanlığı onaylı klinikler talebinizi inceler ve 2-4 saat içinde kişiselleştirilmiş teklifler gönderir. Fiyat, tedavi kapsamı ve doktor profillerini karşılaştırın.", detaylar: ["Onaylı klinikler teklifinizi inceler", "2-4 saat içinde teklif gelir", "Fiyat ve kapsam karşılaştırın", "Klinikle mesajlaşın"] },
        { no: "03", ikon: "🔒", baslik: "Güvenle Ödeme Yapın", aciklama: "Seçtiğiniz teklifi onaylayın. Ödemeniz Medoqa'nın güvenli hesabında bekler — tedaviniz tamamlanıp siz onaylayana kadar kliniğe geçmez.", detaylar: ["Teklifi onaylayın", "Güvenli ödeme yapın", "Otel ve transfer planlayın", "Kliniğe gidin"] },
        { no: "04", ikon: "✅", baslik: "Tedavinizi Tamamlayın", aciklama: "Tedaviniz bittikten sonra platformdan onay verin. Ödeme kliniğe geçer, siz de deneyiminizi paylaşabilirsiniz.", detaylar: ["Tedaviye gidin", "Tedaviyi tamamlayın", "Platform üzerinden onaylayın", "Yorum yazın"] },
      ],
      guvenBaslik: "Güvencelerimiz",
      guvenler: [
        { ikon: "🔒", baslik: "Blokeli Ödeme", aciklama: "Ödemeniz tedavi tamamlanana kadar Medoqa'da güvende bekler." },
        { ikon: "✅", baslik: "Onaylı Klinikler", aciklama: "Tüm klinikler Sağlık Bakanlığı belgeli ve admin onaylıdır." },
        { ikon: "🛡️", baslik: "Ek İşlem Koruması", aciklama: "Onayınız olmadan hiçbir ek işlem yapılamaz." },
        { ikon: "💬", baslik: "Koordinatör Desteği", aciklama: "7/24 Medoqa koordinatörü tedavi sürecinizde yanınızda." },
        { ikon: "⭐", baslik: "Doğrulanmış Yorumlar", aciklama: "Sadece gerçek hastalar yorum yazabilir." },
        { ikon: "🌍", baslik: "6 Dil Desteği", aciklama: "TR, EN, DE, AR, RU, FR dillerinde tam destek." },
      ],
      ctaBaslik: "Hemen Başlayın",
      ctaAlt: "Ücretsiz teklif alın, karşılaştırın, en iyisini seçin.",
      ctaBtn: "Ücretsiz Teklif Al",
    },
    en: {
      baslik: "How Does It Work?",
      alt: "Planning your treatment with Medoqa is completed in 3 steps.",
      adimlar: [
        { no: "01", ikon: "📋", baslik: "Create a Quote Request", aciklama: "Choose your treatment and fill out the form. Upload X-rays, photos or medical documents if available. This step is completely free with no commitment.", detaylar: ["Select treatment category", "Enter your personal information", "Upload documents (optional)", "Submit the request"] },
        { no: "02", ikon: "🏥", baslik: "Receive Quotes from Clinics", aciklama: "Ministry of Health approved clinics review your request and send personalized quotes within 2-4 hours. Compare prices, treatment scope and doctor profiles.", detaylar: ["Approved clinics review your request", "Quotes arrive within 2-4 hours", "Compare price and scope", "Message the clinic"] },
        { no: "03", ikon: "🔒", baslik: "Pay Securely", aciklama: "Approve your chosen quote. Your payment waits in Medoqa's secure account — it doesn't go to the clinic until treatment is complete and you approve.", detaylar: ["Approve the offer", "Make secure payment", "Plan hotel and transfer", "Visit the clinic"] },
        { no: "04", ikon: "✅", baslik: "Complete Your Treatment", aciklama: "After your treatment is done, confirm through the platform. Payment goes to the clinic and you can share your experience.", detaylar: ["Go to treatment", "Complete treatment", "Confirm via platform", "Write a review"] },
      ],
      guvenBaslik: "Our Guarantees",
      guvenler: [
        { ikon: "🔒", baslik: "Escrow Payment", aciklama: "Your payment stays safe with Medoqa until treatment is complete." },
        { ikon: "✅", baslik: "Verified Clinics", aciklama: "All clinics are Ministry of Health certified and admin approved." },
        { ikon: "🛡️", baslik: "Extra Procedure Protection", aciklama: "No extra procedure can be performed without your approval." },
        { ikon: "💬", baslik: "Coordinator Support", aciklama: "Medoqa coordinator by your side throughout the treatment process." },
        { ikon: "⭐", baslik: "Verified Reviews", aciklama: "Only real patients can leave reviews." },
        { ikon: "🌍", baslik: "6 Language Support", aciklama: "Full support in TR, EN, DE, AR, RU, FR." },
      ],
      ctaBaslik: "Get Started Now",
      ctaAlt: "Get free quotes, compare, choose the best.",
      ctaBtn: "Get Free Quote",
    },
    de: {
      baslik: "Wie funktioniert es?",
      alt: "Die Planung Ihrer Behandlung mit Medoqa ist in 3 Schritten abgeschlossen.",
      adimlar: [
        { no: "01", ikon: "📋", baslik: "Angebotsanfrage erstellen", aciklama: "Wählen Sie Ihre Behandlung und füllen Sie das Formular aus. Laden Sie Röntgenbilder, Fotos oder Unterlagen hoch. Dieser Schritt ist völlig kostenlos.", detaylar: ["Behandlungskategorie auswählen", "Persönliche Daten eingeben", "Dokumente hochladen (optional)", "Anfrage absenden"] },
        { no: "02", ikon: "🏥", baslik: "Angebote erhalten", aciklama: "Vom Gesundheitsministerium zugelassene Kliniken prüfen Ihre Anfrage und senden innerhalb von 2-4 Stunden Angebote.", detaylar: ["Kliniken prüfen Ihre Anfrage", "Angebote kommen in 2-4 Stunden", "Preis und Umfang vergleichen", "Mit der Klinik chatten"] },
        { no: "03", ikon: "🔒", baslik: "Sicher bezahlen", aciklama: "Genehmigen Sie das gewählte Angebot. Ihre Zahlung wartet auf Medoqas sicherem Konto — bis zur Behandlung.", detaylar: ["Angebot genehmigen", "Sicher bezahlen", "Hotel und Transfer planen", "Zur Klinik gehen"] },
        { no: "04", ikon: "✅", baslik: "Behandlung abschließen", aciklama: "Nach der Behandlung bestätigen Sie über die Plattform. Zahlung geht an die Klinik.", detaylar: ["Zur Behandlung gehen", "Behandlung abschließen", "Über Plattform bestätigen", "Bewertung schreiben"] },
      ],
      guvenBaslik: "Unsere Garantien",
      guvenler: [
        { ikon: "🔒", baslik: "Treuhandkonto", aciklama: "Ihre Zahlung bleibt bei Medoqa sicher bis zur Behandlung." },
        { ikon: "✅", baslik: "Verifizierte Kliniken", aciklama: "Alle Kliniken sind vom Gesundheitsministerium zertifiziert." },
        { ikon: "🛡️", baslik: "Schutz vor Zusatzeingriffen", aciklama: "Kein Zusatzeingriff ohne Ihre Genehmigung." },
        { ikon: "💬", baslik: "Koordinator-Support", aciklama: "Medoqa-Koordinator begleitet Sie durch den Prozess." },
        { ikon: "⭐", baslik: "Verifizierte Bewertungen", aciklama: "Nur echte Patienten können Bewertungen hinterlassen." },
        { ikon: "🌍", baslik: "6-Sprachen-Support", aciklama: "Vollständiger Support auf TR, EN, DE, AR, RU, FR." },
      ],
      ctaBaslik: "Jetzt loslegen",
      ctaAlt: "Kostenlose Angebote einholen, vergleichen, das Beste wählen.",
      ctaBtn: "Kostenloses Angebot",
    },
    ar: {
      baslik: "كيف يعمل؟",
      alt: "التخطيط لعلاجك مع ميدوقا يتم في 3 خطوات.",
      adimlar: [
        { no: "01", ikon: "📋", baslik: "أنشئ طلب عرض", aciklama: "اختر علاجك واملأ النموذج. ارفع الأشعة أو الصور إذا توفرت. هذه الخطوة مجانية تماماً.", detaylar: ["اختر فئة العلاج", "أدخل بياناتك الشخصية", "ارفع الوثائق (اختياري)", "أرسل الطلب"] },
        { no: "02", ikon: "🏥", baslik: "احصل على عروض", aciklama: "العيادات المعتمدة تراجع طلبك وترسل عروضاً خلال 2-4 ساعات.", detaylar: ["العيادات تراجع طلبك", "العروض تصل خلال 2-4 ساعات", "قارن السعر والنطاق", "راسل العيادة"] },
        { no: "03", ikon: "🔒", baslik: "ادفع بأمان", aciklama: "وافق على العرض المختار. مدفوعاتك تنتظر في حساب ميدوقا الآمن حتى اكتمال علاجك.", detaylar: ["وافق على العرض", "ادفع بأمان", "خطط للفندق والنقل", "اذهب للعيادة"] },
        { no: "04", ikon: "✅", baslik: "أكمل علاجك", aciklama: "بعد انتهاء العلاج أكد عبر المنصة. تذهب المدفوعات للعيادة ويمكنك مشاركة تجربتك.", detaylar: ["اذهب للعلاج", "أكمل العلاج", "أكد عبر المنصة", "اكتب تقييماً"] },
      ],
      guvenBaslik: "ضماناتنا",
      guvenler: [
        { ikon: "🔒", baslik: "دفع ضمني", aciklama: "مدفوعاتك آمنة مع ميدوقا حتى اكتمال العلاج." },
        { ikon: "✅", baslik: "عيادات معتمدة", aciklama: "جميع العيادات معتمدة من وزارة الصحة." },
        { ikon: "🛡️", baslik: "حماية من الإجراءات الإضافية", aciklama: "لا يمكن إجراء أي إجراء إضافي بدون موافقتك." },
        { ikon: "💬", baslik: "دعم المنسق", aciklama: "منسق ميدوقا بجانبك طوال العملية." },
        { ikon: "⭐", baslik: "تقييمات موثقة", aciklama: "فقط المرضى الحقيقيون يمكنهم ترك تقييمات." },
        { ikon: "🌍", baslik: "دعم 6 لغات", aciklama: "دعم كامل بـ TR, EN, DE, AR, RU, FR." },
      ],
      ctaBaslik: "ابدأ الآن",
      ctaAlt: "احصل على عروض مجانية، قارن، اختر الأفضل.",
      ctaBtn: "احصل على عرض مجاني",
    },
    ru: {
      baslik: "Как это работает?",
      alt: "Планирование лечения с Medoqa завершается за 3 шага.",
      adimlar: [
        { no: "01", ikon: "📋", baslik: "Создайте запрос", aciklama: "Выберите лечение и заполните форму. Загрузите рентген, фото или медицинские документы при наличии. Этот шаг полностью бесплатен.", detaylar: ["Выберите категорию лечения", "Введите личные данные", "Загрузите документы (необязательно)", "Отправьте запрос"] },
        { no: "02", ikon: "🏥", baslik: "Получите предложения", aciklama: "Сертифицированные клиники рассматривают запрос и присылают предложения в течение 2-4 часов.", detaylar: ["Клиники рассматривают запрос", "Предложения приходят за 2-4 часа", "Сравните цену и объём", "Напишите клинике"] },
        { no: "03", ikon: "🔒", baslik: "Платите безопасно", aciklama: "Одобрите выбранное предложение. Ваш платёж ждёт на защищённом счёте Medoqa до завершения лечения.", detaylar: ["Одобрите предложение", "Внесите безопасный платёж", "Забронируйте отель и трансфер", "Отправляйтесь в клинику"] },
        { no: "04", ikon: "✅", baslik: "Завершите лечение", aciklama: "После лечения подтвердите через платформу. Платёж поступает клинике.", detaylar: ["Отправляйтесь на лечение", "Завершите лечение", "Подтвердите через платформу", "Оставьте отзыв"] },
      ],
      guvenBaslik: "Наши гарантии",
      guvenler: [
        { ikon: "🔒", baslik: "Эскроу-платёж", aciklama: "Ваш платёж в безопасности у Medoqa до завершения лечения." },
        { ikon: "✅", baslik: "Проверенные клиники", aciklama: "Все клиники сертифицированы Министерством здравоохранения." },
        { ikon: "🛡️", baslik: "Защита от доп. процедур", aciklama: "Никаких дополнительных процедур без вашего одобрения." },
        { ikon: "💬", baslik: "Поддержка координатора", aciklama: "Координатор Medoqa сопровождает вас в процессе." },
        { ikon: "⭐", baslik: "Подтверждённые отзывы", aciklama: "Только реальные пациенты могут оставлять отзывы." },
        { ikon: "🌍", baslik: "Поддержка 6 языков", aciklama: "Полная поддержка на TR, EN, DE, AR, RU, FR." },
      ],
      ctaBaslik: "Начните сейчас",
      ctaAlt: "Получите бесплатные предложения, сравните, выберите лучшее.",
      ctaBtn: "Получить бесплатное предложение",
    },
    fr: {
      baslik: "Comment ça marche ?",
      alt: "Planifier votre traitement avec Medoqa se fait en 3 étapes.",
      adimlar: [
        { no: "01", ikon: "📋", baslik: "Créez une demande de devis", aciklama: "Choisissez votre traitement et remplissez le formulaire. Téléchargez radios, photos ou documents médicaux si disponibles. Cette étape est gratuite.", detaylar: ["Sélectionnez la catégorie", "Entrez vos informations", "Téléchargez des documents (optionnel)", "Envoyez la demande"] },
        { no: "02", ikon: "🏥", baslik: "Recevez des devis", aciklama: "Les cliniques approuvées examinent votre demande et envoient des devis en 2-4 heures.", detaylar: ["Les cliniques examinent votre demande", "Devis reçus en 2-4 heures", "Comparez prix et contenu", "Messagez la clinique"] },
        { no: "03", ikon: "🔒", baslik: "Payez en sécurité", aciklama: "Approuvez le devis choisi. Votre paiement attend sur le compte sécurisé de Medoqa jusqu'à la fin du traitement.", detaylar: ["Approuvez l'offre", "Payez en sécurité", "Planifiez hôtel et transfert", "Allez à la clinique"] },
        { no: "04", ikon: "✅", baslik: "Finalisez votre traitement", aciklama: "Après le traitement, confirmez via la plateforme. Le paiement va à la clinique.", detaylar: ["Allez au traitement", "Finalisez le traitement", "Confirmez via la plateforme", "Écrivez un avis"] },
      ],
      guvenBaslik: "Nos garanties",
      guvenler: [
        { ikon: "🔒", baslik: "Paiement sécurisé", aciklama: "Votre paiement reste en sécurité chez Medoqa jusqu'à la fin du traitement." },
        { ikon: "✅", baslik: "Cliniques vérifiées", aciklama: "Toutes les cliniques sont certifiées par le Ministère de la Santé." },
        { ikon: "🛡️", baslik: "Protection actes supp.", aciklama: "Aucun acte supplémentaire sans votre accord." },
        { ikon: "💬", baslik: "Support coordinateur", aciklama: "Coordinateur Medoqa à vos côtés tout au long du processus." },
        { ikon: "⭐", baslik: "Avis vérifiés", aciklama: "Seuls les vrais patients peuvent laisser des avis." },
        { ikon: "🌍", baslik: "Support 6 langues", aciklama: "Support complet en TR, EN, DE, AR, RU, FR." },
      ],
      ctaBaslik: "Commencez maintenant",
      ctaAlt: "Obtenez des devis gratuits, comparez, choisissez le meilleur.",
      ctaBtn: "Obtenir un devis gratuit",
    },
  };

  const ic = m[dil as keyof typeof m] || m.en;

  return (
    <main style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: "80px 16px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "42px", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>{ic.baslik}</h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>{ic.alt}</p>
        </div>
      </section>

      {/* Adımlar */}
      <section style={{ padding: "64px 16px", background: "#f8f9ff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
          {ic.adimlar.map((a, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "20px", padding: "32px", border: "1px solid #e8e6ff", display: "grid", gridTemplateColumns: "auto 1fr", gap: "24px", alignItems: "flex-start" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "8px" }}>{a.ikon}</div>
                <div style={{ fontSize: "36px", fontWeight: 900, color: "rgba(83,74,183,0.15)", fontFamily: "monospace" }}>{a.no}</div>
              </div>
              <div>
                <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#0f0d2e", marginBottom: "12px" }}>{a.baslik}</h2>
                <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.8, marginBottom: "16px" }}>{a.aciklama}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {a.detaylar.map((d, j) => (
                    <span key={j} style={{ background: "#f0eeff", color: "#534AB7", fontSize: "12px", padding: "4px 12px", borderRadius: "20px", fontWeight: 500 }}>✓ {d}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Güvenceler */}
      <section style={{ padding: "64px 16px", background: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#0f0d2e", marginBottom: "32px", textAlign: "center" }}>{ic.guvenBaslik}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {ic.guvenler.map((g, i) => (
              <div key={i} style={{ background: "#f8f9ff", borderRadius: "14px", padding: "24px", border: "1px solid #e8e6ff" }}>
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>{g.ikon}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f0d2e", marginBottom: "8px" }}>{g.baslik}</h3>
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>{g.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#534AB7", padding: "64px 16px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>{ic.ctaBaslik}</h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", marginBottom: "24px" }}>{ic.ctaAlt}</p>
          <a href="/teklif" style={{ display: "inline-block", background: "#fff", color: "#534AB7", padding: "14px 36px", borderRadius: "12px", fontSize: "15px", textDecoration: "none", fontWeight: 700 }}>{ic.ctaBtn}</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
