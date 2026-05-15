"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import DisSemasi from "../components/DisSemasi";
import { useDil } from "../locales/context";

const M = {
  tr: {
    panel:"Klinik Paneli",
    menu:{ozet:"🏠 Genel Özet",profil:"✏️ Profil Düzenle",hizmetler:"💉 Hizmet & Fiyatlar",doktorlar:"👨‍⚕️ Doktorlar",onceSonra:"📸 Önce/Sonra",talepler:"📋 Teklif Talepleri",tekliflerim:"📤 Gönderilen Teklifler",belgeler:"📄 Belgelerim",mesajlar:"💬 Mesajlar"},
    cikis:"Çıkış Yap",onaylandi:"✓ Onaylandı",onayBekliyor:"⏳ Onay Bekleniyor",
    hosgeldin:"Hoş Geldiniz",panelAcik:"Klinik panelinizden profilinizi ve hizmetlerinizi yönetebilirsiniz.",
    onayBekle:"Hesabınız Onay Bekliyor",onayBekleAcik:"Klinik hesabınız admin tarafından henüz onaylanmamış.",
    istatistikler:{hizmet:"Hizmet",doktor:"Doktor",onceSonra:"Önce/Sonra",teklif:"Teklif"},
    profilDuzenle:"Profil Düzenle",hizmetEkle:"Hizmet Ekle",doktorEkle:"Doktor Ekle",teklifTalepleri:"Teklif Talepleri",
    kapakFoto:"Kapak Fotoğrafı",klinikBilgileri:"Klinik Bilgileri",tanitimYazisi:"Tanıtım Yazısı",tanitimPlaceholder:"Kliniğiniz hakkında kısa bir tanıtım yazısı...",
    telefon:"Telefon",website:"Website",adres:"Adres",googleMaps:"Google Maps URL",sosyalMedya:"Sosyal Medya",kaydet:"Profili Kaydet",
    hizmetListesi:"Hizmet & Fiyat Listesi",yeniHizmet:"Yeni Hizmet Ekle",kategori:"Kategori",altKategori:"Alt Kategori",
    listeden:"Listeden Seç",ozelAd:"Özel Hizmet Adı",ozelAdPlaceholder:"Listede yoksa buraya yazın",
    fiyat:"Fiyat",paraBirimi:"Para Birimi",sure:"Süre",aciklama:"Açıklama",disSemasi:"Diş Şeması",
    hizmetEkleBtn:"+ Hizmet Ekle",mevcutHizmetler:"Hizmet Listem",
    hizmetSutun:{ad:"Hizmet",kat:"Kategori",dis:"Diş Şeması",fiyat:"Fiyat",islem:"İşlem"},
    pasife:"Pasife Al",aktife:"Aktife Al",sil:"Sil",hizmetYok:"Henüz hizmet eklenmemiş.",
    doktorlarBaslik:"Doktorlar",doktorEkleBaslik:"Doktor Ekle",doktorAd:"Ad Soyad",uzmanlik:"Uzmanlık",doktorFoto:"Fotoğraf",doktorEkleBtn:"+ Doktor Ekle",doktorYok:"Henüz doktor eklenmemiş.",
    onceSonraBaslik:"Önce / Sonra Fotoğrafları",yeniEkle:"Yeni Ekle",hizmetAdi:"Hizmet Adı",hizmetAdPlaceholder:"Zirkonyum Kaplama, Saç Ekimi...",
    onceFoto:"Önce Fotoğrafı",sonraFoto:"Sonra Fotoğrafı",ekleBtn:"+ Ekle",onceSonraYok:"Henüz önce/sonra eklenmemiş.",
    disPlani:"🦷 Diş Şeması ile Tedavi Planı",tedaviListesi:"Tedavi Listesi",islem:"işlem",
    tedaviFiyati:"Tedavi Fiyatı (EUR)",aciklamaPlaceholder:"Ek açıklama...",
    otelDahil:"🏨 Otel Dahil",otelAdi:"Otel adı / açıklama",otelFiyat:"Fiyat (EUR)",
    transferDahil:"🚗 Transfer Dahil",transferAciklama:"Havalimanı-otel vb.",transferFiyat:"Fiyat (EUR)",
    toplam:"Toplam",teklifGonder:"✅ Teklif Gönder",teklifAc:"Teklif Ver →",kapat:"Kapat ↑",
    teklifYok:"Henüz teklif talebi yok",hasta:"Hasta",
    gonderilen:"Gönderilen Teklifler",teklifYokGon:"Henüz teklif gönderilmedi",
    yazdir:"🖨️ Yazdır",mesajlas:"💬 Hasta ile Mesajlaş",
    onaylandiLabel:"✅ Onaylandı",reddedildiLabel:"❌ Reddedildi",beklemede:"⏳ Beklemede",
    belgelerBaslik:"📄 Belgelerim",belgeAcik:"Onay sürecinde incelenecek belgelerinizi yükleyin.",
    zorunlu:"Zorunlu",guncelle:"Güncelle",yukle:"Yükle",goruntule:"📎 Görüntüle",
    belgeYukleniyor:"⏳ Belge yükleniyor...",belgeTamamlandi:"✅ Tüm belgeler yüklendi! Admin onayı bekleniyor.",
    mesajlarBaslik:"💬 Mesajlar",mesajlarAcik:"Hastalarla mesajlaşmak için mesajlar sayfasını kullanın.",mesajlarGit:"💬 Mesajlar Sayfasına Git →",
    yukleniyor:"Yükleniyor...",
    profilKaydedildi:"✅ Profil kaydedildi!",kapakYuklendi:"✅ Kapak fotoğrafı yüklendi!",
    hizmetEklendi:"✅ Hizmet eklendi!",doktorEklendi:"✅ Doktor eklendi!",onceSonraEklendi:"✅ Önce/Sonra eklendi!",teklifGonderildi:"✅ Teklif gönderildi!",
    hizmetAdZorunlu:"Hata: Hizmet adı ve fiyat zorunludur!",doktorAdZorunlu:"Hata: Doktor adı zorunludur!",
    fotoZorunlu:"Hata: Önce ve sonra fotoğrafları zorunludur!",fiyatZorunlu:"Hata: Fiyat girilmelidir!",
    silOnay:"Silmek istediğinize emin misiniz?",disHizmetYok:"⚠️ Bu kategori için hizmet yok",
  },
  en: {
    panel:"Clinic Panel",
    menu:{ozet:"🏠 Overview",profil:"✏️ Edit Profile",hizmetler:"💉 Services & Prices",doktorlar:"👨‍⚕️ Doctors",onceSonra:"📸 Before/After",talepler:"📋 Quote Requests",tekliflerim:"📤 Sent Offers",belgeler:"📄 My Documents",mesajlar:"💬 Messages"},
    cikis:"Sign Out",onaylandi:"✓ Approved",onayBekliyor:"⏳ Awaiting Approval",
    hosgeldin:"Welcome",panelAcik:"Manage your profile and services from the clinic panel.",
    onayBekle:"Account Awaiting Approval",onayBekleAcik:"Your clinic account has not been approved by the admin yet.",
    istatistikler:{hizmet:"Services",doktor:"Doctors",onceSonra:"Before/After",teklif:"Offers"},
    profilDuzenle:"Edit Profile",hizmetEkle:"Add Service",doktorEkle:"Add Doctor",teklifTalepleri:"Quote Requests",
    kapakFoto:"Cover Photo",klinikBilgileri:"Clinic Information",tanitimYazisi:"Introduction",tanitimPlaceholder:"A short introduction about your clinic...",
    telefon:"Phone",website:"Website",adres:"Address",googleMaps:"Google Maps URL",sosyalMedya:"Social Media",kaydet:"Save Profile",
    hizmetListesi:"Service & Price List",yeniHizmet:"Add New Service",kategori:"Category",altKategori:"Sub-category",
    listeden:"Select from list",ozelAd:"Custom Service Name",ozelAdPlaceholder:"Write here if not in the list",
    fiyat:"Price",paraBirimi:"Currency",sure:"Duration",aciklama:"Description",disSemasi:"Dental Chart",
    hizmetEkleBtn:"+ Add Service",mevcutHizmetler:"My Service List",
    hizmetSutun:{ad:"Service",kat:"Category",dis:"Dental Chart",fiyat:"Price",islem:"Action"},
    pasife:"Deactivate",aktife:"Activate",sil:"Delete",hizmetYok:"No services added yet.",
    doktorlarBaslik:"Doctors",doktorEkleBaslik:"Add Doctor",doktorAd:"Full Name",uzmanlik:"Specialization",doktorFoto:"Photo",doktorEkleBtn:"+ Add Doctor",doktorYok:"No doctors added yet.",
    onceSonraBaslik:"Before / After Photos",yeniEkle:"Add New",hizmetAdi:"Service Name",hizmetAdPlaceholder:"Zirconia Crown, Hair Transplant...",
    onceFoto:"Before Photo",sonraFoto:"After Photo",ekleBtn:"+ Add",onceSonraYok:"No before/after added yet.",
    disPlani:"🦷 Treatment Plan — Dental Chart",tedaviListesi:"Treatment List",islem:"procedures",
    tedaviFiyati:"Treatment Price (EUR)",aciklamaPlaceholder:"Additional notes...",
    otelDahil:"🏨 Hotel Included",otelAdi:"Hotel name / description",otelFiyat:"Price (EUR)",
    transferDahil:"🚗 Transfer Included",transferAciklama:"Airport-hotel etc.",transferFiyat:"Price (EUR)",
    toplam:"Total",teklifGonder:"✅ Send Offer",teklifAc:"Make Offer →",kapat:"Close ↑",
    teklifYok:"No quote requests yet",hasta:"Patient",
    gonderilen:"Sent Offers",teklifYokGon:"No offers sent yet",
    yazdir:"🖨️ Print",mesajlas:"💬 Message Patient",
    onaylandiLabel:"✅ Approved",reddedildiLabel:"❌ Rejected",beklemede:"⏳ Pending",
    belgelerBaslik:"📄 My Documents",belgeAcik:"Upload your documents for the approval process.",
    zorunlu:"Required",guncelle:"Update",yukle:"Upload",goruntule:"📎 View",
    belgeYukleniyor:"⏳ Uploading...",belgeTamamlandi:"✅ All documents uploaded! Awaiting admin approval.",
    mesajlarBaslik:"💬 Messages",mesajlarAcik:"Use the messages page to communicate with patients.",mesajlarGit:"💬 Go to Messages →",
    yukleniyor:"Loading...",
    profilKaydedildi:"✅ Profile saved!",kapakYuklendi:"✅ Cover photo uploaded!",
    hizmetEklendi:"✅ Service added!",doktorEklendi:"✅ Doctor added!",onceSonraEklendi:"✅ Before/After added!",teklifGonderildi:"✅ Offer sent!",
    hizmetAdZorunlu:"Error: Service name and price are required!",doktorAdZorunlu:"Error: Doctor name is required!",
    fotoZorunlu:"Error: Before and after photos are required!",fiyatZorunlu:"Error: Price is required!",
    silOnay:"Are you sure you want to delete?",disHizmetYok:"⚠️ No service for this category",
  },
  de: {
    panel:"Klinikbereich",
    menu:{ozet:"🏠 Übersicht",profil:"✏️ Profil bearbeiten",hizmetler:"💉 Leistungen",doktorlar:"👨‍⚕️ Ärzte",onceSonra:"📸 Vorher/Nachher",talepler:"📋 Anfragen",tekliflerim:"📤 Angebote",belgeler:"📄 Dokumente",mesajlar:"💬 Nachrichten"},
    cikis:"Abmelden",onaylandi:"✓ Genehmigt",onayBekliyor:"⏳ Ausstehend",
    hosgeldin:"Willkommen",panelAcik:"Verwalten Sie Ihr Profil und Ihre Leistungen.",
    onayBekle:"Genehmigung ausstehend",onayBekleAcik:"Ihr Kliniккonto wurde noch nicht genehmigt.",
    istatistikler:{hizmet:"Leistungen",doktor:"Ärzte",onceSonra:"Vorher/Nachher",teklif:"Angebote"},
    profilDuzenle:"Profil bearbeiten",hizmetEkle:"Leistung hinzufügen",doktorEkle:"Arzt hinzufügen",teklifTalepleri:"Angebotsanfragen",
    kapakFoto:"Titelbild",klinikBilgileri:"Klinikinformationen",tanitimYazisi:"Vorstellung",tanitimPlaceholder:"Eine kurze Vorstellung Ihrer Klinik...",
    telefon:"Telefon",website:"Website",adres:"Adresse",googleMaps:"Google Maps URL",sosyalMedya:"Soziale Medien",kaydet:"Profil speichern",
    hizmetListesi:"Leistungsliste",yeniHizmet:"Neue Leistung hinzufügen",kategori:"Kategorie",altKategori:"Unterkategorie",
    listeden:"Aus Liste auswählen",ozelAd:"Benutzerdefinierter Name",ozelAdPlaceholder:"Hier eingeben wenn nicht in der Liste",
    fiyat:"Preis",paraBirimi:"Währung",sure:"Dauer",aciklama:"Beschreibung",disSemasi:"Zahnschema",
    hizmetEkleBtn:"+ Leistung hinzufügen",mevcutHizmetler:"Meine Leistungsliste",
    hizmetSutun:{ad:"Leistung",kat:"Kategorie",dis:"Zahnschema",fiyat:"Preis",islem:"Aktion"},
    pasife:"Deaktivieren",aktife:"Aktivieren",sil:"Löschen",hizmetYok:"Noch keine Leistungen.",
    doktorlarBaslik:"Ärzte",doktorEkleBaslik:"Arzt hinzufügen",doktorAd:"Vollständiger Name",uzmanlik:"Fachgebiet",doktorFoto:"Foto",doktorEkleBtn:"+ Arzt hinzufügen",doktorYok:"Noch keine Ärzte.",
    onceSonraBaslik:"Vorher / Nachher Fotos",yeniEkle:"Neu hinzufügen",hizmetAdi:"Leistungsname",hizmetAdPlaceholder:"Zirkonkrone, Haartransplantation...",
    onceFoto:"Vorher-Foto",sonraFoto:"Nachher-Foto",ekleBtn:"+ Hinzufügen",onceSonraYok:"Noch keine Vorher/Nachher.",
    disPlani:"🦷 Behandlungsplan — Zahnschema",tedaviListesi:"Behandlungsliste",islem:"Eingriffe",
    tedaviFiyati:"Behandlungspreis (EUR)",aciklamaPlaceholder:"Zusätzliche Hinweise...",
    otelDahil:"🏨 Hotel inklusive",otelAdi:"Hotelname / Beschreibung",otelFiyat:"Preis (EUR)",
    transferDahil:"🚗 Transfer inklusive",transferAciklama:"Flughafen-Hotel usw.",transferFiyat:"Preis (EUR)",
    toplam:"Gesamt",teklifGonder:"✅ Angebot senden",teklifAc:"Angebot machen →",kapat:"Schließen ↑",
    teklifYok:"Noch keine Angebotsanfragen",hasta:"Patient",
    gonderilen:"Gesendete Angebote",teklifYokGon:"Noch keine Angebote gesendet",
    yazdir:"🖨️ Drucken",mesajlas:"💬 Patient kontaktieren",
    onaylandiLabel:"✅ Genehmigt",reddedildiLabel:"❌ Abgelehnt",beklemede:"⏳ Ausstehend",
    belgelerBaslik:"📄 Meine Dokumente",belgeAcik:"Laden Sie Ihre Dokumente für den Genehmigungsprozess hoch.",
    zorunlu:"Erforderlich",guncelle:"Aktualisieren",yukle:"Hochladen",goruntule:"📎 Anzeigen",
    belgeYukleniyor:"⏳ Wird hochgeladen...",belgeTamamlandi:"✅ Alle Dokumente hochgeladen! Warte auf Admin-Genehmigung.",
    mesajlarBaslik:"💬 Nachrichten",mesajlarAcik:"Nutzen Sie die Nachrichtenseite, um mit Patienten zu kommunizieren.",mesajlarGit:"💬 Zur Nachrichtenseite →",
    yukleniyor:"Wird geladen...",
    profilKaydedildi:"✅ Profil gespeichert!",kapakYuklendi:"✅ Titelbild hochgeladen!",
    hizmetEklendi:"✅ Leistung hinzugefügt!",doktorEklendi:"✅ Arzt hinzugefügt!",onceSonraEklendi:"✅ Vorher/Nachher hinzugefügt!",teklifGonderildi:"✅ Angebot gesendet!",
    hizmetAdZorunlu:"Fehler: Name und Preis erforderlich!",doktorAdZorunlu:"Fehler: Arztname erforderlich!",
    fotoZorunlu:"Fehler: Fotos erforderlich!",fiyatZorunlu:"Fehler: Preis erforderlich!",
    silOnay:"Möchten Sie wirklich löschen?",disHizmetYok:"⚠️ Kein Dienst für diese Kategorie",
  },
};


