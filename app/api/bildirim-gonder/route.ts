import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function emailGonder(to: string | string[], subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Medoqa <info@medoqa.com>",
      to,
      subject,
      html,
    }),
  });
  return res.ok;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { tip } = body;

  if (tip === "yeni_talep") {
    const { tedavi, hasta_ad, hasta_soyad, hasta_email, hasta_ulke, aciklama } = body;

    // Tüm onaylı kliniklerin emaillerini al
    const { data: klinikler } = await supabase
      .from("profiles")
      .select("email, ad")
      .eq("hesap_turu", "klinik")
      .eq("onaylandi", true)
      .eq("askida", false);

    if (klinikler && klinikler.length > 0) {
      for (const klinik of klinikler) {
        await emailGonder(
          klinik.email,
          `Yeni Teklif Talebi: ${tedavi}`,
          `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #12103a; padding: 24px; border-radius: 12px 12px 0 0;">
              <h1 style="color: #fff; font-size: 24px; margin: 0;">med<span style="color: #7F77DD; font-weight: 300;">oqa</span></h1>
            </div>
            <div style="background: #fff; padding: 32px; border: 1px solid #EEEDFE; border-radius: 0 0 12px 12px;">
              <h2 style="color: #12103a; font-size: 20px; margin-bottom: 16px;">Yeni Teklif Talebi!</h2>
              <p style="color: #666; font-size: 14px;">Merhaba ${klinik.ad},</p>
              <p style="color: #666; font-size: 14px;">Yeni bir teklif talebi geldi. Hemen paneline girerek teklif gönderebilirsin.</p>
              <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #EEEDFE;">
                    <td style="padding: 8px 0; font-size: 13px; color: #888;">Tedavi</td>
                    <td style="padding: 8px 0; font-size: 13px; font-weight: 700; color: #12103a;">${tedavi}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #EEEDFE;">
                    <td style="padding: 8px 0; font-size: 13px; color: #888;">Hasta</td>
                    <td style="padding: 8px 0; font-size: 13px; color: #12103a;">${hasta_ad} ${hasta_soyad}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #EEEDFE;">
                    <td style="padding: 8px 0; font-size: 13px; color: #888;">Ülke</td>
                    <td style="padding: 8px 0; font-size: 13px; color: #12103a;">${hasta_ulke}</td>
                  </tr>
                  ${aciklama ? `<tr><td style="padding: 8px 0; font-size: 13px; color: #888;">Açıklama</td><td style="padding: 8px 0; font-size: 13px; color: #12103a;">${aciklama}</td></tr>` : ""}
                </table>
              </div>
              <a href="https://www.medoqa.com/klinik-panel?bypass=medoqa2024" style="display: inline-block; background: #534AB7; color: #fff; padding: 12px 24px; border-radius: 8px; font-size: 14px; text-decoration: none; font-weight: 600;">
                Teklif Gönder →
              </a>
              <p style="color: #888; font-size: 12px; margin-top: 24px;">Bu email Medoqa platformu tarafından gönderilmiştir.</p>
            </div>
          </div>
          `
        );
      }
    }

    // Hastaya onay emaili gönder
    await emailGonder(
      hasta_email,
      "Teklif Talebiniz Alındı - Medoqa",
      `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #12103a; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #fff; font-size: 24px; margin: 0;">med<span style="color: #7F77DD; font-weight: 300;">oqa</span></h1>
        </div>
        <div style="background: #fff; padding: 32px; border: 1px solid #EEEDFE; border-radius: 0 0 12px 12px;">
          <h2 style="color: #12103a; font-size: 20px; margin-bottom: 16px;">Talebiniz Alındı! ✓</h2>
          <p style="color: #666; font-size: 14px;">Merhaba ${hasta_ad},</p>
          <p style="color: #666; font-size: 14px;">Teklif talebiniz başarıyla alındı. Onaylı kliniklerimiz en kısa sürede size teklif gönderecek.</p>
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <div style="font-size: 13px; color: #888; margin-bottom: 4px;">Seçilen Tedavi</div>
            <div style="font-size: 16px; font-weight: 700; color: #12103a;">${tedavi}</div>
          </div>
          <div style="background: #EEEDFE; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="color: #534AB7; font-size: 13px; margin: 0;">⏱ Ortalama yanıt süresi: <strong>2-4 saat</strong></p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 24px;">Bu email Medoqa platformu tarafından gönderilmiştir.</p>
        </div>
      </div>
      `
    );

    return NextResponse.json({ success: true });
  }

  if (tip === "teklif_gonderildi") {
    const { hasta_email, hasta_ad, klinik_ad, tedavi, fiyat, para_birimi } = body;

    await emailGonder(
      hasta_email,
      `Yeni Teklif Geldi: ${tedavi} - Medoqa`,
      `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #12103a; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #fff; font-size: 24px; margin: 0;">med<span style="color: #7F77DD; font-weight: 300;">oqa</span></h1>
        </div>
        <div style="background: #fff; padding: 32px; border: 1px solid #EEEDFE; border-radius: 0 0 12px 12px;">
          <h2 style="color: #12103a; font-size: 20px; margin-bottom: 16px;">Yeni Teklif Geldi! 🎉</h2>
          <p style="color: #666; font-size: 14px;">Merhaba ${hasta_ad},</p>
          <p style="color: #666; font-size: 14px;"><strong>${klinik_ad}</strong> kliniği size teklif gönderdi.</p>
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #EEEDFE;">
                <td style="padding: 8px 0; font-size: 13px; color: #888;">Klinik</td>
                <td style="padding: 8px 0; font-size: 13px; font-weight: 700; color: #12103a;">${klinik_ad}</td>
              </tr>
              <tr style="border-bottom: 1px solid #EEEDFE;">
                <td style="padding: 8px 0; font-size: 13px; color: #888;">Tedavi</td>
                <td style="padding: 8px 0; font-size: 13px; color: #12103a;">${tedavi}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #888;">Teklif Fiyatı</td>
                <td style="padding: 8px 0; font-size: 20px; font-weight: 700; color: #534AB7;">${fiyat} ${para_birimi}</td>
              </tr>
            </table>
          </div>
          <a href="https://www.medoqa.com/hasta-panel?bypass=medoqa2024" style="display: inline-block; background: #534AB7; color: #fff; padding: 12px 24px; border-radius: 8px; font-size: 14px; text-decoration: none; font-weight: 600;">
            Teklifi İncele →
          </a>
          <p style="color: #888; font-size: 12px; margin-top: 24px;">Bu email Medoqa platformu tarafından gönderilmiştir.</p>
        </div>
      </div>
      `
    );

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Geçersiz bildirim tipi" }, { status: 400 });
}
