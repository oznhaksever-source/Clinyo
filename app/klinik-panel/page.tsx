"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

const hizmetKategorileri = {
  "Diş Tedavisi": {
    "Genel Diş": ["Muayene", "Röntgen", "Kanal Tedavisi", "Diş Çekimi", "Dolgu (Kompozit)", "Dolgu (Amalgam)", "Diş Taşı Temizleme", "Ağız Bakımı"],
    "Estetik Diş": ["Zirkonyum Kaplama", "Porselen Kaplama", "Lamine Veneer", "Diş Beyazlatma (Ofis)", "Diş Beyazlatma (Ev)", "Gülüş Tasarımı"],
    "İmplant": ["Tek İmplant", "All-on-4", "All-on-6", "Kemik Grefti", "Sinüs Lifting"],
    "Ortodonti": ["Metal Braket", "Seramik Braket", "Şeffaf Plak (Aligner)", "Retainer"],
    "Protez": ["Hareketli Tam Protez", "Hareketli Kısmi Protez", "Sabit Köprü", "İmplant Üstü Protez"],
  },
  "Saç Ekimi": {
    "FUE": ["FUE Saç Ekimi", "Safir FUE", "DHI Saç Ekimi", "Sakal Ekimi", "Kaş Ekimi"],
    "Destek Tedavileri": ["PRP Tedavisi", "Mezoterapi", "Lazer Terapi"],
  },
  "Göz Ameliyatı": {
    "Lazer": ["Lasik", "Lasek", "PRK", "Smile Pro", "Trans-PRK"],
    "Lens": ["Göz İçi Lens (ICL)", "Katarakt Ameliyatı", "Multifokal Lens"],
    "Göz Kapağı": ["Üst Kapak Estetiği", "Alt Kapak Estetiği"],
  },
  "Plastik Cerrahi": {
    "Yüz": ["Burun Estetiği (Rinoplasti)", "Kulak Estetiği", "Yüz Germe", "Göz Kapağı Estetiği", "Çene Estetiği"],
    "Vücut": ["Meme Büyütme", "Meme Küçültme", "Meme Dikleştirme", "Karın Germe", "Liposuction"],
    "Non-Cerrahi": ["Botoks", "Dolgu (Filler)", "PRP Yüz", "Lazer Cilt"],
  },
  "Genel Sağlık": {
    "Check-Up": ["Temel Check-Up", "Kapsamlı Check-Up", "Kardiyoloji Check-Up", "Onkoloji Taraması"],
    "Ortopedi": ["Diz Protezi", "Kalça Protezi", "Omurga Cerrahisi", "Spor Yaralanmaları"],
    "Diğer": ["Gastroloji", "Dermatoloji", "Nöroloji", "Üroloji"],
  },
};

