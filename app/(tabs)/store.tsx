import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { categories, formatEgp, services } from "@/shared/catalog";

export default function StoreScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const data = useMemo(() => services.filter((item) => (category === "all" || item.category === category) && `${item.name} ${item.id}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return <ScreenContainer className="px-4 pt-3"><FlatList data={data} keyExtractor={(item) => item.id} contentContainerStyle={{ paddingBottom: 30, gap: 12 }} ListHeaderComponent={<View className="gap-4 pb-3"><Text className="text-3xl font-black text-foreground">متجر LIONX</Text><Text className="text-sm text-muted">اكتشف أكثر من 2,812 خدمة رقمية.</Text><View className="flex-row items-center rounded-2xl border border-border bg-surface px-4"><IconSymbol name="magnifyingglass" size={20} color="#A9A39A" /><TextInput value={query} onChangeText={setQuery} placeholder="ابحث بالاسم أو الكود" placeholderTextColor="#77716A" className="flex-1 px-3 py-4 text-right text-sm text-foreground" /></View><FlatList data={categories} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(item) => item.id} contentContainerStyle={{ gap: 8 }} renderItem={({ item }) => <Pressable onPress={() => setCategory(item.id)}><View className={`rounded-full border px-4 py-2.5 ${category === item.id ? "border-primary bg-primary" : "border-border bg-surface"}`}><Text className={`text-xs font-bold ${category === item.id ? "text-background" : "text-foreground"}`}>{item.label}</Text></View></Pressable>} /></View>} renderItem={({ item }) => <Pressable onPress={() => router.push({ pathname: "/service/[id]", params: { id: item.id } })} style={({ pressed }) => [{ opacity: pressed ? 0.72 : 1 }]}><View className="flex-row items-center rounded-2xl border border-border bg-surface p-4"><View className="h-14 w-14 items-center justify-center rounded-xl bg-background"><Text className="font-black text-primary">{item.id.split("-")[0]}</Text></View><View className="flex-1 px-3"><Text className="font-black text-foreground">{item.name}</Text><Text className="mt-1 text-xs text-muted">{item.subtitle}</Text></View><Text className="font-black text-primary">{formatEgp(item.price)}</Text></View></Pressable>} /></ScreenContainer>;
}
