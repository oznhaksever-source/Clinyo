"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ─── ONAM METİNLERİ ──────────────────────────────────────────────────────────
const ONAM = {
  tr: {
    basvuruKimin:"Bu başvuru kimin adına yapılıyor?",
    kendim:"Kendi adıma",
    baskaAdina:"Başkası adına (yakın, çocuk, vasi)",
    baskaAdinaAciklama:"Adına başvurduğunuz kişinin adı soyadı:",
    baskaAdinaPlaceholder:"Ad Soyad",
    onay1:"Girdiğim tüm bilgilerin doğru ve güncel olduğunu beyan ediyorum.",
    onay2:"Kliniklerden gelecek tekliflerin ön bilgi niteliğinde olduğunu ve nihai sözleşmenin klinik ile yapılacağını anlıyorum.",
    onay3:"Teklif almak, sağlık hizmeti satın almak anlamına gelmediğini ve tedavi kararının tamamen bana ait olduğunu anlıyorum.",
    onay4:"Girdiğim bilgilerin yalnızca teklif almak amacıyla seçtiğim kliniklerle paylaşılacağını onaylıyorum.",
    onay5:"Medoqa'nın dijital bir aracılık platformu olduğunu ve tıbbi sorumluluk taşımadığını anlıyorum.",
    zorunlu:"* Zorunlu",
    onayUyari:"Lütfen tüm zorunlu kutuları işaretleyiniz.",
  },
  en: {
    basvuruKimin:"Who is this application for?",
    kendim:"For myself",
    baskaAdina:"On behalf of someone else (relative, child, guardian)",
    baskaAdinaAciklama:"Full name of the person you are applying for:",
    baskaAdinaPlaceholder:"Full Name",
    onay1:"I declare that all information I have entered is accurate and current.",
    onay2:"I understand that quotes from clinics are preliminary and the final contract will be made with the clinic.",
    onay3:"I understand that requesting a quote does not constitute purchasing healthcare services and the treatment decision is entirely mine.",
    onay4:"I confirm that my information will only be shared with the clinics I select for quote purposes.",
    onay5:"I understand that Medoqa is a digital intermediary platform and bears no medical liability.",
    zorunlu:"* Required",
    onayUyari:"Please check all required boxes.",
  },
  de: {
    basvuruKimin:"Für wen wird dieser Antrag gestellt?",
    kendim:"Für mich selbst",
    baskaAdina:"Im Namen einer anderen Person (Verwandter, Kind, Vormund)",
    baskaAdinaAciklama:"Vollständiger Name der Person:",
    baskaAdinaPlaceholder:"Vor- und Nachname",
    onay1:"Ich erkläre, dass alle Informationen korrekt und aktuell sind.",
    onay2:"Ich verstehe, dass Angebote vorläufig sind und der endgültige Vertrag mit der Klinik geschlossen wird.",
    onay3:"Ich verstehe, dass eine Angebotsanfrage nicht den Kauf von Gesundheitsdienstleistungen bedeutet.",
    onay4:"Ich bestätige, dass meine Daten nur mit ausgewählten Kliniken geteilt werden.",
    onay5:"Ich verstehe, dass Medoqa eine digitale Vermittlungsplattform ist und keine medizinische Haftung trägt.",
    zorunlu:"* Erforderlich",
    onayUyari:"Bitte markieren Sie alle erforderlichen Felder.",
  },
};

