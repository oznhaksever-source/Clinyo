"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NasilCalisir() {
  const [istatistik, setIstatistik] = useState({ klinik: 0, hasta: 0, otel: 0, transfer: 0 });
  const [acikSoru, setAcikSoru] = useState<number | null>(null);
  const [mobil, setMobil] = useState(false);
  const { dil } = useDil();
  const supabase = createClient();

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  useEffect(() => {
    async function veriYukle() {
      const { count: k } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "klinik").eq("onaylandi", true);
      const { count: h } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "hasta");
      const { count: o } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "otel").eq("onaylandi", true);
      const { count: t } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "transfer").eq("onaylandi", true);
      setIstatistik({ klinik: k || 0, hasta: h || 0, otel: o || 0, transfer: t || 0 });
    }
    veriYukle();
  }, []);

  const icerik = {
    tr: {
      badge: "Güvenli · Şeffaf · Kolay",
      baslik: "Medoqa Nasıl Çalışır?",
      altBaslik: "Tedavinizden oteline, transferinizden güvenli ödemeye kadar her şey tek platformda.",
      adimlarBaslik: "6 Adımda Tedaviniz Tamamlansın",
      nedenBaslik: "Gerçek Rakamlar",
      nedenAlt: "Platformumuzdaki güncel istatistikler",
      sssBaslik: "Sıkça Sorulan Sorular",
      cagriBaslik: "Hemen Başlayın",
      cagriAlt: "Ücretsiz teklif alın, en iyi kliniği seçin, güvenle gelin.",
      teklifAl: "Ücretsiz Teklif Al",
      klinikleriIncele: "Klinikleri İncele",
      istatistik: ["Onaylı Klinik", "Kayıtlı Hasta", "Partner Otel", "Transfer Firması"],
      adimlar: [
        { foto: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop", baslik: "Tedavini Seç", aciklama: "Diş, saç ekimi, göz, estetik veya ortopedi — 500+ tedavi seçeneği mevcut.", detaylar: ["500+ tedavi seçeneği", "Detaylı tedavi bilgileri", "Fiyat aralıkları"] },
        { foto: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop", baslik: "Ücretsiz Teklif Al", aciklama: "Fotoğraf veya röntgenini yükle. Onaylı klinikler 2-4 saat içinde teklif gönderir.", detaylar: ["Tamamen ücretsiz", "2-4 saat içinde yanıt", "Birden fazla klinikten"] },
        { foto: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop", baslik: "Teklifleri Karşılaştır", aciklama: "Fiyat, içerik ve klinik profillerini yan yana incele. Yorumları oku, en iyisini seç.", detaylar: ["Yan yana karşılaştırma", "Doğrulanmış yorumlar", "Şeffaf fiyatlandırma"] },
        { foto: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop", baslik: "Otel & Transfer Seç", aciklama: "Kliniğe yakın partner otelleri incele. Havalimanı transferini platforma entegre planla.", detaylar: ["Kliniğe yakın oteller", "Havalimanı transferi", "Paket fiyat avantajı"] },
        { foto: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop", baslik: "Güvenli Öde", aciklama: "Ödemen güvenli hesabımızda bekler. Tedavin tamamlanıp sen onaylayana kadar kliniğe geçmez.", detaylar: ["Blokeli ödeme sistemi", "Sen onaylamadan geçmez", "Ek işlem güvencesi"] },
        { foto: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop", baslik: "Deneyimini Paylaş", aciklama: "Tedavi sonrası yorumunu yaz. Diğer hastalara yol göster.", detaylar: ["Doğrulanmış yorumlar", "Puan sistemi", "Diğer hastalara yardım et"] },
      ],
      sorular: [
        { soru: "Medoqa ücretsiz mi?", cevap: "Evet! Hastalar için Medoqa tamamen ücretsizdir." },
        { soru: "Klinikler nasıl doğrulanır?", cevap: "Tüm klinikler Sağlık Bakanlığı lisanslarını, doktor sertifikalarını ve sigorta belgelerini sunar." },
        { soru: "Blokeli ödeme sistemi nasıl çalışır?", cevap: "Ödemeniz platformumuzda güvenle tutulur. Tedaviniz tamamlanıp siz onaylayana kadar kliniğe geçmez." },
        { soru: "Ek işlemler için ekstra ücret ödemek zorunda mıyım?", cevap: "Hayır! Klinik ek işlem önerecekse önce sizden onay almak zorundadır." },
        { soru: "Hangi ülkelerden hizmet veriyorsunuz?", cevap: "Medoqa global bir platformdur. Dünyanın her yerinden hasta kabul eden kliniklerle çalışıyoruz." },
        { soru: "Dil desteği var mı?", cevap: "Evet! Platform Türkçe, İngilizce, Almanca, Arapça, Rusça ve Fransızca olarak kullanılabilir." },
      ],
    },
    en: {
      badge: "Safe · Transparent · Easy",
      baslik: "How Does Medoqa Work?",
      altBaslik: "From treatment to hotel, from transfer to secure payment — everything in one platform.",
      adimlarBaslik: "Complete Your Treatment in 6 Steps",
      nedenBaslik: "Real Numbers",
      nedenAlt: "Current statistics on our platform",
      sssBaslik: "Frequently Asked Questions",
      cagriBaslik: "Get Started Now",
      cagriAlt: "Get a free quote, choose the best clinic, come safely.",
      teklifAl: "Get Free Quote",
      klinikleriIncele: "Explore Clinics",
      istatistik: ["Verified Clinic", "Registered Patient", "Partner Hotel", "Transfer Company"],
      adimlar: [
        { foto: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop", baslik: "Choose Your Treatment", aciklama: "Dental, hair transplant, eye, aesthetic or orthopedics — 500+ options available.", detaylar: ["500+ treatment options", "Detailed treatment info", "Price ranges"] },
        { foto: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop", baslik: "Get Free Quote", aciklama: "Upload photo or X-ray. Verified clinics send quotes within 2-4 hours.", detaylar: ["Completely free", "Response in 2-4 hours", "From multiple clinics"] },
        { foto: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop", baslik: "Compare Quotes", aciklama: "Review price, content and clinic profiles side by side. Choose the best without pressure.", detaylar: ["Side-by-side comparison", "Verified reviews", "Transparent pricing"] },
        { foto: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop", baslik: "Choose Hotel & Transfer", aciklama: "Browse partner hotels near the clinic. Plan airport transfer integrated.", detaylar: ["Hotels near clinic", "Airport transfer", "Package deal advantage"] },
        { foto: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop", baslik: "Pay Safely", aciklama: "Your payment waits in our secure account until treatment is complete and you approve.", detaylar: ["Escrow payment system", "No payment without approval", "Extra procedure protection"] },
        { foto: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop", baslik: "Share Your Experience", aciklama: "Write a review after treatment. Guide other patients.", detaylar: ["Verified reviews", "Rating system", "Help other patients"] },
      ],
      sorular: [
        { soru: "Is Medoqa free?", cevap: "Yes! Medoqa is completely free for patients." },
        { soru: "How are clinics verified?", cevap: "All clinics submit Ministry of Health licenses, doctor certificates and insurance documents." },
        { soru: "How does the escrow payment system work?", cevap: "Your payment is safely held on our platform until treatment is complete and you approve." },
        { soru: "Do I have to pay extra for additional procedures?", cevap: "No! The clinic must get your approval before proposing any additional procedures." },
        { soru: "Which countries do you serve?", cevap: "Medoqa is a global platform working with clinics for patients from all over the world." },
        { soru: "Is there language support?", cevap: "Yes! Turkish, English, German, Arabic, Russian and French are supported." },
      ],
    },
    de: {
      badge: "Sicher · Transparent · Einfach",
      baslik: "Wie funktioniert Medoqa?",
      altBaslik: "Von der Behandlung bis zum Hotel, vom Transfer bis zur sicheren Zahlung — alles auf einer Plattform.",
      adimlarBaslik: "Behandlung in 6 Schritten abschließen",
      nedenBaslik: "Echte Zahlen",
      nedenAlt: "Aktuelle Statistiken auf unserer Plattform",
      sssBaslik: "Häufig gestellte Fragen",
      cagriBaslik: "Jetzt starten",
      cagriAlt: "Kostenloses Angebot einholen, beste Klinik wählen, sicher kommen.",
      teklifAl: "Kostenloses Angebot",
      klinikleriIncele: "Kliniken erkunden",
      istatistik: ["Verifizierte Klinik", "Registrierter Patient", "Partner Hotel", "Transferunternehmen"],
      adimlar: [
        { foto: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop", baslik: "Behandlung wählen", aciklama: "Zahn, Haartransplantation, Auge, Ästhetik oder Orthopädie — 500+ Optionen.", detaylar: ["500+ Optionen", "Detaillierte Informationen", "Preisspannen"] },
        { foto: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop", baslik: "Kostenloses Angebot", aciklama: "Foto hochladen. Kliniken senden in 2-4 Stunden Angebote.", detaylar: ["Völlig kostenlos", "In 2-4 Stunden", "Von mehreren Kliniken"] },
        { foto: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop", baslik: "Angebote vergleichen", aciklama: "Preis und Profile nebeneinander prüfen. Das Beste ohne Druck wählen.", detaylar: ["Nebeneinander Vergleich", "Verifizierte Bewertungen", "Transparente Preise"] },
        { foto: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop", baslik: "Hotel & Transfer wählen", aciklama: "Partnerhotels durchsuchen. Flughafentransfer planen.", detaylar: ["Hotels in Kliniknähe", "Flughafentransfer", "Paketpreisvorteil"] },
        { foto: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop", baslik: "Sicher bezahlen", aciklama: "Zahlung wartet bis Behandlung abgeschlossen ist.", detaylar: ["Treuhandzahlungssystem", "Ohne Genehmigung nichts", "Schutz vor Zusatzeingriffen"] },
        { foto: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop", baslik: "Erfahrung teilen", aciklama: "Bewertung schreiben. Anderen Patienten helfen.", detaylar: ["Verifizierte Bewertungen", "Bewertungssystem", "Anderen helfen"] },
      ],
      sorular: [
        { soru: "Ist Medoqa kostenlos?", cevap: "Ja! Medoqa ist für Patienten völlig kostenlos." },
        { soru: "Wie werden Kliniken verifiziert?", cevap: "Alle Kliniken reichen Lizenzen, Arztzertifikate und Versicherungsdokumente ein." },
        { soru: "Wie funktioniert das Treuhandzahlungssystem?", cevap: "Ihre Zahlung wird sicher gehalten bis Behandlung abgeschlossen ist." },
        { soru: "Muss ich für Zusatzeingriffe extra bezahlen?", cevap: "Nein! Die Klinik muss Ihre Genehmigung einholen." },
        { soru: "Welche Länder bedienen Sie?", cevap: "Medoqa ist eine globale Plattform mit Kliniken für Patienten aus aller Welt." },
        { soru: "Gibt es Sprachunterstützung?", cevap: "Ja! Türkisch, Englisch, Deutsch, Arabisch, Russisch und Französisch." },
      ],
    },
    ar: {
      badge: "آمن · شفاف · سهل",
      baslik: "كيف تعمل Medoqa؟",
      altBaslik: "من العلاج إلى الفندق، ومن النقل إلى الدفع الآمن — كل شيء في منصة واحدة.",
      adimlarBaslik: "أكمل علاجك في 6 خطوات",
      nedenBaslik: "أرقام حقيقية",
      nedenAlt: "إحصاءات حالية على منصتنا",
      sssBaslik: "الأسئلة الشائعة",
      cagriBaslik: "ابدأ الآن",
      cagriAlt: "احصل على عرض مجاني، اختر أفضل عيادة، تعال بأمان.",
      teklifAl: "احصل على عرض مجاني",
      klinikleriIncele: "استكشف العيادات",
      istatistik: ["عيادة معتمدة", "مريض مسجل", "فندق شريك", "شركة نقل"],
      adimlar: [
        { foto: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop", baslik: "اختر علاجك", aciklama: "أسنان، زراعة شعر، عيون، تجميل أو عظام — أكثر من 500 خيار علاجي متاح.", detaylar: ["500+ خيار علاجي", "معلومات تفصيلية", "نطاقات الأسعار"] },
        { foto: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop", baslik: "احصل على عرض مجاني", aciklama: "ارفع صورك أو الأشعة. العيادات المعتمدة ترسل عروضاً خلال 2-4 ساعات.", detaylar: ["مجاني تماماً", "رد خلال 2-4 ساعات", "من عدة عيادات"] },
        { foto: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop", baslik: "قارن العروض", aciklama: "راجع السعر والمحتوى وملفات العيادات جنباً إلى جنب. اختر الأفضل بدون ضغط.", detaylar: ["مقارنة جنباً إلى جنب", "تقييمات موثقة", "أسعار شفافة"] },
        { foto: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop", baslik: "اختر الفندق والنقل", aciklama: "تصفح الفنادق الشريكة بالقرب من العيادة. خطط لنقل المطار.", detaylar: ["فنادق قريبة من العيادة", "نقل المطار", "ميزة الحزمة"] },
        { foto: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop", baslik: "ادفع بأمان", aciklama: "أموالك تنتظر في حسابنا الآمن حتى اكتمال علاجك وموافقتك.", detaylar: ["نظام الدفع الضمني", "لا دفع بدون موافقة", "حماية من الإجراءات الإضافية"] },
        { foto: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop", baslik: "شارك تجربتك", aciklama: "اكتب تقييماً بعد العلاج. ساعد المرضى الآخرين.", detaylar: ["تقييمات موثقة", "نظام التقييم", "مساعدة المرضى الآخرين"] },
      ],
      sorular: [
        { soru: "هل Medoqa مجانية؟", cevap: "نعم! Medoqa مجانية تماماً للمرضى." },
        { soru: "كيف يتم التحقق من العيادات؟", cevap: "جميع العيادات تقدم تراخيص وزارة الصحة وشهادات الأطباء ووثائق التأمين." },
        { soru: "كيف يعمل نظام الدفع الضمني؟", cevap: "أموالك محفوظة بأمان حتى اكتمال علاجك وموافقتك." },
        { soru: "هل يجب أن أدفع إضافياً مقابل الإجراءات الإضافية؟", cevap: "لا! يجب على العيادة الحصول على موافقتك قبل أي إجراء إضافي." },
        { soru: "ما الدول التي تخدمونها؟", cevap: "Medoqa منصة عالمية تعمل مع عيادات تقبل المرضى من جميع أنحاء العالم." },
        { soru: "هل هناك دعم لغوي؟", cevap: "نعم! المنصة متاحة بالعربية والتركية والإنجليزية والألمانية والروسية والفرنسية." },
      ],
    },
    ru: {
      badge: "Безопасно · Прозрачно · Легко",
      baslik: "Как работает Medoqa?",
      altBaslik: "От лечения до отеля, от трансфера до безопасной оплаты — всё на одной платформе.",
      adimlarBaslik: "Завершите лечение за 6 шагов",
      nedenBaslik: "Реальные цифры",
      nedenAlt: "Актуальная статистика нашей платформы",
      sssBaslik: "Часто задаваемые вопросы",
      cagriBaslik: "Начните сейчас",
      cagriAlt: "Получите бесплатное предложение, выберите лучшую клинику, приезжайте с уверенностью.",
      teklifAl: "Получить бесплатное предложение",
      klinikleriIncele: "Найти клиники",
      istatistik: ["Сертифицированная клиника", "Зарегистрированный пациент", "Партнёрский отель", "Транспортная компания"],
      adimlar: [
        { foto: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop", baslik: "Выберите лечение", aciklama: "Стоматология, пересадка волос, глаза, эстетика или ортопедия — 500+ вариантов.", detaylar: ["500+ вариантов лечения", "Подробная информация", "Диапазоны цен"] },
        { foto: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop", baslik: "Получите бесплатное предложение", aciklama: "Загрузите фото или рентген. Клиники пришлют предложения за 2-4 часа.", detaylar: ["Совершенно бесплатно", "Ответ за 2-4 часа", "От нескольких клиник"] },
        { foto: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop", baslik: "Сравните предложения", aciklama: "Сравнивайте цену, содержание и профили клиник. Выберите лучшее без давления.", detaylar: ["Сравнение рядом", "Проверенные отзывы", "Прозрачные цены"] },
        { foto: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop", baslik: "Выберите отель и трансфер", aciklama: "Партнёрские отели рядом с клиникой. Планируйте трансфер из аэропорта.", detaylar: ["Отели рядом с клиникой", "Трансфер из аэропорта", "Пакетное предложение"] },
        { foto: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop", baslik: "Оплатите безопасно", aciklama: "Платёж ждёт на нашем защищённом счёте до завершения лечения.", detaylar: ["Система эскроу", "Без одобрения не платит", "Защита от лишних процедур"] },
        { foto: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop", baslik: "Поделитесь опытом", aciklama: "Напишите отзыв после лечения. Помогите другим пациентам.", detaylar: ["Проверенные отзывы", "Система рейтинга", "Помощь другим"] },
      ],
      sorular: [
        { soru: "Medoqa бесплатна?", cevap: "Да! Medoqa полностью бесплатна для пациентов." },
        { soru: "Как проверяются клиники?", cevap: "Все клиники предоставляют лицензии Министерства здравоохранения, сертификаты врачей и страховые документы." },
        { soru: "Как работает система эскроу?", cevap: "Ваш платёж хранится в безопасности до завершения лечения и вашего одобрения." },
        { soru: "Нужно ли платить за дополнительные процедуры?", cevap: "Нет! Клиника обязана получить ваше согласие перед любой дополнительной процедурой." },
        { soru: "Какие страны вы обслуживаете?", cevap: "Medoqa — глобальная платформа с клиниками для пациентов со всего мира." },
        { soru: "Есть ли языковая поддержка?", cevap: "Да! Поддерживаются русский, турецкий, английский, немецкий, арабский и французский." },
      ],
    },
    fr: {
      badge: "Sûr · Transparent · Facile",
      baslik: "Comment fonctionne Medoqa ?",
      altBaslik: "Du traitement à l'hôtel, du transfert au paiement sécurisé — tout sur une seule plateforme.",
      adimlarBaslik: "Terminez votre traitement en 6 étapes",
      nedenBaslik: "Chiffres réels",
      nedenAlt: "Statistiques actuelles de notre plateforme",
      sssBaslik: "Questions fréquentes",
      cagriBaslik: "Commencez maintenant",
      cagriAlt: "Obtenez un devis gratuit, choisissez la meilleure clinique, venez en toute sécurité.",
      teklifAl: "Obtenir un devis gratuit",
      klinikleriIncele: "Explorer les cliniques",
      istatistik: ["Clinique certifiée", "Patient inscrit", "Hôtel partenaire", "Société de transfert"],
      adimlar: [
        { foto: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop", baslik: "Choisissez votre traitement", aciklama: "Dentaire, greffe de cheveux, yeux, esthétique ou orthopédie — 500+ options disponibles.", detaylar: ["500+ options", "Informations détaillées", "Gammes de prix"] },
        { foto: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop", baslik: "Obtenez un devis gratuit", aciklama: "Téléchargez photo ou radio. Les cliniques envoient des devis en 2-4 heures.", detaylar: ["Entièrement gratuit", "Réponse en 2-4 heures", "De plusieurs cliniques"] },
        { foto: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop", baslik: "Comparez les devis", aciklama: "Prix, contenu et profils côte à côte. Choisissez le meilleur sans pression.", detaylar: ["Comparaison côte à côte", "Avis vérifiés", "Prix transparents"] },
        { foto: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop", baslik: "Choisissez hôtel et transfert", aciklama: "Hôtels partenaires près de la clinique. Planifiez le transfert aéroport.", detaylar: ["Hôtels près de la clinique", "Transfert aéroport", "Avantage forfait"] },
        { foto: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop", baslik: "Payez en sécurité", aciklama: "Votre paiement attend sur notre compte sécurisé jusqu'à la fin du traitement.", detaylar: ["Système de paiement sécurisé", "Sans approbation rien", "Protection actes supplémentaires"] },
        { foto: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop", baslik: "Partagez votre expérience", aciklama: "Rédigez un avis après traitement. Guidez d'autres patients.", detaylar: ["Avis vérifiés", "Système de notation", "Aider les autres patients"] },
      ],
      sorular: [
        { soru: "Medoqa est-il gratuit ?", cevap: "Oui ! Medoqa est entièrement gratuit pour les patients." },
        { soru: "Comment les cliniques sont-elles vérifiées ?", cevap: "Toutes les cliniques soumettent leurs licences, certificats médecins et documents d'assurance." },
        { soru: "Comment fonctionne le système de paiement sécurisé ?", cevap: "Votre paiement est conservé en sécurité jusqu'à la fin du traitement et votre approbation." },
        { soru: "Dois-je payer extra pour des actes supplémentaires ?", cevap: "Non ! La clinique doit obtenir votre accord avant tout acte supplémentaire." },
        { soru: "Quels pays desservez-vous ?", cevap: "Medoqa est une plateforme mondiale avec des cliniques pour patients du monde entier." },
        { soru: "Y a-t-il un support linguistique ?", cevap: "Oui ! Français, turc, anglais, allemand, arabe et russe sont supportés." },
      ],
    },
  };

  const ic = icerik[dil as keyof typeof icerik] || icerik.tr;

  return (
    <main style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ position: "relative", padding: mobil ? "48px 20px" : "80px 32px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&h=600&fit=crop&q=80" alt="Klinik" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,8,32,0.95) 0%, rgba(30,27,75,0.92) 100%)" }} />
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(83,74,183,0.25)", color: "#AFA9EC", fontSize: mobil ? "11px" : "12px", padding: "6px 20px", borderRadius: "20px", border: "1px solid rgba(83,74,183,0.4)", marginBottom: "16px", letterSpacing: "1px", fontWeight: 600 }}>{ic.badge}</div>
          <h1 style={{ color: "#fff", fontSize: mobil ? "26px" : "48px", fontWeight: 800, marginBottom: "12px", letterSpacing: "-1px" }}>{ic.baslik}</h1>
          <p style={{ color: "#8b8fc8", fontSize: mobil ? "14px" : "18px", maxWidth: "600px", margin: "0 auto" }}>{ic.altBaslik}</p>
        </div>
      </section>

      {/* 6 Adım */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: mobil ? "32px 16px" : "80px 32px" }}>
        <h2 style={{ fontSize: mobil ? "22px" : "32px", fontWeight: 800, color: "#0f0d2e", textAlign: "center", marginBottom: mobil ? "28px" : "56px" }}>{ic.adimlarBaslik}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: mobil ? "16px" : "24px" }}>
          {ic.adimlar.map((adim, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: mobil ? "16px" : "20px", overflow: "hidden", border: "1px solid #eeecff", display: "grid", gridTemplateColumns: mobil ? "1fr" : (i % 2 === 0 ? "320px 1fr" : "1fr 320px") }}>
              {mobil ? (
                <>
                  <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                    <img src={adim.foto} alt={adim.baslik} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "12px", left: "12px", background: "#534AB7", color: "#fff", fontSize: "13px", fontWeight: 800, width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{String(i + 1).padStart(2, "0")}</div>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f0d2e", marginBottom: "8px" }}>{adim.baslik}</h3>
                    <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, marginBottom: "14px" }}>{adim.aciklama}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {adim.detaylar.map(d => (<div key={d} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#534AB7", fontWeight: 500 }}><div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#534AB715", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", flexShrink: 0 }}>✓</div>{d}</div>))}
                    </div>
                  </div>
                </>
              ) : i % 2 === 0 ? (
                <>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img src={adim.foto} alt={adim.baslik} style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "220px" }} />
                    <div style={{ position: "absolute", top: "16px", left: "16px", background: "#534AB7", color: "#fff", fontSize: "13px", fontWeight: 800, width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{String(i + 1).padStart(2, "0")}</div>
                  </div>
                  <div style={{ padding: "36px" }}>
                    <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#0f0d2e", marginBottom: "12px" }}>{adim.baslik}</h3>
                    <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.75, marginBottom: "20px" }}>{adim.aciklama}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {adim.detaylar.map(d => (<div key={d} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#534AB7", fontWeight: 500 }}><div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#534AB715", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", flexShrink: 0 }}>✓</div>{d}</div>))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ padding: "36px" }}>
                    <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#0f0d2e", marginBottom: "12px" }}>{adim.baslik}</h3>
                    <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.75, marginBottom: "20px" }}>{adim.aciklama}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {adim.detaylar.map(d => (<div key={d} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#534AB7", fontWeight: 500 }}><div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#534AB715", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", flexShrink: 0 }}>✓</div>{d}</div>))}
                    </div>
                  </div>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img src={adim.foto} alt={adim.baslik} style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "220px" }} />
                    <div style={{ position: "absolute", top: "16px", right: "16px", background: "#534AB7", color: "#fff", fontSize: "13px", fontWeight: 800, width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{String(i + 1).padStart(2, "0")}</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* İstatistikler */}
      <section style={{ background: "#0f0d2e", padding: mobil ? "40px 16px" : "64px 32px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: mobil ? "22px" : "30px", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>{ic.nedenBaslik}</h2>
          <p style={{ color: "#8b8fc8", fontSize: mobil ? "13px" : "15px", marginBottom: "36px" }}>{ic.nedenAlt}</p>
          <div style={{ display: "grid", gridTemplateColumns: mobil ? "1fr 1fr" : "repeat(4, 1fr)", gap: "12px" }}>
            {[
              { sayi: `${istatistik.klinik}+`, etiket: ic.istatistik[0] },
              { sayi: `${istatistik.hasta}+`, etiket: ic.istatistik[1] },
              { sayi: `${istatistik.otel}+`, etiket: ic.istatistik[2] },
              { sayi: `${istatistik.transfer}+`, etiket: ic.istatistik[3] },
            ].map(s => (
              <div key={s.etiket} style={{ background: "rgba(83,74,183,0.15)", border: "1px solid rgba(83,74,183,0.3)", borderRadius: "16px", padding: mobil ? "20px 12px" : "28px 16px" }}>
                <div style={{ fontSize: mobil ? "28px" : "36px", fontWeight: 800, color: "#7F77DD", marginBottom: "6px" }}>{s.sayi}</div>
                <div style={{ fontSize: mobil ? "11px" : "13px", color: "#8b8fc8" }}>{s.etiket}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: mobil ? "40px 16px" : "80px 32px" }}>
        <h2 style={{ fontSize: mobil ? "22px" : "32px", fontWeight: 800, color: "#0f0d2e", textAlign: "center", marginBottom: mobil ? "28px" : "48px" }}>{ic.sssBaslik}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {ic.sorular.map((s, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #eeecff", borderRadius: "14px", overflow: "hidden" }}>
              <div onClick={() => setAcikSoru(acikSoru === i ? null : i)} style={{ padding: mobil ? "16px" : "20px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: mobil ? "14px" : "15px", fontWeight: 700, color: "#0f0d2e" }}>{s.soru}</div>
                <div style={{ color: "#534AB7", fontSize: "20px", fontWeight: 300, flexShrink: 0 }}>{acikSoru === i ? "−" : "+"}</div>
              </div>
              {acikSoru === i && (
                <div style={{ padding: mobil ? "0 16px 16px" : "0 24px 20px" }}>
                  <p style={{ fontSize: mobil ? "13px" : "14px", color: "#64748b", lineHeight: 1.75, margin: 0 }}>{s.cevap}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", padding: mobil ? "48px 20px" : "80px 32px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1600&h=500&fit=crop&q=80" alt="Sağlık" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(83,74,183,0.96) 0%, rgba(15,13,46,0.96) 100%)" }} />
        </div>
        <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: mobil ? "24px" : "36px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>{ic.cagriBaslik}</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: mobil ? "14px" : "16px", marginBottom: "28px", lineHeight: 1.7 }}>{ic.cagriAlt}</p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/teklif" style={{ background: "#fff", color: "#534AB7", padding: mobil ? "12px 24px" : "14px 32px", borderRadius: "12px", fontSize: mobil ? "14px" : "15px", textDecoration: "none", fontWeight: 800 }}>{ic.teklifAl}</a>
            <a href="/klinikler" style={{ background: "transparent", color: "#fff", padding: mobil ? "12px 24px" : "14px 32px", borderRadius: "12px", fontSize: mobil ? "14px" : "15px", textDecoration: "none", fontWeight: 600, border: "1px solid rgba(255,255,255,0.3)" }}>{ic.klinikleriIncele}</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
