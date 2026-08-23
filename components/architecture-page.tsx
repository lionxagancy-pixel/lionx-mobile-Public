import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { SocialFooter } from "@/components/social-footer";

type ArchitecturePageKey =
  | "categories"
  | "play"
  | "pay"
  | "grow"
  | "digital"
  | "vip"
  | "search"
  | "cart"
  | "wishlist"
  | "blog-detail"
  | "academy-detail"
  | "tools-detail"
  | "about"
  | "faq"
  | "contact"
  | "terms"
  | "privacy"
  | "support"
  | "customer-dashboard"
  | "admin-operations"
  | "admin-suppliers"
  | "admin-pricing"
  | "admin-analytics"
  | "admin-content"
  | "admin-users"
  | "admin-tickets"
  | "admin-coupons"
  | "pay-cards"
  | "pay-kyc"
  | "pay-charge"
  | "pay-withdraw"
  | "notifications";

type PageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  cards: { title: string; body: string }[];
};

const pages: Record<ArchitecturePageKey, PageContent> = {
  categories: { eyebrow: "LIONX CATEGORIES", title: "كل القطاعات", intro: "استكشف قطاعات LIONX واختر المسار الأقرب لهدفك قبل بدء الطلب.", cards: [{ title: "PLAY", body: "شحن وألعاب وخدمات رقمية للاعبين." }, { title: "PAY · GROW · DIGITAL · VIP", body: "مسارات دفع ونمو واشتراكات وعضوية مميزة." }] },
  play: { eyebrow: "PLAY", title: "قطاع الألعاب", intro: "خدمات الألعاب والشحن الرقمي في واجهة تمهيدية قابلة للتوسعة.", cards: [{ title: "خدمات اللاعبين", body: "ستظهر الخدمات المعتمدة بعد ربط المورد ومراجعة الأسعار." }] },
  pay: { eyebrow: "PAY", title: "خدمات الدفع", intro: "مسار الدفع اليدوي الحالي مع توضيح المراجعة قبل الاعتماد.", cards: [{ title: "الدفع اليدوي", body: "اختر طريقة التحويل وانسخ رقم محفظة LIONX ثم أرسل الإثبات للمراجعة." }, { title: "LionxPay", body: "خدمات البطاقات غير مفعّلة في هذه النسخة حتى اكتمال المتطلبات التنظيمية والتخزين الآمن." }] },
  grow: { eyebrow: "GROW", title: "خدمات النمو", intro: "حلول نمو وتسويق للشركات مع نطاق وعرض سعر قابلين للمراجعة.", cards: [{ title: "نطاق واضح", body: "ابدأ بتحديد الهدف والجمهور ومؤشرات النتيجة قبل طلب العرض." }] },
  digital: { eyebrow: "DIGITAL", title: "الخدمات الرقمية", intro: "اشتراكات وأدوات رقمية في كتالوج موحد للويب والموبايل.", cards: [{ title: "كتالوج منظم", body: "تظهر الخدمات والأسعار بعد اعتماد المورد وشروط الاستخدام." }] },
  vip: { eyebrow: "VIP", title: "عضوية LIONX VIP", intro: "مساحة تعريفية لمزايا العضوية المميزة دون تفعيل التزام مالي تلقائي.", cards: [{ title: "مزايا قادمة", body: "تُعرض بعد اعتماد الشروط والأسعار وطرق الاستحقاق." }] },
  search: { eyebrow: "SEARCH", title: "البحث", intro: "ابحث باسم الخدمة أو الكود بعد اكتمال فهرس الكتالوج.", cards: [{ title: "فهرس الخدمات", body: "الواجهة الحالية تمهيدية، وسترتبط ببيانات الكتالوج المعتمدة لاحقًا." }] },
  cart: { eyebrow: "CART", title: "السلة", intro: "راجع الخدمات والكميات قبل الانتقال إلى الدفع اليدوي.", cards: [{ title: "مراجعة قبل الدفع", body: "يمكنك تعديل السلة ثم دفع إجمالي الطلب بعد اختيار الطريقة المناسبة." }] },
  wishlist: { eyebrow: "WISHLIST", title: "المفضلة", intro: "احفظ الخدمات التي تريد العودة إليها لاحقًا.", cards: [{ title: "حفظ محلي", body: "تظل المفضلة محلية في هذه النسخة ولا تُشارك مع خادم خارجي." }] },
  "blog-detail": { eyebrow: "ARTICLE", title: "تفاصيل المقال", intro: "صفحة مقال قابلة للتوسعة بالمصادر والعناوين المعتمدة.", cards: [{ title: "المحتوى قيد الإعداد", body: "ستظهر المقالات التفصيلية بعد اعتماد النصوص والمصادر." }] },
  "academy-detail": { eyebrow: "COURSE DETAIL", title: "تفاصيل الكورس", intro: "مساحة تفاصيل الكورس والدروس والمتطلبات.", cards: [{ title: "المحتوى قيد الإعداد", body: "سيتم ربط الدروس والتقدم بعد اعتماد بنية الأكاديمية." }] },
  "tools-detail": { eyebrow: "TOOL DETAIL", title: "تفاصيل الأداة", intro: "صفحة تفاصيل أداة رقمية مع نطاق الاستخدام والنتيجة المتوقعة.", cards: [{ title: "الأداة قيد الإعداد", body: "تُضاف الأدوات بعد مراجعة الاستخدامات والبيانات اللازمة." }] },
  about: { eyebrow: "ABOUT LIONX", title: "عن LIONX", intro: "مول رقمي يجمع الخدمات والاشتراكات والأدوات ومسارات النمو في تجربة عربية واضحة.", cards: [{ title: "الوضوح أولًا", body: "نوضح ما هو متاح وما يحتاج مراجعة قبل تنفيذ الطلب." }] },
  faq: { eyebrow: "HELP CENTER", title: "الأسئلة الشائعة", intro: "إجابات أولية تساعدك على فهم الطلب والدفع والتتبع.", cards: [{ title: "متى يتم التنفيذ؟", body: "بعد مراجعة البيانات وتأكيد طريقة الدفع تظهر حالة الطلب في التتبع." }, { title: "هل الدفع فوري؟", body: "النسخة الحالية تسجل العملية للمراجعة اليدوية ولا تدعي تحصيلًا آليًا." }] },
  contact: { eyebrow: "CONTACT", title: "اتصل بنا", intro: "تواصل معنا عبر القنوات الرسمية مع الاحتفاظ برقم الطلب.", cards: [{ title: "الدعم عبر واتساب", body: "استخدم الرقم الرسمي 01279332563 وأرسل رقم الطلب عند التواصل." }] },
  terms: { eyebrow: "LEGAL", title: "الشروط والأحكام", intro: "واجهة أولية للنص القانوني تحتاج مراجعة واعتمادًا قبل الإنتاج.", cards: [{ title: "الطلبات", body: "يخضع التنفيذ لتوفر الخدمة ومراجعة البيانات وطريقة الدفع." }] },
  privacy: { eyebrow: "PRIVACY", title: "الخصوصية", intro: "مبادئ أولية للتعامل مع بيانات المستخدم تحتاج اعتماد النص النهائي.", cards: [{ title: "الحد الأدنى من البيانات", body: "نجمع ما يلزم لمعالجة الطلب والدعم فقط، ولا ترسل مفاتيح API أو بيانات حساسة." }] },
  support: { eyebrow: "SUPPORT", title: "الدعم", intro: "مركز دعم تمهيدي لتجميع الأسئلة ومتابعة الطلبات.", cards: [{ title: "قبل التواصل", body: "جهّز رقم الطلب وطريقة التحويل واسم ملف الإثبات للمراجعة." }] },
  "customer-dashboard": { eyebrow: "CUSTOMER", title: "لوحة العميل", intro: "مساحة موحدة للطلبات والمحفظة والمفضلة والإشعارات.", cards: [{ title: "حالة الحساب", body: "تظل البيانات محلية في هذه النسخة حتى تفعيل المصادقة والتخزين الآمن." }] },
  "admin-operations": { eyebrow: "ADMIN", title: "إدارة العمليات", intro: "واجهة إدارية تمهيدية لمراجعة الطلبات وعمليات B2B والأفيليت.", cards: [{ title: "RBAC مطلوب", body: "لا تُفتح العمليات الإدارية فعليًا قبل بناء صلاحيات آمنة وسجل تدقيق." }] },
  "admin-suppliers": { eyebrow: "ADMIN · SUPPLIERS", title: "إدارة الموردين", intro: "مساحة إدارة الموردين وربط الخدمات بعد التحقق والاعتماد.", cards: [{ title: "الموردون", body: "لا يوجد تكامل مورد فعّال في هذه النسخة." }] },
  "admin-pricing": { eyebrow: "ADMIN · PRICING", title: "محرك التسعير", intro: "واجهة تمهيدية لمحرك supplier + markup + fee + tax.", cards: [{ title: "الحالة", body: "المحرك غير مفعّل حتى اعتماد قواعد التسعير والصلاحيات." }] },
  "admin-analytics": { eyebrow: "ADMIN · ANALYTICS", title: "التحليلات", intro: "لوحة تحليلات تمهيدية لمتابعة الطلبات والأداء.", cards: [{ title: "البيانات", body: "ستظهر المؤشرات بعد تفعيل التخزين الآمن ومصادر البيانات المعتمدة." }] },
  "admin-content": { eyebrow: "ADMIN · CONTENT", title: "إدارة المحتوى", intro: "واجهة تمهيدية لإدارة الصفحات والعروض والمقالات.", cards: [{ title: "المحتوى", body: "تحتاج الإدارة إلى RBAC ومراجعة قبل النشر العام." }] },
  "admin-users": { eyebrow: "ADMIN · USERS", title: "إدارة المستخدمين", intro: "واجهة تمهيدية لإدارة المستخدمين والأدوار.", cards: [{ title: "الأمان", body: "لا توجد صلاحيات إدارية فعلية في هذه الواجهة حتى تنفيذ RBAC." }] },
  "admin-tickets": { eyebrow: "ADMIN · TICKETS", title: "إدارة التذاكر", intro: "مساحة تمهيدية لتذاكر الدعم والمتابعة.", cards: [{ title: "التذاكر", body: "سيتم ربطها بمركز الدعم بعد اعتماد نموذج البيانات." }] },
  "admin-coupons": { eyebrow: "ADMIN · COUPONS", title: "أكواد الخصم", intro: "واجهة تمهيدية للكوبونات، ومنها الكود LIONX2026.", cards: [{ title: "LIONX2026", body: "الكود ظاهر كمتطلب معماري فقط ولا يفعّل خصمًا تجاريًا قبل اعتماد القواعد." }] },
  "pay-cards": { eyebrow: "LIONXPAY", title: "البطاقات", intro: "صفحة بطاقات تمهيدية ضمن نطاق LionxPay غير المفعّل.", cards: [{ title: "غير مفعّل", body: "لا إصدار أو تخزين أو معالجة بطاقات في هذه النسخة." }] },
  "pay-kyc": { eyebrow: "LIONXPAY", title: "التحقق", intro: "صفحة تمهيدية لمتطلبات KYC/KYB قبل أي إصدار مالي.", cards: [{ title: "المتطلبات", body: "تحتاج مراجعة قانونية ومزودًا مرخصًا وتخزينًا آمنًا قبل التنفيذ." }] },
  "pay-charge": { eyebrow: "LIONXPAY", title: "شحن البطاقة", intro: "واجهة تمهيدية لشحن البطاقة غير المفعّل.", cards: [{ title: "غير متاح", body: "لا توجد عمليات شحن آلية أو تكامل بوابة دفع." }] },
  "pay-withdraw": { eyebrow: "LIONXPAY", title: "السحب", intro: "واجهة تمهيدية للسحب ضمن نطاق غير مفعّل.", cards: [{ title: "غير متاح", body: "لا توجد تحويلات أو سحوبات مالية من التطبيق." }] },
  notifications: { eyebrow: "NOTIFICATIONS", title: "الإشعارات", intro: "مساحة الإشعارات العامة وحالات الطلب.", cards: [{ title: "لا توجد إشعارات", body: "ستظهر الإشعارات بعد تفعيل التخزين الآمن وخدمة الإرسال." }] },
};

