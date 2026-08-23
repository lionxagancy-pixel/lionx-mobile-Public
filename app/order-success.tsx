import { Alert, Linking, Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useLionxStore } from "@/lib/lionx-store";
import { tapFeedback } from "@/lib/feedback";

const SUPPORT_WHATSAPP = "201279332563";

function buildWhatsAppUrl(message: string) {
  const encoded = encodeURIComponent(message);
  return SUPPORT_WHATSAPP
    ? `https://wa.me/${SUPPORT_WHATSAPP}?text=${encoded}`
    : `https://api.whatsapp.com/send?text=${encoded}`;
}

export default function OrderSuccessScreen() {
  const router = useRouter();
  const { orderId, proofName } = useLocalSearchParams<{ orderId?: string; proofName?: string }>();
  const { orders } = useLionxStore();
  const order = orders.find((item) => item.id === orderId);

  const sendToWhatsApp = async () => {
    await tapFeedback();
    const message = [
      "مرحبًا فريق LIONX، أريد تأكيد طلب يدوي.",
      `نوع العملية: ${order?.operation === "wallet_topup" ? "شحن رصيد الحساب" : "دفع قيمة الطلب"}`,
      `رقم الطلب: ${orderId ?? "قيد الإنشاء"}`,
      `الإجمالي: ${order ? `${order.total} جنيه مصري` : "سيظهر في النظام"}`,
      `رقم محفظة العميل: ${order?.customerWallet || "سيُراجع مع الفريق"}`,
      `حالة الطلب: ${order?.status ?? "بانتظار المراجعة"}`,
      `إثبات التحويل: ${proofName || order?.proofName || "سيُرسل عند توفره"}`,
      "أرفقت إثبات التحويل عبر شاشة الطلب إن كان متاحًا.",
      "أرجو مراجعة الطلب وإفادتي بالخطوة التالية.",
    ].join("\n");
    try {
      await Linking.openURL(buildWhatsAppUrl(message));
    } catch {
      Alert.alert("تعذر فتح WhatsApp", "انسخ رقم الطلب وتواصل مع فريق LIONX يدويًا.");
    }
  };

  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]} className="items-center justify-center px-5">
      <View className="w-full rounded-3xl border border-primary bg-surface p-6">
        <Text className="text-center text-xs font-bold tracking-widest text-primary">LIONX ORDER</Text>
        <Text className="mt-4 text-center text-3xl font-black text-foreground">تم استلام طلبك</Text>
        <Text className="mt-3 text-center text-sm leading-5 text-muted">تم تسجيل الطلب للمراجعة اليدوية. لن يتم اعتبار التحويل دفعًا مكتملًا قبل تأكيد الفريق.</Text>
        <View className="mt-5 rounded-2xl bg-background p-4">
          <Text className="text-center text-xs text-muted">رقم الطلب</Text>
          <Text className="mt-2 text-center text-lg font-black text-primary">{orderId ?? "قيد الإنشاء"}</Text>
          <Text className="mt-2 text-center text-xs font-bold text-foreground">{order?.operation === "wallet_topup" ? "شحن رصيد الحساب" : "دفع قيمة الطلب"}</Text>
          <Text className="mt-2 text-center text-xs text-muted">{proofName || order?.proofName ? `الإيصال: ${proofName || order?.proofName}` : "لم يتم إرفاق إيصال بعد"}</Text>
        </View>
        <Pressable onPress={sendToWhatsApp} style={({ pressed }) => [{ opacity: pressed ? 0.82 : 1 }]}>
          <View className="mt-5 items-center rounded-2xl bg-[#25D366] py-4">
            <Text className="font-black text-[#06140B]">إرسال تفاصيل الطلب عبر WhatsApp</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push("/track-order")} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
          <View className="mt-3 items-center rounded-2xl border border-primary py-4">
            <Text className="font-black text-primary">تتبع الطلب</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => router.replace("/")} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
          <Text className="mt-5 text-center text-xs font-bold text-primary">العودة إلى المول</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
