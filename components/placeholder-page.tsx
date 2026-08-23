import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { SocialFooter } from "@/components/social-footer";

type PageKey = "courses" | "blog" | "academy" | "tools" | "offers" | "corporate" | "affiliate";

type PageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  cards: { title: string; body: string }[];
};

const pages: Record<PageKey, PageContent> = {
  courses: {
    eyebrow: "LIONX COURSES",
    title: "الكورسات",
    intro: "مسارات تعليمية عملية تساعدك على فهم الأدوات الرقمية وبناء خطوات واضحة للنمو.",
    cards: [
      { title: "أساسيات التسويق الرقمي", body: "محتوى تمهيدي عن الجمهور والعرض والقنوات، وسيتم توسيعه بدروس موثقة." },
      { title: "اختيار الأدوات", body: "تعرف على طريقة مقارنة الأدوات قبل الاشتراك أو طلب الخدمة." },
    ],
  },
  blog: {
    eyebrow: "LIONX JOURNAL",
    title: "المدونة",
    intro: "مقالات تعليمية عن الأدوات الرقمية والنمو والتسويق، جاهزة للتوسعة بمصادر موثقة.",
    cards: [
      { title: "دليل البدء", body: "حدد هدفك وجمهورك قبل اختيار الخدمة أو الأداة المناسبة." },
      { title: "ملاحظات السوق", body: "محتوى تحليلي أولي يحتاج مصادر واعتمادًا قبل النشر العام." },
    ],
  },
  academy: {
    eyebrow: "LIONX ACADEMY",
    title: "أكاديمية LIONX",
    intro: "دروس قصيرة لبناء حضور رقمي وفهم الخدمات والأدوات المتاحة داخل المول.",
    cards: [
      { title: "المسار الأساسي", body: "ابدأ بتحديد الهدف والنتيجة المتوقعة قبل اختيار مسار التعلم." },
      { title: "المسار التجاري", body: "محتوى للشركات التي تحتاج نطاقًا واضحًا وعرض سعر قابلًا للمراجعة." },
    ],
  },
  tools: {
    eyebrow: "LIONX TOOLS",
    title: "أدوات رقمية",
    intro: "أدوات مساعدة للبحث والتخطيط والاختيار داخل منظومة LIONX.",
    cards: [
      { title: "مقارنة الخدمات", body: "قارن الوصف ووقت التسليم والسعر الظاهر قبل إضافة الخدمة إلى السلة." },
      { title: "حاسبة النطاق", body: "واجهة تمهيدية لتجميع احتياجات الشركات في طلب واحد للمراجعة." },
    ],
  },
  offers: {
    eyebrow: "LIONX OFFERS",
    title: "العروض",
    intro: "مساحة للعروض المعتمدة فقط، دون خصومات أو أرقام غير موثقة.",
    cards: [
      { title: "عروض قادمة", body: "ستظهر العروض بعد اعتماد المورد والشروط وتاريخ الانتهاء." },
      { title: "وضوح السعر", body: "أي سعر نهائي يظل خاضعًا للمراجعة قبل إنشاء الطلب." },
    ],
  },
  corporate: {
    eyebrow: "LIONX BUSINESS",
    title: "حلول للشركات",
    intro: "مسار B2B لمتطلبات النمو والتسويق والتحول الرقمي مع عرض نطاق ومراجعة قبل التنفيذ.",
    cards: [
      { title: "Quote Builder", body: "اختر الخدمات المطلوبة وأرسل طلب نطاق مبدئي للفريق." },
      { title: "مراجعة يدوية", body: "أي شروط ائتمانية أو أسعار مخصصة تحتاج مراجعة واعتمادًا منفصلًا." },
    ],
  },
  affiliate: {
    eyebrow: "LIONX AFFILIATE",
    title: "برنامج الشركاء",
    intro: "مسار أولي للشركاء الذين يرشحون خدمات LIONX، ويحتاج شروطًا وعمولات معتمدة قبل التفعيل.",
    cards: [
      { title: "كيف يعمل؟", body: "تشارك رابطًا أو توصية، ثم تتم مراجعة الإحالات قبل احتساب أي عمولة." },
      { title: "الحالة الحالية", body: "البرنامج تعريفي في هذه النسخة ولا ينشئ التزامًا ماليًا تلقائيًا." },
    ],
  },
};

export function PlaceholderPage({ pageKey }: { pageKey: PageKey }) {
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
          <Text className="text-sm font-black text-foreground">واجهة تمهيدية</Text>
          <Text className="mt-2 text-xs leading-5 text-muted">هذه الصفحة جزء من بنية LIONX الحالية، وسيتم ربط المحتوى الديناميكي بعد اعتماد مصادره وتشغيل لوحة الإدارة.</Text>
        </View>
        <SocialFooter />
      </ScrollView>
    </ScreenContainer>
  );
}
