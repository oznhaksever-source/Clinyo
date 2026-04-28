"use client";
import { useState } from "react";

export default function Giris() {
  const [mod, setMod] = useState("giris");

  return (
    <main style={{ minHeight: "100vh", background: "#0d2144", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>

      <nav style={{ padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ fontSize: "22px", fontWeight: 500, color: "#fff", textDecoration: "none" }}>
          med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
        </a>
        <a href="/" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>Ana Sayfaya Don</a>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "420px" }}>

          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{ fontSize: "24px", fontWeight: 500, color: "#0a1628", marginBottom: "8px" }}>
              med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
            </div>
            <p style={{ fontSize: "14px", color: "#888", margin: 0 }}>
              {mod === "giris" ? "Hesabiniza giris yapin" : "Yeni hesap olusturun"}
            </p>
          </div>

          <div style={{ display: "flex", background: "#f9fafb", borderRadius: "10px", padding: "4px", marginBottom: "24px" }}>
            <button
              onClick={() => setMod("giris")}
              style={{ flex: 1, padding: "8px", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 500, background: mod === "giris" ? "#fff" : "transparent", color: mod === "giris" ? "#185FA5" : "#888", boxShadow: mod === "giris" ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}
            >
              Giris Yap
            </button>
            <button
              onClick={() => setMod("kayit")}
              style={{ flex: 1, padding: "8px", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 500, background: mod === "kayit" ? "#fff" : "transparent", color: mod === "kayit" ? "#185FA5" : "#888", boxShadow: mod === "kayit" ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}
            >
              Kayit Ol
            </button>
          </div>

          {mod === "giris" ? (
            <div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>E-posta</label>
                <input type="email" placeholder="ornek@email.com" style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Sifre</label>
                <input type="password" placeholder="Sifreniz" style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#555" }}>
                  <input type="checkbox" /> Beni hatirla
                </label>
                <a href="#" style={{ fontSize: "13px", color: "#185FA5", textDecoration: "none" }}>Sifremi unuttum</a>
              </div>
              <button style={{ width: "100%", background: "#185FA5", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 500, marginBottom: "16px" }}>
                Giris Yap
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
                <span style={{ fontSize: "12px", color: "#888" }}>veya</span>
                <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
              </div>
              <button style={{ width: "100%", background: "#fff", color: "#333", border: "1px solid #e5e7eb", padding: "11px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>
                Google ile Giris Yap
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Ad</label>
                  <input type="text" placeholder="Adiniz" style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Soyad</label>
                  <input type="text" placeholder="Soyadiniz" style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
                </div>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>E-posta</label>
                <input type="email" placeholder="ornek@email.com" style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Sifre</label>
                <input type="password" placeholder="En az 8 karakter" style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Hesap Turu</label>
                <select style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none", background: "#fff" }}>
                  <option>Hasta olarak kayit ol</option>
                  <option>Klinik olarak kayit ol</option>
                </select>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "#555" }}>
                  <input type="checkbox" style={{ marginTop: "2px" }} />
                  <span>Kullanim kosullarini ve gizlilik politikasini kabul ediyorum</span>
                </label>
              </div>
              <button style={{ width: "100%", background: "#185FA5", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 500 }}>
                Hesap Olustur
              </button>
            </div>
          )}

        </div>
      </div>

    </main>
  );
}
