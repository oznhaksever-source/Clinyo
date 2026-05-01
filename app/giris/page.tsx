"use client";
import { useState } from "react";
import { createClient } from "../../utils/supabase/client";
import Footer from "../components/Footer";

export default function Giris() {
  const [mod, setMod] = useState("giris");
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [hesapTuru, setHesapTuru] = useState("hasta");
  const [mesaj, setMesaj] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  const supabase = createClient();

  async function girisYap() {
    setYukleniyor(true);
    setMesaj("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: sifre });
    if (error) {
      setMesaj("Hata: " + error.message);
    } else if (data.user) {
      const { data: profile } = await supabase.from("profiles").select("hesap_turu").eq("id", data.user.id).single();
      if (profile?.hesap_turu === "admin") {
        window.location.href = "/admin";
      } else if (profile?.hesap_turu === "klinik") {
        window.location.href = "/klinik-panel";
      } else if (profile?.hesap_turu === "otel") {
        window.location.href = "/otel-panel";
      } else if (profile?.hesap_turu === "transfer") {
        window.location.href = "/transfer-panel";
      } else {
        window.location.href = "/hasta-panel";
      }
    }
    setYukleniyor(false);
  }

  async function kayitOl() {
    setYukleniyor(true);
    setMesaj("");
    const { data, error } = await supabase.auth.signUp({ email, password: sifre });
    if (error) {
      setMesaj("Hata: " + error.message);
    } else if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        ad,
        soyad,
        email,
        hesap_turu: hesapTuru,
      });
      await fetch("/api/send-email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    to: email,
    subject: "Medoqa - Hos Geldiniz!",
    html: `<h2>Merhaba ${ad}!</h2><p>Medoqa'ya hos geldiniz. Hesabiniz basariyla olusturuldu.</p><a href="https://clinyo-platform.vercel.app/giris">Giris Yap</a>`,
  }),
});
      setMesaj("Kayit basarili! Giris yapabilirsiniz.");
      setMod("giris");
    }
    setYukleniyor(false);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#12103a", fontFamily: "sans-serif", display: "flex", flexDirection: "column" }}>
      <nav style={{ padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ fontSize: "22px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>
          med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
        </a>
        <a href="/" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>Ana Sayfaya Don</a>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "420px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>
              med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
            </div>
            <p style={{ fontSize: "14px", color: "#888", margin: 0 }}>
              {mod === "giris" ? "Hesabiniza giris yapin" : "Yeni hesap olusturun"}
            </p>
          </div>

          <div style={{ display: "flex", background: "#f9fafb", borderRadius: "10px", padding: "4px", marginBottom: "24px" }}>
            <button onClick={() => setMod("giris")} style={{ flex: 1, padding: "8px", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 500, background: mod === "giris" ? "#fff" : "transparent", color: mod === "giris" ? "#534AB7" : "#888" }}>
              Giris Yap
            </button>
            <button onClick={() => setMod("kayit")} style={{ flex: 1, padding: "8px", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 500, background: mod === "kayit" ? "#fff" : "transparent", color: mod === "kayit" ? "#534AB7" : "#888" }}>
              Kayit Ol
            </button>
          </div>

          {mesaj && (
            <div style={{ padding: "10px 14px", borderRadius: "8px", marginBottom: "16px", fontSize: "13px", background: mesaj.includes("Hata") ? "#fff0f0" : "#f0fff4", color: mesaj.includes("Hata") ? "#c00" : "#0a0", border: mesaj.includes("Hata") ? "1px solid #fcc" : "1px solid #9f9" }}>
              {mesaj}
            </div>
          )}

          {mod === "giris" ? (
            <div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>E-posta</label>
                <input type="email" placeholder="ornek@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Sifre</label>
                <input type="password" placeholder="Sifreniz" value={sifre} onChange={(e) => setSifre(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
              </div>
              <button onClick={girisYap} disabled={yukleniyor} style={{ width: "100%", background: "#534AB7", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 500, opacity: yukleniyor ? 0.7 : 1 }}>
                {yukleniyor ? "Giris yapiliyor..." : "Giris Yap"}
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Ad</label>
                  <input type="text" placeholder="Adiniz" value={ad} onChange={(e) => setAd(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Soyad</label>
                  <input type="text" placeholder="Soyadiniz" value={soyad} onChange={(e) => setSoyad(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
                </div>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>E-posta</label>
                <input type="email" placeholder="ornek@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Sifre</label>
                <input type="password" placeholder="En az 6 karakter" value={sifre} onChange={(e) => setSifre(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "6px" }}>Hesap Turu</label>
                <select value={hesapTuru} onChange={(e) => setHesapTuru(e.target.value)} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", boxSizing: "border-box", outline: "none", background: "#fff" }}>
                  <option value="hasta">Hasta olarak kayit ol</option>
                  <option value="klinik">Klinik olarak kayit ol</option>
                </select>
              </div>
              <button onClick={kayitOl} disabled={yukleniyor} style={{ width: "100%", background: "#534AB7", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 500, opacity: yukleniyor ? 0.7 : 1 }}>
                {yukleniyor ? "Kayit yapiliyor..." : "Hesap Olustur"}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
