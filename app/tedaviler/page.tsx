"use client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TEDAVILER = [
  {
    id: "dis-tedavisi",
    ikon: "🦷",
    foto: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop",
    renk: "#534AB7",
    tr: { baslik: "Diş Tedavisi", aciklama: "Türkiye'de dünya standartlarında diş tedavisi. Avrupa fiyatlarının çok altında implant, kaplama, veneer ve daha fazlası.", alt: ["Diş İmplantı", "Zirkonyum Kron", "Veneer", "Kanal Tedavisi", "Gülüş Tasarımı", "Diş Beyazlatma"], fiyat: "€200'den başlayan" },
    en: { baslik: "Dental Treatment", aciklama: "World-class dental care in Turkey. Implants, crowns, veneers and more at a fraction of European prices.", alt: ["Dental Implant", "Zirconia Crown", "Veneers", "Root Canal", "Smile Design", "Teeth Whitening"], fiyat: "From €200" },
    de: { baslik: "Zahnbehandlung", aciklama: "Zahnpflege auf Weltniveau in der Türkei. Implantate, Kronen, Veneers und mehr.", alt: ["Zahnimplantat", "Zirkonkrone", "Veneers", "Wurzelkanal", "Smile Design", "Bleaching"], fiyat: "Ab €200" },
    ar: { baslik: "علاج الأسنان", aciklama: "رعاية أسنان عالمية في تركيا. زراعة وتيجان وقشور وأكثر.", alt: ["زراعة الأسنان", "تاج زركوني", "قشور", "علاج العصب", "تصميم الابتسامة", "تبييض"], fiyat: "من €200" },
    ru: { baslik: "Стоматология", aciklama: "Стоматология мирового уровня в Турции. Импланты, коронки, виниры и многое другое.", alt: ["Имплант", "Циркониевая коронка", "Виниры", "Канал", "Дизайн улыбки", "Отбеливание"], fiyat: "От €200" },
    fr: { baslik: "Soins dentaires", aciklama: "Soins dentaires de classe mondiale en Turquie. Implants, couronnes, facettes et plus.", alt: ["Implant dentaire", "Couronne zircone", "Facettes", "Canal", "Smile Design", "Blanchiment"], fiyat: "À partir de €200" },
  },
  {
    id: "sac-ekimi",
    ikon: "💇",
    foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop",
    renk: "#059669",
    tr: { baslik: "Saç Ekimi", aciklama: "Türkiye dünyada saç ekiminde 1 numara. FUE, DHI ve Safir tekniklerle kalıcı, doğal sonuçlar.", alt: ["FUE Saç Ekimi", "DHI Tekniği", "Safir FUE", "Sakal Ekimi", "Kaş Ekimi", "PRP Tedavisi"], fiyat: "€1.500'den başlayan" },
    en: { baslik: "Hair Transplant", aciklama: "Turkey is the world's #1 destination for hair transplants. FUE, DHI and Sapphire techniques.", alt: ["FUE Hair Transplant", "DHI Technique", "Sapphire FUE", "Beard Transplant", "Eyebrow Transplant", "PRP Treatment"], fiyat: "From €1,500" },
    de: { baslik: "Haartransplantation", aciklama: "Die Türkei ist weltweit führend bei Haartransplantationen. FUE, DHI und Saphir-Techniken.", alt: ["FUE Haartransplantation", "DHI-Technik", "Saphir FUE", "Barttransplantation", "Brauentransplantation", "PRP-Behandlung"], fiyat: "Ab €1.500" },
    ar: { baslik: "زراعة الشعر", aciklama: "تركيا الأولى عالمياً في زراعة الشعر. تقنيات FUE وDHI والسافير.", alt: ["زراعة FUE", "تقنية DHI", "سافير FUE", "زراعة اللحية", "زراعة الحواجب", "علاج PRP"], fiyat: "من €1,500" },
    ru: { baslik: "Пересадка волос", aciklama: "Турция — лидер в пересадке волос. Техники FUE, DHI и сапфировый FUE.", alt: ["FUE пересадка", "DHI техника", "Сапфировый FUE", "Пересадка бороды", "Пересадка бровей", "PRP терапия"], fiyat: "От €1.500" },
    fr: { baslik: "Greffe de cheveux", aciklama: "La Turquie est la destination n°1 mondiale pour la greffe de cheveux. FUE, DHI et Saphir.", alt: ["Greffe FUE", "Technique DHI", "FUE Saphir", "Greffe de barbe", "Greffe de sourcils", "Traitement PRP"], fiyat: "À partir de €1.500" },
  },
  {
    id: "goz-ameliyati",
    ikon: "👁️",
    foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    renk: "#0891B2",
    tr: { baslik: "Göz Ameliyatı", aciklama: "Lazer göz ameliyatı ile gözlük ve lenslerden kurtulun. Lasik, Lasek, Smile Pro ve ICL seçenekleri.", alt: ["Lasik", "Lasek", "Smile Pro", "ICL Lens", "Katarakt", "Multifokal Lens"], fiyat: "€800'den başlayan" },
    en: { baslik: "Eye Surgery", aciklama: "Say goodbye to glasses with laser eye surgery. Lasik, Lasek, Smile Pro and ICL options.", alt: ["Lasik", "Lasek", "Smile Pro", "ICL Lens", "Cataract", "Multifocal Lens"], fiyat: "From €800" },
    de: { baslik: "Augenchirurgie", aciklama: "Verabschieden Sie sich von Brillen mit Laseraugenchirurgie. Lasik, Lasek, Smile Pro und ICL.", alt: ["Lasik", "Lasek", "Smile Pro", "ICL-Linse", "Katarakt", "Multifokal-Linse"], fiyat: "Ab €800" },
    ar: { baslik: "جراحة العيون", aciklama: "ودّع النظارات مع جراحة العيون بالليزر. خيارات لاسيك ولاسيك وسمايل برو و ICL.", alt: ["لاسيك", "لاسيك", "سمايل برو", "عدسة ICL", "ماء أبيض", "عدسة متعددة البؤر"], fiyat: "من €800" },
    ru: { baslik: "Операция на глазах", aciklama: "Попрощайтесь с очками с лазерной хирургией глаз. Ласик, Ласек, Smile Pro и ICL.", alt: ["Ласик", "Ласек", "Smile Pro", "ICL линза", "Катаракта", "Мультифокальная линза"], fiyat: "От €800" },
    fr: { baslik: "Chirurgie oculaire", aciklama: "Dites adieu aux lunettes avec la chirurgie laser. Lasik, Lasek, Smile Pro et ICL.", alt: ["Lasik", "Lasek", "Smile Pro", "Lentille ICL", "Cataracte", "Lentille multifocale"], fiyat: "À partir de €800" },
  },
  {
    id: "plastik-cerrahi",
    ikon: "✨",
    foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop",
    renk: "#D97706",
    tr: { baslik: "Plastik Cerrahi", aciklama: "Burun estetiği, yüz germe, meme estetiği ve daha fazlası. Deneyimli cerrahlar, modern klinikler.", alt: ["Burun Estetiği", "Yüz Germe", "Göz Kapağı", "Meme Büyütme", "Liposuction", "Karın Germe"], fiyat: "€1.200'den başlayan" },
    en: { baslik: "Plastic Surgery", aciklama: "Rhinoplasty, face lift, breast aesthetics and more. Experienced surgeons, modern clinics.", alt: ["Rhinoplasty", "Face Lift", "Eyelid Surgery", "Breast Augmentation", "Liposuction", "Tummy Tuck"], fiyat: "From €1,200" },
    de: { baslik: "Plastische Chirurgie", aciklama: "Nasenkorrektur, Facelifting, Brustästhetik und mehr. Erfahrene Chirurgen, moderne Kliniken.", alt: ["Nasenkorrektur", "Facelifting", "Lidkorrektur", "Brustvergrößerung", "Liposuktion", "Bauchdeckenstraffung"], fiyat: "Ab €1.200" },
    ar: { baslik: "الجراحة التجميلية", aciklama: "تجميل الأنف وشد الوجه وجماليات الثدي والمزيد. جراحون متمرسون وعيادات حديثة.", alt: ["تجميل الأنف", "شد الوجه", "جفن العين", "تكبير الثدي", "شفط الدهون", "شد البطن"], fiyat: "من €1,200" },
    ru: { baslik: "Пластическая хирургия", aciklama: "Ринопластика, подтяжка лица, эстетика груди и многое другое.", alt: ["Ринопластика", "Подтяжка лица", "Блефаропластика", "Увеличение груди", "Липосакция", "Абдоминопластика"], fiyat: "От €1.200" },
    fr: { baslik: "Chirurgie plastique", aciklama: "Rhinoplastie, lifting, esthétique mammaire et plus. Chirurgiens expérimentés, cliniques modernes.", alt: ["Rhinoplastie", "Lifting", "Blépharoplastie", "Augmentation mammaire", "Liposuccion", "Abdominoplastie"], fiyat: "À partir de €1.200" },
  },
  {
    id: "check-up",
    ikon: "🩺",
    foto: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop",
    renk: "#7C3AED",
    tr: { baslik: "Check-Up", aciklama: "Kapsamlı sağlık taraması ile sağlığınızı kontrol altına alın. Temel ve kapsamlı check-up paketleri.", alt: ["Temel Check-Up", "Kapsamlı Check-Up", "Kardiyoloji Check-Up", "Onkoloji Tarama", "Kan Testleri", "Görüntüleme"], fiyat: "€150'den başlayan" },
    en: { baslik: "Health Check-Up", aciklama: "Take control of your health with a comprehensive screening. Basic and comprehensive check-up packages.", alt: ["Basic Check-Up", "Comprehensive Check-Up", "Cardiology Check-Up", "Oncology Screening", "Blood Tests", "Imaging"], fiyat: "From €150" },
    de: { baslik: "Gesundheits-Check-Up", aciklama: "Behalten Sie Ihre Gesundheit mit einer umfassenden Untersuchung im Griff.", alt: ["Basis-Check-Up", "Umfassender Check-Up", "Kardiologie Check-Up", "Onkologie-Screening", "Bluttests", "Bildgebung"], fiyat: "Ab €150" },
    ar: { baslik: "فحص شامل", aciklama: "تحكم في صحتك مع فحص شامل. باقات فحص أساسية وشاملة.", alt: ["فحص أساسي", "فحص شامل", "فحص قلبي", "فحص أورام", "اختبارات دم", "تصوير"], fiyat: "من €150" },
    ru: { baslik: "Чек-ап", aciklama: "Возьмите здоровье под контроль с комплексным обследованием.", alt: ["Базовый чек-ап", "Комплексный чек-ап", "Кардиологический", "Онкоскрининг", "Анализы крови", "Визуализация"], fiyat: "От €150" },
    fr: { baslik: "Bilan de santé", aciklama: "Prenez le contrôle de votre santé avec un bilan complet.", alt: ["Bilan de base", "Bilan complet", "Bilan cardiologique", "Dépistage oncologique", "Analyses sanguines", "Imagerie"], fiyat: "À partir de €150" },
  },
  {
    id: "ortopedi",
    ikon: "🦴",
    foto: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop",
    renk: "#DC2626",
    tr: { baslik: "Ortopedi", aciklama: "Diz protezi, kalça protezi, omurga cerrahisi ve spor yaralanmaları tedavisi.", alt: ["Diz Protezi", "Kalça Protezi", "Omurga Cerrahisi", "Artroskopi", "Spor Yaralanması", "Kıkırdak Tedavisi"], fiyat: "€2.000'den başlayan" },
    en: { baslik: "Orthopedics", aciklama: "Knee replacement, hip replacement, spine surgery and sports injury treatment.", alt: ["Knee Replacement", "Hip Replacement", "Spine Surgery", "Arthroscopy", "Sports Injury", "Cartilage Treatment"], fiyat: "From €2,000" },
    de: { baslik: "Orthopädie", aciklama: "Knieersatz, Hüftersatz, Wirbelsäulenchirurgie und Sportverletzungsbehandlung.", alt: ["Knieersatz", "Hüftersatz", "Wirbelsäulenchirurgie", "Arthroskopie", "Sportverletzung", "Knorpelbehandlung"], fiyat: "Ab €2.000" },
    ar: { baslik: "العظام", aciklama: "استبدال الركبة والورك وجراحة العمود الفقري وعلاج إصابات الرياضة.", alt: ["استبدال الركبة", "استبدال الورك", "جراحة العمود الفقري", "تنظير المفاصل", "إصابة رياضية", "علاج الغضروف"], fiyat: "من €2,000" },
    ru: { baslik: "Ортопедия", aciklama: "Замена колена, тазобедренного сустава, хирургия позвоночника и спортивные травмы.", alt: ["Замена колена", "Замена тазобедренного", "Хирургия позвоночника", "Артроскопия", "Спортивная травма", "Лечение хряща"], fiyat: "От €2.000" },
    fr: { baslik: "Orthopédie", aciklama: "Prothèse de genou, de hanche, chirurgie de la colonne vertébrale et traumatologie sportive.", alt: ["Prothèse genou", "Prothèse hanche", "Chirurgie colonne", "Arthroscopie", "Traumatologie sportive", "Traitement cartilage"], fiyat: "À partir de €2.000" },
  },
];

