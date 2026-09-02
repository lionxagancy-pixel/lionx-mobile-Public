# دليل تغيير هوية كروت LIONX

توجد ألوان الكروت المربعة في الملف:

```text
shared/brand-theme.ts
```

لإنشاء هوية بصرية مختلفة، عدّل قيم `CARD_THEME` فقط، ثم شغّل فحص TypeScript ونسخة Web.

| المتغير | الاستخدام الحالي | قيمة LIONX الحالية |
|---|---|---|
| `cardBackground` | خلفية الكارت والصورة | `#FFFFFF` |
| `cardBorder` | الحدود الذهبية وظل الـhover | `#D4AF37` |
| `cardHighlight` | خلفية الباقة المختارة | `#FFF9E8` |
| `cardSoftBackground` | الجزء التعريفي في صفحة التفاصيل | `#FFFDF6` |
| `cardDivider` | الخط الفاصل داخل الكارت | `#EFE4B5` |
| `cardText` | النص الأساسي داخل الكارت | `#111111` |
| `cardMuted` | النص الثانوي | `#777777` |
| `cardShadow` | لون الظل الأساسي | `#111111` |
| `accent` | لون الشارة الذهبية | `#D4AF37` |

مثال لهوية زرقاء وبيضاء:

```ts
export const CARD_THEME = {
  cardBackground: "#FFFFFF",
  cardBorder: "#2563EB",
  cardHighlight: "#EFF6FF",
  cardSoftBackground: "#F8FAFC",
  cardDivider: "#BFDBFE",
  cardText: "#0F172A",
  cardMuted: "#64748B",
  cardShadow: "#0F172A",
  accent: "#2563EB",
} as const;
```

مثال لهوية بنفسجية فاخرة:

```ts
export const CARD_THEME = {
  cardBackground: "#FFFBFE",
  cardBorder: "#8B5CF6",
  cardHighlight: "#F5F3FF",
  cardSoftBackground: "#FAF5FF",
  cardDivider: "#DDD6FE",
  cardText: "#1E1B4B",
  cardMuted: "#6B7280",
  cardShadow: "#312E81",
  accent: "#8B5CF6",
} as const;
```

بعد الحفظ، نفّذ:

```bash
pnpm check
pnpm test -- --run
pnpm build
python3 scripts/prepare-github-pages.py
```

العرض سيظل **كارتين في الصف على الموبايل** وكروتًا مربعة؛ تغيير الألوان لا يغيّر منطق تجميع البراندات أو اختيار الباقات أو الدفع اليدوي.
