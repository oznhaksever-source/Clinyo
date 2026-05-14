"use client";
import { useState, useEffect, useRef } from "react";
import { useDil } from "../locales/context";

interface Mesaj {
  rol: "user" | "assistant";
  icerik: string;
}

export default function AIChat() {
  const [acik, setAcik] = useState(false);
  const [mesajlar, setMesajlar] = useState<Mesaj[]>([]);
  const [yazilan, setYazilan] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [onaylandı, setOnaylandi] = useState(false);
  const [mobil, setMobil] = useState(false);
  const altRef = useRef<HTMLDivElement>(null);
  const { dil } = useDil();

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  useEffect(() => {
    if (altRef.current) altRef.current.scrollIntoView({ behavior: "smooth" });
  }, [mesajlar, yukleniyor]);

  const metin = {
    tr: {
      baslik: "Medoqa AI Asistan",
      altBaslik: "Size nasıl yardımcı olabilirim?",
      onayBaslik: "AI Asistan Hakkında",
      onayMetin: "Medoqa AI Asistanı, sağlık turizmi konusunda genel bilgi vermek amacıyla tasarlanmıştır. Verilen bilgiler tıbbi tavsiye niteliği taşımamakta olup yalnızca bilgilendirme amaçlıdır. Kesin teşhis ve tedavi için mutlaka uzman hekime başvurunuz. Kişisel sağlık verilerinizi paylaşmaktan kaçınınız.",
      onayBtn: "Anladım, Devam Et",
      placeholder: "Mesajınızı yazın...",
      gonder: "Gönder",
      hosgeldin: "Merhaba! Ben Medoqa AI Asistanıyım 👋\n\nSize şu konularda yardımcı olabilirim:\n• Tedavi türleri hakkında bilgi\n• Türkiye'de sağlık turizmi\n• Platform nasıl çalışır\n• Klinik seçimi için ipuçları\n\nNasıl yardımcı olabilirim?",
      yasal: "⚠️ Bu asistan tıbbi tavsiye vermez.",
    },
    en: {
      baslik: "Medoqa AI Assistant",
      altBaslik: "How can I help you?",
      onayBaslik: "About AI Assistant",
      onayMetin: "The Medoqa AI Assistant is designed to provide general information about health tourism. The information provided does not constitute medical advice and is for informational purposes only. Please consult a specialist for definitive diagnosis and treatment. Avoid sharing personal health data.",
      onayBtn: "I Understand, Continue",
      placeholder: "Type your message...",
      gonder: "Send",
      hosgeldin: "Hello! I'm the Medoqa AI Assistant 👋\n\nI can help you with:\n• Information about treatment types\n• Health tourism in Turkey\n• How the platform works\n• Tips for choosing a clinic\n\nHow can I help you?",
      yasal: "⚠️ This assistant does not provide medical advice.",
    },
    de: {
      baslik: "Medoqa KI-Assistent",
      altBaslik: "Wie kann ich Ihnen helfen?",
      onayBaslik: "Über den KI-Assistenten",
      onayMetin: "Der Medoqa KI-Assistent wurde entwickelt, um allgemeine Informationen über Gesundheitstourismus bereitzustellen. Die bereitgestellten Informationen stellen keine medizinische Beratung dar. Bitte konsultieren Sie einen Spezialisten für Diagnose und Behandlung.",
      onayBtn: "Verstanden, Weiter",
      placeholder: "Nachricht eingeben...",
      gonder: "Senden",
      hosgeldin: "Hallo! Ich bin der Medoqa KI-Assistent 👋\n\nIch kann Ihnen helfen bei:\n• Informationen zu Behandlungsarten\n• Gesundheitstourismus in der Türkei\n• Wie die Plattform funktioniert\n• Tipps zur Klinikauswahl\n\nWie kann ich Ihnen helfen?",
      yasal: "⚠️ Dieser Assistent gibt keine medizinischen Ratschläge.",
    },
  };

  const m = metin[dil as keyof typeof metin] || metin.tr;

  const sistemPrompt = {
    tr: `Sen Medoqa sağlık turizmi platformunun AI asistanısın. Görevin hastalara ve platform kullanıcılarına yardımcı olmaktır.

MEDOQA HAKKINDA:
- Türkiye'nin sağlık turizmi platformu
- Onaylı klinikler: Sağlık Bakanlığı belgeli
- Blokeli ödeme sistemi: Para tedavi onaylanana kadar klinike geçmez
- Türkçe, İngilizce, Almanca destek
- Diş, saç ekimi, göz, estetik, ortopedi kategorileri
- Ücretsiz teklif alma imkânı
- Partner otel ve transfer hizmetleri

KURALLARIN:
1. Tıbbi teşhis KOYMA — sadece genel bilgi ver
2. Fiyat bilgisi verme — kliniklere yönlendir
3. Kısa ve net cevaplar ver (max 150 kelime)
4. Türkçe cevap ver
5. Her zaman platforma veya uzman hekime yönlendir
6. Samimi ve yardımsever ol`,

    en: `You are the AI assistant of Medoqa health tourism platform. Your role is to help patients and platform users.

ABOUT MEDOQA:
- Turkey's health tourism platform
- Verified clinics: Ministry of Health certified
- Escrow payment: Money stays safe until treatment is approved
- Turkish, English, German support
- Dental, hair transplant, eye, aesthetic, orthopedics categories
- Free quote requests
- Partner hotel and transfer services

YOUR RULES:
1. Do NOT make medical diagnoses — provide general info only
2. Don't give specific prices — direct to clinics
3. Give short, clear answers (max 150 words)
4. Always respond in English
5. Always direct to platform or specialist doctors
6. Be friendly and helpful`,

    de: `Du bist der KI-Assistent der Medoqa-Gesundheitstourismusplattform. Deine Aufgabe ist es, Patienten und Plattformnutzern zu helfen.

ÜBER MEDOQA:
- Türkische Gesundheitstourismusplattform
- Verifizierte Kliniken: Vom Gesundheitsministerium zertifiziert
- Treuhandzahlung: Geld bleibt sicher bis Behandlung genehmigt
- Türkisch, Englisch, Deutsch Support
- Dental, Haartransplantation, Auge, Ästhetik, Orthopädie
- Kostenlose Angebotsanfragen

DEINE REGELN:
1. Stelle KEINE medizinischen Diagnosen
2. Gib keine spezifischen Preise an
3. Gib kurze, klare Antworten (max 150 Wörter)
4. Antworte immer auf Deutsch
5. Verweise immer auf die Plattform oder Spezialisten`,
  };

  async function mesajGonder() {
    if (!yazilan.trim() || yukleniyor) return;
    const yeniMesaj: Mesaj = { rol: "user", icerik: yazilan.trim() };
    const guncellenmis = [...mesajlar, yeniMesaj];
    setMesajlar(guncellenmis);
    setYazilan("");
    setYukleniyor(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "", "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 400,
          system: sistemPrompt[dil as keyof typeof sistemPrompt] || sistemPrompt.tr,
          messages: guncellenmis.map(msg => ({
            role: msg.rol,
            content: msg.icerik,
          })),
        }),
      });
      const data = await response.json();
      const cevap = data.content?.[0]?.text || "Bir hata oluştu, lütfen tekrar deneyin.";
      setMesajlar(prev => [...prev, { rol: "assistant", icerik: cevap }]);
    } catch {
      setMesajlar(prev => [...prev, { rol: "assistant", icerik: "Bağlantı hatası oluştu. Lütfen tekrar deneyin." }]);
    }
    setYukleniyor(false);
  }

  function chatAc() {
    setAcik(true);
    if (mesajlar.length === 0) {
      setMesajlar([{ rol: "assistant", icerik: m.hosgeldin }]);
    }
  }

  return (
    <>
      {/* Chat balonu butonu */}
      {!acik && (
        <button
          onClick={chatAc}
          style={{ position: "fixed", bottom: "24px", right: "24px", width: "60px", height: "60px", borderRadius: "50%", background: "linear-gradient(135deg, #534AB7 0%, #7F77DD 100%)", border: "none", cursor: "pointer", boxShadow: "0 8px 32px rgba(83,74,183,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, transition: "transform 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          {/* AI badge */}
          <div style={{ position: "absolute", top: "-4px", right: "-4px", background: "#059669", color: "#fff", fontSize: "8px", fontWeight: 700, padding: "2px 5px", borderRadius: "8px", fontFamily: "sans-serif" }}>AI</div>
        </button>
      )}

      {/* Chat penceresi */}
      {acik && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", width: mobil ? "calc(100vw - 32px)" : "380px", height: mobil ? "80vh" : "560px", background: "#fff", borderRadius: "20px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", zIndex: 999, overflow: "hidden", border: "1px solid #eeecff" }}>

          {/* Header */}
          <div style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", background: "#534AB7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🤖</div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{m.baslik}</div>
                <div style={{ fontSize: "11px", color: "#8b8fc8", display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#059669" }} />
                  {m.altBaslik}
                </div>
              </div>
            </div>
            <button onClick={() => setAcik(false)} style={{ background: "none", border: "none", color: "#8b8fc8", cursor: "pointer", fontSize: "20px", lineHeight: 1 }}>×</button>
          </div>

          {/* Onay ekranı */}
          {!onaylandı ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>🤖</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f0d2e", marginBottom: "12px", textAlign: "center" }}>{m.onayBaslik}</h3>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, textAlign: "center", marginBottom: "24px" }}>{m.onayMetin}</p>
              <button onClick={() => setOnaylandi(true)} style={{ background: "#534AB7", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: 600, width: "100%" }}>
                {m.onayBtn}
              </button>
            </div>
          ) : (
            <>
              {/* Mesajlar */}
              <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {mesajlar.map((msg, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: msg.rol === "user" ? "flex-end" : "flex-start" }}>
                    {msg.rol === "assistant" && (
                      <div style={{ width: "28px", height: "28px", background: "#534AB7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", marginRight: "8px", flexShrink: 0, alignSelf: "flex-end" }}>🤖</div>
                    )}
                    <div style={{ maxWidth: "78%", padding: "10px 14px", borderRadius: msg.rol === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: msg.rol === "user" ? "#534AB7" : "#f8f9ff", color: msg.rol === "user" ? "#fff" : "#0f0d2e", fontSize: "13px", lineHeight: 1.6, border: msg.rol === "assistant" ? "1px solid #eeecff" : "none", whiteSpace: "pre-wrap" }}>
                      {msg.icerik}
                    </div>
                  </div>
                ))}
                {yukleniyor && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "28px", height: "28px", background: "#534AB7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🤖</div>
                    <div style={{ background: "#f8f9ff", border: "1px solid #eeecff", borderRadius: "18px 18px 18px 4px", padding: "10px 16px", display: "flex", gap: "4px" }}>
                      {[0,1,2].map(i => (
                        <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#534AB7", animation: `bounce 1s ${i*0.2}s infinite` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={altRef} />
              </div>

              {/* Yasal uyarı */}
              <div style={{ padding: "6px 16px", background: "#fffbeb", borderTop: "1px solid #fef3c7" }}>
                <p style={{ fontSize: "10px", color: "#92400e", margin: 0 }}>{m.yasal}</p>
              </div>

              {/* Input */}
              <div style={{ padding: "12px 16px", borderTop: "1px solid #f0eeff", display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  value={yazilan}
                  onChange={e => setYazilan(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") mesajGonder(); }}
                  placeholder={m.placeholder}
                  style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", outline: "none", fontFamily: "inherit" }}
                />
                <button onClick={mesajGonder} disabled={yukleniyor || !yazilan.trim()} style={{ background: yazilan.trim() ? "#534AB7" : "#e5e7eb", color: yazilan.trim() ? "#fff" : "#9ca3af", border: "none", width: "40px", height: "40px", borderRadius: "10px", cursor: yazilan.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
