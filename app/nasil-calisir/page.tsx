"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NasilCalisir() {
  const [istatistik, setIstatistik] = useState({ klinik: 0, hasta: 0, otel: 0, transfer: 0 });
  const { dil } = useDil();
  const supabase = createClient();

  useEffect(() => {
    async function veriYukle() {
      const { count: k } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "klinik").eq("onaylandi", true);
      const { count: h } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "hasta");
      const { count: o } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "otel").eq("onaylandi", true);
      const { count: t } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "transfer").eq("onaylandi", true);
      setIstatistik({ klinik: k || 0, hasta: h || 0, otel: o || 0, transfer: t || 0 });
    }
    veriYukle();
  }, []);

  const icerik = {
    tr: {
      badge: "Güvenli · Şeffaf · Kolay",
      baslik: "Medoqa Nasıl Çalışır?",
      altBaslik: "Tedavinizden oteline, transferinizden güvenli ödemeye kadar her şey tek platformda.",
      adimlarBaslik: "6 Adımda Tedaviniz Tamamlansın",
      nedenBaslik: "Gerçek Rakamlar",
      nedenAlt: "Platformumuzdaki güncel istatistikler",
      sssBaslik: "Sıkça Sorulan Sorular",
      cagriBaslik: "Hemen Başlayın",
      cagriAlt: "Ücretsiz teklif alın, en iyi kliniği seçin, güvenle gelin.",
      teklifAl: "Ücretsiz Teklif Al",
      klinikleriIncele: "Klinikleri İncele",
      istatistik: ["Onaylı Klinik", "Kayıtlı Hasta", "Partner Otel", "Transfer Firması"],
      adimlar: [
        { foto: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop", baslik: "Tedavini Seç", aciklama: "Diş, saç ekimi, göz, estetik veya ortopedi — ihtiyacın olan tedaviyi belirle. 500+ tedavi seçeneği mevcut.", detaylar: ["500+ tedavi seçeneği", "Detaylı tedavi bilgileri", "Fiyat aralıkları"] },
        { foto: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop", baslik: "Ücretsiz Teklif Al", aciklama: "Fotoğraf veya röntgenini yükle. Onaylı klinikler 2-4 saat içinde kişiselleştirilmiş teklif gönderir.", detaylar: ["Tamamen ücretsiz", "2-4 saat içinde yanıt", "Birden fazla klinikten"] },
        { foto: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop", baslik: "Teklifleri Karşılaştır", aciklama: "Fiyat, içerik ve klinik profillerini yan yana incele. Yorumları oku, baskı olmadan en iyisini seç.", detaylar: ["Yan yana karşılaştırma", "Doğrulanmış yorumlar", "Şeffaf fiyatlandırma"] },
        { foto: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop", baslik: "Otel & Transfer Seç", aciklama: "Kliniğe yakın partner otelleri incele. Havalimanı transferini platforma entegre planla.", detaylar: ["Kliniğe yakın oteller", "Havalimanı transferi", "Paket fiyat avantajı"] },
        { foto: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop", baslik: "Güvenli Öde", aciklama: "Ödemen güvenli hesabımızda bekler. Tedavin tamamlanıp sen onaylayana kadar kliniğe geçmez.", detaylar: ["Blokeli ödeme sistemi", "Sen onaylamadan geçmez", "Ek işlem güvencesi"] },
        { foto: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop", baslik: "Deneyimini Paylaş", aciklama: "Tedavi sonrası yorumunu yaz. Diğer hastalara yol göster, platforma katkıda bulun.", detaylar: ["Doğrulanmış yorumlar", "Puan sistemi", "Diğer hastalara yardım et"] },
      ],
      sorular: [
        { soru: "Medoqa ücretsiz mi?", cevap: "Evet! Hastalar için Medoqa tamamen ücretsizdir. Teklif almak, karşılaştırmak ve kliniklerle iletişim kurmak için hiçbir ücret ödemezsiniz." },
        { soru: "Klinikler nasıl doğrulanır?", cevap: "Tüm klinikler platformumuza katılmadan önce Sağlık Bakanlığı lisanslarını, doktor sertifikalarını ve sigorta belgelerini sunar. Admin onayı olmadan klinikler aktif olamaz." },
        { soru: "Blokeli ödeme sistemi nasıl çalışır?", cevap: "Ödemeniz platformumuzda güvenle tutulur. Tedaviniz tamamlanıp siz onaylayana kadar kliniğe geçmez. Bu sayede tedaviden memnun kalmazsanız paranız güvende." },
        { soru: "Ek işlemler için ekstra ücret ödemek zorunda mıyım?", cevap: "Hayır! Klinik ek işlem önerecekse önce sizden onay almak zorundadır. Siz onaylamadan fiyata eklenemez, işlem yapılamaz." },
        { soru: "Hangi ülkelerden hizmet veriyorsunuz?", cevap: "Medoqa global bir platformdur. Dünyanın her yerinden hasta kabul eden kliniklerle çalışıyoruz." },
        { soru: "Dil desteği var mı?", cevap: "Evet! Platform Türkçe, İngilizce ve Almanca olarak kullanılabilir. Daha fazla dil desteği yakında eklenecek." },
      ],
    },
    en: {
      badge: "Safe · Transparent · Easy",
      baslik: "How Does Medoqa Work?",
      altBaslik: "From treatment to hotel, from transfer to secure payment — everything in one platform.",
      adimlarBaslik: "Complete Your Treatment in 6 Steps",
      nedenBaslik: "Real Numbers",
      nedenAlt: "Current statistics on our platform",
      sssBaslik: "Frequently Asked Questions",
      cagriBaslik: "Get Started Now",
      cagriAlt: "Get a free quote, choose the best clinic, come safely.",
      teklifAl: "Get Free Quote",
      klinikleriIncele: "Explore Clinics",
      istatistik: ["Verified Clinic", "Registered Patient", "Partner Hotel", "Transfer Company"],
      adimlar: [
        { foto: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop", baslik: "Choose Your Treatment", aciklama: "Dental, hair transplant, eye, aesthetic or orthopedics — identify the treatment you need. 500+ treatment options available.", detaylar: ["500+ treatment options", "Detailed treatment info", "Price ranges"] },
        { foto: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop", baslik: "Get Free Quote", aciklama: "Upload your photo or X-ray. Verified clinics send personalized quotes within 2-4 hours.", detaylar: ["Completely free", "Response within 2-4 hours", "From multiple clinics"] },
        { foto: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop", baslik: "Compare Quotes", aciklama: "Review price, content and clinic profiles side by side. Read reviews, choose the best without pressure.", detaylar: ["Side-by-side comparison", "Verified reviews", "Transparent pricing"] },
        { foto: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop", baslik: "Choose Hotel & Transfer", aciklama: "Browse partner hotels near the clinic. Plan airport transfer integrated into the platform.", detaylar: ["Hotels near clinic", "Airport transfer", "Package deal advantage"] },
        { foto: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop", baslik: "Pay Safely", aciklama: "Your payment waits in our secure account. It doesn't go to the clinic until your treatment is complete and you approve.", detaylar: ["Escrow payment system", "No payment without approval", "Extra procedure protection"] },
        { foto: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop", baslik: "Share Your Experience", aciklama: "Write a review after treatment. Guide other patients, contribute to the platform.", detaylar: ["Verified reviews", "Rating system", "Help other patients"] },
      ],
      sorular: [
        { soru: "Is Medoqa free?", cevap: "Yes! Medoqa is completely free for patients. You pay nothing to receive quotes, compare, and communicate with clinics." },
        { soru: "How are clinics verified?", cevap: "All clinics submit their Ministry of Health licenses, doctor certificates and insurance documents before joining. Clinics cannot be active without admin approval." },
        { soru: "How does the escrow payment system work?", cevap: "Your payment is safely held on our platform. It doesn't go to the clinic until your treatment is complete and you approve." },
        { soru: "Do I have to pay extra for additional procedures?", cevap: "No! The clinic must get your approval before proposing any additional procedures. Nothing can be added without your approval." },
        { soru: "Which countries do you serve?", cevap: "Medoqa is a global platform. We work with clinics that accept patients from all over the world." },
        { soru: "Is there language support?", cevap: "Yes! The platform is available in Turkish, English and German. More language support coming soon." },
      ],
    },
    de: {
      badge: "Sicher · Transparent · Einfach",
      baslik: "Wie funktioniert Medoqa?",
      altBaslik: "Von der Behandlung bis zum Hotel, vom Transfer bis zur sicheren Zahlung — alles auf einer Plattform.",
      adimlarBaslik: "Behandlung in 6 Schritten abschließen",
      nedenBaslik: "Echte Zahlen",
      nedenAlt: "Aktuelle Statistiken auf unserer Plattform",
      sssBaslik: "Häufig gestellte Fragen",
      cagriBaslik: "Jetzt starten",
      cagriAlt: "Kostenloses Angebot einholen, beste Klinik wählen, sicher kommen.",
      teklifAl: "Kostenloses Angebot",
      klinikleriIncele: "Kliniken erkunden",
      istatistik: ["Verifizierte Klinik", "Registrierter Patient", "Partner Hotel", "Transferunternehmen"],
      adimlar: [
        { foto: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop", baslik: "Behandlung wählen", aciklama: "Zahn, Haartransplantation, Auge, Ästhetik oder Orthopädie — bestimmen Sie die benötigte Behandlung. 500+ Optionen verfügbar.", detaylar: ["500+ Behandlungsoptionen", "Detaillierte Informationen", "Preisspannen"] },
        { foto: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop", baslik: "Kostenloses Angebot", aciklama: "Foto oder Röntgenbild hochladen. Verifizierte Kliniken senden innerhalb von 2-4 Stunden personalisierte Angebote.", detaylar: ["Völlig kostenlos", "Antwort in 2-4 Stunden", "Von mehreren Kliniken"] },
        { foto: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=400&fit=crop", baslik: "Angebote vergleichen", aciklama: "Preis, Inhalt und Klinikprofile nebeneinander prüfen. Bewertungen lesen, das Beste ohne Druck wählen.", detaylar: ["Nebeneinander Vergleich", "Verifizierte Bewertungen", "Transparente Preise"] },
        { foto: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop", baslik: "Hotel & Transfer wählen", aciklama: "Partnerhotels in Kliniknähe durchsuchen. Flughafentransfer in die Plattform integriert planen.", detaylar: ["Hotels in Kliniknähe", "Flughafentransfer", "Paketpreisvorteil"] },
        { foto: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop", baslik: "Sicher bezahlen", aciklama: "Ihre Zahlung wartet auf unserem sicheren Konto. Sie geht erst an die Klinik, wenn Ihre Behandlung abgeschlossen ist.", detaylar: ["Treuhandzahlungssystem", "Keine Zahlung ohne Genehmigung", "Schutz vor Zusatzeingriffen"] },
        { foto: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop", baslik: "Erfahrung teilen", aciklama: "Bewertung nach der Behandlung schreiben. Anderen Patienten helfen, zur Plattform beitragen.", detaylar: ["Verifizierte Bewertungen", "Bewertungssystem", "Anderen Patienten helfen"] },
      ],
      sorular: [
        { soru: "Ist Medoqa kostenlos?", cevap: "Ja! Medoqa ist für Patienten völlig kostenlos. Sie zahlen nichts, um Angebote zu erhalten, zu vergleichen und mit Kliniken zu kommunizieren." },
        { soru: "Wie werden Kliniken verifiziert?", cevap: "Alle Kliniken reichen ihre Lizenzen, Arztzertifikate und Versicherungsdokumente ein. Kliniken können ohne Admin-Genehmigung nicht aktiv sein." },
        { soru: "Wie funktioniert das Treuhandzahlungssystem?", cevap: "Ihre Zahlung wird sicher auf unserer Plattform gehalten. Sie geht erst an die Klinik, wenn Ihre Behandlung abgeschlossen ist und Sie genehmigen." },
        { soru: "Muss ich für zusätzliche Eingriffe extra bezahlen?", cevap: "Nein! Die Klinik muss Ihre Genehmigung einholen, bevor sie zusätzliche Eingriffe vorschlägt. Ohne Ihre Genehmigung nichts." },
        { soru: "Welche Länder bedienen Sie?", cevap: "Medoqa ist eine globale Plattform. Wir arbeiten mit Kliniken zusammen, die Patienten aus aller Welt aufnehmen." },
        { soru: "Gibt es Sprachunterstützung?", cevap: "Ja! Die Plattform ist auf Türkisch, Englisch und Deutsch verfügbar. Weitere Sprachen kommen bald." },
      ],
    },
  };

  const ic = icerik[dil];
  const [acikSoru, setAcikSoru] = useState<number | null>(null);

  return (
    <main style={{ minHeight: "100vh", background: "#f8f9ff", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ position: "relative", padding: "80px 32px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&h=600&fit=crop&q=80" alt="Klinik" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,8,32,0.95) 0%, rgba(30,27,75,0.92) 100%)" }} />
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(83,74,183,0.25)", color: "#AFA9EC", fontSize: "12px", padding: "6px 20px", borderRadius: "20px", border: "1px solid rgba(83,74,183,0.4)", marginBottom: "20px", letterSpacing: "1px", fontWeight: 600 }}>{ic.badge}</div>
          <h1 style={{ color: "#fff", fontSize: "48px", fontWeight: 800, marginBottom: "16px", letterSpacing: "-1px" }}>{ic.baslik}</h1>
          <p style={{ color: "#8b8fc8", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>{ic.altBaslik}</p>
        </div>
      </section>

      {/* 6 Adım */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 32px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#0f0d2e", textAlign: "center", marginBottom: "56px", letterSpacing: "-0.5px" }}>{ic.adimlarBaslik}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {ic.adimlar.map((adim, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid #eeecff", display: "grid", gridTemplateColumns: i % 2 === 0 ? "320px 1fr" : "1fr 320px" }}>
              {i % 2 === 0 ? (
                <>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img src={adim.foto} alt={adim.baslik} style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "220px" }} />
                    <div style={{ position: "absolute", top: "16px", left: "16px", background: "#534AB7", color: "#fff", fontSize: "13px", fontWeight: 800, width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div style={{ padding: "36px" }}>
                    <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#0f0d2e", marginBottom: "12px", letterSpacing: "-0.3px" }}>{adim.baslik}</h3>
                    <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.75, marginBottom: "20px" }}>{adim.aciklama}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {adim.detaylar.map(d => (
                        <div key={d} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#534AB7", fontWeight: 500 }}>
                          <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#534AB715", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>✓</div>
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ padding: "36px" }}>
                    <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#0f0d2e", marginBottom: "12px", letterSpacing: "-0.3px" }}>{adim.baslik}</h3>
                    <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.75, marginBottom: "20px" }}>{adim.aciklama}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {adim.detaylar.map(d => (
                        <div key={d} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#534AB7", fontWeight: 500 }}>
                          <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#534AB715", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>✓</div>
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img src={adim.foto} alt={adim.baslik} style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "220px" }} />
                    <div style={{ position: "absolute", top: "16px", right: "16px", background: "#534AB7", color: "#fff", fontSize: "13px", fontWeight: 800, width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* İstatistikler */}
      <section style={{ background: "#0f0d2e", padding: "64px 32px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "30px", fontWeight: 800, color: "#fff", marginBottom: "8px", letterSpacing: "-0.5px" }}>{ic.nedenBaslik}</h2>
          <p style={{ color: "#8b8fc8", fontSize: "15px", marginBottom: "48px" }}>{ic.nedenAlt}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              { sayi: `${istatistik.klinik}+`, etiket: ic.istatistik[0] },
              { sayi: `${istatistik.hasta}+`, etiket: ic.istatistik[1] },
              { sayi: `${istatistik.otel}+`, etiket: ic.istatistik[2] },
              { sayi: `${istatistik.transfer}+`, etiket: ic.istatistik[3] },
            ].map(s => (
              <div key={s.etiket} style={{ background: "rgba(83,74,183,0.15)", border: "1px solid rgba(83,74,183,0.3)", borderRadius: "16px", padding: "28px 16px" }}>
                <div style={{ fontSize: "36px", fontWeight: 800, color: "#7F77DD", marginBottom: "8px" }}>{s.sayi}</div>
                <div style={{ fontSize: "13px", color: "#8b8fc8" }}>{s.etiket}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSS */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 32px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#0f0d2e", textAlign: "center", marginBottom: "48px", letterSpacing: "-0.5px" }}>{ic.sssBaslik}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {ic.sorular.map((s, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #eeecff", borderRadius: "14px", overflow: "hidden" }}>
              <div onClick={() => setAcikSoru(acikSoru === i ? null : i)} style={{ padding: "20px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f0d2e" }}>{s.soru}</div>
                <div style={{ color: "#534AB7", fontSize: "20px", fontWeight: 300, flexShrink: 0, marginLeft: "16px" }}>{acikSoru === i ? "−" : "+"}</div>
              </div>
              {acikSoru === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.75, margin: 0 }}>{s.cevap}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", padding: "80px 32px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1600&h=500&fit=crop&q=80" alt="Sağlık" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(83,74,183,0.96) 0%, rgba(15,13,46,0.96) 100%)" }} />
        </div>
        <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: 800, color: "#fff", marginBottom: "16px", letterSpacing: "-0.5px" }}>{ic.cagriBaslik}</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "16px", marginBottom: "36px", lineHeight: 1.7 }}>{ic.cagriAlt}</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/teklif" style={{ background: "#fff", color: "#534AB7", padding: "14px 32px", borderRadius: "12px", fontSize: "15px", textDecoration: "none", fontWeight: 800 }}>{ic.teklifAl}</a>
            <a href="/klinikler" style={{ background: "transparent", color: "#fff", padding: "14px 32px", borderRadius: "12px", fontSize: "15px", textDecoration: "none", fontWeight: 600, border: "1px solid rgba(255,255,255,0.3)" }}>{ic.klinikleriIncele}</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
