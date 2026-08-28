import { useState, type CSSProperties } from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View, type ImageStyle } from "react-native";
import { useRouter } from "expo-router";
import type { CatalogService } from "@/shared/catalog";
import { getCatalogImageSource, getCatalogImageWebPath } from "@/shared/catalog-images";
import { formatEgp } from "@/shared/catalog";

const sectorLabel: Record<string, string> = {
  PLAY: "PLAY",
  PAY: "PAY",
  GROW: "GROW",
  DIGITAL: "DIGITAL",
  VIP: "VIP",
};

export function CatalogServiceCard({ item }: { item: CatalogService }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const imageSource = getCatalogImageSource(item.image) ?? { uri: item.image };
  const webImagePath = getCatalogImageWebPath(item.image) ?? item.image;
  const sector = item.sector.toUpperCase();
  return (
    <Pressable
      onPress={() => router.push({ pathname: "/service/[id]", params: { id: item.id } })}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressed,
        hovered && styles.hovered,
      ]}
    >
      <View style={styles.card}>
        <View style={styles.imageWrap}>
          {Platform.OS === "web" ? (
            <img
              src={webImagePath}
              alt={item.originalBrand || item.name}
              style={webImageStyle}
            />
          ) : (
            <Image source={imageSource} resizeMode="contain" style={styles.image as ImageStyle} />
          )}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{sectorLabel[sector] ?? sector}</Text>
          </View>
        </View>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{item.description || item.originalBrand}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatEgp(item.price)}</Text>
          <Text style={styles.eta} numberOfLines={1}>{item.deliveryTime}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const webImageStyle: CSSProperties = { width: "100%", height: "100%", objectFit: "contain", display: "block" };

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    minWidth: 0,
    ...(Platform.OS === "web" ? { transitionDuration: "180ms", transitionProperty: "transform, box-shadow" } : {}),
  } as any,
  pressed: { opacity: 0.86, transform: [{ scale: 0.99 }] },
  hovered: {
    transform: [{ scale: 1.02 }],
    shadowColor: "#D4AF37",
    shadowOpacity: 0.26,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 7,
  },
  card: {
    minHeight: 260,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D4AF37",
    backgroundColor: "#FFFFFF",
    padding: 12,
    shadowColor: "#111111",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  imageWrap: {
    height: 112,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    position: "relative",
  },
  image: { width: "100%", height: "100%" },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 8,
    backgroundColor: "#D4AF37",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: { color: "#0A0A0A", fontSize: 10, fontWeight: "900", letterSpacing: 0.7 },
  name: { marginTop: 12, color: "#111111", fontSize: 14, fontWeight: "800", lineHeight: 19 },
  subtitle: { marginTop: 5, color: "#777777", fontSize: 11, lineHeight: 15 },
  footer: { marginTop: "auto", paddingTop: 12, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: 8 },
  price: { color: "#B18B18", fontSize: 13, fontWeight: "900", flexShrink: 1 },
  eta: { color: "#777777", fontSize: 10, maxWidth: "48%", textAlign: "right" },
});
