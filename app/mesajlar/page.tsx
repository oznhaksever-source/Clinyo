"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";

export default function Mesajlar() {
  const [kullanici, setKullanici] = useState<any>(null);
  const [konusmalar, setKonusmalar] = useState<any[]>([]);
  const [aktifKonusma, setAktifKonusma] = useState<any>(null);
  const [mesajlar, setMesajlar] = useState<any[]>([]);
  const [yeniMesaj, setYeniMesaj] = useState("");
  const [yukleniyor, setYukleniyor] = useState(true);
  const [mobil, setMobil] = useState(false);
  const [mobilPanel, setMobilPanel] = useState<"liste" | "mesaj">("liste");
  const [yeniKonusmaAcik, setYeniKonusmaAcik] = useState(false);
  const [klinikler, setKlinikler] = useState<any[]>([]);
  const [ceviriYukleniyor, setCeviriYukleniyor] = useState<Record<string, boolean>>({});
  const [ceviriMetinleri, setCeviriMetinleri] = useState<Record<string, string>>({});
  const altRef = useRef<HTMLDivElement>(null);
  const { dil } = useDil();
  const supabase = createClient();

  const metin = {
    tr: { baslik: "Mesajlar", mesajYaz: "Mesaj yaz...", gonder: "Gönder", konusmaYok: "Henüz mesajınız yok.", secin: "Bir konuşma seçin", bugun: "Bugün", onceki: "Önceki", okunmadi: "Okunmadı", geri: "← Geri" },
    en: { baslik: "Messages", mesajYaz: "Type a message...", gonder: "Send", konusmaYok: "No messages yet.", secin: "Select a conversation", bugun: "Today", onceki: "Earlier", okunmadi: "Unread", geri: "← Back" },
    de: { baslik: "Nachrichten", mesajYaz: "Nachricht schreiben...", gonder: "Senden", konusmaYok: "Noch keine Nachrichten.", secin: "Wählen Sie ein Gespräch", bugun: "Heute", onceki: "Früher", okunmadi: "Ungelesen", geri: "← Zurück" },
  };
  const m = metin[dil];

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  useEffect(() => {
    async function yukle() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/giris"; return; }
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setKullanici(profile);

      // Konuşmaları getir — hem gönderilen hem alınan
      const { data: gelen } = await supabase.from("mesajlar")
        .select("*, gonderen:profiles!mesajlar_gonderen_id_fkey(id, ad, soyad, hesap_turu), alici:profiles!mesajlar_alici_id_fkey(id, ad, soyad, hesap_turu)")
        .or(`gonderen_id.eq.${user.id},alici_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

      if (gelen) {
        // Benzersiz konuşmaları grupla
        const gruplar: Record<string, any> = {};
        for (const msg of gelen) {
          const diger = msg.gonderen_id === user.id ? msg.alici : msg.gonderen;
          const key = diger.id;
          if (!gruplar[key]) {
            gruplar[key] = { kisi: diger, sonMesaj: msg, okunmamis: 0 };
          }
          if (!msg.okundu && msg.alici_id === user.id) {
            gruplar[key].okunmamis++;
          }
        }
        setKonusmalar(Object.values(gruplar));
      }
      // Onaylı klinikleri getir
      const { data: klinikData } = await supabase.from("profiles")
        .select("id, ad, soyad, hesap_turu")
        .eq("hesap_turu", "klinik")
        .eq("onaylandi", true);
      setKlinikler(klinikData || []);

      setYukleniyor(false);
    }
    yukle();
  }, []);

  useEffect(() => {
    if (altRef.current) altRef.current.scrollIntoView({ behavior: "smooth" });
  }, [mesajlar]);

  async function konusmaAc(kisi: any) {
    setAktifKonusma(kisi);
    if (mobil) setMobilPanel("mesaj");

    const { data } = await supabase.from("mesajlar")
      .select("*, gonderen:profiles!mesajlar_gonderen_id_fkey(id, ad, soyad)")
      .or(`and(gonderen_id.eq.${kullanici.id},alici_id.eq.${kisi.id}),and(gonderen_id.eq.${kisi.id},alici_id.eq.${kullanici.id})`)
      .order("created_at", { ascending: true });

    setMesajlar(data || []);

    // Okunmamışları okundu yap
    await supabase.from("mesajlar")
      .update({ okundu: true })
      .eq("alici_id", kullanici.id)
      .eq("gonderen_id", kisi.id);
  }

  async function mesajGonder() {
    if (!yeniMesaj.trim() || !aktifKonusma) return;
    const { data } = await supabase.from("mesajlar").insert({
      gonderen_id: kullanici.id,
      alici_id: aktifKonusma.id,
      mesaj: yeniMesaj.trim(),
    }).select("*, gonderen:profiles!mesajlar_gonderen_id_fkey(id, ad, soyad)").single();

    if (data) {
      setMesajlar(prev => [...prev, data]);
      setYeniMesaj("");
    }
  }

  async function mesajCevir(mesajId: string, metin: string) {
    setCeviriYukleniyor(prev => ({ ...prev, [mesajId]: true }));
    try {
      const hedefDil = dil === "tr" ? "Türkçe" : dil === "en" ? "English" : "Deutsch";
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          messages: [{
            role: "user",
            content: `Translate the following message to ${hedefDil}. Only return the translated text, nothing else:\n\n${metin}`
          }]
        })
      });
      const data = await response.json();
      const cevirilen = data.content?.[0]?.text || metin;
      setCeviriMetinleri(prev => ({ ...prev, [mesajId]: cevirilen }));
    } catch {
      setCeviriMetinleri(prev => ({ ...prev, [mesajId]: "Çeviri yapılamadı." }));
    }
    setCeviriYukleniyor(prev => ({ ...prev, [mesajId]: false }));
  }

  function zamanFormatla(tarih: string) {
    const d = new Date(tarih);
    const simdi = new Date();
    const fark = simdi.getTime() - d.getTime();
    if (fark < 86400000) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return d.toLocaleDateString();
  }

  if (yukleniyor) return (
    <main style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh", color: "#64748b" }}>Yükleniyor...</div>
    </main>
  );

  return (
    <main style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />

      {/* Yeni Konuşma Modalı */}
      {yeniKonusmaAcik && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", width: "100%", maxWidth: "480px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f0d2e", margin: 0 }}>Yeni Konuşma Başlat</h2>
              <button onClick={() => setYeniKonusmaAcik(false)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>×</button>
            </div>
            <p style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>Mesaj göndermek istediğiniz kliniği seçin:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "300px", overflowY: "auto" }}>
              {klinikler.map(k => (
                <div key={k.id} onClick={async () => {
                  if (!kullanici?.id) { alert("Oturum bulunamadı!"); return; }
                  const { error } = await supabase.from("mesajlar").insert({
                    gonderen_id: kullanici.id,
                    alici_id: k.id,
                    mesaj: dil === "tr" ? "Merhaba, bilgi almak istiyorum." : dil === "en" ? "Hello, I would like to get some information." : "Hallo, ich möchte gerne Informationen erhalten.",
                    okundu: false,
                  });
                  if (error) { alert("Hata: " + error.message); return; }
                  setYeniKonusmaAcik(false);
                  window.location.reload();
                }} style={{ padding: "14px 16px", border: "1px solid #EEEDFE", borderRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", background: "#f8f9ff" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, flexShrink: 0 }}>
                    {k.ad?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f0d2e" }}>🏥 {k.ad} {k.soyad}</div>
                    <div style={{ fontSize: "12px", color: "#94a3b8" }}>Klinik</div>
                  </div>
                </div>
              ))}
              {klinikler.length === 0 && (
                <div style={{ textAlign: "center", padding: "32px", color: "#94a3b8", fontSize: "13px" }}>Onaylı klinik bulunamadı.</div>
              )}
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: mobil ? "16px" : "32px" }}>
        <h1 style={{ fontSize: mobil ? "22px" : "28px", fontWeight: 800, color: "#0f0d2e", marginBottom: "24px" }}>{m.baslik}</h1>

        <div style={{ display: "grid", gridTemplateColumns: mobil ? "1fr" : "320px 1fr", gap: "20px", height: mobil ? "auto" : "680px" }}>

          {/* Sol: Konuşma listesi */}
          {(!mobil || mobilPanel === "liste") && (
            <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #eeecff", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "20px", borderBottom: "1px solid #f0eeff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#0f0d2e", margin: 0 }}>{m.baslik}</h2>
                {kullanici?.hesap_turu === "hasta" && (
                  <button onClick={() => setYeniKonusmaAcik(true)} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>
                    + Yeni
                  </button>
                )}
              </div>
              <div style={{ flex: 1, overflowY: "auto" }}>
                {konusmalar.length === 0 ? (
                  <div style={{ padding: "40px 20px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>{m.konusmaYok}</div>
                ) : (
                  konusmalar.map(k => (
                    <div key={k.kisi.id} onClick={() => konusmaAc(k.kisi)} style={{ padding: "16px 20px", cursor: "pointer", borderBottom: "1px solid #f8f9ff", background: aktifKonusma?.id === k.kisi.id ? "#f0eeff" : "#fff", display: "flex", gap: "12px", alignItems: "center" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "16px", flexShrink: 0 }}>
                        {k.kisi.ad?.[0]?.toUpperCase()}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "#0f0d2e" }}>{k.kisi.ad} {k.kisi.soyad}</span>
                          <span style={{ fontSize: "11px", color: "#94a3b8" }}>{zamanFormatla(k.sonMesaj.created_at)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "12px", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "160px" }}>{k.sonMesaj.mesaj}</span>
                          {k.okunmamis > 0 && (
                            <span style={{ background: "#534AB7", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "2px 7px", borderRadius: "10px" }}>{k.okunmamis}</span>
                          )}
                        </div>
                        <span style={{ fontSize: "11px", color: "#94a3b8" }}>{k.kisi.hesap_turu}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Sağ: Mesaj alanı */}
          {(!mobil || mobilPanel === "mesaj") && (
            <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #eeecff", display: "flex", flexDirection: "column", overflow: "hidden" }}>
              {aktifKonusma ? (
                <>
                  {/* Header */}
                  <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0eeff", display: "flex", alignItems: "center", gap: "12px" }}>
                    {mobil && (
                      <button onClick={() => setMobilPanel("liste")} style={{ background: "none", border: "none", cursor: "pointer", color: "#534AB7", fontSize: "14px", fontWeight: 600 }}>{m.geri}</button>
                    )}
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#534AB7", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
                      {aktifKonusma.ad?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f0d2e" }}>{aktifKonusma.ad} {aktifKonusma.soyad}</div>
                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>{aktifKonusma.hesap_turu}</div>
                    </div>
                  </div>

                  {/* Mesajlar */}
                  <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {mesajlar.map(msg => {
                      const benimMi = msg.gonderen_id === kullanici.id;
                      return (
                        <div key={msg.id} style={{ display: "flex", justifyContent: benimMi ? "flex-end" : "flex-start", flexDirection: "column", alignItems: benimMi ? "flex-end" : "flex-start" }}>
                          <div style={{ maxWidth: "70%", padding: "10px 16px", borderRadius: benimMi ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: benimMi ? "#534AB7" : "#f8f9ff", color: benimMi ? "#fff" : "#0f0d2e", fontSize: "14px", lineHeight: 1.5, border: benimMi ? "none" : "1px solid #eeecff" }}>
                            {msg.mesaj}
                            {ceviriMetinleri[msg.id] && (
                              <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: benimMi ? "1px solid rgba(255,255,255,0.2)" : "1px solid #eeecff", fontSize: "13px", color: benimMi ? "rgba(255,255,255,0.85)" : "#534AB7", fontStyle: "italic" }}>
                                🌐 {ceviriMetinleri[msg.id]}
                              </div>
                            )}
                            <div style={{ fontSize: "10px", color: benimMi ? "rgba(255,255,255,0.6)" : "#94a3b8", marginTop: "4px", textAlign: "right" }}>
                              {zamanFormatla(msg.created_at)}
                            </div>
                          </div>
                          <button
                            onClick={() => ceviriMetinleri[msg.id] ? setCeviriMetinleri(prev => { const y = {...prev}; delete y[msg.id]; return y; }) : mesajCevir(msg.id, msg.mesaj)}
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "11px", color: "#94a3b8", padding: "2px 8px", marginTop: "2px" }}
                          >
                            {ceviriYukleniyor[msg.id] ? "⏳" : ceviriMetinleri[msg.id] ? "✕ Çeviriyi Gizle" : "🌐 Çevir"}
                          </button>
                        </div>
                      );
                    })}
                    <div ref={altRef} />
                  </div>

                  {/* Mesaj yazma */}
                  <div style={{ padding: "16px 20px", borderTop: "1px solid #f0eeff", display: "flex", gap: "10px" }}>
                    <input
                      type="text"
                      value={yeniMesaj}
                      onChange={e => setYeniMesaj(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") mesajGonder(); }}
                      placeholder={m.mesajYaz}
                      style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "12px", padding: "12px 16px", fontSize: "14px", outline: "none", fontFamily: "inherit" }}
                    />
                    <button onClick={mesajGonder} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "12px 20px", borderRadius: "12px", fontSize: "14px", cursor: "pointer", fontWeight: 600 }}>
                      {m.gonder}
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", color: "#94a3b8" }}>
                  <div style={{ fontSize: "48px" }}>💬</div>
                  <div style={{ fontSize: "15px" }}>{m.secin}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
