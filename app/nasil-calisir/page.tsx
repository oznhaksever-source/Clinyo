"use client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NasilCalisirPage() {
  const { dil } = useDil();

  const m = {
    tr: {
      baslik: "Nasıl Çalışır?",
      alt: "Medoqa ile tedavinizi planlamak 4 adımda tamamlanır.",
      adimlar: [
        {
          no: "01", ikon: "📋", baslik: "Teklif Talebi Oluşturun",
          aciklama: "Tedavinizi seçin ve formu doldurun. Varsa röntgen, fotoğraf veya tıbbi belgelerinizi yükleyin. Bu adım tamamen ücretsizdir, hiçbir taahhüt gerektirmez.",
          detaylar: ["Tedavi kategorisini seçin", "Kişisel bilgilerinizi girin", "Belge yükleyin (opsiyonel)", "Talebi gönderin"]
        },
        {
          no: "02", ikon: "🏥", baslik: "Kliniklerden Teklif Alın",
          aciklama: "Sağlık Bakanlığı onaylı klinikler talebinizi inceler ve 2-4 saat içinde kişiselleştirilmiş teklifler gönderir. Fiyat, tedavi kapsamı ve doktor profillerini karşılaştırın.",
          detaylar: ["Onaylı klinikler teklifinizi inceler", "2-4 saat içinde teklif gelir", "Fiyat ve kapsam karşılaştırın", "Klinikle mesajlaşın"]
        },
        {
          no: "03", ikon: "✈️", baslik: "Seyahatinizi Planlayın",
          aciklama: "Seçtiğiniz teklifi onaylayın. Otel ve transfer seçeneklerini platformdan kolayca planlayın. Klinik koordinatörünüzle doğrudan iletişimde kalın.",
          detaylar: ["Teklifi onaylayın", "Otel ve transfer planlayın", "Klinikle randevu ayarlayın", "Seyahat hazırlığını tamamlayın"]
        },
        {
          no: "04", ikon: "✅", baslik: "Tedavinizi Tamamlayın",
          aciklama: "Kliniğe gidin, tedavinizi tamamlayın. Süreç boyunca sorularınız için Medoqa ekibi ulaşılabilir. Tedaviniz bittikten sonra deneyiminizi platformda paylaşabilirsiniz.",
          detaylar: ["Kliniğe gidin", "Tedaviyi tamamlayın", "Medoqa ekibine ulaşın", "Yorum yazın"]
        },
      ],
      guvenBaslik: "Güvencelerimiz",
      guvenler: [
        { ikon: "✅", baslik: "Onaylı Klinikler", aciklama: "Tüm klinikler Sağlık Bakanlığı belgeli ve admin incelemesinden geçmiştir. Belgesi olmayan klinik platforma kabul edilmez." },
        { ikon: "⚖️", baslik: "Şeffaf Fiyatlandırma", aciklama: "Klinikler fiyatlarını önceden açıkça belirtir. Gizli ücret yoktur, son dakika sürprizi olmaz." },
        { ikon: "🛡️", baslik: "Ek İşlem Koruması", aciklama: "Klinik ek işlem önerecekse önce sizin onayınızı almak zorundadır. Onayınız olmadan hiçbir ek işlem yapılamaz." },
        { ikon: "💬", baslik: "Kayıtlı İletişim", aciklama: "Klinikle tüm yazışmalarınız platform üzerinden gerçekleşir ve kayıt altındadır. Söz uçar, yazı kalır." },
        { ikon: "⭐", baslik: "Doğrulanmış Yorumlar", aciklama: "Sadece gerçek hastalar yorum yazabilir. Sahte yorum kabul edilmez." },
        { ikon: "🌍", baslik: "6 Dil Desteği", aciklama: "TR, EN, DE, AR, RU, FR dillerinde tam destek. Dil engeli olmadan tedavinizi planlayın." },
      ],
      ctaBaslik: "Hemen Başlayın",
      ctaAlt: "Ücretsiz teklif alın, karşılaştırın, en iyisini seçin.",
      ctaBtn: "Ücretsiz Teklif Al",
    },
    en: {
      baslik: "How Does It Work?",
      alt: "Planning your treatment with Medoqa is completed in 4 steps.",
      adimlar: [
        {
          no: "01", ikon: "📋", baslik: "Create a Quote Request",
          aciklama: "Choose your treatment and fill out the form. Upload X-rays, photos or medical documents if available. This step is completely free with no commitment.",
          detaylar: ["Select treatment category", "Enter your personal information", "Upload documents (optional)", "Submit the request"]
        },
        {
          no: "02", ikon: "🏥", baslik: "Receive Quotes from Clinics",
          aciklama: "Ministry of Health approved clinics review your request and send personalized quotes within 2-4 hours. Compare prices, treatment scope and doctor profiles.",
          detaylar: ["Approved clinics review your request", "Quotes arrive within 2-4 hours", "Compare price and scope", "Message the clinic"]
        },
        {
          no: "03", ikon: "✈️", baslik: "Plan Your Journey",
          aciklama: "Approve your chosen quote. Easily plan hotel and transfer options from the platform. Stay in direct contact with your clinic coordinator.",
          detaylar: ["Approve the offer", "Plan hotel and transfer", "Arrange appointment with clinic", "Complete travel preparations"]
        },
        {
          no: "04", ikon: "✅", baslik: "Complete Your Treatment",
          aciklama: "Visit the clinic and complete your treatment. The Medoqa team is reachable throughout for any questions. After treatment, share your experience on the platform.",
          detaylar: ["Visit the clinic", "Complete treatment", "Reach the Medoqa team", "Write a review"]
        },
      ],
      guvenBaslik: "Our Assurances",
      guvenler: [
        { ikon: "✅", baslik: "Verified Clinics", aciklama: "All clinics have submitted Ministry of Health documents and passed admin review. No documentation, no platform access." },
        { ikon: "⚖️", baslik: "Transparent Pricing", aciklama: "Clinics clearly state prices upfront. No hidden fees, no last-minute surprises." },
        { ikon: "🛡️", baslik: "Extra Procedure Protection", aciklama: "If a clinic wants to perform an extra procedure, they must obtain your approval first. No extras without your signature." },
        { ikon: "💬", baslik: "Recorded Communication", aciklama: "All communication with the clinic happens via the platform and is on record. No verbal-only commitments." },
        { ikon: "⭐", baslik: "Verified Reviews", aciklama: "Only real patients can leave reviews. Fake reviews are not accepted." },
        { ikon: "🌍", baslik: "6 Language Support", aciklama: "Full support in TR, EN, DE, AR, RU, FR. Plan your treatment without language barriers." },
      ],
      ctaBaslik: "Get Started Now",
      ctaAlt: "Get free quotes, compare, choose the best.",
      ctaBtn: "Get Free Quote",
    },
    de: {
      baslik: "Wie funktioniert es?",
      alt: "Die Planung Ihrer Behandlung mit Medoqa ist in 4 Schritten abgeschlossen.",
      adimlar: [
        {
          no: "01", ikon: "📋", baslik: "Angebotsanfrage erstellen",
          aciklama: "Wählen Sie Ihre Behandlung und füllen Sie das Formular aus. Laden Sie Röntgenbilder, Fotos oder Unterlagen hoch. Dieser Schritt ist völlig kostenlos.",
          detaylar: ["Behandlungskategorie auswählen", "Persönliche Daten eingeben", "Dokumente hochladen (optional)", "Anfrage absenden"]
        },
        {
          no: "02", ikon: "🏥", baslik: "Angebote erhalten",
          aciklama: "Vom Gesundheitsministerium zugelassene Kliniken prüfen Ihre Anfrage und senden innerhalb von 2-4 Stunden Angebote. Vergleichen Sie Preise und Leistungen.",
          detaylar: ["Kliniken prüfen Ihre Anfrage", "Angebote kommen in 2-4 Stunden", "Preis und Umfang vergleichen", "Mit der Klinik chatten"]
        },
        {
          no: "03", ikon: "✈️", baslik: "Reise planen",
          aciklama: "Genehmigen Sie das gewählte Angebot. Planen Sie Hotel und Transfer bequem über die Plattform. Bleiben Sie in direktem Kontakt mit Ihrem Klinik-Koordinator.",
          detaylar: ["Angebot genehmigen", "Hotel und Transfer planen", "Termin mit Klinik vereinbaren", "Reisevorbereitungen abschließen"]
        },
        {
          no: "04", ikon: "✅", baslik: "Behandlung abschließen",
          aciklama: "Besuchen Sie die Klinik und schließen Sie Ihre Behandlung ab. Das Medoqa-Team ist bei Fragen erreichbar. Danach können Sie Ihre Erfahrung teilen.",
          detaylar: ["Zur Klinik gehen", "Behandlung abschließen", "Medoqa-Team kontaktieren", "Bewertung schreiben"]
        },
      ],
      guvenBaslik: "Unsere Sicherheiten",
      guvenler: [
        { ikon: "✅", baslik: "Verifizierte Kliniken", aciklama: "Alle Kliniken haben Dokumente des Gesundheitsministeriums eingereicht und eine Admin-Prüfung durchlaufen." },
        { ikon: "⚖️", baslik: "Transparente Preise", aciklama: "Kliniken geben Preise vorab klar an. Keine versteckten Gebühren, keine Überraschungen." },
        { ikon: "🛡️", baslik: "Schutz vor Zusatzeingriffen", aciklama: "Klinik muss Ihre Genehmigung einholen, bevor Zusatzeingriffe durchgeführt werden." },
        { ikon: "💬", baslik: "Dokumentierte Kommunikation", aciklama: "Alle Kommunikation läuft über die Plattform und ist dokumentiert." },
        { ikon: "⭐", baslik: "Verifizierte Bewertungen", aciklama: "Nur echte Patienten können Bewertungen hinterlassen." },
        { ikon: "🌍", baslik: "6-Sprachen-Support", aciklama: "Vollständiger Support auf TR, EN, DE, AR, RU, FR." },
      ],
      ctaBaslik: "Jetzt loslegen",
      ctaAlt: "Kostenlose Angebote einholen, vergleichen, das Beste wählen.",
      ctaBtn: "Kostenloses Angebot",
    },
    ar: {
      baslik: "كيف يعمل؟",
      alt: "التخطيط لعلاجك مع ميدوقا يتم في 4 خطوات.",
      adimlar: [
        {
          no: "01", ikon: "📋", baslik: "أنشئ طلب عرض",
          aciklama: "اختر علاجك واملأ النموذج. ارفع الأشعة أو الصور إذا توفرت. هذه الخطوة مجانية تماماً.",
          detaylar: ["اختر فئة العلاج", "أدخل بياناتك الشخصية", "ارفع الوثائق (اختياري)", "أرسل الطلب"]
        },
        {
          no: "02", ikon: "🏥", baslik: "احصل على عروض",
          aciklama: "العيادات المعتمدة تراجع طلبك وترسل عروضاً خلال 2-4 ساعات. قارن الأسعار والنطاق وملفات الأطباء.",
          detaylar: ["العيادات تراجع طلبك", "العروض تصل خلال 2-4 ساعات", "قارن السعر والنطاق", "راسل العيادة"]
        },
        {
          no: "03", ikon: "✈️", baslik: "خطط لرحلتك",
          aciklama: "وافق على العرض المختار. خطط لخيارات الفندق والنقل بسهولة من المنصة. ابقَ على تواصل مباشر مع منسق العيادة.",
          detaylar: ["وافق على العرض", "خطط للفندق والنقل", "رتب موعداً مع العيادة", "أكمل استعدادات السفر"]
        },
        {
          no: "04", ikon: "✅", baslik: "أكمل علاجك",
          aciklama: "اذهب للعيادة وأكمل علاجك. فريق ميدوقا متاح طوال الفترة لأي استفسار. بعد العلاج يمكنك مشاركة تجربتك.",
          detaylar: ["اذهب للعيادة", "أكمل العلاج", "تواصل مع فريق ميدوقا", "اكتب تقييماً"]
        },
      ],
      guvenBaslik: "ضماناتنا",
      guvenler: [
        { ikon: "✅", baslik: "عيادات معتمدة", aciklama: "جميع العيادات قدمت وثائق وزارة الصحة واجتازت مراجعة الإدارة. بدون وثائق لا يوجد وصول للمنصة." },
        { ikon: "⚖️", baslik: "أسعار شفافة", aciklama: "العيادات تحدد الأسعار مسبقاً بوضوح. لا رسوم خفية ولا مفاجآت." },
        { ikon: "🛡️", baslik: "حماية من الإجراءات الإضافية", aciklama: "يجب على العيادة الحصول على موافقتك قبل أي إجراء إضافي." },
        { ikon: "💬", baslik: "تواصل موثق", aciklama: "جميع المراسلات مع العيادة تتم عبر المنصة وتكون مسجلة." },
        { ikon: "⭐", baslik: "تقييمات موثقة", aciklama: "فقط المرضى الحقيقيون يمكنهم ترك تقييمات." },
        { ikon: "🌍", baslik: "دعم 6 لغات", aciklama: "دعم كامل بـ TR, EN, DE, AR, RU, FR." },
      ],
      ctaBaslik: "ابدأ الآن",
      ctaAlt: "احصل على عروض مجانية، قارن، اختر الأفضل.",
      ctaBtn: "احصل على عرض مجاني",
    },
    ru: {
      baslik: "Как это работает?",
      alt: "Планирование лечения с Medoqa завершается за 4 шага.",
      adimlar: [
        {
          no: "01", ikon: "📋", baslik: "Создайте запрос",
          aciklama: "Выберите лечение и заполните форму. Загрузите рентген, фото или медицинские документы при наличии. Этот шаг полностью бесплатен.",
          detaylar: ["Выберите категорию лечения", "Введите личные данные", "Загрузите документы (необязательно)", "Отправьте запрос"]
        },
        {
          no: "02", ikon: "🏥", baslik: "Получите предложения",
          aciklama: "Сертифицированные клиники рассматривают запрос и присылают предложения в течение 2-4 часов. Сравните цены, объём и профили врачей.",
          detaylar: ["Клиники рассматривают запрос", "Предложения приходят за 2-4 часа", "Сравните цену и объём", "Напишите клинике"]
        },
        {
          no: "03", ikon: "✈️", baslik: "Спланируйте поездку",
          aciklama: "Одобрите выбранное предложение. Удобно запланируйте отель и трансфер через платформу. Оставайтесь на связи с координатором клиники.",
          detaylar: ["Одобрите предложение", "Забронируйте отель и трансфер", "Согласуйте встречу с клиникой", "Завершите подготовку к поездке"]
        },
        {
          no: "04", ikon: "✅", baslik: "Завершите лечение",
          aciklama: "Посетите клинику и завершите лечение. Команда Medoqa доступна для вопросов в любое время. После лечения поделитесь опытом на платформе.",
          detaylar: ["Отправляйтесь в клинику", "Завершите лечение", "Свяжитесь с командой Medoqa", "Оставьте отзыв"]
        },
      ],
      guvenBaslik: "Наши гарантии",
      guvenler: [
        { ikon: "✅", baslik: "Проверенные клиники", aciklama: "Все клиники предоставили документы Министерства здравоохранения и прошли проверку администратора." },
        { ikon: "⚖️", baslik: "Прозрачные цены", aciklama: "Клиники заранее чётко указывают цены. Никаких скрытых платежей и сюрпризов." },
        { ikon: "🛡️", baslik: "Защита от доп. процедур", aciklama: "Клиника обязана получить ваше согласие перед любой дополнительной процедурой." },
        { ikon: "💬", baslik: "Задокументированная переписка", aciklama: "Всё общение с клиникой происходит через платформу и фиксируется." },
        { ikon: "⭐", baslik: "Подтверждённые отзывы", aciklama: "Только реальные пациенты могут оставлять отзывы." },
        { ikon: "🌍", baslik: "Поддержка 6 языков", aciklama: "Полная поддержка на TR, EN, DE, AR, RU, FR." },
      ],
      ctaBaslik: "Начните сейчас",
      ctaAlt: "Получите бесплатные предложения, сравните, выберите лучшее.",
      ctaBtn: "Получить бесплатное предложение",
    },
    fr: {
      baslik: "Comment ça marche ?",
      alt: "Planifier votre traitement avec Medoqa se fait en 4 étapes.",
      adimlar: [
        {
          no: "01", ikon: "📋", baslik: "Créez une demande de devis",
          aciklama: "Choisissez votre traitement et remplissez le formulaire. Téléchargez radios, photos ou documents médicaux si disponibles. Cette étape est gratuite.",
          detaylar: ["Sélectionnez la catégorie", "Entrez vos informations", "Téléchargez des documents (optionnel)", "Envoyez la demande"]
        },
        {
          no: "02", ikon: "🏥", baslik: "Recevez des devis",
          aciklama: "Les cliniques approuvées examinent votre demande et envoient des devis en 2-4 heures. Comparez prix, contenu et profils des médecins.",
          detaylar: ["Les cliniques examinent votre demande", "Devis reçus en 2-4 heures", "Comparez prix et contenu", "Messagez la clinique"]
        },
        {
          no: "03", ikon: "✈️", baslik: "Planifiez votre voyage",
          aciklama: "Approuvez le devis choisi. Planifiez facilement hôtel et transfert depuis la plateforme. Restez en contact direct avec votre coordinateur de clinique.",
          detaylar: ["Approuvez l'offre", "Planifiez hôtel et transfert", "Prenez rendez-vous avec la clinique", "Finalisez les préparatifs"]
        },
        {
          no: "04", ikon: "✅", baslik: "Finalisez votre traitement",
          aciklama: "Visitez la clinique et terminez votre traitement. L'équipe Medoqa est joignable à tout moment. Après le traitement, partagez votre expérience.",
          detaylar: ["Allez à la clinique", "Finalisez le traitement", "Contactez l'équipe Medoqa", "Écrivez un avis"]
        },
      ],
      guvenBaslik: "Nos assurances",
      guvenler: [
        { ikon: "✅", baslik: "Cliniques vérifiées", aciklama: "Toutes les cliniques ont soumis des documents du Ministère de la Santé et passé une revue admin." },
        { ikon: "⚖️", baslik: "Prix transparents", aciklama: "Les cliniques indiquent clairement leurs prix à l'avance. Pas de frais cachés ni de surprises." },
        { ikon: "🛡️", baslik: "Protection actes supplémentaires", aciklama: "La clinique doit obtenir votre accord avant tout acte supplémentaire." },
        { ikon: "💬", baslik: "Communication enregistrée", aciklama: "Toute communication avec la clinique passe par la plateforme et est enregistrée." },
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
