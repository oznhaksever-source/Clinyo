import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>

     <Navbar /> 

      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 60%, #2d2a6e 100%)", padding: "80px 32px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(83,74,183,0.25)", color: "#AFA9EC", fontSize: "12px", padding: "4px 16px", borderRadius: "20px", border: "0.5px solid #534AB7", marginBottom: "20px" }}>
          Guvenli · Seffaf · Karsilastirabilir Saglik Platformu
        </div>
        <h1 style={{ color: "#fff", fontSize: "52px", fontWeight: 700, marginBottom: "16px", lineHeight: 1.15 }}>
          En Iyi <span style={{ color: "#7F77DD", fontWeight: 300 }}>Klinikleri Kesfet</span>
        </h1>
        <p style={{ color: "#8b8fc8", fontSize: "18px", marginBottom: "36px", maxWidth: "600px", margin: "0 auto 36px" }}>
          Dis, sac ekimi, goz, plastik cerrahi icin teklif al, karsilastir, karar ver.
        </p>
        <div style={{ maxWidth: "580px", margin: "0 auto 32px", background: "#fff", borderRadius: "12px", padding: "8px", display: "flex", gap: "8px" }}>
          <input type="text" placeholder="Tedavi ara... (implant, sac ekimi, burun estetigi)" style={{ flex: 1, border: "none", outline: "none", padding: "10px 14px", fontSize: "14px", background: "transparent" }} />
          <select style={{ border: "none", outline: "none", fontSize: "13px", color: "#666", padding: "8px", borderLeft: "1px solid #e5e7eb", background: "transparent" }}>
            <option>Tum Sehirler</option>
            <option>Istanbul</option>
            <option>Ankara</option>
            <option>Izmir</option>
          </select>
          <button style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>Ara</button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "48px" }}>
          {[
            { sayi: "500+", etiket: "Onaylanmis Klinik" },
            { sayi: "12.000+", etiket: "Memnun Hasta" },
            { sayi: "3", etiket: "Dil Destegi" },
            { sayi: "%98", etiket: "Memnuniyet" },
          ].map((s) => (
            <div key={s.etiket} style={{ textAlign: "center" }}>
              <div style={{ color: "#fff", fontSize: "22px", fontWeight: 700 }}>{s.sayi}</div>
              <div style={{ color: "#6b6fa8", fontSize: "12px", marginTop: "4px" }}>{s.etiket}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#fff", padding: "56px 32px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#12103a", marginBottom: "6px", textAlign: "center" }}>Tedavi Kategorileri</h2>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "28px", textAlign: "center" }}>Ihtiyacin olan tedaviyi sec, en iyi klinikleri goster</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px", maxWidth: "1100px", margin: "0 auto" }}>
          {[
            { ad: "Dis Tedavisi", sayi: "148" },
            { ad: "Sac Ekimi", sayi: "92" },
            { ad: "Goz Ameliyati", sayi: "64" },
            { ad: "Plastik Cerrahi", sayi: "76" },
            { ad: "Genel Saglik", sayi: "110" },
          ].map((k) => (
            <div key={k.ad} style={{ border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px", textAlign: "center", cursor: "pointer", background: "#FAFAFA" }}>
              <div style={{ width: "44px", height: "44px", background: "#EEEDFE", borderRadius: "50%", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#534AB7", fontWeight: 700, fontSize: "16px" }}>{k.ad[0]}</span>
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#12103a" }}>{k.ad}</div>
              <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>{k.sayi} klinik</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "56px 32px", borderTop: "1px solid #f0f0f0", background: "#fff" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#12103a", marginBottom: "6px", textAlign: "center" }}>One Cikan Klinikler</h2>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "28px", textAlign: "center" }}>Dogrulanmis, puan almis, guvenilir klinikler</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px", maxWidth: "1100px", margin: "0 auto" }}>
          {[
            { kisaltma: "SD", ad: "Smile Dental Clinic", konum: "Sisli, Istanbul", kategori: "Dis Tedavisi", puan: "4.9", yorum: "218" },
            { kisaltma: "HT", ad: "Hair Turkey Center", konum: "Besiktas, Istanbul", kategori: "Sac Ekimi", puan: "4.8", yorum: "341" },
            { kisaltma: "VE", ad: "Vision Eye Center", konum: "Kadikoy, Istanbul", kategori: "Goz Ameliyati", puan: "4.7", yorum: "189" },
          ].map((k) => (
            <div key={k.ad} style={{ border: "1px solid #EEEDFE", borderRadius: "14px", overflow: "hidden" }}>
              <div style={{ height: "110px", background: "linear-gradient(135deg, #EEEDFE, #CECBF6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "56px", height: "56px", background: "#534AB7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "18px" }}>{k.kisaltma}</div>
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ fontWeight: 600, fontSize: "15px", color: "#12103a", marginBottom: "4px" }}>{k.ad}</div>
                <div style={{ fontSize: "12px", color: "#888", marginBottom: "12px" }}>{k.konum}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", background: "#EEEDFE", color: "#534AB7", padding: "3px 10px", borderRadius: "20px" }}>{k.kategori}</span>
                  <span style={{ fontSize: "12px", color: "#BA7517", fontWeight: 600 }}>★ {k.puan} ({k.yorum})</span>
                </div>
                <button style={{ width: "100%", marginTop: "12px", padding: "9px", background: "#534AB7", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Teklif Al</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "48px 32px", background: "#f9fafb", borderTop: "1px solid #f0f0f0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", maxWidth: "1100px", margin: "0 auto" }}>
          {[
            { baslik: "Dogrulanmis Klinikler", aciklama: "Tum klinikler belgeli ve onaylidir" },
            { baslik: "Guvenli Odeme", aciklama: "Hasta onaylamadan odeme alinmaz" },
            { baslik: "Gercek Yorumlar", aciklama: "Sadece islem yapan hasta yorum yapar" },
            { baslik: "7/24 Destek", aciklama: "TR, EN, DE dillerinde destek" },
          ].map((item) => (
            <div key={item.baslik} style={{ textAlign: "center" }}>
              <div style={{ width: "44px", height: "44px", background: "#EEEDFE", borderRadius: "50%", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#534AB7", fontWeight: 700 }}>✓</span>
              </div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#12103a", marginBottom: "6px" }}>{item.baslik}</div>
              <div style={{ fontSize: "12px", color: "#888" }}>{item.aciklama}</div>
            </div>
          ))}
        </div>
      </section>
      {/* OTEL VE TRANSFER BÖLÜMÜ */}
      <section style={{ background: "#1e1b4b", padding: "56px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "6px", textAlign: "center" }}>Eksiksiz Sağlık Turizmi Paketi</h2>
          <p style={{ fontSize: "14px", color: "#8b8fc8", marginBottom: "36px", textAlign: "center" }}>Klinikten otele, transferden tedaviye — her şey tek platformda</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>

            <div style={{ background: "rgba(83,74,183,0.15)", border: "1px solid #534AB7", borderRadius: "16px", padding: "28px" }}>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>🏥</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>Klinik</h3>
              <p style={{ fontSize: "13px", color: "#8b8fc8", lineHeight: 1.6, marginBottom: "20px" }}>500+ onaylı klinik arasından seçin. Diş, saç ekimi, göz, plastik cerrahi ve daha fazlası.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
                {["500+ onaylı klinik", "Ücretsiz teklif", "Karşılaştırmalı fiyatlar"].map((m) => (
                  <div key={m} style={{ fontSize: "12px", color: "#AFA9EC", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#7F77DD" }}>✓</span> {m}
                  </div>
                ))}
              </div>
              <a href="/klinikler" style={{ display: "block", textAlign: "center", background: "#534AB7", color: "#fff", padding: "10px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>Klinikleri Gör</a>
            </div>

            <div style={{ background: "rgba(83,74,183,0.15)", border: "1px solid #534AB7", borderRadius: "16px", padding: "28px" }}>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>🏨</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>Otel</h3>
              <p style={{ fontSize: "13px", color: "#8b8fc8", lineHeight: 1.6, marginBottom: "20px" }}>Kliniğinize yakın en iyi otelleri keşfedin. Konforlu konaklama, uygun fiyatlar.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
                {["Kliniğe yakın oteller", "3-5 yıldızlı seçenekler", "Özel hasta indirimleri"].map((m) => (
                  <div key={m} style={{ fontSize: "12px", color: "#AFA9EC", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#7F77DD" }}>✓</span> {m}
                  </div>
                ))}
              </div>
              <a href="/oteller" style={{ display: "block", textAlign: "center", background: "#534AB7", color: "#fff", padding: "10px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>Otelleri Gör</a>
            </div>

            <div style={{ background: "rgba(83,74,183,0.15)", border: "1px solid #534AB7", borderRadius: "16px", padding: "28px" }}>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>🚗</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>Transfer</h3>
              <p style={{ fontSize: "13px", color: "#8b8fc8", lineHeight: 1.6, marginBottom: "20px" }}>Havalimanından kliniğe, kliniğe otele güvenli ve konforlu transfer hizmeti.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
                {["7/24 transfer hizmeti", "Uçuş takibi", "VIP araç seçenekleri"].map((m) => (
                  <div key={m} style={{ fontSize: "12px", color: "#AFA9EC", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#7F77DD" }}>✓</span> {m}
                  </div>
                ))}
              </div>
              <a href="/transfer" style={{ display: "block", textAlign: "center", background: "#534AB7", color: "#fff", padding: "10px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>Transferleri Gör</a>
            </div>

          </div>
        </div>
      </section>

      <Footer />

    </main>
  );
}
