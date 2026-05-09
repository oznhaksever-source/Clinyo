"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ONAM_METINLER = {
  tr: {
    basvuruKimin: "Bu başvuru kimin adına yapılıyor?",
    kendim: "Kendi adıma",
    baskaAdina: "Başkası adına (yakın, çocuk, vasi)",
    baskaAdinaAciklama: "Adına başvurduğunuz kişinin adı soyadı:",
    baskaAdinaPlaceholder: "Ad Soyad",
    onay1: "Girdiğim tüm bilgilerin doğru ve güncel olduğunu beyan ediyorum.",
    onay2: "Kliniklerden gelecek tekliflerin ön bilgi niteliğinde olduğunu ve nihai sözleşmenin klinik ile yapılacağını anlıyorum.",
    onay3: "Teklif almak, sağlık hizmeti satın almak anlamına gelmediğini ve tedavi kararının tamamen bana ait olduğunu anlıyorum.",
    onay4: "Girdiğim bilgilerin ve diş şeması verilerinin yalnızca teklif almak amacıyla seçtiğim kliniklerle paylaşılacağını onaylıyorum.",
    onay5: "Medoqa'nın dijital bir aracılık platformu olduğunu ve tıbbi sorumluluk taşımadığını anlıyorum.",
    zorunlu: "* Zorunlu",
    onayUyari: "Lütfen tüm zorunlu kutuları işaretleyiniz.",
  },
  en: {
    basvuruKimin: "Who is this application for?",
    kendim: "For myself",
    baskaAdina: "On behalf of someone else (relative, child, guardian)",
    baskaAdinaAciklama: "Full name of the person you are applying for:",
    baskaAdinaPlaceholder: "Full Name",
    onay1: "I declare that all information I have entered is accurate and current.",
    onay2: "I understand that quotes from clinics are preliminary and the final contract will be made with the clinic.",
    onay3: "I understand that requesting a quote does not constitute purchasing healthcare services and the treatment decision is entirely mine.",
    onay4: "I confirm that my information and dental chart data will only be shared with the clinics I select for quote purposes.",
    onay5: "I understand that Medoqa is a digital intermediary platform and bears no medical liability.",
    zorunlu: "* Required",
    onayUyari: "Please check all required boxes.",
  },
  de: {
    basvuruKimin: "Für wen wird dieser Antrag gestellt?",
    kendim: "Für mich selbst",
    baskaAdina: "Im Namen einer anderen Person (Verwandter, Kind, Vormund)",
    baskaAdinaAciklama: "Vollständiger Name der Person, für die Sie beantragen:",
    baskaAdinaPlaceholder: "Vor- und Nachname",
    onay1: "Ich erkläre, dass alle von mir eingegebenen Informationen korrekt und aktuell sind.",
    onay2: "Ich verstehe, dass Angebote von Kliniken vorläufig sind und der endgültige Vertrag mit der Klinik geschlossen wird.",
    onay3: "Ich verstehe, dass eine Angebotsanfrage nicht den Kauf von Gesundheitsdienstleistungen bedeutet und die Behandlungsentscheidung ausschließlich bei mir liegt.",
    onay4: "Ich bestätige, dass meine Daten und Zahnschemadaten nur mit den von mir ausgewählten Kliniken zum Zweck der Angebotseinholung geteilt werden.",
    onay5: "Ich verstehe, dass Medoqa eine digitale Vermittlungsplattform ist und keine medizinische Haftung trägt.",
    zorunlu: "* Erforderlich",
    onayUyari: "Bitte markieren Sie alle erforderlichen Felder.",
  },
};

