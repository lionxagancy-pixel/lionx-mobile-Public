import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { formatEgp } from "@/shared/catalog";
import { useLionxStore } from "@/lib/lionx-store";

const methods = ["فودافون كاش", "محفظة LIONX", "تحويل بنكي"];

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart, total, createOrder } = useLionxStore();
  const [method, setMethod] = useState(methods[0]);
  const [proofName, setProofName] = useState<string | null>(null);
  const [pickerError, setPickerError] = useState<string | null>(null);
  const pickProof = async () => {
    setPickerError(null);
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: ["image/*", "application/pdf"], copyToCacheDirectory: true });
      if (!result.canceled) setProofName(result.assets[0]?.name ?? "ملف مرفق");
    } catch {
      setPickerError("تعذر فتح منتقي الملفات. تحقق من صلاحية الوصول وحاول مرة أخرى.");
    }
  };
  const submit = () => {
    const order = createOrder(method);
    if (order) router.replace({ pathname: "/order-success", params: { orderId: order.id, proofName: proofName ?? "" } });
  };
  return <ScreenContainer edges={["top", "bottom", "left", "right"]} className="px-4 pt-3"><ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
    <Pressable onPress={() => router.back()} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}><Text className="text-sm font-bold text-primary">← العودة</Text></Pressable>
    <Text className="mt-6 text-3xl font-black text-foreground">مراجعة الطلب</Text>
    <Text className="mt-2 text-sm text-muted">اختر وسيلة الدفع المناسبة. الطلب سيُرسل للمراجعة اليدوية.</Text>
    <View className="mt-6 rounded-2xl border border-border bg-surface p-5"><Text className="font-black text-foreground">ملخص الطلب</Text>{cart.length ? cart.map((line) => <View key={line.id} className="mt-3 flex-row justify-between"><Text className="flex-1 text-sm text-muted">{line.name} × {line.quantity}</Text><Text className="font-bold text-foreground">{formatEgp(line.price * line.quantity)}</Text></View>) : <Text className="mt-3 text-sm text-muted">السلة فارغة. أضف خدمة أولًا.</Text>}<View className="mt-4 h-px bg-border"/><View className="mt-4 flex-row justify-between"><Text className="font-black text-foreground">الإجمالي</Text><Text className="font-black text-primary">{formatEgp(total)}</Text></View></View>
    <Text className="mt-6 font-black text-foreground">طرق الدفع</Text>{methods.map((item) => <Pressable key={item} onPress={() => setMethod(item)} style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}><View className={`mt-3 flex-row items-center justify-between rounded-2xl border p-4 ${method === item ? "border-primary bg-primary/10" : "border-border bg-surface"}`}><Text className="font-bold text-foreground">{item}</Text><Text className="text-primary">{method === item ? "●" : "○"}</Text></View></Pressable>)}
    <View className="mt-6 rounded-2xl border border-border bg-surface p-5"><Text className="font-black text-foreground">إثبات التحويل</Text><Text className="mt-2 text-sm leading-5 text-muted">اختياري الآن. يمكنك اختيار صورة أو PDF، وسيُرسل اسم الملف للمراجعة المحلية فقط حتى يتم تفعيل التخزين الآمن.</Text><Pressable onPress={pickProof} style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}><View className="mt-4 items-center rounded-2xl border border-primary py-3"><Text className="font-bold text-primary">{proofName ? `تم اختيار: ${proofName}` : "اختيار صورة أو PDF"}</Text></View></Pressable>{pickerError ? <Text className="mt-2 text-xs text-error">تعذر اختيار الملف. حاول مرة أخرى.</Text> : null}</View>
    <Pressable onPress={submit} disabled={!cart.length} style={({ pressed }) => [{ opacity: !cart.length ? 0.45 : pressed ? 0.85 : 1 }]}><View className="mt-7 items-center rounded-2xl bg-primary py-4"><Text className="font-black text-background">إرسال الطلب للمراجعة</Text></View></Pressable>
  </ScrollView></ScreenContainer>;
}
