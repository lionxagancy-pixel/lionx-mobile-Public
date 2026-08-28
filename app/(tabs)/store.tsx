import { useMemo, useState } from "react";
import { FlatList, Platform, Pressable, Text, TextInput, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { CatalogServiceCard } from "@/components/catalog-service-card";
import { categories, services } from "@/shared/catalog";

export default function StoreScreen() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const data = useMemo(() => services.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    return matchesCategory && `${item.name} ${item.id} ${item.originalBrand}`.toLowerCase().includes(query.toLowerCase());
  }), [category, query]);

  return (
    <ScreenContainer className="px-4 pt-3">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={Platform.OS === "web" ? 4 : 2}
        columnWrapperStyle={{ gap: 16 }}
        contentContainerStyle={{ paddingBottom: 30, gap: 16 }}
        ListHeaderComponent={
          <View className="gap-4 pb-3">
            <Text className="text-3xl font-black text-foreground">متجر LIONX</Text>
            <Text className="text-sm text-muted">اكتشف 2,812 خدمة رقمية بصور العلامات الأصلية.</Text>
            <View className="flex-row items-center rounded-2xl border border-border bg-surface px-4">
              <IconSymbol name="magnifyingglass" size={20} color="#A9A39A" />
              <TextInput value={query} onChangeText={setQuery} placeholder="ابحث بالاسم أو الكود" placeholderTextColor="#77716A" className="flex-1 px-3 py-4 text-right text-sm text-foreground" />
            </View>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ gap: 8 }}
              renderItem={({ item }) => (
                <Pressable onPress={() => setCategory(item.id)}>
                  <View className={`rounded-full border px-4 py-2.5 ${category === item.id ? "border-primary bg-primary" : "border-border bg-surface"}`}>
                    <Text className={`text-xs font-bold ${category === item.id ? "text-background" : "text-foreground"}`}>{item.label} · {item.count}</Text>
                  </View>
                </Pressable>
              )}
            />
          </View>
        }
        renderItem={({ item }) => <CatalogServiceCard item={item} />}
        ListEmptyComponent={<View className="items-center py-10"><Text className="font-bold text-foreground">لا توجد خدمات مطابقة</Text><Text className="mt-2 text-sm text-muted">جرّب كلمة بحث أو قطاعًا آخر.</Text></View>}
      />
    </ScreenContainer>
  );
}
