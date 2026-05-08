"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";

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

const TEDAVI_ACIKLAMALARI: Record<string,{baslik:string, aciklama:string, sure:string}> = {
  implant: {
    baslik: "İmplant",
    aciklama: "Titanyum vida çene kemiğine yerleştirilir. İyileşme sonrası üzerine kuron takılır. Doğal diş görünümü ve işlevi sağlar.",
    sure: "2-3 ay"
  },
  kaplama: {
    baslik: "Kaplama / Kuron",
    aciklama: "Diş yüzeyi zirkonyum veya porselen ile kaplanır. Hem estetik hem dayanıklı bir çözümdür.",
    sure: "1-2 seans"
  },
  kanal: {
    baslik: "Kanal Tedavisi",
    aciklama: "Enfekte sinir dokusu temizlenir, kanal sterilize edilip doldurulur. Dişi kurtarır ve ağrıyı giderir.",
    sure: "1-2 seans"
  },
  dolgu: {
    baslik: "Dolgu",
    aciklama: "Çürük alan temizlenir, dişin rengiyle uyumlu kompozit malzeme ile doldurulur.",
    sure: "1 seans"
  },
  cekim: {
    baslik: "Diş Çekimi",
    aciklama: "Hasarlı ya da tedavi edilemeyen diş lokal anestezi altında çekilir.",
    sure: "1 seans"
  },
  kopru: {
    baslik: "Köprü",
    aciklama: "Eksik dişin iki yanındaki dişlere destek alınarak sabit köprü yapılır.",
    sure: "2-3 seans"
  },
  lezyon: {
    baslik: "Lezyon Tedavisi",
    aciklama: "Kök ucundaki apse veya kist temizlenir, gerekirse kök ucu rezeksiyonu uygulanır.",
    sure: "1-2 seans"
  },
};

function disSVG(no: number, upper: boolean, conds: string[]) {
  const t = TYPES[no];
  const kat = conds.find(c => RENKLER[c]);
  const renk = kat ? RENKLER[kat] : RENKLER.default;
  const stroke = kat ? 'rgba(0,0,0,.15)' : 'rgba(0,0,0,.08)';
  const prl = kat ? `<ellipse cx="13" cy="${upper?36:28}" rx="7" ry="4" fill="rgba(255,255,255,.2)"/>` : '';

  let kur = '', kok = '';
  if (t === 'CI' || t === 'LI') {
    if (upper) {
      kok = `<path d="M9,30 C9,16 11,6 13,1 C15,6 17,16 17,30Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;
      kur = `<path d="M3,30 L6,46 L20,46 L23,30Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`;
    } else {
      kok = `<path d="M9,34 C9,48 11,58 13,63 C15,58 17,48 17,34Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;
      kur = `<path d="M3,34 L6,18 L20,18 L23,34Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`;
    }
  } else if (t === 'C') {
    if (upper) {
      kok = `<path d="M9,28 C9,14 11,4 13,0 C15,4 17,14 17,28Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;
      kur = `<path d="M4,28 L9,46 Q11,52 13,52 Q15,52 17,46 L22,28Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`;
    } else {
      kok = `<path d="M9,36 C9,50 11,60 13,64 C15,60 17,50 17,36Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;
      kur = `<path d="M4,36 L9,18 Q11,12 13,12 Q15,12 17,18 L22,36Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`;
    }
  } else if (t === 'P') {
    if (upper) {
      kok = `<path d="M7,28 C6,14 9,4 11,2 C13,0 15,2 13,28Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>
             <path d="M13,28 C15,4 17,2 19,4 C21,8 20,18 19,28Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;
      kur = `<path d="M2,28 Q2,44 13,46 Q24,44 24,28Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>
             <circle cx="8" cy="36" r="3.5" fill="rgba(255,255,255,.2)"/>
             <circle cx="18" cy="36" r="3.5" fill="rgba(255,255,255,.2)"/>${prl}`;
    } else {
      kok = `<path d="M7,36 C6,50 9,60 11,62 C13,64 15,62 13,36Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>
             <path d="M13,36 C15,62 17,62 19,60 C21,56 20,46 19,36Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;
      kur = `<path d="M2,36 Q2,20 13,18 Q24,20 24,36Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>
             <circle cx="8" cy="28" r="3.5" fill="rgba(255,255,255,.2)"/>
             <circle cx="18" cy="28" r="3.5" fill="rgba(255,255,255,.2)"/>${prl}`;
    }
  } else {
    if (upper) {
      kok = `<path d="M4,26 C3,12 5,3 7,1 C9,0 9,26 11,26Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>
             <path d="M11,25 C10,8 12,2 13,1 C14,2 16,8 15,25Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>
             <path d="M15,26 C17,26 17,0 19,1 C21,3 23,12 22,26Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;
      kur = `<path d="M1,26 Q1,42 13,44 Q25,42 25,26Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>
             <circle cx="7" cy="33" r="3" fill="rgba(255,255,255,.2)"/>
             <circle cx="19" cy="33" r="3" fill="rgba(255,255,255,.2)"/>
             <circle cx="7" cy="40" r="2.5" fill="rgba(255,255,255,.15)"/>
             <circle cx="19" cy="40" r="2.5" fill="rgba(255,255,255,.15)"/>${prl}`;
    } else {
      kok = `<path d="M4,38 C3,52 5,61 7,63 C9,64 9,38 11,38Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>
             <path d="M11,39 C10,56 12,62 13,63 C14,62 16,56 15,39Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>
             <path d="M15,38 C17,38 17,64 19,63 C21,61 23,52 22,38Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;
      kur = `<path d="M1,38 Q1,22 13,20 Q25,22 25,38Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>
             <circle cx="7" cy="31" r="3" fill="rgba(255,255,255,.2)"/>
             <circle cx="19" cy="31" r="3" fill="rgba(255,255,255,.2)"/>
             <circle cx="7" cy="24" r="2.5" fill="rgba(255,255,255,.15)"/>
             <circle cx="19" cy="24" r="2.5" fill="rgba(255,255,255,.15)"/>${prl}`;
    }
  }

  if (conds.includes('cekim')) {
    kur += `<line x1="4" y1="6" x2="22" y2="58" stroke="#E24B4A" stroke-width="2" stroke-linecap="round" opacity=".8"/>
            <line x1="22" y1="6" x2="4" y2="58" stroke="#E24B4A" stroke-width="2" stroke-linecap="round" opacity=".8"/>`;
  }
  return `<svg width="24" height="64" viewBox="0 0 26 64">${kok}${kur}</svg>`;
}

