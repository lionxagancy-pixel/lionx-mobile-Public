import * as Clipboard from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { PaymentMethodCard } from "@/components/payment-method-card";
import { ScreenContainer } from "@/components/screen-container";
import { SocialFooter } from "@/components/social-footer";
import { useLionxStore, type PaymentOperation } from "@/lib/lionx-store";

const paymentMethods = [
  {
    id: "vodafone_cash",
    name: "Vodafone Cash",
    description: "حوّل إلى محفظة LIONX على Vodafone Cash ثم احتفظ بإيصال التحويل.",
    value: "01055861819",
    logo: require("@/assets/images/payment/vodafone-cash.png"),
  },
  {
    id: "orange_money",
    name: "Orange Money",
    description: "حوّل إلى محفظة LIONX على Orange Money ثم أرفق إثبات العملية.",
    value: "01233309491",
    logo: require("@/assets/images/payment/orange-money.png"),
  },
  {
    id: "instapay",
    name: "InstaPay",
    description: "استخدم عنوان InstaPay الخاص بـ LIONX للتحويل اليدوي.",
    value: "maxabx3@instapay",
    logo: require("@/assets/images/payment/instapay.png"),
  },
] as const;

const quickAmounts = [90, 150, 180, 200, 250, 500, 1000, 2000];
const styles = StyleSheet.create({
  input: { minHeight: 52, textAlign: "right", fontSize: 16, fontWeight: "700", color: "#F7F2E8" },
});