// ─── ANA KATEGORİLER ─────────────────────────────────────────────────────────
const ANA_KATEGORILER = [
  {
    id:"dis", emoji:"🦷",
    tr:"Diş Tedavisi", en:"Dental Treatment", de:"Zahnbehandlung",
    renk:"#0891B2",
    altlar:[
      {tr:"İmplant",en:"Implant",de:"Implantat"},
      {tr:"Zirkonyum Kaplama",en:"Zirconia Crown",de:"Zirkonkrone"},
      {tr:"Lamine Veneer",en:"Laminate Veneer",de:"Laminat Veneer"},
      {tr:"Diş Beyazlatma",en:"Teeth Whitening",de:"Zahnaufhellung"},
      {tr:"Kanal Tedavisi",en:"Root Canal",de:"Wurzelkanal"},
      {tr:"Diş Çekimi",en:"Tooth Extraction",de:"Zahnextraktion"},
      {tr:"Ortodonti",en:"Orthodontics",de:"Kieferorthopädie"},
      {tr:"All-on-4 / All-on-6",en:"All-on-4 / All-on-6",de:"All-on-4 / All-on-6"},
      {tr:"Gülüş Tasarımı",en:"Smile Design",de:"Lächeldesign"},
      {tr:"Diş Taşı Temizliği",en:"Teeth Cleaning",de:"Zahnsteinentfernung"},
    ],
  },
  {
    id:"sac", emoji:"💇",
    tr:"Saç Ekimi", en:"Hair Transplant", de:"Haartransplantation",
    renk:"#7C3AED",
    altlar:[
      {tr:"FUE Saç Ekimi",en:"FUE Hair Transplant",de:"FUE Haartransplantation"},
      {tr:"DHI Saç Ekimi",en:"DHI Hair Transplant",de:"DHI Haartransplantation"},
      {tr:"Safir FUE",en:"Sapphire FUE",de:"Saphir FUE"},
      {tr:"Sakal Ekimi",en:"Beard Transplant",de:"Barttransplantation"},
      {tr:"Kaş Ekimi",en:"Eyebrow Transplant",de:"Augenbrauentransplantation"},
      {tr:"PRP Tedavisi",en:"PRP Treatment",de:"PRP Behandlung"},
    ],
  },
  {
    id:"goz", emoji:"👁️",
    tr:"Göz Ameliyatı", en:"Eye Surgery", de:"Augenoperation",
    renk:"#059669",
    altlar:[
      {tr:"Lasik",en:"Lasik",de:"Lasik"},
      {tr:"Lasek",en:"Lasek",de:"Lasek"},
      {tr:"PRK",en:"PRK",de:"PRK"},
      {tr:"Smile Pro",en:"Smile Pro",de:"Smile Pro"},
      {tr:"Göz İçi Lens (ICL)",en:"Intraocular Lens (ICL)",de:"Intraokulare Linse (ICL)"},
      {tr:"Katarakt Ameliyatı",en:"Cataract Surgery",de:"Kataraktoperation"},
    ],
  },
  {
    id:"plastik", emoji:"💉",
    tr:"Plastik Cerrahi", en:"Plastic Surgery", de:"Plastische Chirurgie",
    renk:"#DC2626",
    altlar:[
      {tr:"Burun Estetiği",en:"Rhinoplasty",de:"Rhinoplastik"},
      {tr:"Yüz Germe",en:"Face Lift",de:"Gesichtslifting"},
      {tr:"Göz Kapağı Estetiği",en:"Eyelid Surgery",de:"Lidchirurgie"},
      {tr:"Meme Büyütme",en:"Breast Augmentation",de:"Brustvergrößerung"},
      {tr:"Meme Küçültme",en:"Breast Reduction",de:"Brustverkleinerung"},
      {tr:"Karın Germe",en:"Tummy Tuck",de:"Bauchdeckenstraffung"},
      {tr:"Liposuction",en:"Liposuction",de:"Liposuktion"},
      {tr:"Botoks",en:"Botox",de:"Botox"},
      {tr:"Dolgu (Filler)",en:"Filler",de:"Filler"},
    ],
  },
  {
    id:"ortopedi", emoji:"🦴",
    tr:"Ortopedi", en:"Orthopedics", de:"Orthopädie",
    renk:"#4F46E5",
    altlar:[
      {tr:"Diz Protezi",en:"Knee Prosthesis",de:"Knieprothese"},
      {tr:"Kalça Protezi",en:"Hip Prosthesis",de:"Hüftprothese"},
      {tr:"Omurga Cerrahisi",en:"Spine Surgery",de:"Wirbelsäulenchirurgie"},
      {tr:"Spor Yaralanmaları",en:"Sports Injuries",de:"Sportverletzungen"},
      {tr:"Artroskopi",en:"Arthroscopy",de:"Arthroskopie"},
    ],
  },
  {
    id:"checkup", emoji:"🏥",
    tr:"Check-Up", en:"Check-Up", de:"Check-Up",
    renk:"#D97706",
    altlar:[
      {tr:"Temel Check-Up",en:"Basic Check-Up",de:"Basis Check-Up"},
      {tr:"Kapsamlı Check-Up",en:"Comprehensive Check-Up",de:"Umfassender Check-Up"},
      {tr:"Kardiyoloji Check-Up",en:"Cardiology Check-Up",de:"Kardiologie Check-Up"},
      {tr:"Onkoloji Taraması",en:"Oncology Screening",de:"Onkologie-Screening"},
      {tr:"Dermatoloji",en:"Dermatology",de:"Dermatologie"},
    ],
  },
  {
    id:"diger", emoji:"📋",
    tr:"Diğer", en:"Other", de:"Sonstiges",
    renk:"#64748b",
    altlar:[],
  },
];

