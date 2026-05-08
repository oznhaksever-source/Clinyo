"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";

const TYPES: Record<number,string> = {
  18:'Y',17:'M',16:'M',15:'P',14:'P',13:'C',12:'LI',11:'CI',
  21:'CI',22:'LI',23:'C',24:'P',25:'P',26:'M',27:'M',28:'Y',
  48:'Y',47:'M',46:'M',45:'P',44:'P',43:'C',42:'LI',41:'CI',
  31:'CI',32:'LI',33:'C',34:'P',35:'P',36:'M',37:'M',38:'Y'
};
const UST = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const ALT = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
const RENKLER: Record<string,string> = {
  implant:'#534AB7', kaplama:'#1D9E75', kanal:'#D85A30',
  dolgu:'#378ADD', cekim:'#E24B4A', kopru:'#7F77DD',
  lezyon:'#BA7517', default:'#e0ddf0'
};

const TEDAVI_ACK: Record<string, Record<string, {baslik:string,aciklama:string,sure:string}>> = {
  tr: {
    implant:{baslik:"İmplant",aciklama:"Titanyum vida çene kemiğine yerleştirilir. İyileşme sonrası üzerine kuron takılır. Doğal diş görünümü ve işlevi sağlar.",sure:"2-3 ay"},
    kaplama:{baslik:"Kaplama / Kuron",aciklama:"Diş yüzeyi zirkonyum veya porselen ile kaplanır. Hem estetik hem dayanıklı bir çözümdür.",sure:"1-2 seans"},
    kanal:{baslik:"Kanal Tedavisi",aciklama:"Enfekte sinir dokusu temizlenir, kanal sterilize edilip doldurulur. Dişi kurtarır ve ağrıyı giderir.",sure:"1-2 seans"},
    dolgu:{baslik:"Dolgu",aciklama:"Çürük alan temizlenir, dişin rengiyle uyumlu kompozit malzeme ile doldurulur.",sure:"1 seans"},
    cekim:{baslik:"Diş Çekimi",aciklama:"Hasarlı ya da tedavi edilemeyen diş lokal anestezi altında çekilir.",sure:"1 seans"},
    kopru:{baslik:"Köprü",aciklama:"Eksik dişin iki yanındaki dişlere destek alınarak sabit köprü yapılır.",sure:"2-3 seans"},
    lezyon:{baslik:"Lezyon Tedavisi",aciklama:"Kök ucundaki apse veya kist temizlenir, gerekirse kök ucu rezeksiyonu uygulanır.",sure:"1-2 seans"},
  },
  en: {
    implant:{baslik:"Implant",aciklama:"A titanium screw is placed into the jawbone. After healing, a crown is attached. Provides natural tooth appearance and function.",sure:"2-3 months"},
    kaplama:{baslik:"Crown / Veneer",aciklama:"The tooth surface is covered with zirconia or porcelain. Both aesthetic and durable solution.",sure:"1-2 sessions"},
    kanal:{baslik:"Root Canal",aciklama:"Infected nerve tissue is removed, the canal is sterilized and filled. Saves the tooth and eliminates pain.",sure:"1-2 sessions"},
    dolgu:{baslik:"Filling",aciklama:"The decayed area is cleaned and filled with tooth-colored composite material.",sure:"1 session"},
    cekim:{baslik:"Tooth Extraction",aciklama:"The damaged or untreatable tooth is extracted under local anesthesia.",sure:"1 session"},
    kopru:{baslik:"Bridge",aciklama:"A fixed bridge is made by using the teeth on either side of the missing tooth as support.",sure:"2-3 sessions"},
    lezyon:{baslik:"Lesion Treatment",aciklama:"The abscess or cyst at the root tip is cleaned, and root tip resection is applied if necessary.",sure:"1-2 sessions"},
  },
  de: {
    implant:{baslik:"Implantat",aciklama:"Eine Titanschraube wird in den Kieferknochen eingesetzt. Nach der Heilung wird eine Krone befestigt.",sure:"2-3 Monate"},
    kaplama:{baslik:"Krone / Verblendung",aciklama:"Die Zahnoberfläche wird mit Zirkon oder Porzellan verkleidet. Ästhetisch und langlebig.",sure:"1-2 Sitzungen"},
    kanal:{baslik:"Wurzelkanalbehandlung",aciklama:"Infiziertes Nervengewebe wird entfernt, der Kanal wird sterilisiert und gefüllt.",sure:"1-2 Sitzungen"},
    dolgu:{baslik:"Füllung",aciklama:"Der kariöse Bereich wird gereinigt und mit zahnfarbenem Komposit gefüllt.",sure:"1 Sitzung"},
    cekim:{baslik:"Zahnextraktion",aciklama:"Der beschädigte Zahn wird unter Lokalanästhesie entfernt.",sure:"1 Sitzung"},
    kopru:{baslik:"Brücke",aciklama:"Eine Festbrücke wird durch Abstützen an den Zähnen auf beiden Seiten des fehlenden Zahns hergestellt.",sure:"2-3 Sitzungen"},
    lezyon:{baslik:"Läsionsbehandlung",aciklama:"Der Abszess oder die Zyste an der Wurzelspitze wird gereinigt.",sure:"1-2 Sitzungen"},
  },
};

