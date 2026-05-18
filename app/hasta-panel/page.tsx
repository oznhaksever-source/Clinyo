"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { useDil } from "../locales/context";
import YorumFormu from "../components/YorumFormu";

const TYPES: Record<number,string> = {
  18:'Y',17:'M',16:'M',15:'P',14:'P',13:'C',12:'LI',11:'CI',
  21:'CI',22:'LI',23:'C',24:'P',25:'P',26:'M',27:'M',28:'Y',
  48:'Y',47:'M',46:'M',45:'P',44:'P',43:'C',42:'LI',41:'CI',
  31:'CI',32:'LI',33:'C',34:'P',35:'P',36:'M',37:'M',38:'Y'
};
const UST = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const ALT = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
const RENKLER: Record<string,string> = {
  implant:'#534AB7',kaplama:'#1D9E75',kanal:'#D85A30',
  dolgu:'#378ADD',cekim:'#E24B4A',kopru:'#7F77DD',
  lezyon:'#BA7517',default:'#e0ddf0'
};

const TEDAVI_ACK: Record<string,Record<string,{baslik:string,aciklama:string,sure:string}>> = {
  tr:{
    implant:{baslik:"İmplant",aciklama:"Titanyum vida çene kemiğine yerleştirilir.",sure:"2-3 ay"},
    kaplama:{baslik:"Kaplama / Kuron",aciklama:"Diş yüzeyi zirkonyum veya porselen ile kaplanır.",sure:"1-2 seans"},
    kanal:{baslik:"Kanal Tedavisi",aciklama:"Enfekte sinir dokusu temizlenir.",sure:"1-2 seans"},
    dolgu:{baslik:"Dolgu",aciklama:"Çürük alan temizlenir, kompozit malzeme ile doldurulur.",sure:"1 seans"},
    cekim:{baslik:"Diş Çekimi",aciklama:"Hasarlı diş lokal anestezi altında çekilir.",sure:"1 seans"},
    kopru:{baslik:"Köprü",aciklama:"Eksik dişin yanındaki dişlere destek alınarak sabit köprü yapılır.",sure:"2-3 seans"},
    lezyon:{baslik:"Lezyon Tedavisi",aciklama:"Kök ucundaki apse veya kist temizlenir.",sure:"1-2 seans"},
  },
  en:{
    implant:{baslik:"Implant",aciklama:"A titanium screw is placed into the jawbone.",sure:"2-3 months"},
    kaplama:{baslik:"Crown / Veneer",aciklama:"The tooth surface is covered with zirconia or porcelain.",sure:"1-2 sessions"},
    kanal:{baslik:"Root Canal",aciklama:"Infected nerve tissue is removed and the canal is filled.",sure:"1-2 sessions"},
    dolgu:{baslik:"Filling",aciklama:"The decayed area is cleaned and filled.",sure:"1 session"},
    cekim:{baslik:"Tooth Extraction",aciklama:"The damaged tooth is extracted under local anesthesia.",sure:"1 session"},
    kopru:{baslik:"Bridge",aciklama:"A fixed bridge is made using adjacent teeth as support.",sure:"2-3 sessions"},
    lezyon:{baslik:"Lesion Treatment",aciklama:"The abscess or cyst at the root tip is cleaned.",sure:"1-2 sessions"},
  },
  de:{
    implant:{baslik:"Implantat",aciklama:"Eine Titanschraube wird in den Kieferknochen eingesetzt.",sure:"2-3 Monate"},
    kaplama:{baslik:"Krone / Verblendung",aciklama:"Die Zahnoberfläche wird mit Zirkon verkleidet.",sure:"1-2 Sitzungen"},
    kanal:{baslik:"Wurzelkanalbehandlung",aciklama:"Infiziertes Nervengewebe wird entfernt.",sure:"1-2 Sitzungen"},
    dolgu:{baslik:"Füllung",aciklama:"Der kariöse Bereich wird gereinigt und gefüllt.",sure:"1 Sitzung"},
    cekim:{baslik:"Zahnextraktion",aciklama:"Der beschädigte Zahn wird entfernt.",sure:"1 Sitzung"},
    kopru:{baslik:"Brücke",aciklama:"Eine Festbrücke wird hergestellt.",sure:"2-3 Sitzungen"},
    lezyon:{baslik:"Läsionsbehandlung",aciklama:"Der Abszess an der Wurzelspitze wird gereinigt.",sure:"1-2 Sitzungen"},
  },
  ar:{
    implant:{baslik:"زرعة",aciklama:"يتم وضع برغي تيتانيوم في عظم الفك.",sure:"2-3 أشهر"},
    kaplama:{baslik:"تاج",aciklama:"يتم تغطية سطح السن بالزركونيا.",sure:"1-2 جلسة"},
    kanal:{baslik:"علاج جذر",aciklama:"تتم إزالة الأنسجة العصبية المصابة.",sure:"1-2 جلسة"},
    dolgu:{baslik:"حشوة",aciklama:"تتم إزالة التسوس.",sure:"جلسة واحدة"},
    cekim:{baslik:"خلع السن",aciklama:"يتم خلع السن التالف.",sure:"جلسة واحدة"},
    kopru:{baslik:"جسر",aciklama:"يتم عمل جسر ثابت.",sure:"2-3 جلسات"},
    lezyon:{baslik:"علاج آفة",aciklama:"يتم تنظيف الخراج.",sure:"1-2 جلسة"},
  },
  ru:{
    implant:{baslik:"Имплант",aciklama:"Титановый винт устанавливается в кость.",sure:"2-3 месяца"},
    kaplama:{baslik:"Коронка",aciklama:"Поверхность зуба покрывается цирконием.",sure:"1-2 сеанса"},
    kanal:{baslik:"Лечение канала",aciklama:"Инфицированная ткань удаляется.",sure:"1-2 сеанса"},
    dolgu:{baslik:"Пломба",aciklama:"Кариозная область очищается.",sure:"1 сеанс"},
    cekim:{baslik:"Удаление зуба",aciklama:"Зуб удаляется под анестезией.",sure:"1 сеанс"},
    kopru:{baslik:"Мост",aciklama:"Фиксированный мост.",sure:"2-3 сеанса"},
    lezyon:{baslik:"Лечение очага",aciklama:"Абсцесс у корня удаляется.",sure:"1-2 сеанса"},
  },
  fr:{
    implant:{baslik:"Implant",aciklama:"Une vis en titane est placée dans l'os.",sure:"2-3 mois"},
    kaplama:{baslik:"Couronne",aciklama:"La surface est recouverte de zircone.",sure:"1-2 séances"},
    kanal:{baslik:"Traitement canalaire",aciklama:"Le tissu nerveux infecté est retiré.",sure:"1-2 séances"},
    dolgu:{baslik:"Obturation",aciklama:"La zone cariée est nettoyée.",sure:"1 séance"},
    cekim:{baslik:"Extraction",aciklama:"La dent est extraite sous anesthésie.",sure:"1 séance"},
    kopru:{baslik:"Bridge",aciklama:"Un bridge fixe est réalisé.",sure:"2-3 séances"},
    lezyon:{baslik:"Traitement de lésion",aciklama:"L'abcès à l'apex est nettoyé.",sure:"1-2 séances"},
  },
};

