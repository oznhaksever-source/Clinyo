export default function Footer() {
  return (
    <footer style={{ background: "#12103a", fontFamily: "sans-serif" }}>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px" }}>

        <div>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
            med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
          </div>
          <p style={{ fontSize: "13px", color: "#6b6fa8", lineHeight: 1.7, marginBottom: "20px", maxWidth: "280px" }}>
            Güvenli, şeffaf ve karşılaştırılabilir sağlık turizmi platformu. Diş, saç ekimi, göz ve daha fazlası için en iyi klinikleri keşfedin.
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            {["TR", "EN", "DE"].map((dil) => (
              <span key={dil} style={{ fontSize: "11px", padding: "4px 10px", border: "1px solid #2a2a4e", borderRadius: "4px", color: dil === "TR" ? "#7F77DD" : "#6b6fa8", cursor: "pointer", borderColor: dil === "TR" ? "#534AB7" : "#2a2a4e" }}>{dil}</span>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Platform</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { ad: "Klinikler", href: "/klinikler" },
              { ad: "Tedaviler", href: "/tedaviler" },
              { ad: "Oteller", href: "/oteller" },
              { ad: "Transfer", href: "/transfer" },
              { ad: "Nasıl Çalışır", href: "/nasil-calisir" },
            ].map((link) => (
              <a key={link.ad} href={link.href} style={{ fontSize: "13px", color: "#6b6fa8", textDecoration: "none" }}>{link.ad}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Destek</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { ad: "SSS", href: "/sss" },
              { ad: "İletişim", href: "/iletisim" },
              { ad: "Blog", href: "/blog" },
              { ad: "Gizlilik Politikası", href: "/gizlilik" },
              { ad: "KVKK", href: "/kvkk" },
            ].map((link) => (
              <a key={link.ad} href={link.href} style={{ fontSize: "13px", color: "#6b6fa8", textDecoration: "none" }}>{link.ad}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.5px" }}>İletişim</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <a href="mailto:info@medoqa.com" style={{ fontSize: "13px", color: "#6b6fa8", textDecoration: "none" }}>info@medoqa.com</a>
            <a href="tel:+908500000000" style={{ fontSize: "13px", color: "#6b6fa8", textDecoration: "none" }}>+90 850 000 00 00</a>
            <a href="https://wa.me/908500000000" style={{ fontSize: "13px", color: "#6b6fa8", textDecoration: "none" }}>WhatsApp</a>
          </div>
          <div style={{ marginTop: "20px" }}>
            <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Bizi Takip Edin</h4>
            <div style={{ display: "flex", gap: "8px" }}>
              {["Instagram", "LinkedIn", "Twitter"].map((s) => (
                <a key={s} href="#" style={{ fontSize: "11px", padding: "4px 10px", border: "1px solid #2a2a4e", borderRadius: "4px", color: "#6b6fa8", textDecoration: "none" }}>{s}</a>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div style={{ borderTop: "1px solid #1e1b4b", padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#3a3a5e" }}>© 2024 Medoqa. Tüm hakları saklıdır.</span>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="/gizlilik" style={{ fontSize: "12px", color: "#3a3a5e", textDecoration: "none" }}>Gizlilik</a>
          <a href="/kvkk" style={{ fontSize: "12px", color: "#3a3a5e", textDecoration: "none" }}>KVKK</a>
          <a href="/kullanim-kosullari" style={{ fontSize: "12px", color: "#3a3a5e", textDecoration: "none" }}>Kullanım Koşulları</a>
        </div>
      </div>

    </footer>
  );
}
