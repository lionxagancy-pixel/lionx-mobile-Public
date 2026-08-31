import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Platform, Pressable, Text, View } from "react-native";
import { CatalogBrandCard } from "@/components/catalog-brand-card";
import { ScreenContainer } from "@/components/screen-container";
import { catalogBrands, mallPillars } from "@/shared/catalog";

export function generateStaticParams() {
  return [{ id: "demo" }, ...mallPillars.map((pillar) => ({ id: pillar.id }))];
}

export default function SectorScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const pillar = mallPillars.find((item) => item.id === id) ?? mallPillars[0];
  const category = pillar.id === "play" ? "gaming" : pillar.id;
  const items = catalogBrands.filter((brand) => brand.category === category);

  return (
    <ScreenContainer edges={["top", "left", "right"]} className="px-4 pt-3">
      <FlatList
        data={items}
        numColumns={Platform.OS === "web" ? 4 : 2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ gap: 16 }}
        contentContainerStyle={{ gap: 16, paddingBottom: 28 }}
        ListHeaderComponent={
          <View className="pb-3">
            <Pressable onPress={() => router.back()} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
              <Text className="text-sm font-bold text-primary">رجوع</Text>
            </Pressable>
            <View className="mt-5 rounded-3xl border border-primary bg-surface p-5">
              <Text className="text-xs font-black tracking-widest text-primary">{pillar.label}</Text>
              <Text className="mt-2 text-3xl font-black text-foreground">{pillar.arabicLabel}</Text>
              <Text className="mt-2 text-sm leading-5 text-muted">{pillar.description}</Text>
              <Text className="mt-4 text-xs font-bold text-primary">{items.length} براند · {pillar.count.toLocaleString("en-US")} اختيار باقة</Text>
            </View>
            <Text className="mt-6 text-xl font-black text-foreground">البراندات المتاحة</Text>
            <Text className="mt-1 text-xs text-muted">كل براند يظهر مرة واحدة، والباقات بعد الفتح.</Text>
          </View>
        }
        renderItem={({ item }) => <CatalogBrandCard brand={item} />}
        ListEmptyComponent={<View className="rounded-2xl border border-border bg-surface p-5"><Text className="font-bold text-foreground">لا توجد خدمات منشورة في هذا القطاع بعد</Text><Text className="mt-2 text-sm text-muted">أرسل طلبًا مخصصًا وسنراجع احتياجك.</Text></View>}
      />
    </ScreenContainer>
  );
}