const METINLER = {
  tr:{
    baslik:"Hasta Paneli",
    hosgeldin:"Hoş Geldiniz",tedaviSureci:"Tedavi sürecinizi buradan takip edebilirsiniz.",
    talepSayisi:"Teklif Talebim",teklifSayisi:"Gelen Teklif",bekleyen:"Bekleyen",
    teklifYok:"Henüz teklif talebiniz yok",teklifYokAcik:"İlk teklif talebinizi oluşturun.",
    teklifOlustur:"Teklif Talebi Oluştur",yeniTalep:"+ Yeni Teklif Talebi",cikisYap:"Çıkış Yap",
    menu:{ozet:"Genel Özet",talepler:"Teklif Taleplerim",teklifler:"Gelen Teklifler",transferler:"🚗 Transferlerim",destek:"🎯 Medoqa Destek",profil:"Profilim",mesajlar:"💬 Mesajlar"},
    taleplerim:"Teklif Taleplerim",yeniTalepBtn:"+ Yeni Talep",talepYok:"Henüz teklif talebiniz yok",
    gelenTeklifler:"Gelen Teklifler",gelenYok:"Henüz gelen teklif yok.",detayGor:"Detayları gör →",
    onaylandi:"✅ Onaylandı",reddedildi:"❌ Reddedildi",beklemede:"⏳ Beklemede",
    tedaviTamamlandi:"✅ Tedavi Tamamlandı",tedaviTamamlandiBtn:"🏁 Tedaviyi Tamamladım",
    tedaviTamamlandiOnay:"Tedaviniz tamamlandı mı? Bu işlem geri alınamaz.",
    tedaviTamamlandiMesaj:"✅ Tedavi tamamlandı! Deneyiminizi paylaşabilirsiniz.",
    profilim:"Profilim",ad:"Ad",soyad:"Soyad",eposta:"E-posta",hesapTuru:"Hesap Türü",
    mesajlar:"💬 Mesajlar",mesajlarAcik:"Kliniklerle mesajlaşmak için mesajlar sayfasını kullanın.",
    mesajlarGit:"💬 Mesajlar Sayfasına Git →",
    tedaviPlani:"🦷 Tedavi Planı — Diş Şeması",ustCene:"Üst çene",altCene:"Alt çene",
    tedaviler:"💊 Tedaviler",fiyatOzeti:"💰 Fiyat Özeti",tedaviUcreti:"Tedavi",toplam:"Toplam",
    teklifOnayla:"✅ Teklifi Onayla",teklifReddet:"❌ Reddet",mesajlas:"💬 Klinik ile Mesajlaş",
    onayMesaj:"Bu teklifi onaylamak istediğinize emin misiniz?",
    reddetMesaj:"Bu teklifi reddetmek istediğinize emin misiniz?",
    onayBasarili:"✅ Teklif onaylandı!",
    transferTalebiOlustur:"🚗 Transfer Talebi Oluştur",
    transferUyari:"Bu teklif transfer içermiyor. Transfer firmasından teklif almak ister misiniz?",
    transferlerim:"🚗 Transfer Taleplerim",transferYok:"Henüz transfer talebiniz yok.",
    transferTalebiBaslik:"Transfer Talebi Oluştur",
    sehir:"Şehir / Bölge",havalimani:"Havalimanı",otelAdi:"Otel Adı",
    klinikAdi:"Klinik Adı",tedaviBaslangic:"Tedavi Başlangıç Tarihi",
    tedaviBitis:"Tedavi Bitiş Tarihi",klinikZiyaret:"Klinik Ziyaret Sayısı",
    yolcuSayisi:"Yolcu Sayısı",notlar:"Ek Notlar",notlarPlaceholder:"Özel istekler, yardım gereksinimi vb.",
    transferTurleri:"Hangi transferlere ihtiyacınız var?",
    havAlimaniOtel:"✈️ Havalimanı → Otel",otelKlinik:"🏨 Otel → Klinik",
    klinikOtel:"🏥 Klinik → Otel",otelHavAlimani:"🏨 Otel → Havalimanı",
    talepGonder:"Transfer Talebi Gönder",talepGonderildi:"✅ Transfer talebi gönderildi!",
    kapat:"Kapat",iptal:"İptal",
    transferDurumu:{beklemede:"⏳ Beklemede",teklif_verildi:"📋 Teklif Geldi",onaylandi:"✅ Onaylandı"},
    transferTeklifGor:"Teklifleri Gör →",
    // Destek
    destekBaslik:"🎯 Medoqa Destek",
    destekAcik:"Koordinatörlerimiz size yardımcı olmak için burada. Sorularınızı, şikayetlerinizi veya tedavi öncesi danışma taleplerinizi iletebilirsiniz.",
    destekKonu:"Konu",
    destekKonular:{genel:"Genel Soru",teklif:"Teklif Hakkında",sikayet:"Şikayet",danisma:"Tedavi Öncesi Danışma",diger:"Diğer"},
    destekMesaj:"Mesajınız",
    destekMesajPlaceholder:"Sorunuzu veya talebinizi detaylı olarak yazın...",
    destekGonder:"📨 Gönder",
    destekGonderildi:"✅ Mesajınız alındı! Koordinatörümüz en kısa sürede dönüş yapacak.",
    destekTaleplerim:"Destek Taleplerim",
    destekYok:"Henüz destek talebiniz yok.",
    destekDurum:{beklemede:"⏳ Beklemede",yanitlandi:"✅ Yanıtlandı",kapandi:"🔒 Kapandı"},
    destekYanitBaslik:"Koordinatör Yanıtı",
  },
  en:{
    baslik:"Patient Panel",
    hosgeldin:"Welcome",tedaviSureci:"You can track your treatment process here.",
    talepSayisi:"My Requests",teklifSayisi:"Received Offers",bekleyen:"Pending",
    teklifYok:"No quote requests yet",teklifYokAcik:"Create your first quote request.",
    teklifOlustur:"Create Quote Request",yeniTalep:"+ New Quote Request",cikisYap:"Sign Out",
    menu:{ozet:"Overview",talepler:"My Requests",teklifler:"Received Offers",transferler:"🚗 My Transfers",destek:"🎯 Medoqa Support",profil:"My Profile",mesajlar:"💬 Messages"},
    taleplerim:"My Quote Requests",yeniTalepBtn:"+ New Request",talepYok:"No quote requests yet",
    gelenTeklifler:"Received Offers",gelenYok:"No offers received yet.",detayGor:"View details →",
    onaylandi:"✅ Approved",reddedildi:"❌ Rejected",beklemede:"⏳ Pending",
    tedaviTamamlandi:"✅ Treatment Completed",tedaviTamamlandiBtn:"🏁 Mark as Completed",
    tedaviTamamlandiOnay:"Has your treatment been completed? This action cannot be undone.",
    tedaviTamamlandiMesaj:"✅ Treatment completed! You can now share your experience.",
    profilim:"My Profile",ad:"First Name",soyad:"Last Name",eposta:"Email",hesapTuru:"Account Type",
    mesajlar:"💬 Messages",mesajlarAcik:"Use the messages page to communicate with clinics.",
    mesajlarGit:"💬 Go to Messages →",
    tedaviPlani:"🦷 Treatment Plan — Dental Chart",ustCene:"Upper jaw",altCene:"Lower jaw",
    tedaviler:"💊 Treatments",fiyatOzeti:"💰 Price Summary",tedaviUcreti:"Treatment",toplam:"Total",
    teklifOnayla:"✅ Approve Offer",teklifReddet:"❌ Reject",mesajlas:"💬 Message the Clinic",
    onayMesaj:"Are you sure you want to approve this offer?",
    reddetMesaj:"Are you sure you want to reject this offer?",
    onayBasarili:"✅ Offer approved!",
    transferTalebiOlustur:"🚗 Create Transfer Request",
    transferUyari:"This offer does not include transfer.",
    transferlerim:"🚗 My Transfer Requests",transferYok:"No transfer requests yet.",
    transferTalebiBaslik:"Create Transfer Request",
    sehir:"City / Region",havalimani:"Airport",otelAdi:"Hotel Name",
    klinikAdi:"Clinic Name",tedaviBaslangic:"Treatment Start Date",
    tedaviBitis:"Treatment End Date",klinikZiyaret:"Number of Clinic Visits",
    yolcuSayisi:"Number of Passengers",notlar:"Additional Notes",notlarPlaceholder:"Special requests, etc.",
    transferTurleri:"Which transfers do you need?",
    havAlimaniOtel:"✈️ Airport → Hotel",otelKlinik:"🏨 Hotel → Clinic",
    klinikOtel:"🏥 Clinic → Hotel",otelHavAlimani:"🏨 Hotel → Airport",
    talepGonder:"Send Transfer Request",talepGonderildi:"✅ Transfer request sent!",
    kapat:"Close",iptal:"Cancel",
    transferDurumu:{beklemede:"⏳ Pending",teklif_verildi:"📋 Offer Received",onaylandi:"✅ Approved"},
    transferTeklifGor:"View Offers →",
    destekBaslik:"🎯 Medoqa Support",
    destekAcik:"Our coordinators are here to help you. You can send your questions, complaints or pre-treatment consultation requests.",
    destekKonu:"Subject",
    destekKonular:{genel:"General Question",teklif:"About an Offer",sikayet:"Complaint",danisma:"Pre-Treatment Consultation",diger:"Other"},
    destekMesaj:"Your Message",
    destekMesajPlaceholder:"Please describe your question or request in detail...",
    destekGonder:"📨 Send",
    destekGonderildi:"✅ Your message has been received! Our coordinator will get back to you shortly.",
    destekTaleplerim:"My Support Requests",
    destekYok:"No support requests yet.",
    destekDurum:{beklemede:"⏳ Pending",yanitlandi:"✅ Answered",kapandi:"🔒 Closed"},
    destekYanitBaslik:"Coordinator Response",
  },
  de:{
    baslik:"Patientenbereich",
    hosgeldin:"Willkommen",tedaviSureci:"Sie können Ihren Behandlungsprozess hier verfolgen.",
    talepSayisi:"Meine Anfragen",teklifSayisi:"Erhaltene Angebote",bekleyen:"Ausstehend",
    teklifYok:"Noch keine Angebotsanfragen",teklifYokAcik:"Erstellen Sie Ihre erste Anfrage.",
    teklifOlustur:"Angebotsanfrage erstellen",yeniTalep:"+ Neue Anfrage",cikisYap:"Abmelden",
    menu:{ozet:"Übersicht",talepler:"Meine Anfragen",teklifler:"Erhaltene Angebote",transferler:"🚗 Meine Transfers",destek:"🎯 Medoqa Support",profil:"Mein Profil",mesajlar:"💬 Nachrichten"},
    taleplerim:"Meine Angebotsanfragen",yeniTalepBtn:"+ Neue Anfrage",talepYok:"Noch keine Anfragen",
    gelenTeklifler:"Erhaltene Angebote",gelenYok:"Noch keine Angebote erhalten.",detayGor:"Details ansehen →",
    onaylandi:"✅ Genehmigt",reddedildi:"❌ Abgelehnt",beklemede:"⏳ Ausstehend",
    tedaviTamamlandi:"✅ Behandlung abgeschlossen",tedaviTamamlandiBtn:"🏁 Als abgeschlossen markieren",
    tedaviTamamlandiOnay:"Wurde Ihre Behandlung abgeschlossen? Diese Aktion kann nicht rückgängig gemacht werden.",
    tedaviTamamlandiMesaj:"✅ Behandlung abgeschlossen! Sie können Ihre Erfahrung teilen.",
    profilim:"Mein Profil",ad:"Vorname",soyad:"Nachname",eposta:"E-Mail",hesapTuru:"Kontotyp",
    mesajlar:"💬 Nachrichten",mesajlarAcik:"Nutzen Sie die Nachrichtenseite für die Kommunikation.",
    mesajlarGit:"💬 Zur Nachrichtenseite →",
    tedaviPlani:"🦷 Behandlungsplan — Zahnschema",ustCene:"Oberkiefer",altCene:"Unterkiefer",
    tedaviler:"💊 Behandlungen",fiyatOzeti:"💰 Preisübersicht",tedaviUcreti:"Behandlung",toplam:"Gesamt",
    teklifOnayla:"✅ Angebot annehmen",teklifReddet:"❌ Ablehnen",mesajlas:"💬 Klinik kontaktieren",
    onayMesaj:"Möchten Sie dieses Angebot wirklich annehmen?",
    reddetMesaj:"Möchten Sie dieses Angebot wirklich ablehnen?",
    onayBasarili:"✅ Angebot angenommen!",
    transferTalebiOlustur:"🚗 Transferanfrage erstellen",
    transferUyari:"Dieses Angebot enthält keinen Transfer.",
    transferlerim:"🚗 Meine Transferanfragen",transferYok:"Noch keine Transferanfragen.",
    transferTalebiBaslik:"Transferanfrage erstellen",
    sehir:"Stadt / Region",havalimani:"Flughafen",otelAdi:"Hotelname",
    klinikAdi:"Klinikname",tedaviBaslangic:"Behandlungsbeginn",
    tedaviBitis:"Behandlungsende",klinikZiyaret:"Anzahl der Klinikbesuche",
    yolcuSayisi:"Anzahl der Passagiere",notlar:"Zusätzliche Notizen",notlarPlaceholder:"Besondere Wünsche usw.",
    transferTurleri:"Welche Transfers benötigen Sie?",
    havAlimaniOtel:"✈️ Flughafen → Hotel",otelKlinik:"🏨 Hotel → Klinik",
    klinikOtel:"🏥 Klinik → Hotel",otelHavAlimani:"🏨 Hotel → Flughafen",
    talepGonder:"Transferanfrage senden",talepGonderildi:"✅ Transferanfrage gesendet!",
    kapat:"Schließen",iptal:"Abbrechen",
    transferDurumu:{beklemede:"⏳ Ausstehend",teklif_verildi:"📋 Angebot erhalten",onaylandi:"✅ Genehmigt"},
    transferTeklifGor:"Angebote ansehen →",
    destekBaslik:"🎯 Medoqa Support",
    destekAcik:"Unsere Koordinatoren sind für Sie da. Sie können Ihre Fragen, Beschwerden oder Beratungsanfragen senden.",
    destekKonu:"Betreff",
    destekKonular:{genel:"Allgemeine Frage",teklif:"Über ein Angebot",sikayet:"Beschwerde",danisma:"Beratung vor der Behandlung",diger:"Sonstiges"},
    destekMesaj:"Ihre Nachricht",
    destekMesajPlaceholder:"Bitte beschreiben Sie Ihre Frage oder Anfrage...",
    destekGonder:"📨 Senden",
    destekGonderildi:"✅ Ihre Nachricht wurde empfangen! Unser Koordinator wird sich in Kürze melden.",
    destekTaleplerim:"Meine Support-Anfragen",
    destekYok:"Noch keine Support-Anfragen.",
    destekDurum:{beklemede:"⏳ Ausstehend",yanitlandi:"✅ Beantwortet",kapandi:"🔒 Geschlossen"},
    destekYanitBaslik:"Koordinator-Antwort",
  },
};

