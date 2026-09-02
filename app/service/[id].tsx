import { useMemo, useState } from "react";
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { CSSProperties } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { catalogBrands, formatEgp, getCatalogBrand, getCatalogBrandForService } from "@/shared/catalog";
import { getCatalogImageSource, getCatalogImageWebPath } from "@/shared/catalog-images";
import { useLionxStore } from "@/lib/lionx-store";
import { CARD_THEME } from "@/shared/brand-theme";

export function generateStaticParams() {
  return [{ id: "demo" }, ...catalogBrands.map((brand) => ({ id: brand.id }))];
}

export default function ServiceDetailsScreen() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const router = useRouter();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const brand = getCatalogBrand(rawId) ?? getCatalogBrandForService(rawId ?? "") ?? catalogBrands[0];
  const initialPackage = brand.packages.find((item) => item.id === rawId) ?? brand.packages[0];
  const [selectedId, setSelectedId] = useState(initialPackage.id);
  const selectedPackage = useMemo(() => brand.packages.find((item) => item.id === selectedId) ?? brand.packages[0], [brand, selectedId]);
  const { addToCart, favorites, toggleFavorite } = useLionxStore();
  const isFavorite = favorites.includes(selectedPackage.id);
  const imageSource = getCatalogImageSource(brand.image) ?? { uri: brand.image };
  const webImagePath = getCatalogImageWebPath(brand.image) ?? brand.image;

  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]} className="px-4 pt-3">
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
          <Text className="text-sm font-bold text-primary">← العودة للمتجر</Text>
        </Pressable>

        <View className="mt-5 overflow-hidden rounded-3xl border" style={styles.hero}>
          <View className="h-44 items-center justify-center p-6" style={styles.heroImage}>
            {Platform.OS === "web" ? (
              <img src={webImagePath} alt={brand.name} style={webImageStyle} />
            ) : (
              <Image source={imageSource} resizeMode="contain" style={{ width: "100%", height: "100%" }} />
            )}
          </View>
          <View className="border-t p-4" style={styles.heroInfo}>
            <View className="flex-row items-center justify-between gap-3">
              <Text className="rounded-lg bg-primary px-2.5 py-1 text-[10px] font-black text-background">{brand.sector}</Text>
              <Text className="flex-1 text-right text-xs font-bold text-muted">{brand.packages.length} باقة متاحة</Text>
            </View>
            <Text className="mt-2 text-2xl font-black text-foreground">{brand.name}</Text>
            <Text className="mt-1 text-sm leading-6 text-muted">{brand.description}</Text>
          </View>
        </View>

        <View className="mt-6 flex-row items-end justify-between gap-3">
          <View className="flex-1">
            <Text className="text-xl font-black text-foreground">اختار الباقة</Text>
            <Text className="mt-1 text-xs leading-5 text-muted">اختار القيمة المناسبة، وبعدها نراجع الطلب وننفذه يدويًا عبر واتساب.</Text>
          </View>
          <Pressable onPress={() => toggleFavorite(selectedPackage.id)} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
            <Text className="text-2xl text-primary">{isFavorite ? "♥" : "♡"}</Text>
          </Pressable>
        </View>

        <View className="mt-4 gap-3">
          {brand.packages.map((item) => {
            const selected = item.id === selectedPackage.id;
            return (
              <Pressable key={item.id} onPress={() => setSelectedId(item.id)} style={({ pressed }) => [{ opacity: pressed ? 0.82 : 1 }]}>
                <View className="flex-row items-center justify-between rounded-2xl border p-4" style={selected ? styles.selectedPackage : styles.package}>
                  <View className={`h-5 w-5 items-center justify-center rounded-full border ${selected ? "border-primary bg-primary" : "border-border bg-background"}`}>
                    {selected ? <View className="h-2 w-2 rounded-full bg-background" /> : null}
                  </View>
                  <View className="flex-1 px-3">
                    <Text className="text-right text-sm font-black text-foreground">{item.name}</Text>
                    <Text className="mt-1 text-right text-xs text-muted">{item.deliveryTime} · تنفيذ يدوي</Text>
                  </View>
                  <Text className="text-sm font-black text-primary">{formatEgp(item.price)}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View className="mt-5 flex-row gap-3">
          <View className="flex-1 rounded-2xl border border-border bg-surface p-4">
            <Text className="text-xs text-muted">الباقة المختارة</Text>
            <Text className="mt-2 text-sm font-black text-foreground" numberOfLines={2}>{selectedPackage.name}</Text>
          </View>
          <View className="flex-1 rounded-2xl border border-border bg-surface p-4">
            <Text className="text-xs text-muted">التسليم</Text>
            <Text className="mt-2 text-sm font-black text-success">{selectedPackage.eta}</Text>
          </View>
        </View>

        <Pressable onPress={() => { addToCart(selectedPackage); router.push("/checkout"); }} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}>
          <View className="mt-6 items-center rounded-2xl bg-primary py-4">
            <Text className="font-black text-background">أضف الباقة للسلة · {formatEgp(selectedPackage.price)}</Text>
          </View>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

const webImageStyle: CSSProperties = { width: "100%", height: "100%", objectFit: "contain", display: "block" };

const styles = StyleSheet.create({
  hero: { borderColor: CARD_THEME.cardBorder, backgroundColor: CARD_THEME.cardBackground },
  heroImage: { backgroundColor: CARD_THEME.cardBackground },
  heroInfo: { borderTopColor: CARD_THEME.cardDivider, backgroundColor: CARD_THEME.cardSoftBackground },
  selectedPackage: { borderColor: CARD_THEME.cardBorder, backgroundColor: CARD_THEME.cardHighlight },
  package: { borderColor: CARD_THEME.cardDivider, backgroundColor: CARD_THEME.cardBackground },
});
