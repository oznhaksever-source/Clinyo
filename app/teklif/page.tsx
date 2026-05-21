"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ONAM = {
  tr:{basvuruKimin:"Bu başvuru kimin adına yapılıyor?",kendim:"Kendi adıma",baskaAdina:"Başkası adına (yakın, çocuk, vasi)",baskaAdinaAciklama:"Adına başvurduğunuz kişinin adı soyadı:",baskaAdinaPlaceholder:"Ad Soyad",onay1:"Girdiğim tüm bilgilerin doğru ve güncel olduğunu beyan ediyorum.",onay2:"Kliniklerden gelecek tekliflerin ön bilgi niteliğinde olduğunu ve nihai sözleşmenin klinik ile yapılacağını anlıyorum.",onay3:"Teklif almak, sağlık hizmeti satın almak anlamına gelmediğini ve tedavi kararının tamamen bana ait olduğunu anlıyorum.",onay4:"Girdiğim bilgilerin yalnızca teklif almak amacıyla seçtiğim kliniklerle paylaşılacağını onaylıyorum.",onay5:"Medoqa'nın dijital bir aracılık platformu olduğunu ve tıbbi sorumluluk taşımadığını anlıyorum.",zorunlu:"* Zorunlu",onayUyari:"Lütfen tüm zorunlu kutuları işaretleyiniz."},
  en:{basvuruKimin:"Who is this application for?",kendim:"For myself",baskaAdina:"On behalf of someone else (relative, child, guardian)",baskaAdinaAciklama:"Full name of the person you are applying for:",baskaAdinaPlaceholder:"Full Name",onay1:"I declare that all information I have entered is accurate and current.",onay2:"I understand that quotes from clinics are preliminary and the final contract will be made with the clinic.",onay3:"I understand that requesting a quote does not constitute purchasing healthcare services and the treatment decision is entirely mine.",onay4:"I confirm that my information will only be shared with the clinics I select for quote purposes.",onay5:"I understand that Medoqa is a digital intermediary platform and bears no medical liability.",zorunlu:"* Required",onayUyari:"Please check all required boxes."},
  de:{basvuruKimin:"Für wen wird dieser Antrag gestellt?",kendim:"Für mich selbst",baskaAdina:"Im Namen einer anderen Person (Verwandter, Kind, Vormund)",baskaAdinaAciklama:"Vollständiger Name der Person:",baskaAdinaPlaceholder:"Vor- und Nachname",onay1:"Ich erkläre, dass alle Informationen korrekt und aktuell sind.",onay2:"Ich verstehe, dass Angebote vorläufig sind und der endgültige Vertrag mit der Klinik geschlossen wird.",onay3:"Ich verstehe, dass eine Angebotsanfrage nicht den Kauf von Gesundheitsdienstleistungen bedeutet.",onay4:"Ich bestätige, dass meine Daten nur mit ausgewählten Kliniken geteilt werden.",onay5:"Ich verstehe, dass Medoqa eine digitale Vermittlungsplattform ist und keine medizinische Haftung trägt.",zorunlu:"* Erforderlich",onayUyari:"Bitte markieren Sie alle erforderlichen Felder."},
  ar:{basvuruKimin:"لمن هذا الطلب؟",kendim:"لنفسي",baskaAdina:"نيابة عن شخص آخر (قريب، طفل، وصي)",baskaAdinaAciklama:"الاسم الكامل للشخص:",baskaAdinaPlaceholder:"الاسم الكامل",onay1:"أقر بأن جميع المعلومات التي أدخلتها صحيحة ومحدثة.",onay2:"أفهم أن العروض من العيادات أولية وسيتم إبرام العقد النهائي مع العيادة.",onay3:"أفهم أن طلب عرض لا يعني شراء خدمات صحية وأن قرار العلاج يعود لي.",onay4:"أؤكد أن معلوماتي ستشارك فقط مع العيادات التي اخترتها.",onay5:"أفهم أن ميدوقا منصة وساطة رقمية ولا تتحمل أي مسؤولية طبية.",zorunlu:"* مطلوب",onayUyari:"يرجى تحديد جميع الخانات المطلوبة."},
  ru:{basvuruKimin:"На кого оформляется заявка?",kendim:"На себя",baskaAdina:"От имени другого лица (родственник, ребёнок, опекун)",baskaAdinaAciklama:"Полное имя лица:",baskaAdinaPlaceholder:"Полное имя",onay1:"Подтверждаю достоверность введённых данных.",onay2:"Предложения клиник предварительны, договор заключается с клиникой.",onay3:"Запрос не означает покупку медицинских услуг.",onay4:"Данные передаются только выбранным клиникам.",onay5:"Medoqa — посредническая платформа без медицинской ответственности.",zorunlu:"* Обязательно",onayUyari:"Пожалуйста, отметьте все обязательные поля."},
  fr:{basvuruKimin:"Pour qui est cette demande?",kendim:"Pour moi-même",baskaAdina:"Au nom d'une autre personne (proche, enfant, tuteur)",baskaAdinaAciklama:"Nom complet de la personne:",baskaAdinaPlaceholder:"Nom complet",onay1:"Je déclare que toutes les informations sont exactes et à jour.",onay2:"Les devis sont préliminaires, le contrat final est conclu avec la clinique.",onay3:"Une demande de devis ne constitue pas un achat de services de santé.",onay4:"Mes informations seront partagées uniquement avec les cliniques sélectionnées.",onay5:"Medoqa est une plateforme d'intermédiation sans responsabilité médicale.",zorunlu:"* Obligatoire",onayUyari:"Veuillez cocher toutes les cases obligatoires."},
};

