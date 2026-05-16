"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

interface Props { klinikId: string; }

function Yildizlar({ puan, buyuk }: { puan:number, buyuk?:boolean }) {
  return (
    <span style={{fontSize:buyuk?"22px":"15px",letterSpacing:"1px"}}>
      {[1,2,3,4,5].map(y=>(
        <span key={y} style={{color:puan>=y?"#f59e0b":"#e5e7eb"}}>★</span>
      ))}
    </span>
  );
}

function PuanBar({ etiket, puan }: { etiket:string, puan:number }) {
  if (!puan) return null;
  return (
    <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"}}>
      <span style={{fontSize:"12px",color:"#888",width:"140px",flexShrink:0}}>{etiket}</span>
      <div style={{flex:1,background:"#f0eeff",borderRadius:"4px",height:"6px",overflow:"hidden"}}>
        <div style={{background:"#534AB7",height:"100%",width:`${(puan/5)*100}%`,borderRadius:"4px"}}/>
      </div>
      <span style={{fontSize:"12px",fontWeight:600,color:"#534AB7",width:"24px"}}>{puan.toFixed(1)}</span>
    </div>
  );
}

export default function YorumListesi({ klinikId }: Props) {
  const supabase = createClient();
  const [yorumlar, setYorumlar] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(()=>{ yukle(); },[klinikId]);

  async function yukle() {
    const { data } = await supabase
      .from("yorumlar")
      .select("*")
      .eq("klinik_id", klinikId)
      .eq("onaylandi", true)
      .eq("gizlendi", false)
      .order("created_at", { ascending: false });
    setYorumlar(data||[]);
    setYukleniyor(false);
  }

  if (yukleniyor) return <div style={{padding:"24px",textAlign:"center",color:"#888",fontSize:"13px"}}>Yükleniyor...</div>;

  if (yorumlar.length === 0) return (
    <div style={{padding:"40px",textAlign:"center",color:"#888"}}>
      <div style={{fontSize:"36px",marginBottom:"8px"}}>💬</div>
      <div style={{fontSize:"13px"}}>Henüz yorum yok.</div>
    </div>
  );

  const genelOrt = yorumlar.reduce((s,y)=>s+y.puan,0)/yorumlar.length;
  const iletisimYorumlar = yorumlar.filter(y=>y.iletisim_puan);
  const temizlikYorumlar = yorumlar.filter(y=>y.temizlik_puan);
  const fiyatYorumlar = yorumlar.filter(y=>y.fiyat_kalite_puan);
  const iletisimOrt = iletisimYorumlar.length ? iletisimYorumlar.reduce((s,y)=>s+y.iletisim_puan,0)/iletisimYorumlar.length : 0;
  const temizlikOrt = temizlikYorumlar.length ? temizlikYorumlar.reduce((s,y)=>s+y.temizlik_puan,0)/temizlikYorumlar.length : 0;
  const fiyatOrt = fiyatYorumlar.length ? fiyatYorumlar.reduce((s,y)=>s+y.fiyat_kalite_puan,0)/fiyatYorumlar.length : 0;

  return (
    <div>
      {/* Özet */}
      <div style={{background:"#f8f9ff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px",marginBottom:"20px",display:"flex",gap:"24px",alignItems:"center",flexWrap:"wrap"}}>
        <div style={{textAlign:"center",minWidth:"90px"}}>
          <div style={{fontSize:"52px",fontWeight:700,color:"#534AB7",lineHeight:1}}>{genelOrt.toFixed(1)}</div>
          <Yildizlar puan={Math.round(genelOrt)} buyuk/>
          <div style={{fontSize:"12px",color:"#888",marginTop:"4px"}}>{yorumlar.length} doğrulanmış yorum</div>
        </div>
        <div style={{flex:1,minWidth:"200px"}}>
          <PuanBar etiket="⭐ Genel" puan={genelOrt}/>
          {iletisimOrt>0 && <PuanBar etiket="💬 İletişim" puan={iletisimOrt}/>}
          {temizlikOrt>0 && <PuanBar etiket="🏥 Temizlik" puan={temizlikOrt}/>}
          {fiyatOrt>0 && <PuanBar etiket="💰 Fiyat / Kalite" puan={fiyatOrt}/>}
        </div>
      </div>

      {/* Yorumlar */}
      <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
        {yorumlar.map(y=>(
          <div key={y.id} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px"}}>
              <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
                <div style={{width:"38px",height:"38px",background:"#EEEDFE",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px",fontWeight:700,color:"#534AB7",flexShrink:0}}>
                  {y.hasta_ad?.[0]?.toUpperCase()||"H"}
                </div>
                <div>
                  <div style={{fontSize:"13px",fontWeight:600,color:"#12103a"}}>{y.hasta_ad}</div>
                  <div style={{fontSize:"11px",color:"#888"}}>{y.tedavi_turu}</div>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <Yildizlar puan={y.puan}/>
                <div style={{fontSize:"11px",color:"#888",marginTop:"2px"}}>{new Date(y.created_at).toLocaleDateString("tr-TR")}</div>
              </div>
            </div>

            {(y.iletisim_puan||y.temizlik_puan||y.fiyat_kalite_puan) && (
              <div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"10px"}}>
                {y.iletisim_puan && <span style={{fontSize:"11px",background:"#f0eeff",color:"#534AB7",padding:"2px 8px",borderRadius:"8px"}}>💬 İletişim {y.iletisim_puan}/5</span>}
                {y.temizlik_puan && <span style={{fontSize:"11px",background:"#f0eeff",color:"#534AB7",padding:"2px 8px",borderRadius:"8px"}}>🏥 Temizlik {y.temizlik_puan}/5</span>}
                {y.fiyat_kalite_puan && <span style={{fontSize:"11px",background:"#f0eeff",color:"#534AB7",padding:"2px 8px",borderRadius:"8px"}}>💰 F/K {y.fiyat_kalite_puan}/5</span>}
              </div>
            )}

            <p style={{fontSize:"13px",color:"#444",lineHeight:1.7,margin:"0 0 10px"}}>{y.yorum}</p>

            {y.fotograf_urls?.length > 0 && (
              <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"10px"}}>
                {y.fotograf_urls.map((url:string,i:number)=>(
                  <img key={i} src={url} alt="" onClick={()=>window.open(url,"_blank")}
                    style={{width:"80px",height:"80px",objectFit:"cover",borderRadius:"8px",border:"1px solid #EEEDFE",cursor:"pointer"}}/>
                ))}
              </div>
            )}

            {y.klinik_yanit && (
              <div style={{background:"#f8f9ff",borderRadius:"8px",padding:"12px",borderLeft:"3px solid #534AB7"}}>
                <div style={{fontSize:"11px",fontWeight:600,color:"#534AB7",marginBottom:"4px"}}>🏥 Klinik yanıtı</div>
                <p style={{fontSize:"12px",color:"#555",lineHeight:1.6,margin:0}}>{y.klinik_yanit}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
