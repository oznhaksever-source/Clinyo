"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";

const M = {
  tr: {
    panel:"Transfer Paneli",
    menu:{ozet:"🏠 Genel Özet",profil:"✏️ Profil Düzenle",araclar:"🚗 Araç & Fiyat Listesi",belgeler:"📄 Belgelerim",firmaProfil:"🏢 Firma Profilim"},
    cikis:"Çıkış Yap",onaylandi:"✓ Onaylandı",onayBekliyor:"⏳ Onay Bekleniyor",
    hosgeldin:"Hoş Geldiniz",panelAcik:"Transfer panelinizden profil ve araçlarınızı yönetebilirsiniz.",
    onayBekle:"Hesabınız Onay Bekliyor",onayBekleAcik:"Transfer firması hesabınız admin tarafından henüz onaylanmamış.",
    toplamArac:"Toplam Araç",aktifArac:"Aktif Araç",pasifArac:"Pasif Araç",
    profilDuzenle:"Profil Düzenle",aracEkle:"+ Araç Ekle",
    kapakFoto:"Kapak Fotoğrafı",firmaBilgileri:"Firma Bilgileri",
    tanitim:"Firma Tanıtım Yazısı",tanitimPH:"Firmanız hakkında kısa bir tanıtım yazısı...",
    telefon:"Telefon",website:"Website",adres:"Adres / Hizmet Bölgesi",
    googleMaps:"Google Maps URL",sosyalMedya:"Sosyal Medya",kaydet:"Profili Kaydet",
    aracFiyat:"Araç & Fiyat Listesi",yeniArac:"Yeni Araç Ekle",
    aracTipi:"Araç Tipi *",kapasite:"Kapasite (Kişi)",
    tekYonFiyat:"Tek Yön Fiyat *",paraBirimi:"Para Birimi",
    aciklama:"Açıklama",aciklamaPH:"Araç özellikleri, dahil olan hizmetler...",
    aracEkleBtn:"+ Araç Ekle",mevcutAraclar:"Mevcut Araçlar",
    aracSutun:{arac:"Araç",kapasite:"Kapasite",fiyat:"Fiyat",durum:"Durum",islem:"İşlem"},
    kisi:"kişi",tekYon:"/tek yön",aktif:"Aktif",pasif:"Pasif",
    pasife:"Pasife Al",aktife:"Aktife Al",sil:"Sil",aracYok:"Henüz araç eklenmemiş.",
    firmaProfilim:"Firma Profilim",firmaAdi:"Firma Adı",eposta:"E-posta",durum:"Durum",
    toplamAracLabel:"Toplam Araç",hizmetBolgesi:"Hizmet Bölgesi",
    haritaGor:"📍 Google Maps'te Görüntüle",
    yukleniyor:"Yükleniyor...",
    profilKaydedildi:"Profil kaydedildi!",kapakYuklendi:"Kapak fotoğrafı yüklendi!",
    aracEklendi:"Araç eklendi!",fiyatZorunlu:"Fiyat zorunludur!",
    silOnay:"Bu aracı silmek istediğinize emin misiniz?",
    belgelerBaslik:"📄 Belgelerim",belgeAcik:"Onay sürecinde incelenecek belgelerinizi yükleyin. Tüm belgeler zorunludur.",
    belgeYukleniyor:"⏳ Belge yükleniyor...",belgeYuklendi:"✅ Belge başarıyla yüklendi!",
    zorunlu:"Zorunlu",goruntule:"📎 Belgeyi Görüntüle",guncelle:"Güncelle",yukle:"Yükle",belgeSil:"Sil",
    belgeTamamlandi:"✅ Tüm belgeler yüklendi! Admin onayı bekleniyor.",
  },
  en: {
    panel:"Transfer Panel",
    menu:{ozet:"🏠 Overview",profil:"✏️ Edit Profile",araclar:"🚗 Vehicle & Price List",belgeler:"📄 My Documents",firmaProfil:"🏢 Company Profile"},
    cikis:"Sign Out",onaylandi:"✓ Approved",onayBekliyor:"⏳ Awaiting Approval",
    hosgeldin:"Welcome",panelAcik:"Manage your profile and vehicles from the transfer panel.",
    onayBekle:"Account Awaiting Approval",onayBekleAcik:"Your transfer company account has not been approved by the admin yet.",
    toplamArac:"Total Vehicles",aktifArac:"Active Vehicles",pasifArac:"Inactive Vehicles",
    profilDuzenle:"Edit Profile",aracEkle:"+ Add Vehicle",
    kapakFoto:"Cover Photo",firmaBilgileri:"Company Information",
    tanitim:"Company Introduction",tanitimPH:"A short introduction about your company...",
    telefon:"Phone",website:"Website",adres:"Address / Service Area",
    googleMaps:"Google Maps URL",sosyalMedya:"Social Media",kaydet:"Save Profile",
    aracFiyat:"Vehicle & Price List",yeniArac:"Add New Vehicle",
    aracTipi:"Vehicle Type *",kapasite:"Capacity (Persons)",
    tekYonFiyat:"One-Way Price *",paraBirimi:"Currency",
    aciklama:"Description",aciklamaPH:"Vehicle features, included services...",
    aracEkleBtn:"+ Add Vehicle",mevcutAraclar:"Current Vehicles",
    aracSutun:{arac:"Vehicle",kapasite:"Capacity",fiyat:"Price",durum:"Status",islem:"Action"},
    kisi:"persons",tekYon:"/one-way",aktif:"Active",pasif:"Inactive",
    pasife:"Deactivate",aktife:"Activate",sil:"Delete",aracYok:"No vehicles added yet.",
    firmaProfilim:"Company Profile",firmaAdi:"Company Name",eposta:"Email",durum:"Status",
    toplamAracLabel:"Total Vehicles",hizmetBolgesi:"Service Area",
    haritaGor:"📍 View on Google Maps",
    yukleniyor:"Loading...",
    profilKaydedildi:"Profile saved!",kapakYuklendi:"Cover photo uploaded!",
    aracEklendi:"Vehicle added!",fiyatZorunlu:"Price is required!",
    silOnay:"Are you sure you want to delete this vehicle?",
    belgelerBaslik:"📄 My Documents",belgeAcik:"Upload your documents for the approval process. All documents are required.",
    belgeYukleniyor:"⏳ Uploading...",belgeYuklendi:"✅ Document uploaded successfully!",
    zorunlu:"Required",goruntule:"📎 View Document",guncelle:"Update",yukle:"Upload",belgeSil:"Delete",
    belgeTamamlandi:"✅ All documents uploaded! Awaiting admin approval.",
  },
  de: {
    panel:"Transfer-Bereich",
    menu:{ozet:"🏠 Übersicht",profil:"✏️ Profil bearbeiten",araclar:"🚗 Fahrzeug & Preise",belgeler:"📄 Dokumente",firmaProfil:"🏢 Firmenprofil"},
    cikis:"Abmelden",onaylandi:"✓ Genehmigt",onayBekliyor:"⏳ Ausstehend",
    hosgeldin:"Willkommen",panelAcik:"Verwalten Sie Ihr Profil und Ihre Fahrzeuge.",
    onayBekle:"Genehmigung ausstehend",onayBekleAcik:"Ihr Transfer-Firmenkonto wurde noch nicht genehmigt.",
    toplamArac:"Fahrzeuge gesamt",aktifArac:"Aktive Fahrzeuge",pasifArac:"Inaktive Fahrzeuge",
    profilDuzenle:"Profil bearbeiten",aracEkle:"+ Fahrzeug hinzufügen",
    kapakFoto:"Titelbild",firmaBilgileri:"Firmeninformationen",
    tanitim:"Firmenvorstellung",tanitimPH:"Eine kurze Vorstellung Ihrer Firma...",
    telefon:"Telefon",website:"Website",adres:"Adresse / Servicegebiet",
    googleMaps:"Google Maps URL",sosyalMedya:"Soziale Medien",kaydet:"Profil speichern",
    aracFiyat:"Fahrzeug & Preisliste",yeniArac:"Neues Fahrzeug hinzufügen",
    aracTipi:"Fahrzeugtyp *",kapasite:"Kapazität (Personen)",
    tekYonFiyat:"Einzelfahrt Preis *",paraBirimi:"Währung",
    aciklama:"Beschreibung",aciklamaPH:"Fahrzeugausstattung, inkludierte Leistungen...",
    aracEkleBtn:"+ Fahrzeug hinzufügen",mevcutAraclar:"Aktuelle Fahrzeuge",
    aracSutun:{arac:"Fahrzeug",kapasite:"Kapazität",fiyat:"Preis",durum:"Status",islem:"Aktion"},
    kisi:"Personen",tekYon:"/Einzelfahrt",aktif:"Aktiv",pasif:"Inaktiv",
    pasife:"Deaktivieren",aktife:"Aktivieren",sil:"Löschen",aracYok:"Noch keine Fahrzeuge hinzugefügt.",
    firmaProfilim:"Firmenprofil",firmaAdi:"Firmenname",eposta:"E-Mail",durum:"Status",
    toplamAracLabel:"Fahrzeuge gesamt",hizmetBolgesi:"Servicegebiet",
    haritaGor:"📍 Auf Google Maps anzeigen",
    yukleniyor:"Wird geladen...",
    profilKaydedildi:"Profil gespeichert!",kapakYuklendi:"Titelbild hochgeladen!",
    aracEklendi:"Fahrzeug hinzugefügt!",fiyatZorunlu:"Preis ist erforderlich!",
    silOnay:"Möchten Sie dieses Fahrzeug wirklich löschen?",
    belgelerBaslik:"📄 Meine Dokumente",belgeAcik:"Laden Sie Ihre Dokumente hoch. Alle Dokumente sind erforderlich.",
    belgeYukleniyor:"⏳ Wird hochgeladen...",belgeYuklendi:"✅ Dokument erfolgreich hochgeladen!",
    zorunlu:"Erforderlich",goruntule:"📎 Dokument anzeigen",guncelle:"Aktualisieren",yukle:"Hochladen",belgeSil:"Löschen",
    belgeTamamlandi:"✅ Alle Dokumente hochgeladen! Warte auf Admin-Genehmigung.",
  },
};

