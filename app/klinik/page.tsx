 import Navbar from "../components/Navbar";
 import Footer from "../components/Footer";
export default function KlinikProfil() {
  const doktorlar = [
    { kisaltma: "AK", ad: "Dr. Ahmet Kaya", uzmanlik: "Implant Uzmani", deneyim: "15 yil" },
    { kisaltma: "FY", ad: "Dr. Fatma Yilmaz", uzmanlik: "Ortodonti", deneyim: "10 yil" },
    { kisaltma: "MO", ad: "Dr. Mehmet Oz", uzmanlik: "Estetik Diş", deneyim: "12 yil" },
  ];

  const tedaviler = [
    { ad: "Implant", fiyat: "500", para: "EUR" },
    { ad: "Zirkonyum Kaplama", fiyat: "150", para: "EUR" },
    { ad: "Diş Beyazlatma", fiyat: "200", para: "EUR" },
    { ad: "Kanal Tedavisi", fiyat: "120", para: "EUR" },
  ];

  const yorumlar = [
    { ad: "Thomas M.", ulke: "Almanya", puan: 5, yorum: "Cok profesyonel bir klinik. Implant tedavim mukemmel gecti.", tarih: "Mart 2024" },
    { ad: "Sarah K.", ulke: "Ingiltere", puan: 5, yorum: "Fiyat kalite dengesi inanilmaz. Kesinlikle tavsiye ederim.", tarih: "Subat 2024" },
    { ad: "Hans B.", ulke: "Hollanda", puan: 4, yorum: "Cok iyi hizmet, temiz ve modern klinik.", tarih: "Ocak 2024" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>

      <Navbar />

      <div style={{ background: "#0d2144", padding: "32px", display: "flex", gap: "24px", alignItems: "center" }}>
        <div style={{ width: "80px", height: "80px", background: "#185FA5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "28px", fontWeight: 500, flexShrink: 0 }}>SD</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <h1 style={{ color: "#fff", fontSize: "26px", fontWeight: 500, margin: 0 }}>Smile Dental Clinic</h1>
            <span style={{ background: "#185FA5", color: "#fff", fontSize: "11px", padding: "3px 10px", borderRadius: "20px" }}>Dogrulanmis</span>
          </div>
          <div style={{ color: "#7a90b0", fontSize: "14px", marginBottom: "12px" }}>Sisli, Istanbul, Turkiye</div>
          <div style={{ display: "flex", gap: "24px" }}>
            <span style={{ color: "#BA7517", fontSize: "14px", fontWeight: 500 }}>&#9733; 4.9 (218 yorum)</span>
            <span style={{ color: "#7a90b0", fontSize: "14px" }}>500+ tamamlanan islem</span>
            <span style={{ color: "#7a90b0", fontSize: "14px" }}>10+ yil deneyim</span>
          </div>
        </div>
        <button style={{ background: "#185FA5", color: "#fff", border: "none", padding: "14px 28px", borderRadius: "10px", fontSize: "15px", cursor: "pointer", fontWeight: 500 }}>
          Teklif Al
        </button>
      </div>

      <div style={{ maxWidth: "1100px", margin: "32px auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>

        <div>
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 500, color: "#1a1a1a", marginBottom: "16px" }}>Hakkimizda</h2>
            <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7 }}>
              Smile Dental Clinic, 2010 yilindan bu yana Istanbul Sisli'de uluslararasi hastalara yuksek kaliteli dis tedavisi hizmetleri sunmaktadir. Almanya, Ingiltere ve Hollanda'dan gelen hastalara ozel paketler sunuyoruz. Modern ekipmanlarimiz ve uzman kadromuzla en iyi tedaviyi en uygun fiyata sunuyoruz.
            </p>
          </div>

          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 500, color: "#1a1a1a", marginBottom: "16px" }}>Tedaviler ve Fiyatlar</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {tedaviler.map((t) => (
                <div key={t.ad} style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", color: "#1a1a1a" }}>{t.ad}</span>
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "#185FA5" }}>{t.fiyat} {t.para}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 500, color: "#1a1a1a", marginBottom: "16px" }}>Doktorlarimiz</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {doktorlar.map((d) => (
                <div key={d.ad} style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
                  <div style={{ width: "48px", height: "48px", background: "#E6F1FB", borderRadius: "50%", margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#185FA5", fontWeight: 500 }}>{d.kisaltma}</div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1a", marginBottom: "4px" }}>{d.ad}</div>
                  <div style={{ fontSize: "12px", color: "#185FA5", marginBottom: "4px" }}>{d.uzmanlik}</div>
                  <div style={{ fontSize: "11px", color: "#888" }}>{d.deneyim}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 500, color: "#1a1a1a", marginBottom: "16px" }}>Hasta Yorumlari</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {yorumlar.map((y) => (
                <div key={y.ad} style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", background: "#E6F1FB", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#185FA5", fontSize: "13px", fontWeight: 500 }}>{y.ad[0]}</div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1a" }}>{y.ad}</div>
                        <div style={{ fontSize: "11px", color: "#888" }}>{y.ulke}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{y.tarih}</div>
                  </div>
                  <div style={{ color: "#BA7517", fontSize: "13px", marginBottom: "6px" }}>{"★".repeat(y.puan)}</div>
                  <p style={{ fontSize: "13px", color: "#555", margin: 0, lineHeight: 1.6 }}>{y.yorum}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px", marginBottom: "16px", position: "sticky", top: "20px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 500, color: "#1a1a1a", marginBottom: "16px" }}>Teklif Talep Et</h3>
            <input type="text" placeholder="Adiniz" style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", marginBottom: "10px", boxSizing: "border-box", outline: "none" }} />
            <input type="email" placeholder="E-posta adresiniz" style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", marginBottom: "10px", boxSizing: "border-box", outline: "none" }} />
            <select style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", marginBottom: "10px", boxSizing: "border-box", outline: "none", background: "#fff" }}>
              <option>Tedavi seçin</option>
              <option>Implant</option>
              <option>Zirkonyum Kaplama</option>
              <option>Diş Beyazlatma</option>
              <option>Kanal Tedavisi</option>
            </select>
            <textarea placeholder="Notunuz..." rows={3} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", marginBottom: "16px", boxSizing: "border-box", outline: "none", resize: "none" }} />
            <button style={{ width: "100%", background: "#185FA5", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 500 }}>
              Teklif Gonder
            </button>
            <p style={{ fontSize: "11px", color: "#888", textAlign: "center", marginTop: "10px" }}>Ücretsiz, baglamayici teklif</p>
          </div>

          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 500, color: "#1a1a1a", marginBottom: "14px" }}>Klinik Bilgileri</h3>
            {[
              { etiket: "Adres", deger: "Sisli, Istanbul" },
              { etiket: "Telefon", deger: "+90 212 000 00 00" },
              { etiket: "Email", deger: "info@smiledentalclinic.com" },
              { etiket: "Calisma Saatleri", deger: "09:00 - 18:00" },
              { etiket: "Diller", deger: "TR, EN, DE" },
            ].map((b) => (
              <div key={b.etiket} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f5f5f5", fontSize: "13px" }}>
                <span style={{ color: "#888" }}>{b.etiket}</span>
                <span style={{ color: "#1a1a1a", fontWeight: 500 }}>{b.deger}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />

    </main>
  );
}
