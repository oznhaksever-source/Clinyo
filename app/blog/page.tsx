"use client";
import { useState } from "react";
import { useDil } from "../locales/context";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const YAZILAR = [
  {
    slug: "dental-treatment-turkey",
    emoji: "🦷",
    tarih: "2025-05-01",
    sure: { tr: "8 dk okuma", en: "8 min read", de: "8 Min. Lesezeit", ar: "8 دقائق قراءة", ru: "8 мин чтения", fr: "8 min de lecture" },
    baslik: {
      tr: "Türkiye'de Diş Tedavisi: Kapsamlı Rehber 2025",
      en: "Dental Treatment in Turkey: Complete Guide 2025",
      de: "Zahnbehandlung in der Türkei: Vollständiger Leitfaden 2025",
      ar: "علاج الأسنان في تركيا: دليل شامل 2025",
      ru: "Стоматология в Турции: Полное руководство 2025",
      fr: "Soins dentaires en Turquie: Guide complet 2025",
    },
    ozet: {
      tr: "Türkiye'de diş tedavisi neden bu kadar popüler? Fiyatlar, klinik seçimi, tedavi süreci ve dikkat edilmesi gerekenler hakkında bilmeniz gereken her şey.",
      en: "Why is dental treatment in Turkey so popular? Everything you need to know about prices, clinic selection, treatment process and what to watch out for.",
      de: "Warum ist Zahnbehandlung in der Türkei so beliebt? Alles, was Sie über Preise, Klinikauswahl, Behandlungsprozess und Worauf zu achten ist wissen müssen.",
      ar: "لماذا علاج الأسنان في تركيا شائع جداً؟ كل ما تحتاج معرفته عن الأسعار واختيار العيادة وعملية العلاج.",
      ru: "Почему лечение зубов в Турции так популярно? Всё, что нужно знать о ценах, выборе клиники и процессе лечения.",
      fr: "Pourquoi les soins dentaires en Turquie sont-ils si populaires? Tout ce que vous devez savoir sur les prix, le choix de la clinique et le processus de traitement.",
    },
    icerik: {
      tr: [
        { tip: "h2", icerik: "Neden Türkiye'de Diş Tedavisi?" },
        { tip: "p", icerik: "Türkiye, son yıllarda dünya diş turizm destinasyonları arasında üst sıralara yerleşmiştir. Bunun temel nedeni, Avrupa fiyatlarının %60-70 altında sunulan kaliteli tedavi imkânlarıdır. İstanbul ve Ankara başta olmak üzere Türkiye'nin büyük şehirlerinde JCI akreditasyonlu, son teknoloji diş klinikleri faaliyet göstermektedir." },
        { tip: "h2", icerik: "Türkiye'de Diş Tedavisi Fiyatları" },
        { tip: "p", icerik: "Türkiye'deki diş tedavisi fiyatları Avrupa ile kıyaslandığında ciddi avantaj sunmaktadır. Örneğin İngiltere'de €1.500-2.000 olan bir diş implantı Türkiye'de €350-600 arasında yapılabilmektedir. Zirkonyum kaplama için Almanya'da €900-1.200 ödenirken Türkiye'de €150-250 arasında çıkmaktadır." },
        { tip: "h2", icerik: "Hangi Tedaviler Yapılabilir?" },
        { tip: "liste", icerik: ["Diş İmplantı (tek diş veya tam çene)", "Zirkonyum Kaplama", "Lamine Veneer", "All-on-4 / All-on-6", "Gülüş Tasarımı (Hollywood Smile)", "Kanal Tedavisi", "Ortodonti (şeffaf plak dahil)", "Diş Beyazlatma"] },
        { tip: "h2", icerik: "Klinik Seçiminde Dikkat Edilmesi Gerekenler" },
        { tip: "p", icerik: "Türkiye'de diş kliniği seçerken öncelikle Sağlık Bakanlığı Uluslararası Sağlık Turizmi Yetki Belgesi olan klinikleri tercih etmelisiniz. Bu belge, kliniğin uluslararası hasta kabul etmek için gerekli standartları karşıladığını göstermektedir. Ayrıca doktorların sertifikalarını, hasta yorumlarını ve önceki çalışmaların fotoğraflarını incelemeniz önerilir." },
        { tip: "h2", icerik: "Tedavi Süreci Nasıl İşler?" },
        { tip: "p", icerik: "Türkiye'de diş tedavisi genellikle şöyle işler: İlk gün muayene ve röntgen çekilir, tedavi planı hazırlanır. Sonraki günlerde asıl tedavi gerçekleştirilir. Protez veya kaplama gerektiren tedavilerde birden fazla oturum gerekebilir. Zirkonyum kaplama için genellikle 4-7 gün yeterli olmaktadır." },
        { tip: "h2", icerik: "Medoqa ile Güvenli Diş Tedavisi" },
        { tip: "p", icerik: "Medoqa platformunda yer alan tüm diş klinikleri Sağlık Bakanlığı belgeli ve admin incelemesinden geçmiştir. Blokeli ödeme sistemimiz sayesinde ödemeniz tedaviniz tamamlanıp siz onaylayana kadar güvende bekler. Birden fazla klinikten ücretsiz teklif alabilir, fiyat ve içerikleri karşılaştırabilirsiniz." },
      ],
      en: [
        { tip: "h2", icerik: "Why Dental Treatment in Turkey?" },
        { tip: "p", icerik: "Turkey has risen to the top of global dental tourism destinations in recent years. The main reason is the high-quality treatments offered at 60-70% below European prices. In major Turkish cities, especially Istanbul and Ankara, JCI-accredited dental clinics with the latest technology operate at world standards." },
        { tip: "h2", icerik: "Dental Treatment Prices in Turkey" },
        { tip: "p", icerik: "Dental treatment prices in Turkey offer significant advantages compared to Europe. For example, a dental implant that costs €1,500-2,000 in the UK can be done for €350-600 in Turkey. For zirconia crowns, while you pay €900-1,200 in Germany, in Turkey it ranges from €150-250." },
        { tip: "h2", icerik: "What Treatments Are Available?" },
        { tip: "liste", icerik: ["Dental Implants (single tooth or full arch)", "Zirconia Crowns", "Laminate Veneers", "All-on-4 / All-on-6", "Smile Design (Hollywood Smile)", "Root Canal Treatment", "Orthodontics (including clear aligners)", "Teeth Whitening"] },
        { tip: "h2", icerik: "What to Look for When Choosing a Clinic" },
        { tip: "p", icerik: "When choosing a dental clinic in Turkey, you should primarily prefer clinics with the Ministry of Health International Health Tourism Authorization Certificate. This certificate shows that the clinic meets the required standards for accepting international patients. You should also review doctors' certificates, patient reviews and photos of previous work." },
        { tip: "h2", icerik: "How Does the Treatment Process Work?" },
        { tip: "p", icerik: "Dental treatment in Turkey generally works as follows: On the first day, examination and X-rays are taken, a treatment plan is prepared. The main treatment is carried out on subsequent days. Multiple sessions may be required for treatments involving prosthetics or crowns. Generally 4-7 days is sufficient for zirconia crowns." },
        { tip: "h2", icerik: "Safe Dental Treatment with Medoqa" },
        { tip: "p", icerik: "All dental clinics on the Medoqa platform are Ministry of Health certified and have passed admin review. Thanks to our escrow payment system, your payment stays safe until your treatment is complete and you approve. You can get free quotes from multiple clinics and compare prices and content." },
      ],
      de: [
        { tip: "h2", icerik: "Warum Zahnbehandlung in der Türkei?" },
        { tip: "p", icerik: "Die Türkei hat sich in den letzten Jahren zu einem der führenden Zahntourismusziele der Welt entwickelt. Der Hauptgrund sind hochwertige Behandlungen zu 60-70% unter europäischen Preisen. In großen türkischen Städten, insbesondere Istanbul und Ankara, sind JCI-akkreditierte Zahnkliniken mit neuester Technologie tätig." },
        { tip: "h2", icerik: "Zahnbehandlungspreise in der Türkei" },
        { tip: "p", icerik: "Die Zahnbehandlungspreise in der Türkei bieten erhebliche Vorteile im Vergleich zu Europa. Ein Zahnimplantat, das in Deutschland €1.500-2.000 kostet, kann in der Türkei für €350-600 durchgeführt werden. Für Zirkonkronen zahlen Sie in Deutschland €900-1.200, in der Türkei €150-250." },
        { tip: "h2", icerik: "Welche Behandlungen sind verfügbar?" },
        { tip: "liste", icerik: ["Zahnimplantate (Einzelzahn oder vollständiger Bogen)", "Zirkonkronen", "Laminatfurniere", "All-on-4 / All-on-6", "Smile Design (Hollywood Smile)", "Wurzelkanalbehandlung", "Kieferorthopädie (einschließlich Aligner)", "Zahnaufhellung"] },
        { tip: "h2", icerik: "Worauf bei der Klinikauswahl zu achten ist" },
        { tip: "p", icerik: "Bei der Wahl einer Zahnklinik in der Türkei sollten Sie vorrangig Kliniken mit dem Internationalen Gesundheitstourismus-Genehmigungszertifikat des Gesundheitsministeriums bevorzugen. Überprüfen Sie auch die Zertifikate der Ärzte, Patientenbewertungen und Fotos früherer Arbeiten." },
        { tip: "h2", icerik: "Wie läuft der Behandlungsprozess ab?" },
        { tip: "p", icerik: "Die Zahnbehandlung in der Türkei funktioniert im Allgemeinen so: Am ersten Tag werden Untersuchung und Röntgenaufnahmen durchgeführt, ein Behandlungsplan erstellt. Die eigentliche Behandlung erfolgt an den folgenden Tagen. Für Zirkonkronen sind in der Regel 4-7 Tage ausreichend." },
        { tip: "h2", icerik: "Sichere Zahnbehandlung mit Medoqa" },
        { tip: "p", icerik: "Alle Zahnkliniken auf der Medoqa-Plattform sind vom Gesundheitsministerium zertifiziert und haben die Admin-Prüfung bestanden. Dank unseres Treuhandkontos bleibt Ihre Zahlung sicher, bis Ihre Behandlung abgeschlossen ist und Sie zustimmen." },
      ],
      ar: [
        { tip: "h2", icerik: "لماذا علاج الأسنان في تركيا؟" },
        { tip: "p", icerik: "صعدت تركيا في السنوات الأخيرة إلى مقدمة وجهات سياحة الأسنان العالمية. السبب الرئيسي هو العلاجات عالية الجودة المقدمة بأسعار أقل بـ 60-70% من الأسعار الأوروبية. في المدن التركية الكبرى، وخاصة إسطنبول وأنقرة، تعمل عيادات أسنان معتمدة من JCI بأحدث التقنيات." },
        { tip: "h2", icerik: "أسعار علاج الأسنان في تركيا" },
        { tip: "p", icerik: "تقدم أسعار علاج الأسنان في تركيا مزايا كبيرة مقارنة بأوروبا. مثلاً، زراعة سن تكلف €1,500-2,000 في المملكة المتحدة يمكن إجراؤها بـ €350-600 في تركيا. لتيجان الزركون €150-250 مقارنة بـ €900-1,200 في ألمانيا." },
        { tip: "h2", icerik: "ما هي العلاجات المتاحة؟" },
        { tip: "liste", icerik: ["زراعة الأسنان (سن واحد أو قوس كامل)", "تيجان الزركون", "القشور اللامينية", "All-on-4 / All-on-6", "تصميم الابتسامة (Hollywood Smile)", "علاج العصب", "تقويم الأسنان (بما في ذلك الواضح)", "تبييض الأسنان"] },
        { tip: "h2", icerik: "ما الذي يجب مراعاته عند اختيار العيادة" },
        { tip: "p", icerik: "عند اختيار عيادة أسنان في تركيا، يجب تفضيل العيادات التي تحمل شهادة الترخيص الدولي للسياحة الصحية من وزارة الصحة. راجع أيضاً شهادات الأطباء وتقييمات المرضى وصور الأعمال السابقة." },
        { tip: "h2", icerik: "كيف تسير عملية العلاج؟" },
        { tip: "p", icerik: "يسير علاج الأسنان في تركيا عموماً هكذا: في اليوم الأول يتم الفحص والأشعة وإعداد خطة العلاج. يتم تنفيذ العلاج الرئيسي في الأيام التالية. عادةً 4-7 أيام كافية لتيجان الزركون." },
        { tip: "h2", icerik: "علاج أسنان آمن مع ميدوقا" },
        { tip: "p", icerik: "جميع عيادات الأسنان على منصة ميدوقا معتمدة من وزارة الصحة ومراجعة إدارياً. بفضل نظام الدفع الضمني، تبقى مدفوعاتك آمنة حتى اكتمال علاجك وموافقتك. يمكنك الحصول على عروض مجانية من عدة عيادات ومقارنة الأسعار." },
      ],
      ru: [
        { tip: "h2", icerik: "Почему лечение зубов в Турции?" },
        { tip: "p", icerik: "Турция в последние годы поднялась на вершину мировых направлений стоматологического туризма. Главная причина — качественное лечение по ценам на 60-70% ниже европейских. В крупных турецких городах, особенно в Стамбуле и Анкаре, работают JCI-аккредитованные стоматологические клиники с новейшими технологиями." },
        { tip: "h2", icerik: "Цены на стоматологическое лечение в Турции" },
        { tip: "p", icerik: "Цены на стоматологическое лечение в Турции предлагают значительные преимущества по сравнению с Европой. Например, зубной имплант, стоящий €1500-2000 в Великобритании, можно сделать за €350-600 в Турции. Циркониевая коронка стоит €150-250 против €900-1200 в Германии." },
        { tip: "h2", icerik: "Какие процедуры доступны?" },
        { tip: "liste", icerik: ["Зубные импланты (один зуб или полная дуга)", "Циркониевые коронки", "Виниры", "All-on-4 / All-on-6", "Дизайн улыбки (Hollywood Smile)", "Лечение каналов", "Ортодонтия (включая элайнеры)", "Отбеливание зубов"] },
        { tip: "h2", icerik: "На что обращать внимание при выборе клиники" },
        { tip: "p", icerik: "При выборе стоматологической клиники в Турции следует отдавать предпочтение клиникам с сертификатом Министерства здравоохранения. Также проверьте сертификаты врачей, отзывы пациентов и фотографии предыдущих работ." },
        { tip: "h2", icerik: "Как проходит процесс лечения?" },
        { tip: "p", icerik: "Стоматологическое лечение в Турции обычно проходит так: в первый день — осмотр и рентген, составление плана лечения. Основное лечение проводится в последующие дни. Для циркониевых коронок обычно достаточно 4-7 дней." },
        { tip: "h2", icerik: "Безопасное лечение зубов с Medoqa" },
        { tip: "p", icerik: "Все стоматологические клиники на платформе Medoqa имеют сертификат Министерства здравоохранения и прошли проверку администрации. Благодаря системе эскроу ваш платёж остаётся в безопасности до завершения лечения и вашего одобрения." },
      ],
      fr: [
        { tip: "h2", icerik: "Pourquoi les soins dentaires en Turquie?" },
        { tip: "p", icerik: "La Turquie s'est hissée ces dernières années au sommet des destinations mondiales de tourisme dentaire. La raison principale est la qualité des traitements offerts à 60-70% en dessous des prix européens. Dans les grandes villes turques, notamment Istanbul et Ankara, des cliniques dentaires accréditées JCI avec les dernières technologies sont actives." },
        { tip: "h2", icerik: "Prix des soins dentaires en Turquie" },
        { tip: "p", icerik: "Les prix des soins dentaires en Turquie offrent des avantages significatifs par rapport à l'Europe. Par exemple, un implant dentaire qui coûte €1500-2000 au Royaume-Uni peut être réalisé pour €350-600 en Turquie. Pour les couronnes en zircone, vous payez €150-250 contre €900-1200 en Allemagne." },
        { tip: "h2", icerik: "Quels traitements sont disponibles?" },
        { tip: "liste", icerik: ["Implants dentaires (dent unique ou arcade complète)", "Couronnes en zircone", "Facettes en stratifié", "All-on-4 / All-on-6", "Smile Design (Hollywood Smile)", "Traitement de canal", "Orthodontie (gouttières incluses)", "Blanchiment dentaire"] },
        { tip: "h2", icerik: "Ce qu'il faut vérifier lors du choix d'une clinique" },
        { tip: "p", icerik: "Lors du choix d'une clinique dentaire en Turquie, préférez les cliniques possédant le Certificat d'autorisation international du tourisme médical du Ministère de la Santé. Vérifiez également les certificats des médecins, les avis patients et les photos des travaux antérieurs." },
        { tip: "h2", icerik: "Comment se déroule le processus de traitement?" },
        { tip: "p", icerik: "Les soins dentaires en Turquie se déroulent généralement ainsi: le premier jour, examen et radiographies, élaboration du plan de traitement. Le traitement principal est effectué les jours suivants. Pour les couronnes en zircone, 4-7 jours sont généralement suffisants." },
        { tip: "h2", icerik: "Soins dentaires sécurisés avec Medoqa" },
        { tip: "p", icerik: "Toutes les cliniques dentaires sur la plateforme Medoqa sont certifiées par le Ministère de la Santé et ont passé la revue administrative. Grâce à notre système de paiement séquestre, votre paiement reste en sécurité jusqu'à la fin de votre traitement." },
      ],
    },
  },
  {
    slug: "hair-transplant-turkey",
    emoji: "💇",
    tarih: "2025-05-05",
    sure: { tr: "7 dk okuma", en: "7 min read", de: "7 Min. Lesezeit", ar: "7 دقائق قراءة", ru: "7 мин чтения", fr: "7 min de lecture" },
    baslik: {
      tr: "Türkiye'de Saç Ekimi: Bilmeniz Gereken Her Şey",
      en: "Hair Transplant in Turkey: Everything You Need to Know",
      de: "Haartransplantation in der Türkei: Alles was Sie wissen müssen",
      ar: "زراعة الشعر في تركيا: كل ما تحتاج معرفته",
      ru: "Пересадка волос в Турции: Всё что нужно знать",
      fr: "Greffe de cheveux en Turquie: Tout ce que vous devez savoir",
    },
    ozet: {
      tr: "Türkiye neden saç ekiminde dünya lideri? FUE, DHI ve Safir teknikleri arasındaki farklar, fiyatlar ve sonuçlar hakkında kapsamlı rehber.",
      en: "Why is Turkey the world leader in hair transplants? Comprehensive guide on differences between FUE, DHI and Sapphire techniques, prices and results.",
      de: "Warum ist die Türkei Weltführer bei Haartransplantationen? Umfassender Leitfaden zu FUE, DHI und Saphir-Techniken, Preisen und Ergebnissen.",
      ar: "لماذا تركيا رائدة عالمياً في زراعة الشعر؟ دليل شامل حول الفروق بين تقنيات FUE وDHI والسافير والأسعار والنتائج.",
      ru: "Почему Турция — мировой лидер по пересадке волос? Подробное руководство по различиям FUE, DHI и сапфировых техник, ценам и результатам.",
      fr: "Pourquoi la Turquie est-elle leader mondial en greffe de cheveux? Guide complet sur les différences FUE, DHI et Saphir, prix et résultats.",
    },
    icerik: {
      tr: [
        { tip: "h2", icerik: "Türkiye Neden Saç Ekiminde 1 Numara?" },
        { tip: "p", icerik: "Türkiye, yılda 1 milyonun üzerinde uluslararası hasta ağırlayarak dünya saç ekimi destinasyonları arasında açık ara birinci konumdadır. Deneyimli cerrahlar, uygun fiyatlar ve yüksek başarı oranları bu tercihte belirleyici etkenlerdir. İstanbul başta olmak üzere pek çok Türk şehrinde dünya standartlarında saç ekimi merkezleri bulunmaktadır." },
        { tip: "h2", icerik: "Teknikler Arasındaki Farklar" },
        { tip: "liste", icerik: ["FUE (Folicular Unit Extraction): Foliküller tek tek alınır, doğal görünüm sağlar", "DHI (Direct Hair Implantation): Özel kalem ile direkt implantasyon, daha yoğun sonuç", "Safir FUE: Safir uçlu kesici ile daha az iz ve hızlı iyileşme", "Sakal/Kaş Ekimi: Yüz bölgesine özel ekimler"] },
        { tip: "h2", icerik: "Saç Ekimi Fiyatları" },
        { tip: "p", icerik: "Türkiye'de saç ekimi fiyatları greft sayısına ve tekniğe göre değişmektedir. Ortalama FUE saç ekimi €1.500-3.000 arasında fiyatlandırılmaktadır. DHI tekniği genellikle %20-30 daha pahalıdır. Aynı işlemler İngiltere veya Almanya'da €8.000-15.000 arasında yapılmaktadır." },
        { tip: "h2", icerik: "İşlem Öncesi Hazırlık" },
        { tip: "p", icerik: "Saç ekimi öncesinde kan sulandırıcı ilaçları bırakmak, alkol tüketimini azaltmak ve saçı yıkamamak gerekir. Kliniğiniz size detaylı bir hazırlık listesi verecektir. İşlem öncesi saç analizi için röntgen ya da fotoğraf göndermek süreci hızlandırır." },
        { tip: "h2", icerik: "İyileşme Süreci" },
        { tip: "p", icerik: "İşlemden sonra 2-3 gün kabuklanma ve hafif şişlik normaldir. 10-15 gün içinde ekilen tüyler dökülür ancak bu endişe verici değildir — foliküller sağlıklıdır. Kalıcı saç 6-12 ay içinde çıkmaya başlar ve 18 ay sonra tam sonuç görülür." },
      ],
      en: [
        { tip: "h2", icerik: "Why Is Turkey #1 in Hair Transplants?" },
        { tip: "p", icerik: "Turkey hosts over 1 million international patients annually, making it the clear world leader in hair transplant destinations. Experienced surgeons, affordable prices and high success rates are the determining factors in this preference. World-standard hair transplant centers are located in many Turkish cities, especially Istanbul." },
        { tip: "h2", icerik: "Differences Between Techniques" },
        { tip: "liste", icerik: ["FUE (Follicular Unit Extraction): Follicles extracted individually, provides natural appearance", "DHI (Direct Hair Implantation): Direct implantation with special pen, denser results", "Sapphire FUE: Less scarring and faster healing with sapphire-tipped cutter", "Beard/Eyebrow Transplant: Specialized transplants for facial areas"] },
        { tip: "h2", icerik: "Hair Transplant Prices" },
        { tip: "p", icerik: "Hair transplant prices in Turkey vary according to the number of grafts and technique. Average FUE hair transplant is priced between €1,500-3,000. DHI technique is generally 20-30% more expensive. The same procedures cost €8,000-15,000 in the UK or Germany." },
        { tip: "h2", icerik: "Pre-procedure Preparation" },
        { tip: "p", icerik: "Before a hair transplant, blood thinners should be stopped, alcohol consumption reduced and hair should not be washed. Your clinic will give you a detailed preparation list. Sending photos or scans for pre-procedure hair analysis speeds up the process." },
        { tip: "h2", icerik: "Recovery Process" },
        { tip: "p", icerik: "Scabbing and mild swelling for 2-3 days after the procedure is normal. The transplanted hairs fall out within 10-15 days but this is not concerning — the follicles are healthy. Permanent hair starts growing in 6-12 months and full results are seen after 18 months." },
      ],
      de: [
        { tip: "h2", icerik: "Warum ist die Türkei Nr. 1 bei Haartransplantationen?" },
        { tip: "p", icerik: "Die Türkei empfängt jährlich über 1 Million internationale Patienten und ist damit klarer Weltführer bei Haartransplantationszielen. Erfahrene Chirurgen, erschwingliche Preise und hohe Erfolgsraten sind die entscheidenden Faktoren. Weltstandard-Haartransplantationszentren befinden sich in vielen türkischen Städten, besonders in Istanbul." },
        { tip: "h2", icerik: "Unterschiede zwischen Techniken" },
        { tip: "liste", icerik: ["FUE (Follikeleinheit-Extraktion): Follikel einzeln entnommen, natürliches Aussehen", "DHI (Direkte Haarimplantation): Direkte Implantation mit speziellem Stift, dichtere Ergebnisse", "Saphir FUE: Weniger Narbenbildung mit saphirspitzigem Schneider", "Bart-/Augenbrauentransplantation: Spezialisierte Transplantationen für Gesichtsbereiche"] },
        { tip: "h2", icerik: "Haartransplantationspreise" },
        { tip: "p", icerik: "Die Preise für Haartransplantationen in der Türkei variieren je nach Anzahl der Grafts und Technik. Durchschnittliche FUE-Haartransplantation kostet €1.500-3.000. Die DHI-Technik ist in der Regel 20-30% teurer. Dieselben Eingriffe kosten in Deutschland €8.000-15.000." },
        { tip: "h2", icerik: "Vorbereitung vor dem Eingriff" },
        { tip: "p", icerik: "Vor einer Haartransplantation sollten Blutverdünner abgesetzt, Alkoholkonsum reduziert und Haare nicht gewaschen werden. Ihre Klinik gibt Ihnen eine detaillierte Vorbereitungsliste." },
        { tip: "h2", icerik: "Genesungsprozess" },
        { tip: "p", icerik: "Krustenbildung und leichte Schwellung für 2-3 Tage nach dem Eingriff ist normal. Die transplantierten Haare fallen innerhalb von 10-15 Tagen aus, aber das ist kein Grund zur Besorgnis. Permanentes Haar beginnt in 6-12 Monaten zu wachsen, volle Ergebnisse nach 18 Monaten." },
      ],
      ar: [
        { tip: "h2", icerik: "لماذا تركيا الأولى في زراعة الشعر؟" },
        { tip: "p", icerik: "تستقبل تركيا أكثر من مليون مريض دولي سنوياً، مما يجعلها الوجهة الأولى عالمياً في زراعة الشعر. الجراحون ذوو الخبرة والأسعار المعقولة ومعدلات النجاح العالية هي العوامل المحددة. توجد مراكز زراعة شعر بمستوى عالمي في مدن تركية عديدة، خاصة إسطنبول." },
        { tip: "h2", icerik: "الفروق بين التقنيات" },
        { tip: "liste", icerik: ["FUE: استخراج الجريبات بشكل فردي، مظهر طبيعي", "DHI: زراعة مباشرة بقلم خاص، نتائج أكثر كثافة", "سافير FUE: ندوب أقل وشفاء أسرع", "زراعة اللحية/الحواجب: زراعات متخصصة لمناطق الوجه"] },
        { tip: "h2", icerik: "أسعار زراعة الشعر" },
        { tip: "p", icerik: "تتفاوت أسعار زراعة الشعر في تركيا حسب عدد البصيلات والتقنية. متوسط زراعة FUE €1,500-3,000. تقنية DHI أغلى بـ 20-30% عموماً. نفس العمليات تكلف €8,000-15,000 في ألمانيا أو المملكة المتحدة." },
        { tip: "h2", icerik: "التحضير قبل العملية" },
        { tip: "p", icerik: "قبل زراعة الشعر يجب التوقف عن مضادات التخثر وتقليل الكحول وعدم غسل الشعر. ستعطيك العيادة قائمة تحضير مفصلة." },
        { tip: "h2", icerik: "عملية التعافي" },
        { tip: "p", icerik: "التقشر والتورم الخفيف لمدة 2-3 أيام بعد العملية طبيعي. الشعر المزروع يسقط خلال 10-15 يوماً لكن هذا ليس مثيراً للقلق. الشعر الدائم يبدأ بالنمو في 6-12 شهراً وتظهر النتائج الكاملة بعد 18 شهراً." },
      ],
      ru: [
        { tip: "h2", icerik: "Почему Турция №1 в пересадке волос?" },
        { tip: "p", icerik: "Турция принимает более 1 миллиона международных пациентов ежегодно, что делает её явным мировым лидером по пересадке волос. Опытные хирурги, доступные цены и высокие показатели успеха — ключевые факторы. Клиники мирового уровня расположены во многих турецких городах, особенно в Стамбуле." },
        { tip: "h2", icerik: "Различия между техниками" },
        { tip: "liste", icerik: ["FUE: Индивидуальная экстракция фолликулов, естественный вид", "DHI: Прямая имплантация специальной ручкой, более густые результаты", "Сапфировый FUE: Меньше рубцов и быстрое заживление", "Пересадка бороды/бровей: Специализированные пересадки для лица"] },
        { tip: "h2", icerik: "Цены на пересадку волос" },
        { tip: "p", icerik: "Цены варьируются в зависимости от количества графтов и техники. Средняя пересадка FUE стоит €1500-3000. Техника DHI обычно дороже на 20-30%. Те же процедуры в Германии стоят €8000-15000." },
        { tip: "h2", icerik: "Подготовка перед процедурой" },
        { tip: "p", icerik: "Перед пересадкой следует прекратить приём антикоагулянтов, снизить потребление алкоголя и не мыть волосы. Клиника предоставит подробный список подготовки." },
        { tip: "h2", icerik: "Процесс восстановления" },
        { tip: "p", icerik: "Корочки и лёгкий отёк 2-3 дня после процедуры — это нормально. Пересаженные волосы выпадают в течение 10-15 дней, но это не повод для беспокойства. Постоянные волосы начинают расти через 6-12 месяцев, полные результаты видны через 18 месяцев." },
      ],
      fr: [
        { tip: "h2", icerik: "Pourquoi la Turquie est-elle N°1 en greffe de cheveux?" },
        { tip: "p", icerik: "La Turquie accueille plus d'1 million de patients internationaux par an, ce qui en fait le leader mondial incontesté des destinations de greffe de cheveux. Des chirurgiens expérimentés, des prix abordables et des taux de réussite élevés sont les facteurs déterminants. Des centres de greffe de cheveux aux normes mondiales se trouvent dans de nombreuses villes turques, notamment Istanbul." },
        { tip: "h2", icerik: "Différences entre les techniques" },
        { tip: "liste", icerik: ["FUE: Extraction folliculaire individuelle, apparence naturelle", "DHI: Implantation directe avec stylo spécial, résultats plus denses", "FUE Saphir: Moins de cicatrices, guérison plus rapide", "Greffe de barbe/sourcils: Transplantations spécialisées pour les zones faciales"] },
        { tip: "h2", icerik: "Prix de la greffe de cheveux" },
        { tip: "p", icerik: "Les prix varient selon le nombre de greffons et la technique. La greffe FUE moyenne coûte €1500-3000. La technique DHI est généralement 20-30% plus chère. Les mêmes procédures coûtent €8000-15000 en Allemagne." },
        { tip: "h2", icerik: "Préparation avant la procédure" },
        { tip: "p", icerik: "Avant une greffe, il faut arrêter les anticoagulants, réduire la consommation d'alcool et ne pas laver les cheveux. Votre clinique vous fournira une liste de préparation détaillée." },
        { tip: "h2", icerik: "Processus de récupération" },
        { tip: "p", icerik: "Des croûtes et un léger gonflement pendant 2-3 jours après la procédure sont normaux. Les cheveux transplantés tombent en 10-15 jours mais ce n'est pas inquiétant. Les cheveux permanents commencent à pousser en 6-12 mois, résultats complets après 18 mois." },
      ],
    },
  },
  {
    slug: "health-tourism-turkey-guide",
    emoji: "🌍",
    tarih: "2025-05-10",
    sure: { tr: "10 dk okuma", en: "10 min read", de: "10 Min. Lesezeit", ar: "10 دقائق قراءة", ru: "10 мин чтения", fr: "10 min de lecture" },
    baslik: {
      tr: "Türkiye Sağlık Turizmi Rehberi: Neden Türkiye?",
      en: "Turkey Health Tourism Guide: Why Turkey?",
      de: "Türkei Gesundheitstourismus Leitfaden: Warum die Türkei?",
      ar: "دليل السياحة الصحية في تركيا: لماذا تركيا؟",
      ru: "Руководство по медицинскому туризму в Турции: Почему Турция?",
      fr: "Guide du tourisme médical en Turquie: Pourquoi la Turquie?",
    },
    ozet: {
      tr: "Türkiye'yi sağlık turizm destinasyonu olarak öne çıkaran faktörler, maliyetler, kalite standartları ve pratik bilgiler.",
      en: "Factors that make Turkey stand out as a health tourism destination, costs, quality standards and practical information.",
      de: "Faktoren, die die Türkei als Gesundheitstourismusziel hervorheben, Kosten, Qualitätsstandards und praktische Informationen.",
      ar: "العوامل التي تجعل تركيا وجهة متميزة للسياحة الصحية والتكاليف ومعايير الجودة والمعلومات العملية.",
      ru: "Факторы, выделяющие Турцию как направление медицинского туризма, расходы, стандарты качества и практическая информация.",
      fr: "Facteurs qui distinguent la Turquie comme destination de tourisme médical, coûts, normes de qualité et informations pratiques.",
    },
    icerik: {
      tr: [
        { tip: "h2", icerik: "Türkiye Sağlık Turizminde Neden Bu Kadar Başarılı?" },
        { tip: "p", icerik: "Türkiye, 2023 yılında 1,5 milyonun üzerinde uluslararası hasta ağırlayarak dünya sağlık turizm gelirlerinin önemli bir payını almaktadır. Bu başarının arkasında birden fazla neden yatmaktadır: uygun fiyatlar, kaliteli sağlık hizmetleri, deneyimli tıp kadrosu ve stratejik coğrafi konum." },
        { tip: "h2", icerik: "Fiyat Avantajı" },
        { tip: "p", icerik: "Türkiye'deki tedavi maliyetleri Avrupa ve ABD ile kıyaslandığında %50-80 arasında daha uygun olmaktadır. Bu fark sadece işçilik maliyetlerinden değil, kur avantajı ve genel yaşam maliyetlerinden de kaynaklanmaktadır. Üstelik bu fark kaliteden ödün vermeden sağlanmaktadır." },
        { tip: "h2", icerik: "Kalite Standartları" },
        { tip: "p", icerik: "Türkiye'de JCI (Joint Commission International) akreditasyonlu 50'den fazla hastane bulunmaktadır; bu sayı dünyada en yüksek rakamlar arasındadır. Ayrıca Sağlık Bakanlığı'nın sıkı denetim mekanizmaları ve uluslararası sağlık turizmi yetki belgeleri kalite güvencesi sağlamaktadır." },
        { tip: "h2", icerik: "Popüler Tedavi Kategorileri" },
        { tip: "liste", icerik: ["Diş tedavisi ve implantoloji", "Saç ekimi", "Göz ameliyatları (Lasik, ICL)", "Plastik ve estetik cerrahi", "Ortopedi (diz ve kalça protezi)", "Onkoloji tedavisi", "Kardiyoloji", "Kapsamlı sağlık check-up"] },
        { tip: "h2", icerik: "Türkiye'ye Nasıl Hazırlanılır?" },
        { tip: "p", icerik: "Türkiye'ye tedavi için gelmeden önce kliniğinizle iletişime geçip tedavi planını netleştirin. Pasaportunuzun geçerlilik süresini kontrol edin, seyahat sigortası yaptırın ve yanınızda bulundurmanız gereken tıbbi belgeleri (önceki röntgenler, kan testleri vb.) hazırlayın." },
      ],
      en: [
        { tip: "h2", icerik: "Why Is Turkey So Successful in Health Tourism?" },
        { tip: "p", icerik: "Turkey hosted over 1.5 million international patients in 2023, capturing a significant share of global health tourism revenues. Multiple reasons lie behind this success: affordable prices, quality healthcare services, experienced medical staff and strategic geographic location." },
        { tip: "h2", icerik: "Price Advantage" },
        { tip: "p", icerik: "Treatment costs in Turkey are 50-80% more affordable compared to Europe and the USA. This difference comes not only from labor costs but also from currency advantages and general cost of living. Moreover, this difference is achieved without compromising quality." },
        { tip: "h2", icerik: "Quality Standards" },
        { tip: "p", icerik: "Turkey has over 50 JCI (Joint Commission International) accredited hospitals; this number is among the highest in the world. The Ministry of Health's strict inspection mechanisms and international health tourism authorization certificates also provide quality assurance." },
        { tip: "h2", icerik: "Popular Treatment Categories" },
        { tip: "liste", icerik: ["Dental treatment and implantology", "Hair transplantation", "Eye surgeries (Lasik, ICL)", "Plastic and aesthetic surgery", "Orthopedics (knee and hip replacement)", "Oncology treatment", "Cardiology", "Comprehensive health check-up"] },
        { tip: "h2", icerik: "How to Prepare for Turkey?" },
        { tip: "p", icerik: "Before coming to Turkey for treatment, contact your clinic and clarify the treatment plan. Check your passport validity, get travel insurance and prepare medical documents you need to bring (previous X-rays, blood tests, etc.)." },
      ],
      de: [
        { tip: "h2", icerik: "Warum ist die Türkei so erfolgreich im Gesundheitstourismus?" },
        { tip: "p", icerik: "Die Türkei empfing 2023 über 1,5 Millionen internationale Patienten und sicherte sich einen bedeutenden Anteil am globalen Gesundheitstourismusumsatz. Mehrere Gründe liegen hinter diesem Erfolg: erschwingliche Preise, qualitativ hochwertige Gesundheitsversorgung und strategische geografische Lage." },
        { tip: "h2", icerik: "Preisvorteil" },
        { tip: "p", icerik: "Behandlungskosten in der Türkei sind 50-80% günstiger als in Europa. Dieser Unterschied entsteht nicht nur durch Arbeitskosten, sondern auch durch Währungsvorteile. Dieser Unterschied wird ohne Qualitätsverlust erzielt." },
        { tip: "h2", icerik: "Qualitätsstandards" },
        { tip: "p", icerik: "Die Türkei hat über 50 JCI-akkreditierte Krankenhäuser — eine der höchsten Zahlen weltweit. Die strengen Inspektionsmechanismen des Gesundheitsministeriums sorgen für Qualitätssicherung." },
        { tip: "h2", icerik: "Beliebte Behandlungskategorien" },
        { tip: "liste", icerik: ["Zahnbehandlung und Implantologie", "Haartransplantation", "Augenoperationen (Lasik, ICL)", "Plastische und ästhetische Chirurgie", "Orthopädie (Knie- und Hüftprothesen)", "Onkologiebehandlung", "Kardiologie", "Umfassender Gesundheits-Check-up"] },
        { tip: "h2", icerik: "Wie bereitet man sich auf die Türkei vor?" },
        { tip: "p", icerik: "Bevor Sie zur Behandlung in die Türkei kommen, kontaktieren Sie Ihre Klinik und klären Sie den Behandlungsplan. Überprüfen Sie die Gültigkeit Ihres Reisepasses, schließen Sie eine Reiseversicherung ab und bereiten Sie benötigte medizinische Dokumente vor." },
      ],
      ar: [
        { tip: "h2", icerik: "لماذا تركيا ناجحة جداً في السياحة الصحية؟" },
        { tip: "p", icerik: "استقبلت تركيا أكثر من 1.5 مليون مريض دولي عام 2023، محتلةً حصة كبيرة من عائدات السياحة الصحية العالمية. أسباب متعددة وراء هذا النجاح: أسعار معقولة وخدمات صحية عالية الجودة وموقع جغرافي استراتيجي." },
        { tip: "h2", icerik: "ميزة السعر" },
        { tip: "p", icerik: "تكاليف العلاج في تركيا أقل بـ 50-80% مقارنة بأوروبا. هذا الفرق لا يأتي فقط من تكاليف العمالة بل من مزايا العملة أيضاً. ويتحقق هذا الفرق دون المساس بالجودة." },
        { tip: "h2", icerik: "معايير الجودة" },
        { tip: "p", icerik: "تمتلك تركيا أكثر من 50 مستشفى معتمداً من JCI، وهو من أعلى الأرقام عالمياً. كما توفر آليات التفتيش الصارمة لوزارة الصحة ضمان الجودة." },
        { tip: "h2", icerik: "فئات العلاج الشائعة" },
        { tip: "liste", icerik: ["علاج الأسنان وزراعتها", "زراعة الشعر", "جراحات العيون (ليزك، ICL)", "الجراحة التجميلية والجمالية", "طب العظام (بدائل الركبة والورك)", "علاج الأورام", "أمراض القلب", "فحص صحي شامل"] },
        { tip: "h2", icerik: "كيف تستعد للذهاب إلى تركيا؟" },
        { tip: "p", icerik: "قبل القدوم إلى تركيا للعلاج، تواصل مع عيادتك وحدد خطة العلاج. تحقق من صلاحية جواز سفرك واحصل على تأمين سفر وأعد الوثائق الطبية المطلوبة." },
      ],
      ru: [
        { tip: "h2", icerik: "Почему Турция так успешна в медицинском туризме?" },
        { tip: "p", icerik: "Турция приняла более 1,5 миллиона международных пациентов в 2023 году, захватив значительную долю мировых доходов от медицинского туризма. За этим успехом стоят доступные цены, качественное медицинское обслуживание и стратегическое географическое положение." },
        { tip: "h2", icerik: "Ценовое преимущество" },
        { tip: "p", icerik: "Стоимость лечения в Турции на 50-80% дешевле, чем в Европе. Эта разница обусловлена не только трудовыми затратами, но и валютными преимуществами. При этом разница достигается без ущерба качеству." },
        { tip: "h2", icerik: "Стандарты качества" },
        { tip: "p", icerik: "В Турции более 50 больниц с аккредитацией JCI — один из самых высоких показателей в мире. Строгие механизмы контроля Министерства здравоохранения обеспечивают гарантию качества." },
        { tip: "h2", icerik: "Популярные категории лечения" },
        { tip: "liste", icerik: ["Стоматология и имплантология", "Пересадка волос", "Операции на глазах (Ласик, ICL)", "Пластическая и эстетическая хирургия", "Ортопедия (замена колена и тазобедренного)", "Онкологическое лечение", "Кардиология", "Комплексный чек-ап"] },
        { tip: "h2", icerik: "Как подготовиться к поездке в Турцию?" },
        { tip: "p", icerik: "Перед поездкой в Турцию свяжитесь с клиникой и уточните план лечения. Проверьте срок действия паспорта, оформите страховку и подготовьте необходимые медицинские документы." },
      ],
      fr: [
        { tip: "h2", icerik: "Pourquoi la Turquie est-elle si performante dans le tourisme médical?" },
        { tip: "p", icerik: "La Turquie a accueilli plus de 1,5 million de patients internationaux en 2023, capturant une part importante des revenus mondiaux du tourisme médical. Plusieurs raisons expliquent ce succès: prix abordables, services de santé de qualité et position géographique stratégique." },
        { tip: "h2", icerik: "Avantage prix" },
        { tip: "p", icerik: "Les coûts de traitement en Turquie sont 50-80% moins chers qu'en Europe. Cette différence provient non seulement des coûts de main-d'œuvre mais aussi des avantages de change. De plus, cette différence est réalisée sans compromettre la qualité." },
        { tip: "h2", icerik: "Normes de qualité" },
        { tip: "p", icerik: "La Turquie compte plus de 50 hôpitaux accrédités JCI, l'un des chiffres les plus élevés au monde. Les mécanismes d'inspection stricts du Ministère de la Santé fournissent également une assurance qualité." },
        { tip: "h2", icerik: "Catégories de traitement populaires" },
        { tip: "liste", icerik: ["Soins dentaires et implantologie", "Greffe de cheveux", "Chirurgies oculaires (Lasik, ICL)", "Chirurgie plastique et esthétique", "Orthopédie (prothèses genou et hanche)", "Traitement oncologique", "Cardiologie", "Bilan de santé complet"] },
        { tip: "h2", icerik: "Comment se préparer pour la Turquie?" },
        { tip: "p", icerik: "Avant de venir en Turquie pour un traitement, contactez votre clinique et clarifiez le plan de traitement. Vérifiez la validité de votre passeport, souscrivez une assurance voyage et préparez les documents médicaux nécessaires." },
      ],
    },
  },
  {
    slug: "eye-surgery-turkey",
    emoji: "👁️",
    tarih: "2025-05-15",
    sure: { tr: "6 dk okuma", en: "6 min read", de: "6 Min. Lesezeit", ar: "6 دقائق قراءة", ru: "6 мин чтения", fr: "6 min de lecture" },
    baslik: {
      tr: "Türkiye'de Göz Ameliyatı: Lasik, ICL ve Daha Fazlası",
      en: "Eye Surgery in Turkey: Lasik, ICL and More",
      de: "Augenoperation in der Türkei: Lasik, ICL und mehr",
      ar: "جراحة العيون في تركيا: ليزك وICL والمزيد",
      ru: "Операция на глазах в Турции: Ласик, ICL и другое",
      fr: "Chirurgie oculaire en Turquie: Lasik, ICL et plus",
    },
    ozet: {
      tr: "Türkiye'de lazer göz ameliyatı seçenekleri, fiyatlar ve beklentiler. Hangi teknik size uygun?",
      en: "Laser eye surgery options in Turkey, prices and expectations. Which technique is right for you?",
      de: "Laseraugenoperationsoptionen in der Türkei, Preise und Erwartungen. Welche Technik ist für Sie geeignet?",
      ar: "خيارات عمليات العيون بالليزر في تركيا والأسعار والتوقعات. أي تقنية مناسبة لك؟",
      ru: "Варианты лазерной операции на глазах в Турции, цены и ожидания. Какая техника подходит вам?",
      fr: "Options de chirurgie laser des yeux en Turquie, prix et attentes. Quelle technique vous convient?",
    },
    icerik: {
      tr: [
        { tip: "h2", icerik: "Türkiye'de Göz Ameliyatı Neden Tercih Edilir?" },
        { tip: "p", icerik: "Türkiye'deki göz klinikleri, en son teknolojiyi kullanan deneyimli oftalmologlarıyla Avrupa ve ABD'ye kıyasla çok daha uygun fiyatlarda hizmet sunmaktadır. İstanbul başta olmak üzere büyük şehirlerde dünya standartlarında göz hastaneleri faaliyet göstermektedir." },
        { tip: "h2", icerik: "Teknik Seçenekler" },
        { tip: "liste", icerik: ["Lasik: En yaygın yöntem, hızlı iyileşme, 24 saat içinde net görme", "Lasek/PRK: İnce kornealar için ideal, daha uzun iyileşme süresi", "Smile Pro: Minimal kesili en yeni teknik, az rahatsızlık", "ICL (İmplantable Collamer Lens): Yüksek miyopi için lens implantı", "Katarakt: İleri teknoloji lens değişimi"] },
        { tip: "h2", icerik: "Fiyatlar" },
        { tip: "p", icerik: "Türkiye'de Lasik ameliyatı her iki göz için €800-1.500 arasında fiyatlandırılmaktadır. Bu fiyat Almanya'da €2.500-4.000, İngiltere'de ise €3.000-5.000 arasındadır. ICL lens tedavisi Türkiye'de €1.500-2.500 iken aynı işlem Avrupa'da €5.000-8.000 arasındadır." },
        { tip: "h2", icerik: "Kimler Uygun Aday?" },
        { tip: "p", icerik: "Lasik ameliyatı için 18 yaşını doldurmuş, son 1 yılda numarası değişmemiş, yeterli kornea kalınlığına sahip hastalar uygun adaydır. ICL ise çok yüksek miyopi veya ince korneası olan hastalara önerilir." },
      ],
      en: [
        { tip: "h2", icerik: "Why Choose Eye Surgery in Turkey?" },
        { tip: "p", icerik: "Eye clinics in Turkey offer services at much more affordable prices compared to Europe and the USA with experienced ophthalmologists using the latest technology. World-standard eye hospitals operate in major cities especially Istanbul." },
        { tip: "h2", icerik: "Technical Options" },
        { tip: "liste", icerik: ["Lasik: Most common method, fast recovery, clear vision within 24 hours", "Lasek/PRK: Ideal for thin corneas, longer recovery time", "Smile Pro: Latest technique with minimal incision, little discomfort", "ICL: Lens implant for high myopia", "Cataract: Advanced lens replacement technology"] },
        { tip: "h2", icerik: "Prices" },
        { tip: "p", icerik: "Lasik surgery in Turkey is priced between €800-1,500 for both eyes. This price is €2,500-4,000 in Germany and €3,000-5,000 in the UK. ICL lens treatment is €1,500-2,500 in Turkey while the same procedure costs €5,000-8,000 in Europe." },
        { tip: "h2", icerik: "Who Are Suitable Candidates?" },
        { tip: "p", icerik: "For Lasik surgery, patients who are 18 or older, whose prescription hasn't changed in the last year, and who have sufficient corneal thickness are suitable candidates. ICL is recommended for patients with very high myopia or thin corneas." },
      ],
      de: [
        { tip: "h2", icerik: "Warum Augenoperation in der Türkei?" },
        { tip: "p", icerik: "Augenkliniken in der Türkei bieten Dienstleistungen zu viel günstigeren Preisen als in Europa mit erfahrenen Augenärzten und neuester Technologie. Weltstandard-Augenkrankenhäuser sind in großen Städten tätig." },
        { tip: "h2", icerik: "Technische Optionen" },
        { tip: "liste", icerik: ["Lasik: Häufigste Methode, schnelle Erholung", "Lasek/PRK: Ideal für dünne Hornhäute", "Smile Pro: Neueste Technik mit minimalem Einschnitt", "ICL: Linsenimplantat bei hoher Kurzsichtigkeit", "Katarakt: Fortgeschrittener Linsenersatz"] },
        { tip: "h2", icerik: "Preise" },
        { tip: "p", icerik: "Lasik in der Türkei kostet €800-1.500 für beide Augen, verglichen mit €2.500-4.000 in Deutschland. ICL kostet €1.500-2.500 in der Türkei vs. €5.000-8.000 in Europa." },
        { tip: "h2", icerik: "Wer ist geeigneter Kandidat?" },
        { tip: "p", icerik: "Für Lasik sind Patienten über 18 Jahre geeignet, deren Sehstärke sich im letzten Jahr nicht verändert hat und die ausreichende Hornhautdicke haben. ICL wird bei sehr hoher Kurzsichtigkeit oder dünnen Hornhäuten empfohlen." },
      ],
      ar: [
        { tip: "h2", icerik: "لماذا تختار جراحة العيون في تركيا؟" },
        { tip: "p", icerik: "توفر عيادات العيون في تركيا خدمات بأسعار أقل بكثير من أوروبا مع أطباء عيون متمرسين وأحدث التقنيات. مستشفيات عيون بمستوى عالمي تعمل في المدن الكبرى خاصة إسطنبول." },
        { tip: "h2", icerik: "الخيارات التقنية" },
        { tip: "liste", icerik: ["ليزك: الأكثر شيوعاً، تعافٍ سريع، رؤية واضحة خلال 24 ساعة", "ليسيك/PRK: مثالي للقرنيات الرقيقة", "سمايل برو: أحدث تقنية بشق أدنى", "ICL: زراعة عدسة لارتفاع قصر النظر", "ماء أبيض: استبدال عدسة متطور"] },
        { tip: "h2", icerik: "الأسعار" },
        { tip: "p", icerik: "عملية ليزك في تركيا €800-1,500 للعينين، مقارنة بـ €2,500-4,000 في ألمانيا. علاج ICL €1,500-2,500 مقابل €5,000-8,000 في أوروبا." },
        { tip: "h2", icerik: "من هم المرشحون المناسبون؟" },
        { tip: "p", icerik: "لعملية ليزك، المرشحون المناسبون هم من تجاوزوا 18 عاماً ولم تتغير نظرتهم في السنة الأخيرة ولديهم سماكة قرنية كافية. ICL يُنصح به لمن لديهم قصر نظر مرتفع جداً أو قرنيات رقيقة." },
      ],
      ru: [
        { tip: "h2", icerik: "Почему операция на глазах в Турции?" },
        { tip: "p", icerik: "Глазные клиники в Турции предлагают услуги по значительно более доступным ценам, чем в Европе, с опытными офтальмологами и новейшими технологиями." },
        { tip: "h2", icerik: "Технические варианты" },
        { tip: "liste", icerik: ["Ласик: Самый распространённый метод, быстрое восстановление", "Ласек/PRK: Идеально для тонкой роговицы", "Smile Pro: Новейшая техника с минимальным разрезом", "ICL: Имплант линзы при высокой миопии", "Катаракта: Современная замена хрусталика"] },
        { tip: "h2", icerik: "Цены" },
        { tip: "p", icerik: "Ласик в Турции стоит €800-1500 для обоих глаз, против €2500-4000 в Германии. ICL — €1500-2500 против €5000-8000 в Европе." },
        { tip: "h2", icerik: "Кто является подходящим кандидатом?" },
        { tip: "p", icerik: "Для Ласика подходят пациенты старше 18 лет, чьё зрение не менялось последний год и у кого достаточная толщина роговицы. ICL рекомендуется при очень высокой миопии или тонкой роговице." },
      ],
      fr: [
        { tip: "h2", icerik: "Pourquoi la chirurgie oculaire en Turquie?" },
        { tip: "p", icerik: "Les cliniques ophtalmologiques en Turquie offrent des services à des prix beaucoup plus abordables qu'en Europe avec des ophtalmologistes expérimentés utilisant les dernières technologies." },
        { tip: "h2", icerik: "Options techniques" },
        { tip: "liste", icerik: ["Lasik: Méthode la plus courante, récupération rapide", "Lasek/PRK: Idéal pour les cornées minces", "Smile Pro: Dernière technique avec incision minimale", "ICL: Implant de lentille pour forte myopie", "Cataracte: Remplacement de lentille avancé"] },
        { tip: "h2", icerik: "Prix" },
        { tip: "p", icerik: "Le Lasik en Turquie coûte €800-1500 pour les deux yeux, contre €2500-4000 en Allemagne. ICL coûte €1500-2500 contre €5000-8000 en Europe." },
        { tip: "h2", icerik: "Qui sont les candidats appropriés?" },
        { tip: "p", icerik: "Pour le Lasik, les candidats appropriés ont plus de 18 ans, leur vue n'a pas changé depuis un an et ils ont une épaisseur cornéenne suffisante. L'ICL est recommandé pour une forte myopie ou des cornées minces." },
      ],
    },
  },
  {
    slug: "secure-payment-health-tourism",
    emoji: "🔒",
    tarih: "2025-05-20",
    sure: { tr: "5 dk okuma", en: "5 min read", de: "5 Min. Lesezeit", ar: "5 دقائق قراءة", ru: "5 мин чтения", fr: "5 min de lecture" },
    baslik: {
      tr: "Sağlık Turizminde Güvenli Ödeme: Blokeli Ödeme Sistemi Nedir?",
      en: "Secure Payment in Health Tourism: What is Escrow Payment?",
      de: "Sichere Zahlung im Gesundheitstourismus: Was ist Treuhandkonto?",
      ar: "الدفع الآمن في السياحة الصحية: ما هو نظام الدفع الضمني؟",
      ru: "Безопасный платёж в медицинском туризме: Что такое эскроу?",
      fr: "Paiement sécurisé dans le tourisme médical: Qu'est-ce que le séquestre?",
    },
    ozet: {
      tr: "Yurt dışında tedavi ödemesi yaparken nasıl korunursunuz? Blokeli ödeme sistemi ve hasta hakları.",
      en: "How do you protect yourself when making payment for treatment abroad? Escrow payment system and patient rights.",
      de: "Wie schützen Sie sich bei der Zahlung für eine Behandlung im Ausland? Treuhandkonto und Patientenrechte.",
      ar: "كيف تحمي نفسك عند الدفع للعلاج في الخارج؟ نظام الدفع الضمني وحقوق المريض.",
      ru: "Как защитить себя при оплате лечения за рубежом? Система эскроу и права пациента.",
      fr: "Comment vous protéger lors du paiement d'un traitement à l'étranger? Système séquestre et droits des patients.",
    },
    icerik: {
      tr: [
        { tip: "h2", icerik: "Sağlık Turizminde En Büyük Endişe: Para Güvenliği" },
        { tip: "p", icerik: "Yurt dışında tedavi olmak düşünen hastaların en büyük endişesi finansal güvenliktir. 'Parayı gönderirim ama tedavi olmadan geri döner miyim?' ya da 'Klinik kaliteli hizmet vermezse ne olur?' gibi sorular hastaları tedirgin etmektedir." },
        { tip: "h2", icerik: "Blokeli Ödeme (Escrow) Sistemi Nedir?" },
        { tip: "p", icerik: "Blokeli ödeme, alıcı ile satıcı arasında güvenilir bir üçüncü tarafın ödemeyi koşullar yerine getirilinceye kadar tuttuğu finansal mekanizmadır. Medoqa'nın blokeli ödeme sisteminde hasta ödemeyi Medoqa'nın güvenli hesabına yapar. Tedavi tamamlanıp hasta onaylayınca ödeme kliniğe aktarılır." },
        { tip: "h2", icerik: "Neden Önemli?" },
        { tip: "liste", icerik: ["Klinik tedaviyi yarıda bırakırsa ödeme yapılmaz", "Beklentilerin karşılanmaması durumunda arabuluculuk imkânı", "Ek işlem baskısına karşı koruma", "Şeffaf fiyatlandırma güvencesi", "Uluslararası hasta için finansal güvence"] },
        { tip: "h2", icerik: "Medoqa'nın Farkı" },
        { tip: "p", icerik: "Medoqa, Türkiye sağlık turizm sektöründe blokeli ödeme sistemini uygulayan ilk platformdur. Bunun yanı sıra ek işlem onay sistemi sayesinde klinik herhangi bir ek tedavi önermeden önce yazılı onayınızı almak zorundadır." },
        { tip: "h2", icerik: "Hasta Hakları" },
        { tip: "p", icerik: "Türkiye'de tedavi olan yabancı hastalar Türk hukuku kapsamında hasta haklarından yararlanmaktadır. Bunlara ek olarak Medoqa platformu üzerinden yapılan tedavilerde koordinatör desteği ve arabuluculuk hizmeti sunulmaktadır." },
      ],
      en: [
        { tip: "h2", icerik: "The Biggest Concern in Health Tourism: Financial Security" },
        { tip: "p", icerik: "The biggest concern for patients considering treatment abroad is financial security. Questions like 'What if I send the money but return without treatment?' or 'What happens if the clinic doesn't provide quality service?' make patients nervous." },
        { tip: "h2", icerik: "What is Escrow Payment?" },
        { tip: "p", icerik: "Escrow is a financial mechanism where a trusted third party holds payment between buyer and seller until conditions are met. In Medoqa's escrow system, the patient makes payment to Medoqa's secure account. When treatment is complete and the patient approves, payment is transferred to the clinic." },
        { tip: "h2", icerik: "Why Is It Important?" },
        { tip: "liste", icerik: ["No payment if clinic abandons treatment midway", "Mediation opportunity if expectations aren't met", "Protection against pressure for extra procedures", "Guarantee of transparent pricing", "Financial security for international patients"] },
        { tip: "h2", icerik: "Medoqa's Difference" },
        { tip: "p", icerik: "Medoqa is the first platform to implement an escrow payment system in Turkey's health tourism sector. Additionally, the extra procedure approval system means the clinic must get your written approval before proposing any additional treatment." },
        { tip: "h2", icerik: "Patient Rights" },
        { tip: "p", icerik: "Foreign patients treated in Turkey benefit from patient rights under Turkish law. In addition, treatments through the Medoqa platform are supported by coordinator support and mediation services." },
      ],
      de: [
        { tip: "h2", icerik: "Die größte Sorge im Gesundheitstourismus: Finanzielle Sicherheit" },
        { tip: "p", icerik: "Die größte Sorge von Patienten, die eine Behandlung im Ausland in Betracht ziehen, ist die finanzielle Sicherheit. Fragen wie 'Was, wenn ich das Geld schicke, aber ohne Behandlung zurückkomme?' machen Patienten nervös." },
        { tip: "h2", icerik: "Was ist ein Treuhandkonto?" },
        { tip: "p", icerik: "Ein Treuhandkonto ist ein Finanzmechanismus, bei dem eine vertrauenswürdige dritte Partei eine Zahlung zwischen Käufer und Verkäufer hält, bis die Bedingungen erfüllt sind. In Medoqas System zahlt der Patient auf Medoqas sicheres Konto. Wenn die Behandlung abgeschlossen ist, wird die Zahlung an die Klinik überwiesen." },
        { tip: "h2", icerik: "Warum ist es wichtig?" },
        { tip: "liste", icerik: ["Keine Zahlung wenn Klinik Behandlung abbricht", "Vermittlungsmöglichkeit bei Nichterfüllung", "Schutz vor Druck für Zusatzeingriffe", "Garantie transparenter Preisgestaltung", "Finanzielle Sicherheit für internationale Patienten"] },
        { tip: "h2", icerik: "Medoqas Unterschied" },
        { tip: "p", icerik: "Medoqa ist die erste Plattform, die ein Treuhandkonto im türkischen Gesundheitstourismus implementiert. Das Genehmigungssystem für Zusatzeingriffe bedeutet, dass die Klinik Ihre schriftliche Genehmigung einholen muss, bevor sie eine zusätzliche Behandlung vorschlägt." },
        { tip: "h2", icerik: "Patientenrechte" },
        { tip: "p", icerik: "Ausländische Patienten, die in der Türkei behandelt werden, profitieren von Patientenrechten nach türkischem Recht. Zusätzlich werden Behandlungen über die Medoqa-Plattform durch Koordinatorunterstützung und Mediationsservices unterstützt." },
      ],
      ar: [
        { tip: "h2", icerik: "أكبر قلق في السياحة الصحية: الأمان المالي" },
        { tip: "p", icerik: "أكبر قلق للمرضى الذين يفكرون في العلاج في الخارج هو الأمان المالي. أسئلة مثل 'ماذا لو أرسلت المال لكن عدت دون علاج؟' تقلق المرضى." },
        { tip: "h2", icerik: "ما هو نظام الدفع الضمني؟" },
        { tip: "p", icerik: "الدفع الضمني هو آلية مالية يحتفظ فيها طرف ثالث موثوق بالدفعة بين المشتري والبائع حتى تستوفى الشروط. في نظام ميدوقا، يدفع المريض لحساب ميدوقا الآمن. عند اكتمال العلاج وموافقة المريض، تُحوَّل الدفعة للعيادة." },
        { tip: "h2", icerik: "لماذا هو مهم؟" },
        { tip: "liste", icerik: ["لا دفع إذا تركت العيادة العلاج في المنتصف", "إمكانية الوساطة إذا لم تتحقق التوقعات", "حماية من الضغط لإجراءات إضافية", "ضمان شفافية التسعير", "ضمان مالي للمرضى الدوليين"] },
        { tip: "h2", icerik: "ما يميز ميدوقا" },
        { tip: "p", icerik: "ميدوقا هي أول منصة تطبق نظام الدفع الضمني في قطاع السياحة الصحية التركي. كما يعني نظام موافقة الإجراءات الإضافية أن العيادة يجب الحصول على موافقتك الكتابية قبل اقتراح أي علاج إضافي." },
        { tip: "h2", icerik: "حقوق المريض" },
        { tip: "p", icerik: "المرضى الأجانب المعالجون في تركيا يستفيدون من حقوق المريض بموجب القانون التركي. بالإضافة إلى ذلك، العلاجات عبر منصة ميدوقا مدعومة بدعم المنسق وخدمات الوساطة." },
      ],
      ru: [
        { tip: "h2", icerik: "Главная забота медицинского туризма: Финансовая безопасность" },
        { tip: "p", icerik: "Главная забота пациентов, рассматривающих лечение за рубежом, — финансовая безопасность. Вопросы вроде 'Что, если я отправлю деньги, но вернусь без лечения?' беспокоят пациентов." },
        { tip: "h2", icerik: "Что такое эскроу-платёж?" },
        { tip: "p", icerik: "Эскроу — финансовый механизм, при котором надёжная третья сторона удерживает платёж между покупателем и продавцом до выполнения условий. В системе Medoqa пациент вносит платёж на защищённый счёт Medoqa. Когда лечение завершено и пациент подтверждает, платёж переводится клинике." },
        { tip: "h2", icerik: "Почему это важно?" },
        { tip: "liste", icerik: ["Никакого платежа, если клиника прервёт лечение", "Возможность посредничества при невыполнении ожиданий", "Защита от давления для дополнительных процедур", "Гарантия прозрачного ценообразования", "Финансовая безопасность для иностранных пациентов"] },
        { tip: "h2", icerik: "Отличие Medoqa" },
        { tip: "p", icerik: "Medoqa — первая платформа, внедрившая систему эскроу в турецкий медицинский туризм. Система одобрения дополнительных процедур означает, что клиника должна получить ваше письменное согласие перед любым дополнительным лечением." },
        { tip: "h2", icerik: "Права пациента" },
        { tip: "p", icerik: "Иностранные пациенты, проходящие лечение в Турции, пользуются правами пациента по турецкому законодательству. Кроме того, лечение через платформу Medoqa поддерживается службой координатора и услугами посредничества." },
      ],
      fr: [
        { tip: "h2", icerik: "La plus grande préoccupation du tourisme médical: La sécurité financière" },
        { tip: "p", icerik: "La plus grande préoccupation des patients envisageant un traitement à l'étranger est la sécurité financière. Des questions comme 'Et si j'envoie l'argent mais rentre sans traitement?' rendent les patients nerveux." },
        { tip: "h2", icerik: "Qu'est-ce que le paiement séquestre?" },
        { tip: "p", icerik: "Le séquestre est un mécanisme financier où une tierce partie de confiance détient un paiement entre acheteur et vendeur jusqu'à ce que les conditions soient remplies. Dans le système Medoqa, le patient effectue le paiement sur le compte sécurisé de Medoqa. Quand le traitement est terminé et approuvé, le paiement est transféré à la clinique." },
        { tip: "h2", icerik: "Pourquoi est-ce important?" },
        { tip: "liste", icerik: ["Pas de paiement si la clinique abandonne le traitement", "Possibilité de médiation si les attentes ne sont pas satisfaites", "Protection contre la pression pour des actes supplémentaires", "Garantie de tarification transparente", "Sécurité financière pour les patients internationaux"] },
        { tip: "h2", icerik: "La différence Medoqa" },
        { tip: "p", icerik: "Medoqa est la première plateforme à mettre en œuvre un système de paiement séquestre dans le tourisme médical turc. De plus, le système d'approbation des actes supplémentaires signifie que la clinique doit obtenir votre accord écrit avant de proposer tout traitement supplémentaire." },
        { tip: "h2", icerik: "Droits des patients" },
        { tip: "p", icerik: "Les patients étrangers traités en Turquie bénéficient des droits des patients en vertu de la loi turque. De plus, les traitements via la plateforme Medoqa sont soutenus par un coordinateur et des services de médiation." },
      ],
    },
  },
];

