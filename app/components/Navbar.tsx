"use client";
import { useState } from "react";

export default function Navbar() {
  const [menuAcik, setMenuAcik] = useState(false);

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
        <a href="/nasil-calisir" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>Nasıl Çalışır</a>
        <div style={{ width: "1px", height: "16px", background: "#2a2a4e" }} />
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ fontSize: "11px", padding: "3px 8px", border: "1px solid #534AB7", borderRadius: "4px", color: "#7F77DD", cursor: "pointer" }}>TR</span>
          <span style={{ fontSize: "11px", padding: "3px 8px", border: "1px solid #2a2a4e", borderRadius: "4px", color: "#aab4c8", cursor: "pointer" }}>EN</span>
          <span style={{ fontSize: "11px", padding: "3px 8px", border: "1px solid #2a2a4e", borderRadius: "4px", color: "#aab4c8", cursor: "pointer" }}>DE</span>
        </div>
        <a href="/giris" style={{ background: "#534AB7", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>Giriş Yap</a>
      </div>
    </nav>
  );
}
