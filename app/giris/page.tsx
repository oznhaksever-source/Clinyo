"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";

// ─── SÖZLEŞME METİNLERİ ──────────────────────────────────────────────────────
const SOZLESME = {
  hasta: {
    tr: {
      baslik: "Kullanım Koşulları ve Aydınlatma Metni",
      metin: `MEDOQA DİJİTAL SAĞLIK PLATFORMU
HASTA KULLANIM VE ONAM FORMU — Versiyon 2.0

BÖLÜM A — PLATFORM HAKKINDA

Medoqa, uluslararası sağlık turizmi alanında hasta ile sağlık kuruluşlarını dijital ortamda bir araya getiren yazılım tabanlı bir aracılık platformudur.

Medoqa ne DEĞİLDİR:
• Tıbbi tanı koyan bir sistem değildir
• Tedavi öneren veya garantileyen bir platform değildir
• Sağlık hizmeti sunan bir kuruluş değildir

Tüm tıbbi hizmetler, sizin seçtiğiniz klinik tarafından sunulur.

BÖLÜM B — KİŞİSEL VERİLERİN KORUNMASI (KVKK / GDPR)

Veri Sorumlusu: Medoqa Dijital Sağlık Platformu

İşlenen Veriler:
• Ad, soyad, e-posta, telefon — İletişim ve hesap yönetimi
• Talep edilen tedavi bilgisi — Teklif eşleştirme
• Diş şeması / sağlık notları — Teklif hazırlanması (açık rıza gerektirir)
• Platform kullanım verileri — Güvenlik ve hizmet iyileştirme

Verileriniz kimlerle paylaşılır?
• Yalnızca teklif talep ettiğiniz klinik/otel/transfer firması ile
• Yasal zorunluluk halinde yetkili makamlarla
• Başka hiçbir üçüncü tarafla paylaşılmaz, satılmaz

Saklama Süresi: Aktif üyelik süresince ve üyelik silme talebinden itibaren 30 gün

Haklarınız (KVKK Madde 11 / GDPR Madde 15-22):
• Verilerinize erişim hakkı
• Yanlış verilerin düzeltilmesini talep hakkı
• Verilerinizin silinmesini talep hakkı ("unutulma hakkı")
• İşlemenin kısıtlanmasını talep hakkı
• Veri taşınabilirliği hakkı
• İşlemeye itiraz hakkı

Başvuru: info@medoqa.com

BÖLÜM C — HİZMET KULLANIM KOŞULLARI

1. Platform üzerinden alınan teklifler ön bilgi niteliğindedir. Nihai sözleşme klinik ile yapılır.
2. Tedavi kararı tamamen size aittir. Medoqa hiçbir tedaviyi tavsiye etmez.
3. Uluslararası seyahat, vize, konaklama ve tedavi masrafları size aittir (paket teklif kapsamı hariç).
4. Tedaviden doğan komplikasyonlar ilgili klinik sorumluluğundadır. Medoqa tıbbi sorumluluk taşımaz.
5. Platform görüşmeleri tıbbi muayene yerine geçmez.
6. Platform acil tıbbi yardım hizmeti sunmaz. Acil durumlarda 112'yi arayınız.

BÖLÜM D — ÖDEME KOŞULLARI

Model A — Doğrudan Ödeme (Mevcut):
Tedavi bedeli doğrudan klinik ile anlaşılır ve ödenir. Medoqa ödeme sürecine dahil değildir.

Model B — Platform Üzerinden Ödeme (İleride aktif edilecek):
Tedavi öncesi depozito Platform'a yatırılır. Tedavi tamamlandıktan sonra klinik ödemesi gerçekleştirilir. Bu model aktif edildiğinde ayrıca bilgilendirileceksiniz.

BÖLÜM E — UYGULANACAK HUKUK

İşbu sözleşme Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklar İstanbul Mahkemeleri'nde çözümlenir.`,
      onaylar: [
        { id: "aydinlatma", metin: "Aydınlatma metnini okudum ve anladım.", zorunlu: true },
        { id: "kullanim", metin: "Platform kullanım koşullarını kabul ediyorum.", zorunlu: true },
        { id: "kisisel", metin: "Kişisel verilerimin (ad, iletişim, tedavi bilgisi) belirtilen amaçlarla işlenmesine onay veriyorum.", zorunlu: true },
        { id: "saglik", metin: "Sağlık verilerimin (diş şeması, sağlık notları) yalnızca teklif almak amacıyla seçtiğim kliniklerle paylaşılmasına açık rızamı veriyorum.", zorunlu: true },
        { id: "ticari", metin: "Ticari iletişim (kampanya, duyuru) almak istiyorum.", zorunlu: false },
      ],
    },
    en: {
      baslik: "Terms of Use and Information Notice",
      metin: `MEDOQA DIGITAL HEALTH PLATFORM
PATIENT INFORMATION, TERMS OF USE AND CONSENT FORM — Version 2.0

SECTION A — ABOUT THE PLATFORM

Medoqa is a software-based intermediary platform connecting patients with healthcare providers in international health tourism.

Medoqa does NOT:
• Provide medical diagnoses
• Recommend or guarantee treatments
• Provide healthcare services directly

All medical services are provided by the clinic you choose.

SECTION B — DATA PROTECTION (GDPR / KVKK)

Data Controller: Medoqa Digital Health Platform

Data Processed:
• Name, email, phone — Communication and account management
• Requested treatment information — Quote matching
• Dental chart / health notes — Quote preparation (explicit consent required)
• Platform usage data — Security and service improvement

Who is your data shared with?
• Only with the clinic/hotel/transfer company you request a quote from
• With authorities when legally required
• Never shared, sold, or rented to any other third party

Retention Period: During active membership and 30 days after account deletion request

Your Rights (GDPR Articles 15-22):
• Right of access to your data
• Right to rectification
• Right to erasure ("right to be forgotten")
• Right to restriction of processing
• Right to data portability
• Right to object

Contact: info@medoqa.com

SECTION C — TERMS OF SERVICE

1. Quotes received through the platform are preliminary. The final contract is made with the clinic.
2. The treatment decision is entirely yours. Medoqa does not recommend any treatment.
3. Travel, visa, accommodation and treatment costs are your responsibility (unless in package offer).
4. Treatment complications are the clinic's responsibility. Medoqa bears no medical liability.
5. Platform consultations do not replace medical examinations.
6. The platform is not an emergency service. Call 112 in emergencies.

SECTION D — PAYMENT TERMS

Model A — Direct Payment (Current):
Treatment fees are agreed and paid directly with the clinic. Medoqa is not involved.

Model B — Platform Payment (Future):
A deposit will be paid to Medoqa before treatment. You will be informed when this model becomes active.

SECTION E — GOVERNING LAW

This agreement is governed by Turkish law. Disputes shall be resolved in Istanbul Courts.`,
      onaylar: [
        { id: "aydinlatma", metin: "I have read and understood the information notice.", zorunlu: true },
        { id: "kullanim", metin: "I accept the platform terms of use.", zorunlu: true },
        { id: "kisisel", metin: "I consent to the processing of my personal data for the purposes stated above.", zorunlu: true },
        { id: "saglik", metin: "I explicitly consent to my health data (dental chart) being shared only with selected clinics for quote purposes.", zorunlu: true },
        { id: "ticari", metin: "I agree to receive marketing communications.", zorunlu: false },
      ],
    },
    de: {
      baslik: "Nutzungsbedingungen und Datenschutzinformation",
      metin: `MEDOQA DIGITALE GESUNDHEITSPLATTFORM
PATIENTENINFORMATION, NUTZUNGSBEDINGUNGEN UND EINWILLIGUNGSERKLÄRUNG — Version 2.0

ABSCHNITT A — ÜBER DIE PLATTFORM

Medoqa ist eine softwarebasierte Vermittlungsplattform, die Patienten mit Gesundheitsdienstleistern im internationalen Gesundheitstourismus verbindet.

Medoqa tut NICHT:
• Stellt keine medizinischen Diagnosen
• Empfiehlt oder garantiert keine Behandlungen
• Erbringt keine Gesundheitsdienstleistungen direkt

Alle medizinischen Leistungen werden von der von Ihnen gewählten Klinik erbracht.

ABSCHNITT B — DATENSCHUTZ (DSGVO / KVKK)

Verantwortlicher: Medoqa Digitale Gesundheitsplattform

Verarbeitete Daten:
• Name, E-Mail, Telefon — Kommunikation und Kontoverwaltung
• Angefragte Behandlungsinformationen — Angebotsabgleich
• Zahnschema / Gesundheitsnotizen — Angebotserstellung (ausdrückliche Einwilligung erforderlich)
• Plattformnutzungsdaten — Sicherheit und Serviceverbesserung

Ihre Rechte (DSGVO Art. 15-22):
• Auskunftsrecht, Berichtigungsrecht, Löschungsrecht, Einschränkungsrecht, Übertragbarkeitsrecht, Widerspruchsrecht

Kontakt: info@medoqa.com

ABSCHNITT C — NUTZUNGSBEDINGUNGEN

1. Angebote sind vorläufig; der endgültige Vertrag wird mit der Klinik geschlossen.
2. Die Behandlungsentscheidung liegt ausschließlich bei Ihnen.
3. Reise- und Behandlungskosten liegen in Ihrer Verantwortung.
4. Komplikationen liegen in der Verantwortung der Klinik. Medoqa trägt keine medizinische Haftung.
5. Plattformgespräche ersetzen keine ärztliche Untersuchung.
6. Die Plattform ist kein Notfalldienst.

ABSCHNITT D — ZAHLUNGSBEDINGUNGEN

Modell A — Direktzahlung (Aktuell): Direkt mit der Klinik.
Modell B — Plattformzahlung (Zukünftig): Sie werden informiert, wenn dieses Modell aktiviert wird.

ABSCHNITT E — ANWENDBARES RECHT

Türkisches Recht. Streitigkeiten werden vor Istanbuler Gerichten entschieden.`,
      onaylar: [
        { id: "aydinlatma", metin: "Ich habe die Datenschutzinformationen gelesen und verstanden.", zorunlu: true },
        { id: "kullanim", metin: "Ich akzeptiere die Nutzungsbedingungen.", zorunlu: true },
        { id: "kisisel", metin: "Ich willige in die Verarbeitung meiner personenbezogenen Daten ein.", zorunlu: true },
        { id: "saglik", metin: "Ich willige ausdrücklich in die Verarbeitung meiner Gesundheitsdaten (Zahnschema) ein.", zorunlu: true },
        { id: "ticari", metin: "Ich möchte Marketingkommunikation erhalten.", zorunlu: false },
      ],
    },
  },
  klinik: {
    tr: {
      baslik: "Klinik Platform Kullanım Sözleşmesi",
      metin: `MEDOQA DİJİTAL SAĞLIK PLATFORMU
KLİNİK PLATFORM KULLANIM VE HİZMET SÖZLEŞMESİ — Versiyon 2.0

MADDE 1 — TANIMLAR

Platform: Medoqa'nın işlettiği dijital sağlık turizmi aracılık platformu (medoqa.com)
Platform Hizmetleri: Dijital profil, hasta eşleştirme, teklif sistemi, mesajlaşma, belge yönetimi ve analitik araçları
SaaS Bedeli: Yazılım hizmet bedeli (Software as a Service)

MADDE 2 — HİZMETİN KAPSAMI

Medoqa, klinik'e şu dijital hizmetleri sunar:
• Çok dilli dijital profil sayfası
• Uluslararası hasta taleplerine erişim ve teklif sistemi
• Güvenli mesajlaşma altyapısı
• Tedavi planlama ve diş şeması araçları
• Belge yükleme ve onay takip sistemi

MADDE 3 — PLATFORM ÜCRETLENDİRME

Ücretsiz Dönem: Platform, büyüme döneminde ücretsiz erişim sağlar.

Ücretli Döneme Geçiş: En az 60 takvim günü önceden yazılı bildirim yapılır.

Türkiye'de Yerleşik Klinikler:
• Fatura kalemi: "Dijital platform yazılım kullanım hizmet bedeli (SaaS)"
• KDV: %20 (3065 sayılı KDV Kanunu)

Yurt Dışında Yerleşik Klinikler:
• KDV: %0 — Hizmet İhracatı İstisnası (KDV Kanunu Madde 11/1-a)
• Ödeme: Döviz (EUR/USD/GBP)

Ücretli Dönemi Reddetme Hakkı: Klinik, ücretli döneme geçişi kabul etmeme hakkına sahiptir. Bu durumda üyelik cezai yaptırım olmaksızın sonlandırılır.

Önemli Not: Bu model hasta yönlendirme komisyonu niteliği taşımaz. Medoqa'nın sunduğu dijital yazılım hizmetlerinin karşılığıdır.

MADDE 4 — KLİNİĞİN YÜKÜMLÜLÜKLERİ

a) T.C. Sağlık Bakanlığı Uluslararası Sağlık Turizmi Yönetmeliği'ne uyum
b) Platforma yüklenen tüm belge ve lisansların gerçek ve güncel olması
c) Hasta tekliflerinde sunulan bilgilerin doğru olması
d) Hasta verilerinin KVKK ve GDPR kapsamında korunması
e) Platform üzerinden iletişime geçilen hastaların aktif üyelik süresince platform dışına yönlendirilmemesi

MADDE 5 — SORUMLULUK SINIRLAMASI

Medoqa, hasta ile klinik arasındaki tıbbi tedaviden sorumlu değildir. Platform yalnızca dijital aracılık ve yazılım hizmeti sunar. Klinik, sunduğu hizmetlerden doğan tüm hukuki, tıbbi ve idari sorumlulukları üstlenir.

MADDE 6 — VERİ GİZLİLİĞİ (KVKK / GDPR)

Medoqa, 6698 sayılı KVKK ve AB GDPR kapsamında veri işleyen (data processor) sıfatıyla hareket eder. Klinik verileri yalnızca platform hizmetinin sunulması amacıyla işlenir.

MADDE 7 — SÖZLEŞMENİN SONA ERMESİ

Her iki taraf 30 gün önceden yazılı bildirimle sözleşmeyi sonlandırabilir. Sözleşme sona erdiğinde veriler 30 gün içinde silinir.

MADDE 8 — UYGULANACAK HUKUK

İşbu sözleşme Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklar İstanbul Mahkemeleri'nde çözümlenir.

Elektronik onay, 6563 sayılı Kanun kapsamında ıslak imza ile eşdeğer hukuki geçerlilik taşır.`,
      onaylar: [
        { id: "sozlesme", metin: "Platform Kullanım Sözleşmesi'ni okudum ve tüm maddelerini kabul ediyorum.", zorunlu: true },
        { id: "kisisel", metin: "Kurumsal verilerimin belirtilen amaçlarla işlenmesine onay veriyorum.", zorunlu: true },
        { id: "ucret", metin: "Ücretsiz dönemden ücretli döneme geçişin 60 gün önceden bildirileceğini anlıyorum.", zorunlu: true },
        { id: "sorumluluk", metin: "Platformun dijital aracılık hizmeti sunduğunu, tıbbi sorumluluk taşımadığını anlıyorum.", zorunlu: true },
      ],
    },
    en: {
      baslik: "Clinic Platform Usage Agreement",
      metin: `MEDOQA DIGITAL HEALTH PLATFORM
CLINIC PLATFORM USAGE AND SERVICE AGREEMENT — Version 2.0

ARTICLE 1 — DEFINITIONS

Platform: Digital health tourism intermediary platform operated by Medoqa (medoqa.com)
Platform Services: Digital profile, patient matching, quote system, messaging, document management and analytics
SaaS Fee: Software as a Service usage fee

ARTICLE 2 — SCOPE OF SERVICES

Medoqa provides the clinic with:
• Multilingual digital profile page
• Access to international patient requests and quote system
• Secure messaging infrastructure
• Treatment planning and dental chart tools
• Document upload and approval tracking system

ARTICLE 3 — PLATFORM PRICING

Free Period: Platform provides free access during the growth period.

Transition to Paid Period: Written notice at least 60 calendar days in advance.

Turkey-Based Clinics:
• Invoice item: "Digital platform software usage service fee (SaaS)"
• VAT: 20% (Turkish VAT Law)

Non-Turkey-Based Clinics:
• VAT: 0% — Service Export Exemption (VAT Law Article 11/1-a)
• Payment: Foreign currency (EUR/USD/GBP)

Right to Decline Paid Period: The clinic may decline the transition without penalty.

Important Note: This model does not constitute patient referral commission. It is the fee for digital software services provided by Medoqa.

ARTICLE 4 — CLINIC OBLIGATIONS

a) Compliance with T.R. Ministry of Health International Health Tourism Regulations
b) All uploaded documents and licenses must be genuine and current
c) Accurate information in patient quotes
d) Protection of patient data under KVKK and GDPR
e) No redirection of platform-contacted patients outside the platform during active membership

ARTICLE 5 — LIABILITY LIMITATION

Medoqa is not responsible for medical treatment between patient and clinic. The clinic assumes all legal, medical and administrative responsibilities.

ARTICLE 6 — GOVERNING LAW

Turkish law applies. Disputes resolved in Istanbul Courts. Electronic consent has equivalent legal validity to wet signature under Turkish law.`,
      onaylar: [
        { id: "sozlesme", metin: "I have read and accept all articles of the Platform Usage Agreement.", zorunlu: true },
        { id: "kisisel", metin: "I consent to my corporate data being processed for the stated purposes.", zorunlu: true },
        { id: "ucret", metin: "I understand that transition to paid period will be notified 60 days in advance.", zorunlu: true },
        { id: "sorumluluk", metin: "I understand the platform provides digital intermediary services and bears no medical liability.", zorunlu: true },
      ],
    },
    de: {
      baslik: "Klinik-Plattformnutzungsvertrag",
      metin: `MEDOQA DIGITALE GESUNDHEITSPLATTFORM
KLINIK PLATTFORMNUTZUNGS- UND DIENSTLEISTUNGSVERTRAG — Version 2.0

ARTIKEL 1 — DEFINITIONEN

Plattform: Digitale Gesundheitstourismus-Vermittlungsplattform von Medoqa (medoqa.com)
SaaS-Gebühr: Software-as-a-Service-Nutzungsgebühr

ARTIKEL 2 — LEISTUNGSUMFANG

Medoqa stellt der Klinik zur Verfügung:
• Mehrsprachige digitale Profilseite
• Zugang zu internationalen Patientenanfragen und Angebotssystem
• Sichere Messaging-Infrastruktur
• Behandlungsplanung und Zahnschema-Tools
• Dokumenten-Upload und Genehmigungsverfolgung

ARTIKEL 3 — PLATTFORMPREISE

Kostenlose Periode: Die Plattform bietet in der Wachstumsphase kostenlosen Zugang.
Übergang zur kostenpflichtigen Periode: Schriftliche Benachrichtigung mindestens 60 Kalendertage im Voraus.

In der Türkei ansässige Kliniken: MwSt: 20%
Außerhalb der Türkei ansässige Kliniken: MwSt: 0% (Dienstleistungsexportbefreiung)

ARTIKEL 4 — PFLICHTEN DER KLINIK

a) Einhaltung türkischer Gesundheitstourismusvorschriften
b) Alle Dokumente müssen echt und aktuell sein
c) Korrekte Informationen in Patientenangeboten
d) Schutz der Patientendaten gemäß DSGVO und KVKK

ARTIKEL 5 — ANWENDBARES RECHT

Türkisches Recht. Streitigkeiten vor Istanbuler Gerichten.`,
      onaylar: [
        { id: "sozlesme", metin: "Ich habe den Plattformnutzungsvertrag gelesen und akzeptiere alle Artikel.", zorunlu: true },
        { id: "kisisel", metin: "Ich willige in die Verarbeitung meiner Unternehmensdaten ein.", zorunlu: true },
        { id: "ucret", metin: "Ich verstehe, dass der Übergang zur kostenpflichtigen Periode 60 Tage im Voraus mitgeteilt wird.", zorunlu: true },
        { id: "sorumluluk", metin: "Ich verstehe, dass die Plattform digitale Vermittlungsdienste anbietet und keine medizinische Haftung trägt.", zorunlu: true },
      ],
    },
  },
};

