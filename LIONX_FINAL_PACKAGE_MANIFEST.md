# LIONX Final Package Manifest

## Overview

هذه الحزمة هي نسخة LIONX المشتركة لـ Expo/React Native Web والموبايل بهوية RTL Black & Gold. تجمع النسخة الحالية بين الكتالوج، السلة، الدفع اليدوي، شحن الرصيد للمراجعة، صفحات المحتوى، صفحات الشركات، ومسارات معمارية Admin وLionxPay التمهيدية.

## Payment Flow

يتيح `/payment-methods` مسارين: دفع إجمالي الطلب الناتج من السلة، أو شحن رصيد يحدد العميل قيمته. تعرض الصفحة وسائل التحويل اليدوي التالية مع زر نسخ لكل قيمة:

| الطريقة | قيمة التحويل المعروضة |
|---|---|
| Vodafone Cash | `01055861819` |
| Orange Money | `01233309491` |
| InstaPay | `maxabx3@instapay` |

يجب على العميل إدخال رقم المحفظة التي حوّل منها، وإرفاق صورة أو PDF للإيصال. يتم حفظ بيانات الطلب محليًا بحالة `pending_review`، ولا تتم إضافة الرصيد أو اعتبار الدفع مكتملًا قبل تأكيد الفريق. زر واتساب في شاشة النجاح يستخدم الرقم الدولي `201279332563` ويرسل رقم الطلب والمبلغ ونوع العملية وبيانات المطابقة.

## Architecture

تمت إضافة مسارات معمارية 51 صفحة بصورة صريحة، بما في ذلك صفحات المحتوى العامة، تفاصيل المقالات والكورسات والأدوات، صفحات الشركات، صفحات الإدارة التمهيدية، وصفحات LionxPay غير المفعلة. المسارات الإدارية والمالية لا تمنح صلاحيات حقيقية ولا تنفذ عمليات بطاقات أو سحب أو شحن آلي.

## Run Locally

```bash
pnpm install --frozen-lockfile
pnpm dev:metro
```

لفتح نسخة Web ثابتة بعد البناء:

```bash
pnpm build
python3 -m http.server 8082 --directory web-dist
```

ثم افتح `http://localhost:8082/`.

## Quality Checks

تم تشغيل الأوامر التالية بنجاح قبل التغليف:

```bash
pnpm check
pnpm lint
pnpm test
pnpm build
```

## Security Boundaries

لا تحتوي هذه الحزمة على API Keys. لا يوجد تكامل دفع آلي أو LionxPay مفعّل، ولا يوجد تخزين خادمي للإيصالات. عناصر الإطلاق التجاري المتبقية هي RBAC فعلي، تخزين آمن، محرك supplier + markup + fee + tax، مورد موثق، ومزود دفع معتمد.

## GitHub Pages

ملف `.github/workflows/deploy-pages.yml` موجود للنشر التلقائي. يجب أن يفعّل مالك المستودع GitHub Pages من **Settings → Pages → Source → GitHub Actions**. بعد التفعيل، يكون رابط Pages المتوقع:

`https://lionxagancy-pixel.github.io/lionx-mobile-Public/`
