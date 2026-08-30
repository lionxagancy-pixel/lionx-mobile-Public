# تقرير استعادة صور كروت LIONX

## الملخص التنفيذي

تم استكمال مسار استعادة الصور في كتالوج LIONX الكامل، مع الحفاظ على هوية **RTL Black & Gold** والكروت البيضاء العائمة والفلاتر القطاعية والدفع اليدوي عبر واتساب. مصدر البيانات ما زال `public/assets/data/catalog.json` ويحتوي على **2,812 خدمة** و**38 رابط صورة فريدًا**؛ وكل رابط أصبح له أصل PNG محلي بمقاس **512×512** داخل `public/assets/catalog`. لم تتغير الأسعار، وما زالت القيمة `0` للتسعير اليدوي، ولم تتم إضافة Paymob أو دفع آلي أو API Keys.

التحسين المهم في هذه الجولة هو إزالة الاعتماد على روابط الصور القديمة المكسورة للعلامات التي أعادت HTTP 404 أو 429، واستبدالها بمصادر عامة قابلة للتنزيل ثم حفظها محليًا. هذه الصور هي شعارات العلامات العامة وليست صور منتجات أو ملفات API خاصة بمورد Gamsgo؛ لذلك يبقى ربط صور المورد الأصلية عبر Supplier API خطوة لاحقة مستقلة.

## قبل / بعد

| البند | قبل الاستعادة | بعد الاستعادة |
|---|---:|---:|
| الخدمات في الكتالوج | 2,812 | **2,812** |
| روابط الصور الفريدة | 38 | **38** |
| الأصول المحلية PNG | 22 | **38** |
| الأصول المفقودة أو الفاشلة في manifest | 16 | **0** |
| مقاس الأصول المحلية | غير موحد | **512×512 RGBA** |
| روابط الصور القديمة المكسورة في `catalog.json` | 16 | **0** |
| السعر | 0 | **0، تسعير يدوي** |
| التنفيذ | يدوي | **يدوي عبر واتساب 01279332563** |

## مصادر الصور النهائية

| نوع المصدر | عدد الأصول | الاستخدام |
|---|---:|---|
| مصادر الكتالوج القديمة التي تم تنزيلها محليًا | 22 | Wikimedia Commons وCryptoLogos، وتشمل Netflix وSpotify وYouTube وChatGPT وPUBG وPayPal وBinance وغيرها |
| Simple Icons CDN | 7 | Discord وTwitch وRoblox وLeague of Legends وPayoneer وWise وTikTok |
| Favicons من نطاقات العلامات | 3 | Canva وAdobe وSkrill، من خلال نطاقات العلامات العامة |
| صور شعارات عامة مكتشفة عبر البحث | 6 | Garena وCall of Duty وMobile Legends وGenshin وNeteller وPerfect Money |
| **الإجمالي** | **38** | **كلها محفوظة محليًا كـPNG 512×512** |

ملف التتبع `public/assets/data/catalog-image-manifest.json` يحتفظ بالمصدر، واسم الملف المحلي، وحالة التنزيل، ونوع المصدر، وهاش مختصر لكل أصل. أما `shared/catalog-images.ts` فيحوّل كل أصل إلى `require` للموبايل وURI صريح للويب مع دعم مسار GitHub Pages `/lionx-mobile-Public/`.

> **تنبيه مصدر:** الأصول العامة البديلة تثبت ظهور شعار العلامة داخل الكارت، لكنها لا تثبت أنها ملفات صور خاصة بمورد Gamsgo. لا ينبغي تسويقها كصور مخزون أو صور مورد قبل الحصول على Supplier API أو ملفات رسمية منه.

## التغييرات البرمجية

