 "use client";
import { useState } from "react";

export default function KlinikPanel() {
  const [aktifSayfa, setAktifSayfa] = useState("ozet");

  const talepler = [
    { id: "1", hasta: "Thomas M.", ulke: "Almanya", tedavi: "Implant", tarih: "22 Nisan 2024", durum: "yeni" },
    { id: "2", hasta: "Sarah K.", ulke: "Ingiltere", tedavi: "Zirkonyum", tarih: "20 Nisan 2024", durum: "teklif_gonderildi" },
    { id: "3", hasta: "Hans B.", ulke: "Hollanda", tedavi: "Dis Beyazlatma", tarih: "18 Nisan 2024", durum: "tamamlandi" },
  ];

  const durumRenk: Record<string, string> = {
    yeni: "#185FA5",
    teklif_gonderildi: "#BA7517",
    tamamlandi: "#0a7a3a",
    iptal: "#c00",
  };

  const durumYazi: Record<string, string> = {
    yeni: "Yeni Talep",
    teklif_gonderildi: "Teklif Gonderildi",
    tamamlandi: "Tamamlandi",
    iptal: "Iptal",
  };

  const tedaviler = [
    { ad: "Implant", fiyat: "500", para: "EUR" },
    { ad: "Zirkonyum Kaplama", fiyat: "150", para: "EUR" },
    { ad: "Diş Beyazlatma", fiyat: "200", para: "EUR" },
    { ad: "Kanal Tedavisi", fiyat: "120", para: "EUR" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif", display: "flex" }}>

      <div style={{ width: "240px", background: "#0a1628", minHeight: "100vh", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1a2a3a" }}>
          <a href="/" style={{ fontSize: "20px", fontWeight: 500, color: "#fff", textDecoration: "none" }}>
            med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
          </a>
          <div style={{ fontSize: "11px", color: "#5a7a9a", marginTop: "4px" }}>Klinik Paneli</div>
        </div>
        <div style={{ padding: "16px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", marginBottom: "16px" }}>
            <div style={{ width: "40px", height: "40px", background: "#185FA5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 500 }}>SD</div>
            <div>
              <div style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>Smile Dental</div>
              <div style={{ color: "#5a7a9a", fontSize: "11px" }}>Sisli, Istanbul</div>
            </div>
          </div>
          {[
            { id: "ozet", etiket: "Genel Ozet" },
            { id: "talepler", etiket: "Hasta Talepleri" },
            { id: "tedaviler", etiket: "Tedaviler & Fiyatlar" },
            { id: "profil", etiket: "Klinik Profili" },
            { id: "finans", etiket: "Finans" },
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
                { sayi: "3", etiket: "Yeni Talep", renk: "#185FA5" },
                { sayi: "12", etiket: "Aktif Hasta", renk: "#0a7a3a" },
                { sayi: "48", etiket: "Toplam Islem", renk: "#BA7517" },
                { sayi: "24.500", etiket: "Toplam Gelir (EUR)", renk: "#185FA5" },
              ].map((k) => (
                <div key={k.etiket} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontSize: "24px", fontWeight: 500, color: k.renk, marginBottom: "4px" }}>{k.sayi}</div>
                  <div style={{ fontSize: "12px", color: "#888" }}>{k.etiket}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#1a1a1a", marginBottom: "16px" }}>Son Hasta Talepleri</h2>
              {talepler.map((t) => (
                <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f5f5f5" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "36px", height: "36px", background: "#E6F1FB", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#185FA5", fontWeight: 500, fontSize: "13px" }}>{t.hasta[0]}</div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a" }}>{t.hasta}</div>
                      <div style={{ fontSize: "12px", color: "#888" }}>{t.ulke} • {t.tedavi}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "12px", color: "#888" }}>{t.tarih}</span>
                    <span style={{ fontSize: "12px", padding: "3px 10px", borderRadius: "20px", background: "#f0f4ff", color: durumRenk[t.durum] }}>{durumYazi[t.durum]}</span>
                    {t.durum === "yeni" && (
                      <button onClick={() => setAktifSayfa("talepler")} style={{ background: "#185FA5", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>
                        Teklif Ver
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {aktifSayfa === "talepler" && (
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", marginBottom: "24px" }}>Hasta Talepleri</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {talepler.map((t) => (
                <div key={t.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "44px", height: "44px", background: "#E6F1FB", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#185FA5", fontWeight: 500 }}>{t.hasta[0]}</div>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: 500, color: "#1a1a1a", marginBottom: "2px" }}>{t.hasta}</div>
                        <div style={{ fontSize: "12px", color: "#888" }}>{t.ulke} • {t.tedavi} • {t.tarih}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "20px", background: "#f0f4ff", color: durumRenk[t.durum] }}>{durumYazi[t.durum]}</span>
                  </div>
                  {t.durum === "yeni" && (
                    <div style={{ marginTop: "16px", padding: "16px", background: "#f9fafb", borderRadius: "10px" }}>
                      <div style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1a", marginBottom: "12px" }}>Teklif Gonder</div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <input type="number" placeholder="Fiyat" style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", outline: "none" }} />
                        <select style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", outline: "none", background: "#fff" }}>
                          <option>EUR</option>
                          <option>USD</option>
                          <option>TRY</option>
                        </select>
                        <input type="text" placeholder="Aciklama" style={{ flex: 2, border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", outline: "none" }} />
                        <button style={{ background: "#185FA5", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Gonder</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {aktifSayfa === "tedaviler" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h1 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", margin: 0 }}>Tedaviler & Fiyatlar</h1>
              <button style={{ background: "#185FA5", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>+ Tedavi Ekle</button>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "0", padding: "12px 20px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                {["Tedavi Adi", "Fiyat", "Para Birimi", ""].map((b) => (
                  <div key={b} style={{ fontSize: "12px", fontWeight: 500, color: "#888" }}>{b}</div>
                ))}
              </div>
              {tedaviler.map((t) => (
                <div key={t.ad} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "0", padding: "14px 20px", borderBottom: "1px solid #f5f5f5", alignItems: "center" }}>
                  <div style={{ fontSize: "14px", color: "#1a1a1a" }}>{t.ad}</div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "#185FA5" }}>{t.fiyat}</div>
                  <div style={{ fontSize: "14px", color: "#888" }}>{t.para}</div>
                  <button style={{ background: "#f0f4ff", color: "#185FA5", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>Duzenle</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {aktifSayfa === "profil" && (
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", marginBottom: "24px" }}>Klinik Profili</h1>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px", maxWidth: "600px" }}>
              {[
                { etiket: "Klinik Adi", placeholder: "Klinik adiniz" },
                { etiket: "Sehir", placeholder: "Sehir" },
                { etiket: "Adres", placeholder: "Tam adresiniz" },
                { etiket: "Telefon", placeholder: "Telefon numaraniz" },
                { etiket: "Email", placeholder: "E-posta adresiniz" },
                { etiket: "Web Sitesi", placeholder: "https://..." },
              ].map((f) => (
                <div key={f.etiket} style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>{f.etiket}</label>
                  <input type="text" placeholder={f.placeholder} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
                </div>
              ))}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Hakkimizda</label>
                <textarea rows={4} placeholder="Klinik hakkinda kisa aciklama..." style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none", resize: "none" }} />
              </div>
              <button style={{ background: "#185FA5", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 500 }}>
                Kaydet
              </button>
            </div>
          </div>
        )}

        {aktifSayfa === "finans" && (
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", marginBottom: "24px" }}>Finans</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
              {[
                { sayi: "24.500", etiket: "Toplam Gelir (EUR)", renk: "#0a7a3a" },
                { sayi: "2.450", etiket: "Platform Komisyonu (%10)", renk: "#c00" },
                { sayi: "22.050", etiket: "Net Kazanc (EUR)", renk: "#185FA5" },
              ].map((k) => (
                <div key={k.etiket} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontSize: "24px", fontWeight: 500, color: k.renk, marginBottom: "4px" }}>{k.sayi}</div>
                  <div style={{ fontSize: "12px", color: "#888" }}>{k.etiket}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#1a1a1a", marginBottom: "16px" }}>Son Islemler</h2>
              {[
                { hasta: "Thomas M.", tedavi: "Implant", tutar: "500 EUR", tarih: "20 Nisan 2024" },
                { hasta: "Sarah K.", tedavi: "Zirkonyum", tutar: "300 EUR", tarih: "15 Nisan 2024" },
                { hasta: "Hans B.", tedavi: "Beyazlatma", tutar: "200 EUR", tarih: "10 Nisan 2024" },
              ].map((i, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f5f5f5" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a" }}>{i.hasta}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{i.tedavi} • {i.tarih}</div>
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "#0a7a3a" }}>{i.tutar}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

