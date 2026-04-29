"use client";
import Navbar from "../components/Navbar";
import { useState } from "react";

const kategoriler = [
  { id: "genel", ad: "Genel" },
  { id: "klinik", ad: "Klinikler" },
  { id: "odeme", ad: "Ödeme" },
  { id: "otel", ad: "Otel & Transfer" },
  { id: "tedavi", ad: "Tedavi" },
];

const sorular = [
  { id: 1, kategori: "genel", soru: "Medoqa ücretsiz mi?", cevap: "Evet! Hastalar için Medoqa tamamen ücretsizdir. Teklif almak, karşılaştırmak ve kliniklerle iletişim kurmak için hiçbir ücret ödemezsiniz. Platform gelirini kliniklerden aldığı komisyon ile elde eder." },
  { id: 2, kategori: "genel", soru: "Hangi ülkelerden hasta kabul ediyorsunuz?", cevap: "Platformumuz uluslararası hastalar için tasarlanmıştır. Almanya, İngiltere, Hollanda, Avusturya ve diğer Avrupa ülkelerinden hastalarımız var. Türkiye içinden de hizmet veriyoruz." },
  { id: 3, kategori: "genel", soru: "Dil desteği var mı?", cevap: "Evet! Platform Türkçe, İngilizce ve Almanca olarak kullanılabilir. Müşteri hizmetlerimiz bu üç dilde 7/24 destek sağlar." },
  { id: 4, kategori: "genel", soru: "Medoqa'ya nasıl kayıt olabilirim?", cevap: "Sağ üstteki 'Giriş Yap' butonuna tıklayarak 'Kayıt Ol' sekmesini seçin. E-posta adresiniz ve şifrenizle kolayca kayıt olabilirsiniz." },
  { id: 5, kategori: "klinik", soru: "Klinikler nasıl doğrulanır?", cevap: "Tüm klinikler platformumuza katılmadan önce belgelerini sunar. Sağlık Bakanlığı lisansları, doktor sertifikaları ve sigorta belgeleri kontrol edilir. Onaylanan klinikler 'Doğrulanmış' rozetini alır." },
  { id: 6, kategori: "klinik", soru: "Klinik puanları nasıl hesaplanır?", cevap: "Puanlar yalnızca tedavisini tamamlamış gerçek hastalar tarafından verilir. Her hasta tedavi sonrası bir değerlendirme formu doldurur ve bu değerlendirmeler şeffaf biçimde profilde görünür." },
  { id: 7, kategori: "klinik", soru: "Klinikle doğrudan iletişim kurabilir miyim?", cevap: "Evet! Teklif aldıktan sonra klinikle mesajlaşabilir, sorularınızı sorabilirsiniz. Ancak ödeme ve anlaşmaların platform üzerinden yapılmasını öneririz — bu sizin güvencenizdir." },
  { id: 8, kategori: "odeme", soru: "Blokeli ödeme sistemi nasıl çalışır?", cevap: "Ödemeniz platformumuzda güvenle tutulur. Tedaviniz tamamlanıp siz onaylayana kadar kliniğe geçmez. Sorun yaşarsanız itiraz mekanizmamızı kullanabilirsiniz." },
  { id: 9, kategori: "odeme", soru: "Ek işlemler için ekstra ücret ödemek zorunda mıyım?", cevap: "Hayır! Klinik ek işlem önerecekse öncelikle sizden onay almak zorundadır. Siz onaylamadan fiyata eklenemez. Bu sistemimizin temel güvencelerinden biridir." },
  { id: 10, kategori: "odeme", soru: "Hangi ödeme yöntemlerini kabul ediyorsunuz?", cevap: "Kredi kartı, banka kartı ve banka havalesi ile ödeme yapabilirsiniz. Tüm ödemeler SSL şifrelemesi ile güvence altındadır." },
  { id: 11, kategori: "odeme", soru: "İptal veya iade politikası nedir?", cevap: "Tedaviniz başlamadan önce iptal ederseniz ödemeniz iade edilir. Tedavi başladıktan sonraki iptallerde klinik ile görüşmeniz gerekebilir. Detaylar için iletişim sayfamızdan bize ulaşabilirsiniz." },
  { id: 12, kategori: "otel", soru: "Otel rezervasyonu platform üzerinden mi yapılıyor?", cevap: "Evet! Kliniğinize yakın otelleri platform üzerinden inceleyip rezervasyon yapabilirsiniz. Böylece klinik ve otel koordinasyonunu kolayca sağlarsınız." },
  { id: 13, kategori: "otel", soru: "Transfer hizmeti nasıl işliyor?", cevap: "Havalimanından kliniğe, kliniğe otele tüm transferlerinizi platform üzerinden organize edebilirsiniz. Transfer şirketleri uçuşunuzu takip eder ve sizi karşılar." },
  { id: 14, kategori: "otel", soru: "Klinik transfer hizmeti sunuyor mu?", cevap: "Bazı klinikler transfer hizmeti sunmaktadır. Klinik profilinde bu bilgiyi görebilirsiniz. Transfer dahil değilse platformumuzun transfer sayfasından kolayca ayarlayabilirsiniz." },
  { id: 15, kategori: "tedavi", soru: "Tedavi öncesi online konsültasyon yapılıyor mu?", cevap: "Evet! Birçok klinik video görüşme ile ön konsültasyon sunmaktadır. Teklif aldıktan sonra klinikten video konsültasyon talep edebilirsiniz." },
  { id: 16, kategori: "tedavi", soru: "Tedavi sonrası takip nasıl yapılıyor?", cevap: "Klinikler tedavi sonrası kontrol randevusu için sizinle iletişime geçer. Yurtdışındaysanız uzaktan takip veya yerel doktorunuzla koordinasyon sağlanabilir." },
  { id: 17, kategori: "tedavi", soru: "Tedavim beklendiği gibi sonuçlanmazsa ne olur?", cevap: "Platform üzerinden itiraz mekanizması başlatabilirsiniz. Ekibimiz durumu inceler ve çözüm üretir. Ödemeniz itiraz süreci boyunca blokeli tutulur." },
];

