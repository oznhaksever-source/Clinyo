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
        { ikon: "🔍", baslik: "Bilgi Eksikliği", aciklama: "Hangi kliniğin gerçekten kaliteli olduğunu anlamak zordur. Sağlık Bakanlığı belgeli klinikleri doğrulayarak listeliyor, belgelerini şeffaf biçimde sunuyoruz." },
        { ikon: "🌐", baslik: "Dil Engeli", aciklama: "6 dilde tam destek sunarak hastanın kendi dilinde bilgi almasını, teklif karşılaştırması yapmasını ve iletişim kurmasını sağlıyoruz." },
        { ikon: "⚠️", baslik: "Ek İşlem Baskısı", aciklama: "Hastalar bazen onaylamadıkları ek işlemlerle karşılaşabiliyor. Platformumuzda hiçbir ek işlem hastanın yazılı onayı alınmadan yapılamaz." },
        { ikon: "📋", baslik: "Şeffaf Olmayan Fiyatlar", aciklama: "Gizli ücretler ve son dakika sürprizleri sağlık turizminde yaygın bir sorundur. Medoqa'da klinikler fiyatlarını önceden açıkça belirtmek zorundadır." },
      ],
      misyonBaslik: "Misyonumuz",
      misyon: "Her hastanın, coğrafi ve ekonomik sınırlar ne olursa olsun, ihtiyaç duyduğu kaliteli sağlık hizmetine güvenle erişebildiği; kliniklerin de şeffaf ve adil bir ortamda uluslararası hastalara ulaşabildiği bir ekosistem kurmak.",
      vizyonBaslik: "Vizyonumuz",
      vizyon: "Dünya genelinde sağlık turizminin en güvenilir ve şeffaf platformu olmak. Hasta güvencesi, klinik kalitesi ve teknolojinin kesiştiği noktada, sağlığa erişimde küresel bir standart oluşturmak.",
      degerlerBaslik: "Değerlerimiz",
      degerler: [
        { ikon: "✅", baslik: "Güvenlik", aciklama: "Onaylı klinik ağı ve belge doğrulamasıyla hasta güvenliği her şeyin önünde gelir." },
        { ikon: "⚖️", baslik: "Şeffaflık", aciklama: "Gizli ücret yok, sürpriz yok. Her adım açık ve net." },
        { ikon: "🌍", baslik: "Erişilebilirlik", aciklama: "Dil, coğrafya veya bütçe fark etmeksizin kaliteli sağlığa erişim hakkı." },
        { ikon: "🤝", baslik: "Güven", aciklama: "Hasta ile klinik arasında tarafsız, dürüst ve güvenilir bir köprü olmak." },
        { ikon: "📋", baslik: "Sorumluluk", aciklama: "Platformumuzdaki her klinik belge doğrulamasından geçer. Sorumluluktan kaçınmıyoruz." },
        { ikon: "💡", baslik: "İnovasyon", aciklama: "Sağlık turizminin sorunlarını teknolojiyle çözmek için sürekli geliştiriyoruz." },
      ],
      taahhutBaslik: "Hastaya Taahhüdümüz",
      taahhutler: [
        "Platformumuzdaki her klinik Sağlık Bakanlığı belgeli ve admin onaylıdır.",
        "Hiçbir ek işlem, yazılı onayınız alınmadan yapılamaz.",
        "Klinikler fiyatlarını önceden açıkça belirtmek zorundadır.",
        "6 dilde koordinatör desteğiyle yalnız değilsiniz.",
        "Sorun yaşarsanız Medoqa ekibi size destek olmak için ulaşılabilirdir.",
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
        { ikon: "🔍", baslik: "Lack of Information", aciklama: "It is difficult to know which clinic is genuinely quality. We verify and list Ministry of Health certified clinics, presenting their documents transparently." },
        { ikon: "🌐", baslik: "Language Barrier", aciklama: "With full support in 6 languages, patients receive information, compare quotes and communicate in their own language." },
        { ikon: "⚠️", baslik: "Extra Procedure Pressure", aciklama: "On our platform, no extra procedure can be performed without the patient's written consent." },
        { ikon: "📋", baslik: "Non-Transparent Pricing", aciklama: "Hidden fees are a common problem in health tourism. On Medoqa, clinics must clearly state their prices upfront." },
      ],
      misyonBaslik: "Our Mission",
      misyon: "To build an ecosystem where every patient, regardless of geographic and economic boundaries, can confidently access quality healthcare they need — and where clinics can reach international patients in a transparent and fair environment.",
      vizyonBaslik: "Our Vision",
      vizyon: "To be the world's most trusted and transparent health tourism platform. To set a global standard for access to healthcare at the intersection of patient safety, clinic quality and technology.",
      degerlerBaslik: "Our Values",
      degerler: [
        { ikon: "✅", baslik: "Security", aciklama: "Patient safety comes before everything with verified clinic network and document verification." },
        { ikon: "⚖️", baslik: "Transparency", aciklama: "No hidden fees, no surprises. Every step is open and clear." },
        { ikon: "🌍", baslik: "Accessibility", aciklama: "The right to access quality healthcare regardless of language, geography or budget." },
        { ikon: "🤝", baslik: "Trust", aciklama: "Being an impartial, honest and reliable bridge between patients and clinics." },
        { ikon: "📋", baslik: "Accountability", aciklama: "Every clinic on our platform goes through document verification. We don't shy away from responsibility." },
        { ikon: "💡", baslik: "Innovation", aciklama: "We continuously develop to solve health tourism problems with technology." },
      ],
      taahhutBaslik: "Our Commitment to Patients",
      taahhutler: [
        "Every clinic on the platform is Ministry of Health certified and admin-approved.",
        "No extra procedure can be performed without your written consent.",
        "Clinics must clearly state their prices upfront.",
        "You are not alone with coordinator support in 6 languages.",
        "If you experience a problem, the Medoqa team is reachable to support you.",
      ],
      ekipBaslik: "Our Team",
      ekip: "Medoqa is managed by a team experienced in healthcare, technology and international business. Our coordinators provide patient support in 6 languages, following each patient's process from beginning to end.",
      iletisimBtn: "Contact Us",
    },
    de: {
      baslik: "Über uns",
      alt: "Medoqa wurde gegründet, um den Zugang zur Gesundheitsversorgung für alle sicher, transparent und fair zu machen.",
      hikayeBaslik: "Warum Medoqa?",
      hikaye: "Gesundheit ist eines der grundlegendsten Menschenrechte. Dennoch bleibt der Zugang zu qualitativ hochwertiger Gesundheitsversorgung für Millionen von Menschen aufgrund von Sprachbarrieren, Informationsmangel, finanzieller Unsicherheit und Vertrauensproblemen eine große Herausforderung.\n\nMedoqa wurde gegründet, um diese Ungleichheit zu beseitigen.",
      sorunBaslik: "Probleme, die wir lösen",
      sorunlar: [
        { ikon: "🔍", baslik: "Informationsmangel", aciklama: "Wir verifizieren und listen vom Gesundheitsministerium zertifizierte Kliniken transparent auf." },
        { ikon: "🌐", baslik: "Sprachbarriere", aciklama: "Mit vollem Support in 6 Sprachen können Patienten in ihrer eigenen Sprache kommunizieren." },
        { ikon: "⚠️", baslik: "Druck für Zusatzeingriffe", aciklama: "Auf unserer Plattform kann kein Zusatzeingriff ohne schriftliche Zustimmung des Patienten durchgeführt werden." },
        { ikon: "📋", baslik: "Intransparente Preise", aciklama: "Auf Medoqa müssen Kliniken ihre Preise vorab klar angeben. Keine versteckten Gebühren." },
      ],
      misyonBaslik: "Unsere Mission",
      misyon: "Ein Ökosystem aufzubauen, in dem jeder Patient unabhängig von geografischen und wirtschaftlichen Grenzen sicher auf Qualitätsgesundheitsversorgung zugreifen kann.",
      vizyonBaslik: "Unsere Vision",
      vizyon: "Die vertrauenswürdigste und transparenteste Gesundheitstourismusplattform der Welt zu sein.",
      degerlerBaslik: "Unsere Werte",
      degerler: [
        { ikon: "✅", baslik: "Sicherheit", aciklama: "Patientensicherheit steht mit verifiziertem Kliniknetzwerk an erster Stelle." },
        { ikon: "⚖️", baslik: "Transparenz", aciklama: "Keine versteckten Gebühren, keine Überraschungen." },
        { ikon: "🌍", baslik: "Zugänglichkeit", aciklama: "Das Recht auf Qualitätsgesundheitsversorgung unabhängig von Sprache, Geografie oder Budget." },
        { ikon: "🤝", baslik: "Vertrauen", aciklama: "Eine unparteiische, ehrliche und zuverlässige Brücke zwischen Patienten und Kliniken." },
        { ikon: "📋", baslik: "Verantwortung", aciklama: "Jede Klinik auf unserer Plattform durchläuft eine Dokumentenverifizierung." },
        { ikon: "💡", baslik: "Innovation", aciklama: "Wir entwickeln kontinuierlich, um Probleme des Gesundheitstourismus mit Technologie zu lösen." },
      ],
      taahhutBaslik: "Unser Versprechen an Patienten",
      taahhutler: [
        "Jede Klinik auf der Plattform ist vom Gesundheitsministerium zertifiziert.",
        "Kein Zusatzeingriff ohne Ihre schriftliche Zustimmung.",
        "Kliniken müssen ihre Preise vorab klar angeben.",
        "Sie sind nicht allein mit Koordinatorensupport in 6 Sprachen.",
        "Bei Problemen ist das Medoqa-Team für Sie erreichbar.",
      ],
      ekipBaslik: "Unser Team",
      ekip: "Medoqa wird von einem Team mit Erfahrung in Gesundheitswesen, Technologie und internationalem Geschäft geleitet.",
      iletisimBtn: "Kontaktieren Sie uns",
    },
    ar: {
      baslik: "من نحن",
      alt: "تأسس ميدوقا لجعل الوصول إلى الرعاية الصحية آمناً وشفافاً وعادلاً للجميع.",
      hikayeBaslik: "لماذا ميدوقا؟",
      hikaye: "الصحة من أساسيات حقوق الإنسان. ومع ذلك يظل الوصول إلى رعاية صحية جيدة تحدياً كبيراً لملايين الأشخاص.\n\nتأسس ميدوقا لمعالجة هذا التفاوت.",
      sorunBaslik: "المشاكل التي نحلها",
      sorunlar: [
        { ikon: "🔍", baslik: "نقص المعلومات", aciklama: "نتحقق من العيادات المعتمدة من وزارة الصحة ونعرضها بشفافية." },
        { ikon: "🌐", baslik: "الحاجز اللغوي", aciklama: "بدعم كامل بـ6 لغات يتلقى المرضى المعلومات بلغتهم." },
        { ikon: "⚠️", baslik: "الضغط للإجراءات الإضافية", aciklama: "لا يمكن إجراء أي إجراء إضافي دون موافقة كتابية من المريض." },
        { ikon: "📋", baslik: "أسعار غير شفافة", aciklama: "في ميدوقا يجب على العيادات تحديد أسعارها مسبقاً بوضوح." },
      ],
      misyonBaslik: "مهمتنا",
      misyon: "بناء نظام بيئي يتمكن فيه كل مريض من الوصول بثقة إلى رعاية صحية جيدة بغض النظر عن الحدود.",
      vizyonBaslik: "رؤيتنا",
      vizyon: "أن نكون أكثر منصات السياحة الصحية موثوقية وشفافية في العالم.",
      degerlerBaslik: "قيمنا",
      degerler: [
        { ikon: "✅", baslik: "الأمان", aciklama: "سلامة المريض تأتي قبل كل شيء مع شبكة العيادات المعتمدة." },
        { ikon: "⚖️", baslik: "الشفافية", aciklama: "لا رسوم خفية ولا مفاجآت." },
        { ikon: "🌍", baslik: "إمكانية الوصول", aciklama: "حق الوصول إلى رعاية صحية جيدة بغض النظر عن اللغة أو الميزانية." },
        { ikon: "🤝", baslik: "الثقة", aciklama: "جسر محايد وصادق بين المرضى والعيادات." },
        { ikon: "📋", baslik: "المسؤولية", aciklama: "كل عيادة تمر بالتحقق من الوثائق." },
        { ikon: "💡", baslik: "الابتكار", aciklama: "نطور باستمرار لحل مشاكل السياحة الصحية بالتكنولوجيا." },
      ],
      taahhutBaslik: "تعهدنا للمرضى",
      taahhutler: [
        "كل عيادة في المنصة معتمدة من وزارة الصحة.",
        "لا يمكن إجراء أي إجراء إضافي دون موافقتك الكتابية.",
        "العيادات ملزمة بتحديد أسعارها مسبقاً.",
        "لست وحدك مع دعم المنسق بـ6 لغات.",
        "إذا واجهت مشكلة فريق ميدوقا متاح للدعم.",
      ],
      ekipBaslik: "فريقنا",
      ekip: "يدير ميدوقا فريق ذو خبرة في الرعاية الصحية والتكنولوجيا والأعمال الدولية.",
      iletisimBtn: "تواصل معنا",
    },
    ru: {
      baslik: "О нас",
      alt: "Medoqa был основан, чтобы сделать доступ к медицинской помощи безопасным, прозрачным и справедливым.",
      hikayeBaslik: "Почему Medoqa?",
      hikaye: "Здравоохранение — одно из фундаментальных прав человека. Тем не менее для миллионов людей доступ к качественной медицинской помощи остаётся серьёзной проблемой.\n\nMedoqa был основан для решения этого неравенства.",
      sorunBaslik: "Проблемы, которые мы решаем",
      sorunlar: [
        { ikon: "🔍", baslik: "Нехватка информации", aciklama: "Мы верифицируем клиники с сертификатом Минздрава и прозрачно представляем их документы." },
        { ikon: "🌐", baslik: "Языковой барьер", aciklama: "Полная поддержка на 6 языках позволяет пациентам получать информацию на родном языке." },
        { ikon: "⚠️", baslik: "Давление дополнительных процедур", aciklama: "Никакая дополнительная процедура без письменного согласия пациента." },
        { ikon: "📋", baslik: "Непрозрачные цены", aciklama: "На Medoqa клиники обязаны заранее чётко указывать цены." },
      ],
      misyonBaslik: "Наша миссия",
      misyon: "Создать экосистему, в которой каждый пациент независимо от границ может уверенно получить качественную медицинскую помощь.",
      vizyonBaslik: "Наше видение",
      vizyon: "Стать самой надёжной и прозрачной платформой медицинского туризма в мире.",
      degerlerBaslik: "Наши ценности",
      degerler: [
        { ikon: "✅", baslik: "Безопасность", aciklama: "Безопасность пациентов на первом месте с сетью проверенных клиник." },
        { ikon: "⚖️", baslik: "Прозрачность", aciklama: "Никаких скрытых платежей и сюрпризов." },
        { ikon: "🌍", baslik: "Доступность", aciklama: "Право на качественное здравоохранение независимо от языка или бюджета." },
        { ikon: "🤝", baslik: "Доверие", aciklama: "Беспристрастный мост между пациентами и клиниками." },
        { ikon: "📋", baslik: "Ответственность", aciklama: "Каждая клиника проходит верификацию документов." },
        { ikon: "💡", baslik: "Инновации", aciklama: "Мы развиваемся для решения проблем медицинского туризма." },
      ],
      taahhutBaslik: "Наши обязательства перед пациентами",
      taahhutler: [
        "Каждая клиника сертифицирована Минздравом и одобрена администрацией.",
        "Никакая дополнительная процедура без вашего письменного согласия.",
        "Клиники обязаны заранее указывать цены.",
        "Вы не одни — поддержка координатора на 6 языках.",
        "При проблемах команда Medoqa доступна для помощи.",
      ],
      ekipBaslik: "Наша команда",
      ekip: "Medoqa управляется командой с опытом в здравоохранении, технологиях и международном бизнесе.",
      iletisimBtn: "Связаться с нами",
    },
    fr: {
      baslik: "À propos de nous",
      alt: "Medoqa a été fondé pour rendre l'accès aux soins de santé sûr, transparent et équitable pour tous.",
      hikayeBaslik: "Pourquoi Medoqa?",
      hikaye: "La santé est l'un des droits humains les plus fondamentaux. Pourtant, pour des millions de personnes, l'accès à des soins de qualité reste un défi majeur.\n\nMedoqa a été fondé pour remédier à cette inégalité.",
      sorunBaslik: "Problèmes que nous résolvons",
      sorunlar: [
        { ikon: "🔍", baslik: "Manque d'information", aciklama: "Nous vérifions et listons les cliniques certifiées par le Ministère de la Santé de manière transparente." },
        { ikon: "🌐", baslik: "Barrière linguistique", aciklama: "Avec un support complet en 6 langues, les patients communiquent dans leur propre langue." },
        { ikon: "⚠️", baslik: "Pression pour actes supplémentaires", aciklama: "Sur notre plateforme, aucun acte supplémentaire sans consentement écrit du patient." },
        { ikon: "📋", baslik: "Prix non transparents", aciklama: "Sur Medoqa, les cliniques doivent indiquer leurs prix à l'avance." },
      ],
      misyonBaslik: "Notre mission",
      misyon: "Construire un écosystème où chaque patient peut accéder en toute confiance aux soins dont il a besoin.",
      vizyonBaslik: "Notre vision",
      vizyon: "Être la plateforme de tourisme médical la plus fiable et transparente au monde.",
      degerlerBaslik: "Nos valeurs",
      degerler: [
        { ikon: "✅", baslik: "Sécurité", aciklama: "La sécurité des patients prime avec le réseau de cliniques vérifiées." },
        { ikon: "⚖️", baslik: "Transparence", aciklama: "Pas de frais cachés, pas de surprises." },
        { ikon: "🌍", baslik: "Accessibilité", aciklama: "Le droit à des soins de qualité indépendamment de la langue ou du budget." },
        { ikon: "🤝", baslik: "Confiance", aciklama: "Un pont impartial entre patients et cliniques." },
        { ikon: "📋", baslik: "Responsabilité", aciklama: "Chaque clinique passe par une vérification des documents." },
        { ikon: "💡", baslik: "Innovation", aciklama: "Nous développons pour résoudre les problèmes du tourisme médical." },
      ],
      taahhutBaslik: "Notre engagement envers les patients",
      taahhutler: [
        "Chaque clinique est certifiée par le Ministère de la Santé.",
        "Aucun acte supplémentaire sans votre consentement écrit.",
        "Les cliniques doivent indiquer leurs prix à l'avance.",
        "Vous n'êtes pas seul avec le support coordinateur en 6 langues.",
        "En cas de problème, l'équipe Medoqa est joignable.",
      ],
      ekipBaslik: "Notre équipe",
      ekip: "Medoqa est géré par une équipe expérimentée en santé, technologie et affaires internationales.",
      iletisimBtn: "Nous contacter",
    },
  };

  const ic = m[dil as keyof typeof m] || m.en;

  return (
    <main style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar />
      <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: "80px 16px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: "750px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "42px", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>{ic.baslik}</h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>{ic.alt}</p>
        </div>
      </section>
      <section style={{ padding: "72px 16px", background: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0f0d2e", marginBottom: "24px" }}>{ic.hikayeBaslik}</h2>
          {ic.hikaye.split("\n\n").map((p: string, i: number) => (
            <p key={i} style={{ fontSize: "17px", color: "#475569", lineHeight: 1.9, marginBottom: "20px" }}>{p}</p>
          ))}
        </div>
      </section>
      <section style={{ padding: "72px 16px", background: "#f8f9ff" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0f0d2e", marginBottom: "40px", textAlign: "center" }}>{ic.sorunBaslik}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {ic.sorunlar.map((s: any, i: number) => (
              <div key={i} style={{ background: "#fff", borderRadius: "20px", padding: "28px", border: "1px solid #e8e6ff" }}>
                <div style={{ fontSize: "36px", marginBottom: "14px" }}>{s.ikon}</div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0f0d2e", marginBottom: "10px" }}>{s.baslik}</h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.75, margin: 0 }}>{s.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
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
      <section style={{ padding: "72px 16px", background: "#f8f9ff" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0f0d2e", marginBottom: "40px", textAlign: "center" }}>{ic.degerlerBaslik}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {ic.degerler.map((d: any, i: number) => (
              <div key={i} style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e8e6ff", textAlign: "center" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{d.ikon}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f0d2e", marginBottom: "8px" }}>{d.baslik}</h3>
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>{d.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: "72px 16px", background: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0f0d2e", marginBottom: "32px", textAlign: "center" }}>{ic.taahhutBaslik}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {ic.taahhutler.map((t: string, i: number) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", background: "#f8f9ff", borderRadius: "12px", padding: "18px 20px", border: "1px solid #e8e6ff" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "13px", fontWeight: 700, flexShrink: 0 }}>✓</div>
                <p style={{ fontSize: "15px", color: "#475569", lineHeight: 1.7, margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: "#534AB7", padding: "72px 16px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginBottom: "14px" }}>{ic.ekipBaslik}</h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", marginBottom: "28px", lineHeight: 1.8 }}>{ic.ekip}</p>
          <a href="/iletisim" style={{ display: "inline-block", background: "#fff", color: "#534AB7", padding: "14px 36px", borderRadius: "12px", fontSize: "15px", textDecoration: "none", fontWeight: 700 }}>{ic.iletisimBtn}</a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
