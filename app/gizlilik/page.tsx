"use client";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function GizlilikPage() {
  const { dil } = useDil();

  const baslik = dil === "tr" ? "Gizlilik Politikası" : dil === "de" ? "Datenschutzrichtlinie" : dil === "ar" ? "سياسة الخصوصية" : dil === "ru" ? "Политика конфиденциальности" : dil === "fr" ? "Politique de confidentialité" : "Privacy Policy";
  const guncelleme = dil === "tr" ? "Son güncelleme: Mayıs 2025" : dil === "de" ? "Letzte Aktualisierung: Mai 2025" : dil === "ar" ? "آخر تحديث: مايو 2025" : dil === "ru" ? "Последнее обновление: май 2025" : dil === "fr" ? "Dernière mise à jour : mai 2025" : "Last updated: May 2025";

  const sections = dil === "tr" ? [
    { baslik: "1. Toplanan Veriler", icerik: "Medoqa platformunu kullandığınızda ad, e-posta, telefon numarası ve sağlık bilgileriniz gibi kişisel veriler toplanabilir. Bu veriler yalnızca tedavi sürecinizin yönetimi için kullanılır." },
    { baslik: "2. Verilerin Kullanımı", icerik: "Toplanan veriler; teklif sürecinin yönetimi, kliniklerle iletişim kurulması, ödeme işlemlerinin gerçekleştirilmesi ve platform hizmetlerinin iyileştirilmesi amacıyla kullanılır." },
    { baslik: "3. Veri Paylaşımı", icerik: "Sağlık verileriniz yalnızca tedavinizi gerçekleştirecek klinikle paylaşılır. Üçüncü taraflarla ticari amaçla asla paylaşılmaz." },
    { baslik: "4. Veri Güvenliği", icerik: "Verileriniz SSL şifreleme ve güvenli sunucular aracılığıyla korunur. Supabase altyapısı ile güvenli veri depolama sağlanmaktadır." },
    { baslik: "5. Çerezler", icerik: "Platform, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz." },
    { baslik: "6. Haklarınız", icerik: "GDPR kapsamında verilerinize erişim, düzeltme, silme ve taşınabilirlik hakkına sahipsiniz. Bu haklarınızı kullanmak için info@medoqa.com adresine başvurabilirsiniz." },
    { baslik: "7. İletişim", icerik: "Gizlilik politikamızla ilgili sorularınız için info@medoqa.com adresine e-posta gönderebilirsiniz." },
  ] : dil === "de" ? [
    { baslik: "1. Erhobene Daten", icerik: "Bei der Nutzung der Medoqa-Plattform können persönliche Daten wie Name, E-Mail, Telefonnummer und Gesundheitsinformationen erhoben werden. Diese Daten werden ausschließlich für die Verwaltung Ihres Behandlungsprozesses verwendet." },
    { baslik: "2. Datenverwendung", icerik: "Die erhobenen Daten werden für die Verwaltung des Angebotsprozesses, die Kommunikation mit Kliniken, die Abwicklung von Zahlungen und die Verbesserung der Plattformdienste verwendet." },
    { baslik: "3. Datenweitergabe", icerik: "Ihre Gesundheitsdaten werden nur mit der Klinik geteilt, die Ihre Behandlung durchführt. Sie werden niemals zu kommerziellen Zwecken an Dritte weitergegeben." },
    { baslik: "4. Datensicherheit", icerik: "Ihre Daten werden durch SSL-Verschlüsselung und sichere Server geschützt." },
    { baslik: "5. Cookies", icerik: "Die Plattform verwendet Cookies zur Verbesserung der Benutzererfahrung. Sie können Cookies in Ihren Browsereinstellungen deaktivieren." },
    { baslik: "6. Ihre Rechte", icerik: "Gemäß DSGVO haben Sie das Recht auf Zugang, Berichtigung, Löschung und Übertragbarkeit Ihrer Daten. Wenden Sie sich an info@medoqa.com." },
    { baslik: "7. Kontakt", icerik: "Für Fragen zu unserer Datenschutzrichtlinie senden Sie eine E-Mail an info@medoqa.com." },
  ] : [
    { baslik: "1. Data Collection", icerik: "When using the Medoqa platform, personal data such as name, email, phone number and health information may be collected. This data is used solely for managing your treatment process." },
    { baslik: "2. Data Usage", icerik: "Collected data is used for managing the quote process, communicating with clinics, processing payments and improving platform services." },
    { baslik: "3. Data Sharing", icerik: "Your health data is only shared with the clinic that will perform your treatment. It is never shared with third parties for commercial purposes." },
    { baslik: "4. Data Security", icerik: "Your data is protected through SSL encryption and secure servers." },
    { baslik: "5. Cookies", icerik: "The platform uses cookies to improve user experience. You can disable cookies in your browser settings." },
    { baslik: "6. Your Rights", icerik: "Under GDPR, you have the right to access, correct, delete and transfer your data. Contact info@medoqa.com to exercise these rights." },
    { baslik: "7. Contact", icerik: "For questions about our privacy policy, email info@medoqa.com." },
  ];

  return (
    <main style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8f9ff" }}>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 16px 60px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#0f0d2e", marginBottom: "8px" }}>{baslik}</h1>
        <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "40px" }}>{guncelleme}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {sections.map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e8e6ff" }}>
              <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#0f0d2e", marginBottom: "10px" }}>{s.baslik}</h2>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.8, margin: 0 }}>{s.icerik}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