const ZORUNLU_BELGELER = [
  {id:"tursab_belgesi",ad:"TURSAB A Grubu Seyahat Acentası Belgesi",aciklama:"Türkiye Seyahat Acentaları Birliği A grubu işletme belgesi"},
  {id:"saglik_turizmi_yetki",ad:"Sağlık Turizmi Yetki Belgesi",aciklama:"Sağlık Bakanlığı Uluslararası Sağlık Turizmi Aracı Kuruluş Yetki Belgesi"},
  {id:"arac_ruhsatlari",ad:"Ticari Araç Ruhsatları",aciklama:"Tüm araçların güncel ruhsat ve muayene belgeleri"},
  {id:"psikoteknik",ad:"Şoför Psikoteknik Belgeleri",aciklama:"Her şoför için geçerli psikoteknik belgesi"},
  {id:"trafik_sigorta",ad:"Trafik Sigortası ve Kasko",aciklama:"Tüm araçlar için güncel zorunlu trafik sigortası ve kasko poliçeleri"},
  {id:"vergi_levhasi",ad:"Vergi Levhası",aciklama:"Güncel vergi levhası"},
  {id:"ticaret_sicil",ad:"Ticaret Sicil Belgesi",aciklama:"Güncel ticaret sicil gazetesi"},
];

