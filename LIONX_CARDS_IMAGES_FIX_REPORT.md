# LIONX Cards & Catalog Images Fix Report

## الملخص

تم استبدال مصدر الكتالوج التجريبي ذي 8 خدمات بكتالوج LIONX الكامل المستخرج من ملف الرفع، وعدده **2,812 خدمة**. أصبحت البيانات تقرأ من `public/assets/data/catalog.json` عبر `shared/full-catalog.ts` و`FULL_CATALOG`، مع بقاء الأسعار بقيمة `0` للمعالجة اليدوية لاحقًا، وبقاء التنفيذ يدويًا عبر واتساب `01279332563` فقط.

## قبل / بعد

| البند | قبل Task 3 | بعد Task 3 |
|---|---:|---:|
| عدد الخدمات في مصدر الكتالوج | 8 | **2,812** |
| مصدر العرض | `shared/catalog.ts` محلي محدود | `FULL_CATALOG` من `public/assets/data/catalog.json` |
| القطاعات | واجهة محدودة | PLAY 888 · PAY 592 · GROW 444 · DIGITAL 888 · VIP 0 |
| صفحة المتجر | فلترة محدودة وكروت قديمة | شبكة كاملة مع بحث وفلاتر قطاعية |
| صفحات القطاعات | placeholder | `/categories`, `/play`, `/pay`, `/grow`, `/digital`, `/vip` تقرأ الكتالوج الكامل |
| شكل الكارت | بطاقة LIONX الأساسية | White Luxury Fintech: rounded-2xl، حد ذهبي، ظل، hover scale على Web |
| صورة الخدمة | مساحة/صورة محدودة | `object-contain` داخل مساحة بيضاء مع badge القطاع |
| السعر | قيم تجريبية محدودة | `0` في البيانات ويظهر «السعر يحدد يدويًا» |
| الدفع | يدوي | **يدوي فقط عبر واتساب، دون Paymob أو دفع آلي** |

## الصور ومصادرها

يحتوي الكتالوج المرفوع على **38 رابط صورة فريدًا** موزعًا على 2,812 خدمة. المصادر الفعلية في الملف هي Wikimedia Commons وCryptoLogos، وتشمل علامات مثل Netflix وSpotify وYouTube وChatGPT وMicrosoft وDisney+ وPUBG وPayPal وBinance وغيرها.

تم تحويل **22 صورة** أمكن تنزيلها إلى أصول PNG محلية شفافة بحجم 512×512 داخل `public/assets/catalog`. للصور التي واجهت rate limiting أو روابط قديمة، يحتفظ الكارت بالرابط الأصلي كـfallback ولا يستخدم placeholder مولدًا. تمت معالجة روابط Canva وShahid وPUBG وValorant القديمة بروابط Commons بديلة قابلة للتحميل.

ملف التتبع الكامل لمصدر كل صورة وحالتها هو `public/assets/data/catalog-image-manifest.json`.

## التغييرات البرمجية

- `public/assets/data/catalog.json`: الكتالوج الكامل.
- `public/assets/data/catalog.csv`: نسخة CSV المرجعية.
- `shared/full-catalog.ts`: تصدير `FULL_CATALOG` من JSON.
- `shared/catalog.ts`: اشتقاق `services` وعدادات القطاعات من `FULL_CATALOG` مع الحفاظ على توافق الفلاتر الحالية.
- `shared/catalog-images.ts`: خريطة الصور المحلية مع URI صريح لمسار GitHub Pages على Web و`require` للموبايل، مع fallback للمصدر الأصلي.
- `components/catalog-service-card.tsx`: كارت موحد بتصميم أبيض عائم، حد `#D4AF37`، ظل، `object-contain`، badge القطاع، اسم أسود bold، سعر ذهبي، ووقت تسليم رمادي.
- `components/sector-catalog-page.tsx`: شبكة قطاعية مشتركة للموبايل والويب.
- `app/(tabs)/store.tsx` و`app/(tabs)/index.tsx`: قراءة الكتالوج الكامل وشبكة 2 عمود للموبايل و4 للويب.
- `app/categories.tsx`, `app/play.tsx`, `app/pay.tsx`, `app/grow.tsx`, `app/digital.tsx`, `app/vip.tsx`: فلاتر قطاعية مباشرة.

## التحقق

- `pnpm check`: ناجح.
- `pnpm lint`: ناجح، مع تحذير Node غير مؤثر حول `type: module` في ESLint.
- `pnpm test`: ناجح؛ 6 اختبارات ناجحة و1 متجاوز موجود مسبقًا.
- `pnpm build`: ناجح؛ Expo Web صدّر 69 مسارًا ثابتًا.
- تم التأكد من وجود `web-dist/assets/data/catalog.json` بعدد 2,812 خدمة.
- تم التأكد من وجود `web-dist/store/index.html` و`web-dist/service/demo/index.html`، وأن سكربت `prepare-github-pages.py` يحوّل روابط الصفحات المتداخلة إلى مسارات مطلقة صحيحة تحت `/lionx-mobile-Public/`.
- تم التأكد من وجود أصول محلية لـNetflix وSpotify ضمن `web-dist/assets/catalog`، واختبار وصول PNG الخاص بـNetflix عبر HTTP 200 بعد النشر السابق.

## حدود التنفيذ

لم تتغير الألوان أو الفوتر أو صفحة الدفع. لم تتم إضافة Paymob أو أي دفع آلي، ولم توضع API Keys داخل الكود. لا تزال الأسعار `0` كما طلب المستخدم، وVIP لا يحتوي خدمات في ملف الكتالوج الحالي رغم وجود مساره وفلتره.

## Store information architecture update

- The store home now presents five LIONX pillars first: PLAY, PAY, GROW, DIGITAL, and VIP.
- It shows a small set of suggested services per pillar, followed by popular brand chips and a deliberate search/category mode.
- Search and category results are paginated in batches of 24 to avoid rendering all 2,812 services in one view.
- The card visuals and original catalog image mapping remain unchanged; no pricing, footer, payment, or WhatsApp behavior was changed.
