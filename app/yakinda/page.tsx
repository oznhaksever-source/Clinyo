 "use client";
import { useState } from "react";

export default function Yakinda() {
  const [email, setEmail] = useState("");
  const [gonderildi, setGonderildi] = useState(false);

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 60%, #2d1b69 100%)", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px" }}>
      
      <div style={{ textAlign: "center", maxWidth: "560px" }}>
        
        <div style={{ fontSize: "32px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
          med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
        </div>
        
        <div style={{ width: "60px", height: "2px", background: "#534AB7", margin: "20px auto" }} />

        <h1 style={{ fontSize: "42px", fontWeight: 800, color: "#fff", marginBottom: "16px", lineHeight: 1.2 }}>
          Yakında <span style={{ color: "#7F77DD" }}>Buradayız</span>
        </h1>

        <p style={{ fontSize: "16px", color: "#8b8fc8", marginBottom: "40px", lineHeight: 1.7 }}>
          Türkiye'nin en kapsamlı sağlık turizmi platformu çok yakında hizmetinizde. 
          Diş tedavisinden saç ekimine, göz ameliyatından plastik cerrahiye kadar.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
          {[
            { icon: "🦷", ad: "Diş Tedavisi" },
            { icon: "💇", ad: "Saç Ekimi" },
            { icon: "👁️", ad: "Göz Ameliyatı" },
            { icon: "👃", ad: "Plastik Cerrahi" },
            { icon: "🏨", ad: "Partner Oteller" },
            { icon: "🚗", ad: "VIP Transfer" },
          ].map((item) => (
            <div key={item.ad} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>{item.icon}</div>
              <div style={{ fontSize: "12px", color: "#8b8fc8" }}>{item.ad}</div>
            </div>
          ))}
        </div>

        {!gonderildi ? (
          <div>
            <p style={{ fontSize: "14px", color: "#8b8fc8", marginBottom: "16px" }}>
              Lansman haberdar olmak için e-posta adresinizi bırakın:
            </p>
            <div style={{ display: "flex", gap: "8px", maxWidth: "400px", margin: "0 auto" }}>
              <input
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", borderRadius: "8px", padding: "12px 16px", fontSize: "14px", color: "#fff", outline: "none" }}
              />
              <button
                onClick={() => { if (email) setGonderildi(true); }}
                style={{ background: "#534AB7", color: "#fff", border: "none", padding: "12px 20px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                Haber Al
              </button>
            </div>
          </div>
        ) : (
          <div style={{ background: "rgba(83,74,183,0.2)", border: "1px solid #534AB7", borderRadius: "10px", padding: "16px", color: "#7F77DD", fontSize: "14px" }}>
            ✓ Teşekkürler! Lansman haberini size ileteceğiz.
          </div>
        )}

        <div style={{ marginTop: "48px", fontSize: "12px", color: "#4a4a6a" }}>
          © 2025 Medoqa. Tüm hakları saklıdır.
        </div>
      </div>
    </main>
  );
}

