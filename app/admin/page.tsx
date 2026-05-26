"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

export default function Admin() {
  const [aktifMenu, setAktifMenu] = useState("genel");
  const [kullanicilar, setKullanicilar] = useState<any[]>([]);
  const [talepler, setTalepler] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [onayMesaj, setOnayMesaj] = useState("");
  const [tumMesajlar, setTumMesajlar] = useState<any[]>([]);
  const [seciliKonusma, setSeciliKonusma] = useState<string | null>(null);
  const [detayKullanici, setDetayKullanici] = useState<any>(null);
  const [kullaniciBelgeler, setKullaniciBelgeler] = useState<any[]>([]);
  const [yorumlar, setYorumlar] = useState<any[]>([]);
  const [adminNotu, setAdminNotu] = useState<Record<string,string>>({});

  // Blog state
  const [blogYazilari, setBlogYazilari] = useState<any[]>([]);
  const [blogForm, setBlogForm] = useState(false);
  const [blogDuzenle, setBlogDuzenle] = useState<any>(null);
  const [blogYukleniyor, setBlogYukleniyor] = useState(false);
  const [gorselYukleniyor, setGorselYukleniyor] = useState(false);
  const [blogVeri, setBlogVeri] = useState({
    slug: "", emoji: "📝", tarih: new Date().toISOString().split("T")[0], yayin: false,
    baslik_tr: "", baslik_en: "", baslik_de: "", baslik_ar: "", baslik_ru: "", baslik_fr: "",
    ozet_tr: "", ozet_en: "", ozet_de: "", ozet_ar: "", ozet_ru: "", ozet_fr: "",
    icerik_tr: "", icerik_en: "", icerik_de: "", icerik_ar: "", icerik_ru: "", icerik_fr: "",
    kapak_gorsel: "",
  });
  const [aktifBlogDil, setAktifBlogDil] = useState("tr");

  const supabase = createClient();

  useEffect(() => { veriYukle(); }, []);

  async function veriYukle() {
    setYukleniyor(true);
    const { data: k } = await supabase.from("profiles").select("*").order("olusturma_tarihi", { ascending: false });
    const { data: t } = await supabase.from("talepler").select("*, profiles(ad, soyad, email)").order("olusturma_tarihi", { ascending: false });
    const { data: m } = await supabase.from("mesajlar").select("*, gonderen:profiles!mesajlar_gonderen_id_fkey(id, ad, soyad, hesap_turu), alici:profiles!mesajlar_alici_id_fkey(id, ad, soyad, hesap_turu)").order("created_at", { ascending: false });
    const { data: y } = await supabase.from("yorumlar").select("*, klinik:profiles!yorumlar_klinik_id_fkey(ad, soyad)").order("created_at", { ascending: false });
    const { data: b } = await supabase.from("blog_yazilari").select("*").order("olusturma_tarihi", { ascending: false });
    setKullanicilar(k || []);
    setTalepler(t || []);
    setTumMesajlar(m || []);
    setYorumlar(y || []);
    setBlogYazilari(b || []);
    setYukleniyor(false);
  }

  // Blog fonksiyonları
  function blogFormSifirla() {
    setBlogVeri({
      slug: "", emoji: "📝", tarih: new Date().toISOString().split("T")[0], yayin: false,
      baslik_tr: "", baslik_en: "", baslik_de: "", baslik_ar: "", baslik_ru: "", baslik_fr: "",
      ozet_tr: "", ozet_en: "", ozet_de: "", ozet_ar: "", ozet_ru: "", ozet_fr: "",
      icerik_tr: "", icerik_en: "", icerik_de: "", icerik_ar: "", icerik_ru: "", icerik_fr: "",
      kapak_gorsel: "",
    });
    setBlogDuzenle(null);
    setBlogForm(false);
    setAktifBlogDil("tr");
  }

  function blogDuzenleAc(yazi: any) {
    setBlogVeri({
      slug: yazi.slug || "",
      emoji: yazi.emoji || "📝",
      tarih: yazi.tarih || new Date().toISOString().split("T")[0],
      yayin: yazi.yayin || false,
      baslik_tr: yazi.baslik_tr || "", baslik_en: yazi.baslik_en || "",
      baslik_de: yazi.baslik_de || "", baslik_ar: yazi.baslik_ar || "",
      baslik_ru: yazi.baslik_ru || "", baslik_fr: yazi.baslik_fr || "",
      ozet_tr: yazi.ozet_tr || "", ozet_en: yazi.ozet_en || "",
      ozet_de: yazi.ozet_de || "", ozet_ar: yazi.ozet_ar || "",
      ozet_ru: yazi.ozet_ru || "", ozet_fr: yazi.ozet_fr || "",
      icerik_tr: yazi.icerik_tr || "", icerik_en: yazi.icerik_en || "",
      icerik_de: yazi.icerik_de || "", icerik_ar: yazi.icerik_ar || "",
      icerik_ru: yazi.icerik_ru || "", icerik_fr: yazi.icerik_fr || "",
      kapak_gorsel: yazi.kapak_gorsel || "",
    });
    setBlogDuzenle(yazi);
    setBlogForm(true);
  }

  async function gorselYukle(file: File) {
    setGorselYukleniyor(true);
    const dosyaAdi = `blog/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("medoqa-images").upload(dosyaAdi, file);
    if (!error) {
      const { data: url } = supabase.storage.from("medoqa-images").getPublicUrl(dosyaAdi);
      setBlogVeri(prev => ({ ...prev, kapak_gorsel: url.publicUrl }));
      setOnayMesaj("✅ Görsel yüklendi!");
    } else {
      setOnayMesaj("❌ Görsel yüklenemedi: " + error.message);
    }
    setGorselYukleniyor(false);
  }

  async function blogKaydet() {
    if (!blogVeri.slug || !blogVeri.baslik_tr) {
      setOnayMesaj("❌ Slug ve Türkçe başlık zorunludur!");
      return;
    }
    setBlogYukleniyor(true);
    if (blogDuzenle) {
      const { error } = await supabase.from("blog_yazilari").update(blogVeri).eq("id", blogDuzenle.id);
      if (error) { setOnayMesaj("❌ Hata: " + error.message); }
      else { setOnayMesaj("✅ Blog yazısı güncellendi!"); }
    } else {
      const { error } = await supabase.from("blog_yazilari").insert(blogVeri);
      if (error) { setOnayMesaj("❌ Hata: " + error.message); }
      else { setOnayMesaj("✅ Blog yazısı eklendi!"); }
    }
    setBlogYukleniyor(false);
    blogFormSifirla();
    veriYukle();
  }

  async function blogSil(id: string) {
    if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    await supabase.from("blog_yazilari").delete().eq("id", id);
    setOnayMesaj("✅ Blog yazısı silindi!");
    veriYukle();
  }

  async function blogYayinDegistir(id: string, yayin: boolean) {
    await supabase.from("blog_yazilari").update({ yayin }).eq("id", id);
    setOnayMesaj(yayin ? "✅ Yazı yayına alındı!" : "⏸ Yazı taslağa alındı!");
    veriYukle();
  }

  const DILLER = [
    { kod: "tr", ad: "🇹🇷 TR" },
    { kod: "en", ad: "🇬🇧 EN" },
    { kod: "de", ad: "🇩🇪 DE" },
    { kod: "ar", ad: "🇸🇦 AR" },
    { kod: "ru", ad: "🇷🇺 RU" },
    { kod: "fr", ad: "🇫🇷 FR" },
  ];

  // Mevcut fonksiyonlar
  async function yorumOnayla(yorum: any) {
    await supabase.from("yorumlar").update({ onaylandi: true, gizlendi: false, admin_notu: adminNotu[yorum.id] || null }).eq("id", yorum.id);
    if (yorum.hasta_email) {
      await fetch("/api/bildirim-gonder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tip: "yorum_onaylandi", hasta_email: yorum.hasta_email, hasta_ad: yorum.hasta_ad, klinik_ad: `${yorum.klinik?.ad} ${yorum.klinik?.soyad}` }) });
    }
    setOnayMesaj("✅ Yorum onaylandı!"); veriYukle();
  }

  async function yorumGizle(yorum: any) {
    await supabase.from("yorumlar").update({ gizlendi: true, onaylandi: false, admin_notu: adminNotu[yorum.id] || null }).eq("id", yorum.id);
    if (yorum.hasta_email) {
      await fetch("/api/bildirim-gonder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tip: "yorum_gizlendi", hasta_email: yorum.hasta_email, hasta_ad: yorum.hasta_ad, klinik_ad: `${yorum.klinik?.ad} ${yorum.klinik?.soyad}`, admin_notu: adminNotu[yorum.id] || "" }) });
    }
    setOnayMesaj("🚫 Yorum gizlendi!"); veriYukle();
  }

  async function yorumYayinla(id: string) {
    await supabase.from("yorumlar").update({ gizlendi: false, onaylandi: true }).eq("id", id);
    setOnayMesaj("✅ Yorum yayınlandı!"); veriYukle();
  }

  async function guncelle(id: string, alan: string, deger: any) {
    await supabase.from("profiles").update({ [alan]: deger }).eq("id", id);
    setOnayMesaj("Guncellendi!"); setTimeout(() => setOnayMesaj(""), 2000);
    setDetayKullanici((prev: any) => prev?.id === id ? { ...prev, [alan]: deger } : prev);
    veriYukle();
  }

  async function kullaniciyiSil(id: string) {
    if (!confirm("Bu kullaniciyi silmek istediginize emin misiniz?")) return;
    await supabase.rpc("delete_user", { user_id: id });
    await supabase.from("profiles").delete().eq("id", id);
    setOnayMesaj("Kullanici silindi!"); veriYukle();
  }

  async function cikisYap() {
    await supabase.auth.signOut();
    window.location.href = "/giris";
  }

  async function detayGoster(kullanici: any) {
    setDetayKullanici(kullanici);
    const { data } = await supabase.from("belgeler").select("*").eq("kullanici_id", kullanici.id);
    setKullaniciBelgeler(data || []);
  }

  const klinikler = kullanicilar.filter(k => k.hesap_turu === "klinik");
  const hastalar = kullanicilar.filter(k => k.hesap_turu === "hasta");
  const oteller = kullanicilar.filter(k => k.hesap_turu === "otel");
  const transferler = kullanicilar.filter(k => k.hesap_turu === "transfer");
  const bekleyenler = [...klinikler, ...oteller, ...transferler].filter(k => !k.onaylandi && !k.askida);

  const belgeTurleri: Record<string, { id: string; ad: string }[]> = {
    klinik: [
      { id: "saglik_bakanligi", ad: "Sağlık Bakanlığı Yetki Belgesi" },
      { id: "faaliyet_ruhsati", ad: "Faaliyet Ruhsatı" },
      { id: "hekim_sertifikasi", ad: "Sorumlu Hekim Sertifikası" },
      { id: "sigorta_policesi", ad: "Sigorta Poliçesi" },
      { id: "vergi_levhasi", ad: "Vergi Levhası" },
      { id: "ticaret_sicil", ad: "Ticaret Sicil Belgesi" },
    ],
    otel: [
      { id: "turizm_isletme", ad: "Turizm İşletmesi Belgesi" },
      { id: "isyeri_ruhsati", ad: "İşyeri Açma ve Çalışma Ruhsatı" },
      { id: "yangin_belgesi", ad: "Yangın Güvenlik Belgesi" },
      { id: "vergi_levhasi", ad: "Vergi Levhası" },
      { id: "ticaret_sicil", ad: "Ticaret Sicil Belgesi" },
    ],
    transfer: [
      { id: "tursab_belgesi", ad: "TURSAB A Grubu Seyahat Acentası Belgesi" },
      { id: "saglik_turizmi_yetki", ad: "Sağlık Turizmi Yetki Belgesi" },
      { id: "arac_ruhsatlari", ad: "Ticari Araç Ruhsatları" },
      { id: "psikoteknik", ad: "Şoför Psikoteknik Belgeleri" },
      { id: "trafik_sigorta", ad: "Trafik Sigortası ve Kasko" },
      { id: "vergi_levhasi", ad: "Vergi Levhası" },
      { id: "ticaret_sicil", ad: "Ticaret Sicil Belgesi" },
    ],
  };

  const zorunluBelgeler = belgeTurleri[detayKullanici?.hesap_turu] || belgeTurleri.klinik;

  const inputStyle = { width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" as const, fontFamily: "inherit" };
  const labelStyle = { fontSize: "12px", color: "#555", display: "block" as const, marginBottom: "5px", fontWeight: 600 as const };

  function UyeTablosu({ liste, baslik }: { liste: any[], baslik: string }) {
    return (
      <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden", marginBottom: "24px" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #EEEDFE", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", margin: 0 }}>{baslik} ({liste.length})</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Ad / Firma</th>
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>E-posta</th>
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Durum</th>
              {baslik === "Klinikler" && <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Uluslararası</th>}
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Islemler</th>
            </tr>
          </thead>
          <tbody>
            {liste.map((k, i) => (
              <tr key={k.id} style={{ borderTop: "1px solid #EEEDFE", background: k.askida ? "#fff5f5" : i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "10px 16px", fontSize: "13px", color: "#12103a" }}>{k.ad} {k.soyad}</td>
                <td style={{ padding: "10px 16px", fontSize: "13px", color: "#888" }}>{k.email}</td>
                <td style={{ padding: "10px 16px" }}>
                  {k.askida ? <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#fff0f0", color: "#c00" }}>Askida</span>
                  : k.onaylandi ? <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#f0fff4", color: "#0a7a3a" }}>Aktif</span>
                  : <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#fff8e1", color: "#BA7517" }}>Bekliyor</span>}
                </td>
                {baslik === "Klinikler" && (
                  <td style={{ padding: "10px 16px" }}>
                    {k.uluslararasi_yetki ? <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#f0eeff", color: "#534AB7" }}>🌍 Yetkili</span>
                    : <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: "#f9fafb", color: "#aaa" }}>Yurt içi</span>}
                  </td>
                )}
                <td style={{ padding: "10px 16px" }}>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {!k.onaylandi && !k.askida && <button onClick={() => guncelle(k.id, "onaylandi", true)} style={{ background: "#0a7a3a", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Onayla</button>}
                    {k.onaylandi && !k.askida && <button onClick={() => guncelle(k.id, "askida", true)} style={{ background: "#BA7517", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Askiya Al</button>}
                    {k.askida && <button onClick={() => { guncelle(k.id, "askida", false); guncelle(k.id, "onaylandi", true); }} style={{ background: "#185FA5", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Aktif Et</button>}
                    <button onClick={() => detayGoster(k)} style={{ background: "#185FA5", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Detay</button>
                    <button onClick={() => kullaniciyiSil(k.id)} style={{ background: "#c00", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Sil</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {liste.length === 0 && <div style={{ textAlign: "center", padding: "32px", color: "#888", fontSize: "13px" }}>Kayit yok</div>}
      </div>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif", display: "flex" }}>

      {/* Detay Modali */}
      {detayKullanici && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ background: "#fff", borderRadius: "20px", width: "100%", maxWidth: "640px", maxHeight: "90vh", overflow: "auto", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f0d2e", margin: 0 }}>Kullanıcı Detayı</h2>
              <button onClick={() => setDetayKullanici(null)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#888" }}>×</button>
            </div>
            <div style={{ background: "#f8f9ff", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  { etiket: "Ad Soyad", deger: `${detayKullanici.ad} ${detayKullanici.soyad}` },
                  { etiket: "E-posta", deger: detayKullanici.email },
                  { etiket: "Hesap Türü", deger: detayKullanici.hesap_turu },
                  { etiket: "Durum", deger: detayKullanici.onaylandi ? "✅ Onaylı" : detayKullanici.askida ? "🔴 Askıda" : "⏳ Bekliyor" },
                  { etiket: "Telefon", deger: detayKullanici.telefon || "-" },
                  { etiket: "Website", deger: detayKullanici.website || "-" },
                  { etiket: "Adres", deger: detayKullanici.konum_adres || "-" },
                  { etiket: "Kayıt Tarihi", deger: detayKullanici.olusturma_tarihi ? new Date(detayKullanici.olusturma_tarihi).toLocaleDateString("tr-TR") : "-" },
                ].map(item => (
                  <div key={item.etiket}>
                    <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "3px" }}>{item.etiket}</div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f0d2e" }}>{item.deger}</div>
                  </div>
                ))}
              </div>
              {detayKullanici.tanitim_yazisi && (
                <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #eeecff" }}>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }}>Tanıtım Yazısı</div>
                  <div style={{ fontSize: "13px", color: "#0f0d2e", lineHeight: 1.6 }}>{detayKullanici.tanitim_yazisi}</div>
                </div>
              )}
            </div>
            {detayKullanici.hesap_turu === "klinik" && (
              <div style={{ background: detayKullanici.uluslararasi_yetki ? "#f0eeff" : "#f9fafb", border: `1px solid ${detayKullanici.uluslararasi_yetki ? "#534AB7" : "#e5e7eb"}`, borderRadius: "12px", padding: "16px 20px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#12103a" }}>🌍 Uluslararası Sağlık Turizmi Yetkisi</div>
                    <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>{detayKullanici.uluslararasi_yetki ? "Bu klinik yurt dışındaki hastalara teklif gönderebilir." : "Bu klinik sadece Türkiye'deki hastalara görünür."}</div>
                  </div>
                  <button onClick={() => guncelle(detayKullanici.id, "uluslararasi_yetki", !detayKullanici.uluslararasi_yetki)} style={{ background: detayKullanici.uluslararasi_yetki ? "#534AB7" : "#e5e7eb", color: detayKullanici.uluslararasi_yetki ? "#fff" : "#666", border: "none", padding: "9px 18px", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 600, flexShrink: 0 }}>
                    {detayKullanici.uluslararasi_yetki ? "✅ Yetkili" : "Yetki Ver"}
                  </button>
                </div>
                {detayKullanici.uluslararasi_yetki && (
                  <div style={{ marginTop: "12px", display: "flex", gap: "8px", alignItems: "center" }}>
                    <label style={{ fontSize: "12px", color: "#534AB7", fontWeight: 600, flexShrink: 0 }}>Yetki Belge No:</label>
                    <input type="text" defaultValue={detayKullanici.yetki_belge_no || ""} placeholder="Örn: SBÜ-2024-12345" onBlur={e => { if (e.target.value !== (detayKullanici.yetki_belge_no || "")) guncelle(detayKullanici.id, "yetki_belge_no", e.target.value); }} style={{ flex: 1, border: "1px solid #CECBF6", borderRadius: "6px", padding: "6px 10px", fontSize: "12px", outline: "none" }} />
                  </div>
                )}
              </div>
            )}
            {detayKullanici.kapak_fotograf && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f0d2e", marginBottom: "8px" }}>Kapak Fotoğrafı</div>
                <img src={detayKullanici.kapak_fotograf} alt="Kapak" style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "10px" }} />
              </div>
            )}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f0d2e", marginBottom: "12px" }}>Yüklenen Belgeler ({kullaniciBelgeler.length}/{zorunluBelgeler.length})</div>
              {zorunluBelgeler.map(zb => {
                const belge = kullaniciBelgeler.find(b => b.belge_turu === zb.id);
                return (
                  <div key={zb.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: "8px", background: belge ? "#f0fff4" : "#fff0f0", border: `1px solid ${belge ? "#9f9" : "#fcc"}`, marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span>{belge ? "✅" : "❌"}</span>
                      <span style={{ fontSize: "13px", color: "#0f0d2e" }}>{zb.ad}</span>
                    </div>
                    {belge ? <a href={belge.belge_url} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: "#534AB7", textDecoration: "none", fontWeight: 600 }}>Görüntüle →</a>
                    : <span style={{ fontSize: "11px", color: "#c00" }}>Yüklenmedi</span>}
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              {!detayKullanici.onaylandi && !detayKullanici.askida && <button onClick={() => { guncelle(detayKullanici.id, "onaylandi", true); setDetayKullanici(null); }} style={{ flex: 1, background: "#059669", color: "#fff", border: "none", padding: "12px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: 700 }}>✅ Onayla</button>}
              {detayKullanici.onaylandi && !detayKullanici.askida && <button onClick={() => { guncelle(detayKullanici.id, "askida", true); setDetayKullanici(null); }} style={{ flex: 1, background: "#D97706", color: "#fff", border: "none", padding: "12px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: 700 }}>⏸ Askıya Al</button>}
              {detayKullanici.askida && <button onClick={() => { guncelle(detayKullanici.id, "askida", false); guncelle(detayKullanici.id, "onaylandi", true); setDetayKullanici(null); }} style={{ flex: 1, background: "#185FA5", color: "#fff", border: "none", padding: "12px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: 700 }}>✅ Aktif Et</button>}
              <button onClick={() => { kullaniciyiSil(detayKullanici.id); setDetayKullanici(null); }} style={{ background: "#fff0f0", color: "#c00", border: "1px solid #fcc", padding: "12px 20px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: 600 }}>🗑 Sil</button>
              <button onClick={() => setDetayKullanici(null)} style={{ background: "#f8f9ff", color: "#64748b", border: "1px solid #eeecff", padding: "12px 20px", borderRadius: "10px", fontSize: "14px", cursor: "pointer" }}>Kapat</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div style={{ width: "220px", background: "#12103a", display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1e1b4b" }}>
          <a href="/" style={{ fontSize: "20px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span></a>
          <div style={{ fontSize: "11px", color: "#6b6fa8", marginTop: "4px" }}>Admin Paneli</div>
        </div>
        <div style={{ padding: "20px 12px", flex: 1 }}>
          {[
            { id: "genel", ad: "Genel Ozet", badge: bekleyenler.length },
            { id: "klinikler", ad: "Klinikler", badge: klinikler.filter(k => !k.onaylandi).length },
            { id: "oteller", ad: "Oteller", badge: oteller.filter(k => !k.onaylandi).length },
            { id: "transferler", ad: "Transfer Sirketleri", badge: transferler.filter(k => !k.onaylandi).length },
            { id: "hastalar", ad: "Hastalar", badge: 0 },
            { id: "talepler", ad: "Teklif Talepleri", badge: 0 },
            { id: "yorumlar", ad: "⭐ Yorumlar", badge: yorumlar.filter((y:any)=>!y.onaylandi&&!y.gizlendi).length },
            { id: "mesajlar", ad: "💬 Mesajlar", badge: 0 },
            { id: "destek", ad: "🎯 Destek", badge: 0 },
            { id: "blog", ad: "📝 Blog", badge: blogYazilari.filter(b => !b.yayin).length },
          ].map((m) => (
            <div key={m.id} onClick={() => setAktifMenu(m.id)} style={{ padding: "10px 12px", borderRadius: "8px", cursor: "pointer", marginBottom: "4px", background: aktifMenu === m.id ? "#534AB7" : "transparent", color: aktifMenu === m.id ? "#fff" : "#8b8fc8", fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{m.ad}</span>
              {m.badge > 0 && <span style={{ background: "#c00", color: "#fff", fontSize: "10px", padding: "2px 6px", borderRadius: "10px" }}>{m.badge}</span>}
            </div>
          ))}
        </div>
        <div style={{ padding: "0 12px 20px" }}>
          <button onClick={cikisYap} style={{ width: "100%", padding: "10px", background: "transparent", border: "1px solid #2a2a4e", borderRadius: "8px", color: "#8b8fc8", fontSize: "13px", cursor: "pointer" }}>Cikis Yap</button>
        </div>
      </div>

      {/* İçerik */}
      <div style={{ flex: 1, padding: "32px", overflow: "auto" }}>
        {onayMesaj && (
          <div style={{ background: "#f0fff4", border: "1px solid #9f9", borderRadius: "8px", padding: "10px 16px", marginBottom: "16px", fontSize: "13px", color: "#0a7a3a" }}>✓ {onayMesaj}</div>
        )}
        {yukleniyor ? (
          <div style={{ textAlign: "center", padding: "64px", color: "#888" }}>Veriler yukleniyor...</div>
        ) : (
          <>
            {aktifMenu === "genel" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Genel Ozet</h1>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
                  {[
                    { baslik: "Toplam Uye", deger: kullanicilar.length, renk: "#534AB7" },
                    { baslik: "Hasta", deger: hastalar.length, renk: "#0a7a3a" },
                    { baslik: "Klinik", deger: klinikler.length, renk: "#185FA5" },
                    { baslik: "Onay Bekleyen", deger: bekleyenler.length, renk: "#c00" },
                  ].map((k) => (
                    <div key={k.baslik} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                      <div style={{ fontSize: "32px", fontWeight: 700, color: k.renk }}>{k.deger}</div>
                      <div style={{ fontSize: "13px", color: "#888", marginTop: "6px" }}>{k.baslik}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
                  {[
                    { baslik: "Otel", deger: oteller.length, renk: "#7F77DD" },
                    { baslik: "Transfer Sirketi", deger: transferler.length, renk: "#BA7517" },
                    { baslik: "Teklif Talebi", deger: talepler.length, renk: "#185FA5" },
                  ].map((k) => (
                    <div key={k.baslik} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                      <div style={{ fontSize: "32px", fontWeight: 700, color: k.renk }}>{k.deger}</div>
                      <div style={{ fontSize: "13px", color: "#888", marginTop: "6px" }}>{k.baslik}</div>
                    </div>
                  ))}
                </div>
                {bekleyenler.length > 0 && (
                  <div style={{ background: "#fff8e1", border: "1px solid #f0c040", borderRadius: "12px", padding: "20px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#BA7517", marginBottom: "12px" }}>⚠ Onay Bekleyenler ({bekleyenler.length})</h3>
                    {bekleyenler.map((k) => (
                      <div key={k.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0e0a0" }}>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "#12103a" }}>{k.ad} {k.soyad}</div>
                          <div style={{ fontSize: "12px", color: "#888" }}>{k.email} · {k.hesap_turu}</div>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => guncelle(k.id, "onaylandi", true)} style={{ background: "#0a7a3a", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>Onayla</button>
                          <button onClick={() => kullaniciyiSil(k.id)} style={{ background: "#c00", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>Reddet</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {aktifMenu === "klinikler" && <UyeTablosu liste={klinikler} baslik="Klinikler" />}
            {aktifMenu === "oteller" && <UyeTablosu liste={oteller} baslik="Oteller" />}
            {aktifMenu === "transferler" && <UyeTablosu liste={transferler} baslik="Transfer Sirketleri" />}
            {aktifMenu === "hastalar" && <UyeTablosu liste={hastalar} baslik="Hastalar" />}

            {aktifMenu === "talepler" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Teklif Talepleri ({talepler.length})</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f9fafb" }}>
                        {["Hasta","Tedavi","Durum","Tarih"].map(h => <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {talepler.map((t, i) => (
                        <tr key={t.id} style={{ borderTop: "1px solid #EEEDFE", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#12103a" }}>{t.profiles?.ad} {t.profiles?.soyad}</td>
                          <td style={{ padding: "12px 16px", fontSize: "13px", color: "#888" }}>{t.tedavi_turu}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: t.durum === "beklemede" ? "#fff8e1" : "#f0fff4", color: t.durum === "beklemede" ? "#BA7517" : "#0a7a3a" }}>{t.durum}</span>
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: "12px", color: "#888" }}>{new Date(t.olusturma_tarihi).toLocaleDateString("tr-TR")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {talepler.length === 0 && <div style={{ textAlign: "center", padding: "32px", color: "#888", fontSize: "13px" }}>Henuz teklif talebi yok</div>}
                </div>
              </div>
            )}

            {aktifMenu === "yorumlar" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>⭐ Yorum Yönetimi</h1>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "24px" }}>
                  {[
                    { baslik: "Onay Bekleyen", deger: yorumlar.filter((y:any)=>!y.onaylandi&&!y.gizlendi).length, renk: "#BA7517" },
                    { baslik: "Yayında", deger: yorumlar.filter((y:any)=>y.onaylandi&&!y.gizlendi).length, renk: "#059669" },
                    { baslik: "Gizlenmiş", deger: yorumlar.filter((y:any)=>y.gizlendi).length, renk: "#c00" },
                  ].map(k => (
                    <div key={k.baslik} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                      <div style={{ fontSize: "28px", fontWeight: 700, color: k.renk }}>{k.deger}</div>
                      <div style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>{k.baslik}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {yorumlar.map((y: any) => {
                    const durum = y.gizlendi ? "gizli" : y.onaylandi ? "yayinda" : "bekliyor";
                    const durumRenk = durum === "gizli" ? "#c00" : durum === "yayinda" ? "#059669" : "#BA7517";
                    const durumBg = durum === "gizli" ? "#fff0f0" : durum === "yayinda" ? "#f0fff4" : "#fff8e1";
                    const durumLabel = durum === "gizli" ? "🚫 Gizli" : durum === "yayinda" ? "✅ Yayında" : "⏳ Bekliyor";
                    return (
                      <div key={y.id} style={{ background: "#fff", border: `1px solid ${durum === "bekliyor" ? "#f0c040" : "#EEEDFE"}`, borderRadius: "12px", padding: "20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                              <span style={{ fontSize: "14px", fontWeight: 700, color: "#12103a" }}>{y.hasta_ad}</span>
                              <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "10px", background: durumBg, color: durumRenk, fontWeight: 600 }}>{durumLabel}</span>
                            </div>
                            <div style={{ fontSize: "12px", color: "#888" }}>🏥 {y.klinik?.ad} {y.klinik?.soyad}{y.tedavi_turu && <span style={{ marginLeft: "8px" }}>💊 {y.tedavi_turu}</span>}</div>
                            {y.hasta_email && <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>✉️ {y.hasta_email}</div>}
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ display: "flex", gap: "2px", justifyContent: "flex-end", marginBottom: "4px" }}>
                              {[1,2,3,4,5].map(i=><span key={i} style={{ fontSize: "14px", color: i<=y.puan?"#f59e0b":"#e5e7eb" }}>★</span>)}
                            </div>
                            <div style={{ fontSize: "11px", color: "#94a3b8" }}>{new Date(y.created_at).toLocaleDateString("tr-TR")}</div>
                          </div>
                        </div>
                        <div style={{ background: "#f9fafb", borderRadius: "8px", padding: "12px", marginBottom: "12px", fontSize: "13px", color: "#555", lineHeight: 1.6 }}>{y.yorum}</div>
                        <div style={{ marginBottom: "12px" }}>
                          <input type="text" placeholder="Admin notu (hastaya mail olarak gönderilir, opsiyonel)" value={adminNotu[y.id] || ""} onChange={e => setAdminNotu(prev => ({ ...prev, [y.id]: e.target.value }))} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "12px", outline: "none", boxSizing: "border-box" as const }} />
                        </div>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          {!y.onaylandi && !y.gizlendi && <button onClick={() => yorumOnayla(y)} style={{ background: "#059669", color: "#fff", border: "none", padding: "7px 16px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>✅ Onayla</button>}
                          {!y.gizlendi && <button onClick={() => yorumGizle(y)} style={{ background: "#fff0f0", color: "#c00", border: "1px solid #fcc", padding: "7px 16px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>🚫 Gizle</button>}
                          {y.gizlendi && <button onClick={() => yorumYayinla(y.id)} style={{ background: "#f0eeff", color: "#534AB7", border: "1px solid #CECBF6", padding: "7px 16px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>👁️ Yeniden Yayınla</button>}
                          {y.admin_notu && <span style={{ fontSize: "11px", color: "#888", alignSelf: "center" }}>📝 Not: {y.admin_notu}</span>}
                        </div>
                      </div>
                    );
                  })}
                  {yorumlar.length === 0 && <div style={{ textAlign: "center", padding: "48px", background: "#fff", borderRadius: "12px", border: "1px solid #EEEDFE", color: "#888", fontSize: "13px" }}>Henüz yorum yok.</div>}
                </div>
              </div>
            )}

            {aktifMenu === "destek" && (
              <div style={{textAlign:"center",padding:"48px"}}>
                <a href="/admin/destek" style={{background:"#534AB7",color:"#fff",padding:"14px 28px",borderRadius:"10px",fontSize:"14px",textDecoration:"none",fontWeight:700}}>🎯 Destek Taleplerine Git →</a>
              </div>
            )}

            {aktifMenu === "mesajlar" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>💬 Tüm Mesajlaşmalar</h1>
                {(() => {
                  const konusmalar: Record<string, any[]> = {};
                  tumMesajlar.forEach(msg => {
                    const key = [msg.gonderen_id, msg.alici_id].sort().join("_");
                    if (!konusmalar[key]) konusmalar[key] = [];
                    konusmalar[key].push(msg);
                  });
                  return (
                    <div style={{ display: "grid", gridTemplateColumns: seciliKonusma ? "300px 1fr" : "1fr", gap: "20px" }}>
                      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #EEEDFE", overflow: "hidden" }}>
                        <div style={{ padding: "16px 20px", borderBottom: "1px solid #EEEDFE", fontSize: "14px", fontWeight: 700, color: "#12103a" }}>{Object.keys(konusmalar).length} konuşma</div>
                        {Object.entries(konusmalar).map(([key, msgs]) => {
                          const sonMesaj = msgs[0];
                          const kisi1 = sonMesaj.gonderen;
                          const kisi2 = sonMesaj.alici;
                          return (
                            <div key={key} onClick={() => setSeciliKonusma(seciliKonusma === key ? null : key)} style={{ padding: "14px 20px", cursor: "pointer", borderBottom: "1px solid #f8f9ff", background: seciliKonusma === key ? "#f0eeff" : "#fff" }}>
                              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px" }}>
                                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>{kisi1?.ad?.[0]}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f0d2e" }}>{kisi1?.ad} {kisi1?.soyad} ↔ {kisi2?.ad} {kisi2?.soyad}</div>
                                  <div style={{ display: "flex", gap: "4px", marginTop: "2px" }}>
                                    <span style={{ fontSize: "10px", background: "#f0eeff", color: "#534AB7", padding: "1px 6px", borderRadius: "8px" }}>{kisi1?.hesap_turu}</span>
                                    <span style={{ fontSize: "10px", background: "#f0eeff", color: "#534AB7", padding: "1px 6px", borderRadius: "8px" }}>{kisi2?.hesap_turu}</span>
                                  </div>
                                </div>
                                <span style={{ fontSize: "11px", color: "#94a3b8", flexShrink: 0 }}>{msgs.length} mesaj</span>
                              </div>
                              <div style={{ fontSize: "12px", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingLeft: "42px" }}>{sonMesaj.mesaj}</div>
                            </div>
                          );
                        })}
                        {Object.keys(konusmalar).length === 0 && <div style={{ textAlign: "center", padding: "48px", color: "#888", fontSize: "13px" }}>Henüz mesajlaşma yok</div>}
                      </div>
                      {seciliKonusma && konusmalar[seciliKonusma] && (
                        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #EEEDFE", display: "flex", flexDirection: "column", overflow: "hidden", maxHeight: "600px" }}>
                          <div style={{ padding: "16px 20px", borderBottom: "1px solid #EEEDFE", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontSize: "14px", fontWeight: 700, color: "#12103a" }}>{konusmalar[seciliKonusma][0].gonderen?.ad} ↔ {konusmalar[seciliKonusma][0].alici?.ad}</div>
                            <button onClick={() => setSeciliKonusma(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "18px" }}>×</button>
                          </div>
                          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                            {[...konusmalar[seciliKonusma]].reverse().map(msg => (
                              <div key={msg.id} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>{msg.gonderen?.ad?.[0]}</div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#0f0d2e" }}>{msg.gonderen?.ad} {msg.gonderen?.soyad}</span>
                                    <span style={{ fontSize: "10px", background: "#f0eeff", color: "#534AB7", padding: "1px 6px", borderRadius: "8px" }}>{msg.gonderen?.hesap_turu}</span>
                                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>{new Date(msg.created_at).toLocaleString("tr-TR")}</span>
                                  </div>
                                  <div style={{ background: "#f8f9ff", border: "1px solid #eeecff", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#374151", lineHeight: 1.6 }}>{msg.mesaj}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ═══════════════ BLOG YÖNETİMİ ═══════════════ */}
            {aktifMenu === "blog" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                  <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", margin: 0 }}>📝 Blog Yönetimi</h1>
                  {!blogForm && (
                    <button onClick={() => setBlogForm(true)} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", cursor: "pointer", fontWeight: 700 }}>
                      + Yeni Yazı
                    </button>
                  )}
                </div>

                {/* Blog Formu */}
                {blogForm && (
                  <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "16px", padding: "28px", marginBottom: "28px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                      <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#12103a", margin: 0 }}>
                        {blogDuzenle ? "✏️ Yazıyı Düzenle" : "➕ Yeni Blog Yazısı"}
                      </h2>
                      <button onClick={blogFormSifirla} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#888" }}>×</button>
                    </div>

                    {/* Temel bilgiler */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                      <div>
                        <label style={labelStyle}>Slug * (URL)</label>
                        <input type="text" placeholder="dental-treatment-turkey" value={blogVeri.slug} onChange={e => setBlogVeri(p => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s/g, "-") }))} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Emoji</label>
                        <input type="text" placeholder="🦷" value={blogVeri.emoji} onChange={e => setBlogVeri(p => ({ ...p, emoji: e.target.value }))} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Tarih</label>
                        <input type="date" value={blogVeri.tarih} onChange={e => setBlogVeri(p => ({ ...p, tarih: e.target.value }))} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Durum</label>
                        <select value={blogVeri.yayin ? "yayin" : "taslak"} onChange={e => setBlogVeri(p => ({ ...p, yayin: e.target.value === "yayin" }))} style={{ ...inputStyle, background: "#fff" }}>
                          <option value="taslak">📝 Taslak</option>
                          <option value="yayin">✅ Yayında</option>
                        </select>
                      </div>
                    </div>

                    {/* Kapak görseli */}
                    <div style={{ marginBottom: "16px", padding: "16px", background: "#f8f9ff", borderRadius: "10px", border: "1px solid #e8e6ff" }}>
                      <label style={labelStyle}>Kapak Görseli</label>
                      <input type="file" accept="image/*" onChange={e => { if (e.target.files?.[0]) gorselYukle(e.target.files[0]); }} style={{ ...inputStyle, padding: "8px 12px" }} />
                      {gorselYukleniyor && <div style={{ fontSize: "12px", color: "#534AB7", marginTop: "6px" }}>⏳ Görsel yükleniyor...</div>}
                      {blogVeri.kapak_gorsel && (
                        <div style={{ marginTop: "10px" }}>
                          <img src={blogVeri.kapak_gorsel} alt="Kapak" style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px" }} />
                          <div style={{ fontSize: "11px", color: "#059669", marginTop: "4px" }}>✅ Görsel yüklendi</div>
                        </div>
                      )}
                    </div>

                    {/* Dil sekmeleri */}
                    <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
                      {DILLER.map(d => (
                        <button key={d.kod} onClick={() => setAktifBlogDil(d.kod)} style={{ padding: "6px 14px", borderRadius: "8px", border: `1px solid ${aktifBlogDil === d.kod ? "#534AB7" : "#e5e7eb"}`, background: aktifBlogDil === d.kod ? "#534AB7" : "#fff", color: aktifBlogDil === d.kod ? "#fff" : "#555", fontSize: "12px", cursor: "pointer", fontWeight: aktifBlogDil === d.kod ? 700 : 400 }}>
                          {d.ad}
                          {(blogVeri as any)[`baslik_${d.kod}`] ? " ✓" : ""}
                        </button>
                      ))}
                    </div>

                    {/* Seçili dil içeriği */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div>
                        <label style={labelStyle}>Başlık ({aktifBlogDil.toUpperCase()}){aktifBlogDil === "tr" ? " *" : ""}</label>
                        <input type="text" placeholder={`Başlık (${aktifBlogDil})`} value={(blogVeri as any)[`baslik_${aktifBlogDil}`]} onChange={e => setBlogVeri(p => ({ ...p, [`baslik_${aktifBlogDil}`]: e.target.value }))} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Özet ({aktifBlogDil.toUpperCase()})</label>
                        <textarea rows={2} placeholder={`Kısa özet (${aktifBlogDil})`} value={(blogVeri as any)[`ozet_${aktifBlogDil}`]} onChange={e => setBlogVeri(p => ({ ...p, [`ozet_${aktifBlogDil}`]: e.target.value }))} style={{ ...inputStyle, resize: "vertical" }} />
                      </div>
                      <div>
                        <label style={labelStyle}>İçerik ({aktifBlogDil.toUpperCase()})</label>
                        <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "6px" }}>
                          💡 Başlık için: ## Başlık Adı | Liste için: - madde1 | Paragraf: düz metin
                        </div>
                        <textarea rows={12} placeholder={`Blog yazısı içeriği (${aktifBlogDil})\n\n## Bölüm Başlığı\nParagraf metni buraya...\n\n## Başka Bölüm\n- Liste maddesi 1\n- Liste maddesi 2`} value={(blogVeri as any)[`icerik_${aktifBlogDil}`]} onChange={e => setBlogVeri(p => ({ ...p, [`icerik_${aktifBlogDil}`]: e.target.value }))} style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "12px" }} />
              </div>
            </div>

                    <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                      <button onClick={blogKaydet} disabled={blogYukleniyor} style={{ flex: 1, background: "#534AB7", color: "#fff", border: "none", padding: "12px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: 700, opacity: blogYukleniyor ? 0.7 : 1 }}>
                        {blogYukleniyor ? "⏳ Kaydediliyor..." : blogDuzenle ? "✅ Güncelle" : "✅ Kaydet"}
                      </button>
                      <button onClick={blogFormSifirla} style={{ background: "#f8f9ff", color: "#64748b", border: "1px solid #e5e7eb", padding: "12px 20px", borderRadius: "10px", fontSize: "14px", cursor: "pointer" }}>İptal</button>
                    </div>
                  </div>
                )}

                {/* Blog yazı listesi */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {blogYazilari.map(yazi => (
                    <div key={yazi.id} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "14px", padding: "20px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      {yazi.kapak_gorsel && <img src={yazi.kapak_gorsel} alt={yazi.baslik_tr} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 }} />}
                      {!yazi.kapak_gorsel && <div style={{ width: "80px", height: "80px", background: "#f0eeff", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", flexShrink: 0 }}>{yazi.emoji || "📝"}</div>}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "15px", fontWeight: 700, color: "#0f0d2e" }}>{yazi.baslik_tr || yazi.baslik_en || "Başlıksız"}</span>
                          <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "10px", background: yazi.yayin ? "#f0fff4" : "#fff8e1", color: yazi.yayin ? "#059669" : "#BA7517" }}>
                            {yazi.yayin ? "✅ Yayında" : "📝 Taslak"}
                          </span>
                        </div>
                        <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "6px" }}>
                          📅 {yazi.tarih} · /{yazi.slug}
                        </div>
                        <div style={{ fontSize: "12px", color: "#64748b", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          {DILLER.map(d => (
                            <span key={d.kod} style={{ color: yazi[`baslik_${d.kod}`] ? "#059669" : "#e5e7eb" }}>{d.ad}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                        <button onClick={() => blogYayinDegistir(yazi.id, !yazi.yayin)} style={{ background: yazi.yayin ? "#fff8e1" : "#f0fff4", color: yazi.yayin ? "#BA7517" : "#059669", border: `1px solid ${yazi.yayin ? "#f0c040" : "#9f9"}`, padding: "6px 12px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>
                          {yazi.yayin ? "⏸ Taslak" : "▶ Yayınla"}
                        </button>
                        <button onClick={() => blogDuzenleAc(yazi)} style={{ background: "#f0eeff", color: "#534AB7", border: "1px solid #CECBF6", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>✏️ Düzenle</button>
                        <button onClick={() => blogSil(yazi.id)} style={{ background: "#fff0f0", color: "#c00", border: "1px solid #fcc", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", cursor: "pointer" }}>🗑</button>
                      </div>
                    </div>
                  ))}
                  {blogYazilari.length === 0 && !blogForm && (
                    <div style={{ textAlign: "center", padding: "64px", background: "#fff", borderRadius: "16px", border: "1px solid #EEEDFE" }}>
                      <div style={{ fontSize: "48px", marginBottom: "16px" }}>📝</div>
                      <div style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>Henüz blog yazısı yok</div>
                      <div style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>İlk yazınızı ekleyin</div>
                      <button onClick={() => setBlogForm(true)} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "10px", fontSize: "13px", cursor: "pointer", fontWeight: 700 }}>+ Yeni Yazı Ekle</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
