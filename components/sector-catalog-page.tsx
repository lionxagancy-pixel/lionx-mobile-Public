import { useMemo, useState } from "react";
import { FlatList, Platform, Text, TextInput, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { CatalogServiceCard } from "@/components/catalog-service-card";
import { services } from "@/shared/catalog";

const sectorLabels: Record<string, string> = {
  ALL: "كل الخدمات",
  PLAY: "PLAY · الألعاب والشحن",
  PAY: "PAY · الدفع الرقمي",
  GROW: "GROW · النمو والتسويق",
  DIGITAL: "DIGITAL · الاشتراكات والأدوات",
  VIP: "VIP · الخدمات الخاصة",
};

export function SectorCatalogPage({ sector = "ALL" }: { sector?: "ALL" | "PLAY" | "PAY" | "GROW" | "DIGITAL" | "VIP" }) {
  const [query, setQuery] = useState("");
  const data = useMemo(() => services.filter((item) => {
    const matchesSector = sector === "ALL" || item.sector.toUpperCase() === sector;
    const text = `${item.name} ${item.id} ${item.originalBrand} ${item.description}`.toLowerCase();
    return matchesSector && text.includes(query.toLowerCase());
  }), [query, sector]);

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
            <Text className="text-xs font-bold tracking-widest text-primary">LIONX CATALOG · {sector}</Text>
            <Text className="text-3xl font-black text-foreground">{sectorLabels[sector]}</Text>
            <Text className="text-sm leading-6 text-muted">خدمات أصلية من كتالوج LIONX، والتنفيذ يدوي عبر واتساب بعد مراجعة الطلب.</Text>
            <View className="flex-row items-center rounded-2xl border border-border bg-surface px-4">
              <IconSymbol name="magnifyingglass" size={20} color="#A9A39A" />
              <TextInput value={query} onChangeText={setQuery} placeholder="ابحث بالاسم أو الكود" placeholderTextColor="#77716A" className="flex-1 px-3 py-4 text-right text-sm text-foreground" />
            </View>
            <Text className="text-xs font-bold text-muted">{data.length.toLocaleString("en-US")} خدمة مطابقة</Text>
          </View>
        }
        renderItem={({ item }) => <CatalogServiceCard item={item} />}
        ListEmptyComponent={<View className="items-center py-10"><Text className="font-bold text-foreground">لا توجد خدمات مطابقة</Text><Text className="mt-2 text-sm text-muted">جرّب عبارة بحث أخرى.</Text></View>}
      />
    </ScreenContainer>
  );
}
