"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDil } from "../locales/context";

const SAYFALAR = {
  tr: {
    baslik: "Yasal Belgeler",
    altBaslik: "Gizlilik, kullanım koşulları ve sözleşmelerimiz",
    menu: [
      { id: "kvkk", baslik: "KVKK Aydınlatma Metni" },
      { id: "kullanim", baslik: "Kullanım Koşulları" },
      { id: "klinik", baslik: "Klinik Platform Sözleşmesi" },
      { id: "cerez", baslik: "Çerez Politikası" },
    ],
    guncelleme: "Son güncelleme: Mayıs 2025 — Versiyon 2.0",
    kvkk: {
      baslik: "Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni",
      icerik: `Medoqa Dijital Sağlık Platformu olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında kişisel verilerinizin işlenmesine ilişkin sizi aydınlatmak istiyoruz.

1. VERİ SORUMLUSU
[Şirket Unvanı], [Vergi No], [Adres]
E-posta: info@medoqa.com

2. İŞLENEN KİŞİSEL VERİLER VE AMAÇLARI

a) İletişim Verileri (Ad, soyad, e-posta, telefon)
Amaç: Hesap oluşturma, iletişim, bildirim
Dayanak: KVKK Madde 5/2-c (sözleşmenin ifası)

b) Tedavi Talep Bilgileri
Amaç: Kliniklerle eşleştirme, teklif alma
Dayanak: KVKK Madde 5/2-c (sözleşmenin ifası)

c) Sağlık Verileri (Diş şeması, sağlık notları)
Amaç: Teklif hazırlanması
Dayanak: KVKK Madde 6/2 (açık rıza)

d) Platform Kullanım Verileri
Amaç: Güvenlik, hizmet iyileştirme
Dayanak: KVKK Madde 5/2-f (meşru menfaat)

3. KİŞİSEL VERİLERİN AKTARILMASI
Verileriniz yalnızca teklif talep ettiğiniz klinik/otel/transfer firması ile paylaşılır. Üçüncü kişilerle satılmaz, kiralanmaz veya pazarlama amacıyla paylaşılmaz.

4. SAKLAMA SÜRESİ
Aktif üyelik süresince ve üyelik silme talebinden itibaren 30 gün.

5. HAKLARINIZ (KVKK Madde 11)
• Kişisel verilerinizin işlenip işlenmediğini öğrenme
• İşlenmişse buna ilişkin bilgi talep etme
• İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme
• Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme
• Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme
• Kişisel verilerin silinmesini veya yok edilmesini isteme
• Otomatik sistemler vasıtasıyla işlenen veriler aleyhine bir sonucun ortaya çıkması durumunda itiraz etme
• Kanuna aykırı olarak işlenmesi sebebiyle zarara uğranması hâlinde zararın giderilmesini talep etme

Başvuru: info@medoqa.com (Yanıt süresi: 30 gün)`,
    },
    kullanim: {
      baslik: "Kullanım Koşulları",
      icerik: `MEDOQA PLATFORM KULLANIM KOŞULLARI — Versiyon 2.0

1. PLATFORMUN NİTELİĞİ
Medoqa, uluslararası sağlık turizmi alanında hasta ile sağlık kuruluşlarını dijital ortamda bir araya getiren yazılım tabanlı bir aracılık platformudur.

Medoqa:
• Tıbbi tanı koymaz
• Tedavi önermez veya garantilemez
• Sağlık hizmeti sunmaz
• Doktor veya klinik çalıştırmaz

Tüm tıbbi hizmetler, kullanıcının seçtiği ve anlaşma yaptığı klinik tarafından sunulur.

2. KULLANICI YÜKÜMLÜLÜKLERİ
• Platforma doğru bilgi girmek
• Hesap bilgilerini güvende tutmak
• Platformu yasal amaçlar için kullanmak
• Diğer kullanıcılara zarar verecek davranışlardan kaçınmak

3. HİZMET KOŞULLARI
• Platform üzerinden alınan teklifler ön bilgi niteliğindedir
• Nihai sözleşme klinik ile ayrıca imzalanır
• Tedavi kararı tamamen kullanıcıya aittir
• Komplikasyonlar ilgili klinik sorumluluğundadır

4. ÖDEME
• Model A: Tedavi bedeli doğrudan klinikle ödenir
• Model B (İleride): Platform üzerinden depozito sistemi

5. FİKRİ MÜLKİYET
Platform yazılımı, tasarımı ve içerikleri Medoqa'ya aittir.

6. SORUMLULUK SINIRLAMASI
Medoqa'nın azami sorumluluğu son 3 ay içinde tahsil edilen platform bedeli ile sınırlıdır.

7. UYGULANACAK HUKUK
Türkiye Cumhuriyeti hukuku geçerlidir. Uyuşmazlıklar İstanbul Mahkemeleri'nde çözümlenir.`,
    },
    klinik: {
      baslik: "Klinik Platform Kullanım ve Hizmet Sözleşmesi",
      icerik: `MEDOQA KLİNİK PLATFORM KULLANIM VE HİZMET SÖZLEŞMESİ — Versiyon 2.0

1. TANIMLAR
• Platform: Medoqa'nın işlettiği dijital sağlık turizmi aracılık platformu (medoqa.com)
• SaaS Bedeli: Yazılım hizmet bedeli (Software as a Service)
• Ücretsiz Dönem: Platform hizmetlerinin bedelsiz sunulduğu başlangıç dönemi

2. HİZMETİN KAPSAMI
Medoqa klinik'e şunları sunar:
• Çok dilli dijital profil sayfası (TR/EN/DE)
• Uluslararası hasta taleplerine erişim
• Güvenli mesajlaşma altyapısı
• Tedavi planlama ve diş şeması araçları
• Belge yönetim sistemi

3. ÜCRETLENDİRME
Ücretsiz Dönem: Kullanıcı tabanı oluşturma döneminde ücretsiz erişim.

Ücretli Döneme Geçiş: En az 60 gün önceden yazılı bildirim.

Türkiye'de Yerleşik Klinikler:
• Fatura: "Dijital platform yazılım kullanım hizmet bedeli (SaaS)"
• KDV: %20

Yurt Dışında Yerleşik Klinikler:
• KDV: %0 — Hizmet İhracatı İstisnası (KDV Kanunu 11/1-a)
• Ödeme: Döviz (EUR/USD/GBP)

Önemli: Bu model hasta yönlendirme komisyonu değil, dijital yazılım hizmet bedelidir.

4. KLİNİĞİN YÜKÜMLÜLÜKLERİ
• Sağlık Bakanlığı mevzuatına uyum
• Belge ve lisansların güncel tutulması
• Hasta verilerinin KVKK/GDPR kapsamında korunması
• Doğru fiyat ve hizmet bilgisi sunulması

5. SORUMLULUK
Medoqa tıbbi tedaviden sorumlu değildir. Klinik tüm tıbbi sorumlulukları üstlenir.

6. UYGULANACAK HUKUK
Türkiye Cumhuriyeti hukuku. İstanbul Mahkemeleri.

Elektronik onay, 6563 sayılı Kanun kapsamında ıslak imzayla eşdeğerdir.`,
    },
    cerez: {
      baslik: "Çerez Politikası",
      icerik: `MEDOQA ÇEREZ POLİTİKASI — Versiyon 2.0

1. ÇEREZ NEDİR?
Çerezler, web sitelerinin tarayıcınıza yerleştirdiği küçük metin dosyalarıdır. Oturum yönetimi, tercih saklama ve analitik amaçlarla kullanılır.

2. KULLANDIĞIMIZ ÇEREZLER

Zorunlu Çerezler (Kapatılamaz):
• Oturum çerezleri: Giriş durumunuzu korur
• Güvenlik çerezleri: CSRF koruması

Tercih Çerezleri:
• Dil tercihi: Seçtiğiniz dil (TR/EN/DE) saklanır

Analitik Çerezler (İzin gerektirir):
• Platform kullanım istatistikleri (anonim)

3. ÇEREZ YÖNETİMİ
Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz. Zorunlu çerezlerin kapatılması platformun çalışmasını etkileyebilir.

4. ÜÇÜNCİ TARAF ÇEREZLER
Supabase (altyapı) ve Vercel (hosting) zorunlu teknik çerezler kullanabilir.

5. İLETİŞİM
info@medoqa.com`,
    },
  },
  en: {
    baslik: "Legal Documents",
    altBaslik: "Privacy, terms of use and our agreements",
    menu: [
      { id: "kvkk", baslik: "Privacy Policy (GDPR)" },
      { id: "kullanim", baslik: "Terms of Use" },
      { id: "klinik", baslik: "Clinic Platform Agreement" },
      { id: "cerez", baslik: "Cookie Policy" },
    ],
    guncelleme: "Last updated: May 2025 — Version 2.0",
    kvkk: {
      baslik: "Privacy Policy (GDPR / KVKK)",
      icerik: `MEDOQA DIGITAL HEALTH PLATFORM — PRIVACY POLICY

Data Controller: Medoqa Digital Health Platform
Contact: info@medoqa.com

1. DATA WE PROCESS

Contact Data (Name, email, phone)
Purpose: Account creation, communication
Legal basis: GDPR Art. 6(1)(b) — Contract performance

Treatment Request Data
Purpose: Clinic matching, quote delivery
Legal basis: GDPR Art. 6(1)(b) — Contract performance

Health Data (Dental chart, health notes)
Purpose: Quote preparation
Legal basis: GDPR Art. 9(2)(a) — Explicit consent

Platform Usage Data
Purpose: Security, service improvement
Legal basis: GDPR Art. 6(1)(f) — Legitimate interest

2. DATA SHARING
Your data is only shared with the clinic/hotel/transfer company you request a quote from. Never sold, rented, or shared for marketing purposes.

3. RETENTION
During active membership and 30 days after account deletion request.

4. YOUR RIGHTS (GDPR Articles 15–22)
• Right of access
• Right to rectification
• Right to erasure ("right to be forgotten")
• Right to restriction of processing
• Right to data portability
• Right to object

Contact: info@medoqa.com (Response time: 30 days)`,
    },
    kullanim: {
      baslik: "Terms of Use",
      icerik: `MEDOQA PLATFORM TERMS OF USE — Version 2.0

1. NATURE OF THE PLATFORM
Medoqa is a software-based intermediary platform. It does NOT provide medical diagnoses, treatment recommendations, or healthcare services.

2. USER OBLIGATIONS
• Provide accurate information
• Keep account credentials secure
• Use the platform for lawful purposes

3. SERVICE TERMS
• Quotes are preliminary; final contract is with the clinic
• Treatment decisions are entirely yours
• Complications are the clinic's responsibility

4. LIABILITY
Medoqa's maximum liability is limited to the platform fee paid in the last 3 months.

5. GOVERNING LAW
Turkish law. Istanbul Courts.`,
    },
    klinik: {
      baslik: "Clinic Platform Usage Agreement",
      icerik: `MEDOQA CLINIC PLATFORM AGREEMENT — Version 2.0

1. PRICING
Free Period: Free access during growth phase.
Paid Period Transition: Minimum 60 days written notice.

Turkey-based clinics: 20% VAT
Non-Turkey clinics: 0% VAT (Service export exemption)

Note: This is a SaaS fee, not a patient referral commission.

2. CLINIC OBLIGATIONS
• Compliance with health tourism regulations
• Accurate documents and licenses
• GDPR/KVKK data protection compliance

3. LIABILITY
Medoqa is not responsible for medical treatment. Clinic assumes all medical liability.

4. GOVERNING LAW
Turkish law. Istanbul Courts.`,
    },
    cerez: {
      baslik: "Cookie Policy",
      icerik: `MEDOQA COOKIE POLICY — Version 2.0

1. WHAT ARE COOKIES?
Cookies are small text files placed by websites on your browser for session management and analytics.

2. COOKIES WE USE

Essential Cookies (Cannot be disabled):
• Session cookies: Maintain your login state
• Security cookies: CSRF protection

Preference Cookies:
• Language preference (TR/EN/DE)

Analytics Cookies (Require consent):
• Anonymous platform usage statistics

3. MANAGING COOKIES
You can manage cookies through your browser settings.

4. CONTACT
info@medoqa.com`,
    },
  },
  de: {
    baslik: "Rechtliche Dokumente",
    altBaslik: "Datenschutz, Nutzungsbedingungen und unsere Vereinbarungen",
    menu: [
      { id: "kvkk", baslik: "Datenschutzerklärung (DSGVO)" },
      { id: "kullanim", baslik: "Nutzungsbedingungen" },
      { id: "klinik", baslik: "Klinik-Plattformvertrag" },
      { id: "cerez", baslik: "Cookie-Richtlinie" },
    ],
    guncelleme: "Letzte Aktualisierung: Mai 2025 — Version 2.0",
    kvkk: {
      baslik: "Datenschutzerklärung (DSGVO / KVKK)",
      icerik: `MEDOQA DIGITALE GESUNDHEITSPLATTFORM — DATENSCHUTZERKLÄRUNG

Verantwortlicher: Medoqa Digitale Gesundheitsplattform
Kontakt: info@medoqa.com

1. VERARBEITETE DATEN

Kontaktdaten (Name, E-Mail, Telefon)
Zweck: Kontoerstellung, Kommunikation
Rechtsgrundlage: DSGVO Art. 6(1)(b)

Behandlungsanfragedaten
Zweck: Klinikabgleich, Angebotslieferung
Rechtsgrundlage: DSGVO Art. 6(1)(b)

Gesundheitsdaten (Zahnschema, Gesundheitsnotizen)
Zweck: Angebotserstellung
Rechtsgrundlage: DSGVO Art. 9(2)(a) — Ausdrückliche Einwilligung

2. DATENWEITERGABE
Ihre Daten werden nur mit der von Ihnen ausgewählten Klinik geteilt. Niemals verkauft oder für Marketingzwecke weitergegeben.

3. AUFBEWAHRUNG
Während der aktiven Mitgliedschaft und 30 Tage nach Löschungsantrag.

4. IHRE RECHTE (DSGVO Art. 15–22)
• Auskunftsrecht, Berichtigungsrecht, Löschungsrecht
• Einschränkungsrecht, Übertragbarkeitsrecht, Widerspruchsrecht

Kontakt: info@medoqa.com`,
    },
    kullanim: {
      baslik: "Nutzungsbedingungen",
      icerik: `MEDOQA PLATTFORM NUTZUNGSBEDINGUNGEN — Version 2.0

1. WESEN DER PLATTFORM
Medoqa ist eine softwarebasierte Vermittlungsplattform. Sie stellt KEINE medizinischen Diagnosen und bietet KEINE Gesundheitsdienstleistungen an.

2. NUTZERPFLICHTEN
• Korrekte Informationen angeben
• Zugangsdaten sicher aufbewahren
• Plattform nur für legale Zwecke nutzen

3. SERVICEBEDINGUNGEN
• Angebote sind vorläufig; Endvertrag mit der Klinik
• Behandlungsentscheidungen liegen beim Nutzer
• Komplikationen liegen in der Verantwortung der Klinik

4. ANWENDBARES RECHT
Türkisches Recht. Istanbuler Gerichte.`,
    },
    klinik: {
      baslik: "Klinik-Plattformnutzungsvertrag",
      icerik: `MEDOQA KLINIK-PLATTFORMVERTRAG — Version 2.0

1. PREISGESTALTUNG
Kostenlose Phase: Kostenloser Zugang in der Wachstumsphase.
Übergang zur kostenpflichtigen Phase: Mindestens 60 Tage schriftliche Benachrichtigung.

In der Türkei ansässige Kliniken: 20% MwSt.
Außerhalb der Türkei: 0% MwSt. (Dienstleistungsexportbefreiung)

Hinweis: Dies ist eine SaaS-Gebühr, keine Patientenvermittlungsprovision.

2. PFLICHTEN DER KLINIK
• Einhaltung der Gesundheitstourismusvorschriften
• Aktuelle Dokumente und Lizenzen
• DSGVO/KVKK-Datenschutz-Compliance

3. HAFTUNG
Medoqa haftet nicht für medizinische Behandlung. Die Klinik übernimmt alle medizinischen Haftungen.

4. ANWENDBARES RECHT
Türkisches Recht. Istanbuler Gerichte.`,
    },
    cerez: {
      baslik: "Cookie-Richtlinie",
      icerik: `MEDOQA COOKIE-RICHTLINIE — Version 2.0

1. WAS SIND COOKIES?
Cookies sind kleine Textdateien, die Websites in Ihrem Browser platzieren.

2. COOKIES DIE WIR VERWENDEN

Notwendige Cookies (Nicht deaktivierbar):
• Sitzungs-Cookies: Anmeldestatus
• Sicherheits-Cookies: CSRF-Schutz

Präferenz-Cookies:
• Sprachpräferenz (TR/EN/DE)

Analyse-Cookies (Einwilligung erforderlich):
• Anonyme Nutzungsstatistiken

3. KONTAKT
info@medoqa.com`,
    },
  },
};