// ─── TDB Hizmet Listesi ───────────────────────────────────────────────────────
const TDB_LISTE: Record<string, Record<string, string[]>> = {
  "Teşhis ve Tedavi Planlaması": {
    "Muayene ve Teşhis": [
      "Dişhekimi Muayenesi","Uzman Dişhekimi Muayenesi","Kontrol Hekim Muayenesi",
      "Konsültasyon","Uzman Dişhekimi Konsültasyonu","Hipnoz (Seans Başına)",
      "Akupunktur Uygulama (Seans Başına)","Teşhis ve Tedavi Planlaması",
      "Oral Hijyen Eğitimi","Tükürük Akış Hızı ve Tamponlama Kapasitesi Tayini",
      "Tükürükte Mikrobiyolojik Analiz","Gnatoloji T.M.E. Kas Muayenesi",
      "Vitalite Kontrolu (Diş Başına)","Raporlama","Ağız İçi Dijital Tarama",
    ],
    "Radyoloji": [
      "Diş Röntgen Filmi (Periapikal)","Oklüzal Film","Bite-Wing Radyografi",
      "Ekstra Oral Röntgen Filmi","Panaromik Film","Lateral Sefalometrik Film",
      "Antero-Posterior Sefalometrik Film","İntra Oral Dijital Radyografi",
      "El Bilek Filmi","Siyalografi","Tomografi (Bölgesel)","Tomografi (Tek Çene)",
      "Tomografi (İki Çene)","Eklem Tomografisi (Çift Taraflı)",
      "Bilgisayarlı Büyük T.M.E. Fonksiyon Testi","Bilgisayarlı Kas Tonus Analizi",
      "T.M.E. Filmi ve Tetkiki",
    ],
    "Anestezi": [
      "Lokal Anestezi (İnfiltratif)","Lokal Anestezi (Rejyonal)",
    ],
  },
  "Tedavi ve Endodonti": {
    "Dolgu": [
      "Amalgam Dolgu (Bir Yüzlü)","Amalgam Dolgu (İki Yüzlü)","Amalgam Dolgu (Üç Yüzlü)",
      "Kompozit Dolgu (Bir Yüzlü)","Kompozit Dolgu (İki Yüzlü)","Kompozit Dolgu (Üç Yüzlü)",
      "Direkt Kompozit Laminate Restorasyonu","Black V Kole Dolgusu (Kompozit)",
      "Cam İonomer Dolgu","Black V Kole Dolgusu (Cam İonomer)",
      "İnley Dolgu (Bir Yüzlü)","İnley Dolgu (İki Yüzlü)","İnley Dolgu (Üç Yüzlü)",
      "Kompozit İnley Dolgu (Bir Yüzlü)","Kompozit İnley Dolgu (İki Yüzlü)","Kompozit İnley Dolgu (Üç Yüzlü)",
      "Seramik İnley Dolgu (Bir Yüzlü)","Seramik İnley Dolgu (İki Yüzlü)","Seramik İnley Dolgu (Üç Yüzlü)",
      "Onley","Onley (Seramik)","Pinley","Dolgu (Restorasyon) Tamiri",
      "Dolgu Sökümü (Tek Diş)","Kuafaj","Endokron","Dentin Pini Uygulaması",
    ],
    "Kanal Tedavisi": [
      "Ekstirpasyon (Her Kanal İçin)",
      "Kanal Tedavisi - Tek Kanal","Kanal Tedavisi - İki Kanal","Kanal Tedavisi - Üç Kanal",
      "Kanal Tedavisi - İlave Her Kanal İçin",
      "Periapikal Lezyonlu Dişte Kanal Tedavisi - Tek Kanal",
      "Periapikal Lezyonlu Dişte Kanal Tedavisi - İki Kanal",
      "Periapikal Lezyonlu Dişte Kanal Tedavisi - Üç Kanal",
      "Kanal Dolgusu Sökümü","Kanal Dolgusu Tekrarı (Retreatment)",
      "Kanal Pansumanı (Seans Başı)",
      "Kanal İçi Hazır Post Uygulaması (Metal)","Kanal İçi Fiber Post Uygulaması",
      "Kanaldan Kırılmış Materyal Çıkartılması","Kanalda Perforasyon Tamiri (MTA)",
    ],
    "Diş Beyazlatma ve Diğer": [
      "Diş Ağartma (Beyazlatma Vital)","Diş Ağartma (Beyazlatma Devital)",
      "Diş Ağartma (Beyazlatma - Tek Çene)","Hassasiyet Tedavisi (Tek Diş)",
      "Hassasiyet Tedavisi (Tam Çene)","Rubber-Dam Uygulaması",
    ],
  },
  "Protez": {
    "Hareketli Protez": [
      "Tam Protez (Akrilik - Tek Çene)","Bölümlü Protez (Akrilik - Tek Çene)",
      "Tam Protez (Döküm Metal ile Güçlendirilmiş - Tek Çene)",
      "Bölümlü Protez (Döküm Metal ile Güçlendirilmiş - Tek Çene)",
      "Hassas Tutuculu Protezler (Tek Çene)","İmplant Destekli Hareketli Protezler (Tek Çene)",
      "Geçici (İmmediat) Protez (Akrilik - Tek Çene)","Besleme (Tek Çene)",
      "Kaide Yenileme (Rebazaj - Tek Çene)","Proteze Yumuşak Akrilik Uygulaması (Geçici)",
      "Proteze Yumuşak Akrilik Uygulaması (Daimi)","Tamir (Akrilik Protezler)",
      "Kroşe İlavesi","Metal İskelet Tamiri","Diş İlavesi (Tek Diş)",
      "Diş Üstü Protezi (Overdenture - Tek Çene)",
    ],
    "Sabit Protez / Kuron": [
      "Tek Parça Döküm Kuron","Veneer Kuron (Akrilik)","Veneer Kuron (Seramik)",
      "İmplant Üstü Veneer Kuron (Seramik)","Laminate Veneer Kompozit",
      "Laminate Veneer (Akrilik)","Laminate Veneer (Seramik)",
      "Jaket Kuron (Akrilik)","Jaket Kuron (Kompozit)",
      "Tam Seramik Kuron (Metal Desteksiz)","Teleskop Kuron (Koping)",
      "Zirkonyum Kron","Adeziv Köprü (Maryland)","Roach Köprü",
      "Geçici Kuron (Tek Diş)","Kuron Sökümü","Düşmüş Kuron ve Köprü Simantasyonu",
      "Kuron Köprü Tamiri","Döküm Post Core (Pivo)",
    ],
    "Gece Plağı / Splint": [
      "Gece Plağı (Yumuşak)","Gece Plağı (Sert Oklüzal Splintleme)",
      "T.M.E. Stabilizasyon Splinti","Oklüzal Aşındırmalar","Oklüzyon Düzeltilmesi",
    ],
    "İmplant Rehberi": [
      "İmplant Rehberi (Yarım Çene)","İmplant Rehberi (Tam Çene)",
    ],
  },
  "Ağız-Diş ve Çene Cerrahisi": {
    "Çekim": [
      "Diş Çekimi","Komplikasyonlu Diş Çekimi",
      "Gömülü Diş Operasyonu","Gömülü Diş Operasyonu (Kemik Retansiyonlu)",
      "Koronektomi","Reimplantasyon","Ototransplantasyon",
    ],
    "İmplant Cerrahisi": [
      "Kemik İçi İmplant","Zigoma İmplant","İmplant Çıkartılması",
      "Kapişon İzalesi - İmplant Üstü Açılması",
      "Ankraj Amaçlı Plak Yerleştirme","Ankraj Amaçlı Plak Çıkarma",
    ],
    "Kök Ucu ve Kist": [
      "Tek Kökte Kök Ucu Rezeksiyonu","İki Kökte Kök Ucu Rezeksiyonu",
      "Üç Kökte Kök Ucu Rezeksiyonu",
      "Kist Operasyonu (Küçük)","Kist Operasyonu (1 Cm Büyük)",
      "Odontogenik Tümör Operasyonu (Küçük)","Odontogenik Tümör Operasyonu (Büyük)",
    ],
    "Greft ve Sinüs": [
      "Sert Doku Greftleme","Yumuşak Doku Greftleme","Sinüs Lifting","Sinüs Plastiği",
      "Alveol Plastiği (Yarım Çene)","Alveol Düzeltilmesi (Yarım Çene)",
      "Vestibüloplasti (Yarım Çene)",
    ],
    "Diğer Cerrahi": [
      "Alveolit Cerrahi Tedavisi","Kanama Müdahalesi (Basit)","Kanama Müdahalesi (Dikişli)",
      "Epulis Operasyonu","Osteomyelitis Operasyonu","Çene Lüksasyonu",
      "Biyopsi","Fibrom Operasyonu","Apse Drenajı (Extraoral)","Apse Drenajı (İntraoral)",
      "Stomatit Tedavisi","Fizik Tedavi (İnfraruj)","Çene Kırığı (Basit)","Çene Kırığı (Komplike)",
      "Torus Operasyonu","Nevralji Tedavisi (Alkol Enjeksiyonu)","Nevralji Tedavisi Cerrahi",
      "Tükürük Bezi Kanalından Taş Çıkarma (Basit)","Tükürük Bezi Kanalından Taş Çıkarma (Komplike)",
      "T.M.E. Mekonoterapi","T.M.E. İçi Enjeksiyon","Artrosentez","Açık Eklem Cerrahisi",
      "Genioplasti","Segmental Osteotomi","Osteotomi (Tek Çene)",
      "Dişhekimliğinde Botulinum Toksin Uygulaması",
      "Ortodontik Tedavi Amaçlı Gömük Dişlerin Üzerinin Açılması",
    ],
  },
  "Periodontoloji": {
    "Temizlik ve Küretaj": [
      "Detartraj (Diş Taşı Temizliği - Tek Çene)","Subgingival Küretaj (Tek Diş)",
      "Subgingival İlaç Uygulaması",
    ],
    "Periodontal Cerrahi": [
      "Gingivoplasti (Tek Diş)","Gingivektomi (Tek Diş)",
      "Flap Operasyonu (Tek Diş)","Tunnel Operasyonu (Tek Diş)",
      "Hemiseksiyon (Kök Amputasyonu)","Serbest Diş Eti Grefti (Tek Diş)",
      "Saplı Yumuşak Doku Grefti (Tek Diş)","Subepitelyal Bağ Dokusu Grefti",
      "Frenektomi - Frenetomi","Fiberotomi",
      "Biyomateryal Uygulaması (Tek Diş)","Membran Uygulaması (Tek Diş)",
      "Papil Oluşturma (Cerrahi)","Papil Oluşturma (Cerrahi Olmayan)",
      "Peri-İmplantitis (Cerrahi)","Peri-İmplantitis (Cerrahi Olmayan)",
    ],
    "Splint": [
      "Periodontal Splint (Daimi)","Periodontal Splint (Geçici)",
      "Periodontal Şine (Splint - Geçici - Yarım Çene)",
      "Vestibül Plak (Diş Eti Protezi)",
    ],
  },
  "Pedodonti": { "Genel": [] },
  "Ortodonti": { "Genel": [] },
  "Saç Ekimi": {
    "FUE": ["FUE Saç Ekimi","Safir FUE","DHI Saç Ekimi","Sakal Ekimi","Kaş Ekimi"],
    "Destek": ["PRP Tedavisi","Mezoterapi","Lazer Terapi"],
  },
  "Göz Ameliyatı": {
    "Lazer": ["Lasik","Lasek","PRK","Smile Pro"],
    "Lens": ["Göz İçi Lens (ICL)","Katarakt Ameliyatı","Multifokal Lens"],
  },
  "Plastik Cerrahi": {
    "Yüz": ["Burun Estetiği","Kulak Estetiği","Yüz Germe","Göz Kapağı Estetiği"],
    "Vücut": ["Meme Büyütme","Meme Küçültme","Karın Germe","Liposuction"],
    "Non-Cerrahi": ["Botoks","Dolgu (Filler)","PRP Yüz"],
  },
  "Genel Sağlık": {
    "Check-Up": ["Temel Check-Up","Kapsamlı Check-Up","Kardiyoloji Check-Up"],
    "Ortopedi": ["Diz Protezi","Kalça Protezi","Omurga Cerrahisi"],
  },
};