function parseAmount(value: string) {
  const normalized = value.replace(/[^0-9.]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ operation?: string }>();
  const { cart, total, createOrder } = useLionxStore();
  const [operation, setOperation] = useState<PaymentOperation>(() =>
    params.operation === "wallet_topup" || !cart.length ? "wallet_topup" : "order_payment",
  );
  const [amountInput, setAmountInput] = useState(total > 0 ? String(total) : "");
  const [selectedMethodId, setSelectedMethodId] = useState<(typeof paymentMethods)[number]["id"]>(paymentMethods[0].id);
  const [customerWallet, setCustomerWallet] = useState("");
  const [receiptName, setReceiptName] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [pickerError, setPickerError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selectedMethod = useMemo(
    () => paymentMethods.find((method) => method.id === selectedMethodId) ?? paymentMethods[0],
    [selectedMethodId],
  );
  const amount = operation === "order_payment" ? total : parseAmount(amountInput);
  const isCustomerWalletValid = /^01\d{9}$/.test(customerWallet.trim());
  const isAmountValid = amount >= 50 && amount <= 20000;
  const canSubmit = isAmountValid && isCustomerWalletValid && Boolean(receiptName) && (operation === "wallet_topup" || cart.length > 0);

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
      if (!result.canceled) setReceiptName(result.assets[0]?.name ?? "إيصال مرفق");
    } catch {
      setPickerError("تعذر فتح منتقي الملفات. حاول مرة أخرى.");
    }
  };

  const submit = () => {
    setSubmitError(null);
    if (!canSubmit) {
      setSubmitError("أكمل رقم محفظة العميل، المبلغ الصحيح، وإرفاق إثبات الدفع أولًا.");
      return;
    }
    const order = createOrder(selectedMethod.name, {
      operation,
      amount,
      customerWallet,
      proofName: receiptName ?? undefined,
    });
    if (!order) {
      setSubmitError("تعذر إنشاء طلب المراجعة. تأكد من وجود خدمات في السلة أو إدخال مبلغ الشحن.");
      return;
    }
    router.replace({ pathname: "/order-success", params: { orderId: order.id, proofName: order.proofName ?? "" } });
  };

  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]} className="px-4 pt-3">
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
          <Text className="text-sm font-bold text-primary">← رجوع</Text>
        </Pressable>
        <View className="mt-5 rounded-3xl border border-primary bg-surface p-5">
          <Text className="text-xs font-bold tracking-widest text-primary">MANUAL CHECKOUT</Text>
          <Text className="mt-2 text-3xl font-black text-foreground">الدفع اليدوي</Text>
          <Text className="mt-3 text-sm leading-6 text-muted">
            اختر طريقة التحويل، انسخ رقم محفظة LIONX، ثم أدخل رقم محفظتك وأرفق إثبات الدفع. لا يتم اعتماد العملية قبل المراجعة اليدوية.
          </Text>
        </View>

        <Text className="mt-6 text-base font-black text-foreground">نوع العملية</Text>
        <View className="mt-3 flex-row gap-2">
          <Pressable
            disabled={!cart.length}
            onPress={() => setOperation("order_payment")}
            style={({ pressed }) => [{ flex: 1, opacity: !cart.length ? 0.45 : pressed ? 0.75 : 1 }]}
          >
            <View className={`rounded-2xl border p-4 ${operation === "order_payment" ? "border-primary bg-primary" : "border-border bg-surface"}`}>
              <Text className={`text-center text-sm font-black ${operation === "order_payment" ? "text-background" : "text-foreground"}`}>دفع قيمة الطلب</Text>
              <Text className={`mt-1 text-center text-xs ${operation === "order_payment" ? "text-background" : "text-muted"}`}>{total.toFixed(2)} جنيه</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setOperation("wallet_topup")} style={({ pressed }) => [{ flex: 1, opacity: pressed ? 0.75 : 1 }]}>
            <View className={`rounded-2xl border p-4 ${operation === "wallet_topup" ? "border-primary bg-primary" : "border-border bg-surface"}`}>
              <Text className={`text-center text-sm font-black ${operation === "wallet_topup" ? "text-background" : "text-foreground"}`}>شحن رصيد الحساب</Text>
              <Text className={`mt-1 text-center text-xs ${operation === "wallet_topup" ? "text-background" : "text-muted"}`}>المبلغ يحدده العميل</Text>
            </View>
          </Pressable>
        </View>

        <View className="mt-5 rounded-3xl border border-border bg-surface p-5">
          <Text className="text-base font-black text-foreground">قيمة العملية</Text>
          {operation === "order_payment" ? (
            <View className="mt-3 flex-row items-center justify-between rounded-2xl border border-primary bg-background p-4">
              <Text className="text-xl font-black text-primary">{total.toFixed(2)} جنيه</Text>
              <Text className="text-sm font-bold text-foreground">إجمالي الطلب</Text>
            </View>
          ) : (
            <>
              <TextInput
                value={amountInput}
                onChangeText={setAmountInput}
                keyboardType="decimal-pad"
                placeholder="اكتب المبلغ بالجنيه"
                placeholderTextColor="#77716A"
                style={styles.input}
                className="mt-3 rounded-2xl border border-border bg-background px-4"
              />
              <View className="mt-3 flex-row flex-wrap justify-end gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Pressable key={quickAmount} onPress={() => setAmountInput(String(quickAmount))} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
                    <View className="rounded-xl border border-primary px-3 py-2">
                      <Text className="text-xs font-black text-primary">{quickAmount.toLocaleString("en-US")}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
              <Text className="mt-3 text-xs leading-5 text-muted">الحد الأدنى 50 جنيه والحد الأقصى 20,000 جنيه في طلب المراجعة الواحد.</Text>
            </>
          )}
        </View>

        <Text className="mt-6 text-base font-black text-foreground">طريقة التحويل</Text>
        <View className="mt-3 flex-row flex-wrap gap-2">
          {paymentMethods.map((method) => (
            <Pressable key={method.id} onPress={() => setSelectedMethodId(method.id)} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
              <View className={`rounded-full border px-4 py-2.5 ${selectedMethodId === method.id ? "border-primary bg-primary" : "border-border bg-surface"}`}>
                <Text className={`text-xs font-black ${selectedMethodId === method.id ? "text-background" : "text-foreground"}`}>{method.name}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <View className="mt-3">
          <PaymentMethodCard
            name={selectedMethod.name}
            description={selectedMethod.description}
            value={selectedMethod.value}
            logo={selectedMethod.logo}
            copied={copied === selectedMethod.value}
            onCopy={() => void copyValue(selectedMethod.value)}
          />
        </View>

        <View className="mt-5 rounded-3xl border border-border bg-surface p-5">
          <Text className="text-base font-black text-foreground">رقم محفظة العميل</Text>
          <Text className="mt-2 text-sm leading-6 text-muted">اكتب الرقم الذي حوّلت منه الأموال حتى يستطيع فريق LIONX مطابقة العملية يدويًا.</Text>
          <TextInput
            value={customerWallet}
            onChangeText={setCustomerWallet}
            keyboardType="phone-pad"
            maxLength={11}
            placeholder="مثال: 01000000000"
            placeholderTextColor="#77716A"
            style={styles.input}
            className="mt-3 rounded-2xl border border-border bg-background px-4"
          />
          {customerWallet.length > 0 && !isCustomerWalletValid ? <Text className="mt-2 text-xs text-error">أدخل رقم محفظة مصري صحيح يبدأ بـ 01 ويتكون من 11 رقمًا.</Text> : null}
        </View>

        <View className="mt-5 rounded-3xl border border-border bg-surface p-5">
          <Text className="text-base font-black text-foreground">إثبات الدفع</Text>
          <Text className="mt-2 text-sm leading-6 text-muted">ارفع صورة أو PDF للإيصال. الملف يُستخدم في هذه النسخة محليًا للمعاينة ولا يُحفظ في تخزين خادمي إنتاجي.</Text>
          <Pressable onPress={pickReceipt} style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1 }]}>
            <View className="mt-4 items-center rounded-2xl border border-primary px-4 py-3">
              <Text className="text-sm font-black text-primary">{receiptName ? `تم اختيار: ${receiptName}` : "اختيار صورة أو PDF"}</Text>
            </View>
          </Pressable>
          {pickerError ? <Text className="mt-2 text-xs text-error">{pickerError}</Text> : null}
        </View>

        <View className="mt-5 rounded-3xl border border-primary bg-surface p-5">
          <Text className="text-sm font-black text-foreground">مراجعة يدوية فقط</Text>
          <Text className="mt-2 text-xs leading-5 text-muted">سيتم إنشاء طلب بحالة «بانتظار المراجعة». لا تتم إضافة الرصيد ولا اعتبار الدفع مكتملًا قبل تأكيد فريق LIONX.</Text>
        </View>

        {submitError ? <Text className="mt-4 text-center text-xs font-bold text-error">{submitError}</Text> : null}
        <Pressable onPress={submit} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
          <View className={`mt-5 items-center rounded-2xl py-4 ${canSubmit ? "bg-primary" : "bg-primary/40"}`}>
            <Text className="font-black text-background">إرسال العملية للمراجعة</Text>
          </View>
        </Pressable>
        <SocialFooter />
      </ScrollView>
    </ScreenContainer>
  );
}
