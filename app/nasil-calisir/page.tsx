"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NasilCalisir() {
  const [istatistik, setIstatistik] = useState({ klinik: 0, hasta: 0, otel: 0, transfer: 0 });

  const supabase = createClient();

  useEffect(() => {
    async function veriYukle() {
      const { count: klinikCount } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "klinik").eq("onaylandi", true);
      const { count: hastaCount } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "hasta");
      const { count: otelCount } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "otel").eq("onaylandi", true);
      const { count: transferCount } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("hesap_turu", "transfer").eq("onaylandi", true);
      setIstatistik({ klinik: klinikCount || 0, hasta: hastaCount || 0, otel: otelCount || 0, transfer: transferCount || 0 });
    }
    veriYukle();
  }, []);

  const adimlar = [
    { numara: "01", baslik: "Tedavini Seç", aciklama: "İhtiyacın olan tedaviyi belirle. Diş, saç ekimi, göz ameliyatı veya plastik cerrahi — hangi tedaviyi istediğini seç.", detaylar: ["500+ tedavi seçeneği", "Detaylı tedavi bilgileri", "Fiyat aralıkları"], icon: "🔍" },
    { numara: "02", baslik: "Ücretsiz Teklif Al", aciklama: "Fotoğraflarını ve bilgilerini yükle. Onaylanmış klinikler sana özel teklif hazırlayıp gönderir.", detaylar: ["Ücretsiz teklif", "24 saat içinde yanıt", "Birden fazla klinikten teklif"], icon: "📋" },
    { numara: "03", baslik: "Teklifleri Karşılaştır", aciklama: "Gelen teklifleri fiyat, puan ve içeriklere göre karşılaştır. En uygun teklifi seç.", detaylar: ["Yan yana karşılaştırma", "Gerçek hasta yorumları", "Şeffaf fiyatlandırma"], icon: "⚖️" },
    { numara: "04", baslik: "Otel ve Transfer Seç", aciklama: "Klinik yakınındaki otelleri incele, havalimanı transferini organize et. Her şey tek platformda.", detaylar: ["Kliniğe yakın oteller", "Havalimanı transferi", "Paket fiyat avantajı"], icon: "🏨" },
    { numara: "05", baslik: "Güvenli Öde", aciklama: "Ödemen kliniğe geçmez — tedavin tamamlanıp sen onaylayana kadar platformda bekler.", detaylar: ["Blokeli ödeme sistemi", "Hasta onaylamadan para geçmez", "Ek işlem onay akışı"], icon: "🔒" },
    { numara: "06", baslik: "Deneyimini Paylaş", aciklama: "Tedavin tamamlandıktan sonra yorumunu yaz. Sadece gerçek hastalar yorum yapabilir.", detaylar: ["Doğrulanmış yorumlar", "Puan sistemi", "Diğer hastalara yardım et"], icon: "⭐" },
  ];

  const sorular = [
    { soru: "Medoqa ücretsiz mi?", cevap: "Evet! Hastalar için Medoqa tamamen ücretsizdir. Teklif almak, karşılaştırmak ve kliniklerle iletişim kurmak için hiçbir ücret ödemezsiniz." },
    { soru: "Klinikler nasıl doğrulanır?", cevap: "Tüm klinikler platformumuza katılmadan önce belgelerini sunar. Sağlık Bakanlığı lisansları, doktor sertifikaları ve sigorta belgeleri kontrol edilir. Admin onayı olmadan klinikler aktif olamaz." },
    { soru: "Blokeli ödeme sistemi nasıl çalışır?", cevap: "Ödemeniz platformumuzda güvenle tutulur. Tedaviniz tamamlanıp siz onaylayana kadar kliniğe geçmez." },
    { soru: "Ek işlemler için ekstra ücret ödemek zorunda mıyım?", cevap: "Hayır! Klinik ek işlem önerecekse öncelikle sizden onay almak zorundadır. Siz onaylamadan fiyata eklenemez." },
    { soru: "Hangi ülkelerden hasta kabul ediyorsunuz?", cevap: "Almanya, İngiltere, Hollanda, Avusturya ve diğer Avrupa ülkelerinden hastalarımız var. Türkiye içinden de hizmet veriyoruz." },
    { soru: "Dil desteği var mı?", cevap: "Evet! Platform Türkçe, İngilizce ve Almanca olarak kullanılabilir. 7/24 destek sağlıyoruz." },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "64px 32px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(83,74,183,0.25)", color: "#AFA9EC", fontSize: "12px", padding: "4px 16px", borderRadius: "20px", border: "0.5px solid #534AB7", marginBottom: "20px" }}>
          Güvenli · Şeffaf · Kolay
        </div>
        <h1 style={{ color: "#fff", fontSize: "42px", fontWeight: 700, marginBottom: "16px" }}>Medoqa Nasıl Çalışır?</h1>
        <p style={{ color: "#8b8fc8", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
          Tedavinden oteline, transferinden ödemeye kadar her şey tek platformda.
        </p>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 32px" }}>
        <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#12103a", textAlign: "center", marginBottom: "48px" }}>6 Adımda Tedavin Tamamlansın</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {adimlar.map((adim, index) => (
            <div key={adim.numara} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "16px", padding: "28px", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: "48px", fontWeight: 700, color: "#EEEDFE", position: "absolute", top: "16px", right: "20px", lineHeight: 1 }}>{adim.numara}</div>
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
          <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>Neden Medoqa?</h2>
          <p style={{ color: "#8b8fc8", fontSize: "15px", marginBottom: "48px" }}>Gerçek rakamlar, gerçek sonuçlar</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {[
              { sayi: `${istatistik.klinik}+`, etiket: "Onaylı Klinik" },
              { sayi: `${istatistik.hasta}+`, etiket: "Kayıtlı Hasta" },
              { sayi: `${istatistik.otel}+`, etiket: "Partner Otel" },
              { sayi: `${istatistik.transfer}+`, etiket: "Transfer Firması" },
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
        <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#12103a", textAlign: "center", marginBottom: "36px" }}>Sıkça Sorulan Sorular</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {sorular.map((s, i) => (
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
        <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>Hemen Başla</h2>
        <p style={{ color: "#8b8fc8", fontSize: "15px", marginBottom: "32px" }}>Ücretsiz teklif al, en iyi kliniği seç</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <a href="/teklif" style={{ background: "#534AB7", color: "#fff", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", fontWeight: 600 }}>Ücretsiz Teklif Al</a>
          <a href="/klinikler" style={{ background: "transparent", color: "#fff", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", fontWeight: 600, border: "1px solid #534AB7" }}>Klinikleri İncele</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
