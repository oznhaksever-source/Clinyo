"use client";
import { useState } from "react";
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

  const { t, dil } = useDil();
  const supabase = createClient();

  const tedaviler = [
    { id: "implant", tr: "İmplant", en: "Implant", de: "Implantat", aciklamaTr: "Eksik diş yerine kalıcı implant", aciklamaEn: "Permanent implant for missing tooth", aciklamaDe: "Dauerhaftes Implantat für fehlende Zähne" },
    { id: "zirkonyum", tr: "Zirkonyum Kaplama", en: "Zirconia Crown", de: "Zirkonkrone", aciklamaTr: "Estetik diş kaplama", aciklamaEn: "Aesthetic dental crown", aciklamaDe: "Ästhetische Zahnkrone" },
    { id: "sac-ekimi", tr: "Saç Ekimi", en: "Hair Transplant", de: "Haartransplantation", aciklamaTr: "FUE / DHI yöntemi", aciklamaEn: "FUE / DHI method", aciklamaDe: "FUE / DHI Methode" },
    { id: "goz", tr: "Göz Ameliyatı", en: "Eye Surgery", de: "Augenoperation", aciklamaTr: "Laser, Lasik, Lasek", aciklamaEn: "Laser, Lasik, Lasek", aciklamaDe: "Laser, Lasik, Lasek" },
    { id: "burun", tr: "Burun Estetiği", en: "Rhinoplasty", de: "Rhinoplastik", aciklamaTr: "Rinoplasti", aciklamaEn: "Nose job", aciklamaDe: "Nasenkorrektur" },
    { id: "dis-beyazlatma", tr: "Diş Beyazlatma", en: "Teeth Whitening", de: "Zahnaufhellung", aciklamaTr: "Profesyonel beyazlatma", aciklamaEn: "Professional whitening", aciklamaDe: "Professionelle Aufhellung" },
    { id: "kanal", tr: "Kanal Tedavisi", en: "Root Canal", de: "Wurzelkanalbehandlung", aciklamaTr: "Kök kanal tedavisi", aciklamaEn: "Root canal treatment", aciklamaDe: "Wurzelkanalbehandlung" },
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
      aciklama: aciklama,
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

  if (gonderildi) {
    return (
      <main style={{ minHeight: "100vh", background: "#0d2144", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "48px", textAlign: "center", maxWidth: "440px" }}>
          <div style={{ width: "64px", height: "64px", background: "#E6F1FB", borderRadius: "50%", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>✓</div>
          <h2 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", marginBottom: "12px" }}>{t.teklif.basarili}</h2>
          <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px", lineHeight: 1.6 }}>{t.teklif.basariliAciklama}</p>
          <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "16px", marginBottom: "24px", textAlign: "left" }}>
            <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>{dil === "tr" ? "Seçilen Tedavi" : dil === "en" ? "Selected Treatment" : "Ausgewählte Behandlung"}</div>
            <div style={{ fontSize: "15px", fontWeight: 500, color: "#1a1a1a", marginBottom: "12px" }}>{tedavi}</div>
            <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>Email</div>
            <div style={{ fontSize: "15px", fontWeight: 500, color: "#1a1a1a" }}>{email}</div>
          </div>
          <a href="/" style={{ display: "block", background: "#185FA5", color: "#fff", padding: "12px", borderRadius: "8px", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>
            {t.teklif.anaSayfayaDon}
          </a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0d2144", fontFamily: "sans-serif" }}>
      <Navbar />
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "32px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: 500, marginBottom: "8px" }}>{t.teklif.baslik}</h1>
          <p style={{ color: "#7a90b0", fontSize: "14px" }}>{t.teklif.altBaslik}</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", marginBottom: "32px" }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 500, background: adim >= s ? "#185FA5" : "#1a2a3a", color: adim >= s ? "#fff" : "#5a7a9a" }}>
                {adim > s ? "✓" : s}
              </div>
              {s < 3 && <div style={{ width: "80px", height: "2px", background: adim > s ? "#185FA5" : "#1a2a3a" }} />}
            </div>
          ))}
        </div>

        {hata && (
          <div style={{ background: "#fff0f0", border: "1px solid #fcc", borderRadius: "8px", padding: "10px 16px", marginBottom: "16px", fontSize: "13px", color: "#c00" }}>{hata}</div>
        )}

        <div style={{ background: "#fff", borderRadius: "16px", padding: "32px" }}>
          {adim === 1 && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 500, color: "#1a1a1a", marginBottom: "6px" }}>{t.teklif.hangiTedavi}</h2>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>{t.teklif.tedaviSec}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                {tedaviler.map((ted) => {
                  const ad = dil === "tr" ? ted.tr : dil === "en" ? ted.en : ted.de;
                  const acik = dil === "tr" ? ted.aciklamaTr : dil === "en" ? ted.aciklamaEn : ted.aciklamaDe;
                  return (
                    <div key={ted.id} onClick={() => setTedavi(ad)} style={{ border: tedavi === ad ? "2px solid #185FA5" : "1px solid #e5e7eb", borderRadius: "10px", padding: "14px", cursor: "pointer", background: tedavi === ad ? "#f0f4ff" : "#fff" }}>
                      <div style={{ fontSize: "14px", fontWeight: 500, color: tedavi === ad ? "#185FA5" : "#1a1a1a", marginBottom: "2px" }}>{ad}</div>
                      <div style={{ fontSize: "12px", color: "#888" }}>{acik}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>{t.teklif.aciklamaLabel}</label>
                <textarea rows={3} value={aciklama} onChange={(e) => setAciklama(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none", resize: "none" }} />
              </div>
              <button onClick={() => { if (tedavi) setAdim(2); }} style={{ width: "100%", background: tedavi ? "#185FA5" : "#ccc", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: tedavi ? "pointer" : "not-allowed", fontWeight: 500 }}>
                {t.teklif.devamEt}
              </button>
            </div>
          )}

          {adim === 2 && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 500, color: "#1a1a1a", marginBottom: "6px" }}>{t.teklif.iletisimBilgileri}</h2>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>{t.teklif.iletisimAciklama}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <div>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>{t.teklif.ad}</label>
                  <input type="text" value={ad} onChange={(e) => setAd(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>{t.teklif.soyad}</label>
                  <input type="text" value={soyad} onChange={(e) => setSoyad(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
                </div>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>{t.teklif.eposta}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>{t.teklif.telefon}</label>
                <input type="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>
                  {dil === "tr" ? "X-Ray / Fotoğraf Ekle (opsiyonel)" : dil === "en" ? "Add X-Ray / Photo (optional)" : "X-Ray / Foto hinzufügen (optional)"}
                </label>
                <input type="file" accept="image/*" multiple onChange={(e) => { if (e.target.files) fotografYukle(e.target.files); }} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px" }} />
                {fotografYukleniyor && <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>{dil === "tr" ? "Yükleniyor..." : dil === "en" ? "Uploading..." : "Wird hochgeladen..."}</div>}
                {fotograflar.length > 0 && (
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                    {fotograflar.map((url, i) => (
                      <img key={i} src={url} alt="X-ray" style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e5e7eb" }} />
                    ))}
                  </div>
                )}
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>{t.teklif.ulke}</label>
                <select value={ulke} onChange={(e) => setUlke(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none", background: "#fff" }}>
                  <option value="">{t.teklif.ulkeSec}</option>
                  {ulkeler[dil].map((u) => <option key={u}>{u}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setAdim(1)} style={{ flex: 1, background: "#f9fafb", color: "#555", border: "1px solid #e5e7eb", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>{t.teklif.geri}</button>
                <button onClick={() => { if (ad && email && ulke) setAdim(3); }} style={{ flex: 2, background: ad && email && ulke ? "#185FA5" : "#ccc", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: ad && email && ulke ? "pointer" : "not-allowed", fontWeight: 500 }}>
                  {t.teklif.devamEt}
                </button>
              </div>
            </div>
          )}

          {adim === 3 && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 500, color: "#1a1a1a", marginBottom: "6px" }}>{t.teklif.onayla}</h2>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>{t.teklif.onaylaAciklama}</p>
              <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "20px", marginBottom: "20px" }}>
                {[
                  { etiket: dil === "tr" ? "Tedavi" : dil === "en" ? "Treatment" : "Behandlung", deger: tedavi },
                  { etiket: `${t.teklif.ad} ${t.teklif.soyad}`, deger: `${ad} ${soyad}` },
                  { etiket: "Email", deger: email },
                  { etiket: t.teklif.telefon, deger: telefon },
                  { etiket: t.teklif.ulke, deger: ulke },
                ].map((b) => (
                  <div key={b.etiket} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #efefef", fontSize: "13px" }}>
                    <span style={{ color: "#888" }}>{b.etiket}</span>
                    <span style={{ color: "#1a1a1a", fontWeight: 500 }}>{b.deger}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setAdim(2)} style={{ flex: 1, background: "#f9fafb", color: "#555", border: "1px solid #e5e7eb", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>{t.teklif.geri}</button>
                <button onClick={gonder} disabled={yukleniyor} style={{ flex: 2, background: "#185FA5", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 500, opacity: yukleniyor ? 0.7 : 1 }}>
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