export default function TeklifDetay({ params }: { params: { teklifId: string } }) {
  const [teklif, setTeklif] = useState<any>(null);
  const [klinik, setKlinik] = useState<any>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [mesaj, setMesaj] = useState("");
  const supabase = createClient();

  useEffect(() => { yukle(); }, []);

  async function yukle() {
    const { data: t } = await supabase
      .from("teklifler")
      .select("*, talepler(tedavi_turu, hasta_id), profiles!teklifler_klinik_id_fkey(id, ad, soyad, konum_adres, telefon, instagram, kapak_fotograf, tanitim_yazisi)")
      .eq("id", params.teklifId)
      .single();

    if (t) {
      setTeklif(t);
      setKlinik(t.profiles);
    }
    setYukleniyor(false);
  }

  async function teklifOnayla() {
    if (!confirm("Bu teklifi onaylamak istediğinize emin misiniz?")) return;
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("teklifler").update({ durum: "onaylandi" }).eq("id", params.teklifId);
    if (user && klinik?.id) {
      await supabase.from("mesajlar").insert({
        gonderen_id: user.id,
        alici_id: klinik.id,
        mesaj: "Merhaba, teklifinizi onayladım. Tedavi süreci hakkında bilgi almak istiyorum.",
        okundu: false,
      });
    }
    setMesaj("✅ Teklif onaylandı! Klinik ile mesajlaşma başlatıldı.");
    yukle();
  }

  async function teklifReddet() {
    if (!confirm("Bu teklifi reddetmek istediğinize emin misiniz?")) return;
    await supabase.from("teklifler").update({ durum: "reddedildi" }).eq("id", params.teklifId);
    yukle();
  }

  if (yukleniyor) return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ color: "#888" }}>Yükleniyor...</div>
    </main>
  );

  if (!teklif) return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ color: "#888" }}>Teklif bulunamadı.</div>
    </main>
  );

  const disPlan: Record<number,string[]> = teklif.dis_plani ? JSON.parse(teklif.dis_plani) : {};
  const tedaviDetay: {dis:number,hizmet_adi:string,fiyat:number,kategori:string}[] = teklif.tedavi_detaylari ? JSON.parse(teklif.tedavi_detaylari) : [];

  // Benzersiz kategorileri bul
  const kategoriler = [...new Set(tedaviDetay.map(d => d.kategori))];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      {/* Navbar */}
      <nav style={{ background: "#12103a", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ fontSize: "22px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>
          med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
        </a>
        <a href="/hasta-panel" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>← Geri Dön</a>
      </nav>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 20px" }}>

        {mesaj && (
          <div style={{ background: "#f0fff4", border: "1px solid #9f9", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", fontSize: "13px", color: "#0a7a3a" }}>
            {mesaj}
          </div>
        )}

        {/* Klinik başlık kartı */}
        <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "16px", padding: "24px", marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {klinik?.kapak_fotograf
              ? <img src={klinik.kapak_fotograf} alt={klinik.ad} style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover" }} />
              : <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#EEEDFE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: 700, color: "#534AB7", flexShrink: 0 }}>
                  {klinik?.ad?.[0]?.toUpperCase() || "K"}
                </div>
            }
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>
                {klinik?.ad} {klinik?.soyad}
              </div>
              {klinik?.konum_adres && <div style={{ fontSize: "13px", color: "#94a3b8" }}>📍 {klinik.konum_adres}</div>}
              {klinik?.telefon && <div style={{ fontSize: "13px", color: "#94a3b8" }}>📞 {klinik.telefon}</div>}
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{
                fontSize: "12px", padding: "4px 14px", borderRadius: "20px", fontWeight: 600, display: "block", marginBottom: "6px",
                background: teklif.durum === "onaylandi" ? "#f0fff4" : teklif.durum === "reddedildi" ? "#fff0f0" : "#fff8e1",
                color: teklif.durum === "onaylandi" ? "#059669" : teklif.durum === "reddedildi" ? "#c00" : "#BA7517",
              }}>
                {teklif.durum === "onaylandi" ? "✅ Onaylandı" : teklif.durum === "reddedildi" ? "❌ Reddedildi" : "⏳ Beklemede"}
              </span>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>{new Date(teklif.olusturma_tarihi).toLocaleDateString("tr-TR")}</div>
            </div>
          </div>
        </div>

        {/* Diş şeması */}
        {Object.keys(disPlan).length > 0 && (
          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "16px", padding: "24px", marginBottom: "20px" }}>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>🦷 Tedavi Planı — Diş Şeması</div>

            {/* Üst çene */}
            <p style={{ fontSize: "9px", color: "#94a3b8", textAlign: "center", margin: "0 0 4px", letterSpacing: ".6px", textTransform: "uppercase" }}>Üst çene</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "0px" }}>
              {UST.map(no => (
                <div key={no} style={{ display: "flex", flexDirection: "column", alignItems: "center", filter: disPlan[no] ? `drop-shadow(0 0 4px ${RENKLER[disPlan[no]?.[0]] || '#534AB7'}88)` : 'none' }}>
                  <span style={{ fontSize: "7px", color: "#94a3b8", height: "11px", lineHeight: "11px" }}>{no}</span>
                  <div dangerouslySetInnerHTML={{ __html: disSVG(no, true, disPlan[no] || []) }} />
                </div>
              ))}
            </div>
            <div style={{ height: "4px", background: "#e5e7eb", margin: "3px 12px", borderRadius: "2px" }} />
            <div style={{ display: "flex", justifyContent: "center", gap: "0px" }}>
              {ALT.map(no => (
                <div key={no} style={{ display: "flex", flexDirection: "column", alignItems: "center", filter: disPlan[no] ? `drop-shadow(0 0 4px ${RENKLER[disPlan[no]?.[0]] || '#534AB7'}88)` : 'none' }}>
                  <div dangerouslySetInnerHTML={{ __html: disSVG(no, false, disPlan[no] || []) }} />
                  <span style={{ fontSize: "7px", color: "#94a3b8", height: "11px", lineHeight: "11px" }}>{no}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "9px", color: "#94a3b8", textAlign: "center", margin: "4px 0 12px", letterSpacing: ".6px", textTransform: "uppercase" }}>Alt çene</p>

            {/* Renk legend */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
              {Object.entries(RENKLER).filter(([k]) => k !== 'default' && kategoriler.includes(k)).map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#64748b" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: v }} />
                  {TEDAVI_ACIKLAMALARI[k]?.baslik || k}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tedavi açıklamaları */}
        {tedaviDetay.length > 0 && (
          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "16px", padding: "24px", marginBottom: "20px" }}>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>💊 Tedaviler</div>
            {tedaviDetay.map((d, i) => {
              const ack = TEDAVI_ACIKLAMALARI[d.kategori];
              const renk = RENKLER[d.kategori] || RENKLER.default;
              return (
                <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "14px", background: "#f8f9ff", borderRadius: "12px", border: "1px solid #EEEDFE", marginBottom: "10px" }}>
                  {/* Renk göstergesi */}
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: renk + "22", border: `1px solid ${renk}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: renk }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                      <div>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "#12103a" }}>Diş {d.dis}</span>
                        <span style={{ fontSize: "13px", color: "#64748b", marginLeft: "6px" }}>— {d.hizmet_adi}</span>
                      </div>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: "#534AB7", flexShrink: 0 }}>{d.fiyat} EUR</span>
                    </div>
                    {ack && (
                      <div style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.6, marginBottom: "6px" }}>{ack.aciklama}</div>
                    )}
                    {ack && (
                      <span style={{ fontSize: "11px", background: "#fff", color: "#94a3b8", padding: "2px 8px", borderRadius: "8px", border: "1px solid #EEEDFE" }}>
                        ⏱ {ack.sure}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Fiyat özeti */}
        <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "16px", padding: "24px", marginBottom: "20px" }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>💰 Fiyat Özeti</div>

          {tedaviDetay.map((d, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f5f5f5", fontSize: "13px" }}>
              <span style={{ color: "#374151" }}>Diş {d.dis} — {d.hizmet_adi}</span>
              <span style={{ fontWeight: 600, color: "#534AB7" }}>{d.fiyat} EUR</span>
            </div>
          ))}

          {/* Eğer tedavi detayı yoksa sadece toplam fiyat göster */}
          {tedaviDetay.length === 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f5f5f5", fontSize: "13px" }}>
              <span style={{ color: "#374151" }}>Tedavi</span>
              <span style={{ fontWeight: 600, color: "#534AB7" }}>{teklif.fiyat} EUR</span>
            </div>
          )}

          {teklif.otel_dahil && (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f5f5f5", fontSize: "13px" }}>
              <span style={{ color: "#374151" }}>🏨 Otel — {teklif.otel_aciklama}</span>
              <span style={{ fontWeight: 600, color: "#059669" }}>{teklif.otel_fiyat} EUR</span>
            </div>
          )}

          {teklif.transfer_dahil && (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f5f5f5", fontSize: "13px" }}>
              <span style={{ color: "#374151" }}>🚗 Transfer — {teklif.transfer_aciklama}</span>
              <span style={{ fontWeight: 600, color: "#059669" }}>{teklif.transfer_fiyat} EUR</span>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0", fontSize: "16px", fontWeight: 700 }}>
            <span style={{ color: "#12103a" }}>Toplam</span>
            <span style={{ color: "#534AB7", fontSize: "22px" }}>{teklif.toplam_fiyat || teklif.fiyat} EUR</span>
          </div>
        </div>

        {/* Butonlar */}
        {teklif.durum === "beklemede" && (
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button onClick={teklifOnayla} style={{ flex: 2, background: "#059669", color: "#fff", border: "none", padding: "14px", borderRadius: "12px", fontSize: "15px", cursor: "pointer", fontWeight: 700 }}>
              ✅ Teklifi Onayla
            </button>
            <button onClick={teklifReddet} style={{ flex: 1, background: "#fff0f0", color: "#c00", border: "1px solid #fcc", padding: "14px", borderRadius: "12px", fontSize: "13px", cursor: "pointer", fontWeight: 600 }}>
              ❌ Reddet
            </button>
          </div>
        )}

        {teklif.durum === "onaylandi" && (
          <a href="/mesajlar" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "#534AB7", color: "#fff", padding: "14px", borderRadius: "12px", fontSize: "15px", textDecoration: "none", fontWeight: 700, marginBottom: "20px" }}>
            💬 Klinik ile Mesajlaş
          </a>
        )}

      </div>
    </main>
  );
}
