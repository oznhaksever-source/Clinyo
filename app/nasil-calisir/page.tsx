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
      altBaslik: "Tedavinden oteline, transferinden ödemeye kadar her şey tek platformda.",
      adimlarBaslik: "6 Adımda Tedavin Tamamlansın",
      nedenBaslik: "Neden Medoqa?",
      nedenAlt: "Gerçek rakamlar, gerçek sonuçlar",
      sssBaslik: "Sıkça Sorulan Sorular",
      cagriBaslik: "Hemen Başla",
      cagriAlt: "Ücretsiz teklif al, en iyi kliniği seç",
      teklifAl: "Ücretsiz Teklif Al",
      klinikleriIncele: "Klinikleri İncele",
      istatistik: ["Onaylı Klinik", "Kayıtlı Hasta", "Partner Otel", "Transfer Firması"],
      adimlar: [
        { baslik: "Tedavini Seç", aciklama: "İhtiyacın olan tedaviyi belirle.", detaylar: ["500+ tedavi seçeneği", "Detaylı tedavi bilgileri", "Fiyat aralıkları"], icon: "🔍" },
        { baslik: "Ücretsiz Teklif Al", aciklama: "Fotoğraflarını yükle, klinikler teklif gönderir.", detaylar: ["Ücretsiz teklif", "24 saat içinde yanıt", "Birden fazla klinikten"], icon: "📋" },
        { baslik: "Teklifleri Karşılaştır", aciklama: "Fiyat ve içeriklere göre karşılaştır.", detaylar: ["Yan yana karşılaştırma", "Gerçek hasta yorumları", "Şeffaf fiyatlandırma"], icon: "⚖️" },
        { baslik: "Otel ve Transfer Seç", aciklama: "Otelleri incele, transferi organize et.", detaylar: ["Kliniğe yakın oteller", "Havalimanı transferi", "Paket fiyat avantajı"], icon: "🏨" },
        { baslik: "Güvenli Öde", aciklama: "Ödemen sen onaylayana kadar bekler.", detaylar: ["Blokeli ödeme sistemi", "Hasta onaylamadan para geçmez", "Ek işlem onay akışı"], icon: "🔒" },
        { baslik: "Deneyimini Paylaş", aciklama: "Tedavi sonrası yorumunu yaz.", detaylar: ["Doğrulanmış yorumlar", "Puan sistemi", "Diğer hastalara yardım et"], icon: "⭐" },
      ],
      sorular: [
        { soru: "Medoqa ücretsiz mi?", cevap: "Evet! Hastalar için Medoqa tamamen ücretsizdir." },
        { soru: "Klinikler nasıl doğrulanır?", cevap: "Tüm klinikler belgelerini sunar ve admin onayı olmadan aktif olamaz." },
        { soru: "Blokeli ödeme nasıl çalışır?", cevap: "Ödemeniz tedaviniz tamamlanıp siz onaylayana kadar kliniğe geçmez." },
        { soru: "Ek işlemler için ekstra ücret var mı?", cevap: "Hayır! Klinik önce sizden onay almak zorundadır." },
        { soru: "Hangi ülkelerden hizmet veriyorsunuz?", cevap: "Almanya, İngiltere, Hollanda, Avusturya ve diğer Avrupa ülkelerinden." },
        { soru: "Dil desteği var mı?", cevap: "Evet! Platform Türkçe, İngilizce ve Almanca olarak kullanılabilir." },
      ],
    },
    en: {
      badge: "Safe · Transparent · Easy",
      baslik: "How Does Medoqa Work?",
      altBaslik: "From treatment to hotel, from transfer to payment — everything in one platform.",
      adimlarBaslik: "Complete Your Treatment in 6 Steps",
      nedenBaslik: "Why Medoqa?",
      nedenAlt: "Real numbers, real results",
      sssBaslik: "Frequently Asked Questions",
      cagriBaslik: "Get Started Now",
      cagriAlt: "Get a free quote, choose the best clinic",
      teklifAl: "Get Free Quote",
      klinikleriIncele: "Explore Clinics",
      istatistik: ["Verified Clinic", "Registered Patient", "Partner Hotel", "Transfer Company"],
      adimlar: [
        { baslik: "Choose Your Treatment", aciklama: "Identify the treatment you need.", detaylar: ["500+ treatment options", "Detailed information", "Price ranges"], icon: "🔍" },
        { baslik: "Get Free Quote", aciklama: "Upload photos, clinics send quotes.", detaylar: ["Free quote", "Response within 24 hours", "From multiple clinics"], icon: "📋" },
        { baslik: "Compare Quotes", aciklama: "Compare by price and content.", detaylar: ["Side-by-side comparison", "Real patient reviews", "Transparent pricing"], icon: "⚖️" },
        { baslik: "Choose Hotel & Transfer", aciklama: "Browse hotels, organize transfer.", detaylar: ["Hotels near clinic", "Airport transfer", "Package deal advantage"], icon: "🏨" },
        { baslik: "Pay Safely", aciklama: "Payment held until you approve.", detaylar: ["Escrow payment system", "No payment without approval", "Extra procedure approval flow"], icon: "🔒" },
        { baslik: "Share Your Experience", aciklama: "Write a review after treatment.", detaylar: ["Verified reviews", "Rating system", "Help other patients"], icon: "⭐" },
      ],
      sorular: [
        { soru: "Is Medoqa free?", cevap: "Yes! Medoqa is completely free for patients." },
        { soru: "How are clinics verified?", cevap: "All clinics submit documents and cannot be active without admin approval." },
        { soru: "How does escrow payment work?", cevap: "Your payment is held until treatment is complete and you approve." },
        { soru: "Are there extra charges?", cevap: "No! Clinics must get your approval before any extra charges." },
        { soru: "Which countries do you serve?", cevap: "Germany, UK, Netherlands, Austria and other European countries." },
        { soru: "Is there language support?", cevap: "Yes! The platform is available in Turkish, English and German." },
      ],
    },
    de: {
      badge: "Sicher · Transparent · Einfach",
      baslik: "Wie funktioniert Medoqa?",
      altBaslik: "Von der Behandlung bis zum Hotel, vom Transfer bis zur Zahlung — alles auf einer Plattform.",
      adimlarBaslik: "Behandlung in 6 Schritten abschließen",
      nedenBaslik: "Warum Medoqa?",
      nedenAlt: "Echte Zahlen, echte Ergebnisse",
      sssBaslik: "Häufig gestellte Fragen",
      cagriBaslik: "Jetzt starten",
      cagriAlt: "Kostenloses Angebot einholen, beste Klinik wählen",
      teklifAl: "Kostenloses Angebot",
      klinikleriIncele: "Kliniken erkunden",
      istatistik: ["Verifizierte Klinik", "Registrierter Patient", "Partner Hotel", "Transferunternehmen"],
      adimlar: [
        { baslik: "Behandlung wählen", aciklama: "Bestimmen Sie die benötigte Behandlung.", detaylar: ["500+ Behandlungsoptionen", "Detaillierte Informationen", "Preisspannen"], icon: "🔍" },
        { baslik: "Kostenloses Angebot", aciklama: "Fotos hochladen, Kliniken senden Angebote.", detaylar: ["Kostenloses Angebot", "Antwort innerhalb 24 Stunden", "Von mehreren Kliniken"], icon: "📋" },
        { baslik: "Angebote vergleichen", aciklama: "Nach Preis und Inhalt vergleichen.", detaylar: ["Nebeneinander Vergleich", "Echte Patientenbewertungen", "Transparente Preise"], icon: "⚖️" },
        { baslik: "Hotel & Transfer wählen", aciklama: "Hotels durchsuchen, Transfer organisieren.", detaylar: ["Hotels in Kliniknähe", "Flughafentransfer", "Paketpreisvorteil"], icon: "🏨" },
        { baslik: "Sicher bezahlen", aciklama: "Zahlung wird bis zu Ihrer Genehmigung gehalten.", detaylar: ["Treuhandzahlungssystem", "Keine Zahlung ohne Genehmigung", "Genehmigungsfluss"], icon: "🔒" },
        { baslik: "Erfahrung teilen", aciklama: "Bewertung nach der Behandlung schreiben.", detaylar: ["Verifizierte Bewertungen", "Bewertungssystem", "Anderen Patienten helfen"], icon: "⭐" },
      ],
      sorular: [
        { soru: "Ist Medoqa kostenlos?", cevap: "Ja! Medoqa ist für Patienten völlig kostenlos." },
        { soru: "Wie werden Kliniken verifiziert?", cevap: "Alle Kliniken reichen Dokumente ein und können ohne Admin-Genehmigung nicht aktiv sein." },
        { soru: "Wie funktioniert die Treuhandzahlung?", cevap: "Ihre Zahlung wird gehalten, bis die Behandlung abgeschlossen ist und Sie genehmigen." },
        { soru: "Gibt es Extragebühren?", cevap: "Nein! Kliniken müssen Ihre Genehmigung einholen, bevor Extragebühren anfallen." },
        { soru: "Welche Länder bedienen Sie?", cevap: "Deutschland, UK, Niederlande, Österreich und andere europäische Länder." },
        { soru: "Gibt es Sprachunterstützung?", cevap: "Ja! Die Plattform ist auf Türkisch, Englisch und Deutsch verfügbar." },
      ],
    },
  };

  const ic = icerik[dil];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "64px 32px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(83,74,183,0.25)", color: "#AFA9EC", fontSize: "12px", padding: "4px 16px", borderRadius: "20px", border: "0.5px solid #534AB7", marginBottom: "20px" }}>{ic.badge}</div>
        <h1 style={{ color: "#fff", fontSize: "42px", fontWeight: 700, marginBottom: "16px" }}>{ic.baslik}</h1>
        <p style={{ color: "#8b8fc8", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>{ic.altBaslik}</p>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 32px" }}>
        <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#12103a", textAlign: "center", marginBottom: "48px" }}>{ic.adimlarBaslik}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {ic.adimlar.map((adim, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "16px", padding: "28px", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: "48px", fontWeight: 700, color: "#EEEDFE", position: "absolute", top: "16px", right: "20px", lineHeight: 1 }}>0{i + 1}</div>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{adim.icon}</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "10px" }}>{adim.baslik}</h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, marginBottom: "16px" }}>{adim.aciklama}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {adim.detaylar.map((d) => (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#534AB7" }}>
                    <span>✓</span> {d}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#12103a", padding: "64px 32px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>{ic.nedenBaslik}</h2>
          <p style={{ color: "#8b8fc8", fontSize: "15px", marginBottom: "48px" }}>{ic.nedenAlt}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {[
              { sayi: `${istatistik.klinik}+`, etiket: ic.istatistik[0] },
              { sayi: `${istatistik.hasta}+`, etiket: ic.istatistik[1] },
              { sayi: `${istatistik.otel}+`, etiket: ic.istatistik[2] },
              { sayi: `${istatistik.transfer}+`, etiket: ic.istatistik[3] },
            ].map((s) => (
              <div key={s.etiket} style={{ background: "rgba(83,74,183,0.15)", border: "1px solid #534AB7", borderRadius: "12px", padding: "24px" }}>
                <div style={{ fontSize: "32px", fontWeight: 700, color: "#7F77DD", marginBottom: "8px" }}>{s.sayi}</div>
                <div style={{ fontSize: "13px", color: "#8b8fc8" }}>{s.etiket}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 32px" }}>
        <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#12103a", textAlign: "center", marginBottom: "36px" }}>{ic.sssBaslik}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {ic.sorular.map((s, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", marginBottom: "10px" }}>
                <span style={{ color: "#534AB7", marginRight: "8px" }}>?</span>{s.soru}
              </div>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, margin: 0 }}>{s.cevap}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #12103a 100%)", padding: "64px 32px", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>{ic.cagriBaslik}</h2>
        <p style={{ color: "#8b8fc8", fontSize: "15px", marginBottom: "32px" }}>{ic.cagriAlt}</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <a href="/teklif" style={{ background: "#534AB7", color: "#fff", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", fontWeight: 600 }}>{ic.teklifAl}</a>
          <a href="/klinikler" style={{ background: "transparent", color: "#fff", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", fontWeight: 600, border: "1px solid #534AB7" }}>{ic.klinikleriIncele}</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
