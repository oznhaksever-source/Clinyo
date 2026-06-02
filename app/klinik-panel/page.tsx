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
    hizmetSutun:{ad:"Hizmet",kat:"Kategori",dis:"Diş",fiyat:"Fiyat",islem:"İşlem"},
    pasife:"Pasif",aktife:"Aktif",sil:"Sil",hizmetYok:"Henüz hizmet eklenmemiş.",
    doktorlarBaslik:"Doktorlar",doktorEkleBaslik:"Doktor Ekle",doktorAd:"Ad Soyad",uzmanlik:"Uzmanlık",doktorFoto:"Fotoğraf",doktorEkleBtn:"+ Doktor Ekle",doktorYok:"Henüz doktor eklenmemiş.",
    onceSonraBaslik:"Önce / Sonra Fotoğrafları",yeniEkle:"Yeni Ekle",hizmetAdi:"Hizmet Adı",hizmetAdPlaceholder:"Zirkonyum Kaplama, Saç Ekimi...",
    onceFoto:"Önce Fotoğrafı",sonraFoto:"Sonra Fotoğrafı",ekleBtn:"+ Ekle",onceSonraYok:"Henüz önce/sonra eklenmemiş.",
    disPlani:"🦷 Diş Şeması ile Tedavi Planı",tedaviListesi:"Tedavi Listesi",islem:"işlem",
    tedaviFiyati:"Tedavi Fiyatı (EUR)",aciklamaPlaceholder:"Ek açıklama...",
    otelDahil:"🏨 Otel Dahil",otelAdi:"Otel adı",otelFiyat:"Fiyat (EUR)",
    transferDahil:"🚗 Transfer Dahil",transferAciklama:"Havalimanı-otel vb.",transferFiyat:"Fiyat (EUR)",
    toplam:"Toplam",teklifGonder:"✅ Teklif Gönder",teklifAc:"Teklif Ver →",kapat:"Kapat ↑",
    teklifYok:"Henüz teklif talebi yok",hasta:"Hasta",
    gonderilen:"Gönderilen Teklifler",teklifYokGon:"Henüz teklif gönderilmedi",
    yazdir:"🖨️ Yazdır",mesajlas:"💬 Mesajlaş",
    onaylandiLabel:"✅ Onaylandı",reddedildiLabel:"❌ Reddedildi",beklemede:"⏳ Beklemede",
    belgelerBaslik:"📄 Belgelerim",belgeAcik:"Onay sürecinde incelenecek belgelerinizi yükleyin.",
    zorunlu:"Zorunlu",guncelle:"Güncelle",yukle:"Yükle",goruntule:"📎 Görüntüle",
    belgeYukleniyor:"⏳ Belge yükleniyor...",belgeTamamlandi:"✅ Tüm belgeler yüklendi!",
    mesajlarBaslik:"💬 Mesajlar",mesajlarAcik:"Hastalarla mesajlaşmak için mesajlar sayfasını kullanın.",mesajlarGit:"💬 Mesajlar Sayfasına Git →",
    yukleniyor:"Yükleniyor...",
    profilKaydedildi:"✅ Profil kaydedildi!",kapakYuklendi:"✅ Kapak fotoğrafı yüklendi!",
    hizmetEklendi:"✅ Hizmet eklendi!",doktorEklendi:"✅ Doktor eklendi!",onceSonraEklendi:"✅ Önce/Sonra eklendi!",teklifGonderildi:"✅ Teklif gönderildi!",
    hizmetAdZorunlu:"Hata: Hizmet adı ve fiyat zorunludur!",doktorAdZorunlu:"Hata: Doktor adı zorunludur!",
    fotoZorunlu:"Hata: Önce ve sonra fotoğrafları zorunludur!",fiyatZorunlu:"Hata: Fiyat girilmelidir!",
    silOnay:"Silmek istediğinize emin misiniz?",disHizmetYok:"⚠️ Bu kategori için hizmet yok",menuAc:"Menü",
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
    hizmetSutun:{ad:"Service",kat:"Category",dis:"Chart",fiyat:"Price",islem:"Action"},
    pasife:"Deactivate",aktife:"Activate",sil:"Delete",hizmetYok:"No services added yet.",
    doktorlarBaslik:"Doctors",doktorEkleBaslik:"Add Doctor",doktorAd:"Full Name",uzmanlik:"Specialization",doktorFoto:"Photo",doktorEkleBtn:"+ Add Doctor",doktorYok:"No doctors added yet.",
    onceSonraBaslik:"Before / After Photos",yeniEkle:"Add New",hizmetAdi:"Service Name",hizmetAdPlaceholder:"Zirconia Crown, Hair Transplant...",
    onceFoto:"Before Photo",sonraFoto:"After Photo",ekleBtn:"+ Add",onceSonraYok:"No before/after added yet.",
    disPlani:"🦷 Treatment Plan — Dental Chart",tedaviListesi:"Treatment List",islem:"procedures",
    tedaviFiyati:"Treatment Price (EUR)",aciklamaPlaceholder:"Additional notes...",
    otelDahil:"🏨 Hotel Included",otelAdi:"Hotel name",otelFiyat:"Price (EUR)",
    transferDahil:"🚗 Transfer Included",transferAciklama:"Airport-hotel etc.",transferFiyat:"Price (EUR)",
    toplam:"Total",teklifGonder:"✅ Send Offer",teklifAc:"Make Offer →",kapat:"Close ↑",
    teklifYok:"No quote requests yet",hasta:"Patient",
    gonderilen:"Sent Offers",teklifYokGon:"No offers sent yet",
    yazdir:"🖨️ Print",mesajlas:"💬 Message",
    onaylandiLabel:"✅ Approved",reddedildiLabel:"❌ Rejected",beklemede:"⏳ Pending",
    belgelerBaslik:"📄 My Documents",belgeAcik:"Upload your documents for the approval process.",
    zorunlu:"Required",guncelle:"Update",yukle:"Upload",goruntule:"📎 View",
    belgeYukleniyor:"⏳ Uploading...",belgeTamamlandi:"✅ All documents uploaded!",
    mesajlarBaslik:"💬 Messages",mesajlarAcik:"Use the messages page to communicate with patients.",mesajlarGit:"💬 Go to Messages →",
    yukleniyor:"Loading...",
    profilKaydedildi:"✅ Profile saved!",kapakYuklendi:"✅ Cover photo uploaded!",
    hizmetEklendi:"✅ Service added!",doktorEklendi:"✅ Doctor added!",onceSonraEklendi:"✅ Before/After added!",teklifGonderildi:"✅ Offer sent!",
    hizmetAdZorunlu:"Error: Service name and price are required!",doktorAdZorunlu:"Error: Doctor name is required!",
    fotoZorunlu:"Error: Before and after photos are required!",fiyatZorunlu:"Error: Price is required!",
    silOnay:"Are you sure you want to delete?",disHizmetYok:"⚠️ No service for this category",menuAc:"Menu",
  },
  de:{panel:"Klinikbereich",menu:{ozet:"🏠 Übersicht",profil:"✏️ Profil bearbeiten",hizmetler:"💉 Leistungen",doktorlar:"👨‍⚕️ Ärzte",onceSonra:"📸 Vorher/Nachher",talepler:"📋 Anfragen",tekliflerim:"📤 Angebote",belgeler:"📄 Dokumente",mesajlar:"💬 Nachrichten"},cikis:"Abmelden",onaylandi:"✓ Genehmigt",onayBekliyor:"⏳ Ausstehend",hosgeldin:"Willkommen",panelAcik:"Verwalten Sie Ihr Profil.",onayBekle:"Genehmigung ausstehend",onayBekleAcik:"Konto noch nicht genehmigt.",istatistikler:{hizmet:"Leistungen",doktor:"Ärzte",onceSonra:"Vorher/Nachher",teklif:"Angebote"},profilDuzenle:"Profil bearbeiten",hizmetEkle:"Leistung hinzufügen",doktorEkle:"Arzt hinzufügen",teklifTalepleri:"Angebotsanfragen",kapakFoto:"Titelbild",klinikBilgileri:"Klinikinformationen",tanitimYazisi:"Vorstellung",tanitimPlaceholder:"Kurze Vorstellung...",telefon:"Telefon",website:"Website",adres:"Adresse",googleMaps:"Google Maps URL",sosyalMedya:"Soziale Medien",kaydet:"Speichern",hizmetListesi:"Leistungsliste",yeniHizmet:"Neue Leistung",kategori:"Kategorie",altKategori:"Unterkategorie",listeden:"Aus Liste",ozelAd:"Benutzerdefiniert",ozelAdPlaceholder:"Hier eingeben",fiyat:"Preis",paraBirimi:"Währung",sure:"Dauer",aciklama:"Beschreibung",disSemasi:"Zahnschema",hizmetEkleBtn:"+ Hinzufügen",mevcutHizmetler:"Meine Leistungen",hizmetSutun:{ad:"Leistung",kat:"Kategorie",dis:"Schema",fiyat:"Preis",islem:"Aktion"},pasife:"Deaktivieren",aktife:"Aktivieren",sil:"Löschen",hizmetYok:"Noch keine Leistungen.",doktorlarBaslik:"Ärzte",doktorEkleBaslik:"Arzt hinzufügen",doktorAd:"Vollständiger Name",uzmanlik:"Fachgebiet",doktorFoto:"Foto",doktorEkleBtn:"+ Hinzufügen",doktorYok:"Noch keine Ärzte.",onceSonraBaslik:"Vorher / Nachher",yeniEkle:"Neu",hizmetAdi:"Leistungsname",hizmetAdPlaceholder:"Zirkonkrone...",onceFoto:"Vorher",sonraFoto:"Nachher",ekleBtn:"+ Hinzufügen",onceSonraYok:"Noch keine.",disPlani:"🦷 Behandlungsplan",tedaviListesi:"Behandlungen",islem:"Eingriffe",tedaviFiyati:"Preis (EUR)",aciklamaPlaceholder:"Notizen...",otelDahil:"🏨 Hotel inklusive",otelAdi:"Hotelname",otelFiyat:"Preis (EUR)",transferDahil:"🚗 Transfer inklusive",transferAciklama:"Flughafen-Hotel",transferFiyat:"Preis (EUR)",toplam:"Gesamt",teklifGonder:"✅ Senden",teklifAc:"Angebot →",kapat:"Schließen ↑",teklifYok:"Keine Anfragen",hasta:"Patient",gonderilen:"Gesendete Angebote",teklifYokGon:"Keine Angebote",yazdir:"🖨️ Drucken",mesajlas:"💬 Kontakt",onaylandiLabel:"✅ Genehmigt",reddedildiLabel:"❌ Abgelehnt",beklemede:"⏳ Ausstehend",belgelerBaslik:"📄 Dokumente",belgeAcik:"Dokumente hochladen.",zorunlu:"Pflicht",guncelle:"Aktualisieren",yukle:"Hochladen",goruntule:"📎 Anzeigen",belgeYukleniyor:"⏳ Wird hochgeladen...",belgeTamamlandi:"✅ Alle hochgeladen!",mesajlarBaslik:"💬 Nachrichten",mesajlarAcik:"Nachrichtenseite nutzen.",mesajlarGit:"💬 Zu Nachrichten →",yukleniyor:"Wird geladen...",profilKaydedildi:"✅ Gespeichert!",kapakYuklendi:"✅ Hochgeladen!",hizmetEklendi:"✅ Hinzugefügt!",doktorEklendi:"✅ Hinzugefügt!",onceSonraEklendi:"✅ Hinzugefügt!",teklifGonderildi:"✅ Gesendet!",hizmetAdZorunlu:"Fehler: Pflichtfelder!",doktorAdZorunlu:"Fehler: Name erforderlich!",fotoZorunlu:"Fehler: Fotos erforderlich!",fiyatZorunlu:"Fehler: Preis erforderlich!",silOnay:"Wirklich löschen?",disHizmetYok:"⚠️ Kein Dienst",menuAc:"Menü"},
  ar:{panel:"لوحة العيادة",menu:{ozet:"🏠 نظرة عامة",profil:"✏️ تعديل الملف",hizmetler:"💉 الخدمات",doktorlar:"👨‍⚕️ الأطباء",onceSonra:"📸 قبل/بعد",talepler:"📋 الطلبات",tekliflerim:"📤 العروض",belgeler:"📄 الوثائق",mesajlar:"💬 الرسائل"},cikis:"خروج",onaylandi:"✓ معتمد",onayBekliyor:"⏳ انتظار",hosgeldin:"مرحباً",panelAcik:"إدارة ملفك وخدماتك.",onayBekle:"في انتظار الموافقة",onayBekleAcik:"لم تتم الموافقة بعد.",istatistikler:{hizmet:"خدمات",doktor:"أطباء",onceSonra:"قبل/بعد",teklif:"عروض"},profilDuzenle:"تعديل الملف",hizmetEkle:"إضافة خدمة",doktorEkle:"إضافة طبيب",teklifTalepleri:"طلبات العروض",kapakFoto:"صورة الغلاف",klinikBilgileri:"معلومات العيادة",tanitimYazisi:"نبذة",tanitimPlaceholder:"نبذة عن عيادتك...",telefon:"الهاتف",website:"الموقع",adres:"العنوان",googleMaps:"رابط خرائط Google",sosyalMedya:"التواصل الاجتماعي",kaydet:"حفظ",hizmetListesi:"قائمة الخدمات",yeniHizmet:"إضافة خدمة",kategori:"الفئة",altKategori:"الفئة الفرعية",listeden:"اختر",ozelAd:"اسم مخصص",ozelAdPlaceholder:"اكتب هنا",fiyat:"السعر",paraBirimi:"العملة",sure:"المدة",aciklama:"الوصف",disSemasi:"مخطط الأسنان",hizmetEkleBtn:"+ إضافة",mevcutHizmetler:"خدماتي",hizmetSutun:{ad:"الخدمة",kat:"الفئة",dis:"المخطط",fiyat:"السعر",islem:"إجراء"},pasife:"تعطيل",aktife:"تفعيل",sil:"حذف",hizmetYok:"لا خدمات بعد.",doktorlarBaslik:"الأطباء",doktorEkleBaslik:"إضافة طبيب",doktorAd:"الاسم",uzmanlik:"التخصص",doktorFoto:"صورة",doktorEkleBtn:"+ إضافة",doktorYok:"لا أطباء بعد.",onceSonraBaslik:"قبل / بعد",yeniEkle:"إضافة",hizmetAdi:"اسم الخدمة",hizmetAdPlaceholder:"تاج زركون...",onceFoto:"قبل",sonraFoto:"بعد",ekleBtn:"+ إضافة",onceSonraYok:"لا صور بعد.",disPlani:"🦷 خطة العلاج",tedaviListesi:"العلاجات",islem:"إجراء",tedaviFiyati:"السعر (EUR)",aciklamaPlaceholder:"ملاحظات...",otelDahil:"🏨 فندق",otelAdi:"الفندق",otelFiyat:"السعر (EUR)",transferDahil:"🚗 نقل",transferAciklama:"مطار-فندق",transferFiyat:"السعر (EUR)",toplam:"المجموع",teklifGonder:"✅ إرسال",teklifAc:"عرض →",kapat:"إغلاق ↑",teklifYok:"لا طلبات",hasta:"المريض",gonderilen:"العروض المرسلة",teklifYokGon:"لا عروض",yazdir:"🖨️ طباعة",mesajlas:"💬 رسالة",onaylandiLabel:"✅ موافق",reddedildiLabel:"❌ مرفوض",beklemede:"⏳ انتظار",belgelerBaslik:"📄 الوثائق",belgeAcik:"تحميل الوثائق.",zorunlu:"مطلوب",guncelle:"تحديث",yukle:"تحميل",goruntule:"📎 عرض",belgeYukleniyor:"⏳ جارٍ التحميل...",belgeTamamlandi:"✅ تم تحميل الكل!",mesajlarBaslik:"💬 الرسائل",mesajlarAcik:"استخدم صفحة الرسائل.",mesajlarGit:"💬 الرسائل →",yukleniyor:"جارٍ التحميل...",profilKaydedildi:"✅ تم الحفظ!",kapakYuklendi:"✅ تم التحميل!",hizmetEklendi:"✅ تمت الإضافة!",doktorEklendi:"✅ تمت الإضافة!",onceSonraEklendi:"✅ تمت الإضافة!",teklifGonderildi:"✅ تم الإرسال!",hizmetAdZorunlu:"خطأ: الحقول مطلوبة!",doktorAdZorunlu:"خطأ: الاسم مطلوب!",fotoZorunlu:"خطأ: الصور مطلوبة!",fiyatZorunlu:"خطأ: السعر مطلوب!",silOnay:"هل أنت متأكد؟",disHizmetYok:"⚠️ لا خدمة",menuAc:"القائمة"},
  ru:{panel:"Панель клиники",menu:{ozet:"🏠 Обзор",profil:"✏️ Редактировать",hizmetler:"💉 Услуги",doktorlar:"👨‍⚕️ Врачи",onceSonra:"📸 До/После",talepler:"📋 Запросы",tekliflerim:"📤 Предложения",belgeler:"📄 Документы",mesajlar:"💬 Сообщения"},cikis:"Выйти",onaylandi:"✓ Подтверждено",onayBekliyor:"⏳ Ожидает",hosgeldin:"Добро пожаловать",panelAcik:"Управляйте профилем и услугами.",onayBekle:"Ожидает подтверждения",onayBekleAcik:"Аккаунт ещё не подтверждён.",istatistikler:{hizmet:"Услуги",doktor:"Врачи",onceSonra:"До/После",teklif:"Предложения"},profilDuzenle:"Редактировать",hizmetEkle:"Добавить услугу",doktorEkle:"Добавить врача",teklifTalepleri:"Запросы",kapakFoto:"Фото обложки",klinikBilgileri:"Информация",tanitimYazisi:"Описание",tanitimPlaceholder:"Описание клиники...",telefon:"Телефон",website:"Сайт",adres:"Адрес",googleMaps:"Google Maps URL",sosyalMedya:"Соцсети",kaydet:"Сохранить",hizmetListesi:"Список услуг",yeniHizmet:"Добавить услугу",kategori:"Категория",altKategori:"Подкатегория",listeden:"Выбрать",ozelAd:"Название",ozelAdPlaceholder:"Введите название",fiyat:"Цена",paraBirimi:"Валюта",sure:"Длительность",aciklama:"Описание",disSemasi:"Схема зубов",hizmetEkleBtn:"+ Добавить",mevcutHizmetler:"Мои услуги",hizmetSutun:{ad:"Услуга",kat:"Категория",dis:"Схема",fiyat:"Цена",islem:"Действие"},pasife:"Деактивировать",aktife:"Активировать",sil:"Удалить",hizmetYok:"Услуг ещё нет.",doktorlarBaslik:"Врачи",doktorEkleBaslik:"Добавить врача",doktorAd:"Полное имя",uzmanlik:"Специализация",doktorFoto:"Фото",doktorEkleBtn:"+ Добавить",doktorYok:"Врачей ещё нет.",onceSonraBaslik:"Фото до / после",yeniEkle:"Добавить",hizmetAdi:"Услуга",hizmetAdPlaceholder:"Коронка, пересадка волос...",onceFoto:"До",sonraFoto:"После",ekleBtn:"+ Добавить",onceSonraYok:"Ещё нет.",disPlani:"🦷 План лечения",tedaviListesi:"Лечение",islem:"процедур",tedaviFiyati:"Цена (EUR)",aciklamaPlaceholder:"Заметки...",otelDahil:"🏨 Отель включён",otelAdi:"Название отеля",otelFiyat:"Цена (EUR)",transferDahil:"🚗 Трансфер включён",transferAciklama:"Аэропорт-отель",transferFiyat:"Цена (EUR)",toplam:"Итого",teklifGonder:"✅ Отправить",teklifAc:"Предложить →",kapat:"Закрыть ↑",teklifYok:"Запросов нет",hasta:"Пациент",gonderilen:"Отправленные",teklifYokGon:"Предложений нет",yazdir:"🖨️ Печать",mesajlas:"💬 Написать",onaylandiLabel:"✅ Одобрено",reddedildiLabel:"❌ Отклонено",beklemede:"⏳ В ожидании",belgelerBaslik:"📄 Документы",belgeAcik:"Загрузите документы.",zorunlu:"Обязательно",guncelle:"Обновить",yukle:"Загрузить",goruntule:"📎 Открыть",belgeYukleniyor:"⏳ Загружается...",belgeTamamlandi:"✅ Все загружены!",mesajlarBaslik:"💬 Сообщения",mesajlarAcik:"Используйте страницу сообщений.",mesajlarGit:"💬 К сообщениям →",yukleniyor:"Загрузка...",profilKaydedildi:"✅ Сохранено!",kapakYuklendi:"✅ Загружено!",hizmetEklendi:"✅ Добавлено!",doktorEklendi:"✅ Добавлен!",onceSonraEklendi:"✅ Добавлено!",teklifGonderildi:"✅ Отправлено!",hizmetAdZorunlu:"Ошибка: Поля обязательны!",doktorAdZorunlu:"Ошибка: Имя обязательно!",fotoZorunlu:"Ошибка: Фото обязательны!",fiyatZorunlu:"Ошибка: Цена обязательна!",silOnay:"Удалить?",disHizmetYok:"⚠️ Нет услуги",menuAc:"Меню"},
  fr:{panel:"Espace clinique",menu:{ozet:"🏠 Vue d ensemble",profil:"✏️ Modifier",hizmetler:"💉 Services",doktorlar:"👨‍⚕️ Médecins",onceSonra:"📸 Avant/Après",talepler:"📋 Demandes",tekliflerim:"📤 Offres",belgeler:"📄 Documents",mesajlar:"💬 Messages"},cikis:"Déconnexion",onaylandi:"✓ Approuvé",onayBekliyor:"⏳ En attente",hosgeldin:"Bienvenue",panelAcik:"Gérez votre profil et services.",onayBekle:"En attente d approbation",onayBekleAcik:"Compte pas encore approuvé.",istatistikler:{hizmet:"Services",doktor:"Médecins",onceSonra:"Avant/Après",teklif:"Offres"},profilDuzenle:"Modifier profil",hizmetEkle:"Ajouter service",doktorEkle:"Ajouter médecin",teklifTalepleri:"Demandes de devis",kapakFoto:"Photo couverture",klinikBilgileri:"Informations",tanitimYazisi:"Présentation",tanitimPlaceholder:"Courte présentation...",telefon:"Téléphone",website:"Site web",adres:"Adresse",googleMaps:"URL Google Maps",sosyalMedya:"Réseaux sociaux",kaydet:"Sauvegarder",hizmetListesi:"Liste services",yeniHizmet:"Ajouter service",kategori:"Catégorie",altKategori:"Sous-catégorie",listeden:"Sélectionner",ozelAd:"Nom personnalisé",ozelAdPlaceholder:"Saisir ici",fiyat:"Prix",paraBirimi:"Devise",sure:"Durée",aciklama:"Description",disSemasi:"Schéma dentaire",hizmetEkleBtn:"+ Ajouter",mevcutHizmetler:"Mes services",hizmetSutun:{ad:"Service",kat:"Catégorie",dis:"Schéma",fiyat:"Prix",islem:"Action"},pasife:"Désactiver",aktife:"Activer",sil:"Supprimer",hizmetYok:"Aucun service.",doktorlarBaslik:"Médecins",doktorEkleBaslik:"Ajouter médecin",doktorAd:"Nom complet",uzmanlik:"Spécialité",doktorFoto:"Photo",doktorEkleBtn:"+ Ajouter",doktorYok:"Aucun médecin.",onceSonraBaslik:"Avant / Après",yeniEkle:"Ajouter",hizmetAdi:"Service",hizmetAdPlaceholder:"Couronne zircone...",onceFoto:"Avant",sonraFoto:"Après",ekleBtn:"+ Ajouter",onceSonraYok:"Rien encore.",disPlani:"🦷 Plan traitement",tedaviListesi:"Traitements",islem:"procédures",tedaviFiyati:"Prix (EUR)",aciklamaPlaceholder:"Notes...",otelDahil:"🏨 Hôtel inclus",otelAdi:"Hôtel",otelFiyat:"Prix (EUR)",transferDahil:"🚗 Transfert inclus",transferAciklama:"Aéroport-hôtel",transferFiyat:"Prix (EUR)",toplam:"Total",teklifGonder:"✅ Envoyer",teklifAc:"Offre →",kapat:"Fermer ↑",teklifYok:"Aucune demande",hasta:"Patient",gonderilen:"Offres envoyées",teklifYokGon:"Aucune offre",yazdir:"🖨️ Imprimer",mesajlas:"💬 Message",onaylandiLabel:"✅ Approuvé",reddedildiLabel:"❌ Rejeté",beklemede:"⏳ En attente",belgelerBaslik:"📄 Documents",belgeAcik:"Télécharger documents.",zorunlu:"Obligatoire",guncelle:"Mettre à jour",yukle:"Télécharger",goruntule:"📎 Voir",belgeYukleniyor:"⏳ Chargement...",belgeTamamlandi:"✅ Tous téléchargés!",mesajlarBaslik:"💬 Messages",mesajlarAcik:"Page messages.",mesajlarGit:"💬 Aller aux messages →",yukleniyor:"Chargement...",profilKaydedildi:"✅ Sauvegardé!",kapakYuklendi:"✅ Téléchargé!",hizmetEklendi:"✅ Ajouté!",doktorEklendi:"✅ Ajouté!",onceSonraEklendi:"✅ Ajouté!",teklifGonderildi:"✅ Envoyé!",hizmetAdZorunlu:"Erreur: Champs requis!",doktorAdZorunlu:"Erreur: Nom requis!",fotoZorunlu:"Erreur: Photos requises!",fiyatZorunlu:"Erreur: Prix requis!",silOnay:"Supprimer?",disHizmetYok:"⚠️ Pas de service",menuAc:"Menu"},
};