export default function TedavilerPage() {
  const { dil } = useDil();

  const baslik = { tr: "Tedavi Kategorileri", en: "Treatment Categories", de: "Behandlungskategorien", ar: "فئات العلاج", ru: "Категории лечения", fr: "Catégories de traitement" };
  const alt = { tr: "Türkiye'de yaptırabileceğiniz tüm tedaviler için ücretsiz teklif alın.", en: "Get free quotes for all treatments you can have in Turkey.", de: "Holen Sie sich kostenlose Angebote für alle Behandlungen in der Türkei.", ar: "احصل على عروض مجانية لجميع العلاجات في تركيا.", ru: "Получите бесплатные предложения по всем видам лечения в Турции.", fr: "Obtenez des devis gratuits pour tous les traitements en Turquie." };
  const teklifBtn = { tr: "Teklif Al", en: "Get Quote", de: "Angebot", ar: "عرض", ru: "Предложение", fr: "Devis" };
  const detayBtn = { tr: "Alt Kategoriler", en: "Sub-categories", de: "Unterkategorien", ar: "الفئات الفرعية", ru: "Подкатегории", fr: "Sous-catégories" };
  const fiyatLabel = { tr: "Başlangıç fiyatı", en: "Starting price", de: "Startpreis", ar: "السعر الابتدائي", ru: "Начальная цена", fr: "Prix de départ" };

  const d = dil as keyof typeof baslik;

  return (
    <main style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: "80px 16px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "42px", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>{baslik[d]}</h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>{alt[d]}</p>
        </div>
      </section>

      {/* Tedavi Kartları */}
      <section style={{ padding: "64px 16px", background: "#f8f9ff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {TEDAVILER.map(t => {
            const ic = t[d] || t.en;
            return (
              <div key={t.id} style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid #e8e6ff", display: "flex", flexDirection: "column" }}>
                {/* Fotoğraf */}
                <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                  <img src={t.foto} alt={ic.baslik} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${t.renk}cc, transparent)` }} />
                  <div style={{ position: "absolute", bottom: "16px", left: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "28px" }}>{t.ikon}</span>
                    <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", margin: 0 }}>{ic.baslik}</h2>
                  </div>
                </div>

                {/* İçerik */}
                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, marginBottom: "16px" }}>{ic.aciklama}</p>

                  {/* Alt kategoriler */}
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", letterSpacing: "1px", marginBottom: "8px" }}>{detayBtn[d]}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {ic.alt.map((a: string, i: number) => (
                        <span key={i} style={{ background: `${t.renk}15`, color: t.renk, fontSize: "11px", padding: "3px 10px", borderRadius: "20px", fontWeight: 500 }}>{a}</span>
                      ))}
                    </div>
                  </div>

                  {/* Fiyat ve buton */}
                  <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>{fiyatLabel[d]}</div>
                      <div style={{ fontSize: "16px", fontWeight: 700, color: t.renk }}>{ic.fiyat}</div>
                    </div>
                    <a href="/teklif" style={{ background: t.renk, color: "#fff", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", textDecoration: "none", fontWeight: 700 }}>{teklifBtn[d]}</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#534AB7", padding: "64px 16px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>
            {d === "tr" ? "Hangi Tedaviyi Arıyorsunuz?" : d === "de" ? "Welche Behandlung suchen Sie?" : d === "ar" ? "أي علاج تبحث عنه؟" : d === "ru" ? "Какое лечение вы ищете?" : d === "fr" ? "Quel traitement cherchez-vous ?" : "What Treatment Are You Looking For?"}
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", marginBottom: "24px" }}>
            {d === "tr" ? "Listede göremediğiniz bir tedavi için de teklif alabilirsiniz." : d === "de" ? "Sie können auch ein Angebot für eine Behandlung einholen, die nicht aufgelistet ist." : d === "ar" ? "يمكنك أيضاً الحصول على عرض لعلاج غير مدرج." : d === "ru" ? "Вы также можете получить предложение по лечению, которого нет в списке." : d === "fr" ? "Vous pouvez également obtenir un devis pour un traitement non listé." : "You can also get a quote for a treatment not listed above."}
          </p>
          <a href="/teklif" style={{ display: "inline-block", background: "#fff", color: "#534AB7", padding: "14px 36px", borderRadius: "12px", fontSize: "15px", textDecoration: "none", fontWeight: 700 }}>
            {teklifBtn[d]}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
