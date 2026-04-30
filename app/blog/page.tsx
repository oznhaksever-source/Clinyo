import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const blogYazilari = [
  { id: "1", baslik: "Turkiyede Dis Implanti: Avrupaya Kiyasla Fiyatlar ve Kalite", ozet: "Almanya, Ingiltere ve Hollandadan gelen hastalar icin Turkiyede dis implanti yaptirmanin avantajlari ve fiyat karsilastirmalari.", kategori: "Dis Tedavisi", tarih: "28 Nisan 2024", okumaSuresi: "5 dk", oneClikan: true },
  { id: "2", baslik: "FUE ve DHI Sac Ekimi: Hangi Yontem Size Uygun?", ozet: "Sac ekiminde en cok tercih edilen iki yontem olan FUE ve DHI arasindaki farklar, avantajlar ve dezavantajlar hakkinda kapsamli bir rehber.", kategori: "Sac Ekimi", tarih: "25 Nisan 2024", okumaSuresi: "7 dk", oneClikan: true },
  { id: "3", baslik: "Medikal Turizm icin Istanbul Rehberi", ozet: "Tedavi icin Istanbula gelen uluslararasi hastalar icin hazirladigimiz kapsamli sehir rehberi.", kategori: "Medikal Turizm", tarih: "22 Nisan 2024", okumaSuresi: "8 dk", oneClikan: false },
  { id: "4", baslik: "Goz Lazeri Sonrasi Iyilesme Sureci", ozet: "Lasik, Lasek veya Smile Pro operasyonu sonrasinda iyilesme sureci ve yapilmasi gerekenler.", kategori: "Goz Ameliyati", tarih: "19 Nisan 2024", okumaSuresi: "6 dk", oneClikan: false },
  { id: "5", baslik: "Plastik Cerrahi Oncesi Bilmeniz Gereken 10 Onemli Sey", ozet: "Estetik operasyon karari vermeden once goz onunde bulundurmaniz gereken en onemli faktorler.", kategori: "Plastik Cerrahi", tarih: "15 Nisan 2024", okumaSuresi: "9 dk", oneClikan: false },
  { id: "6", baslik: "Medikal Turizm Sigortasi: Neden Onemli ve Nasil Secilir?", ozet: "Yurt disinda tedavi olurken sigorta yaptirmanin onemi ve dikkat edilmesi gerekenler.", kategori: "Medikal Turizm", tarih: "10 Nisan 2024", okumaSuresi: "5 dk", oneClikan: false },
];

const kategoriler = ["Tumunu Goster", "Dis Tedavisi", "Sac Ekimi", "Goz Ameliyati", "Plastik Cerrahi", "Medikal Turizm"];

export default function Blog() {
  return (
    <main style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "sans-serif" }}>
      <Navbar />

      <section style={{ background: "linear-gradient(135deg, #12103a 0%, #1e1b4b 100%)", padding: "48px 32px" }}>
        <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>Blog</h1>
        <p style={{ color: "#8b8fc8", fontSize: "15px" }}>Medikal turizm, tedaviler ve saglik hakkinda guncel icerikler</p>
      </section>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 32px" }}>

        <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
          {kategoriler.map((k) => (
            <span key={k} style={{ padding: "6px 16px", borderRadius: "20px", fontSize: "13px", cursor: "pointer", background: k === "Tumunu Goster" ? "#534AB7" : "#fff", color: k === "Tumunu Goster" ? "#fff" : "#534AB7", border: "1px solid #534AB7" }}>
              {k}
            </span>
          ))}
        </div>

        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#12103a", marginBottom: "20px" }}>One Cikan Yazilar</h2>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginBottom: "40px" }}>
          {blogYazilari.filter(b => b.oneClikan).map((b) => (
            <div key={b.id} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "16px", overflow: "hidden" }}>
              <div style={{ height: "180px", background: "linear-gradient(135deg, #1e1b4b, #534AB7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "48px", color: "#fff", fontWeight: 700 }}>M</span>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "11px", background: "#EEEDFE", color: "#534AB7", padding: "3px 10px", borderRadius: "20px" }}>{b.kategori}</span>
                  <span style={{ fontSize: "11px", color: "#888" }}>{b.okumaSuresi} okuma</span>
                </div>
                <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#12103a", marginBottom: "8px", lineHeight: 1.4 }}>{b.baslik}</h2>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, marginBottom: "14px" }}>{b.ozet}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#888" }}>{b.tarih}</span>
                  <a href={"/blog/" + b.id} style={{ background: "#534AB7", color: "#fff", padding: "8px 16px", borderRadius: "8px", fontSize: "12px", textDecoration: "none", fontWeight: 600 }}>Devamini Oku</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#12103a", marginBottom: "20px" }}>Tum Yazilar</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
          {blogYazilari.filter(b => !b.oneClikan).map((b) => (
            <div key={b.id} style={{ background: "#fff", border: "1px solid #EEEDFE", borderRadius: "14px", overflow: "hidden" }}>
              <div style={{ height: "110px", background: "linear-gradient(135deg, #EEEDFE, #CECBF6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "32px", color: "#534AB7", fontWeight: 700 }}>M</span>
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "10px", background: "#EEEDFE", color: "#534AB7", padding: "2px 8px", borderRadius: "20px" }}>{b.kategori}</span>
                  <span style={{ fontSize: "10px", color: "#888" }}>{b.okumaSuresi}</span>
                </div>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#12103a", marginBottom: "8px", lineHeight: 1.4 }}>{b.baslik}</h3>
                <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.5, marginBottom: "10px" }}>{b.ozet.substring(0, 80)}...</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", color: "#888" }}>{b.tarih}</span>
                  <a href={"/blog/" + b.id} style={{ color: "#534AB7", fontSize: "12px", textDecoration: "none", fontWeight: 600 }}>Oku</a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </main>
  );
}