const ARAC_TIPLERI = ["Sedan","Van","VIP Sedan","VIP Van","Limuzin","Minibüs","VIP Minibüs","Otobüs"];

export default function TransferPanel() {
  const supabase = createClient();
  const { dil, dilDegistir } = useDil();
  const m = M[dil as keyof typeof M] || M.tr;

  const [aktifMenu, setAktifMenu] = useState("ozet");
  const [kullanici, setKullanici] = useState<any>(null);
  const [araclar, setAraclar] = useState<any[]>([]);
  const [belgeler, setBelgeler] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [mesaj, setMesaj] = useState("");
  const [belgeYukleniyor, setBelgeYukleniyor] = useState(false);

  const [profil, setProfil] = useState({
    tanitim_yazisi:"",telefon:"",website:"",
    instagram:"",facebook:"",
    google_maps_url:"",konum_adres:"",
  });

  const [yeniArac, setYeniArac] = useState({
    arac_tipi:"Sedan",kapasite:"4",fiyat:"",para_birimi:"EUR",aciklama:"",
  });

  useEffect(()=>{ veriYukle(); },[]);

  async function veriYukle() {
    setYukleniyor(true);
    const {data:{user}} = await supabase.auth.getUser();
    if (!user) { window.location.href="/giris"; return; }
    const {data:profile} = await supabase.from("profiles").select("*").eq("id",user.id).single();
    setKullanici(profile);
    if (profile) setProfil({
      tanitim_yazisi:profile.tanitim_yazisi||"",telefon:profile.telefon||"",website:profile.website||"",
      instagram:profile.instagram||"",facebook:profile.facebook||"",
      google_maps_url:profile.google_maps_url||"",konum_adres:profile.konum_adres||"",
    });
    const {data:aracData} = await supabase.from("transfer_araclar").select("*").eq("transfer_id",user.id).order("olusturma_tarihi");
    setAraclar(aracData||[]);
    const {data:belgeData} = await supabase.from("belgeler").select("*").eq("kullanici_id",user.id);
    setBelgeler(belgeData||[]);
    setYukleniyor(false);
  }

  function mesajGoster(msg:string) { setMesaj(msg); setTimeout(()=>setMesaj(""),3000); }

  async function fotografYukle(file:File, klasor:string) {
    const {data:{user}} = await supabase.auth.getUser();
    const dosyaAdi = `${user?.id}/${klasor}/${Date.now()}_${file.name}`;
    const {error} = await supabase.storage.from("medoqa-images").upload(dosyaAdi,file);
    if (error) return null;
    const {data:url} = supabase.storage.from("medoqa-images").getPublicUrl(dosyaAdi);
    return url.publicUrl;
  }

  async function profilKaydet() {
    const {data:{user}} = await supabase.auth.getUser();
    const {error} = await supabase.from("profiles").update(profil).eq("id",user?.id);
    if (error) mesajGoster("Hata: "+error.message);
    else { mesajGoster(m.profilKaydedildi); veriYukle(); }
  }

  async function kapakFotografYukle(file:File) {
    const url = await fotografYukle(file,"kapak");
    if (url) {
      const {data:{user}} = await supabase.auth.getUser();
      await supabase.from("profiles").update({kapak_fotograf:url}).eq("id",user?.id);
      veriYukle(); mesajGoster(m.kapakYuklendi);
    }
  }

  async function aracEkle() {
    if (!yeniArac.fiyat) { mesajGoster(m.fiyatZorunlu); return; }
    const {data:{user}} = await supabase.auth.getUser();
    const {error} = await supabase.from("transfer_araclar").insert({
      transfer_id:user?.id,arac_tipi:yeniArac.arac_tipi,
      kapasite:parseInt(yeniArac.kapasite),fiyat:parseFloat(yeniArac.fiyat),
      para_birimi:yeniArac.para_birimi,aciklama:yeniArac.aciklama,
    });
    if (error) mesajGoster("Hata: "+error.message);
    else { mesajGoster(m.aracEklendi); setYeniArac({arac_tipi:"Sedan",kapasite:"4",fiyat:"",para_birimi:"EUR",aciklama:""}); veriYukle(); }
  }

  async function aracSil(id:string) {
    if (!confirm(m.silOnay)) return;
    await supabase.from("transfer_araclar").delete().eq("id",id);
    veriYukle();
  }

  async function aracAktifToggle(id:string, aktif:boolean) {
    await supabase.from("transfer_araclar").update({aktif:!aktif}).eq("id",id);
    veriYukle();
  }

  async function belgeYukle(belge_turu:string, file:File) {
    setBelgeYukleniyor(true);
    const {data:{user}} = await supabase.auth.getUser();
    if (!user) { mesajGoster("Hata: Oturum bulunamadı!"); setBelgeYukleniyor(false); return; }
    const dosyaAdi = `belgeler/${user.id}/${belge_turu}_${Date.now()}_${file.name}`;
    const {error:upErr} = await supabase.storage.from("medoqa-images").upload(dosyaAdi,file,{upsert:true});
    if (upErr) { mesajGoster("Hata: "+upErr.message); setBelgeYukleniyor(false); return; }
    const {data:urlData} = supabase.storage.from("medoqa-images").getPublicUrl(dosyaAdi);
    const mevcut = belgeler.find(b=>b.belge_turu===belge_turu);
    if (mevcut) {
      await supabase.from("belgeler").update({belge_url:urlData.publicUrl,yukleme_tarihi:new Date().toISOString()}).eq("id",mevcut.id);
    } else {
      await supabase.from("belgeler").insert({kullanici_id:user.id,belge_turu,belge_url:urlData.publicUrl});
    }
    mesajGoster(m.belgeYuklendi); veriYukle(); setBelgeYukleniyor(false);
  }

  async function belgeSil(id:string) {
    await supabase.from("belgeler").delete().eq("id",id); veriYukle();
  }

  async function cikisYap() {
    await supabase.auth.signOut(); window.location.href="/giris";
  }

  const inputStyle:React.CSSProperties = {width:"100%",border:"1px solid #e5e7eb",borderRadius:"8px",padding:"9px 12px",fontSize:"13px",outline:"none",boxSizing:"border-box"};
  const labelStyle:React.CSSProperties = {fontSize:"12px",color:"#888",display:"block",marginBottom:"4px"};
  const cardStyle:React.CSSProperties = {background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"24px",marginBottom:"20px"};

  return (
    <main style={{minHeight:"100vh",background:"#f9fafb",fontFamily:"sans-serif",display:"flex"}}>
      {/* Sidebar */}
      <div style={{width:"220px",background:"#12103a",display:"flex",flexDirection:"column",padding:"24px 0",flexShrink:0}}>
        <div style={{padding:"0 20px 24px",borderBottom:"1px solid #1e1b4b"}}>
          <a href="/" style={{fontSize:"20px",fontWeight:700,color:"#fff",textDecoration:"none"}}>
            med<span style={{color:"#7F77DD",fontWeight:300}}>oqa</span>
          </a>
          <div style={{fontSize:"11px",color:"#6b6fa8",marginTop:"4px"}}>{m.panel}</div>
        </div>
        {kullanici && (
          <div style={{padding:"16px 20px",borderBottom:"1px solid #1e1b4b"}}>
            <div style={{width:"36px",height:"36px",background:"#BA7517",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"14px",marginBottom:"8px"}}>
              {kullanici.ad?.[0]?.toUpperCase()||"T"}
            </div>
            <div style={{fontSize:"13px",fontWeight:600,color:"#fff"}}>{kullanici.ad} {kullanici.soyad}</div>
            <div style={{fontSize:"11px",color:kullanici.onaylandi?"#7F77DD":"#BA7517",marginTop:"2px"}}>
              {kullanici.onaylandi ? m.onaylandi : m.onayBekliyor}
            </div>
          </div>
        )}
        {/* Dil seçici */}
        <div style={{padding:"8px 16px",borderBottom:"1px solid #1e1b4b",display:"flex",gap:"5px"}}>
          {(["tr","en","de"] as const).map(d=>(
            <span key={d} onClick={()=>dilDegistir(d)} style={{fontSize:"10px",padding:"3px 8px",border:`1px solid ${dil===d?"#534AB7":"#2a2a4e"}`,borderRadius:"4px",color:dil===d?"#7F77DD":"#aab4c8",cursor:"pointer",textTransform:"uppercase"}}>{d}</span>
          ))}
        </div>
        <div style={{padding:"20px 12px",flex:1}}>
          {Object.entries(m.menu).map(([id,ad])=>(
            <div key={id} onClick={()=>setAktifMenu(id)} style={{padding:"10px 12px",borderRadius:"8px",cursor:"pointer",marginBottom:"4px",background:aktifMenu===id?"#534AB7":"transparent",color:aktifMenu===id?"#fff":"#8b8fc8",fontSize:"13px"}}>
              {ad as string}
            </div>
          ))}
        </div>
        <div style={{padding:"0 12px 20px"}}>
          <button onClick={cikisYap} style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid #2a2a4e",borderRadius:"8px",color:"#8b8fc8",fontSize:"13px",cursor:"pointer"}}>{m.cikis}</button>
        </div>
      </div>

      {/* İçerik */}
      <div style={{flex:1,padding:"32px",overflow:"auto"}}>
        {mesaj && (
          <div style={{background:mesaj.includes("Hata")?"#fff0f0":"#f0fff4",border:`1px solid ${mesaj.includes("Hata")?"#fcc":"#9f9"}`,borderRadius:"8px",padding:"10px 16px",marginBottom:"16px",fontSize:"13px",color:mesaj.includes("Hata")?"#c00":"#0a7a3a"}}>
            {mesaj}
          </div>
        )}
        {yukleniyor ? (
          <div style={{textAlign:"center",padding:"64px",color:"#888"}}>{m.yukleniyor}</div>
        ) : (
          <>
            {kullanici && !kullanici.onaylandi && (
              <div style={{background:"#fff8e1",border:"1px solid #f0c040",borderRadius:"12px",padding:"20px",marginBottom:"24px"}}>
                <h3 style={{fontSize:"15px",fontWeight:700,color:"#BA7517",marginBottom:"8px"}}>⏳ {m.onayBekle}</h3>
                <p style={{fontSize:"13px",color:"#666"}}>{m.onayBekleAcik}</p>
              </div>
            )}

            {/* ÖZET */}
            {aktifMenu==="ozet" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.hosgeldin}, {kullanici?.ad}! 👋</h1>
                <p style={{fontSize:"14px",color:"#888",marginBottom:"28px"}}>{m.panelAcik}</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px",marginBottom:"32px"}}>
                  {[
                    {baslik:m.toplamArac,deger:araclar.length,renk:"#534AB7"},
                    {baslik:m.aktifArac,deger:araclar.filter(a=>a.aktif).length,renk:"#0a7a3a"},
                    {baslik:m.pasifArac,deger:araclar.filter(a=>!a.aktif).length,renk:"#BA7517"},
                  ].map(k=>(
                    <div key={k.baslik} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px"}}>
                      <div style={{fontSize:"28px",fontWeight:700,color:k.renk,marginBottom:"8px"}}>{k.deger}</div>
                      <div style={{fontSize:"13px",color:"#888"}}>{k.baslik}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:"12px"}}>
                  <button onClick={()=>setAktifMenu("profil")} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>{m.profilDuzenle}</button>
                  <button onClick={()=>setAktifMenu("araclar")} style={{background:"#fff",color:"#534AB7",border:"1px solid #534AB7",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>{m.aracEkle}</button>
                </div>
              </div>
            )}

            {/* PROFİL DÜZENLE */}
            {aktifMenu==="profil" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"24px"}}>{m.profilDuzenle}</h1>
                <div style={cardStyle}>
                  <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",marginBottom:"16px"}}>{m.kapakFoto}</h2>
                  {kullanici?.kapak_fotograf && <img src={kullanici.kapak_fotograf} alt="Kapak" style={{width:"100%",maxHeight:"200px",objectFit:"cover",borderRadius:"8px",marginBottom:"12px"}}/>}
                  <input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0];if(f)kapakFotografYukle(f);}} style={inputStyle}/>
                </div>
                <div style={cardStyle}>
                  <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",marginBottom:"16px"}}>{m.firmaBilgileri}</h2>
                  <div style={{marginBottom:"12px"}}>
                    <label style={labelStyle}>{m.tanitim}</label>
                    <textarea rows={4} placeholder={m.tanitimPH} value={profil.tanitim_yazisi} onChange={e=>setProfil({...profil,tanitim_yazisi:e.target.value})} style={{...inputStyle,resize:"none"}}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                    <div><label style={labelStyle}>{m.telefon}</label><input type="text" value={profil.telefon} onChange={e=>setProfil({...profil,telefon:e.target.value})} style={inputStyle}/></div>
                    <div><label style={labelStyle}>{m.website}</label><input type="text" value={profil.website} onChange={e=>setProfil({...profil,website:e.target.value})} style={inputStyle}/></div>
                  </div>
                  <div style={{marginBottom:"12px"}}>
                    <label style={labelStyle}>{m.adres}</label>
                    <input type="text" value={profil.konum_adres} onChange={e=>setProfil({...profil,konum_adres:e.target.value})} style={inputStyle}/>
                  </div>
                  <div style={{marginBottom:"12px"}}>
                    <label style={labelStyle}>{m.googleMaps}</label>
                    <input type="text" value={profil.google_maps_url} onChange={e=>setProfil({...profil,google_maps_url:e.target.value})} style={inputStyle}/>
                  </div>
                </div>
                <div style={cardStyle}>
                  <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",marginBottom:"16px"}}>{m.sosyalMedya}</h2>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
                    <div><label style={labelStyle}>Instagram</label><input type="text" value={profil.instagram} onChange={e=>setProfil({...profil,instagram:e.target.value})} style={inputStyle}/></div>
                    <div><label style={labelStyle}>Facebook</label><input type="text" value={profil.facebook} onChange={e=>setProfil({...profil,facebook:e.target.value})} style={inputStyle}/></div>
                  </div>
                </div>
                <button onClick={profilKaydet} style={{background:"#534AB7",color:"#fff",border:"none",padding:"12px 32px",borderRadius:"8px",fontSize:"14px",cursor:"pointer",fontWeight:600}}>{m.kaydet}</button>
              </div>
            )}

            {/* ARAÇLAR */}
            {aktifMenu==="araclar" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"24px"}}>{m.aracFiyat}</h1>
                <div style={cardStyle}>
                  <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",marginBottom:"16px"}}>{m.yeniArac}</h2>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                    <div>
                      <label style={labelStyle}>{m.aracTipi}</label>
                      <select value={yeniArac.arac_tipi} onChange={e=>setYeniArac({...yeniArac,arac_tipi:e.target.value})} style={{...inputStyle,background:"#fff"}}>
                        {ARAC_TIPLERI.map(a=><option key={a}>{a}</option>)}
                      </select>
                    </div>
                    <div><label style={labelStyle}>{m.kapasite}</label><input type="number" placeholder="4" value={yeniArac.kapasite} onChange={e=>setYeniArac({...yeniArac,kapasite:e.target.value})} style={inputStyle}/></div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                    <div><label style={labelStyle}>{m.tekYonFiyat}</label><input type="number" placeholder="0" value={yeniArac.fiyat} onChange={e=>setYeniArac({...yeniArac,fiyat:e.target.value})} style={inputStyle}/></div>
                    <div>
                      <label style={labelStyle}>{m.paraBirimi}</label>
                      <select value={yeniArac.para_birimi} onChange={e=>setYeniArac({...yeniArac,para_birimi:e.target.value})} style={{...inputStyle,background:"#fff"}}>
                        <option>EUR</option><option>USD</option><option>TRY</option><option>GBP</option>
                      </select>
                    </div>
                  </div>
                  <div style={{marginBottom:"16px"}}>
                    <label style={labelStyle}>{m.aciklama}</label>
                    <textarea rows={2} placeholder={m.aciklamaPH} value={yeniArac.aciklama} onChange={e=>setYeniArac({...yeniArac,aciklama:e.target.value})} style={{...inputStyle,resize:"none"}}/>
                  </div>
                  <button onClick={aracEkle} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 24px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:600}}>{m.aracEkleBtn}</button>
                </div>
                <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",overflow:"hidden"}}>
                  <div style={{padding:"16px 20px",borderBottom:"1px solid #EEEDFE"}}>
                    <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",margin:0}}>{m.mevcutAraclar} ({araclar.length})</h2>
                  </div>
                  <table style={{width:"100%",borderCollapse:"collapse"}}>
                    <thead>
                      <tr style={{background:"#f9fafb"}}>
                        {[m.aracSutun.arac,m.aracSutun.kapasite,m.aracSutun.fiyat,m.aracSutun.durum,m.aracSutun.islem].map(h=>(
                          <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:"12px",color:"#888",fontWeight:600}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {araclar.map((a,i)=>(
                        <tr key={a.id} style={{borderTop:"1px solid #EEEDFE",background:i%2===0?"#fff":"#fafafa",opacity:a.aktif?1:0.5}}>
                          <td style={{padding:"10px 16px"}}>
                            <div style={{fontSize:"13px",fontWeight:600,color:"#12103a"}}>{a.arac_tipi}</div>
                            {a.aciklama && <div style={{fontSize:"11px",color:"#888",marginTop:"2px"}}>{a.aciklama}</div>}
                          </td>
                          <td style={{padding:"10px 16px",fontSize:"13px",color:"#888"}}>{a.kapasite} {m.kisi}</td>
                          <td style={{padding:"10px 16px",fontSize:"14px",fontWeight:700,color:"#534AB7"}}>{a.fiyat} {a.para_birimi}{m.tekYon}</td>
                          <td style={{padding:"10px 16px"}}>
                            <span style={{fontSize:"11px",padding:"3px 10px",borderRadius:"20px",background:a.aktif?"#f0fff4":"#f9fafb",color:a.aktif?"#0a7a3a":"#888"}}>
                              {a.aktif ? m.aktif : m.pasif}
                            </span>
                          </td>
                          <td style={{padding:"10px 16px"}}>
                            <div style={{display:"flex",gap:"6px"}}>
                              <button onClick={()=>aracAktifToggle(a.id,a.aktif)} style={{background:a.aktif?"#fff8e1":"#f0fff4",color:a.aktif?"#BA7517":"#0a7a3a",border:"none",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>
                                {a.aktif ? m.pasife : m.aktife}
                              </button>
                              <button onClick={()=>aracSil(a.id)} style={{background:"#fff0f0",color:"#c00",border:"none",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>{m.sil}</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {araclar.length===0 && <div style={{textAlign:"center",padding:"48px",color:"#888",fontSize:"13px"}}>{m.aracYok}</div>}
                </div>
              </div>
            )}

            {/* BELGELER */}
            {aktifMenu==="belgeler" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.belgelerBaslik}</h1>
                <p style={{fontSize:"14px",color:"#888",marginBottom:"24px"}}>{m.belgeAcik}</p>
                {belgeYukleniyor && <div style={{background:"#f0eeff",border:"1px solid #534AB7",borderRadius:"8px",padding:"10px 16px",marginBottom:"16px",fontSize:"13px",color:"#534AB7"}}>{m.belgeYukleniyor}</div>}
                <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
                  {ZORUNLU_BELGELER.map(zb=>{
                    const yuklendi = belgeler.find(b=>b.belge_turu===zb.id);
                    return (
                      <div key={zb.id} style={{background:"#fff",border:`1px solid ${yuklendi?"#059669":"#EEEDFE"}`,borderRadius:"14px",padding:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"4px"}}>
                            <span style={{fontSize:"18px"}}>{yuklendi?"✅":"📋"}</span>
                            <span style={{fontSize:"14px",fontWeight:700,color:"#0f0d2e"}}>{zb.ad}</span>
                            {!yuklendi && <span style={{fontSize:"10px",background:"#fff0f0",color:"#c00",padding:"2px 8px",borderRadius:"10px",fontWeight:600}}>{m.zorunlu}</span>}
                          </div>
                          <p style={{fontSize:"12px",color:"#94a3b8",margin:"0 0 0 28px"}}>{zb.aciklama}</p>
                          {yuklendi && (
                            <div style={{marginTop:"8px",marginLeft:"28px",display:"flex",alignItems:"center",gap:"12px"}}>
                              <a href={yuklendi.belge_url} target="_blank" rel="noreferrer" style={{fontSize:"12px",color:"#534AB7",textDecoration:"none",fontWeight:600}}>{m.goruntule}</a>
                              <span style={{fontSize:"11px",color:"#94a3b8"}}>{new Date(yuklendi.yukleme_tarihi).toLocaleDateString("tr-TR")}</span>
                            </div>
                          )}
                        </div>
                        <div style={{display:"flex",gap:"8px",flexShrink:0}}>
                          <label style={{background:yuklendi?"#f0eeff":"#534AB7",color:yuklendi?"#534AB7":"#fff",padding:"8px 16px",borderRadius:"8px",fontSize:"12px",cursor:"pointer",fontWeight:600}}>
                            {yuklendi ? m.guncelle : m.yukle}
                            <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f)belgeYukle(zb.id,f);}}/>
                          </label>
                          {yuklendi && <button onClick={()=>belgeSil(yuklendi.id)} style={{background:"#fff0f0",color:"#c00",border:"none",padding:"8px 12px",borderRadius:"8px",fontSize:"12px",cursor:"pointer"}}>{m.belgeSil}</button>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{marginTop:"24px",background:"#f0eeff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"16px 20px"}}>
                  <div style={{fontSize:"13px",fontWeight:700,color:"#534AB7",marginBottom:"6px"}}>{belgeler.length}/{ZORUNLU_BELGELER.length} belge yüklendi</div>
                  <div style={{background:"#e5e7eb",borderRadius:"6px",height:"8px",overflow:"hidden"}}>
                    <div style={{background:belgeler.length===ZORUNLU_BELGELER.length?"#059669":"#534AB7",height:"100%",width:`${(belgeler.length/ZORUNLU_BELGELER.length)*100}%`,transition:"width .3s",borderRadius:"6px"}}/>
                  </div>
                  {belgeler.length===ZORUNLU_BELGELER.length && <p style={{fontSize:"12px",color:"#059669",marginTop:"8px",fontWeight:600}}>{m.belgeTamamlandi}</p>}
                </div>
              </div>
            )}

            {/* FİRMA PROFİLİM */}
            {aktifMenu==="firmaProfil" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"24px"}}>{m.firmaProfilim}</h1>
                <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"28px",maxWidth:"500px"}}>
                  {[
                    {etiket:m.firmaAdi,deger:`${kullanici?.ad} ${kullanici?.soyad}`},
                    {etiket:m.eposta,deger:kullanici?.email},
                    {etiket:m.durum,deger:kullanici?.onaylandi?m.onaylandi:m.onayBekliyor},
                    {etiket:m.toplamAracLabel,deger:`${araclar.length}`},
                    {etiket:m.hizmetBolgesi,deger:kullanici?.konum_adres||"—"},
                  ].map(item=>(
                    <div key={item.etiket} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #f5f5f5"}}>
                      <span style={{fontSize:"13px",color:"#888"}}>{item.etiket}</span>
                      <span style={{fontSize:"13px",fontWeight:600,color:"#12103a"}}>{item.deger}</span>
                    </div>
                  ))}
                  {kullanici?.google_maps_url && (
                    <div style={{marginTop:"16px"}}>
                      <a href={kullanici.google_maps_url} target="_blank" rel="noreferrer" style={{background:"#534AB7",color:"#fff",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",textDecoration:"none",display:"inline-block"}}>
                        {m.haritaGor}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
