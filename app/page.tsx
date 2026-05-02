"use client";
import { useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client";
import { useDil } from "./locales/context";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function AnaSayfa() {
  const [klinikler, setKlinikler] = useState<any[]>([]);
  const [oteller, setOteller] = useState<any[]>([]);
  const [istatistik, setIstatistik] = useState({ klinik: 0, hasta: 0, otel: 0, transfer: 0 });
  const [yukleniyor, setYukleniyor] = useState(true);
  const { dil } = useDil();

  const supabase = createClient();

  const icerik = {
    tr: {
      heroBadge: "TÜRKİYE'NİN EN GÜVENLİ SAĞLIK TURİZMİ PLATFORMU",
      heroBaslik1: "Avrupa'dan Türkiye'ye",
      heroBaslikVurgu: "Güvenli",
      heroBaslik2: "Tedavi",
      heroAlt: "Birden fazla klinikten teklif al, karşılaştır, seç. Ödemen tedavin tamamlanana kadar kliniğe geçmez.",
      teklifAl: "Ücretsiz Teklif Al",
      klinikleriKesf: "Klinikleri Keşfet",
      farklarBaslik: "Neden Medoqa?",
      farklarAlt: "Rakiplerden farkımız sadece bir platform olmak değil, seni korumak",
      farklar: [
        { icon: "🔒", baslik: "Blokeli Ödeme", aciklama: "Ödemen tedavin tamamlanıp sen onaylayana kadar kliniğe geçmez. Türkiye'de bir ilk." },
        { icon: "✅", baslik: "Onaylı Klinikler", aciklama: "Tüm klinikler Sağlık Bakanlığı belgeli. Belgeler olmadan platforma katılamazlar." },
        { icon: "⚖️", baslik: "Şeffaf Fiyat", aciklama: "Klinikler fiyatlarını açıkça yazar. Gizli ücret, son dakika sürprizi yok." },
        { icon: "🛡️", baslik: "Ek İşlem Koruması", aciklama: "Klinik ek işlem yapacaksa önce senin onayını almak zorunda. İmzasız işlem yapılamaz." },
        { icon: "🌍", baslik: "Çok Dilli Destek", aciklama: "Türkçe, İngilizce ve Almanca tam destek. Avrupa'daki hastalar için özel tasarlandı." },
        { icon: "🏨", baslik: "Her Şey Tek Yerde", aciklama: "Klinik, otel ve transfer tek platformda. Ayrıca uğraşma." },
      ],
      nasılCalisir: "3 Adımda Tedavin Tamamlansın",
      adimlar: [
        { no: "01", icon: "📋", baslik: "Teklif Talebi Gönder", aciklama: "Tedavini seç, fotoğraflarını yükle. Onaylı klinikler sana 2-4 saat içinde teklif gönderir. Ücretsiz." },
        { no: "02", icon: "⚖️", baslik: "Teklifleri Karşılaştır", aciklama: "Fiyat, içerik ve klinik profillerini incele. Yorumları oku. En iyisini seç." },
        { no: "03", icon: "✈️", baslik: "Güvenle Gel", aciklama: "Otel ve transferi ayarla. Ödemeni yap — ama para kliniğe tedavin bittikten sonra geçer." },
      ],
      oneCikanKlinikler: "Öne Çıkan Klinikler",
      oneCikanAlt: "Sağlık Bakanlığı onaylı, belgelenmiş klinikler",
      partnerOteller: "Partner Oteller",
      partnerOtelAlt: "Tedavin süresince konaklamak için en iyi oteller",
      tumunuGor: "Tümünü Gör →",
      cagriBaslik: "Sağlığına Yatırım Yap",
      cagriAlt: "Avrupa fiyatlarının %60-70 altında, uluslararası standartlarda tedavi",
      cagriBtn: "Hemen Ücretsiz Teklif Al →",
      istatistikler: ["Onaylı Klinik", "Kayıtlı Hasta", "Partner Otel", "Transfer Firması"],
      tedaviBaslik: "Hangi Tedaviyi Arıyorsun?",
      tedaviAlt: "Tıkla, teklif al",
    },
    en: {
      heroBadge: "TURKEY'S SAFEST HEALTH TOURISM PLATFORM",
      heroBaslik1: "From Europe to Turkey,",
      heroBaslikVurgu: "Safe",
      heroBaslik2: "Treatment",
      heroAlt: "Get quotes from multiple clinics, compare, choose. Your payment doesn't reach the clinic until your treatment is complete.",
      teklifAl: "Get Free Quote",
      klinikleriKesf: "Explore Clinics",
      farklarBaslik: "Why Medoqa?",
      farklarAlt: "Our difference from competitors is not just being a platform, but protecting you",
      farklar: [
        { icon: "🔒", baslik: "Escrow Payment", aciklama: "Your payment doesn't go to the clinic until your treatment is complete and you approve. A first in Turkey." },
        { icon: "✅", baslik: "Verified Clinics", aciklama: "All clinics are licensed by the Ministry of Health. They cannot join the platform without documentation." },
        { icon: "⚖️", baslik: "Transparent Pricing", aciklama: "Clinics clearly state their prices. No hidden fees, no last-minute surprises." },
        { icon: "🛡️", baslik: "Extra Procedure Protection", aciklama: "If the clinic wants to perform an extra procedure, they must get your approval first." },
        { icon: "🌍", baslik: "Multilingual Support", aciklama: "Full support in Turkish, English and German. Specially designed for European patients." },
        { icon: "🏨", baslik: "Everything in One Place", aciklama: "Clinic, hotel and transfer in one platform. No extra hassle." },
      ],
      nasılCalisir: "Complete Your Treatment in 3 Steps",
      adimlar: [
        { no: "01", icon: "📋", baslik: "Send Quote Request", aciklama: "Choose your treatment, upload your photos. Verified clinics send you quotes within 2-4 hours. Free." },
        { no: "02", icon: "⚖️", baslik: "Compare Quotes", aciklama: "Review prices, contents and clinic profiles. Read reviews. Choose the best." },
        { no: "03", icon: "✈️", baslik: "Come Safely", aciklama: "Arrange hotel and transfer. Make your payment — but money only reaches the clinic after your treatment is done." },
      ],
      oneCikanKlinikler: "Featured Clinics",
      oneCikanAlt: "Ministry of Health approved, documented clinics",
      partnerOteller: "Partner Hotels",
      partnerOtelAlt: "Best hotels to stay during your treatment",
      tumunuGor: "View All →",
      cagriBaslik: "Invest in Your Health",
      cagriAlt: "60-70% below European prices, international standard treatment",
      cagriBtn: "Get Free Quote Now →",
      istatistikler: ["Verified Clinic", "Registered Patient", "Partner Hotel", "Transfer Company"],
      tedaviBaslik: "What Treatment Are You Looking For?",
      tedaviAlt: "Click and get a quote",
    },
    de: {
      heroBadge: "TÜRKEIS SICHERSTE GESUNDHEITSTOURISMUSPLATTFORM",
      heroBaslik1: "Von Europa in die Türkei,",
      heroBaslikVurgu: "Sichere",
      heroBaslik2: "Behandlung",
      heroAlt: "Holen Sie Angebote von mehreren Kliniken, vergleichen Sie, wählen Sie. Ihre Zahlung erreicht die Klinik erst, wenn Ihre Behandlung abgeschlossen ist.",
      teklifAl: "Kostenloses Angebot",
      klinikleriKesf: "Kliniken entdecken",
      farklarBaslik: "Warum Medoqa?",
      farklarAlt: "Unser Unterschied zu Mitbewerbern ist nicht nur eine Plattform zu sein, sondern Sie zu schützen",
      farklar: [
        { icon: "🔒", baslik: "Treuhandzahlung", aciklama: "Ihre Zahlung geht erst an die Klinik, wenn Ihre Behandlung abgeschlossen ist und Sie genehmigen. Ein erstes in der Türkei." },
        { icon: "✅", baslik: "Verifizierte Kliniken", aciklama: "Alle Kliniken sind vom Gesundheitsministerium lizenziert. Ohne Dokumentation können sie der Plattform nicht beitreten." },
        { icon: "⚖️", baslik: "Transparente Preise", aciklama: "Kliniken geben ihre Preise klar an. Keine versteckten Gebühren, keine Last-Minute-Überraschungen." },
        { icon: "🛡️", baslik: "Schutz vor Zusatzeingriffen", aciklama: "Wenn die Klinik einen Zusatzeingriff durchführen möchte, muss sie zuerst Ihre Genehmigung einholen." },
        { icon: "🌍", baslik: "Mehrsprachiger Support", aciklama: "Vollständiger Support auf Türkisch, Englisch und Deutsch. Speziell für europäische Patienten konzipiert." },
        { icon: "🏨", baslik: "Alles an einem Ort", aciklama: "Klinik, Hotel und Transfer auf einer Plattform. Kein extra Aufwand." },
      ],
      nasılCalisir: "Behandlung in 3 Schritten abschließen",
      adimlar: [
        { no: "01", icon: "📋", baslik: "Angebotsanfrage senden", aciklama: "Wählen Sie Ihre Behandlung, laden Sie Ihre Fotos hoch. Verifizierte Kliniken senden Ihnen innerhalb von 2-4 Stunden Angebote. Kostenlos." },
        { no: "02", icon: "⚖️", baslik: "Angebote vergleichen", aciklama: "Überprüfen Sie Preise, Inhalte und Klinikprofile. Lesen Sie Bewertungen. Wählen Sie das Beste." },
        { no: "03", icon: "✈️", baslik: "Sicher kommen", aciklama: "Hotel und Transfer arrangieren. Zahlung leisten — aber Geld geht erst nach Abschluss der Behandlung an die Klinik." },
      ],
      oneCikanKlinikler: "Ausgewählte Kliniken",
      oneCikanAlt: "Vom Gesundheitsministerium genehmigte, dokumentierte Kliniken",
      partnerOteller: "Partner Hotels",
      partnerOtelAlt: "Die besten Hotels für Ihren Aufenthalt während der Behandlung",
      tumunuGor: "Alle anzeigen →",
      cagriBaslik: "Investieren Sie in Ihre Gesundheit",
      cagriAlt: "60-70% unter europäischen Preisen, Behandlung nach internationalen Standards",
      cagriBtn: "Jetzt kostenloses Angebot einholen →",
      istatistikler: ["Verifizierte Klinik", "Registrierter Patient", "Partner Hotel", "Transferunternehmen"],
      tedaviBaslik: "Welche Behandlung suchen Sie?",
      tedaviAlt: "Klicken Sie und erhalten Sie ein Angebot",
    },
  };

  const ic = icerik[dil];

  const tedaviler = [
    { icon: "🦷", tr: "Diş Tedavisi", en: "Dental", de: "Zahnbehandlung", fiyat: "€200'den" },
    { icon: "💇", tr: "Saç Ekimi", en: "Hair Transplant", de: "Haartransplantation", fiyat: "€1.500'den" },
    { icon: "👁️", tr: "Göz Ameliyatı", en: "Eye Surgery", de: "Augenoperation", fiyat: "€800'den" },
    { icon: "👃", tr: "Plastik Cerrahi", en: "Plastic Surgery", de: "Plastische Chirurgie", fiyat: "€1.200'den" },
    { icon: "❤️", tr: "Check-Up", en: "Check-Up", de: "Check-Up", fiyat: "€150'den" },
    { icon: "🦴", tr: "Ortopedi", en: "Orthopedics", de: "Orthopädie", fiyat: "€800'den" },
  ];

  useEffect(() => {
    async function veriYukle() {
      const { data: klinikData } = await supabase.from("profiles").select("id, ad, soyad, kapak_fotograf, konum_adres, tanitim_yazisi").eq("hesap_turu", "klinik").eq("onaylandi", true).eq("askida", false).limit(6);
      const { data: otelData } = await supabase.from("profiles").select("id, ad, soyad, kapak_fotograf, konum_adres").eq("hesap_turu", "otel").eq("onaylandi", true).eq("askida", false).limit(3);
      const { count: klinikCount } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "klinik").eq("onaylandi", true);
      const { count: hastaCount } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "hasta");
      const { count: otelCount } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "otel").eq("onaylandi", true);
      const { count: transferCount } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "transfer").eq("onaylandi", true);
      setKlinikler(klinikData || []);
      setOteller(otelData || []);
      setIstatistik({ klinik: klinikCount || 0, hasta: hastaCount || 0, otel: otelCount || 0, transfer: transferCount || 0 });
      setYukleniyor(false);
    }
    veriYukle();
  }, []);

  return (
    <main style={{ minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0a0820 0%, #12103a 50%, #1a1060 100%)", padding: "80px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(83,74,183,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(127,119,221,0.1) 0%, transparent 50%)" }} />
        <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(83,74,183,0.2)", color: "#AFA9EC", fontSize: "11px", padding: "6px 20px", borderRadius: "20px", border: "1px solid rgba(83,74,183,0.4)", marginBottom: "24px", letterSpacing: "1.5px", fontWeight: 600 }}>
            {ic.heroBadge}
          </div>
          <h1 style={{ fontSize: "52px", fontWeight: 800, color: "#fff", marginBottom: "24px", lineHeight: 1.15 }}>
            {ic.heroBaslik1} <span style={{ color: "#7F77DD" }}>{ic.heroBaslikVurgu}</span> {ic.heroBaslik2}
          </h1>
          <p style={{ fontSize: "18px", color: "#8b8fc8", marginBottom: "16px", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 16px" }}>
            {ic.heroAlt}
          </p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px", marginTop: "32px" }}>
            {["🔒 Blokeli Ödeme", "✅ Onaylı Klinikler", "🛡️ Ek İşlem Koruması"].map(tag => (
              <span key={tag} style={{ background: "rgba(83,74,183,0.2)", color: "#AFA9EC", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", border: "1px solid rgba(83,74,183,0.3)" }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/teklif" style={{ background: "#534AB7", color: "#fff", padding: "16px 36px", borderRadius: "10px", fontSize: "16px", textDecoration: "none", fontWeight: 700, boxShadow: "0 8px 32px rgba(83,74,183,0.4)" }}>
              {ic.teklifAl}
            </a>
            <a href="/klinikler" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", padding: "16px 36px", borderRadius: "10px", fontSize: "16px", textDecoration: "none", fontWeight: 600, border: "1px solid rgba(255,255,255,0.15)" }}>
              {ic.klinikleriKesf}
            </a>
          </div>
        </div>
      </section>

      {/* İstatistikler */}
      <section style={{ background: "#534AB7", padding: "28px 32px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", textAlign: "center" }}>
          {[
            { sayi: istatistik.klinik, etiket: ic.istatistikler[0] },
            { sayi: istatistik.hasta, etiket: ic.istatistikler[1] },
            { sayi: istatistik.otel, etiket: ic.istatistikler[2] },
            { sayi: istatistik.transfer, etiket: ic.istatistikler[3] },
          ].map(s => (
            <div key={s.etiket}>
              <div style={{ fontSize: "32px", fontWeight: 800, color: "#fff" }}>{s.sayi}+</div>
              <div style={{ fontSize: "12px", color: "#CECBF6", marginTop: "4px" }}>{s.etiket}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tedavi Kategorileri */}
      <section style={{ padding: "64px 32px", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "30px", fontWeight: 700, color: "#12103a", marginBottom: "10px" }}>{ic.tedaviBaslik}</h2>
            <p style={{ fontSize: "15px", color: "#888" }}>{ic.tedaviAlt}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px" }}>
            {tedaviler.map(t => (
              <a key={t.tr} href="/teklif" style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "20px 12px", textDecoration: "none", textAlign: "center", transition: "all 0.2s" }}>
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>{t.icon}</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#12103a", marginBottom: "6px" }}>
                  {dil === "tr" ? t.tr : dil === "en" ? t.en : t.de}
                </div>
                <div style={{ fontSize: "11px", color: "#534AB7", fontWeight: 600 }}>{t.fiyat}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Neden Medoqa */}
      <section style={{ padding: "64px 32px", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "30px", fontWeight: 700, color: "#12103a", marginBottom: "10px" }}>{ic.farklarBaslik}</h2>
            <p style={{ fontSize: "15px", color: "#888" }}>{ic.farklarAlt}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {ic.farklar.map(f => (
              <div key={f.baslik} style={{ background: "#f9fafb", border: "1px solid #EEEDFE", borderRadius: "14px", padding: "24px" }}>
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>{f.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "10px" }}>{f.baslik}</h3>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.7, margin: 0 }}>{f.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır */}
      <section style={{ padding: "64px 32px", background: "#12103a" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "30px", fontWeight: 700, color: "#fff", marginBottom: "48px", textAlign: "center" }}>{ic.nasılCalisir}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {ic.adimlar.map(a => (
              <div key={a.no} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px 24px" }}>
                <div style={{ fontSize: "40px", fontWeight: 800, color: "rgba(127,119,221,0.3)", marginBottom: "8px" }}>{a.no}</div>
                <div style={{ fontSize: "32px", marginBottom: "16px" }}>{a.icon}</div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>{a.baslik}</h3>
                <p style={{ fontSize: "13px", color: "#8b8fc8", lineHeight: 1.7, margin: 0 }}>{a.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Öne Çıkan Klinikler */}
      {klinikler.length > 0 && (
        <section style={{ padding: "64px 32px", background: "#f9fafb" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <div>
                <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#12103a", marginBottom: "6px" }}>{ic.oneCikanKlinikler}</h2>
                <p style={{ fontSize: "14px", color: "#888", margin: 0 }}>{ic.oneCikanAlt}</p>
              </div>
              <a href="/klinikler" style={{ color: "#534AB7", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>{ic.tumunuGor}</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {klinikler.map(k => (
                <a key={k.id} href={`/klinik/${k.id}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                    {k.kapak_fotograf ? (
                      <img src={k.kapak_fotograf} alt={k.ad} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "160px", background: "linear-gradient(135deg, #EEEDFE, #CECBF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>🏥</div>
                    )}
                    <div style={{ padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                        <span style={{ background: "#e8f5e9", color: "#0a7a3a", fontSize: "10px", padding: "2px 8px", borderRadius: "10px", fontWeight: 600 }}>✓ Onaylı</span>
                      </div>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{k.ad} {k.soyad}</h3>
                      {k.konum_adres && <p style={{ fontSize: "12px", color: "#888" }}>📍 {k.konum_adres}</p>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Oteller */}
      {oteller.length > 0 && (
        <section style={{ padding: "64px 32px", background: "#fff" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <div>
                <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#12103a", marginBottom: "6px" }}>{ic.partnerOteller}</h2>
                <p style={{ fontSize: "14px", color: "#888", margin: 0 }}>{ic.partnerOtelAlt}</p>
              </div>
              <a href="/oteller" style={{ color: "#534AB7", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>{ic.tumunuGor}</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {oteller.map(o => (
                <a key={o.id} href={`/otel/${o.id}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#f9fafb", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden" }}>
                    {o.kapak_fotograf ? (
                      <img src={o.kapak_fotograf} alt={o.ad} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "160px", background: "linear-gradient(135deg, #EEEDFE, #CECBF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>🏨</div>
                    )}
                    <div style={{ padding: "16px" }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#12103a", marginBottom: "4px" }}>{o.ad} {o.soyad}</h3>
                      {o.konum_adres && <p style={{ fontSize: "12px", color: "#888" }}>📍 {o.konum_adres}</p>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #534AB7 0%, #12103a 100%)", padding: "80px 32px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>{ic.cagriBaslik}</h2>
        <p style={{ fontSize: "16px", color: "#CECBF6", marginBottom: "40px" }}>{ic.cagriAlt}</p>
        <a href="/teklif" style={{ display: "inline-block", background: "#fff", color: "#534AB7", padding: "18px 48px", borderRadius: "10px", fontSize: "16px", textDecoration: "none", fontWeight: 700 }}>
          {ic.cagriBtn}
        </a>
      </section>

      <Footer />
    </main>
  );
}
