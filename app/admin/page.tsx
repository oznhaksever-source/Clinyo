"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

export default function Admin() {
  const [aktifMenu, setAktifMenu] = useState("genel");
  const [sidebarAcik, setSidebarAcik] = useState(false);
  const [mobil, setMobil] = useState(false);
  const [kullanicilar, setKullanicilar] = useState<any[]>([]);
  const [talepler, setTalepler] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [onayMesaj, setOnayMesaj] = useState("");
  const [tumMesajlar, setTumMesajlar] = useState<any[]>([]);
  const [seciliKonusma, setSeciliKonusma] = useState<string|null>(null);
  const [detayKullanici, setDetayKullanici] = useState<any>(null);
  const [kullaniciBelgeler, setKullaniciBelgeler] = useState<any[]>([]);
  const [yorumlar, setYorumlar] = useState<any[]>([]);
  const [adminNotu, setAdminNotu] = useState<Record<string,string>>({});
  const [blogYazilari, setBlogYazilari] = useState<any[]>([]);
  const [blogForm, setBlogForm] = useState(false);
  const [blogDuzenle, setBlogDuzenle] = useState<any>(null);
  const [blogYukleniyor, setBlogYukleniyor] = useState(false);
  const [gorselYukleniyor, setGorselYukleniyor] = useState(false);
  const [blogVeri, setBlogVeri] = useState({
    slug:"",emoji:"📝",tarih:new Date().toISOString().split("T")[0],yayin:false,
    baslik_tr:"",baslik_en:"",baslik_de:"",baslik_ar:"",baslik_ru:"",baslik_fr:"",
    ozet_tr:"",ozet_en:"",ozet_de:"",ozet_ar:"",ozet_ru:"",ozet_fr:"",
    icerik_tr:"",icerik_en:"",icerik_de:"",icerik_ar:"",icerik_ru:"",icerik_fr:"",
    kapak_gorsel:"",
  });
  const [aktifBlogDil, setAktifBlogDil] = useState("tr");
  const supabase = createClient();

  useEffect(()=>{
    veriYukle();
    const kontrol = () => setMobil(window.innerWidth <= 768);
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  },[]);

  async function veriYukle() {
    setYukleniyor(true);
    const {data:k} = await supabase.from("profiles").select("*").order("olusturma_tarihi",{ascending:false});
    const {data:t} = await supabase.from("talepler").select("*, profiles(ad,soyad,email)").order("olusturma_tarihi",{ascending:false});
    const {data:m} = await supabase.from("mesajlar").select("*, gonderen:profiles!mesajlar_gonderen_id_fkey(id,ad,soyad,hesap_turu), alici:profiles!mesajlar_alici_id_fkey(id,ad,soyad,hesap_turu)").order("created_at",{ascending:false});
    const {data:y} = await supabase.from("yorumlar").select("*, klinik:profiles!yorumlar_klinik_id_fkey(ad,soyad)").order("created_at",{ascending:false});
    const {data:b} = await supabase.from("blog_yazilari").select("*").order("olusturma_tarihi",{ascending:false});
    setKullanicilar(k||[]);setTalepler(t||[]);setTumMesajlar(m||[]);setYorumlar(y||[]);setBlogYazilari(b||[]);
    setYukleniyor(false);
  }

  function blogFormSifirla(){setBlogVeri({slug:"",emoji:"📝",tarih:new Date().toISOString().split("T")[0],yayin:false,baslik_tr:"",baslik_en:"",baslik_de:"",baslik_ar:"",baslik_ru:"",baslik_fr:"",ozet_tr:"",ozet_en:"",ozet_de:"",ozet_ar:"",ozet_ru:"",ozet_fr:"",icerik_tr:"",icerik_en:"",icerik_de:"",icerik_ar:"",icerik_ru:"",icerik_fr:"",kapak_gorsel:""});setBlogDuzenle(null);setBlogForm(false);setAktifBlogDil("tr");}

  function blogDuzenleAc(yazi:any){
    setBlogVeri({slug:yazi.slug||"",emoji:yazi.emoji||"📝",tarih:yazi.tarih||new Date().toISOString().split("T")[0],yayin:yazi.yayin||false,baslik_tr:yazi.baslik_tr||"",baslik_en:yazi.baslik_en||"",baslik_de:yazi.baslik_de||"",baslik_ar:yazi.baslik_ar||"",baslik_ru:yazi.baslik_ru||"",baslik_fr:yazi.baslik_fr||"",ozet_tr:yazi.ozet_tr||"",ozet_en:yazi.ozet_en||"",ozet_de:yazi.ozet_de||"",ozet_ar:yazi.ozet_ar||"",ozet_ru:yazi.ozet_ru||"",ozet_fr:yazi.ozet_fr||"",icerik_tr:yazi.icerik_tr||"",icerik_en:yazi.icerik_en||"",icerik_de:yazi.icerik_de||"",icerik_ar:yazi.icerik_ar||"",icerik_ru:yazi.icerik_ru||"",icerik_fr:yazi.icerik_fr||"",kapak_gorsel:yazi.kapak_gorsel||""});
    setBlogDuzenle(yazi);setBlogForm(true);
  }

  async function gorselYukle(file:File){
    setGorselYukleniyor(true);
    const dosyaAdi=`blog/${Date.now()}_${file.name}`;
    const {error} = await supabase.storage.from("medoqa-images").upload(dosyaAdi,file);
    if(!error){const {data:url} = supabase.storage.from("medoqa-images").getPublicUrl(dosyaAdi);setBlogVeri(prev=>({...prev,kapak_gorsel:url.publicUrl}));setOnayMesaj("✅ Görsel yüklendi!");}
    else{setOnayMesaj("❌ Görsel yüklenemedi: "+error.message);}
    setGorselYukleniyor(false);
  }

  async function blogKaydet(){
    if(!blogVeri.slug||!blogVeri.baslik_tr){setOnayMesaj("❌ Slug ve Türkçe başlık zorunludur!");return;}
    setBlogYukleniyor(true);
    if(blogDuzenle){const {error} = await supabase.from("blog_yazilari").update(blogVeri).eq("id",blogDuzenle.id);if(error)setOnayMesaj("❌ Hata: "+error.message);else setOnayMesaj("✅ Blog yazısı güncellendi!");}
    else{const {error} = await supabase.from("blog_yazilari").insert(blogVeri);if(error)setOnayMesaj("❌ Hata: "+error.message);else setOnayMesaj("✅ Blog yazısı eklendi!");}
    setBlogYukleniyor(false);blogFormSifirla();veriYukle();
  }

  async function blogSil(id:string){if(!confirm("Bu yazıyı silmek istediğinize emin misiniz?"))return;await supabase.from("blog_yazilari").delete().eq("id",id);setOnayMesaj("✅ Blog yazısı silindi!");veriYukle();}
  async function blogYayinDegistir(id:string,yayin:boolean){await supabase.from("blog_yazilari").update({yayin}).eq("id",id);setOnayMesaj(yayin?"✅ Yazı yayına alındı!":"⏸ Yazı taslağa alındı!");veriYukle();}

  const DILLER = [{kod:"tr",ad:"🇹🇷 TR"},{kod:"en",ad:"🇬🇧 EN"},{kod:"de",ad:"🇩🇪 DE"},{kod:"ar",ad:"🇸🇦 AR"},{kod:"ru",ad:"🇷🇺 RU"},{kod:"fr",ad:"🇫🇷 FR"}];

  async function yorumOnayla(yorum:any){await supabase.from("yorumlar").update({onaylandi:true,gizlendi:false,admin_notu:adminNotu[yorum.id]||null}).eq("id",yorum.id);if(yorum.hasta_email){await fetch("/api/bildirim-gonder",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tip:"yorum_onaylandi",hasta_email:yorum.hasta_email,hasta_ad:yorum.hasta_ad,klinik_ad:`${yorum.klinik?.ad} ${yorum.klinik?.soyad}`})});}setOnayMesaj("✅ Yorum onaylandı!");veriYukle();}
  async function yorumGizle(yorum:any){await supabase.from("yorumlar").update({gizlendi:true,onaylandi:false,admin_notu:adminNotu[yorum.id]||null}).eq("id",yorum.id);if(yorum.hasta_email){await fetch("/api/bildirim-gonder",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tip:"yorum_gizlendi",hasta_email:yorum.hasta_email,hasta_ad:yorum.hasta_ad,klinik_ad:`${yorum.klinik?.ad} ${yorum.klinik?.soyad}`,admin_notu:adminNotu[yorum.id]||""})});}setOnayMesaj("🚫 Yorum gizlendi!");veriYukle();}
  async function yorumYayinla(id:string){await supabase.from("yorumlar").update({gizlendi:false,onaylandi:true}).eq("id",id);setOnayMesaj("✅ Yorum yayınlandı!");veriYukle();}
  async function guncelle(id:string,alan:string,deger:any){await supabase.from("profiles").update({[alan]:deger}).eq("id",id);setOnayMesaj("Guncellendi!");setTimeout(()=>setOnayMesaj(""),2000);setDetayKullanici((prev:any)=>prev?.id===id?{...prev,[alan]:deger}:prev);veriYukle();}
  async function kullaniciyiSil(id:string){if(!confirm("Bu kullaniciyi silmek istediginize emin misiniz?"))return;await supabase.rpc("delete_user",{user_id:id});await supabase.from("profiles").delete().eq("id",id);setOnayMesaj("Kullanici silindi!");veriYukle();}
  async function cikisYap(){await supabase.auth.signOut();window.location.href="/giris";}
  async function detayGoster(kullanici:any){setDetayKullanici(kullanici);const {data} = await supabase.from("belgeler").select("*").eq("kullanici_id",kullanici.id);setKullaniciBelgeler(data||[]);}

  const klinikler = kullanicilar.filter(k=>k.hesap_turu==="klinik");
  const hastalar = kullanicilar.filter(k=>k.hesap_turu==="hasta");
  const oteller = kullanicilar.filter(k=>k.hesap_turu==="otel");
  const transferler = kullanicilar.filter(k=>k.hesap_turu==="transfer");
  const bekleyenler = [...klinikler,...oteller,...transferler].filter(k=>!k.onaylandi&&!k.askida);

  const belgeTurleri: Record<string,{id:string;ad:string}[]> = {
    klinik:[{id:"saglik_bakanligi",ad:"Sağlık Bakanlığı Yetki Belgesi"},{id:"faaliyet_ruhsati",ad:"Faaliyet Ruhsatı"},{id:"hekim_sertifikasi",ad:"Sorumlu Hekim Sertifikası"},{id:"sigorta_policesi",ad:"Sigorta Poliçesi"},{id:"vergi_levhasi",ad:"Vergi Levhası"},{id:"ticaret_sicil",ad:"Ticaret Sicil Belgesi"}],
    otel:[{id:"turizm_isletme",ad:"Turizm İşletmesi Belgesi"},{id:"isyeri_ruhsati",ad:"İşyeri Açma ve Çalışma Ruhsatı"},{id:"yangin_belgesi",ad:"Yangın Güvenlik Belgesi"},{id:"vergi_levhasi",ad:"Vergi Levhası"},{id:"ticaret_sicil",ad:"Ticaret Sicil Belgesi"}],
    transfer:[{id:"tursab_belgesi",ad:"TURSAB A Grubu Belgesi"},{id:"saglik_turizmi_yetki",ad:"Sağlık Turizmi Yetki Belgesi"},{id:"arac_ruhsatlari",ad:"Ticari Araç Ruhsatları"},{id:"psikoteknik",ad:"Şoför Psikoteknik Belgeleri"},{id:"trafik_sigorta",ad:"Trafik Sigortası"},{id:"vergi_levhasi",ad:"Vergi Levhası"},{id:"ticaret_sicil",ad:"Ticaret Sicil Belgesi"}],
  };

  const zorunluBelgeler = belgeTurleri[detayKullanici?.hesap_turu]||belgeTurleri.klinik;
  const inp = {width:"100%",border:"1px solid #e5e7eb",borderRadius:"8px",padding:"10px 12px",fontSize:"13px",outline:"none",boxSizing:"border-box" as const,fontFamily:"inherit"};
  const lbl = {fontSize:"12px",color:"#555",display:"block" as const,marginBottom:"5px",fontWeight:600 as const};

  function menuSec(id:string){setAktifMenu(id);setSidebarAcik(false);}

  function UyeTablosu({liste,baslik}:{liste:any[],baslik:string}){
    return(
      <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",overflow:"hidden",marginBottom:"24px"}}>
        <div style={{padding:"14px 16px",borderBottom:"1px solid #EEEDFE"}}><h3 style={{fontSize:"15px",fontWeight:700,color:"#12103a",margin:0}}>{baslik} ({liste.length})</h3></div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:"500px"}}>
            <thead><tr style={{background:"#f9fafb"}}>
              <th style={{padding:"10px 12px",textAlign:"left",fontSize:"12px",color:"#888",fontWeight:600}}>Ad / Firma</th>
              <th style={{padding:"10px 12px",textAlign:"left",fontSize:"12px",color:"#888",fontWeight:600}}>E-posta</th>
              <th style={{padding:"10px 12px",textAlign:"left",fontSize:"12px",color:"#888",fontWeight:600}}>Durum</th>
              <th style={{padding:"10px 12px",textAlign:"left",fontSize:"12px",color:"#888",fontWeight:600}}>İşlem</th>
            </tr></thead>
            <tbody>{liste.map((k,i)=>(
              <tr key={k.id} style={{borderTop:"1px solid #EEEDFE",background:k.askida?"#fff5f5":i%2===0?"#fff":"#fafafa"}}>
                <td style={{padding:"10px 12px",fontSize:"13px",color:"#12103a",whiteSpace:"nowrap"}}>{k.ad} {k.soyad}</td>
                <td style={{padding:"10px 12px",fontSize:"12px",color:"#888"}}>{k.email}</td>
                <td style={{padding:"10px 12px"}}>
                  {k.askida?<span style={{fontSize:"11px",padding:"2px 8px",borderRadius:"20px",background:"#fff0f0",color:"#c00"}}>Askıda</span>
                  :k.onaylandi?<span style={{fontSize:"11px",padding:"2px 8px",borderRadius:"20px",background:"#f0fff4",color:"#0a7a3a"}}>Aktif</span>
                  :<span style={{fontSize:"11px",padding:"2px 8px",borderRadius:"20px",background:"#fff8e1",color:"#BA7517"}}>Bekliyor</span>}
                </td>
                <td style={{padding:"10px 12px"}}><div style={{display:"flex",gap:"4px",flexWrap:"wrap"}}>
                  {!k.onaylandi&&!k.askida&&<button onClick={()=>guncelle(k.id,"onaylandi",true)} style={{background:"#0a7a3a",color:"#fff",border:"none",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>Onayla</button>}
                  {k.onaylandi&&!k.askida&&<button onClick={()=>guncelle(k.id,"askida",true)} style={{background:"#BA7517",color:"#fff",border:"none",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>Askıya Al</button>}
                  {k.askida&&<button onClick={()=>{guncelle(k.id,"askida",false);guncelle(k.id,"onaylandi",true);}} style={{background:"#185FA5",color:"#fff",border:"none",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>Aktif Et</button>}
                  <button onClick={()=>detayGoster(k)} style={{background:"#185FA5",color:"#fff",border:"none",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>Detay</button>
                  <button onClick={()=>kullaniciyiSil(k.id)} style={{background:"#c00",color:"#fff",border:"none",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>Sil</button>
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        {liste.length===0&&<div style={{textAlign:"center",padding:"28px",color:"#888",fontSize:"13px"}}>Kayıt yok</div>}
      </div>
    );
  }

  const SIDEBAR_W = 220;

  return(
    <main style={{minHeight:"100vh",background:"#f9fafb",fontFamily:"sans-serif",display:"flex",flexDirection:"column"}}>

      {/* Detay Modali */}
      {detayKullanici&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
          <div style={{background:"#fff",borderRadius:"20px",width:"100%",maxWidth:"640px",maxHeight:"90vh",overflow:"auto",padding:"24px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}>
              <h2 style={{fontSize:"18px",fontWeight:700,color:"#0f0d2e",margin:0}}>Kullanıcı Detayı</h2>
              <button onClick={()=>setDetayKullanici(null)} style={{background:"none",border:"none",fontSize:"22px",cursor:"pointer",color:"#888"}}>×</button>
            </div>
            <div style={{background:"#f8f9ff",borderRadius:"12px",padding:"16px",marginBottom:"16px"}}>
              <div style={{display:"grid",gridTemplateColumns:mobil?"1fr":"1fr 1fr",gap:"10px"}}>
                {[{etiket:"Ad Soyad",deger:`${detayKullanici.ad} ${detayKullanici.soyad}`},{etiket:"E-posta",deger:detayKullanici.email},{etiket:"Hesap Türü",deger:detayKullanici.hesap_turu},{etiket:"Durum",deger:detayKullanici.onaylandi?"✅ Onaylı":detayKullanici.askida?"🔴 Askıda":"⏳ Bekliyor"},{etiket:"Telefon",deger:detayKullanici.telefon||"-"},{etiket:"Website",deger:detayKullanici.website||"-"}].map(item=>(
                  <div key={item.etiket}><div style={{fontSize:"11px",color:"#94a3b8",marginBottom:"2px"}}>{item.etiket}</div><div style={{fontSize:"13px",fontWeight:600,color:"#0f0d2e"}}>{item.deger}</div></div>
                ))}
              </div>
            </div>
            {detayKullanici.hesap_turu==="klinik"&&(
              <div style={{background:detayKullanici.uluslararasi_yetki?"#f0eeff":"#f9fafb",border:`1px solid ${detayKullanici.uluslararasi_yetki?"#534AB7":"#e5e7eb"}`,borderRadius:"12px",padding:"14px",marginBottom:"16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"10px",flexWrap:"wrap"}}>
                  <div>
                    <div style={{fontSize:"13px",fontWeight:700,color:"#12103a"}}>🌍 Uluslararası Yetki</div>
                    <div style={{fontSize:"11px",color:"#888",marginTop:"3px"}}>{detayKullanici.uluslararasi_yetki?"Yurt dışı hastalara teklif gönderebilir.":"Sadece Türkiye'deki hastalara görünür."}</div>
                  </div>
                  <button onClick={()=>guncelle(detayKullanici.id,"uluslararasi_yetki",!detayKullanici.uluslararasi_yetki)} style={{background:detayKullanici.uluslararasi_yetki?"#534AB7":"#e5e7eb",color:detayKullanici.uluslararasi_yetki?"#fff":"#666",border:"none",padding:"8px 14px",borderRadius:"8px",fontSize:"12px",cursor:"pointer",fontWeight:600}}>
                    {detayKullanici.uluslararasi_yetki?"✅ Yetkili":"Yetki Ver"}
                  </button>
                </div>
              </div>
            )}
            <div style={{marginBottom:"16px"}}>
              <div style={{fontSize:"13px",fontWeight:700,color:"#0f0d2e",marginBottom:"10px"}}>Belgeler ({kullaniciBelgeler.length}/{zorunluBelgeler.length})</div>
              {zorunluBelgeler.map(zb=>{
                const belge=kullaniciBelgeler.find(b=>b.belge_turu===zb.id);
                return(<div key={zb.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",borderRadius:"8px",background:belge?"#f0fff4":"#fff0f0",border:`1px solid ${belge?"#9f9":"#fcc"}`,marginBottom:"6px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"6px"}}><span>{belge?"✅":"❌"}</span><span style={{fontSize:"12px",color:"#0f0d2e"}}>{zb.ad}</span></div>
                  {belge?<a href={belge.belge_url} target="_blank" rel="noreferrer" style={{fontSize:"11px",color:"#534AB7",textDecoration:"none",fontWeight:600}}>Gör →</a>:<span style={{fontSize:"11px",color:"#c00"}}>Yüklenmedi</span>}
                </div>);
              })}
            </div>
            <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
              {!detayKullanici.onaylandi&&!detayKullanici.askida&&<button onClick={()=>{guncelle(detayKullanici.id,"onaylandi",true);setDetayKullanici(null);}} style={{flex:1,background:"#059669",color:"#fff",border:"none",padding:"11px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:700}}>✅ Onayla</button>}
              {detayKullanici.onaylandi&&!detayKullanici.askida&&<button onClick={()=>{guncelle(detayKullanici.id,"askida",true);setDetayKullanici(null);}} style={{flex:1,background:"#D97706",color:"#fff",border:"none",padding:"11px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:700}}>⏸ Askıya Al</button>}
              {detayKullanici.askida&&<button onClick={()=>{guncelle(detayKullanici.id,"askida",false);guncelle(detayKullanici.id,"onaylandi",true);setDetayKullanici(null);}} style={{flex:1,background:"#185FA5",color:"#fff",border:"none",padding:"11px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:700}}>✅ Aktif Et</button>}
              <button onClick={()=>{kullaniciyiSil(detayKullanici.id);setDetayKullanici(null);}} style={{background:"#fff0f0",color:"#c00",border:"1px solid #fcc",padding:"11px 16px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>🗑 Sil</button>
              <button onClick={()=>setDetayKullanici(null)} style={{background:"#f8f9ff",color:"#64748b",border:"1px solid #eeecff",padding:"11px 16px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>Kapat</button>
            </div>
          </div>
        </div>
      )}

      {/* Mobil overlay */}
      {sidebarAcik&&<div onClick={()=>setSidebarAcik(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:999}}/>}

      <div style={{display:"flex",flex:1}}>
        {/* Sidebar */}
        <aside style={{
          width:`${SIDEBAR_W}px`,background:"#12103a",display:"flex",flexDirection:"column",
          padding:"24px 0",flexShrink:0,height:"100vh",overflowY:"auto",
          position:"fixed",left:0,top:0,zIndex:1000,
          transform:mobil?(sidebarAcik?"translateX(0)":`translateX(-${SIDEBAR_W}px)`):"translateX(0)",
          transition:"transform .3s",
        }}>
          <div style={{padding:"0 20px 20px",borderBottom:"1px solid #1e1b4b",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <a href="/" style={{fontSize:"20px",fontWeight:700,color:"#fff",textDecoration:"none"}}>med<span style={{color:"#7F77DD",fontWeight:300}}>oqa</span></a>
              <div style={{fontSize:"11px",color:"#6b6fa8",marginTop:"4px"}}>Admin Paneli</div>
            </div>
            {mobil&&<button onClick={()=>setSidebarAcik(false)} style={{background:"none",border:"none",color:"#7F77DD",fontSize:"20px",cursor:"pointer"}}>×</button>}
          </div>
          <div style={{padding:"16px 12px",flex:1}}>
            {[
              {id:"genel",ad:"Genel Özet",badge:bekleyenler.length},
              {id:"klinikler",ad:"Klinikler",badge:klinikler.filter(k=>!k.onaylandi).length},
              {id:"oteller",ad:"Oteller",badge:oteller.filter(k=>!k.onaylandi).length},
              {id:"transferler",ad:"Transfer Şirketleri",badge:transferler.filter(k=>!k.onaylandi).length},
              {id:"hastalar",ad:"Hastalar",badge:0},
              {id:"talepler",ad:"Teklif Talepleri",badge:0},
              {id:"yorumlar",ad:"⭐ Yorumlar",badge:yorumlar.filter((y:any)=>!y.onaylandi&&!y.gizlendi).length},
              {id:"mesajlar",ad:"💬 Mesajlar",badge:0},
              {id:"destek",ad:"🎯 Destek",badge:0},
              {id:"blog",ad:"📝 Blog",badge:blogYazilari.filter(b=>!b.yayin).length},
            ].map(m=>(
              <div key={m.id} onClick={()=>menuSec(m.id)} style={{padding:"9px 12px",borderRadius:"8px",cursor:"pointer",marginBottom:"3px",background:aktifMenu===m.id?"#534AB7":"transparent",color:aktifMenu===m.id?"#fff":"#8b8fc8",fontSize:"13px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span>{m.ad}</span>
                {m.badge>0&&<span style={{background:"#c00",color:"#fff",fontSize:"10px",padding:"2px 6px",borderRadius:"10px"}}>{m.badge}</span>}
              </div>
            ))}
          </div>
          <div style={{padding:"0 12px 20px"}}>
            <button onClick={cikisYap} style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid #2a2a4e",borderRadius:"8px",color:"#8b8fc8",fontSize:"13px",cursor:"pointer"}}>Çıkış Yap</button>
          </div>
        </aside>

        {/* İçerik */}
        <div style={{marginLeft:mobil?0:`${SIDEBAR_W}px`,flex:1,display:"flex",flexDirection:"column",minHeight:"100vh"}}>
          {/* Mobil üst bar */}
          {mobil&&(
            <div style={{position:"sticky",top:0,zIndex:100,background:"#12103a",padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <a href="/" style={{fontSize:"17px",fontWeight:700,color:"#fff",textDecoration:"none"}}>med<span style={{color:"#7F77DD",fontWeight:300}}>oqa</span></a>
              <button onClick={()=>setSidebarAcik(true)} style={{background:"#1e1b4b",border:"none",color:"#fff",padding:"7px 12px",borderRadius:"7px",cursor:"pointer",fontSize:"13px"}}>☰ Menü</button>
            </div>
          )}

          <div style={{padding:mobil?"14px":"28px",flex:1}}>
            {onayMesaj&&<div style={{background:"#f0fff4",border:"1px solid #9f9",borderRadius:"8px",padding:"10px 14px",marginBottom:"14px",fontSize:"13px",color:"#0a7a3a"}}>✓ {onayMesaj}</div>}

            {yukleniyor?(<div style={{textAlign:"center",padding:"64px",color:"#888"}}>Yükleniyor...</div>):(
              <>
                {aktifMenu==="genel"&&(
                  <div>
                    <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"20px"}}>Genel Özet</h1>
                    <div style={{display:"grid",gridTemplateColumns:mobil?"1fr 1fr":"repeat(4,1fr)",gap:"12px",marginBottom:"20px"}}>
                      {[{baslik:"Toplam Üye",deger:kullanicilar.length,renk:"#534AB7"},{baslik:"Hasta",deger:hastalar.length,renk:"#0a7a3a"},{baslik:"Klinik",deger:klinikler.length,renk:"#185FA5"},{baslik:"Onay Bekleyen",deger:bekleyenler.length,renk:"#c00"}].map(k=>(
                        <div key={k.baslik} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"16px"}}>
                          <div style={{fontSize:"28px",fontWeight:700,color:k.renk}}>{k.deger}</div>
                          <div style={{fontSize:"12px",color:"#888",marginTop:"4px"}}>{k.baslik}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:mobil?"1fr 1fr":"repeat(3,1fr)",gap:"12px",marginBottom:"20px"}}>
                      {[{baslik:"Otel",deger:oteller.length,renk:"#7F77DD"},{baslik:"Transfer",deger:transferler.length,renk:"#BA7517"},{baslik:"Teklif Talebi",deger:talepler.length,renk:"#185FA5"}].map(k=>(
                        <div key={k.baslik} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"16px"}}>
                          <div style={{fontSize:"28px",fontWeight:700,color:k.renk}}>{k.deger}</div>
                          <div style={{fontSize:"12px",color:"#888",marginTop:"4px"}}>{k.baslik}</div>
                        </div>
                      ))}
                    </div>
                    {bekleyenler.length>0&&(
                      <div style={{background:"#fff8e1",border:"1px solid #f0c040",borderRadius:"12px",padding:"16px"}}>
                        <h3 style={{fontSize:"14px",fontWeight:700,color:"#BA7517",marginBottom:"10px"}}>⚠ Onay Bekleyenler ({bekleyenler.length})</h3>
                        {bekleyenler.map(k=>(
                          <div key={k.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #f0e0a0",flexWrap:"wrap",gap:"8px"}}>
                            <div><div style={{fontSize:"13px",fontWeight:600,color:"#12103a"}}>{k.ad} {k.soyad}</div><div style={{fontSize:"11px",color:"#888"}}>{k.email} · {k.hesap_turu}</div></div>
                            <div style={{display:"flex",gap:"6px"}}>
                              <button onClick={()=>guncelle(k.id,"onaylandi",true)} style={{background:"#0a7a3a",color:"#fff",border:"none",padding:"5px 12px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>Onayla</button>
                              <button onClick={()=>kullaniciyiSil(k.id)} style={{background:"#c00",color:"#fff",border:"none",padding:"5px 12px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>Reddet</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {aktifMenu==="klinikler"&&<UyeTablosu liste={klinikler} baslik="Klinikler"/>}
                {aktifMenu==="oteller"&&<UyeTablosu liste={oteller} baslik="Oteller"/>}
                {aktifMenu==="transferler"&&<UyeTablosu liste={transferler} baslik="Transfer Şirketleri"/>}
                {aktifMenu==="hastalar"&&<UyeTablosu liste={hastalar} baslik="Hastalar"/>}

                {aktifMenu==="talepler"&&(
                  <div>
                    <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"20px"}}>Teklif Talepleri ({talepler.length})</h1>
                    <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",overflow:"hidden"}}>
                      <div style={{overflowX:"auto"}}>
                        <table style={{width:"100%",borderCollapse:"collapse",minWidth:"480px"}}>
                          <thead><tr style={{background:"#f9fafb"}}>{["Hasta","Tedavi","Durum","Tarih"].map(h=><th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:"12px",color:"#888",fontWeight:600}}>{h}</th>)}</tr></thead>
                          <tbody>{talepler.map((t,i)=>(
                            <tr key={t.id} style={{borderTop:"1px solid #EEEDFE",background:i%2===0?"#fff":"#fafafa"}}>
                              <td style={{padding:"10px 12px",fontSize:"13px",color:"#12103a",whiteSpace:"nowrap"}}>{t.profiles?.ad} {t.profiles?.soyad}</td>
                              <td style={{padding:"10px 12px",fontSize:"12px",color:"#888"}}>{t.tedavi_turu}</td>
                              <td style={{padding:"10px 12px"}}><span style={{fontSize:"11px",padding:"2px 8px",borderRadius:"20px",background:t.durum==="beklemede"?"#fff8e1":"#f0fff4",color:t.durum==="beklemede"?"#BA7517":"#0a7a3a"}}>{t.durum}</span></td>
                              <td style={{padding:"10px 12px",fontSize:"11px",color:"#888",whiteSpace:"nowrap"}}>{new Date(t.olusturma_tarihi).toLocaleDateString("tr-TR")}</td>
                            </tr>
                          ))}</tbody>
                        </table>
                      </div>
                      {talepler.length===0&&<div style={{textAlign:"center",padding:"28px",color:"#888",fontSize:"13px"}}>Henüz teklif talebi yok</div>}
                    </div>
                  </div>
                )}

                {aktifMenu==="yorumlar"&&(
                  <div>
                    <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"20px"}}>⭐ Yorum Yönetimi</h1>
                    <div style={{display:"grid",gridTemplateColumns:mobil?"1fr":"repeat(3,1fr)",gap:"12px",marginBottom:"20px"}}>
                      {[{baslik:"Onay Bekleyen",deger:yorumlar.filter((y:any)=>!y.onaylandi&&!y.gizlendi).length,renk:"#BA7517"},{baslik:"Yayında",deger:yorumlar.filter((y:any)=>y.onaylandi&&!y.gizlendi).length,renk:"#059669"},{baslik:"Gizlenmiş",deger:yorumlar.filter((y:any)=>y.gizlendi).length,renk:"#c00"}].map(k=>(
                        <div key={k.baslik} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"16px"}}>
                          <div style={{fontSize:"24px",fontWeight:700,color:k.renk}}>{k.deger}</div>
                          <div style={{fontSize:"12px",color:"#888",marginTop:"4px"}}>{k.baslik}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                      {yorumlar.map((y:any)=>{
                        const durum=y.gizlendi?"gizli":y.onaylandi?"yayinda":"bekliyor";
                        const durumRenk=durum==="gizli"?"#c00":durum==="yayinda"?"#059669":"#BA7517";
                        const durumBg=durum==="gizli"?"#fff0f0":durum==="yayinda"?"#f0fff4":"#fff8e1";
                        const durumLabel=durum==="gizli"?"🚫 Gizli":durum==="yayinda"?"✅ Yayında":"⏳ Bekliyor";
                        return(
                          <div key={y.id} style={{background:"#fff",border:`1px solid ${durum==="bekliyor"?"#f0c040":"#EEEDFE"}`,borderRadius:"12px",padding:"16px"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px",flexWrap:"wrap",gap:"8px"}}>
                              <div>
                                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"3px",flexWrap:"wrap"}}>
                                  <span style={{fontSize:"13px",fontWeight:700,color:"#12103a"}}>{y.hasta_ad}</span>
                                  <span style={{fontSize:"10px",padding:"2px 6px",borderRadius:"10px",background:durumBg,color:durumRenk,fontWeight:600}}>{durumLabel}</span>
                                </div>
                                <div style={{fontSize:"11px",color:"#888"}}>🏥 {y.klinik?.ad} {y.klinik?.soyad}</div>
                              </div>
                              <div style={{display:"flex",gap:"2px"}}>{[1,2,3,4,5].map(i=><span key={i} style={{fontSize:"14px",color:i<=y.puan?"#f59e0b":"#e5e7eb"}}>★</span>)}</div>
                            </div>
                            <div style={{background:"#f9fafb",borderRadius:"8px",padding:"10px",marginBottom:"10px",fontSize:"12px",color:"#555",lineHeight:1.6}}>{y.yorum}</div>
                            <input type="text" placeholder="Admin notu (opsiyonel)" value={adminNotu[y.id]||""} onChange={e=>setAdminNotu(prev=>({...prev,[y.id]:e.target.value}))} style={{...inp,marginBottom:"10px"}}/>
                            <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                              {!y.onaylandi&&!y.gizlendi&&<button onClick={()=>yorumOnayla(y)} style={{background:"#059669",color:"#fff",border:"none",padding:"6px 12px",borderRadius:"7px",fontSize:"11px",cursor:"pointer",fontWeight:600}}>✅ Onayla</button>}
                              {!y.gizlendi&&<button onClick={()=>yorumGizle(y)} style={{background:"#fff0f0",color:"#c00",border:"1px solid #fcc",padding:"6px 12px",borderRadius:"7px",fontSize:"11px",cursor:"pointer"}}>🚫 Gizle</button>}
                              {y.gizlendi&&<button onClick={()=>yorumYayinla(y.id)} style={{background:"#f0eeff",color:"#534AB7",border:"1px solid #CECBF6",padding:"6px 12px",borderRadius:"7px",fontSize:"11px",cursor:"pointer"}}>👁️ Yayınla</button>}
                            </div>
                          </div>
                        );
                      })}
                      {yorumlar.length===0&&<div style={{textAlign:"center",padding:"40px",background:"#fff",borderRadius:"12px",border:"1px solid #EEEDFE",color:"#888",fontSize:"13px"}}>Henüz yorum yok.</div>}
                    </div>
                  </div>
                )}

                {aktifMenu==="destek"&&(
                  <div style={{textAlign:"center",padding:"48px"}}>
                    <a href="/admin/destek" style={{background:"#534AB7",color:"#fff",padding:"14px 28px",borderRadius:"10px",fontSize:"14px",textDecoration:"none",fontWeight:700}}>🎯 Destek Taleplerine Git →</a>
                  </div>
                )}

                {aktifMenu==="mesajlar"&&(
                  <div>
                    <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"20px"}}>💬 Tüm Mesajlaşmalar</h1>
                    {(()=>{
                      const konusmalar: Record<string,any[]> = {};
                      tumMesajlar.forEach(msg=>{const key=[msg.gonderen_id,msg.alici_id].sort().join("_");if(!konusmalar[key])konusmalar[key]=[];konusmalar[key].push(msg);});
                      return(
                        <div style={{display:"grid",gridTemplateColumns:seciliKonusma&&!mobil?"300px 1fr":"1fr",gap:"16px"}}>
                          <div style={{background:"#fff",borderRadius:"12px",border:"1px solid #EEEDFE",overflow:"hidden"}}>
                            <div style={{padding:"14px 16px",borderBottom:"1px solid #EEEDFE",fontSize:"13px",fontWeight:700,color:"#12103a"}}>{Object.keys(konusmalar).length} konuşma</div>
                            {Object.entries(konusmalar).map(([key,msgs])=>{
                              const sonMesaj=msgs[0];const kisi1=sonMesaj.gonderen;const kisi2=sonMesaj.alici;
                              return(<div key={key} onClick={()=>setSeciliKonusma(seciliKonusma===key?null:key)} style={{padding:"12px 16px",cursor:"pointer",borderBottom:"1px solid #f8f9ff",background:seciliKonusma===key?"#f0eeff":"#fff"}}>
                                <div style={{fontSize:"12px",fontWeight:700,color:"#0f0d2e",marginBottom:"3px"}}>{kisi1?.ad} ↔ {kisi2?.ad}</div>
                                <div style={{fontSize:"11px",color:"#64748b",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{sonMesaj.mesaj}</div>
                              </div>);
                            })}
                            {Object.keys(konusmalar).length===0&&<div style={{textAlign:"center",padding:"40px",color:"#888",fontSize:"13px"}}>Henüz mesajlaşma yok</div>}
                          </div>
                          {seciliKonusma&&konusmalar[seciliKonusma]&&(
                            <div style={{background:"#fff",borderRadius:"12px",border:"1px solid #EEEDFE",display:"flex",flexDirection:"column",overflow:"hidden",maxHeight:"500px"}}>
                              <div style={{padding:"14px 16px",borderBottom:"1px solid #EEEDFE",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <div style={{fontSize:"13px",fontWeight:700,color:"#12103a"}}>{konusmalar[seciliKonusma][0].gonderen?.ad} ↔ {konusmalar[seciliKonusma][0].alici?.ad}</div>
                                <button onClick={()=>setSeciliKonusma(null)} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:"18px"}}>×</button>
                              </div>
                              <div style={{flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"8px"}}>
                                {[...konusmalar[seciliKonusma]].reverse().map(msg=>(
                                  <div key={msg.id} style={{background:"#f8f9ff",border:"1px solid #eeecff",borderRadius:"8px",padding:"10px",fontSize:"12px",color:"#374151",lineHeight:1.5}}>
                                    <div style={{fontWeight:700,marginBottom:"3px"}}>{msg.gonderen?.ad} {msg.gonderen?.soyad}</div>
                                    {msg.mesaj}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}

                {aktifMenu==="blog"&&(
                  <div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px",flexWrap:"wrap",gap:"10px"}}>
                      <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",margin:0}}>📝 Blog Yönetimi</h1>
                      {!blogForm&&<button onClick={()=>setBlogForm(true)} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 18px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:700}}>+ Yeni Yazı</button>}
                    </div>

                    {blogForm&&(
                      <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"14px",padding:"20px",marginBottom:"20px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}}>
                          <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",margin:0}}>{blogDuzenle?"✏️ Düzenle":"➕ Yeni Yazı"}</h2>
                          <button onClick={blogFormSifirla} style={{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#888"}}>×</button>
                        </div>
                        <div style={{display:"grid",gridTemplateColumns:mobil?"1fr 1fr":"1fr 1fr 1fr 1fr",gap:"10px",marginBottom:"12px"}}>
                          <div><label style={lbl}>Slug *</label><input type="text" placeholder="dental-turkey" value={blogVeri.slug} onChange={e=>setBlogVeri(p=>({...p,slug:e.target.value.toLowerCase().replace(/\s/g,"-")}))} style={inp}/></div>
                          <div><label style={lbl}>Emoji</label><input type="text" placeholder="🦷" value={blogVeri.emoji} onChange={e=>setBlogVeri(p=>({...p,emoji:e.target.value}))} style={inp}/></div>
                          <div><label style={lbl}>Tarih</label><input type="date" value={blogVeri.tarih} onChange={e=>setBlogVeri(p=>({...p,tarih:e.target.value}))} style={inp}/></div>
                          <div><label style={lbl}>Durum</label><select value={blogVeri.yayin?"yayin":"taslak"} onChange={e=>setBlogVeri(p=>({...p,yayin:e.target.value==="yayin"}))} style={{...inp,background:"#fff"}}><option value="taslak">📝 Taslak</option><option value="yayin">✅ Yayında</option></select></div>
                        </div>
                        <div style={{marginBottom:"12px",padding:"12px",background:"#f8f9ff",borderRadius:"8px",border:"1px solid #e8e6ff"}}>
                          <label style={lbl}>Kapak Görseli</label>
                          <input type="file" accept="image/*" onChange={e=>{if(e.target.files?.[0])gorselYukle(e.target.files[0]);}} style={{...inp,padding:"7px 10px"}}/>
                          {gorselYukleniyor&&<div style={{fontSize:"11px",color:"#534AB7",marginTop:"4px"}}>⏳ Yükleniyor...</div>}
                          {blogVeri.kapak_gorsel&&<img src={blogVeri.kapak_gorsel} alt="Kapak" style={{width:"100%",maxHeight:"160px",objectFit:"cover",borderRadius:"6px",marginTop:"8px"}}/>}
                        </div>
                        <div style={{display:"flex",gap:"6px",marginBottom:"12px",flexWrap:"wrap"}}>
                          {DILLER.map(d=>(
                            <button key={d.kod} onClick={()=>setAktifBlogDil(d.kod)} style={{padding:"5px 12px",borderRadius:"6px",border:`1px solid ${aktifBlogDil===d.kod?"#534AB7":"#e5e7eb"}`,background:aktifBlogDil===d.kod?"#534AB7":"#fff",color:aktifBlogDil===d.kod?"#fff":"#555",fontSize:"11px",cursor:"pointer",fontWeight:aktifBlogDil===d.kod?700:400}}>
                              {d.ad}{(blogVeri as any)[`baslik_${d.kod}`]?" ✓":""}
                            </button>
                          ))}
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                          <div><label style={lbl}>Başlık ({aktifBlogDil.toUpperCase()}){aktifBlogDil==="tr"?" *":""}</label><input type="text" placeholder={`Başlık (${aktifBlogDil})`} value={(blogVeri as any)[`baslik_${aktifBlogDil}`]} onChange={e=>setBlogVeri(p=>({...p,[`baslik_${aktifBlogDil}`]:e.target.value}))} style={inp}/></div>
                          <div><label style={lbl}>Özet ({aktifBlogDil.toUpperCase()})</label><textarea rows={2} placeholder={`Kısa özet (${aktifBlogDil})`} value={(blogVeri as any)[`ozet_${aktifBlogDil}`]} onChange={e=>setBlogVeri(p=>({...p,[`ozet_${aktifBlogDil}`]:e.target.value}))} style={{...inp,resize:"vertical"}}/></div>
                          <div><label style={lbl}>İçerik ({aktifBlogDil.toUpperCase()})</label><div style={{fontSize:"11px",color:"#94a3b8",marginBottom:"4px"}}>💡 ## Başlık | - Madde | Düz metin</div><textarea rows={10} placeholder="İçerik..." value={(blogVeri as any)[`icerik_${aktifBlogDil}`]} onChange={e=>setBlogVeri(p=>({...p,[`icerik_${aktifBlogDil}`]:e.target.value}))} style={{...inp,resize:"vertical",fontFamily:"monospace",fontSize:"12px"}}/></div>
                        </div>
                        <div style={{display:"flex",gap:"8px",marginTop:"16px"}}>
                          <button onClick={blogKaydet} disabled={blogYukleniyor} style={{flex:1,background:"#534AB7",color:"#fff",border:"none",padding:"11px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:700,opacity:blogYukleniyor?0.7:1}}>{blogYukleniyor?"⏳ Kaydediliyor...":blogDuzenle?"✅ Güncelle":"✅ Kaydet"}</button>
                          <button onClick={blogFormSifirla} style={{background:"#f8f9ff",color:"#64748b",border:"1px solid #e5e7eb",padding:"11px 16px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>İptal</button>
                        </div>
                      </div>
                    )}

                    <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                      {blogYazilari.map(yazi=>(
                        <div key={yazi.id} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"16px",display:"flex",gap:"12px",alignItems:"flex-start",flexWrap:mobil?"wrap":"nowrap"}}>
                          <div style={{width:"64px",height:"64px",background:"#f0eeff",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px",flexShrink:0}}>{yazi.emoji||"📝"}</div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"4px",flexWrap:"wrap"}}>
                              <span style={{fontSize:"14px",fontWeight:700,color:"#0f0d2e"}}>{yazi.baslik_tr||yazi.baslik_en||"Başlıksız"}</span>
                              <span style={{fontSize:"10px",padding:"2px 6px",borderRadius:"8px",background:yazi.yayin?"#f0fff4":"#fff8e1",color:yazi.yayin?"#059669":"#BA7517"}}>{yazi.yayin?"✅ Yayında":"📝 Taslak"}</span>
                            </div>
                            <div style={{fontSize:"11px",color:"#94a3b8"}}>📅 {yazi.tarih} · /{yazi.slug}</div>
                          </div>
                          <div style={{display:"flex",gap:"6px",flexShrink:0,flexWrap:"wrap"}}>
                            <button onClick={()=>blogYayinDegistir(yazi.id,!yazi.yayin)} style={{background:yazi.yayin?"#fff8e1":"#f0fff4",color:yazi.yayin?"#BA7517":"#059669",border:`1px solid ${yazi.yayin?"#f0c040":"#9f9"}`,padding:"5px 10px",borderRadius:"6px",fontSize:"11px",cursor:"pointer",fontWeight:600}}>{yazi.yayin?"⏸ Taslak":"▶ Yayınla"}</button>
                            <button onClick={()=>blogDuzenleAc(yazi)} style={{background:"#f0eeff",color:"#534AB7",border:"1px solid #CECBF6",padding:"5px 10px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>✏️</button>
                            <button onClick={()=>blogSil(yazi.id)} style={{background:"#fff0f0",color:"#c00",border:"1px solid #fcc",padding:"5px 10px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>🗑</button>
                          </div>
                        </div>
                      ))}
                      {blogYazilari.length===0&&!blogForm&&(
                        <div style={{textAlign:"center",padding:"48px",background:"#fff",borderRadius:"14px",border:"1px solid #EEEDFE"}}>
                          <div style={{fontSize:"40px",marginBottom:"12px"}}>📝</div>
                          <div style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>Henüz blog yazısı yok</div>
                          <button onClick={()=>setBlogForm(true)} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:700}}>+ Yeni Yazı Ekle</button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
