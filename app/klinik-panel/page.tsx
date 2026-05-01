"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

const hizmetKategorileri = {
  "Diş Tedavisi": {
    "Genel Diş": ["Muayene", "Röntgen", "Kanal Tedavisi", "Diş Çekimi", "Dolgu (Kompozit)", "Dolgu (Amalgam)", "Diş Taşı Temizleme"],
    "Estetik Diş": ["Zirkonyum Kaplama", "Porselen Kaplama", "Lamine Veneer", "Diş Beyazlatma", "Gülüş Tasarımı"],
    "İmplant": ["Tek İmplant", "All-on-4", "All-on-6", "Kemik Grefti", "Sinüs Lifting"],
    "Ortodonti": ["Metal Braket", "Seramik Braket", "Şeffaf Plak (Aligner)", "Retainer"],
    "Protez": ["Hareketli Tam Protez", "Hareketli Kısmi Protez", "Sabit Köprü"],
  },
  "Saç Ekimi": {
    "FUE": ["FUE Saç Ekimi", "Safir FUE", "DHI Saç Ekimi", "Sakal Ekimi", "Kaş Ekimi"],
    "Destek": ["PRP Tedavisi", "Mezoterapi", "Lazer Terapi"],
  },
  "Göz Ameliyatı": {
    "Lazer": ["Lasik", "Lasek", "PRK", "Smile Pro"],
    "Lens": ["Göz İçi Lens (ICL)", "Katarakt Ameliyatı", "Multifokal Lens"],
  },
  "Plastik Cerrahi": {
    "Yüz": ["Burun Estetiği", "Kulak Estetiği", "Yüz Germe", "Göz Kapağı Estetiği"],
    "Vücut": ["Meme Büyütme", "Meme Küçültme", "Karın Germe", "Liposuction"],
    "Non-Cerrahi": ["Botoks", "Dolgu (Filler)", "PRP Yüz"],
  },
  "Genel Sağlık": {
    "Check-Up": ["Temel Check-Up", "Kapsamlı Check-Up", "Kardiyoloji Check-Up"],
    "Ortopedi": ["Diz Protezi", "Kalça Protezi", "Omurga Cerrahisi"],
  },
};