export function ArchitecturePage({ pageKey }: { pageKey: ArchitecturePageKey }) {
  const router = useRouter();
  const page = pages[pageKey];
  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]} className="px-4 pt-3">
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
          <Text className="text-sm font-bold text-primary">← رجوع</Text>
        </Pressable>
        <View className="mt-5 rounded-3xl border border-primary bg-surface p-5">
          <Text className="text-xs font-bold tracking-widest text-primary">{page.eyebrow}</Text>
          <Text className="mt-2 text-3xl font-black text-foreground">{page.title}</Text>
          <Text className="mt-3 text-sm leading-6 text-muted">{page.intro}</Text>
        </View>
        <View className="mt-5 gap-3">
          {page.cards.map((card) => (
            <View key={card.title} className="rounded-2xl border border-border bg-surface p-4">
              <Text className="text-base font-black text-foreground">{card.title}</Text>
              <Text className="mt-2 text-sm leading-6 text-muted">{card.body}</Text>
            </View>
          ))}
        </View>
        <View className="mt-5 rounded-3xl border border-border bg-surface p-5">
          <Text className="text-sm font-black text-foreground">واجهة معمارية تمهيدية</Text>
          <Text className="mt-2 text-xs leading-5 text-muted">المسار موجود ضمن بنية LIONX، وسيتم ربط البيانات والوظائف بعد اعتماد المصادر والصلاحيات والتخزين الآمن.</Text>
        </View>
        <SocialFooter />
      </ScrollView>
    </ScreenContainer>
  );
}

export function ArchitectureDetailPage({ pageKey, paramName }: { pageKey: "blog-detail" | "academy-detail" | "tools-detail"; paramName: "slug" | "id" }) {
  const params = useLocalSearchParams<Record<string, string>>();
  const value = params[paramName];
  return (
    <View className="flex-1">
      <ArchitecturePage pageKey={pageKey} />
      <Text className="sr-only">المعرّف: {value ?? "غير محدد"}</Text>
    </View>
  );
}
