"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";

export default function Giris() {
  const [mod, setMod] = useState<"giris" | "kayit">("giris");
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [hesapTuru, setHesapTuru] = useState("hasta");
  const [mesaj, setMesaj] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mobil, setMobil] = useState(false);
  const [sifreGoster, setSifreGoster] = useState(false);
  const [sifreGoster2, setSifreGoster2] = useState(false);
  const { dil, dilDegistir } = useDil();

  const supabase = createClient();

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  const metinler = {
    tr: {
      hosGeldiniz: "Hesabınıza giriş yapın",
      yeniHesap: "Yeni hesap oluşturun",
      girisYap: "Giriş Yap", kayitOl: "Kayıt Ol",
      eposta: "E-posta", sifre: "Şifre", ad: "Ad", soyad: "Soyad",
      hesapTuru: "Hesap Türü",
      hasta: "Hasta olarak kayıt ol", klinik: "Klinik olarak kayıt ol",
      otel: "Otel olarak kayıt ol", transfer: "Transfer şirketi olarak kayıt ol",
      girisYapBtn: "Giriş Yap", hesapOlustur: "Hesap Oluştur",
      kayitBasarili: "Kayıt başarılı! E-posta adresinize onay maili gönderdik. Lütfen e-postanızı onaylayın.",
      anaSayfayaDon: "Ana Sayfaya Dön",
    },
    en: {
      hosGeldiniz: "Sign in to your account",
      yeniHesap: "Create a new account",
      girisYap: "Sign In", kayitOl: "Sign Up",
      eposta: "Email", sifre: "Password", ad: "First Name", soyad: "Last Name",
      hesapTuru: "Account Type",
      hasta: "Register as Patient", klinik: "Register as Clinic",
      otel: "Register as Hotel", transfer: "Register as Transfer Company",
      girisYapBtn: "Sign In", hesapOlustur: "Create Account",
      kayitBasarili: "Registration successful! We sent a confirmation email. Please confirm your email address.",
      anaSayfayaDon: "Back to Home",
    },
    de: {
      hosGeldiniz: "Melden Sie sich in Ihrem Konto an",
      yeniHesap: "Neues Konto erstellen",
      girisYap: "Anmelden", kayitOl: "Registrieren",
      eposta: "E-Mail", sifre: "Passwort", ad: "Vorname", soyad: "Nachname",
      hesapTuru: "Kontotyp",
      hasta: "Als Patient registrieren", klinik: "Als Klinik registrieren",
      otel: "Als Hotel registrieren", transfer: "Als Transferunternehmen registrieren",
      girisYapBtn: "Anmelden", hesapOlustur: "Konto erstellen",
      kayitBasarili: "Registrierung erfolgreich! Wir haben eine Bestätigungs-E-Mail gesendet. Bitte bestätigen Sie Ihre E-Mail-Adresse.",
      anaSayfayaDon: "Zurück zur Startseite",
    },
  };

  const m = metinler[dil];
  const inputStyle = { width: "100%", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "12px 14px", fontSize: "14px", boxSizing: "border-box" as const, outline: "none", fontFamily: "inherit" };
  const labelStyle = { fontSize: "13px", color: "#555", display: "block" as const, marginBottom: "6px", fontWeight: 500 as const };

  const hataMesajlari = {
    tr: {
      "Invalid login credentials": "E-posta veya şifre hatalı.",
      "Email not confirmed": "E-posta adresiniz doğrulanmamış.",
      "User already registered": "Bu e-posta adresi zaten kayıtlı.",
      "Password should be at least 6 characters": "Şifre en az 6 karakter olmalıdır.",
      "Unable to validate email address: invalid format": "Geçersiz e-posta adresi formatı.",
      "Signup requires a valid password": "Geçerli bir şifre giriniz.",
      "User not found": "Kullanıcı bulunamadı.",
      "Too many requests": "Çok fazla deneme yaptınız. Lütfen bekleyin.",
    },
    en: {
      "Invalid login credentials": "Invalid email or password.",
      "Email not confirmed": "Your email address has not been confirmed.",
      "User already registered": "This email address is already registered.",
      "Password should be at least 6 characters": "Password must be at least 6 characters.",
      "Unable to validate email address: invalid format": "Invalid email address format.",
      "Signup requires a valid password": "Please enter a valid password.",
      "User not found": "User not found.",
      "Too many requests": "Too many attempts. Please wait.",
    },
    de: {
      "Invalid login credentials": "Ungültige E-Mail oder ungültiges Passwort.",
      "Email not confirmed": "Ihre E-Mail-Adresse wurde nicht bestätigt.",
      "User already registered": "Diese E-Mail-Adresse ist bereits registriert.",
      "Password should be at least 6 characters": "Das Passwort muss mindestens 6 Zeichen lang sein.",
      "Unable to validate email address: invalid format": "Ungültiges E-Mail-Format.",
      "Signup requires a valid password": "Bitte geben Sie ein gültiges Passwort ein.",
      "User not found": "Benutzer nicht gefunden.",
      "Too many requests": "Zu viele Versuche. Bitte warten.",
    },
  };

  function hataMetniCevir(mesaj: string) {
    const sozluk = hataMesajlari[dil];
    for (const [ing, cevirisi] of Object.entries(sozluk)) {
      if (mesaj.includes(ing)) return cevirisi;
    }
    return mesaj;
  }

  async function girisYap() {
    setYukleniyor(true);
    setMesaj("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: sifre });
    if (error) { setMesaj(hataMetniCevir(error.message)); }
    else if (data.user) {
      const { data: profile } = await supabase.from("profiles").select("hesap_turu").eq("id", data.user.id).single();
      if (profile?.hesap_turu === "admin") window.location.href = "/admin";
      else if (profile?.hesap_turu === "klinik") window.location.href = "/klinik-panel";
      else if (profile?.hesap_turu === "otel") window.location.href = "/otel-panel";
      else if (profile?.hesap_turu === "transfer") window.location.href = "/transfer-panel";
      else window.location.href = "/hasta-panel";
    }
    setYukleniyor(false);
  }

  async function kayitOl() {
    setYukleniyor(true);
    setMesaj("");
    const { data, error } = await supabase.auth.signUp({ email, password: sifre });
    if (error) { setMesaj(hataMetniCevir(error.message)); }
    else if (data.user) {
      await supabase.from("profiles").upsert({ id: data.user.id, ad, soyad, email, hesap_turu: hesapTuru });
      setMesaj(m.kayitBasarili);
      setMod("giris");
    }
    setYukleniyor(false);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#12103a", fontFamily: "'Segoe UI', sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Navbar benzeri header */}
      <nav style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ fontSize: "22px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>
          med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            {(["tr", "en", "de"] as const).map(d => (
              <span key={d} onClick={() => dilDegistir(d)} style={{ fontSize: "11px", padding: "3px 8px", border: `1px solid ${dil === d ? "#534AB7" : "#2a2a4e"}`, borderRadius: "4px", color: dil === d ? "#7F77DD" : "#aab4c8", cursor: "pointer", textTransform: "uppercase" }}>{d}</span>
            ))}
          </div>
          <a href="/" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>{m.anaSayfayaDon}</a>
        </div>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: mobil ? "20px 16px" : "32px" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: mobil ? "28px 20px" : "40px", width: "100%", maxWidth: "420px" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "6px" }}>
              med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
            </div>
            <p style={{ fontSize: "14px", color: "#888", margin: 0 }}>
              {mod === "giris" ? m.hosGeldiniz : m.yeniHesap}
            </p>
          </div>

          {/* Tab */}
          <div style={{ display: "flex", background: "#f9fafb", borderRadius: "10px", padding: "4px", marginBottom: "24px" }}>
            <button onClick={() => setMod("giris")} style={{ flex: 1, padding: "9px", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 600, background: mod === "giris" ? "#fff" : "transparent", color: mod === "giris" ? "#534AB7" : "#888", boxShadow: mod === "giris" ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
              {m.girisYap}
            </button>
            <button onClick={() => setMod("kayit")} style={{ flex: 1, padding: "9px", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 600, background: mod === "kayit" ? "#fff" : "transparent", color: mod === "kayit" ? "#534AB7" : "#888", boxShadow: mod === "kayit" ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
              {m.kayitOl}
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
                <label style={labelStyle}>{m.eposta}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>{m.sifre}</label>
                <div style={{ position: "relative" }}>
                  <input type={sifreGoster ? "text" : "password"} value={sifre} onChange={e => setSifre(e.target.value)} onKeyDown={e => { if (e.key === "Enter") girisYap(); }} style={{ ...inputStyle, paddingRight: "44px" }} />
                  <button onClick={() => setSifreGoster(!sifreGoster)} type="button" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "18px" }}>
                    {sifreGoster ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
              <button onClick={girisYap} disabled={yukleniyor} style={{ width: "100%", background: "#534AB7", color: "#fff", border: "none", padding: "13px", borderRadius: "10px", fontSize: "15px", cursor: "pointer", fontWeight: 600, opacity: yukleniyor ? 0.7 : 1 }}>
                {yukleniyor ? "..." : m.girisYapBtn}
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                <div>
                  <label style={labelStyle}>{m.ad}</label>
                  <input type="text" value={ad} onChange={e => setAd(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{m.soyad}</label>
                  <input type="text" value={soyad} onChange={e => setSoyad(e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={labelStyle}>{m.eposta}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={labelStyle}>{m.sifre}</label>
                <div style={{ position: "relative" }}>
                  <input type={sifreGoster2 ? "text" : "password"} value={sifre} onChange={e => setSifre(e.target.value)} onKeyDown={e => { if (e.key === "Enter") kayitOl(); }} style={{ ...inputStyle, paddingRight: "44px" }} />
                  <button onClick={() => setSifreGoster2(!sifreGoster2)} type="button" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "18px" }}>
                    {sifreGoster2 ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>{m.hesapTuru}</label>
                <select value={hesapTuru} onChange={e => setHesapTuru(e.target.value)} style={{ ...inputStyle, background: "#fff" }}>
                  <option value="hasta">{m.hasta}</option>
                  <option value="klinik">{m.klinik}</option>
                  <option value="otel">{m.otel}</option>
                  <option value="transfer">{m.transfer}</option>
                </select>
              </div>
              <button onClick={kayitOl} disabled={yukleniyor} style={{ width: "100%", background: "#534AB7", color: "#fff", border: "none", padding: "13px", borderRadius: "10px", fontSize: "15px", cursor: "pointer", fontWeight: 600, opacity: yukleniyor ? 0.7 : 1 }}>
                {yukleniyor ? "..." : m.hesapOlustur}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
