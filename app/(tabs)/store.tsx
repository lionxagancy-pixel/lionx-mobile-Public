import { useMemo, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { CatalogBrandCard } from "@/components/catalog-brand-card";
import { catalogBrands, categories, mallPillars, services } from "@/shared/catalog";

const categoryByPillar: Record<string, string> = {
  play: "gaming",
  pay: "pay",
  grow: "grow",
  digital: "digital",
  vip: "vip",
};

export default function StoreScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredBrands = useMemo(() => catalogBrands.filter((brand) => {
    const matchesCategory = category === "all" || brand.category === category;
    const packageNames = brand.packages.map((item) => item.name).join(" ");
    const searchable = `${brand.name} ${brand.id} ${brand.originalBrand} ${brand.description} ${packageNames}`.toLowerCase();
    return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
  }), [category, normalizedQuery]);

  const featuredBrands = useMemo(() => [...catalogBrands]
    .sort((a, b) => b.packages.length - a.packages.length)
    .slice(0, 10), []);

  const showFlatResults = category !== "all" || Boolean(normalizedQuery);

  const selectCategory = (nextCategory: string) => setCategory(nextCategory);

  return (
    <ScreenContainer className="px-4 pt-3">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="gap-4">
          <View className="gap-1">
            <Text className="text-3xl font-black text-foreground">متجر LIONX</Text>
            <Text className="text-sm leading-6 text-muted">اختار البراند مرة واحدة، وبعدها اختار الباقة من صفحة الخدمة. التصفح منظم عشان تلاقي طلبك بسرعة.</Text>
          </View>

          <View className="flex-row items-center rounded-2xl border border-border bg-surface px-4">
            <IconSymbol name="magnifyingglass" size={20} color="#A9A39A" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="ابحث باسم البراند أو الباقة أو الكود"
              placeholderTextColor="#77716A"
              className="flex-1 px-3 py-4 text-right text-sm text-foreground"
            />
          </View>

          <Text className="text-xs font-black tracking-widest text-primary">فلتر القطاعات</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {categories.map((item) => (
              <Pressable key={item.id} onPress={() => selectCategory(item.id)}>
                <View className={`rounded-full border px-4 py-2.5 ${category === item.id ? "border-primary bg-primary" : "border-border bg-surface"}`}>
                  <Text className={`text-xs font-bold ${category === item.id ? "text-background" : "text-foreground"}`}>{item.label} · {item.count} باقة</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          {!showFlatResults ? (
            <>
              <View className="gap-3">
                <View className="flex-row items-end justify-between">
                  <View>
                    <Text className="text-xl font-black text-foreground">اختار عالمك</Text>
                    <Text className="mt-1 text-xs text-muted">خمس ركائز واضحة بدل قائمة طويلة</Text>
                  </View>
                  <Text className="text-xs font-bold text-primary">{services.length.toLocaleString("ar-EG")} باقة داخل {catalogBrands.length} براند</Text>
                </View>
                <View style={styles.pillarGrid}>
                  {mallPillars.map((pillar) => (
                    <Pressable
                      key={pillar.id}
                      onPress={() => router.push(`/${pillar.id}`)}
                      style={({ pressed }) => [styles.pillarCell, pressed && styles.pressed]}
                    >
                      <View style={[styles.pillarCard, { borderColor: pillar.accent }]}>
                        <View style={styles.pillarTopline}>
                          <Text style={styles.pillarLabel}>{pillar.label}</Text>
                          <Text style={styles.pillarCount}>{pillar.count.toLocaleString("ar-EG")}</Text>
                        </View>
                        <Text style={styles.pillarTitle}>{pillar.arabicLabel}</Text>
                        <Text style={styles.pillarDescription}>{pillar.description}</Text>
                        <Text style={styles.pillarLink}>استكشف القسم ←</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="gap-3">
                <View className="flex-row items-end justify-between">
                  <View>
                    <Text className="text-xl font-black text-foreground">براندات مقترحة للبدء</Text>
                    <Text className="mt-1 text-xs text-muted">كل براند يظهر مرة واحدة، والباقات داخل صفحة التفاصيل</Text>
                  </View>
                </View>
                {mallPillars.map((pillar) => {
                  const pillarBrands = catalogBrands.filter((brand) => brand.category === categoryByPillar[pillar.id]).slice(0, 4);
                  if (!pillarBrands.length) return null;
                  return (
                    <View key={pillar.id} className="gap-2">
                      <View className="flex-row items-center justify-between">
                        <Text className="text-base font-black text-foreground">{pillar.label} · {pillar.arabicLabel}</Text>
                        <Pressable onPress={() => router.push(`/${pillar.id}`)}>
                          <Text className="text-xs font-bold text-primary">عرض الكل</Text>
                        </Pressable>
                      </View>
                      <View style={styles.grid}>
                        {pillarBrands.map((brand) => <View key={brand.id} style={styles.gridCell}><CatalogBrandCard brand={brand} /></View>)}
                      </View>
                    </View>
                  );
                })}
              </View>

              <View style={styles.brandStrip}>
                <Text style={styles.brandHeading}>براندات شائعة</Text>
                <View style={styles.brandWrap}>
                  {featuredBrands.map((brand) => (
                    <Pressable key={brand.id} onPress={() => { setQuery(brand.name); setCategory("all"); }}>
                      <View style={styles.brandChip}><Text style={styles.brandText}>{brand.name}</Text></View>
                    </Pressable>
                  ))}
                </View>
              </View>
            </>
          ) : (
            <View className="gap-3">
              <View className="flex-row items-end justify-between">
                <View>
                  <Text className="text-xl font-black text-foreground">نتائج البراندات</Text>
                  <Text className="mt-1 text-xs text-muted">{filteredBrands.length} براند، كل براند مرة واحدة</Text>
                </View>
                <Pressable onPress={() => { setQuery(""); selectCategory("all"); }}>
                  <Text className="text-xs font-bold text-primary">رجوع للأقسام</Text>
                </Pressable>
              </View>
              {filteredBrands.length ? (
                <View style={styles.grid}>
                  {filteredBrands.map((brand) => <View key={brand.id} style={styles.gridCell}><CatalogBrandCard brand={brand} /></View>)}
                </View>
              ) : (
                <View className="items-center py-10"><Text className="font-bold text-foreground">لا توجد براندات مطابقة</Text><Text className="mt-2 text-sm text-muted">جرّب كلمة بحث أو قطاعًا آخر.</Text></View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  pillarGrid: { flexDirection: "row" as const, flexWrap: "wrap" as const, gap: 12 },
  pillarCell: { width: Platform.OS === "web" ? "18.8%" : "48%", minWidth: Platform.OS === "web" ? 150 : 0 } as any,
  pillarCard: { minHeight: 154, borderRadius: 18, borderWidth: 1, backgroundColor: "#0D0D0D", padding: 16 },
  pillarTopline: { flexDirection: "row" as const, alignItems: "center" as const, justifyContent: "space-between" as const },
  pillarLabel: { color: "#D4AF37", fontSize: 12, fontWeight: "900", letterSpacing: 1.3 },
  pillarCount: { color: "#FFF7DC", fontSize: 11, fontWeight: "800" },
  pillarTitle: { marginTop: 18, color: "#FFFFFF", fontSize: 16, fontWeight: "900", textAlign: "right" as const },
  pillarDescription: { marginTop: 6, color: "#B8B2A8", fontSize: 11, lineHeight: 17, textAlign: "right" as const },
  pillarLink: { marginTop: 15, color: "#D4AF37", fontSize: 11, fontWeight: "800", textAlign: "right" as const },
  pressed: { opacity: 0.84, transform: [{ scale: 0.99 }] },
  grid: { flexDirection: "row" as const, flexWrap: "wrap" as const, gap: 16 },
  gridCell: { width: Platform.OS === "web" ? "23.2%" : "48%", minWidth: 0 } as any,
  brandStrip: { marginTop: 4, borderTopWidth: 1, borderTopColor: "#D4AF37", paddingTop: 16 },
  brandHeading: { color: "#111111", fontSize: 15, fontWeight: "900", textAlign: "right" as const },
  brandWrap: { marginTop: 10, flexDirection: "row" as const, flexWrap: "wrap" as const, gap: 8 },
  brandChip: { borderRadius: 999, borderWidth: 1, borderColor: "#D4AF37", backgroundColor: "#FFFFFF", paddingHorizontal: 12, paddingVertical: 8 },
  brandText: { color: "#111111", fontSize: 11, fontWeight: "800" },
});