export default function BlogPage() {
  const { dil } = useDil();
  const [seciliYazi, setSeciliYazi] = useState<string | null>(null);

  const d = dil as keyof typeof YAZILAR[0]["baslik"];

  const basliklar = {
    tr: "Blog", en: "Blog", de: "Blog", ar: "المدونة", ru: "Блог", fr: "Blog",
  };
  const altlar = {
    tr: "Sağlık turizmi rehberleri ve uzman tavsiyeleri",
    en: "Health tourism guides and expert advice",
    de: "Gesundheitstourismus-Ratgeber und Expertenratschläge",
    ar: "أدلة السياحة الصحية ونصائح الخبراء",
    ru: "Руководства по медицинскому туризму и советы экспертов",
    fr: "Guides de tourisme médical et conseils d'experts",
  };
  const geriBtn = {
    tr: "← Tüm Yazılar", en: "← All Posts", de: "← Alle Beiträge",
    ar: "→ جميع المقالات", ru: "← Все статьи", fr: "← Tous les articles",
  };
  const okumaSure = { tr: "okuma süresi", en: "read", de: "Lesezeit", ar: "قراءة", ru: "чтения", fr: "lecture" };

  const aktifYazi = YAZILAR.find(y => y.slug === seciliYazi);

  function renderIcerik(blok: any) {
    if (blok.tip === "h2") return (
      <h2 key={blok.icerik} style={{ fontSize: "22px", fontWeight: 700, color: "#0f0d2e", margin: "32px 0 12px" }}>{blok.icerik}</h2>
    );
    if (blok.tip === "p") return (
      <p key={blok.icerik.slice(0, 30)} style={{ fontSize: "16px", color: "#475569", lineHeight: 1.85, marginBottom: "16px" }}>{blok.icerik}</p>
    );
    if (blok.tip === "liste") return (
      <ul key={blok.icerik[0]} style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        {blok.icerik.map((m: string, i: number) => (
          <li key={i} style={{ fontSize: "15px", color: "#475569", lineHeight: 1.8, marginBottom: "6px" }}>{m}</li>
        ))}
      </ul>
    );
  }

  return (
    <main style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8f9ff" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0f0d2e 0%, #1e1b4b 100%)", padding: "64px 16px 48px", textAlign: "center" }}>
        <h1 style={{ fontSize: "40px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>
          {basliklar[d] || basliklar.en}
        </h1>
        <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)" }}>{altlar[d] || altlar.en}</p>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 16px" }}>

        {/* Yazı listesi */}
        {!seciliYazi && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {YAZILAR.map(yazi => (
              <div key={yazi.slug} onClick={() => setSeciliYazi(yazi.slug)} style={{ background: "#fff", borderRadius: "20px", padding: "28px 32px", border: "1px solid #e8e6ff", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#534AB7"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#e8e6ff"}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                  <div style={{ fontSize: "48px", flexShrink: 0 }}>{yazi.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>{yazi.tarih}</span>
                      <span style={{ fontSize: "12px", color: "#534AB7" }}>{yazi.sure[d] || yazi.sure.en}</span>
                    </div>
                    <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f0d2e", marginBottom: "10px", lineHeight: 1.4 }}>
                      {yazi.baslik[d] || yazi.baslik.en}
                    </h2>
                    <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                      {yazi.ozet[d] || yazi.ozet.en}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Yazı detayı */}
        {aktifYazi && (
          <div>
            <button onClick={() => setSeciliYazi(null)} style={{ background: "none", border: "none", color: "#534AB7", fontSize: "14px", cursor: "pointer", marginBottom: "24px", fontWeight: 600 }}>
              {geriBtn[d] || geriBtn.en}
            </button>
            <div style={{ background: "#fff", borderRadius: "20px", padding: "40px", border: "1px solid #e8e6ff" }}>
              <div style={{ fontSize: "56px", marginBottom: "16px" }}>{aktifYazi.emoji}</div>
              <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "13px", color: "#94a3b8" }}>{aktifYazi.tarih}</span>
                <span style={{ fontSize: "13px", color: "#534AB7" }}>{aktifYazi.sure[d] || aktifYazi.sure.en}</span>
              </div>
              <h1 style={{ fontSize: "30px", fontWeight: 800, color: "#0f0d2e", marginBottom: "24px", lineHeight: 1.3 }}>
                {aktifYazi.baslik[d] || aktifYazi.baslik.en}
              </h1>
              <div style={{ borderTop: "2px solid #f0eeff", paddingTop: "24px" }}>
                {(aktifYazi.icerik[d] || aktifYazi.icerik.en).map((blok: any) => renderIcerik(blok))}
              </div>
              <div style={{ marginTop: "40px", background: "#534AB7", borderRadius: "16px", padding: "28px", textAlign: "center" }}>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "18px", marginBottom: "8px" }}>
                  {dil === "tr" ? "Ücretsiz teklif almaya hazır mısınız?" : dil === "ar" ? "هل أنت مستعد للحصول على عرض مجاني؟" : dil === "ru" ? "Готовы получить бесплатное предложение?" : dil === "fr" ? "Prêt à obtenir un devis gratuit?" : dil === "de" ? "Bereit für ein kostenloses Angebot?" : "Ready to get a free quote?"}
                </p>
                <a href="/teklif" style={{ display: "inline-block", background: "#fff", color: "#534AB7", padding: "12px 28px", borderRadius: "10px", fontSize: "14px", textDecoration: "none", fontWeight: 700, marginTop: "8px" }}>
                  {dil === "tr" ? "Teklif Al" : dil === "ar" ? "احصل على عرض" : dil === "ru" ? "Получить предложение" : dil === "fr" ? "Obtenir un devis" : dil === "de" ? "Angebot erhalten" : "Get Quote"}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