export default function KlinikPanel() {
  const [aktifMenu, setAktifMenu] = useState("ozet");
  const [kullanici, setKullanici] = useState<any>(null);
  const [talepler, setTalepler] = useState<any[]>([]);
  const [teklifler, setTeklifler] = useState<any[]>([]);
  const [hizmetler, setHizmetler] = useState<any[]>([]);
  const [doktorlar, setDoktorlar] = useState<any[]>([]);
  const [onceSonralar, setOnceSonralar] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [mesaj, setMesaj] = useState("");

  const [profil, setProfil] = useState({
    tanitim_yazisi: "",
    telefon: "",
    website: "",
    instagram: "",
    facebook: "",
    twitter: "",
    google_maps_url: "",
    konum_adres: "",
  });

  const [yeniHizmet, setYeniHizmet] = useState({
    kategori: "Diş Tedavisi",
    alt_kategori: "Genel Diş",
    hizmet_adi: "",
    aciklama: "",
    fiyat: "",
    para_birimi: "EUR",
    sure: "",
  });

  const [yeniDoktor, setYeniDoktor] = useState({
    ad: "",
    uzmanlik: "",
    aciklama: "",
    fotograf_url: "",
  });

  const [yeniOnceSonra, setYeniOnceSonra] = useState({
    hizmet_adi: "",
    once_fotograf: "",
    sonra_fotograf: "",
    aciklama: "",
  });

  const [yeniTeklif, setYeniTeklif] = useState({ talep_id: "", fiyat: "", aciklama: "" });

  const supabase = createClient();

  useEffect(() => { veriYukle(); }, []);

  async function veriYukle() {
    setYukleniyor(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = "/giris"; return; }

    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    setKullanici(profile);
    if (profile) {
      setProfil({
        tanitim_yazisi: profile.tanitim_yazisi || "",
        telefon: profile.telefon || "",
        website: profile.website || "",
        instagram: profile.instagram || "",
        facebook: profile.facebook || "",
        twitter: profile.twitter || "",
        google_maps_url: profile.google_maps_url || "",
        konum_adres: profile.konum_adres || "",
      });
    }

    const { data: talepData } = await supabase.from("talepler").select("*, profiles(ad, soyad, email)").order("olusturma_tarihi", { ascending: false });
    setTalepler(talepData || []);

    const { data: teklifData } = await supabase.from("teklifler").select("*, talepler(tedavi_turu)").eq("klinik_id", user.id).order("olusturma_tarihi", { ascending: false });
    setTeklifler(teklifData || []);

    const { data: hizmetData } = await supabase.from("klinik_hizmetler").select("*").eq("klinik_id", user.id).order("kategori");
    setHizmetler(hizmetData || []);

    const { data: doktorData } = await supabase.from("doktorlar").select("*").eq("klinik_id", user.id);
    setDoktorlar(doktorData || []);

    const { data: onceSonraData } = await supabase.from("once_sonra").select("*").eq("klinik_id", user.id);
    setOnceSonralar(onceSonraData || []);

    setYukleniyor(false);
  }

  async function fotografYukle(file: File, klasor: string) {
    const { data: { user } } = await supabase.auth.getUser();
    const dosyaAdi = `${user?.id}/${klasor}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("medoqa-images").upload(dosyaAdi, file);
    if (error) return null;
    const { data: url } = supabase.storage.from("medoqa-images").getPublicUrl(dosyaAdi);
    return url.publicUrl;
  }

  async function profilKaydet() {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("profiles").update(profil).eq("id", user?.id);
    if (error) { setMesaj("Hata: " + error.message); }
    else { setMesaj("Profil kaydedildi!"); veriYukle(); }
    setTimeout(() => setMesaj(""), 3000);
  }

  async function kapakFotografYukle(file: File) {
    const url = await fotografYukle(file, "kapak");
    if (url) {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from("profiles").update({ kapak_fotograf: url }).eq("id", user?.id);
      veriYukle();
      setMesaj("Kapak fotoğrafı yüklendi!");
      setTimeout(() => setMesaj(""), 3000);
    }
  }

  async function hizmetEkle() {
    if (!yeniHizmet.hizmet_adi || !yeniHizmet.fiyat) { setMesaj("Hizmet adı ve fiyat zorunludur!"); return; }
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("klinik_hizmetler").insert({ klinik_id: user?.id, ...yeniHizmet, fiyat: parseFloat(yeniHizmet.fiyat) });
    setMesaj("Hizmet eklendi!");
    setYeniHizmet({ kategori: "Diş Tedavisi", alt_kategori: "Genel Diş", hizmet_adi: "", aciklama: "", fiyat: "", para_birimi: "EUR", sure: "" });
    veriYukle();
    setTimeout(() => setMesaj(""), 3000);
  }

  async function hizmetSil(id: string) {
    if (!confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
    await supabase.from("klinik_hizmetler").delete().eq("id", id);
    veriYukle();
  }

  async function hizmetAktifToggle(id: string, aktif: boolean) {
    await supabase.from("klinik_hizmetler").update({ aktif: !aktif }).eq("id", id);
    veriYukle();
  }

  async function doktorEkle() {
    if (!yeniDoktor.ad) { setMesaj("Doktor adı zorunludur!"); return; }
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("doktorlar").insert({ klinik_id: user?.id, ...yeniDoktor });
    setMesaj("Doktor eklendi!");
    setYeniDoktor({ ad: "", uzmanlik: "", aciklama: "", fotograf_url: "" });
    veriYukle();
    setTimeout(() => setMesaj(""), 3000);
  }

  async function doktorSil(id: string) {
    if (!confirm("Bu doktoru silmek istediğinize emin misiniz?")) return;
    await supabase.from("doktorlar").delete().eq("id", id);
    veriYukle();
  }

  async function onceSonraEkle() {
    if (!yeniOnceSonra.once_fotograf || !yeniOnceSonra.sonra_fotograf) { setMesaj("Önce ve sonra fotoğrafları zorunludur!"); return; }
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("once_sonra").insert({ klinik_id: user?.id, ...yeniOnceSonra });
    setMesaj("Önce/Sonra eklendi!");
    setYeniOnceSonra({ hizmet_adi: "", once_fotograf: "", sonra_fotograf: "", aciklama: "" });
    veriYukle();
    setTimeout(() => setMesaj(""), 3000);
  }

  async function onceSonraSil(id: string) {
    await supabase.from("once_sonra").delete().eq("id", id);
    veriYukle();
  }

  async function teklifGonder() {
    if (!yeniTeklif.talep_id || !yeniTeklif.fiyat) return;
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("teklifler").insert({ talep_id: yeniTeklif.talep_id, klinik_id: user?.id, fiyat: parseFloat(yeniTeklif.fiyat), para_birimi: "EUR", aciklama: yeniTeklif.aciklama, durum: "beklemede" });
    setMesaj("Teklif gönderildi!");
    setYeniTeklif({ talep_id: "", fiyat: "", aciklama: "" });
    veriYukle();
    setTimeout(() => setMesaj(""), 3000);
  }

  async function cikisYap() {
    await supabase.auth.signOut();
    window.location.href = "/giris";
  }

  const altKategoriler = Object.keys(hizmetKategorileri[yeniHizmet.kategori as keyof typeof hizmetKategorileri] || {});
  const hizmetListesi = (hizmetKategorileri[yeniHizmet.kategori as keyof typeof hizmetKategorileri] as any)?.[yeniHizmet.alt_kategori] || [];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif", display: "flex" }}>
      <div style={{ width: "220px", background: "#12103a", display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1e1b4b" }}>
          <a href="/" style={{ fontSize: "20px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>
            med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
          </a>
          <div style={{ fontSize: "11px", color: "#6b6fa8", marginTop: "4px" }}>Klinik Paneli</div>
        </div>
        {kullanici && (
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e1b4b" }}>
            <div style={{ width: "36px", height: "36px", background: "#185FA5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "14px", marginBottom: "8px" }}>
              {kullanici.ad?.[0]?.toUpperCase() || "K"}
            </div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>{kullanici.ad} {kullanici.soyad}</div>
            <div style={{ fontSize: "11px", color: kullanici.onaylandi ? "#7F77DD" : "#BA7517", marginTop: "2px" }}>
              {kullanici.onaylandi ? "✓ Onaylandı" : "⏳ Onay Bekleniyor"}
            </div>
          </div>
        )}
        <div style={{ padding: "20px 12px", flex: 1 }}>
          {[
            { id: "ozet", ad: "Genel Özet" },
            { id: "profil-duzenle", ad: "Profil Düzenle" },
            { id: "hizmetler", ad: "Hizmet & Fiyatlar" },
            { id: "doktorlar", ad: "Doktorlar" },
            { id: "once-sonra", ad: "Önce/Sonra" },
            { id: "talepler", ad: "Teklif Talepleri" },
            { id: "tekliflerim", ad: "Gönderilen Teklifler" },
          ].map((m) => (
            <div key={m.id} onClick={() => setAktifMenu(m.id)} style={{ padding: "10px 12px", borderRadius: "8px", cursor: "pointer", marginBottom: "4px", background: aktifMenu === m.id ? "#534AB7" : "transparent", color: aktifMenu === m.id ? "#fff" : "#8b8fc8", fontSize: "13px" }}>
              {m.ad}
            </div>
          ))}
        </div>
        <div style={{ padding: "0 12px 20px" }}>
          <button onClick={cikisYap} style={{ width: "100%", padding: "10px", background: "transparent", border: "1px solid #2a2a4e", borderRadius: "8px", color: "#8b8fc8", fontSize: "13px", cursor: "pointer" }}>Çıkış Yap</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: "32px", overflow: "auto" }}>
        {mesaj && (
          <div style={{ background: mesaj.includes("Hata") ? "#fff0f0" : "#f0fff4", border: `1px solid ${mesaj.includes("Hata") ? "#fcc" : "#9f9"}`, borderRadius: "8px", padding: "10px 16px", marginBottom: "16px", fontSize: "13px", color: mesaj.includes("Hata") ? "#c00" : "#0a7a3a" }}>
            {mesaj}
          </div>
        )}

        {yukleniyor ? (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>Yükleniyor...</div>
        ) : (
          <>
            {kullanici && !kullanici.onaylandi && (
              <div style={{ background: "#fff8e1", border: "1px solid #f0c040", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#BA7517", marginBottom: "8px" }}>⏳ Hesabınız Onay Bekliyor</h3>
                <p style={{ fontSize: "13px", color: "#666" }}>Klinik hesabınız admin tarafından henüz onaylanmamış.</p>
              </div>
            )}

            {aktifMenu === "ozet" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>Hoş Geldiniz, {kullanici?.ad}! 👋</h1>
                <p style={{ fontSize: "14px", color: "#888", marginBottom: "28px" }}>Klinik panelinizden profilinizi ve hizmetlerinizi yönetebilirsiniz.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
                  {[
                    { baslik: "Hizmet", deger: hizmetler.length, renk: "#534AB7" },
                    { baslik: "Doktor", deger: doktorlar.length, renk: "#185FA5" },
                    { baslik: "Önce/Sonra", deger: onceSonralar.length, renk: "#7F77DD" },
                    { baslik: "Teklif", deger: teklifler.length, renk: "#0a7a3a" },
                  ].map((k) => (
                    <div key={k.baslik} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                      <div style={{ fontSize: "28px", fontWeight: 700, color: k.renk, marginBottom: "8px" }}>{k.deger}</div>
                      <div style={{ fontSize: "13px", color: "#888" }}>{k.baslik}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button onClick={() => setAktifMenu("profil-duzenle")} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Profil Düzenle</button>
                  <button onClick={() => setAktifMenu("hizmetler")} style={{ background: "#fff", color: "#534AB7", border: "1px solid #534AB7", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Hizmet Ekle</button>
                  <button onClick={() => setAktifMenu("doktorlar")} style={{ background: "#fff", color: "#534AB7", border: "1px solid #534AB7", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Doktor Ekle</button>
                  <button onClick={() => setAktifMenu("once-sonra")} style={{ background: "#fff", color: "#534AB7", border: "1px solid #534AB7", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Önce/Sonra Ekle</button>
                </div>
              </div>
            )}

            {aktifMenu === "profil-duzenle" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Profil Düzenle</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Kapak Fotoğrafı</h2>
                  {kullanici?.kapak_fotograf && (
                    <img src={kullanici.kapak_fotograf} alt="Kapak" style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "12px" }} />
                  )}
                  <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) kapakFotografYukle(file); }} style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", width: "100%", boxSizing: "border-box" }} />
                </div>

                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Klinik Bilgileri</h2>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Klinik Tanıtım Yazısı</label>
                    <textarea rows={4} placeholder="Kliniğiniz hakkında kısa bir tanıtım yazısı..." value={profil.tanitim_yazisi} onChange={(e) => setProfil({ ...profil, tanitim_yazisi: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Telefon</label>
                      <input type="text" placeholder="+90 212 000 00 00" value={profil.telefon} onChange={(e) => setProfil({ ...profil, telefon: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Website</label>
                      <input type="text" placeholder="https://www.kliniginiz.com" value={profil.website} onChange={(e) => setProfil({ ...profil, website: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Adres</label>
                    <input type="text" placeholder="Tam adresiniz..." value={profil.konum_adres} onChange={(e) => setProfil({ ...profil, konum_adres: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Google Maps URL</label>
                    <input type="text" placeholder="https://maps.google.com/..." value={profil.google_maps_url} onChange={(e) => setProfil({ ...profil, google_maps_url: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                </div>

                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Sosyal Medya</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Instagram</label>
                      <input type="text" placeholder="@kullanici_adi" value={profil.instagram} onChange={(e) => setProfil({ ...profil, instagram: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Facebook</label>
                      <input type="text" placeholder="facebook.com/sayfa" value={profil.facebook} onChange={(e) => setProfil({ ...profil, facebook: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Twitter/X</label>
                      <input type="text" placeholder="@kullanici_adi" value={profil.twitter} onChange={(e) => setProfil({ ...profil, twitter: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                </div>

                <button onClick={profilKaydet} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "12px 32px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 600 }}>
                  Profili Kaydet
                </button>
              </div>
            )}

            {aktifMenu === "hizmetler" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Hizmet & Fiyat Listesi</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Yeni Hizmet Ekle</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Kategori</label>
                      <select value={yeniHizmet.kategori} onChange={(e) => setYeniHizmet({ ...yeniHizmet, kategori: e.target.value, alt_kategori: Object.keys(hizmetKategorileri[e.target.value as keyof typeof hizmetKategorileri])[0], hizmet_adi: "" })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", background: "#fff" }}>
                        {Object.keys(hizmetKategorileri).map(k => <option key={k}>{k}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Alt Kategori</label>
                      <select value={yeniHizmet.alt_kategori} onChange={(e) => setYeniHizmet({ ...yeniHizmet, alt_kategori: e.target.value, hizmet_adi: "" })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", background: "#fff" }}>
                        {altKategoriler.map(k => <option key={k}>{k}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Listeden Seç</label>
                      <select value={yeniHizmet.hizmet_adi} onChange={(e) => setYeniHizmet({ ...yeniHizmet, hizmet_adi: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", background: "#fff" }}>
                        <option value="">Seçin</option>
                        {hizmetListesi.map((h: string) => <option key={h}>{h}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Özel Hizmet Adı</label>
                      <input type="text" placeholder="Listede yoksa buraya yazın" value={yeniHizmet.hizmet_adi} onChange={(e) => setYeniHizmet({ ...yeniHizmet, hizmet_adi: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Fiyat *</label>
                      <input type="number" placeholder="0" value={yeniHizmet.fiyat} onChange={(e) => setYeniHizmet({ ...yeniHizmet, fiyat: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Para Birimi</label>
                      <select value={yeniHizmet.para_birimi} onChange={(e) => setYeniHizmet({ ...yeniHizmet, para_birimi: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", background: "#fff" }}>
                        <option>EUR</option><option>USD</option><option>TRY</option><option>GBP</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Süre</label>
                      <input type="text" placeholder="örn: 1 saat" value={yeniHizmet.sure} onChange={(e) => setYeniHizmet({ ...yeniHizmet, sure: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Açıklama</label>
                    <textarea rows={2} value={yeniHizmet.aciklama} onChange={(e) => setYeniHizmet({ ...yeniHizmet, aciklama: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                  <button onClick={hizmetEkle} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 600 }}>+ Hizmet Ekle</button>
                </div>

                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                  <div style={{ padding: "16px 20px", borderBottom: "1px solid #EEEDFE" }}>
                    <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", margin: 0 }}>Mevcut Hizmetler ({hizmetler.length})</h2>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f9fafb" }}>
                        <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Hizmet</th>
                        <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Kategori</th>
                        <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Fiyat</th>
                        <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hizmetler.map((h, i) => (
                        <tr key={h.id} style={{ borderTop: "1px solid #EEEDFE", background: i % 2 === 0 ? "#fff" : "#fafafa", opacity: h.aktif ? 1 : 0.5 }}>
                          <td style={{ padding: "10px 16px", fontSize: "13px", fontWeight: 600, color: "#12103a" }}>{h.hizmet_adi}</td>
                          <td style={{ padding: "10px 16px", fontSize: "12px", color: "#534AB7" }}>{h.kategori}</td>
                          <td style={{ padding: "10px 16px", fontSize: "14px", fontWeight: 700, color: "#534AB7" }}>{h.fiyat} {h.para_birimi}</td>
                          <td style={{ padding: "10px 16px" }}>
                            <div style={{ display: "flex", gap: "6px" }}>
                              <button onClick={() => hizmetAktifToggle(h.id, h.aktif)} style={{ background: h.aktif ? "#fff8e1" : "#f0fff4", color: h.aktif ? "#BA7517" : "#0a7a3a", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>{h.aktif ? "Pasife Al" : "Aktife Al"}</button>
                              <button onClick={() => hizmetSil(h.id)} style={{ background: "#fff0f0", color: "#c00", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Sil</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {hizmetler.length === 0 && <div style={{ textAlign: "center", padding: "32px", color: "#888", fontSize: "13px" }}>Henüz hizmet eklenmemiş.</div>}
                </div>
              </div>
            )}

            {aktifMenu === "doktorlar" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Doktorlar</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Doktor Ekle</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Doktor Adı *</label>
                      <input type="text" placeholder="Dr. Ad Soyad" value={yeniDoktor.ad} onChange={(e) => setYeniDoktor({ ...yeniDoktor, ad: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Uzmanlık</label>
                      <input type="text" placeholder="örn: Diş Hekimi, Plastik Cerrah" value={yeniDoktor.uzmanlik} onChange={(e) => setYeniDoktor({ ...yeniDoktor, uzmanlik: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Açıklama</label>
                    <textarea rows={2} placeholder="Doktor hakkında kısa bilgi..." value={yeniDoktor.aciklama} onChange={(e) => setYeniDoktor({ ...yeniDoktor, aciklama: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Doktor Fotoğrafı</label>
                    <input type="file" accept="image/*" onChange={async (e) => { const file = e.target.files?.[0]; if (file) { const url = await fotografYukle(file, "doktorlar"); if (url) setYeniDoktor({ ...yeniDoktor, fotograf_url: url }); } }} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px" }} />
                    {yeniDoktor.fotograf_url && <img src={yeniDoktor.fotograf_url} alt="Doktor" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%", marginTop: "8px" }} />}
                  </div>
                  <button onClick={doktorEkle} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 600 }}>+ Doktor Ekle</button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                  {doktorlar.map((d) => (
                    <div key={d.id} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
                      {d.fotograf_url ? (
                        <img src={d.fotograf_url} alt={d.ad} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%", marginBottom: "12px" }} />
                      ) : (
                        <div style={{ width: "80px", height: "80px", background: "#EEEDFE", borderRadius: "50%", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", color: "#534AB7", fontWeight: 700 }}>
                          {d.ad[0]}
                        </div>
                      )}
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{d.ad}</div>
                      <div style={{ fontSize: "12px", color: "#534AB7", marginBottom: "8px" }}>{d.uzmanlik}</div>
                      {d.aciklama && <div style={{ fontSize: "12px", color: "#888", marginBottom: "12px" }}>{d.aciklama}</div>}
                      <button onClick={() => doktorSil(d.id)} style={{ background: "#fff0f0", color: "#c00", border: "none", padding: "4px 12px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Sil</button>
                    </div>
                  ))}
                  {doktorlar.length === 0 && <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "32px", color: "#888", fontSize: "13px" }}>Henüz doktor eklenmemiş.</div>}
                </div>
              </div>
            )}

            {aktifMenu === "once-sonra" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Önce / Sonra Fotoğrafları</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Yeni Ekle</h2>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Hizmet Adı</label>
                    <input type="text" placeholder="örn: Zirkonyum Kaplama, Saç Ekimi" value={yeniOnceSonra.hizmet_adi} onChange={(e) => setYeniOnceSonra({ ...yeniOnceSonra, hizmet_adi: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Önce Fotoğrafı *</label>
                      <input type="file" accept="image/*" onChange={async (e) => { const file = e.target.files?.[0]; if (file) { const url = await fotografYukle(file, "once-sonra"); if (url) setYeniOnceSonra({ ...yeniOnceSonra, once_fotograf: url }); } }} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px" }} />
                      {yeniOnceSonra.once_fotograf && <img src={yeniOnceSonra.once_fotograf} alt="Önce" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px", marginTop: "8px" }} />}
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Sonra Fotoğrafı *</label>
                      <input type="file" accept="image/*" onChange={async (e) => { const file = e.target.files?.[0]; if (file) { const url = await fotografYukle(file, "once-sonra"); if (url) setYeniOnceSonra({ ...yeniOnceSonra, sonra_fotograf: url }); } }} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px" }} />
                      {yeniOnceSonra.sonra_fotograf && <img src={yeniOnceSonra.sonra_fotograf} alt="Sonra" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px", marginTop: "8px" }} />}
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Açıklama</label>
                    <input type="text" placeholder="Kısa açıklama..." value={yeniOnceSonra.aciklama} onChange={(e) => setYeniOnceSonra({ ...yeniOnceSonra, aciklama: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <button onClick={onceSonraEkle} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 600 }}>+ Ekle</button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                  {onceSonralar.map((os) => (
                    <div key={os.id} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                        <div>
                          <div style={{ fontSize: "11px", color: "#888", padding: "8px 12px", background: "#f9fafb", textAlign: "center" }}>ÖNCE</div>
                          {os.once_fotograf && <img src={os.once_fotograf} alt="Önce" style={{ width: "100%", height: "140px", objectFit: "cover" }} />}
                        </div>
                        <div>
                          <div style={{ fontSize: "11px", color: "#0a7a3a", padding: "8px 12px", background: "#f0fff4", textAlign: "center" }}>SONRA</div>
                          {os.sonra_fotograf && <img src={os.sonra_fotograf} alt="Sonra" style={{ width: "100%", height: "140px", objectFit: "cover" }} />}
                        </div>
                      </div>
                      <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "#12103a" }}>{os.hizmet_adi}</div>
                          {os.aciklama && <div style={{ fontSize: "11px", color: "#888" }}>{os.aciklama}</div>}
                        </div>
                        <button onClick={() => onceSonraSil(os.id)} style={{ background: "#fff0f0", color: "#c00", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Sil</button>
                      </div>
                    </div>
                  ))}
                  {onceSonralar.length === 0 && <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "32px", color: "#888", fontSize: "13px" }}>Henüz önce/sonra fotoğrafı eklenmemiş.</div>}
                </div>
              </div>
            )}

            {aktifMenu === "talepler" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Teklif Talepleri ({talepler.length})</h1>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {talepler.map((t) => (
                    <div key={t.id} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                        <div>
                          <div style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{t.tedavi_turu}</div>
                          <div style={{ fontSize: "13px", color: "#888" }}>Hasta: {t.profiles?.ad} {t.profiles?.soyad}</div>
                        </div>
                        <span style={{ fontSize: "11px", padding: "4px 12px", borderRadius: "20px", background: "#fff8e1", color: "#BA7517" }}>{t.durum}</span>
                      </div>
                      {kullanici?.onaylandi && (
                        <div style={{ borderTop: "1px solid #EEEDFE", paddingTop: "12px" }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <select onChange={(e) => { const h = hizmetler.find(hiz => hiz.id === e.target.value); if (h) setYeniTeklif({ talep_id: t.id, fiyat: h.fiyat.toString(), aciklama: h.hizmet_adi }); }} style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", outline: "none", background: "#fff" }}>
                              <option value="">Hizmet listesinden seç</option>
                              {hizmetler.filter(h => h.aktif).map(h => <option key={h.id} value={h.id}>{h.hizmet_adi} — {h.fiyat} {h.para_birimi}</option>)}
                            </select>
                            <input type="number" placeholder="Fiyat (EUR)" value={yeniTeklif.talep_id === t.id ? yeniTeklif.fiyat : ""} onChange={(e) => setYeniTeklif({ talep_id: t.id, fiyat: e.target.value, aciklama: yeniTeklif.aciklama })} style={{ width: "120px", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", outline: "none" }} />
                            <input type="text" placeholder="Açıklama" value={yeniTeklif.talep_id === t.id ? yeniTeklif.aciklama : ""} onChange={(e) => setYeniTeklif({ ...yeniTeklif, talep_id: t.id, aciklama: e.target.value })} style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", outline: "none" }} />
                            <button onClick={() => { setYeniTeklif(prev => ({ ...prev, talep_id: t.id })); teklifGonder(); }} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Gönder</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {talepler.length === 0 && <div style={{ textAlign: "center", padding: "48px", background: "#fff", borderRadius: "12px", border: "1px solid #EEEDFE", color: "#888" }}>Henüz teklif talebi yok</div>}
                </div>
              </div>
            )}

            {aktifMenu === "tekliflerim" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Gönderilen Teklifler ({teklifler.length})</h1>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {teklifler.map((t) => (
                    <div key={t.id} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{t.talepler?.tedavi_turu}</div>
                        <div style={{ fontSize: "12px", color: "#888" }}>{t.aciklama}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "22px", fontWeight: 700, color: "#534AB7" }}>{t.fiyat} {t.para_birimi}</div>
                        <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#fff8e1", color: "#BA7517" }}>{t.durum}</span>
                      </div>
                    </div>
                  ))}
                  {teklifler.length === 0 && <div style={{ textAlign: "center", padding: "48px", background: "#fff", borderRadius: "12px", border: "1px solid #EEEDFE", color: "#888" }}>Henüz teklif gönderilmedi</div>}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
