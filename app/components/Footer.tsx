"use client";
import { useState, useEffect } from "react";
import { useDil } from "../locales/context";

export default function Footer() {
  const { dil } = useDil();
  const [mobil, setMobil] = useState(false);

  useEffect(() => {
    function kontrol() { setMobil(window.innerWidth < 768); }
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  }, []);

  const icerik = {
    tr: { aciklama: "Güvenli, şeffaf ve karşılaştırılabilir sağlık turizmi platformu.", platform: "PLATFORM", destek: "DESTEK", takipEdin: "BİZİ TAKİP EDİN", yasal: "YASAL", linkler: { platform: [{ad:"Klinikler",href:"/klinikler"},{ad:"Tedaviler",href:"/tedaviler"},{ad:"Oteller",href:"/oteller"},{ad:"Transfer",href:"/transfer"},{ad:"Harita",href:"/harita"}], destek: [{ad:"Nasıl Çalışır",href:"/nasil-calisir"},{ad:"SSS",href:"/sss"},{ad:"İletişim",href:"/iletisim"},{ad:"Blog",href:"/blog"}], yasal: [{ad:"KVKK / Gizlilik",href:"/gizlilik"},{ad:"Kullanım Koşulları",href:"/sozlesmeler"},{ad:"Klinik Sözleşmesi",href:"/sozlesmeler"},{ad:"Çerez Politikası",href:"/sozlesmeler"}] }, telif: "© 2025 Medoqa. Tüm hakları saklıdır.", girisYap: "Giriş Yap", teklifAl: "Teklif Al", yasal2: "Yasal" },
    en: { aciklama: "Safe, transparent and comparable health tourism platform.", platform: "PLATFORM", destek: "SUPPORT", takipEdin: "FOLLOW US", yasal: "LEGAL", linkler: { platform: [{ad:"Clinics",href:"/klinikler"},{ad:"Treatments",href:"/tedaviler"},{ad:"Hotels",href:"/oteller"},{ad:"Transfer",href:"/transfer"},{ad:"Map",href:"/harita"}], destek: [{ad:"How It Works",href:"/nasil-calisir"},{ad:"FAQ",href:"/sss"},{ad:"Contact",href:"/iletisim"},{ad:"Blog",href:"/blog"}], yasal: [{ad:"Privacy Policy",href:"/gizlilik"},{ad:"Terms of Use",href:"/sozlesmeler"},{ad:"Clinic Agreement",href:"/sozlesmeler"},{ad:"Cookie Policy",href:"/sozlesmeler"}] }, telif: "© 2025 Medoqa. All rights reserved.", girisYap: "Sign In", teklifAl: "Get Quote", yasal2: "Legal" },
    de: { aciklama: "Sichere, transparente und vergleichbare Gesundheitstourismusplattform.", platform: "PLATTFORM", destek: "SUPPORT", takipEdin: "FOLGEN SIE UNS", yasal: "RECHTLICHES", linkler: { platform: [{ad:"Kliniken",href:"/klinikler"},{ad:"Behandlungen",href:"/tedaviler"},{ad:"Hotels",href:"/oteller"},{ad:"Transfer",href:"/transfer"},{ad:"Karte",href:"/harita"}], destek: [{ad:"Wie es funktioniert",href:"/nasil-calisir"},{ad:"FAQ",href:"/sss"},{ad:"Kontakt",href:"/iletisim"},{ad:"Blog",href:"/blog"}], yasal: [{ad:"Datenschutzerklärung",href:"/sozlesmeler"},{ad:"Nutzungsbedingungen",href:"/sozlesmeler"},{ad:"Klinikvertrag",href:"/sozlesmeler"},{ad:"Cookie-Richtlinie",href:"/sozlesmeler"}] }, telif: "© 2025 Medoqa. Alle Rechte vorbehalten.", girisYap: "Anmelden", teklifAl: "Angebot", yasal2: "Rechtliches" },
    ar: { aciklama: "منصة سياحة صحية آمنة وشفافة وقابلة للمقارنة.", platform: "المنصة", destek: "الدعم", takipEdin: "تابعنا", yasal: "قانوني", linkler: { platform: [{ad:"العيادات",href:"/klinikler"},{ad:"العلاجات",href:"/tedaviler"},{ad:"الفنادق",href:"/oteller"},{ad:"النقل",href:"/transfer"},{ad:"الخريطة",href:"/harita"}], destek: [{ad:"كيف يعمل",href:"/nasil-calisir"},{ad:"الأسئلة الشائعة",href:"/sss"},{ad:"اتصل بنا",href:"/iletisim"},{ad:"المدونة",href:"/blog"}], yasal: [{ad:"سياسة الخصوصية",href:"/sozlesmeler"},{ad:"شروط الاستخدام",href:"/sozlesmeler"},{ad:"اتفاقية العيادة",href:"/sozlesmeler"},{ad:"سياسة الكوكيز",href:"/sozlesmeler"}] }, telif: "© 2025 Medoqa. جميع الحقوق محفوظة.", girisYap: "تسجيل الدخول", teklifAl: "احصل على عرض", yasal2: "قانوني" },
    ru: { aciklama: "Безопасная, прозрачная и сравнимая платформа медицинского туризма.", platform: "ПЛАТФОРМА", destek: "ПОДДЕРЖКА", takipEdin: "ПОДПИСЫВАЙТЕСЬ", yasal: "ПРАВОВОЕ", linkler: { platform: [{ad:"Клиники",href:"/klinikler"},{ad:"Лечение",href:"/tedaviler"},{ad:"Отели",href:"/oteller"},{ad:"Трансфер",href:"/transfer"},{ad:"Карта",href:"/harita"}], destek: [{ad:"Как это работает",href:"/nasil-calisir"},{ad:"FAQ",href:"/sss"},{ad:"Контакты",href:"/iletisim"},{ad:"Блог",href:"/blog"}], yasal: [{ad:"Политика конфиденц.",href:"/sozlesmeler"},{ad:"Условия использования",href:"/sozlesmeler"},{ad:"Соглашение клиники",href:"/sozlesmeler"},{ad:"Политика cookies",href:"/sozlesmeler"}] }, telif: "© 2025 Medoqa. Все права защищены.", girisYap: "Войти", teklifAl: "Получить предложение", yasal2: "Правовое" },
    fr: { aciklama: "Plateforme de tourisme médical sûre, transparente et comparable.", platform: "PLATEFORME", destek: "SUPPORT", takipEdin: "SUIVEZ-NOUS", yasal: "LÉGAL", linkler: { platform: [{ad:"Cliniques",href:"/klinikler"},{ad:"Traitements",href:"/tedaviler"},{ad:"Hôtels",href:"/oteller"},{ad:"Transfert",href:"/transfer"},{ad:"Carte",href:"/harita"}], destek: [{ad:"Comment ça marche",href:"/nasil-calisir"},{ad:"FAQ",href:"/sss"},{ad:"Contact",href:"/iletisim"},{ad:"Blog",href:"/blog"}], yasal: [{ad:"Politique de confidentialité",href:"/sozlesmeler"},{ad:"Conditions d'utilisation",href:"/sozlesmeler"},{ad:"Accord clinique",href:"/sozlesmeler"},{ad:"Politique cookies",href:"/sozlesmeler"}] }, telif: "© 2025 Medoqa. Tous droits réservés.", girisYap: "Se connecter", teklifAl: "Obtenir un devis", yasal2: "Légal" },
  };

  const ic = icerik[dil as keyof typeof icerik] || icerik.tr;

  return (
    <footer style={{ background: "#12103a", color: "#fff", padding: mobil ? "40px 16px 24px" : "48px 32px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: mobil ? "1fr 1fr" : "2fr 1fr 1fr 1fr 1fr", gap: mobil ? "32px 20px" : "40px", marginBottom: "40px" }}>
          {/* Logo + Açıklama */}
          <div style={{ gridColumn: mobil ? "1 / -1" : "auto" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, marginBottom: "14px" }}>med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span></div>
            <p style={{ fontSize: "13px", color: "#6b6fa8", lineHeight: "1.7", marginBottom: "16px" }}>{ic.aciklama}</p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {(["tr","en","de","ar","ru","fr"] as const).map(d => (
                <span key={d} style={{ fontSize: "11px", padding: "3px 8px", border: "1px solid #2a2a4e", borderRadius: "4px", color: dil===d?"#7F77DD":"#6b6fa8", textTransform: "uppercase", cursor: "default" }}>{d}</span>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#4a4a7a", letterSpacing: "1px", marginBottom: "14px" }}>{ic.platform}</div>
            {ic.linkler.platform.map(link => (
              <a key={link.ad} href={link.href} style={{ display: "block", color: "#8b8fc8", fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{link.ad}</a>
            ))}
          </div>

          {/* Destek */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#4a4a7a", letterSpacing: "1px", marginBottom: "14px" }}>{ic.destek}</div>
            {ic.linkler.destek.map(link => (
              <a key={link.ad} href={link.href} style={{ display: "block", color: "#8b8fc8", fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{link.ad}</a>
            ))}
          </div>

          {/* Yasal */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#4a4a7a", letterSpacing: "1px", marginBottom: "14px" }}>{ic.yasal}</div>
            {ic.linkler.yasal.map(link => (
              <a key={link.ad} href={link.href} style={{ display: "block", color: "#8b8fc8", fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{link.ad}</a>
            ))}
          </div>

          {/* Sosyal medya */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#4a4a7a", letterSpacing: "1px", marginBottom: "14px" }}>{ic.takipEdin}</div>
            {[
              { ad: "Instagram", href: "https://www.instagram.com/medoqahealht/" },
              { ad: "Facebook", href: "https://www.facebook.com/profile.php?id=61589616170857" },
              { ad: "Twitter / X", href: "https://x.com/medoqahealht" },
            ].map(link => (
              <a key={link.ad} href={link.href} target="_blank" rel="noreferrer" style={{ display: "block", color: "#8b8fc8", fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{link.ad}</a>
            ))}
            <div style={{ fontSize: "12px", color: "#6b6fa8", marginTop: "8px" }}>info@medoqa.com</div>
          </div>
        </div>

        {/* Alt çizgi */}
        <div style={{ borderTop: "1px solid #1e1b4b", paddingTop: "20px", display: "flex", flexDirection: mobil ? "column" : "row", justifyContent: "space-between", alignItems: mobil ? "flex-start" : "center", gap: "12px" }}>
          <div style={{ fontSize: "12px", color: "#4a4a7a" }}>{ic.telif}</div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a href="/sozlesmeler" style={{ fontSize: "12px", color: "#4a4a7a", textDecoration: "none" }}>{ic.yasal2}</a>
            <a href="/giris" style={{ fontSize: "12px", color: "#4a4a7a", textDecoration: "none" }}>{ic.girisYap}</a>
            <a href="/teklif" style={{ fontSize: "12px", color: "#534AB7", textDecoration: "none", fontWeight: 600 }}>{ic.teklifAl}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