// Otel ve transfer için klinik sözleşmesini kullan
const getSozlesme = (hesapTuru: string, dil: string) => {
  const tip = (hesapTuru === "hasta") ? "hasta" : "klinik";
  const d = (dil === "tr" || dil === "en" || dil === "de") ? dil : "tr";
  return SOZLESME[tip][d];
};

// ─── MODAL BİLEŞENİ ──────────────────────────────────────────────────────────
function SozlesmeModal({ hesapTuru, dil, onKabul, onIptal }: {
  hesapTuru: string;
  dil: string;
  onKabul: (onaylar: Record<string, boolean>) => void;
  onIptal: () => void;
}) {
  const sozlesme = getSozlesme(hesapTuru, dil);
  const [scrollTamamlandi, setScrollTamamlandi] = useState(false);
  const [onaylar, setOnaylar] = useState<Record<string, boolean>>({});
  const metinRef = useRef<HTMLDivElement>(null);

  const zorunluOnaylar = sozlesme.onaylar.filter(o => o.zorunlu);
  const tumZorunluIsaretli = zorunluOnaylar.every(o => onaylar[o.id]);

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const sonuna = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
    if (sonuna) setScrollTamamlandi(true);
  }

  const arayuzMetin = {
    tr: { onay: "Onaylıyorum ve Devam Et", iptal: "Vazgeç", scrollUyari: "⬇️ Lütfen sözleşmenin tamamını okuyunuz", zorunluUyari: "* Zorunlu" },
    en: { onay: "I Agree and Continue", iptal: "Cancel", scrollUyari: "⬇️ Please read the entire agreement", zorunluUyari: "* Required" },
    de: { onay: "Ich stimme zu und weiter", iptal: "Abbrechen", scrollUyari: "⬇️ Bitte lesen Sie den gesamten Vertrag", zorunluUyari: "* Erforderlich" },
  };
  const d = (dil === "tr" || dil === "en" || dil === "de") ? dil : "tr";
  const ui = arayuzMetin[d];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "580px", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Başlık */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #EEEDFE", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#12103a" }}>{sozlesme.baslik}</div>
          <button onClick={onIptal} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#888" }}>✕</button>
        </div>

        {/* Metin - scroll zorunlu */}
        <div ref={metinRef} onScroll={handleScroll} style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px", lineHeight: "1.7", color: "#444", fontFamily: "inherit", margin: 0 }}>
            {sozlesme.metin}
          </pre>
          {/* Onay kutuları — scroll sonrası aktif */}
          <div style={{ marginTop: "24px", borderTop: "2px solid #EEEDFE", paddingTop: "20px" }}>
            {!scrollTamamlandi && (
              <div style={{ textAlign: "center", fontSize: "12px", color: "#BA7517", background: "#fff8e1", padding: "8px", borderRadius: "8px", marginBottom: "12px" }}>
                {ui.scrollUyari}
              </div>
            )}
            {sozlesme.onaylar.map(onay => (
              <label key={onay.id} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "12px", cursor: scrollTamamlandi ? "pointer" : "not-allowed", opacity: scrollTamamlandi ? 1 : 0.4 }}>
                <input
                  type="checkbox"
                  disabled={!scrollTamamlandi}
                  checked={!!onaylar[onay.id]}
                  onChange={e => setOnaylar(prev => ({ ...prev, [onay.id]: e.target.checked }))}
                  style={{ marginTop: "2px", width: "16px", height: "16px", flexShrink: 0, cursor: scrollTamamlandi ? "pointer" : "not-allowed" }}
                />
                <span style={{ fontSize: "13px", color: "#333", lineHeight: "1.5" }}>
                  {onay.metin}
                  {onay.zorunlu && <span style={{ color: "#c00", marginLeft: "4px" }}>{ui.zorunluUyari}</span>}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Butonlar */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #EEEDFE", display: "flex", gap: "10px" }}>
          <button onClick={onIptal} style={{ flex: 1, padding: "12px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "14px", cursor: "pointer", color: "#666" }}>
            {ui.iptal}
          </button>
          <button
            onClick={() => { if (tumZorunluIsaretli) onKabul(onaylar); }}
            disabled={!tumZorunluIsaretli || !scrollTamamlandi}
            style={{ flex: 2, padding: "12px", background: tumZorunluIsaretli && scrollTamamlandi ? "#534AB7" : "#e5e7eb", color: tumZorunluIsaretli && scrollTamamlandi ? "#fff" : "#999", border: "none", borderRadius: "10px", fontSize: "14px", cursor: tumZorunluIsaretli && scrollTamamlandi ? "pointer" : "not-allowed", fontWeight: 600 }}
          >
            {ui.onay}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ANA BİLEŞEN ─────────────────────────────────────────────────────────────
export default function Giris() {
  const [mod, setMod] = useState<"giris" | "kayit">("giris");
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [hesapTuru, setHesapTuru] = useState("hasta");
  const [mesaj, setMesaj] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mobil, setMobil] = useState(false);
  const [sifreGoster, setSifreGoster] = useState(false);
  const [sifreGoster2, setSifreGoster2] = useState(false);
  const [sozlesmeAcik, setSozlesmeAcik] = useState(false);
  const { dil, dilDegistir } = useDil();

  const supabase = createClient();

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  const metinler = {
    tr: {
      hosGeldiniz: "Hesabınıza giriş yapın",
      yeniHesap: "Yeni hesap oluşturun",
      girisYap: "Giriş Yap", kayitOl: "Kayıt Ol",
      eposta: "E-posta", sifre: "Şifre", ad: "Ad", soyad: "Soyad",
      hesapTuru: "Hesap Türü",
      hasta: "Hasta olarak kayıt ol", klinik: "Klinik olarak kayıt ol",
      otel: "Otel olarak kayıt ol", transfer: "Transfer şirketi olarak kayıt ol",
      girisYapBtn: "Giriş Yap", hesapOlustur: "Sözleşmeleri Oku ve Kayıt Ol",
      kayitBasarili: "Kayıt başarılı! E-posta adresinize onay maili gönderdik.",
      anaSayfayaDon: "Ana Sayfaya Dön",
    },
    en: {
      hosGeldiniz: "Sign in to your account",
      yeniHesap: "Create a new account",
      girisYap: "Sign In", kayitOl: "Sign Up",
      eposta: "Email", sifre: "Password", ad: "First Name", soyad: "Last Name",
      hesapTuru: "Account Type",
      hasta: "Register as Patient", klinik: "Register as Clinic",
      otel: "Register as Hotel", transfer: "Register as Transfer Company",
      girisYapBtn: "Sign In", hesapOlustur: "Read Agreements & Register",
      kayitBasarili: "Registration successful! We sent a confirmation email.",
      anaSayfayaDon: "Back to Home",
    },
    de: {
      hosGeldiniz: "Melden Sie sich an",
      yeniHesap: "Neues Konto erstellen",
      girisYap: "Anmelden", kayitOl: "Registrieren",
      eposta: "E-Mail", sifre: "Passwort", ad: "Vorname", soyad: "Nachname",
      hesapTuru: "Kontotyp",
      hasta: "Als Patient registrieren", klinik: "Als Klinik registrieren",
      otel: "Als Hotel registrieren", transfer: "Als Transferunternehmen registrieren",
      girisYapBtn: "Anmelden", hesapOlustur: "Vereinbarungen lesen & registrieren",
      kayitBasarili: "Registrierung erfolgreich! Wir haben eine Bestätigungs-E-Mail gesendet.",
      anaSayfayaDon: "Zurück zur Startseite",
    },
  };

  const m = metinler[dil as keyof typeof metinler] || metinler.tr;

  const inputStyle = {
    width: "100%", border: "1px solid #e5e7eb", borderRadius: "10px",
    padding: "12px 14px", fontSize: "14px", boxSizing: "border-box" as const,
    outline: "none", fontFamily: "inherit"
  };
  const labelStyle = {
    fontSize: "13px", color: "#555", display: "block" as const,
    marginBottom: "6px", fontWeight: 500 as const
  };

  const hataMesajlari: Record<string, Record<string, string>> = {
    tr: {
      "Invalid login credentials": "E-posta veya şifre hatalı.",
      "Email not confirmed": "E-posta adresiniz doğrulanmamış.",
      "User already registered": "Bu e-posta adresi zaten kayıtlı.",
      "Password should be at least 6 characters": "Şifre en az 6 karakter olmalıdır.",
      "Unable to validate email address: invalid format": "Geçersiz e-posta adresi formatı.",
      "Signup requires a valid password": "Geçerli bir şifre giriniz.",
      "User not found": "Kullanıcı bulunamadı.",
      "Too many requests": "Çok fazla deneme yaptınız. Lütfen bekleyin.",
    },
    en: {
      "Invalid login credentials": "Invalid email or password.",
      "Email not confirmed": "Your email address has not been confirmed.",
      "User already registered": "This email address is already registered.",
      "Password should be at least 6 characters": "Password must be at least 6 characters.",
    },
    de: {
      "Invalid login credentials": "Ungültige E-Mail oder ungültiges Passwort.",
      "Email not confirmed": "Ihre E-Mail-Adresse wurde nicht bestätigt.",
      "User already registered": "Diese E-Mail-Adresse ist bereits registriert.",
    },
  };

  function hataMetniCevir(msg: string) {
    const sozluk = hataMesajlari[dil] || hataMesajlari.tr;
    for (const [ing, cevirisi] of Object.entries(sozluk)) {
      if (msg.includes(ing)) return cevirisi;
    }
    return msg;
  }

  async function girisYap() {
    setYukleniyor(true);
    setMesaj("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: sifre });
    if (error) { setMesaj(hataMetniCevir(error.message)); }
    else if (data.user) {
      const { data: profile } = await supabase.from("profiles").select("hesap_turu").eq("id", data.user.id).single();
      if (profile?.hesap_turu === "admin") window.location.href = "/admin";
      else if (profile?.hesap_turu === "klinik") window.location.href = "/klinik-panel";
      else if (profile?.hesap_turu === "otel") window.location.href = "/otel-panel";
      else if (profile?.hesap_turu === "transfer") window.location.href = "/transfer-panel";
      else window.location.href = "/hasta-panel";
    }
    setYukleniyor(false);
  }

  // Kayıt butonu: önce form doğrulama, sonra modal aç
  function kayitButonu() {
    if (!ad || !soyad || !email || !sifre) {
      setMesaj(dil === "de" ? "Bitte füllen Sie alle Felder aus." : dil === "en" ? "Please fill in all fields." : "Lütfen tüm alanları doldurunuz.");
      return;
    }
    if (sifre.length < 6) {
      setMesaj(hataMetniCevir("Password should be at least 6 characters"));
      return;
    }
    setMesaj("");
    setSozlesmeAcik(true);
  }

  // Modal onaylandıktan sonra gerçek kayıt
  async function sozlesmeKabul(onaylar: Record<string, boolean>) {
    setSozlesmeAcik(false);
    setYukleniyor(true);
    setMesaj("");

    const { data, error } = await supabase.auth.signUp({ email, password: sifre });
    if (error) {
      setMesaj(hataMetniCevir(error.message));
      setYukleniyor(false);
      return;
    }

    if (data.user) {
      // Profil kaydet
      await supabase.from("profiles").upsert({
        id: data.user.id, ad, soyad, email, hesap_turu: hesapTuru,
        onaylandi: false,
      });

      // Onam kaydet
      await supabase.from("hasta_onamlar").insert({
        kullanici_id: data.user.id,
        onam_turu: "kayit",
        onam_versiyonu: "2.0",
        zorunlu_onaylar: onaylar,
        saglik_verisi_onami: !!onaylar["saglik"],
        ticari_iletisim_onami: !!onaylar["ticari"],
      });

      setMesaj(m.kayitBasarili);
      setMod("giris");
      setAd(""); setSoyad(""); setEmail(""); setSifre("");
    }
    setYukleniyor(false);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#12103a", fontFamily: "'Segoe UI', sans-serif", display: "flex", flexDirection: "column" }}>

      {/* Modal */}
      {sozlesmeAcik && (
        <SozlesmeModal
          hesapTuru={hesapTuru}
          dil={dil}
          onKabul={sozlesmeKabul}
          onIptal={() => setSozlesmeAcik(false)}
        />
      )}

      {/* Navbar */}
      <nav style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ fontSize: "22px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>
          med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            {(["tr", "en", "de", "ar", "ru", "fr"] as const).map(d => (
              <span key={d} onClick={() => dilDegistir(d)} style={{ fontSize: "11px", padding: "3px 8px", border: `1px solid ${dil === d ? "#534AB7" : "#2a2a4e"}`, borderRadius: "4px", color: dil === d ? "#7F77DD" : "#aab4c8", cursor: "pointer", textTransform: "uppercase" }}>{d}</span>
            ))}
          </div>
          <a href="/" style={{ color: "#aab4c8", fontSize: "13px", textDecoration: "none" }}>{m.anaSayfayaDon}</a>
        </div>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: mobil ? "20px 16px" : "32px" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: mobil ? "28px 20px" : "40px", width: "100%", maxWidth: "420px" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#12103a", marginBottom: "6px" }}>
              med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
            </div>
            <p style={{ fontSize: "14px", color: "#888", margin: 0 }}>
              {mod === "giris" ? m.hosGeldiniz : m.yeniHesap}
            </p>
          </div>

          {/* Tab */}
          <div style={{ display: "flex", background: "#f9fafb", borderRadius: "10px", padding: "4px", marginBottom: "24px" }}>
            <button onClick={() => setMod("giris")} style={{ flex: 1, padding: "9px", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 600, background: mod === "giris" ? "#fff" : "transparent", color: mod === "giris" ? "#534AB7" : "#888", boxShadow: mod === "giris" ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
              {m.girisYap}
            </button>
            <button onClick={() => setMod("kayit")} style={{ flex: 1, padding: "9px", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 600, background: mod === "kayit" ? "#fff" : "transparent", color: mod === "kayit" ? "#534AB7" : "#888", boxShadow: mod === "kayit" ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
              {m.kayitOl}
            </button>
          </div>

          {mesaj && (
            <div style={{ padding: "10px 14px", borderRadius: "8px", marginBottom: "16px", fontSize: "13px", background: mesaj.includes("Hata") || mesaj.includes("hatalı") || mesaj.includes("doldurunuz") ? "#fff0f0" : "#f0fff4", color: mesaj.includes("Hata") || mesaj.includes("hatalı") || mesaj.includes("doldurunuz") ? "#c00" : "#0a0", border: "1px solid #ddd" }}>
              {mesaj}
            </div>
          )}

          {/* GİRİŞ FORMU */}
          {mod === "giris" ? (
            <div>
              <div style={{ marginBottom: "14px" }}>
                <label style={labelStyle}>{m.eposta}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>{m.sifre}</label>
                <div style={{ position: "relative" }}>
                  <input type={sifreGoster ? "text" : "password"} value={sifre} onChange={e => setSifre(e.target.value)} onKeyDown={e => { if (e.key === "Enter") girisYap(); }} style={{ ...inputStyle, paddingRight: "44px" }} />
                  <button onClick={() => setSifreGoster(!sifreGoster)} type="button" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "18px" }}>
                    {sifreGoster ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
              <button onClick={girisYap} disabled={yukleniyor} style={{ width: "100%", background: "#534AB7", color: "#fff", border: "none", padding: "13px", borderRadius: "10px", fontSize: "15px", cursor: "pointer", fontWeight: 600, opacity: yukleniyor ? 0.7 : 1 }}>
                {yukleniyor ? "..." : m.girisYapBtn}
              </button>
            </div>
          ) : (
            /* KAYIT FORMU */
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                <div>
                  <label style={labelStyle}>{m.ad}</label>
                  <input type="text" value={ad} onChange={e => setAd(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{m.soyad}</label>
                  <input type="text" value={soyad} onChange={e => setSoyad(e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={labelStyle}>{m.eposta}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={labelStyle}>{m.sifre}</label>
                <div style={{ position: "relative" }}>
                  <input type={sifreGoster2 ? "text" : "password"} value={sifre} onChange={e => setSifre(e.target.value)} style={{ ...inputStyle, paddingRight: "44px" }} />
                  <button onClick={() => setSifreGoster2(!sifreGoster2)} type="button" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "18px" }}>
                    {sifreGoster2 ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>{m.hesapTuru}</label>
                <select value={hesapTuru} onChange={e => setHesapTuru(e.target.value)} style={{ ...inputStyle, background: "#fff" }}>
                  <option value="hasta">{m.hasta}</option>
                  <option value="klinik">{m.klinik}</option>
                  <option value="otel">{m.otel}</option>
                  <option value="transfer">{m.transfer}</option>
                </select>
              </div>
              <button onClick={kayitButonu} disabled={yukleniyor} style={{ width: "100%", background: "#534AB7", color: "#fff", border: "none", padding: "13px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: 600, opacity: yukleniyor ? 0.7 : 1 }}>
                {yukleniyor ? "..." : m.hesapOlustur}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
