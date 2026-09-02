import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  return <Tabs screenOptions={{ tabBarActiveTintColor: "#D4AF37", tabBarInactiveTintColor: "#9CA3AF", headerShown: false, tabBarButton: HapticTab, tabBarStyle: { paddingTop: 8, paddingBottom: bottomPadding, height: 56 + bottomPadding, backgroundColor: colors.background, borderTopColor: colors.border, borderTopWidth: 0.5 } }}>
    <Tabs.Screen name="index" options={{ title: "الرئيسية", tabBarIcon: ({ color }) => <IconSymbol size={23} name="house.fill" color={color} /> }} />
    <Tabs.Screen name="store" options={{ title: "المتجر", tabBarIcon: ({ color }) => <IconSymbol size={23} name="square.grid.2x2.fill" color={color} /> }} />
    <Tabs.Screen name="wallet" options={{ title: "المحفظة", tabBarIcon: ({ color }) => <IconSymbol size={23} name="wallet.pass" color={color} /> }} />
    <Tabs.Screen name="orders" options={{ title: "الطلبات", tabBarIcon: ({ color }) => <IconSymbol size={23} name="receipt" color={color} /> }} />
    <Tabs.Screen name="account" options={{ title: "حسابي", tabBarIcon: ({ color }) => <IconSymbol size={23} name="person.crop.circle" color={color} /> }} />
  </Tabs>;
}