export default function SSS() {
  const [aktifKategori, setAktifKategori] = useState("genel");
  const [aramaMetni, setAramaMetni] = useState("");
  const [acikSoru, setAcikSoru] = useState<number | null>(null);

  const filtreliSorular = sorular.filter((s) => {
    const kategoriUygun = s.kategori === aktifKategori;
    const aramaUygun = aramaMetni === "" || s.soru.toLowerCase().includes(aramaMetni.toLowerCase()) || s.cevap.toLowerCase().includes(aramaMetni.toLowerCase());
    return aramaMetni !== "" ? aramaUygun : kategoriUygun;
  });

  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>

      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "48px 32px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "36px", fontWeight: 700, marginBottom: "12px" }}>Sıkça Sorulan Sorular</h1>
        <p style={{ color: "#8b8fc8", fontSize: "15px", marginBottom: "28px" }}>Aklınızdaki soruların cevaplarını burada bulabilirsiniz</p>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "8px", display: "flex", gap: "8px", maxWidth: "500px", margin: "0 auto" }}>
          <input type="text" placeholder="Soru ara..." value={aramaMetni} onChange={(e) => setAramaMetni(e.target.value)} style={{ flex: 1, border: "none", outline: "none", padding: "10px 14px", fontSize: "14px", background: "transparent" }} />
          <button style={{ background: "#534AB7", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>Ara</button>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 32px" }}>

        {aramaMetni === "" && (
          <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
            {kategoriler.map((k) => (
              <button key={k.id} onClick={() => setAktifKategori(k.id)} style={{ padding: "8px 18px", borderRadius: "20px", border: "1px solid", fontSize: "13px", cursor: "pointer", fontWeight: 500, background: aktifKategori === k.id ? "#534AB7" : "#fff", color: aktifKategori === k.id ? "#fff" : "#534AB7", borderColor: "#534AB7" }}>
                {k.ad}
              </button>
            ))}
          </div>
        )}

        {aramaMetni !== "" && (
          <p style={{ fontSize: "14px", color: "#888", marginBottom: "20px" }}>
            "<strong>{aramaMetni}</strong>" için {filtreliSorular.length} sonuç bulundu
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtreliSorular.map((s) => (
            <div key={s.id} style={{ background: "#fff", border: "1px solid", borderColor: acikSoru === s.id ? "#534AB7" : "#EEEDFE", borderRadius: "12px", overflow: "hidden", transition: "all 0.2s" }}>
              <div onClick={() => setAcikSoru(acikSoru === s.id ? null : s.id)} style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#12103a", paddingRight: "16px" }}>{s.soru}</span>
                <span style={{ color: "#534AB7", fontSize: "20px", fontWeight: 300, flexShrink: 0 }}>{acikSoru === s.id ? "−" : "+"}</span>
              </div>
              {acikSoru === s.id && (
                <div style={{ padding: "0 20px 18px", borderTop: "1px solid #EEEDFE" }}>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.7, margin: "14px 0 0" }}>{s.cevap}</p>
                </div>
              )}
            </div>
          ))}
          {filtreliSorular.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px", background: "#fff", borderRadius: "12px", border: "1px solid #EEEDFE" }}>
              <div style={{ fontSize: "13px", color: "#888" }}>Sonuç bulunamadı. Farklı bir arama deneyin.</div>
            </div>
          )}
        </div>

        <div style={{ background: "linear-gradient(135deg, #1e1b4b, #12103a)", borderRadius: "16px", padding: "32px", textAlign: "center", marginTop: "40px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>Sorunuzun cevabını bulamadınız mı?</h3>
          <p style={{ fontSize: "13px", color: "#8b8fc8", marginBottom: "20px" }}>Ekibimiz size yardımcı olmaktan mutluluk duyar</p>
          <a href="/iletisim" style={{ background: "#534AB7", color: "#fff", padding: "12px 28px", borderRadius: "8px", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>Bize Ulaşın</a>
        </div>
      </div>

      <footer style={{ background: "#12103a", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>
          med<span style={{ color: "#7F77DD", fontWeight: 300 }}>oqa</span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Gizlilik", "KVKK", "İletişim", "Blog"].map((l) => (
            <a key={l} href="#" style={{ color: "#6b6fa8", fontSize: "12px", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <div style={{ fontSize: "12px", color: "#6b6fa8" }}>2024 Medoqa. Tüm hakları saklıdır.</div>
      </footer>

    </main>
  );
}
