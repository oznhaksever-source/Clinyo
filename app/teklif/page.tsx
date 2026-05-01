"use client";
import { useState } from "react";
import { createClient } from "../../utils/supabase/client";
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

  const supabase = createClient();
const [fotograflar, setFotograflar] = useState<string[]>([]);
const [fotografYukleniyor, setFotografYukleniyor] = useState(false);

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

  const tedaviler = [
    { id: "implant", ad: "İmplant", aciklama: "Eksik diş yerine kalıcı implant" },
    { id: "zirkonyum", ad: "Zirkonyum Kaplama", aciklama: "Estetik diş kaplama" },
    { id: "sac-ekimi", ad: "Saç Ekimi", aciklama: "FUE / DHI yöntemi" },
    { id: "goz", ad: "Göz Ameliyatı", aciklama: "Laser, Lasik, Lasek" },
    { id: "burun", ad: "Burun Estetiği", aciklama: "Rinoplasti" },
    { id: "dis-beyazlatma", ad: "Diş Beyazlatma", aciklama: "Profesyonel beyazlatma" },
    { id: "kanal", ad: "Kanal Tedavisi", aciklama: "Kök kanal tedavisi" },
    { id: "diger", ad: "Diğer", aciklama: "Başka bir tedavi" },
  ];

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
      setHata("Hata oluştu: " + error.message);
      setYukleniyor(false);
    } else {
      setGonderildi(true);
    }
  }

  if (gonderildi) {
    return (
      <main style={{ minHeight: "100vh", background: "#0d2144", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "48px", textAlign: "center", maxWidth: "440px" }}>
          <div style={{ width: "64px", height: "64px", background: "#E6F1FB", borderRadius: "50%", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>✓</div>
          <h2 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", marginBottom: "12px" }}>Talebiniz Alındı!</h2>
          <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px", lineHeight: 1.6 }}>
            Klinikler teklifinizi inceleyecek ve en kısa sürede size ulaşacak. Ortalama yanıt süresi 2-4 saattir.
          </p>
          <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "16px", marginBottom: "24px", textAlign: "left" }}>
            <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>Seçilen Tedavi</div>
            <div style={{ fontSize: "15px", fontWeight: 500, color: "#1a1a1a", marginBottom: "12px" }}>{tedavi}</div>
            <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>Email</div>
            <div style={{ fontSize: "15px", fontWeight: 500, color: "#1a1a1a" }}>{email}</div>
          </div>
          <a href="/" style={{ display: "block", background: "#185FA5", color: "#fff", padding: "12px", borderRadius: "8px", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>
            Ana Sayfaya Dön
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
          <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: 500, marginBottom: "8px" }}>Ücretsiz Teklif Al</h1>
          <p style={{ color: "#7a90b0", fontSize: "14px" }}>Birden fazla klinikten teklif al, karşılaştır, en iyisini seç</p>
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
          <div style={{ background: "#fff0f0", border: "1px solid #fcc", borderRadius: "8px", padding: "10px 16px", marginBottom: "16px", fontSize: "13px", color: "#c00" }}>
            {hata}
          </div>
        )}

        <div style={{ background: "#fff", borderRadius: "16px", padding: "32px" }}>

          {adim === 1 && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 500, color: "#1a1a1a", marginBottom: "6px" }}>Hangi tedaviyi istiyorsunuz?</h2>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>Size uygun klinikleri bulabilmemiz için tedaviyi seçin</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                {tedaviler.map((t) => (
                  <div key={t.id} onClick={() => setTedavi(t.ad)} style={{ border: tedavi === t.ad ? "2px solid #185FA5" : "1px solid #e5e7eb", borderRadius: "10px", padding: "14px", cursor: "pointer", background: tedavi === t.ad ? "#f0f4ff" : "#fff" }}>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: tedavi === t.ad ? "#185FA5" : "#1a1a1a", marginBottom: "2px" }}>{t.ad}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{t.aciklama}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Durumunuzu açıklayın (opsiyonel)</label>
                <textarea rows={3} placeholder="Örneğin: Sol alt çene implant, acım var..." value={aciklama} onChange={(e) => setAciklama(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none", resize: "none" }} />
              </div>
              <button onClick={() => { if (tedavi) setAdim(2); }} style={{ width: "100%", background: tedavi ? "#185FA5" : "#ccc", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: tedavi ? "pointer" : "not-allowed", fontWeight: 500 }}>
                Devam Et
              </button>
            </div>
          )}

          {adim === 2 && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 500, color: "#1a1a1a", marginBottom: "6px" }}>İletişim Bilgileriniz</h2>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>Klinikler size bu bilgilerle ulaşacak</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <div>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Ad</label>
                  <input type="text" placeholder="Adınız" value={ad} onChange={(e) => setAd(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Soyad</label>
                  <input type="text" placeholder="Soyadınız" value={soyad} onChange={(e) => setSoyad(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
                </div>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>E-posta</label>
                <input type="email" placeholder="ornek@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Telefon</label>
                <input type="tel" placeholder="+49 123 456 78" value={telefon} onChange={(e) => setTelefon(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>X-Ray / Fotoğraf Ekle (opsiyonel)</label>
                <input type="file" accept="image/*" multiple onChange={(e) => { if (e.target.files) fotografYukle(e.target.files); }} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px" }} />
                {fotografYukleniyor && <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>Yükleniyor...</div>}
                {fotograflar.length > 0 && (
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                    {fotograflar.map((url, i) => (
                      <img key={i} src={url} alt="X-ray" style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e5e7eb" }} />
                    ))}
                  </div>
                )}
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Ülkeniz</label>
                <select value={ulke} onChange={(e) => setUlke(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none", background: "#fff" }}>
                  <option value="">Ülke seçin</option>
                  <option>Almanya</option>
                  <option>İngiltere</option>
                  <option>Hollanda</option>
                  <option>Avusturya</option>
                  <option>Fransa</option>
                  <option>İsviçre</option>
                  <option>Belçika</option>
                  <option>Türkiye</option>
                  <option>Diğer</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setAdim(1)} style={{ flex: 1, background: "#f9fafb", color: "#555", border: "1px solid #e5e7eb", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>Geri</button>
                <button onClick={() => { if (ad && email && ulke) setAdim(3); }} style={{ flex: 2, background: ad && email && ulke ? "#185FA5" : "#ccc", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: ad && email && ulke ? "pointer" : "not-allowed", fontWeight: 500 }}>
                  Devam Et
                </button>
              </div>
            </div>
          )}

          {adim === 3 && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 500, color: "#1a1a1a", marginBottom: "6px" }}>Talebinizi Onaylayın</h2>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>Bilgilerinizi kontrol edin ve gönderin</p>
              <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "20px", marginBottom: "20px" }}>
                {[
                  { etiket: "Tedavi", deger: tedavi },
                  { etiket: "Ad Soyad", deger: `${ad} ${soyad}` },
                  { etiket: "Email", deger: email },
                  { etiket: "Telefon", deger: telefon },
                  { etiket: "Ülke", deger: ulke },
                ].map((b) => (
                  <div key={b.etiket} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #efefef", fontSize: "13px" }}>
                    <span style={{ color: "#888" }}>{b.etiket}</span>
                    <span style={{ color: "#1a1a1a", fontWeight: 500 }}>{b.deger}</span>
                  </div>
                ))}
                {aciklama && (
                  <div style={{ paddingTop: "8px", fontSize: "13px" }}>
                    <span style={{ color: "#888" }}>Açıklama: </span>
                    <span style={{ color: "#1a1a1a" }}>{aciklama}</span>
                  </div>
                )}
              </div>
              <div style={{ background: "#f0f4ff", borderRadius: "10px", padding: "14px", marginBottom: "20px", fontSize: "13px", color: "#185FA5" }}>
                Talebiniz onaylanmış kliniklere iletilecek. Klinikler size 2-4 saat içinde yanıt verecek.
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setAdim(2)} style={{ flex: 1, background: "#f9fafb", color: "#555", border: "1px solid #e5e7eb", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>Geri</button>
                <button onClick={gonder} disabled={yukleniyor} style={{ flex: 2, background: "#185FA5", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 500, opacity: yukleniyor ? 0.7 : 1 }}>
                  {yukleniyor ? "Gönderiliyor..." : "Teklif Talep Et"}
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
