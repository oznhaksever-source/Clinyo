"use client";
import { useState } from "react";
import { createClient } from "../../utils/supabase/client";

interface Props {
  klinikId: string;
  tedaviTuru: string;
  hastaId: string;
  hastaAd: string;
  hastaEmail: string;
  teklifId?: string;
  onTamamlandi: () => void;
}

const YILDIZ = [1,2,3,4,5];

function YildizSecici({ deger, onChange, etiket }: { deger:number, onChange:(v:number)=>void, etiket:string }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{marginBottom:"14px"}}>
      <div style={{fontSize:"13px",color:"#888",marginBottom:"5px"}}>{etiket}</div>
      <div style={{display:"flex",gap:"4px",alignItems:"center"}}>
        {YILDIZ.map(y=>(
          <span key={y}
            onMouseEnter={()=>setHover(y)}
            onMouseLeave={()=>setHover(0)}
            onClick={()=>onChange(y)}
            style={{fontSize:"32px",cursor:"pointer",color:(hover||deger)>=y?"#f59e0b":"#e5e7eb",transition:"color .1s",lineHeight:1}}>★</span>
        ))}
        {deger>0 && (
          <span style={{fontSize:"12px",color:"#888",marginLeft:"8px"}}>
            {["","Çok kötü","Kötü","Orta","İyi","Mükemmel"][deger]}
          </span>
        )}
      </div>
    </div>
  );
}