const ANA_KATEGORILER = [
  {id:"dis",emoji:"🦷",tr:"Diş Tedavisi",en:"Dental Treatment",de:"Zahnbehandlung",ar:"علاج الأسنان",ru:"Стоматология",fr:"Soins dentaires",renk:"#0891B2",altlar:[{tr:"İmplant",en:"Implant",de:"Implantat",ar:"زراعة أسنان",ru:"Имплант",fr:"Implant"},{tr:"Zirkonyum Kaplama",en:"Zirconia Crown",de:"Zirkonkrone",ar:"تاج زركون",ru:"Циркониевая коронка",fr:"Couronne zircone"},{tr:"Lamine Veneer",en:"Laminate Veneer",de:"Laminat Veneer",ar:"قشور لمينيت",ru:"Виниры",fr:"Facettes"},{tr:"Diş Beyazlatma",en:"Teeth Whitening",de:"Zahnaufhellung",ar:"تبييض الأسنان",ru:"Отбеливание",fr:"Blanchiment"},{tr:"Kanal Tedavisi",en:"Root Canal",de:"Wurzelkanal",ar:"علاج العصب",ru:"Канал",fr:"Canal"},{tr:"Diş Çekimi",en:"Tooth Extraction",de:"Zahnextraktion",ar:"خلع سن",ru:"Удаление зуба",fr:"Extraction"},{tr:"Ortodonti",en:"Orthodontics",de:"Kieferorthopädie",ar:"تقويم أسنان",ru:"Ортодонтия",fr:"Orthodontie"},{tr:"All-on-4 / All-on-6",en:"All-on-4 / All-on-6",de:"All-on-4 / All-on-6",ar:"All-on-4 / All-on-6",ru:"All-on-4 / All-on-6",fr:"All-on-4 / All-on-6"},{tr:"Gülüş Tasarımı",en:"Smile Design",de:"Lächeldesign",ar:"تصميم الابتسامة",ru:"Дизайн улыбки",fr:"Smile Design"},{tr:"Diş Taşı Temizliği",en:"Teeth Cleaning",de:"Zahnsteinentfernung",ar:"تنظيف الأسنان",ru:"Чистка зубов",fr:"Détartrage"}]},
  {id:"sac",emoji:"💇",tr:"Saç Ekimi",en:"Hair Transplant",de:"Haartransplantation",ar:"زراعة الشعر",ru:"Пересадка волос",fr:"Greffe de cheveux",renk:"#7C3AED",altlar:[{tr:"FUE Saç Ekimi",en:"FUE Hair Transplant",de:"FUE Haartransplantation",ar:"زراعة FUE",ru:"FUE пересадка",fr:"Greffe FUE"},{tr:"DHI Saç Ekimi",en:"DHI Hair Transplant",de:"DHI Haartransplantation",ar:"زراعة DHI",ru:"DHI пересадка",fr:"Greffe DHI"},{tr:"Safir FUE",en:"Sapphire FUE",de:"Saphir FUE",ar:"سافير FUE",ru:"Сапфировый FUE",fr:"FUE Saphir"},{tr:"Sakal Ekimi",en:"Beard Transplant",de:"Barttransplantation",ar:"زراعة اللحية",ru:"Пересадка бороды",fr:"Greffe de barbe"},{tr:"Kaş Ekimi",en:"Eyebrow Transplant",de:"Augenbrauentransplantation",ar:"زراعة الحواجب",ru:"Пересадка бровей",fr:"Greffe de sourcils"},{tr:"PRP Tedavisi",en:"PRP Treatment",de:"PRP Behandlung",ar:"علاج PRP",ru:"PRP терапия",fr:"Traitement PRP"}]},
  {id:"goz",emoji:"👁️",tr:"Göz Ameliyatı",en:"Eye Surgery",de:"Augenoperation",ar:"جراحة العيون",ru:"Операция на глазах",fr:"Chirurgie oculaire",renk:"#059669",altlar:[{tr:"Lasik",en:"Lasik",de:"Lasik",ar:"ليزك",ru:"Ласик",fr:"Lasik"},{tr:"Lasek",en:"Lasek",de:"Lasek",ar:"ليسيك",ru:"Ласек",fr:"Lasek"},{tr:"PRK",en:"PRK",de:"PRK",ar:"PRK",ru:"PRK",fr:"PRK"},{tr:"Smile Pro",en:"Smile Pro",de:"Smile Pro",ar:"سمايل برو",ru:"Smile Pro",fr:"Smile Pro"},{tr:"Göz İçi Lens (ICL)",en:"Intraocular Lens (ICL)",de:"Intraokulare Linse (ICL)",ar:"عدسة داخل العين (ICL)",ru:"ICL линза",fr:"Lentille ICL"},{tr:"Katarakt Ameliyatı",en:"Cataract Surgery",de:"Kataraktoperation",ar:"عملية الماء الأبيض",ru:"Катаракта",fr:"Chirurgie cataracte"}]},
  {id:"plastik",emoji:"💉",tr:"Plastik Cerrahi",en:"Plastic Surgery",de:"Plastische Chirurgie",ar:"الجراحة التجميلية",ru:"Пластическая хирургия",fr:"Chirurgie plastique",renk:"#DC2626",altlar:[{tr:"Burun Estetiği",en:"Rhinoplasty",de:"Rhinoplastik",ar:"تجميل الأنف",ru:"Ринопластика",fr:"Rhinoplastie"},{tr:"Yüz Germe",en:"Face Lift",de:"Gesichtslifting",ar:"شد الوجه",ru:"Подтяжка лица",fr:"Lifting"},{tr:"Göz Kapağı Estetiği",en:"Eyelid Surgery",de:"Lidchirurgie",ar:"جفن العين",ru:"Блефаропластика",fr:"Blépharoplastie"},{tr:"Meme Büyütme",en:"Breast Augmentation",de:"Brustvergrößerung",ar:"تكبير الثدي",ru:"Увеличение груди",fr:"Augmentation mammaire"},{tr:"Meme Küçültme",en:"Breast Reduction",de:"Brustverkleinerung",ar:"تصغير الثدي",ru:"Уменьшение груди",fr:"Réduction mammaire"},{tr:"Karın Germe",en:"Tummy Tuck",de:"Bauchdeckenstraffung",ar:"شد البطن",ru:"Абдоминопластика",fr:"Abdominoplastie"},{tr:"Liposuction",en:"Liposuction",de:"Liposuktion",ar:"شفط الدهون",ru:"Липосакция",fr:"Liposuccion"},{tr:"Botoks",en:"Botox",de:"Botox",ar:"بوتوكس",ru:"Ботокс",fr:"Botox"},{tr:"Dolgu (Filler)",en:"Filler",de:"Filler",ar:"حشو",ru:"Филлер",fr:"Filler"}]},
  {id:"ortopedi",emoji:"🦴",tr:"Ortopedi",en:"Orthopedics",de:"Orthopädie",ar:"العظام",ru:"Ортопедия",fr:"Orthopédie",renk:"#4F46E5",altlar:[{tr:"Diz Protezi",en:"Knee Prosthesis",de:"Knieprothese",ar:"بروتيز الركبة",ru:"Протез колена",fr:"Prothèse genou"},{tr:"Kalça Protezi",en:"Hip Prosthesis",de:"Hüftprothese",ar:"بروتيز الورك",ru:"Протез тазобедренного",fr:"Prothèse hanche"},{tr:"Omurga Cerrahisi",en:"Spine Surgery",de:"Wirbelsäulenchirurgie",ar:"جراحة العمود الفقري",ru:"Хирургия позвоночника",fr:"Chirurgie colonne"},{tr:"Spor Yaralanmaları",en:"Sports Injuries",de:"Sportverletzungen",ar:"إصابات رياضية",ru:"Спортивные травмы",fr:"Traumatologie sportive"},{tr:"Artroskopi",en:"Arthroscopy",de:"Arthroskopie",ar:"تنظير المفاصل",ru:"Артроскопия",fr:"Arthroscopie"}]},
  {id:"checkup",emoji:"🏥",tr:"Check-Up",en:"Check-Up",de:"Check-Up",ar:"فحص شامل",ru:"Чек-ап",fr:"Bilan de santé",renk:"#D97706",altlar:[{tr:"Temel Check-Up",en:"Basic Check-Up",de:"Basis Check-Up",ar:"فحص أساسي",ru:"Базовый чек-ап",fr:"Bilan de base"},{tr:"Kapsamlı Check-Up",en:"Comprehensive Check-Up",de:"Umfassender Check-Up",ar:"فحص شامل",ru:"Комплексный чек-ап",fr:"Bilan complet"},{tr:"Kardiyoloji Check-Up",en:"Cardiology Check-Up",de:"Kardiologie Check-Up",ar:"فحص قلبي",ru:"Кардиологический чек-ап",fr:"Bilan cardiologique"},{tr:"Onkoloji Taraması",en:"Oncology Screening",de:"Onkologie-Screening",ar:"فحص أورام",ru:"Онкоскрининг",fr:"Dépistage oncologique"},{tr:"Dermatoloji",en:"Dermatology",de:"Dermatologie",ar:"جلدية",ru:"Дерматология",fr:"Dermatologie"}]},
  {id:"diger",emoji:"📋",tr:"Diğer",en:"Other",de:"Sonstiges",ar:"أخرى",ru:"Другое",fr:"Autre",renk:"#64748b",altlar:[]},
];

