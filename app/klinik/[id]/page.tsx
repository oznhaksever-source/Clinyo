"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import { useParams } from "next/navigation";
import { useDil } from "../../locales/context";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function KlinikProfil() {
  const { id } = useParams();
  const [klinik, setKlinik] = useState<any>(null);
  const [hizmetler, setHizmetler] = useState<any[]>([]);
  const [doktorlar, setDoktorlar] = useState<any[]>([]);
  const [onceSonralar, setOnceSonralar] = useState<any[]>([]);
  const [yorumlar, setYorumlar] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [aktifTab, setAktifTab] = useState("hizmetler");
  const [mobil, setMobil] = useState(false);
  const [kullanici, setKullanici] = useState<any>(null);
  const [yorumModal, setYorumModal] = useState(false);
  const [yorumForm, setYorumForm] = useState({puan:5, yorum:"", tedavi_turu:""});
  const [yorumGonderildi, setYorumGonderildi] = useState(false);
  const [yorumYukleniyor, setYorumYukleniyor] = useState(false);
  const { dil } = useDil();
  const supabase = createClient();

  const m = {
    tr:{
      hakkimizda:"Hakkımızda", hizmetler:"Hizmetler", doktorlar:"Doktorlar",
      onceSonra:"Önce/Sonra", iletisim:"İletişim", yorumlar:"Yorumlar",
      teklifAl:"Bu Klinik için Teklif Al", googleMaps:"Google Maps'te Gör",
      website:"Website", bulunamadi:"Klinik bulunamadı", yukleniyor:"Yükleniyor...",
      sosyalMedya:"Sosyal Medya", haritaGor:"Haritada Gör",
      onaylandi:"✓ Onaylı", uluslararasi:"🌍 Uluslararası Yetki",
      yorumYaz:"Yorum Yaz", yorumBaslik:"Deneyimini Paylaş",
      puanLabel:"Puanınız", tedaviLabel:"Tedavi Türü", yorumLabel:"Yorumunuz",
      tedaviPlaceholder:"Hangi tedaviyi yaptırdınız?",
      yorumPlaceholder:"Deneyimlerinizi paylaşın...",
      gonder:"Yorum Gönder", iptal:"İptal",
      yorumTesekkur:"Yorumunuz için teşekkürler! Onay sonrası yayınlanacak.",
      yorumYok:"Henüz yorum yok. İlk yorumu siz yazın!",
      ortalamaPuan:"Ortalama Puan", yorumSayisi:"yorum",
      girisYap:"Yorum yazmak için giriş yapın",
      once:"ÖNCE", sonra:"SONRA",
    },
    en:{
      hakkimizda:"About Us", hizmetler:"Services", doktorlar:"Doctors",
      onceSonra:"Before/After", iletisim:"Contact", yorumlar:"Reviews",
      teklifAl:"Get Quote from this Clinic", googleMaps:"View on Google Maps",
      website:"Website", bulunamadi:"Clinic not found", yukleniyor:"Loading...",
      sosyalMedya:"Social Media", haritaGor:"View on Map",
      onaylandi:"✓ Verified", uluslararasi:"🌍 International",
      yorumYaz:"Write a Review", yorumBaslik:"Share Your Experience",
      puanLabel:"Your Rating", tedaviLabel:"Treatment Type", yorumLabel:"Your Review",
      tedaviPlaceholder:"Which treatment did you have?",
      yorumPlaceholder:"Share your experience...",
      gonder:"Submit Review", iptal:"Cancel",
      yorumTesekkur:"Thank you for your review! It will be published after approval.",
      yorumYok:"No reviews yet. Be the first to write one!",
      ortalamaPuan:"Average Rating", yorumSayisi:"reviews",
      girisYap:"Sign in to write a review",
      once:"BEFORE", sonra:"AFTER",
    },
    de:{
      hakkimizda:"Über uns", hizmetler:"Leistungen", doktorlar:"Ärzte",
      onceSonra:"Vorher/Nachher", iletisim:"Kontakt", yorumlar:"Bewertungen",
      teklifAl:"Angebot von dieser Klinik", googleMaps:"Auf Google Maps ansehen",
      website:"Website", bulunamadi:"Klinik nicht gefunden", yukleniyor:"Wird geladen...",
      sosyalMedya:"Soziale Medien", haritaGor:"Auf Karte anzeigen",
      onaylandi:"✓ Verifiziert", uluslararasi:"🌍 International",
      yorumYaz:"Bewertung schreiben", yorumBaslik:"Erfahrung teilen",
      puanLabel:"Ihre Bewertung", tedaviLabel:"Behandlungsart", yorumLabel:"Ihre Bewertung",
      tedaviPlaceholder:"Welche Behandlung hatten Sie?",
      yorumPlaceholder:"Teilen Sie Ihre Erfahrungen...",
      gonder:"Bewertung senden", iptal:"Abbrechen",
      yorumTesekkur:"Danke für Ihre Bewertung! Sie wird nach Genehmigung veröffentlicht.",
      yorumYok:"Noch keine Bewertungen. Schreiben Sie die erste!",
      ortalamaPuan:"Durchschnittliche Bewertung", yorumSayisi:"Bewertungen",
      girisYap:"Melden Sie sich an, um eine Bewertung zu schreiben",
      once:"VORHER", sonra:"NACHHER",
    },
  };

  const t = m[dil as keyof typeof m] || m.tr;

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  useEffect(() => {
    async function veriYukle() {
      const {data:{user}} = await supabase.auth.getUser();
      if (user) {
        const {data:profile} = await supabase.from("profiles").select("*").eq("id",user.id).single();
        setKullanici(profile);
      }
      const {data:klinikData} = await supabase.from("profiles").select("*").eq("id",id).single();
      setKlinik(klinikData);
      const {data:hizmetData} = await supabase.from("klinik_hizmetler").select("*").eq("klinik_id",id).eq("aktif",true).order("kategori");
      setHizmetler(hizmetData||[]);
      const {data:doktorData} = await supabase.from("doktorlar").select("*").eq("klinik_id",id);
      setDoktorlar(doktorData||[]);
      const {data:onceSonraData} = await supabase.from("once_sonra").select("*").eq("klinik_id",id);
      setOnceSonralar(onceSonraData||[]);
      const {data:yorumData} = await supabase.from("yorumlar").select("*").eq("klinik_id",id).eq("onaylandi",true).order("created_at",{ascending:false});
      setYorumlar(yorumData||[]);
      setYukleniyor(false);
    }
    if (id) veriYukle();
  }, [id]);

  async function yorumGonder() {
    if (!yorumForm.yorum || yorumForm.yorum.length < 10) return;
    setYorumYukleniyor(true);
    const {data:{user}} = await supabase.auth.getUser();
    await supabase.from("yorumlar").insert({
      klinik_id: id,
      hasta_id: user?.id||null,
      hasta_ad: kullanici ? `${kullanici.ad} ${kullanici.soyad[0]}.` : "Anonim",
      puan: yorumForm.puan,
      yorum: yorumForm.yorum,
      tedavi_turu: yorumForm.tedavi_turu,
      onaylandi: false,
    });
    setYorumGonderildi(true);
    setYorumYukleniyor(false);
    setTimeout(()=>{setYorumModal(false);setYorumGonderildi(false);setYorumForm({puan:5,yorum:"",tedavi_turu:""});},3000);
  }

  function YildizPuan({puan, boyut=16}: {puan:number, boyut?:number}) {
    return (
      <div style={{display:"flex",gap:"2px"}}>
        {[1,2,3,4,5].map(i=>(
          <span key={i} style={{fontSize:`${boyut}px`,color:i<=puan?"#f59e0b":"#e5e7eb"}}>★</span>
        ))}
      </div>
    );
  }

  const ortalamaPuan = yorumlar.length > 0
    ? (yorumlar.reduce((s,y)=>s+y.puan,0)/yorumlar.length).toFixed(1)
    : null;

  const kategoriler = [...new Set(hizmetler.map(h=>h.kategori))];
  const embedUrl = klinik?.konum_adres
    ? `https://maps.google.com/maps?q=${encodeURIComponent(klinik.konum_adres)}&output=embed&z=15`
    : null;

  const inputStyle:React.CSSProperties = {width:"100%",border:"1px solid #e5e7eb",borderRadius:"8px",padding:"10px 12px",fontSize:"13px",outline:"none",boxSizing:"border-box"};
  const labelStyle:React.CSSProperties = {fontSize:"12px",color:"#555",display:"block",marginBottom:"6px",fontWeight:500};

  if (yukleniyor) return (
    <main style={{minHeight:"100vh",fontFamily:"sans-serif"}}>
      <Navbar/>
      <div style={{textAlign:"center",padding:"64px",color:"#888"}}>{t.yukleniyor}</div>
    </main>
  );

  if (!klinik) return (
    <main style={{minHeight:"100vh",fontFamily:"sans-serif"}}>
      <Navbar/>
      <div style={{textAlign:"center",padding:"64px",color:"#888"}}>{t.bulunamadi}</div>
    </main>
  );

  return (
    <main style={{minHeight:"100vh",background:"#f9fafb",fontFamily:"sans-serif"}}>
      <Navbar/>

      {/* Yorum Modal */}
      {yorumModal && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
          <div style={{background:"#fff",borderRadius:"16px",width:"100%",maxWidth:"480px",padding:"28px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}>
              <h3 style={{fontSize:"18px",fontWeight:700,color:"#12103a",margin:0}}>{t.yorumBaslik}</h3>
              <button onClick={()=>setYorumModal(false)} style={{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#888"}}>×</button>
            </div>
            {yorumGonderildi ? (
              <div style={{textAlign:"center",padding:"24px"}}>
                <div style={{fontSize:"48px",marginBottom:"12px"}}>✅</div>
                <div style={{fontSize:"14px",color:"#0a7a3a"}}>{t.yorumTesekkur}</div>
              </div>
            ) : !kullanici ? (
              <div style={{textAlign:"center",padding:"24px"}}>
                <div style={{fontSize:"14px",color:"#888",marginBottom:"16px"}}>{t.girisYap}</div>
                <a href="/giris" style={{background:"#534AB7",color:"#fff",padding:"10px 24px",borderRadius:"8px",fontSize:"13px",textDecoration:"none",fontWeight:600}}>Giriş Yap</a>
              </div>
            ) : (
              <div>
                {/* Puan */}
                <div style={{marginBottom:"16px"}}>
                  <label style={labelStyle}>{t.puanLabel}</label>
                  <div style={{display:"flex",gap:"8px"}}>
                    {[1,2,3,4,5].map(i=>(
                      <span key={i} onClick={()=>setYorumForm({...yorumForm,puan:i})} style={{fontSize:"32px",cursor:"pointer",color:i<=yorumForm.puan?"#f59e0b":"#e5e7eb",transition:"color .1s"}}>★</span>
                    ))}
                  </div>
                </div>
                {/* Tedavi türü */}
                <div style={{marginBottom:"12px"}}>
                  <label style={labelStyle}>{t.tedaviLabel}</label>
                  <input type="text" placeholder={t.tedaviPlaceholder} value={yorumForm.tedavi_turu} onChange={e=>setYorumForm({...yorumForm,tedavi_turu:e.target.value})} style={inputStyle}/>
                </div>
                {/* Yorum */}
                <div style={{marginBottom:"20px"}}>
                  <label style={labelStyle}>{t.yorumLabel}</label>
                  <textarea rows={4} placeholder={t.yorumPlaceholder} value={yorumForm.yorum} onChange={e=>setYorumForm({...yorumForm,yorum:e.target.value})} style={{...inputStyle,resize:"none"}}/>
                </div>
                <div style={{display:"flex",gap:"10px"}}>
                  <button onClick={()=>setYorumModal(false)} style={{flex:1,background:"#f9fafb",color:"#555",border:"1px solid #e5e7eb",padding:"11px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>{t.iptal}</button>
                  <button onClick={yorumGonder} disabled={yorumYukleniyor||yorumForm.yorum.length<10} style={{flex:2,background:yorumForm.yorum.length>=10?"#534AB7":"#ccc",color:"#fff",border:"none",padding:"11px",borderRadius:"8px",fontSize:"13px",cursor:yorumForm.yorum.length>=10?"pointer":"not-allowed",fontWeight:600,opacity:yorumYukleniyor?0.7:1}}>
                    {yorumYukleniyor?"...":t.gonder}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Kapak */}
      <div style={{position:"relative",height:mobil?"200px":"300px",background:"linear-gradient(135deg,#12103a,#1e1b4b)",overflow:"hidden"}}>
        {klinik.kapak_fotograf && (
          <img src={klinik.kapak_fotograf} alt={klinik.ad} style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.6}}/>
        )}
        <div style={{position:"absolute",bottom:"24px",left:mobil?"16px":"32px",right:mobil?"16px":"32px"}}>
          <div style={{display:"flex",gap:"8px",marginBottom:"8px",flexWrap:"wrap"}}>
            <span style={{background:"#059669",color:"#fff",fontSize:"11px",fontWeight:700,padding:"4px 10px",borderRadius:"20px"}}>{t.onaylandi}</span>
            {klinik.uluslararasi_yetki && (
              <span style={{background:"#534AB7",color:"#fff",fontSize:"11px",fontWeight:700,padding:"4px 10px",borderRadius:"20px"}}>{t.uluslararasi}</span>
            )}
          </div>
          <h1 style={{color:"#fff",fontSize:mobil?"22px":"32px",fontWeight:700,marginBottom:"6px"}}>{klinik.ad} {klinik.soyad}</h1>
          <div style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>
            {klinik.konum_adres && <p style={{color:"#aab4c8",fontSize:"13px",margin:0}}>📍 {klinik.konum_adres}</p>}
            {ortalamaPuan && (
              <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                <span style={{color:"#f59e0b",fontSize:"16px"}}>★</span>
                <span style={{color:"#fff",fontSize:"14px",fontWeight:700}}>{ortalamaPuan}</span>
                <span style={{color:"#aab4c8",fontSize:"12px"}}>({yorumlar.length} {t.yorumSayisi})</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1100px",margin:"0 auto",padding:mobil?"16px":"32px"}}>
        <div style={{display:"grid",gridTemplateColumns:mobil?"1fr":"1fr 300px",gap:"24px",alignItems:"start"}}>

          {/* Sol */}
          <div>
            {/* Hakkımızda */}
            {klinik.tanitim_yazisi && (
              <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px",marginBottom:"16px"}}>
                <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",marginBottom:"10px"}}>{t.hakkimizda}</h2>
                <p style={{fontSize:"14px",color:"#555",lineHeight:"1.7",margin:0}}>{klinik.tanitim_yazisi}</p>
              </div>
            )}

            {/* Tablar */}
            <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",overflow:"hidden",marginBottom:"16px"}}>
              <div style={{display:"flex",borderBottom:"1px solid #EEEDFE",overflowX:"auto"}}>
                {[
                  {id:"hizmetler",ad:`${t.hizmetler} (${hizmetler.length})`},
                  {id:"doktorlar",ad:`${t.doktorlar} (${doktorlar.length})`},
                  {id:"once-sonra",ad:`${t.onceSonra} (${onceSonralar.length})`},
                  {id:"yorumlar",ad:`${t.yorumlar} (${yorumlar.length})`},
                ].map(tab=>(
                  <button key={tab.id} onClick={()=>setAktifTab(tab.id)} style={{flex:1,padding:"12px 8px",border:"none",background:aktifTab===tab.id?"#EEEDFE":"#fff",color:aktifTab===tab.id?"#534AB7":"#888",fontSize:mobil?"11px":"13px",fontWeight:aktifTab===tab.id?700:400,cursor:"pointer",borderBottom:aktifTab===tab.id?"2px solid #534AB7":"none",whiteSpace:"nowrap"}}>
                    {tab.ad}
                  </button>
                ))}
              </div>

              <div style={{padding:"20px"}}>
                {/* HİZMETLER */}
                {aktifTab==="hizmetler" && (
                  <div>
                    {kategoriler.map(kat=>(
                      <div key={kat} style={{marginBottom:"20px"}}>
                        <h3 style={{fontSize:"13px",fontWeight:700,color:"#534AB7",marginBottom:"8px",paddingBottom:"6px",borderBottom:"1px solid #EEEDFE"}}>{kat}</h3>
                        <table style={{width:"100%",borderCollapse:"collapse"}}>
                          <tbody>
                            {hizmetler.filter(h=>h.kategori===kat).map(h=>(
                              <tr key={h.id} style={{borderBottom:"1px solid #f5f5f5"}}>
                                <td style={{padding:"10px 0",fontSize:"13px",color:"#12103a"}}>
                                  <div style={{fontWeight:600}}>{h.hizmet_adi}</div>
                                  {h.aciklama&&<div style={{fontSize:"11px",color:"#888",marginTop:"2px"}}>{h.aciklama}</div>}
                                </td>
                                {h.sure&&<td style={{padding:"10px",fontSize:"12px",color:"#888",textAlign:"center",whiteSpace:"nowrap"}}>{h.sure}</td>}
                                <td style={{padding:"10px 0",fontSize:"14px",fontWeight:700,color:"#534AB7",textAlign:"right",whiteSpace:"nowrap"}}>{h.fiyat} {h.para_birimi}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                    {hizmetler.length===0&&<div style={{textAlign:"center",padding:"32px",color:"#888",fontSize:"13px"}}>-</div>}
                  </div>
                )}

                {/* DOKTORLAR */}
                {aktifTab==="doktorlar" && (
                  <div style={{display:"grid",gridTemplateColumns:mobil?"1fr 1fr":"repeat(3,1fr)",gap:"12px"}}>
                    {doktorlar.map(d=>(
                      <div key={d.id} style={{textAlign:"center",padding:"16px",border:"1px solid #EEEDFE",borderRadius:"10px"}}>
                        {d.fotograf_url
                          ?<img src={d.fotograf_url} alt={d.ad} style={{width:"64px",height:"64px",objectFit:"cover",borderRadius:"50%",marginBottom:"8px"}}/>
                          :<div style={{width:"64px",height:"64px",background:"#EEEDFE",borderRadius:"50%",margin:"0 auto 8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",color:"#534AB7",fontWeight:700}}>{d.ad[0]}</div>
                        }
                        <div style={{fontSize:"13px",fontWeight:700,color:"#12103a",marginBottom:"3px"}}>{d.ad}</div>
                        <div style={{fontSize:"11px",color:"#534AB7"}}>{d.uzmanlik}</div>
                      </div>
                    ))}
                    {doktorlar.length===0&&<div style={{gridColumn:"1/-1",textAlign:"center",padding:"32px",color:"#888",fontSize:"13px"}}>-</div>}
                  </div>
                )}

                {/* ÖNCE SONRA */}
                {aktifTab==="once-sonra" && (
                  <div style={{display:"grid",gridTemplateColumns:mobil?"1fr":"1fr 1fr",gap:"16px"}}>
                    {onceSonralar.map(os=>(
                      <div key={os.id} style={{border:"1px solid #EEEDFE",borderRadius:"10px",overflow:"hidden"}}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
                          <div>
                            <div style={{fontSize:"11px",color:"#888",padding:"6px 10px",background:"#f9fafb",textAlign:"center"}}>{t.once}</div>
                            {os.once_fotograf&&<img src={os.once_fotograf} alt="Önce" style={{width:"100%",height:"130px",objectFit:"cover"}}/>}
                          </div>
                          <div>
                            <div style={{fontSize:"11px",color:"#0a7a3a",padding:"6px 10px",background:"#f0fff4",textAlign:"center"}}>{t.sonra}</div>
                            {os.sonra_fotograf&&<img src={os.sonra_fotograf} alt="Sonra" style={{width:"100%",height:"130px",objectFit:"cover"}}/>}
                          </div>
                        </div>
                        {os.hizmet_adi&&<div style={{padding:"10px 12px",fontSize:"12px",fontWeight:600,color:"#12103a"}}>{os.hizmet_adi}</div>}
                      </div>
                    ))}
                    {onceSonralar.length===0&&<div style={{gridColumn:"1/-1",textAlign:"center",padding:"32px",color:"#888",fontSize:"13px"}}>-</div>}
                  </div>
                )}

                {/* YORUMLAR */}
                {aktifTab==="yorumlar" && (
                  <div>
                    {/* Özet */}
                    {ortalamaPuan && (
                      <div style={{background:"#f0eeff",borderRadius:"10px",padding:"16px",marginBottom:"16px",display:"flex",alignItems:"center",gap:"16px"}}>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:"36px",fontWeight:800,color:"#534AB7"}}>{ortalamaPuan}</div>
                          <YildizPuan puan={Math.round(parseFloat(ortalamaPuan))} boyut={14}/>
                          <div style={{fontSize:"11px",color:"#888",marginTop:"4px"}}>{yorumlar.length} {t.yorumSayisi}</div>
                        </div>
                        <div style={{flex:1}}>
                          {[5,4,3,2,1].map(p=>{
                            const sayi = yorumlar.filter(y=>y.puan===p).length;
                            const yuzde = yorumlar.length>0?(sayi/yorumlar.length)*100:0;
                            return(
                              <div key={p} style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                                <span style={{fontSize:"11px",color:"#888",width:"8px"}}>{p}</span>
                                <span style={{color:"#f59e0b",fontSize:"11px"}}>★</span>
                                <div style={{flex:1,background:"#e5e7eb",borderRadius:"4px",height:"6px",overflow:"hidden"}}>
                                  <div style={{background:"#f59e0b",height:"100%",width:`${yuzde}%`,transition:"width .3s",borderRadius:"4px"}}/>
                                </div>
                                <span style={{fontSize:"11px",color:"#888",width:"16px"}}>{sayi}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Yorum listesi */}
                    <div style={{display:"flex",flexDirection:"column",gap:"12px",marginBottom:"16px"}}>
                      {yorumlar.map(y=>(
                        <div key={y.id} style={{background:"#f9fafb",border:"1px solid #EEEDFE",borderRadius:"10px",padding:"14px"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
                            <div>
                              <div style={{fontSize:"13px",fontWeight:700,color:"#12103a"}}>{y.hasta_ad}</div>
                              {y.tedavi_turu&&<div style={{fontSize:"11px",color:"#534AB7",marginTop:"2px"}}>💊 {y.tedavi_turu}</div>}
                            </div>
                            <div style={{textAlign:"right"}}>
                              <YildizPuan puan={y.puan} boyut={13}/>
                              <div style={{fontSize:"11px",color:"#94a3b8",marginTop:"2px"}}>{new Date(y.created_at).toLocaleDateString(dil==="tr"?"tr-TR":dil==="de"?"de-DE":"en-GB")}</div>
                            </div>
                          </div>
                          <p style={{fontSize:"13px",color:"#555",lineHeight:1.6,margin:0}}>{y.yorum}</p>
                        </div>
                      ))}
                      {yorumlar.length===0&&(
                        <div style={{textAlign:"center",padding:"32px",color:"#888",fontSize:"13px"}}>{t.yorumYok}</div>
                      )}
                    </div>

                    {/* Yorum yaz butonu */}
                    <button onClick={()=>setYorumModal(true)} style={{width:"100%",background:"#534AB7",color:"#fff",border:"none",padding:"12px",borderRadius:"10px",fontSize:"14px",cursor:"pointer",fontWeight:600}}>
                      ✏️ {t.yorumYaz}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Google Maps */}
            {embedUrl && (
              <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",overflow:"hidden",marginBottom:"16px"}}>
                <div style={{padding:"14px 20px",borderBottom:"1px solid #EEEDFE",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <h2 style={{fontSize:"15px",fontWeight:700,color:"#12103a",margin:0}}>📍 {t.haritaGor}</h2>
                  {klinik.google_maps_url&&(
                    <a href={klinik.google_maps_url} target="_blank" rel="noreferrer" style={{fontSize:"12px",color:"#534AB7",textDecoration:"none"}}>{t.googleMaps} →</a>
                  )}
                </div>
                <iframe src={embedUrl} width="100%" height="250" style={{border:"none",display:"block"}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
              </div>
            )}
          </div>

          {/* Sağ — Sticky Panel */}
          <div style={{position:mobil?"static":"sticky",top:"20px"}}>
            {/* Teklif Al */}
            <div style={{background:"linear-gradient(135deg,#534AB7,#7F77DD)",borderRadius:"12px",padding:"20px",marginBottom:"16px",textAlign:"center"}}>
              <div style={{fontSize:"13px",color:"rgba(255,255,255,0.8)",marginBottom:"8px"}}>
                {dil==="tr"?"Bu klinikten teklif alın":dil==="en"?"Get a quote from this clinic":"Angebot von dieser Klinik"}
              </div>
              <a
                href={`/teklif?klinik=${id}`}
                style={{display:"block",background:"#fff",color:"#534AB7",padding:"12px",borderRadius:"8px",fontSize:"14px",textDecoration:"none",fontWeight:700,marginBottom:"8px"}}
              >
                {t.teklifAl}
              </a>
              {ortalamaPuan && (
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",marginTop:"8px"}}>
                  <span style={{color:"#f59e0b",fontSize:"16px"}}>★</span>
                  <span style={{color:"#fff",fontSize:"14px",fontWeight:700}}>{ortalamaPuan}</span>
                  <span style={{color:"rgba(255,255,255,0.7)",fontSize:"12px"}}>({yorumlar.length} {t.yorumSayisi})</span>
                </div>
              )}
            </div>

            {/* İletişim */}
            <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px",marginBottom:"16px"}}>
              <h3 style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"14px"}}>{t.iletisim}</h3>
              {klinik.telefon&&(
                <a href={`tel:${klinik.telefon}`} style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 0",borderBottom:"1px solid #f5f5f5",textDecoration:"none",color:"#12103a"}}>
                  <span style={{fontSize:"18px"}}>📞</span>
                  <span style={{fontSize:"13px"}}>{klinik.telefon}</span>
                </a>
              )}
              {klinik.website&&(
                <a href={klinik.website} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 0",borderBottom:"1px solid #f5f5f5",textDecoration:"none",color:"#534AB7"}}>
                  <span style={{fontSize:"18px"}}>🌐</span>
                  <span style={{fontSize:"13px"}}>{t.website}</span>
                </a>
              )}
              {klinik.instagram&&(
                <a href={`https://instagram.com/${klinik.instagram.replace("@","")}`} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 0",borderBottom:"1px solid #f5f5f5",textDecoration:"none",color:"#E1306C"}}>
                  <span style={{fontSize:"18px"}}>📸</span>
                  <span style={{fontSize:"13px"}}>{klinik.instagram}</span>
                </a>
              )}
              {klinik.google_maps_url&&(
                <a href={klinik.google_maps_url} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 0",textDecoration:"none",color:"#185FA5"}}>
                  <span style={{fontSize:"18px"}}>📍</span>
                  <span style={{fontSize:"13px"}}>{t.googleMaps}</span>
                </a>
              )}
            </div>

            {/* Sosyal Medya */}
            {(klinik.instagram||klinik.facebook||klinik.twitter)&&(
              <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px"}}>
                <h3 style={{fontSize:"14px",fontWeight:700,color:"#12103a",marginBottom:"12px"}}>{t.sosyalMedya}</h3>
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                  {klinik.instagram&&<a href={`https://instagram.com/${klinik.instagram.replace("@","")}`} target="_blank" rel="noreferrer" style={{background:"#E1306C",color:"#fff",padding:"7px 14px",borderRadius:"8px",fontSize:"12px",textDecoration:"none"}}>Instagram</a>}
                  {klinik.facebook&&<a href={klinik.facebook} target="_blank" rel="noreferrer" style={{background:"#1877F2",color:"#fff",padding:"7px 14px",borderRadius:"8px",fontSize:"12px",textDecoration:"none"}}>Facebook</a>}
                  {klinik.twitter&&<a href={`https://twitter.com/${klinik.twitter.replace("@","")}`} target="_blank" rel="noreferrer" style={{background:"#1DA1F2",color:"#fff",padding:"7px 14px",borderRadius:"8px",fontSize:"12px",textDecoration:"none"}}>Twitter</a>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  );
}