export default function YorumFormu({ klinikId, tedaviTuru, hastaId, hastaAd, hastaEmail, teklifId, onTamamlandi }: Props) {
  const supabase = createClient();
  const [puan, setPuan] = useState(0);
  const [iletisimPuan, setIletisimPuan] = useState(0);
  const [temizlikPuan, setTemizlikPuan] = useState(0);
  const [fiyatKalitePuan, setFiyatKalitePuan] = useState(0);
  const [yorum, setYorum] = useState("");
  const [fotograflar, setFotograflar] = useState<string[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [fotografYukleniyor, setFotografYukleniyor] = useState(false);
  const [hata, setHata] = useState("");
  const [basarili, setBasarili] = useState(false);

  async function fotografYukle(files: FileList) {
    setFotografYukleniyor(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const ad = `yorumlar/${hastaId}/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from("medoqa-images").upload(ad, file);
      if (!error) {
        const { data } = supabase.storage.from("medoqa-images").getPublicUrl(ad);
        urls.push(data.publicUrl);
      }
    }
    setFotograflar(prev => [...prev, ...urls]);
    setFotografYukleniyor(false);
  }

  async function gonder() {
    if (puan === 0) { setHata("Lütfen genel puanı seçin."); return; }
    if (yorum.trim().length < 20) { setHata("Yorum en az 20 karakter olmalıdır."); return; }
    setHata("");
    setYukleniyor(true);

    const { error } = await supabase.from("yorumlar").insert({
      hasta_id: hastaId,
      klinik_id: klinikId,
      hasta_ad: hastaAd,
      hasta_email: hastaEmail,
      teklif_id: teklifId || null,
      puan,
      iletisim_puan: iletisimPuan || null,
      temizlik_puan: temizlikPuan || null,
      fiyat_kalite_puan: fiyatKalitePuan || null,
      yorum: yorum.trim(),
      tedavi_turu: tedaviTuru,
      fotograf_urls: fotograflar,
      onaylandi: false,
    });

    if (error) { setHata("Hata: " + error.message); setYukleniyor(false); return; }
    setBasarili(true);
    setTimeout(onTamamlandi, 3000);
  }

  if (basarili) return (
    <div style={{background:"#f0fff4",border:"1px solid #9f9",borderRadius:"12px",padding:"24px",textAlign:"center"}}>
      <div style={{fontSize:"40px",marginBottom:"8px"}}>✅</div>
      <div style={{fontSize:"15px",fontWeight:700,color:"#0a7a3a",marginBottom:"6px"}}>Yorumunuz alındı!</div>
      <div style={{fontSize:"13px",color:"#666"}}>Admin onayından sonra klinik sayfasında yayınlanacak.</div>
    </div>
  );

  return (
    <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"24px",marginTop:"12px"}}>
      <div style={{fontSize:"16px",fontWeight:700,color:"#12103a",marginBottom:"4px"}}>⭐ Deneyimini Paylaş</div>
      <div style={{fontSize:"13px",color:"#888",marginBottom:"20px"}}>{tedaviTuru} tedavin hakkında yorum yaz</div>

      {hata && (
        <div style={{background:"#fff0f0",border:"1px solid #fcc",borderRadius:"8px",padding:"10px 14px",marginBottom:"16px",fontSize:"13px",color:"#c00"}}>{hata}</div>
      )}

      <YildizSecici deger={puan} onChange={setPuan} etiket="⭐ Genel değerlendirme *"/>
      <YildizSecici deger={iletisimPuan} onChange={setIletisimPuan} etiket="💬 İletişim"/>
      <YildizSecici deger={temizlikPuan} onChange={setTemizlikPuan} etiket="🏥 Temizlik & Hijyen"/>
      <YildizSecici deger={fiyatKalitePuan} onChange={setFiyatKalitePuan} etiket="💰 Fiyat / Kalite"/>

      <div style={{marginBottom:"16px"}}>
        <label style={{fontSize:"13px",color:"#888",display:"block",marginBottom:"6px"}}>Yorumunuz *</label>
        <textarea rows={4}
          placeholder="Tedavi süreciniz, klinik ortamı, doktorlar hakkında deneyimlerinizi paylaşın..."
          value={yorum} onChange={e=>setYorum(e.target.value)}
          style={{width:"100%",border:"1px solid #e5e7eb",borderRadius:"8px",padding:"10px 12px",fontSize:"13px",outline:"none",resize:"none",boxSizing:"border-box"}}/>
        <div style={{fontSize:"11px",color:yorum.length<20&&yorum.length>0?"#c00":"#888",marginTop:"4px",textAlign:"right"}}>{yorum.length} / min 20</div>
      </div>

      <div style={{marginBottom:"20px"}}>
        <label style={{fontSize:"13px",color:"#888",display:"block",marginBottom:"6px"}}>📸 Fotoğraf ekle (opsiyonel, max 3)</label>
        {fotograflar.length < 3 && (
          <input type="file" accept="image/*" multiple
            onChange={e=>e.target.files && fotografYukle(e.target.files)}
            style={{width:"100%",border:"1px solid #e5e7eb",borderRadius:"8px",padding:"8px",fontSize:"13px",boxSizing:"border-box"}}/>
        )}
        {fotografYukleniyor && <div style={{fontSize:"12px",color:"#534AB7",marginTop:"6px"}}>⏳ Yükleniyor...</div>}
        {fotograflar.length > 0 && (
          <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"10px"}}>
            {fotograflar.map((url,i)=>(
              <div key={i} style={{position:"relative"}}>
                <img src={url} alt="" style={{width:"80px",height:"80px",objectFit:"cover",borderRadius:"8px",border:"1px solid #EEEDFE"}}/>
                <button onClick={()=>setFotograflar(prev=>prev.filter((_,j)=>j!==i))}
                  style={{position:"absolute",top:"-6px",right:"-6px",background:"#c00",color:"#fff",border:"none",borderRadius:"50%",width:"20px",height:"20px",fontSize:"12px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={gonder} disabled={yukleniyor}
        style={{width:"100%",background:"#534AB7",color:"#fff",border:"none",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:"pointer",fontWeight:700,opacity:yukleniyor?0.7:1}}>
        {yukleniyor ? "⏳ Gönderiliyor..." : "✅ Yorumu Gönder"}
      </button>
      <div style={{fontSize:"11px",color:"#888",marginTop:"8px",textAlign:"center"}}>Yorumunuz admin onayından sonra yayınlanacak.</div>
    </div>
  );
}