| الملف | التغيير |
|---|---|
| `public/assets/data/catalog.json` | تحديث 16 رابطًا مكسورًا إلى مصادر عامة قابلة للتحميل، مع بقاء عدد الخدمات 2,812 والأسعار صفرًا |
| `public/assets/data/catalog-image-manifest.json` | تسجيل 38 مصدرًا بحالة `downloaded` وعدم وجود حالات فشل |
| `public/assets/catalog/*.png` | إضافة 16 أصلًا جديدًا، مع بقاء الأصول السابقة؛ جميع الأصول 512×512 وRGBA |
| `scripts/restore-missing-catalog-images.py` | سكربت قابل لإعادة التشغيل لتنزيل المصادر، إزالة الخلفية المتصلة بالحواف، rasterization، وتحديث catalog وmanifest |
| `scripts/generate-catalog-images-map.py` | توليد خريطة Web/Mobile مباشرة من manifest بدل تحريرها يدويًا |
| `shared/catalog-images.ts` | خريطة كاملة لجميع الأصول المحلية مع URI الويب و`require` للموبايل |
| `components/catalog-service-card.tsx` | لم تتغير الهوية؛ بقيت الخلفية البيضاء والحد الذهبي والصورة `contain` والـbadge والشبكة الحالية |

## التحقق الفني

| الفحص | النتيجة |
|---|---|
| `pnpm check` | ناجح |
| `pnpm build` | ناجح، وExpo Web صدّر 69 مسارًا ثابتًا |
| `web-dist/assets/data/catalog.json` | موجود ويحتوي على 2,812 خدمة |
| `web-dist/assets/data/catalog-image-manifest.json` | موجود ويحتوي على 38 أصلًا بحالة تنزيل ناجحة |
| أصول `*-brand.png` الجديدة | 16 ملفًا، كل ملف 512×512 وRGBA |
| `/store` و`/service/demo` | موجودان في static export |
| نظام الدفع | لم يتغير، وما زال يدويًا عبر واتساب وإيصال |
| مفاتيح API | لا توجد مفاتيح API مضافة إلى الواجهة |

## الملفات المهمة للمراجعة

يمكن مراجعة لوحة المعاينة المحلية في `LIONX_CATALOG_NEW_ASSETS_CONTACT_SHEET.png`. وتوجد تفاصيل المصدر وحالة كل أصل في `public/assets/data/catalog-image-manifest.json`، بينما توجد قاعدة الكتالوج في `public/assets/data/catalog.json`.

## التحقق الحي بعد النشر

تم نشر commit `80ffea9` بنجاح عبر Workflow GitHub Pages رقم `33294377802`. صفحة المتجر الحية هي [LIONX Store](https://lionxagancy-pixel.github.io/lionx-mobile-Public/store/?v=80ffea9). أعادت الصفحة 2,812 خدمة والعدادات القطاعية PLAY 888 وPAY 592 وGROW 444 وDIGITAL 888 وVIP 0. كما كشف DOM عن صور PNG محلية تحت مسار `/lionx-mobile-Public/assets/catalog/`، وأظهر الفحص البصري كروتًا بيضاء عائمة بحدود ذهبية وشعارات PUBG وPayPal ظاهرة.

## ما تبقى قبل الإطلاق التجاري

أصبح مسار الصور المحلية صالحًا للنسخة الحالية، لكن توجد ثلاث نقاط منفصلة عن هذه الجولة. أولًا، صور المورد الأصلية الخاصة بخدمات Gamsgo تحتاج ملفات أو API من المورد؛ لا يمكن استخراجها بأمان أو دقة من دون مصدر يسمح بذلك. ثانيًا، الأسعار ما زالت صفرًا كما طلب المستخدم وتحتاج محرك التسعير اللاحق `supplier + markup + fee + tax`. ثالثًا، صلاحيات Admin RBAC والتخزين الآمن للإيصالات يجب أن تسبق أي قرار بالدفع الآلي، مع استمرار تعطيل LionxPay وعدم وضع الأسرار في الواجهة.

## المراجع

[1]: https://cdn.simpleicons.org/ "Simple Icons CDN"
[2]: https://www.google.com/s2/favicons "Google favicon service used for public brand-domain favicons"
[3]: https://commons.wikimedia.org/ "Wikimedia Commons"
[4]: https://cryptologos.cc/ "CryptoLogos"
[5]: https://github.com/lionxagancy-pixel/lionx-mobile-Public "LIONX public repository"
