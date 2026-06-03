"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";

const M = {
  tr:{panel:"Otel Paneli",menu:{ozet:"🏠 Genel Özet",profil:"✏️ Profil Düzenle",odalar:"🛏️ Oda & Fiyat Listesi",belgeler:"📄 Belgelerim",otelProfil:"🏨 Otel Profilim"},cikis:"Çıkış Yap",onaylandi:"✓ Onaylandı",onayBekliyor:"⏳ Onay Bekleniyor",hosgeldin:"Hoş Geldiniz",panelAcik:"Otel panelinizden profil ve odalarınızı yönetebilirsiniz.",onayBekle:"Hesabınız Onay Bekliyor",onayBekleAcik:"Otel hesabınız admin tarafından henüz onaylanmamış.",toplamOda:"Toplam Oda",aktifOda:"Aktif Oda",pasifOda:"Pasif Oda",profilDuzenle:"Profil Düzenle",odaEkle:"+ Oda Ekle",kapakFoto:"Kapak Fotoğrafı",otelBilgileri:"Otel Bilgileri",tanitim:"Tanıtım Yazısı",tanitimPH:"Oteliniz hakkında kısa bir tanıtım yazısı...",telefon:"Telefon",website:"Website",adres:"Adres",enlem:"Enlem",boylam:"Boylam",googleMaps:"Google Maps URL",googleMapsIpucu:"💡 Google Maps → Paylaş → Link kopyala",sosyalMedya:"Sosyal Medya",kaydet:"Profili Kaydet",odaFiyat:"Oda & Fiyat Listesi",yeniOda:"Yeni Oda Ekle",odaAdi:"Oda Adı *",odaAdiPH:"örn: Standart Oda",kapasite:"Kapasite (Kişi)",geceFiyat:"Gecelik Fiyat *",paraBirimi:"Para Birimi",aciklama:"Açıklama",aciklamaPH:"Oda özellikleri...",odaFoto:"Oda Fotoğrafı",odaEkleBtn:"+ Oda Ekle",mevcutOdalar:"Mevcut Odalar",kisi:"kişi",gece:"/gece",pasife:"Pasife Al",aktife:"Aktife Al",sil:"Sil",odaYok:"Henüz oda eklenmemiş.",otelProfilim:"Otel Profilim",otelAdi:"Otel Adı",eposta:"E-posta",durum:"Durum",haritaGor:"📍 Google Maps'te Görüntüle",yukleniyor:"Yükleniyor...",profilKaydedildi:"Profil kaydedildi!",kapakYuklendi:"Kapak fotoğrafı yüklendi!",odaEklendi:"Oda eklendi!",odaAdZorunlu:"Oda adı ve fiyat zorunludur!",silOnay:"Bu odayı silmek istediğinize emin misiniz?",belgelerBaslik:"📄 Belgelerim",belgeAcik:"Onay sürecinde incelenecek belgelerinizi yükleyin.",belgeYukleniyor:"⏳ Belge yükleniyor...",belgeYuklendi:"✅ Belge başarıyla yüklendi!",zorunlu:"Zorunlu",goruntule:"📎 Görüntüle",guncelle:"Güncelle",yukle:"Yükle",belgeSil:"Sil",belgeTamamlandi:"✅ Tüm belgeler yüklendi!",menuAc:"Menü"},
  en:{panel:"Hotel Panel",menu:{ozet:"🏠 Overview",profil:"✏️ Edit Profile",odalar:"🛏️ Room & Price List",belgeler:"📄 My Documents",otelProfil:"🏨 Hotel Profile"},cikis:"Sign Out",onaylandi:"✓ Approved",onayBekliyor:"⏳ Awaiting Approval",hosgeldin:"Welcome",panelAcik:"Manage your profile and rooms.",onayBekle:"Account Awaiting Approval",onayBekleAcik:"Your hotel account has not been approved yet.",toplamOda:"Total Rooms",aktifOda:"Active Rooms",pasifOda:"Inactive Rooms",profilDuzenle:"Edit Profile",odaEkle:"+ Add Room",kapakFoto:"Cover Photo",otelBilgileri:"Hotel Information",tanitim:"Introduction",tanitimPH:"A short introduction about your hotel...",telefon:"Phone",website:"Website",adres:"Address",enlem:"Latitude",boylam:"Longitude",googleMaps:"Google Maps URL",googleMapsIpucu:"💡 Google Maps → Share → Copy link",sosyalMedya:"Social Media",kaydet:"Save Profile",odaFiyat:"Room & Price List",yeniOda:"Add New Room",odaAdi:"Room Name *",odaAdiPH:"e.g. Standard Room",kapasite:"Capacity (Persons)",geceFiyat:"Nightly Price *",paraBirimi:"Currency",aciklama:"Description",aciklamaPH:"Room features...",odaFoto:"Room Photo",odaEkleBtn:"+ Add Room",mevcutOdalar:"Current Rooms",kisi:"persons",gece:"/night",pasife:"Deactivate",aktife:"Activate",sil:"Delete",odaYok:"No rooms added yet.",otelProfilim:"Hotel Profile",otelAdi:"Hotel Name",eposta:"Email",durum:"Status",haritaGor:"📍 View on Google Maps",yukleniyor:"Loading...",profilKaydedildi:"Profile saved!",kapakYuklendi:"Cover photo uploaded!",odaEklendi:"Room added!",odaAdZorunlu:"Room name and price are required!",silOnay:"Are you sure you want to delete this room?",belgelerBaslik:"📄 My Documents",belgeAcik:"Upload your documents for the approval process.",belgeYukleniyor:"⏳ Uploading...",belgeYuklendi:"✅ Document uploaded!",zorunlu:"Required",goruntule:"📎 View",guncelle:"Update",yukle:"Upload",belgeSil:"Delete",belgeTamamlandi:"✅ All documents uploaded!",menuAc:"Menu"},
  de:{panel:"Hotel-Bereich",menu:{ozet:"🏠 Übersicht",profil:"✏️ Profil bearbeiten",odalar:"🛏️ Zimmer & Preise",belgeler:"📄 Dokumente",otelProfil:"🏨 Hotel-Profil"},cikis:"Abmelden",onaylandi:"✓ Genehmigt",onayBekliyor:"⏳ Ausstehend",hosgeldin:"Willkommen",panelAcik:"Verwalten Sie Ihr Profil und Ihre Zimmer.",onayBekle:"Genehmigung ausstehend",onayBekleAcik:"Ihr Hotel-Konto wurde noch nicht genehmigt.",toplamOda:"Zimmer gesamt",aktifOda:"Aktive Zimmer",pasifOda:"Inaktive Zimmer",profilDuzenle:"Profil bearbeiten",odaEkle:"+ Zimmer hinzufügen",kapakFoto:"Titelbild",otelBilgileri:"Hotelinformationen",tanitim:"Vorstellung",tanitimPH:"Eine kurze Vorstellung...",telefon:"Telefon",website:"Website",adres:"Adresse",enlem:"Breitengrad",boylam:"Längengrad",googleMaps:"Google Maps URL",googleMapsIpucu:"💡 Google Maps → Teilen → Link kopieren",sosyalMedya:"Soziale Medien",kaydet:"Profil speichern",odaFiyat:"Zimmer & Preisliste",yeniOda:"Neues Zimmer",odaAdi:"Zimmername *",odaAdiPH:"z.B. Standardzimmer",kapasite:"Kapazität (Personen)",geceFiyat:"Nachtpreis *",paraBirimi:"Währung",aciklama:"Beschreibung",aciklamaPH:"Zimmerausstattung...",odaFoto:"Zimmerfoto",odaEkleBtn:"+ Zimmer hinzufügen",mevcutOdalar:"Aktuelle Zimmer",kisi:"Personen",gece:"/Nacht",pasife:"Deaktivieren",aktife:"Aktivieren",sil:"Löschen",odaYok:"Noch keine Zimmer.",otelProfilim:"Hotel-Profil",otelAdi:"Hotelname",eposta:"E-Mail",durum:"Status",haritaGor:"📍 Google Maps anzeigen",yukleniyor:"Wird geladen...",profilKaydedildi:"Profil gespeichert!",kapakYuklendi:"Titelbild hochgeladen!",odaEklendi:"Zimmer hinzugefügt!",odaAdZorunlu:"Zimmername und Preis sind erforderlich!",silOnay:"Möchten Sie dieses Zimmer wirklich löschen?",belgelerBaslik:"📄 Meine Dokumente",belgeAcik:"Laden Sie Ihre Dokumente hoch.",belgeYukleniyor:"⏳ Wird hochgeladen...",belgeYuklendi:"✅ Dokument hochgeladen!",zorunlu:"Erforderlich",goruntule:"📎 Anzeigen",guncelle:"Aktualisieren",yukle:"Hochladen",belgeSil:"Löschen",belgeTamamlandi:"✅ Alle Dokumente hochgeladen!",menuAc:"Menü"},
};