const METINLER = {
  tr: {
    baslik:"Hasta Paneli",
    hosgeldin:"Hoş Geldiniz",
    tedaviSureci:"Tedavi sürecinizi buradan takip edebilirsiniz.",
    talepSayisi:"Teklif Talebim",
    teklifSayisi:"Gelen Teklif",
    bekleyen:"Bekleyen",
    teklifYok:"Henüz teklif talebiniz yok",
    teklifYokAcik:"İlk teklif talebinizi oluşturun ve kliniklerden fiyat alın.",
    teklifOlustur:"Teklif Talebi Oluştur",
    yeniTalep:"+ Yeni Teklif Talebi",
    cikisYap:"Çıkış Yap",
    menu:{ozet:"Genel Özet",talepler:"Teklif Taleplerim",teklifler:"Gelen Teklifler",profil:"Profilim",mesajlar:"💬 Mesajlar"},
    taleplerim:"Teklif Taleplerim",
    yeniTalepBtn:"+ Yeni Talep",
    talepYok:"Henüz teklif talebiniz yok",
    gelenTeklifler:"Gelen Teklifler",
    gelenYok:"Henüz gelen teklif yok.",
    detayGor:"Detayları gör →",
    onaylandi:"✅ Onaylandı",
    reddedildi:"❌ Reddedildi",
    beklemede:"⏳ Beklemede",
    profilim:"Profilim",
    ad:"Ad", soyad:"Soyad", eposta:"E-posta", hesapTuru:"Hesap Türü",
    mesajlar:"💬 Mesajlar",
    mesajlarAcik:"Kliniklerle mesajlaşmak için mesajlar sayfasını kullanın.",
    mesajlarGit:"💬 Mesajlar Sayfasına Git →",
    tedaviPlani:"🦷 Tedavi Planı — Diş Şeması",
    ustCene:"Üst çene", altCene:"Alt çene",
    tedaviler:"💊 Tedaviler",
    fiyatOzeti:"💰 Fiyat Özeti",
    tedaviUcreti:"Tedavi",
    toplam:"Toplam",
    teklifOnayla:"✅ Teklifi Onayla",
    teklifReddet:"❌ Reddet",
    mesajlas:"💬 Klinik ile Mesajlaş",
    onayMesaj:"Bu teklifi onaylamak istediğinize emin misiniz?",
    reddetMesaj:"Bu teklifi reddetmek istediğinize emin misiniz?",
    onayBasarili:"✅ Teklif onaylandı!",
  },
  en: {
    baslik:"Patient Panel",
    hosgeldin:"Welcome",
    tedaviSureci:"You can track your treatment process here.",
    talepSayisi:"My Requests",
    teklifSayisi:"Received Offers",
    bekleyen:"Pending",
    teklifYok:"No quote requests yet",
    teklifYokAcik:"Create your first quote request and get prices from clinics.",
    teklifOlustur:"Create Quote Request",
    yeniTalep:"+ New Quote Request",
    cikisYap:"Sign Out",
    menu:{ozet:"Overview",talepler:"My Requests",teklifler:"Received Offers",profil:"My Profile",mesajlar:"💬 Messages"},
    taleplerim:"My Quote Requests",
    yeniTalepBtn:"+ New Request",
    talepYok:"No quote requests yet",
    gelenTeklifler:"Received Offers",
    gelenYok:"No offers received yet.",
    detayGor:"View details →",
    onaylandi:"✅ Approved",
    reddedildi:"❌ Rejected",
    beklemede:"⏳ Pending",
    profilim:"My Profile",
    ad:"First Name", soyad:"Last Name", eposta:"Email", hesapTuru:"Account Type",
    mesajlar:"💬 Messages",
    mesajlarAcik:"Use the messages page to communicate with clinics.",
    mesajlarGit:"💬 Go to Messages →",
    tedaviPlani:"🦷 Treatment Plan — Dental Chart",
    ustCene:"Upper jaw", altCene:"Lower jaw",
    tedaviler:"💊 Treatments",
    fiyatOzeti:"💰 Price Summary",
    tedaviUcreti:"Treatment",
    toplam:"Total",
    teklifOnayla:"✅ Approve Offer",
    teklifReddet:"❌ Reject",
    mesajlas:"💬 Message the Clinic",
    onayMesaj:"Are you sure you want to approve this offer?",
    reddetMesaj:"Are you sure you want to reject this offer?",
    onayBasarili:"✅ Offer approved!",
  },
  de: {
    baslik:"Patientenbereich",
    hosgeldin:"Willkommen",
    tedaviSureci:"Sie können Ihren Behandlungsprozess hier verfolgen.",
    talepSayisi:"Meine Anfragen",
    teklifSayisi:"Erhaltene Angebote",
    bekleyen:"Ausstehend",
    teklifYok:"Noch keine Angebotsanfragen",
    teklifYokAcik:"Erstellen Sie Ihre erste Anfrage und erhalten Sie Preise von Kliniken.",
    teklifOlustur:"Angebotsanfrage erstellen",
    yeniTalep:"+ Neue Anfrage",
    cikisYap:"Abmelden",
    menu:{ozet:"Übersicht",talepler:"Meine Anfragen",teklifler:"Erhaltene Angebote",profil:"Mein Profil",mesajlar:"💬 Nachrichten"},
    taleplerim:"Meine Angebotsanfragen",
    yeniTalepBtn:"+ Neue Anfrage",
    talepYok:"Noch keine Anfragen",
    gelenTeklifler:"Erhaltene Angebote",
    gelenYok:"Noch keine Angebote erhalten.",
    detayGor:"Details ansehen →",
    onaylandi:"✅ Genehmigt",
    reddedildi:"❌ Abgelehnt",
    beklemede:"⏳ Ausstehend",
    profilim:"Mein Profil",
    ad:"Vorname", soyad:"Nachname", eposta:"E-Mail", hesapTuru:"Kontotyp",
    mesajlar:"💬 Nachrichten",
    mesajlarAcik:"Nutzen Sie die Nachrichtenseite, um mit Kliniken zu kommunizieren.",
    mesajlarGit:"💬 Zur Nachrichtenseite →",
    tedaviPlani:"🦷 Behandlungsplan — Zahnschema",
    ustCene:"Oberkiefer", altCene:"Unterkiefer",
    tedaviler:"💊 Behandlungen",
    fiyatOzeti:"💰 Preisübersicht",
    tedaviUcreti:"Behandlung",
    toplam:"Gesamt",
    teklifOnayla:"✅ Angebot annehmen",
    teklifReddet:"❌ Ablehnen",
    mesajlas:"💬 Klinik kontaktieren",
    onayMesaj:"Möchten Sie dieses Angebot wirklich annehmen?",
    reddetMesaj:"Möchten Sie dieses Angebot wirklich ablehnen?",
    onayBasarili:"✅ Angebot angenommen!",
  },
};