function disSVG(no:number,upper:boolean,conds:string[]) {
  const t=TYPES[no],kat=conds.find(c=>RENKLER[c]),renk=kat?RENKLER[kat]:RENKLER.default;
  const stroke=kat?'rgba(0,0,0,.15)':'rgba(0,0,0,.08)';
  const prl=kat?`<ellipse cx="13" cy="${upper?36:28}" rx="7" ry="4" fill="rgba(255,255,255,.2)"/>`:'';
  let kur='',kok='';
  if(t==='CI'||t==='LI'){
    if(upper){kok=`<path d="M9,30 C9,16 11,6 13,1 C15,6 17,16 17,30Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M3,30 L6,46 L20,46 L23,30Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`;}
    else{kok=`<path d="M9,34 C9,48 11,58 13,63 C15,58 17,48 17,34Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M3,34 L6,18 L20,18 L23,34Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`;}
  }else if(t==='C'){
    if(upper){kok=`<path d="M9,28 C9,14 11,4 13,0 C15,4 17,14 17,28Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M4,28 L9,46 Q11,52 13,52 Q15,52 17,46 L22,28Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`;}
    else{kok=`<path d="M9,36 C9,50 11,60 13,64 C15,60 17,50 17,36Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M4,36 L9,18 Q11,12 13,12 Q15,12 17,18 L22,36Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`;}
  }else if(t==='P'){
    if(upper){kok=`<path d="M7,28 C6,14 9,4 11,2 C13,0 15,2 13,28Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/><path d="M13,28 C15,4 17,2 19,4 C21,8 20,18 19,28Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M2,28 Q2,44 13,46 Q24,44 24,28Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`;}
    else{kok=`<path d="M7,36 C6,50 9,60 11,62 C13,64 15,62 13,36Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/><path d="M13,36 C15,62 17,62 19,60 C21,56 20,46 19,36Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M2,36 Q2,20 13,18 Q24,20 24,36Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`;}
  }else{
    if(upper){kok=`<path d="M4,26 C3,12 5,3 7,1 C9,0 9,26 11,26Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/><path d="M11,25 C10,8 12,2 13,1 C14,2 16,8 15,25Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/><path d="M15,26 C17,26 17,0 19,1 C21,3 23,12 22,26Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M1,26 Q1,42 13,44 Q25,42 25,26Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`;}
    else{kok=`<path d="M4,38 C3,52 5,61 7,63 C9,64 9,38 11,38Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/><path d="M11,39 C10,56 12,62 13,63 C14,62 16,56 15,39Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/><path d="M15,38 C17,38 17,64 19,63 C21,61 23,52 22,38Z" fill="#d0c48a" stroke="#b0a070" stroke-width=".5"/>`;kur=`<path d="M1,38 Q1,22 13,20 Q25,22 25,38Z" fill="${renk}" stroke="${stroke}" stroke-width=".7"/>${prl}`;}
  }
  if(conds.includes('cekim'))kur+=`<line x1="4" y1="6" x2="22" y2="58" stroke="#E24B4A" stroke-width="2" stroke-linecap="round" opacity=".8"/><line x1="22" y1="6" x2="4" y2="58" stroke="#E24B4A" stroke-width="2" stroke-linecap="round" opacity=".8"/>`;
  return `<svg width="24" height="64" viewBox="0 0 26 64">${kok}${kur}</svg>`;
}

