"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";

function Yildizlar({ puan }: { puan:number }) {
  return <span style={{fontSize:"16px"}}>{[1,2,3,4,5].map(y=><span key={y} style={{color:puan>=y?"#f59e0b":"#e5e7eb"}}>★</span>)}</span>;
}

export default function AdminYorumlar() {
  const supabase = createClient();
  const [yorumlar, setYorumlar] = useState<any[]>([]);
  const [filtre, setFiltre] = useState<"bekleyen"|"onaylanan"|"hepsi">("bekleyen");
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(()=>{ yukle(); },[filtre]);

  async function yukle() {
    setYukleniyor(true);
    let q = supabase.from("yorumlar")
      .select("*, klinik:profiles!yorumlar_klinik_id_fkey(ad,soyad)")
      .order("created_at", { ascending: false });
    if (filtre==="bekleyen") q = q.eq("onaylandi",false);
    else if (filtre==="onaylanan") q = q.eq("onaylandi",true);
    const { data } = await q;
    setYorumlar(data||[]);
    setYukleniyor(false);
  }

  async function onayla(id:string) {
    await supabase.from("yorumlar").update({ onaylandi:true }).eq("id",id);
    yukle();
  }

  async function gizle(id:string) {
    await supabase.from("yorumlar").update({ gizlendi:true, onaylandi:false }).eq("id",id);
    yukle();
  }

  async function sil(id:string) {
    if (!confirm("Bu yorumu kalıcı olarak silmek istiyor musunuz?")) return;
    await supabase.from("yorumlar").delete().eq("id",id);
    yukle();
  }

  async function notEkle(id:string, not:string) {
    await supabase.from("yorumlar").update({ admin_notu:not }).eq("id",id);
    yukle();
  }

  const bekleyenSayi = yorumlar.filter(y=>!y.onaylandi&&!y.gizlendi).length;

  return (
    <div style={{minHeight:"100vh",background:"#f9fafb",padding:"32px",fontFamily:"sans-serif"}}>
      <div style={{maxWidth:"900px",margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px"}}>
          <div>
            <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"4px"}}>⭐ Yorum Moderasyonu</h1>
            {bekleyenSayi>0 && <div style={{fontSize:"13px",color:"#BA7517",fontWeight:600}}>⏳ {bekleyenSayi} yorum onay bekliyor</div>}
          </div>
          <a href="/admin" style={{fontSize:"13px",color:"#534AB7",textDecoration:"none"}}>← Admin Panel</a>
        </div>

        {/* Filtre */}
        <div style={{display:"flex",gap:"8px",marginBottom:"20px"}}>
          {(["bekleyen","onaylanan","hepsi"] as const).map(f=>(
            <button key={f} onClick={()=>setFiltre(f)} style={{
              padding:"8px 20px",borderRadius:"8px",border:"none",fontSize:"13px",cursor:"pointer",
              fontWeight:filtre===f?600:400,
              background:filtre===f?"#534AB7":"#fff",
              color:filtre===f?"#fff":"#555",
              boxShadow:"0 1px 3px rgba(0,0,0,0.08)"
            }}>
              {f==="bekleyen"?"⏳ Bekleyen":f==="onaylanan"?"✅ Onaylanan":"📋 Hepsi"}
            </button>
          ))}
        </div>

        {yukleniyor ? (
          <div style={{textAlign:"center",padding:"48px",color:"#888"}}>Yükleniyor...</div>
        ) : yorumlar.length===0 ? (
          <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"48px",textAlign:"center",color:"#888"}}>
            <div style={{fontSize:"32px",marginBottom:"8px"}}>✅</div>
            {filtre==="bekleyen"?"Bekleyen yorum yok!":"Yorum bulunamadı."}
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
            {yorumlar.map(y=>(
              <div key={y.id} style={{background:"#fff",border:`2px solid ${y.onaylandi?"#059669":y.gizlendi?"#e5e7eb":"#f59e0b"}`,borderRadius:"12px",padding:"20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
                  <div>
                    <div style={{fontSize:"14px",fontWeight:600,color:"#12103a"}}>{y.hasta_ad}</div>
                    <div style={{fontSize:"12px",color:"#888"}}>{y.hasta_email}</div>
                    <div style={{fontSize:"12px",color:"#534AB7",marginTop:"2px"}}>→ {y.klinik?.ad} {y.klinik?.soyad} | {y.tedavi_turu}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <Yildizlar puan={y.puan}/>
                    <div style={{fontSize:"11px",color:"#888",marginTop:"2px"}}>{new Date(y.created_at).toLocaleDateString("tr-TR")}</div>
                    <span style={{fontSize:"11px",padding:"2px 8px",borderRadius:"8px",fontWeight:600,
                      background:y.onaylandi?"#f0fff4":y.gizlendi?"#f0f0f0":"#fff8e1",
                      color:y.onaylandi?"#059669":y.gizlendi?"#888":"#BA7517"}}>
                      {y.onaylandi?"✅ Onaylı":y.gizlendi?"🚫 Gizli":"⏳ Bekliyor"}
                    </span>
                  </div>
                </div>

                {(y.iletisim_puan||y.temizlik_puan||y.fiyat_kalite_puan) && (
                  <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"10px"}}>
                    {y.iletisim_puan&&<span style={{fontSize:"11px",background:"#f0eeff",color:"#534AB7",padding:"2px 8px",borderRadius:"8px"}}>💬 {y.iletisim_puan}/5</span>}
                    {y.temizlik_puan&&<span style={{fontSize:"11px",background:"#f0eeff",color:"#534AB7",padding:"2px 8px",borderRadius:"8px"}}>🏥 {y.temizlik_puan}/5</span>}
                    {y.fiyat_kalite_puan&&<span style={{fontSize:"11px",background:"#f0eeff",color:"#534AB7",padding:"2px 8px",borderRadius:"8px"}}>💰 {y.fiyat_kalite_puan}/5</span>}
                  </div>
                )}

                <p style={{fontSize:"13px",color:"#444",lineHeight:1.7,margin:"0 0 12px",background:"#f9fafb",padding:"12px",borderRadius:"8px"}}>{y.yorum}</p>

                {y.fotograf_urls?.length>0 && (
                  <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"12px"}}>
                    {y.fotograf_urls.map((url:string,i:number)=>(
                      <a key={i} href={url} target="_blank" rel="noreferrer">
                        <img src={url} alt="" style={{width:"80px",height:"80px",objectFit:"cover",borderRadius:"8px",border:"1px solid #EEEDFE"}}/>
                      </a>
                    ))}
                  </div>
                )}

                {y.admin_notu && (
                  <div style={{background:"#fff8e1",borderRadius:"8px",padding:"10px 12px",marginBottom:"12px",fontSize:"12px",color:"#BA7517"}}>
                    📝 Admin notu: {y.admin_notu}
                  </div>
                )}

                {/* Butonlar */}
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                  {!y.onaylandi && !y.gizlendi && (
                    <button onClick={()=>onayla(y.id)} style={{flex:2,background:"#059669",color:"#fff",border:"none",padding:"9px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:600}}>
                      ✅ Onayla ve Yayınla
                    </button>
                  )}
                  {y.onaylandi && (
                    <button onClick={()=>gizle(y.id)} style={{flex:1,background:"#f0f0f0",color:"#555",border:"1px solid #e5e7eb",padding:"9px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>
                      🚫 Gizle
                    </button>
                  )}
                  {!y.onaylandi && !y.gizlendi && (
                    <button onClick={()=>gizle(y.id)} style={{flex:1,background:"#fff8e1",color:"#BA7517",border:"1px solid #f0c040",padding:"9px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>
                      🚫 Reddet
                    </button>
                  )}
                  <button onClick={()=>sil(y.id)} style={{background:"#fff0f0",color:"#c00",border:"1px solid #fcc",padding:"9px 14px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
