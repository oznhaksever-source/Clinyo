"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

export default function OtelPanel() {
  const [aktifMenu, setAktifMenu] = useState("ozet");
  const [kullanici, setKullanici] = useState<any>(null);
  const [odalar, setOdalar] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [mesaj, setMesaj] = useState("");

  const [profil, setProfil] = useState({
    tanitim_yazisi: "",
    telefon: "",
    website: "",
    instagram: "",
    facebook: "",
    google_maps_url: "",
    konum_adres: "",
    konum_lat: "",
    konum_lng: "",
  });

  const [yeniOda, setYeniOda] = useState({
    oda_adi: "",
    aciklama: "",
    fiyat: "",
    para_birimi: "EUR",
    kapasite: "2",
    fotograf: "",
  });

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
        google_maps_url: profile.google_maps_url || "",
        konum_adres: profile.konum_adres || "",
        konum_lat: profile.konum_lat || "",
        konum_lng: profile.konum_lng || "",
      });
    }
    const { data: odaData } = await supabase.from("otel_odalar").select("*").eq("otel_id", user.id).order("olusturma_tarihi");
    setOdalar(odaData || []);
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
    const { error } = await supabase.from("profiles").update({
      ...profil,
      konum_lat: profil.konum_lat ? parseFloat(profil.konum_lat) : null,
      konum_lng: profil.konum_lng ? parseFloat(profil.konum_lng) : null,
    }).eq("id", user?.id);
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

  async function odaEkle() {
    if (!yeniOda.oda_adi || !yeniOda.fiyat) { setMesaj("Oda adı ve fiyat zorunludur!"); return; }
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("otel_odalar").insert({
      otel_id: user?.id,
      oda_adi: yeniOda.oda_adi,
      aciklama: yeniOda.aciklama,
      fiyat: parseFloat(yeniOda.fiyat),
      para_birimi: yeniOda.para_birimi,
      kapasite: parseInt(yeniOda.kapasite),
      fotograf_url: yeniOda.fotograf,
    });
    if (error) { setMesaj("Hata: " + error.message); }
    else { setMesaj("Oda eklendi!"); setYeniOda({ oda_adi: "", aciklama: "", fiyat: "", para_birimi: "EUR", kapasite: "2", fotograf: "" }); veriYukle(); }
    setTimeout(() => setMesaj(""), 3000);
  }

  async function odaSil(id: string) {
    if (!confirm("Bu odayı silmek istediğinize emin misiniz?")) return;
    await supabase.from("otel_odalar").delete().eq("id", id);
    veriYukle();
  }

  async function odaAktifToggle(id: string, aktif: boolean) {
    await supabase.from("otel_odalar").update({ aktif: !aktif }).eq("id", id);
    veriYukle();
  }

  async function cikisYap() {
    await supabase.auth.signOut();
    window.location.href = "/giris";
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif", display: "flex" }}>
      <div style={{ width: "220px", background: "#12103a", display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1e1b4b" }}>
          <a href="/" style={{ fontSize: "20px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>
            med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
          </a>
          <div style={{ fontSize: "11px", color: "#6b6fa8", marginTop: "4px" }}>Otel Paneli</div>
        </div>
        {kullanici && (
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e1b4b" }}>
            <div style={{ width: "36px", height: "36px", background: "#7F77DD", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "14px", marginBottom: "8px" }}>
              {kullanici.ad?.[0]?.toUpperCase() || "O"}
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
            { id: "odalar", ad: "Oda & Fiyat Listesi" },
            { id: "profil", ad: "Otel Profilim" },
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
                <p style={{ fontSize: "13px", color: "#666" }}>Otel hesabınız admin tarafından henüz onaylanmamış.</p>
              </div>
            )}

            {aktifMenu === "ozet" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>Hoş Geldiniz, {kullanici?.ad}! 👋</h1>
                <p style={{ fontSize: "14px", color: "#888", marginBottom: "28px" }}>Otel panelinizden profil ve odalarınızı yönetebilirsiniz.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
                  {[
                    { baslik: "Toplam Oda", deger: odalar.length, renk: "#534AB7" },
                    { baslik: "Aktif Oda", deger: odalar.filter(o => o.aktif).length, renk: "#0a7a3a" },
                    { baslik: "Pasif Oda", deger: odalar.filter(o => !o.aktif).length, renk: "#BA7517" },
                  ].map((k) => (
                    <div key={k.baslik} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                      <div style={{ fontSize: "28px", fontWeight: 700, color: k.renk, marginBottom: "8px" }}>{k.deger}</div>
                      <div style={{ fontSize: "13px", color: "#888" }}>{k.baslik}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button onClick={() => setAktifMenu("profil-duzenle")} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Profil Düzenle</button>
                  <button onClick={() => setAktifMenu("odalar")} style={{ background: "#fff", color: "#534AB7", border: "1px solid #534AB7", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>+ Oda Ekle</button>
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
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Otel Bilgileri</h2>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Tanıtım Yazısı</label>
                    <textarea rows={4} placeholder="Oteliniz hakkında kısa bir tanıtım yazısı..." value={profil.tanitim_yazisi} onChange={(e) => setProfil({ ...profil, tanitim_yazisi: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Telefon</label>
                      <input type="text" placeholder="+90 212 000 00 00" value={profil.telefon} onChange={(e) => setProfil({ ...profil, telefon: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Website</label>
                      <input type="text" placeholder="https://www.oteliniz.com" value={profil.website} onChange={(e) => setProfil({ ...profil, website: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Adres</label>
                    <input type="text" placeholder="Tam adresiniz..." value={profil.konum_adres} onChange={(e) => setProfil({ ...profil, konum_adres: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Enlem (Latitude)</label>
                      <input type="text" placeholder="örn: 41.0082" value={profil.konum_lat} onChange={(e) => setProfil({ ...profil, konum_lat: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Boylam (Longitude)</label>
                      <input type="text" placeholder="örn: 28.9784" value={profil.konum_lng} onChange={(e) => setProfil({ ...profil, konum_lng: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Google Maps URL</label>
                    <input type="text" placeholder="https://maps.google.com/..." value={profil.google_maps_url} onChange={(e) => setProfil({ ...profil, google_maps_url: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    <div style={{ fontSize: "11px", color: "#888", marginTop: "4px" }}>💡 Google Maps'te otelinizi arayın → Paylaş → Link kopyala</div>
                  </div>
                </div>

                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Sosyal Medya</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Instagram</label>
                      <input type="text" placeholder="@otel_adi" value={profil.instagram} onChange={(e) => setProfil({ ...profil, instagram: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Facebook</label>
                      <input type="text" placeholder="facebook.com/oteladi" value={profil.facebook} onChange={(e) => setProfil({ ...profil, facebook: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                </div>

                <button onClick={profilKaydet} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "12px 32px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 600 }}>
                  Profili Kaydet
                </button>
              </div>
            )}

            {aktifMenu === "odalar" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Oda & Fiyat Listesi</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Yeni Oda Ekle</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Oda Adı *</label>
                      <input type="text" placeholder="örn: Standart Oda, Deluxe Oda" value={yeniOda.oda_adi} onChange={(e) => setYeniOda({ ...yeniOda, oda_adi: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Kapasite (Kişi)</label>
                      <input type="number" placeholder="2" value={yeniOda.kapasite} onChange={(e) => setYeniOda({ ...yeniOda, kapasite: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Gecelik Fiyat *</label>
                      <input type="number" placeholder="0" value={yeniOda.fiyat} onChange={(e) => setYeniOda({ ...yeniOda, fiyat: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Para Birimi</label>
                      <select value={yeniOda.para_birimi} onChange={(e) => setYeniOda({ ...yeniOda, para_birimi: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", background: "#fff" }}>
                        <option>EUR</option><option>USD</option><option>TRY</option><option>GBP</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Açıklama</label>
                    <textarea rows={2} placeholder="Oda özellikleri, manzara, dahil olan hizmetler..." value={yeniOda.aciklama} onChange={(e) => setYeniOda({ ...yeniOda, aciklama: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Oda Fotoğrafı</label>
                    <input type="file" accept="image/*" onChange={async (e) => { const file = e.target.files?.[0]; if (file) { const url = await fotografYukle(file, "odalar"); if (url) setYeniOda({ ...yeniOda, fotograf: url }); } }} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", fontSize: "13px" }} />
                    {yeniOda.fotograf && <img src={yeniOda.fotograf} alt="Oda" style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "6px", marginTop: "8px" }} />}
                  </div>
                  <button onClick={odaEkle} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 600 }}>+ Oda Ekle</button>
                </div>

                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                  <div style={{ padding: "16px 20px", borderBottom: "1px solid #EEEDFE" }}>
                    <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", margin: 0 }}>Mevcut Odalar ({odalar.length})</h2>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", padding: "20px" }}>
                    {odalar.map((o) => (
                      <div key={o.id} style={{ border: "1px solid #EEEDFE", borderRadius: "10px", overflow: "hidden", opacity: o.aktif ? 1 : 0.6 }}>
                        {o.fotograf_url ? (
                          <img src={o.fotograf_url} alt={o.oda_adi} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "100%", height: "120px", background: "linear-gradient(135deg, #EEEDFE, #CECBF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>🏨</div>
                        )}
                        <div style={{ padding: "12px" }}>
                          <div style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{o.oda_adi}</div>
                          <div style={{ fontSize: "12px", color: "#888", marginBottom: "6px" }}>{o.kapasite} kişi</div>
                          <div style={{ fontSize: "14px", fontWeight: 700, color: "#534AB7", marginBottom: "8px" }}>{o.fiyat} {o.para_birimi}/gece</div>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button onClick={() => odaAktifToggle(o.id, o.aktif)} style={{ flex: 1, background: o.aktif ? "#fff8e1" : "#f0fff4", color: o.aktif ? "#BA7517" : "#0a7a3a", border: "none", padding: "5px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>
                              {o.aktif ? "Pasife Al" : "Aktife Al"}
                            </button>
                            <button onClick={() => odaSil(o.id)} style={{ flex: 1, background: "#fff0f0", color: "#c00", border: "none", padding: "5px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Sil</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {odalar.length === 0 && (
                    <div style={{ textAlign: "center", padding: "48px", color: "#888", fontSize: "13px" }}>Henüz oda eklenmemiş.</div>
                  )}
                </div>
              </div>
            )}

            {aktifMenu === "profil" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Otel Profilim</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "28px", maxWidth: "500px" }}>
                  {[
                    { etiket: "Otel Adı", deger: `${kullanici?.ad} ${kullanici?.soyad}` },
                    { etiket: "E-posta", deger: kullanici?.email },
                    { etiket: "Durum", deger: kullanici?.onaylandi ? "Onaylandı" : "Onay Bekleniyor" },
                    { etiket: "Toplam Oda", deger: `${odalar.length} oda` },
                    { etiket: "Adres", deger: kullanici?.konum_adres || "—" },
                  ].map((item) => (
                    <div key={item.etiket} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f5f5f5" }}>
                      <span style={{ fontSize: "13px", color: "#888" }}>{item.etiket}</span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#12103a" }}>{item.deger}</span>
                    </div>
                  ))}
                  {kullanici?.google_maps_url && (
                    <div style={{ marginTop: "16px" }}>
                      <a href={kullanici.google_maps_url} target="_blank" rel="noreferrer" style={{ background: "#534AB7", color: "#fff", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", textDecoration: "none", display: "inline-block" }}>
                        📍 Google Maps'te Görüntüle
                      </a>
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
