import { ScrollView, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

export default function OrdersScreen() {
  return <ScreenContainer className="px-4 pt-3"><ScrollView contentContainerStyle={{ paddingBottom: 28 }}><Text className="text-3xl font-black text-foreground">طلباتي</Text><Text className="mt-2 text-sm text-muted">تابع حالة خدماتك وعملياتك.</Text><View className="mt-6 rounded-3xl border border-border bg-surface p-6"><View className="h-14 w-14 items-center justify-center rounded-full bg-primary/15"><Text className="text-2xl text-primary">✓</Text></View><Text className="mt-4 text-lg font-black text-foreground">لا توجد طلبات بعد</Text><Text className="mt-2 text-sm leading-5 text-muted">عند إرسال أول طلب، ستظهر حالته ورقمه هنا.</Text></View></ScrollView></ScreenContainer>;
}
