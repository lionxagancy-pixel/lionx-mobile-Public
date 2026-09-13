# LIONX — ملف الحالة النهائية وما ينقص

**تاريخ التحديث:** 11 سبتمبر 2026

## 1. الخلاصة التنفيذية

تم تجهيز نسخة LIONX Web قابلة للعرض والنشر، مع الحفاظ على الهوية RTL Black & Gold، الكتالوج التجريبي، التنفيذ اليدوي عبر واتساب، وصفحات المتجر والدفع والفوتر. تم رفع المصدر إلى مستودع GitHub، وإضافة إعداد Workflow لمحاولة إنشاء APK Android من الهاتف.

**المهم:** نسخة APK لم تكتمل حتى الآن. تم تشغيل Workflow مرتين، لكن GitHub لم يجد Secret باسم `EXPO_TOKEN`، لذلك توقف البناء قبل أن يبدأ EAS في إنشاء APK. لا يوجد رابط APK صالح حاليًا، ولا ينبغي اعتبار رابط GitHub Actions رابط تحميل للتطبيق.

## 2. الروابط الحالية

| الاستخدام | الرابط |
|---|---|
| الموقع الرئيسي | <https://lionxagancy-pixel.github.io/lionx-mobile-Public/> |
| المتجر | <https://lionxagancy-pixel.github.io/lionx-mobile-Public/store/> |
| صفحة الدفع | <https://lionxagancy-pixel.github.io/lionx-mobile-Public/payment-methods/> |
| مستودع المصدر | <https://github.com/lionxagancy-pixel/lionx-mobile-Public> |
| Actions لبناء APK | <https://github.com/lionxagancy-pixel/lionx-mobile-Public/actions/workflows/build-android-apk.yml> |
| إعداد Secrets | <https://github.com/lionxagancy-pixel/lionx-mobile-Public/settings/secrets/actions> |

## 3. ما تم بناؤه

تم تجهيز تطبيق Expo/React Native واحد للويب والموبايل باستخدام Expo SDK 54 وReact Native 0.81 وExpo Router وTypeScript وNativeWind. يحتوي المصدر على صفحات المتجر، الأقسام، الدفع اليدوي، رفع إثبات الدفع، المحفظة، الطلبات، الحساب، صفحات المحتوى، وصفحات المعمارية والتقارير.

تم ربط التنفيذ اليدوي برقم واتساب **01279332563**، مع إبقاء الدفع الآلي وLionxPay وPaymob غير مفعّلين. لم يتم وضع Supplier API Keys أو مفاتيح دفع داخل الواجهة الأمامية.

تم إدراج الكتالوج التجريبي البالغ **2,812 سجلًا**، مع تنظيمه حسب البراند والقطاع بدل عرض المنتجات بصورة مسطحة. التقرير الخاص بالكتالوج يوضح أن البيانات الحالية Demo Dataset وليست Inventory تجاريًا مؤكدًا من Gamsgo.

تم إصلاح مسارات صور البراندات والدفع والسوشيال للويب، وإضافة الفوتر الموحد الذي يحتوي على روابط Facebook وInstagram وTikTok وThreads وTelegram وLinkedIn وWhatsApp، بالإضافة إلى روابط القطاعات وصفحات الشروط والخصوصية والمدونة والكورسات.

تم تجهيز إعدادات Android في `app.config.ts`، ومنها:

```text
App name: LIONX Mobile
Android package: com.app.lionxmobile
Expo SDK: 54
```

كما تمت إضافة:

```text
eas.json
.github/workflows/build-android-apk.yml
```

## 4. ما تم رفعه إلى GitHub

آخر commit حالي هو:

```text
126aa78 — ci: fix pnpm workflow cache
```

والـcommit السابق أضاف ملفات البناء:

```text
38f8cc4 — ci: add Android preview APK build workflow
```

ملف Workflow يستخدم `pnpm`, يتحقق من TypeScript، ثم يشغّل:

```bash
eas build --platform android --profile preview --non-interactive
```

## 5. حالة APK Android

تم تشغيل Workflow رقم:

```text
34545221068
```

النتيجة:

```text
completed / failure
```

سبب الفشل:

```text
An Expo user account is required to proceed.
Either log in with eas login or set the EXPO_TOKEN environment variable.
```

هذا يعني أن إعداد الكود وملف Workflow موجودان، لكن GitHub لا يقرأ Secret باسم `EXPO_TOKEN` داخل مستودع LIONX. لا توجد مشكلة مثبتة في أيقونة التطبيق أو في الكود من سجل الفشل الحالي.

