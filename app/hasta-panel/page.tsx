"use client";
import { useState } from "react";

export default function HastaPanel() {
  const [aktifSayfa, setAktifSayfa] = useState("ozet");

  const talepler = [
    { id: "1", tedavi: "Implant", tarih: "20 Nisan 2024", durum: "teklif_alindi", teklifSayisi: 3 },
    { id: "2", tedavi: "Zirkonyum Kaplama", tarih: "15 Nisan 2024", durum: "beklemede", teklifSayisi: 0 },
  ];

  const teklifler = [
    { klinik: "Smile Dental Clinic", tedavi: "Implant", fiyat: "500", para: "EUR", puan: "4.9", durum: "beklemede" },
    { klinik: "Istanbul Dental", tedavi: "Implant", fiyat: "450", para: "EUR", puan: "4.7", durum: "beklemede" },
    { klinik: "Dent Plus", tedavi: "Implant", fiyat: "520", para: "EUR", puan: "4.8", durum: "beklemede" },
  ];

  const durumRenk: Record<string, string> = {
    beklemede: "#BA7517",
    teklif_alindi: "#185FA5",
    tamamlandi: "#0a7a3a",
    iptal: "#c00",
  };

  const durumYazi: Record<string, string> = {
    beklemede: "Beklemede",
    teklif_alindi: "Teklif Alindi",
    tamamlandi: "Tamamlandi",
    iptal: "Iptal",
  };

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif", display: "flex" }}>

      <div style={{ width: "240px", background: "#0a1628", minHeight: "100vh", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1a2a3a" }}>
          <a href="/" style={{ fontSize: "20px", fontWeight: 500, color: "#fff", textDecoration: "none" }}>
            Clin<span style={{ color: "#4A9EF5" }}>yo</span>
          </a>
        </div>
        <div style={{ padding: "16px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", marginBottom: "16px" }}>
            <div style={{ width: "40px", height: "40px", background: "#185FA5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 500 }}>H</div>
            <div>
              <div style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>Hasta</div>
              <div style={{ color: "#5a7a9a", fontSize: "11px" }}>hasta@email.com</div>
            </div>
          </div>
          {[
            { id: "ozet", etiket: "Genel Ozet" },
            { id: "talepler", etiket: "Taleplerim" },
            { id: "teklifler", etiket: "Teklifler" },
            { id: "profil", etiket: "Profilim" },
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
              {[
                { sayi: "2", etiket: "Aktif Talep" },
                { sayi: "3", etiket: "Gelen Teklif" },
                { sayi: "0", etiket: "Tamamlanan Islem" },
              ].map((k) => (
                <div key={k.etiket} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px" }}>
                  <div style={{ fontSize: "28px", fontWeight: 500, color: "#185FA5", marginBottom: "4px" }}>{k.sayi}</div>
                  <div style={{ fontSize: "13px", color: "#888" }}>{k.etiket}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#1a1a1a", marginBottom: "16px" }}>Son Taleplerim</h2>
              {talepler.map((t) => (
                <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f5f5f5" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a" }}>{t.tedavi}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{t.tarih}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {t.teklifSayisi > 0 && <span style={{ fontSize: "12px", color: "#185FA5" }}>{t.teklifSayisi} teklif</span>}
                    <span style={{ fontSize: "12px", padding: "3px 10px", borderRadius: "20px", background: "#f0f4ff", color: durumRenk[t.durum] }}>{durumYazi[t.durum]}</span>
                  </div>
                </div>
              ))}
              <button onClick={() => setAktifSayfa("talepler")} style={{ marginTop: "16px", background: "#185FA5", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>
                Yeni Talep Olustur
              </button>
            </div>
          </div>
        )}

        {aktifSayfa === "talepler" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h1 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", margin: 0 }}>Taleplerim</h1>
              <button style={{ background: "#185FA5", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>
                + Yeni Talep
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {talepler.map((t) => (
                <div key={t.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 500, color: "#1a1a1a", marginBottom: "4px" }}>{t.tedavi}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{t.tarih}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {t.teklifSayisi > 0 && <span style={{ fontSize: "13px", color: "#185FA5", fontWeight: 500 }}>{t.teklifSayisi} teklif geldi</span>}
                    <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "20px", background: "#f0f4ff", color: durumRenk[t.durum] }}>{durumYazi[t.durum]}</span>
                    <button onClick={() => setAktifSayfa("teklifler")} style={{ background: "#f0f4ff", color: "#185FA5", border: "none", padding: "8px 14px", borderRadius: "8px", fontSize: "12px", cursor: "pointer" }}>
                      Teklifleri Gor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {aktifSayfa === "teklifler" && (
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", marginBottom: "24px" }}>Gelen Teklifler</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {teklifler.map((t, i) => (
                <div key={i} style={{ background: "#fff", border: i === 1 ? "2px solid #185FA5" : "1px solid #e5e7eb", borderRadius: "12px", padding: "20px" }}>
                  {i === 1 && <div style={{ fontSize: "11px", color: "#185FA5", fontWeight: 500, marginBottom: "8px" }}>EN UYGUN FIYAT</div>}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: 500, color: "#1a1a1a", marginBottom: "4px" }}>{t.klinik}</div>
                      <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>{t.tedavi}</div>
                      <span style={{ fontSize: "12px", color: "#BA7517" }}>★ {t.puan}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "22px", fontWeight: 500, color: "#185FA5", marginBottom: "12px" }}>{t.fiyat} {t.para}</div>
                      <button style={{ background: "#185FA5", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>
                        Teklifi Kabul Et
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {aktifSayfa === "profil" && (
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 500, color: "#1a1a1a", marginBottom: "24px" }}>Profilim</h1>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px", maxWidth: "500px" }}>
              {[
                { etiket: "Ad", placeholder: "Adiniz" },
                { etiket: "Soyad", placeholder: "Soyadiniz" },
                { etiket: "E-posta", placeholder: "E-posta adresiniz" },
                { etiket: "Telefon", placeholder: "Telefon numaraniz" },
                { etiket: "Ulke", placeholder: "Ulkeniz" },
              ].map((f) => (
                <div key={f.etiket} style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>{f.etiket}</label>
                  <input type="text" placeholder={f.placeholder} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
                </div>
              ))}
              <button style={{ background: "#185FA5", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 500 }}>
                Kaydet
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
 