const ZORUNLU_BELGELER = [
  {id:"turizm_isletme",ad:"Turizm İşletmesi Belgesi",aciklama:"Kültür ve Turizm Bakanlığı onaylı turizm işletme belgesi"},
  {id:"isyeri_ruhsati",ad:"İşyeri Açma ve Çalışma Ruhsatı",aciklama:"Belediye onaylı işyeri açma ruhsatı"},
  {id:"yangin_belgesi",ad:"Yangın Güvenlik Belgesi",aciklama:"İtfaiye onaylı, güncel yangın güvenlik raporu"},
  {id:"vergi_levhasi",ad:"Vergi Levhası",aciklama:"Güncel vergi levhası"},
  {id:"ticaret_sicil",ad:"Ticaret Sicil Belgesi",aciklama:"Güncel ticaret sicil gazetesi"},
];

const SIDEBAR_W = 220;

export default function OtelPanel() {
  const supabase = createClient();
  const {dil,dilDegistir} = useDil();
  const m = M[dil as keyof typeof M] || M.tr;

  const [aktifMenu,setAktifMenu] = useState("ozet");
  const [sidebarAcik,setSidebarAcik] = useState(false);
  const [mobil,setMobil] = useState(false);
  const [kullanici,setKullanici] = useState<any>(null);
  const [odalar,setOdalar] = useState<any[]>([]);
  const [belgeler,setBelgeler] = useState<any[]>([]);
  const [yukleniyor,setYukleniyor] = useState(true);
  const [mesaj,setMesaj] = useState("");
  const [belgeYukleniyor,setBelgeYukleniyor] = useState(false);

  const [profil,setProfil] = useState({tanitim_yazisi:"",telefon:"",website:"",instagram:"",facebook:"",google_maps_url:"",konum_adres:"",konum_lat:"",konum_lng:""});
  const [yeniOda,setYeniOda] = useState({oda_adi:"",aciklama:"",fiyat:"",para_birimi:"EUR",kapasite:"2",fotograf:""});

  useEffect(()=>{
    veriYukle();
    const k=()=>setMobil(window.innerWidth<=768);k();
    window.addEventListener("resize",k);return()=>window.removeEventListener("resize",k);
  },[]);

  async function veriYukle(){
    setYukleniyor(true);
    const {data:{user}}=await supabase.auth.getUser();
    if(!user){window.location.href="/giris";return;}
    const {data:p}=await supabase.from("profiles").select("*").eq("id",user.id).single();
    setKullanici(p);
    if(p)setProfil({tanitim_yazisi:p.tanitim_yazisi||"",telefon:p.telefon||"",website:p.website||"",instagram:p.instagram||"",facebook:p.facebook||"",google_maps_url:p.google_maps_url||"",konum_adres:p.konum_adres||"",konum_lat:p.konum_lat||"",konum_lng:p.konum_lng||""});
    const {data:o}=await supabase.from("otel_odalar").select("*").eq("otel_id",user.id).order("olusturma_tarihi");
    setOdalar(o||[]);
    const {data:b}=await supabase.from("belgeler").select("*").eq("kullanici_id",user.id);
    setBelgeler(b||[]);
    setYukleniyor(false);
  }

  function mesajGoster(msg:string){setMesaj(msg);setTimeout(()=>setMesaj(""),3000);}
  function menuSec(id:string){setAktifMenu(id);setSidebarAcik(false);}

  async function fotografYukle(file:File,klasor:string){
    const {data:{user}}=await supabase.auth.getUser();
    const ad=`${user?.id}/${klasor}/${Date.now()}_${file.name}`;
    const {error}=await supabase.storage.from("medoqa-images").upload(ad,file);
    if(error)return null;
    const {data:url}=supabase.storage.from("medoqa-images").getPublicUrl(ad);
    return url.publicUrl;
  }

  async function profilKaydet(){
    const {data:{user}}=await supabase.auth.getUser();
    const {error}=await supabase.from("profiles").update({...profil,konum_lat:profil.konum_lat?parseFloat(profil.konum_lat):null,konum_lng:profil.konum_lng?parseFloat(profil.konum_lng):null}).eq("id",user?.id);
    if(error)mesajGoster("Hata: "+error.message);else{mesajGoster(m.profilKaydedildi);veriYukle();}
  }

  async function kapakFotografYukle(file:File){
    const url=await fotografYukle(file,"kapak");
    if(url){const {data:{user}}=await supabase.auth.getUser();await supabase.from("profiles").update({kapak_fotograf:url}).eq("id",user?.id);veriYukle();mesajGoster(m.kapakYuklendi);}
  }

  async function odaEkle(){
    if(!yeniOda.oda_adi||!yeniOda.fiyat){mesajGoster(m.odaAdZorunlu);return;}
    const {data:{user}}=await supabase.auth.getUser();
    const {error}=await supabase.from("otel_odalar").insert({otel_id:user?.id,oda_adi:yeniOda.oda_adi,aciklama:yeniOda.aciklama,fiyat:parseFloat(yeniOda.fiyat),para_birimi:yeniOda.para_birimi,kapasite:parseInt(yeniOda.kapasite),fotograf_url:yeniOda.fotograf});
    if(error)mesajGoster("Hata: "+error.message);
    else{mesajGoster(m.odaEklendi);setYeniOda({oda_adi:"",aciklama:"",fiyat:"",para_birimi:"EUR",kapasite:"2",fotograf:""});veriYukle();}
  }

  async function odaSil(id:string){if(!confirm(m.silOnay))return;await supabase.from("otel_odalar").delete().eq("id",id);veriYukle();}
  async function odaAktifToggle(id:string,aktif:boolean){await supabase.from("otel_odalar").update({aktif:!aktif}).eq("id",id);veriYukle();}

  async function belgeYukle(belge_turu:string,file:File){
    setBelgeYukleniyor(true);
    const {data:{user}}=await supabase.auth.getUser();
    if(!user){mesajGoster("Hata: Oturum bulunamadı!");setBelgeYukleniyor(false);return;}
    const ad=`belgeler/${user.id}/${belge_turu}_${Date.now()}_${file.name}`;
    const {error:upErr}=await supabase.storage.from("medoqa-images").upload(ad,file,{upsert:true});
    if(upErr){mesajGoster("Hata: "+upErr.message);setBelgeYukleniyor(false);return;}
    const {data:urlData}=supabase.storage.from("medoqa-images").getPublicUrl(ad);
    const mevcut=belgeler.find(b=>b.belge_turu===belge_turu);
    if(mevcut){await supabase.from("belgeler").update({belge_url:urlData.publicUrl,yukleme_tarihi:new Date().toISOString()}).eq("id",mevcut.id);}
    else{await supabase.from("belgeler").insert({kullanici_id:user.id,belge_turu,belge_url:urlData.publicUrl});}
    mesajGoster(m.belgeYuklendi);veriYukle();setBelgeYukleniyor(false);
  }

  async function belgeSil(id:string){await supabase.from("belgeler").delete().eq("id",id);veriYukle();}
  async function cikisYap(){await supabase.auth.signOut();window.location.href="/giris";}

  const inp:React.CSSProperties={width:"100%",border:"1px solid #e5e7eb",borderRadius:"8px",padding:"9px 12px",fontSize:"13px",outline:"none",boxSizing:"border-box"};
  const lbl:React.CSSProperties={fontSize:"12px",color:"#888",display:"block",marginBottom:"4px"};
  const kart:React.CSSProperties={background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px",marginBottom:"16px"};
  const g2=(extra?:any):React.CSSProperties=>({display:"grid",gridTemplateColumns:mobil?"1fr":"1fr 1fr",gap:"10px",marginBottom:"10px",...extra});

  return(
    <main style={{minHeight:"100vh",background:"#f9fafb",fontFamily:"sans-serif",display:"flex",flexDirection:"column"}}>
      {sidebarAcik&&<div onClick={()=>setSidebarAcik(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:999}}/>}

      <div style={{display:"flex",flex:1}}>
        <aside style={{width:`${SIDEBAR_W}px`,background:"#12103a",display:"flex",flexDirection:"column",padding:"24px 0",flexShrink:0,height:"100vh",overflowY:"auto",position:"fixed",left:0,top:0,zIndex:1000,transform:mobil?(sidebarAcik?"translateX(0)":`translateX(-${SIDEBAR_W}px)`):"translateX(0)",transition:"transform .3s"}}>
          <div style={{padding:"0 20px 16px",borderBottom:"1px solid #1e1b4b",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><a href="/" style={{fontSize:"20px",fontWeight:700,color:"#fff",textDecoration:"none"}}>med<span style={{color:"#7F77DD",fontWeight:300}}>oqa</span></a><div style={{fontSize:"11px",color:"#6b6fa8",marginTop:"4px"}}>{m.panel}</div></div>
            {mobil&&<button onClick={()=>setSidebarAcik(false)} style={{background:"none",border:"none",color:"#7F77DD",fontSize:"20px",cursor:"pointer"}}>×</button>}
          </div>
          {kullanici&&(<div style={{padding:"12px 20px",borderBottom:"1px solid #1e1b4b"}}>
            <div style={{width:"32px",height:"32px",background:"#7F77DD",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"13px",marginBottom:"6px"}}>{kullanici.ad?.[0]?.toUpperCase()||"O"}</div>
            <div style={{fontSize:"13px",fontWeight:600,color:"#fff"}}>{kullanici.ad} {kullanici.soyad}</div>
            <div style={{fontSize:"11px",color:kullanici.onaylandi?"#7F77DD":"#BA7517",marginTop:"2px"}}>{kullanici.onaylandi?m.onaylandi:m.onayBekliyor}</div>
          </div>)}
          <div style={{padding:"8px 16px",borderBottom:"1px solid #1e1b4b",display:"flex",gap:"5px"}}>
            {(["tr","en","de"] as const).map(d=>(<span key={d} onClick={()=>dilDegistir(d)} style={{fontSize:"10px",padding:"3px 6px",border:`1px solid ${dil===d?"#534AB7":"#2a2a4e"}`,borderRadius:"4px",color:dil===d?"#7F77DD":"#aab4c8",cursor:"pointer",textTransform:"uppercase"}}>{d}</span>))}
          </div>
          <nav style={{padding:"12px 12px",flex:1}}>
            {Object.entries(m.menu).map(([id,ad])=>(<div key={id} onClick={()=>menuSec(id)} style={{padding:"9px 12px",borderRadius:"8px",cursor:"pointer",marginBottom:"3px",background:aktifMenu===id?"#534AB7":"transparent",color:aktifMenu===id?"#fff":"#8b8fc8",fontSize:"13px"}}>{ad as string}</div>))}
          </nav>
          <div style={{padding:"0 12px 20px"}}><button onClick={cikisYap} style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid #2a2a4e",borderRadius:"8px",color:"#8b8fc8",fontSize:"13px",cursor:"pointer"}}>{m.cikis}</button></div>
        </aside>

        <div style={{marginLeft:mobil?0:`${SIDEBAR_W}px`,flex:1,display:"flex",flexDirection:"column",minHeight:"100vh"}}>
          {mobil&&(<div style={{position:"sticky",top:0,zIndex:100,background:"#12103a",padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <a href="/" style={{fontSize:"17px",fontWeight:700,color:"#fff",textDecoration:"none"}}>med<span style={{color:"#7F77DD",fontWeight:300}}>oqa</span></a>
            <button onClick={()=>setSidebarAcik(true)} style={{background:"#1e1b4b",border:"none",color:"#fff",padding:"7px 12px",borderRadius:"7px",cursor:"pointer",fontSize:"13px"}}>☰ {m.menuAc}</button>
          </div>)}

          <div style={{padding:mobil?"14px":"28px",flex:1}}>
            {mesaj&&<div style={{background:mesaj.includes("Hata")?"#fff0f0":"#f0fff4",border:`1px solid ${mesaj.includes("Hata")?"#fcc":"#9f9"}`,borderRadius:"8px",padding:"10px 14px",marginBottom:"14px",fontSize:"13px",color:mesaj.includes("Hata")?"#c00":"#0a7a3a"}}>{mesaj}</div>}

            {yukleniyor?(<div style={{textAlign:"center",padding:"64px",color:"#888"}}>{m.yukleniyor}</div>):(
              <>
                {kullanici&&!kullanici.onaylandi&&(<div style={{background:"#fff8e1",border:"1px solid #f0c040",borderRadius:"12px",padding:"14px",marginBottom:"16px"}}><div style={{fontSize:"14px",fontWeight:700,color:"#BA7517"}}>⏳ {m.onayBekle}</div><div style={{fontSize:"13px",color:"#666",marginTop:"4px"}}>{m.onayBekleAcik}</div></div>)}

                {aktifMenu==="ozet"&&(<div>
                  <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"6px"}}>{m.hosgeldin}, {kullanici?.ad}! 👋</h1>
                  <p style={{fontSize:"13px",color:"#888",marginBottom:"20px"}}>{m.panelAcik}</p>
                  <div style={{display:"grid",gridTemplateColumns:mobil?"1fr 1fr":"repeat(3,1fr)",gap:"12px",marginBottom:"20px"}}>
                    {[{b:m.toplamOda,v:odalar.length,c:"#534AB7"},{b:m.aktifOda,v:odalar.filter(o=>o.aktif).length,c:"#0a7a3a"},{b:m.pasifOda,v:odalar.filter(o=>!o.aktif).length,c:"#BA7517"}].map(k=>(<div key={k.b} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"16px"}}><div style={{fontSize:"24px",fontWeight:700,color:k.c}}>{k.v}</div><div style={{fontSize:"12px",color:"#888",marginTop:"4px"}}>{k.b}</div></div>))}
                  </div>
                  <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                    <button onClick={()=>menuSec("profil")} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 16px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>{m.profilDuzenle}</button>
                    <button onClick={()=>menuSec("odalar")} style={{background:"#fff",color:"#534AB7",border:"1px solid #534AB7",padding:"10px 16px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>{m.odaEkle}</button>
                  </div>
                </div>)}

                {aktifMenu==="profil"&&(<div>
                  <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"20px"}}>{m.profilDuzenle}</h1>
                  <div style={kart}>
                    <h2 style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"12px"}}>{m.kapakFoto}</h2>
                    {kullanici?.kapak_fotograf&&<img src={kullanici.kapak_fotograf} alt="Kapak" style={{width:"100%",maxHeight:"180px",objectFit:"cover",borderRadius:"8px",marginBottom:"10px"}}/>}
                    <input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0];if(f)kapakFotografYukle(f);}} style={inp}/>
                  </div>
                  <div style={kart}>
                    <h2 style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"12px"}}>{m.otelBilgileri}</h2>
                    <div style={{marginBottom:"10px"}}><label style={lbl}>{m.tanitim}</label><textarea rows={3} placeholder={m.tanitimPH} value={profil.tanitim_yazisi} onChange={e=>setProfil({...profil,tanitim_yazisi:e.target.value})} style={{...inp,resize:"none"}}/></div>
                    <div style={g2()}><div><label style={lbl}>{m.telefon}</label><input type="text" value={profil.telefon} onChange={e=>setProfil({...profil,telefon:e.target.value})} style={inp}/></div><div><label style={lbl}>{m.website}</label><input type="text" value={profil.website} onChange={e=>setProfil({...profil,website:e.target.value})} style={inp}/></div></div>
                    <div style={{marginBottom:"10px"}}><label style={lbl}>{m.adres}</label><input type="text" value={profil.konum_adres} onChange={e=>setProfil({...profil,konum_adres:e.target.value})} style={inp}/></div>
                    <div style={g2()}><div><label style={lbl}>{m.enlem}</label><input type="text" placeholder="41.0082" value={profil.konum_lat} onChange={e=>setProfil({...profil,konum_lat:e.target.value})} style={inp}/></div><div><label style={lbl}>{m.boylam}</label><input type="text" placeholder="28.9784" value={profil.konum_lng} onChange={e=>setProfil({...profil,konum_lng:e.target.value})} style={inp}/></div></div>
                    <div style={{marginBottom:"10px"}}><label style={lbl}>{m.googleMaps}</label><input type="text" value={profil.google_maps_url} onChange={e=>setProfil({...profil,google_maps_url:e.target.value})} style={inp}/><div style={{fontSize:"11px",color:"#888",marginTop:"4px"}}>{m.googleMapsIpucu}</div></div>
                  </div>
                  <div style={kart}>
                    <h2 style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"12px"}}>{m.sosyalMedya}</h2>
                    <div style={g2()}><div><label style={lbl}>Instagram</label><input type="text" value={profil.instagram} onChange={e=>setProfil({...profil,instagram:e.target.value})} style={inp}/></div><div><label style={lbl}>Facebook</label><input type="text" value={profil.facebook} onChange={e=>setProfil({...profil,facebook:e.target.value})} style={inp}/></div></div>
                  </div>
                  <button onClick={profilKaydet} style={{background:"#534AB7",color:"#fff",border:"none",padding:"12px 24px",borderRadius:"8px",fontSize:"14px",cursor:"pointer",fontWeight:600,width:"100%"}}>{m.kaydet}</button>
                </div>)}

                {aktifMenu==="odalar"&&(<div>
                  <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"20px"}}>{m.odaFiyat}</h1>
                  <div style={kart}>
                    <h2 style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"12px"}}>{m.yeniOda}</h2>
                    <div style={g2()}><div><label style={lbl}>{m.odaAdi}</label><input type="text" placeholder={m.odaAdiPH} value={yeniOda.oda_adi} onChange={e=>setYeniOda({...yeniOda,oda_adi:e.target.value})} style={inp}/></div><div><label style={lbl}>{m.kapasite}</label><input type="number" placeholder="2" value={yeniOda.kapasite} onChange={e=>setYeniOda({...yeniOda,kapasite:e.target.value})} style={inp}/></div></div>
                    <div style={g2()}><div><label style={lbl}>{m.geceFiyat}</label><input type="number" placeholder="0" value={yeniOda.fiyat} onChange={e=>setYeniOda({...yeniOda,fiyat:e.target.value})} style={inp}/></div><div><label style={lbl}>{m.paraBirimi}</label><select value={yeniOda.para_birimi} onChange={e=>setYeniOda({...yeniOda,para_birimi:e.target.value})} style={{...inp,background:"#fff"}}><option>EUR</option><option>USD</option><option>TRY</option><option>GBP</option></select></div></div>
                    <div style={{marginBottom:"10px"}}><label style={lbl}>{m.aciklama}</label><textarea rows={2} placeholder={m.aciklamaPH} value={yeniOda.aciklama} onChange={e=>setYeniOda({...yeniOda,aciklama:e.target.value})} style={{...inp,resize:"none"}}/></div>
                    <div style={{marginBottom:"12px"}}><label style={lbl}>{m.odaFoto}</label><input type="file" accept="image/*" onChange={async e=>{const f=e.target.files?.[0];if(f){const url=await fotografYukle(f,"odalar");if(url)setYeniOda({...yeniOda,fotograf:url});}}} style={inp}/>{yeniOda.fotograf&&<img src={yeniOda.fotograf} alt="Oda" style={{width:"100px",height:"70px",objectFit:"cover",borderRadius:"6px",marginTop:"6px"}}/>}</div>
                    <button onClick={odaEkle} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:600,width:"100%"}}>{m.odaEkleBtn}</button>
                  </div>
                  <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",overflow:"hidden"}}>
                    <div style={{padding:"14px 16px",borderBottom:"1px solid #EEEDFE"}}><h2 style={{fontSize:"15px",fontWeight:700,color:"#12103a",margin:0}}>{m.mevcutOdalar} ({odalar.length})</h2></div>
                    <div style={{display:"grid",gridTemplateColumns:mobil?"1fr 1fr":"repeat(3,1fr)",gap:"12px",padding:"16px"}}>
                      {odalar.map(o=>(<div key={o.id} style={{border:"1px solid #EEEDFE",borderRadius:"10px",overflow:"hidden",opacity:o.aktif?1:0.6}}>
                        {o.fotograf_url?<img src={o.fotograf_url} alt={o.oda_adi} style={{width:"100%",height:"100px",objectFit:"cover"}}/>:<div style={{width:"100%",height:"100px",background:"linear-gradient(135deg,#EEEDFE,#CECBF6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px"}}>🏨</div>}
                        <div style={{padding:"10px"}}>
                          <div style={{fontSize:"13px",fontWeight:700,color:"#12103a",marginBottom:"3px"}}>{o.oda_adi}</div>
                          <div style={{fontSize:"11px",color:"#888",marginBottom:"4px"}}>{o.kapasite} {m.kisi}</div>
                          <div style={{fontSize:"13px",fontWeight:700,color:"#534AB7",marginBottom:"8px"}}>{o.fiyat} {o.para_birimi}{m.gece}</div>
                          <div style={{display:"flex",gap:"4px"}}>
                            <button onClick={()=>odaAktifToggle(o.id,o.aktif)} style={{flex:1,background:o.aktif?"#fff8e1":"#f0fff4",color:o.aktif?"#BA7517":"#0a7a3a",border:"none",padding:"4px",borderRadius:"6px",fontSize:"10px",cursor:"pointer"}}>{o.aktif?m.pasife:m.aktife}</button>
                            <button onClick={()=>odaSil(o.id)} style={{flex:1,background:"#fff0f0",color:"#c00",border:"none",padding:"4px",borderRadius:"6px",fontSize:"10px",cursor:"pointer"}}>{m.sil}</button>
                          </div>
                        </div>
                      </div>))}
                    </div>
                    {odalar.length===0&&<div style={{textAlign:"center",padding:"40px",color:"#888",fontSize:"13px"}}>{m.odaYok}</div>}
                  </div>
                </div>)}

                {aktifMenu==="belgeler"&&(<div>
                  <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.belgelerBaslik}</h1>
                  <p style={{fontSize:"13px",color:"#888",marginBottom:"20px"}}>{m.belgeAcik}</p>
                  {belgeYukleniyor&&<div style={{background:"#f0eeff",border:"1px solid #534AB7",borderRadius:"8px",padding:"10px 14px",marginBottom:"12px",fontSize:"13px",color:"#534AB7"}}>{m.belgeYukleniyor}</div>}
                  <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                    {ZORUNLU_BELGELER.map(zb=>{
                      const yuklendi=belgeler.find(b=>b.belge_turu===zb.id);
                      return(<div key={zb.id} style={{background:"#fff",border:`1px solid ${yuklendi?"#059669":"#EEEDFE"}`,borderRadius:"12px",padding:"14px"}}>
                        <div style={{display:"flex",alignItems:"flex-start",gap:"10px",marginBottom:"10px"}}>
                          <span style={{fontSize:"18px"}}>{yuklendi?"✅":"📋"}</span>
                          <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:"6px",flexWrap:"wrap",marginBottom:"2px"}}><span style={{fontSize:"13px",fontWeight:700,color:"#0f0d2e"}}>{zb.ad}</span>{!yuklendi&&<span style={{fontSize:"10px",background:"#fff0f0",color:"#c00",padding:"2px 6px",borderRadius:"8px",fontWeight:600}}>{m.zorunlu}</span>}</div><p style={{fontSize:"11px",color:"#94a3b8",margin:0}}>{zb.aciklama}</p>{yuklendi&&<a href={yuklendi.belge_url} target="_blank" rel="noreferrer" style={{fontSize:"11px",color:"#534AB7",textDecoration:"none",fontWeight:600,display:"inline-block",marginTop:"4px"}}>{m.goruntule}</a>}</div>
                        </div>
                        <div style={{display:"flex",gap:"6px"}}>
                          <label style={{flex:1,background:yuklendi?"#f0eeff":"#534AB7",color:yuklendi?"#534AB7":"#fff",padding:"8px 12px",borderRadius:"8px",fontSize:"12px",cursor:"pointer",fontWeight:600,textAlign:"center"}}>{yuklendi?m.guncelle:m.yukle}<input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f)belgeYukle(zb.id,f);}}/></label>
                          {yuklendi&&<button onClick={()=>belgeSil(yuklendi.id)} style={{background:"#fff0f0",color:"#c00",border:"none",padding:"8px 12px",borderRadius:"8px",fontSize:"12px",cursor:"pointer"}}>{m.belgeSil}</button>}
                        </div>
                      </div>);
                    })}
                  </div>
                  <div style={{marginTop:"14px",background:"#f0eeff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"12px 14px"}}>
                    <div style={{fontSize:"12px",fontWeight:700,color:"#534AB7",marginBottom:"4px"}}>{belgeler.length}/{ZORUNLU_BELGELER.length} belge yüklendi</div>
                    <div style={{background:"#e5e7eb",borderRadius:"6px",height:"8px",overflow:"hidden"}}><div style={{background:belgeler.length===ZORUNLU_BELGELER.length?"#059669":"#534AB7",height:"100%",width:`${(belgeler.length/ZORUNLU_BELGELER.length)*100}%`,transition:"width .3s",borderRadius:"6px"}}/></div>
                    {belgeler.length===ZORUNLU_BELGELER.length&&<p style={{fontSize:"11px",color:"#059669",marginTop:"6px",fontWeight:600}}>{m.belgeTamamlandi}</p>}
                  </div>
                </div>)}

                {aktifMenu==="otelProfil"&&(<div>
                  <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"20px"}}>{m.otelProfilim}</h1>
                  <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px"}}>
                    {[{e:m.otelAdi,v:`${kullanici?.ad} ${kullanici?.soyad}`},{e:m.eposta,v:kullanici?.email},{e:m.durum,v:kullanici?.onaylandi?m.onaylandi:m.onayBekliyor},{e:m.toplamOda,v:`${odalar.length}`},{e:m.adres,v:kullanici?.konum_adres||"—"}].map(item=>(<div key={item.e} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #f5f5f5"}}><span style={{fontSize:"12px",color:"#888"}}>{item.e}</span><span style={{fontSize:"13px",fontWeight:600,color:"#12103a"}}>{item.v}</span></div>))}
                    {kullanici?.google_maps_url&&<div style={{marginTop:"14px"}}><a href={kullanici.google_maps_url} target="_blank" rel="noreferrer" style={{background:"#534AB7",color:"#fff",padding:"10px 16px",borderRadius:"8px",fontSize:"13px",textDecoration:"none",display:"inline-block"}}>{m.haritaGor}</a></div>}
                  </div>
                </div>)}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
