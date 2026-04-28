 "use client";
import { useState } from "react";

export default function AdminPanel() {
  const [aktifSayfa, setAktifSayfa] = useState("ozet");

  const klinikler = [
    { id: "1", ad: "Smile Dental Clinic", sehir: "Istanbul", kategori: "Dis", durum: "onaylandi", puan: "4.9" },
    { id: "2", ad: "Hair Turkey Center", sehir: "Istanbul", kategori: "Sac Ekimi", durum: "beklemede", puan: "-" },
    { id: "3", ad: "Vision Eye Center", sehir: "Izmir", kategori: "Goz", durum: "onaylandi", puan: "4.7" },
    { id: "4", ad: "Estetik Klinik", sehir: "Ankara", kategori: "Plastik Cerrahi", durum: "beklemede", puan: "-" },
  ];

  const kullanicilar = [
    { ad: "Thomas M.", email: "thomas@email.com", ulke: "Almanya", tur: "hasta", tarih: "22 Nisan 2024" },
    { ad: "Smile Dental", email: "info@smile.com", ulke: "Turkiye", tur: "klinik", tarih: "20 Nisan 2024" },
    { ad: "Sarah K.", email: "sarah@email.com", ulke: "Ingiltere", tur: "hasta", tarih: "18 Nisan 2024" },
    { ad: "Hair Turkey", email: "info@hairturkey.com", ulke: "Turkiye", tur: "klinik", tarih: "15 Nisan 2024" },
  ];

  const yorumlar = [
    { hasta: "Thomas M.", klinik: "Smile Dental", puan: 5, yorum: "Mukemmel hizmet, kesinlikle tavsiye ederim.", durum: "beklemede" },
    { hasta: "Sarah K.", klinik: "Vision Eye", puan: 4, yorum: "Cok iyi klinik, doktorlar cok ilgili.", durum: "onaylandi" },
    { hasta: "Hans B.", klinik: "Hair Turkey", puan: 2, yorum: "Beklentilerimi karsilamadi.", durum: "beklemede" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif", display: "flex" }}>

      <div style={{ width: "240px", background: "#0a1628", minHeight: "100vh", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1a2a3a" }}>
          <a href="/" style={{ fontSize: "20px", fontWeight: 500, color: "#fff", textDecoration: "none" }}>
            med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
          </a>
          <div style={{ fontSize: "11px", color: "#5a7a9a", marginTop: "4px" }}>Admin Paneli</div>
        </div>
        <div style={{ padding: "16px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", marginBottom: "16px" }}>
            <div style={{ width: "40px", height: "40px", background: "#c00", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 500 }}>A</div>
            <div>
              <div style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>Admin</div>
              <div style={{ color: "#5a7a9a", fontSize: "11px" }}>admin@clinyo.com</div>
            </div>
          </div>
          {[
            { id: "ozet", etiket: "Genel Ozet" },
            { id: "klinikler", etiket: "Klinik Yonetimi" },
            { id: "kullanicilar", etiket: "Kullanicilar" },
            { id: "yorumlar", etiket: "Yorum Denetimi" },
            { id: "finans", etiket: "Finans & Komisyon" },
          ].map((item) => (
            <button key={item.id} onClick={() => setAktifSayfa(item.id)} style={{ width: "100%", padding: "10px 12px", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer", textAlign: "left", marginBottom: "4px", background: aktifSayfa === item.id ? "#185FA5" : "transparent", color: aktifSayfa === item.id ? "#fff" : "#aab4c8" }}>
              {item.etiket}
            </button>
          ))}
          <div style={{ borderTop: "1px solid #1a2a3a", marginTop: "16px", paddingTop: "16px" }}>
            <button onClick={() => { window.location.href = "/"; }} style={{ width: "100%", padding: "10px 12px", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer", textAlign: "left", background: "transparent", color: "#aab4c8" }}>
              Cikis Yap
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "32px" }}>

        {aktifSayfa === "ozet" && (
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", marginBottom: "24px" }}>Genel Ozet</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
              {[
                { sayi: "142", etiket: "Toplam Klinik", renk: "#185FA5" },
                { sayi: "3.240", etiket: "Toplam Kullanici", renk: "#0a7a3a" },
                { sayi: "12.500", etiket: "Toplam Teklif", renk: "#BA7517" },
                { sayi: "48.200", etiket: "Platform Geliri (EUR)", renk: "#185FA5" },
              ].map((k) => (
                <div key={k.etiket} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontSize: "24px", fontWeight: 500, color: k.renk, marginBottom: "4px" }}>{k.sayi}</div>
                  <div style={{ fontSize: "12px", color: "#888" }}>{k.etiket}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#1a1a1a", marginBottom: "16px" }}>Onay Bekleyen Klinikler</h2>
                {klinikler.filter(k => k.durum === "beklemede").map((k) => (
                  <div key={k.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f5f5f5" }}>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a" }}>{k.ad}</div>
                      <div style={{ fontSize: "12px", color: "#888" }}>{k.sehir} • {k.kategori}</div>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => setAktifSayfa("klinikler")} style={{ background: "#0a7a3a", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>Onayla</button>
                      <button style={{ background: "#fff0f0", color: "#c00", border: "1px solid #fcc", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>Reddet</button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#1a1a1a", marginBottom: "16px" }}>Bekleyen Yorumlar</h2>
                {yorumlar.filter(y => y.durum === "beklemede").map((y, i) => (
                  <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #f5f5f5" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1a" }}>{y.hasta}</span>
                      <span style={{ fontSize: "12px", color: "#BA7517" }}>{"★".repeat(y.puan)}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>{y.yorum}</div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button style={{ background: "#0a7a3a", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Onayla</button>
                      <button style={{ background: "#fff0f0", color: "#c00", border: "1px solid #fcc", padding: "5px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Sil</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {aktifSayfa === "klinikler" && (
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", marginBottom: "24px" }}>Klinik Yonetimi</h1>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "12px 20px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                {["Klinik", "Sehir", "Kategori", "Puan", "Durum"].map((b) => (
                  <div key={b} style={{ fontSize: "12px", fontWeight: 500, color: "#888" }}>{b}</div>
                ))}
              </div>
              {klinikler.map((k) => (
                <div key={k.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "14px 20px", borderBottom: "1px solid #f5f5f5", alignItems: "center" }}>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a" }}>{k.ad}</div>
                  <div style={{ fontSize: "13px", color: "#888" }}>{k.sehir}</div>
                  <div style={{ fontSize: "13px", color: "#888" }}>{k.kategori}</div>
                  <div style={{ fontSize: "13px", color: "#BA7517" }}>{k.puan !== "-" ? "★ " + k.puan : "-"}</div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {k.durum === "beklemede" ? (
                      <>
                        <button style={{ background: "#0a7a3a", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Onayla</button>
                        <button style={{ background: "#fff0f0", color: "#c00", border: "1px solid #fcc", padding: "5px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Reddet</button>
                      </>
                    ) : (
                      <span style={{ fontSize: "12px", padding: "3px 10px", borderRadius: "20px", background: "#f0fff4", color: "#0a7a3a" }}>Onaylandi</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {aktifSayfa === "kullanicilar" && (
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", marginBottom: "24px" }}>Kullanicilar</h1>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr", padding: "12px 20px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                {["Ad", "Email", "Ulke", "Tur", "Kayit Tarihi"].map((b) => (
                  <div key={b} style={{ fontSize: "12px", fontWeight: 500, color: "#888" }}>{b}</div>
                ))}
              </div>
              {kullanicilar.map((u, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr", padding: "14px 20px", borderBottom: "1px solid #f5f5f5", alignItems: "center" }}>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a" }}>{u.ad}</div>
                  <div style={{ fontSize: "13px", color: "#888" }}>{u.email}</div>
                  <div style={{ fontSize: "13px", color: "#888" }}>{u.ulke}</div>
                  <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "20px", background: u.tur === "klinik" ? "#f0f4ff" : "#f0fff4", color: u.tur === "klinik" ? "#185FA5" : "#0a7a3a", display: "inline-block" }}>{u.tur}</span>
                  <div style={{ fontSize: "12px", color: "#888" }}>{u.tarih}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {aktifSayfa === "yorumlar" && (
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", marginBottom: "24px" }}>Yorum Denetimi</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {yorumlar.map((y, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a" }}>{y.hasta}</span>
                        <span style={{ fontSize: "12px", color: "#888" }}>→ {y.klinik}</span>
                        <span style={{ fontSize: "12px", color: "#BA7517" }}>{"★".repeat(y.puan)}</span>
                      </div>
                      <p style={{ fontSize: "13px", color: "#555", margin: 0 }}>{y.yorum}</p>
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                      {y.durum === "beklemede" ? (
                        <>
                          <button style={{ background: "#0a7a3a", color: "#fff", border: "none", padding: "7px 14px", borderRadius: "8px", fontSize: "12px", cursor: "pointer" }}>Onayla</button>
                          <button style={{ background: "#fff0f0", color: "#c00", border: "1px solid #fcc", padding: "7px 14px", borderRadius: "8px", fontSize: "12px", cursor: "pointer" }}>Sil</button>
                        </>
                      ) : (
                        <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "20px", background: "#f0fff4", color: "#0a7a3a" }}>Onaylandi</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {aktifSayfa === "finans" && (
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", marginBottom: "24px" }}>Finans & Komisyon</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
              {[
                { sayi: "482.000", etiket: "Toplam Islem Hacmi (EUR)", renk: "#185FA5" },
                { sayi: "48.200", etiket: "Platform Komisyonu (%10)", renk: "#0a7a3a" },
                { sayi: "142", etiket: "Aktif Klinik", renk: "#BA7517" },
              ].map((k) => (
                <div key={k.etiket} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontSize: "24px", fontWeight: 500, color: k.renk, marginBottom: "4px" }}>{k.sayi}</div>
                  <div style={{ fontSize: "12px", color: "#888" }}>{k.etiket}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#1a1a1a", marginBottom: "16px" }}>Komisyon Ayarlari</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#555" }}>Platform Komisyon Orani:</label>
                <input type="number" defaultValue="10" style={{ width: "80px", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", outline: "none" }} />
                <span style={{ fontSize: "13px", color: "#888" }}>%</span>
                <button style={{ background: "#185FA5", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Guncelle</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

