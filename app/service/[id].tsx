import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { services, formatEgp } from "@/shared/catalog";
import { useLionxStore } from "@/lib/lionx-store";

export function generateStaticParams() {
  return [{ id: "demo" }];
}

export default function ServiceDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const service = services.find((item) => item.id === id) ?? services[0];
  const { addToCart, favorites, toggleFavorite } = useLionxStore();
  const isFavorite = favorites.includes(service.id);
  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]} className="px-4 pt-3">
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}><Text className="text-sm font-bold text-primary">← العودة للمتجر</Text></Pressable>
        <View className="mt-6 h-48 items-center justify-center rounded-3xl border border-border bg-surface"><Text className="text-5xl font-black text-primary">{service.id.split("-")[0]}</Text></View>
        <View className="mt-6 flex-row items-start justify-between gap-3"><Text className="flex-1 text-3xl font-black text-foreground">{service.name}</Text><Pressable onPress={() => toggleFavorite(service.id)} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}><Text className="text-2xl text-primary">{isFavorite ? "♥" : "♡"}</Text></Pressable></View>
        <Text className="mt-2 text-base text-muted">{service.subtitle}</Text>
        <View className="mt-6 flex-row gap-3"><View className="flex-1 rounded-2xl bg-surface p-4"><Text className="text-xs text-muted">السعر</Text><Text className="mt-2 text-lg font-black text-primary">{formatEgp(service.price)}</Text></View><View className="flex-1 rounded-2xl bg-surface p-4"><Text className="text-xs text-muted">التسليم</Text><Text className="mt-2 text-lg font-black text-success">{service.eta}</Text></View></View>
        <View className="mt-5 rounded-2xl border border-border bg-surface p-5"><Text className="text-base font-black text-foreground">عن الخدمة</Text><Text className="mt-3 text-sm leading-6 text-muted">خدمة رقمية موثوقة من كتالوج LIONX. تتم مراجعة الطلب قبل التنفيذ، ويمكنك التواصل مع الدعم في أي وقت.</Text></View>
        <Pressable onPress={() => { addToCart(service); router.push("/checkout"); }} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}><View className="mt-6 items-center rounded-2xl bg-primary py-4"><Text className="font-black text-background">أضف للسلة · {formatEgp(service.price)}</Text></View></Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}