const TDB_LISTE: Record<string, Record<string, string[]>> = {
  "Teşhis ve Tedavi Planlaması": {"Muayene ve Teşhis":["Dişhekimi Muayenesi","Uzman Dişhekimi Muayenesi","Kontrol Hekim Muayenesi","Konsültasyon","Teşhis ve Tedavi Planlaması","Oral Hijyen Eğitimi","Vitalite Kontrolu (Diş Başına)"],"Radyoloji":["Diş Röntgen Filmi (Periapikal)","Oklüzal Film","Bite-Wing Radyografi","Panaromik Film","Lateral Sefalometrik Film","Tomografi (Bölgesel)","Tomografi (Tek Çene)","Tomografi (İki Çene)"],"Anestezi":["Lokal Anestezi (İnfiltratif)","Lokal Anestezi (Rejyonal)"]},
  "Tedavi ve Endodonti": {"Dolgu":["Amalgam Dolgu (Bir Yüzlü)","Amalgam Dolgu (İki Yüzlü)","Amalgam Dolgu (Üç Yüzlü)","Kompozit Dolgu (Bir Yüzlü)","Kompozit Dolgu (İki Yüzlü)","Kompozit Dolgu (Üç Yüzlü)","Direkt Kompozit Laminate Restorasyonu","Cam İonomer Dolgu","İnley Dolgu (Bir Yüzlü)","İnley Dolgu (İki Yüzlü)","İnley Dolgu (Üç Yüzlü)","Seramik İnley Dolgu (Bir Yüzlü)","Seramik İnley Dolgu (İki Yüzlü)","Seramik İnley Dolgu (Üç Yüzlü)","Onley","Endokron"],"Kanal Tedavisi":["Kanal Tedavisi - Tek Kanal","Kanal Tedavisi - İki Kanal","Kanal Tedavisi - Üç Kanal","Periapikal Lezyonlu Dişte Kanal Tedavisi - Tek Kanal","Kanal Dolgusu Sökümü","Kanal Dolgusu Tekrarı (Retreatment)","Kanal İçi Fiber Post Uygulaması","Kanaldan Kırılmış Materyal Çıkartılması"],"Diş Beyazlatma":["Diş Ağartma (Beyazlatma Vital)","Diş Ağartma (Beyazlatma Devital)","Diş Ağartma (Beyazlatma - Tek Çene)"]},
  "Protez": {"Hareketli Protez":["Tam Protez (Akrilik - Tek Çene)","Bölümlü Protez (Akrilik - Tek Çene)","İmplant Destekli Hareketli Protezler (Tek Çene)","Tamir (Akrilik Protezler)","Diş İlavesi (Tek Diş)"],"Sabit Protez / Kuron":["Tek Parça Döküm Kuron","Veneer Kuron (Seramik)","İmplant Üstü Veneer Kuron (Seramik)","Laminate Veneer Kompozit","Laminate Veneer (Seramik)","Tam Seramik Kuron (Metal Desteksiz)","Zirkonyum Kron","Adeziv Köprü (Maryland)","Geçici Kuron (Tek Diş)","Döküm Post Core (Pivo)"],"Gece Plağı / Splint":["Gece Plağı (Yumuşak)","Gece Plağı (Sert Oklüzal Splintleme)","T.M.E. Stabilizasyon Splinti"]},
  "Ağız-Diş ve Çene Cerrahisi": {"Çekim":["Diş Çekimi","Komplikasyonlu Diş Çekimi","Gömülü Diş Operasyonu","Gömülü Diş Operasyonu (Kemik Retansiyonlu)","Reimplantasyon"],"İmplant Cerrahisi":["Kemik İçi İmplant","Zigoma İmplant","İmplant Çıkartılması"],"Kök Ucu ve Kist":["Tek Kökte Kök Ucu Rezeksiyonu","İki Kökte Kök Ucu Rezeksiyonu","Üç Kökte Kök Ucu Rezeksiyonu","Kist Operasyonu (Küçük)","Kist Operasyonu (1 Cm Büyük)"],"Greft ve Sinüs":["Sert Doku Greftleme","Yumuşak Doku Greftleme","Sinüs Lifting"]},
  "Periodontoloji": {"Temizlik ve Küretaj":["Detartraj (Diş Taşı Temizliği - Tek Çene)","Subgingival Küretaj (Tek Diş)"],"Periodontal Cerrahi":["Gingivoplasti (Tek Diş)","Gingivektomi (Tek Diş)","Flap Operasyonu (Tek Diş)","Frenektomi - Frenetomi","Biyomateryal Uygulaması (Tek Diş)","Membran Uygulaması (Tek Diş)"]},
  "Saç Ekimi": {"FUE":["FUE Saç Ekimi","Safir FUE","DHI Saç Ekimi","Sakal Ekimi","Kaş Ekimi"],"Destek":["PRP Tedavisi","Mezoterapi","Lazer Terapi"]},
  "Göz Ameliyatı": {"Lazer":["Lasik","Lasek","PRK","Smile Pro"],"Lens":["Göz İçi Lens (ICL)","Katarakt Ameliyatı","Multifokal Lens"]},
  "Plastik Cerrahi": {"Yüz":["Burun Estetiği","Kulak Estetiği","Yüz Germe","Göz Kapağı Estetiği"],"Vücut":["Meme Büyütme","Meme Küçültme","Karın Germe","Liposuction"],"Non-Cerrahi":["Botoks","Dolgu (Filler)","PRP Yüz"]},
  "Genel Sağlık": {"Check-Up":["Temel Check-Up","Kapsamlı Check-Up","Kardiyoloji Check-Up"],"Ortopedi":["Diz Protezi","Kalça Protezi","Omurga Cerrahisi"]},
};

