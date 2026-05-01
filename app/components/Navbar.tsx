"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

export default function Navbar() {
  const [kullanici, setKullanici] = useState<any>(null);
  const [menuAcik, setMenuAcik] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function kullaniciyiGetir() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from("profiles").select("ad, soyad, hesap_turu").eq("id", user.id).single();
        setKullanici(profile);
      }
    }
    kullaniciyiGetir();
  }, []);

  async function cikisYap() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  function panelLinki() {
    if (!kullanici) return "/giris";
    if (kullanici.hesap_turu === "admin") return "/admin";
    if (kullanici.hesap_turu === "klinik") return "/klinik-panel";
    if (kullanici.hesap_turu === "otel") return "/otel-panel";
    if (kullanici.hesap_turu === "transfer") return "/transfer-panel";
    return "/hasta-panel";
  }

  return (
    <nav style={{ background: "#12103a", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
      <a href="/" style={{ fontSize: "22px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>
        med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
      </a>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <a href="/klinikler" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>Klinikler</a>
        <a href="/tedaviler" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>Tedaviler</a>
        <a href="/oteller" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>Oteller</a>
        <a href="/transfer" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>Transfer</a>
        <a href="/nasil-calisir" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>Nasil Calisir</a>
        <div style={{ width: "1px", height: "16px", background: "#2a2a4e" }} />
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ fontSize: "11px", padding: "3px 8px", border: "1px solid #534AB7", borderRadius: "4px", color: "#7F77DD", cursor: "pointer" }}>TR</span>
          <span style={{ fontSize: "11px", padding: "3px 8px", border: "1px solid #2a2a4e", borderRadius: "4px", color: "#aab4c8", cursor: "pointer" }}>EN</span>
          <span style={{ fontSize: "11px", padding: "3px 8px", border: "1px solid #2a2a4e", borderRadius: "4px", color: "#aab4c8", cursor: "pointer" }}>DE</span>
        </div>

        {kullanici ? (
          <div style={{ position: "relative" }}>
            <div onClick={() => setMenuAcik(!menuAcik)} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", background: "#1e1b4b", padding: "6px 12px", borderRadius: "8px" }}>
              <div style={{ width: "28px", height: "28px", background: "#534AB7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "12px" }}>
                {kullanici.ad?.[0]?.toUpperCase() || "U"}
              </div>
              <span style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>{kullanici.ad}</span>
              <span style={{ color: "#aab4c8", fontSize: "10px" }}>▼</span>
            </div>

            {menuAcik && (
              <div style={{ position: "absolute", right: 0, top: "44px", background: "#fff", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", minWidth: "180px", overflow: "hidden", zIndex: 200 }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#12103a" }}>{kullanici.ad} {kullanici.soyad}</div>
                  <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{kullanici.hesap_turu}</div>
                </div>
                <a href={panelLinki()} style={{ display: "block", padding: "10px 16px", fontSize: "13px", color: "#534AB7", textDecoration: "none", borderBottom: "1px solid #f0f0f0" }}>
                  Panelim
                </a>
                <a href="/teklif" style={{ display: "block", padding: "10px 16px", fontSize: "13px", color: "#555", textDecoration: "none", borderBottom: "1px solid #f0f0f0" }}>
                  Teklif Al
                </a>
                <button onClick={cikisYap} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", fontSize: "13px", color: "#c00", background: "none", border: "none", cursor: "pointer" }}>
                  Cikis Yap
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/giris" style={{ background: "#534AB7", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>
            Giris Yap
          </a>
        )}
      </div>
    </nav>
  );
}