## 6. الخطوة الوحيدة المطلوبة لإكمال APK

من الهاتف افتح:

<https://github.com/lionxagancy-pixel/lionx-mobile-Public/settings/secrets/actions>

ثم اختر **New repository secret** واكتب الاسم حرفيًا:

```text
EXPO_TOKEN
```

ضع قيمة Access Token من حساب Expo، ثم احفظ. بعد ذلك افتح:

<https://github.com/lionxagancy-pixel/lionx-mobile-Public/actions/workflows/build-android-apk.yml>

اضغط:

```text
Run workflow → main → Run workflow
```

عند النجاح سيظهر تشغيل بعلامة صح خضراء. رابط APK النهائي سيظهر في سجل EAS الناتج من Workflow أو داخل حساب Expo.

لا تضع Token داخل الكود ولا ترسله في المحادثة.

## 7. ما ينقص قبل الإطلاق التجاري

| الأولوية | النقص | الأثر |
|---|---|---|
| حرجة | إضافة `EXPO_TOKEN` لإتمام APK | تمنع إنشاء نسخة Android التجريبية فقط |
| حرجة | نشر Backend دائم | مطلوب لتخزين الطلبات والإيصالات والمستخدمين بشكل حقيقي |
| حرجة | الحصول على بيانات مورد حقيقية | الكتالوج الحالي Demo وليس مخزونًا تجاريًا مثبتًا |
| عالية | بناء محرك التسعير supplier + markup + fee + tax | مطلوب قبل تسعير الخدمات فعليًا |
| عالية | Admin RBAC | مطلوب لإدارة المنتجات والأسعار والطلبات والصلاحيات |
| عالية | تخزين آمن للإيصالات | مطلوب قبل الاعتماد التجاري على رفع إثبات الدفع |
| متوسطة | ربط Gamsgo أو الموردين بعقد وAPI/ملفات مصرح بها | مطلوب للتنفيذ المنظم بعد الطلب |
| متوسطة | اختبارات Android فعلية على أجهزة متعددة | مطلوب قبل نشر Google Play |
| منخفضة | إعداد Google Play Console ومواد المتجر | مطلوب للنشر العام وليس للـAPK التجريبي |

## 8. ما لا يجب فعله الآن

لا تُفعّل الدفع الآلي، ولا تضع مفاتيح API في React Native أو GitHub Pages، ولا تعتبر الأسعار الحالية أسعار بيع، ولا تعتمد على الكتالوج التجريبي كمخزون حقيقي قبل تنظيفه أو استبداله ببيانات مورد مصرح بها.

## 9. تشغيل المصدر على جهاز تطوير

بعد فك ZIP داخل مجلد المشروع:

```bash
pnpm install
pnpm check
npx expo start
```

لبناء APK يدويًا بعد تسجيل الدخول إلى Expo:

```bash
npx eas-cli@latest login
npx eas-cli@latest build --platform android --profile preview
```

## 10. ملفات مهمة داخل الحزمة

```text
app/                         صفحات التطبيق
components/                  مكونات البطاقات والفوتر والدفع
public/assets/               الصور والكتالوج
shared/catalog.ts            منطق تجميع الكتالوج
public/assets/data/catalog.json  الكتالوج التجريبي
app.config.ts                إعدادات Expo وAndroid
eas.json                    إعدادات EAS
.github/workflows/           Workflow بناء APK والنشر
web-dist/                    نسخة الويب المبنية
LIONX_HANDOVER.md            دليل التسليم الأساسي
LIONX_FINAL_STATUS_AND_GAPS.md  هذا التقرير
```

## الحكم النهائي

**LIONX Web MVP جاهز للعرض والتسليم كنسخة تجريبية، ومصدر Android جاهز للبناء.** لكنه ليس إطلاقًا تجاريًا مكتملًا بعد؛ أهم النواقص هي Secret الخاص بـExpo لإنتاج APK، وBackend دائم، وبيانات مورد حقيقية، ومحرك التسعير، ولوحة Admin RBAC، وتخزين آمن للإيصالات.

هذا التقرير لا يعتبر APK مبنيًا ولا يعتبر الكتالوج الحالي Inventory حقيقيًا.

### مراجع رسمية

- [Expo Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Build Setup](https://docs.expo.dev/build/setup/)
- [Expo Access Tokens](https://docs.expo.dev/accounts/programmatic-access/)
