import * as Clipboard from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { PaymentMethodCard } from "@/components/payment-method-card";
import { ScreenContainer } from "@/components/screen-container";
import { SocialFooter } from "@/components/social-footer";

const paymentMethods = [
  {
    name: "Vodafone Cash",
    description: "حوّل إلى محفظة Vodafone Cash ثم احتفظ بإيصال التحويل.",
    value: "01055861819",
    logo: require("@/assets/images/payment/vodafone-cash.png"),
  },
  {
    name: "Orange Money",
    description: "حوّل إلى محفظة Orange Money بنفس رقم الهاتف الظاهر.",
    value: "01233309491",
    logo: require("@/assets/images/payment/orange-money.png"),
  },
  {
    name: "InstaPay",
    description: "استخدم عنوان InstaPay التالي للتحويل اليدوي.",
    value: "maxabx3@instapay",
    logo: require("@/assets/images/payment/instapay.png"),
  },
] as const;

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);
  const [receiptName, setReceiptName] = useState<string | null>(null);
  const [pickerError, setPickerError] = useState<string | null>(null);

  const copyValue = async (value: string) => {
    await Clipboard.setStringAsync(value);
    setCopied(value);
    setTimeout(() => setCopied((current) => (current === value ? null : current)), 1800);
  };

  const pickReceipt = async () => {
    setPickerError(null);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        copyToCacheDirectory: true,
      });
      if (!result.canceled) {
        setReceiptName(result.assets[0]?.name ?? "إيصال مرفق");
      }
    } catch {
      setPickerError("تعذر فتح منتقي الملفات. حاول مرة أخرى.");
    }
  };

  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]} className="px-4 pt-3">
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
          <Text className="text-sm font-bold text-primary">← رجوع</Text>
        </Pressable>
        <View className="mt-5 rounded-3xl border border-primary bg-surface p-5">
          <Text className="text-xs font-bold tracking-widest text-primary">MANUAL CHECKOUT</Text>
          <Text className="mt-2 text-3xl font-black text-foreground">طرق الدفع</Text>
          <Text className="mt-3 text-sm leading-6 text-muted">
            حوّل يدويًا إلى الطريقة المناسبة، ثم أرفق صورة أو PDF للإيصال. يظل الطلب قيد المراجعة حتى يؤكده فريق LIONX.
          </Text>
        </View>

        <View className="mt-5 gap-3">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.value}
              name={method.name}
              description={method.description}
              value={method.value}
              logo={method.logo}
              copied={copied === method.value}
              onCopy={() => void copyValue(method.value)}
            />
          ))}
        </View>

        <View className="mt-5 rounded-3xl border border-border bg-surface p-5">
          <Text className="text-base font-black text-foreground">رفع الإيصال</Text>
          <Text className="mt-2 text-sm leading-6 text-muted">
            الرفع هنا محلي للمعاينة فقط، ولا يتم تخزين الملف على خادم أو اعتباره إثبات دفع نهائيًا في هذه النسخة.
          </Text>
          <Pressable onPress={pickReceipt} style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}>
            <View className="mt-4 items-center rounded-2xl border border-primary px-4 py-3">
              <Text className="text-sm font-black text-primary">
                {receiptName ? `تم اختيار: ${receiptName}` : "اختيار صورة أو PDF"}
              </Text>
            </View>
          </Pressable>
          {pickerError ? <Text className="mt-2 text-xs text-error">{pickerError}</Text> : null}
        </View>

        <View className="mt-5 rounded-3xl border border-primary bg-surface p-5">
          <Text className="text-sm font-black text-foreground">تنبيه المراجعة اليدوية</Text>
          <Text className="mt-2 text-xs leading-5 text-muted">
            لا تعرض هذه الشاشة حالة «تم الدفع». بعد إنشاء الطلب، استخدم رقم الطلب عند التواصل عبر واتساب الرسمي 01279332563.
          </Text>
        </View>

        <Pressable onPress={() => router.push("/checkout")} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
          <View className="mt-5 items-center rounded-2xl bg-primary px-5 py-4">
            <Text className="font-black text-background">الانتقال إلى مراجعة الطلب</Text>
          </View>
        </Pressable>
        <SocialFooter />
      </ScrollView>
    </ScreenContainer>
  );
}