function disSVG(no: number, upper: boolean, conds: string[]) {
  const t = TYPES[no];
  const kat = conds.find(c => RENKLER[c]);
  const renk = kat ? RENKLER[kat] : RENKLER.default;
  const stroke = kat ? 'rgba(0,0,0,.15)' : 'rgba(0,0,0,.08)';
  const prl = kat ? `<ellipse cx="13" cy="${upper?36:28}" rx="7" ry="4" fill="rgba(255,255,255,.2)"/>` : '';
  let kur = '', kok = '';
  if (t==='CI'||t==='LI') {
    if (upper) { kok=`<path d="M9,30 C9,16 11,6 13,1 C15,6 17,16 17,30Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M3,30 L6,46 L20,46 L23,30Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`; }
    else { kok=`<path d="M9,34 C9,48 11,58 13,63 C15,58 17,48 17,34Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M3,34 L6,18 L20,18 L23,34Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`; }
  } else if (t==='C') {
    if (upper) { kok=`<path d="M9,28 C9,14 11,4 13,0 C15,4 17,14 17,28Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M4,28 L9,46 Q11,52 13,52 Q15,52 17,46 L22,28Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`; }
    else { kok=`<path d="M9,36 C9,50 11,60 13,64 C15,60 17,50 17,36Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M4,36 L9,18 Q11,12 13,12 Q15,12 17,18 L22,36Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`; }
  } else if (t==='P') {
    if (upper) { kok=`<path d="M7,28 C6,14 9,4 11,2 C13,0 15,2 13,28Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/><path d="M13,28 C15,4 17,2 19,4 C21,8 20,18 19,28Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M2,28 Q2,44 13,46 Q24,44 24,28Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/><circle cx="8" cy="36" r="3.5" fill="rgba(255,255,255,.2)"/><circle cx="18" cy="36" r="3.5" fill="rgba(255,255,255,.2)"/>${prl}`; }
    else { kok=`<path d="M7,36 C6,50 9,60 11,62 C13,64 15,62 13,36Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/><path d="M13,36 C15,62 17,62 19,60 C21,56 20,46 19,36Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M2,36 Q2,20 13,18 Q24,20 24,36Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/><circle cx="8" cy="28" r="3.5" fill="rgba(255,255,255,.2)"/><circle cx="18" cy="28" r="3.5" fill="rgba(255,255,255,.2)"/>${prl}`; }
  } else {
    if (upper) { kok=`<path d="M4,26 C3,12 5,3 7,1 C9,0 9,26 11,26Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/><path d="M11,25 C10,8 12,2 13,1 C14,2 16,8 15,25Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/><path d="M15,26 C17,26 17,0 19,1 C21,3 23,12 22,26Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M1,26 Q1,42 13,44 Q25,42 25,26Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/><circle cx="7" cy="33" r="3" fill="rgba(255,255,255,.2)"/><circle cx="19" cy="33" r="3" fill="rgba(255,255,255,.2)"/><circle cx="7" cy="40" r="2.5" fill="rgba(255,255,255,.15)"/><circle cx="19" cy="40" r="2.5" fill="rgba(255,255,255,.15)"/>${prl}`; }
    else { kok=`<path d="M4,38 C3,52 5,61 7,63 C9,64 9,38 11,38Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/><path d="M11,39 C10,56 12,62 13,63 C14,62 16,56 15,39Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/><path d="M15,38 C17,38 17,64 19,63 C21,61 23,52 22,38Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M1,38 Q1,22 13,20 Q25,22 25,38Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/><circle cx="7" cy="31" r="3" fill="rgba(255,255,255,.2)"/><circle cx="19" cy="31" r="3" fill="rgba(255,255,255,.2)"/><circle cx="7" cy="24" r="2.5" fill="rgba(255,255,255,.15)"/><circle cx="19" cy="24" r="2.5" fill="rgba(255,255,255,.15)"/>${prl}`; }
  }
  if (conds.includes('cekim')) kur+=`<line x1="4" y1="6" x2="22" y2="58" stroke="#E24B4A" stroke-width="2" stroke-linecap="round" opacity=".8"/><line x1="22" y1="6" x2="4" y2="58" stroke="#E24B4A" stroke-width="2" stroke-linecap="round" opacity=".8"/>`;
  return `<svg width="24" height="64" viewBox="0 0 26 64">${kok}${kur}</svg>`;
}