export default function KlinikPanel() {
  const [aktifMenu, setAktifMenu] = useState("ozet");
  const [kullanici, setKullanici] = useState<any>(null);
  const [talepler, setTalepler] = useState<any[]>([]);
  const [teklifler, setTeklifler] = useState<any[]>([]);
  const [hizmetler, setHizmetler] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [mesaj, setMesaj] = useState("");

  const [yeniHizmet, setYeniHizmet] = useState({
    kategori: "Diş Tedavisi",
    alt_kategori: "Genel Diş",
    hizmet_adi: "",
    aciklama: "",
    fiyat: "",
    para_birimi: "EUR",
    sure: "",
  });

  const [yeniTeklif, setYeniTeklif] = useState({ talep_id: "", fiyat: "", aciklama: "" });
  const [duzenleId, setDuzenleId] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => { veriYukle(); }, []);

  async function veriYukle() {
    setYukleniyor(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = "/giris"; return; }

    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    setKullanici(profile);

    const { data: talepData } = await supabase.from("talepler").select("*, profiles(ad, soyad, email)").order("olusturma_tarihi", { ascending: false });
    setTalepler(talepData || []);

    const { data: teklifData } = await supabase.from("teklifler").select("*, talepler(tedavi_turu)").eq("klinik_id", user.id).order("olusturma_tarihi", { ascending: false });
    setTeklifler(teklifData || []);

    const { data: hizmetData } = await supabase.from("klinik_hizmetler").select("*").eq("klinik_id", user.id).order("kategori");
    setHizmetler(hizmetData || []);

    setYukleniyor(false);
  }

  async function hizmetEkle() {
    if (!yeniHizmet.hizmet_adi || !yeniHizmet.fiyat) {
      setMesaj("Hizmet adı ve fiyat zorunludur!");
      return;
    }
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("klinik_hizmetler").insert({
      klinik_id: user?.id,
      ...yeniHizmet,
      fiyat: parseFloat(yeniHizmet.fiyat),
    });
    if (error) {
      setMesaj("Hata: " + error.message);
    } else {
      setMesaj("Hizmet eklendi!");
      setYeniHizmet({ kategori: "Diş Tedavisi", alt_kategori: "Genel Diş", hizmet_adi: "", aciklama: "", fiyat: "", para_birimi: "EUR", sure: "" });
      veriYukle();
    }
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

  async function teklifGonder() {
    if (!yeniTeklif.talep_id || !yeniTeklif.fiyat) return;
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("teklifler").insert({
      talep_id: yeniTeklif.talep_id,
      klinik_id: user?.id,
      fiyat: parseFloat(yeniTeklif.fiyat),
      para_birimi: "EUR",
      aciklama: yeniTeklif.aciklama,
      durum: "beklemede",
    });
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
              {kullanici.onaylandi ? "✓ Onaylandi" : "⏳ Onay Bekleniyor"}
            </div>
          </div>
        )}

        <div style={{ padding: "20px 12px", flex: 1 }}>
          {[
            { id: "ozet", ad: "Genel Özet" },
            { id: "hizmetler", ad: "Hizmet & Fiyat Listesi" },
            { id: "talepler", ad: "Teklif Talepleri" },
            { id: "tekliflerim", ad: "Gönderilen Teklifler" },
            { id: "profil", ad: "Klinik Profilim" },
          ].map((m) => (
            <div key={m.id} onClick={() => setAktifMenu(m.id)} style={{ padding: "10px 12px", borderRadius: "8px", cursor: "pointer", marginBottom: "4px", background: aktifMenu === m.id ? "#534AB7" : "transparent", color: aktifMenu === m.id ? "#fff" : "#8b8fc8", fontSize: "13px" }}>
              {m.ad}
            </div>
          ))}
        </div>

        <div style={{ padding: "0 12px 20px" }}>
          <button onClick={cikisYap} style={{ width: "100%", padding: "10px", background: "transparent", border: "1px solid #2a2a4e", borderRadius: "8px", color: "#8b8fc8", fontSize: "13px", cursor: "pointer" }}>
            Çıkış Yap
          </button>
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
                <p style={{ fontSize: "13px", color: "#666" }}>Klinik hesabınız admin tarafından henüz onaylanmamış. Onaylandıktan sonra teklif gönderebilirsiniz.</p>
              </div>
            )}

            {aktifMenu === "ozet" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>Hoş Geldiniz, {kullanici?.ad}! 👋</h1>
                <p style={{ fontSize: "14px", color: "#888", marginBottom: "28px" }}>Klinik panelinizden hizmetlerinizi ve tekliflerinizi yönetebilirsiniz.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
                  {[
                    { baslik: "Hizmet Sayısı", deger: hizmetler.length, renk: "#534AB7" },
                    { baslik: "Açık Talep", deger: talepler.length, renk: "#185FA5" },
                    { baslik: "Gönderilen Teklif", deger: teklifler.length, renk: "#0a7a3a" },
                    { baslik: "Bekleyen Teklif", deger: teklifler.filter(t => t.durum === "beklemede").length, renk: "#BA7517" },
                  ].map((k) => (
                    <div key={k.baslik} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                      <div style={{ fontSize: "28px", fontWeight: 700, color: k.renk, marginBottom: "8px" }}>{k.deger}</div>
                      <div style={{ fontSize: "13px", color: "#888" }}>{k.baslik}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button onClick={() => setAktifMenu("hizmetler")} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>+ Hizmet Ekle</button>
                  <button onClick={() => setAktifMenu("talepler")} style={{ background: "#fff", color: "#534AB7", border: "1px solid #534AB7", padding: "12px 24px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Talepleri Görüntüle</button>
                </div>
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
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Hizmet Adı *</label>
                      <select value={yeniHizmet.hizmet_adi} onChange={(e) => setYeniHizmet({ ...yeniHizmet, hizmet_adi: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", background: "#fff" }}>
                        <option value="">Seçin veya yazın</option>
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
                        <option>EUR</option>
                        <option>USD</option>
                        <option>TRY</option>
                        <option>GBP</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Süre</label>
                      <input type="text" placeholder="örn: 1 saat, 2 gün" value={yeniHizmet.sure} onChange={(e) => setYeniHizmet({ ...yeniHizmet, sure: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Açıklama</label>
                    <textarea rows={2} placeholder="Hizmet hakkında kısa açıklama" value={yeniHizmet.aciklama} onChange={(e) => setYeniHizmet({ ...yeniHizmet, aciklama: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                  <button onClick={hizmetEkle} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 600 }}>
                    + Hizmet Ekle
                  </button>
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
                        <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Süre</th>
                        <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Durum</th>
                        <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hizmetler.map((h, i) => (
                        <tr key={h.id} style={{ borderTop: "1px solid #EEEDFE", background: i % 2 === 0 ? "#fff" : "#fafafa", opacity: h.aktif ? 1 : 0.5 }}>
                          <td style={{ padding: "10px 16px" }}>
                            <div style={{ fontSize: "13px", fontWeight: 600, color: "#12103a" }}>{h.hizmet_adi}</div>
                            {h.aciklama && <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{h.aciklama}</div>}
                          </td>
                          <td style={{ padding: "10px 16px" }}>
                            <div style={{ fontSize: "12px", color: "#534AB7" }}>{h.kategori}</div>
                            <div style={{ fontSize: "11px", color: "#888" }}>{h.alt_kategori}</div>
                          </td>
                          <td style={{ padding: "10px 16px", fontSize: "14px", fontWeight: 700, color: "#534AB7" }}>{h.fiyat} {h.para_birimi}</td>
                          <td style={{ padding: "10px 16px", fontSize: "12px", color: "#888" }}>{h.sure || "—"}</td>
                          <td style={{ padding: "10px 16px" }}>
                            <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: h.aktif ? "#f0fff4" : "#f9fafb", color: h.aktif ? "#0a7a3a" : "#888", cursor: "pointer" }} onClick={() => hizmetAktifToggle(h.id, h.aktif)}>
                              {h.aktif ? "Aktif" : "Pasif"}
                            </span>
                          </td>
                          <td style={{ padding: "10px 16px" }}>
                            <div style={{ display: "flex", gap: "6px" }}>
                              <button onClick={() => hizmetAktifToggle(h.id, h.aktif)} style={{ background: h.aktif ? "#fff8e1" : "#f0fff4", color: h.aktif ? "#BA7517" : "#0a7a3a", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>
                                {h.aktif ? "Pasife Al" : "Aktife Al"}
                              </button>
                              <button onClick={() => hizmetSil(h.id)} style={{ background: "#fff0f0", color: "#c00", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Sil</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {hizmetler.length === 0 && (
                    <div style={{ textAlign: "center", padding: "48px", color: "#888", fontSize: "13px" }}>
                      Henüz hizmet eklenmemiş. Yukarıdan ilk hizmetinizi ekleyin.
                    </div>
                  )}
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
                          <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>Hasta: {t.profiles?.ad} {t.profiles?.soyad}</div>
                          {t.aciklama && <div style={{ fontSize: "12px", color: "#888" }}>{t.aciklama}</div>}
                        </div>
                        <span style={{ fontSize: "11px", padding: "4px 12px", borderRadius: "20px", background: "#fff8e1", color: "#BA7517" }}>{t.durum}</span>
                      </div>
                      {kullanici?.onaylandi && (
                        <div style={{ borderTop: "1px solid #EEEDFE", paddingTop: "12px" }}>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "#12103a", marginBottom: "8px" }}>Teklif Gönder:</div>
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            <select onChange={(e) => { const h = hizmetler.find(hiz => hiz.id === e.target.value); if (h) setYeniTeklif({ talep_id: t.id, fiyat: h.fiyat.toString(), aciklama: h.hizmet_adi }); }} style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", outline: "none", background: "#fff" }}>
                              <option value="">Hizmet listesinden seç</option>
                              {hizmetler.filter(h => h.aktif).map(h => <option key={h.id} value={h.id}>{h.hizmet_adi} — {h.fiyat} {h.para_birimi}</option>)}
                            </select>
                            <input type="number" placeholder="Fiyat (EUR)" value={yeniTeklif.talep_id === t.id ? yeniTeklif.fiyat : ""} onChange={(e) => setYeniTeklif({ talep_id: t.id, fiyat: e.target.value, aciklama: yeniTeklif.aciklama })} style={{ width: "120px", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", outline: "none" }} />
                            <input type="text" placeholder="Açıklama" value={yeniTeklif.talep_id === t.id ? yeniTeklif.aciklama : ""} onChange={(e) => setYeniTeklif({ ...yeniTeklif, talep_id: t.id, aciklama: e.target.value })} style={{ flex: 1, minWidth: "150px", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", outline: "none" }} />
                            <button onClick={() => { setYeniTeklif(prev => ({ ...prev, talep_id: t.id })); teklifGonder(); }} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Gönder</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {talepler.length === 0 && (
                    <div style={{ textAlign: "center", padding: "48px", background: "#fff", borderRadius: "12px", border: "1px solid #EEEDFE", color: "#888" }}>Henüz teklif talebi yok</div>
                  )}
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
                        <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>{new Date(t.olusturma_tarihi).toLocaleDateString("tr-TR")}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "22px", fontWeight: 700, color: "#534AB7" }}>{t.fiyat} {t.para_birimi}</div>
                        <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: t.durum === "beklemede" ? "#fff8e1" : "#f0fff4", color: t.durum === "beklemede" ? "#BA7517" : "#0a7a3a" }}>{t.durum}</span>
                      </div>
                    </div>
                  ))}
                  {teklifler.length === 0 && (
                    <div style={{ textAlign: "center", padding: "48px", background: "#fff", borderRadius: "12px", border: "1px solid #EEEDFE", color: "#888" }}>Henüz teklif gönderilmedi</div>
                  )}
                </div>
              </div>
            )}

            {aktifMenu === "profil" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Klinik Profilim</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "28px", maxWidth: "500px" }}>
                  {[
                    { etiket: "Klinik Adı", deger: `${kullanici?.ad} ${kullanici?.soyad}` },
                    { etiket: "E-posta", deger: kullanici?.email },
                    { etiket: "Hesap Türü", deger: kullanici?.hesap_turu },
                    { etiket: "Durum", deger: kullanici?.onaylandi ? "Onaylandı" : "Onay Bekleniyor" },
                    { etiket: "Toplam Hizmet", deger: `${hizmetler.length} hizmet` },
                  ].map((item) => (
                    <div key={item.etiket} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f5f5f5" }}>
                      <span style={{ fontSize: "13px", color: "#888" }}>{item.etiket}</span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#12103a" }}>{item.deger}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