// Diş şeması kategorisi eşleştirmesi: hizmet_adi → dis_semasi_kategori
const DIS_SEMASI_MAP: Record<string,string> = {
  // Dolgu
  "Amalgam Dolgu (Bir Yüzlü)":"dolgu","Amalgam Dolgu (İki Yüzlü)":"dolgu","Amalgam Dolgu (Üç Yüzlü)":"dolgu",
  "Kompozit Dolgu (Bir Yüzlü)":"dolgu","Kompozit Dolgu (İki Yüzlü)":"dolgu","Kompozit Dolgu (Üç Yüzlü)":"dolgu",
  "Direkt Kompozit Laminate Restorasyonu":"dolgu","Black V Kole Dolgusu (Kompozit)":"dolgu",
  "Cam İonomer Dolgu":"dolgu","Black V Kole Dolgusu (Cam İonomer)":"dolgu",
  "İnley Dolgu (Bir Yüzlü)":"dolgu","İnley Dolgu (İki Yüzlü)":"dolgu","İnley Dolgu (Üç Yüzlü)":"dolgu",
  "Kompozit İnley Dolgu (Bir Yüzlü)":"dolgu","Kompozit İnley Dolgu (İki Yüzlü)":"dolgu","Kompozit İnley Dolgu (Üç Yüzlü)":"dolgu",
  "Seramik İnley Dolgu (Bir Yüzlü)":"dolgu","Seramik İnley Dolgu (İki Yüzlü)":"dolgu","Seramik İnley Dolgu (Üç Yüzlü)":"dolgu",
  "Onley":"dolgu","Onley (Seramik)":"dolgu","Endokron":"dolgu","Dentin Pini Uygulaması":"dolgu",
  // Kanal
  "Ekstirpasyon (Her Kanal İçin)":"kanal",
  "Kanal Tedavisi - Tek Kanal":"kanal","Kanal Tedavisi - İki Kanal":"kanal","Kanal Tedavisi - Üç Kanal":"kanal",
  "Kanal Tedavisi - İlave Her Kanal İçin":"kanal",
  "Periapikal Lezyonlu Dişte Kanal Tedavisi - Tek Kanal":"kanal",
  "Periapikal Lezyonlu Dişte Kanal Tedavisi - İki Kanal":"kanal",
  "Periapikal Lezyonlu Dişte Kanal Tedavisi - Üç Kanal":"kanal",
  "Kanal Dolgusu Sökümü":"kanal","Kanal Dolgusu Tekrarı (Retreatment)":"kanal",
  "Kanal İçi Hazır Post Uygulaması (Metal)":"kanal","Kanal İçi Fiber Post Uygulaması":"kanal",
  "Kanaldan Kırılmış Materyal Çıkartılması":"kanal","Kanalda Perforasyon Tamiri (MTA)":"kanal",
  "Subgingival Küretaj (Tek Diş)":"kanal",
  // Kaplama
  "Veneer Kuron (Akrilik)":"kaplama","Veneer Kuron (Seramik)":"kaplama",
  "İmplant Üstü Veneer Kuron (Seramik)":"kaplama",
  "Laminate Veneer Kompozit":"kaplama","Laminate Veneer (Akrilik)":"kaplama","Laminate Veneer (Seramik)":"kaplama",
  "Jaket Kuron (Akrilik)":"kaplama","Jaket Kuron (Kompozit)":"kaplama",
  "Tam Seramik Kuron (Metal Desteksiz)":"kaplama","Teleskop Kuron (Koping)":"kaplama",
  "Zirkonyum Kron":"kaplama","Tek Parça Döküm Kuron":"kaplama",
  "Diş Ağartma (Beyazlatma Vital)":"kaplama","Diş Ağartma (Beyazlatma Devital)":"kaplama",
  "Diş Ağartma (Beyazlatma - Tek Çene)":"kaplama",
  // Çekim
  "Diş Çekimi":"cekim","Komplikasyonlu Diş Çekimi":"cekim",
  "Gömülü Diş Operasyonu":"cekim","Gömülü Diş Operasyonu (Kemik Retansiyonlu)":"cekim",
  "Koronektomi":"cekim",
  // İmplant
  "Kemik İçi İmplant":"implant","Zigoma İmplant":"implant",
  // Köprü
  "Adeziv Köprü (Maryland)":"kopru","Roach Köprü":"kopru",
  // Lezyon
  "Kist Operasyonu (Küçük)":"lezyon","Kist Operasyonu (1 Cm Büyük)":"lezyon",
  "Tek Kökte Kök Ucu Rezeksiyonu":"lezyon","İki Kökte Kök Ucu Rezeksiyonu":"lezyon",
  "Üç Kökte Kök Ucu Rezeksiyonu":"lezyon",
  // Görsel yok (yok)
  "Sinüs Lifting":"yok","Sert Doku Greftleme":"yok","Yumuşak Doku Greftleme":"yok",
  "Gingivoplasti (Tek Diş)":"yok","Gingivektomi (Tek Diş)":"yok",
  "Flap Operasyonu (Tek Diş)":"yok","Frenektomi - Frenetomi":"yok",
  "Detartraj (Diş Taşı Temizliği - Tek Çene)":"yok",
};

