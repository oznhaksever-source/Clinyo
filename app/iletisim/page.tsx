"use client";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Iletisim() {
  const [ad, setAd] = useState("");
  const [email, setEmail] = useState("");
  const [konu, setKonu] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [gonderildi, setGonderildi] = useState(false);

  function gonder() {
    if (ad && email && mesaj) {
      setGonderildi(true);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>

      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "48px 32px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "36px", fontWeight: 700, marginBottom: "12px" }}>İletişim</h1>
        <p style={{ color: "#8b8fc8", fontSize: "15px" }}>Size yardımcı olmaktan mutluluk duyarız</p>
      </section>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 32px", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "40px" }}>

        <div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Bize Ulaşın</h2>

          {[
            { ikon: "📧", baslik: "E-posta", deger: "info@medoqa.com", link: "mailto:info@medoqa.com" },
            { ikon: "📞", baslik: "Telefon", deger: "+90 850 000 00 00", link: "tel:+908500000000" },
            { ikon: "💬", baslik: "WhatsApp", deger: "+90 850 000 00 00", link: "https://wa.me/908500000000" },
          ].map((item) => (
            <a key={item.baslik} href={item.link} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", marginBottom: "12px", textDecoration: "none" }}>
              <div style={{ width: "44px", height: "44px", background: "#EEEDFE", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>{item.ikon}</div>
              <div>
                <div style={{ fontSize: "12px", color: "#888", marginBottom: "2px" }}>{item.baslik}</div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#534AB7" }}>{item.deger}</div>
              </div>
            </a>
          ))}

          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px", marginTop: "20px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#12103a", marginBottom: "12px" }}>Çalışma Saatleri</h3>
            {[
              { gun: "Pazartesi - Cuma", saat: "09:00 - 18:00" },
              { gun: "Cumartesi", saat: "10:00 - 16:00" },
              { gun: "Pazar", saat: "Kapalı" },
            ].map((item) => (
              <div key={item.gun} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f5f5f5", fontSize: "13px" }}>
                <span style={{ color: "#555" }}>{item.gun}</span>
                <span style={{ fontWeight: 600, color: item.saat === "Kapalı" ? "#c00" : "#12103a" }}>{item.saat}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "#EEEDFE", border: "1px solid #CECBF6", borderRadius: "12px", padding: "20px", marginTop: "12px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#534AB7", marginBottom: "8px" }}>7/24 Acil Destek</h3>
            <p style={{ fontSize: "13px", color: "#6b6fa8", lineHeight: 1.6 }}>Tedavi sürecinizde acil bir durum yaşarsanız WhatsApp hattımızdan 7/24 bize ulaşabilirsiniz.</p>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Mesaj Gönderin</h2>

          {gonderildi ? (
            <div style={{ background: "#f0fff4", border: "1px solid #9f9", borderRadius: "12px", padding: "40px", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0a7a3a", marginBottom: "8px" }}>Mesajınız İletildi!</h3>
              <p style={{ fontSize: "13px", color: "#555" }}>En kısa sürede size geri döneceğiz. Ortalama yanıt süremiz 2-4 saattir.</p>
              <button onClick={() => { setGonderildi(false); setAd(""); setEmail(""); setKonu(""); setMesaj(""); }} style={{ marginTop: "16px", background: "#534AB7", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>
                Yeni Mesaj Gönder
              </button>
            </div>
          ) : (
            <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Adınız *</label>
                  <input type="text" placeholder="Adınız" value={ad} onChange={(e) => setAd(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>E-posta *</label>
                  <input type="email" placeholder="ornek@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
                </div>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Konu</label>
                <select value={konu} onChange={(e) => setKonu(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", outline: "none", background: "#fff" }}>
                  <option value="">Konu seçin</option>
                  <option value="genel">Genel Bilgi</option>
                  <option value="klinik">Klinik Hakkında</option>
                  <option value="odeme">Ödeme ve Fatura</option>
                  <option value="sikayet">Şikayet</option>
                  <option value="itiraz">İtiraz</option>
                  <option value="diger">Diğer</option>
                </select>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Mesajınız *</label>
                <textarea rows={5} placeholder="Mesajınızı buraya yazın..." value={mesaj} onChange={(e) => setMesaj(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none", resize: "none" }} />
              </div>
              <button onClick={gonder} disabled={!ad || !email || !mesaj} style={{ width: "100%", background: ad && email && mesaj ? "#534AB7" : "#ccc", color: "#fff", border: "none", padding: "13px", borderRadius: "8px", fontSize: "14px", cursor: ad && email && mesaj ? "pointer" : "not-allowed", fontWeight: 600 }}>
                Mesaj Gönder
              </button>
              <p style={{ fontSize: "12px", color: "#888", textAlign: "center", marginTop: "12px" }}>* Zorunlu alanlar</p>
            </div>
          )}
        </div>
      </div>

      <footer style={{ background: "#12103a", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>
          med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Gizlilik", "KVKK", "İletişim", "Blog"].map((l) => (
            <a key={l} href="#" style={{ color: "#6b6fa8", fontSize: "12px", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <div style={{ fontSize: "12px", color: "#6b6fa8" }}>2024 Medoqa. Tüm hakları saklıdır.</div>
      </footer>

    </main>
  );
}
