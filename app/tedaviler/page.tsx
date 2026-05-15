"use client";
import { useState, useEffect } from "react";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Tedaviler() {
  const { dil } = useDil();
  const [mobil, setMobil] = useState(false);

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  const icerik = {
    tr: {
      baslik: "Tedavi Kategorileri", altBaslik: "İhtiyacınıza uygun tedaviyi seçin ve onaylı kliniklerden ücretsiz teklif alın", teklifAl: "Ücretsiz Teklif Al →",
      kategoriler: [
        { foto: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop", baslik: "Diş Tedavisi", aciklama: "Diş implantından zirkonyum kaplamaya, diş beyazlatmadan ortodontiye kadar kapsamlı diş tedavileri.", tedaviler: ["İmplant","Zirkonyum Kaplama","Lamine Veneer","Diş Beyazlatma","Kanal Tedavisi","Ortodonti","All-on-4 / All-on-6","Gülüş Tasarımı"], renk: "#0891B2" },
        { foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=400&fit=crop", baslik: "Saç Ekimi", aciklama: "FUE, DHI ve Safir yöntemleriyle kalıcı saç ekimi çözümleri.", tedaviler: ["FUE Saç Ekimi","DHI Saç Ekimi","Safir FUE","Sakal Ekimi","Kaş Ekimi","PRP Tedavisi"], renk: "#7C3AED" },
        { foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop", baslik: "Göz Ameliyatı", aciklama: "Lasik, Lasek ve lens tedavileriyle kalıcı görüş çözümleri.", tedaviler: ["Lasik","Lasek","PRK","Smile Pro","Göz İçi Lens","Katarakt Ameliyatı"], renk: "#059669" },
        { foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=400&fit=crop", baslik: "Plastik Cerrahi", aciklama: "Yüz, burun ve vücut estetiğinde uzman klinikler.", tedaviler: ["Burun Estetiği","Yüz Germe","Göz Kapağı Estetiği","Meme Büyütme","Liposuction","Karın Germe","Botoks","Dolgu"], renk: "#DC2626" },
        { foto: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop", baslik: "Genel Sağlık & Check-Up", aciklama: "Kapsamlı check-up ve genel sağlık hizmetleri.", tedaviler: ["Temel Check-Up","Kapsamlı Check-Up","Kardiyoloji","Onkoloji Taraması","Dermatoloji","Gastroloji"], renk: "#D97706" },
        { foto: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=400&fit=crop", baslik: "Ortopedi", aciklama: "Diz, kalça ve omurga tedavilerinde uzman klinikler.", tedaviler: ["Diz Protezi","Kalça Protezi","Omurga Cerrahisi","Spor Yaralanmaları","Artroskopi"], renk: "#4F46E5" },
      ],
    },
    en: {
      baslik: "Treatment Categories", altBaslik: "Choose the right treatment and get free quotes from verified clinics", teklifAl: "Get Free Quote →",
      kategoriler: [
        { foto: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop", baslik: "Dental Treatment", aciklama: "Comprehensive dental treatments from implants to zirconia crowns.", tedaviler: ["Implant","Zirconia Crown","Laminate Veneer","Teeth Whitening","Root Canal","Orthodontics","All-on-4 / All-on-6","Smile Design"], renk: "#0891B2" },
        { foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=400&fit=crop", baslik: "Hair Transplant", aciklama: "Permanent hair transplant solutions with FUE, DHI and Sapphire methods.", tedaviler: ["FUE Hair Transplant","DHI Hair Transplant","Sapphire FUE","Beard Transplant","Eyebrow Transplant","PRP Treatment"], renk: "#7C3AED" },
        { foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop", baslik: "Eye Surgery", aciklama: "Permanent vision solutions with Lasik, Lasek and lens treatments.", tedaviler: ["Lasik","Lasek","PRK","Smile Pro","Intraocular Lens","Cataract Surgery"], renk: "#059669" },
        { foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=400&fit=crop", baslik: "Plastic Surgery", aciklama: "Expert clinics in facial, nose and body aesthetics.", tedaviler: ["Rhinoplasty","Face Lift","Eyelid Surgery","Breast Augmentation","Liposuction","Tummy Tuck","Botox","Filler"], renk: "#DC2626" },
        { foto: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop", baslik: "General Health & Check-Up", aciklama: "Comprehensive check-up and general health services.", tedaviler: ["Basic Check-Up","Comprehensive Check-Up","Cardiology","Oncology Screening","Dermatology","Gastrology"], renk: "#D97706" },
        { foto: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=400&fit=crop", baslik: "Orthopedics", aciklama: "Expert clinics in knee, hip and spine treatments.", tedaviler: ["Knee Prosthesis","Hip Prosthesis","Spine Surgery","Sports Injuries","Arthroscopy"], renk: "#4F46E5" },
      ],
    },
    de: {
      baslik: "Behandlungskategorien", altBaslik: "Wählen Sie die richtige Behandlung und holen Sie kostenlose Angebote ein", teklifAl: "Kostenloses Angebot →",
      kategoriler: [
        { foto: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop", baslik: "Zahnbehandlung", aciklama: "Umfassende Zahnbehandlungen von Implantaten bis Zirkonkronen.", tedaviler: ["Implantat","Zirkonkrone","Laminat Veneer","Zahnaufhellung","Wurzelkanal","Kieferorthopädie","All-on-4 / All-on-6","Lächeldesign"], renk: "#0891B2" },
        { foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=400&fit=crop", baslik: "Haartransplantation", aciklama: "Dauerhafte Haartransplantationslösungen mit FUE, DHI und Saphir.", tedaviler: ["FUE Haartransplantation","DHI Haartransplantation","Saphir FUE","Barttransplantation","Augenbrauentransplantation","PRP Behandlung"], renk: "#7C3AED" },
        { foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop", baslik: "Augenoperation", aciklama: "Dauerhafte Sehlösungen mit Lasik, Lasek und Linsenbehandlungen.", tedaviler: ["Lasik","Lasek","PRK","Smile Pro","Intraokulare Linse","Kataraktoperation"], renk: "#059669" },
        { foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=400&fit=crop", baslik: "Plastische Chirurgie", aciklama: "Expertenkliniken für Gesichts-, Nasen- und Körperästhetik.", tedaviler: ["Rhinoplastik","Gesichtslifting","Lidchirurgie","Brustvergrößerung","Liposuktion","Bauchdeckenstraffung","Botox","Filler"], renk: "#DC2626" },
        { foto: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop", baslik: "Allgemeine Gesundheit & Check-Up", aciklama: "Umfassende Check-up und allgemeine Gesundheitsdienstleistungen.", tedaviler: ["Basis Check-Up","Umfassender Check-Up","Kardiologie","Onkologie-Screening","Dermatologie","Gastrologie"], renk: "#D97706" },
        { foto: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=400&fit=crop", baslik: "Orthopädie", aciklama: "Expertenkliniken für Knie-, Hüft- und Wirbelsäulenbehandlungen.", tedaviler: ["Knieprothese","Hüftprothese","Wirbelsäulenchirurgie","Sportverletzungen","Arthroskopie"], renk: "#4F46E5" },
      ],
    },
    ar: {
      baslik: "فئات العلاج", altBaslik: "اختر العلاج المناسب واحصل على عروض مجانية من العيادات المعتمدة", teklifAl: "احصل على عرض مجاني →",
      kategoriler: [
        { foto: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop", baslik: "علاج الأسنان", aciklama: "علاجات أسنان شاملة من الزرعات إلى التيجان الزركونية.", tedaviler: ["زرعة أسنان","تاج زركوني","لامينات","تبييض الأسنان","علاج الجذور","تقويم الأسنان","All-on-4","تصميم الابتسامة"], renk: "#0891B2" },
        { foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=400&fit=crop", baslik: "زراعة الشعر", aciklama: "حلول زراعة شعر دائمة بتقنيات FUE وDHI والياقوت.", tedaviler: ["FUE","DHI","سافير FUE","زراعة اللحية","زراعة الحواجب","علاج PRP"], renk: "#7C3AED" },
        { foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop", baslik: "جراحة العيون", aciklama: "حلول رؤية دائمة مع ليزك وليزيك وعلاجات العدسات.", tedaviler: ["Lasik","Lasek","PRK","Smile Pro","عدسة داخل العين","جراحة الكتاراكت"], renk: "#059669" },
        { foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=400&fit=crop", baslik: "الجراحة التجميلية", aciklama: "عيادات متخصصة في جماليات الوجه والأنف والجسم.", tedaviler: ["تجميل الأنف","شد الوجه","جراحة الجفن","تكبير الثدي","شفط الدهون","شد البطن","بوتوكس","فيلر"], renk: "#DC2626" },
        { foto: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop", baslik: "الصحة العامة وفحص شامل", aciklama: "فحوصات شاملة وخدمات صحة عامة.", tedaviler: ["فحص أساسي","فحص شامل","قلبية","فحص الأورام","جلدية","أمراض الجهاز الهضمي"], renk: "#D97706" },
        { foto: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=400&fit=crop", baslik: "العظام والمفاصل", aciklama: "عيادات متخصصة في علاجات الركبة والورك والعمود الفقري.", tedaviler: ["بروتيز الركبة","بروتيز الورك","جراحة العمود الفقري","إصابات رياضية","تنظير المفاصل"], renk: "#4F46E5" },
      ],
    },
    ru: {
      baslik: "Категории лечения", altBaslik: "Выберите подходящее лечение и получите бесплатные предложения от клиник", teklifAl: "Получить бесплатное предложение →",
      kategoriler: [
        { foto: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop", baslik: "Стоматология", aciklama: "Комплексное стоматологическое лечение от имплантов до циркониевых коронок.", tedaviler: ["Имплант","Циркониевая коронка","Ламинат","Отбеливание","Лечение каналов","Ортодонтия","All-on-4","Дизайн улыбки"], renk: "#0891B2" },
        { foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=400&fit=crop", baslik: "Пересадка волос", aciklama: "Постоянные решения по пересадке волос методами FUE, DHI и Сапфир.", tedaviler: ["FUE","DHI","Сапфир FUE","Пересадка бороды","Пересадка бровей","PRP терапия"], renk: "#7C3AED" },
        { foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop", baslik: "Операция на глазах", aciklama: "Постоянные решения для зрения с Lasik, Lasek и линзами.", tedaviler: ["Lasik","Lasek","PRK","Smile Pro","Внутриглазная линза","Операция катаракты"], renk: "#059669" },
        { foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=400&fit=crop", baslik: "Пластическая хирургия", aciklama: "Экспертные клиники по эстетике лица, носа и тела.", tedaviler: ["Ринопластика","Подтяжка лица","Блефаропластика","Увеличение груди","Липосакция","Абдоминопластика","Ботокс","Филлер"], renk: "#DC2626" },
        { foto: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop", baslik: "Общее здоровье и чек-ап", aciklama: "Комплексные чек-апы и общие медицинские услуги.", tedaviler: ["Базовый чек-ап","Комплексный чек-ап","Кардиология","Онкологический скрининг","Дерматология","Гастрология"], renk: "#D97706" },
        { foto: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=400&fit=crop", baslik: "Ортопедия", aciklama: "Экспертные клиники по лечению колена, бедра и позвоночника.", tedaviler: ["Протез колена","Протез бедра","Хирургия позвоночника","Спортивные травмы","Артроскопия"], renk: "#4F46E5" },
      ],
    },
    fr: {
      baslik: "Catégories de traitement", altBaslik: "Choisissez le traitement adapté et obtenez des devis gratuits", teklifAl: "Obtenir un devis gratuit →",
      kategoriler: [
        { foto: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop", baslik: "Soins dentaires", aciklama: "Traitements dentaires complets des implants aux couronnes en zircone.", tedaviler: ["Implant","Couronne zircone","Facette","Blanchiment","Dévitalisation","Orthodontie","All-on-4","Design sourire"], renk: "#0891B2" },
        { foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=400&fit=crop", baslik: "Greffe de cheveux", aciklama: "Solutions permanentes de greffe de cheveux FUE, DHI et Saphir.", tedaviler: ["FUE","DHI","Saphir FUE","Greffe barbe","Greffe sourcils","Traitement PRP"], renk: "#7C3AED" },
        { foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop", baslik: "Chirurgie oculaire", aciklama: "Solutions visuelles permanentes avec Lasik, Lasek et lentilles.", tedaviler: ["Lasik","Lasek","PRK","Smile Pro","Lentille intraoculaire","Chirurgie cataracte"], renk: "#059669" },
        { foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=400&fit=crop", baslik: "Chirurgie plastique", aciklama: "Cliniques expertes en esthétique faciale, nasale et corporelle.", tedaviler: ["Rhinoplastie","Lifting visage","Blépharoplastie","Augmentation mammaire","Liposuccion","Abdominoplastie","Botox","Filler"], renk: "#DC2626" },
        { foto: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop", baslik: "Santé générale & Bilan", aciklama: "Bilans de santé complets et services médicaux généraux.", tedaviler: ["Bilan de base","Bilan complet","Cardiologie","Dépistage oncologie","Dermatologie","Gastrologie"], renk: "#D97706" },
        { foto: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=400&fit=crop", baslik: "Orthopédie", aciklama: "Cliniques expertes en traitements du genou, hanche et colonne.", tedaviler: ["Prothèse genou","Prothèse hanche","Chirurgie colonne","Blessures sportives","Arthroscopie"], renk: "#4F46E5" },
      ],
    },
  };

  const ic = icerik[dil as keyof typeof icerik] || icerik.tr;

  return (
    <main style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar />
      <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: mobil ? "40px 20px" : "64px 32px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: mobil ? "26px" : "42px", fontWeight: 800, marginBottom: "12px" }}>{ic.baslik}</h1>
        <p style={{ color: "#8b8fc8", fontSize: mobil ? "14px" : "17px", maxWidth: "600px", margin: "0 auto" }}>{ic.altBaslik}</p>
      </section>
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: mobil ? "32px 16px" : "64px 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: mobil ? "20px" : "32px" }}>
          {ic.kategoriler.map((kat, i) => (
            <div key={kat.baslik} style={{ background: "#fff", borderRadius: mobil ? "16px" : "24px", overflow: "hidden", border: "1px solid #eeecff", display: "grid", gridTemplateColumns: mobil ? "1fr" : (i % 2 === 0 ? "400px 1fr" : "1fr 400px") }}>
              {mobil ? (
                <>
                  <div style={{ height: "200px", overflow: "hidden" }}><img src={kat.foto} alt={kat.baslik} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
                  <div style={{ padding: "20px" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f0d2e", marginBottom: "10px" }}>{kat.baslik}</h2>
                    <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, marginBottom: "16px" }}>{kat.aciklama}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                      {kat.tedaviler.map(t => (<span key={t} style={{ background: "#f8f9ff", border: `1px solid ${kat.renk}30`, color: "#0f0d2e", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 500 }}>{t}</span>))}
                    </div>
                    <a href="/teklif" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: kat.renk, color: "#fff", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", textDecoration: "none", fontWeight: 700 }}>{ic.teklifAl}</a>
                  </div>
                </>
              ) : i % 2 === 0 ? (
                <>
                  <div style={{ height: "280px", overflow: "hidden" }}><img src={kat.foto} alt={kat.baslik} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
                  <div style={{ padding: "40px" }}>
                    <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0f0d2e", marginBottom: "12px" }}>{kat.baslik}</h2>
                    <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.75, marginBottom: "24px" }}>{kat.aciklama}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
                      {kat.tedaviler.map(t => (<span key={t} style={{ background: "#f8f9ff", border: `1px solid ${kat.renk}30`, color: "#0f0d2e", padding: "5px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 500 }}>{t}</span>))}
                    </div>
                    <a href="/teklif" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: kat.renk, color: "#fff", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", textDecoration: "none", fontWeight: 700 }}>{ic.teklifAl}</a>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ padding: "40px" }}>
                    <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0f0d2e", marginBottom: "12px" }}>{kat.baslik}</h2>
                    <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.75, marginBottom: "24px" }}>{kat.aciklama}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
                      {kat.tedaviler.map(t => (<span key={t} style={{ background: "#f8f9ff", border: `1px solid ${kat.renk}30`, color: "#0f0d2e", padding: "5px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 500 }}>{t}</span>))}
                    </div>
                    <a href="/teklif" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: kat.renk, color: "#fff", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", textDecoration: "none", fontWeight: 700 }}>{ic.teklifAl}</a>
                  </div>
                  <div style={{ height: "280px", overflow: "hidden" }}><img src={kat.foto} alt={kat.baslik} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