const HASTALIKLAR = {
  tr:["Yok","Diyabet","Hipertansiyon","Kalp Hastalığı","Astım","Tiroid","Böbrek Hastalığı","Karaciğer Hastalığı","Kanser (geçmiş/mevcut)","Kan Pıhtılaşma Bozukluğu","Diğer"],
  en:["None","Diabetes","Hypertension","Heart Disease","Asthma","Thyroid","Kidney Disease","Liver Disease","Cancer (past/current)","Blood Clotting Disorder","Other"],
  de:["Keine","Diabetes","Hypertonie","Herzerkrankung","Asthma","Schilddrüse","Nierenerkrankung","Lebererkrankung","Krebs (vergangen/aktuell)","Blutgerinnungsstörung","Sonstiges"],
  ar:["لا يوجد","داء السكري","ضغط الدم","أمراض القلب","الربو","الغدة الدرقية","أمراض الكلى","أمراض الكبد","السرطان","اضطراب تخثر الدم","أخرى"],
  ru:["Нет","Диабет","Гипертония","Болезнь сердца","Астма","Щитовидная железа","Болезнь почек","Болезнь печени","Рак","Нарушение свёртываемости","Другое"],
  fr:["Aucune","Diabète","Hypertension","Maladie cardiaque","Asthme","Thyroïde","Maladie rénale","Maladie hépatique","Cancer","Trouble de coagulation","Autre"],
};