const DIS_SEMASI_MAP: Record<string,string> = {
  "Amalgam Dolgu (Bir Yüzlü)":"dolgu","Amalgam Dolgu (İki Yüzlü)":"dolgu","Amalgam Dolgu (Üç Yüzlü)":"dolgu","Kompozit Dolgu (Bir Yüzlü)":"dolgu","Kompozit Dolgu (İki Yüzlü)":"dolgu","Kompozit Dolgu (Üç Yüzlü)":"dolgu","Direkt Kompozit Laminate Restorasyonu":"dolgu","Cam İonomer Dolgu":"dolgu","İnley Dolgu (Bir Yüzlü)":"dolgu","İnley Dolgu (İki Yüzlü)":"dolgu","İnley Dolgu (Üç Yüzlü)":"dolgu","Seramik İnley Dolgu (Bir Yüzlü)":"dolgu","Seramik İnley Dolgu (İki Yüzlü)":"dolgu","Seramik İnley Dolgu (Üç Yüzlü)":"dolgu","Onley":"dolgu","Endokron":"dolgu",
  "Kanal Tedavisi - Tek Kanal":"kanal","Kanal Tedavisi - İki Kanal":"kanal","Kanal Tedavisi - Üç Kanal":"kanal","Periapikal Lezyonlu Dişte Kanal Tedavisi - Tek Kanal":"kanal","Kanal Dolgusu Sökümü":"kanal","Kanal Dolgusu Tekrarı (Retreatment)":"kanal","Kanal İçi Fiber Post Uygulaması":"kanal","Kanaldan Kırılmış Materyal Çıkartılması":"kanal","Subgingival Küretaj (Tek Diş)":"kanal",
  "Veneer Kuron (Seramik)":"kaplama","İmplant Üstü Veneer Kuron (Seramik)":"kaplama","Laminate Veneer Kompozit":"kaplama","Laminate Veneer (Seramik)":"kaplama","Tam Seramik Kuron (Metal Desteksiz)":"kaplama","Zirkonyum Kron":"kaplama","Tek Parça Döküm Kuron":"kaplama","Diş Ağartma (Beyazlatma Vital)":"kaplama","Diş Ağartma (Beyazlatma Devital)":"kaplama","Diş Ağartma (Beyazlatma - Tek Çene)":"kaplama",
  "Diş Çekimi":"cekim","Komplikasyonlu Diş Çekimi":"cekim","Gömülü Diş Operasyonu":"cekim","Gömülü Diş Operasyonu (Kemik Retansiyonlu)":"cekim",
  "Kemik İçi İmplant":"implant","Zigoma İmplant":"implant",
  "Adeziv Köprü (Maryland)":"kopru",
  "Kist Operasyonu (Küçük)":"lezyon","Kist Operasyonu (1 Cm Büyük)":"lezyon","Tek Kökte Kök Ucu Rezeksiyonu":"lezyon","İki Kökte Kök Ucu Rezeksiyonu":"lezyon","Üç Kökte Kök Ucu Rezeksiyonu":"lezyon",
  "Sinüs Lifting":"yok","Sert Doku Greftleme":"yok","Yumuşak Doku Greftleme":"yok","Gingivoplasti (Tek Diş)":"yok","Gingivektomi (Tek Diş)":"yok","Flap Operasyonu (Tek Diş)":"yok","Frenektomi - Frenetomi":"yok","Detartraj (Diş Taşı Temizliği - Tek Çene)":"yok",
};

