import { useState } from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View, type ImageStyle } from "react-native";
import { useRouter } from "expo-router";
import type { CSSProperties } from "react";
import type { CatalogBrand } from "@/shared/catalog";
import { getCatalogImageSource, getCatalogImageWebPath } from "@/shared/catalog-images";

const sectorLabel: Record<string, string> = {
  PLAY: "PLAY",
  PAY: "PAY",
  GROW: "GROW",
  DIGITAL: "DIGITAL",
  VIP: "VIP",
};

export function CatalogBrandCard({ brand }: { brand: CatalogBrand }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const imageSource = getCatalogImageSource(brand.image) ?? { uri: brand.image };
  const webImagePath = getCatalogImageWebPath(brand.image) ?? brand.image;
  const sector = brand.sector.toUpperCase();

  return (
    <Pressable
      onPress={() => router.push({ pathname: "/service/[id]", params: { id: brand.id } })}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressed,
        hovered && styles.hovered,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`فتح باقات ${brand.name}`}
    >
      <View style={styles.card}>
        <View style={styles.imageWrap}>
          {Platform.OS === "web" ? (
            <img src={webImagePath} alt={brand.name} style={webImageStyle} />
          ) : (
            <Image source={imageSource} resizeMode="contain" style={styles.image as ImageStyle} />
          )}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{sectorLabel[sector] ?? sector}</Text>
          </View>
        </View>
        <Text style={styles.name} numberOfLines={2}>{brand.name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.packageCount}>{brand.packages.length} باقة</Text>
          <Text style={styles.eta} numberOfLines={1}>{brand.deliveryTime}</Text>
        </View>
        <View style={styles.cta}>
          <Text style={styles.ctaText}>اختار الباقة ←</Text>
        </View>
      </View>
    </Pressable>
  );
}

const webImageStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  display: "block",
};

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    minWidth: 0,
    ...(Platform.OS === "web" ? { transitionDuration: "180ms", transitionProperty: "transform, box-shadow" } : {}),
  } as any,
  pressed: { opacity: 0.86, transform: [{ scale: 0.98 }] },
  hovered: {
    transform: [{ scale: 1.02 }],
    shadowColor: "#D4AF37",
    shadowOpacity: 0.26,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 7,
  },
  card: {
    width: "100%",
    aspectRatio: 1,
    minHeight: 0,
    overflow: "hidden",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D4AF37",
    backgroundColor: "#FFFFFF",
    padding: 10,
    shadowColor: "#111111",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  imageWrap: {
    height: 76,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    position: "relative",
  },
  image: { width: "100%", height: "100%" },
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    borderRadius: 7,
    backgroundColor: "#D4AF37",
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  badgeText: { color: "#0A0A0A", fontSize: 9, fontWeight: "900", letterSpacing: 0.6 },
  name: { marginTop: 8, color: "#111111", fontSize: 13, fontWeight: "900", lineHeight: 17, textAlign: "right" },
  metaRow: { marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 4 },
  packageCount: { color: "#B18B18", fontSize: 10, fontWeight: "900" },
  eta: { flex: 1, color: "#777777", fontSize: 9, textAlign: "right" },
  cta: { marginTop: 6, borderTopWidth: 1, borderTopColor: "#EFE4B5", paddingTop: 7 },
  ctaText: { color: "#111111", fontSize: 10, fontWeight: "900", textAlign: "right" },
});
