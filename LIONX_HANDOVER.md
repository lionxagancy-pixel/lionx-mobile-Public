# LIONX — Handover Package

## الروابط المنشورة

- الموقع: https://lionxagancy-pixel.github.io/lionx-mobile-Public/
- المتجر: https://lionxagancy-pixel.github.io/lionx-mobile-Public/store/
- الدفع اليدوي: https://lionxagancy-pixel.github.io/lionx-mobile-Public/payment-methods/

## الحالة الحالية

المشروع Expo SDK 54 / React Native / Expo Router / NativeWind، ويعمل Web وموبايل RTL. الكتالوج الحالي تجريبي للعرض، والأسعار غير مفعلة تجاريًا. الدفع يدوي فقط عبر Vodafone Cash وOrange Money وInstaPay مع رفع إثبات الدفع، والتنفيذ عبر واتساب 01279332563.

## آخر تحسينات الواجهة

تم تثبيت مسارات public مباشرة لشعارات السوشيال وطرق الدفع حتى تظهر على GitHub Pages، وإضافة SocialFooter إلى المتجر وحسابي والمحفظة والطلبات وصفحة الدفع. تم الحفاظ على `public/assets/data/catalog.json` و`shared/catalog.ts` والأسعار وBuckflow API دون تعديل.

## التشغيل المحلي

```bash
pnpm install
pnpm check
pnpm t
pnpm build
python3 scripts/prepare-github-pages.py
```

## ملاحظات التسليم

لا يحتوي هذا الأرشيف على `node_modules` أو `.git` أو أي ملف أسرار. قبل تشغيل تجاري حقيقي يجب استبدال الكتالوج التجريبي ببيانات مورد موثقة تحتوي على SKU وتكلفة وتوفر وسعر وتنفيذ.