function TeklifIcerik() {
  const searchParams = useSearchParams();
  const klinikId = searchParams.get("klinik");

  const [adim, setAdim] = useState(1);
  const [secilenKategori, setSecilenKategori] = useState<string>("");
  const [secilenAlt, setSecilenAlt] = useState<string>("");
  const [gonderildi, setGonderildi] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");
  const [mobil, setMobil] = useState(false);
  const [secilenKlinik, setSecilenKlinik] = useState<any>(null);

  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [ulke, setUlke] = useState("");
  const [fotograflar, setFotograflar] = useState<string[]>([]);
  const [fotografYukleniyor, setFotografYukleniyor] = useState(false);
  const [sikayet, setSikayet] = useState("");
  const [kronikHastalik, setKronikHastalik] = useState("");
  const [kronikDiger, setKronikDiger] = useState("");
  const [kullanilanIlaclar, setKullanilanIlaclar] = useState("");
  const [alerji, setAlerji] = useState("");
  const [ameliyatGecmisi, setAmeliyatGecmisi] = useState("");
  const [basvuranTur, setBasvuranTur] = useState<"kendim"|"baska">("kendim");
  const [basvurulanadAd, setBasvurulanadAd] = useState("");
  const [onaylar, setOnaylar] = useState<Record<string,boolean>>({});
  const [onayUyari, setOnayUyari] = useState(false);

  const { t, dil } = useDil();
  const om = ONAM[dil as keyof typeof ONAM] || ONAM.en;
  const supabase = createClient();

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  useEffect(() => {
    async function klinikYukle() {
      if (!klinikId) return;
      const { data } = await supabase.from("profiles").select("id, ad, soyad, konum_adres, kapak_fotograf").eq("id", klinikId).single();
      if (data) setSecilenKlinik(data);
    }
    klinikYukle();
  }, [klinikId]);

  const ulkeler = {
    tr:["Almanya","İngiltere","Hollanda","Avusturya","Fransa","İsviçre","Belçika","Türkiye","Diğer"],
    en:["Germany","United Kingdom","Netherlands","Austria","France","Switzerland","Belgium","Turkey","Other"],
    de:["Deutschland","Vereinigtes Königreich","Niederlande","Österreich","Frankreich","Schweiz","Belgien","Türkei","Sonstiges"],
    ar:["ألمانيا","المملكة المتحدة","هولندا","النمسا","فرنسا","سويسرا","بلجيكا","تركيا","أخرى"],
    ru:["Германия","Великобритания","Нидерланды","Австрия","Франция","Швейцария","Бельгия","Турция","Другое"],
    fr:["Allemagne","Royaume-Uni","Pays-Bas","Autriche","France","Suisse","Belgique","Turquie","Autre"],
  };

  const onayListesi = [
    {id:"onay1",metin:om.onay1,zorunlu:true},
    {id:"onay2",metin:om.onay2,zorunlu:true},
    {id:"onay3",metin:om.onay3,zorunlu:true},
    {id:"onay4",metin:om.onay4,zorunlu:true},
    {id:"onay5",metin:om.onay5,zorunlu:true},
  ];

  const tumZorunluIsaretli = onayListesi.filter(o=>o.zorunlu).every(o=>onaylar[o.id]);
  const baskaAdinaGecerli = basvuranTur==="kendim"||(basvuranTur==="baska"&&basvurulanadAd.trim().length>2);
  const kategoriAd = (kat: typeof ANA_KATEGORILER[0]) => (kat as any)[dil] || kat.en;
  const altAd = (alt: any) => alt[dil] || alt.en;
  const seciliKategoriObj = ANA_KATEGORILER.find(k=>k.id===secilenKategori);
  const tedaviTuru = secilenAlt || (seciliKategoriObj ? kategoriAd(seciliKategoriObj) : "");

  const metin = {
    tr:{adim1Baslik:"Hangi tedaviyi arıyorsunuz?",adim1Alt:"Ana kategorinizi seçin, sonra isterseniz alt tedaviyi belirtin",altSecimBaslik:"Alt tedavi seçin (opsiyonel)",atla:"Bu adımı geç →",devam:"Devam Et →",geri:"← Geri",adim2Baslik:"Kişisel & Tıbbi Bilgiler",adim2Alt:"Klinikler size doğru teklif verebilmek için bu bilgilere ihtiyaç duyar",uyariBaslik:"⚠️ Önemli Tıbbi Uyarı",uyariMetin:"Kronik hastalıklarınızı ve kullandığınız ilaçları eksiksiz belirtmeniz tedavinizin güvenliği açısından hayati önem taşır.",sikayetLabel:"Şikayet / Tedavi Hikayesi *",sikayetPlaceholder:"Mevcut durumunuzu ve tedavi beklentilerinizi detaylı anlatın. (En az 30 karakter)",kronikLabel:"Kronik Hastalık",kronikDigerLabel:"Diğer hastalığınızı belirtin:",ilacLabel:"Sürekli Kullanılan İlaçlar",ilacPlaceholder:"Aspirin, Metformin... (yoksa boş bırakın)",alerjiLabel:"İlaç / Madde Alerjisi",alerjiPlaceholder:"Penisilin, lateks... (yoksa boş bırakın)",ameliyatLabel:"Geçmiş Ameliyatlar",ameliyatPlaceholder:"Daha önce geçirdiğiniz ameliyatlar (yoksa boş bırakın)",xrayLabel:"X-Ray / Fotoğraf (opsiyonel)",ad:"Ad *",soyad:"Soyad *",eposta:"E-posta *",telefon:"Telefon",ulke:"Ülke *",ulkeSec:"Seçin...",adim3Baslik:"Gözden Geçir ve Onayla",adim3Alt:"Bilgilerinizi kontrol edin ve formu gönderin",tedavi:"Tedavi",sikayet:"Şikayet",gonder:"Teklif Talebini Gönder",gonderiliyor:"Gönderiliyor...",basarili:"Teklif Talebiniz Alındı! 🎉",basariliAciklama:"Klinik inceleyip en kısa sürede size özel teklif gönderecek.",anaSayfayaDon:"Ana Sayfaya Dön",sikayetKisa:"Lütfen şikayetinizi en az 30 karakter ile açıklayın.",klinikBanner:"Bu klinikten teklif alıyorsunuz"},
    en:{adim1Baslik:"What treatment are you looking for?",adim1Alt:"Select your main category, then optionally specify the sub-treatment",altSecimBaslik:"Select sub-treatment (optional)",atla:"Skip this step →",devam:"Continue →",geri:"← Back",adim2Baslik:"Personal & Medical Information",adim2Alt:"Clinics need this information to give you the right quote",uyariBaslik:"⚠️ Important Medical Notice",uyariMetin:"Providing complete information about your chronic conditions and medications is vital for your treatment safety.",sikayetLabel:"Complaint / Treatment History *",sikayetPlaceholder:"Describe your current condition and treatment expectations in detail. (At least 30 characters)",kronikLabel:"Chronic Disease",kronikDigerLabel:"Specify your other condition:",ilacLabel:"Regular Medications",ilacPlaceholder:"Aspirin, Metformin... (leave blank if none)",alerjiLabel:"Drug / Material Allergy",alerjiPlaceholder:"Penicillin, latex... (leave blank if none)",ameliyatLabel:"Previous Surgeries",ameliyatPlaceholder:"Previous surgeries (leave blank if none)",xrayLabel:"X-Ray / Photo (optional)",ad:"First Name *",soyad:"Last Name *",eposta:"Email *",telefon:"Phone",ulke:"Country *",ulkeSec:"Select...",adim3Baslik:"Review and Confirm",adim3Alt:"Check your information and submit the form",tedavi:"Treatment",sikayet:"Complaint",gonder:"Send Quote Request",gonderiliyor:"Sending...",basarili:"Your Quote Request Has Been Received! 🎉",basariliAciklama:"The clinic will review and send you a personalized quote as soon as possible.",anaSayfayaDon:"Back to Home",sikayetKisa:"Please describe your complaint with at least 30 characters.",klinikBanner:"You are requesting a quote from this clinic"},
    de:{adim1Baslik:"Welche Behandlung suchen Sie?",adim1Alt:"Wählen Sie Ihre Hauptkategorie und optional eine Unterbehandlung",altSecimBaslik:"Unterbehandlung auswählen (optional)",atla:"Diesen Schritt überspringen →",devam:"Weiter →",geri:"← Zurück",adim2Baslik:"Persönliche & Medizinische Informationen",adim2Alt:"Kliniken benötigen diese Informationen für ein korrektes Angebot",uyariBaslik:"⚠️ Wichtiger Medizinischer Hinweis",uyariMetin:"Die vollständige Angabe Ihrer chronischen Erkrankungen und Medikamente ist für Ihre Behandlungssicherheit wichtig.",sikayetLabel:"Beschwerde / Krankengeschichte *",sikayetPlaceholder:"Beschreiben Sie Ihren Zustand und Ihre Erwartungen. (Mindestens 30 Zeichen)",kronikLabel:"Chronische Erkrankung",kronikDigerLabel:"Geben Sie Ihre andere Erkrankung an:",ilacLabel:"Regelmäßige Medikamente",ilacPlaceholder:"Aspirin, Metformin... (leer lassen wenn keine)",alerjiLabel:"Medikamenten- / Materialallergien",alerjiPlaceholder:"Penicillin, Latex... (leer lassen wenn keine)",ameliyatLabel:"Frühere Operationen",ameliyatPlaceholder:"Frühere Operationen (leer lassen wenn keine)",xrayLabel:"Röntgen / Foto (optional)",ad:"Vorname *",soyad:"Nachname *",eposta:"E-Mail *",telefon:"Telefon",ulke:"Land *",ulkeSec:"Auswählen...",adim3Baslik:"Überprüfen und Bestätigen",adim3Alt:"Überprüfen Sie Ihre Informationen und senden Sie das Formular",tedavi:"Behandlung",sikayet:"Beschwerde",gonder:"Angebotsanfrage senden",gonderiliyor:"Wird gesendet...",basarili:"Ihre Angebotsanfrage wurde erhalten! 🎉",basariliAciklama:"Die Klinik wird prüfen und Ihnen ein personalisiertes Angebot senden.",anaSayfayaDon:"Zurück zur Startseite",sikayetKisa:"Bitte beschreiben Sie Ihre Beschwerde mit mindestens 30 Zeichen.",klinikBanner:"Sie fordern ein Angebot von dieser Klinik an"},
    ar:{adim1Baslik:"ما العلاج الذي تبحث عنه؟",adim1Alt:"اختر الفئة الرئيسية ثم حدد العلاج الفرعي اختيارياً",altSecimBaslik:"اختر العلاج الفرعي (اختياري)",atla:"تخطي هذه الخطوة →",devam:"متابعة →",geri:"→ رجوع",adim2Baslik:"المعلومات الشخصية والطبية",adim2Alt:"تحتاج العيادات هذه المعلومات لتقديم العرض المناسب",uyariBaslik:"⚠️ تنبيه طبي مهم",uyariMetin:"ذكر أمراضك المزمنة وأدويتك بشكل كامل أمر حيوي لسلامة علاجك.",sikayetLabel:"الشكوى / التاريخ الطبي *",sikayetPlaceholder:"صف حالتك الحالية وتوقعاتك من العلاج. (30 حرفاً على الأقل)",kronikLabel:"الأمراض المزمنة",kronikDigerLabel:"حدد مرضك الآخر:",ilacLabel:"الأدوية المنتظمة",ilacPlaceholder:"أسبرين، ميتفورمين... (اتركه فارغاً إن لم يكن)",alerjiLabel:"حساسية الأدوية / المواد",alerjiPlaceholder:"بنسلين، لاتكس... (اتركه فارغاً إن لم يكن)",ameliyatLabel:"العمليات السابقة",ameliyatPlaceholder:"العمليات السابقة (اتركه فارغاً إن لم يكن)",xrayLabel:"أشعة / صور (اختياري)",ad:"الاسم الأول *",soyad:"اسم العائلة *",eposta:"البريد الإلكتروني *",telefon:"الهاتف",ulke:"الدولة *",ulkeSec:"اختر...",adim3Baslik:"مراجعة وتأكيد",adim3Alt:"تحقق من معلوماتك وأرسل النموذج",tedavi:"العلاج",sikayet:"الشكوى",gonder:"إرسال طلب العرض",gonderiliyor:"جارٍ الإرسال...",basarili:"تم استلام طلب عرضك! 🎉",basariliAciklama:"ستقوم العيادة بالمراجعة وإرسال عرض مخصص لك.",anaSayfayaDon:"العودة للرئيسية",sikayetKisa:"يرجى وصف شكواك بـ 30 حرفاً على الأقل.",klinikBanner:"أنت تطلب عرضاً من هذه العيادة"},
    ru:{adim1Baslik:"Какое лечение вы ищете?",adim1Alt:"Выберите основную категорию и при желании уточните подкатегорию",altSecimBaslik:"Выберите подкатегорию (необязательно)",atla:"Пропустить этот шаг →",devam:"Продолжить →",geri:"← Назад",adim2Baslik:"Личная и медицинская информация",adim2Alt:"Клиникам нужна эта информация для правильного предложения",uyariBaslik:"⚠️ Важное медицинское предупреждение",uyariMetin:"Полное указание хронических заболеваний и медикаментов важно для безопасности лечения.",sikayetLabel:"Жалоба / История болезни *",sikayetPlaceholder:"Опишите ваше состояние и ожидания от лечения. (Минимум 30 символов)",kronikLabel:"Хроническое заболевание",kronikDigerLabel:"Укажите другое заболевание:",ilacLabel:"Постоянные медикаменты",ilacPlaceholder:"Аспирин, Метформин... (оставьте пустым если нет)",alerjiLabel:"Аллергия на медикаменты / вещества",alerjiPlaceholder:"Пенициллин, латекс... (оставьте пустым если нет)",ameliyatLabel:"Предыдущие операции",ameliyatPlaceholder:"Предыдущие операции (оставьте пустым если нет)",xrayLabel:"Рентген / Фото (необязательно)",ad:"Имя *",soyad:"Фамилия *",eposta:"Email *",telefon:"Телефон",ulke:"Страна *",ulkeSec:"Выберите...",adim3Baslik:"Проверить и подтвердить",adim3Alt:"Проверьте информацию и отправьте форму",tedavi:"Лечение",sikayet:"Жалоба",gonder:"Отправить запрос",gonderiliyor:"Отправка...",basarili:"Ваш запрос получен! 🎉",basariliAciklama:"Клиника рассмотрит и пришлёт персональное предложение.",anaSayfayaDon:"На главную",sikayetKisa:"Пожалуйста, опишите жалобу минимум 30 символами.",klinikBanner:"Вы запрашиваете предложение от этой клиники"},
    fr:{adim1Baslik:"Quel traitement cherchez-vous?",adim1Alt:"Sélectionnez votre catégorie principale puis précisez le sous-traitement",altSecimBaslik:"Sélectionner le sous-traitement (optionnel)",atla:"Passer cette étape →",devam:"Continuer →",geri:"← Retour",adim2Baslik:"Informations personnelles et médicales",adim2Alt:"Les cliniques ont besoin de ces informations pour vous faire un devis",uyariBaslik:"⚠️ Avis médical important",uyariMetin:"Fournir des informations complètes sur vos maladies chroniques et médicaments est vital.",sikayetLabel:"Plainte / Antécédents médicaux *",sikayetPlaceholder:"Décrivez votre état actuel et vos attentes. (Au moins 30 caractères)",kronikLabel:"Maladie chronique",kronikDigerLabel:"Précisez votre autre maladie:",ilacLabel:"Médicaments réguliers",ilacPlaceholder:"Aspirine, Metformine... (laisser vide si aucun)",alerjiLabel:"Allergie médicament / matière",alerjiPlaceholder:"Pénicilline, latex... (laisser vide si aucune)",ameliyatLabel:"Opérations précédentes",ameliyatPlaceholder:"Opérations précédentes (laisser vide si aucune)",xrayLabel:"Radiographie / Photo (optionnel)",ad:"Prénom *",soyad:"Nom *",eposta:"Email *",telefon:"Téléphone",ulke:"Pays *",ulkeSec:"Sélectionner...",adim3Baslik:"Vérifier et confirmer",adim3Alt:"Vérifiez vos informations et soumettez le formulaire",tedavi:"Traitement",sikayet:"Plainte",gonder:"Envoyer la demande",gonderiliyor:"Envoi...",basarili:"Votre demande a été reçue! 🎉",basariliAciklama:"La clinique examinera et vous enverra un devis personnalisé.",anaSayfayaDon:"Retour à l'accueil",sikayetKisa:"Veuillez décrire votre plainte avec au moins 30 caractères.",klinikBanner:"Vous demandez un devis à cette clinique"},
  };

  const m = metin[dil as keyof typeof metin] || metin.en;

  async function fotografYukle(files: FileList) {
    setFotografYukleniyor(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const dosyaAdi = `talepler/${Date.now()}_${file.name}`;
      const {error} = await supabase.storage.from("medoqa-images").upload(dosyaAdi,file);
      if (!error) {
        const {data:url} = supabase.storage.from("medoqa-images").getPublicUrl(dosyaAdi);
        urls.push(url.publicUrl);
      }
    }
    setFotograflar(prev=>[...prev,...urls]);
    setFotografYukleniyor(false);
  }

  function adim2Gecerli() {
    if (!ad||!soyad||!email||!ulke) return false;
    if (sikayet.trim().length < 30) return false;
    return true;
  }

  async function gonder() {
    if (!tumZorunluIsaretli||!baskaAdinaGecerli) { setOnayUyari(true); return; }
    setYukleniyor(true); setHata("");
    const {data:{user}} = await supabase.auth.getUser();

    const tibbiBilgi = {
      sikayet,
      kronik_hastalik: kronikHastalik==="Diğer"||kronikHastalik==="Other"||kronikHastalik==="Sonstiges"||kronikHastalik==="أخرى"||kronikHastalik==="Другое"||kronikHastalik==="Autre" ? kronikDiger : kronikHastalik,
      kullanilan_ilaclar: kullanilanIlaclar,
      alerji,
      ameliyat_gecmisi: ameliyatGecmisi,
    };

    const {data:talepData,error} = await supabase.from("talepler").insert({
      hasta_id: user?.id||null,
      klinik_id: klinikId||null,
      tedavi_turu: tedaviTuru,
      aciklama: sikayet,
      tibbi_bilgi: tibbiBilgi,
      durum: "beklemede",
      hasta_ad: ad,
      hasta_soyad: soyad,
      hasta_email: email,
      hasta_telefon: telefon,
      hasta_ulke: ulke,
      fotograflar: fotograflar.length>0?fotograflar:null,
    }).select().single();

    if (error) { setHata("Hata: "+error.message); setYukleniyor(false); return; }

    if (user&&talepData) {
      await supabase.from("hasta_onamlar").insert({
        kullanici_id: user.id,
        onam_turu: "teklif",
        talep_id: talepData.id,
        onam_versiyonu: "2.0",
        zorunlu_onaylar: {...onaylar,basvuran_tur:basvuranTur,basvurulan_ad:basvuranTur==="baska"?basvurulanadAd:null},
        saglik_verisi_onami: !!onaylar["onay4"],
        ticari_iletisim_onami: false,
      });
    }

    await fetch("/api/bildirim-gonder",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({tip:"yeni_talep",tedavi:tedaviTuru,hasta_ad:ad,hasta_soyad:soyad,hasta_email:email,hasta_ulke:ulke,aciklama:sikayet}),
    });

    setGonderildi(true);
  }

  const inputStyle = {width:"100%",border:"1px solid #e5e7eb",borderRadius:"10px",padding:"12px 14px",fontSize:"14px",boxSizing:"border-box" as const,outline:"none",fontFamily:"inherit"};
  const labelStyle = {fontSize:"13px",color:"#555",display:"block" as const,marginBottom:"6px",fontWeight:500 as const};

  if (gonderildi) return (
    <main style={{minHeight:"100vh",background:"#0d2144",fontFamily:"'Segoe UI',sans-serif",display:"flex",flexDirection:"column"}}>
      <Navbar/>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"}}>
        <div style={{background:"#fff",borderRadius:"20px",padding:mobil?"32px 24px":"48px",textAlign:"center",maxWidth:"440px",width:"100%"}}>
          <div style={{width:"72px",height:"72px",background:"#e6f4ea",borderRadius:"50%",margin:"0 auto 20px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"32px"}}>✓</div>
          <h2 style={{fontSize:"22px",fontWeight:700,color:"#1a1a1a",marginBottom:"12px"}}>{m.basarili}</h2>
          <p style={{fontSize:"14px",color:"#888",marginBottom:"24px",lineHeight:1.6}}>{m.basariliAciklama}</p>
          <a href="/" style={{display:"block",background:"#534AB7",color:"#fff",padding:"13px",borderRadius:"10px",fontSize:"14px",textDecoration:"none",fontWeight:600}}>{m.anaSayfayaDon}</a>
        </div>
      </div>
    </main>
  );

  return (
    <main style={{minHeight:"100vh",background:"#0d2144",fontFamily:"'Segoe UI',sans-serif"}}>
      <Navbar/>
      <div style={{maxWidth:"680px",margin:"0 auto",padding:mobil?"24px 16px":"32px"}}>

        {secilenKlinik && (
          <div style={{background:"rgba(83,74,183,0.3)",border:"1px solid rgba(83,74,183,0.5)",borderRadius:"12px",padding:"12px 16px",marginBottom:"20px",display:"flex",alignItems:"center",gap:"12px"}}>
            {secilenKlinik.kapak_fotograf
              ? <img src={secilenKlinik.kapak_fotograf} alt={secilenKlinik.ad} style={{width:"40px",height:"40px",borderRadius:"50%",objectFit:"cover",flexShrink:0}}/>
              : <div style={{width:"40px",height:"40px",borderRadius:"50%",background:"#534AB7",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,flexShrink:0}}>{secilenKlinik.ad?.[0]}</div>
            }
            <div>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,0.7)",marginBottom:"2px"}}>{m.klinikBanner}</div>
              <div style={{fontSize:"14px",fontWeight:700,color:"#fff"}}>{secilenKlinik.ad} {secilenKlinik.soyad}</div>
              {secilenKlinik.konum_adres && <div style={{fontSize:"11px",color:"rgba(255,255,255,0.6)"}}>📍 {secilenKlinik.konum_adres}</div>}
            </div>
          </div>
        )}

        <div style={{textAlign:"center",marginBottom:"28px"}}>
          <h1 style={{color:"#fff",fontSize:mobil?"22px":"28px",fontWeight:700,marginBottom:"8px"}}>
            {dil==="tr"?"Ücretsiz Teklif Talebi":dil==="ar"?"طلب عرض مجاني":dil==="ru"?"Бесплатный запрос":dil==="fr"?"Demande de devis gratuit":dil==="de"?"Kostenlose Angebotsanfrage":"Free Quote Request"}
          </h1>
          <p style={{color:"#7a90b0",fontSize:"14px"}}>
            {dil==="tr"?"Onaylı kliniklerden kişiselleştirilmiş teklif alın":dil==="ar"?"احصل على عروض مخصصة من العيادات المعتمدة":dil==="ru"?"Получите персональные предложения от проверенных клиник":dil==="fr"?"Obtenez des devis personnalisés de cliniques vérifiées":dil==="de"?"Erhalten Sie personalisierte Angebote von verifizierten Kliniken":"Get personalized quotes from verified clinics"}
          </p>
        </div>

        <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"28px"}}>
          {[1,2,3].map(s=>(
            <div key={s} style={{display:"flex",alignItems:"center"}}>
              <div style={{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:600,background:adim>=s?"#534AB7":"#1a2a3a",color:adim>=s?"#fff":"#5a7a9a",transition:"all .3s"}}>
                {adim>s?"✓":s}
              </div>
              {s<3&&<div style={{width:mobil?"50px":"80px",height:"2px",background:adim>s?"#534AB7":"#1a2a3a",transition:"all .3s"}}/>}
            </div>
          ))}
        </div>

        {hata&&<div style={{background:"#fff0f0",border:"1px solid #fcc",borderRadius:"8px",padding:"10px 16px",marginBottom:"16px",fontSize:"13px",color:"#c00"}}>{hata}</div>}

        <div style={{background:"#fff",borderRadius:"20px",padding:mobil?"20px 16px":"32px"}}>

          {adim===1 && (
            <div>
              <h2 style={{fontSize:"18px",fontWeight:700,color:"#1a1a1a",marginBottom:"6px"}}>{m.adim1Baslik}</h2>
              <p style={{fontSize:"13px",color:"#888",marginBottom:"20px"}}>{m.adim1Alt}</p>
              {!secilenKategori ? (
                <div style={{display:"grid",gridTemplateColumns:mobil?"1fr 1fr":"repeat(3,1fr)",gap:"12px",marginBottom:"20px"}}>
                  {ANA_KATEGORILER.map(kat=>(
                    <div key={kat.id} onClick={()=>setSecilenKategori(kat.id)} style={{border:`2px solid ${kat.renk}30`,borderRadius:"14px",padding:"20px 12px",cursor:"pointer",textAlign:"center",background:`${kat.renk}08`,transition:"all .2s"}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=kat.renk;(e.currentTarget as HTMLElement).style.background=`${kat.renk}15`;}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${kat.renk}30`;(e.currentTarget as HTMLElement).style.background=`${kat.renk}08`;}}>
                      <div style={{fontSize:"32px",marginBottom:"8px"}}>{kat.emoji}</div>
                      <div style={{fontSize:"13px",fontWeight:700,color:"#1a1a1a"}}>{kategoriAd(kat)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px",padding:"12px 16px",background:`${seciliKategoriObj?.renk}10`,borderRadius:"12px",border:`1px solid ${seciliKategoriObj?.renk}30`}}>
                    <span style={{fontSize:"24px"}}>{seciliKategoriObj?.emoji}</span>
                    <div style={{flex:1}}><div style={{fontSize:"14px",fontWeight:700,color:"#1a1a1a"}}>{seciliKategoriObj && kategoriAd(seciliKategoriObj)}</div></div>
                    <button onClick={()=>{setSecilenKategori("");setSecilenAlt("");}} style={{background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:"18px"}}>✕</button>
                  </div>
                  {seciliKategoriObj && seciliKategoriObj.altlar.length>0 && (
                    <div>
                      <div style={{fontSize:"13px",fontWeight:600,color:"#555",marginBottom:"10px"}}>{m.altSecimBaslik}</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"16px"}}>
                        {seciliKategoriObj.altlar.map(alt=>{
                          const ad2 = altAd(alt);
                          return (
                            <div key={ad2} onClick={()=>setSecilenAlt(secilenAlt===ad2?"":ad2)} style={{padding:"7px 14px",borderRadius:"20px",cursor:"pointer",fontSize:"13px",fontWeight:500,border:`1px solid ${secilenAlt===ad2?(seciliKategoriObj.renk):"#e5e7eb"}`,background:secilenAlt===ad2?`${seciliKategoriObj.renk}15`:"#f9fafb",color:secilenAlt===ad2?seciliKategoriObj.renk:"#444",transition:"all .15s"}}>
                              {secilenAlt===ad2?"✓ ":""}{ad2}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div style={{display:"flex",gap:"10px"}}>
                    {seciliKategoriObj&&seciliKategoriObj.altlar.length>0&&(
                      <button onClick={()=>{setSecilenAlt("");setAdim(2);}} style={{flex:1,background:"#f9fafb",color:"#555",border:"1px solid #e5e7eb",padding:"12px",borderRadius:"10px",fontSize:"13px",cursor:"pointer"}}>{m.atla}</button>
                    )}
                    <button onClick={()=>setAdim(2)} style={{flex:2,background:seciliKategoriObj?.renk||"#534AB7",color:"#fff",border:"none",padding:"12px",borderRadius:"10px",fontSize:"14px",cursor:"pointer",fontWeight:600}}>{m.devam}</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {adim===2 && (
            <div>
              <h2 style={{fontSize:"18px",fontWeight:700,color:"#1a1a1a",marginBottom:"4px"}}>{m.adim2Baslik}</h2>
              <p style={{fontSize:"13px",color:"#888",marginBottom:"16px"}}>{m.adim2Alt}</p>
              <div style={{background:"#fffbeb",border:"1px solid #f59e0b",borderRadius:"12px",padding:"14px 16px",marginBottom:"20px"}}>
                <div style={{fontSize:"13px",fontWeight:700,color:"#92400e",marginBottom:"6px"}}>{m.uyariBaslik}</div>
                <div style={{fontSize:"12px",color:"#78350f",lineHeight:1.6}}>{m.uyariMetin}</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:mobil?"1fr":"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                <div><label style={labelStyle}>{m.ad}</label><input type="text" value={ad} onChange={e=>setAd(e.target.value)} style={inputStyle}/></div>
                <div><label style={labelStyle}>{m.soyad}</label><input type="text" value={soyad} onChange={e=>setSoyad(e.target.value)} style={inputStyle}/></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:mobil?"1fr":"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                <div><label style={labelStyle}>{m.eposta}</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle}/></div>
                <div><label style={labelStyle}>{m.telefon}</label><input type="tel" value={telefon} onChange={e=>setTelefon(e.target.value)} style={inputStyle}/></div>
              </div>
              <div style={{marginBottom:"16px"}}>
                <label style={labelStyle}>{m.ulke}</label>
                <select value={ulke} onChange={e=>setUlke(e.target.value)} style={{...inputStyle,background:"#fff"}}>
                  <option value="">{m.ulkeSec}</option>
                  {(ulkeler[dil as keyof typeof ulkeler]||ulkeler.en).map(u=><option key={u}>{u}</option>)}
                </select>
              </div>
              <div style={{marginBottom:"12px"}}>
                <label style={labelStyle}>{m.sikayetLabel}</label>
                <textarea rows={4} placeholder={m.sikayetPlaceholder} value={sikayet} onChange={e=>setSikayet(e.target.value)} style={{...inputStyle,resize:"vertical",borderColor:sikayet.length>0&&sikayet.length<30?"#f59e0b":"#e5e7eb"}}/>
                {sikayet.length>0&&sikayet.length<30&&(<div style={{fontSize:"11px",color:"#f59e0b",marginTop:"4px"}}>⚠️ {m.sikayetKisa} ({sikayet.length}/30)</div>)}
              </div>
              <div style={{marginBottom:"12px"}}>
                <label style={labelStyle}>{m.kronikLabel}</label>
                <select value={kronikHastalik} onChange={e=>setKronikHastalik(e.target.value)} style={{...inputStyle,background:"#fff"}}>
                  <option value="">{m.ulkeSec}</option>
                  {(HASTALIKLAR[dil as keyof typeof HASTALIKLAR]||HASTALIKLAR.en).map(h=><option key={h}>{h}</option>)}
                </select>
                {(kronikHastalik==="Diğer"||kronikHastalik==="Other"||kronikHastalik==="Sonstiges"||kronikHastalik==="أخرى"||kronikHastalik==="Другое"||kronikHastalik==="Autre")&&(
                  <input type="text" placeholder={m.kronikDigerLabel} value={kronikDiger} onChange={e=>setKronikDiger(e.target.value)} style={{...inputStyle,marginTop:"8px"}}/>
                )}
              </div>
              <div style={{display:"grid",gridTemplateColumns:mobil?"1fr":"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                <div><label style={labelStyle}>{m.ilacLabel}</label><input type="text" placeholder={m.ilacPlaceholder} value={kullanilanIlaclar} onChange={e=>setKullanilanIlaclar(e.target.value)} style={inputStyle}/></div>
                <div><label style={labelStyle}>{m.alerjiLabel}</label><input type="text" placeholder={m.alerjiPlaceholder} value={alerji} onChange={e=>setAlerji(e.target.value)} style={inputStyle}/></div>
              </div>
              <div style={{marginBottom:"12px"}}>
                <label style={labelStyle}>{m.ameliyatLabel}</label>
                <input type="text" placeholder={m.ameliyatPlaceholder} value={ameliyatGecmisi} onChange={e=>setAmeliyatGecmisi(e.target.value)} style={inputStyle}/>
              </div>
              <div style={{marginBottom:"20px"}}>
                <label style={labelStyle}>{m.xrayLabel}</label>
                <input type="file" accept="image/*,.pdf" multiple onChange={e=>{if(e.target.files)fotografYukle(e.target.files);}} style={{...inputStyle,padding:"8px 12px"}}/>
                {fotografYukleniyor&&<div style={{fontSize:"12px",color:"#888",marginTop:"4px"}}>{dil==="tr"?"Yükleniyor...":"Uploading..."}</div>}
                {fotograflar.length>0&&(
                  <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"8px"}}>
                    {fotograflar.map((url,i)=>(<img key={i} src={url} alt="foto" style={{width:"56px",height:"56px",objectFit:"cover",borderRadius:"6px",border:"1px solid #e5e7eb"}}/>))}
                  </div>
                )}
              </div>
              <div style={{display:"flex",gap:"10px"}}>
                <button onClick={()=>setAdim(1)} style={{flex:1,background:"#f9fafb",color:"#555",border:"1px solid #e5e7eb",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:"pointer"}}>{m.geri}</button>
                <button onClick={()=>{if(adim2Gecerli())setAdim(3);else if(sikayet.trim().length<30)setHata(m.sikayetKisa);}} style={{flex:2,background:adim2Gecerli()?"#534AB7":"#ccc",color:"#fff",border:"none",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:adim2Gecerli()?"pointer":"not-allowed",fontWeight:600}}>{m.devam}</button>
              </div>
            </div>
          )}

          {adim===3 && (
            <div>
              <h2 style={{fontSize:"18px",fontWeight:700,color:"#1a1a1a",marginBottom:"4px"}}>{m.adim3Baslik}</h2>
              <p style={{fontSize:"13px",color:"#888",marginBottom:"20px"}}>{m.adim3Alt}</p>
              <div style={{background:"#f9fafb",borderRadius:"12px",padding:"16px",marginBottom:"16px"}}>
                {[
                  {etiket:m.tedavi,deger:tedaviTuru},
                  ...(secilenKlinik?[{etiket:"Klinik",deger:`${secilenKlinik.ad} ${secilenKlinik.soyad}`}]:[]),
                  {etiket:dil==="tr"?"Ad Soyad":dil==="ar"?"الاسم":dil==="ru"?"Имя":dil==="fr"?"Nom":dil==="de"?"Name":"Full Name",deger:`${ad} ${soyad}`},
                  {etiket:"Email",deger:email},
                  {etiket:dil==="tr"?"Telefon":dil==="ar"?"الهاتف":dil==="ru"?"Телефон":dil==="fr"?"Téléphone":"Phone",deger:telefon||"—"},
                  {etiket:dil==="tr"?"Ülke":dil==="ar"?"الدولة":dil==="ru"?"Страна":dil==="fr"?"Pays":dil==="de"?"Land":"Country",deger:ulke},
                  {etiket:m.sikayet,deger:sikayet.length>80?sikayet.slice(0,80)+"...":sikayet},
                  ...(kronikHastalik?[{etiket:m.kronikLabel,deger:kronikHastalik==="Diğer"||kronikHastalik==="Other"||kronikHastalik==="Sonstiges"||kronikHastalik==="أخرى"||kronikHastalik==="Другое"||kronikHastalik==="Autre"?kronikDiger:kronikHastalik}]:[]),
                  ...(kullanilanIlaclar?[{etiket:m.ilacLabel,deger:kullanilanIlaclar}]:[]),
                ].map(b=>(
                  <div key={b.etiket} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #efefef",fontSize:"13px",gap:"12px"}}>
                    <span style={{color:"#888",flexShrink:0,fontSize:"12px"}}>{b.etiket}</span>
                    <span style={{color:"#1a1a1a",fontWeight:500,textAlign:"right"}}>{b.deger}</span>
                  </div>
                ))}
              </div>
              <div style={{background:"#f0eeff",border:"1px solid #CECBF6",borderRadius:"12px",padding:"14px",marginBottom:"14px"}}>
                <div style={{fontSize:"13px",fontWeight:700,color:"#12103a",marginBottom:"10px"}}>{om.basvuruKimin}</div>
                <label style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",marginBottom:"8px"}}>
                  <input type="radio" name="basvuranTur" checked={basvuranTur==="kendim"} onChange={()=>setBasvuranTur("kendim")} style={{width:"16px",height:"16px"}}/>
                  <span style={{fontSize:"13px",color:"#333"}}>{om.kendim}</span>
                </label>
                <label style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"}}>
                  <input type="radio" name="basvuranTur" checked={basvuranTur==="baska"} onChange={()=>setBasvuranTur("baska")} style={{width:"16px",height:"16px"}}/>
                  <span style={{fontSize:"13px",color:"#333"}}>{om.baskaAdina}</span>
                </label>
                {basvuranTur==="baska"&&(
                  <div style={{marginTop:"10px"}}>
                    <label style={{...labelStyle,color:"#534AB7"}}>{om.baskaAdinaAciklama}</label>
                    <input type="text" placeholder={om.baskaAdinaPlaceholder} value={basvurulanadAd} onChange={e=>setBasvurulanadAd(e.target.value)} style={{...inputStyle,borderColor:"#534AB7"}}/>
                  </div>
                )}
              </div>
              <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"14px",marginBottom:"16px"}}>
                <div style={{fontSize:"13px",fontWeight:700,color:"#12103a",marginBottom:"10px"}}>
                  {dil==="tr"?"Lütfen aşağıdakileri onaylayınız:":dil==="ar"?"يرجى تأكيد ما يلي:":dil==="ru"?"Пожалуйста, подтвердите следующее:":dil==="fr"?"Veuillez confirmer ce qui suit:":dil==="de"?"Bitte bestätigen Sie folgendes:":"Please confirm the following:"}
                </div>
                {onayListesi.map(onay=>(
                  <label key={onay.id} style={{display:"flex",gap:"10px",alignItems:"flex-start",marginBottom:"10px",cursor:"pointer"}}>
                    <input type="checkbox" checked={!!onaylar[onay.id]} onChange={e=>{setOnaylar(prev=>({...prev,[onay.id]:e.target.checked}));setOnayUyari(false);}} style={{marginTop:"2px",width:"16px",height:"16px",flexShrink:0}}/>
                    <span style={{fontSize:"12px",color:"#333",lineHeight:"1.5"}}>
                      {onay.metin}
                      {onay.zorunlu&&<span style={{color:"#c00",marginLeft:"4px",fontSize:"10px"}}>{om.zorunlu}</span>}
                    </span>
                  </label>
                ))}
                {onayUyari&&<div style={{fontSize:"12px",color:"#c00",background:"#fff0f0",padding:"8px 12px",borderRadius:"8px"}}>⚠️ {om.onayUyari}</div>}
              </div>
              <div style={{display:"flex",gap:"10px"}}>
                <button onClick={()=>setAdim(2)} style={{flex:1,background:"#f9fafb",color:"#555",border:"1px solid #e5e7eb",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:"pointer"}}>{m.geri}</button>
                <button onClick={gonder} disabled={yukleniyor||!tumZorunluIsaretli||!baskaAdinaGecerli} style={{flex:2,background:tumZorunluIsaretli&&baskaAdinaGecerli?"#534AB7":"#ccc",color:"#fff",border:"none",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:tumZorunluIsaretli&&baskaAdinaGecerli?"pointer":"not-allowed",fontWeight:600,opacity:yukleniyor?0.7:1}}>
                  {yukleniyor?m.gonderiliyor:m.gonder}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </main>
  );
}

export default function TeklifTalep() {
  return (
    <Suspense fallback={<div style={{minHeight:"100vh",background:"#0d2144",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>Yükleniyor...</div>}>
      <TeklifIcerik />
    </Suspense>
  );
}
