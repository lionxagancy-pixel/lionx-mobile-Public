import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, StyleSheet } from "react-native";
import { HapticTab } from "@/components/haptic-tab";
import { useColors } from "@/hooks/use-colors";

type NavIconName =
  | "home-outline"
  | "storefront-outline"
  | "wallet-outline"
  | "package-variant-closed"
  | "account-outline";

function BottomNavIcon({ name, color }: { name: NavIconName; color: string }) {
  return <MaterialCommunityIcons name={name} size={23} color={color} style={styles.icon} />;
}

const styles = StyleSheet.create({
  icon: { marginTop: 1 },
});

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 10 : Math.max(insets.bottom, 8);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#D4AF37",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarButton: HapticTab,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "800",
          marginTop: 1,
        },
        tabBarIconStyle: {
          height: 25,
          marginBottom: 0,
        },
        tabBarItemStyle: {
          minHeight: 58,
          paddingTop: 3,
        },
        tabBarStyle: {
          paddingTop: 5,
          paddingBottom: bottomPadding,
          height: 64 + bottomPadding,
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "الرئيسية",
          tabBarIcon: ({ color }) => <BottomNavIcon name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "المتجر",
          tabBarIcon: ({ color }) => <BottomNavIcon name="storefront-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "المحفظة",
          tabBarIcon: ({ color }) => <BottomNavIcon name="wallet-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "الطلبات",
          tabBarIcon: ({ color }) => <BottomNavIcon name="package-variant-closed" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "حسابي",
          tabBarIcon: ({ color }) => <BottomNavIcon name="account-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