export default function Sozlesmeler() {
  const { dil } = useDil();
  const s = SAYFALAR[dil as keyof typeof SAYFALAR] || SAYFALAR.tr;
  const [aktif, setAktif] = useState("kvkk");
  const aktifSayfa = s[aktif as keyof typeof s] as { baslik: string; icerik: string };

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>

        {/* Başlık */}
        <div style={{ marginBottom: "36px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#12103a", marginBottom: "8px" }}>{s.baslik}</h1>
          <p style={{ fontSize: "14px", color: "#888" }}>{s.altBaslik}</p>
          <div style={{ fontSize: "12px", color: "#aaa", marginTop: "4px" }}>{s.guncelleme}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "24px", alignItems: "start" }}>

          {/* Sol menü */}
          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", overflow: "hidden", position: "sticky", top: "20px" }}>
            {s.menu.map((item: { id: string; baslik: string }) => (
              <div
                key={item.id}
                onClick={() => setAktif(item.id)}
                style={{
                  padding: "14px 18px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: aktif === item.id ? 700 : 400,
                  color: aktif === item.id ? "#534AB7" : "#555",
                  background: aktif === item.id ? "#f0eeff" : "#fff",
                  borderLeft: aktif === item.id ? "3px solid #534AB7" : "3px solid transparent",
                  borderBottom: "1px solid #EEEDFE",
                }}
              >
                {item.baslik}
              </div>
            ))}
          </div>

          {/* İçerik */}
          <div style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "12px", padding: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#12103a", marginBottom: "24px", paddingBottom: "16px", borderBottom: "2px solid #EEEDFE" }}>
              {aktifSayfa.baslik}
            </h2>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "13px", lineHeight: "1.8", color: "#444", fontFamily: "inherit", margin: 0 }}>
              {aktifSayfa.icerik}
            </pre>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