const BELGE_TURLERI = [
  {id:"saglik_bakanligi",ad:"Sağlık Bakanlığı Yetki Belgesi",aciklama:"Uluslararası Sağlık Turizmi Yetki Belgesi"},
  {id:"faaliyet_ruhsati",ad:"Faaliyet Ruhsatı",aciklama:"Sağlık tesisi açma ve çalışma ruhsatı"},
  {id:"hekim_sertifikasi",ad:"Sorumlu Hekim Sertifikası",aciklama:"Uzman doktor sertifikası ve diploması"},
  {id:"sigorta_policesi",ad:"Sigorta Poliçesi",aciklama:"Zorunlu mesleki sorumluluk sigortası"},
  {id:"vergi_levhasi",ad:"Vergi Levhası",aciklama:"Güncel vergi levhası"},
  {id:"ticaret_sicil",ad:"Ticaret Sicil Belgesi",aciklama:"Güncel ticaret sicil gazetesi"},
];

const inp: React.CSSProperties = {width:"100%",border:"1px solid #e5e7eb",borderRadius:"8px",padding:"9px 12px",fontSize:"13px",outline:"none",boxSizing:"border-box"};
const lbl: React.CSSProperties = {fontSize:"12px",color:"#888",display:"block",marginBottom:"4px"};
const kart: React.CSSProperties = {background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"20px",marginBottom:"16px"};

const SIDEBAR_W = 230;

