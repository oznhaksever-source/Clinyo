"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

  const { t, dil } = useDil();
  const supabase = createClient();

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  const tedaviler = [
    { id: "implant", tr: "İmplant", en: "Implant", de: "Implantat", aciklamaTr: "Eksik diş yerine kalıcı implant", aciklamaEn: "Permanent implant for missing tooth", aciklamaDe: "Dauerhaftes Implantat" },
    { id: "zirkonyum", tr: "Zirkonyum Kaplama", en: "Zirconia Crown", de: "Zirkonkrone", aciklamaTr: "Estetik diş kaplama", aciklamaEn: "Aesthetic dental crown", aciklamaDe: "Ästhetische Zahnkrone" },
    { id: "sac-ekimi", tr: "Saç Ekimi", en: "Hair Transplant", de: "Haartransplantation", aciklamaTr: "FUE / DHI yöntemi", aciklamaEn: "FUE / DHI method", aciklamaDe: "FUE / DHI Methode" },
    { id: "goz", tr: "Göz Ameliyatı", en: "Eye Surgery", de: "Augenoperation", aciklamaTr: "Laser, Lasik, Lasek", aciklamaEn: "Laser, Lasik, Lasek", aciklamaDe: "Laser, Lasik, Lasek" },
    { id: "burun", tr: "Burun Estetiği", en: "Rhinoplasty", de: "Rhinoplastik", aciklamaTr: "Rinoplasti", aciklamaEn: "Nose job", aciklamaDe: "Nasenkorrektur" },
    { id: "dis-beyazlatma", tr: "Diş Beyazlatma", en: "Teeth Whitening", de: "Zahnaufhellung", aciklamaTr: "Profesyonel beyazlatma", aciklamaEn: "Professional whitening", aciklamaDe: "Professionelle Aufhellung" },
    { id: "kanal", tr: "Kanal Tedavisi", en: "Root Canal", de: "Wurzelkanal", aciklamaTr: "Kök kanal tedavisi", aciklamaEn: "Root canal treatment", aciklamaDe: "Wurzelkanalbehandlung" },
    { id: "diger", tr: "Diğer", en: "Other", de: "Sonstiges", aciklamaTr: "Başka bir tedavi", aciklamaEn: "Other treatment", aciklamaDe: "Andere Behandlung" },
  ];

  const ulkeler = {
    tr: ["Almanya", "İngiltere", "Hollanda", "Avusturya", "Fransa", "İsviçre", "Belçika", "Türkiye", "Diğer"],
    en: ["Germany", "United Kingdom", "Netherlands", "Austria", "France", "Switzerland", "Belgium", "Turkey", "Other"],
    de: ["Deutschland", "Vereinigtes Königreich", "Niederlande", "Österreich", "Frankreich", "Schweiz", "Belgien", "Türkei", "Sonstiges"],
  };

  async function fotografYukle(files: FileList) {
    setFotografYukleniyor(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const dosyaAdi = `talepler/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from("medoqa-images").upload(dosyaAdi, file);
      if (!error) {
        const { data: url } = supabase.storage.from("medoqa-images").getPublicUrl(dosyaAdi);
        urls.push(url.publicUrl);
      }
    }
    setFotograflar(prev => [...prev, ...urls]);
    setFotografYukleniyor(false);
  }

  async function gonder() {
    setYukleniyor(true);
    setHata("");
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("talepler").insert({
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
    });
    if (error) {
      setHata("Hata: " + error.message);
      setYukleniyor(false);
    } else {
      await fetch("/api/bildirim-gonder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip: "yeni_talep", tedavi, hasta_ad: ad, hasta_soyad: soyad, hasta_email: email, hasta_ulke: ulke, aciklama }),
      });
      setGonderildi(true);
    }
  }

  const inputStyle = { width: "100%", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", fontSize: "14px", boxSizing: "border-box" as const, outline: "none", fontFamily: "inherit" };
  const labelStyle = { fontSize: "13px", color: "#555", display: "block" as const, marginBottom: "6px", fontWeight: 500 };

  if (gonderildi) return (
    <main style={{ minHeight: "100vh", background: "#0d2144", fontFamily: "'Segoe UI', sans-serif", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: mobil ? "32px 24px" : "48px", textAlign: "center", maxWidth: "440px", width: "100%" }}>
          <div style={{ width: "64px", height: "64px", background: "#e6f4ea", borderRadius: "50%", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>✓</div>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a1a", marginBottom: "12px" }}>{t.teklif.basarili}</h2>
          <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px", lineHeight: 1.6 }}>{t.teklif.basariliAciklama}</p>
          <a href="/" style={{ display: "block", background: "#534AB7", color: "#fff", padding: "13px", borderRadius: "10px", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>{t.teklif.anaSayfayaDon}</a>
        </div>
      </div>
    </main>
  );

  return (
    <main style={{ minHeight: "100vh", background: "#0d2144", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: mobil ? "24px 16px" : "32px" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={{ color: "#fff", fontSize: mobil ? "24px" : "28px", fontWeight: 700, marginBottom: "8px" }}>{t.teklif.baslik}</h1>
          <p style={{ color: "#7a90b0", fontSize: "14px" }}>{t.teklif.altBaslik}</p>
        </div>

        {/* Adım göstergesi */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", marginBottom: "28px" }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 600, background: adim >= s ? "#534AB7" : "#1a2a3a", color: adim >= s ? "#fff" : "#5a7a9a" }}>
                {adim > s ? "✓" : s}
              </div>
              {s < 3 && <div style={{ width: mobil ? "60px" : "80px", height: "2px", background: adim > s ? "#534AB7" : "#1a2a3a" }} />}
            </div>
          ))}
        </div>

        {hata && <div style={{ background: "#fff0f0", border: "1px solid #fcc", borderRadius: "8px", padding: "10px 16px", marginBottom: "16px", fontSize: "13px", color: "#c00" }}>{hata}</div>}

        <div style={{ background: "#fff", borderRadius: "20px", padding: mobil ? "24px 20px" : "32px" }}>

          {/* ADIM 1 - Tedavi Seç */}
          {adim === 1 && (
            <div>
              <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#1a1a1a", marginBottom: "6px" }}>{t.teklif.hangiTedavi}</h2>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>{t.teklif.tedaviSec}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                {tedaviler.map(ted => {
                  const ad = dil === "tr" ? ted.tr : dil === "en" ? ted.en : ted.de;
                  const ac = dil === "tr" ? ted.aciklamaTr : dil === "en" ? ted.aciklamaEn : ted.aciklamaDe;
                  return (
                    <div key={ted.id} onClick={() => setTedavi(ad)} style={{ border: tedavi === ad ? "2px solid #534AB7" : "1px solid #e5e7eb", borderRadius: "12px", padding: "14px 12px", cursor: "pointer", background: tedavi === ad ? "#f0eeff" : "#fff" }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: tedavi === ad ? "#534AB7" : "#1a1a1a", marginBottom: "3px" }}>{ad}</div>
                      <div style={{ fontSize: "11px", color: "#888" }}>{ac}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>{t.teklif.aciklamaLabel}</label>
                <textarea rows={3} value={aciklama} onChange={e => setAciklama(e.target.value)} style={{ ...inputStyle, resize: "none" }} />
              </div>
              <button onClick={() => { if (tedavi) setAdim(2); }} style={{ width: "100%", background: tedavi ? "#534AB7" : "#ccc", color: "#fff", border: "none", padding: "14px", borderRadius: "10px", fontSize: "15px", cursor: tedavi ? "pointer" : "not-allowed", fontWeight: 600 }}>
                {t.teklif.devamEt}
              </button>
            </div>
          )}

          {/* ADIM 2 - İletişim */}
          {adim === 2 && (
            <div>
              <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#1a1a1a", marginBottom: "6px" }}>{t.teklif.iletisimBilgileri}</h2>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>{t.teklif.iletisimAciklama}</p>
              <div style={{ display: "grid", gridTemplateColumns: mobil ? "1fr" : "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <div>
                  <label style={labelStyle}>{t.teklif.ad}</label>
                  <input type="text" value={ad} onChange={e => setAd(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{t.teklif.soyad}</label>
                  <input type="text" value={soyad} onChange={e => setSoyad(e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={labelStyle}>{t.teklif.eposta}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={labelStyle}>{t.teklif.telefon}</label>
                <input type="tel" value={telefon} onChange={e => setTelefon(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={labelStyle}>{dil === "tr" ? "X-Ray / Fotoğraf (opsiyonel)" : dil === "en" ? "X-Ray / Photo (optional)" : "X-Ray / Foto (optional)"}</label>
                <input type="file" accept="image/*" multiple onChange={e => { if (e.target.files) fotografYukle(e.target.files); }} style={{ ...inputStyle, padding: "8px 12px" }} />
                {fotografYukleniyor && <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>{dil === "tr" ? "Yükleniyor..." : "Uploading..."}</div>}
                {fotograflar.length > 0 && (
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                    {fotograflar.map((url, i) => (
                      <img key={i} src={url} alt="foto" style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e5e7eb" }} />
                    ))}
                  </div>
                )}
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>{t.teklif.ulke}</label>
                <select value={ulke} onChange={e => setUlke(e.target.value)} style={{ ...inputStyle, background: "#fff" }}>
                  <option value="">{t.teklif.ulkeSec}</option>
                  {ulkeler[dil].map(u => <option key={u}>{u}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setAdim(1)} style={{ flex: 1, background: "#f9fafb", color: "#555", border: "1px solid #e5e7eb", padding: "13px", borderRadius: "10px", fontSize: "14px", cursor: "pointer" }}>{t.teklif.geri}</button>
                <button onClick={() => { if (ad && email && ulke) setAdim(3); }} style={{ flex: 2, background: ad && email && ulke ? "#534AB7" : "#ccc", color: "#fff", border: "none", padding: "13px", borderRadius: "10px", fontSize: "14px", cursor: ad && email && ulke ? "pointer" : "not-allowed", fontWeight: 600 }}>
                  {t.teklif.devamEt}
                </button>
              </div>
            </div>
          )}

          {/* ADIM 3 - Onay */}
          {adim === 3 && (
            <div>
              <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#1a1a1a", marginBottom: "6px" }}>{t.teklif.onayla}</h2>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>{t.teklif.onaylaAciklama}</p>
              <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
                {[
                  { etiket: dil === "tr" ? "Tedavi" : dil === "en" ? "Treatment" : "Behandlung", deger: tedavi },
                  { etiket: `${t.teklif.ad} ${t.teklif.soyad}`, deger: `${ad} ${soyad}` },
                  { etiket: "Email", deger: email },
                  { etiket: t.teklif.telefon, deger: telefon },
                  { etiket: t.teklif.ulke, deger: ulke },
                ].map(b => (
                  <div key={b.etiket} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #efefef", fontSize: "13px", gap: "12px" }}>
                    <span style={{ color: "#888", flexShrink: 0 }}>{b.etiket}</span>
                    <span style={{ color: "#1a1a1a", fontWeight: 500, textAlign: "right" }}>{b.deger}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setAdim(2)} style={{ flex: 1, background: "#f9fafb", color: "#555", border: "1px solid #e5e7eb", padding: "13px", borderRadius: "10px", fontSize: "14px", cursor: "pointer" }}>{t.teklif.geri}</button>
                <button onClick={gonder} disabled={yukleniyor} style={{ flex: 2, background: "#534AB7", color: "#fff", border: "none", padding: "13px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: 600, opacity: yukleniyor ? 0.7 : 1 }}>
                  {yukleniyor ? t.teklif.gonderiliyor : t.teklif.gonder}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