function TransferModal({teklif, onKapat, onGonderildi, m, supabase}: any) {
  const [sehir, setSehir] = useState("");
  const [havalimani, setHavalimani] = useState("");
  const [otelAdi, setOtelAdi] = useState("");
  const [klinikAdi, setKlinikAdi] = useState(teklif?.profiles?.ad ? `${teklif.profiles.ad} ${teklif.profiles.soyad}` : "");
  const [baslangic, setBaslangic] = useState("");
  const [bitis, setBitis] = useState("");
  const [ziyaretSayisi, setZiyaretSayisi] = useState("2");
  const [yolcuSayisi, setYolcuSayisi] = useState("1");
  const [notlar, setNotlar] = useState("");
  const [transferTurleri, setTransferTurleri] = useState({havalimani_otel:true,otel_klinik:true,klinik_otel:true,otel_havalimani:true});
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");
  const inputStyle: React.CSSProperties = {width:"100%",border:"1px solid #e5e7eb",borderRadius:"8px",padding:"10px 12px",fontSize:"13px",outline:"none",boxSizing:"border-box"};
  const labelStyle: React.CSSProperties = {fontSize:"12px",color:"#555",display:"block",marginBottom:"4px",fontWeight:500};

  async function gonder() {
    if (!sehir || !baslangic) { setHata("Şehir ve başlangıç tarihi zorunludur."); return; }
    setYukleniyor(true);
    const {data:{user}} = await supabase.auth.getUser();
    const secilenTurler = Object.entries(transferTurleri).filter(([,v])=>v).map(([k])=>k);
    const {error} = await supabase.from("transfer_talepleri").insert({hasta_id:user?.id||null,talep_id:teklif?.talep_id||null,klinik_id:teklif?.klinik_id||null,hasta_ad:user?.email||"",sehir,havalimani,otel_adi:otelAdi,klinik_adi:klinikAdi,tedavi_baslangic:baslangic,tedavi_bitis:bitis||null,klinik_ziyaret_sayisi:parseInt(ziyaretSayisi),yolcu_sayisi:parseInt(yolcuSayisi),transfer_turleri:secilenTurler,notlar,durum:"beklemede"});
    if (error) { setHata("Hata: "+error.message); setYukleniyor(false); return; }
    onGonderildi();
  }

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
      <div style={{background:"#fff",borderRadius:"16px",width:"100%",maxWidth:"520px",maxHeight:"90vh",overflow:"auto"}}>
        <div style={{background:"#12103a",borderRadius:"16px 16px 0 0",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:"16px",fontWeight:700,color:"#fff"}}>🚗 {m.transferTalebiBaslik}</div>
          <button onClick={onKapat} style={{background:"rgba(255,255,255,.15)",border:"none",color:"#fff",width:"28px",height:"28px",borderRadius:"50%",cursor:"pointer",fontSize:"16px"}}>×</button>
        </div>
        <div style={{padding:"20px"}}>
          {hata && <div style={{background:"#fff0f0",border:"1px solid #fcc",borderRadius:"8px",padding:"8px 12px",marginBottom:"12px",fontSize:"12px",color:"#c00"}}>{hata}</div>}
          <div style={{background:"#f0eeff",borderRadius:"10px",padding:"14px",marginBottom:"16px"}}>
            <div style={{fontSize:"13px",fontWeight:700,color:"#12103a",marginBottom:"10px"}}>{m.transferTurleri}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
              {[{key:"havalimani_otel",label:m.havAlimaniOtel},{key:"otel_klinik",label:m.otelKlinik},{key:"klinik_otel",label:m.klinikOtel},{key:"otel_havalimani",label:m.otelHavAlimani}].map(({key,label})=>(
                <label key={key} style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",fontSize:"12px",color:"#333",background:"#fff",padding:"8px 10px",borderRadius:"8px",border:`1px solid ${(transferTurleri as any)[key]?"#534AB7":"#e5e7eb"}`}}>
                  <input type="checkbox" checked={(transferTurleri as any)[key]} onChange={e=>setTransferTurleri(prev=>({...prev,[key]:e.target.checked}))} style={{width:"14px",height:"14px"}}/>{label}
                </label>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"10px"}}>
            <div><label style={labelStyle}>{m.sehir} *</label><input type="text" value={sehir} onChange={e=>setSehir(e.target.value)} style={inputStyle}/></div>
            <div><label style={labelStyle}>{m.havalimani}</label><input type="text" value={havalimani} onChange={e=>setHavalimani(e.target.value)} style={inputStyle}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"10px"}}>
            <div><label style={labelStyle}>{m.otelAdi}</label><input type="text" value={otelAdi} onChange={e=>setOtelAdi(e.target.value)} style={inputStyle}/></div>
            <div><label style={labelStyle}>{m.klinikAdi}</label><input type="text" value={klinikAdi} onChange={e=>setKlinikAdi(e.target.value)} style={inputStyle}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"10px"}}>
            <div><label style={labelStyle}>{m.tedaviBaslangic} *</label><input type="date" value={baslangic} onChange={e=>setBaslangic(e.target.value)} style={inputStyle}/></div>
            <div><label style={labelStyle}>{m.tedaviBitis}</label><input type="date" value={bitis} onChange={e=>setBitis(e.target.value)} style={inputStyle}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"10px"}}>
            <div><label style={labelStyle}>{m.klinikZiyaret}</label><select value={ziyaretSayisi} onChange={e=>setZiyaretSayisi(e.target.value)} style={{...inputStyle,background:"#fff"}}>{[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n} value={n}>{n}</option>)}</select></div>
            <div><label style={labelStyle}>{m.yolcuSayisi}</label><select value={yolcuSayisi} onChange={e=>setYolcuSayisi(e.target.value)} style={{...inputStyle,background:"#fff"}}>{[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n}</option>)}</select></div>
          </div>
          <div style={{marginBottom:"16px"}}><label style={labelStyle}>{m.notlar}</label><textarea rows={2} placeholder={m.notlarPlaceholder} value={notlar} onChange={e=>setNotlar(e.target.value)} style={{...inputStyle,resize:"none"}}/></div>
          <div style={{display:"flex",gap:"10px"}}>
            <button onClick={onKapat} style={{flex:1,background:"#f9fafb",color:"#555",border:"1px solid #e5e7eb",padding:"11px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>{m.iptal}</button>
            <button onClick={gonder} disabled={yukleniyor} style={{flex:2,background:"#534AB7",color:"#fff",border:"none",padding:"11px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:600,opacity:yukleniyor?0.7:1}}>{yukleniyor?"...":m.talepGonder}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HastaPanel() {
  const [aktifMenu, setAktifMenu] = useState("ozet");
  const [kullanici, setKullanici] = useState<any>(null);
  const [talepler, setTalepler] = useState<any[]>([]);
  const [teklifler, setTeklifler] = useState<any[]>([]);
  const [transferTalepleri, setTransferTalepleri] = useState<any[]>([]);
  const [destekTalepleri, setDestekTalepleri] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [mesaj, setMesaj] = useState("");
  const [acikTeklif, setAcikTeklif] = useState<any>(null);
  const [transferModal, setTransferModal] = useState<any>(null);
  const {dil,dilDegistir} = useDil();
  const m = METINLER[dil as keyof typeof METINLER] || METINLER.en;
  const supabase = createClient();

  // Destek formu state
  const [destekKonu, setDestekKonu] = useState("genel");
  const [destekMesajText, setDestekMesajText] = useState("");
  const [destekYukleniyor, setDestekYukleniyor] = useState(false);
  const [destekBasarili, setDestekBasarili] = useState(false);

  useEffect(()=>{veriYukle();},[]);

  async function veriYukle() {
    setYukleniyor(true);
    const {data:{user}} = await supabase.auth.getUser();
    if (!user) {window.location.href="/giris";return;}
    const {data:profile} = await supabase.from("profiles").select("*").eq("id",user.id).single();
    setKullanici(profile);
    const {data:talepData} = await supabase.from("talepler").select("*").eq("hasta_id",user.id).order("olusturma_tarihi",{ascending:false});
    setTalepler(talepData||[]);
    if (talepData&&talepData.length>0) {
      const ids = talepData.map((t:any)=>t.id);
      const {data:teklifData} = await supabase.from("teklifler").select("*, profiles!teklifler_klinik_id_fkey(id,ad,soyad,konum_adres,telefon,kapak_fotograf)").in("talep_id",ids).order("olusturma_tarihi",{ascending:false});
      setTeklifler(teklifData||[]);
    }
    const {data:trData} = await supabase.from("transfer_talepleri").select("*").eq("hasta_id",user.id).order("created_at",{ascending:false});
    setTransferTalepleri(trData||[]);
    const {data:destekData} = await supabase.from("destek_talepleri").select("*").eq("hasta_id",user.id).order("olusturma_tarihi",{ascending:false});
    setDestekTalepleri(destekData||[]);
    setYukleniyor(false);
  }

  async function destekGonder() {
    if (!destekMesajText.trim()) return;
    setDestekYukleniyor(true);
    const {data:{user}} = await supabase.auth.getUser();
    const {error} = await supabase.from("destek_talepleri").insert({
      hasta_id: user?.id,
      hasta_ad: `${kullanici?.ad} ${kullanici?.soyad}`,
      hasta_email: kullanici?.email,
      konu: destekKonu,
      mesaj: destekMesajText.trim(),
      durum: "beklemede",
    });
    if (error) { setMesaj("Hata: "+error.message); setDestekYukleniyor(false); return; }
    setDestekBasarili(true);
    setDestekMesajText("");
    setDestekKonu("genel");
    setTimeout(()=>setDestekBasarili(false), 5000);
    setDestekYukleniyor(false);
    veriYukle();
  }

  async function tedaviTamamla(teklifId:string) {
    if (!confirm(m.tedaviTamamlandiOnay)) return;
    const {error} = await supabase.from("teklifler").update({tedavi_tamamlandi:true}).eq("id",teklifId);
    if (error) {setMesaj("Hata: "+error.message);return;}
    setMesaj(m.tedaviTamamlandiMesaj);
    setTimeout(()=>setMesaj(""),5000);
    setAcikTeklif(null);
    veriYukle();
  }

  async function teklifOnayla(t:any) {
    if (!confirm(m.onayMesaj)) return;
    const {error} = await supabase.from("teklifler").update({durum:"onaylandi"}).eq("id",t.id);
    if (error) {setMesaj("Hata: "+error.message);return;}
    const {data:{user}} = await supabase.auth.getUser();
    if (user&&t.klinik_id) {
      await supabase.from("mesajlar").insert({gonderen_id:user.id,alici_id:t.klinik_id,mesaj:dil==="tr"?"Merhaba, teklifinizi onayladım.":dil==="en"?"Hello, I approved your offer.":"Hallo, ich habe Ihr Angebot genehmigt.",okundu:false});
    }
    setMesaj(m.onayBasarili);setAcikTeklif(null);setTimeout(()=>setMesaj(""),4000);veriYukle();
  }

  async function teklifReddet(id:string) {
    if (!confirm(m.reddetMesaj)) return;
    await supabase.from("teklifler").update({durum:"reddedildi"}).eq("id",id);
    setAcikTeklif(null);veriYukle();
  }

  async function cikisYap() { await supabase.auth.signOut(); window.location.href="/giris"; }

  function durumBadge(durum:string, tamamlandi:boolean) {
    if (tamamlandi) return {label:m.tedaviTamamlandi,bg:"#f0fff4",color:"#059669"};
    if (durum==="onaylandi") return {label:m.onaylandi,bg:"#e0f2fe",color:"#0369a1"};
    if (durum==="reddedildi") return {label:m.reddedildi,bg:"#fff0f0",color:"#c00"};
    return {label:m.beklemede,bg:"#fff8e1",color:"#BA7517"};
  }

  const bekleyenDestek = destekTalepleri.filter((d:any)=>d.durum==="beklemede").length;

  function TeklifModal({t}:{t:any}) {
    const disPlan:Record<number,string[]> = t.dis_plani?JSON.parse(t.dis_plani):{};
    const tedaviDetay:{dis:number,hizmet_adi:string,fiyat:number,kategori:string}[] = t.tedavi_detaylari?JSON.parse(t.tedavi_detaylari):[];
    const klinik = t.profiles;
    const kategoriler = [...new Set(tedaviDetay.map((d:any)=>d.kategori))] as string[];
    const ack = TEDAVI_ACK[dil as keyof typeof TEDAVI_ACK]||TEDAVI_ACK.en;
    const durum = durumBadge(t.durum, t.tedavi_tamamlandi);
    const transferGerekli = t.transfer_gerekli && !t.transfer_dahil;
    const toothWord = dil==="tr"?"Diş":dil==="de"?"Zahn":dil==="ar"?"سن":dil==="ru"?"Зуб":dil==="fr"?"Dent":"Tooth";

    return (
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:1000,display:"flex",alignItems:"flex-start",justifyContent:"center",overflowY:"auto",padding:"20px"}}>
        <div style={{background:"#f9fafb",borderRadius:"20px",width:"100%",maxWidth:"680px",marginTop:"20px",marginBottom:"20px"}}>
          <div style={{background:"#12103a",borderRadius:"20px 20px 0 0",padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:"16px"}}>
              <a href="/" style={{fontSize:"18px",fontWeight:700,color:"#fff",textDecoration:"none"}}>med<span style={{color:"#7F77DD",fontWeight:300}}>oqa</span></a>
              <div style={{display:"flex",gap:"4px"}}>
                {(["tr","en","de","ar","ru","fr"] as const).map(d=>(<span key={d} onClick={()=>dilDegistir(d)} style={{fontSize:"10px",padding:"2px 7px",border:`1px solid ${dil===d?"#534AB7":"#2a2a4e"}`,borderRadius:"4px",color:dil===d?"#7F77DD":"#aab4c8",cursor:"pointer",textTransform:"uppercase"}}>{d}</span>))}
              </div>
            </div>
            <button onClick={()=>setAcikTeklif(null)} style={{background:"rgba(255,255,255,.15)",border:"none",color:"#fff",width:"32px",height:"32px",borderRadius:"50%",cursor:"pointer",fontSize:"18px",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          </div>
          <div style={{padding:"24px"}}>
            <div style={{background:"#fff",borderRadius:"14px",padding:"20px",marginBottom:"16px",display:"flex",gap:"14px",alignItems:"center",border:"1px solid #EEEDFE"}}>
              {klinik?.kapak_fotograf?<img src={klinik.kapak_fotograf} alt={klinik.ad} style={{width:"56px",height:"56px",borderRadius:"50%",objectFit:"cover",flexShrink:0}}/>:<div style={{width:"56px",height:"56px",borderRadius:"50%",background:"#EEEDFE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",fontWeight:700,color:"#534AB7",flexShrink:0}}>{klinik?.ad?.[0]?.toUpperCase()||"K"}</div>}
              <div style={{flex:1}}>
                <div style={{fontSize:"17px",fontWeight:700,color:"#12103a"}}>{klinik?.ad} {klinik?.soyad}</div>
                {klinik?.konum_adres&&<div style={{fontSize:"12px",color:"#94a3b8",marginTop:"2px"}}>📍 {klinik.konum_adres}</div>}
                {klinik?.telefon&&<div style={{fontSize:"12px",color:"#94a3b8"}}>📞 {klinik.telefon}</div>}
              </div>
              <div style={{textAlign:"right"}}>
                <span style={{fontSize:"12px",padding:"4px 12px",borderRadius:"20px",fontWeight:600,display:"block",marginBottom:"4px",background:durum.bg,color:durum.color}}>{durum.label}</span>
                <div style={{fontSize:"11px",color:"#94a3b8"}}>{new Date(t.olusturma_tarihi).toLocaleDateString()}</div>
              </div>
            </div>

            {transferGerekli&&(<div style={{background:"#fff8e1",border:"1px solid #f59e0b",borderRadius:"12px",padding:"14px 16px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px"}}>
              <div style={{fontSize:"12px",color:"#78350f"}}>{m.transferUyari}</div>
              <button onClick={()=>{setAcikTeklif(null);setTransferModal(t);}} style={{background:"#f59e0b",color:"#fff",border:"none",padding:"8px 16px",borderRadius:"8px",fontSize:"12px",cursor:"pointer",fontWeight:700,flexShrink:0}}>{m.transferTalebiOlustur}</button>
            </div>)}

            {Object.keys(disPlan).length>0&&(<div style={{background:"#fff",borderRadius:"14px",padding:"20px",marginBottom:"16px",border:"1px solid #EEEDFE"}}>
              <div style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"14px"}}>{m.tedaviPlani}</div>
              <p style={{fontSize:"9px",color:"#94a3b8",textAlign:"center",margin:"0 0 4px",letterSpacing:".6px",textTransform:"uppercase"}}>{m.ustCene}</p>
              <div style={{display:"flex",justifyContent:"center"}}>{UST.map(no=>(<div key={no} style={{display:"flex",flexDirection:"column",alignItems:"center",filter:disPlan[no]?`drop-shadow(0 0 4px ${RENKLER[disPlan[no]?.[0]]||'#534AB7'}88)`:'none'}}><span style={{fontSize:"7px",color:"#94a3b8",height:"11px",lineHeight:"11px"}}>{no}</span><div dangerouslySetInnerHTML={{__html:disSVG(no,true,disPlan[no]||[])}}/></div>))}</div>
              <div style={{height:"4px",background:"#e5e7eb",margin:"3px 12px",borderRadius:"2px"}}/>
              <div style={{display:"flex",justifyContent:"center"}}>{ALT.map(no=>(<div key={no} style={{display:"flex",flexDirection:"column",alignItems:"center",filter:disPlan[no]?`drop-shadow(0 0 4px ${RENKLER[disPlan[no]?.[0]]||'#534AB7'}88)`:'none'}}><div dangerouslySetInnerHTML={{__html:disSVG(no,false,disPlan[no]||[])}}/><span style={{fontSize:"7px",color:"#94a3b8",height:"11px",lineHeight:"11px"}}>{no}</span></div>))}</div>
              <p style={{fontSize:"9px",color:"#94a3b8",textAlign:"center",margin:"4px 0 10px",letterSpacing:".6px",textTransform:"uppercase"}}>{m.altCene}</p>
            </div>)}

            {tedaviDetay.length>0&&(<div style={{background:"#fff",borderRadius:"14px",padding:"20px",marginBottom:"16px",border:"1px solid #EEEDFE"}}>
              <div style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"14px"}}>{m.tedaviler}</div>
              {tedaviDetay.map((d:any,i:number)=>{const ac=ack[d.kategori];const renk=RENKLER[d.kategori]||RENKLER.default;return(<div key={i} style={{display:"flex",gap:"14px",alignItems:"flex-start",padding:"12px",background:"#f8f9ff",borderRadius:"10px",border:"1px solid #EEEDFE",marginBottom:"8px"}}><div style={{width:"40px",height:"40px",borderRadius:"8px",background:renk+"22",border:`1px solid ${renk}44`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><div style={{width:"14px",height:"14px",borderRadius:"3px",background:renk}}/></div><div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}><div><span style={{fontSize:"13px",fontWeight:700,color:"#12103a"}}>{toothWord} {d.dis}</span><span style={{fontSize:"12px",color:"#64748b",marginLeft:"6px"}}>— {d.hizmet_adi}</span></div><span style={{fontSize:"14px",fontWeight:700,color:"#534AB7"}}>{d.fiyat} EUR</span></div>{ac&&<div style={{fontSize:"12px",color:"#64748b",lineHeight:1.6,marginBottom:"4px"}}>{ac.aciklama}</div>}{ac&&<span style={{fontSize:"11px",background:"#fff",color:"#94a3b8",padding:"2px 8px",borderRadius:"8px",border:"1px solid #EEEDFE"}}>⏱ {ac.sure}</span>}</div></div>);})}
            </div>)}

            <div style={{background:"#fff",borderRadius:"14px",padding:"20px",marginBottom:"16px",border:"1px solid #EEEDFE"}}>
              <div style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"14px"}}>{m.fiyatOzeti}</div>
              {tedaviDetay.length>0?tedaviDetay.map((d:any,i:number)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #f5f5f5",fontSize:"13px"}}><span>{toothWord} {d.dis} — {d.hizmet_adi}</span><span style={{fontWeight:600,color:"#534AB7"}}>{d.fiyat} EUR</span></div>)):(<div style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #f5f5f5",fontSize:"13px"}}><span>{m.tedaviUcreti}</span><span style={{fontWeight:600,color:"#534AB7"}}>{t.fiyat} EUR</span></div>)}
              {t.otel_dahil&&(<div style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #f5f5f5",fontSize:"13px"}}><span>🏨 Hotel — {t.otel_aciklama}</span><span style={{fontWeight:600,color:"#059669"}}>{t.otel_fiyat} EUR</span></div>)}
              {t.transfer_dahil&&(<div style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #f5f5f5",fontSize:"13px"}}><span>🚗 Transfer — {t.transfer_aciklama}</span><span style={{fontWeight:600,color:"#059669"}}>{t.transfer_fiyat} EUR</span></div>)}
              <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0 0",fontSize:"16px",fontWeight:700}}><span style={{color:"#12103a"}}>{m.toplam}</span><span style={{color:"#534AB7",fontSize:"20px"}}>{t.toplam_fiyat||t.fiyat} EUR</span></div>
            </div>

            {t.durum==="beklemede"&&(<div style={{display:"flex",gap:"10px",marginBottom:"12px"}}>
              <button onClick={()=>teklifOnayla(t)} style={{flex:2,background:"#059669",color:"#fff",border:"none",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:"pointer",fontWeight:700}}>{m.teklifOnayla}</button>
              <button onClick={()=>teklifReddet(t.id)} style={{flex:1,background:"#fff0f0",color:"#c00",border:"1px solid #fcc",padding:"13px",borderRadius:"10px",fontSize:"13px",cursor:"pointer",fontWeight:600}}>{m.teklifReddet}</button>
            </div>)}

            {t.durum==="onaylandi" && !t.tedavi_tamamlandi && (
              <div>
                <a href="/mesajlar" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:"#534AB7",color:"#fff",padding:"13px",borderRadius:"10px",fontSize:"14px",textDecoration:"none",fontWeight:700,marginBottom:"12px"}}>{m.mesajlas}</a>
                <button onClick={()=>tedaviTamamla(t.id)} style={{width:"100%",background:"#059669",color:"#fff",border:"none",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:"pointer",fontWeight:700}}>{m.tedaviTamamlandiBtn}</button>
              </div>
            )}

            {t.tedavi_tamamlandi && (
              <div>
                <div style={{background:"#f0fff4",border:"1px solid #9f9",borderRadius:"10px",padding:"12px 16px",marginBottom:"12px",fontSize:"13px",color:"#059669",fontWeight:600,textAlign:"center"}}>{m.tedaviTamamlandi} 🎉</div>
                <a href="/mesajlar" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:"#534AB7",color:"#fff",padding:"13px",borderRadius:"10px",fontSize:"14px",textDecoration:"none",fontWeight:700,marginBottom:"12px"}}>{m.mesajlas}</a>
                {kullanici && (<YorumFormu klinikId={t.klinik_id} tedaviTuru={t.talepler?.tedavi_turu||""} hastaId={kullanici.id} hastaAd={`${kullanici.ad} ${kullanici.soyad}`} hastaEmail={kullanici.email} teklifId={t.id} onTamamlandi={()=>setAcikTeklif(null)}/>)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {width:"100%",border:"1px solid #e5e7eb",borderRadius:"8px",padding:"10px 12px",fontSize:"13px",outline:"none",boxSizing:"border-box"};

  return (
    <main style={{minHeight:"100vh",background:"#f9fafb",fontFamily:"sans-serif",display:"flex"}}>
      {acikTeklif&&<TeklifModal t={acikTeklif}/>}
      {transferModal&&(<TransferModal teklif={transferModal} m={m} supabase={supabase} onKapat={()=>setTransferModal(null)} onGonderildi={()=>{setTransferModal(null);setMesaj(m.talepGonderildi);setTimeout(()=>setMesaj(""),4000);setAktifMenu("transferler");veriYukle();}}/>)}

      <div style={{width:"220px",background:"#12103a",display:"flex",flexDirection:"column",padding:"24px 0",flexShrink:0}}>
        <div style={{padding:"0 20px 20px",borderBottom:"1px solid #1e1b4b"}}>
          <a href="/" style={{fontSize:"20px",fontWeight:700,color:"#fff",textDecoration:"none"}}>med<span style={{color:"#7F77DD",fontWeight:300}}>oqa</span></a>
          <div style={{fontSize:"11px",color:"#6b6fa8",marginTop:"4px"}}>{m.baslik}</div>
        </div>
        {kullanici&&(<div style={{padding:"16px 20px",borderBottom:"1px solid #1e1b4b"}}>
          <div style={{width:"36px",height:"36px",background:"#534AB7",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"14px",marginBottom:"8px"}}>{kullanici.ad?.[0]?.toUpperCase()||"H"}</div>
          <div style={{fontSize:"13px",fontWeight:600,color:"#fff"}}>{kullanici.ad} {kullanici.soyad}</div>
          <div style={{fontSize:"11px",color:"#6b6fa8"}}>{kullanici.email}</div>
        </div>)}
        <div style={{padding:"12px 20px",borderBottom:"1px solid #1e1b4b",display:"flex",gap:"6px",flexWrap:"wrap"}}>
          {(["tr","en","de","ar","ru","fr"] as const).map(d=>(<span key={d} onClick={()=>dilDegistir(d)} style={{fontSize:"10px",padding:"3px 8px",border:`1px solid ${dil===d?"#534AB7":"#2a2a4e"}`,borderRadius:"4px",color:dil===d?"#7F77DD":"#aab4c8",cursor:"pointer",textTransform:"uppercase"}}>{d}</span>))}
        </div>
        <div style={{padding:"16px 12px",flex:1}}>
          {(["ozet","talepler","teklifler","transferler","destek","profil","mesajlar"] as const).map(id=>(<div key={id} onClick={()=>setAktifMenu(id)} style={{padding:"10px 12px",borderRadius:"8px",cursor:"pointer",marginBottom:"4px",background:aktifMenu===id?"#534AB7":"transparent",color:aktifMenu===id?"#fff":"#8b8fc8",fontSize:"13px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span>{m.menu[id]}</span>
            {id==="transferler"&&transferTalepleri.length>0&&(<span style={{background:"#BA7517",color:"#fff",fontSize:"10px",padding:"1px 6px",borderRadius:"10px"}}>{transferTalepleri.filter((t:any)=>t.durum==="beklemede").length||""}</span>)}
            {id==="destek"&&bekleyenDestek>0&&(<span style={{background:"#BA7517",color:"#fff",fontSize:"10px",padding:"1px 6px",borderRadius:"10px"}}>{bekleyenDestek}</span>)}
          </div>))}
        </div>
        <div style={{padding:"0 12px 20px"}}>
          <a href="/teklif" style={{display:"block",textAlign:"center",background:"#534AB7",color:"#fff",padding:"10px",borderRadius:"8px",fontSize:"13px",textDecoration:"none",marginBottom:"8px"}}>{m.yeniTalep}</a>
          <button onClick={cikisYap} style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid #2a2a4e",borderRadius:"8px",color:"#8b8fc8",fontSize:"13px",cursor:"pointer"}}>{m.cikisYap}</button>
        </div>
      </div>

      <div style={{flex:1,padding:"32px",overflow:"auto"}}>
        {mesaj&&(<div style={{background:mesaj.includes("Hata")?"#fff0f0":"#f0fff4",border:`1px solid ${mesaj.includes("Hata")?"#fcc":"#9f9"}`,borderRadius:"8px",padding:"10px 16px",marginBottom:"16px",fontSize:"13px",color:mesaj.includes("Hata")?"#c00":"#0a7a3a"}}>{mesaj}</div>)}
        {yukleniyor?(<div style={{textAlign:"center",padding:"64px",color:"#888"}}>Loading...</div>):(
          <>
            {aktifMenu==="ozet"&&(<div>
              <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.hosgeldin}, {kullanici?.ad}! 👋</h1>
              <p style={{fontSize:"14px",color:"#888",marginBottom:"28px"}}>{m.tedaviSureci}</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px",marginBottom:"32px"}}>
                {[{baslik:m.talepSayisi,deger:talepler.length,renk:"#534AB7"},{baslik:m.teklifSayisi,deger:teklifler.length,renk:"#0a7a3a"},{baslik:m.bekleyen,deger:talepler.filter((t:any)=>t.durum==="beklemede").length,renk:"#BA7517"}].map(k=>(<div key={k.baslik} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px"}}><div style={{fontSize:"32px",fontWeight:700,color:k.renk,marginBottom:"8px"}}>{k.deger}</div><div style={{fontSize:"13px",color:"#888"}}>{k.baslik}</div></div>))}
              </div>
              {talepler.length===0&&(<div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"48px",textAlign:"center"}}><div style={{fontSize:"48px",marginBottom:"16px"}}>🏥</div><h3 style={{fontSize:"18px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.teklifYok}</h3><p style={{fontSize:"13px",color:"#888",marginBottom:"20px"}}>{m.teklifYokAcik}</p><a href="/teklif" style={{background:"#534AB7",color:"#fff",padding:"12px 24px",borderRadius:"8px",fontSize:"14px",textDecoration:"none",fontWeight:600}}>{m.teklifOlustur}</a></div>)}
            </div>)}

            {aktifMenu==="talepler"&&(<div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px"}}><h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a"}}>{m.taleplerim}</h1><a href="/teklif" style={{background:"#534AB7",color:"#fff",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",textDecoration:"none"}}>{m.yeniTalepBtn}</a></div>
              {talepler.length===0?(<div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"48px",textAlign:"center"}}><div style={{fontSize:"13px",color:"#888"}}>{m.talepYok}</div></div>):(<div style={{display:"flex",flexDirection:"column",gap:"12px"}}>{talepler.map((t:any)=>{const d=durumBadge(t.durum,t.tedavi_tamamlandi);return(<div key={t.id} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div><div style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"4px"}}>{t.tedavi_turu}</div><div style={{fontSize:"13px",color:"#888",marginBottom:"8px"}}>{t.aciklama?.slice(0,80)}{t.aciklama?.length>80?"...":""}</div><div style={{fontSize:"12px",color:"#888"}}>{new Date(t.olusturma_tarihi).toLocaleDateString()}</div></div><span style={{fontSize:"11px",padding:"4px 12px",borderRadius:"20px",background:d.bg,color:d.color}}>{d.label}</span></div></div>);})}</div>)}
            </div>)}

            {aktifMenu==="teklifler"&&(<div>
              <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"24px"}}>{m.gelenTeklifler}</h1>
              {teklifler.length===0?(<div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"48px",textAlign:"center"}}><div style={{fontSize:"48px",marginBottom:"16px"}}>📋</div><div style={{fontSize:"13px",color:"#888"}}>{m.gelenYok}</div></div>):(<div style={{display:"flex",flexDirection:"column",gap:"12px"}}>{teklifler.map((t:any)=>{const d=durumBadge(t.durum,t.tedavi_tamamlandi);return(<div key={t.id} style={{background:"#fff",border:`2px solid ${t.tedavi_tamamlandi?"#059669":t.durum==="onaylandi"?"#0369a1":t.durum==="reddedildi"?"#fcc":"#EEEDFE"}`,borderRadius:"14px",padding:"18px",cursor:"pointer"}} onClick={()=>setAcikTeklif(t)} onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.005)")} onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"4px"}}>🏥 {t.profiles?.ad} {t.profiles?.soyad}</div>{t.profiles?.konum_adres&&<div style={{fontSize:"12px",color:"#94a3b8"}}>📍 {t.profiles.konum_adres}</div>}<div style={{fontSize:"12px",color:"#94a3b8",marginTop:"2px"}}>{new Date(t.olusturma_tarihi).toLocaleDateString()}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:"20px",fontWeight:700,color:"#534AB7",marginBottom:"4px"}}>{t.toplam_fiyat||t.fiyat} EUR</div><span style={{fontSize:"11px",padding:"3px 10px",borderRadius:"20px",fontWeight:600,background:d.bg,color:d.color}}>{d.label}</span></div></div>
              <div style={{fontSize:"12px",color:"#534AB7",marginTop:"8px",fontWeight:500}}>{m.detayGor}</div>
            </div>);})}</div>)}
            </div>)}

            {aktifMenu==="transferler"&&(<div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px"}}><h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a"}}>{m.transferlerim}</h1><button onClick={()=>setTransferModal({})} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>+ {m.transferTalebiBaslik}</button></div>
              {transferTalepleri.length===0?(<div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"48px",textAlign:"center"}}><div style={{fontSize:"48px",marginBottom:"16px"}}>🚗</div><div style={{fontSize:"13px",color:"#888"}}>{m.transferYok}</div></div>):(<div style={{display:"flex",flexDirection:"column",gap:"12px"}}>{transferTalepleri.map((tr:any)=>{const durumLabel=(m.transferDurumu as any)[tr.durum]||tr.durum;const durumRenk=tr.durum==="onaylandi"?"#059669":tr.durum==="teklif_verildi"?"#534AB7":"#BA7517";const durumBg=tr.durum==="onaylandi"?"#f0fff4":tr.durum==="teklif_verildi"?"#f0eeff":"#fff8e1";return(<div key={tr.id} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}><div><div style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"4px"}}>🚗 {tr.sehir} — {tr.havalimani||"—"}</div><div style={{fontSize:"12px",color:"#888"}}>📅 {tr.tedavi_baslangic}</div></div><span style={{fontSize:"11px",padding:"4px 12px",borderRadius:"20px",fontWeight:600,background:durumBg,color:durumRenk}}>{durumLabel}</span></div></div>);})}</div>)}
            </div>)}

            {/* ── MEDOQA DESTEK ── */}
            {aktifMenu==="destek"&&(<div>
              <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.destekBaslik}</h1>
              <p style={{fontSize:"14px",color:"#888",marginBottom:"24px"}}>{m.destekAcik}</p>

              {/* Yeni destek talebi formu */}
              <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"24px",marginBottom:"24px"}}>
                <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",marginBottom:"16px"}}>📨 Yeni Destek Talebi</h2>

                {destekBasarili && (<div style={{background:"#f0fff4",border:"1px solid #9f9",borderRadius:"8px",padding:"12px 16px",marginBottom:"16px",fontSize:"13px",color:"#0a7a3a",fontWeight:600}}>{m.destekGonderildi}</div>)}

                <div style={{marginBottom:"12px"}}>
                  <label style={{fontSize:"12px",color:"#888",display:"block",marginBottom:"6px"}}>{m.destekKonu}</label>
                  <select value={destekKonu} onChange={e=>setDestekKonu(e.target.value)} style={{...inputStyle,background:"#fff"}}>
                    {Object.entries(m.destekKonular).map(([k,v])=>(<option key={k} value={k}>{v as string}</option>))}
                  </select>
                </div>

                <div style={{marginBottom:"16px"}}>
                  <label style={{fontSize:"12px",color:"#888",display:"block",marginBottom:"6px"}}>{m.destekMesaj} *</label>
                  <textarea rows={5} placeholder={m.destekMesajPlaceholder} value={destekMesajText} onChange={e=>setDestekMesajText(e.target.value)} style={{...inputStyle,resize:"none"}}/>
                </div>

                <button onClick={destekGonder} disabled={destekYukleniyor||!destekMesajText.trim()} style={{width:"100%",background:"#534AB7",color:"#fff",border:"none",padding:"13px",borderRadius:"10px",fontSize:"14px",cursor:"pointer",fontWeight:700,opacity:(destekYukleniyor||!destekMesajText.trim())?0.6:1}}>
                  {destekYukleniyor?"⏳ Gönderiliyor...":m.destekGonder}
                </button>
              </div>

              {/* Geçmiş destek talepleri */}
              <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",marginBottom:"16px"}}>{m.destekTaleplerim}</h2>
              {destekTalepleri.length===0?(
                <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"32px",textAlign:"center",color:"#888",fontSize:"13px"}}>{m.destekYok}</div>
              ):(
                <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                  {destekTalepleri.map((d:any)=>{
                    const durumLabel = (m.destekDurum as any)[d.durum]||d.durum;
                    const durumBg = d.durum==="yanitlandi"?"#f0fff4":d.durum==="kapandi"?"#f0f0f0":"#fff8e1";
                    const durumRenk = d.durum==="yanitlandi"?"#059669":d.durum==="kapandi"?"#888":"#BA7517";
                    return(
                      <div key={d.id} style={{background:"#fff",border:`1px solid ${d.durum==="yanitlandi"?"#059669":"#EEEDFE"}`,borderRadius:"12px",padding:"20px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px"}}>
                          <div>
                            <div style={{fontSize:"13px",fontWeight:600,color:"#12103a"}}>{(m.destekKonular as any)[d.konu]||d.konu}</div>
                            <div style={{fontSize:"11px",color:"#888",marginTop:"2px"}}>{new Date(d.olusturma_tarihi).toLocaleDateString()}</div>
                          </div>
                          <span style={{fontSize:"11px",padding:"3px 10px",borderRadius:"20px",fontWeight:600,background:durumBg,color:durumRenk}}>{durumLabel}</span>
                        </div>
                        <p style={{fontSize:"13px",color:"#444",lineHeight:1.6,margin:"0 0 10px",background:"#f9fafb",padding:"10px 12px",borderRadius:"8px"}}>{d.mesaj}</p>
                        {d.admin_yanit && (
                          <div style={{background:"#f0eeff",borderRadius:"8px",padding:"12px",borderLeft:"3px solid #534AB7"}}>
                            <div style={{fontSize:"11px",fontWeight:600,color:"#534AB7",marginBottom:"4px"}}>🎯 {m.destekYanitBaslik}</div>
                            <p style={{fontSize:"12px",color:"#555",lineHeight:1.6,margin:0}}>{d.admin_yanit}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>)}

            {aktifMenu==="profil"&&(<div>
              <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"24px"}}>{m.profilim}</h1>
              <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"28px",maxWidth:"500px"}}>
                {[{etiket:m.ad,deger:kullanici?.ad},{etiket:m.soyad,deger:kullanici?.soyad},{etiket:m.eposta,deger:kullanici?.email},{etiket:m.hesapTuru,deger:kullanici?.hesap_turu}].map(item=>(<div key={item.etiket} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #f5f5f5"}}><span style={{fontSize:"13px",color:"#888"}}>{item.etiket}</span><span style={{fontSize:"13px",fontWeight:600,color:"#12103a"}}>{item.deger}</span></div>))}
              </div>
            </div>)}

            {aktifMenu==="mesajlar"&&(<div>
              <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.mesajlar}</h1>
              <p style={{fontSize:"14px",color:"#888",marginBottom:"24px"}}>{m.mesajlarAcik}</p>
              <a href="/mesajlar" style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#534AB7",color:"#fff",padding:"12px 24px",borderRadius:"10px",fontSize:"14px",textDecoration:"none",fontWeight:600}}>{m.mesajlarGit}</a>
            </div>)}
          </>
        )}
      </div>
    </main>
  );
}