// Belge türleri
const BELGE_TURLERI = {
  klinik: [
    {id:"saglik_bakanligi",ad:"Sağlık Bakanlığı Yetki Belgesi",aciklama:"Uluslararası Sağlık Turizmi Yetki Belgesi"},
    {id:"faaliyet_ruhsati",ad:"Faaliyet Ruhsatı",aciklama:"Sağlık tesisi açma ve çalışma ruhsatı"},
    {id:"hekim_sertifikasi",ad:"Sorumlu Hekim Sertifikası",aciklama:"Uzman doktor sertifikası ve diploması"},
    {id:"sigorta_policesi",ad:"Sigorta Poliçesi",aciklama:"Zorunlu mesleki sorumluluk sigortası"},
    {id:"vergi_levhasi",ad:"Vergi Levhası",aciklama:"Güncel vergi levhası"},
    {id:"ticaret_sicil",ad:"Ticaret Sicil Belgesi",aciklama:"Güncel ticaret sicil gazetesi"},
  ],
};

// Menü listesi
const MENU = [
  {id:"ozet",ad:"🏠 Genel Özet"},
  {id:"profil",ad:"✏️ Profil Düzenle"},
  {id:"hizmetler",ad:"💉 Hizmet & Fiyatlar"},
  {id:"doktorlar",ad:"👨‍⚕️ Doktorlar"},
  {id:"once-sonra",ad:"📸 Önce/Sonra"},
  {id:"talepler",ad:"📋 Teklif Talepleri"},
  {id:"tekliflerim",ad:"📤 Gönderilen Teklifler"},
  {id:"belgeler",ad:"📄 Belgelerim"},
  {id:"mesajlar",ad:"💬 Mesajlar"},
];

const inputStyle: React.CSSProperties = {
  width:"100%",border:"1px solid #e5e7eb",borderRadius:"8px",
  padding:"9px 12px",fontSize:"13px",outline:"none",boxSizing:"border-box"
};
const labelStyle: React.CSSProperties = {
  fontSize:"12px",color:"#888",display:"block",marginBottom:"4px"
};
const cardStyle: React.CSSProperties = {
  background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"24px",marginBottom:"20px"
};

