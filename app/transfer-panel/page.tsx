"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";

export default function TransferPanel() {
  const [aktifMenu, setAktifMenu] = useState("ozet");
  const [kullanici, setKullanici] = useState<any>(null);
  const [araclar, setAraclar] = useState<any[]>([]);
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
  });

  const [yeniArac, setYeniArac] = useState({
    arac_tipi: "Sedan",
    kapasite: "4",
    fiyat: "",
    para_birimi: "EUR",
    aciklama: "",
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
      });
    }
    const { data: aracData } = await supabase.from("transfer_araclar").select("*").eq("transfer_id", user.id).order("olusturma_tarihi");
    setAraclar(aracData || []);
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

  async function aracEkle() {
    if (!yeniArac.fiyat) { setMesaj("Fiyat zorunludur!"); return; }
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("transfer_araclar").insert({
      transfer_id: user?.id,
      arac_tipi: yeniArac.arac_tipi,
      kapasite: parseInt(yeniArac.kapasite),
      fiyat: parseFloat(yeniArac.fiyat),
      para_birimi: yeniArac.para_birimi,
      aciklama: yeniArac.aciklama,
    });
    if (error) { setMesaj("Hata: " + error.message); }
    else { setMesaj("Araç eklendi!"); setYeniArac({ arac_tipi: "Sedan", kapasite: "4", fiyat: "", para_birimi: "EUR", aciklama: "" }); veriYukle(); }
    setTimeout(() => setMesaj(""), 3000);
  }

  async function aracSil(id: string) {
    if (!confirm("Bu aracı silmek istediğinize emin misiniz?")) return;
    await supabase.from("transfer_araclar").delete().eq("id", id);
    veriYukle();
  }

  async function aracAktifToggle(id: string, aktif: boolean) {
    await supabase.from("transfer_araclar").update({ aktif: !aktif }).eq("id", id);
    veriYukle();
  }

  async function cikisYap() {
    await supabase.auth.signOut();
    window.location.href = "/giris";
  }

  const aracTipleri = ["Sedan", "Van", "VIP Sedan", "VIP Van", "Limuzin", "Minibüs", "VIP Minibüs", "Otobüs"];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif", display: "flex" }}>
      <div style={{ width: "220px", background: "#12103a", display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1e1b4b" }}>
          <a href="/" style={{ fontSize: "20px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>
            med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
          </a>
          <div style={{ fontSize: "11px", color: "#6b6fa8", marginTop: "4px" }}>Transfer Paneli</div>
        </div>
        {kullanici && (
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e1b4b" }}>
            <div style={{ width: "36px", height: "36px", background: "#BA7517", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "14px", marginBottom: "8px" }}>
              {kullanici.ad?.[0]?.toUpperCase() || "T"}
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
            { id: "araclar", ad: "Araç & Fiyat Listesi" },
            { id: "profil", ad: "Firma Profilim" },
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
                <p style={{ fontSize: "13px", color: "#666" }}>Transfer firması hesabınız admin tarafından henüz onaylanmamış.</p>
              </div>
            )}

            {aktifMenu === "ozet" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>Hoş Geldiniz, {kullanici?.ad}! 👋</h1>
                <p style={{ fontSize: "14px", color: "#888", marginBottom: "28px" }}>Transfer panelinizden profil ve araçlarınızı yönetebilirsiniz.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
                  {[
                    { baslik: "Toplam Araç", deger: araclar.length, renk: "#534AB7" },
                    { baslik: "Aktif Araç", deger: araclar.filter(a => a.aktif).length, renk: "#0a7a3a" },
                    { baslik: "Pasif Araç", deger: araclar.filter(a => !a.aktif).length, renk: "#BA7517" },
                  ].map((k) => (
                    <div key={k.baslik} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
                      <div style={{ fontSize: "28px", fontWeight: 700, color: k.renk, marginBottom: "8px" }}>{k.deger}</div>
                      <div style={{ fontSize: "13px", color: "#888" }}>{k.baslik}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button onClick={() => setAktifMenu("profil-duzenle")} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>Profil Düzenle</button>
                  <button onClick={() => setAktifMenu("araclar")} style={{ background: "#fff", color: "#534AB7", border: "1px solid #534AB7", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>+ Araç Ekle</button>
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
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Firma Bilgileri</h2>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Firma Tanıtım Yazısı</label>
                    <textarea rows={4} placeholder="Firmanız hakkında kısa bir tanıtım yazısı..." value={profil.tanitim_yazisi} onChange={(e) => setProfil({ ...profil, tanitim_yazisi: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Telefon</label>
                      <input type="text" placeholder="+90 212 000 00 00" value={profil.telefon} onChange={(e) => setProfil({ ...profil, telefon: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Website</label>
                      <input type="text" placeholder="https://www.firmaniz.com" value={profil.website} onChange={(e) => setProfil({ ...profil, website: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Adres / Hizmet Bölgesi</label>
                    <input type="text" placeholder="İstanbul, Türkiye" value={profil.konum_adres} onChange={(e) => setProfil({ ...profil, konum_adres: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Google Maps URL</label>
                    <input type="text" placeholder="https://maps.google.com/..." value={profil.google_maps_url} onChange={(e) => setProfil({ ...profil, google_maps_url: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                </div>

                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "20px" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Sosyal Medya</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Instagram</label>
                      <input type="text" placeholder="@firma_adi" value={profil.instagram} onChange={(e) => setProfil({ ...profil, instagram: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Facebook</label>
                      <input type="text" placeholder="facebook.com/firma" value={profil.facebook} onChange={(e) => setProfil({ ...profil, facebook: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                </div>

                <button onClick={profilKaydet} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "12px 32px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 600 }}>
                  Profili Kaydet
                </button>
              </div>
            )}

            {aktifMenu === "araclar" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Araç & Fiyat Listesi</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "16px" }}>Yeni Araç Ekle</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Araç Tipi *</label>
                      <select value={yeniArac.arac_tipi} onChange={(e) => setYeniArac({ ...yeniArac, arac_tipi: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", background: "#fff" }}>
                        {aracTipleri.map(a => <option key={a}>{a}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Kapasite (Kişi)</label>
                      <input type="number" placeholder="4" value={yeniArac.kapasite} onChange={(e) => setYeniArac({ ...yeniArac, kapasite: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Tek Yön Fiyat *</label>
                      <input type="number" placeholder="0" value={yeniArac.fiyat} onChange={(e) => setYeniArac({ ...yeniArac, fiyat: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Para Birimi</label>
                      <select value={yeniArac.para_birimi} onChange={(e) => setYeniArac({ ...yeniArac, para_birimi: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", background: "#fff" }}>
                        <option>EUR</option><option>USD</option><option>TRY</option><option>GBP</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>Açıklama</label>
                    <textarea rows={2} placeholder="Araç özellikleri, dahil olan hizmetler..." value={yeniArac.aciklama} onChange={(e) => setYeniArac({ ...yeniArac, aciklama: e.target.value })} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", fontSize: "13px", outline: "none", resize: "none", boxSizing: "border-box" }} />
                  </div>
                  <button onClick={aracEkle} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 600 }}>+ Araç Ekle</button>
                </div>

                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                  <div style={{ padding: "16px 20px", borderBottom: "1px solid #EEEDFE" }}>
                    <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", margin: 0 }}>Mevcut Araçlar ({araclar.length})</h2>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f9fafb" }}>
                        <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Araç</th>
                        <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Kapasite</th>
                        <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Fiyat</th>
                        <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>Durum</th>
                        <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", color: "#888", fontWeight: 600 }}>İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {araclar.map((a, i) => (
                        <tr key={a.id} style={{ borderTop: "1px solid #EEEDFE", background: i % 2 === 0 ? "#fff" : "#fafafa", opacity: a.aktif ? 1 : 0.5 }}>
                          <td style={{ padding: "10px 16px" }}>
                            <div style={{ fontSize: "13px", fontWeight: 600, color: "#12103a" }}>{a.arac_tipi}</div>
                            {a.aciklama && <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{a.aciklama}</div>}
                          </td>
                          <td style={{ padding: "10px 16px", fontSize: "13px", color: "#888" }}>{a.kapasite} kişi</td>
                          <td style={{ padding: "10px 16px", fontSize: "14px", fontWeight: 700, color: "#534AB7" }}>{a.fiyat} {a.para_birimi}/tek yön</td>
                          <td style={{ padding: "10px 16px" }}>
                            <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: a.aktif ? "#f0fff4" : "#f9fafb", color: a.aktif ? "#0a7a3a" : "#888" }}>
                              {a.aktif ? "Aktif" : "Pasif"}
                            </span>
                          </td>
                          <td style={{ padding: "10px 16px" }}>
                            <div style={{ display: "flex", gap: "6px" }}>
                              <button onClick={() => aracAktifToggle(a.id, a.aktif)} style={{ background: a.aktif ? "#fff8e1" : "#f0fff4", color: a.aktif ? "#BA7517" : "#0a7a3a", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>
                                {a.aktif ? "Pasife Al" : "Aktife Al"}
                              </button>
                              <button onClick={() => aracSil(a.id)} style={{ background: "#fff0f0", color: "#c00", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}>Sil</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {araclar.length === 0 && (
                    <div style={{ textAlign: "center", padding: "48px", color: "#888", fontSize: "13px" }}>Henüz araç eklenmemiş.</div>
                  )}
                </div>
              </div>
            )}

            {aktifMenu === "profil" && (
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "24px" }}>Firma Profilim</h1>
                <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "28px", maxWidth: "500px" }}>
                  {[
                    { etiket: "Firma Adı", deger: `${kullanici?.ad} ${kullanici?.soyad}` },
                    { etiket: "E-posta", deger: kullanici?.email },
                    { etiket: "Durum", deger: kullanici?.onaylandi ? "Onaylandı" : "Onay Bekleniyor" },
                    { etiket: "Toplam Araç", deger: `${araclar.length} araç` },
                    { etiket: "Hizmet Bölgesi", deger: kullanici?.konum_adres || "—" },
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