// ─── HASTALIK LİSTESİ ─────────────────────────────────────────────────────────
const HASTALIKLAR = {
  tr:["Yok","Diyabet","Hipertansiyon","Kalp Hastalığı","Astım","Tiroid","Böbrek Hastalığı","Karaciğer Hastalığı","Kanser (geçmiş/mevcut)","Kan Pıhtılaşma Bozukluğu","Diğer"],
  en:["None","Diabetes","Hypertension","Heart Disease","Asthma","Thyroid","Kidney Disease","Liver Disease","Cancer (past/current)","Blood Clotting Disorder","Other"],
  de:["Keine","Diabetes","Hypertonie","Herzerkrankung","Asthma","Schilddrüse","Nierenerkrankung","Lebererkrankung","Krebs (vergangen/aktuell)","Blutgerinnungsstörung","Sonstiges"],
};

export default function TeklifTalep() {
  const [adim, setAdim] = useState(1);
  const [secilenKategori, setSecilenKategori] = useState<string>("");
  const [secilenAlt, setSecilenAlt] = useState<string>("");
  const [gonderildi, setGonderildi] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");
  const [mobil, setMobil] = useState(false);

  // Adım 2 — İletişim
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [ulke, setUlke] = useState("");
  const [fotograflar, setFotograflar] = useState<string[]>([]);
  const [fotografYukleniyor, setFotografYukleniyor] = useState(false);

  // Adım 2 — Tıbbi Hikaye
  const [sikayet, setSikayet] = useState("");
  const [kronikHastalik, setKronikHastalik] = useState("");
  const [kronikDiger, setKronikDiger] = useState("");
  const [kullanilanIlaclar, setKullanilanIlaclar] = useState("");
  const [alerji, setAlerji] = useState("");
  const [ameliyatGecmisi, setAmeliyatGecmisi] = useState("");

  // Adım 3 — Onam
  const [basvuranTur, setBasvuranTur] = useState<"kendim"|"baska">("kendim");
  const [basvurulanadAd, setBasvurulanadAd] = useState("");
  const [onaylar, setOnaylar] = useState<Record<string,boolean>>({});
  const [onayUyari, setOnayUyari] = useState(false);

  const { t, dil } = useDil();
  const om = ONAM[dil as keyof typeof ONAM] || ONAM.tr;
  const supabase = createClient();

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  const ulkeler = {
    tr:["Almanya","İngiltere","Hollanda","Avusturya","Fransa","İsviçre","Belçika","Türkiye","Diğer"],
    en:["Germany","United Kingdom","Netherlands","Austria","France","Switzerland","Belgium","Turkey","Other"],
    de:["Deutschland","Vereinigtes Königreich","Niederlande","Österreich","Frankreich","Schweiz","Belgien","Türkei","Sonstiges"],
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

  const kategoriAd = (kat: typeof ANA_KATEGORILER[0]) =>
    dil==="tr"?kat.tr:dil==="en"?kat.en:kat.de;

  const altAd = (alt: {tr:string,en:string,de:string}) =>
    dil==="tr"?alt.tr:dil==="en"?alt.en:alt.de;

  const seciliKategoriObj = ANA_KATEGORILER.find(k=>k.id===secilenKategori);
  const tedaviTuru = secilenAlt || (seciliKategoriObj ? kategoriAd(seciliKategoriObj) : "");

  const metin = {
    tr:{
      adim1Baslik:"Hangi tedaviyi arıyorsunuz?",
      adim1Alt:"Ana kategorinizi seçin, sonra isterseniz alt tedaviyi belirtin",
      altSecimBaslik:"Alt tedavi seçin (opsiyonel)",
      atla:"Bu adımı geç →",
      devam:"Devam Et →",
      geri:"← Geri",
      adim2Baslik:"Kişisel & Tıbbi Bilgiler",
      adim2Alt:"Klinikler size doğru teklif verebilmek için bu bilgilere ihtiyaç duyar",
      uyariBaslik:"⚠️ Önemli Tıbbi Uyarı",
      uyariMetin:"Aşağıdaki bilgiler kliniklerin size güvenli ve doğru teklif verebilmesi için zorunludur. Kronik hastalıklarınızı ve kullandığınız ilaçları eksiksiz belirtmeniz, tedavinizin güvenliği açısından hayati önem taşır.",
      sikayetLabel:"Şikayet / Tedavi Hikayesi *",
      sikayetPlaceholder:"Mevcut durumunuzu, şikayetlerinizi ve tedavi beklentilerinizi detaylı olarak anlatın. (En az 30 karakter)",
      kronikLabel:"Kronik Hastalık",
      kronikDigerLabel:"Diğer hastalığınızı belirtin:",
      ilacLabel:"Sürekli Kullanılan İlaçlar",
      ilacPlaceholder:"Aspirin, Metformin, Coumadin... (yoksa boş bırakın)",
      alerjiLabel:"İlaç / Madde Alerjisi",
      alerjiPlaceholder:"Penisilin, lateks... (yoksa boş bırakın)",
      ameliyatLabel:"Geçmiş Ameliyatlar",
      ameliyatPlaceholder:"Daha önce geçirdiğiniz ameliyatlar (yoksa boş bırakın)",
      xrayLabel:"X-Ray / Fotoğraf (opsiyonel)",
      ad:"Ad *",soyad:"Soyad *",eposta:"E-posta *",telefon:"Telefon",ulke:"Ülke *",ulkeSec:"Seçin...",
      adim3Baslik:"Gözden Geçir ve Onayla",
      adim3Alt:"Bilgilerinizi kontrol edin ve formu gönderin",
      tedavi:"Tedavi",sikayet:"Şikayet",
      gonder:"Teklif Talebini Gönder",gonderiliyor:"Gönderiliyor...",
      basarili:"Teklif Talebiniz Alındı! 🎉",
      basariliAciklama:"Klinikler inceleyip en kısa sürede size özel teklif gönderecek.",
      anaSayfayaDon:"Ana Sayfaya Dön",
      sikayetKisa:"Lütfen şikayetinizi en az 30 karakter ile açıklayın.",
    },
    en:{
      adim1Baslik:"What treatment are you looking for?",
      adim1Alt:"Select your main category, then optionally specify the sub-treatment",
      altSecimBaslik:"Select sub-treatment (optional)",
      atla:"Skip this step →",
      devam:"Continue →",
      geri:"← Back",
      adim2Baslik:"Personal & Medical Information",
      adim2Alt:"Clinics need this information to give you the right quote",
      uyariBaslik:"⚠️ Important Medical Notice",
      uyariMetin:"The information below is essential for clinics to provide you with a safe and accurate quote. Providing complete information about your chronic conditions and medications is vital for your treatment safety.",
      sikayetLabel:"Complaint / Treatment History *",
      sikayetPlaceholder:"Describe your current condition, complaints and treatment expectations in detail. (At least 30 characters)",
      kronikLabel:"Chronic Disease",
      kronikDigerLabel:"Specify your other condition:",
      ilacLabel:"Regular Medications",
      ilacPlaceholder:"Aspirin, Metformin, Coumadin... (leave blank if none)",
      alerjiLabel:"Drug / Material Allergy",
      alerjiPlaceholder:"Penicillin, latex... (leave blank if none)",
      ameliyatLabel:"Previous Surgeries",
      ameliyatPlaceholder:"Previous surgeries (leave blank if none)",
      xrayLabel:"X-Ray / Photo (optional)",
      ad:"First Name *",soyad:"Last Name *",eposta:"Email *",telefon:"Phone",ulke:"Country *",ulkeSec:"Select...",
      adim3Baslik:"Review and Confirm",
      adim3Alt:"Check your information and submit the form",
      tedavi:"Treatment",sikayet:"Complaint",
      gonder:"Send Quote Request",gonderiliyor:"Sending...",
      basarili:"Your Quote Request Has Been Received! 🎉",
      basariliAciklama:"Clinics will review and send you personalized quotes as soon as possible.",
      anaSayfayaDon:"Back to Home",
      sikayetKisa:"Please describe your complaint with at least 30 characters.",
    },
    de:{
      adim1Baslik:"Welche Behandlung suchen Sie?",
      adim1Alt:"Wählen Sie Ihre Hauptkategorie und optional eine Unterbehandlung",
      altSecimBaslik:"Unterbehandlung auswählen (optional)",
      atla:"Diesen Schritt überspringen →",
      devam:"Weiter →",
      geri:"← Zurück",
      adim2Baslik:"Persönliche & Medizinische Informationen",
      adim2Alt:"Kliniken benötigen diese Informationen für ein korrektes Angebot",
      uyariBaslik:"⚠️ Wichtiger Medizinischer Hinweis",
      uyariMetin:"Die folgenden Informationen sind unerlässlich für ein sicheres und genaues Angebot. Die vollständige Angabe Ihrer chronischen Erkrankungen und Medikamente ist für Ihre Behandlungssicherheit von entscheidender Bedeutung.",
      sikayetLabel:"Beschwerde / Krankengeschichte *",
      sikayetPlaceholder:"Beschreiben Sie Ihren aktuellen Zustand, Ihre Beschwerden und Behandlungserwartungen. (Mindestens 30 Zeichen)",
      kronikLabel:"Chronische Erkrankung",
      kronikDigerLabel:"Geben Sie Ihre andere Erkrankung an:",
      ilacLabel:"Regelmäßige Medikamente",
      ilacPlaceholder:"Aspirin, Metformin... (leer lassen wenn keine)",
      alerjiLabel:"Medikamenten- / Materialallergien",
      alerjiPlaceholder:"Penicillin, Latex... (leer lassen wenn keine)",
      ameliyatLabel:"Frühere Operationen",
      ameliyatPlaceholder:"Frühere Operationen (leer lassen wenn keine)",
      xrayLabel:"Röntgen / Foto (optional)",
      ad:"Vorname *",soyad:"Nachname *",eposta:"E-Mail *",telefon:"Telefon",ulke:"Land *",ulkeSec:"Auswählen...",
      adim3Baslik:"Überprüfen und Bestätigen",
      adim3Alt:"Überprüfen Sie Ihre Informationen und senden Sie das Formular",
      tedavi:"Behandlung",sikayet:"Beschwerde",
      gonder:"Angebotsanfrage senden",gonderiliyor:"Wird gesendet...",
      basarili:"Ihre Angebotsanfrage wurde erhalten! 🎉",
      basariliAciklama:"Kliniken werden prüfen und Ihnen so bald wie möglich personalisierte Angebote senden.",
      anaSayfayaDon:"Zurück zur Startseite",
      sikayetKisa:"Bitte beschreiben Sie Ihre Beschwerde mit mindestens 30 Zeichen.",
    },
  };

  const m = metin[dil as keyof typeof metin] || metin.tr;

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
      kronik_hastalik: kronikHastalik==="Diğer"||kronikHastalik==="Other"||kronikHastalik==="Sonstiges" ? kronikDiger : kronikHastalik,
      kullanilan_ilaclar: kullanilanIlaclar,
      alerji,
      ameliyat_gecmisi: ameliyatGecmisi,
    };

    const {data:talepData,error} = await supabase.from("talepler").insert({
      hasta_id: user?.id||null,
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
        <div style={{textAlign:"center",marginBottom:"28px"}}>
          <h1 style={{color:"#fff",fontSize:mobil?"22px":"28px",fontWeight:700,marginBottom:"8px"}}>
            {dil==="tr"?"Ücretsiz Teklif Talebi":dil==="en"?"Free Quote Request":"Kostenlose Angebotsanfrage"}
          </h1>
          <p style={{color:"#7a90b0",fontSize:"14px"}}>
            {dil==="tr"?"Onaylı kliniklerden kişiselleştirilmiş teklif alın":dil==="en"?"Get personalized quotes from verified clinics":"Erhalten Sie personalisierte Angebote von verifizierten Kliniken"}
          </p>
        </div>

        {/* Adım göstergesi */}
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

          {/* ── ADIM 1: KATEGORİ SEÇ ── */}
          {adim===1 && (
            <div>
              <h2 style={{fontSize:"18px",fontWeight:700,color:"#1a1a1a",marginBottom:"6px"}}>{m.adim1Baslik}</h2>
              <p style={{fontSize:"13px",color:"#888",marginBottom:"20px"}}>{m.adim1Alt}</p>

              {/* Ana kategoriler */}
              {!secilenKategori ? (
                <div style={{display:"grid",gridTemplateColumns:mobil?"1fr 1fr":"repeat(3,1fr)",gap:"12px",marginBottom:"20px"}}>
                  {ANA_KATEGORILER.map(kat=>(
                    <div
                      key={kat.id}
                      onClick={()=>setSecilenKategori(kat.id)}
                      style={{
                        border:`2px solid ${kat.renk}30`,borderRadius:"14px",padding:"20px 12px",
                        cursor:"pointer",textAlign:"center",
                        background:`${kat.renk}08`,
                        transition:"all .2s",
                      }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=kat.renk;(e.currentTarget as HTMLElement).style.background=`${kat.renk}15`;}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${kat.renk}30`;(e.currentTarget as HTMLElement).style.background=`${kat.renk}08`;}}
                    >
                      <div style={{fontSize:"32px",marginBottom:"8px"}}>{kat.emoji}</div>
                      <div style={{fontSize:"13px",fontWeight:700,color:"#1a1a1a"}}>{kategoriAd(kat)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {/* Seçilen kategori başlığı */}
                  <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px",padding:"12px 16px",background:`${seciliKategoriObj?.renk}10`,borderRadius:"12px",border:`1px solid ${seciliKategoriObj?.renk}30`}}>
                    <span style={{fontSize:"24px"}}>{seciliKategoriObj?.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"14px",fontWeight:700,color:"#1a1a1a"}}>{seciliKategoriObj && kategoriAd(seciliKategoriObj)}</div>
                    </div>
                    <button onClick={()=>{setSecilenKategori("");setSecilenAlt("");}} style={{background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:"18px"}}>✕</button>
                  </div>

                  {/* Alt kategoriler */}
                  {seciliKategoriObj && seciliKategoriObj.altlar.length>0 && (
                    <div>
                      <div style={{fontSize:"13px",fontWeight:600,color:"#555",marginBottom:"10px"}}>{m.altSecimBaslik}</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"16px"}}>
                        {seciliKategoriObj.altlar.map(alt=>{
                          const ad2 = altAd(alt);
                          return (
                            <div
                              key={ad2}
                              onClick={()=>setSecilenAlt(secilenAlt===ad2?"":ad2)}
                              style={{
                                padding:"7px 14px",borderRadius:"20px",cursor:"pointer",fontSize:"13px",fontWeight:500,
                                border:`1px solid ${secilenAlt===ad2?(seciliKategoriObj.renk):"#e5e7eb"}`,
                                background:secilenAlt===ad2?`${seciliKategoriObj.renk}15`:"#f9fafb",
                                color:secilenAlt===ad2?seciliKategoriObj.renk:"#444",
                                transition:"all .15s",
                              }}
                            >
                              {secilenAlt===ad2?"✓ ":""}{ad2}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div style={{display:"flex",gap:"10px"}}>
                    {seciliKategoriObj&&seciliKategoriObj.altlar.length>0&&(
                      <button onClick={()=>{setSecilenAlt("");setAdim(2);}} style={{flex:1,background:"#f9fafb",color:"#555",border:"1px solid #e5e7eb",padding:"12px",borderRadius:"10px",fontSize:"13px",cursor:"pointer"}}>
                        {m.atla}
                      </button>
                    )}
                    <button
                      onClick={()=>setAdim(2)}
                      style={{flex:2,background:seciliKategoriObj?.renk||"#534AB7",color:"#fff",border:"none",padding:"12px",borderRadius:"10px",fontSize:"14px",cursor:"pointer",fontWeight:600}}
                    >
                      {m.devam}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── ADIM 2: KİŞİSEL & TIBBİ BİLGİLER ── */}
          {adim===2 && (
            <div>
              <h2 style={{fontSize:"18px",fontWeight:700,color:"#1a1a1a",marginBottom:"4px"}}>{m.adim2Baslik}</h2>
              <p style={{fontSize:"13px",color:"#888",marginBottom:"16px"}}>{m.adim2Alt}</p>

              {/* Tıbbi uyarı */}
              <div style={{background:"#fffbeb",border:"1px solid #f59e0b",borderRadius:"12px",padding:"14px 16px",marginBottom:"20px"}}>
                <div style={{fontSize:"13px",fontWeight:700,color:"#92400e",marginBottom:"6px"}}>{m.uyariBaslik}</div>
                <div style={{fontSize:"12px",color:"#78350f",lineHeight:1.6}}>{m.uyariMetin}</div>
              </div>

              {/* Kişisel bilgiler */}
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
                  {(ulkeler[dil as keyof typeof ulkeler]||ulkeler.tr).map(u=><option key={u}>{u}</option>)}
                </select>
              </div>

              {/* Şikayet / Hikaye */}
              <div style={{marginBottom:"12px"}}>
                <label style={labelStyle}>{m.sikayetLabel}</label>
                <textarea
                  rows={4}
                  placeholder={m.sikayetPlaceholder}
                  value={sikayet}
                  onChange={e=>setSikayet(e.target.value)}
                  style={{...inputStyle,resize:"vertical",borderColor:sikayet.length>0&&sikayet.length<30?"#f59e0b":"#e5e7eb"}}
                />
                {sikayet.length>0&&sikayet.length<30&&(
                  <div style={{fontSize:"11px",color:"#f59e0b",marginTop:"4px"}}>⚠️ {m.sikayetKisa} ({sikayet.length}/30)</div>
                )}
              </div>

              {/* Kronik hastalık */}
              <div style={{marginBottom:"12px"}}>
                <label style={labelStyle}>{m.kronikLabel}</label>
                <select value={kronikHastalik} onChange={e=>setKronikHastalik(e.target.value)} style={{...inputStyle,background:"#fff"}}>
                  <option value="">{dil==="tr"?"Seçin...":dil==="en"?"Select...":"Auswählen..."}</option>
                  {(HASTALIKLAR[dil as keyof typeof HASTALIKLAR]||HASTALIKLAR.tr).map(h=><option key={h}>{h}</option>)}
                </select>
                {(kronikHastalik==="Diğer"||kronikHastalik==="Other"||kronikHastalik==="Sonstiges")&&(
                  <input type="text" placeholder={m.kronikDigerLabel} value={kronikDiger} onChange={e=>setKronikDiger(e.target.value)} style={{...inputStyle,marginTop:"8px"}}/>
                )}
              </div>

              {/* İlaçlar + Alerji */}
              <div style={{display:"grid",gridTemplateColumns:mobil?"1fr":"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                <div>
                  <label style={labelStyle}>{m.ilacLabel}</label>
                  <input type="text" placeholder={m.ilacPlaceholder} value={kullanilanIlaclar} onChange={e=>setKullanilanIlaclar(e.target.value)} style={inputStyle}/>
                </div>
                <div>
                  <label style={labelStyle}>{m.alerjiLabel}</label>
                  <input type="text" placeholder={m.alerjiPlaceholder} value={alerji} onChange={e=>setAlerji(e.target.value)} style={inputStyle}/>
                </div>
              </div>

              {/* Ameliyat geçmişi */}
              <div style={{marginBottom:"12px"}}>
                <label style={labelStyle}>{m.ameliyatLabel}</label>
                <input type="text" placeholder={m.ameliyatPlaceholder} value={ameliyatGecmisi} onChange={e=>setAmeliyatGecmisi(e.target.value)} style={inputStyle}/>
              </div>

              {/* Fotoğraf */}
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
                <button
                  onClick={()=>{if(adim2Gecerli())setAdim(3);else if(sikayet.trim().length<30)setHata(m.sikayetKisa);}}
                  style={{flex:2,background:adim2Gecerli()?"#534AB7":"#ccc",color:"#fff",border:"none",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:adim2Gecerli()?"pointer":"not-allowed",fontWeight:600}}
                >
                  {m.devam}
                </button>
              </div>
            </div>
          )}

          {/* ── ADIM 3: ÖZET + ONAM ── */}
          {adim===3 && (
            <div>
              <h2 style={{fontSize:"18px",fontWeight:700,color:"#1a1a1a",marginBottom:"4px"}}>{m.adim3Baslik}</h2>
              <p style={{fontSize:"13px",color:"#888",marginBottom:"20px"}}>{m.adim3Alt}</p>

              {/* Özet */}
              <div style={{background:"#f9fafb",borderRadius:"12px",padding:"16px",marginBottom:"16px"}}>
                {[
                  {etiket:m.tedavi,deger:tedaviTuru},
                  {etiket:dil==="tr"?"Ad Soyad":dil==="en"?"Full Name":"Name",deger:`${ad} ${soyad}`},
                  {etiket:"Email",deger:email},
                  {etiket:dil==="tr"?"Telefon":"Phone",deger:telefon||"—"},
                  {etiket:dil==="tr"?"Ülke":dil==="en"?"Country":"Land",deger:ulke},
                  {etiket:m.sikayet,deger:sikayet.length>80?sikayet.slice(0,80)+"...":sikayet},
                  ...(kronikHastalik?[{etiket:m.kronikLabel,deger:kronikHastalik==="Diğer"||kronikHastalik==="Other"||kronikHastalik==="Sonstiges"?kronikDiger:kronikHastalik}]:[]),
                  ...(kullanilanIlaclar?[{etiket:m.ilacLabel,deger:kullanilanIlaclar}]:[]),
                ].map(b=>(
                  <div key={b.etiket} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #efefef",fontSize:"13px",gap:"12px"}}>
                    <span style={{color:"#888",flexShrink:0,fontSize:"12px"}}>{b.etiket}</span>
                    <span style={{color:"#1a1a1a",fontWeight:500,textAlign:"right"}}>{b.deger}</span>
                  </div>
                ))}
              </div>

              {/* Başvuruyu kimin adına */}
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

              {/* Onay kutuları */}
              <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"14px",marginBottom:"16px"}}>
                <div style={{fontSize:"13px",fontWeight:700,color:"#12103a",marginBottom:"10px"}}>
                  {dil==="tr"?"Lütfen aşağıdakileri onaylayınız:":dil==="en"?"Please confirm the following:":"Bitte bestätigen Sie folgendes:"}
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
                <button
                  onClick={gonder}
                  disabled={yukleniyor||!tumZorunluIsaretli||!baskaAdinaGecerli}
                  style={{flex:2,background:tumZorunluIsaretli&&baskaAdinaGecerli?"#534AB7":"#ccc",color:"#fff",border:"none",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:tumZorunluIsaretli&&baskaAdinaGecerli?"pointer":"not-allowed",fontWeight:600,opacity:yukleniyor?0.7:1}}
                >
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
