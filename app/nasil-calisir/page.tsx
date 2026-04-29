import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function nasılÇalışır() {
  const adımlar = [
    {
      numara: "01",
      baslik: "Tedavini Seç",
      aciklama: "İhtiyacın olan tedaviyi belirle. Diş, Saç ekimi, Göz ameliyati veya plastik cerrahi — hangi tedaviyi istedigini seç.",
      detaylar: ["500+ tedavi seçenegi", "Detayli tedavi bilgileri", "Fiyat araliklari"],
    },
    {
      numara: "02",
      baslik: "Ücretsiz Teklif Al",
      aciklama: "Fotograflarini ve bilgilerini yukle. Onaylanmis klinikler sana ozel teklif hazirlayip gonderir.",
      detaylar: ["Ücretsiz teklif", "24 saat icinde yanit", "Birden fazla klinikten teklif"],
    },
    {
      numara: "03",
      baslik: "Teklifleri Karşılaştır",
      aciklama: "Gelen teklifleri fiyat, puan ve iceriklere gore Karşılaştır. En uygun teklifi seç.",
      detaylar: ["Yan yana karşılaştırma", "Gercek hasta yorumlari", "Seffaf fiyatlandirma"],
    },
    {
      numara: "04",
      baslik: "Otel ve Transfer seç",
      aciklama: "Klinik yakinindaki otelleri incele, havalimanı transferini organize et. Her sey tek platformda.",
      detaylar: ["Klinike yakin oteller", "Havalimani transferi", "Paket fiyat avantaji"],
    },
    {
      numara: "05",
      baslik: "Güvenli Öde",
      aciklama: "Ödemen klinike gecmez — tedavin tamamlanip sen onaylayana kadar platformda bekler.",
      detaylar: ["Blokeli ödeme sistemi", "Hasta onaylamadan para gecmez", "Ek islem onay akisi"],
    },
    {
      numara: "06",
      baslik: "Deneyimini Paylaş",
      aciklama: "Tedavin tamamlandiktan sonra yorumunu yaz. Sadece gercek hastalar yorum yapabilir.",
      detaylar: ["Dogrulanmis yorumlar", "Puan sistemi", "Diger hastalara yardim et"],
    },
  ];

  const sorular = [
    { soru: "Medoqa Ücretsiz mi?", cevap: "Evet! Hastalar icin Medoqa tamamen ücretsizdir. Teklif almak, karşılaştırmak ve kliniklerle iletisim kurmak icin hicbir ucret ödemezsiniz." },
    { soru: "Klinikler nasıl dogrulanir?", cevap: "Tüm klinikler platformumuza katilmadan once belgelerini sunar. Saglik Bakanligi lisanslari, doktor sertifikalari ve sigorta belgeleri kontrol edilir." },
    { soru: "Blokeli ödeme sistemi nasıl çalışır?", cevap: "Ödemeniz platformumuzda guvenle tutulur. Tedaviniz tamamlanip siz onaylayana kadar klinige gectmez. Sorun yasarsaniz itiraz mekanizmamizi kullanabilirsiniz." },
    { soru: "Ek islemler icin ekstra ucret ödemek zorunda miyim?", cevap: "Hayir! Klinik ek islem onerecekse oncelikle sizden onay almak zorundadir. Siz onaylamadan fiyata eklenemez." },
    { soru: "Hangi ulkelerden hasta kabul ediyorsunuz?", cevap: "Platformumuz uluslararasi hastalar icin tasarlanmistir. Almanya, Ingiltere, Hollanda, Avusturya ve diger Avrupa ulkelerinden hastalarimiz var. Turkiye icinden de hizmet veriyoruz." },
    { soru: "Dil destegi var mi?", cevap: "Evet! Platform Turkce, Ingilizce ve Almanca olarak kullanilabilir. Musteri hizmetlerimiz bu uc dilde 7/24 destek saglar." },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>

      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "64px 32px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(83,74,183,0.25)", color: "#AFA9EC", fontSize: "12px", padding: "4px 16px", borderRadius: "20px", border: "0.5px solid #534AB7", marginBottom: "20px" }}>
          Güvenli · Seffaf · Kolay
        </div>
        <h1 style={{ color: "#fff", fontSize: "42px", fontWeight: 700, marginBottom: "16px" }}>Medoqa Nasıl Çalışır?</h1>
        <p style={{ color: "#8b8fc8", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
          Tedavinden oteline, transferinden ödemeye kadar her sey tek platformda. Güvenli, seffaf ve kolay.
        </p>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 32px" }}>
        <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#12103a", textAlign: "center", marginBottom: "48px" }}>6 Adımda Tedavin Tamamlansin</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {adımlar.map((adim, index) => (
            <div key={adim.numara} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "16px", padding: "28px", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: "48px", fontWeight: 700, color: "#EEEDFE", position: "absolute", top: "16px", right: "20px", lineHeight: 1 }}>{adim.numara}</div>
              <div style={{ width: "44px", height: "44px", background: index % 2 === 0 ? "#534AB7" : "#EEEDFE", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <span style={{ color: index % 2 === 0 ? "#fff" : "#534AB7", fontWeight: 700, fontSize: "18px" }}>{adim.numara}</span>
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#12103a", marginBottom: "10px" }}>{adim.baslik}</h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, marginBottom: "16px" }}>{adim.aciklama}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {adim.detaylar.map((d) => (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#534AB7" }}>
                    <span style={{ color: "#534AB7", fontWeight: 700 }}>✓</span> {d}
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
          <p style={{ color: "#8b8fc8", fontSize: "15px", marginBottom: "48px" }}>Binlerce hasta Medoqa ile dogru klinigi buldu</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {[
              { sayi: "500+", etiket: "Onaylanmis Klinik" },
              { sayi: "12.000+", etiket: "Memnun Hasta" },
              { sayi: "%98", etiket: "Memnuniyet Orani" },
              { sayi: "3", etiket: "Dil Destegi" },
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
        <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#12103a", textAlign: "center", marginBottom: "36px" }}>Sikca Sorulan Sorular</h2>
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
        <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>Hemen Basla</h2>
        <p style={{ color: "#8b8fc8", fontSize: "15px", marginBottom: "32px" }}>Ücretsiz teklif al, en iyi klinigi sec</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <a href="/teklif" style={{ background: "#534AB7", color: "#fff", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", fontWeight: 600 }}>
            Ücretsiz Teklif Al
          </a>
          <a href="/klinikler" style={{ background: "transparent", color: "#fff", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", fontWeight: 600, border: "1px solid #534AB7" }}>
            Klinikleri Incele
          </a>
        </div>
      </section>

      <Footer />

    </main>
  );
}
