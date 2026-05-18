"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";

export default function AdminDestek() {
  const supabase = createClient();
  const [talepler, setTalepler] = useState<any[]>([]);
  const [filtre, setFiltre] = useState<"beklemede"|"yanitlandi"|"hepsi">("beklemede");
  const [yukleniyor, setYukleniyor] = useState(true);
  const [yanitlar, setYanitlar] = useState<Record<string,string>>({});
  const [acikYanit, setAcikYanit] = useState<string|null>(null);
  const [mesaj, setMesaj] = useState("");

  useEffect(()=>{ yukle(); },[filtre]);

  async function yukle() {
    setYukleniyor(true);
    let q = supabase.from("destek_talepleri").select("*").order("olusturma_tarihi",{ascending:false});
    if (filtre==="beklemede") q = q.eq("durum","beklemede");
    else if (filtre==="yanitlandi") q = q.eq("durum","yanitlandi");
    const { data } = await q;
    setTalepler(data||[]);
    setYukleniyor(false);
  }

  async function yanitGonder(id: string) {
    const yanit = yanitlar[id];
    if (!yanit?.trim()) return;
    const { error } = await supabase.from("destek_talepleri").update({
      admin_yanit: yanit.trim(),
      admin_yanit_tarihi: new Date().toISOString(),
      durum: "yanitlandi",
    }).eq("id", id);
    if (error) { setMesaj("Hata: "+error.message); return; }
    setMesaj("✅ Yanıt gönderildi!");
    setAcikYanit(null);
    setYanitlar(prev=>({...prev,[id]:""}));
    setTimeout(()=>setMesaj(""),3000);
    yukle();
  }

  async function kapat(id: string) {
    await supabase.from("destek_talepleri").update({ durum:"kapandi" }).eq("id",id);
    yukle();
  }

  const KONULAR: Record<string,string> = {
    genel:"Genel Soru", teklif:"Teklif Hakkında",
    sikayet:"Şikayet", danisma:"Tedavi Öncesi Danışma", diger:"Diğer"
  };

  const bekleyenSayi = talepler.filter(t=>t.durum==="beklemede").length;

  const inputStyle: React.CSSProperties = {width:"100%",border:"1px solid #e5e7eb",borderRadius:"8px",padding:"9px 12px",fontSize:"13px",outline:"none",resize:"none",boxSizing:"border-box"};

  return (
    <div style={{minHeight:"100vh",background:"#f9fafb",padding:"32px",fontFamily:"sans-serif"}}>
      <div style={{maxWidth:"860px",margin:"0 auto"}}>

        {/* Başlık */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px"}}>
          <div>
            <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"4px"}}>🎯 Destek Talepleri</h1>
            {bekleyenSayi>0 && <div style={{fontSize:"13px",color:"#BA7517",fontWeight:600}}>⏳ {bekleyenSayi} yanıt bekleyen talep var</div>}
          </div>
          <a href="/admin" style={{fontSize:"13px",color:"#534AB7",textDecoration:"none"}}>← Admin Panel</a>
        </div>

        {/* Mesaj */}
        {mesaj && (<div style={{background:mesaj.includes("Hata")?"#fff0f0":"#f0fff4",border:`1px solid ${mesaj.includes("Hata")?"#fcc":"#9f9"}`,borderRadius:"8px",padding:"10px 16px",marginBottom:"16px",fontSize:"13px",color:mesaj.includes("Hata")?"#c00":"#0a7a3a"}}>{mesaj}</div>)}

        {/* Filtreler */}
        <div style={{display:"flex",gap:"8px",marginBottom:"20px"}}>
          {(["beklemede","yanitlandi","hepsi"] as const).map(f=>(
            <button key={f} onClick={()=>setFiltre(f)} style={{padding:"8px 20px",borderRadius:"8px",border:"none",fontSize:"13px",cursor:"pointer",fontWeight:filtre===f?600:400,background:filtre===f?"#534AB7":"#fff",color:filtre===f?"#fff":"#555",boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
              {f==="beklemede"?"⏳ Bekleyenler":f==="yanitlandi"?"✅ Yanıtlananlar":"📋 Hepsi"}
            </button>
          ))}
        </div>

        {/* Liste */}
        {yukleniyor ? (
          <div style={{textAlign:"center",padding:"48px",color:"#888"}}>Yükleniyor...</div>
        ) : talepler.length===0 ? (
          <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"48px",textAlign:"center",color:"#888"}}>
            <div style={{fontSize:"32px",marginBottom:"8px"}}>✅</div>
            {filtre==="beklemede" ? "Bekleyen talep yok!" : "Talep bulunamadı."}
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
            {talepler.map(t=>{
              const durumBg = t.durum==="yanitlandi"?"#f0fff4":t.durum==="kapandi"?"#f0f0f0":"#fff8e1";
              const durumRenk = t.durum==="yanitlandi"?"#059669":t.durum==="kapandi"?"#888":"#BA7517";
              const durumLabel = t.durum==="yanitlandi"?"✅ Yanıtlandı":t.durum==="kapandi"?"🔒 Kapandı":"⏳ Beklemede";
              return (
                <div key={t.id} style={{background:"#fff",border:`2px solid ${t.durum==="beklemede"?"#f59e0b":t.durum==="yanitlandi"?"#059669":"#e5e7eb"}`,borderRadius:"12px",padding:"20px"}}>
                  
                  {/* Üst kısım */}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
                    <div>
                      <div style={{fontSize:"14px",fontWeight:700,color:"#12103a"}}>{t.hasta_ad}</div>
                      <div style={{fontSize:"12px",color:"#888"}}>{t.hasta_email}</div>
                      <div style={{fontSize:"12px",color:"#534AB7",marginTop:"2px",fontWeight:600}}>{KONULAR[t.konu]||t.konu}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <span style={{fontSize:"11px",padding:"3px 10px",borderRadius:"20px",fontWeight:600,background:durumBg,color:durumRenk,display:"block",marginBottom:"4px"}}>{durumLabel}</span>
                      <div style={{fontSize:"11px",color:"#888"}}>{new Date(t.olusturma_tarihi).toLocaleDateString("tr-TR")}</div>
                    </div>
                  </div>

                  {/* Mesaj */}
                  <div style={{background:"#f9fafb",borderRadius:"8px",padding:"12px",marginBottom:"12px",fontSize:"13px",color:"#444",lineHeight:1.7}}>
                    {t.mesaj}
                  </div>

                  {/* Mevcut yanıt */}
                  {t.admin_yanit && (
                    <div style={{background:"#f0eeff",borderRadius:"8px",padding:"12px",borderLeft:"3px solid #534AB7",marginBottom:"12px"}}>
                      <div style={{fontSize:"11px",fontWeight:600,color:"#534AB7",marginBottom:"4px"}}>🎯 Koordinatör Yanıtı — {t.admin_yanit_tarihi ? new Date(t.admin_yanit_tarihi).toLocaleDateString("tr-TR") : ""}</div>
                      <p style={{fontSize:"12px",color:"#555",lineHeight:1.6,margin:0}}>{t.admin_yanit}</p>
                    </div>
                  )}

                  {/* Yanıt formu */}
                  {t.durum !== "kapandi" && (
                    <div>
                      {acikYanit === t.id ? (
                        <div>
                          <textarea rows={3} placeholder="Hastaya yanıtınızı yazın..." value={yanitlar[t.id]||""} onChange={e=>setYanitlar(prev=>({...prev,[t.id]:e.target.value}))} style={inputStyle}/>
                          <div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
                            <button onClick={()=>setAcikYanit(null)} style={{flex:1,background:"#f9fafb",color:"#555",border:"1px solid #e5e7eb",padding:"9px",borderRadius:"8px",fontSize:"12px",cursor:"pointer"}}>İptal</button>
                            <button onClick={()=>yanitGonder(t.id)} style={{flex:2,background:"#534AB7",color:"#fff",border:"none",padding:"9px",borderRadius:"8px",fontSize:"12px",cursor:"pointer",fontWeight:600}}>✅ Yanıtı Gönder</button>
                            <button onClick={()=>kapat(t.id)} style={{background:"#f0f0f0",color:"#888",border:"1px solid #e5e7eb",padding:"9px 14px",borderRadius:"8px",fontSize:"12px",cursor:"pointer"}}>🔒 Kapat</button>
                          </div>
                        </div>
                      ) : (
                        <div style={{display:"flex",gap:"8px"}}>
                          <button onClick={()=>setAcikYanit(t.id)} style={{flex:2,background:"#534AB7",color:"#fff",border:"none",padding:"9px",borderRadius:"8px",fontSize:"12px",cursor:"pointer",fontWeight:600}}>
                            💬 {t.admin_yanit ? "Tekrar Yanıtla" : "Yanıt Yaz"}
                          </button>
                          <button onClick={()=>kapat(t.id)} style={{flex:1,background:"#f0f0f0",color:"#888",border:"1px solid #e5e7eb",padding:"9px",borderRadius:"8px",fontSize:"12px",cursor:"pointer"}}>🔒 Kapat</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
