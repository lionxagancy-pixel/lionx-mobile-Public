import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { formatEgp } from "@/shared/catalog";
import { useLionxStore } from "@/lib/lionx-store";

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart, total } = useLionxStore();

  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]} className="px-4 pt-3">
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
          <Text className="text-sm font-bold text-primary">← العودة</Text>
        </Pressable>
        <Text className="mt-6 text-3xl font-black text-foreground">مراجعة الطلب</Text>
        <Text className="mt-2 text-sm leading-5 text-muted">راجع الخدمات أولًا، ثم انتقل إلى صفحة الدفع اليدوي لإدخال رقم محفظتك ورفع إثبات التحويل.</Text>

        <View className="mt-6 rounded-3xl border border-border bg-surface p-5">
          <Text className="font-black text-foreground">ملخص الطلب</Text>
          {cart.length ? (
            cart.map((line) => (
              <View key={line.id} className="mt-3 flex-row justify-between">
                <Text className="flex-1 text-sm text-muted">{line.name} × {line.quantity}</Text>
                <Text className="font-bold text-foreground">{formatEgp(line.price * line.quantity)}</Text>
              </View>
            ))
          ) : (
            <Text className="mt-3 text-sm text-muted">السلة فارغة. أضف خدمة أولًا.</Text>
          )}
          <View className="mt-4 h-px bg-border" />
          <View className="mt-4 flex-row justify-between">
            <Text className="font-black text-foreground">الإجمالي</Text>
            <Text className="font-black text-primary">{formatEgp(total)}</Text>
          </View>
        </View>

        <View className="mt-5 rounded-3xl border border-primary bg-surface p-5">
          <Text className="text-base font-black text-foreground">الخطوة التالية</Text>
          <Text className="mt-2 text-sm leading-6 text-muted">ستختار Vodafone Cash أو Orange Money أو InstaPay، ثم تنسخ رقم محفظة LIONX وتدخل رقم المحفظة التي أرسلت منها الأموال وترفع الإثبات.</Text>
        </View>

        <Pressable
          disabled={!cart.length}
          onPress={() => router.push({ pathname: "/payment-methods", params: { operation: "order_payment" } })}
          style={({ pressed }) => [{ opacity: !cart.length ? 0.45 : pressed ? 0.82 : 1 }]}
        >
          <View className="mt-6 items-center rounded-2xl bg-primary py-4">
            <Text className="font-black text-background">الانتقال للدفع اليدوي</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push({ pathname: "/payment-methods", params: { operation: "wallet_topup" } })} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
          <Text className="mt-4 text-center text-xs font-bold text-primary">أريد شحن رصيد الحساب بدل دفع طلب</Text>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}
