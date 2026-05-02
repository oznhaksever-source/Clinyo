"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client";
import { useDil } from "./locales/context";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Icons = {
  Lock: () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>),
  CheckCircle: () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>),
  Shield: () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
  Scale: () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="3" x2="12" y2="21"/><path d="M3 6l9-3 9 3"/><path d="M3 18l9 3 9-3"/><path d="M3 12h18"/></svg>),
  Globe: () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>),
  Layers: () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>),
  ArrowRight: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>),
};

export default function AnaSayfa() {
  const [klinikler, setKlinikler] = useState<any[]>([]);
  const [oteller, setOteller] = useState<any[]>([]);
  const [istatistik, setIstatistik] = useState({ klinik: 0, hasta: 0, otel: 0, transfer: 0 });
  const [mobil, setMobil] = useState(false);
  const { dil } = useDil();
  const supabase = createClient();

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  const icerik = {
    tr: {
      heroBadge: "GLOBAL SAĞLIK TURİZMİ PLATFORMU",
      heroBaslik1: "Sağlıkta Sınır",
      heroBaslikVurgu: "Tanımayın",
      heroAlt: "Dünyanın dört bir yanından onaylı klinikler, şeffaf fiyatlar, güvenli ödeme. Ödemeniz tedaviniz tamamlanana kadar kliniğe geçmez.",
      teklifAl: "Ücretsiz Teklif Al",
      klinikleriKesf: "Klinikleri Keşfet",
      guvenBadge1: "🔒 Blokeli Ödeme",
      guvenBadge2: "✓ Onaylı Klinikler",
      guvenBadge3: "⚖ Şeffaf Fiyat",
      istatistikler: ["Onaylı Klinik", "Kayıtlı Hasta", "Partner Otel", "Transfer Firması"],
      tedaviBaslik: "Tedavi Kategorileri",
      tedaviAlt: "İhtiyacınıza uygun tedaviyi seçin, kliniklerden teklif alın",
      farklarBaslik: "Neden Medoqa?",
      farklarAlt: "Diğer platformlardan farkımız sadece bir ara yüz olmak değil, her adımda sizi korumak",
      farklar: [
        { ikon: "Lock", renk: "#4F46E5", baslik: "Blokeli Ödeme Sistemi", aciklama: "Ödemeniz güvenli hesabımızda bekler. Tedaviniz tamamlanıp siz onaylayana kadar kliniğe geçmez." },
        { ikon: "CheckCircle", renk: "#059669", baslik: "Belgeli & Onaylı Klinikler", aciklama: "Her klinik Sağlık Bakanlığı belgelerini sunar, admin incelemesinden geçer. Belgesi olmayan platforma katılamaz." },
        { ikon: "Scale", renk: "#D97706", baslik: "Şeffaf Fiyatlandırma", aciklama: "Klinikler fiyatlarını açıkça belirtir. Gizli ücret yok, son dakika sürprizi yok." },
        { ikon: "Shield", renk: "#DC2626", baslik: "Ek İşlem Güvencesi", aciklama: "Klinik ek işlem önerecekse önce sizin onayınızı almak zorunda. İmzasız hiçbir ek işlem yapılamaz." },
        { ikon: "Globe", renk: "#0891B2", baslik: "Çok Dilli Platform", aciklama: "Türkçe, İngilizce ve Almanca tam destek. Dünyanın her yerinden hasta ve klinikler için tasarlandı." },
        { ikon: "Layers", renk: "#7C3AED", baslik: "Her Şey Tek Platformda", aciklama: "Klinik, otel ve transfer tek çatı altında. Ayrı ayrı araştırma derdi yok." },
      ],
      adimlarBaslik: "3 Adımda Tedavinizi Planlayın",
      adimlar: [
        { no: "01", baslik: "Teklif Talebi Oluşturun", aciklama: "Tedavinizi seçin, varsa fotoğraf veya röntgeninizi yükleyin. Onaylı klinikler size 2–4 saat içinde teklif gönderir. Ücretsiz." },
        { no: "02", baslik: "Teklifleri Karşılaştırın", aciklama: "Fiyat, içerik, klinik profili ve doktor deneyimini yan yana inceleyin. Baskı olmadan en iyisini seçin." },
        { no: "03", baslik: "Güvenle Gelin", aciklama: "Otel ve transferi planlayın. Ödemenizi yapın — para tedaviniz bittikten sonra kliniğe geçer." },
      ],
      oneCikanKlinikler: "Öne Çıkan Klinikler",
      oneCikanAlt: "Sağlık Bakanlığı onaylı, profilleri doğrulanmış klinikler",
      partnerOteller: "Partner Oteller",
      partnerOtelAlt: "Tedaviniz süresince konaklamak için özenle seçilmiş oteller",
      tumunuGor: "Tümünü Gör",
      onayBadge: "Onaylı",
      cagriBaslik: "Sağlığınıza En İyi Yatırımı Yapın",
      cagriAlt: "Dünya standartlarında tedavi, rekabetçi fiyatlarla. Birden fazla klinikten teklif alın, karşılaştırın, en iyisini seçin.",
      cagriBtn: "Hemen Ücretsiz Teklif Al",
    },
    en: {
      heroBadge: "GLOBAL HEALTH TOURISM PLATFORM",
      heroBaslik1: "Healthcare Without",
      heroBaslikVurgu: "Borders",
      heroAlt: "Verified clinics from around the world, transparent prices, secure payment. Your money stays safe until your treatment is complete.",
      teklifAl: "Get Free Quote",
      klinikleriKesf: "Explore Clinics",
      guvenBadge1: "🔒 Escrow Payment",
      guvenBadge2: "✓ Verified Clinics",
      guvenBadge3: "⚖ Transparent Pricing",
      istatistikler: ["Verified Clinic", "Registered Patient", "Partner Hotel", "Transfer Company"],
      tedaviBaslik: "Treatment Categories",
      tedaviAlt: "Choose the right treatment and get quotes from clinics",
      farklarBaslik: "Why Medoqa?",
      farklarAlt: "Our difference from other platforms is not just being an interface, but protecting you at every step",
      farklar: [
        { ikon: "Lock", renk: "#4F46E5", baslik: "Escrow Payment System", aciklama: "Your payment waits in our secure account. It doesn't go to the clinic until your treatment is complete and you approve." },
        { ikon: "CheckCircle", renk: "#059669", baslik: "Documented & Verified Clinics", aciklama: "Every clinic submits Ministry of Health documents and passes admin review. No documentation, no platform access." },
        { ikon: "Scale", renk: "#D97706", baslik: "Transparent Pricing", aciklama: "Clinics clearly state their prices. No hidden fees, no last-minute surprises." },
        { ikon: "Shield", renk: "#DC2626", baslik: "Extra Procedure Protection", aciklama: "If a clinic wants to perform an extra procedure, they must get your approval first." },
        { ikon: "Globe", renk: "#0891B2", baslik: "Multilingual Platform", aciklama: "Full support in Turkish, English and German. Designed for patients and clinics from around the world." },
        { ikon: "Layers", renk: "#7C3AED", baslik: "Everything in One Place", aciklama: "Clinic, hotel and transfer under one roof. No separate research hassle." },
      ],
      adimlarBaslik: "Plan Your Treatment in 3 Steps",
      adimlar: [
        { no: "01", baslik: "Create Quote Request", aciklama: "Choose your treatment, upload photos or X-rays. Verified clinics send personalized quotes within 2–4 hours. Free." },
        { no: "02", baslik: "Compare Quotes", aciklama: "Review price, content, clinic profile and doctor experience side by side. Choose the best without pressure." },
        { no: "03", baslik: "Come Safely", aciklama: "Plan hotel and transfer. Make your payment — money goes to the clinic only after your treatment is done." },
      ],
      oneCikanKlinikler: "Featured Clinics",
      oneCikanAlt: "Ministry of Health approved, profile-verified clinics",
      partnerOteller: "Partner Hotels",
      partnerOtelAlt: "Carefully selected hotels to stay during your treatment",
      tumunuGor: "View All",
      onayBadge: "Verified",
      cagriBaslik: "Make the Best Investment in Your Health",
      cagriAlt: "World-class treatment at competitive prices. Get quotes from multiple clinics, compare, and choose the best.",
      cagriBtn: "Get Free Quote Now",
    },
    de: {
      heroBadge: "GLOBALE GESUNDHEITSTOURISMUSPLATTFORM",
      heroBaslik1: "Gesundheit ohne",
      heroBaslikVurgu: "Grenzen",
      heroAlt: "Verifizierte Kliniken aus aller Welt, transparente Preise, sichere Zahlung. Ihr Geld bleibt sicher, bis Ihre Behandlung abgeschlossen ist.",
      teklifAl: "Kostenloses Angebot",
      klinikleriKesf: "Kliniken entdecken",
      guvenBadge1: "🔒 Treuhandzahlung",
      guvenBadge2: "✓ Verifizierte Kliniken",
      guvenBadge3: "⚖ Transparente Preise",
      istatistikler: ["Verifizierte Klinik", "Registrierter Patient", "Partner Hotel", "Transferunternehmen"],
      tedaviBaslik: "Behandlungskategorien",
      tedaviAlt: "Wählen Sie die richtige Behandlung und holen Sie Angebote ein",
      farklarBaslik: "Warum Medoqa?",
      farklarAlt: "Unser Unterschied ist nicht nur eine Schnittstelle zu sein, sondern Sie bei jedem Schritt zu schützen",
      farklar: [
        { ikon: "Lock", renk: "#4F46E5", baslik: "Treuhandzahlungssystem", aciklama: "Ihre Zahlung wartet auf unserem sicheren Konto. Sie geht erst an die Klinik, wenn Sie genehmigen." },
        { ikon: "CheckCircle", renk: "#059669", baslik: "Verifizierte Kliniken", aciklama: "Jede Klinik reicht Dokumente ein und durchläuft eine Admin-Prüfung. Ohne Genehmigung kein Zugang." },
        { ikon: "Scale", renk: "#D97706", baslik: "Transparente Preise", aciklama: "Kliniken geben ihre Preise klar an. Keine versteckten Gebühren, keine Überraschungen." },
        { ikon: "Shield", renk: "#DC2626", baslik: "Schutz vor Zusatzeingriffen", aciklama: "Klinik muss Ihre Genehmigung einholen, bevor sie Zusatzeingriffe vorschlägt." },
        { ikon: "Globe", renk: "#0891B2", baslik: "Mehrsprachige Plattform", aciklama: "Vollständiger Support auf Türkisch, Englisch und Deutsch. Für Patienten aus aller Welt." },
        { ikon: "Layers", renk: "#7C3AED", baslik: "Alles an einem Ort", aciklama: "Klinik, Hotel und Transfer unter einem Dach. Kein separater Aufwand." },
      ],
      adimlarBaslik: "Behandlung in 3 Schritten",
      adimlar: [
        { no: "01", baslik: "Angebotsanfrage erstellen", aciklama: "Behandlung wählen, Fotos hochladen. Verifizierte Kliniken senden in 2–4 Stunden Angebote. Kostenlos." },
        { no: "02", baslik: "Angebote vergleichen", aciklama: "Preis, Inhalt und Arzterfahrung nebeneinander prüfen. Das Beste ohne Druck wählen." },
        { no: "03", baslik: "Sicher kommen", aciklama: "Hotel und Transfer planen. Zahlung leisten — Geld geht erst nach Abschluss an die Klinik." },
      ],
      oneCikanKlinikler: "Ausgewählte Kliniken",
      oneCikanAlt: "Vom Gesundheitsministerium genehmigte Kliniken",
      partnerOteller: "Partner Hotels",
      partnerOtelAlt: "Sorgfältig ausgewählte Hotels für Ihren Aufenthalt",
      tumunuGor: "Alle anzeigen",
      onayBadge: "Verifiziert",
      cagriBaslik: "Investieren Sie in Ihre Gesundheit",
      cagriAlt: "Weltklasse-Behandlung zu wettbewerbsfähigen Preisen. Angebote einholen und das Beste wählen.",
      cagriBtn: "Jetzt kostenloses Angebot",
    },
  };

  const tedaviler = [
    { foto: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop", tr: "Diş Tedavisi", en: "Dental", de: "Zahnbehandlung", fiyat: "€200+" },
    { foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop", tr: "Saç Ekimi", en: "Hair Transplant", de: "Haartransplantation", fiyat: "€1.500+" },
    { foto: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop", tr: "Göz Ameliyatı", en: "Eye Surgery", de: "Augenoperation", fiyat: "€800+" },
    { foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop", tr: "Plastik Cerrahi", en: "Plastic Surgery", de: "Plastische Chirurgie", fiyat: "€1.200+" },
    { foto: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop", tr: "Check-Up", en: "Health Check-Up", de: "Check-Up", fiyat: "€150+" },
    { foto: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop", tr: "Ortopedi", en: "Orthopedics", de: "Orthopädie", fiyat: "€800+" },
  ];

  const ic = icerik[dil];
  const ikonMap: Record<string, () => React.ReactElement> = {
    Lock: Icons.Lock, CheckCircle: Icons.CheckCircle, Scale: Icons.Scale,
    Shield: Icons.Shield, Globe: Icons.Globe, Layers: Icons.Layers,
  };

  useEffect(() => {
    async function veriYukle() {
      const { data: klinikData } = await supabase.from("profiles").select("id, ad, soyad, kapak_fotograf, konum_adres, tanitim_yazisi").eq("hesap_turu", "klinik").eq("onaylandi", true).eq("askida", false).limit(6);
      const { data: otelData } = await supabase.from("profiles").select("id, ad, soyad, kapak_fotograf, konum_adres").eq("hesap_turu", "otel").eq("onaylandi", true).eq("askida", false).limit(3);
      const { count: kc } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "klinik").eq("onaylandi", true);
      const { count: hc } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "hasta");
      const { count: oc } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "otel").eq("onaylandi", true);
      const { count: tc } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "transfer").eq("onaylandi", true);
      setKlinikler(klinikData || []);
      setOteller(otelData || []);
      setIstatistik({ klinik: kc || 0, hasta: hc || 0, otel: oc || 0, transfer: tc || 0 });
    }
    veriYukle();
  }, []);

  const px = mobil ? "16px" : "32px";
  const sectionPad = mobil ? "48px 16px" : "80px 32px";
  const maxW = "1200px";

  return (
    <main style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar />

      {/* HERO */}
      <section style={{ position: "relative", minHeight: mobil ? "100svh" : "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&h=900&fit=crop&q=80" alt="Klinik" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(10,8,32,0.96) 0%, rgba(18,16,58,0.88) 50%, rgba(10,8,32,0.7) 100%)" }} />
        </div>
        <div style={{ position: "relative", maxWidth: maxW, margin: "0 auto", padding: mobil ? "80px 16px 40px" : "80px 32px", width: "100%" }}>
          <div style={{ maxWidth: "680px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(83,74,183,0.2)", border: "1px solid rgba(83,74,183,0.5)", borderRadius: "30px", padding: "6px 16px", marginBottom: "24px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7F77DD" }} />
              <span style={{ fontSize: "11px", color: "#AFA9EC", letterSpacing: "1.5px", fontWeight: 700 }}>{ic.heroBadge}</span>
            </div>
            <h1 style={{ fontSize: mobil ? "36px" : "clamp(42px, 6vw, 68px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: "20px", letterSpacing: "-1px" }}>
              {ic.heroBaslik1}{" "}<span style={{ color: "#7F77DD" }}>{ic.heroBaslikVurgu}</span>
            </h1>
            <p style={{ fontSize: mobil ? "15px" : "18px", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: "32px", maxWidth: "540px" }}>{ic.heroAlt}</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
              {[ic.guvenBadge1, ic.guvenBadge2, ic.guvenBadge3].map(b => (
                <span key={b} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)", padding: "6px 14px", borderRadius: "30px", fontSize: "12px", fontWeight: 500 }}>{b}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px", flexDirection: mobil ? "column" : "row" }}>
              <a href="/teklif" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "#534AB7", color: "#fff", padding: "14px 28px", borderRadius: "12px", fontSize: "15px", textDecoration: "none", fontWeight: 700, boxShadow: "0 12px 40px rgba(83,74,183,0.5)" }}>
                {ic.teklifAl} <Icons.ArrowRight />
              </a>
              <a href="/klinikler" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "transparent", color: "#fff", padding: "14px 28px", borderRadius: "12px", fontSize: "15px", textDecoration: "none", fontWeight: 600, border: "1px solid rgba(255,255,255,0.25)" }}>
                {ic.klinikleriKesf}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* İSTATİSTİKLER */}
      <section style={{ background: "#534AB7", padding: mobil ? "24px 16px" : "32px" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", display: "grid", gridTemplateColumns: mobil ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: mobil ? "16px" : "0", textAlign: "center" }}>
          {[
            { sayi: istatistik.klinik, etiket: ic.istatistikler[0] },
            { sayi: istatistik.hasta, etiket: ic.istatistikler[1] },
            { sayi: istatistik.otel, etiket: ic.istatistikler[2] },
            { sayi: istatistik.transfer, etiket: ic.istatistikler[3] },
          ].map((s, i) => (
            <div key={s.etiket} style={{ padding: mobil ? "12px" : "0 24px", borderRight: !mobil && i < 3 ? "1px solid rgba(255,255,255,0.2)" : "none", borderBottom: mobil && i < 2 ? "1px solid rgba(255,255,255,0.2)" : "none" }}>
              <div style={{ fontSize: mobil ? "28px" : "36px", fontWeight: 800, color: "#fff" }}>{s.sayi}+</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", marginTop: "4px" }}>{s.etiket}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEDAVİLER */}
      <section style={{ padding: sectionPad, background: "#f8f9ff" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: mobil ? "26px" : "36px", fontWeight: 800, color: "#0f0d2e", marginBottom: "10px" }}>{ic.tedaviBaslik}</h2>
            <p style={{ fontSize: "15px", color: "#64748b" }}>{ic.tedaviAlt}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mobil ? "repeat(2, 1fr)" : "repeat(6, 1fr)", gap: mobil ? "12px" : "16px" }}>
            {tedaviler.map(t => (
              <a key={t.tr} href="/teklif" style={{ textDecoration: "none", borderRadius: "14px", overflow: "hidden", background: "#fff", border: "1px solid #e8e6ff", display: "block" }}>
                <div style={{ height: mobil ? "90px" : "120px", overflow: "hidden" }}>
                  <img src={t.foto} alt={t.tr} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: mobil ? "10px" : "14px 12px" }}>
                  <div style={{ fontSize: mobil ? "12px" : "13px", fontWeight: 700, color: "#0f0d2e", marginBottom: "3px" }}>
                    {dil === "tr" ? t.tr : dil === "en" ? t.en : t.de}
                  </div>
                  <div style={{ fontSize: "11px", color: "#534AB7", fontWeight: 700 }}>{t.fiyat}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEDEN MEDOQA */}
      <section style={{ padding: sectionPad, background: "#fff" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: mobil ? "26px" : "36px", fontWeight: 800, color: "#0f0d2e", marginBottom: "10px" }}>{ic.farklarBaslik}</h2>
            <p style={{ fontSize: "15px", color: "#64748b", maxWidth: "560px", margin: "0 auto" }}>{ic.farklarAlt}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mobil ? "1fr" : "repeat(3, 1fr)", gap: "20px" }}>
            {ic.farklar.map(f => {
              const Ikon = ikonMap[f.ikon];
              return (
                <div key={f.baslik} style={{ padding: mobil ? "24px" : "32px", borderRadius: "20px", border: "1px solid #f0eeff", background: "#faf9ff" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: `${f.renk}15`, display: "flex", alignItems: "center", justifyContent: "center", color: f.renk, marginBottom: "16px" }}>
                    <Ikon />
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f0d2e", marginBottom: "10px" }}>{f.baslik}</h3>
                  <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>{f.aciklama}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section style={{ padding: sectionPad, background: "#0f0d2e", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: mobil ? "26px" : "36px", fontWeight: 800, color: "#fff", marginBottom: "40px", textAlign: "center" }}>{ic.adimlarBaslik}</h2>
          <div style={{ display: "grid", gridTemplateColumns: mobil ? "1fr" : "repeat(3, 1fr)", gap: "16px" }}>
            {ic.adimlar.map(a => (
              <div key={a.no} style={{ padding: mobil ? "28px 20px" : "40px 32px", background: "rgba(255,255,255,0.04)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: "56px", fontWeight: 900, color: "rgba(127,119,221,0.2)", lineHeight: 1, marginBottom: "16px", fontFamily: "monospace" }}>{a.no}</div>
                <h3 style={{ fontSize: mobil ? "17px" : "20px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>{a.baslik}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: 0 }}>{a.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KLİNİKLER */}
      {klinikler.length > 0 && (
        <section style={{ padding: sectionPad, background: "#f8f9ff" }}>
          <div style={{ maxWidth: maxW, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
              <div>
                <h2 style={{ fontSize: mobil ? "22px" : "30px", fontWeight: 800, color: "#0f0d2e", marginBottom: "4px" }}>{ic.oneCikanKlinikler}</h2>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>{ic.oneCikanAlt}</p>
              </div>
              <a href="/klinikler" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#534AB7", fontSize: "13px", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
                {ic.tumunuGor} <Icons.ArrowRight />
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: mobil ? "1fr" : "repeat(3, 1fr)", gap: "20px" }}>
              {klinikler.map(k => (
                <a key={k.id} href={`/klinik/${k.id}`} style={{ textDecoration: "none", display: "block", background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid #eeecff" }}>
                  <div style={{ position: "relative", height: mobil ? "160px" : "200px", overflow: "hidden" }}>
                    <img src={k.kapak_fotograf || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop"} alt={k.ad} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "12px", left: "12px", background: "#059669", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px" }}>
                      ✓ {ic.onayBadge}
                    </div>
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f0d2e", marginBottom: "4px" }}>{k.ad} {k.soyad}</h3>
                    {k.konum_adres && <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 6px" }}>📍 {k.konum_adres}</p>}
                    {k.tanitim_yazisi && <p style={{ fontSize: "12px", color: "#64748b", margin: 0, lineHeight: 1.5 }}>{k.tanitim_yazisi.slice(0, 80)}...</p>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OTELLER */}
      {oteller.length > 0 && (
        <section style={{ padding: sectionPad, background: "#fff" }}>
          <div style={{ maxWidth: maxW, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
              <div>
                <h2 style={{ fontSize: mobil ? "22px" : "30px", fontWeight: 800, color: "#0f0d2e", marginBottom: "4px" }}>{ic.partnerOteller}</h2>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>{ic.partnerOtelAlt}</p>
              </div>
              <a href="/oteller" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#534AB7", fontSize: "13px", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
                {ic.tumunuGor} <Icons.ArrowRight />
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: mobil ? "1fr" : "repeat(3, 1fr)", gap: "20px" }}>
              {oteller.map(o => (
                <a key={o.id} href={`/otel/${o.id}`} style={{ textDecoration: "none", display: "block", background: "#f8f9ff", borderRadius: "20px", overflow: "hidden", border: "1px solid #eeecff" }}>
                  <div style={{ height: mobil ? "150px" : "180px", overflow: "hidden" }}>
                    <img src={o.kapak_fotograf || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop"} alt={o.ad} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "16px 18px" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0f0d2e", marginBottom: "4px" }}>{o.ad} {o.soyad}</h3>
                    {o.konum_adres && <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>📍 {o.konum_adres}</p>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ position: "relative", padding: mobil ? "64px 16px" : "100px 32px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1600&h=600&fit=crop&q=80" alt="Sağlık" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(83,74,183,0.95) 0%, rgba(15,13,46,0.95) 100%)" }} />
        </div>
        <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontSize: mobil ? "28px" : "40px", fontWeight: 800, color: "#fff", marginBottom: "14px" }}>{ic.cagriBaslik}</h2>
          <p style={{ fontSize: mobil ? "15px" : "17px", color: "rgba(255,255,255,0.75)", marginBottom: "32px", lineHeight: 1.7 }}>{ic.cagriAlt}</p>
          <a href="/teklif" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#fff", color: "#534AB7", padding: mobil ? "14px 28px" : "18px 48px", borderRadius: "14px", fontSize: mobil ? "15px" : "17px", textDecoration: "none", fontWeight: 800, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            {ic.cagriBtn} <Icons.ArrowRight />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
