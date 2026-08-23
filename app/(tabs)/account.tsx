import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

const links = [
  { label: "العضويات VIP", slug: "vip" },
  { label: "المدونة والأخبار", slug: "blog" },
  { label: "الكورسات", slug: "courses" },
  { label: "التواصل مع الدعم", slug: "contact" },
  { label: "سياسة الخصوصية", slug: "privacy" },
  { label: "الشروط والأحكام", slug: "terms" },
  { label: "الأسئلة الشائعة", slug: "faq" },
  { label: "مسار الشركات", slug: "corporate" },
  { label: "العروض", slug: "offers" },
  { label: "أكاديمية LIONX", slug: "academy" },
  { label: "الأدوات الرقمية", slug: "tools" },
  { label: "المفضلة", slug: "wishlist" },
  { label: "برنامج الشركاء", slug: "affiliate" },
  { label: "مساعد LIONX الذكي", slug: "assistant" },
];

export default function AccountScreen() {
  const router = useRouter();
  return <ScreenContainer className="px-4 pt-3"><ScrollView contentContainerStyle={{ paddingBottom: 28 }}><Text className="text-3xl font-black text-foreground">حسابي</Text><Text className="mt-2 text-sm text-muted">إعداداتك ومركز المساعدة.</Text><View className="mt-6 flex-row items-center rounded-3xl border border-border bg-surface p-5"><View className="h-14 w-14 items-center justify-center rounded-full bg-primary"><Text className="text-xl font-black text-background">LX</Text></View><View className="flex-1 px-4"><Text className="font-black text-foreground">زائر LIONX</Text><Text className="mt-1 text-xs text-muted">يمكنك البدء باستكشاف الخدمات الآن</Text></View></View>{links.map((item) => <Pressable key={item.slug} onPress={() => item.slug === "assistant" ? router.push("/assistant") : ["blog", "courses", "academy", "tools", "offers", "corporate", "affiliate"].includes(item.slug) ? router.push(`/${item.slug}` as "/blog" | "/courses" | "/academy" | "/tools" | "/offers" | "/corporate" | "/affiliate") : router.push({ pathname: "/content/[slug]", params: { slug: item.slug } })} style={({ pressed }) => [{ opacity: pressed ? 0.65 : 1 }]}><View className="mt-3 flex-row items-center justify-between rounded-2xl border border-border bg-surface p-4"><Text className="font-bold text-foreground">{item.label}</Text><Text className="text-lg text-primary">←</Text></View></Pressable>)}</ScrollView></ScreenContainer>;
}
