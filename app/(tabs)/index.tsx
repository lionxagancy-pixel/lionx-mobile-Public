import { useMemo, useState } from "react";
import { FlatList, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { SocialFooter } from "@/components/social-footer";
import { CatalogServiceCard } from "@/components/catalog-service-card";
import { audiencePaths, categories, mallPillars, services } from "@/shared/catalog";

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = useMemo(() => services.filter((service) => {
    const matchesCategory = activeCategory === "all" || service.category === activeCategory;
    const haystack = `${service.name} ${service.id} ${service.subtitle}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }), [activeCategory, query]);

  return (
    <ScreenContainer edges={["top", "left", "right"]} containerClassName="bg-background" className="px-4 pt-3">
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={Platform.OS === "web" ? 4 : 2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 28 }}
        ListHeaderComponent={
          <View className="gap-4 pb-2">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <View className="h-11 w-11 items-center justify-center rounded-2xl bg-primary">
                  <Text className="text-lg font-black text-background">LX</Text>
                </View>
                <View>
                  <Text className="text-xs font-semibold tracking-widest text-primary">LIONX</Text>
                  <Text className="text-lg font-bold text-foreground">FINAL MALL</Text>
                </View>
              </View>
              <Pressable onPress={() => router.push("/wallet")} style={({ pressed }) => [{ opacity: pressed ? 0.65 : 1 }]}>
                <View className="h-11 w-11 items-center justify-center rounded-full border border-border bg-surface">
                  <IconSymbol name="account-balance-wallet" size={21} color="#D4AF37" />
                </View>
              </Pressable>
            </View>
            <View className="rounded-3xl border border-border bg-surface px-5 py-5">
              <Text className="text-xs font-bold tracking-widest text-primary">LIONX AI POWERED V17</Text>
              <Text className="mt-2 text-3xl font-black leading-9 text-foreground">كل خدمة رقمية،{"\n"}بلمسة واحدة.</Text>
              <Text className="mt-2 text-sm leading-5 text-muted">شحن فوري، ضمان ذهبي، وتجربة مصممة لك.</Text>
              <View className="mt-5 flex-row gap-2">
                {[`${services.length.toLocaleString("en-US")} خدمة`, "15 قسمًا", "تأكيد يدوي"].map((stat) => <View key={stat} className="rounded-xl bg-background px-2.5 py-2"><Text className="text-[10px] font-bold text-primary">{stat}</Text></View>)}
              </View>
            </View>
            <View className="flex-row items-center rounded-2xl border border-border bg-surface px-4">
              <IconSymbol name="search" size={21} color="#A9A39A" />
              <TextInput value={query} onChangeText={setQuery} placeholder="ابحث باسم الخدمة أو الكود" placeholderTextColor="#77716A" className="flex-1 px-3 py-4 text-right text-sm text-foreground" returnKeyType="search" />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {categories.map((category) => (
                <Pressable key={category.id} onPress={() => setActiveCategory(category.id)} style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}>
                  <View className={`flex-row items-center gap-2 rounded-full border px-4 py-2.5 ${activeCategory === category.id ? "border-primary bg-primary" : "border-border bg-surface"}`}>
                    <Text className={`text-xs font-bold ${activeCategory === category.id ? "text-background" : "text-foreground"}`}>{category.label}</Text>
                    <Text className={`text-[10px] ${activeCategory === category.id ? "text-background" : "text-muted"}`}>{category.count}</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
            <View className="gap-3">
              <View className="flex-row items-end justify-between px-1">
                <Text className="text-xl font-black text-foreground">اختار مسارك</Text>
                <Text className="text-xs font-bold text-primary">LIONX MALL</Text>
              </View>
              <View className="flex-row gap-3">
                {audiencePaths.map((path) => (
                  <Pressable key={path.id} onPress={() => router.push(path.id === "b2b" ? "/account" : "/store")} style={({ pressed }) => [{ flex: 1, opacity: pressed ? 0.72 : 1 }]}>
                    <View className={`rounded-2xl border p-3 ${path.id === "b2b" ? "border-primary bg-primary" : "border-border bg-surface"}`}>
                      <Text className={`text-sm font-black ${path.id === "b2b" ? "text-background" : "text-foreground"}`}>{path.label}</Text>
                      <Text className={`mt-1 text-[11px] leading-4 ${path.id === "b2b" ? "text-background" : "text-muted"}`} numberOfLines={2}>{path.description}</Text>
                      <Text className={`mt-2 text-[10px] font-black ${path.id === "b2b" ? "text-background" : "text-primary"}`}>{path.cta} ←</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
            <View className="gap-3">
              <View className="flex-row items-end justify-between px-1">
                <Text className="text-xl font-black text-foreground">قطاعات المول</Text>
                <Text className="text-xs font-bold text-primary">5 مسارات</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
                {mallPillars.map((pillar) => (
                  <Pressable key={pillar.id} onPress={() => router.push({ pathname: "/sector/[id]", params: { id: pillar.id } })} style={({ pressed }) => [{ opacity: pressed ? 0.72 : 1 }]}>
                    <View className="w-36 rounded-2xl border border-border bg-surface p-3">
                      <Text className="text-xs font-black tracking-widest text-primary">{pillar.label}</Text>
                      <Text className="mt-1 text-sm font-bold text-foreground">{pillar.arabicLabel}</Text>
                      <Text className="mt-1 text-[10px] leading-4 text-muted" numberOfLines={2}>{pillar.description}</Text>
                      <Text className="mt-2 text-[10px] font-bold text-primary">{pillar.count.toLocaleString("en-US")} خدمة</Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
            <View className="flex-row items-end justify-between px-1">
              <Text className="text-xl font-black text-foreground">خدمات مختارة</Text>
              <Pressable onPress={() => router.push("/store")}><Text className="text-xs font-bold text-primary">عرض الكل ←</Text></Pressable>
            </View>
          </View>
        }
        renderItem={({ item }) => <CatalogServiceCard item={item} />}
        ListEmptyComponent={<View className="items-center py-10"><Text className="font-bold text-foreground">لا توجد خدمات مطابقة</Text><Text className="mt-2 text-sm text-muted">جرّب كلمة بحث أو تصنيفًا آخر.</Text></View>}
        ListFooterComponent={<SocialFooter />}
      />
    </ScreenContainer>
  );
}