export default function HastaPanel() {
  const [aktifMenu, setAktifMenu] = useState("ozet");
  const [kullanici, setKullanici] = useState<any>(null);
  const [talepler, setTalepler] = useState<any[]>([]);
  const [teklifler, setTeklifler] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [mesaj, setMesaj] = useState("");
  const [acikTeklif, setAcikTeklif] = useState<any>(null);
  const { dil, dilDegistir } = useDil();
  const m = METINLER[dil];
  const supabase = createClient();

  useEffect(() => { veriYukle(); }, []);

  async function veriYukle() {
    setYukleniyor(true);
    const { data:{user} } = await supabase.auth.getUser();
    if (!user) { window.location.href="/giris"; return; }
    const { data:profile } = await supabase.from("profiles").select("*").eq("id",user.id).single();
    setKullanici(profile);
    const { data:talepData } = await supabase.from("talepler").select("*").eq("hasta_id",user.id).order("olusturma_tarihi",{ascending:false});
    setTalepler(talepData||[]);
    if (talepData && talepData.length>0) {
      const ids = talepData.map((t:any)=>t.id);
      const { data:teklifData } = await supabase.from("teklifler")
        .select("*, profiles!teklifler_klinik_id_fkey(id, ad, soyad, konum_adres, telefon, kapak_fotograf)")
        .in("talep_id",ids)
        .order("olusturma_tarihi",{ascending:false});
      setTeklifler(teklifData||[]);
    }
    setYukleniyor(false);
  }

  async function teklifOnayla(t: any) {
    if (!confirm(m.onayMesaj)) return;
    const { error } = await supabase.from("teklifler").update({durum:"onaylandi"}).eq("id",t.id);
    if (error) { setMesaj("Hata: "+error.message); return; }
    const { data:{user} } = await supabase.auth.getUser();
    if (user && t.klinik_id) {
      await supabase.from("mesajlar").insert({
        gonderen_id:user.id, alici_id:t.klinik_id,
        mesaj: dil==="tr" ? "Merhaba, teklifinizi onayladım. Tedavi süreci hakkında bilgi almak istiyorum."
              : dil==="en" ? "Hello, I have approved your offer. I would like to get information about the treatment process."
              : "Hallo, ich habe Ihr Angebot genehmigt. Ich möchte Informationen zum Behandlungsprozess.",
        okundu:false,
      });
    }
    setMesaj(m.onayBasarili);
    setAcikTeklif(null);
    setTimeout(()=>setMesaj(""),4000);
    veriYukle();
  }

  async function teklifReddet(id: string) {
    if (!confirm(m.reddetMesaj)) return;
    await supabase.from("teklifler").update({durum:"reddedildi"}).eq("id",id);
    setAcikTeklif(null);
    veriYukle();
  }

  async function cikisYap() {
    await supabase.auth.signOut();
    window.location.href="/giris";
  }

  function durumBadge(durum: string) {
    if (durum==="onaylandi") return {label:m.onaylandi, bg:"#f0fff4", color:"#059669"};
    if (durum==="reddedildi") return {label:m.reddedildi, bg:"#fff0f0", color:"#c00"};
    return {label:m.beklemede, bg:"#fff8e1", color:"#BA7517"};
  }

  function TeklifModal({ t }: { t: any }) {
    const disPlan: Record<number,string[]> = t.dis_plani ? JSON.parse(t.dis_plani) : {};
    const tedaviDetay: {dis:number,hizmet_adi:string,fiyat:number,kategori:string}[] = t.tedavi_detaylari ? JSON.parse(t.tedavi_detaylari) : [];
    const klinik = t.profiles;
    const kategoriler = [...new Set(tedaviDetay.map((d:any) => d.kategori))] as string[];
    const ack = TEDAVI_ACK[dil] || TEDAVI_ACK.tr;
    const durum = durumBadge(t.durum);

    return (
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:1000,display:"flex",alignItems:"flex-start",justifyContent:"center",overflowY:"auto",padding:"20px"}}>
        <div style={{background:"#f9fafb",borderRadius:"20px",width:"100%",maxWidth:"680px",position:"relative",marginTop:"20px",marginBottom:"20px"}}>
          <div style={{background:"#12103a",borderRadius:"20px 20px 0 0",padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:"16px"}}>
              <a href="/" style={{fontSize:"18px",fontWeight:700,color:"#fff",textDecoration:"none"}}>
                med<span style={{color:"#7F77DD",fontWeight:300}}>oqa</span>
              </a>
              {/* Dil butonları */}
              <div style={{display:"flex",gap:"4px"}}>
                {(["tr","en","de"] as const).map(d=>(
                  <span key={d} onClick={()=>dilDegistir(d)} style={{fontSize:"10px",padding:"2px 7px",border:`1px solid ${dil===d?"#534AB7":"#2a2a4e"}`,borderRadius:"4px",color:dil===d?"#7F77DD":"#aab4c8",cursor:"pointer",textTransform:"uppercase"}}>{d}</span>
                ))}
              </div>
            </div>
            <button onClick={()=>setAcikTeklif(null)} style={{background:"rgba(255,255,255,.15)",border:"none",color:"#fff",width:"32px",height:"32px",borderRadius:"50%",cursor:"pointer",fontSize:"18px",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          </div>

          <div style={{padding:"24px"}}>
            {/* Klinik */}
            <div style={{background:"#fff",borderRadius:"14px",padding:"20px",marginBottom:"16px",display:"flex",gap:"14px",alignItems:"center",border:"1px solid #EEEDFE"}}>
              {klinik?.kapak_fotograf
                ? <img src={klinik.kapak_fotograf} alt={klinik.ad} style={{width:"56px",height:"56px",borderRadius:"50%",objectFit:"cover",flexShrink:0}}/>
                : <div style={{width:"56px",height:"56px",borderRadius:"50%",background:"#EEEDFE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",fontWeight:700,color:"#534AB7",flexShrink:0}}>{klinik?.ad?.[0]?.toUpperCase()||"K"}</div>
              }
              <div style={{flex:1}}>
                <div style={{fontSize:"17px",fontWeight:700,color:"#12103a"}}>{klinik?.ad} {klinik?.soyad}</div>
                {klinik?.konum_adres && <div style={{fontSize:"12px",color:"#94a3b8",marginTop:"2px"}}>📍 {klinik.konum_adres}</div>}
                {klinik?.telefon && <div style={{fontSize:"12px",color:"#94a3b8"}}>📞 {klinik.telefon}</div>}
              </div>
              <div style={{textAlign:"right"}}>
                <span style={{fontSize:"12px",padding:"4px 12px",borderRadius:"20px",fontWeight:600,display:"block",marginBottom:"4px",background:durum.bg,color:durum.color}}>{durum.label}</span>
                <div style={{fontSize:"11px",color:"#94a3b8"}}>{new Date(t.olusturma_tarihi).toLocaleDateString(dil==="tr"?"tr-TR":dil==="de"?"de-DE":"en-GB")}</div>
              </div>
            </div>

            {/* Diş şeması */}
            {Object.keys(disPlan).length > 0 && (
              <div style={{background:"#fff",borderRadius:"14px",padding:"20px",marginBottom:"16px",border:"1px solid #EEEDFE"}}>
                <div style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"14px"}}>{m.tedaviPlani}</div>
                <p style={{fontSize:"9px",color:"#94a3b8",textAlign:"center",margin:"0 0 4px",letterSpacing:".6px",textTransform:"uppercase"}}>{m.ustCene}</p>
                <div style={{display:"flex",justifyContent:"center"}}>
                  {UST.map(no=>(
                    <div key={no} style={{display:"flex",flexDirection:"column",alignItems:"center",filter:disPlan[no]?`drop-shadow(0 0 4px ${RENKLER[disPlan[no]?.[0]]||'#534AB7'}88)`:'none'}}>
                      <span style={{fontSize:"7px",color:"#94a3b8",height:"11px",lineHeight:"11px"}}>{no}</span>
                      <div dangerouslySetInnerHTML={{__html:disSVG(no,true,disPlan[no]||[])}}/>
                    </div>
                  ))}
                </div>
                <div style={{height:"4px",background:"#e5e7eb",margin:"3px 12px",borderRadius:"2px"}}/>
                <div style={{display:"flex",justifyContent:"center"}}>
                  {ALT.map(no=>(
                    <div key={no} style={{display:"flex",flexDirection:"column",alignItems:"center",filter:disPlan[no]?`drop-shadow(0 0 4px ${RENKLER[disPlan[no]?.[0]]||'#534AB7'}88)`:'none'}}>
                      <div dangerouslySetInnerHTML={{__html:disSVG(no,false,disPlan[no]||[])}}/>
                      <span style={{fontSize:"7px",color:"#94a3b8",height:"11px",lineHeight:"11px"}}>{no}</span>
                    </div>
                  ))}
                </div>
                <p style={{fontSize:"9px",color:"#94a3b8",textAlign:"center",margin:"4px 0 10px",letterSpacing:".6px",textTransform:"uppercase"}}>{m.altCene}</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:"8px",justifyContent:"center"}}>
                  {Object.entries(RENKLER).filter(([k])=>k!=='default'&&kategoriler.includes(k)).map(([k,v])=>(
                    <div key={k} style={{display:"flex",alignItems:"center",gap:"4px",fontSize:"11px",color:"#64748b"}}>
                      <div style={{width:"10px",height:"10px",borderRadius:"2px",background:v}}/>
                      {ack[k]?.baslik||k}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tedaviler */}
            {tedaviDetay.length > 0 && (
              <div style={{background:"#fff",borderRadius:"14px",padding:"20px",marginBottom:"16px",border:"1px solid #EEEDFE"}}>
                <div style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"14px"}}>{m.tedaviler}</div>
                {tedaviDetay.map((d:any,i:number)=>{
                  const ac = ack[d.kategori];
                  const renk = RENKLER[d.kategori]||RENKLER.default;
                  return (
                    <div key={i} style={{display:"flex",gap:"14px",alignItems:"flex-start",padding:"12px",background:"#f8f9ff",borderRadius:"10px",border:"1px solid #EEEDFE",marginBottom:"8px"}}>
                      <div style={{width:"40px",height:"40px",borderRadius:"8px",background:renk+"22",border:`1px solid ${renk}44`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <div style={{width:"14px",height:"14px",borderRadius:"3px",background:renk}}/>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                          <div>
                            <span style={{fontSize:"13px",fontWeight:700,color:"#12103a"}}>{dil==="tr"?"Diş":dil==="en"?"Tooth":"Zahn"} {d.dis}</span>
                            <span style={{fontSize:"12px",color:"#64748b",marginLeft:"6px"}}>— {d.hizmet_adi}</span>
                          </div>
                          <span style={{fontSize:"14px",fontWeight:700,color:"#534AB7"}}>{d.fiyat} EUR</span>
                        </div>
                        {ac && <div style={{fontSize:"12px",color:"#64748b",lineHeight:1.6,marginBottom:"4px"}}>{ac.aciklama}</div>}
                        {ac && <span style={{fontSize:"11px",background:"#fff",color:"#94a3b8",padding:"2px 8px",borderRadius:"8px",border:"1px solid #EEEDFE"}}>⏱ {ac.sure}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Fiyat */}
            <div style={{background:"#fff",borderRadius:"14px",padding:"20px",marginBottom:"16px",border:"1px solid #EEEDFE"}}>
              <div style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"14px"}}>{m.fiyatOzeti}</div>
              {tedaviDetay.length>0 ? tedaviDetay.map((d:any,i:number)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #f5f5f5",fontSize:"13px"}}>
                  <span>{dil==="tr"?"Diş":dil==="en"?"Tooth":"Zahn"} {d.dis} — {d.hizmet_adi}</span>
                  <span style={{fontWeight:600,color:"#534AB7"}}>{d.fiyat} EUR</span>
                </div>
              )) : (
                <div style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #f5f5f5",fontSize:"13px"}}>
                  <span>{m.tedaviUcreti}</span><span style={{fontWeight:600,color:"#534AB7"}}>{t.fiyat} EUR</span>
                </div>
              )}
              {t.otel_dahil && (
                <div style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #f5f5f5",fontSize:"13px"}}>
                  <span>🏨 {dil==="tr"?"Otel":dil==="en"?"Hotel":"Hotel"} — {t.otel_aciklama}</span>
                  <span style={{fontWeight:600,color:"#059669"}}>{t.otel_fiyat} EUR</span>
                </div>
              )}
              {t.transfer_dahil && (
                <div style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #f5f5f5",fontSize:"13px"}}>
                  <span>🚗 {dil==="tr"?"Transfer":"Transfer"} — {t.transfer_aciklama}</span>
                  <span style={{fontWeight:600,color:"#059669"}}>{t.transfer_fiyat} EUR</span>
                </div>
              )}
              <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0 0",fontSize:"16px",fontWeight:700}}>
                <span style={{color:"#12103a"}}>{m.toplam}</span>
                <span style={{color:"#534AB7",fontSize:"20px"}}>{t.toplam_fiyat||t.fiyat} EUR</span>
              </div>
            </div>

            {/* Butonlar */}
            {t.durum==="beklemede" && (
              <div style={{display:"flex",gap:"10px",marginBottom:"12px"}}>
                <button onClick={()=>teklifOnayla(t)} style={{flex:2,background:"#059669",color:"#fff",border:"none",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:"pointer",fontWeight:700}}>{m.teklifOnayla}</button>
                <button onClick={()=>teklifReddet(t.id)} style={{flex:1,background:"#fff0f0",color:"#c00",border:"1px solid #fcc",padding:"13px",borderRadius:"10px",fontSize:"13px",cursor:"pointer",fontWeight:600}}>{m.teklifReddet}</button>
              </div>
            )}
            {t.durum==="onaylandi" && (
              <a href="/mesajlar" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:"#534AB7",color:"#fff",padding:"13px",borderRadius:"10px",fontSize:"14px",textDecoration:"none",fontWeight:700}}>{m.mesajlas}</a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main style={{minHeight:"100vh",background:"#f9fafb",fontFamily:"sans-serif",display:"flex"}}>
      {acikTeklif && <TeklifModal t={acikTeklif}/>}

      {/* Sidebar */}
      <div style={{width:"220px",background:"#12103a",display:"flex",flexDirection:"column",padding:"24px 0",flexShrink:0}}>
        <div style={{padding:"0 20px 20px",borderBottom:"1px solid #1e1b4b"}}>
          <a href="/" style={{fontSize:"20px",fontWeight:700,color:"#fff",textDecoration:"none"}}>
            med<span style={{color:"#7F77DD",fontWeight:300}}>oqa</span>
          </a>
          <div style={{fontSize:"11px",color:"#6b6fa8",marginTop:"4px"}}>{m.baslik}</div>
        </div>
        {kullanici && (
          <div style={{padding:"16px 20px",borderBottom:"1px solid #1e1b4b"}}>
            <div style={{width:"36px",height:"36px",background:"#534AB7",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"14px",marginBottom:"8px"}}>
              {kullanici.ad?.[0]?.toUpperCase()||"H"}
            </div>
            <div style={{fontSize:"13px",fontWeight:600,color:"#fff"}}>{kullanici.ad} {kullanici.soyad}</div>
            <div style={{fontSize:"11px",color:"#6b6fa8"}}>{kullanici.email}</div>
          </div>
        )}
        {/* Dil seçici */}
        <div style={{padding:"12px 20px",borderBottom:"1px solid #1e1b4b",display:"flex",gap:"6px"}}>
          {(["tr","en","de"] as const).map(d=>(
            <span key={d} onClick={()=>dilDegistir(d)} style={{fontSize:"10px",padding:"3px 8px",border:`1px solid ${dil===d?"#534AB7":"#2a2a4e"}`,borderRadius:"4px",color:dil===d?"#7F77DD":"#aab4c8",cursor:"pointer",textTransform:"uppercase"}}>{d}</span>
          ))}
        </div>
        <div style={{padding:"16px 12px",flex:1}}>
          {(["ozet","talepler","teklifler","profil","mesajlar"] as const).map(id=>(
            <div key={id} onClick={()=>setAktifMenu(id)} style={{padding:"10px 12px",borderRadius:"8px",cursor:"pointer",marginBottom:"4px",background:aktifMenu===id?"#534AB7":"transparent",color:aktifMenu===id?"#fff":"#8b8fc8",fontSize:"13px"}}>
              {m.menu[id]}
            </div>
          ))}
        </div>
        <div style={{padding:"0 12px 20px"}}>
          <a href="/teklif" style={{display:"block",textAlign:"center",background:"#534AB7",color:"#fff",padding:"10px",borderRadius:"8px",fontSize:"13px",textDecoration:"none",marginBottom:"8px"}}>{m.yeniTalep}</a>
          <button onClick={cikisYap} style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid #2a2a4e",borderRadius:"8px",color:"#8b8fc8",fontSize:"13px",cursor:"pointer"}}>{m.cikisYap}</button>
        </div>
      </div>

      {/* İçerik */}
      <div style={{flex:1,padding:"32px",overflow:"auto"}}>
        {mesaj && (
          <div style={{background:mesaj.includes("Hata")?"#fff0f0":"#f0fff4",border:`1px solid ${mesaj.includes("Hata")?"#fcc":"#9f9"}`,borderRadius:"8px",padding:"10px 16px",marginBottom:"16px",fontSize:"13px",color:mesaj.includes("Hata")?"#c00":"#0a7a3a"}}>{mesaj}</div>
        )}
        {yukleniyor ? (
          <div style={{textAlign:"center",padding:"64px",color:"#888"}}>Yükleniyor...</div>
        ) : (
          <>
            {aktifMenu==="ozet" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.hosgeldin}, {kullanici?.ad}! 👋</h1>
                <p style={{fontSize:"14px",color:"#888",marginBottom:"28px"}}>{m.tedaviSureci}</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px",marginBottom:"32px"}}>
                  {[
                    {baslik:m.talepSayisi,deger:talepler.length,renk:"#534AB7"},
                    {baslik:m.teklifSayisi,deger:teklifler.length,renk:"#0a7a3a"},
                    {baslik:m.bekleyen,deger:talepler.filter(t=>t.durum==="beklemede").length,renk:"#BA7517"},
                  ].map(k=>(
                    <div key={k.baslik} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px"}}>
                      <div style={{fontSize:"32px",fontWeight:700,color:k.renk,marginBottom:"8px"}}>{k.deger}</div>
                      <div style={{fontSize:"13px",color:"#888"}}>{k.baslik}</div>
                    </div>
                  ))}
                </div>
                {talepler.length===0 && (
                  <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"48px",textAlign:"center"}}>
                    <div style={{fontSize:"48px",marginBottom:"16px"}}>🏥</div>
                    <h3 style={{fontSize:"18px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.teklifYok}</h3>
                    <p style={{fontSize:"13px",color:"#888",marginBottom:"20px"}}>{m.teklifYokAcik}</p>
                    <a href="/teklif" style={{background:"#534AB7",color:"#fff",padding:"12px 24px",borderRadius:"8px",fontSize:"14px",textDecoration:"none",fontWeight:600}}>{m.teklifOlustur}</a>
                  </div>
                )}
              </div>
            )}

            {aktifMenu==="talepler" && (
              <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px"}}>
                  <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a"}}>{m.taleplerim}</h1>
                  <a href="/teklif" style={{background:"#534AB7",color:"#fff",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",textDecoration:"none"}}>{m.yeniTalepBtn}</a>
                </div>
                {talepler.length===0 ? (
                  <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"48px",textAlign:"center"}}>
                    <div style={{fontSize:"13px",color:"#888"}}>{m.talepYok}</div>
                  </div>
                ) : (
                  <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                    {talepler.map(t=>{
                      const d=durumBadge(t.durum);
                      return (
                        <div key={t.id} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                            <div>
                              <div style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"4px"}}>{t.tedavi_turu}</div>
                              <div style={{fontSize:"13px",color:"#888",marginBottom:"8px"}}>{t.aciklama}</div>
                              <div style={{fontSize:"12px",color:"#888"}}>{new Date(t.olusturma_tarihi).toLocaleDateString(dil==="tr"?"tr-TR":dil==="de"?"de-DE":"en-GB")}</div>
                            </div>
                            <span style={{fontSize:"11px",padding:"4px 12px",borderRadius:"20px",background:d.bg,color:d.color}}>{d.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {aktifMenu==="teklifler" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"24px"}}>{m.gelenTeklifler}</h1>
                {teklifler.length===0 ? (
                  <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"48px",textAlign:"center"}}>
                    <div style={{fontSize:"48px",marginBottom:"16px"}}>📋</div>
                    <div style={{fontSize:"13px",color:"#888"}}>{m.gelenYok}</div>
                  </div>
                ) : (
                  <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                    {teklifler.map(t=>{
                      const d=durumBadge(t.durum);
                      return (
                        <div key={t.id} onClick={()=>setAcikTeklif(t)} style={{background:"#fff",border:`2px solid ${t.durum==="onaylandi"?"#059669":t.durum==="reddedildi"?"#fcc":"#EEEDFE"}`,borderRadius:"14px",padding:"18px",cursor:"pointer"}}
                          onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.005)")}
                          onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}
                        >
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div>
                              <div style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"4px"}}>🏥 {t.profiles?.ad} {t.profiles?.soyad}</div>
                              {t.profiles?.konum_adres && <div style={{fontSize:"12px",color:"#94a3b8"}}>📍 {t.profiles.konum_adres}</div>}
                              <div style={{fontSize:"12px",color:"#94a3b8",marginTop:"2px"}}>{new Date(t.olusturma_tarihi).toLocaleDateString(dil==="tr"?"tr-TR":dil==="de"?"de-DE":"en-GB")}</div>
                            </div>
                            <div style={{textAlign:"right"}}>
                              <div style={{fontSize:"20px",fontWeight:700,color:"#534AB7",marginBottom:"4px"}}>{t.toplam_fiyat||t.fiyat} EUR</div>
                              <span style={{fontSize:"11px",padding:"3px 10px",borderRadius:"20px",fontWeight:600,background:d.bg,color:d.color}}>{d.label}</span>
                            </div>
                          </div>
                          <div style={{fontSize:"12px",color:"#534AB7",marginTop:"8px",fontWeight:500}}>{m.detayGor}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {aktifMenu==="profil" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"24px"}}>{m.profilim}</h1>
                <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"28px",maxWidth:"500px"}}>
                  {[
                    {etiket:m.ad,deger:kullanici?.ad},
                    {etiket:m.soyad,deger:kullanici?.soyad},
                    {etiket:m.eposta,deger:kullanici?.email},
                    {etiket:m.hesapTuru,deger:kullanici?.hesap_turu},
                  ].map(item=>(
                    <div key={item.etiket} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #f5f5f5"}}>
                      <span style={{fontSize:"13px",color:"#888"}}>{item.etiket}</span>
                      <span style={{fontSize:"13px",fontWeight:600,color:"#12103a"}}>{item.deger}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {aktifMenu==="mesajlar" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.mesajlar}</h1>
                <p style={{fontSize:"14px",color:"#888",marginBottom:"24px"}}>{m.mesajlarAcik}</p>
                <a href="/mesajlar" style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#534AB7",color:"#fff",padding:"12px 24px",borderRadius:"10px",fontSize:"14px",textDecoration:"none",fontWeight:600}}>{m.mesajlarGit}</a>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
