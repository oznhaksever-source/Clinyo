"use client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HakkimizdaPage() {
  const { dil } = useDil();

  const m = {
    tr: {
      baslik: "Hakkımızda",
      alt: "Medoqa, sağlık hizmetine erişimi herkes için güvenli, şeffaf ve adil hale getirmek için kuruldu.",
      hikayeBaslik: "Neden Medoqa?",
      hikaye: "Sağlık, en temel insan haklarından biridir. Ancak kaliteli sağlık hizmetine erişim; dil engelleri, bilgi eksikliği, finansal belirsizlik ve güven sorunları nedeniyle milyonlarca insan için hâlâ büyük bir zorluk olmaya devam etmektedir.\n\nMedoqa, bu eşitsizliği gidermek için kuruldu. Amacımız tek bir şey: Her hastanın, nerede yaşarsa yaşasın, kaliteli sağlık hizmetine güvenle ulaşabilmesini sağlamak. Bunu yaparken de kliniklerin dürüst ve sürdürülebilir bir şekilde uluslararası hastalara ulaşmasına köprü olmak.",
      sorunBaslik: "Çözdüğümüz Sorunlar",
      sorunlar: [
        { ikon: "💸", baslik: "Finansal Güvensizlik", aciklama: "Hastalar ödeme yaptıktan sonra beklentileri karşılanmayabilir. Blokeli ödeme sistemimiz, tedavi tamamlanmadan ödemenin kliniğe geçmesini önler." },
        { ikon: "🔍", baslik: "Bilgi Eksikliği", aciklama: "Hangi kliniğin gerçekten kaliteli olduğunu anlamak zordur. Sağlık Bakanlığı belgeli klinikleri doğrulayarak listeliyor, belgelerini şeffaf biçimde sunuyoruz." },
        { ikon: "🌐", baslik: "Dil Engeli", aciklama: "6 dilde tam destek sunarak hastanın kendi dilinde bilgi almasını, teklif karşılaştırması yapmasını ve iletişim kurmasını sağlıyoruz." },
        { ikon: "⚠️", baslik: "Ek İşlem Baskısı", aciklama: "Hastalar bazen onaylamadıkları ek işlemlerle karşılaşabiliyor. Platformumuzda hiçbir ek işlem hastanın yazılı onayı alınmadan yapılamaz." },
      ],
      misyonBaslik: "Misyonumuz",
      misyon: "Her hastanın, coğrafi ve ekonomik sınırlar ne olursa olsun, ihtiyaç duyduğu kaliteli sağlık hizmetine güvenle erişebildiği; kliniklerin de şeffaf ve adil bir ortamda uluslararası hastalara ulaşabildiği bir ekosistem kurmak.",
      vizyonBaslik: "Vizyonumuz",
      vizyon: "Dünya genelinde sağlık turizminin en güvenilir ve şeffaf platformu olmak. Hasta güvencesi, klinik kalitesi ve teknolojinin kesiştiği noktada, sağlığa erişimde küresel bir standart oluşturmak.",
      degerlerBaslik: "Değerlerimiz",
      degerler: [
        { ikon: "🔒", baslik: "Güvenlik", aciklama: "Blokeli ödeme ve onaylı klinik ağıyla hasta güvenliği her şeyin önünde gelir." },
        { ikon: "⚖️", baslik: "Şeffaflık", aciklama: "Gizli ücret yok, sürpriz yok. Her adım açık ve net." },
        { ikon: "🌍", baslik: "Erişilebilirlik", aciklama: "Dil, coğrafya veya bütçe fark etmeksizin kaliteli sağlığa erişim hakkı." },
        { ikon: "🤝", baslik: "Güven", aciklama: "Hasta ile klinik arasında tarafsız, dürüst ve güvenilir bir köprü olmak." },
        { ikon: "📋", baslik: "Sorumluluk", aciklama: "Platformumuzdaki her klinik belge doğrulamasından geçer. Sorumluluktan kaçınmıyoruz." },
        { ikon: "💡", baslik: "İnovasyon", aciklama: "Sağlık turizminin sorunlarını teknolojiyle çözmek için sürekli geliştiriyoruz." },
      ],
      taahhutBaslik: "Hastaya Taahhüdümüz",
      taahhutler: [
        "Ödemeniz, tedaviniz tamamlanıp siz onaylayana kadar güvende bekler.",
        "Platformdaki her klinik Sağlık Bakanlığı belgeli ve admin onaylıdır.",
        "Hiçbir ek işlem, yazılı onayınız alınmadan yapılamaz.",
        "6 dilde koordinatör desteğiyle yalnız değilsiniz.",
        "Sorun yaşarsanız arabuluculuk hizmetimiz devreye girer.",
      ],
      ekipBaslik: "Ekibimiz",
      ekip: "Medoqa, sağlık, teknoloji ve uluslararası iş alanlarında deneyimli bir ekip tarafından yönetilmektedir. Koordinatörlerimiz 6 dilde hasta desteği sunmakta; her hastanın sürecini başından sonuna kadar takip etmektedir.",
      iletisimBtn: "Bizimle İletişime Geçin",
    },
    en: {
      baslik: "About Us",
      alt: "Medoqa was founded to make access to healthcare safe, transparent and fair for everyone.",
      hikayeBaslik: "Why Medoqa?",
      hikaye: "Healthcare is one of the most fundamental human rights. Yet for millions of people, accessing quality healthcare remains a major challenge due to language barriers, lack of information, financial uncertainty and trust issues.\n\nMedoqa was founded to address this inequality. Our purpose is singular: to ensure that every patient, wherever they live, can access quality healthcare with confidence. In doing so, we also bridge clinics to international patients in an honest and sustainable way.",
      sorunBaslik: "Problems We Solve",
      sorunlar: [
        { ikon: "💸", baslik: "Financial Insecurity", aciklama: "Patients may not have their expectations met after payment. Our escrow system prevents payment from reaching the clinic before treatment is complete." },
        { ikon: "🔍", baslik: "Lack of Information", aciklama: "It is difficult to know which clinic is genuinely quality. We verify and list Ministry of Health certified clinics, presenting their documents transparently." },
        { ikon: "🌐", baslik: "Language Barrier", aciklama: "With full support in 6 languages, patients receive information, compare quotes and communicate in their own language." },
        { ikon: "⚠️", baslik: "Extra Procedure Pressure", aciklama: "Patients can sometimes face procedures they didn't approve. On our platform, no extra procedure can be performed without the patient's written consent." },
      ],
      misyonBaslik: "Our Mission",
      misyon: "To build an ecosystem where every patient, regardless of geographic and economic boundaries, can confidently access quality healthcare they need — and where clinics can reach international patients in a transparent and fair environment.",
      vizyonBaslik: "Our Vision",
      vizyon: "To be the world's most trusted and transparent health tourism platform. To set a global standard for access to healthcare at the intersection of patient safety, clinic quality and technology.",
      degerlerBaslik: "Our Values",
      degerler: [
        { ikon: "🔒", baslik: "Security", aciklama: "Patient safety comes before everything with escrow payment and verified clinic network." },
        { ikon: "⚖️", baslik: "Transparency", aciklama: "No hidden fees, no surprises. Every step is open and clear." },
        { ikon: "🌍", baslik: "Accessibility", aciklama: "The right to access quality healthcare regardless of language, geography or budget." },
        { ikon: "🤝", baslik: "Trust", aciklama: "Being an impartial, honest and reliable bridge between patients and clinics." },
        { ikon: "📋", baslik: "Accountability", aciklama: "Every clinic on our platform goes through document verification. We don't shy away from responsibility." },
        { ikon: "💡", baslik: "Innovation", aciklama: "We continuously develop to solve health tourism problems with technology." },
      ],
      taahhutBaslik: "Our Commitment to Patients",
      taahhutler: [
        "Your payment stays safe until your treatment is complete and you approve.",
        "Every clinic on the platform is Ministry of Health certified and admin-approved.",
        "No extra procedure can be performed without your written consent.",
        "You are not alone with coordinator support in 6 languages.",
        "If you experience a problem, our mediation service steps in.",
      ],
      ekipBaslik: "Our Team",
      ekip: "Medoqa is managed by a team experienced in healthcare, technology and international business. Our coordinators provide patient support in 6 languages, following each patient's process from beginning to end.",
      iletisimBtn: "Contact Us",
    },
    de: {
      baslik: "Über uns",
      alt: "Medoqa wurde gegründet, um den Zugang zur Gesundheitsversorgung für alle sicher, transparent und fair zu machen.",
      hikayeBaslik: "Warum Medoqa?",
      hikaye: "Gesundheit ist eines der grundlegendsten Menschenrechte. Dennoch bleibt der Zugang zu qualitativ hochwertiger Gesundheitsversorgung für Millionen von Menschen aufgrund von Sprachbarrieren, Informationsmangel, finanzieller Unsicherheit und Vertrauensproblemen eine große Herausforderung.\n\nMedoqa wurde gegründet, um diese Ungleichheit zu beseitigen. Unser Zweck ist klar: sicherzustellen, dass jeder Patient, egal wo er lebt, sicher auf Qualitätsgesundheitsversorgung zugreifen kann.",
      sorunBaslik: "Probleme, die wir lösen",
      sorunlar: [
        { ikon: "💸", baslik: "Finanzielle Unsicherheit", aciklama: "Unser Treuhandkonto verhindert, dass die Zahlung vor Abschluss der Behandlung an die Klinik geht." },
        { ikon: "🔍", baslik: "Informationsmangel", aciklama: "Wir verifizieren und listen vom Gesundheitsministerium zertifizierte Kliniken transparent auf." },
        { ikon: "🌐", baslik: "Sprachbarriere", aciklama: "Mit vollem Support in 6 Sprachen können Patienten in ihrer eigenen Sprache kommunizieren." },
        { ikon: "⚠️", baslik: "Druck für Zusatzeingriffe", aciklama: "Auf unserer Plattform kann kein Zusatzeingriff ohne schriftliche Zustimmung des Patienten durchgeführt werden." },
      ],
      misyonBaslik: "Unsere Mission",
      misyon: "Ein Ökosystem aufzubauen, in dem jeder Patient unabhängig von geografischen und wirtschaftlichen Grenzen sicher auf Qualitätsgesundheitsversorgung zugreifen kann.",
      vizyonBaslik: "Unsere Vision",
      vizyon: "Die vertrauenswürdigste und transparenteste Gesundheitstourismusplattform der Welt zu sein und einen globalen Standard für den Zugang zur Gesundheitsversorgung zu setzen.",
      degerlerBaslik: "Unsere Werte",
      degerler: [
        { ikon: "🔒", baslik: "Sicherheit", aciklama: "Patientensicherheit steht mit Treuhandkonto und verifizierten Kliniken an erster Stelle." },
        { ikon: "⚖️", baslik: "Transparenz", aciklama: "Keine versteckten Gebühren, keine Überraschungen. Alles offen und klar." },
        { ikon: "🌍", baslik: "Zugänglichkeit", aciklama: "Das Recht auf Qualitätsgesundheitsversorgung unabhängig von Sprache, Geografie oder Budget." },
        { ikon: "🤝", baslik: "Vertrauen", aciklama: "Eine unparteiische, ehrliche und zuverlässige Brücke zwischen Patienten und Kliniken." },
        { ikon: "📋", baslik: "Verantwortung", aciklama: "Jede Klinik auf unserer Plattform durchläuft eine Dokumentenverifizierung." },
        { ikon: "💡", baslik: "Innovation", aciklama: "Wir entwickeln kontinuierlich, um Probleme des Gesundheitstourismus mit Technologie zu lösen." },
      ],
      taahhutBaslik: "Unser Versprechen an Patienten",
      taahhutler: [
        "Ihre Zahlung bleibt sicher, bis Ihre Behandlung abgeschlossen ist und Sie zustimmen.",
        "Jede Klinik auf der Plattform ist vom Gesundheitsministerium zertifiziert und admin-genehmigt.",
        "Kein Zusatzeingriff ohne Ihre schriftliche Zustimmung.",
        "Sie sind nicht allein mit Koordinatorensupport in 6 Sprachen.",
        "Bei Problemen greift unser Mediationsservice ein.",
      ],
      ekipBaslik: "Unser Team",
      ekip: "Medoqa wird von einem Team mit Erfahrung in Gesundheitswesen, Technologie und internationalem Geschäft geleitet. Unsere Koordinatoren begleiten jeden Patienten von Anfang bis Ende.",
      iletisimBtn: "Kontaktieren Sie uns",
    },
    ar: {
      baslik: "من نحن",
      alt: "تأسس ميدوقا لجعل الوصول إلى الرعاية الصحية آمناً وشفافاً وعادلاً للجميع.",
      hikayeBaslik: "لماذا ميدوقا؟",
      hikaye: "الصحة من أساسيات حقوق الإنسان. ومع ذلك يظل الوصول إلى رعاية صحية جيدة تحدياً كبيراً لملايين الأشخاص بسبب الحواجز اللغوية ونقص المعلومات والغموض المالي ومشاكل الثقة.\n\nتأسس ميدوقا لمعالجة هذا التفاوت. هدفنا واحد: ضمان أن كل مريض أينما كان يستطيع الوصول بثقة إلى رعاية صحية جيدة.",
      sorunBaslik: "المشاكل التي نحلها",
      sorunlar: [
        { ikon: "💸", baslik: "عدم الأمان المالي", aciklama: "نظام الدفع الضمني يمنع وصول المال للعيادة قبل اكتمال العلاج وموافقة المريض." },
        { ikon: "🔍", baslik: "نقص المعلومات", aciklama: "نتحقق من العيادات المعتمدة من وزارة الصحة ونعرضها بشفافية مع وثائقها." },
        { ikon: "🌐", baslik: "الحاجز اللغوي", aciklama: "بدعم كامل بـ6 لغات يتلقى المرضى المعلومات ويقارنون العروض بلغتهم." },
        { ikon: "⚠️", baslik: "الضغط للإجراءات الإضافية", aciklama: "لا يمكن إجراء أي إجراء إضافي دون موافقة كتابية من المريض." },
      ],
      misyonBaslik: "مهمتنا",
      misyon: "بناء نظام بيئي يتمكن فيه كل مريض بغض النظر عن الحدود الجغرافية والاقتصادية من الوصول بثقة إلى رعاية صحية جيدة.",
      vizyonBaslik: "رؤيتنا",
      vizyon: "أن نكون أكثر منصات السياحة الصحية موثوقية وشفافية في العالم وأن نضع معياراً عالمياً للوصول إلى الرعاية الصحية.",
      degerlerBaslik: "قيمنا",
      degerler: [
        { ikon: "🔒", baslik: "الأمان", aciklama: "سلامة المريض تأتي قبل كل شيء مع نظام الدفع الضمني وشبكة العيادات المعتمدة." },
        { ikon: "⚖️", baslik: "الشفافية", aciklama: "لا رسوم خفية ولا مفاجآت. كل خطوة واضحة وصريحة." },
        { ikon: "🌍", baslik: "إمكانية الوصول", aciklama: "حق الوصول إلى رعاية صحية جيدة بغض النظر عن اللغة أو الجغرافيا أو الميزانية." },
        { ikon: "🤝", baslik: "الثقة", aciklama: "جسر محايد وصادق وموثوق بين المرضى والعيادات." },
        { ikon: "📋", baslik: "المسؤولية", aciklama: "كل عيادة في منصتنا تمر بالتحقق من الوثائق ولا نتهرب من المسؤولية." },
        { ikon: "💡", baslik: "الابتكار", aciklama: "نطور باستمرار لحل مشاكل السياحة الصحية بالتكنولوجيا." },
      ],
      taahhutBaslik: "تعهدنا للمرضى",
      taahhutler: [
        "تبقى مدفوعاتك آمنة حتى اكتمال علاجك وموافقتك.",
        "كل عيادة في المنصة معتمدة من وزارة الصحة ومراجعة إدارياً.",
        "لا يمكن إجراء أي إجراء إضافي دون موافقتك الكتابية.",
        "لست وحدك مع دعم المنسق بـ6 لغات.",
        "إذا واجهت مشكلة تتدخل خدمة الوساطة لدينا.",
      ],
      ekipBaslik: "فريقنا",
      ekip: "يدير ميدوقا فريق ذو خبرة في الرعاية الصحية والتكنولوجيا والأعمال الدولية. يقدم منسقونا الدعم للمرضى بـ6 لغات ويتابعون كل مريض من البداية للنهاية.",
      iletisimBtn: "تواصل معنا",
    },
    ru: {
      baslik: "О нас",
      alt: "Medoqa был основан, чтобы сделать доступ к медицинской помощи безопасным, прозрачным и справедливым для всех.",
      hikayeBaslik: "Почему Medoqa?",
      hikaye: "Здравоохранение — одно из фундаментальных прав человека. Тем не менее для миллионов людей доступ к качественной медицинской помощи остаётся серьёзной проблемой из-за языковых барьеров, нехватки информации, финансовой неопределённости и проблем с доверием.\n\nMedoqa был основан для решения этого неравенства. Наша цель одна: обеспечить каждому пациенту, где бы он ни жил, уверенный доступ к качественной медицинской помощи.",
      sorunBaslik: "Проблемы, которые мы решаем",
      sorunlar: [
        { ikon: "💸", baslik: "Финансовая нестабильность", aciklama: "Наша система эскроу не даёт оплате поступить в клинику до завершения лечения." },
        { ikon: "🔍", baslik: "Нехватка информации", aciklama: "Мы верифицируем и размещаем клиники с сертификатом Минздрава, прозрачно представляя их документы." },
        { ikon: "🌐", baslik: "Языковой барьер", aciklama: "Полная поддержка на 6 языках позволяет пациентам получать информацию на родном языке." },
        { ikon: "⚠️", baslik: "Давление дополнительных процедур", aciklama: "Никакая дополнительная процедура не может быть выполнена без письменного согласия пациента." },
      ],
      misyonBaslik: "Наша миссия",
      misyon: "Создать экосистему, в которой каждый пациент независимо от географических и экономических границ может уверенно получить качественную медицинскую помощь.",
      vizyonBaslik: "Наше видение",
      vizyon: "Стать самой надёжной и прозрачной платформой медицинского туризма в мире и установить глобальный стандарт доступа к здравоохранению.",
      degerlerBaslik: "Наши ценности",
      degerler: [
        { ikon: "🔒", baslik: "Безопасность", aciklama: "Безопасность пациентов на первом месте с эскроу и сетью проверенных клиник." },
        { ikon: "⚖️", baslik: "Прозрачность", aciklama: "Никаких скрытых платежей и сюрпризов. Каждый шаг открыт и ясен." },
        { ikon: "🌍", baslik: "Доступность", aciklama: "Право на качественное здравоохранение независимо от языка, географии или бюджета." },
        { ikon: "🤝", baslik: "Доверие", aciklama: "Беспристрастный, честный и надёжный мост между пациентами и клиниками." },
        { ikon: "📋", baslik: "Ответственность", aciklama: "Каждая клиника проходит верификацию документов. Мы не уклоняемся от ответственности." },
        { ikon: "💡", baslik: "Инновации", aciklama: "Мы постоянно развиваемся для решения проблем медицинского туризма с помощью технологий." },
      ],
      taahhutBaslik: "Наши обязательства перед пациентами",
      taahhutler: [
        "Ваш платёж в безопасности до завершения лечения и вашего одобрения.",
        "Каждая клиника сертифицирована Минздравом и одобрена администрацией.",
        "Никакая дополнительная процедура без вашего письменного согласия.",
        "Вы не одни — поддержка координатора на 6 языках.",
        "При возникновении проблем подключается наша служба медиации.",
      ],
      ekipBaslik: "Наша команда",
      ekip: "Medoqa управляется командой с опытом в здравоохранении, технологиях и международном бизнесе. Наши координаторы сопровождают каждого пациента от начала до конца.",
      iletisimBtn: "Связаться с нами",
    },
    fr: {
      baslik: "À propos de nous",
      alt: "Medoqa a été fondé pour rendre l'accès aux soins de santé sûr, transparent et équitable pour tous.",
      hikayeBaslik: "Pourquoi Medoqa?",
      hikaye: "La santé est l'un des droits humains les plus fondamentaux. Pourtant, pour des millions de personnes, l'accès à des soins de qualité reste un défi majeur en raison des barrières linguistiques, du manque d'information, de l'incertitude financière et des problèmes de confiance.\n\nMedoqa a été fondé pour remédier à cette inégalité. Notre objectif est unique: garantir que chaque patient, où qu'il vive, puisse accéder en toute confiance à des soins de qualité.",
      sorunBaslik: "Problèmes que nous résolvons",
      sorunlar: [
        { ikon: "💸", baslik: "Insécurité financière", aciklama: "Notre système séquestre empêche le paiement d'aller à la clinique avant la fin du traitement." },
        { ikon: "🔍", baslik: "Manque d'information", aciklama: "Nous vérifions et listons les cliniques certifiées par le Ministère de la Santé de manière transparente." },
        { ikon: "🌐", baslik: "Barrière linguistique", aciklama: "Avec un support complet en 6 langues, les patients communiquent dans leur propre langue." },
        { ikon: "⚠️", baslik: "Pression pour actes supplémentaires", aciklama: "Sur notre plateforme, aucun acte supplémentaire ne peut être effectué sans consentement écrit du patient." },
      ],
      misyonBaslik: "Notre mission",
      misyon: "Construire un écosystème où chaque patient, quelles que soient les frontières géographiques et économiques, peut accéder en toute confiance aux soins dont il a besoin.",
      vizyonBaslik: "Notre vision",
      vizyon: "Être la plateforme de tourisme médical la plus fiable et transparente au monde et établir un standard mondial d'accès aux soins de santé.",
      degerlerBaslik: "Nos valeurs",
      degerler: [
        { ikon: "🔒", baslik: "Sécurité", aciklama: "La sécurité des patients prime avec le séquestre et le réseau de cliniques vérifiées." },
        { ikon: "⚖️", baslik: "Transparence", aciklama: "Pas de frais cachés, pas de surprises. Chaque étape est ouverte et claire." },
        { ikon: "🌍", baslik: "Accessibilité", aciklama: "Le droit à des soins de qualité indépendamment de la langue, la géographie ou le budget." },
        { ikon: "🤝", baslik: "Confiance", aciklama: "Un pont impartial, honnête et fiable entre patients et cliniques." },
        { ikon: "📋", baslik: "Responsabilité", aciklama: "Chaque clinique passe par une vérification des documents. Nous n'esquivons pas la responsabilité." },
        { ikon: "💡", baslik: "Innovation", aciklama: "Nous développons continuellement pour résoudre les problèmes du tourisme médical par la technologie." },
      ],
      taahhutBaslik: "Notre engagement envers les patients",
      taahhutler: [
        "Votre paiement reste en sécurité jusqu'à la fin de votre traitement et votre approbation.",
        "Chaque clinique est certifiée par le Ministère de la Santé et approuvée par l'administration.",
        "Aucun acte supplémentaire sans votre consentement écrit.",
        "Vous n'êtes pas seul avec le support coordinateur en 6 langues.",
        "En cas de problème, notre service de médiation intervient.",
      ],
      ekipBaslik: "Notre équipe",
      ekip: "Medoqa est géré par une équipe expérimentée en santé, technologie et affaires internationales. Nos coordinateurs accompagnent chaque patient du début à la fin.",
      iletisimBtn: "Nous contacter",
    },
  };

  const ic = m[dil as keyof typeof m] || m.en;

  return (
    <main style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: "80px 16px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: "750px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "42px", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>{ic.baslik}</h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>{ic.alt}</p>
        </div>
      </section>

      {/* Hikaye */}
      <section style={{ padding: "72px 16px", background: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0f0d2e", marginBottom: "24px" }}>{ic.hikayeBaslik}</h2>
          {ic.hikaye.split("\n\n").map((p, i) => (
            <p key={i} style={{ fontSize: "17px", color: "#475569", lineHeight: 1.9, marginBottom: "20px" }}>{p}</p>
          ))}
        </div>
      </section>

      {/* Çözdüğümüz Sorunlar */}
      <section style={{ padding: "72px 16px", background: "#f8f9ff" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0f0d2e", marginBottom: "40px", textAlign: "center" }}>{ic.sorunBaslik}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {ic.sorunlar.map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "20px", padding: "28px", border: "1px solid #e8e6ff" }}>
                <div style={{ fontSize: "36px", marginBottom: "14px" }}>{s.ikon}</div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0f0d2e", marginBottom: "10px" }}>{s.baslik}</h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.75, margin: 0 }}>{s.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section style={{ padding: "72px 16px", background: "#fff" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          <div style={{ background: "linear-gradient(135deg, #0f0d2e, #1e1b4b)", borderRadius: "20px", padding: "36px" }}>
            <div style={{ fontSize: "36px", marginBottom: "14px" }}>🎯</div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "14px" }}>{ic.misyonBaslik}</h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, margin: 0 }}>{ic.misyon}</p>
          </div>
          <div style={{ background: "linear-gradient(135deg, #534AB7, #7F77DD)", borderRadius: "20px", padding: "36px" }}>
            <div style={{ fontSize: "36px", marginBottom: "14px" }}>🚀</div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "14px" }}>{ic.vizyonBaslik}</h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.85)", lineHeight: 1.8, margin: 0 }}>{ic.vizyon}</p>
          </div>
        </div>
      </section>

      {/* Değerler */}
      <section style={{ padding: "72px 16px", background: "#f8f9ff" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0f0d2e", marginBottom: "40px", textAlign: "center" }}>{ic.degerlerBaslik}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {ic.degerler.map((d, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e8e6ff", textAlign: "center" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{d.ikon}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f0d2e", marginBottom: "8px" }}>{d.baslik}</h3>
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>{d.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Taahhütler */}
      <section style={{ padding: "72px 16px", background: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0f0d2e", marginBottom: "32px", textAlign: "center" }}>{ic.taahhutBaslik}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {ic.taahhutler.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", background: "#f8f9ff", borderRadius: "12px", padding: "18px 20px", border: "1px solid #e8e6ff" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "13px", fontWeight: 700, flexShrink: 0 }}>✓</div>
                <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.7, margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ekip & CTA */}
      <section style={{ background: "#534AB7", padding: "72px 16px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginBottom: "14px" }}>{ic.ekipBaslik}</h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", marginBottom: "28px", lineHeight: 1.8 }}>{ic.ekip}</p>
          <a href="/iletisim" style={{ display: "inline-block", background: "#fff", color: "#534AB7", padding: "14px 36px", borderRadius: "12px", fontSize: "15px", textDecoration: "none", fontWeight: 700 }}>
            {ic.iletisimBtn}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
