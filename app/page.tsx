export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>

      <nav style={{ background: "#0a1628", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "22px", fontWeight: 500, color: "#fff" }}>
          Clin<span style={{ color: "#4A9EF5" }}>yo</span>
        </div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <a href="#" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>Klinikler</a>
          <a href="#" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>Tedaviler</a>
          <a href="#" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>Nasil Calisir</a>
          <a href="#" style={{ background: "#185FA5", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", textDecoration: "none" }}>Giris Yap</a>
        </div>
      </nav>

      <section style={{ background: "#0d2144", padding: "80px 32px", textAlign: "center" }}>
        <p style={{ color: "#85B7EB", fontSize: "12px", marginBottom: "16px" }}>Guvenli ve Seffaf Saglik Platformu</p>
        <h1 style={{ color: "#fff", fontSize: "48px", fontWeight: 500, marginBottom: "16px", lineHeight: 1.2 }}>
          En Iyi <span style={{ color: "#4A9EF5" }}>Klinikleri Kesfet</span>
        </h1>
        <p style={{ color: "#7a90b0", fontSize: "16px", marginBottom: "32px" }}>
          Dis, sac ekimi, goz, plastik cerrahi icin teklif al, karsilastir, karar ver.
        </p>
        <div style={{ maxWidth: "560px", margin: "0 auto 32px", background: "#fff", borderRadius: "12px", padding: "8px", display: "flex", gap: "8px" }}>
          <input type="text" placeholder="Tedavi ara..." style={{ flex: 1, border: "none", outline: "none", padding: "8px 12px", fontSize: "14px" }} />
          <button style={{ background: "#185FA5", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>Ara</button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "48px" }}>
          <div><div style={{ color: "#fff", fontSize: "20px", fontWeight: 500 }}>500+</div><div style={{ color: "#5a7a9a", fontSize: "12px" }}>Onaylanmis Klinik</div></div>
          <div><div style={{ color: "#fff", fontSize: "20px", fontWeight: 500 }}>12.000+</div><div style={{ color: "#5a7a9a", fontSize: "12px" }}>Memnun Hasta</div></div>
          <div><div style={{ color: "#fff", fontSize: "20px", fontWeight: 500 }}>3</div><div style={{ color: "#5a7a9a", fontSize: "12px" }}>Dil Destegi</div></div>
          <div><div style={{ color: "#fff", fontSize: "20px", fontWeight: 500 }}>%98</div><div style={{ color: "#5a7a9a", fontSize: "12px" }}>Memnuniyet</div></div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "48px 32px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 500, color: "#1a1a1a", marginBottom: "8px" }}>Tedavi Kategorileri</h2>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "24px" }}>Ihtiyacin olan tedaviyi sec</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
          {["Dis Tedavisi", "Sac Ekimi", "Goz Ameliyati", "Plastik Cerrahi", "Genel Saglik"].map((ad) => (
            <div key={ad} style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", textAlign: "center", cursor: "pointer", background: "#f9fafb" }}>
              <div style={{ width: "40px", height: "40px", background: "#E6F1FB", borderRadius: "50%", margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#185FA5", fontWeight: 500, fontSize: "14px" }}>{ad[0]}</span>
              </div>
              <div style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1a" }}>{ad}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#fff", padding: "48px 32px", borderTop: "1px solid #f0f0f0" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 500, color: "#1a1a1a", marginBottom: "8px" }}>One Cikan Klinikler</h2>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "24px" }}>Dogrulanmis ve guvenilir klinikler</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { kisaltma: "SD", ad: "Smile Dental Clinic", konum: "Sisli, Istanbul", kategori: "Dis Tedavisi", puan: "4.9", yorum: "218" },
            { kisaltma: "HT", ad: "Hair Turkey Center", konum: "Besiktas, Istanbul", kategori: "Sac Ekimi", puan: "4.8", yorum: "341" },
            { kisaltma: "VE", ad: "Vision Eye Center", konum: "Kadikoy, Istanbul", kategori: "Goz Ameliyati", puan: "4.7", yorum: "189" },
          ].map((k) => (
            <div key={k.ad} style={{ border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ height: "100px", background: "#E6F1FB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "52px", height: "52px", background: "#185FA5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 500, fontSize: "16px" }}>{k.kisaltma}</div>
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ fontWeight: 500, fontSize: "15px", color: "#1a1a1a", marginBottom: "4px" }}>{k.ad}</div>
                <div style={{ fontSize: "12px", color: "#888", marginBottom: "12px" }}>{k.konum}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", background: "#E6F1FB", color: "#185FA5", padding: "3px 10px", borderRadius: "20px" }}>{k.kategori}</span>
                  <span style={{ fontSize: "12px", color: "#BA7517", fontWeight: 500 }}>&#9733; {k.puan} ({k.yorum})</span>
                </div>
                <button style={{ width: "100%", marginTop: "12px", padding: "8px", background: "#185FA5", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Teklif Al</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background: "#0a1628", padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "#fff", fontSize: "16px", fontWeight: 500 }}>Clin<span style={{ color: "#4A9EF5" }}>yo</span></div>
        <div style={{ display: "flex", gap: "20px" }}>
          {["Gizlilik", "KVKK", "Iletisim", "Blog"].map((l) => (
            <a key={l} href="#" style={{ color: "#5a7a9a", fontSize: "12px", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </footer>

    </main>
  );
}