export default function KlinikPanel() {
  const supabase = createClient();
  const { dil, dilDegistir } = useDil();
  const m = M[dil as keyof typeof M] || M.en;
  const [menu, setMenu] = useState("ozet");
  const [sidebarAcik, setSidebarAcik] = useState(false);
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
  const [mobil, setMobil] = useState(false);
  const [profil, setProfil] = useState({tanitim_yazisi:"",telefon:"",website:"",instagram:"",facebook:"",twitter:"",google_maps_url:"",konum_adres:""});
  const [yeniHizmet, setYeniHizmet] = useState({kategori:Object.keys(TDB_LISTE)[0],alt_kategori:Object.keys(Object.values(TDB_LISTE)[0])[0],hizmet_adi:"",aciklama:"",fiyat:"",para_birimi:"EUR",sure:"",dis_semasi_kategori:"yok"});
  const [yeniDoktor, setYeniDoktor] = useState({ad:"",uzmanlik:"",aciklama:"",fotograf_url:""});
  const [yeniOS, setYeniOS] = useState({hizmet_adi:"",once_fotograf:"",sonra_fotograf:"",aciklama:""});
  const [teklifFormlar, setTeklifFormlar] = useState<Record<string,any>>({});
  const [disPlanMap, setDisPlanMap] = useState<Record<string,Record<number,string[]>>>({});
  const [disTedaviMap, setDisTedaviMap] = useState<Record<string,{dis:number,hizmet_adi:string,fiyat:number,kategori:string}[]>>({});
  const [acikTalep, setAcikTalep] = useState<string|null>(null);
  const [onayModal, setOnayModal] = useState<string|null>(null);
  const [onayKutular, setOnayKutular] = useState<Record<number,boolean>>({});

  useEffect(()=>{
    veriYukle();
    const kontrol = () => setMobil(window.innerWidth <= 768);
    kontrol();
    window.addEventListener("resize", kontrol);
    return () => window.removeEventListener("resize", kontrol);
  },[]);

  async function veriYukle() {
    setYukleniyor(true);
    const {data:{user}} = await supabase.auth.getUser();
    if (!user) {window.location.href="/giris";return;}
    const {data:p} = await supabase.from("profiles").select("*").eq("id",user.id).single();
    setKullanici(p);
    if (p) setProfil({tanitim_yazisi:p.tanitim_yazisi||"",telefon:p.telefon||"",website:p.website||"",instagram:p.instagram||"",facebook:p.facebook||"",twitter:p.twitter||"",google_maps_url:p.google_maps_url||"",konum_adres:p.konum_adres||""});
    const [talepRes,teklifRes,hizmetRes,doktorRes,osRes,belgeRes] = await Promise.all([
      supabase.from("talepler").select("*,profiles!talepler_hasta_id_fkey(ad,soyad,email)").eq("klinik_id",user.id).order("olusturma_tarihi",{ascending:false}),
      supabase.from("teklifler").select("*,talepler(tedavi_turu)").eq("klinik_id",user.id).order("olusturma_tarihi",{ascending:false}),
      supabase.from("klinik_hizmetler").select("*").eq("klinik_id",user.id).order("kategori"),
      supabase.from("doktorlar").select("*").eq("klinik_id",user.id),
      supabase.from("once_sonra").select("*").eq("klinik_id",user.id),
      supabase.from("belgeler").select("*").eq("kullanici_id",user.id),
    ]);
    setTalepler(talepRes.data||[]);setTeklifler(teklifRes.data||[]);setHizmetler(hizmetRes.data||[]);setDoktorlar(doktorRes.data||[]);setOnceSonralar(osRes.data||[]);setBelgeler(belgeRes.data||[]);
    setYukleniyor(false);
  }

  async function fotografYukle(file:File,klasor:string) {
    const {data:{user}} = await supabase.auth.getUser();
    const ad=`${user?.id}/${klasor}/${Date.now()}_${file.name}`;
    const {error} = await supabase.storage.from("medoqa-images").upload(ad,file);
    if (error) return null;
    const {data:url} = supabase.storage.from("medoqa-images").getPublicUrl(ad);
    return url.publicUrl;
  }

  function mesajGoster(msg:string){setMesaj(msg);setTimeout(()=>setMesaj(""),3000);}
  function menuSec(id:string){setMenu(id);setSidebarAcik(false);}

  async function profilKaydet(){const {data:{user}} = await supabase.auth.getUser();const {error} = await supabase.from("profiles").update(profil).eq("id",user?.id);if(error)mesajGoster("Hata: "+error.message);else{mesajGoster(m.profilKaydedildi);veriYukle();}}
  async function kapakFotoYukle(file:File){const url=await fotografYukle(file,"kapak");if(url){const {data:{user}} = await supabase.auth.getUser();await supabase.from("profiles").update({kapak_fotograf:url}).eq("id",user?.id);veriYukle();mesajGoster(m.kapakYuklendi);}}
  async function hizmetEkle(){if(!yeniHizmet.hizmet_adi||!yeniHizmet.fiyat){mesajGoster(m.hizmetAdZorunlu);return;}const {data:{user}} = await supabase.auth.getUser();await supabase.from("klinik_hizmetler").insert({klinik_id:user?.id,kategori:yeniHizmet.kategori,alt_kategori:yeniHizmet.alt_kategori,hizmet_adi:yeniHizmet.hizmet_adi,aciklama:yeniHizmet.aciklama,fiyat:parseFloat(yeniHizmet.fiyat),para_birimi:yeniHizmet.para_birimi,sure:yeniHizmet.sure,dis_semasi_kategori:yeniHizmet.dis_semasi_kategori});mesajGoster(m.hizmetEklendi);const ilkKat=Object.keys(TDB_LISTE)[0];const ilkAlt=Object.keys(TDB_LISTE[ilkKat])[0];setYeniHizmet({kategori:ilkKat,alt_kategori:ilkAlt,hizmet_adi:"",aciklama:"",fiyat:"",para_birimi:"EUR",sure:"",dis_semasi_kategori:"yok"});veriYukle();}
  async function hizmetSil(id:string){if(!confirm(m.silOnay))return;await supabase.from("klinik_hizmetler").delete().eq("id",id);veriYukle();}
  async function hizmetToggle(id:string,aktif:boolean){await supabase.from("klinik_hizmetler").update({aktif:!aktif}).eq("id",id);veriYukle();}
  async function doktorEkle(){if(!yeniDoktor.ad){mesajGoster(m.doktorAdZorunlu);return;}const {data:{user}} = await supabase.auth.getUser();await supabase.from("doktorlar").insert({klinik_id:user?.id,...yeniDoktor});mesajGoster(m.doktorEklendi);setYeniDoktor({ad:"",uzmanlik:"",aciklama:"",fotograf_url:""});veriYukle();}
  async function doktorSil(id:string){if(!confirm(m.silOnay))return;await supabase.from("doktorlar").delete().eq("id",id);veriYukle();}
  async function osEkle(){if(!yeniOS.once_fotograf||!yeniOS.sonra_fotograf){mesajGoster(m.fotoZorunlu);return;}const {data:{user}} = await supabase.auth.getUser();await supabase.from("once_sonra").insert({klinik_id:user?.id,...yeniOS});mesajGoster(m.onceSonraEklendi);setYeniOS({hizmet_adi:"",once_fotograf:"",sonra_fotograf:"",aciklama:""});veriYukle();}
  async function osSil(id:string){await supabase.from("once_sonra").delete().eq("id",id);veriYukle();}
  async function cikisYap(){await supabase.auth.signOut();window.location.href="/giris";}

  function disPlanHesapla(talepId:string,plan:Record<number,string[]>){
    setDisPlanMap(prev=>({...prev,[talepId]:plan}));
    const detaylar:{dis:number,hizmet_adi:string,fiyat:number,kategori:string}[]=[];
    Object.entries(plan).forEach(([no,kategoriler])=>{kategoriler.forEach(kat=>{if(['eksik','lezyon','kirik','cokmus'].includes(kat))return;const eslesenler=hizmetler.filter(h=>h.aktif&&h.dis_semasi_kategori===kat);if(eslesenler.length>0){const hizmet=eslesenler.sort((a,b)=>a.fiyat-b.fiyat)[0];detaylar.push({dis:Number(no),hizmet_adi:hizmet.hizmet_adi,fiyat:hizmet.fiyat,kategori:kat});}else if(kat!=='yok'){detaylar.push({dis:Number(no),hizmet_adi:`${kat} (fiyat girilmedi)`,fiyat:0,kategori:kat});}});});
    setDisTedaviMap(prev=>({...prev,[talepId]:detaylar}));
    const toplam=detaylar.reduce((s,d)=>s+d.fiyat,0);
    setTeklifFormlar(prev=>({...prev,[talepId]:{...(prev[talepId]||{otel_dahil:false,otel_aciklama:"",otel_fiyat:"",transfer_dahil:false,transfer_aciklama:"",transfer_fiyat:"",aciklama:""}),fiyat:toplam.toString()}}));
  }

  function getTeklifForm(talepId:string){return teklifFormlar[talepId]||{fiyat:"",aciklama:"",otel_dahil:false,otel_aciklama:"",otel_fiyat:"",transfer_dahil:false,transfer_aciklama:"",transfer_fiyat:""};}
  function setTeklifForm(talepId:string,data:any){setTeklifFormlar(prev=>({...prev,[talepId]:{...getTeklifForm(talepId),...data}}));}
  function teklifOnayAc(talepId:string){const form=getTeklifForm(talepId);if(!form.fiyat){mesajGoster(m.fiyatZorunlu);return;}setOnayKutular({});setOnayModal(talepId);}

  async function teklifGonder(talepId:string){
    const form=getTeklifForm(talepId);
    if(!form.fiyat){mesajGoster(m.fiyatZorunlu);return;}
    const {data:{user}} = await supabase.auth.getUser();
    const tedaviFiyat=parseFloat(form.fiyat)||0;
    const otelFiyat=form.otel_dahil?(parseFloat(form.otel_fiyat)||0):0;
    const transferFiyat=form.transfer_dahil?(parseFloat(form.transfer_fiyat)||0):0;
    const toplamFiyat=tedaviFiyat+otelFiyat+transferFiyat;
    const disTedaviler=disTedaviMap[talepId]||[];
    const tedaviAciklama=disTedaviler.length>0?disTedaviler.map(d=>`Diş ${d.dis}: ${d.hizmet_adi}`).join(", "):form.aciklama;
    const {error} = await supabase.from("teklifler").insert({talep_id:talepId,klinik_id:user?.id,fiyat:tedaviFiyat,para_birimi:"EUR",aciklama:tedaviAciklama,durum:"beklemede",otel_dahil:form.otel_dahil,otel_aciklama:form.otel_aciklama,otel_fiyat:otelFiyat,transfer_dahil:form.transfer_dahil,transfer_aciklama:form.transfer_aciklama,transfer_fiyat:transferFiyat,toplam_fiyat:toplamFiyat,transfer_gerekli:!form.transfer_dahil});
    if(error){mesajGoster("Hata: "+error.message);return;}
    const talep=talepler.find(t=>t.id===talepId);
    if(talep?.profiles?.email){await fetch("/api/bildirim-gonder",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tip:"teklif_gonderildi",hasta_email:talep.profiles.email,hasta_ad:talep.profiles.ad,klinik_ad:`${kullanici?.ad} ${kullanici?.soyad}`,tedavi:talep.tedavi_turu,fiyat:form.fiyat,para_birimi:"EUR"})});}
    mesajGoster(m.teklifGonderildi);
    setTalepler(prev=>prev.filter((t:any)=>t.id!==talepId));
    setTeklifFormlar(prev=>{const y={...prev};delete y[talepId];return y;});
    setDisPlanMap(prev=>{const y={...prev};delete y[talepId];return y;});
    setDisTedaviMap(prev=>{const y={...prev};delete y[talepId];return y;});
    setAcikTalep(null);veriYukle();
  }

  async function belgeYukle(belge_turu:string,file:File){
    setBelgeYukleniyor(true);
    const {data:{user}} = await supabase.auth.getUser();
    if(!user){mesajGoster("Hata: Oturum bulunamadı!");setBelgeYukleniyor(false);return;}
    const ad=`belgeler/${user.id}/${belge_turu}_${Date.now()}_${file.name}`;
    const {error:upErr} = await supabase.storage.from("medoqa-images").upload(ad,file,{upsert:true});
    if(upErr){mesajGoster("Hata: "+upErr.message);setBelgeYukleniyor(false);return;}
    const {data:urlData} = supabase.storage.from("medoqa-images").getPublicUrl(ad);
    const mevcut=belgeler.find(b=>b.belge_turu===belge_turu);
    if(mevcut){await supabase.from("belgeler").update({belge_url:urlData.publicUrl,yukleme_tarihi:new Date().toISOString()}).eq("id",mevcut.id);}
    else{await supabase.from("belgeler").insert({kullanici_id:user.id,belge_turu,belge_url:urlData.publicUrl});}
    mesajGoster("✅ Belge yüklendi!");veriYukle();setBelgeYukleniyor(false);
  }

  async function belgeSil(id:string){await supabase.from("belgeler").delete().eq("id",id);veriYukle();}

  function teklifYazdir(t:any){
    const w=window.open("","_blank");if(!w)return;
    w.document.write(`<html><head><title>Teklif</title><style>body{font-family:Arial,sans-serif;max-width:600px;margin:40px auto;padding:20px}.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee}@media print{button{display:none}}</style></head><body><h1 style="color:#534AB7">medoqa</h1><h2>Teklif Detayı</h2><div class="row"><span>Tedavi</span><strong>${t.talepler?.tedavi_turu||"-"}</strong></div><div class="row"><span>Fiyat</span><strong>${t.fiyat} EUR</strong></div>${t.otel_dahil?`<div class="row"><span>Otel</span><strong>${t.otel_fiyat} EUR</strong></div>`:""}<div style="text-align:center;margin-top:24px"><button onclick="window.print()" style="background:#534AB7;color:#fff;border:none;padding:10px 24px;border-radius:8px;cursor:pointer">Yazdır</button></div></body></html>`);
    w.document.close();
  }

  const altKategoriler=Object.keys(TDB_LISTE[yeniHizmet.kategori]||{});
  const hizmetListesi=(TDB_LISTE[yeniHizmet.kategori]||{})[yeniHizmet.alt_kategori]||[];

  // Responsive grid
  const g2: React.CSSProperties = {display:"grid",gridTemplateColumns:mobil?"1fr":"1fr 1fr",gap:"10px",marginBottom:"10px"};
  const g3: React.CSSProperties = {display:"grid",gridTemplateColumns:mobil?"1fr 1fr":"1fr 1fr 1fr",gap:"10px"};
  const g4: React.CSSProperties = {display:"grid",gridTemplateColumns:mobil?"1fr 1fr":"repeat(4,1fr)",gap:"12px",marginBottom:"24px"};

  return (
    <main style={{minHeight:"100vh",background:"#f9fafb",fontFamily:"sans-serif",display:"flex",flexDirection:"column"}}>

      {/* Onay Modali */}
      {onayModal && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
          <div style={{background:"#fff",borderRadius:"16px",width:"100%",maxWidth:"520px",maxHeight:"90vh",overflow:"auto"}}>
            <div style={{background:"#12103a",borderRadius:"16px 16px 0 0",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:"16px",fontWeight:700,color:"#fff"}}>📋 Teklif Onayı</div>
              <button onClick={()=>setOnayModal(null)} style={{background:"rgba(255,255,255,.15)",border:"none",color:"#fff",width:"28px",height:"28px",borderRadius:"50%",cursor:"pointer",fontSize:"16px"}}>×</button>
            </div>
            <div style={{padding:"20px"}}>
              {["Tedavi planı ve fiyat bilgilerinin doğru olduğunu onaylıyorum.","Ek işlem gerektiğinde hastayı platform üzerinden bilgilendireceğimi taahhüt ediyorum.","Platform dışı ödeme talep etmeyeceğimi kabul ediyorum.","Medoqa kalite standartlarına uymayı taahhüt ediyorum.","Bu teklifin bir kopyasının Medoqa'ya iletileceğini anlıyorum."].map((madde,i)=>(
                <label key={i} onClick={()=>setOnayKutular(prev=>({...prev,[i]:!prev[i]}))} style={{display:"flex",alignItems:"flex-start",gap:"10px",marginBottom:"12px",cursor:"pointer",padding:"10px",borderRadius:"8px",background:onayKutular[i]?"#f0fff4":"#f9fafb",border:`1px solid ${onayKutular[i]?"#059669":"#e5e7eb"}`}}>
                  <div style={{width:"20px",height:"20px",borderRadius:"4px",border:`2px solid ${onayKutular[i]?"#059669":"#cbd5e1"}`,background:onayKutular[i]?"#059669":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {onayKutular[i]&&<span style={{color:"#fff",fontSize:"12px",fontWeight:700}}>✓</span>}
                  </div>
                  <span style={{fontSize:"13px",color:"#444",lineHeight:1.5}}>{madde}</span>
                </label>
              ))}
              <div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
                <button onClick={()=>setOnayModal(null)} style={{flex:1,background:"#f9fafb",color:"#555",border:"1px solid #e5e7eb",padding:"10px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>İptal</button>
                <button disabled={Object.values(onayKutular).filter(Boolean).length<5} onClick={()=>{setOnayModal(null);teklifGonder(onayModal!);}} style={{flex:2,background:Object.values(onayKutular).filter(Boolean).length<5?"#e5e7eb":"#059669",color:Object.values(onayKutular).filter(Boolean).length<5?"#aaa":"#fff",border:"none",padding:"10px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:600}}>
                  {Object.values(onayKutular).filter(Boolean).length<5?`${Object.values(onayKutular).filter(Boolean).length}/5`:"✅ Teklifi Gönder"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobil overlay */}
      {sidebarAcik && <div onClick={()=>setSidebarAcik(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:999}}/>}

      <div style={{display:"flex",flex:1}}>
        {/* Sidebar */}
        <aside style={{
          width:`${SIDEBAR_W}px`,
          background:"#12103a",
          display:"flex",
          flexDirection:"column",
          padding:"24px 0",
          flexShrink:0,
          height:"100vh",
          overflowY:"auto",
          position:"fixed",
          left:0,
          top:0,
          zIndex:1000,
          transform: mobil ? (sidebarAcik ? "translateX(0)" : `translateX(-${SIDEBAR_W}px)`) : "translateX(0)",
          transition:"transform .3s",
        }}>
          <div style={{padding:"0 20px 16px",borderBottom:"1px solid #1e1b4b",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <a href="/" style={{fontSize:"20px",fontWeight:700,color:"#fff",textDecoration:"none"}}>med<span style={{color:"#7F77DD",fontWeight:300}}>oqa</span></a>
            {mobil && <button onClick={()=>setSidebarAcik(false)} style={{background:"none",border:"none",color:"#7F77DD",fontSize:"20px",cursor:"pointer"}}>×</button>}
          </div>
          {kullanici&&(<div style={{padding:"12px 20px",borderBottom:"1px solid #1e1b4b"}}>
            <div style={{width:"32px",height:"32px",background:"#185FA5",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"13px",marginBottom:"6px"}}>{kullanici.ad?.[0]?.toUpperCase()||"K"}</div>
            <div style={{fontSize:"13px",fontWeight:600,color:"#fff"}}>{kullanici.ad} {kullanici.soyad}</div>
            <div style={{fontSize:"11px",color:kullanici.onaylandi?"#7F77DD":"#BA7517",marginTop:"2px"}}>{kullanici.onaylandi?m.onaylandi:m.onayBekliyor}</div>
          </div>)}
          <div style={{padding:"8px 16px",borderBottom:"1px solid #1e1b4b",display:"flex",gap:"4px",flexWrap:"wrap"}}>
            {(["tr","en","de","ar","ru","fr"] as const).map(d=>(<span key={d} onClick={()=>dilDegistir(d)} style={{fontSize:"10px",padding:"3px 6px",border:`1px solid ${dil===d?"#534AB7":"#2a2a4e"}`,borderRadius:"4px",color:dil===d?"#7F77DD":"#aab4c8",cursor:"pointer",textTransform:"uppercase"}}>{d}</span>))}
          </div>
          <nav style={{padding:"12px 12px",flex:1}}>
            {Object.entries(m.menu).map(([id,ad])=>(<div key={id} onClick={()=>menuSec(id)} style={{padding:"9px 12px",borderRadius:"8px",cursor:"pointer",marginBottom:"3px",background:menu===id?"#534AB7":"transparent",color:menu===id?"#fff":"#8b8fc8",fontSize:"13px"}}>{ad as string}</div>))}
          </nav>
          <div style={{padding:"0 12px 20px"}}><button onClick={cikisYap} style={{width:"100%",padding:"10px",background:"transparent",border:"1px solid #2a2a4e",borderRadius:"8px",color:"#8b8fc8",fontSize:"13px",cursor:"pointer"}}>{m.cikis}</button></div>
        </aside>

        {/* İçerik — her zaman sidebar genişliği kadar sol margin */}
        <div style={{
          marginLeft: mobil ? 0 : `${SIDEBAR_W}px`,
          flex:1,
          display:"flex",
          flexDirection:"column",
          minHeight:"100vh",
        }}>
          {/* Mobil üst bar */}
          {mobil && (
            <div style={{position:"sticky",top:0,zIndex:100,background:"#12103a",padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <a href="/" style={{fontSize:"18px",fontWeight:700,color:"#fff",textDecoration:"none"}}>med<span style={{color:"#7F77DD",fontWeight:300}}>oqa</span></a>
              <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                <span style={{fontSize:"12px",color:"#8b8fc8"}}>{m.menu[menu as keyof typeof m.menu]}</span>
                <button onClick={()=>setSidebarAcik(true)} style={{background:"#1e1b4b",border:"none",color:"#fff",padding:"8px 12px",borderRadius:"8px",cursor:"pointer",fontSize:"13px"}}>☰ {m.menuAc}</button>
              </div>
            </div>
          )}

          <div style={{padding: mobil ? "16px" : "28px", flex:1}}>
            {mesaj&&(<div style={{background:mesaj.includes("Hata")?"#fff0f0":"#f0fff4",border:`1px solid ${mesaj.includes("Hata")?"#fcc":"#9f9"}`,borderRadius:"8px",padding:"10px 16px",marginBottom:"16px",fontSize:"13px",color:mesaj.includes("Hata")?"#c00":"#0a7a3a"}}>{mesaj}</div>)}

            {yukleniyor?(<div style={{textAlign:"center",padding:"64px",color:"#888"}}>{m.yukleniyor}</div>):(
              <>
                {kullanici&&!kullanici.onaylandi&&(<div style={{background:"#fff8e1",border:"1px solid #f0c040",borderRadius:"12px",padding:"14px",marginBottom:"20px"}}><div style={{fontSize:"14px",fontWeight:700,color:"#BA7517"}}>⏳ {m.onayBekle}</div><div style={{fontSize:"13px",color:"#666",marginTop:"4px"}}>{m.onayBekleAcik}</div></div>)}

                {menu==="ozet"&&(<div>
                  <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"6px"}}>{m.hosgeldin}, {kullanici?.ad}! 👋</h1>
                  <p style={{fontSize:"13px",color:"#888",marginBottom:"24px"}}>{m.panelAcik}</p>
                  <div style={g4}>
                    {[{l:m.istatistikler.hizmet,v:hizmetler.length,c:"#534AB7"},{l:m.istatistikler.doktor,v:doktorlar.length,c:"#185FA5"},{l:m.istatistikler.onceSonra,v:onceSonralar.length,c:"#7F77DD"},{l:m.istatistikler.teklif,v:teklifler.length,c:"#059669"}].map(k=>(<div key={k.l} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"16px"}}><div style={{fontSize:"24px",fontWeight:700,color:k.c}}>{k.v}</div><div style={{fontSize:"12px",color:"#888",marginTop:"4px"}}>{k.l}</div></div>))}
                  </div>
                  <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                    {[{id:"profil",l:m.profilDuzenle},{id:"hizmetler",l:m.hizmetEkle},{id:"doktorlar",l:m.doktorEkle},{id:"talepler",l:m.teklifTalepleri}].map(b=>(<button key={b.id} onClick={()=>menuSec(b.id)} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 16px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>{b.l}</button>))}
                  </div>
                </div>)}

                {menu==="profil"&&(<div>
                  <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"20px"}}>{m.profilDuzenle}</h1>
                  <div style={kart}>
                    <h2 style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"12px"}}>{m.kapakFoto}</h2>
                    {kullanici?.kapak_fotograf&&<img src={kullanici.kapak_fotograf} alt="Kapak" style={{width:"100%",maxHeight:"180px",objectFit:"cover",borderRadius:"8px",marginBottom:"10px"}}/>}
                    <input type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0];if(f)kapakFotoYukle(f);}} style={inp}/>
                  </div>
                  <div style={kart}>
                    <h2 style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"12px"}}>{m.klinikBilgileri}</h2>
                    <div style={{marginBottom:"10px"}}><label style={lbl}>{m.tanitimYazisi}</label><textarea rows={3} value={profil.tanitim_yazisi} onChange={e=>setProfil({...profil,tanitim_yazisi:e.target.value})} style={{...inp,resize:"none"}}/></div>
                    <div style={g2}>
                      <div><label style={lbl}>{m.telefon}</label><input type="text" value={profil.telefon} onChange={e=>setProfil({...profil,telefon:e.target.value})} style={inp}/></div>
                      <div><label style={lbl}>{m.website}</label><input type="text" value={profil.website} onChange={e=>setProfil({...profil,website:e.target.value})} style={inp}/></div>
                    </div>
                    <div style={{marginBottom:"10px"}}><label style={lbl}>{m.adres}</label><input type="text" value={profil.konum_adres} onChange={e=>setProfil({...profil,konum_adres:e.target.value})} style={inp}/></div>
                    <div style={{marginBottom:"10px"}}><label style={lbl}>{m.googleMaps}</label><input type="text" value={profil.google_maps_url} onChange={e=>setProfil({...profil,google_maps_url:e.target.value})} style={inp}/></div>
                  </div>
                  <div style={kart}>
                    <h2 style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"12px"}}>{m.sosyalMedya}</h2>
                    <div style={g3}>
                      <div><label style={lbl}>Instagram</label><input type="text" value={profil.instagram} onChange={e=>setProfil({...profil,instagram:e.target.value})} style={inp}/></div>
                      <div><label style={lbl}>Facebook</label><input type="text" value={profil.facebook} onChange={e=>setProfil({...profil,facebook:e.target.value})} style={inp}/></div>
                      <div><label style={lbl}>Twitter/X</label><input type="text" value={profil.twitter} onChange={e=>setProfil({...profil,twitter:e.target.value})} style={inp}/></div>
                    </div>
                  </div>
                  <button onClick={profilKaydet} style={{background:"#534AB7",color:"#fff",border:"none",padding:"12px 28px",borderRadius:"8px",fontSize:"14px",cursor:"pointer",fontWeight:600,width:"100%"}}>{m.kaydet}</button>
                </div>)}

                {menu==="hizmetler"&&(<div>
                  <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"20px"}}>{m.hizmetListesi}</h1>
                  <div style={kart}>
                    <h2 style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"12px"}}>{m.yeniHizmet}</h2>
                    <div style={g2}>
                      <div><label style={lbl}>{m.kategori}</label><select value={yeniHizmet.kategori} onChange={e=>{const kat=e.target.value;const altlar=Object.keys(TDB_LISTE[kat]||{});setYeniHizmet({...yeniHizmet,kategori:kat,alt_kategori:altlar[0]||"",hizmet_adi:""});}} style={{...inp,background:"#fff"}}>{Object.keys(TDB_LISTE).map(k=><option key={k}>{k}</option>)}</select></div>
                      <div><label style={lbl}>{m.altKategori}</label><select value={yeniHizmet.alt_kategori} onChange={e=>setYeniHizmet({...yeniHizmet,alt_kategori:e.target.value,hizmet_adi:""})} style={{...inp,background:"#fff"}}>{altKategoriler.map(k=><option key={k}>{k}</option>)}</select></div>
                    </div>
                    <div style={g2}>
                      <div><label style={lbl}>{m.listeden}</label><select value={yeniHizmet.hizmet_adi} onChange={e=>{const ad=e.target.value;const disCat=DIS_SEMASI_MAP[ad]||"yok";setYeniHizmet({...yeniHizmet,hizmet_adi:ad,dis_semasi_kategori:disCat});}} style={{...inp,background:"#fff"}}><option value="">Seçin...</option>{hizmetListesi.map((h:string)=><option key={h}>{h}</option>)}</select></div>
                      <div><label style={lbl}>{m.ozelAd}</label><input type="text" placeholder={m.ozelAdPlaceholder} value={yeniHizmet.hizmet_adi} onChange={e=>setYeniHizmet({...yeniHizmet,hizmet_adi:e.target.value})} style={inp}/></div>
                    </div>
                    <div style={g2}>
                      <div><label style={lbl}>{m.fiyat} *</label><input type="number" placeholder="0" value={yeniHizmet.fiyat} onChange={e=>setYeniHizmet({...yeniHizmet,fiyat:e.target.value})} style={inp}/></div>
                      <div><label style={lbl}>{m.paraBirimi}</label><select value={yeniHizmet.para_birimi} onChange={e=>setYeniHizmet({...yeniHizmet,para_birimi:e.target.value})} style={{...inp,background:"#fff"}}><option>EUR</option><option>USD</option><option>TRY</option><option>GBP</option></select></div>
                    </div>
                    <div style={g2}>
                      <div><label style={lbl}>{m.sure}</label><input type="text" value={yeniHizmet.sure} onChange={e=>setYeniHizmet({...yeniHizmet,sure:e.target.value})} style={inp}/></div>
                      <div><label style={lbl}>{m.disSemasi}</label><select value={yeniHizmet.dis_semasi_kategori} onChange={e=>setYeniHizmet({...yeniHizmet,dis_semasi_kategori:e.target.value})} style={{...inp,background:"#fff"}}><option value="yok">Görsel yok</option><option value="dolgu">Dolgu</option><option value="kanal">Kanal</option><option value="kaplama">Kaplama</option><option value="cekim">Çekim</option><option value="implant">İmplant</option><option value="kopru">Köprü</option><option value="lezyon">Lezyon</option><option value="eksik">Eksik</option></select></div>
                    </div>
                    <div style={{marginBottom:"12px"}}><label style={lbl}>{m.aciklama}</label><textarea rows={2} value={yeniHizmet.aciklama} onChange={e=>setYeniHizmet({...yeniHizmet,aciklama:e.target.value})} style={{...inp,resize:"none"}}/></div>
                    <button onClick={hizmetEkle} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:600,width:"100%"}}>{m.hizmetEkleBtn}</button>
                  </div>
                  <div style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",overflow:"hidden"}}>
                    <div style={{padding:"14px 16px",borderBottom:"1px solid #EEEDFE"}}><h2 style={{fontSize:"15px",fontWeight:700,color:"#12103a",margin:0}}>{m.mevcutHizmetler} ({hizmetler.length})</h2></div>
                    <div style={{overflowX:"auto"}}>
                      <table style={{width:"100%",borderCollapse:"collapse",minWidth:"480px"}}>
                        <thead><tr style={{background:"#f9fafb"}}>{[m.hizmetSutun.ad,m.hizmetSutun.kat,m.hizmetSutun.fiyat,m.hizmetSutun.islem].map(h=>(<th key={h} style={{padding:"10px 12px",textAlign:"left",fontSize:"12px",color:"#888",fontWeight:600,whiteSpace:"nowrap"}}>{h}</th>))}</tr></thead>
                        <tbody>{hizmetler.map((h,i)=>(<tr key={h.id} style={{borderTop:"1px solid #EEEDFE",background:i%2===0?"#fff":"#fafafa",opacity:h.aktif?1:0.5}}>
                          <td style={{padding:"10px 12px",fontSize:"13px",fontWeight:600,color:"#12103a"}}>{h.hizmet_adi}</td>
                          <td style={{padding:"10px 12px",fontSize:"11px",color:"#534AB7",whiteSpace:"nowrap"}}>{h.kategori}</td>
                          <td style={{padding:"10px 12px",fontSize:"13px",fontWeight:700,color:"#534AB7",whiteSpace:"nowrap"}}>{h.fiyat} {h.para_birimi}</td>
                          <td style={{padding:"10px 12px"}}><div style={{display:"flex",gap:"4px"}}>
                            <button onClick={()=>hizmetToggle(h.id,h.aktif)} style={{background:h.aktif?"#fff8e1":"#f0fff4",color:h.aktif?"#BA7517":"#0a7a3a",border:"none",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",cursor:"pointer",whiteSpace:"nowrap"}}>{h.aktif?m.pasife:m.aktife}</button>
                            <button onClick={()=>hizmetSil(h.id)} style={{background:"#fff0f0",color:"#c00",border:"none",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>{m.sil}</button>
                          </div></td>
                        </tr>))}</tbody>
                      </table>
                    </div>
                    {hizmetler.length===0&&<div style={{textAlign:"center",padding:"28px",color:"#888",fontSize:"13px"}}>{m.hizmetYok}</div>}
                  </div>
                </div>)}

                {menu==="doktorlar"&&(<div>
                  <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"20px"}}>{m.doktorlarBaslik}</h1>
                  <div style={kart}>
                    <h2 style={{fontSize:"15px",fontWeight:700,color:"#12103a",marginBottom:"12px"}}>{m.doktorEkleBaslik}</h2>
                    <div style={g2}>
                      <div><label style={lbl}>{m.doktorAd} *</label><input type="text" value={yeniDoktor.ad} onChange={e=>setYeniDoktor({...yeniDoktor,ad:e.target.value})} style={inp}/></div>
                      <div><label style={lbl}>{m.uzmanlik}</label><input type="text" value={yeniDoktor.uzmanlik} onChange={e=>setYeniDoktor({...yeniDoktor,uzmanlik:e.target.value})} style={inp}/></div>
                    </div>
                    <div style={{marginBottom:"10px"}}><label style={lbl}>{m.aciklama}</label><textarea rows={2} value={yeniDoktor.aciklama} onChange={e=>setYeniDoktor({...yeniDoktor,aciklama:e.target.value})} style={{...inp,resize:"none"}}/></div>
                    <div style={{marginBottom:"12px"}}><label style={lbl}>{m.doktorFoto}</label><input type="file" accept="image/*" onChange={async e=>{const f=e.target.files?.[0];if(f){const url=await fotografYukle(f,"doktorlar");if(url)setYeniDoktor({...yeniDoktor,fotograf_url:url});}}} style={inp}/>{yeniDoktor.fotograf_url&&<img src={yeniDoktor.fotograf_url} alt="Doktor" style={{width:"50px",height:"50px",objectFit:"cover",borderRadius:"50%",marginTop:"6px"}}/>}</div>
                    <button onClick={doktorEkle} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:600,width:"100%"}}>{m.doktorEkleBtn}</button>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:mobil?"1fr 1fr":"repeat(3,1fr)",gap:"12px"}}>
                    {doktorlar.map(d=>(<div key={d.id} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"16px",textAlign:"center"}}>
                      {d.fotograf_url?<img src={d.fotograf_url} alt={d.ad} style={{width:"60px",height:"60px",objectFit:"cover",borderRadius:"50%",marginBottom:"10px"}}/>:<div style={{width:"60px",height:"60px",background:"#EEEDFE",borderRadius:"50%",margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",color:"#534AB7",fontWeight:700}}>{d.ad[0]}</div>}
                      <div style={{fontSize:"13px",fontWeight:700,color:"#12103a",marginBottom:"3px"}}>{d.ad}</div>
                      <div style={{fontSize:"12px",color:"#534AB7",marginBottom:"8px"}}>{d.uzmanlik}</div>
                      <button onClick={()=>doktorSil(d.id)} style={{background:"#fff0f0",color:"#c00",border:"none",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>{m.sil}</button>
                    </div>))}
                    {doktorlar.length===0&&<div style={{gridColumn:"1/-1",textAlign:"center",padding:"28px",color:"#888"}}>{m.doktorYok}</div>}
                  </div>
                </div>)}

                {menu==="onceSonra"&&(<div>
                  <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"20px"}}>{m.onceSonraBaslik}</h1>
                  <div style={kart}>
                    <div style={{marginBottom:"10px"}}><label style={lbl}>{m.hizmetAdi}</label><input type="text" placeholder={m.hizmetAdPlaceholder} value={yeniOS.hizmet_adi} onChange={e=>setYeniOS({...yeniOS,hizmet_adi:e.target.value})} style={inp}/></div>
                    <div style={g2}>
                      <div><label style={lbl}>{m.onceFoto} *</label><input type="file" accept="image/*" onChange={async e=>{const f=e.target.files?.[0];if(f){const url=await fotografYukle(f,"once-sonra");if(url)setYeniOS({...yeniOS,once_fotograf:url});}}} style={inp}/>{yeniOS.once_fotograf&&<img src={yeniOS.once_fotograf} alt="Önce" style={{width:"100%",height:"80px",objectFit:"cover",borderRadius:"6px",marginTop:"6px"}}/>}</div>
                      <div><label style={lbl}>{m.sonraFoto} *</label><input type="file" accept="image/*" onChange={async e=>{const f=e.target.files?.[0];if(f){const url=await fotografYukle(f,"once-sonra");if(url)setYeniOS({...yeniOS,sonra_fotograf:url});}}} style={inp}/>{yeniOS.sonra_fotograf&&<img src={yeniOS.sonra_fotograf} alt="Sonra" style={{width:"100%",height:"80px",objectFit:"cover",borderRadius:"6px",marginTop:"6px"}}/>}</div>
                    </div>
                    <div style={{marginBottom:"12px"}}><label style={lbl}>{m.aciklama}</label><input type="text" value={yeniOS.aciklama} onChange={e=>setYeniOS({...yeniOS,aciklama:e.target.value})} style={inp}/></div>
                    <button onClick={osEkle} style={{background:"#534AB7",color:"#fff",border:"none",padding:"10px 20px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:600,width:"100%"}}>{m.ekleBtn}</button>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"12px"}}>
                    {onceSonralar.map(os=>(<div key={os.id} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",overflow:"hidden"}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
                        <div><div style={{fontSize:"11px",color:"#888",padding:"4px 8px",background:"#f9fafb",textAlign:"center"}}>ÖNCE</div>{os.once_fotograf&&<img src={os.once_fotograf} alt="Önce" style={{width:"100%",height:"100px",objectFit:"cover"}}/>}</div>
                        <div><div style={{fontSize:"11px",color:"#059669",padding:"4px 8px",background:"#f0fff4",textAlign:"center"}}>SONRA</div>{os.sonra_fotograf&&<img src={os.sonra_fotograf} alt="Sonra" style={{width:"100%",height:"100px",objectFit:"cover"}}/>}</div>
                      </div>
                      <div style={{padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{fontSize:"12px",fontWeight:600,color:"#12103a"}}>{os.hizmet_adi}</div>
                        <button onClick={()=>osSil(os.id)} style={{background:"#fff0f0",color:"#c00",border:"none",padding:"3px 8px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>{m.sil}</button>
                      </div>
                    </div>))}
                    {onceSonralar.length===0&&<div style={{gridColumn:"1/-1",textAlign:"center",padding:"28px",color:"#888"}}>{m.onceSonraYok}</div>}
                  </div>
                </div>)}

                {menu==="talepler"&&(<div>
                  <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"20px"}}>{m.teklifTalepleri} ({talepler.length})</h1>
                  <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                    {talepler.map(t=>{
                      const form=getTeklifForm(t.id);const tedaviDetay=disTedaviMap[t.id]||[];const acik=acikTalep===t.id;
                      return(<div key={t.id} style={{background:"#fff",border:"1px solid #EEEDFE",borderRadius:"12px",overflow:"hidden"}}>
                        <div style={{padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"8px",flexWrap:"wrap"}}>
                          <div><div style={{fontSize:"14px",fontWeight:700,color:"#12103a",marginBottom:"3px"}}>{t.tedavi_turu}</div><div style={{fontSize:"12px",color:"#888"}}>{m.hasta}: {t.profiles?.ad} {t.profiles?.soyad}</div></div>
                          <div style={{display:"flex",gap:"6px",alignItems:"center",flexWrap:"wrap"}}>
                            <span style={{fontSize:"11px",padding:"3px 8px",borderRadius:"20px",background:"#fff8e1",color:"#BA7517"}}>{t.durum}</span>
                            {kullanici?.onaylandi&&(<button onClick={()=>setAcikTalep(acik?null:t.id)} style={{background:acik?"#f0eeff":"#534AB7",color:acik?"#534AB7":"#fff",border:acik?"1px solid #534AB7":"none",padding:"7px 14px",borderRadius:"8px",fontSize:"12px",cursor:"pointer",fontWeight:600}}>{acik?m.kapat:m.teklifAc}</button>)}
                          </div>
                        </div>
                        {acik&&kullanici?.onaylandi&&(<div style={{borderTop:"1px solid #EEEDFE",padding:"16px",background:"#fafafa"}}>
                          <div style={{background:"#fff",borderRadius:"10px",border:"1px solid #EEEDFE",padding:"14px",marginBottom:"14px"}}>
                            <div style={{fontSize:"13px",fontWeight:700,color:"#0f0d2e",marginBottom:"10px"}}>{m.disPlani}</div>
                            <DisSemasi onDegistir={(plan)=>disPlanHesapla(t.id,plan)}/>
                            {tedaviDetay.length>0&&(<div style={{marginTop:"12px",background:"#f8f9ff",borderRadius:"8px",overflow:"hidden",border:"1px solid #EEEDFE"}}>
                              <div style={{padding:"8px 12px",background:"#534AB7",fontSize:"12px",fontWeight:700,color:"#fff"}}>{m.tedaviListesi} — {tedaviDetay.length} {m.islem}</div>
                              {tedaviDetay.map((d,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",borderBottom:"1px solid #EEEDFE",fontSize:"12px",gap:"6px",flexWrap:"wrap"}}><span style={{flex:1,minWidth:"120px"}}><strong>Diş {d.dis}</strong> — {d.hizmet_adi}</span><input type="number" value={d.fiyat} onChange={e=>{const yeniFiyat=parseFloat(e.target.value)||0;setDisTedaviMap(prev=>{const yeni=[...(prev[t.id]||[])];yeni[i]={...yeni[i],fiyat:yeniFiyat};const toplam=yeni.reduce((s,x)=>s+x.fiyat,0);setTeklifFormlar(p=>({...p,[t.id]:{...getTeklifForm(t.id),fiyat:toplam.toString()}}));return {...prev,[t.id]:yeni};});}} style={{width:"70px",border:"1px solid #EEEDFE",borderRadius:"6px",padding:"4px 6px",fontSize:"12px",outline:"none"}}/><span style={{fontSize:"11px",color:"#888"}}>EUR</span></div>))}
                              <div style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:"#f0eeff",fontSize:"13px",fontWeight:700}}><span>{m.toplam}</span><span style={{color:"#534AB7"}}>{tedaviDetay.reduce((s,d)=>s+d.fiyat,0)} EUR</span></div>
                            </div>)}
                          </div>
                          <div style={g2}>
                            <div><label style={lbl}>{m.tedaviFiyati} *</label><input type="number" placeholder="0" value={form.fiyat} onChange={e=>setTeklifForm(t.id,{fiyat:e.target.value})} style={inp}/></div>
                            <div><label style={lbl}>{m.aciklama}</label><input type="text" placeholder={m.aciklamaPlaceholder} value={form.aciklama} onChange={e=>setTeklifForm(t.id,{aciklama:e.target.value})} style={inp}/></div>
                          </div>
                          <div style={{background:"#fff",borderRadius:"8px",padding:"10px 12px",border:"1px solid #EEEDFE",marginBottom:"8px"}}>
                            <label style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",marginBottom:form.otel_dahil?"8px":"0"}}><input type="checkbox" checked={form.otel_dahil} onChange={e=>setTeklifForm(t.id,{otel_dahil:e.target.checked})}/><span style={{fontSize:"13px",fontWeight:600}}>{m.otelDahil}</span></label>
                            {form.otel_dahil&&(<div style={g2}><input type="text" placeholder={m.otelAdi} value={form.otel_aciklama} onChange={e=>setTeklifForm(t.id,{otel_aciklama:e.target.value})} style={inp}/><input type="number" placeholder={m.otelFiyat} value={form.otel_fiyat} onChange={e=>setTeklifForm(t.id,{otel_fiyat:e.target.value})} style={inp}/></div>)}
                          </div>
                          <div style={{background:"#fff",borderRadius:"8px",padding:"10px 12px",border:"1px solid #EEEDFE",marginBottom:"12px"}}>
                            <label style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",marginBottom:form.transfer_dahil?"8px":"0"}}><input type="checkbox" checked={form.transfer_dahil} onChange={e=>setTeklifForm(t.id,{transfer_dahil:e.target.checked})}/><span style={{fontSize:"13px",fontWeight:600}}>{m.transferDahil}</span></label>
                            {form.transfer_dahil&&(<div style={g2}><input type="text" placeholder={m.transferAciklama} value={form.transfer_aciklama} onChange={e=>setTeklifForm(t.id,{transfer_aciklama:e.target.value})} style={inp}/><input type="number" placeholder={m.transferFiyat} value={form.transfer_fiyat} onChange={e=>setTeklifForm(t.id,{transfer_fiyat:e.target.value})} style={inp}/></div>)}
                          </div>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
                            {form.fiyat&&(<div style={{fontSize:"14px",fontWeight:700,color:"#534AB7"}}>{m.toplam}: {((parseFloat(form.fiyat)||0)+(form.otel_dahil?parseFloat(form.otel_fiyat)||0:0)+(form.transfer_dahil?parseFloat(form.transfer_fiyat)||0:0)).toFixed(0)} EUR</div>)}
                            <button onClick={()=>teklifOnayAc(t.id)} style={{background:"#059669",color:"#fff",border:"none",padding:"11px 20px",borderRadius:"8px",fontSize:"13px",cursor:"pointer",fontWeight:700,marginLeft:"auto"}}>{m.teklifGonder}</button>
                          </div>
                        </div>)}
                      </div>);
                    })}
                    {talepler.length===0&&(<div style={{textAlign:"center",padding:"40px",background:"#fff",borderRadius:"12px",border:"1px solid #EEEDFE",color:"#888"}}>{m.teklifYok}</div>)}
                  </div>
                </div>)}

                {menu==="tekliflerim"&&(<div>
                  <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"20px"}}>{m.gonderilen} ({teklifler.length})</h1>
                  <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                    {teklifler.map(t=>(<div key={t.id} style={{background:"#fff",border:`2px solid ${t.durum==="onaylandi"?"#059669":t.durum==="reddedildi"?"#fcc":"#EEEDFE"}`,borderRadius:"12px",padding:"18px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px",gap:"8px",flexWrap:"wrap"}}>
                        <div><div style={{fontSize:"14px",fontWeight:700,color:"#12103a",marginBottom:"3px"}}>💊 {t.talepler?.tedavi_turu}</div><div style={{fontSize:"12px",color:"#94a3b8"}}>{new Date(t.olusturma_tarihi).toLocaleDateString()}</div></div>
                        <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                          <span style={{fontSize:"11px",padding:"3px 10px",borderRadius:"20px",fontWeight:600,background:t.durum==="onaylandi"?"#f0fff4":t.durum==="reddedildi"?"#fff0f0":"#fff8e1",color:t.durum==="onaylandi"?"#059669":t.durum==="reddedildi"?"#c00":"#BA7517"}}>{t.durum==="onaylandi"?m.onaylandiLabel:t.durum==="reddedildi"?m.reddedildiLabel:m.beklemede}</span>
                          <button onClick={()=>teklifYazdir(t)} style={{background:"#f0eeff",color:"#534AB7",border:"1px solid #EEEDFE",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",cursor:"pointer"}}>{m.yazdir}</button>
                        </div>
                      </div>
                      <div style={{background:"#f8f9ff",borderRadius:"8px",padding:"12px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}><span style={{fontSize:"12px",color:"#64748b"}}>💊 Tedavi</span><span style={{fontSize:"13px",fontWeight:700,color:"#534AB7"}}>{t.fiyat} EUR</span></div>
                        {t.otel_dahil&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}><span style={{fontSize:"12px",color:"#64748b"}}>🏨 {t.otel_aciklama}</span><span style={{fontSize:"12px",fontWeight:600,color:"#059669"}}>{t.otel_fiyat} EUR</span></div>}
                        {t.transfer_dahil&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}><span style={{fontSize:"12px",color:"#64748b"}}>🚗 {t.transfer_aciklama}</span><span style={{fontSize:"12px",fontWeight:600,color:"#059669"}}>{t.transfer_fiyat} EUR</span></div>}
                        {(t.otel_dahil||t.transfer_dahil)&&<div style={{display:"flex",justifyContent:"space-between",paddingTop:"6px",borderTop:"1px solid #EEEDFE"}}><span style={{fontSize:"13px",fontWeight:700}}>💰 {m.toplam}</span><span style={{fontSize:"15px",fontWeight:800,color:"#534AB7"}}>{t.toplam_fiyat} EUR</span></div>}
                      </div>
                      {t.durum==="onaylandi"&&(<a href="/mesajlar" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"#534AB7",color:"#fff",padding:"10px",borderRadius:"8px",fontSize:"13px",textDecoration:"none",fontWeight:600,marginTop:"12px"}}>{m.mesajlas}</a>)}
                    </div>))}
                    {teklifler.length===0&&<div style={{textAlign:"center",padding:"40px",background:"#fff",borderRadius:"12px",border:"1px solid #EEEDFE",color:"#888"}}>{m.teklifYokGon}</div>}
                  </div>
                </div>)}

                {menu==="belgeler"&&(<div>
                  <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.belgelerBaslik}</h1>
                  <p style={{fontSize:"13px",color:"#888",marginBottom:"20px"}}>{m.belgeAcik}</p>
                  {belgeYukleniyor&&<div style={{background:"#f0eeff",border:"1px solid #534AB7",borderRadius:"8px",padding:"10px 14px",marginBottom:"14px",fontSize:"13px",color:"#534AB7"}}>{m.belgeYukleniyor}</div>}
                  <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                    {BELGE_TURLERI.map(zb=>{
                      const yuklendi=belgeler.find(b=>b.belge_turu===zb.id);
                      return(<div key={zb.id} style={{background:"#fff",border:`1px solid ${yuklendi?"#059669":"#EEEDFE"}`,borderRadius:"12px",padding:"14px"}}>
                        <div style={{display:"flex",alignItems:"flex-start",gap:"10px",marginBottom:"10px"}}>
                          <span style={{fontSize:"18px"}}>{yuklendi?"✅":"📋"}</span>
                          <div style={{flex:1}}>
                            <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginBottom:"3px"}}><span style={{fontSize:"13px",fontWeight:700,color:"#0f0d2e"}}>{zb.ad}</span>{!yuklendi&&<span style={{fontSize:"10px",background:"#fff0f0",color:"#c00",padding:"2px 6px",borderRadius:"8px",fontWeight:600}}>{m.zorunlu}</span>}</div>
                            <p style={{fontSize:"12px",color:"#94a3b8",margin:0}}>{zb.aciklama}</p>
                            {yuklendi&&<a href={yuklendi.belge_url} target="_blank" rel="noreferrer" style={{fontSize:"12px",color:"#534AB7",textDecoration:"none",fontWeight:600,display:"inline-block",marginTop:"4px"}}>{m.goruntule}</a>}
                          </div>
                        </div>
                        <div style={{display:"flex",gap:"6px"}}>
                          <label style={{flex:1,background:yuklendi?"#f0eeff":"#534AB7",color:yuklendi?"#534AB7":"#fff",padding:"8px 12px",borderRadius:"8px",fontSize:"12px",cursor:"pointer",fontWeight:600,textAlign:"center"}}>{yuklendi?m.guncelle:m.yukle}<input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f)belgeYukle(zb.id,f);}}/></label>
                          {yuklendi&&<button onClick={()=>belgeSil(yuklendi.id)} style={{background:"#fff0f0",color:"#c00",border:"none",padding:"8px 12px",borderRadius:"8px",fontSize:"12px",cursor:"pointer"}}>{m.sil}</button>}
                        </div>
                      </div>);
                    })}
                  </div>
                  <div style={{marginTop:"16px",background:"#f0eeff",border:"1px solid #EEEDFE",borderRadius:"12px",padding:"14px 16px"}}>
                    <div style={{fontSize:"13px",fontWeight:700,color:"#534AB7",marginBottom:"6px"}}>{belgeler.length}/{BELGE_TURLERI.length} belge yüklendi</div>
                    <div style={{background:"#e5e7eb",borderRadius:"6px",height:"8px",overflow:"hidden"}}><div style={{background:belgeler.length===BELGE_TURLERI.length?"#059669":"#534AB7",height:"100%",width:`${(belgeler.length/BELGE_TURLERI.length)*100}%`,transition:"width .3s",borderRadius:"6px"}}/></div>
                    {belgeler.length===BELGE_TURLERI.length&&<p style={{fontSize:"12px",color:"#059669",marginTop:"8px",fontWeight:600}}>{m.belgeTamamlandi}</p>}
                  </div>
                </div>)}

                {menu==="mesajlar"&&(<div>
                  <h1 style={{fontSize:"22px",fontWeight:700,color:"#12103a",marginBottom:"8px"}}>{m.mesajlarBaslik}</h1>
                  <p style={{fontSize:"13px",color:"#888",marginBottom:"20px"}}>{m.mesajlarAcik}</p>
                  <a href="/mesajlar" style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#534AB7",color:"#fff",padding:"12px 20px",borderRadius:"10px",fontSize:"14px",textDecoration:"none",fontWeight:600}}>{m.mesajlarGit}</a>
                </div>)}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