export default function KlinikPanel() {
  const supabase = createClient();
  const { dil, dilDegistir } = useDil();
  const m = M[dil as keyof typeof M] || M.tr;
  const [menu, setMenu] = useState("ozet");
  const [kullanici, setKullanici] = useState<any>(null);
  const [talepler, setTalepler] = useState<any[]>([]);
  const [teklifler, setTeklifler] = useState<any[]>([]);
  const [hizmetler, setHizmetler] = useState<any[]>([]);
  const [doktorlar, setDoktorlar] = useState<any[]>([]);
  const [onceSonralar, setOnceSonralar] = useState<any[]>([]);
  const [belgeler, setBelgeler] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [mesaj, setMesaj] = useState("");
  const [belgeYukleniyor, setBelgeYukleniyor] = useState(false);

  // Profil formu
  const [profil, setProfil] = useState({
    tanitim_yazisi:"",telefon:"",website:"",
    instagram:"",facebook:"",twitter:"",
    google_maps_url:"",konum_adres:"",
  });

  // Yeni hizmet formu
  const [yeniHizmet, setYeniHizmet] = useState({
    kategori: Object.keys(TDB_LISTE)[0],
    alt_kategori: Object.keys(Object.values(TDB_LISTE)[0])[0],
    hizmet_adi:"",aciklama:"",fiyat:"",para_birimi:"EUR",sure:"",
    dis_semasi_kategori:"yok",
  });

  // Yeni doktor formu
  const [yeniDoktor, setYeniDoktor] = useState({ad:"",uzmanlik:"",aciklama:"",fotograf_url:""});

  // Yeni önce/sonra
  const [yeniOS, setYeniOS] = useState({hizmet_adi:"",once_fotograf:"",sonra_fotograf:"",aciklama:""});

  // Teklif state'leri — talep bazlı
  const [teklifFormlar, setTeklifFormlar] = useState<Record<string,{
    fiyat:string,aciklama:string,
    otel_dahil:boolean,otel_aciklama:string,otel_fiyat:string,
    transfer_dahil:boolean,transfer_aciklama:string,transfer_fiyat:string,
  }>>({});
  const [disPlanMap, setDisPlanMap] = useState<Record<string,Record<number,string[]>>>({});
  const [disTedaviMap, setDisTedaviMap] = useState<Record<string,{dis:number,hizmet_adi:string,fiyat:number,kategori:string}[]>>({});
  const [acikTalep, setAcikTalep] = useState<string|null>(null);

  useEffect(() => { 
  veriYukle(); 
}, []);

  async function veriYukle() {
    setYukleniyor(true);
    const { data:{user} } = await supabase.auth.getUser();
    if (!user) { window.location.href="/giris"; return; }

    const { data:p } = await supabase.from("profiles").select("*").eq("id",user.id).single();
    setKullanici(p);
    if (p) setProfil({
      tanitim_yazisi:p.tanitim_yazisi||"",telefon:p.telefon||"",website:p.website||"",
      instagram:p.instagram||"",facebook:p.facebook||"",twitter:p.twitter||"",
      google_maps_url:p.google_maps_url||"",konum_adres:p.konum_adres||"",
    });
    // Bu kliniğin zaten teklif verdiği talepleri filtrele
const { data: verilmisler } = await supabase.from("teklifler").select("talep_id").eq("klinik_id", user.id);
const verilmisTalepIds = (verilmisler || []).map((v: any) => v.talep_id);

    const [talepRes,teklifRes,hizmetRes,doktorRes,osRes,belgeRes] = await Promise.all([
      supabase.from("talepler").select("*,profiles!talepler_hasta_id_fkey(ad,soyad,email)").eq("klinik_id", user.id).order("olusturma_tarihi",{ascending:false}),
      supabase.from("teklifler").select("*,talepler(tedavi_turu)").eq("klinik_id",user.id).order("olusturma_tarihi",{ascending:false}),
      supabase.from("klinik_hizmetler").select("*").eq("klinik_id",user.id).order("kategori"),
      supabase.from("doktorlar").select("*").eq("klinik_id",user.id),
      supabase.from("once_sonra").select("*").eq("klinik_id",user.id),
      supabase.from("belgeler").select("*").eq("kullanici_id",user.id),
    ]);

     
setTalepler(talepRes.data||[]);
    setTeklifler(teklifRes.data||[]);
    setHizmetler(hizmetRes.data||[]);
    setDoktorlar(doktorRes.data||[]);
    setOnceSonralar(osRes.data||[]);
    setBelgeler(belgeRes.data||[]);
    setYukleniyor(false);
  }

  async function fotografYukle(file:File, klasor:string) {
    const {data:{user}} = await supabase.auth.getUser();
    const ad = `${user?.id}/${klasor}/${Date.now()}_${file.name}`;
    const {error} = await supabase.storage.from("medoqa-images").upload(ad,file);
    if (error) return null;
    const {data:url} = supabase.storage.from("medoqa-images").getPublicUrl(ad);
    return url.publicUrl;
  }

  function mesajGoster(msg:string) { setMesaj(msg); setTimeout(()=>setMesaj(""),3000); }

  // ─── Profil ─────────────────────────────────────────────────────────────────
  async function profilKaydet() {
    const {data:{user}} = await supabase.auth.getUser();
    const {error} = await supabase.from("profiles").update(profil).eq("id",user?.id);
    if (error) mesajGoster("Hata: "+error.message);
    else { mesajGoster(m.profilKaydedildi); veriYukle(); }
  }

  async function kapakFotoYukle(file:File) {
    const url = await fotografYukle(file,"kapak");
    if (url) {
      const {data:{user}} = await supabase.auth.getUser();
      await supabase.from("profiles").update({kapak_fotograf:url}).eq("id",user?.id);
      veriYukle(); mesajGoster(m.kapakYuklendi);
    }
  }

  // ─── Hizmetler ───────────────────────────────────────────────────────────────
  async function hizmetEkle() {
    if (!yeniHizmet.hizmet_adi || !yeniHizmet.fiyat) { mesajGoster(m.hizmetAdZorunlu); return; }
    const {data:{user}} = await supabase.auth.getUser();
    await supabase.from("klinik_hizmetler").insert({
      klinik_id:user?.id,
      kategori:yeniHizmet.kategori,
      alt_kategori:yeniHizmet.alt_kategori,
      hizmet_adi:yeniHizmet.hizmet_adi,
      aciklama:yeniHizmet.aciklama,
      fiyat:parseFloat(yeniHizmet.fiyat),
      para_birimi:yeniHizmet.para_birimi,
      sure:yeniHizmet.sure,
      dis_semasi_kategori:yeniHizmet.dis_semasi_kategori,
    });
    mesajGoster(m.hizmetEklendi);
    const ilkKat = Object.keys(TDB_LISTE)[0];
    const ilkAlt = Object.keys(TDB_LISTE[ilkKat])[0];
    setYeniHizmet({kategori:ilkKat,alt_kategori:ilkAlt,hizmet_adi:"",aciklama:"",fiyat:"",para_birimi:"EUR",sure:"",dis_semasi_kategori:"yok"});
    veriYukle();
  }

  async function hizmetSil(id:string) {
    if (!confirm(m.silOnay)) return;
    await supabase.from("klinik_hizmetler").delete().eq("id",id);
    veriYukle();
  }

  async function hizmetToggle(id:string, aktif:boolean) {
    await supabase.from("klinik_hizmetler").update({aktif:!aktif}).eq("id",id);
    veriYukle();
  }

  // ─── Doktorlar ────────────────────────────────────────────────────────────────
  async function doktorEkle() {
    if (!yeniDoktor.ad) { mesajGoster(m.doktorAdZorunlu); return; }
    const {data:{user}} = await supabase.auth.getUser();
    await supabase.from("doktorlar").insert({klinik_id:user?.id,...yeniDoktor});
    mesajGoster(m.doktorEklendi);
    setYeniDoktor({ad:"",uzmanlik:"",aciklama:"",fotograf_url:""});
    veriYukle();
  }

  async function doktorSil(id:string) {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    await supabase.from("doktorlar").delete().eq("id",id);
    veriYukle();
  }

  // ─── Önce/Sonra ───────────────────────────────────────────────────────────────
  async function osEkle() {
    if (!yeniOS.once_fotograf || !yeniOS.sonra_fotograf) { mesajGoster(m.fotoZorunlu); return; }
    const {data:{user}} = await supabase.auth.getUser();
    await supabase.from("once_sonra").insert({klinik_id:user?.id,...yeniOS});
    mesajGoster(m.onceSonraEklendi);
    setYeniOS({hizmet_adi:"",once_fotograf:"",sonra_fotograf:"",aciklama:""});
    veriYukle();
  }

  async function osSil(id:string) {
    await supabase.from("once_sonra").delete().eq("id",id);
    veriYukle();
  }

  // ─── Diş şeması fiyat hesaplama ──────────────────────────────────────────────
  function disPlanHesapla(talepId:string, plan:Record<number,string[]>) {
    setDisPlanMap(prev=>({...prev,[talepId]:plan}));
    const detaylar: {dis:number,hizmet_adi:string,fiyat:number,kategori:string}[] = [];

    Object.entries(plan).forEach(([no,kategoriler]) => {
      kategoriler.forEach(kat => {
        if (['eksik','lezyon','kirik','cokmus'].includes(kat)) return;
        // Hizmet listesinden bu diş şeması kategorisine eşleşen hizmetleri bul
        const eslesenler = hizmetler.filter(h => h.aktif && h.dis_semasi_kategori === kat);
        if (eslesenler.length > 0) {
          // En düşük fiyatlıyı al
          const hizmet = eslesenler.sort((a,b)=>a.fiyat-b.fiyat)[0];
          detaylar.push({dis:Number(no),hizmet_adi:hizmet.hizmet_adi,fiyat:hizmet.fiyat,kategori:kat});
        } else if (kat !== 'yok') {
          // Eşleşen hizmet yok, 0 fiyatla ekle
          detaylar.push({dis:Number(no),hizmet_adi:`${kat} (fiyat girilmedi)`,fiyat:0,kategori:kat});
        }
      });
    });

    setDisTedaviMap(prev=>({...prev,[talepId]:detaylar}));
    const toplam = detaylar.reduce((s,d)=>s+d.fiyat,0);
    setTeklifFormlar(prev=>({
      ...prev,
      [talepId]:{...(prev[talepId]||{otel_dahil:false,otel_aciklama:"",otel_fiyat:"",transfer_dahil:false,transfer_aciklama:"",transfer_fiyat:"",aciklama:""}),fiyat:toplam.toString()}
    }));
  }

  function getTeklifForm(talepId:string) {
    return teklifFormlar[talepId] || {fiyat:"",aciklama:"",otel_dahil:false,otel_aciklama:"",otel_fiyat:"",transfer_dahil:false,transfer_aciklama:"",transfer_fiyat:""};
  }

  function setTeklifForm(talepId:string, data:any) {
    setTeklifFormlar(prev=>({...prev,[talepId]:{...getTeklifForm(talepId),...data}}));
  }

  // ─── Teklif gönder ───────────────────────────────────────────────────────────
  async function teklifGonder(talepId:string) {
    const form = getTeklifForm(talepId);
    if (!form.fiyat) { mesajGoster(m.fiyatZorunlu); return; }
    const {data:{user}} = await supabase.auth.getUser();
    const tedaviFiyat = parseFloat(form.fiyat)||0;
    const otelFiyat = form.otel_dahil ? (parseFloat(form.otel_fiyat)||0) : 0;
    const transferFiyat = form.transfer_dahil ? (parseFloat(form.transfer_fiyat)||0) : 0;
    const toplamFiyat = tedaviFiyat+otelFiyat+transferFiyat;

    // Diş tedavi detaylarını aciklama olarak ekle
    const disTedaviler = disTedaviMap[talepId]||[];
    const tedaviAciklama = disTedaviler.length > 0
      ? disTedaviler.map(d=>`Diş ${d.dis}: ${d.hizmet_adi}`).join(", ")
      : form.aciklama;

    const {error} = await supabase.from("teklifler").insert({
      talep_id:talepId,klinik_id:user?.id,
      fiyat:tedaviFiyat,para_birimi:"EUR",
      aciklama:tedaviAciklama,durum:"beklemede",
      otel_dahil:form.otel_dahil,otel_aciklama:form.otel_aciklama,otel_fiyat:otelFiyat,
      transfer_dahil:form.transfer_dahil,transfer_aciklama:form.transfer_aciklama,transfer_fiyat:transferFiyat,
      toplam_fiyat:toplamFiyat,transfer_gerekli: !form.transfer_dahil,
    });

    if (error) { mesajGoster("Hata: "+error.message); return; }

    // Email bildirimi
    const talep = talepler.find(t=>t.id===talepId);
    if (talep?.profiles?.email) {
      await fetch("/api/bildirim-gonder",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          tip:"teklif_gonderildi",hasta_email:talep.profiles.email,
          hasta_ad:talep.profiles.ad,klinik_ad:`${kullanici?.ad} ${kullanici?.soyad}`,
          tedavi:talep.tedavi_turu,fiyat:form.fiyat,para_birimi:"EUR",
        }),
      });
    }

    mesajGoster(m.teklifGonderildi);setTalepler(prev => prev.filter((t: any) => t.id !== talepId));
    setTeklifFormlar(prev=>{const y={...prev};delete y[talepId];return y;});
    setDisPlanMap(prev=>{const y={...prev};delete y[talepId];return y;});
    setDisTedaviMap(prev=>{const y={...prev};delete y[talepId];return y;});
    setAcikTalep(null);
    veriYukle();
  }

  // ─── Belge yükleme ───────────────────────────────────────────────────────────
  async function belgeYukle(belge_turu:string, file:File) {
    setBelgeYukleniyor(true);
    const {data:{user}} = await supabase.auth.getUser();
    if (!user) { mesajGoster("Hata: Oturum bulunamadı!"); setBelgeYukleniyor(false); return; }
    const ad = `belgeler/${user.id}/${belge_turu}_${Date.now()}_${file.name}`;
    const {error:upErr} = await supabase.storage.from("medoqa-images").upload(ad,file,{upsert:true});
    if (upErr) { mesajGoster("Hata: "+upErr.message); setBelgeYukleniyor(false); return; }
    const {data:urlData} = supabase.storage.from("medoqa-images").getPublicUrl(ad);
    const mevcut = belgeler.find(b=>b.belge_turu===belge_turu);
    if (mevcut) {
      await supabase.from("belgeler").update({belge_url:urlData.publicUrl,yukleme_tarihi:new Date().toISOString()}).eq("id",mevcut.id);
    } else {
      await supabase.from("belgeler").insert({kullanici_id:user.id,belge_turu,belge_url:urlData.publicUrl});
    }
    mesajGoster("✅ Belge yüklendi!"); veriYukle(); setBelgeYukleniyor(false);
  }

  async function belgeSil(id:string) {
    await supabase.from("belgeler").delete().eq("id",id); veriYukle();
  }

  async function cikisYap() {
    await supabase.auth.signOut(); window.location.href="/giris";
  }

  // ─── Teklif yazdır ───────────────────────────────────────────────────────────
  function teklifYazdir(t:any) {
    const w = window.open("","_blank");
    if (!w) return;
    w.document.write(`<html><head><title>Teklif - Medoqa</title>
    <style>body{font-family:Arial,sans-serif;max-width:600px;margin:40px auto;padding:20px}
    .section{background:#f8f9ff;padding:16px;border-radius:8px;margin:16px 0}
    .row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee}
    @media print{button{display:none}}</style></head><body>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
      <h1 style="margin:0;color:#534AB7">med<span style="font-weight:300">oqa</span></h1>
      <span style="padding:4px 12px;border-radius:20px;background:#fff8e1;color:#BA7517;font-size:13px">${t.durum}</span>
    </div>
    <h2>Teklif Detayı</h2>
    <p style="color:#888">Tarih: ${new Date(t.olusturma_tarihi).toLocaleDateString("tr-TR")}</p>
    <div class="section">
      <h3 style="color:#534AB7;margin:0 0 12px">💊 Tedavi</h3>
      <div class="row"><span>Tedavi</span><strong>${t.talepler?.tedavi_turu||"-"}</strong></div>
      <div class="row"><span>Açıklama</span><strong>${t.aciklama||"-"}</strong></div>
      <div class="row"><span>Tedavi Ücreti</span><strong>${t.fiyat} EUR</strong></div>
    </div>
    ${t.otel_dahil?`<div class="section"><h3 style="color:#534AB7;margin:0 0 12px">🏨 Otel</h3>
    <div class="row"><span>Otel</span><strong>${t.otel_aciklama||"-"}</strong></div>
    <div class="row"><span>Ücret</span><strong>${t.otel_fiyat} EUR</strong></div></div>`:""}
    ${t.transfer_dahil?`<div class="section"><h3 style="color:#534AB7;margin:0 0 12px">🚗 Transfer</h3>
    <div class="row"><span>Transfer</span><strong>${t.transfer_aciklama||"-"}</strong></div>
    <div class="row"><span>Ücret</span><strong>${t.transfer_fiyat} EUR</strong></div></div>`:""}
    ${(t.otel_dahil||t.transfer_dahil)?`<div class="section">
    <div class="row" style="font-size:18px;font-weight:bold;color:#534AB7">
    <span>💰 Toplam</span><span>${t.toplam_fiyat} EUR</span></div></div>`:""}
    <div style="text-align:center;margin-top:32px">
      <button onclick="window.print()" style="background:#534AB7;color:#fff;border:none;padding:12px 32px;border-radius:8px;font-size:14px;cursor:pointer">🖨️ Yazdır</button>
    </div></body></html>`);
    w.document.close();
  }

  const zorunluBelgeler = BELGE_TURLERI.klinik;
  const altKategoriler = Object.keys(TDB_LISTE[yeniHizmet.kategori]||{});
  const hizmetListesi = (TDB_LISTE[yeniHizmet.kategori]||{})[yeniHizmet.alt_kategori]||[];

  // ─── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <main style={{minHeight:"100vh",background:"#f9fafb",fontFamily:"sans-serif",display:"flex"}}>
      {/* Sidebar */}
      <aside style={{width:"230px",background:"#12103a",display:"flex",flexDirection:"column",padding:"24px 0",flexShrink:0}}>
        <div style={{padding:"0 20px 20px",borderBottom:"1px solid #1e1b4b"}}>
          <a href="/" style={{fontSize:"20px",fontWeight:700,color:"#fff",textDecoration:"none"}}>
            med<span style={{color:"#7F77DD",fontWeight:300}}>oqa</span>
          </a>
          <div style={{fontSize:"11px",color:"#6b6fa8",marginTop:"4px"}}>{m.panel}</div>
        </div>
        {kullanici && (
          <div style={{padding:"14px 20px",borderBottom:"1px solid #1e1b4b"}}>
            <div style={{width:"36px",height:"36px",background:"#185FA5",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"14px",marginBottom:"8px"}}>
              {kullanici.ad?.[0]?.toUpperCase()||"K"}
            </div>
            <div style={{fontSize:"13px",fontWeight:600,color:"#fff"}}>{kullanici.ad} {kullanici.soyad}</div>
            <div style={{fontSize:"11px",color:kullanici.onaylandi?"#7F77DD":"#BA7517",marginTop:"2px"}}>
              {kullanici.onaylandi?m.onaylandi : m.onayBekliyor}
            </div>
          </div>
        )}
        {/* Dil seçici */}
        <div style={{padding:"8px 16px",borderBottom:"1px solid #1e1b4b",display:"flex",gap:"5px"}}>
          {(["tr","en","de","ar","ru","fr"] as const).map(d=>(
            <span key={d} onClick={()=>dilDegistir(d)} style={{fontSize:"10px",padding:"3px 8px",border:`1px solid ${dil===d?"#534AB7":"#2a2a4e"}`,borderRadius:"4px",color:dil===d?"#7F77DD":"#aab4c8",cursor:"pointer",textTransform:"uppercase"}}>{d}</span>
          ))}
        </div>
        <nav style={{padding:"16px 12px",flex:1}}>
          {Object.entries(m.menu).map(([id,ad])=>(
            <div key={id} onClick={()=>setMenu(id)} style={{
              padding:"9px 12px",borderRadius:"8px",cursor:"pointer",marginBottom:"3px",
              background:menu===id?"#534AB7":"transparent",
              color:menu===id?"#fff":"#8b8fc8",fontSize:"13px",
            }}>{ad as string}</div>
          ))}
        </nav>
        <div style={{padding:"0 12px 20px"}}>
          <button onClick={cikisYap} style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid #2a2a4e",borderRadius:"8px",color:"#8b8fc8",fontSize:"13px",cursor:"pointer"}}>
            {m.cikis}
          </button>
        </div>
      </aside>

      {/* İçerik */}
      <div style={{flex:1,padding:"32px",overflow:"auto"}}>
        {mesaj && (
          <div style={{background:mesaj.includes("Hata")?"#fff0f0":"#f0fff4",border:`1px solid ${mesaj.includes("Hata")?"#fcc":"#9f9"}`,borderRadius:"8px",padding:"10px 16px",marginBottom:"16px",fontSize:"13px",color:mesaj.includes("Hata")?"#c00":"#0a7a3a"}}>
            {mesaj}
          </div>
        )}

        {yukleniyor ? (
          <div style={{textAlign:"center",padding:"64px",color:"#888"}}>{m.yukleniyor}</div>
        ) : (
          <>
            {kullanici && !kullanici.onaylandi && (
              <div style={{background:"#fff8e1",border:"1px solid #f0c040",borderRadius:"12px",padding:"16px",marginBottom:"24px"}}>
                <div style={{fontSize:"14px",fontWeight:700,color:"#BA7517"}}>⏳ {m.onayBekle}</div>
                <div style={{fontSize:"13px",color:"#666",marginTop:"4px"}}>{m.onayBekleAcik}</div>
              </div>
            )}

            {/* ── ÖZET ── */}
            {menu==="ozet" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.hosgeldin}, {kullanici?.ad}! 👋</h1>
                <p style={{fontSize:"14px",color:"#888",marginBottom:"28px"}}>{m.panelAcik}</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"16px",marginBottom:"28px"}}>
                  {[
                    {l:m.istatistikler.hizmet,v:hizmetler.length,c:"#534AB7"},
                    {l:m.istatistikler.doktor,v:doktorlar.length,c:"#185FA5"},
                    {l:m.istatistikler.onceSonra,v:onceSonralar.length,c:"#7F77DD"},
                    {l:m.istatistikler.teklif,v:teklifler.length,c:"#059669"},
                  ].map(k=>(
                    <div key={k.l} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px"}}>
                      <div style={{fontSize:"28px",fontWeight:700,color:k.c,marginBottom:"6px"}}>{k.v}</div>
                      <div style={{fontSize:"13px",color:"#888"}}>{k.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
                  {[{id:"profil",l:m.profilDuzenle},{id:"hizmetler",l:m.hizmetEkle},{id:"doktorlar",l:m.doktorEkle},{id:"talepler",l:m.teklifTalepleri}].map(b=>(
                    <button key={b.id} onClick={()=>setMenu(b.id)} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>{b.l}</button>
                  ))}
                </div>
              </div>
            )}

            {/* ── PROFİL ── */}
            {menu==="profil" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"24px"}}>{m.profilDuzenle}</h1>
                <div style={cardStyle}>
                  <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",marginBottom:"16px"}}>{m.kapakFoto}</h2>
                  {kullanici?.kapak_fotograf && <img src={kullanici.kapak_fotograf} alt="Kapak" style={{width:"100%",maxHeight:"200px",objectFit:"cover",borderRadius:"8px",marginBottom:"12px"}}/>}
                  <input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0];if(f)kapakFotoYukle(f);}} style={{...inputStyle}}/>
                </div>
                <div style={cardStyle}>
                  <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",marginBottom:"16px"}}>{m.klinikBilgileri}</h2>
                  <div style={{marginBottom:"12px"}}>
                    <label style={labelStyle}>{m.tanitimYazisi}</label>
                    <textarea rows={4} value={profil.tanitim_yazisi} onChange={e=>setProfil({...profil,tanitim_yazisi:e.target.value})} style={{...inputStyle,resize:"none"}}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                    <div><label style={labelStyle}>{m.telefon}</label><input type="text" value={profil.telefon} onChange={e=>setProfil({...profil,telefon:e.target.value})} style={inputStyle}/></div>
                    <div><label style={labelStyle}>{m.website}</label><input type="text" value={profil.website} onChange={e=>setProfil({...profil,website:e.target.value})} style={inputStyle}/></div>
                  </div>
                  <div style={{marginBottom:"12px"}}>
                    <label style={labelStyle}>{m.adres}</label>
                    <input type="text" value={profil.konum_adres} onChange={e=>setProfil({...profil,konum_adres:e.target.value})} style={inputStyle}/>
                  </div>
                  <div style={{marginBottom:"12px"}}>
                    <label style={labelStyle}>{m.googleMaps}</label>
                    <input type="text" value={profil.google_maps_url} onChange={e=>setProfil({...profil,google_maps_url:e.target.value})} style={inputStyle}/>
                  </div>
                </div>
                <div style={cardStyle}>
                  <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",marginBottom:"16px"}}>{m.sosyalMedya}</h2>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px"}}>
                    <div><label style={labelStyle}>Instagram</label><input type="text" placeholder="@kullanici" value={profil.instagram} onChange={e=>setProfil({...profil,instagram:e.target.value})} style={inputStyle}/></div>
                    <div><label style={labelStyle}>Facebook</label><input type="text" value={profil.facebook} onChange={e=>setProfil({...profil,facebook:e.target.value})} style={inputStyle}/></div>
                    <div><label style={labelStyle}>Twitter/X</label><input type="text" placeholder="@kullanici" value={profil.twitter} onChange={e=>setProfil({...profil,twitter:e.target.value})} style={inputStyle}/></div>
                  </div>
                </div>
                <button onClick={profilKaydet} style={{background:"#534AB7",color:"#fff",border:"none",padding:"12px 32px",borderRadius:"8px",fontSize:"14px",cursor:"pointer",fontWeight:600}}>
                  {m.kaydet}
                </button>
              </div>
            )}

            {/* ── HİZMETLER ── */}
            {menu==="hizmetler" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"24px"}}>{m.hizmetListesi}</h1>
                <div style={cardStyle}>
                  <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",marginBottom:"16px"}}>{m.yeniHizmet}</h2>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                    <div>
                      <label style={labelStyle}>{m.kategori}</label>
                      <select value={yeniHizmet.kategori} onChange={e=>{
                        const kat=e.target.value;
                        const altlar=Object.keys(TDB_LISTE[kat]||{});
                        setYeniHizmet({...yeniHizmet,kategori:kat,alt_kategori:altlar[0]||"",hizmet_adi:""});
                      }} style={{...inputStyle,background:"#fff"}}>
                        {Object.keys(TDB_LISTE).map(k=><option key={k}>{k}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>{m.altKategori}</label>
                      <select value={yeniHizmet.alt_kategori} onChange={e=>setYeniHizmet({...yeniHizmet,alt_kategori:e.target.value,hizmet_adi:""})} style={{...inputStyle,background:"#fff"}}>
                        {altKategoriler.map(k=><option key={k}>{k}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                    <div>
                      <label style={labelStyle}>{m.listeden}</label>
                      <select value={yeniHizmet.hizmet_adi} onChange={e=>{
                        const ad=e.target.value;
                        const disCat = DIS_SEMASI_MAP[ad]||"yok";
                        setYeniHizmet({...yeniHizmet,hizmet_adi:ad,dis_semasi_kategori:disCat});
                      }} style={{...inputStyle,background:"#fff"}}>
                        <option value="">Seçin...</option>
                        {hizmetListesi.map((h:string)=><option key={h}>{h}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>{m.ozelAd}</label>
                      <input type="text" placeholder={m.ozelAdPlaceholder} value={yeniHizmet.hizmet_adi} onChange={e=>setYeniHizmet({...yeniHizmet,hizmet_adi:e.target.value})} style={inputStyle}/>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                    <div>
                      <label style={labelStyle}>{m.fiyat} *</label>
                      <input type="number" placeholder="0" value={yeniHizmet.fiyat} onChange={e=>setYeniHizmet({...yeniHizmet,fiyat:e.target.value})} style={inputStyle}/>
                    </div>
                    <div>
                      <label style={labelStyle}>{m.paraBirimi}</label>
                      <select value={yeniHizmet.para_birimi} onChange={e=>setYeniHizmet({...yeniHizmet,para_birimi:e.target.value})} style={{...inputStyle,background:"#fff"}}>
                        <option>EUR</option><option>USD</option><option>TRY</option><option>GBP</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>{m.sure}</label>
                      <input type="text" placeholder="örn: 1 saat" value={yeniHizmet.sure} onChange={e=>setYeniHizmet({...yeniHizmet,sure:e.target.value})} style={inputStyle}/>
                    </div>
                    <div>
                      <label style={labelStyle}>{m.disSemasi}</label>
                      <select value={yeniHizmet.dis_semasi_kategori} onChange={e=>setYeniHizmet({...yeniHizmet,dis_semasi_kategori:e.target.value})} style={{...inputStyle,background:"#fff"}}>
                        <option value="yok">Görsel yok</option>
                        <option value="dolgu">Dolgu</option>
                        <option value="kanal">Kanal</option>
                        <option value="kaplama">Kaplama</option>
                        <option value="cekim">Çekim</option>
                        <option value="implant">İmplant</option>
                        <option value="kopru">Köprü</option>
                        <option value="lezyon">Lezyon</option>
                        <option value="eksik">Eksik</option>
                      </select>
                    </div>
                  </div>
                  <div style={{marginBottom:"16px"}}>
                    <label style={labelStyle}>{m.aciklama}</label>
                    <textarea rows={2} value={yeniHizmet.aciklama} onChange={e=>setYeniHizmet({...yeniHizmet,aciklama:e.target.value})} style={{...inputStyle,resize:"none"}}/>
                  </div>
                  <button onClick={hizmetEkle} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 24px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:600}}>
                    {m.hizmetEkleBtn}
                  </button>
                </div>

                <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",overflow:"hidden"}}>
                  <div style={{padding:"16px 20px",borderBottom:"1px solid #EEEDFE",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",margin:0}}>{m.mevcutHizmetler} ({hizmetler.length})</h2>
                  </div>
                  <table style={{width:"100%",borderCollapse:"collapse"}}>
                    <thead>
                      <tr style={{background:"#f9fafb"}}>
                        {[m.hizmetSutun.ad,m.hizmetSutun.kat,m.hizmetSutun.dis,m.hizmetSutun.fiyat,m.hizmetSutun.islem].map(h=>(
                          <th key={h} style={{padding:"10px 16px",textAlign:"left",fontSize:"12px",color:"#888",fontWeight:600}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {hizmetler.map((h,i)=>(
                        <tr key={h.id} style={{borderTop:"1px solid #EEEDFE",background:i%2===0?"#fff":"#fafafa",opacity:h.aktif?1:0.5}}>
                          <td style={{padding:"10px 16px",fontSize:"13px",fontWeight:600,color:"#12103a"}}>{h.hizmet_adi}</td>
                          <td style={{padding:"10px 16px",fontSize:"12px",color:"#534AB7"}}>{h.kategori}</td>
                          <td style={{padding:"10px 16px",fontSize:"12px",color:"#888"}}>
                            <span style={{padding:"2px 8px",borderRadius:"8px",background:"#f0eeff",color:"#534AB7",fontSize:"11px"}}>
                              {h.dis_semasi_kategori||"yok"}
                            </span>
                          </td>
                          <td style={{padding:"10px 16px",fontSize:"14px",fontWeight:700,color:"#534AB7"}}>{h.fiyat} {h.para_birimi}</td>
                          <td style={{padding:"10px 16px"}}>
                            <div style={{display:"flex",gap:"6px"}}>
                              <button onClick={()=>hizmetToggle(h.id,h.aktif)} style={{background:h.aktif?"#fff8e1":"#f0fff4",color:h.aktif?"#BA7517":"#0a7a3a",border:"none",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>
                                {h.aktif ? m.pasife : m.aktife}
                              </button>
                              <button onClick={()=>hizmetSil(h.id)} style={{background:"#fff0f0",color:"#c00",border:"none",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>{m.sil}</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {hizmetler.length===0 && <div style={{textAlign:"center",padding:"32px",color:"#888",fontSize:"13px"}}>{m.hizmetYok}</div>}
                </div>
              </div>
            )}

            {/* ── DOKTORLAR ── */}
            {menu==="doktorlar" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"24px"}}>{m.doktorlarBaslik}</h1>
                <div style={cardStyle}>
                  <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",marginBottom:"16px"}}>{m.doktorEkleBaslik}</h2>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
                    <div><label style={labelStyle}>{m.doktorAd} *</label><input type="text" placeholder="Dr. Ad Soyad" value={yeniDoktor.ad} onChange={e=>setYeniDoktor({...yeniDoktor,ad:e.target.value})} style={inputStyle}/></div>
                    <div><label style={labelStyle}>{m.uzmanlik}</label><input type="text" placeholder="Diş Hekimi" value={yeniDoktor.uzmanlik} onChange={e=>setYeniDoktor({...yeniDoktor,uzmanlik:e.target.value})} style={inputStyle}/></div>
                  </div>
                  <div style={{marginBottom:"12px"}}>
                    <label style={labelStyle}>Açıklama</label>
                    <textarea rows={2} value={yeniDoktor.aciklama} onChange={e=>setYeniDoktor({...yeniDoktor,aciklama:e.target.value})} style={{...inputStyle,resize:"none"}}/>
                  </div>
                  <div style={{marginBottom:"16px"}}>
                    <label style={labelStyle}>{m.doktorFoto}</label>
                    <input type="file" accept="image/*" onChange={async e=>{const f=e.target.files?.[0];if(f){const url=await fotografYukle(f,"doktorlar");if(url)setYeniDoktor({...yeniDoktor,fotograf_url:url});
                    }}} style={inputStyle}/>
                    {yeniDoktor.fotograf_url && <img src={yeniDoktor.fotograf_url} alt="Doktor" style={{width:"60px",height:"60px",objectFit:"cover",borderRadius:"50%",marginTop:"8px"}}/>}
                  </div>
                  <button onClick={doktorEkle} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 24px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:600}}>{m.doktorEkleBtn}</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px"}}>
                  {doktorlar.map(d=>(
                    <div key={d.id} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px",textAlign:"center"}}>
                      {d.fotograf_url
                        ? <img src={d.fotograf_url} alt={d.ad} style={{width:"72px",height:"72px",objectFit:"cover",borderRadius:"50%",marginBottom:"12px"}}/>
                        : <div style={{width:"72px",height:"72px",background:"#EEEDFE",borderRadius:"50%",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",color:"#534AB7",fontWeight:700}}>{d.ad[0]}</div>
                      }
                      <div style={{fontSize:"14px",fontWeight:700,color:"#12103a",marginBottom:"4px"}}>{d.ad}</div>
                      <div style={{fontSize:"12px",color:"#534AB7",marginBottom:"8px"}}>{d.uzmanlik}</div>
                      {d.aciklama && <div style={{fontSize:"12px",color:"#888",marginBottom:"12px"}}>{d.aciklama}</div>}
                      <button onClick={()=>doktorSil(d.id)} style={{background:"#fff0f0",color:"#c00",border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>Sil</button>
                    </div>
                  ))}
                  {doktorlar.length===0 && <div style={{gridColumn:"1/-1",textAlign:"center",padding:"32px",color:"#888"}}>{m.doktorYok}</div>}
                </div>
              </div>
            )}

            {/* ── ÖNCE SONRA ── */}
            {menu==="onceSonra" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"24px"}}>{m.onceSonraBaslik}</h1>
                <div style={cardStyle}>
                  <h2 style={{fontSize:"16px",fontWeight:700,color:"#12103a",marginBottom:"16px"}}>{m.yeniEkle}</h2>
                  <div style={{marginBottom:"12px"}}>
                    <label style={labelStyle}>{m.hizmetAdi}</label>
                    <input type="text" placeholder={m.hizmetAdPlaceholder} value={yeniOS.hizmet_adi} onChange={e=>setYeniOS({...yeniOS,hizmet_adi:e.target.value})} style={inputStyle}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"12px"}}>
                    <div>
                      <label style={labelStyle}>{m.onceFoto} *</label>
                      <input type="file" accept="image/*" onChange={async e=>{const f=e.target.files?.[0];if(f){const url=await fotografYukle(f,"once-sonra");if(url)setYeniOS({...yeniOS,once_fotograf:url});}}} style={inputStyle}/>
                      {yeniOS.once_fotograf && <img src={yeniOS.once_fotograf} alt="Önce" style={{width:"100%",height:"100px",objectFit:"cover",borderRadius:"6px",marginTop:"8px"}}/>}
                    </div>
                    <div>
                      <label style={labelStyle}>{m.sonraFoto} *</label>
                      <input type="file" accept="image/*" onChange={async e=>{const f=e.target.files?.[0];if(f){const url=await fotografYukle(f,"once-sonra");if(url)setYeniOS({...yeniOS,sonra_fotograf:url});}}} style={inputStyle}/>
                      {yeniOS.sonra_fotograf && <img src={yeniOS.sonra_fotograf} alt="Sonra" style={{width:"100%",height:"100px",objectFit:"cover",borderRadius:"6px",marginTop:"8px"}}/>}
                    </div>
                  </div>
                  <div style={{marginBottom:"16px"}}>
                    <label style={labelStyle}>Açıklama</label>
                    <input type="text" value={yeniOS.aciklama} onChange={e=>setYeniOS({...yeniOS,aciklama:e.target.value})} style={inputStyle}/>
                  </div>
                  <button onClick={osEkle} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 24px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:600}}>{m.ekleBtn}</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"16px"}}>
                  {onceSonralar.map(os=>(
                    <div key={os.id} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",overflow:"hidden"}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
                        <div>
                          <div style={{fontSize:"11px",color:"#888",padding:"6px 12px",background:"#f9fafb",textAlign:"center"}}>ÖNCE</div>
                          {os.once_fotograf && <img src={os.once_fotograf} alt="Önce" style={{width:"100%",height:"130px",objectFit:"cover"}}/>}
                        </div>
                        <div>
                          <div style={{fontSize:"11px",color:"#059669",padding:"6px 12px",background:"#f0fff4",textAlign:"center"}}>SONRA</div>
                          {os.sonra_fotograf && <img src={os.sonra_fotograf} alt="Sonra" style={{width:"100%",height:"130px",objectFit:"cover"}}/>}
                        </div>
                      </div>
                      <div style={{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div>
                          <div style={{fontSize:"13px",fontWeight:600,color:"#12103a"}}>{os.hizmet_adi}</div>
                          {os.aciklama && <div style={{fontSize:"11px",color:"#888"}}>{os.aciklama}</div>}
                        </div>
                        <button onClick={()=>osSil(os.id)} style={{background:"#fff0f0",color:"#c00",border:"none",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>Sil</button>
                      </div>
                    </div>
                  ))}
                  {onceSonralar.length===0 && <div style={{gridColumn:"1/-1",textAlign:"center",padding:"32px",color:"#888"}}>{m.onceSonraYok}</div>}
                </div>
              </div>
            )}

            {/* ── TEKLİF TALEPLERİ ── */}
            {menu==="talepler" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"24px"}}>{m.teklifTalepleri} ({talepler.length})</h1>
                <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                  {talepler.map(t=>{
                    const form = getTeklifForm(t.id);
                    const tedaviDetay = disTedaviMap[t.id]||[];
                    const acik = acikTalep===t.id;
                    return (
                      <div key={t.id} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"14px",overflow:"hidden"}}>
                        {/* Talep başlığı */}
                        <div style={{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <div>
                            <div style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"3px"}}>{t.tedavi_turu}</div>
                            <div style={{fontSize:"12px",color:"#888"}}>{m.hasta}: {t.profiles?.ad} {t.profiles?.soyad}</div>
                          </div>
                          <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
                            <span style={{fontSize:"11px",padding:"3px 10px",borderRadius:"20px",background:"#fff8e1",color:"#BA7517"}}>{t.durum}</span>
                            {kullanici?.onaylandi && (
                              <button onClick={()=>setAcikTalep(acik?null:t.id)} style={{background:acik?"#f0eeff":"#534AB7",color:acik?"#534AB7":"#fff",border:acik?"1px solid #534AB7":"none",padding:"7px 16px",borderRadius:"8px",fontSize:"12px",cursor:"pointer",fontWeight:600}}>
                                {acik ? m.kapat : m.teklifAc}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Teklif formu */}
                        {acik && kullanici?.onaylandi && (
                          <div style={{borderTop:"1px solid #EEEDFE",padding:"20px",background:"#fafafa"}}>
                            
                            {/* Diş şeması */}
                            <div style={{background:"#fff",borderRadius:"12px",border:"1px solid #EEEDFE",padding:"16px",marginBottom:"16px"}}>
                              <div style={{fontSize:"13px",fontWeight:700,color:"#0f0d2e",marginBottom:"12px"}}>{m.disPlani}</div>
                              <DisSemasi onDegistir={(plan)=>disPlanHesapla(t.id,plan)}/>

                              {/* Tedavi detay listesi */}
                              {tedaviDetay.length>0 && (
                                <div style={{marginTop:"14px",background:"#f8f9ff",borderRadius:"10px",overflow:"hidden",border:"1px solid #EEEDFE"}}>
                                  <div style={{padding:"10px 14px",background:"#534AB7",fontSize:"12px",fontWeight:700,color:"#fff"}}>
                                    {m.tedaviListesi} — {tedaviDetay.length} {m.islem}
                                  </div>
                                  {tedaviDetay.map((d,i)=>(
                                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 14px",borderBottom:"1px solid #EEEDFE",fontSize:"12px",gap:"8px"}}>
                                      <span style={{flex:1}}><strong>Diş {d.dis}</strong> — {d.hizmet_adi}</span>
                                      <input type="number" value={d.fiyat} onChange={e=>{const yeniFiyat=parseFloat(e.target.value)||0;setDisTedaviMap(prev=>{const yeni=[...(prev[t.id]||[])];yeni[i]={...yeni[i],fiyat:yeniFiyat};const toplam=yeni.reduce((s,x)=>s+x.fiyat,0);setTeklifFormlar(p=>({...p,[t.id]:{...getTeklifForm(t.id),fiyat:toplam.toString()}}));return {...prev,[t.id]:yeni};});}} style={{width:"80px",border:"1px solid #EEEDFE",borderRadius:"6px",padding:"4px 8px",fontSize:"12px",textAlign:"right",outline:"none"}}/>
                                      <span style={{fontSize:"11px",color:"#888"}}>EUR</span>
                                    </div>
                                  ))}
                                  <div style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",background:"#f0eeff",fontSize:"13px",fontWeight:700}}>
                                    <span>{m.toplam} Tedavi</span>
                                    <span style={{color:"#534AB7",fontSize:"15px"}}>{tedaviDetay.reduce((s,d)=>s+d.fiyat,0)} EUR</span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Manuel fiyat girişi */}
                            <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:"10px",marginBottom:"12px"}}>
                              <div>
                                <label style={labelStyle}>{m.tedaviFiyati} *</label>
                                <input type="number" placeholder="0" value={form.fiyat} onChange={e=>setTeklifForm(t.id,{fiyat:e.target.value})} style={inputStyle}/>
                              </div>
                              <div>
                                <label style={labelStyle}>Açıklama</label>
                                <input type="text" placeholder={m.aciklamaPlaceholder} value={form.aciklama} onChange={e=>setTeklifForm(t.id,{aciklama:e.target.value})} style={inputStyle}/>
                              </div>
                            </div>

                            {/* Otel */}
                            <div style={{background:"#fff",borderRadius:"10px",padding:"12px 14px",border:"1px solid #EEEDFE",marginBottom:"10px"}}>
                              <label style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",marginBottom:form.otel_dahil?"10px":"0"}}>
                                <input type="checkbox" checked={form.otel_dahil} onChange={e=>setTeklifForm(t.id,{otel_dahil:e.target.checked})}/>
                                <span style={{fontSize:"13px",fontWeight:600,color:"#0f0d2e"}}>{m.otelDahil}</span>
                              </label>
                              {form.otel_dahil && (
                                <div style={{display:"flex",gap:"8px"}}>
                                  <input type="text" placeholder={m.otelAdi} value={form.otel_aciklama} onChange={e=>setTeklifForm(t.id,{otel_aciklama:e.target.value})} style={{...inputStyle,flex:1}}/>
                                  <input type="number" placeholder="Fiyat (EUR)" value={form.otel_fiyat} onChange={e=>setTeklifForm(t.id,{otel_fiyat:e.target.value})} style={{...inputStyle,width:"140px"}}/>
                                </div>
                              )}
                            </div>

                            {/* Transfer */}
                            <div style={{background:"#fff",borderRadius:"10px",padding:"12px 14px",border:"1px solid #EEEDFE",marginBottom:"14px"}}>
                              <label style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",marginBottom:form.transfer_dahil?"10px":"0"}}>
                                <input type="checkbox" checked={form.transfer_dahil} onChange={e=>setTeklifForm(t.id,{transfer_dahil:e.target.checked})}/>
                                <span style={{fontSize:"13px",fontWeight:600,color:"#0f0d2e"}}>{m.transferDahil}</span>
                              </label>
                              {form.transfer_dahil && (
                                <div style={{display:"flex",gap:"8px"}}>
                                  <input type="text" placeholder={m.transferAciklama} value={form.transfer_aciklama} onChange={e=>setTeklifForm(t.id,{transfer_aciklama:e.target.value})} style={{...inputStyle,flex:1}}/>
                                  <input type="number" placeholder="Fiyat (EUR)" value={form.transfer_fiyat} onChange={e=>setTeklifForm(t.id,{transfer_fiyat:e.target.value})} style={{...inputStyle,width:"140px"}}/>
                                </div>
                              )}
                            </div>

                            {/* Toplam + Gönder */}
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                              {form.fiyat && (
                                <div style={{fontSize:"15px",fontWeight:700,color:"#534AB7"}}>
                                  Toplam: {(
                                    (parseFloat(form.fiyat)||0)+
                                    (form.otel_dahil?parseFloat(form.otel_fiyat)||0:0)+
                                    (form.transfer_dahil?parseFloat(form.transfer_fiyat)||0:0)
                                  ).toFixed(0)} EUR
                                </div>
                              )}
                              <button onClick={()=>teklifGonder(t.id)} style={{background:"#059669",color:"#fff",border:"none",padding:"11px 28px",borderRadius:"10px",fontSize:"13px",cursor:"pointer",fontWeight:700,marginLeft:"auto"}}>
                                ✅ Teklif Gönder
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {talepler.length===0 && (
                    <div style={{textAlign:"center",padding:"48px",background:"#fff",borderRadius:"12px",border:"1px solid #EEEDFE",color:"#888"}}>{m.teklifYok}</div>
                  )}
                </div>
              </div>
            )}

            {/* ── GÖNDERİLEN TEKLİFLER ── */}
            {menu==="tekliflerim" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"24px"}}>{m.gonderilen} ({teklifler.length})</h1>
                <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                  {teklifler.map(t=>(
                    <div key={t.id} style={{background:"#fff",border:`2px solid ${t.durum==="onaylandi"?"#059669":t.durum==="reddedildi"?"#fcc":"#EEEDFE"}`,borderRadius:"14px",padding:"22px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"14px"}}>
                        <div>
                          <div style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"4px"}}>💊 {t.talepler?.tedavi_turu}</div>
                          <div style={{fontSize:"12px",color:"#94a3b8"}}>{new Date(t.olusturma_tarihi).toLocaleDateString("tr-TR")}</div>
                        </div>
                        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
                          <span style={{fontSize:"12px",padding:"4px 12px",borderRadius:"20px",fontWeight:600,
                            background:t.durum==="onaylandi"?"#f0fff4":t.durum==="reddedildi"?"#fff0f0":"#fff8e1",
                            color:t.durum==="onaylandi"?"#059669":t.durum==="reddedildi"?"#c00":"#BA7517"
                          }}>
                            {t.durum==="onaylandi"?m.onaylandiLabel:t.durum==="reddedildi"?m.reddedildiLabel:m.beklemede}
                          </span>
                          <button onClick={()=>teklifYazdir(t)} style={{background:"#f0eeff",color:"#534AB7",border:"1px solid #EEEDFE",padding:"6px 14px",borderRadius:"8px",fontSize:"12px",cursor:"pointer",fontWeight:600}}>
                            {m.yazdir}
                          </button>
                        </div>
                      </div>
                      <div style={{background:"#f8f9ff",borderRadius:"10px",padding:"14px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
                          <span style={{fontSize:"13px",color:"#64748b"}}>💊 Tedavi</span>
                          <span style={{fontSize:"14px",fontWeight:700,color:"#534AB7"}}>{t.fiyat} EUR</span>
                        </div>
                        {t.otel_dahil && (
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
                            <span style={{fontSize:"13px",color:"#64748b"}}>🏨 Otel — {t.otel_aciklama}</span>
                            <span style={{fontSize:"13px",fontWeight:600,color:"#059669"}}>{t.otel_fiyat} EUR</span>
                          </div>
                        )}
                        {t.transfer_dahil && (
                          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
                            <span style={{fontSize:"13px",color:"#64748b"}}>🚗 Transfer — {t.transfer_aciklama}</span>
                            <span style={{fontSize:"13px",fontWeight:600,color:"#059669"}}>{t.transfer_fiyat} EUR</span>
                          </div>
                        )}
                        {(t.otel_dahil||t.transfer_dahil) && (
                          <>
                            <div style={{borderTop:"1px solid #EEEDFE",margin:"8px 0"}}/>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                              <span style={{fontSize:"14px",fontWeight:700,color:"#0f0d2e"}}>💰 Toplam</span>
                              <span style={{fontSize:"17px",fontWeight:800,color:"#534AB7"}}>{t.toplam_fiyat} EUR</span>
                            </div>
                          </>
                        )}
                      </div>
                      {t.aciklama && <div style={{fontSize:"12px",color:"#64748b",marginTop:"10px"}}>{t.aciklama}</div>}
                      {t.durum==="onaylandi" && (
                        <a href="/mesajlar" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:"#534AB7",color:"#fff",padding:"11px",borderRadius:"10px",fontSize:"13px",textDecoration:"none",fontWeight:600,marginTop:"14px"}}>
                          💬 Hasta ile Mesajlaş
                        </a>
                      )}
                    </div>
                  ))}
                  {teklifler.length===0 && <div style={{textAlign:"center",padding:"48px",background:"#fff",borderRadius:"12px",border:"1px solid #EEEDFE",color:"#888"}}>{m.teklifYokGon}</div>}
                </div>
              </div>
            )}

            {/* ── BELGELER ── */}
            {menu==="belgeler" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.belgelerBaslik}</h1>
                <p style={{fontSize:"14px",color:"#888",marginBottom:"24px"}}>{m.belgeAcik}</p>
                {belgeYukleniyor && (
                  <div style={{background:"#f0eeff",border:"1px solid #534AB7",borderRadius:"8px",padding:"10px 16px",marginBottom:"16px",fontSize:"13px",color:"#534AB7"}}>{m.belgeYukleniyor}</div>
                )}
                <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                  {zorunluBelgeler.map(zb=>{
                    const yuklendi = belgeler.find(b=>b.belge_turu===zb.id);
                    return (
                      <div key={zb.id} style={{background:"#fff",border:`1px solid ${yuklendi?"#059669":"#EEEDFE"}`,borderRadius:"14px",padding:"18px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"4px"}}>
                            <span style={{fontSize:"18px"}}>{yuklendi?"✅":"📋"}</span>
                            <span style={{fontSize:"14px",fontWeight:700,color:"#0f0d2e"}}>{zb.ad}</span>
                            {!yuklendi && <span style={{fontSize:"10px",background:"#fff0f0",color:"#c00",padding:"2px 8px",borderRadius:"10px",fontWeight:600}}>{m.zorunlu}</span>}
                          </div>
                          <p style={{fontSize:"12px",color:"#94a3b8",margin:"0 0 0 28px"}}>{zb.aciklama}</p>
                          {yuklendi && (
                            <div style={{marginTop:"6px",marginLeft:"28px",display:"flex",gap:"12px",alignItems:"center"}}>
                              <a href={yuklendi.belge_url} target="_blank" rel="noreferrer" style={{fontSize:"12px",color:"#534AB7",textDecoration:"none",fontWeight:600}}>{m.goruntule}</a>
                              <span style={{fontSize:"11px",color:"#94a3b8"}}>{new Date(yuklendi.yukleme_tarihi).toLocaleDateString("tr-TR")}</span>
                            </div>
                          )}
                        </div>
                        <div style={{display:"flex",gap:"8px",flexShrink:0}}>
                          <label style={{background:yuklendi?"#f0eeff":"#534AB7",color:yuklendi?"#534AB7":"#fff",padding:"8px 16px",borderRadius:"8px",fontSize:"12px",cursor:"pointer",fontWeight:600}}>
                            {yuklendi ? m.guncelle : m.yukle}
                            <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f)belgeYukle(zb.id,f);}}/>
                          </label>
                          {yuklendi && <button onClick={()=>belgeSil(yuklendi.id)} style={{background:"#fff0f0",color:"#c00",border:"none",padding:"8px 12px",borderRadius:"8px",fontSize:"12px",cursor:"pointer"}}>{m.sil}</button>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{marginTop:"20px",background:"#f0eeff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"14px 18px"}}>
                  <div style={{fontSize:"13px",fontWeight:700,color:"#534AB7",marginBottom:"6px"}}>
                    {belgeler.length}/{zorunluBelgeler.length} belge yüklendi
                  </div>
                  <div style={{background:"#e5e7eb",borderRadius:"6px",height:"8px",overflow:"hidden"}}>
                    <div style={{background:belgeler.length===zorunluBelgeler.length?"#059669":"#534AB7",height:"100%",width:`${(belgeler.length/zorunluBelgeler.length)*100}%`,transition:"width .3s",borderRadius:"6px"}}/>
                  </div>
                  {belgeler.length===zorunluBelgeler.length && <p style={{fontSize:"12px",color:"#059669",marginTop:"8px",fontWeight:600}}>{m.belgeTamamlandi}</p>}
                </div>
              </div>
            )}

            {/* ── MESAJLAR ── */}
            {menu==="mesajlar" && (
              <div>
                <h1 style={{fontSize:"24px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.mesajlarBaslik}</h1>
                <p style={{fontSize:"14px",color:"#888",marginBottom:"24px"}}>{m.mesajlarAcik}</p>
                <a href="/mesajlar" style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#534AB7",color:"#fff",padding:"12px 24px",borderRadius:"10px",fontSize:"14px",textDecoration:"none",fontWeight:600}}>
                  {m.mesajlarGit}
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
