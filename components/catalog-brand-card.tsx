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
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed, hovered && styles.hovered]}
      accessibilityRole="button"
      accessibilityLabel={`استكشف باقات ${brand.name}`}
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
        <Text style={styles.discovery}>اكتشف الاختيارات المتاحة</Text>
        <View style={styles.cta}>
          <Text style={styles.ctaText}>استكشف الباقات ←</Text>
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
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 7,
  },
  card: {
    width: "100%",
    minHeight: 190,
    overflow: "hidden",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.36)",
    backgroundColor: "#151515",
    padding: 9,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 5,
  },
  imageWrap: {
    height: 70,
    borderRadius: 12,
    backgroundColor: "#F7F7F4",
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
  name: { marginTop: 8, color: "#FFFFFF", fontSize: 13, fontWeight: "900", lineHeight: 17, textAlign: "right" },
  discovery: { marginTop: 4, color: "#B9B4A2", fontSize: 10, fontWeight: "700", textAlign: "right" },
  cta: { marginTop: 8, borderTopWidth: 1, borderTopColor: "rgba(212,175,55,0.28)", paddingTop: 7 },
  ctaText: { color: "#E6C65C", fontSize: 10, fontWeight: "900", textAlign: "right", textDecorationLine: "underline" },
});
