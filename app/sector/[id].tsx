import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { formatEgp, mallPillars, services } from "@/shared/catalog";

const categoryMap: Record<string, string[]> = { play: ["gaming", "coins", "gift"], pay: ["coins", "gift"], grow: ["smm", "web"], digital: ["subs", "web"], vip: ["vip"] };

export default function SectorScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const pillar = mallPillars.find((item) => item.id === id) ?? mallPillars[0];
  const items = services.filter((service) => categoryMap[pillar.id]?.includes(service.category));
  return <ScreenContainer edges={["top", "left", "right"]} className="px-4 pt-3"><FlatList data={items} numColumns={2} keyExtractor={(item) => item.id} columnWrapperStyle={{ gap: 12 }} contentContainerStyle={{ gap: 12, paddingBottom: 28 }} ListHeaderComponent={<View className="pb-3"><Pressable onPress={() => router.back()} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}><Text className="text-sm font-bold text-primary">رجوع</Text></Pressable><View className="mt-5 rounded-3xl border border-primary bg-surface p-5"><Text className="text-xs font-black tracking-widest text-primary">{pillar.label}</Text><Text className="mt-2 text-3xl font-black text-foreground">{pillar.arabicLabel}</Text><Text className="mt-2 text-sm leading-5 text-muted">{pillar.description}</Text><Text className="mt-4 text-xs font-bold text-primary">{pillar.count.toLocaleString("en-US")} خدمة في هذا المسار</Text></View><Text className="mt-6 text-xl font-black text-foreground">الخدمات المتاحة</Text></View>} renderItem={({ item }) => <Pressable onPress={() => router.push({ pathname: "/service/[id]", params: { id: item.id } })} style={({ pressed }) => [{ flex: 1, opacity: pressed ? 0.72 : 1 }]}><View className="min-h-40 rounded-3xl border border-border bg-surface p-3"><View className="h-16 items-center justify-center rounded-2xl bg-background"><Text className="text-2xl font-black text-primary">{item.id.split("-")[0]}</Text></View><Text className="mt-3 text-sm font-black text-foreground" numberOfLines={1}>{item.name}</Text><Text className="mt-1 text-[11px] text-muted" numberOfLines={1}>{item.subtitle}</Text><Text className="mt-3 text-sm font-black text-primary">{formatEgp(item.price)}</Text></View></Pressable>} ListEmptyComponent={<View className="rounded-2xl border border-border bg-surface p-5"><Text className="font-bold text-foreground">لا توجد خدمات منشورة في هذا القطاع بعد</Text><Text className="mt-2 text-sm text-muted">أرسل طلبًا مخصصًا وسنراجع احتياجك.</Text></View>} /></ScreenContainer>;
}
