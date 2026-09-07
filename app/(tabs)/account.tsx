import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { SocialFooter } from "@/components/social-footer";

const groups = [
  {
    title: "اكتشف LIONX",
    items: [
      { label: "العضويات VIP", slug: "vip" },
      { label: "العروض", slug: "offers" },
      { label: "الأدوات الرقمية", slug: "tools" },
      { label: "برنامج الشركاء", slug: "affiliate" },
    ],
  },
  {
    title: "المحتوى والمعرفة",
    items: [
      { label: "المدونة والأخبار", slug: "blog" },
      { label: "الكورسات", slug: "courses" },
      { label: "أكاديمية LIONX", slug: "academy" },
      { label: "مساعد LIONX الذكي", slug: "assistant" },
    ],
  },
  {
    title: "المساعدة والسياسات",
    items: [
      { label: "التواصل مع الدعم", slug: "contact" },
      { label: "الأسئلة الشائعة", slug: "faq" },
      { label: "مسار الشركات", slug: "corporate" },
      { label: "سياسة الخصوصية", slug: "privacy" },
      { label: "الشروط والأحكام", slug: "terms" },
      { label: "المفضلة", slug: "wishlist" },
    ],
  },
];

const directPages = ["blog", "courses", "academy", "tools", "offers", "corporate", "affiliate"];

export default function AccountScreen() {
  const router = useRouter();

  const openItem = (slug: string) => {
    if (slug === "assistant") return router.push("/assistant");
    if (directPages.includes(slug)) return router.push(`/${slug}` as "/blog" | "/courses" | "/academy" | "/tools" | "/offers" | "/corporate" | "/affiliate");
    return router.push({ pathname: "/content/[slug]", params: { slug } });
  };

  return (
    <ScreenContainer className="px-4 pt-3">
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Text className="text-3xl font-black text-foreground">حسابي</Text>
        <Text className="mt-2 text-sm text-muted">كل ما تحتاجه لإدارة رحلتك داخل LIONX.</Text>

        <Pressable onPress={() => router.push("/store")} className="mt-6 rounded-3xl border border-[#D4AF37]/40 bg-[#151515] p-5">
          <View className="flex-row items-center justify-between">
            <View className="h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/60 bg-[#D4AF37]/10">
              <Text className="text-xl font-black text-[#E6C65C]">LX</Text>
            </View>
            <View className="flex-1 px-4">
              <Text className="font-black text-foreground">اكتشف كنزك الرقمي</Text>
              <Text className="mt-1 text-xs leading-5 text-muted">تصفح البراندات والباقات واختر ما يناسبك.</Text>
            </View>
            <Text className="text-lg font-black text-[#E6C65C]">←</Text>
          </View>
        </Pressable>

        {groups.map((group) => (
          <View key={group.title} className="mt-7">
            <Text className="mb-3 text-xs font-black tracking-widest text-[#E6C65C]">{group.title}</Text>
            <View className="flex-row flex-wrap gap-3">
              {group.items.map((item) => (
                <Pressable key={item.slug} onPress={() => openItem(item.slug)} className="min-h-[62px] flex-1 basis-[45%] rounded-2xl border border-[#D4AF37]/25 bg-[#151515] px-4 py-3">
                  <View className="flex-row items-center justify-between">
                    <Text className="flex-1 text-right text-sm font-bold text-foreground">{item.label}</Text>
                    <Text className="ml-2 text-base font-black text-[#E6C65C]">←</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
        <SocialFooter />
      </ScrollView>
    </ScreenContainer>
  );
}