export default function TeklifTalep() {
  const [adim, setAdim] = useState(1);
  const [tedavi, setTedavi] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [ulke, setUlke] = useState("");
  const [gonderildi, setGonderildi] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");
  const [fotograflar, setFotograflar] = useState<string[]>([]);
  const [fotografYukleniyor, setFotografYukleniyor] = useState(false);
  const [mobil, setMobil] = useState(false);

  // Onam state'leri
  const [basvuranTur, setBasvuranTur] = useState<"kendim"|"baska">("kendim");
  const [basvurulanadAd, setBasvurulanadAd] = useState("");
  const [onaylar, setOnaylar] = useState<Record<string,boolean>>({});
  const [onayUyari, setOnayUyari] = useState(false);

  const { t, dil } = useDil();
  const om = ONAM_METINLER[dil as keyof typeof ONAM_METINLER] || ONAM_METINLER.tr;
  const supabase = createClient();

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  const tedaviler = [
    { id:"implant", tr:"İmplant", en:"Implant", de:"Implantat", aciklamaTr:"Eksik diş yerine kalıcı implant", aciklamaEn:"Permanent implant for missing tooth", aciklamaDe:"Dauerhaftes Implantat" },
    { id:"zirkonyum", tr:"Zirkonyum Kaplama", en:"Zirconia Crown", de:"Zirkonkrone", aciklamaTr:"Estetik diş kaplama", aciklamaEn:"Aesthetic dental crown", aciklamaDe:"Ästhetische Zahnkrone" },
    { id:"sac-ekimi", tr:"Saç Ekimi", en:"Hair Transplant", de:"Haartransplantation", aciklamaTr:"FUE / DHI yöntemi", aciklamaEn:"FUE / DHI method", aciklamaDe:"FUE / DHI Methode" },
    { id:"goz", tr:"Göz Ameliyatı", en:"Eye Surgery", de:"Augenoperation", aciklamaTr:"Laser, Lasik, Lasek", aciklamaEn:"Laser, Lasik, Lasek", aciklamaDe:"Laser, Lasik, Lasek" },
    { id:"burun", tr:"Burun Estetiği", en:"Rhinoplasty", de:"Rhinoplastik", aciklamaTr:"Rinoplasti", aciklamaEn:"Nose job", aciklamaDe:"Nasenkorrektur" },
    { id:"dis-beyazlatma", tr:"Diş Beyazlatma", en:"Teeth Whitening", de:"Zahnaufhellung", aciklamaTr:"Profesyonel beyazlatma", aciklamaEn:"Professional whitening", aciklamaDe:"Professionelle Aufhellung" },
    { id:"kanal", tr:"Kanal Tedavisi", en:"Root Canal", de:"Wurzelkanal", aciklamaTr:"Kök kanal tedavisi", aciklamaEn:"Root canal treatment", aciklamaDe:"Wurzelkanalbehandlung" },
    { id:"diger", tr:"Diğer", en:"Other", de:"Sonstiges", aciklamaTr:"Başka bir tedavi", aciklamaEn:"Other treatment", aciklamaDe:"Andere Behandlung" },
  ];

  const ulkeler = {
    tr:["Almanya","İngiltere","Hollanda","Avusturya","Fransa","İsviçre","Belçika","Türkiye","Diğer"],
    en:["Germany","United Kingdom","Netherlands","Austria","France","Switzerland","Belgium","Turkey","Other"],
    de:["Deutschland","Vereinigtes Königreich","Niederlande","Österreich","Frankreich","Schweiz","Belgien","Türkei","Sonstiges"],
  };

  const onayListesi = [
    { id:"onay1", metin:om.onay1, zorunlu:true },
    { id:"onay2", metin:om.onay2, zorunlu:true },
    { id:"onay3", metin:om.onay3, zorunlu:true },
    { id:"onay4", metin:om.onay4, zorunlu:true },
    { id:"onay5", metin:om.onay5, zorunlu:true },
  ];

  const tumZorunluIsaretli = onayListesi.filter(o=>o.zorunlu).every(o=>onaylar[o.id]);
  const baskaAdinaGecerli = basvuranTur === "kendim" || (basvuranTur === "baska" && basvurulanadAd.trim().length > 2);

  async function fotografYukle(files: FileList) {
    setFotografYukleniyor(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const dosyaAdi = `talepler/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from("medoqa-images").upload(dosyaAdi, file);
      if (!error) {
        const { data:url } = supabase.storage.from("medoqa-images").getPublicUrl(dosyaAdi);
        urls.push(url.publicUrl);
      }
    }
    setFotograflar(prev=>[...prev,...urls]);
    setFotografYukleniyor(false);
  }

  async function gonder() {
    if (!tumZorunluIsaretli || !baskaAdinaGecerli) {
      setOnayUyari(true);
      return;
    }
    setYukleniyor(true);
    setHata("");
    const { data:{user} } = await supabase.auth.getUser();

    const { data:talepData, error } = await supabase.from("talepler").insert({
      hasta_id: user?.id || null,
      tedavi_turu: tedavi,
      aciklama,
      durum: "beklemede",
      hasta_ad: ad,
      hasta_soyad: soyad,
      hasta_email: email,
      hasta_telefon: telefon,
      hasta_ulke: ulke,
      fotograflar: fotograflar.length > 0 ? fotograflar : null,
    }).select().single();

    if (error) {
      setHata("Hata: "+error.message);
      setYukleniyor(false);
      return;
    }

    // Onam kaydet
    if (user && talepData) {
      await supabase.from("hasta_onamlar").insert({
        kullanici_id: user.id,
        onam_turu: "teklif",
        talep_id: talepData.id,
        onam_versiyonu: "2.0",
        zorunlu_onaylar: {
          ...onaylar,
          basvuran_tur: basvuranTur,
          basvurulan_ad: basvuranTur === "baska" ? basvurulanadAd : null,
        },
        saglik_verisi_onami: !!onaylar["onay4"],
        ticari_iletisim_onami: false,
      });
    }

    await fetch("/api/bildirim-gonder", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ tip:"yeni_talep", tedavi, hasta_ad:ad, hasta_soyad:soyad, hasta_email:email, hasta_ulke:ulke, aciklama }),
    });

    setGonderildi(true);
  }

  const inputStyle = { width:"100%", border:"1px solid #e5e7eb", borderRadius:"10px", padding:"12px 14px", fontSize:"14px", boxSizing:"border-box" as const, outline:"none", fontFamily:"inherit" };
  const labelStyle = { fontSize:"13px", color:"#555", display:"block" as const, marginBottom:"6px", fontWeight:500 };

  if (gonderildi) return (
    <main style={{minHeight:"100vh",background:"#0d2144",fontFamily:"'Segoe UI', sans-serif",display:"flex",flexDirection:"column"}}>
      <Navbar/>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"}}>
        <div style={{background:"#fff",borderRadius:"20px",padding:mobil?"32px 24px":"48px",textAlign:"center",maxWidth:"440px",width:"100%"}}>
          <div style={{width:"64px",height:"64px",background:"#e6f4ea",borderRadius:"50%",margin:"0 auto 20px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px"}}>✓</div>
          <h2 style={{fontSize:"22px",fontWeight:700,color:"#1a1a1a",marginBottom:"12px"}}>{t.teklif.basarili}</h2>
          <p style={{fontSize:"14px",color:"#888",marginBottom:"24px",lineHeight:1.6}}>{t.teklif.basariliAciklama}</p>
          <a href="/" style={{display:"block",background:"#534AB7",color:"#fff",padding:"13px",borderRadius:"10px",fontSize:"14px",textDecoration:"none",fontWeight:600}}>{t.teklif.anaSayfayaDon}</a>
        </div>
      </div>
    </main>
  );

  return (
    <main style={{minHeight:"100vh",background:"#0d2144",fontFamily:"'Segoe UI', sans-serif"}}>
      <Navbar/>
      <div style={{maxWidth:"640px",margin:"0 auto",padding:mobil?"24px 16px":"32px"}}>
        <div style={{textAlign:"center",marginBottom:"28px"}}>
          <h1 style={{color:"#fff",fontSize:mobil?"24px":"28px",fontWeight:700,marginBottom:"8px"}}>{t.teklif.baslik}</h1>
          <p style={{color:"#7a90b0",fontSize:"14px"}}>{t.teklif.altBaslik}</p>
        </div>

        {/* Adım göstergesi */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0",marginBottom:"28px"}}>
          {[1,2,3].map(s=>(
            <div key={s} style={{display:"flex",alignItems:"center"}}>
              <div style={{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:600,background:adim>=s?"#534AB7":"#1a2a3a",color:adim>=s?"#fff":"#5a7a9a"}}>
                {adim>s?"✓":s}
              </div>
              {s<3 && <div style={{width:mobil?"60px":"80px",height:"2px",background:adim>s?"#534AB7":"#1a2a3a"}}/>}
            </div>
          ))}
        </div>

        {hata && <div style={{background:"#fff0f0",border:"1px solid #fcc",borderRadius:"8px",padding:"10px 16px",marginBottom:"16px",fontSize:"13px",color:"#c00"}}>{hata}</div>}

        <div style={{background:"#fff",borderRadius:"20px",padding:mobil?"24px 20px":"32px"}}>

          {/* ADIM 1 */}
          {adim===1 && (
            <div>
              <h2 style={{fontSize:"17px",fontWeight:700,color:"#1a1a1a",marginBottom:"6px"}}>{t.teklif.hangiTedavi}</h2>
              <p style={{fontSize:"13px",color:"#888",marginBottom:"20px"}}>{t.teklif.tedaviSec}</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"20px"}}>
                {tedaviler.map(ted=>{
                  const tedAd = dil==="tr"?ted.tr:dil==="en"?ted.en:ted.de;
                  const ac = dil==="tr"?ted.aciklamaTr:dil==="en"?ted.aciklamaEn:ted.aciklamaDe;
                  return (
                    <div key={ted.id} onClick={()=>setTedavi(tedAd)} style={{border:tedavi===tedAd?"2px solid #534AB7":"1px solid #e5e7eb",borderRadius:"12px",padding:"14px 12px",cursor:"pointer",background:tedavi===tedAd?"#f0eeff":"#fff"}}>
                      <div style={{fontSize:"13px",fontWeight:600,color:tedavi===tedAd?"#534AB7":"#1a1a1a",marginBottom:"3px"}}>{tedAd}</div>
                      <div style={{fontSize:"11px",color:"#888"}}>{ac}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{marginBottom:"20px"}}>
                <label style={labelStyle}>{t.teklif.aciklamaLabel}</label>
                <textarea rows={3} value={aciklama} onChange={e=>setAciklama(e.target.value)} style={{...inputStyle,resize:"none"}}/>
              </div>
              <button onClick={()=>{if(tedavi)setAdim(2);}} style={{width:"100%",background:tedavi?"#534AB7":"#ccc",color:"#fff",border:"none",padding:"14px",borderRadius:"10px",fontSize:"15px",cursor:tedavi?"pointer":"not-allowed",fontWeight:600}}>
                {t.teklif.devamEt}
              </button>
            </div>
          )}

          {/* ADIM 2 */}
          {adim===2 && (
            <div>
              <h2 style={{fontSize:"17px",fontWeight:700,color:"#1a1a1a",marginBottom:"6px"}}>{t.teklif.iletisimBilgileri}</h2>
              <p style={{fontSize:"13px",color:"#888",marginBottom:"20px"}}>{t.teklif.iletisimAciklama}</p>
              <div style={{display:"grid",gridTemplateColumns:mobil?"1fr":"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                <div>
                  <label style={labelStyle}>{t.teklif.ad}</label>
                  <input type="text" value={ad} onChange={e=>setAd(e.target.value)} style={inputStyle}/>
                </div>
                <div>
                  <label style={labelStyle}>{t.teklif.soyad}</label>
                  <input type="text" value={soyad} onChange={e=>setSoyad(e.target.value)} style={inputStyle}/>
                </div>
              </div>
              <div style={{marginBottom:"12px"}}>
                <label style={labelStyle}>{t.teklif.eposta}</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle}/>
              </div>
              <div style={{marginBottom:"12px"}}>
                <label style={labelStyle}>{t.teklif.telefon}</label>
                <input type="tel" value={telefon} onChange={e=>setTelefon(e.target.value)} style={inputStyle}/>
              </div>
              <div style={{marginBottom:"12px"}}>
                <label style={labelStyle}>{dil==="tr"?"X-Ray / Fotoğraf (opsiyonel)":dil==="en"?"X-Ray / Photo (optional)":"X-Ray / Foto (optional)"}</label>
                <input type="file" accept="image/*" multiple onChange={e=>{if(e.target.files)fotografYukle(e.target.files);}} style={{...inputStyle,padding:"8px 12px"}}/>
                {fotografYukleniyor && <div style={{fontSize:"12px",color:"#888",marginTop:"4px"}}>{dil==="tr"?"Yükleniyor...":"Uploading..."}</div>}
                {fotograflar.length>0 && (
                  <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"8px"}}>
                    {fotograflar.map((url,i)=>(<img key={i} src={url} alt="foto" style={{width:"56px",height:"56px",objectFit:"cover",borderRadius:"6px",border:"1px solid #e5e7eb"}}/>))}
                  </div>
                )}
              </div>
              <div style={{marginBottom:"20px"}}>
                <label style={labelStyle}>{t.teklif.ulke}</label>
                <select value={ulke} onChange={e=>setUlke(e.target.value)} style={{...inputStyle,background:"#fff"}}>
                  <option value="">{t.teklif.ulkeSec}</option>
                  {(ulkeler[dil as keyof typeof ulkeler]||ulkeler.tr).map(u=><option key={u}>{u}</option>)}
                </select>
              </div>
              <div style={{display:"flex",gap:"10px"}}>
                <button onClick={()=>setAdim(1)} style={{flex:1,background:"#f9fafb",color:"#555",border:"1px solid #e5e7eb",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:"pointer"}}>{t.teklif.geri}</button>
                <button onClick={()=>{if(ad&&email&&ulke)setAdim(3);}} style={{flex:2,background:ad&&email&&ulke?"#534AB7":"#ccc",color:"#fff",border:"none",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:ad&&email&&ulke?"pointer":"not-allowed",fontWeight:600}}>
                  {t.teklif.devamEt}
                </button>
              </div>
            </div>
          )}

          {/* ADIM 3 — ÖZET + ONAM */}
          {adim===3 && (
            <div>
              <h2 style={{fontSize:"17px",fontWeight:700,color:"#1a1a1a",marginBottom:"6px"}}>{t.teklif.onayla}</h2>
              <p style={{fontSize:"13px",color:"#888",marginBottom:"20px"}}>{t.teklif.onaylaAciklama}</p>

              {/* Özet */}
              <div style={{background:"#f9fafb",borderRadius:"12px",padding:"20px",marginBottom:"20px"}}>
                {[
                  {etiket:dil==="tr"?"Tedavi":dil==="en"?"Treatment":"Behandlung", deger:tedavi},
                  {etiket:`${t.teklif.ad} ${t.teklif.soyad}`, deger:`${ad} ${soyad}`},
                  {etiket:"Email", deger:email},
                  {etiket:t.teklif.telefon, deger:telefon},
                  {etiket:t.teklif.ulke, deger:ulke},
                ].map(b=>(
                  <div key={b.etiket} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #efefef",fontSize:"13px",gap:"12px"}}>
                    <span style={{color:"#888",flexShrink:0}}>{b.etiket}</span>
                    <span style={{color:"#1a1a1a",fontWeight:500,textAlign:"right"}}>{b.deger}</span>
                  </div>
                ))}
              </div>

              {/* Başvuruyu kimin adına */}
              <div style={{background:"#f0eeff",border:"1px solid #CECBF6",borderRadius:"12px",padding:"16px",marginBottom:"16px"}}>
                <div style={{fontSize:"13px",fontWeight:700,color:"#12103a",marginBottom:"12px"}}>{om.basvuruKimin}</div>
                <label style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",marginBottom:"8px"}}>
                  <input type="radio" name="basvuranTur" checked={basvuranTur==="kendim"} onChange={()=>setBasvuranTur("kendim")} style={{width:"16px",height:"16px"}}/>
                  <span style={{fontSize:"13px",color:"#333"}}>{om.kendim}</span>
                </label>
                <label style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",marginBottom:"8px"}}>
                  <input type="radio" name="basvuranTur" checked={basvuranTur==="baska"} onChange={()=>setBasvuranTur("baska")} style={{width:"16px",height:"16px"}}/>
                  <span style={{fontSize:"13px",color:"#333"}}>{om.baskaAdina}</span>
                </label>
                {basvuranTur==="baska" && (
                  <div style={{marginTop:"10px"}}>
                    <label style={{...labelStyle,color:"#534AB7"}}>{om.baskaAdinaAciklama}</label>
                    <input type="text" placeholder={om.baskaAdinaPlaceholder} value={basvurulanadAd} onChange={e=>setBasvurulanadAd(e.target.value)} style={{...inputStyle,borderColor:"#534AB7"}}/>
                  </div>
                )}
              </div>

              {/* Onay kutuları */}
              <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"16px",marginBottom:"16px"}}>
                <div style={{fontSize:"13px",fontWeight:700,color:"#12103a",marginBottom:"12px"}}>
                  {dil==="tr"?"Lütfen aşağıdakileri onaylayınız:":dil==="en"?"Please confirm the following:":"Bitte bestätigen Sie folgendes:"}
                </div>
                {onayListesi.map(onay=>(
                  <label key={onay.id} style={{display:"flex",gap:"10px",alignItems:"flex-start",marginBottom:"12px",cursor:"pointer"}}>
                    <input
                      type="checkbox"
                      checked={!!onaylar[onay.id]}
                      onChange={e=>{ setOnaylar(prev=>({...prev,[onay.id]:e.target.checked})); setOnayUyari(false); }}
                      style={{marginTop:"2px",width:"16px",height:"16px",flexShrink:0,cursor:"pointer"}}
                    />
                    <span style={{fontSize:"13px",color:"#333",lineHeight:"1.5"}}>
                      {onay.metin}
                      {onay.zorunlu && <span style={{color:"#c00",marginLeft:"4px",fontSize:"11px"}}>{om.zorunlu}</span>}
                    </span>
                  </label>
                ))}
                {onayUyari && (
                  <div style={{fontSize:"12px",color:"#c00",background:"#fff0f0",padding:"8px 12px",borderRadius:"8px",marginTop:"4px"}}>
                    ⚠️ {om.onayUyari}
                  </div>
                )}
              </div>

              <div style={{display:"flex",gap:"10px"}}>
                <button onClick={()=>setAdim(2)} style={{flex:1,background:"#f9fafb",color:"#555",border:"1px solid #e5e7eb",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:"pointer"}}>{t.teklif.geri}</button>
                <button
                  onClick={gonder}
                  disabled={yukleniyor || !tumZorunluIsaretli || !baskaAdinaGecerli}
                  style={{flex:2,background:tumZorunluIsaretli&&baskaAdinaGecerli?"#534AB7":"#ccc",color:"#fff",border:"none",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:tumZorunluIsaretli&&baskaAdinaGecerli?"pointer":"not-allowed",fontWeight:600,opacity:yukleniyor?0.7:1}}
                >
                  {yukleniyor ? t.teklif.gonderiliyor : t.teklif.gonder}
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
