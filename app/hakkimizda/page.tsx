"use client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HakkimizdaPage() {
  const { dil } = useDil();

  const m = {
    tr: {
      baslik: "Hakkımızda",
      alt: "Medoqa, sağlık turizminde güveni yeniden tanımlıyor.",
      hikayeBaslik: "Hikayemiz",
      hikaye: "Medoqa, yurt dışında yaşayan insanların Türkiye'de güvenli ve şeffaf bir şekilde tedavi olabilmesi için kuruldu. Sağlık turizminde yaşanan en büyük sorunlar — güvenilmez klinikler, gizli ücretler, ek işlem baskısı ve iletişim engelleri — bizi bu platformu inşa etmeye itti.\n\nBir hastanın yurt dışından gelerek tedavi olması ciddi bir güven meselesidir. Para, zaman ve sağlık aynı anda tehlikede. Biz bu riski ortadan kaldırmak için çalışıyoruz.",
      misyonBaslik: "Misyonumuz",
      misyon: "Her hastanın kaliteli sağlık hizmetine güvenle erişebileceği, kliniklerin de uluslararası hasta tabanına dürüstçe ulaşabildiği şeffaf bir ekosistem kurmak.",
      vizyonBaslik: "Vizyonumuz",
      vizyon: "Türkiye'yi sağlık turizminde dünyanın en güvenilir destinasyonu yapacak platforma sahip olmak. Hasta güvencesi, klinik kalitesi ve teknolojinin buluştuğu nokta.",
      degerlerBaslik: "Değerlerimiz",
      degerler: [
        { ikon: "🔒", baslik: "Güvenlik", aciklama: "Blokeli ödeme sistemi ve onaylı klinik ağıyla hasta güvenliği her şeyin önünde." },
        { ikon: "⚖️", baslik: "Şeffaflık", aciklama: "Gizli ücret yok, sürpriz yok. Her şey açık ve net." },
        { ikon: "🌍", baslik: "Erişilebilirlik", aciklama: "6 dil desteğiyle dünyanın her köşesinden hastaya ulaşıyoruz." },
        { ikon: "🤝", baslik: "Güven", aciklama: "Hasta ile klinik arasında güvenilir bir köprü olmak temel amacımız." },
      ],
      ekipBaslik: "Ekibimiz",
      ekip: "Medoqa, sağlık, teknoloji ve uluslararası iş deneyimine sahip bir ekip tarafından yönetilmektedir. Koordinatörlerimiz 6 dilde hasta desteği sunmaktadır.",
      iletisimBtn: "Bizimle İletişime Geçin",
    },
    en: {
      baslik: "About Us",
      alt: "Medoqa is redefining trust in health tourism.",
      hikayeBaslik: "Our Story",
      hikaye: "Medoqa was founded to enable people living abroad to receive treatment in Turkey safely and transparently. The biggest problems in health tourism — unreliable clinics, hidden fees, pressure for extra procedures and communication barriers — drove us to build this platform.\n\nComing from abroad for treatment is a serious matter of trust. Money, time and health are at risk simultaneously. We work to eliminate this risk.",
      misyonBaslik: "Our Mission",
      misyon: "To build a transparent ecosystem where every patient can confidently access quality healthcare, and clinics can honestly reach international patients.",
      vizyonBaslik: "Our Vision",
      vizyon: "To be the platform that makes Turkey the world's most trusted health tourism destination — where patient safety, clinic quality and technology meet.",
      degerlerBaslik: "Our Values",
      degerler: [
        { ikon: "🔒", baslik: "Security", aciklama: "Patient safety comes first with our escrow payment system and verified clinic network." },
        { ikon: "⚖️", baslik: "Transparency", aciklama: "No hidden fees, no surprises. Everything is open and clear." },
        { ikon: "🌍", baslik: "Accessibility", aciklama: "We reach patients from every corner of the world with 6 language support." },
        { ikon: "🤝", baslik: "Trust", aciklama: "Being a reliable bridge between patients and clinics is our core purpose." },
      ],
      ekipBaslik: "Our Team",
      ekip: "Medoqa is managed by a team with experience in healthcare, technology and international business. Our coordinators provide patient support in 6 languages.",
      iletisimBtn: "Contact Us",
    },
    de: {
      baslik: "Über uns",
      alt: "Medoqa definiert Vertrauen im Gesundheitstourismus neu.",
      hikayeBaslik: "Unsere Geschichte",
      hikaye: "Medoqa wurde gegründet, um Menschen im Ausland zu ermöglichen, sich sicher und transparent in der Türkei behandeln zu lassen. Die größten Probleme im Gesundheitstourismus — unzuverlässige Kliniken, versteckte Gebühren, Druck für Zusatzeingriffe und Kommunikationshindernisse — trieben uns dazu, diese Plattform aufzubauen.",
      misyonBaslik: "Unsere Mission",
      misyon: "Ein transparentes Ökosystem aufzubauen, in dem jeder Patient sicher auf Qualitätsgesundheitsversorgung zugreifen kann und Kliniken ehrlich internationale Patienten erreichen können.",
      vizyonBaslik: "Unsere Vision",
      vizyon: "Die Plattform zu sein, die die Türkei zum vertrauenswürdigsten Gesundheitstourismusziel der Welt macht.",
      degerlerBaslik: "Unsere Werte",
      degerler: [
        { ikon: "🔒", baslik: "Sicherheit", aciklama: "Patientensicherheit steht mit unserem Treuhandkonto und verifizierten Kliniken an erster Stelle." },
        { ikon: "⚖️", baslik: "Transparenz", aciklama: "Keine versteckten Gebühren, keine Überraschungen. Alles offen und klar." },
        { ikon: "🌍", baslik: "Zugänglichkeit", aciklama: "Wir erreichen Patienten aus aller Welt mit 6-Sprachen-Support." },
        { ikon: "🤝", baslik: "Vertrauen", aciklama: "Eine zuverlässige Brücke zwischen Patienten und Kliniken zu sein ist unser Kernzweck." },
      ],
      ekipBaslik: "Unser Team",
      ekip: "Medoqa wird von einem Team mit Erfahrung in Gesundheitswesen, Technologie und internationalem Geschäft geleitet. Unsere Koordinatoren bieten Patientenunterstützung in 6 Sprachen.",
      iletisimBtn: "Kontaktieren Sie uns",
    },
    ar: {
      baslik: "من نحن",
      alt: "ميدوقا يعيد تعريف الثقة في السياحة الصحية.",
      hikayeBaslik: "قصتنا",
      hikaye: "تأسس ميدوقا لتمكين الأشخاص المقيمين في الخارج من تلقي العلاج في تركيا بأمان وشفافية. أكبر المشاكل في السياحة الصحية — عيادات غير موثوقة ورسوم خفية والضغط للإجراءات الإضافية وعوائق التواصل — دفعتنا لبناء هذه المنصة.",
      misyonBaslik: "مهمتنا",
      misyon: "بناء نظام بيئي شفاف يتمكن فيه كل مريض من الوصول بثقة إلى رعاية صحية عالية الجودة، وتتمكن العيادات من الوصول بصدق للمرضى الدوليين.",
      vizyonBaslik: "رؤيتنا",
      vizyon: "أن نكون المنصة التي تجعل تركيا الوجهة الأكثر موثوقية للسياحة الصحية في العالم.",
      degerlerBaslik: "قيمنا",
      degerler: [
        { ikon: "🔒", baslik: "الأمان", aciklama: "سلامة المريض تأتي أولاً مع نظام الدفع الضمني وشبكة العيادات المعتمدة." },
        { ikon: "⚖️", baslik: "الشفافية", aciklama: "لا رسوم خفية ولا مفاجآت. كل شيء واضح وصريح." },
        { ikon: "🌍", baslik: "إمكانية الوصول", aciklama: "نصل إلى المرضى من كل أنحاء العالم بدعم 6 لغات." },
        { ikon: "🤝", baslik: "الثقة", aciklama: "أن نكون جسراً موثوقاً بين المرضى والعيادات هو غرضنا الأساسي." },
      ],
      ekipBaslik: "فريقنا",
      ekip: "يدير ميدوقا فريق لديه خبرة في الرعاية الصحية والتكنولوجيا والأعمال الدولية. يقدم منسقونا دعم المرضى بـ 6 لغات.",
      iletisimBtn: "تواصل معنا",
    },
    ru: {
      baslik: "О нас",
      alt: "Medoqa переопределяет доверие в медицинском туризме.",
      hikayeBaslik: "Наша история",
      hikaye: "Medoqa был основан, чтобы люди, живущие за рубежом, могли безопасно и прозрачно получать лечение в Турции. Главные проблемы медицинского туризма — ненадёжные клиники, скрытые платежи, давление для дополнительных процедур и языковые барьеры — побудили нас создать эту платформу.",
      misyonBaslik: "Наша миссия",
      misyon: "Создать прозрачную экосистему, где каждый пациент может уверенно получить качественную медицинскую помощь, а клиники могут честно привлекать международных пациентов.",
      vizyonBaslik: "Наше видение",
      vizyon: "Стать платформой, которая сделает Турцию самым надёжным направлением медицинского туризма в мире.",
      degerlerBaslik: "Наши ценности",
      degerler: [
        { ikon: "🔒", baslik: "Безопасность", aciklama: "Безопасность пациентов — приоритет с нашей системой эскроу и сетью проверенных клиник." },
        { ikon: "⚖️", baslik: "Прозрачность", aciklama: "Никаких скрытых платежей и сюрпризов. Всё открыто и ясно." },
        { ikon: "🌍", baslik: "Доступность", aciklama: "Мы охватываем пациентов со всего мира с поддержкой 6 языков." },
        { ikon: "🤝", baslik: "Доверие", aciklama: "Быть надёжным мостом между пациентами и клиниками — наша главная цель." },
      ],
      ekipBaslik: "Наша команда",
      ekip: "Medoqa управляется командой с опытом в здравоохранении, технологиях и международном бизнесе. Наши координаторы обеспечивают поддержку пациентов на 6 языках.",
      iletisimBtn: "Связаться с нами",
    },
    fr: {
      baslik: "À propos de nous",
      alt: "Medoqa redéfinit la confiance dans le tourisme médical.",
      hikayeBaslik: "Notre histoire",
      hikaye: "Medoqa a été fondé pour permettre aux personnes vivant à l'étranger de se faire soigner en Turquie en toute sécurité et transparence. Les principaux problèmes du tourisme médical — cliniques peu fiables, frais cachés, pression pour des actes supplémentaires et barrières de communication — nous ont poussés à créer cette plateforme.",
      misyonBaslik: "Notre mission",
      misyon: "Construire un écosystème transparent où chaque patient peut accéder en toute confiance à des soins de qualité, et où les cliniques peuvent atteindre honnêtement des patients internationaux.",
      vizyonBaslik: "Notre vision",
      vizyon: "Être la plateforme qui fait de la Turquie la destination de tourisme médical la plus fiable au monde.",
      degerlerBaslik: "Nos valeurs",
      degerler: [
        { ikon: "🔒", baslik: "Sécurité", aciklama: "La sécurité des patients passe en premier avec notre système séquestre et notre réseau de cliniques vérifiées." },
        { ikon: "⚖️", baslik: "Transparence", aciklama: "Pas de frais cachés, pas de surprises. Tout est ouvert et clair." },
        { ikon: "🌍", baslik: "Accessibilité", aciklama: "Nous atteignons des patients du monde entier avec un support en 6 langues." },
        { ikon: "🤝", baslik: "Confiance", aciklama: "Être un pont fiable entre patients et cliniques est notre objectif principal." },
      ],
      ekipBaslik: "Notre équipe",
      ekip: "Medoqa est géré par une équipe avec une expérience en santé, technologie et affaires internationales. Nos coordinateurs fournissent un soutien aux patients en 6 langues.",
      iletisimBtn: "Nous contacter",
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

      {/* Hikaye */}
      <section style={{ padding: "64px 16px", background: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0f0d2e", marginBottom: "20px" }}>{ic.hikayeBaslik}</h2>
          {ic.hikaye.split("\n\n").map((p, i) => (
            <p key={i} style={{ fontSize: "16px", color: "#475569", lineHeight: 1.85, marginBottom: "16px" }}>{p}</p>
          ))}
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section style={{ padding: "64px 16px", background: "#f8f9ff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", border: "1px solid #e8e6ff" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🎯</div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#0f0d2e", marginBottom: "12px" }}>{ic.misyonBaslik}</h2>
            <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.8, margin: 0 }}>{ic.misyon}</p>
          </div>
          <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", border: "1px solid #e8e6ff" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🚀</div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#0f0d2e", marginBottom: "12px" }}>{ic.vizyonBaslik}</h2>
            <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.8, margin: 0 }}>{ic.vizyon}</p>
          </div>
        </div>
      </section>

      {/* Değerler */}
      <section style={{ padding: "64px 16px", background: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0f0d2e", marginBottom: "32px", textAlign: "center" }}>{ic.degerlerBaslik}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {ic.degerler.map((d, i) => (
              <div key={i} style={{ background: "#f8f9ff", borderRadius: "16px", padding: "24px", border: "1px solid #e8e6ff", textAlign: "center" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{d.ikon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f0d2e", marginBottom: "8px" }}>{d.baslik}</h3>
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>{d.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#534AB7", padding: "64px 16px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>{ic.ekipBaslik}</h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", marginBottom: "24px", lineHeight: 1.7 }}>{ic.ekip}</p>
          <a href="/iletisim" style={{ display: "inline-block", background: "#fff", color: "#534AB7", padding: "14px 32px", borderRadius: "12px", fontSize: "15px", textDecoration: "none", fontWeight: 700 }}>{ic.iletisimBtn}</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
