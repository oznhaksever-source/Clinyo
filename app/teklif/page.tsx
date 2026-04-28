 "use client";
import { useState } from "react";

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

  const tedaviler = [
    { id: "implant", ad: "Implant", aciklama: "Eksik dis yerine kalici implant" },
    { id: "zirkonyum", ad: "Zirkonyum Kaplama", aciklama: "Estetik dis kaplama" },
    { id: "sac-ekimi", ad: "Sac Ekimi", aciklama: "FUE / DHI yontemi" },
    { id: "goz", ad: "Goz Ameliyati", aciklama: "Laser, Lasik, Lasek" },
    { id: "burun", ad: "Burun Estetigi", aciklama: "Rinoplasti" },
    { id: "dis-beyazlatma", ad: "Dis Beyazlatma", aciklama: "Profesyonel beyazlatma" },
    { id: "kanal", ad: "Kanal Tedavisi", aciklama: "Kok kanal tedavisi" },
    { id: "diger", ad: "Diger", aciklama: "Baska bir tedavi" },
  ];

  function gonder() {
    setGonderildi(true);
  }

  if (gonderildi) {
    return (
      <main style={{ minHeight: "100vh", background: "#0d2144", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "48px", textAlign: "center", maxWidth: "440px" }}>
          <div style={{ width: "64px", height: "64px", background: "#E6F1FB", borderRadius: "50%", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>✓</div>
          <h2 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", marginBottom: "12px" }}>Talebiniz Alindi!</h2>
          <p style={{ fontSize: "14px", color: "#888", marginBottom: "24px", lineHeight: 1.6 }}>
            Klinikler teklifinizi inceleyecek ve en kisa surede size ulaşacak. Ortalama yanit suresi 2-4 saattir.
          </p>
          <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "16px", marginBottom: "24px", textAlign: "left" }}>
            <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>Secilen Tedavi</div>
            <div style={{ fontSize: "15px", fontWeight: 500, color: "#1a1a1a", marginBottom: "12px" }}>{tedavi}</div>
            <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>Email</div>
            <div style={{ fontSize: "15px", fontWeight: 500, color: "#1a1a1a" }}>{email}</div>
          </div>
          <a href="/" style={{ display: "block", background: "#185FA5", color: "#fff", padding: "12px", borderRadius: "8px", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>
            Ana Sayfaya Don
          </a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0d2144", fontFamily: "sans-serif" }}>

      <nav style={{ padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ fontSize: "22px", fontWeight: 500, color: "#fff", textDecoration: "none" }}>
          med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
        </a>
        <a href="/" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>Ana Sayfaya Don</a>
      </nav>

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "32px" }}>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: 500, marginBottom: "8px" }}>Ucretsiz Teklif Al</h1>
          <p style={{ color: "#7a90b0", fontSize: "14px" }}>Birden fazla klinikten teklif al, karsilastir, en iyisini sec</p>
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

        <div style={{ background: "#fff", borderRadius: "16px", padding: "32px" }}>

          {adim === 1 && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 500, color: "#1a1a1a", marginBottom: "6px" }}>Hangi tedaviyi istiyorsunuz?</h2>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>Size uygun klinikleri bulabilmemiz icin tedaviyi secin</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                {tedaviler.map((t) => (
                  <div key={t.id} onClick={() => setTedavi(t.ad)} style={{ border: tedavi === t.ad ? "2px solid #185FA5" : "1px solid #e5e7eb", borderRadius: "10px", padding: "14px", cursor: "pointer", background: tedavi === t.ad ? "#f0f4ff" : "#fff" }}>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: tedavi === t.ad ? "#185FA5" : "#1a1a1a", marginBottom: "2px" }}>{t.ad}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{t.aciklama}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Durumunuzu aciklayin (opsiyonel)</label>
                <textarea rows={3} placeholder="Ornegin: Sol alt cene implant, acim var, daha once dis cekimi yapildi..." value={aciklama} onChange={(e) => setAciklama(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none", resize: "none" }} />
              </div>
              <button onClick={() => { if (tedavi) setAdim(2); }} style={{ width: "100%", background: tedavi ? "#185FA5" : "#ccc", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: tedavi ? "pointer" : "not-allowed", fontWeight: 500 }}>
                Devam Et
              </button>
            </div>
          )}

          {adim === 2 && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 500, color: "#1a1a1a", marginBottom: "6px" }}>Iletisim Bilgileriniz</h2>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>Klinikler size bu bilgilerle ulasacak</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <div>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Ad</label>
                  <input type="text" placeholder="Adiniz" value={ad} onChange={(e) => setAd(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Soyad</label>
                  <input type="text" placeholder="Soyadiniz" value={soyad} onChange={(e) => setSoyad(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
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
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Ulkeniz</label>
                <select value={ulke} onChange={(e) => setUlke(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none", background: "#fff" }}>
                  <option value="">Ulke secin</option>
                  <option>Almanya</option>
                  <option>Ingiltere</option>
                  <option>Hollanda</option>
                  <option>Avusturya</option>
                  <option>Turkiye</option>
                  <option>Diger</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setAdim(1)} style={{ flex: 1, background: "#f9fafb", color: "#555", border: "1px solid #e5e7eb", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>
                  Geri
                </button>
                <button onClick={() => { if (ad && email && ulke) setAdim(3); }} style={{ flex: 2, background: ad && email && ulke ? "#185FA5" : "#ccc", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: ad && email && ulke ? "pointer" : "not-allowed", fontWeight: 500 }}>
                  Devam Et
                </button>
              </div>
            </div>
          )}

          {adim === 3 && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 500, color: "#1a1a1a", marginBottom: "6px" }}>Talebinizi Onaylayin</h2>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>Bilgilerinizi kontrol edin ve gonderin</p>
              <div style={{ background: "#f9fafb", borderRadius: "10px", padding: "20px", marginBottom: "20px" }}>
                {[
                  { etiket: "Tedavi", deger: tedavi },
                  { etiket: "Ad Soyad", deger: ad + " " + soyad },
                  { etiket: "Email", deger: email },
                  { etiket: "Telefon", deger: telefon },
                  { etiket: "Ulke", deger: ulke },
                ].map((b) => (
                  <div key={b.etiket} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #efefef", fontSize: "13px" }}>
                    <span style={{ color: "#888" }}>{b.etiket}</span>
                    <span style={{ color: "#1a1a1a", fontWeight: 500 }}>{b.deger}</span>
                  </div>
                ))}
                {aciklama && (
                  <div style={{ paddingTop: "8px", fontSize: "13px" }}>
                    <span style={{ color: "#888" }}>Aciklama: </span>
                    <span style={{ color: "#1a1a1a" }}>{aciklama}</span>
                  </div>
                )}
              </div>
              <div style={{ background: "#f0f4ff", borderRadius: "10px", padding: "14px", marginBottom: "20px", fontSize: "13px", color: "#185FA5" }}>
                Talebiniz onaylanmis kliniklere iletilecek. Klinikler size 2-4 saat icinde yanit verecek.
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setAdim(2)} style={{ flex: 1, background: "#f9fafb", color: "#555", border: "1px solid #e5e7eb", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>
                  Geri
                </button>
                <button onClick={gonder} style={{ flex: 2, background: "#185FA5", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 500 }}>
                  Teklif Talep Et
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}

